"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { EVENT_INFO, TIMELINE } from "@/lib/data";
import { Check, MapPin, Clock, Calendar, Shirt, Users, ChevronDown } from "lucide-react";

type RSVPStatus = "idle" | "submitting" | "confirmed" | "declined";

export default function ConfirmacaoPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus>("idle");
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  if (status === "loading") return <LoadingState />;
  if (status === "unauthenticated") return null;

  const handleConfirm = async () => {
    setRsvpStatus("submitting");
    await new Promise((r) => setTimeout(r, 1200));
    setRsvpStatus("confirmed");
  };

  const handleDecline = async () => {
    setRsvpStatus("submitting");
    await new Promise((r) => setTimeout(r, 800));
    setRsvpStatus("declined");
  };

  return (
    <main style={{ background: "var(--nude-100)", minHeight: "100vh" }}>
      <Header />

      <section className="pt-28 pb-10 px-4" style={{ background: "linear-gradient(180deg, #F5EFE6, var(--nude-100))" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ background: "#EDE3D4", border: "1px solid #D4C4B0" }}>
            <Users size={12} className="text-[#8B5E3C]" />
            <span className="text-xs text-[#8B5E3C] font-medium tracking-wide uppercase">Confirmação de Presença</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl text-[#2C1A0E] font-light mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Você vem?
          </h1>
          <p className="text-[#8B5E3C] text-base max-w-md mx-auto">
            Sua presença é o maior presente para nós. Confirme até <strong className="text-[#6B4423]">5 de Abril</strong>.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">

          <div className="md:col-span-3 flex flex-col gap-5">
            {rsvpStatus === "confirmed" ? (
              <ConfirmedCard name={session?.user?.name || "Convidado"} guests={guests} />
            ) : rsvpStatus === "declined" ? (
              <DeclinedCard name={session?.user?.name || "Convidado"} />
            ) : (
              <RSVPForm
                guestName={session?.user?.name || ""}
                guests={guests}
                setGuests={setGuests}
                note={note}
                setNote={setNote}
                loading={rsvpStatus === "submitting"}
                onConfirm={handleConfirm}
                onDecline={handleDecline}
              />
            )}
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <EventInfoCard />
            <TimelineCard />
          </div>
        </div>
      </section>
    </main>
  );
}

function RSVPForm({
  guestName,
  guests,
  setGuests,
  note,
  setNote,
  loading,
  onConfirm,
  onDecline,
}: {
  guestName: string;
  guests: number;
  setGuests: (n: number) => void;
  note: string;
  setNote: (s: string) => void;
  loading: boolean;
  onConfirm: () => void;
  onDecline: () => void;
}) {
  return (
    <div
      className="rounded-3xl p-8"
      style={{ background: "white", border: "1px solid #EDE3D4", boxShadow: "0 4px 24px rgba(107,68,35,0.08)" }}
    >
      <p className="text-[#A67C52] text-sm mb-1">Confirmando como</p>
      <p className="text-[#2C1A0E] text-xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
        {guestName} 👋
      </p>

      <label className="block mb-5">
        <span className="text-sm font-medium text-[#5C3D2E] mb-2 block">Quantas pessoas vêm com você?</span>
        <div className="relative">
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full appearance-none px-4 py-3 rounded-xl text-sm outline-none pr-10"
            style={{ background: "#FAF7F2", border: "1.5px solid #EDE3D4", color: "#2C1A0E" }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "pessoa" : "pessoas"}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A67C52] pointer-events-none" />
        </div>
      </label>

      <label className="block mb-8">
        <span className="text-sm font-medium text-[#5C3D2E] mb-2 block">Observação (opcional)</span>
        <textarea
          rows={3}
          placeholder="Restrição alimentar, mensagem, etc..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{ background: "#FAF7F2", border: "1.5px solid #EDE3D4", color: "#2C1A0E" }}
          onFocus={(e) => (e.target.style.borderColor = "#8B5E3C")}
          onBlur={(e) => (e.target.style.borderColor = "#EDE3D4")}
        />
      </label>

      <div className="flex flex-col gap-3">
        <button
          onClick={onConfirm}
          disabled={loading}
          className="w-full py-4 rounded-2xl text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
          style={{
            background: "linear-gradient(135deg, #6B4423, #A67C52)",
            boxShadow: "0 8px 24px rgba(107,68,35,0.3)",
          }}
        >
          {loading ? "Confirmando..." : "✓ Confirmar Presença"}
        </button>
        <button
          onClick={onDecline}
          disabled={loading}
          className="w-full py-3 rounded-2xl text-sm font-medium text-[#8B5E3C] transition-all hover:bg-[#F5EFE6] disabled:opacity-60"
          style={{ border: "1px solid #EDE3D4" }}
        >
          Não poderei comparecer
        </button>
      </div>
    </div>
  );
}

