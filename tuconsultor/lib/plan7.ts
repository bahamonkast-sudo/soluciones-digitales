// Plan de 7 días: convierte el diagnóstico en micro-compromisos accionables.
// Cada tarea: 15–40 min, con KPI y solución asociada. Progreso en localStorage.
import { RuleHit } from "./rules";
import { SOLUTIONS } from "./solutions";

export interface DayTask { dia: number; titulo: string; detalle: string; minutos: number; solucion?: string; kpi?: string }

const PLANTILLAS: Record<string, { titulo: string; detalle: string; minutos: number }> = {
  google_business: { titulo: "Crea o completa tu ficha de Google", detalle: "Categoría, horarios, fotos, servicios y enlace a WhatsApp.", minutos: 40 },
  resenas: { titulo: "Pide tus primeras 5 reseñas", detalle: "Escribe a tus 5 mejores clientes con el enlace directo a reseñas.", minutos: 20 },
  whatsapp: { titulo: "Profesionaliza tu WhatsApp", detalle: "Perfil empresa + catálogo + mensajes de bienvenida y ausencia + etiquetas.", minutos: 40 },
  catalogo: { titulo: "Arma tu catálogo con botón a WhatsApp", detalle: "Foto real, precio claro y descripción de 1 línea por producto.", minutos: 40 },
  contenido: { titulo: "Publica tu primer contenido que enseña", detalle: "Responde en video/texto la pregunta que más te hacen. 70% educar, 20% prueba, 10% venta.", minutos: 30 },
  crm: { titulo: "Abre tu pipeline simple", detalle: "Columnas: Nuevo → En conversación → Seguimiento → Cerrado. Mueve cada contacto.", minutos: 30 },
  automatizacion: { titulo: "Automatiza 1 seguimiento", detalle: "Mensaje a 24h para el que preguntó y no compró. Con permiso, sin spam.", minutos: 25 },
  landing: { titulo: "Define tu oferta en 5 segundos", detalle: "Una oferta, un botón. Resultado + plazo + cómo pedirlo.", minutos: 30 },
  analitica: { titulo: "Define tus 3 KPIs", detalle: "Contactos/semana, % seguimiento <24h, conversión a venta. Anótalos cada viernes.", minutos: 20 },
  instagram: { titulo: "Optimiza tu bio + destacados", detalle: "Qué haces, para quién, prueba social y botón de contacto.", minutos: 25 },
};

export function buildPlan7(rules: RuleHit[]): DayTask[] {
  const ahora = rules.filter((r) => r.priority === "ahora").flatMap((r) => r.solutions);
  const proximo = rules.filter((r) => r.priority === "proximo").flatMap((r) => r.solutions);
  const uniq: string[] = [...ahora, ...proximo].filter((s, i, a) => a.indexOf(s) === i && SOLUTIONS.some((x) => x.solution_id === s));
  const tasks: DayTask[] = uniq.slice(0, 6).map((solId, i) => {
    const sol = SOLUTIONS.find((x) => x.solution_id === solId)!;
    const p = PLANTILLAS[solId] || { titulo: `Avanza en ${sol.name}`, detalle: sol.when_to_use, minutos: 30 };
    return { dia: i + 1, titulo: p.titulo, detalle: p.detalle, minutos: p.minutos, solucion: sol.name, kpi: sol.kpis[0] };
  });
  while (tasks.length < 6) tasks.push({ dia: tasks.length + 1, titulo: "Refuerza tu seguimiento", detalle: "Re-escribe a 3 contactos que no cerraron. El dinero está en el seguimiento.", minutos: 20, solucion: "Seguimiento", kpi: "% rescates" });
  tasks.push({ dia: 7, titulo: "Mide tu semana", detalle: "Contactos, respuestas <1h, seguimientos hechos, ventas y reseñas nuevas. Decide el próximo paso.", minutos: 20, solucion: "Medición", kpi: "Tablero semanal" });
  return tasks;
}

const PKEY = "tuconsultor_plan7_v1";
export function loadPlanDone(): number[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(PKEY) || "[]"); } catch { return []; }
}
export function togglePlanDone(dia: number, extra?: string): number[] {
  const key = extra ? `${extra}#${dia}` : dia;
  let cur: any[] = loadPlanDone() as any[];
  cur = cur.includes(key) ? cur.filter((d) => d !== key) : [...cur, key];
  try { localStorage.setItem(PKEY, JSON.stringify(cur)); } catch { /* noop */ }
  return cur as number[];
}
