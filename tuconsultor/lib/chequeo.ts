// CHEQUEO DE SIGNOS VITALES: no preguntamos opiniones — MEDIMOS el estado real.
// Cada estación es una prueba que el usuario hace con su celular (contar,
// buscar, revisar) y la lectura sale de SUS números. Eso es un diagnóstico,
// no un interrogatorio.
import { flashPara, Flash } from "./sflash";

export type Estado = "bien" | "alerta" | "critico";
export interface ChequeoInput {
  id: string; tipo: "numero" | "chips" | "checks" | "texto";
  label: string; placeholder?: string;
  opciones?: { value: string; label: string }[];
}
export interface Estacion {
  id: string; emoji: string; organo: string; titulo: string; como: string;
  inputs: ChequeoInput[];
  validar: (v: Record<string, any>) => string | null;
  leer: (v: Record<string, any>) => { estado: Estado; mensaje: string };
  aRespuestas: (v: Record<string, any>, prev: Record<string, any>) => Record<string, any>;
  flashDe: (v: Record<string, any>) => Flash | null;
}

const req = (v: Record<string, any>, ...ids: string[]) =>
  ids.some((id) => v[id] === undefined || v[id] === "" || (Array.isArray(v[id]) && !v[id].length))
    ? "Completa la medición para continuar." : null;