function ConfirmedCard({ name, guests }: { name: string; guests: number }) {
  return (
    <div
      className="rounded-3xl p-8 text-center"
      style={{
        background: "linear-gradient(135deg, #6B4423, #A67C52)",
        boxShadow: "0 16px 48px rgba(107,68,35,0.3)",
      }}
    >
      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
        <Check size={28} className="text-white" />
      </div>
      <h2
        className="text-3xl text-white font-light mb-2"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Presença Confirmada!
      </h2>
      <p className="text-white/80 text-base mb-1">{name}</p>
      <p className="text-white/60 text-sm">
        {guests} {guests === 1 ? "pessoa" : "pessoas"} · Sábado, 12 de Abril · 15h00
      </p>
      <div className="mt-6 pt-6 border-t border-white/20">
        <p className="text-white/70 text-sm italic">
          "Mal podemos esperar para celebrar com você! 💛"
        </p>
        <p className="text-white/50 text-xs mt-2">Isabella & Rafael</p>
      </div>
    </div>
  );
}

function DeclinedCard({ name }: { name: string }) {
  return (
    <div
      className="rounded-3xl p-8 text-center"
      style={{ background: "white", border: "1px solid #EDE3D4" }}
    >
      <p className="text-5xl mb-4">🥺</p>
      <h2
        className="text-2xl text-[#2C1A0E] font-light mb-2"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Que pena, {name.split(" ")[0]}!
      </h2>
      <p className="text-[#8B5E3C] text-sm leading-relaxed">
        Sentiremos muito sua falta. Mas entendemos e obrigada por nos avisar!
        Se mudar de ideia, fale com a gente. 💛
      </p>
    </div>
  );
}

function EventInfoCard() {
  const items = [
    { icon: Calendar, label: EVENT_INFO.date },
    { icon: Clock, label: `${EVENT_INFO.time}` },
    { icon: MapPin, label: `${EVENT_INFO.address}, ${EVENT_INFO.neighborhood}` },
    { icon: Shirt, label: `Dress code: ${EVENT_INFO.dresscode}` },
  ];

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "white", border: "1px solid #EDE3D4" }}
    >
      <p className="text-xs text-[#A67C52] tracking-[2px] uppercase font-medium mb-4">Informações</p>
      <div className="flex flex-col gap-3">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#F5EFE6" }}
            >
              <Icon size={14} className="text-[#8B5E3C]" />
            </div>
            <p className="text-[#5C3D2E] text-sm leading-snug pt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineCard() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "white", border: "1px solid #EDE3D4" }}
    >
      <p className="text-xs text-[#A67C52] tracking-[2px] uppercase font-medium mb-4">Programação</p>
      <div className="flex flex-col gap-0">
        {TIMELINE.map((item, i) => (
          <div key={i} className="flex gap-3 pb-4 last:pb-0 relative">
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 z-10"
                style={{ background: "#F5EFE6", border: "2px solid #EDE3D4" }}
              >
                {item.icon}
              </div>
              {i < TIMELINE.length - 1 && (
                <div className="w-px flex-1 mt-1" style={{ background: "#EDE3D4", minHeight: "16px" }} />
              )}
            </div>
            <div className="pt-1">
              <p className="text-xs text-[#A67C52] font-medium">{item.time}</p>
              <p className="text-sm text-[#2C1A0E] font-medium leading-tight">{item.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--nude-100)" }}>
      <div
        className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: "#C4956A", borderTopColor: "transparent" }}
      />
    </div>
  );
}
