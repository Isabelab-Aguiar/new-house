import { GIFT_LIST } from "@/lib/data";
import Link from "next/link";

const previewGifts = GIFT_LIST.filter((g) => g.priority === "alta").slice(0, 4);

export default function GiftsPreviewSection() {
  return (
    <section className="py-20 px-4" style={{ background: "white" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs text-[#A67C52] tracking-[3px] uppercase font-medium mb-2">
              Lista de Presentes
            </p>
            <h2
              className="text-4xl sm:text-5xl text-[#2C1A0E] font-light"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Mais Desejados
            </h2>
          </div>
          <Link
            href="/presentes"
            className="flex-none px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #8B5E3C, #C4956A)" }}
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {previewGifts.map((gift) => (
            <Link
              key={gift.id}
              href="/presentes"
              className="group rounded-2xl p-5 text-center transition-all duration-300 hover:shadow-[0_12px_40px_rgba(107,68,35,0.12)] hover:-translate-y-1"
              style={{ background: "var(--nude-100)", border: "1px solid #EDE3D4" }}
            >
              <span className="text-4xl block mb-3 transition-transform duration-300 group-hover:scale-110">
                {gift.icon}
              </span>
              <p className="text-[#2C1A0E] font-semibold text-sm leading-snug mb-2">
                {gift.name}
              </p>
              <p
                className="text-[#6B4423] font-bold text-base"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                R$ {gift.price.toFixed(2).replace(".", ",")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
