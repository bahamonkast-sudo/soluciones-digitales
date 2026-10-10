// Ajustes locales del navegador (estructura v1: la API key vive solo en localStorage
// del usuario y viaja únicamente a su propio backend. GROQ_API_KEY en .env tiene prioridad).
const GROQ_KEY = "tuconsultor_groq_key";

export function getGroqKey(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(GROQ_KEY);
    return v && v.trim() ? v.trim() : null;
  } catch {
    return null;
  }
}

export function saveGroqKey(k: string) {
  if (typeof window !== "undefined") localStorage.setItem(GROQ_KEY, k.trim());
}

export function clearGroqKey() {
  if (typeof window !== "undefined") localStorage.removeItem(GROQ_KEY);
}
