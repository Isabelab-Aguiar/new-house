"use client";

import { useState } from "react";
import type { GiftItem } from "@/lib/data";
import PaymentModal from "./PaymentModal";

interface GiftCardProps {
  gift: GiftItem;
  onReserved?: (giftId: string) => void;
}

const priorityColors = {
  alta: { bg: "#FEF3CD", text: "#92580C", label: "Alta Prioridade" },
  media: { bg: "#E8F4FD", text: "#1A6A9A", label: "Média Prioridade" },
  baixa: { bg: "#E8F5E9", text: "#2E7D32", label: "Baixa Prioridade" },
};

export default function GiftCard({ gift, onReserved }: GiftCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const priority = priorityColors[gift.priority];

  return (
    <>
      <div
        className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-400 ${
          gift.reserved
            ? "opacity-70"
            : "hover:shadow-[0_20px_60px_rgba(107,68,35,0.15)] hover:-translate-y-1"
        }`}
        style={{
          background: "white",
          border: "1px solid #EDE3D4",
          boxShadow: "0 2px 12px rgba(107,68,35,0.06)",
        }}
      >
        {/* Priority badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: priority.bg, color: priority.text }}
          >
            {priority.label}
          </span>
        </div>

        {/* Reserved badge */}
        {gift.reserved && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2C1A0E] text-white text-xs font-medium">
              Reservado
            </div>
          </div>
        )}

        {/* Icon area */}
        <div
          className="h-36 flex items-center justify-center relative overflow-hidden"
          style={{
            background: gift.reserved
              ? "linear-gradient(135deg, #F5EFE6, #EDE3D4)"
              : "linear-gradient(135deg, #FAF7F2, #F5EFE6)",
          }}
        >
          <span
            className={`text-5xl transition-transform duration-300 ${
              !gift.reserved ? "group-hover:scale-110" : ""
            }`}
          >
            {gift.icon}
          </span>
          {/* Decorative circle */}
          <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #C4956A, transparent)" }} />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className="mb-1">
            <span className="text-xs text-[#A67C52] font-medium tracking-wide uppercase">
              {gift.category}
            </span>
          </div>
          <h3 className="text-[#2C1A0E] font-semibold text-base leading-snug mb-2">
            {gift.name}
          </h3>
          <p className="text-[#8B5E3C] text-sm leading-relaxed flex-1 mb-4">
            {gift.description}
          </p>

          {gift.reserved && gift.reservedBy && (
            <p className="text-xs text-[#A67C52] italic mb-3">
              Reservado por: {gift.reservedBy}
            </p>
          )}

          {/* Price & CTA */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F5EFE6]">
            <div>
              <p className="text-xs text-[#A67C52] mb-0.5">Valor</p>
              <p
                className="text-xl font-bold text-[#6B4423]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                R$ {gift.price.toFixed(2).replace(".", ",")}
              </p>
            </div>

            {!gift.reserved ? (
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #8B5E3C, #C4956A)",
                  boxShadow: "0 4px 16px rgba(107,68,35,0.3)",
                }}
              >
                Presentear
              </button>
            ) : (
              <div
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium"
                style={{ background: "#F5EFE6", color: "#8B5E3C" }}
              >
                Reservado
              </div>
            )}
          </div>
        </div>
      </div>

      <PaymentModal
        gift={gift}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setModalOpen(false);
          onReserved?.(gift.id);
        }}
      />
    </>
  );
}
