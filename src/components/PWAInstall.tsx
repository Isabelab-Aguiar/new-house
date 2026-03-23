"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstall() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 rounded-2xl p-4 flex items-center gap-3 animate-[slideUp_0.3s_ease_forwards]"
      style={{
        background: "white",
        border: "1px solid #EDE3D4",
        boxShadow: "0 16px 48px rgba(107,68,35,0.2)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-lg leading-none"
        style={{ background: "linear-gradient(135deg, #8B5E3C, #C4956A)" }}
      >
        ↓
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#2C1A0E] text-sm font-semibold leading-none mb-0.5">
          Instalar App
        </p>
        <p className="text-[#A67C52] text-xs">Adicione à tela inicial</p>
      </div>
      <button
        onClick={handleInstall}
        className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
        style={{ background: "linear-gradient(135deg, #8B5E3C, #C4956A)" }}
      >
        Instalar
      </button>
      <button
        onClick={() => setVisible(false)}
        className="w-7 h-7 flex items-center justify-center rounded-full text-[#A67C52] hover:bg-[#F5EFE6] transition-colors flex-shrink-0"
      >
        <span className="text-base leading-none">×</span>
      </button>
    </div>
  );
}
