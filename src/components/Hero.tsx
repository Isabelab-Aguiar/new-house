"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { COUPLE_PHOTOS, EVENT_INFO } from "@/lib/data";
import Link from "next/link";

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Carousel */}
      <div className="embla absolute inset-0" ref={emblaRef}>
        <div className="embla__container h-full">
          {COUPLE_PHOTOS.map((photo) => (
            <div key={photo.id} className="embla__slide">
              <div className="relative w-full h-full">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 30%" }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#2C1A0E]/20 via-transparent to-[#2C1A0E]/70" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B5E3C] via-[#C4956A] to-[#8B5E3C]" />

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full glass-btn z-10 transition-all hover:scale-110 active:scale-95"
        aria-label="Anterior"
        style={{ background: "rgba(253,250,246,0.2)", backdropFilter: "blur(12px)", border: "1px solid rgba(253,250,246,0.3)", color: "white" }}
      >
        <span className="text-xl leading-none">‹</span>
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full z-10 transition-all hover:scale-110 active:scale-95"
        aria-label="Próximo"
        style={{ background: "rgba(253,250,246,0.2)", backdropFilter: "blur(12px)", border: "1px solid rgba(253,250,246,0.3)", color: "white" }}
      >
        <span className="text-xl leading-none">›</span>
      </button>

      {/* Dots */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {COUPLE_PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === selectedIndex
                ? "w-6 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Caption */}
      <div className="absolute bottom-20 left-0 right-0 text-center z-10 px-4">
        <p className="text-white/70 text-sm italic font-light tracking-wide">
          {COUPLE_PHOTOS[selectedIndex]?.caption}
        </p>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <div className="text-center max-w-3xl mx-auto">
          {/* Tag */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 animate-[fadeIn_1s_ease_forwards]"
            style={{ background: "rgba(253,250,246,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(253,250,246,0.25)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4956A]" />
            <span className="text-white/90 text-xs tracking-[3px] uppercase font-medium">
              Chá de Casa Nova
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4956A]" />
          </div>

          {/* Names */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-3 leading-none tracking-tight animate-[slideUp_0.8s_ease_forwards]"
            style={{ fontFamily: "var(--font-playfair)", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            Isabella
            <span className="block text-[#E8C89A] italic font-normal text-4xl sm:text-5xl md:text-6xl my-1">
              &amp;
            </span>
            Rafael
          </h1>

          {/* Date */}
          <p
            className="text-white/80 text-sm sm:text-base tracking-[4px] uppercase font-light mb-10 animate-[fadeIn_1.2s_ease_forwards]"
          >
            {EVENT_INFO.date} · {EVENT_INFO.time}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-[slideUp_1s_ease_forwards]">
            <Link
              href="/presentes"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #8B5E3C, #C4956A)",
                color: "white",
                boxShadow: "0 8px 32px rgba(107,68,35,0.4)",
              }}
            >
              🎁 Ver Lista de Presentes
            </Link>
            <Link
              href="/confirmacao"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "rgba(253,250,246,0.15)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(253,250,246,0.4)",
                color: "white",
              }}
            >
              ✓ Confirmar Presença
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <p className="text-white/50 text-xs tracking-widest uppercase">Role para baixo</p>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
