"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { X, CreditCard, Smartphone, Copy, Check, Loader2, AlertCircle } from "lucide-react";
import type { GiftItem } from "@/lib/data";

interface Props {
  gift: GiftItem;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type Step = "method" | "pix-details" | "loading" | "success";
type Method = "stripe" | "pix";

export default function PaymentModal({ gift, isOpen, onClose, onSuccess }: Props) {
  const { data: session } = useSession();
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState<Method>("stripe");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pixData, setPixData] = useState<{ pixCode: string; pixQrCode: string; expiresAt: string } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const guestName = session?.user?.name || "Convidado";
  const guestEmail = session?.user?.email || "";

  const handleSelectMethod = (m: Method) => setMethod(m);

  const handleProceed = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          giftId: gift.id,
          method,
          guestName,
          guestEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao processar pagamento");
        setLoading(false);
        return;
      }

      if (method === "stripe" && data.url) {
        window.location.href = data.url;
        return;
      }

      if (method === "pix" && data.pixCode) {
        setPixData({
          pixCode: data.pixCode,
          pixQrCode: data.pixQrCode,
          expiresAt: data.expiresAt,
        });
        setStep("pix-details");
        setLoading(false);
        return;
      }

      setError("Resposta inválida do servidor");
    } catch {
      setError("Erro de conexão. Tente novamente.");
    }

    setLoading(false);
  };

  const copyPixCode = async () => {
    if (!pixData?.pixCode) return;
    await navigator.clipboard.writeText(pixData.pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleClose = () => {
    setStep("method");
    setMethod("stripe");
    setPixData(null);
    setError("");
    setCopied(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#2C1A0E]/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-[slideUp_0.3s_ease_forwards]"
        style={{ background: "#FDFAF6", border: "1px solid #EDE3D4" }}
      >
        {/* Header */}
        <div
          className="px-6 pt-6 pb-5"
          style={{ background: "linear-gradient(135deg, #FAF7F2, #F5EFE6)", borderBottom: "1px solid #EDE3D4" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#A67C52] tracking-[3px] uppercase font-medium mb-1">
                Presentear
              </p>
              <h2 className="text-xl font-bold text-[#2C1A0E]" style={{ fontFamily: "var(--font-playfair)" }}>
                {gift.name}
              </h2>
              <p className="text-2xl font-bold text-[#6B4423] mt-1">
                R$ {gift.price.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#EDE3D4] text-[#8B5E3C] hover:bg-[#D4C4B0] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm mb-4">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Step: Choose method */}
          {step === "method" && (
            <>
              <p className="text-sm text-[#8B5E3C] mb-4 font-medium">Escolha como pagar:</p>

              <div className="flex flex-col gap-3 mb-6">
                {/* Stripe */}
                <button
                  onClick={() => handleSelectMethod("stripe")}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    method === "stripe"
                      ? "border-[#8B5E3C] bg-[#F5EFE6]"
                      : "border-[#EDE3D4] bg-white hover:border-[#C4956A]"
                  }`}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: method === "stripe" ? "linear-gradient(135deg,#8B5E3C,#C4956A)" : "#F5EFE6" }}
                  >
                    <CreditCard size={18} className={method === "stripe" ? "text-white" : "text-[#8B5E3C]"} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-[#2C1A0E] text-sm">Cartão de Crédito</p>
                    <p className="text-xs text-[#A67C52]">Via Stripe · Parcelamento disponível</p>
                  </div>
                  {method === "stripe" && (
                    <div className="w-5 h-5 rounded-full bg-[#8B5E3C] flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </button>

                {/* Pix */}
                <button
                  onClick={() => handleSelectMethod("pix")}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    method === "pix"
                      ? "border-[#8B5E3C] bg-[#F5EFE6]"
                      : "border-[#EDE3D4] bg-white hover:border-[#C4956A]"
                  }`}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: method === "pix" ? "linear-gradient(135deg,#8B5E3C,#C4956A)" : "#F5EFE6" }}
                  >
                    <Smartphone size={18} className={method === "pix" ? "text-white" : "text-[#8B5E3C]"} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-[#2C1A0E] text-sm">Pix</p>
                    <p className="text-xs text-[#A67C52]">Via AbacatePay · Pagamento instantâneo</p>
                  </div>
                  {method === "pix" && (
                    <div className="w-5 h-5 rounded-full bg-[#8B5E3C] flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </button>
              </div>

              <button
                onClick={handleProceed}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #6B4423, #A67C52)",
                  boxShadow: "0 8px 24px rgba(107,68,35,0.35)",
                }}
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    {method === "pix" ? <Smartphone size={16} /> : <CreditCard size={16} />}
                    {method === "pix" ? "Gerar QR Code Pix" : "Pagar com Cartão"}
                  </>
                )}
              </button>
            </>
          )}

          {/* Step: Pix details */}
          {step === "pix-details" && pixData && (
            <>
              <div className="text-center mb-5">
                <p className="text-sm text-[#8B5E3C] mb-4">
                  Escaneie o QR Code ou copie o código para pagar via Pix
                </p>
                {/* QR Code */}
                <div
                  className="inline-block p-4 rounded-2xl mb-4"
                  style={{ background: "white", border: "1px solid #EDE3D4", boxShadow: "0 4px 16px rgba(107,68,35,0.1)" }}
                >
                  {pixData.pixQrCode ? (
                    <img src={pixData.pixQrCode} alt="QR Code Pix" className="w-44 h-44" />
                  ) : (
                    <div className="w-44 h-44 flex items-center justify-center bg-[#F5EFE6] rounded-xl">
                      <Smartphone size={48} className="text-[#C4956A]" />
                    </div>
                  )}
                </div>

                {/* Pix code */}
                <div
                  className="flex items-center gap-2 p-3 rounded-xl text-left"
                  style={{ background: "#F5EFE6", border: "1px solid #EDE3D4" }}
                >
                  <code className="flex-1 text-xs text-[#6B4423] break-all font-mono">
                    {pixData.pixCode.slice(0, 60)}...
                  </code>
                  <button
                    onClick={copyPixCode}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{ background: copied ? "#8B5E3C" : "#C4956A", color: "white" }}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? "Copiado!" : "Copiar"}
                  </button>
                </div>

                <p className="text-xs text-[#A67C52] mt-3">
                  Após o pagamento você receberá a confirmação por e-mail 💌
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-2xl text-sm font-medium text-[#8B5E3C] transition-all hover:bg-[#F5EFE6]"
                style={{ border: "1px solid #EDE3D4" }}
              >
                Fechar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
