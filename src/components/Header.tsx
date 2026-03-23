"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
const navLinks = [
  { href: "/", label: "Início" },
  { href: "/presentes", label: "Presentes" },
  { href: "/confirmacao", label: "Confirmar" },
  { href: "/galeria", label: "Galeria" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#FAF7F2]/95 backdrop-blur-xl shadow-[0_1px_20px_rgba(107,68,35,0.08)] border-b border-[#EDE3D4]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B5E3C] to-[#C4956A] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-[#FDFAF6] text-sm font-light" style={{ fontFamily: "var(--font-playfair)" }}>
                  I&R
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-[#A67C52] tracking-[3px] uppercase font-medium leading-none mb-0.5">
                  Chá de Casa Nova
                </p>
                <p
                  className="text-base text-[#2C1A0E] font-medium leading-none"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Isabella & Rafael
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      active
                        ? "text-[#6B4423] bg-[#F5EFE6]"
                        : "text-[#5C3D2E] hover:text-[#6B4423] hover:bg-[#F5EFE6]/60"
                    }`}
                  >
                    {label}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#8B5E3C]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              {session?.user && (
                <div className="hidden md:flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EFE6] border border-[#EDE3D4]">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || ""}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-[#C4956A] flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {session.user.name?.[0]?.toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="text-sm text-[#5C3D2E] font-medium max-w-[100px] truncate">
                      {session.user.name?.split(" ")[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#8B5E3C] hover:text-[#6B4423] hover:bg-[#F5EFE6] rounded-full transition-all border border-transparent hover:border-[#EDE3D4]"
                  >
                    Sair
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[#F5EFE6] text-[#6B4423] hover:bg-[#EDE3D4] transition-colors"
                aria-label="Menu"
              >
                {menuOpen ? <span className="text-lg leading-none">×</span> : <span className="text-lg leading-none">≡</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#2C1A0E]/30 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#FDFAF6] shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6">
            {session?.user && (
              <div className="flex items-center gap-3 p-4 bg-[#F5EFE6] rounded-2xl mb-6">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || ""}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#C4956A] flex items-center justify-center">
                    <span className="text-white font-medium">
                      {session.user.name?.[0]?.toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-[#2C1A0E]">{session.user.name}</p>
                  <p className="text-xs text-[#A67C52]">{session.user.email}</p>
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-2 flex-1">
              {navLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      active
                        ? "bg-[#8B5E3C] text-white"
                        : "text-[#5C3D2E] hover:bg-[#F5EFE6]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {session?.user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#8B5E3C] hover:bg-[#F5EFE6] transition-all mt-auto"
              >
                Sair da conta
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