export const ESTACIONES: Estacion[] = [
  {
    id: "ficha", emoji: "", organo: "Historia clínica", titulo: "Tu ficha en 20 segundos",
    como: "Para saber qué exigirte y qué no. Toca, sin escribir.",
    inputs: [
      { id: "nicho", tipo: "chips", label: "¿Qué vendes?", opciones: [{ value: "gastronomia", label: "Comida" }, { value: "salud", label: "Salud" }, { value: "servicios_local", label: "Servicios" }, { value: "profesionales", label: "Profesionales" }, { value: "ecommerce", label: "Productos" }, { value: "educacion", label: "Educación" }, { value: "inmobiliaria", label: "Raíces" }, { value: "multinivel", label: "Multinivel" }, { value: "otro", label: "Otro" }] },
      { id: "objetivo", tipo: "chips", label: "¿Qué necesitas?", opciones: [{ value: "clientes", label: "Clientes" }, { value: "ventas", label: "Más ventas" }, { value: "validar", label: "Validar" }, { value: "escalar", label: "Escalar" }] },
      { id: "presupuesto", tipo: "chips", label: "¿Con cuánto al mes?", opciones: [{ value: "cero", label: "🆓 $0" }, { value: "bajo", label: "Poco" }, { value: "medio", label: "Medio" }, { value: "alto", label: "Alto" }] },
      { id: "negocio", tipo: "texto", label: "Nombre de tu negocio (para tu informe)", placeholder: "Ej: Zapatería La Luz" },
      { id: "canales", tipo: "checks", label: "¿Dónde existes hoy? (marca)", opciones: [{ value: "google", label: "Google" }, { value: "facebook", label: "Facebook" }, { value: "instagram", label: "Instagram" }, { value: "tiktok", label: "TikTok" }, { value: "whatsapp", label: "WhatsApp" }, { value: "web", label: "Web" }, { value: "marketplace", label: "Marketplace" }] },
    ],
    validar: (v) => req(v, "nicho", "objetivo", "presupuesto"),
    leer: () => ({ estado: "bien", mensaje: "Ficha lista. Con esto tu plan respetará tu realidad y tu bolsillo. " }),
    aRespuestas: (v) => ({ nicho: v.nicho, objetivo: v.objetivo, presupuesto: v.presupuesto, canales: v.canales || [] }),
    flashDe: () => null,
  },
  {
    id: "visibilidad", emoji: "", organo: "Vista", titulo: "Prueba de Maps",
    como: "Abre Google en tu celular y busca lo que vendes + tu ciudad. ¿Apareces entre los primeros?",
    inputs: [{ id: "aparece", tipo: "chips", label: "Resultado de tu búsqueda", opciones: [{ value: "si", label: "Sí, aparezco" }, { value: "no", label: "No aparezco" }, { value: "nose", label: "No sé buscar eso" }] }],
    validar: (v) => req(v, "aparece"),
    leer: (v) => v.aparece === "no"
      ? { estado: "critico", mensaje: "Invisible donde la gente compra. Quien busca, le compra a tu competencia." }
      : v.aparece === "nose"
      ? { estado: "alerta", mensaje: "Si tú no sabes buscarte, tus clientes tampoco te encuentran." }
      : { estado: "bien", mensaje: "Visible en Google. Ahora verificaremos si esa vitrina convierte. " },
    aRespuestas: (v, prev) => v.aparece === "si" ? { canales: [...new Set([...(prev.canales || []), "google"])] } : {},
    flashDe: (v) => (v.aparece === "no" || v.aparece === "nose") ? flashPara("canales", ["instagram"]) : null,
  },
  {
    id: "redes", emoji: "", organo: "Pulso", titulo: "Pulso de redes",
    como: "Abre tu red principal y cuenta: ¿cuántas publicaciones hiciste en los últimos 30 días?",
    inputs: [
      { id: "posts", tipo: "numero", label: "Publicaciones últimos 30 días" },
      { id: "trae", tipo: "chips", label: "¿Esa red te trae clientes?", opciones: [{ value: "si", label: "Sí" }, { value: "no", label: "No / solo likes" }] },
    ],
    validar: (v) => req(v, "posts", "trae"),
    leer: (v) => {
      const p = +v.posts;
      if (p === 0) return { estado: "critico", mensaje: "Pulso en cero: 30 días sin publicar es invisibilidad total." };
      if (p <= 3) return { estado: "alerta", mensaje: `${p} al mes es muy lento: el algoritmo y tu audiencia te olvidan.` };
      if (v.trae === "no") return { estado: "alerta", mensaje: `Publicas (${p}) pero no vende: tienes vitrina sin caja. El problema es oferta/cierre, no cantidad.` };
      return { estado: "bien", mensaje: `Ritmo sano (${p}/mes) y trae clientes. A escalarlo. ` };
    },
    aRespuestas: (v, prev) => {
      const p = +v.posts;
      const patch: Record<string, any> = { frecuencia: p === 0 ? "nunca" : p <= 3 ? "aveces" : "semanal" };
      if (v.trae === "si") patch.origen_clientes = [...new Set([...(prev.origen_clientes || []), "redes"])];
      return patch;
    },
    flashDe: (v) => (+v.posts === 0 ? flashPara("frecuencia", "nunca") : null),
  },
  {
    id: "whatsapp", emoji: "", organo: "Reflejos", titulo: "Reflejos de WhatsApp",
    como: "Abre tu WhatsApp ahora mismo y mira con honestidad de médico.",
    inputs: [
      { id: "pendientes", tipo: "numero", label: "Chats sin responder en este momento" },
      { id: "tiempo", tipo: "chips", label: "¿En cuánto respondes normalmente?", opciones: [{ value: "minutos", label: "Minutos" }, { value: "horas", label: "Horas" }, { value: "dias", label: "Días" }] },
      { id: "reescribe", tipo: "chips", label: "¿Les vuelves a escribir al día siguiente?", opciones: [{ value: "sistematico", label: "Siempre" }, { value: "aveces", label: "A veces" }, { value: "no", label: "Nunca" }] },
    ],
    validar: (v) => req(v, "pendientes", "tiempo", "reescribe"),
    leer: (v) => {
      const p = +v.pendientes;
      if (p > 0) return { estado: "critico", mensaje: `${p} conversaciones enfriándose AHORA MISMO. Cada una era una posible venta.` };
      if (v.tiempo !== "minutos" || v.reescribe === "no") return { estado: "alerta", mensaje: "Bandeja al día, pero lento o sin seguimiento: el interés se te escapa igual." };
      return { estado: "bien", mensaje: "Reflejos sanos: respondes rápido y haces seguimiento. " };
    },
    aRespuestas: (v) => ({ tiempo_respuesta: v.tiempo, seguimiento: v.reescribe, chats_pendientes: +v.pendientes }),
    flashDe: (v) => (+v.pendientes > 0 || v.reescribe === "no" ? flashPara("seguimiento", +v.pendientes > 3 ? "no" : "aveces") : null),
  },
  {
    id: "reputacion", emoji: "⭐", organo: "Defensas", titulo: "Defensas (prueba social)",
    como: "Busca tu negocio en Google/Facebook. Cuenta fríamente, como laboratorio.",
    inputs: [
      { id: "rcount", tipo: "numero", label: "¿Cuántas reseñas/opiniones tienes?" },
      { id: "rating", tipo: "chips", label: "¿Cómo son en general?", opciones: [{ value: "buenas", label: "Buenas (4-5)" }, { value: "tres", label: "Regulares (3)" }, { value: "malas", label: "Malas" }, { value: "ninguna", label: "No tengo" }] },
    ],
    validar: (v) => req(v, "rcount", "rating"),
    leer: (v) => {
      if (+v.rcount === 0 || v.rating === "ninguna") return { estado: "critico", mensaje: "Cero defensas: sin opiniones, cada cliente nuevo compra con miedo." };
      if (v.rating === "malas") return { estado: "critico", mensaje: "Quejas visibles = hemorragia: hay que responderlas antes de atraer más gente." };
      if (+v.rcount <= 5) return { estado: "alerta", mensaje: `Solo ${v.rcount}: muy pocas para generar confianza real.` };
      return { estado: "bien", mensaje: `${v.rcount} opiniones te defienden solas. A ponerlas frente a cada oferta. ` };
    },
    aRespuestas: (v) => ({ resenas: +v.rcount === 0 || v.rating === "ninguna" ? "ninguna" : +v.rcount <= 5 ? "pocas" : "muchas_buenas" }),
    flashDe: (v) => (+v.rcount === 0 || v.rating === "ninguna" ? flashPara("resenas", "ninguna") : null),
  },
  {
    id: "oferta", emoji: "", organo: "Voz", titulo: "Test de la voz (5 segundos)",
    como: "Muéstrale tu perfil o bio a alguien por 5 segundos (o léelo como extraño). Marca lo que SÍ se entiende:",
    inputs: [{ id: "claridad", tipo: "checks", label: "Se entiende…", opciones: [{ value: "que", label: "Qué vendes" }, { value: "donde", label: "Dónde / zona" }, { value: "como", label: "Cómo pedirlo" }] }],
    validar: () => null,
    leer: (v) => {
      const n = (v.claridad || []).length;
      if (n <= 1) return { estado: "critico", mensaje: "Tu oferta no se entiende: el cliente se va al competidor en 5 segundos." };
      if (n === 2) return { estado: "alerta", mensaje: "Casi: falta una pieza para que la oferta cierre sola." };
      return { estado: "bien", mensaje: "Voz clara: qué, dónde y cómo pedir. " };
    },
    aRespuestas: (v) => { const n = (v.claridad || []).length; return { oferta_clara: n >= 3 ? "si" : n === 2 ? "maso" : "no" }; },
    flashDe: (v) => ((v.claridad || []).length < 3 ? flashPara("oferta_clara", (v.claridad || []).length === 2 ? "maso" : "no") : null),
  },
  {
    id: "ventas", emoji: "", organo: "Circulación", titulo: "Circulación (flujo real)",
    como: "Números de tu semana típica. Sin adornar: el laboratorio no juzga.",
    inputs: [
      { id: "contactos", tipo: "numero", label: "Personas interesadas por semana" },
      { id: "de10", tipo: "numero", label: "De cada 10, ¿cuántas compran?" },
      { id: "ticket", tipo: "numero", label: "Venta promedio $ (opcional)" },
    ],
    validar: (v) => req(v, "contactos", "de10"),
    leer: (v) => {
      const c = +v.contactos, t = Math.min(10, Math.max(0, +v.de10));
      if (c < 5) return { estado: "critico", mensaje: `Solo ~${c}/semana: sin circulación, nada más importa todavía. Primero flujo.` };
      if (t < 3) return { estado: "alerta", mensaje: `Llegan (${c}/sem) pero solo ${t}/10 compran: el dinero se pierde en el cierre.` };
      return { estado: "bien", mensaje: `Flujo (${c}/sem) y cierre (${t}/10) sanos. A escalar y fidelizar. ` };
    },
    aRespuestas: (v) => {
      const c = +v.contactos;
      return { flujo: c >= 15 ? "estable" : c >= 6 ? "irregular" : "muy_bajo", contactos_sem: c, tasa_cierre: Math.min(10, Math.max(0, +v.de10)), ticket: +v.ticket || undefined };
    },
    flashDe: (v) => (+v.contactos < 5 ? flashPara("flujo", "muy_bajo") : null),
  },
  {
    id: "cliente", emoji: "", organo: "Corazón", titulo: "Corazón (cliente y diferencia)",
    como: "Lo último, rápido. Si no lo tienes claro, dilo: también es un diagnóstico.",
    inputs: [
      { id: "cliente_txt", tipo: "texto", label: "Tu cliente en 1 frase (opcional)", placeholder: "Ej: mamás ocupadas que quieren ropa sin salir…" },
      { id: "diferencia", tipo: "chips", label: "¿Por qué tú y no otro?", opciones: [{ value: "claro", label: "Lo tengo claro" }, { value: "no_se", label: "Somos iguales" }] },
    ],
    validar: () => null,
    leer: (v) => {
      const ok = String(v.cliente_txt || "").length > 8;
      if (!ok && v.diferencia === "no_se") return { estado: "critico", mensaje: "Corazón difuso: sin cliente claro ni diferencia, todo (anuncios, contenido) cuesta el doble." };
      if (!ok || v.diferencia === "no_se") return { estado: "alerta", mensaje: "A medio definir: con 15 minutos de ejercicio queda listo." };
      return { estado: "bien", mensaje: "Corazón sano: cliente y diferencia claros. " };
    },
    aRespuestas: (v) => {
      const p: Record<string, any> = {};
      if (String(v.cliente_txt || "").length > 8) p.cliente_definido = "si";
      else if (v.cliente_txt) p.cliente_definido = "maso";
      if (v.diferencia) p.diferencial = v.diferencia === "claro" ? "claro" : "no_se";
      return p;
    },
    flashDe: (v) => (String(v.cliente_txt || "").length <= 8 ? flashPara("cliente_definido", "no") : v.diferencia === "no_se" ? flashPara("diferencial", "no_se") : null),
  },
];
