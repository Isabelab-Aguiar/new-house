"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";
import GiftCard from "@/components/GiftCard";
import { GIFT_LIST, CATEGORIES } from "@/lib/data";
import { Gift, Search } from "lucide-react";

export default function PresentesPage() {
  const { status } = useSession();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [reservedIds, setReservedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  if (status === "loading") return <LoadingState />;
  if (status === "unauthenticated") return null;

  const gifts = GIFT_LIST.map((g) =>
    reservedIds.has(g.id) ? { ...g, reserved: true } : g
  ).filter((g) => {
    const matchCat = activeCategory === "Todos" || g.category === activeCategory;
    const matchSearch =
      !search ||
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const available = gifts.filter((g) => !g.reserved).length;

  return (
    <main style={{ background: "var(--nude-100)", minHeight: "100vh" }}>
      <Header />

      <section className="pt-28 pb-6 px-4" style={{ background: "linear-gradient(180deg, #F5EFE6, var(--nude-100))" }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ background: "#EDE3D4", border: "1px solid #D4C4B0" }}>
            <Gift size={12} className="text-[#8B5E3C]" />
            <span className="text-xs text-[#8B5E3C] font-medium tracking-wide uppercase">Lista de Presentes</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl text-[#2C1A0E] font-light mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Escolha um Presente
          </h1>
          <p className="text-[#8B5E3C] text-base max-w-lg mx-auto mb-6">
            Cada item foi escolhido com carinho para nosso novo lar.
            <span className="font-semibold text-[#6B4423]"> {available} itens</span> disponíveis.
          </p>

          <div className="relative max-w-sm mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C4956A]" />
            <input
              type="text"
              placeholder="Buscar presente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full text-sm outline-none transition-all"
              style={{
                background: "white",
                border: "1.5px solid #EDE3D4",
                color: "#2C1A0E",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#8B5E3C")}
              onBlur={(e) => (e.target.style.borderColor = "#EDE3D4")}
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-none px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap"
                style={
                  activeCategory === cat
                    ? { background: "#8B5E3C", color: "white", boxShadow: "0 4px 12px rgba(107,68,35,0.25)" }
                    : { background: "white", color: "#8B5E3C", border: "1px solid #EDE3D4" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {gifts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-[#8B5E3C] text-lg font-medium">Nenhum resultado encontrado</p>
              <p className="text-[#A67C52] text-sm mt-1">Tente outro filtro ou termo de busca</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {gifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onReserved={(id) => setReservedIds((prev) => new Set([...prev, id]))}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--nude-100)" }}>
      <div className="text-center">
        <div
          className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4"
          style={{ borderColor: "#C4956A", borderTopColor: "transparent" }}
        />
        <p className="text-[#A67C52] text-sm">Carregando...</p>
      </div>
    </div>
  );
}
