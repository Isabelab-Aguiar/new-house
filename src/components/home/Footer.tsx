import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="py-12 px-4"
      style={{ background: "#2C1A0E" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(196,149,106,0.2)", border: "1px solid rgba(196,149,106,0.3)" }}
              >
                <span
                  className="text-sm text-[#C4956A] font-light"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  I&R
                </span>
              </div>
              <span
                className="text-white text-lg font-light"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Isabella & Rafael
              </span>
            </div>
            <p className="text-white/40 text-xs">Chá de Casa Nova · 12 de Abril de 2025</p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {[
              { href: "/", label: "Início" },
              { href: "/presentes", label: "Presentes" },
              { href: "/confirmacao", label: "Confirmar" },
              { href: "/galeria", label: "Galeria" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white/50 hover:text-white/90 text-sm transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div
          className="mt-8 pt-8 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-white/30 text-xs">
            Feito com 💛 para celebrar nosso novo lar
          </p>
        </div>
      </div>
    </footer>
  );
}
