"use client";

import { SessionProvider } from "next-auth/react";
import PWAInstall from "./PWAInstall";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <PWAInstall />
    </SessionProvider>
  );
}
