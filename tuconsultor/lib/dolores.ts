// AGENTE DOLORES — cada PREGUNTA hecha al usuario es un "dolor" con su propia
// sección del ebook. Nada de listas planas: cada dolor se lee, se interpreta,
// se explica (causa → efecto → señal), se resuelve con soluciones REALES del
// catálogo y se mide con KPIs. El contenido vive en ./dolores/p1..p3.
import type { FactorId } from "./factors";
import { FACTORES } from "./factors";
import { QUESTIONS } from "./questions";
import { P1 } from "./dolores/p1";
import { P2 } from "./dolores/p2";
import { P3 } from "./dolores/p3";

export type DolorEstado = "critico" | "alerta" | "bien" | "contexto";

/** Lectura de UNA respuesta concreta (p. ej. "no", "nunca", "varios"). */
export interface DolorOpcion {
  value: string;
  estado: DolorEstado;
  diagnostico: string;
}

export interface DolorDef {
  /** Clave exacta en `answers` de la sesión. */
  id: string;
  /** Orden canónico dentro del ebook. */
  orden: number;
  /** Momento del flujo: Conocerte · Descubrimiento · Confianza · Ventas · Estrategia. */
  momento: string;
  /** La pregunta, literal, tal como se le hizo al usuario. */
  pregunta: string;
  /** Por qué importa esa pregunta (del propio flujo). */
  porQue: string;
  /** Factor del diagnóstico 360° que esta pregunta mide (null = contexto). */
  factorId: FactorId | null;
  /** Cómo leer la respuesta. Por defecto "valor". */
  modo?: "valor" | "array" | "texto";
  /** Para modo "array": qué heurística de presencia aplicar. */
  claveArray?: "canales" | "origen_clientes";
  /** Para modo "texto": longitud mínima para considerarla respuesta útil. */
  textoOkLargo?: number;

  // --- Contenido amplio y completo del dolor -----------------------------
  /** Qué mide exactamente esta pregunta. */
  queMedimos: string;
  /** Por qué ocurre (causas típicas y verificables). */
  causas: string[];
  /** Qué le cuesta al negocio mientras sigue así. */
  efectos: string[];
  /** Cómo saber si te está pasando. */
  senales: string[];
  /** Cómo se resuelve, en pasos concretos. */
  practicas: string[];
  /** Qué NO hacer en este punto (evita quemar dinero o reputación). */
  evitar: string[];
  /** Indicadores para saber si mejora. */
  kpis: string[];
  /** solution_id reales del catálogo (lib/solutions.ts). */
  soluciones: string[];
  /** Etiquetas para recuperar teoría verificada de lib/knowledge.ts. */
  tags: string[];
  /** Acción inmediata, concreta, para hoy. */
  siguientePaso: string;
  /**
   * Marco de diagnóstico al que pertenece la pregunta. Metodología adaptada
   * de la cadena de seis marcos (PEST · 5 Fuerzas · 7S · VRIO · Cadena de
   * Valor · SWOT) usada en diagnóstico empresarial profesional.
   */
  marco?: string;
  /**
   * Qué suele limitar exactamente a las empresas aquí. Es el "por qué" del
   * sector, no una opinión: se muestra junto a la pregunta y a la solución.
   */
  limita?: string;
  /** Cuándo este dolor NO aplica (honestidad: no vender lo que no toca). */
  noAplica?: string;
  /** Lecturas posibles, indexadas por la clave resuelta. */
  opciones: DolorOpcion[];
}

export const DOLORES: DolorDef[] = [...P1, ...P2, ...P3].sort((a, b) => a.orden - b.orden);
export const dolorById = (id: string) => DOLORES.find((d) => d.id === id) || null;

export interface DolorLectura {
  clave: string;
  estado: DolorEstado;
  diagnostico: string;
  /** La respuesta del usuario, en lenguaje humano. */
  respuesta: string;
  /** true cuando la pregunta quedó sin responder en esta sesión. */
  sinDatos: boolean;
}

/** Etiqueta humana de una opción, reutilizando los textos del propio flujo. */
export function labelDe(qid: string, value: string): string {
  const q = QUESTIONS.find((x) => x.id === qid);
  const o = q?.options?.find((x) => x.value === value);
  return o?.label || value;
}

function claveArrayDe(kind: "canales" | "origen_clientes", vals: string[]): string {
  const set = new Set(vals);
  if (kind === "canales") {
    if (set.size === 0 || set.has("ninguno")) return "ninguno";
    return set.size >= 3 ? "varios" : "pocos";
  }
  if (set.has("ninguno")) return "ninguno";
  const digital = set.has("google") || set.has("redes");
  const referidos = set.has("conocidos") || set.has("referidos");
  if (digital && referidos) return "mixto";
  if (digital) return "digital";
  if (referidos) return "solo_conocidos";
  return "local";
}

/** Resuelve qué lectura corresponde a la respuesta real del usuario. */
export function leerDolor(def: DolorDef, raw: unknown): DolorLectura {
  const vacio =
    raw === undefined ||
    raw === null ||
    raw === "" ||
    (Array.isArray(raw) && raw.length === 0);

  if (vacio) {
    return {
      clave: "sin_datos",
      estado: "contexto",
      diagnostico:
        def.noAplica ||
        "No registramos respuesta para esta pregunta en tu sesión, así que no la puntuamos. Si te reconoces aquí, vale la pena medirla.",
      respuesta: "Sin respuesta registrada",
      sinDatos: true,
    };
  }

  const modo = def.modo || "valor";
  let clave: string;
  let respuesta: string;

  if (modo === "array") {
    const vals = (Array.isArray(raw) ? raw : [raw]).map(String);
    clave = claveArrayDe(def.claveArray || "canales", vals);
    respuesta = vals.map((v) => labelDe(def.id, v)).join(" · ");
  } else if (modo === "texto") {
    const t = String(raw).trim();
    clave = t.length >= (def.textoOkLargo ?? 15) ? "ok" : "corto";
    respuesta = t;
  } else {
    clave = String(raw);
    respuesta = labelDe(def.id, clave);
  }

  const op = def.opciones.find((o) => o.value === clave);
  if (op) return { clave, estado: op.estado, diagnostico: op.diagnostico, respuesta, sinDatos: false };

  // Respuesta fuera del catálogo previsto: no inventamos lectura.
  return {
    clave,
    estado: "contexto",
    diagnostico:
      "Tu respuesta no encaja en los casos que tenemos tipificados para esta pregunta, así que la dejamos como contexto y no la puntuamos.",
    respuesta,
    sinDatos: false,
  };
}

export const ESTADO_META: Record<DolorEstado, { label: string; chip: string; icono: string; texto: string }> = {
  critico: { label: "Prioridad alta", chip: "chip-bad", icono: "alert", texto: "text-red-600" },
  alerta: { label: "A mejorar", chip: "chip-warn", icono: "trend", texto: "text-gold-700" },
  bien: { label: "En buen estado", chip: "chip-good", icono: "check", texto: "text-brand-700" },
  contexto: { label: "Contexto", chip: "chip-info", icono: "bulb", texto: "text-ink-600" },
};

/** Factor asociado, o null si el dolor es de contexto. */
export function factorDe(def: DolorDef) {
  return def.factorId ? FACTORES.find((f) => f.id === def.factorId) || null : null;
}
