// Ebook: plan de crecimiento (corto / mediano / largo plazo) PERSONALIZADO.
//
// Estructura: UN DOLOR = UNA PREGUNTA = UNA SECCIÓN.
// Cada dolor se lee según la respuesta real del usuario y se desarrolla
// completo: qué mide, por qué ocurre, qué cuesta, señales, cómo se resuelve,
// qué evitar, KPIs, soluciones reales del catálogo, teoría verificada,
// fuentes oficiales y vídeo. Nada genérico.
import { RuleHit } from "./rules";
import { Answers, Scores, scoreAnswers } from "./scoring";
import { SOLUTIONS, COST_LABEL } from "./solutions";
import { Video, videoParaSolucion, videoParaFactor, videosPara } from "./videos";
import { FACTORES } from "./factors";
import { retrieveKnowledge } from "./knowledge";
import { DOLORES, ESTADO_META, leerDolor } from "./dolores";
import type { DolorEstado, DolorDef } from "./dolores";

// ---------------------------------------------------------------------------
// Tipos del ebook
// ---------------------------------------------------------------------------
export interface EbookItem { titulo: string; detalle: string; costo: string; tiempo: string; video: Video | null; fuentes: { titulo: string; url?: string }[] }
export interface EbookFase { titulo: string; rango: string; items: EbookItem[] }
export interface EbookCuello { factor: string; score: number; mensaje: string; video: Video | null }
export interface EbookRespuesta { dolor: string; fase: string; prioridad: string; video: Video | null }

/** Una solución del catálogo, ya lista para imprimir. */
export interface EbookSolucion {
  id: string;
  name: string;
  description: string;
  costo: string;
  tiempo: string;
  dificultad: string;
  cuandoUsar: string;
  cuandoNo: string;
  resultados: string;
  condiciones: string[];
  kpis: string[];
  ejemplo: string;
  fuentes: { titulo: string; url?: string }[];
  video: Video | null;
}

export interface EbookTeoria { titulo: string; resumen: string; tipo: string; url?: string }

/** Una sección completa del ebook: un dolor del negocio. */
export interface EbookDolor {
  id: string;
  orden: number;
  momento: string;
  pregunta: string;
  porQue: string;
  /** La respuesta del usuario, en lenguaje humano. */
  respuesta: string;
  estado: DolorEstado;
  estadoLabel: string;
  /** Lectura personalizada de SU respuesta. */
  diagnostico: string;
  sinDatos: boolean;
  factor: { n: number; nombre: string; descripcion: string; score: number; peso: number } | null;
  queMedimos: string;
  causas: string[];
  efectos: string[];
  senales: string[];
  practicas: string[];
  evitar: string[];
  kpis: string[];
  siguientePaso: string;
  noAplica?: string;
  fase: string;
  soluciones: EbookSolucion[];
  teoria: EbookTeoria[];
  fuentes: { titulo: string; url: string }[];
  video: Video | null;
}

export interface EbookIndice { id: string; orden: number; momento: string; pregunta: string; estado: DolorEstado; estadoLabel: string }

export interface EbookData {
  negocio: string; fecha: string; salud: number; sub?: string;
  cuellos: EbookCuello[];
  perdidaMensual: number | null;
  respuestas: EbookRespuesta[];
  fases: EbookFase[];
  kpis: string[];
  noNecesitas: { name: string; reason: string }[];
  // --- Nuevo: el corazón del ebook -----------------------------------------
  dolores: EbookDolor[];
  indice: EbookIndice[];
  resumenDolores: { total: number; criticos: number; alertas: number; bien: number; contexto: number };
}

// ---------------------------------------------------------------------------
// Utilidades internas
// ---------------------------------------------------------------------------
const FASE_NOMBRE: Record<RuleHit["priority"], string> = {
  ahora: "Corto plazo",
  proximo: "Mediano plazo",
  despues: "Largo plazo",
};

/** Ordena las prioridades para saber cuál manda. */
const PESO_PRIORIDAD: Record<RuleHit["priority"], number> = { ahora: 0, proximo: 1, despues: 2 };

