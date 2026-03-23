"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2025-04-12T15:00:00-03:00");

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = TARGET_DATE.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-5 justify-center">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div
            className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl flex items-center justify-center mb-2"
            style={{
              background: "linear-gradient(135deg, #8B5E3C, #C4956A)",
              boxShadow: "0 8px 24px rgba(107,68,35,0.25)",
            }}
          >
            <span className="text-white text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[#A67C52] text-xs tracking-widest uppercase font-medium">{label}</span>
        </div>
      ))}
    </div>
  );
}
