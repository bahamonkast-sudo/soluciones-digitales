import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateServiceSchema,
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '../utils/structuredData';
import { SEO_CONFIG } from './seoConfig';

const svc = (key) => generateServiceSchema(SEO_CONFIG[key].title, SEO_CONFIG[key].description, SEO_CONFIG[key].path);
const crumbs = (trail) => generateBreadcrumbSchema([{ name: 'Inicio', path: '/' }, ...trail]);

export const SCHEMAS = {
  home: [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateWebSiteSchema(),
  ],
  chatbot: [
    svc('chatbot'),
    generateFAQSchema([
      { q: '¿Qué es BotWeb IA?', a: 'BotWeb IA es un agente conversacional con inteligencia artificial que atiende a tus clientes en WhatsApp y web las 24 horas. Responde preguntas, califica leads, agenda citas y vende por ti.' },
      { q: '¿Necesito saber programar para usarlo?', a: 'No. La integración es inmediata y sin código. Conectas tu número de WhatsApp, entrenas al asistente con la información de tu negocio y empieza a atender en minutos.' },
      { q: '¿El chatbot entiende notas de voz?', a: 'Sí. Comprende lenguaje natural escrito y notas de voz, respondiendo con la fluidez de tu mejor empleado, disponible 24/7.' },
    ]),
    crumbs([{ name: 'BotWeb IA', path: '/chatbot.html' }]),
  ],
  guardian: [
    svc('guardian'),
    generateFAQSchema([
      { q: '¿Qué es Guardián de Difusión?', a: 'Es una plataforma de envío masivo para WhatsApp que protege tus líneas con delays y pausas de comportamiento humano, evitando bloqueos mientras escalas tu alcance comercial.' },
      { q: '¿Mis cuentas corren riesgo de bloqueo?', a: 'Guardián emula comportamiento humano con tiempos y pausas naturales, e incluye calentamiento progresivo de cuentas para minimizar el riesgo de bloqueo.' },
    ]),
    crumbs([{ name: 'Guardián de Difusión', path: '/guardian-difusion.html' }]),
  ],
  extractor: [
    svc('extractor'),
    generateFAQSchema([
      { q: '¿Qué hace Extractor PLUS?', a: 'Extractor PLUS descubre oportunidades comerciales recopilando registros públicos de grupos y contactos de WhatsApp por nicho y zona geográfica, de forma automatizada y segura.' },
      { q: '¿Es seguro para mi cuenta?', a: 'Sí. Se conecta a WhatsApp Web con límites de comportamiento humano para una minería de datos ética y sin baneos.' },
    ]),
    crumbs([{ name: 'Extractor PLUS', path: '/extractor.html' }]),
  ],
  web: [
    svc('web'),
    generateFAQSchema([
      { q: '¿Hacen plantillas o diseño a medida?', a: 'Cero plantillas. Construimos cada sitio desde código puro, adaptado exactamente a la identidad de tu marca y optimizado para conversión y velocidad.' },
      { q: '¿Qué tipos de sitios desarrollan?', a: 'Landing pages de conversión, sitios corporativos de autoridad, hubs de negocio, e-commerce y tarjetas digitales profesionales.' },
    ]),
    crumbs([{ name: 'Sitios Web', path: '/sitios-web.html' }]),
  ],
  tarjeta: [
    svc('tarjeta'),
    crumbs([{ name: 'Tarjeta digital', path: '/tarjeta-digital.html' }]),
  ],
  auditor: [
    svc('auditor'),
    generateFAQSchema([
      { q: '¿Qué analiza el Auditor Estratégico IA?', a: 'Evalúa el estado SEO, UX/UI y de conversión de tu sitio web con inteligencia artificial, entregando recomendaciones priorizadas para escalar tus ventas.' },
      { q: '¿El diagnóstico es gratuito?', a: 'Solicitas el diagnóstico estratégico dejando tu nombre y WhatsApp, y recibes el reporte en PDF directamente en tu WhatsApp.' },
    ]),
    crumbs([{ name: 'Auditor Estratégico', path: '/auditor-estrategico.html' }]),
  ],
  tienda: [
    crumbs([{ name: 'Tienda', path: '/tienda.html' }]),
  ],
  ecosistema: [
    crumbs([{ name: 'Ecosistema', path: '/ecosistema.html' }]),
  ],
};
