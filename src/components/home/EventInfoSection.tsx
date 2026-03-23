import { EVENT_INFO } from "@/lib/data";
import { MapPin, Clock, Calendar, Shirt } from "lucide-react";
import Link from "next/link";

const infoCards = [
  {
    icon: Calendar,
    label: "Data",
    value: EVENT_INFO.date,
    emoji: "📅",
  },
  {
    icon: Clock,
    label: "Horário",
    value: `A partir das ${EVENT_INFO.time}`,
    emoji: "🕓",
  },
  {
    icon: MapPin,
    label: "Local",
    value: `${EVENT_INFO.address}`,
    sub: EVENT_INFO.neighborhood,
    emoji: "📍",
  },
  {
    icon: Shirt,
    label: "Dress Code",
    value: EVENT_INFO.dresscode,
    emoji: "✨",
  },
];

export default function EventInfoSection() {
  return (
    <section className="py-20 px-4" style={{ background: "var(--nude-100)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs text-[#A67C52] tracking-[3px] uppercase font-medium mb-3">
            Detalhes do Evento
          </p>
          <h2
            className="text-4xl sm:text-5xl text-[#2C1A0E] font-light"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Informações
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {infoCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-[0_8px_32px_rgba(107,68,35,0.12)] hover:-translate-y-1"
              style={{ background: "white", border: "1px solid #EDE3D4" }}
            >
              <span className="text-3xl mb-3 block">{card.emoji}</span>
              <p className="text-xs text-[#A67C52] tracking-wide uppercase font-medium mb-1">
                {card.label}
              </p>
              <p className="text-[#2C1A0E] font-semibold text-sm leading-snug">{card.value}</p>
              {card.sub && (
                <p className="text-[#A67C52] text-xs mt-1">{card.sub}</p>
              )}
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "#F5EFE6", border: "1px solid #EDE3D4" }}
        >
          <div>
            <p className="text-sm font-semibold text-[#2C1A0E] mb-0.5">📍 Como chegar</p>
            <p className="text-[#8B5E3C] text-sm">{EVENT_INFO.address}, {EVENT_INFO.neighborhood}</p>
          </div>
          <Link
            href={EVENT_INFO.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-none px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #8B5E3C, #C4956A)" }}
          >
            Ver no Maps →
          </Link>
        </div>
      </div>
    </section>
  );
}