function solucionImprimible(id: string): EbookSolucion | null {
  const s = SOLUTIONS.find((x) => x.solution_id === id);
  if (!s) return null;
  return {
    id: s.solution_id,
    name: s.name,
    description: s.description,
    costo: COST_LABEL[s.cost_level],
    tiempo: s.implementation_time,
    dificultad: s.difficulty,
    cuandoUsar: s.when_to_use,
    cuandoNo: s.when_not_to_use,
    resultados: s.expected_results,
    condiciones: s.required_conditions,
    kpis: s.kpis,
    ejemplo: s.examples[0] || "",
    fuentes: (s.sources || []).map((f) => ({ titulo: f.titulo, url: f.url })),
    video: videoParaSolucion(s.solution_id),
  };
}

/** Fuentes oficiales del dolor: las de sus soluciones + las de su teoría. */
function fuentesDelDolor(sols: EbookSolucion[], teoria: EbookTeoria[]): { titulo: string; url: string }[] {
  const out: { titulo: string; url: string }[] = [];
  const vistos = new Set<string>();
  const push = (titulo: string, url?: string) => {
    if (!url || vistos.has(url)) return;
    vistos.add(url);
    out.push({ titulo, url });
  };
  sols.forEach((s) => s.fuentes.forEach((f) => push(f.titulo, f.url)));
  teoria.forEach((t) => push(t.titulo, t.url));
  return out.slice(0, 5);
}

