import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Home, X, Sparkles } from 'lucide-react';
import { COMPANY, CATEGORIES, SITE_PAGES, CONTACTO, FAQ, KEYWORDS, INDEPENDENT_WHATSAPP_SITE } from '../data/chatBrochureData';
import { getPageUrl } from '../utils/env';

const AUDITOR_CTA = 'Abrir Auditor Estratégico';
const WHATSAPP_MARKETING_CTA = 'Ver WhatsApp Marketing';
const WHATSAPP_PLATFORM_TERMS = [
  'whatsapp marketing', 'envio masivo', 'envios masivos', 'difusion por whatsapp',
  'envios a grupos', 'envio a grupos', 'despacho multicuenta', 'round robin',
  'extractor google maps', 'validar numeros', 'validacion de lineas',
  'extraer grupos', 'miembros de grupos', 'calentador de numeros',
];
const SALES_CONCERN_PHRASES = [
  'quiero vender mas', 'quisiera vender mas', 'me gustaria vender mas', 'necesito vender mas', 'como puedo vender mas',
  'mejorar las ventas', 'mejorar mis ventas', 'aumentar mis ventas', 'aumentar ventas', 'conseguir clientes', 'atraer clientes',
  'no logro vender', 'no consigo vender', 'no estoy vendiendo', 'no vendo', 'vendo muy poco',
  'mis ventas bajaron', 'mis ventas cayeron', 'tengo pocas ventas', 'ventas estancadas',
  'me cuesta vender', 'no llegan clientes', 'no consigo clientes', 'necesito mas clientes',
  'quiero mas clientes', 'tengo visitas pero no ventas', 'tengo redes pero no vendo',
  'nadie compra', 'no me compran', 'mi negocio no vende', 'mi tienda no vende', 'mis productos no se venden',
];

const normalizeText = (value = '') => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[¿?¡!.,;:()[\]{}]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

function renderMd(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace('https://soluciones-wa.ai.studio/', '<a href="https://soluciones-wa.ai.studio/" target="_blank" rel="noopener noreferrer" class="text-[#9fc2ff] underline underline-offset-2">soluciones-wa.ai.studio</a>')
    .replace(/\n{2,}/g, '\n\n')
    .replace(/\n/g, '<br>');
}

function allCategories() {
  return CATEGORIES.map((c) => ({
    label: c.title,
    sub: c.items.map((it) => ({ catId: c.id, label: it.name })),
  }));
}

function findItem(catId, itemName) {
  const cat = CATEGORIES.find((c) => c.id === catId);
  if (!cat) return null;
  const item = cat.items.find((i) => i.name === itemName || i.alias === itemName);
  return item ? { cat, item } : null;
}

function findPage(itemName) {
  const page = SITE_PAGES.find((p) => p.name === itemName || p.alias === itemName);
  return page || null;
}

function formatItemSummary(it) {
  const lines = [`Claro. **${it.name}**${it.tagline ? ` — ${it.tagline.toLowerCase()}` : ''}`, ''];
  lines.push(it.queEs, '', `Puede ayudarte a ${it.paraQue.charAt(0).toLowerCase()}${it.paraQue.slice(1)}`, '');
  lines.push('**Algunas ventajas:**', ...it.beneficios.slice(0, 3).map((b) => `• ${b}`));
  if (it.name === 'Auditor Estratégico') {
    lines.push('', 'El auditor te guía con preguntas sobre tu negocio y prepara un análisis con oportunidades y próximos pasos. No promete ventas: te ayuda a entender mejor qué conviene revisar.');
    lines.push('', 'Para generar el informe, la página solicita tus datos de contacto y una API key personal de Groq.');
  } else {
    lines.push('', 'Si me cuentas qué necesitas, te ayudo a ver si esta opción encaja contigo.');
  }
  return lines.join('\n');
}

function formatPageSummary(p) {
  const lines = [`Claro. **${p.name}**`, ''];
  if (p.tagline) lines.push(p.tagline, '');
  lines.push(p.queEs, '', p.paraQue, '', '¿Qué te gustaría conocer con más detalle?');
  return lines.join('\n');
}

const CHIP_ACTIONS = {
  'ver soluciones': 'categories',
  'explorar soluciones': 'categories',
  'otras soluciones': 'categories',
  'servicios': 'categories',
  'categorias': 'categories',
  'herramientas': 'categories',
  'que ofrecen': 'categories',
  'faq': 'faq',
  'preguntas': 'faq',
  'contacto': 'contact',
  'hablar con el equipo': 'contact',
  'orientarme': 'categories',
};

