// Agente conversacional del diagnóstico: pregunta → respuesta → solución corta.
// Sin rigidez: entiende texto libre (sinónimos), acumula respuestas canónicas
// (el scoring y las reglas siguen intactos) y la solución expandida vive en el ebook.
import { QUESTIONS } from "./questions";
import { flashPara } from "./sflash";
import { detectNicho } from "./escucha";
import { sugerenciaPara } from "./sugerencias";

export const ORDEN = ["negocio", "nicho", "etapa", "objetivo", "canales", "origen_clientes", "flujo", "oferta_clara", "seguimiento", "resenas", "presupuesto", "cierre", "dolor", "pais"];
const OPCIONALES = new Set(["cierre", "dolor", "pais"]);
const TEXTO = new Set(["negocio", "dolor", "pais"]);

const norm = (s: string) => ` ${(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")} `;
const SIN = ["ningun", "no tengo", "nada", "aun no", "todavia no", "cero", "no hay"];
const tiene = (t: string, xs: string[]) => xs.some((k) => t.includes(k));

// Extrae el valor canónico desde texto libre. null = no se entendió.
export function extraerValor(qid: string, texto: string): any {
  const t = norm(texto);
  switch (qid) {
    case "canales": {
      const out: string[] = [];
      if (tiene(t, ["face", " fb ", "fanpage"])) out.push("facebook");
      if (tiene(t, ["insta", " ig ", "instagram"])) out.push("instagram");
      if (t.includes("tiktok")) out.push("tiktok");
      if (tiene(t, ["whatsapp", "wsp", "wpp", "wasap"])) out.push("whatsapp");
      if (tiene(t, ["web", "pagina", "sitio"])) out.push("web");
      if (tiene(t, ["google", "maps"])) out.push("google");
      if (tiene(t, ["marketplace", "market place", "mercado libre", "amazon"])) out.push("marketplace");
      if (tiene(t, ["youtube", "youtu"])) out.push("youtube");
      if (tiene(t, ["linkedin"])) out.push("linkedin");
      if (!out.length && tiene(t, SIN)) return ["ninguno"];
      return out.length ? [...new Set(out)] : null;
    }
    case "nicho": {
      const extra: Record<string, string> = { promocional: "ecommerce", calzado: "ecommerce", ropa: "ecommerce", farmacia: "salud", veterinaria: "salud", hotel: "gastronomia", bar: "gastronomia", gimnasio: "servicios_local", joyeria: "ecommerce", libreria: "ecommerce" };
      for (const k of Object.keys(extra)) if (t.includes(k)) return extra[k];
      return detectNicho(texto)?.nichoId || null;
    }
    case "etapa": {
      if (tiene(t, ["casa", "pequeno", "pequena", "emprendo", "localito", "negocito"])) return "emprendedor";
      if (tiene(t, ["empez", "apenas", "idea", "aun no facturo"])) return "idea";
      if (tiene(t, ["estable", "equipo", "anos", "consolid"])) return "estable";
      if (tiene(t, ["crec", "operando", "expand"])) return "creciendo";
      return null;
    }
    case "objetivo": {
      if (tiene(t, ["validar", "probar", "idea"])) return "validar";
      if (tiene(t, ["escalar", "crecer", "expandir"])) return "escalar";
      if (tiene(t, ["ventas", "vender mas", "facturar"])) return "ventas";
      if (tiene(t, ["cliente", "conseguir", "atraer"])) return "clientes";
      return null;
    }
    case "origen_clientes": {
      const out: string[] = [];
      if (tiene(t, ["conocido", "familia", "amigo", "voz", "recomen", "referido", "boca"])) out.push("conocidos");
      if (tiene(t, ["google", "buscan", "maps"])) out.push("google");
      if (tiene(t, ["redes", "instagram", "facebook", "tiktok", "publico"])) out.push("redes");
      if (tiene(t, ["pasan", "calle", "local", "vitrina", "caminan"])) out.push("paso");
      if (!out.length && (tiene(t, ["nadie", "no llegan", "no hay", "ninguno", "casi no"]) || tiene(t, SIN))) return ["ninguno"];
      return out.length ? [...new Set(out)] : null;
    }
    case "flujo": {
      if (tiene(t, ["muy poco", "nada", "casi no", "muert", "cero", "nadie"])) return "muy_bajo";
      if (tiene(t, ["irregular", "altibajos", "temporada", "a veces", "poco"])) return "irregular";
      if (tiene(t, ["crec", "cada vez", "aument"])) return "creciendo";
      if (tiene(t, ["bien", "estable", "normal", "constante"])) return "estable";
      return null;
    }
    case "oferta_clara": {
      if (tiene(t, ["mas o menos", "masomenos", "regular"])) return "maso";
      if (tiene(t, ["si ", "si,", "claro", "entienden", "obvio"])) return "si";
      if (t.includes("no") || tiene(t, ["confusa", "nadie entiende"])) return "no";
      return null;
    }
    case "seguimiento": {
      if (tiene(t, ["siempre", "sistema", "crm", "les escribo", "seguimiento si"])) return "sistematico";
      if (tiene(t, ["veces", "cuando me acuerdo"])) return "aveces";
      if (tiene(t, ["no", "nunca", "se pierden", "olvido"])) return "no";
      return null;
    }
    case "resenas": {
      if (tiene(t, ["mala", "queja", "una estrella", "pesimas"])) return "malas";
      if (tiene(t, ["buena", "muchas", "5 estrellas", "excelentes"])) return "muchas_buenas";
      if (tiene(t, ["poca", "algunas", "2 ", "3 "])) return "pocas";
      if (tiene(t, SIN) || t.includes(" no ")) return "ninguna";
      return null;
    }
    case "presupuesto": {
      if (tiene(t, ["gratis", "nada", "cero", "no tengo", " 0 "])) return "cero";
      const m = texto.replace(/[^0-9]/g, " ").split(/\s+/).map(Number).filter((n) => n > 0);
      if (m.length) { const v = Math.max(...m); return v < 100 ? "bajo" : v <= 500 ? "medio" : "alto"; }
      if (tiene(t, ["poco", "barato", "bajo"])) return "bajo";
      if (tiene(t, ["medio", "moderado"])) return "medio";
      if (tiene(t, ["alto", "bastante", "todo lo necesario"])) return "alto";
      return null;
    }
    case "cierre": {
      if (tiene(t, ["whatsapp", "wsp", "chat"])) return "whatsapp";
      if (tiene(t, ["llamada", "telefono", "celular"])) return "llamada";
      if (tiene(t, ["zoom", "meet", "video"])) return "zoom";
      if (tiene(t, ["web", "pagina", "automat", "tienda online", "carrito"])) return "web";
      if (tiene(t, ["dm", "directo", "inbox", "mensaje de insta"])) return "dm";
      if (tiene(t, ["presencial", "local", "tienda fisica", "visita", "mostrador"])) return "presencial";
      return null;
    }
    default: return null;
  }
}

