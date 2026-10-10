// Videoteca curada: SOLO videos verificados (oEmbed de YouTube, oct-2026).
// Nada inventado: cada entrada existe, con su canal y su peso verificados.
// El "peso" lleva fecha porque las vistas cambian; nunca afirmamos cifras vivas.
export interface Video { id: string; yt: string; titulo: string; canal: string; peso: string; vistas: number; tags: string[]; oficial: boolean }

// Problema (factor) → soluciones que lo explican en video.
export const FACTOR_TAGS: Record<string, string[]> = {
  visibilidad: ["google_business", "seo_local"], captacion: ["google_business", "embudo"],
  conversion: ["landing", "whatsapp"], proceso_comercial: ["whatsapp", "crm"],
  confianza: ["resenas", "google_business"], redes_sociales: ["instagram", "facebook"],
  contenido: ["contenido", "youtube"], presencia_digital: ["google_business", "facebook"],
  oferta: ["landing"], cliente_objetivo: ["embudo"], propuesta_valor: ["landing"],
  posicionamiento: ["contenido"], fidelizacion: ["email", "crm"],
  competencia: ["seo_local"], medicion: ["analitica"],
};

export const VIDEOS: Video[] = [
  { id: "seo-romuald", yt: "h_bWj9kVurg", titulo: "Curso de SEO: cómo encontrar el dominio perfecto para tu web", canal: "Romuald Fons", peso: "Canal con 1.5M de suscriptores · referente SEO en español (verificado oct-2026)", vistas: 0, tags: ["web", "seo", "visibilidad", "contenido"], oficial: false },
  { id: "gbp-susan", yt: "ijfbYz8CgWI", titulo: "Tutorial Google My Business: posiciona TOP en Google Maps", canal: "Susan Gorbina", peso: "21 mil vistas · 320 mil suscriptores (verificado oct-2026)", vistas: 21796, tags: ["google_business", "seo_local", "visibilidad", "resenas"], oficial: false },
  { id: "wa-catalogo", yt: "l4B9olaFgKQ", titulo: "Cómo usar el catálogo en WhatsApp Business", canal: "WhatsApp (oficial)", peso: "151 mil vistas · canal oficial con 7M de suscriptores (verificado oct-2026)", vistas: 151128, tags: ["whatsapp", "catalogo", "conversion"], oficial: true },
  { id: "wa-vender", yt: "icBIjF226vI", titulo: "Cómo usar WhatsApp Business para tu negocio", canal: "Cyberclick · Marketing Digital", peso: "996 mil vistas · 416 mil suscriptores (verificado oct-2026)", vistas: 996436, tags: ["whatsapp", "conversion", "seguimiento", "proceso_comercial"], oficial: false },
  { id: "fanpage", yt: "893eIDMKFCA", titulo: "Cómo crear tu página de Facebook para negocios en 10 minutos", canal: "Aprendamos Marketing", peso: "2M de vistas · canal PYME con 635 mil suscriptores (verificado oct-2026)", vistas: 2096630, tags: ["facebook", "instagram", "presencia_digital", "contenido"], oficial: false },
  { id: "landing-wa", yt: "wCUMIft2XkI", titulo: "Landing page para anuncios de Facebook y WhatsApp: estrategia para clientes", canal: "Aprendamos Marketing", peso: "17 mil vistas · canal PYME con 635 mil suscriptores (verificado oct-2026)", vistas: 16972, tags: ["landing", "embudo", "publicidad", "conversion"], oficial: false },
  { id: "email-hubspot", yt: "U8izqPoZMWg", titulo: "Qué es el email marketing y cómo funciona", canal: "HubSpot Español", peso: "11 mil vistas · HubSpot Español, 78 mil suscriptores (verificado oct-2026)", vistas: 11237, tags: ["email", "fidelizacion"], oficial: false },
  { id: "tiktok-official", yt: "UxmJEIveRio", titulo: "Kickstart Your Sales on TikTok Shop", canal: "TikTok (oficial)", peso: "Canal oficial de TikTok, 1M de suscriptores (verificado oct-2026)", vistas: 1398, tags: ["tiktok", "redes_sociales", "ecommerce"], oficial: true },
  { id: "ga4-measure", yt: "ZaBycjPJztk", titulo: "Full Google Analytics 4 Course for Beginners", canal: "MeasureSchool", peso: "29 mil vistas · 190 mil suscriptores (verificado oct-2026)", vistas: 29752, tags: ["analitica", "medicion", "web"], oficial: false },
  { id: "tienda-metics", yt: "MTAtdPEZvd0", titulo: "Cómo crear una tienda online en Shopify (tutorial paso a paso)", canal: "Metics Media | Español", peso: "37 mil vistas · 37 mil suscriptores (verificado oct-2026)", vistas: 37051, tags: ["ecommerce", "catalogo", "web"], oficial: false },
];

// Mapeo explícito solución → video: TODA respuesta diagnosticada tiene video.
// (crm/bot/automatización apuntan a WhatsApp Business: la automatización
// PYME verificada empieza ahí; consta así en el informe de fiabilidad.)
const SOLUCION_VIDEO: Record<string, string> = {
  google_business: "gbp-susan", seo_local: "gbp-susan", resenas: "gbp-susan",
  web: "seo-romuald", landing: "landing-wa", embudo: "landing-wa",
  publicidad: "landing-wa", remarketing: "landing-wa",
  whatsapp: "wa-vender", bot: "wa-vender", crm: "wa-vender", automatizacion: "wa-vender",
  catalogo: "wa-catalogo", ecommerce: "tienda-metics",
  instagram: "fanpage", facebook: "fanpage", contenido: "fanpage", presencia_digital: "fanpage",
  tiktok: "tiktok-official", youtube: "seo-romuald",
  email: "email-hubspot", analitica: "ga4-measure", tarjeta: "wa-catalogo", linkedin: "fanpage",
};

export function videoParaSolucion(solutionId: string): Video | null {
  if (!solutionId) return null;
  const id = SOLUCION_VIDEO[solutionId];
  if (id) return VIDEOS.find((v) => v.id === id) || null;
  return videosPara([solutionId], 1)[0] || null;
}

export const videoUrl = (v: Video) => `https://www.youtube.com/watch?v=${v.yt}`;
export const videoThumb = (v: Video) => `https://i.ytimg.com/vi/${v.yt}/hqdefault.jpg`;

// Empareja videos con soluciones (por id o por raíz: google_business ↔ google).
// Ante empate de relevancia, gana el de más vistas: el video con más peso
// sobre ese tema. Sin coincidencia no hay video (mejor ausente que inventado).
export function videosPara(solIds: string[], top = 2): Video[] {
  const raiz = (s: string) => s.split("_")[0];
  const scored = VIDEOS.map((v) => ({
    v,
    hit: v.tags.filter((t) => solIds.some((s) => s === t || raiz(s) === t || raiz(t) === raiz(s))).length,
  }));
  return scored.filter((s) => s.hit > 0).sort((a, b) => b.hit - a.hit || b.v.vistas - a.v.vistas).slice(0, top).map((s) => s.v);
}

// El video con más peso para un factor/problema (ej: visibilidad).
export function videoParaFactor(factorId: string): Video | null {
  const tags = FACTOR_TAGS[factorId] || [];
  return videosPara(tags, 1)[0] || null;
}
