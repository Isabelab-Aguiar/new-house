"use client";

import CountdownTimer from "@/components/CountdownTimer";
import Link from "next/link";

export default function CountdownSection() {
  return (
    <section
      className="py-20 px-4 text-center"
      style={{ background: "linear-gradient(135deg, #6B4423 0%, #A67C52 100%)" }}
    >
      <div className="max-w-2xl mx-auto">
        <p className="text-white/60 text-xs tracking-[4px] uppercase mb-4">
          Faltam apenas
        </p>
        <h2
          className="text-4xl sm:text-5xl text-white font-light mb-10"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Contagem Regressiva
        </h2>

        <CountdownTimer />

        <p className="text-white/60 text-sm mt-10 mb-8">
          Sábado, 12 de Abril de 2025 · 15h00 · Jardim Europa, São Paulo
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/confirmacao"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: "rgba(253,250,246,0.15)",
              color: "white",
              border: "1.5px solid rgba(253,250,246,0.4)",
              backdropFilter: "blur(8px)",
            }}
          >
            ✓ Confirmar Presença
          </Link>
          <Link
            href="/presentes"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: "#FDFAF6",
              color: "#6B4423",
            }}
          >
            🎁 Ver Presentes
          </Link>
        </div>
      </div>
    </section>
  );
}