// ---------------------------------------------------------------------------
// Constructor del ebook
// ---------------------------------------------------------------------------
export function buildEbook(input: {
  negocio: string; salud: number;
  cuellos: { factor: string; score: number; mensaje: string }[];
  rules: RuleHit[];
  contactos?: number; ticket?: number; convActual?: number; sub?: string;
  /** Respuestas reales de la sesión: alimentan las secciones por dolor. */
  answers?: Answers;
  /** Puntuaciones ya calculadas (si no, se recalculan desde las respuestas). */
  scores?: Scores;
}): EbookData {
  const answers: Answers = input.answers || {};
  const scores: Scores = input.scores || scoreAnswers(answers);

  const solOf = (id: string) => SOLUTIONS.find((s) => s.solution_id === id);
  const fase = (titulo: string, rango: string, priority: RuleHit["priority"]): EbookFase => ({
    titulo, rango,
    items: input.rules.filter((r) => r.priority === priority).slice(0, 3).flatMap((r) =>
        r.solutions.map((id) => {
          const s = solOf(id);
          return s
            ? { titulo: `${r.need} → ${s.name}`, detalle: `${s.description} Condición: ${s.required_conditions.join("; ") || s.when_to_use}`, costo: COST_LABEL[s.cost_level], tiempo: s.implementation_time, video: videoParaSolucion(id), fuentes: (s.sources || []).filter((f) => f.tipo === "oficial").slice(0, 2).map((f) => ({ titulo: f.titulo, url: f.url })) }
            : { titulo: r.need, detalle: r.reason, costo: "—", tiempo: "—", video: null, fuentes: [] };
        }).slice(0, 4)),
  });

  const cuelloConVideo = (c: { factor: string; score: number; mensaje: string }): EbookCuello => {
    const fid = FACTORES.find((f) => f.nombre === c.factor)?.id;
    return { ...c, video: fid ? videoParaFactor(fid) : null };
  };

  let perdidaMensual: number | null = null;
  if (input.contactos && input.ticket && input.convActual != null && input.contactos > 0) {
    const cerrar = (c: number) => (input.contactos! * Math.min(90, c)) / 100 * input.ticket!;
    perdidaMensual = Math.max(0, Math.round(cerrar(input.convActual + 10) - cerrar(input.convActual)));
  }

  // --- Secciones por dolor: una por cada pregunta respondida ----------------
  const dolores: EbookDolor[] = [];
  for (const def of DOLORES) {
    const lect = leerDolor(def, answers[def.id]);
    // Solo mostramos lo que la persona respondió: un ebook con preguntas
    // vacías es ruido, no diagnóstico.
    if (lect.sinDatos) continue;

    const factorDef = def.factorId ? FACTORES.find((f) => f.id === def.factorId) || null : null;
    const sols = def.soluciones.map(solucionImprimible).filter((s): s is EbookSolucion => Boolean(s));
    const teoria: EbookTeoria[] = retrieveKnowledge(def.tags, 3).map((d) => ({ titulo: d.titulo, resumen: d.resumen, tipo: d.tipo, url: d.url }));

    // Fase según la regla más urgente que toque alguna de sus soluciones.
    const tocadas = input.rules.filter((r) => r.solutions.some((id) => def.soluciones.includes(id)));
    const faseTxt = tocadas.length
      ? FASE_NOMBRE[tocadas.sort((a, b) => PESO_PRIORIDAD[a.priority] - PESO_PRIORIDAD[b.priority])[0].priority]
      : lect.estado === "critico" ? "Corto plazo" : lect.estado === "alerta" ? "Mediano plazo" : "Largo plazo";

    dolores.push({
      id: def.id,
      orden: def.orden,
      momento: def.momento,
      pregunta: def.pregunta,
      porQue: def.porQue,
      respuesta: lect.respuesta,
      estado: lect.estado,
      estadoLabel: ESTADO_META[lect.estado].label,
      diagnostico: lect.diagnostico,
      sinDatos: false,
      factor: factorDef ? { n: factorDef.n, nombre: factorDef.nombre, descripcion: factorDef.descripcion, score: scores[factorDef.id] ?? 50, peso: factorDef.peso } : null,
      queMedimos: def.queMedimos,
      causas: def.causas,
      efectos: def.efectos,
      senales: def.senales,
      practicas: def.practicas,
      evitar: def.evitar,
      kpis: def.kpis,
      siguientePaso: def.siguientePaso,
      noAplica: def.noAplica,
      fase: faseTxt,
      soluciones: sols,
      teoria,
      fuentes: fuentesDelDolor(sols, teoria),
      video: sols.find((s) => s.video)?.video || (def.factorId ? videoParaFactor(def.factorId) : null) || videosPara(def.soluciones, 1)[0] || null,
    });
  }

  const indice: EbookIndice[] = dolores.map((d) => ({
    id: d.id, orden: d.orden, momento: d.momento, pregunta: d.pregunta, estado: d.estado, estadoLabel: d.estadoLabel,
  }));

  const cuenta = (e: DolorEstado) => dolores.filter((d) => d.estado === e).length;
  const resumenDolores = {
    total: dolores.length,
    criticos: cuenta("critico"),
    alertas: cuenta("alerta"),
    bien: cuenta("bien"),
    contexto: cuenta("contexto"),
  };

  // --- Lo que NO necesitas todavía ----------------------------------------
  const matched = new Set<string>([
    ...input.rules.flatMap((r) => r.solutions),
    ...dolores.flatMap((d) => d.soluciones.map((s) => s.id)),
  ]);
  const noNecesitas = SOLUTIONS.filter((s) => !matched.has(s.solution_id))
    .sort((a, b) => ({ avanzado: 0, medio: 1, bajo: 2, gratis: 3 }[a.cost_level] - { avanzado: 0, medio: 1, bajo: 2, gratis: 3 }[b.cost_level]))
    .slice(0, 3).map((s) => ({ name: s.name, reason: s.when_not_to_use }));

  const respuestas: EbookRespuesta[] = dolores.map((d) => ({
    dolor: d.pregunta,
    fase: d.fase,
    prioridad: d.estado === "critico" ? "ahora" : d.estado === "alerta" ? "proximo" : "despues",
    video: d.video,
  }));

  return {
    negocio: input.negocio || "tu negocio",
    fecha: new Date().toLocaleDateString("es"),
    salud: input.salud,
    sub: input.sub,
    cuellos: input.cuellos.slice(0, 3).map(cuelloConVideo),
    perdidaMensual,
    respuestas,
    fases: [fase("Corto plazo: frenar la fuga", "Corto plazo", "ahora"), fase("Mediano plazo: construir flujo", "Mediano plazo", "proximo"), fase("Largo plazo: escalar lo que mida bien", "Largo plazo", "despues")],
    kpis: ["Contactos/semana", "Tiempo de respuesta", "% seguimiento <24h", "Reseñas nuevas", "Conversión a venta", "Recompra"],
    noNecesitas,
    dolores,
    indice,
    resumenDolores,
  };
}

export type { DolorDef };