export default function ChatBotBrochure({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showHome, setShowHome] = useState(true);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  const scrollToBottom = (el) => {
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    scrollToBottom(el);
  }, [messages, typing, showHome]);

  const pushBot = (text, chips = null) => {
    setMessages((prev) => [...prev, { role: 'bot', text, chips }]);
  };

  const simulateReply = (reply, chips = null) => {
    setTyping(true);
    const delay = Math.min(Math.max(420, reply.length * 3), 900);
    setTimeout(() => {
      setTyping(false);
      pushBot(reply, chips);
    }, delay);
  };

  const showCategories = (extra = '') => {
    const intro = extra || 'Claro. Estas son las áreas que trabajamos en Soluciones Digitales IA Studio. ¿Cuál te interesa explorar?';
    simulateReply(intro, CATEGORIES.map((category) => category.title));
  };

  const showCategoryItems = (cat) => {
    const labels = cat.items.map((it) => it.name);
    simulateReply(`En **${cat.title}** tenemos estas opciones. ¿Cuál te gustaría conocer?`, labels);
  };

  const showItem = (cat, item) => {
    simulateReply(formatItemSummary(item), [
      'Ver soluciones',
      'Hablar con el equipo',
      ...(item.name === 'Auditor Estratégico' ? [AUDITOR_CTA] : []),
      ...cat.items.filter((i) => i.name !== item.name).slice(0, 2).map((i) => i.name),
    ]);
  };

  const showPage = (page) => {
    simulateReply(formatPageSummary(page), ['Ver soluciones', 'Preguntas', 'Hablar con el equipo']);
  };

  const showFaq = () => {
    const f = FAQ.map((q) => `**${q.q}**\n${q.a}`).join('\n\n');
    simulateReply(`Con gusto. Estas respuestas pueden orientarte:\n\n${f}`, ['Ver soluciones', 'Hablar con el equipo']);
  };

  const showContact = () => {
    const lines = ['Por supuesto. Si prefieres hablar con una persona, estos son los contactos publicados en el sitio:', ''];
    CONTACTO.forEach((c) => {
      lines.push(`**${c.area}:** ${c.whatsapp}`);
    });
    lines.push('', 'El equipo podrá ayudarte a definir el alcance y los siguientes pasos.');
    simulateReply(lines.join('\n'), ['Ver soluciones', 'Preguntas']);
  };

  const handleChip = (label) => {
    setInput('');
    setShowHome(false);

    if (label === AUDITOR_CTA) {
      window.location.href = getPageUrl('auditor-estrategico');
      return;
    }
    if (label === WHATSAPP_MARKETING_CTA) {
      window.open(INDEPENDENT_WHATSAPP_SITE, '_blank', 'noopener,noreferrer');
      return;
    }
    if (label === 'Primero quiero contarte más') {
      simulateReply('Claro, te escucho. ¿Qué vendes y qué sientes que se está haciendo más difícil: atraer personas, convertir consultas o cerrar la venta?');
      return;
    }

    const cat = CATEGORIES.find((c) => c.title === label);
    if (cat) { showCategoryItems(cat); return; }

    const page = SITE_PAGES.find((p) => p.name === label);
    if (page) { showPage(page); return; }

    const action = CHIP_ACTIONS[label.toLowerCase()];
    if (action === 'categories') { showCategories(); return; }
    if (action === 'faq') { showFaq(); return; }
    if (action === 'contact') { showContact(); return; }

    const item = allCategories().flatMap((c) => c.sub).find((s) => s.label === label);
    if (item) {
      const found = findItem(item.catId, item.label);
      if (found) showItem(found.cat, found.item);
    }
  };

  const resolveIntent = (q) => {
    const normalized = normalizeText(q);
    const norm = ` ${normalized} `;

    if (SALES_CONCERN_PHRASES.some((phrase) => normalized.includes(phrase))) {
      return { type: 'sales-concern' };
    }

    if (normalized.includes('whatsapp')) {
      if (/(contacto|contactar|numero|telefono|canal(?:es)? de (?:contacto|atencion)|whatsapp de (?:ventas|soporte|atencion)|ventas.{0,12}whatsapp|hablar con (?:el equipo|una persona|un asesor))/.test(normalized)) return { type: 'contact' };
      return { type: 'external-whatsapp' };
    }
    if (WHATSAPP_PLATFORM_TERMS.some((phrase) => normalized.includes(phrase))) {
      return { type: 'external-whatsapp' };
    }

    const ac = allCategories();
    const acItem = ac.flatMap((c) => c.sub).find((s) => norm.includes(` ${normalizeText(s.label)} `));
    if (acItem) {
      const found = findItem(acItem.catId, acItem.label);
      if (found) return { type: 'item', cat: found.cat, item: found.item };
    }

    const acCat = CATEGORIES.find((c) => norm.includes(` ${normalizeText(c.title)} `));
    if (acCat) return { type: 'category', cat: acCat };

    const page = SITE_PAGES.find((p) => norm.includes(` ${normalizeText(p.name)} `) || norm.includes(` ${normalizeText(p.alias)} `));
    if (page) return { type: 'page', page };

    for (const [k, v] of Object.entries(KEYWORDS).sort(([left], [right]) => right.length - left.length)) {
      if (norm.includes(` ${normalizeText(k)} `)) {
        if (v === 'contacto') return { type: 'contact' };
        if (v === 'faq') return { type: 'faq' };
        if (v === 'saludo') return { type: 'home' };
        if (v === 'externo:whatsapp') return { type: 'external-whatsapp' };
        if (v.startsWith('categoria:')) {
          const category = CATEGORIES.find((candidate) => candidate.id === v.replace('categoria:', ''));
          if (category) return { type: 'category', cat: category };
        }
        if (v.includes(':') && !v.startsWith('page:')) {
          const [categoryId, itemName] = v.split(':');
          const found = findItem(categoryId, itemName);
          if (found) return { type: 'item', cat: found.cat, item: found.item };
        }
        if (v.startsWith('page:')) {
          const found = findPage(v.replace('page:', ''));
          if (found) return { type: 'page', page: found };
        }
      }
    }

    if (/(cotiz|precio|costo|contact|comprar|cuanto vale|cuanto cuesta)/.test(normalized)) {
      return { type: 'contact' };
    }

    return null;
  };

  const sendMessage = (override) => {
    if (typing) return;
    const raw = (override !== undefined ? override : input).trim();
    if (!raw) return;

    setShowHome(false);
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: raw }]);

    const intent = resolveIntent(raw);
    if (!intent) {
      simulateReply('No quiero darte un dato equivocado. Si me cuentas un poco más, lo intento ubicar; también puedes elegir un tema y te oriento con gusto.', ['Sitios Web', 'Inteligencia Artificial', 'Automatización para Facebook', 'Estrategia y Auditoría', 'Preguntas', 'Hablar con el equipo']);
      return;
    }
    if (intent.type === 'item') showItem(intent.cat, intent.item);
    if (intent.type === 'category') showCategoryItems(intent.cat);
    if (intent.type === 'page') showPage(intent.page);
    if (intent.type === 'faq') showFaq();
    if (intent.type === 'contact') showContact();
    if (intent.type === 'home') {
      const greetings = [
        '¡Hola! Qué gusto saludarte. Soy el asistente de Soluciones Digitales IA Studio. ¿Qué te gustaría resolver hoy?',
        '¡Hola! Gracias por escribirnos. Cuéntame qué necesita tu negocio y buscamos juntos por dónde empezar.',
        '¡Buenas! Estoy aquí para orientarte sobre las soluciones de Soluciones Digitales IA Studio. ¿Qué tienes en mente?',
      ];
      simulateReply(greetings[Math.floor(Math.random() * greetings.length)], ['Sitios Web', 'Inteligencia Artificial', 'Automatización para Facebook', 'Estrategia y Auditoría']);
    }
    if (intent.type === 'external-whatsapp') {
      simulateReply(`Claro. En la plataforma independiente de **WhatsApp Marketing** encontrarás, entre otras funciones:\n\n• Envíos a grupos y contactos, con despacho entre varias cuentas.\n• Herramientas de prospección y filtros para organizar datos de negocios y grupos.\n• Gestión de líneas, validación y calentamiento de números.\n\nAyuda a organizar tareas de difusión y prospección; no garantiza ventas. Puedes revisar el panel aquí: https://soluciones-wa.ai.studio/\n\nEse sistema tiene su propio sitio. En este chat también puedo orientarte sobre las soluciones de Soluciones Digitales IA Studio.`, [WHATSAPP_MARKETING_CTA, 'Ver soluciones', 'Hablar con el equipo']);
    }
    if (intent.type === 'sales-concern') {
      simulateReply('Entiendo; puede ser frustrante esforzarse y no ver las ventas que esperas. Sin conocer tu negocio no sería responsable adivinar la causa: a veces conviene revisar la oferta, a quién llega, cómo se presenta o qué pasa después de una consulta.\n\nEl **Auditor Estratégico** te guía con preguntas sobre tu negocio y organiza oportunidades y próximos pasos; no promete resultados. Para generar el informe solicita datos de contacto y una API key personal de Groq.\n\nSi también quieres organizar difusión o prospección, el panel independiente de **WhatsApp Marketing** ofrece envíos a grupos y contactos, despacho multicuenta, herramientas para extraer y filtrar datos, y gestión de líneas. Tampoco garantiza ventas.\n\n¿Con cuál prefieres empezar?', [AUDITOR_CTA, WHATSAPP_MARKETING_CTA, 'Primero quiero contarte más']);
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#070d1a] text-[#c8d8ee] overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif", height: '100%' }}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[rgba(59,130,246,0.12)] bg-[rgba(7,13,26,0.85)] px-5 py-3 shrink-0 relative">
        <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#D4AF37] to-[#F5C842] flex items-center justify-center font-bold text-[#0a0f1e] shadow-[0_4px_16px_rgba(212,175,55,0.25)] shrink-0">SD</div>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-semibold text-[#ddeeff] whitespace-nowrap overflow-hidden text-ellipsis">Soluciones Digitales IA Studio</div>
          <div className="text-[11px] text-[#8aafd4] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] inline-block animate-pulse" />
            Asistente de Soluciones Digitales IA Studio
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setShowHome(true); setMessages([]); }} title="Volver al inicio"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8aafd4] hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
            <Home size={15} />
          </button>
          <button onClick={onClose} title="Cerrar"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8aafd4] hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-6 py-5 flex flex-col gap-3.5" style={{ overscrollBehavior: 'contain', scrollBehavior: 'auto' }}>
        <AnimatePresence>
          {showHome && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-[600px] mx-auto flex flex-col items-center gap-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-[18px] bg-gradient-to-br from-[#D4AF37] to-[#F5C842] flex items-center justify-center shadow-[0_8px_32px_rgba(212,175,55,0.25)]">
                  <Sparkles size={22} className="text-[#0a0f1e]" />
                </div>
                <h2 className="text-lg font-bold text-[#ddeeff] mb-1">¡Hola! ¿Qué te gustaría resolver?</h2>
                <p className="text-[13px] text-[#8aafd4] leading-relaxed">Cuéntame un poco sobre tu idea o elige un tema. Con gusto te ayudo a encontrar por dónde empezar.</p>
              </div>

              <div className="w-full bg-[#0f1e36] border border-[rgba(212,175,55,0.2)] rounded-2xl p-4 shadow-[0_4px_24px_rgba(212,175,55,0.06)]">
                <div className="text-xs font-semibold text-[#D4AF37] mb-2.5 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] inline-block" /> Soluciones Digitales IA Studio
                </div>
                <p className="text-[12.5px] text-[#94b8e8] leading-relaxed">{COMPANY.intro}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {CATEGORIES.map((c) => (
                    <button key={c.id} onClick={() => handleChip(c.title)}
                      className="px-3 py-1.5 rounded-full text-[11.5px] font-medium bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.18)] text-[#7aafff] hover:bg-[rgba(59,130,246,0.2)] hover:text-[#c8dfff] transition-colors cursor-pointer">
                      {c.title}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#819bb8]">También puedes conocer</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {SITE_PAGES.filter((p) => ['Tienda', 'Blog', 'Quiénes Somos'].includes(p.name)).map((p) => (
                    <button key={p.name} onClick={() => handleChip(p.name)}
                      className="px-3 py-1.5 rounded-full text-[11.5px] font-medium bg-[rgba(212,175,55,0.06)] border border-[rgba(212,175,55,0.2)] text-[#e0c06a] hover:bg-[rgba(212,175,55,0.15)] hover:text-[#f2dc9b] transition-colors cursor-pointer">
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {messages.map((m, i) => (
          <div key={i} className={`flex items-end gap-2.5 max-w-[88%] ${m.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
            {m.role === 'bot' && (
              <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F5C842] flex items-center justify-center text-[11px] font-bold text-[#0a0f1e]">SD</div>
            )}
            <div className={`px-3.5 py-2.5 rounded-[18px] text-[12.5px] leading-relaxed break-words ${m.role === 'user'
              ? 'bg-gradient-to-br from-[#1d4ed8] to-[#2563eb] text-white rounded-br-[4px]'
              : 'bg-[#0f1e36] border border-[rgba(59,130,246,0.12)] text-[#c8d8ee] rounded-bl-[4px]'}`}>
              <span dangerouslySetInnerHTML={{ __html: renderMd(m.text) }} />
              {m.chips && m.chips.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2.5 border-t border-[rgba(59,130,246,0.1)]">
                  {m.chips.map((c, j) => (
                    <button key={j} onClick={() => handleChip(c)}
                      className="px-2.5 py-1 rounded-full text-[11px] bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.18)] text-[#7aafff] hover:bg-[rgba(59,130,246,0.2)] transition-colors cursor-pointer">
                      {c}
                    </button>
                  ))}
                </div>
              )}
              <span className="block text-[9.5px] text-[rgba(255,255,255,0.3)] mt-1.5">Soluciones Digitales IA Studio</span>
            </div>
            {m.role === 'user' && (
              <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#6366f1] flex items-center justify-center text-[10px] font-bold text-white">TÚ</div>
            )}
          </div>
        ))}

        {typing && (
          <div className="flex items-end gap-2.5 self-start">
            <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F5C842] flex items-center justify-center text-[11px] font-bold text-[#0a0f1e]">SD</div>
            <div className="px-3.5 py-3 rounded-[18px] bg-[#0f1e36] border border-[rgba(59,130,246,0.12)] rounded-bl-[4px]">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '.15s' }} />
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '.3s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions bar */}
      <div className="px-6 pb-2 pt-1 flex gap-2 flex-wrap shrink-0">
        <button onClick={() => { setShowHome(false); showCategories(); }}
          className="px-3.5 py-1.5 rounded-full text-[12px] bg-[rgba(15,33,72,0.7)] border border-[rgba(59,130,246,0.15)] text-[#7aafff] hover:border-[rgba(59,130,246,0.35)] hover:text-[#c8dfff] transition-colors cursor-pointer">Ver soluciones</button>
        <button onClick={() => { setShowHome(false); showFaq(); }}
          className="px-3.5 py-1.5 rounded-full text-[12px] bg-[rgba(15,33,72,0.7)] border border-[rgba(59,130,246,0.15)] text-[#7aafff] hover:border-[rgba(59,130,246,0.35)] hover:text-[#c8dfff] transition-colors cursor-pointer">Preguntas</button>
        <button onClick={() => { setShowHome(false); showContact(); }}
          className="px-3.5 py-1.5 rounded-full text-[12px] bg-gradient-to-br from-[rgba(212,175,55,0.15)] to-[rgba(245,200,66,0.1)] border border-[rgba(212,175,55,0.3)] text-[#D4AF37] font-semibold hover:shadow-[0_4px_16px_rgba(212,175,55,0.15)] transition-all cursor-pointer">Contacto</button>
      </div>

      {/* Input */}
      <div className="px-6 pb-4 pt-2.5 bg-[#070d1a] border-t border-[rgba(59,130,246,0.12)] flex gap-2.5 shrink-0">
        <div className="flex-1 relative flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
            placeholder="Cuéntame qué te gustaría mejorar..."
            className="w-full px-4 py-2.5 bg-[#0f1e36] border border-[rgba(59,130,246,0.15)] rounded-2xl text-[13px] text-[#c8d8ee] outline-none transition-all placeholder:text-[#5a7fa8]"
            style={{ fontFamily: 'inherit' }}
          />
        </div>
        <button onClick={() => sendMessage()} disabled={typing} aria-label="Enviar mensaje"
          className="px-4 py-2.5 bg-gradient-to-br from-[#D4AF37] to-[#F5C842] text-[#0a0f1e] rounded-2xl text-[13px] font-bold cursor-pointer hover:shadow-[0_6px_20px_rgba(212,175,55,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5">
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
