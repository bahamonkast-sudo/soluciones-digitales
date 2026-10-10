// AGENTE DATOS — modelo de sesión, persistencia local, informe.
export interface Session {
  perfil: { negocio: string; sector: string; etapa: string; objetivo: string; presupuesto?: string; mercado?: string };
  answers: Record<string, any>;
  scores?: Record<string, number>;
  createdAt: string;
}
const KEY = "tuconsultor_session_v1";
export function saveSession(s: Session) { if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(s)); }
export function loadSession(): Session | null {
  if (typeof window === "undefined") return null;
  try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
export function clearSession() { if (typeof window !== "undefined") localStorage.removeItem(KEY); }
