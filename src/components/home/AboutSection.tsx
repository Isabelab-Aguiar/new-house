import { EVENT_INFO } from "@/lib/data";

export default function AboutSection() {
  return (
    <section className="py-20 px-4" style={{ background: "white" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs text-[#A67C52] tracking-[3px] uppercase font-medium mb-3">
              Nossa História
            </p>
            <h2
              className="text-4xl sm:text-5xl text-[#2C1A0E] font-light leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Um novo capítulo{" "}
              <em className="text-[#A67C52]">começa aqui</em>
            </h2>
            <p className="text-[#5C3D2E] text-base leading-relaxed mb-6">
              {EVENT_INFO.message}
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, #C4956A, transparent)" }} />
              <span
                className="text-2xl text-[#C4956A] font-light"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Isabella &amp; Rafael
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div
                className="aspect-[3/4] rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 16px 48px rgba(107,68,35,0.15)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&q=80"
                  alt="Casal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 pt-8">
                <div
                  className="aspect-square rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 16px 48px rgba(107,68,35,0.15)" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80"
                    alt="Casal feliz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="flex-1 rounded-2xl flex items-center justify-center text-center p-4"
                  style={{ background: "linear-gradient(135deg, #F5EFE6, #EDE3D4)" }}
                >
                  <div>
                    <p className="text-3xl font-light text-[#8B5E3C]" style={{ fontFamily: "var(--font-playfair)" }}>
                      12
                    </p>
                    <p className="text-xs text-[#A67C52] tracking-wide uppercase">Abril</p>
                    <p className="text-xs text-[#A67C52]">2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
