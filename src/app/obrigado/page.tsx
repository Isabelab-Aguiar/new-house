"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle, Gift, Home } from "lucide-react";

function ObrigadoContent() {
  const params = useSearchParams();
  const giftName = params.get("gift") || "Presente";
  const method = params.get("method") || "stripe";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--nude-100)" }}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden text-center"
        style={{
          background: "white",
          border: "1px solid #EDE3D4",
          boxShadow: "0 24px 64px rgba(107,68,35,0.12)",
        }}
      >
        <div
          className="px-8 pt-10 pb-8"
          style={{ background: "linear-gradient(135deg, #6B4423, #A67C52)" }}
        >
          <div className="flex justify-center mb-4">
            <CheckCircle size={52} className="text-white" strokeWidth={1.5} />
          </div>
          <h1
            className="text-3xl text-white font-light"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Muito obrigada!
          </h1>
          <p className="text-white/70 text-sm mt-2">Seu presente foi confirmado 🏠</p>
        </div>

        <div className="px-8 py-8">
          <div
            className="rounded-2xl p-4 mb-6"
            style={{ background: "#FAF7F2", border: "1px solid #EDE3D4" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#F5EFE6" }}
              >
                <Gift size={18} className="text-[#8B5E3C]" />
              </div>
              <div className="text-left">
                <p className="text-xs text-[#A67C52] mb-0.5">Presente escolhido</p>
                <p className="text-[#2C1A0E] font-semibold text-sm">{decodeURIComponent(giftName)}</p>
                <p className="text-xs text-[#A67C52]">via {method === "pix" ? "Pix" : "Cartão de Crédito"}</p>
              </div>
            </div>
          </div>

          <p className="text-[#8B5E3C] text-sm leading-relaxed mb-6">
            Você receberá a confirmação por e-mail em breve com todos os detalhes do evento. 💌
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/presentes"
              className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #6B4423, #A67C52)" }}
            >
              <Gift size={16} />
              Ver mais presentes
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium text-[#8B5E3C] transition-all hover:bg-[#F5EFE6]"
              style={{ border: "1px solid #EDE3D4" }}
            >
              <Home size={16} />
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ObrigadoPage() {
  return (
    <Suspense>
      <ObrigadoContent />
    </Suspense>
  );
}
