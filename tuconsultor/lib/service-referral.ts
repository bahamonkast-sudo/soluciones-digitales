export const DIGITAL_SOLUTIONS_URL = "https://soluciones-digitales.ai.studio";
export const WHATSAPP_SOLUTIONS_URL = "https://soluciones-wa.ai.studio/";

const WHATSAPP_IDS = new Set(["whatsapp", "bot", "catalogo"]);
const DIGITAL_IDS = new Set([
  "web", "landing", "seo_local", "facebook", "instagram", "tiktok",
  "youtube", "linkedin", "contenido", "publicidad", "google_business",
]);

export function serviceReferralForIds(ids: string[]) {
  if (ids.some((id) => WHATSAPP_IDS.has(id))) {
    return { href: WHATSAPP_SOLUTIONS_URL, label: "Conocer Soluciones WA", detail: "Opción de implementación para WhatsApp." };
  }
  if (ids.some((id) => DIGITAL_IDS.has(id))) {
    return { href: DIGITAL_SOLUTIONS_URL, label: "Conocer Soluciones Digitales", detail: "Opción de apoyo para sitios web y presencia en redes." };
  }
  return null;
}

export function serviceReferralForText(value: string) {
  if (/whats\s?app|chatbot|cat[aá]logo|auto.?atenci[oó]n/i.test(value)) {
    return { href: WHATSAPP_SOLUTIONS_URL, label: "Conocer Soluciones WA", detail: "Servicio relacionado con WhatsApp." };
  }
  if (/p[aá]gina web|sitio web|landing|facebook|telegram|instagram|tiktok|redes sociales|presencia digital/i.test(value)) {
    return { href: DIGITAL_SOLUTIONS_URL, label: "Conocer Soluciones Digitales", detail: "Servicio relacionado con sitios web o presencia en redes." };
  }
  return null;
}
