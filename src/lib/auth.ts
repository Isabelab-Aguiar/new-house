// Simple guest authentication
// In production, replace with a real auth solution (NextAuth, Supabase, etc.)

export const GUEST_CODES: Record<string, string> = {
  "ISABELLA2024": "Isabella Aguiar",
  "RAFAEL2024": "Rafael Oliveira",
  "FAMILIA01": "Família Silva",
  "FAMILIA02": "Família Costa",
  "AMIGOS01": "Turma da Faculdade",
  "AMIGOS02": "Amigos do Trabalho",
  "VIZINHOS": "Vizinhos",
  "CONVIDADO": "Convidado Especial",
};

export function validateGuestCode(code: string): string | null {
  const normalized = code.toUpperCase().trim();
  return GUEST_CODES[normalized] || null;
}

export function setGuestSession(name: string, code: string) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("guest_name", name);
    sessionStorage.setItem("guest_code", code);
    sessionStorage.setItem("authenticated", "true");
  }
}

export function getGuestSession(): { name: string; authenticated: boolean } {
  if (typeof window === "undefined") {
    return { name: "", authenticated: false };
  }
  const authenticated = sessionStorage.getItem("authenticated") === "true";
  const name = sessionStorage.getItem("guest_name") || "";
  return { name, authenticated };
}

export function clearGuestSession() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("guest_name");
    sessionStorage.removeItem("guest_code");
    sessionStorage.removeItem("authenticated");
  }
}
