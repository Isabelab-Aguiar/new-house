"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { COUPLE_PHOTOS } from "@/lib/data";

const GALLERY_PHOTOS = [
  ...COUPLE_PHOTOS,
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    alt: "Novo apartamento",
    caption: "Nossa nova sala",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    alt: "Cozinha nova",
    caption: "A cozinha que sempre sonhamos",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    alt: "Quarto do casal",
    caption: "Nosso cantinho",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    alt: "Varanda",
    caption: "A varanda dos nossos sonhos",
  },
];

export default function GaleriaPage() {
  const { status } = useSession();
  const router = useRouter();
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight" && lightbox !== null) {
        setLightbox((lightbox + 1) % GALLERY_PHOTOS.length);
      }
      if (e.key === "ArrowLeft" && lightbox !== null) {
        setLightbox((lightbox - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  if (status === "loading") return <LoadingSpinner />;
  if (status === "unauthenticated") return null;

  const activePhoto = lightbox !== null ? GALLERY_PHOTOS[lightbox] : null;

  return (
    <main style={{ background: "var(--nude-100)", minHeight: "100vh" }}>
      <Header />

      <section
        className="pt-28 pb-10 px-4 text-center"
        style={{ background: "linear-gradient(180deg, #F5EFE6, var(--nude-100))" }}
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
          style={{ background: "#EDE3D4", border: "1px solid #D4C4B0" }}
        >
          <span className="text-xs text-[#8B5E3C] font-medium tracking-wide uppercase">📸 Nossa Galeria</span>
        </div>
        <h1
          className="text-4xl sm:text-5xl text-[#2C1A0E] font-light mb-3"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Momentos &amp; Memórias
        </h1>
        <p className="text-[#8B5E3C] text-base max-w-sm mx-auto">
          Cada foto conta um pedacinho da nossa história.
        </p>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {GALLERY_PHOTOS.map((photo, index) => (
              <div
                key={photo.id}
                className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-2xl"
                style={{ border: "1px solid #EDE3D4" }}
                onClick={() => setLightbox(index)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center text-white text-2xl"
                  style={{ background: "rgba(44,26,14,0.4)" }}>
                  +
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: "linear-gradient(to top, rgba(44,26,14,0.8), transparent)" }}
                >
                  <p className="text-white text-xs font-medium">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(44,26,14,0.92)", backdropFilter: "blur(8px)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors text-2xl leading-none"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <p className="text-white/70 text-sm text-center mt-3">{activePhoto.caption}</p>
            <p className="text-white/40 text-xs text-center mt-1">
              {(lightbox ?? 0) + 1} / {GALLERY_PHOTOS.length} · Use ← → para navegar
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
