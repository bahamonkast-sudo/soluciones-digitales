import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Home, X, Sparkles, ArrowLeft } from 'lucide-react';
import { COMPANY, CATEGORIES, SITE_PAGES, CONTACTO, FAQ, KEYWORDS } from '../data/chatBrochureData';

function renderMd(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n{2,}/g, '\n\n')
    .replace(/\n/g, '<br>');
}

function waLink(number) {
  return 'https://wa.me/' + number.replace(/[^\d]/g, '');
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
  const lines = [`**${it.name}**`, ''];
  if (it.tagline) lines.push(`*${it.tagline}*`, '');
  lines.push(`**Qué es:** ${it.queEs}`, '');
  lines.push(`**Para qué sirve:** ${it.paraQue}`, '');
  lines.push('**Beneficios:**', ...it.beneficios.map((b) => `• ${b}`), '');
  lines.push('**Casos de uso:**', ...it.casosUso.map((c) => `• ${c}`), '');
  if (it.precio) lines.push(`**Precio:** ${it.precio}`);
  lines.push('', '¿Quieres contratarlo? Escríbenos por WhatsApp.');
  return lines.join('\n');
}

function formatPageSummary(p) {
  const lines = [`**${p.name}**`, ''];
  if (p.tagline) lines.push(`*${p.tagline}*`, '');
  lines.push(`**Qué es:** ${p.queEs}`, '');
  lines.push(`**Para qué sirve:** ${p.paraQue}`, '');
  lines.push('**Beneficios:**', ...p.beneficios.map((b) => `• ${b}`), '');
  lines.push('**Casos de uso:**', ...p.casosUso.map((c) => `• ${c}`), '');
  lines.push('', '¿Necesitas algo más? Escríbenos por WhatsApp.');
  return lines.join('\n');
}