export const preguntaDe = (qid: string) => QUESTIONS.find((x) => x.id === qid)!;
export const siguienteMeta = (answers: Record<string, any>): string | null =>
  ORDEN.find((id) => !(id in answers)) || null;
export const respondidas = (answers: Record<string, any>): number =>
  ORDEN.filter((id) => id in answers).length;

// Solución CORTA (chat) desde los motores existentes. La expandida vive en el ebook.
export function solucionCorta(qid: string, val: any): { titulo: string; texto: string } | null {
  const fl = flashPara(qid, val);
  if (fl) return { titulo: `⚡ ${fl.titulo}`, texto: `${fl.pasos[0]} Te guardo todos los pasos + texto listo en tu plan. ✅` };
  const tip = qid && val !== undefined ? sugerenciaPara(qid, val) : null;
  if (tip) return { titulo: `💡 ${tip.titulo}`, texto: tip.accion ? `${tip.texto} 👉 ${tip.accion}` : tip.texto };
  return null;
}

// ── Voz humana: acuses variados + puentes que hilan la conversación ──
const ACUSES = ["¡Buen dato! Anotado. 👍", "Listo, esto me sirve mucho. ✅", "Perfecto, ya voy armando tu mapa. 🧩", "Entendido, gracias por la honestidad. 🤝", "Anotado, esto pesa en tu diagnóstico. 📌", "¡Excelente! Seguimos sumando. 💪"];
const PUENTES = ["Ahora cuéntame esto, es cortita:", "Seguimos con esta:", "Para afinar tu plan, dime:", "Ya casi: ahora necesito saber esto:"];
const pick = (arr: string[], semilla: string) => arr[(semilla.length + semilla.charCodeAt(0) * 7) % arr.length];

