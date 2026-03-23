"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--nude-100)" }}>
        <span className="inline-block w-8 h-8 border-2 border-[#A67C52] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--nude-100)" }}
    >
      <BackgroundDecor />

      <div className="relative z-10 w-full max-w-sm mx-auto px-4">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(253,250,246,0.9)",
            backdropFilter: "blur(24px)",
            border: "1px solid #EDE3D4",
            boxShadow: "0 32px 80px rgba(107,68,35,0.15), 0 8px 24px rgba(107,68,35,0.08)",
          }}
        >
          <div
            className="px-8 pt-10 pb-8 text-center"
            style={{ background: "linear-gradient(160deg, #6B4423 0%, #A67C52 100%)" }}
          >
            <div className="flex justify-center mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(253,250,246,0.15)",
                  border: "1.5px solid rgba(253,250,246,0.3)",
                }}
              >
                <span
                  className="text-2xl text-white font-light"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  I&R
                </span>
              </div>
            </div>
            <p className="text-white/60 text-xs tracking-[4px] uppercase mb-2">Chá de Casa Nova</p>
            <h1
              className="text-3xl text-white font-light leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Isabella &amp; Rafael
            </h1>
            <p className="text-white/60 text-sm mt-2">Sábado, 12 de Abril · 15h00</p>
          </div>

          <div className="px-8 py-8">
            <p
              className="text-center text-[#5C3D2E] text-base font-medium mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Bem-vindo(a)! 🏠
            </p>
            <p className="text-center text-[#A67C52] text-sm mb-8 leading-relaxed">
              Faça login para acessar a lista de presentes e confirmar sua presença.
            </p>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: loading
                  ? "#EDE3D4"
                  : "linear-gradient(135deg, #6B4423, #A67C52)",
                color: loading ? "#8B5E3C" : "white",
                boxShadow: loading ? "none" : "0 8px 24px rgba(107,68,35,0.35)",
              }}
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              {loading ? "Entrando..." : "Entrar com Google"}
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-[#EDE3D4]" />
              <span className="text-xs text-[#C4956A]">acesso seguro</span>
              <div className="flex-1 h-px bg-[#EDE3D4]" />
            </div>

            <p className="text-center text-xs text-[#A67C52] leading-relaxed">
              Apenas convidados têm acesso.
              <br />
              Seu login é seguro e privado. 🔒
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-[#C4956A] mt-6">
          © 2025 · Chá de Casa Nova · Isabella &amp; Rafael
        </p>
      </div>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, #C4956A, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15 translate-x-1/2 translate-y-1/2"
        style={{ background: "radial-gradient(circle, #8B5E3C, transparent)" }}
      />
      <div
        className="absolute top-1/3 right-10 w-32 h-32 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #D4A574, transparent)" }}
      />
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `rgba(${166 + i * 3}, ${124 + i * 2}, ${82}, ${0.15 + i * 0.01})`,
            top: `${(i * 37 + 10) % 100}%`,
            left: `${(i * 53 + 5) % 100}%`,
          }}
        />
      ))}
    </>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#FDFAF6" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="rgba(253,250,246,0.8)" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="rgba(253,250,246,0.6)" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="rgba(253,250,246,0.9)" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