const CHIP_ACTIONS = {
  'servicios': 'categories',
  'categorias': 'categories',
  'herramientas': 'categories',
  'que ofrecen': 'categories',
  'faq': 'faq',
  'preguntas': 'faq',
  'contacto': 'contact',
  'whatsapp': 'contact',
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
    const delay = Math.min(Math.max(600, reply.length * 9), 2200);
    setTimeout(() => {
      setTyping(false);
      pushBot(reply, chips);
    }, delay);
  };

  const showCategories = (extra = '') => {
    const list = allCategories();
    const reply =
      (extra ? extra + '\n\n' : '') +
      list.map((c) => `**${c.label}**\n${c.sub.map((s) => `• ${s.label}`).join('\n')}`).join('\n\n') +
      '\n\nEscribe el nombre de una solución y te doy su resumen completo.';
    simulateReply(reply);
  };

  const showCategoryItems = (cat) => {
    const labels = cat.items.map((it) => it.name);
    simulateReply(`**${cat.title}** — estas son sus soluciones:\n\n` + labels.map((l) => `• ${l}`).join('\n'), labels);
  };

  const showItem = (cat, item) => {
    simulateReply(formatItemSummary(item), [
      'Servicios',
      'Preguntas',
      'Contacto',
      ...cat.items.filter((i) => i.name !== item.name).slice(0, 2).map((i) => i.name),
    ]);
  };

  const showPage = (page) => {
    simulateReply(formatPageSummary(page), ['Servicios', 'Preguntas', 'Contacto']);
  };

  const showFaq = () => {
    const f = FAQ.map((q) => `**Q:** ${q.q}\n**R:** ${q.a}`).join('\n\n');
    simulateReply(f, ['Servicios', 'Contacto']);
  };

  const showContact = () => {
    const lines = ['**Canales directos de contacto**', ''];
    CONTACTO.forEach((c) => {
      lines.push(`**${c.area}:** ${c.whatsapp}`);
    });
    lines.push('', 'Escríbenos por WhatsApp y te respondemos de inmediato.');
    simulateReply(lines.join('\n'), ['Servicios', 'Preguntas']);
  };

  const handleChip = (label) => {
    setInput('');
    setShowHome(false);

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
    const norm = ' ' + q.toLowerCase() + ' ';

    const ac = allCategories();
    const acItem = ac.flatMap((c) => c.sub).find((s) => norm.includes(s.label.toLowerCase()));
    if (acItem) {
      const found = findItem(acItem.catId, acItem.label);
      if (found) return { type: 'item', cat: found.cat, item: found.item };
    }

    const acCat = CATEGORIES.find((c) => norm.includes(c.title.toLowerCase()));
    if (acCat) return { type: 'category', cat: acCat };

    const page = SITE_PAGES.find((p) => norm.includes(p.name.toLowerCase()) || norm.includes(p.alias.toLowerCase()));
    if (page) return { type: 'page', page };

    for (const [k, v] of Object.entries(KEYWORDS)) {
      if (norm.includes(k)) {
        if (v === 'contacto') return { type: 'contact' };
        if (v === 'faq') return { type: 'faq' };
        if (v === 'saludo') return { type: 'home' };
        if (v.startsWith('web:')) {
          const found = findItem('web', v.replace('web:', ''));
          if (found) return { type: 'item', cat: found.cat, item: found.item };
        }
        if (v.startsWith('ia:')) {
          const found = findItem('ia', v.replace('ia:', ''));
          if (found) return { type: 'item', cat: found.cat, item: found.item };
        }
        if (v.startsWith('wa:')) {
          const found = findItem('wa', v.replace('wa:', ''));
          if (found) return { type: 'item', cat: found.cat, item: found.item };
        }
        if (v.startsWith('data:')) {
          const found = findItem('data', v.replace('data:', ''));
          if (found) return { type: 'item', cat: found.cat, item: found.item };
        }
        if (v.startsWith('auditoria:')) {
          const found = findItem('auditoria', v.replace('auditoria:', ''));
          if (found) return { type: 'item', cat: found.cat, item: found.item };
        }
        if (v.startsWith('page:')) {
          const found = findPage(v.replace('page:', ''));
          if (found) return { type: 'page', page: found };
        }
      }
    }

    if (norm.includes('coti') || norm.includes('precio') || norm.includes('costo') || norm.includes('contact') || norm.includes('comprar')) {
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
      simulateReply('No tengo esa información aún. Pregúntame por cualquiera de nuestras soluciones (Sitios Web, IA, WhatsApp Automation, Minería o Auditoría), o escribe: **Servicios**, **Preguntas** o **Contacto**.');
      return;
    }
    if (intent.type === 'item') showItem(intent.cat, intent.item);
    if (intent.type === 'category') showCategoryItems(intent.cat);
    if (intent.type === 'page') showPage(intent.page);
    if (intent.type === 'faq') showFaq();
    if (intent.type === 'contact') showContact();
    if (intent.type === 'home') simulateReply('¡Hola! Soy el asistente de **Soluciones Digitales IA**.\n\nPuedo darte el resumen de cualquiera de nuestras soluciones con solo escribir su nombre o elegir una categoría.');
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#070d1a] text-[#c8d8ee] overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif", height: '100%' }}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[rgba(59,130,246,0.12)] bg-[rgba(7,13,26,0.85)] px-5 py-3 shrink-0 relative">
        <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#D4AF37] to-[#F5C842] flex items-center justify-center font-bold text-[#0a0f1e] shadow-[0_4px_16px_rgba(212,175,55,0.25)] shrink-0">SD</div>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-semibold text-[#ddeeff] whitespace-nowrap overflow-hidden text-ellipsis">Soluciones Digitales IA</div>
          <div className="text-[11px] text-[#8aafd4] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] inline-block animate-pulse" />
            Asistente virtual · En línea
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
                <h2 className="text-lg font-bold text-[#ddeeff] mb-1">¿Qué solución necesitas?</h2>
                <p className="text-[13px] text-[#8aafd4] leading-relaxed">Elige una categoría o escribe el nombre de la solución y te explico en qué te beneficia.</p>
              </div>

              <div className="w-full bg-[#0f1e36] border border-[rgba(212,175,55,0.2)] rounded-2xl p-4 shadow-[0_4px_24px_rgba(212,175,55,0.06)]">
                <div className="text-xs font-semibold text-[#D4AF37] mb-2.5 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] inline-block" /> Soluciones Digitales IA
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
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {SITE_PAGES.map((p) => (
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
              <span className="block text-[9.5px] text-[rgba(255,255,255,0.3)] mt-1.5">Soluciones Digitales IA</span>
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
        <button onClick={() => { setShowHome(false); showCategories('Estas son todas las soluciones de nuestro ecosistema:'); }}
          className="px-3.5 py-1.5 rounded-full text-[12px] bg-[rgba(15,33,72,0.7)] border border-[rgba(59,130,246,0.15)] text-[#7aafff] hover:border-[rgba(59,130,246,0.35)] hover:text-[#c8dfff] transition-colors cursor-pointer">Servicios</button>
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
            placeholder="Escribe una solución: landing, chatbot, extractor..."
            className="w-full px-4 py-2.5 bg-[#0f1e36] border border-[rgba(59,130,246,0.15)] rounded-2xl text-[13px] text-[#c8d8ee] outline-none transition-all placeholder:text-[#5a7fa8]"
            style={{ fontFamily: 'inherit' }}
          />
        </div>
        <button onClick={() => sendMessage()} disabled={typing}
          className="px-4 py-2.5 bg-gradient-to-br from-[#D4AF37] to-[#F5C842] text-[#0a0f1e] rounded-2xl text-[13px] font-bold cursor-pointer hover:shadow-[0_6px_20px_rgba(212,175,55,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5">
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}