export function acuseHumano(answers: Record<string, any>, message: string, meta: string | null): string {
  if (meta === "negocio") {
    const corto = message.trim().split(/\s+/).slice(0, 6).join(" ");
    return `¡${corto[0].toUpperCase() + corto.slice(1)}! Ya tengo tu punto de partida. 🧭`;
  }
  return pick(ACUSES, message + (meta || ""));
}
const puenteHumano = (semilla: string) => pick(PUENTES, semilla);

// Compone el turno completo en local: refleja LO DICHO + pregunta hilada.
export function mensajeLocal(answers: Record<string, any>, message: string, metaResp: string | null, valorTxt: string, siguiente: string | null): string {
  if (!siguiente) return `${acuseHumano(answers, message, metaResp)} 🎯 ¡Mapa completo! Ya puedo armarte tu diagnóstico 360°. ¿Lo vemos?`;
  const q = preguntaDe(siguiente);
  const puente = puenteHumano(message + siguiente);
  const guia = q.kind === "texto" ? ` ${q.ejemplo}` : " Toca una opción o escríbeme con tus palabras. 👇";
  const reflejo = metaResp === "negocio"
    ? acuseHumano(answers, message, metaResp)
    : `¡${valorTxt.length > 70 ? valorTxt.slice(0, 70) + "…" : valorTxt}! ${pick(["Anotado, me sirve mucho. ✅", "Listo, queda en tu ficha. 📌", "Perfecto, seguimos. 💪"], message + (metaResp || ""))}`;
  return `${reflejo} ${puente} ${q.titulo}${guia}`;
}

// Turno 100% local (sin IA): extrae, acumula y decide la siguiente meta.
export function turnoLocal(answers: Record<string, any>, message: string): {
  patch: Record<string, any>; acuse: string; solucion: { titulo: string; texto: string } | null;
  siguiente: string | null; aclarar: boolean;
} {
  const meta = siguienteMeta(answers);
  if (!meta) return { patch: {}, acuse: "Con esto ya tengo tu mapa completo. 🎯", solucion: null, siguiente: null, aclarar: false };
  const texto = message.trim();
  const tOmit = norm(texto);
  if (tOmit.includes("omitir") || tOmit.includes("saltar") || tOmit.includes("saltar")) {
    if (OPCIONALES.has(meta)) {
      const patch = { [meta]: "" };
      return { patch, acuse: "Sin problema, seguimos. 👍", solucion: null, siguiente: siguienteMeta({ ...answers, ...patch }), aclarar: false };
    }
    return { patch: {}, acuse: "Esta me ayuda mucho a ayudarte — ¿la intentamos con tus palabras? 🙏", solucion: null, siguiente: meta, aclarar: true };
  }
  // Texto libre en metas de texto: se guarda tal cual.
  if (TEXTO.has(meta)) {
    const patch: Record<string, any> = { [meta]: texto };
    // Si en "negocio" se detecta nicho claro, se pre-rellena (confirmable).
    if (meta === "negocio") {
      const det = detectNicho(texto);
      if (det?.nichoId) patch["nicho"] = det.nichoId;
    }
    const sol = solucionCorta(meta, texto) || (meta === "negocio" && (patch as any).nicho ? solucionCorta("nicho", (patch as any).nicho) : null);
    return { patch, acuse: meta === "negocio" && (patch as any).nicho ? `Anotado. Creo que tu nicho va por ahí — si me equivoco, dímelo y lo corrijo. 👍` : "Anotado, gracias por contarlo así. 🤝", solucion: sol, siguiente: siguienteMeta({ ...answers, ...patch }), aclarar: false };
  }
  const val = extraerValor(meta, texto);
  if (val === null || val === undefined) {
    return { patch: {}, acuse: "Mmm, no te entendí bien — elige una opción para no suponer nada 👇", solucion: null, siguiente: meta, aclarar: true };
  }
  const patch = { [meta]: val };
  return { patch, acuse: "Perfecto, queda registrado. ✅", solucion: solucionCorta(meta, val), siguiente: siguienteMeta({ ...answers, ...patch }), aclarar: false };
}

export const etiquetaValor = (qid: string, val: any): string => {
  const q = preguntaDe(qid);
  if (Array.isArray(val)) return val.map((v) => q.options?.find((o) => o.value === v)?.label || v).join(", ");
  return q.options?.find((o) => o.value === val)?.label || String(val ?? "");
};
