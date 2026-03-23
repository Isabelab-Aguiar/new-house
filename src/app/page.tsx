"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/home/AboutSection";
import CountdownSection from "@/components/home/CountdownSection";
import EventInfoSection from "@/components/home/EventInfoSection";
import GiftsPreviewSection from "@/components/home/GiftsPreviewSection";
import Footer from "@/components/home/Footer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  if (status === "loading") return <LoadingSpinner />;
  if (status === "unauthenticated") return null;

  return (
    <main style={{ background: "var(--nude-100)" }}>
      <Header />
      <Hero />
      <AboutSection />
      <CountdownSection />
      <GiftsPreviewSection />
      <EventInfoSection />
      <Footer />
    </main>
  );
}
