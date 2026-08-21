import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Bot, CheckCheck, ChevronDown, Zap, Clock, Headphones,
  Sparkles, TrendingUp, Users, Star, ArrowRight, Shield,
  Check, X, Phone, Calendar, MessageSquare, Wallet, BarChart3,
  Share2, GitBranch, UserPlus, Bell, Layers, Globe, Target, Smartphone
} from 'lucide-react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SlideButton from '../components/SlideButton';
import { PRECIOS } from '../data/precios';

import caseWhatsapp from '../assets/case-whatsapp.webp';
import caseB2bMining from '../assets/case-b2b-mining.webp';
import caseWebUx from '../assets/case-web-ux.webp';

const ACCENT = '#25D366';
const ACCENT_DARK = '#1a8f55';

function FadeIn({ children, delay = 0, y = 30, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 ml-1">
      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut', delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut', delay: 0.15 }} className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut', delay: 0.3 }} className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
    </span>
  );
}

function DoubleCheck() {
  return <CheckCheck size={14} className="text-[#53bdeb]" />;
}

function BotAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-[#2A2A35] flex items-center justify-center shrink-0 border border-[#25D366]/30">
      <Bot size={16} className="text-[#25D366]" />
    </div>
  );
}

function UserAvatar({ label }) {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(37,211,102,0.3)]">
      <span className="text-[11px] font-black text-white">{label?.[0] || 'U'}</span>
    </div>
  );
}

function AdvisorAvatar({ label, color }) {
  return (
    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-lg`}>
      <span className="text-[11px] font-black text-white">{label?.[0] || 'A'}</span>
    </div>
  );
}

function BotBubble({ children, delay = 0, className = '' }) {
  return (
    <FadeIn delay={delay} y={40} className={`flex items-start gap-2.5 max-w-[88%] sm:max-w-[75%] ${className}`}>
      <BotAvatar />
      <div className="bg-[#1E1E24] text-neutral-200 p-4 rounded-2xl rounded-tl-sm shadow-[0_2px_8px_rgba(0,0,0,0.4)] relative text-sm leading-relaxed flex-1">
        {children}
        <span className="flex items-center gap-1 mt-2 text-[9px] text-neutral-500">
          {new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
          <DoubleCheck />
        </span>
      </div>
    </FadeIn>
  );
}

function UserBubble({ children, delay = 0, className = '' }) {
  return (
    <FadeIn delay={delay} y={40} className={`flex justify-end max-w-[88%] sm:max-w-[75%] ml-auto ${className}`}>
      <div className="bg-[#005c4b] text-white p-4 rounded-2xl rounded-tr-sm shadow-[0_2px_8px_rgba(0,0,0,0.4)] relative text-sm leading-relaxed">
        {children}
        <span className="flex items-center gap-1 mt-2 text-[9px] text-white/60 justify-end">
          {new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
          <DoubleCheck />
        </span>
      </div>
    </FadeIn>
  );
}

function AdvisorBubble({ children, label, color, delay = 0, className = '' }) {
  return (
    <FadeIn delay={delay} y={40} className={`flex items-start gap-2.5 max-w-[88%] sm:max-w-[75%] ${className}`}>
      <AdvisorAvatar label={label} color={color} />
      <div className={`p-4 rounded-2xl rounded-tl-sm shadow-[0_2px_8px_rgba(0,0,0,0.4)] relative text-sm leading-relaxed flex-1 ${color.includes('purple') ? 'bg-purple-900/40 text-purple-100 border border-purple-500/20' : color.includes('blue') ? 'bg-blue-900/40 text-blue-100 border border-blue-500/20' : 'bg-emerald-900/40 text-emerald-100 border border-emerald-500/20'}`}>
        <div className="text-[9px] font-bold uppercase tracking-wider mb-1 opacity-70">{label}</div>
        {children}
        <span className="flex items-center gap-1 mt-2 text-[9px] text-white/40">
          {new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
          <DoubleCheck />
        </span>
      </div>
    </FadeIn>
  );
}

function BotTyping({ delay = 0 }) {
  return (
    <FadeIn delay={delay} y={20} className="flex items-start gap-2.5 max-w-[120px]">
      <BotAvatar />
      <div className="bg-[#1E1E24] px-4 py-3.5 rounded-2xl rounded-tl-sm shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
        <TypingDots />
      </div>
    </FadeIn>
  );
}

function BotImageBubble({ src, alt, caption, delay = 0 }) {
  return (
    <FadeIn delay={delay} y={40} className="flex items-start gap-2.5 max-w-[88%] sm:max-w-[75%]">
      <BotAvatar />
      <div className="bg-[#1E1E24] rounded-2xl rounded-tl-sm shadow-[0_2px_8px_rgba(0,0,0,0.4)] overflow-hidden flex-1">
        <div className="relative overflow-hidden">
          <img src={src} alt={alt} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" style={{ maxHeight: '320px' }} loading="lazy" />
          {caption && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 pt-8">
              <p className="text-white text-xs font-medium leading-relaxed">{caption}</p>
            </div>
          )}
        </div>
        <div className="p-3 flex items-center gap-2 text-[9px] text-neutral-500">
          <MessageCircle size={10} />
          <span>Imagen · {alt}</span>
          <span className="ml-auto flex items-center gap-1">
            {new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
            <DoubleCheck />
          </span>
        </div>
      </div>
    </FadeIn>
  );
}

function ChatDateDivider({ text }) {
  return (
    <div className="flex items-center justify-center my-8">
      <div className="bg-[#182229] px-3 py-1 rounded-md text-[10px] text-neutral-400 uppercase tracking-wider font-semibold shadow-sm border border-white/5">
        {text}
      </div>
    </div>
  );
}

function MiniFeatureCard({ icon: Icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3 hover:bg-white/[0.06] hover:border-[#25D366]/30 transition-all duration-300 group"
    >
      <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#25D366]/20 transition-colors">
        <Icon size={18} className="text-[#25D366]" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white mb-0.5">{title}</h4>
        <p className="text-xs text-neutral-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function MetricBadge({ value, label }) {
  return (
    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] min-w-[100px]">
      <div className="text-2xl font-black text-[#25D366]">{value}</div>
      <div className="text-[10px] text-neutral-400 mt-1 uppercase tracking-wider font-medium">{label}</div>
    </div>
  );
}

function FaqItem({ question, answer, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={delay}>
      <motion.div className={`rounded-2xl border transition-all duration-400 overflow-hidden ${open ? 'bg-[#005c4b]/10 border-[#25D366]/30' : 'bg-[#1E1E24]/50 border-white/[0.06] hover:border-white/20'}`}>
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left gap-4">
          <span className="text-sm font-bold text-white flex-1">{question}</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center shrink-0">
            <ChevronDown size={12} className="text-neutral-400" />
          </motion.div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="px-4 pb-4 pt-0 text-sm text-neutral-400 leading-relaxed border-t border-white/[0.04] mt-0 pt-3">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </FadeIn>
  );
}

function StickyPhone() {
  const messages = [
    { text: 'Hola, quiero información sobre sus servicios', isUser: true, delay: 0.5 },
    { text: '¡Hola! Con gusto. ¿Qué tipo de servicio buscas?', isUser: false, delay: 2 },
    { text: 'Necesito asesoría para mi empresa', isUser: true, delay: 4 },
    { text: 'Perfecto, te conecto con un asesor ahora mismo', isUser: false, delay: 6 },
  ];
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = messages.map((_, i) =>
      setTimeout(() => setVisible(i + 1), (messages[i].delay || 0) * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-[240px] sm:w-[280px] h-[500px] sm:h-[580px] rounded-[2.5rem] p-[3px] bg-gradient-to-b from-[#2a2a35] to-[#0a0a0f] shadow-[20px_20px_60px_#040406,-15px_-15px_40px_#1a1a24] shrink-0 mx-auto">
      <div className="relative w-full h-full rounded-[2.35rem] bg-[#0B141A] overflow-hidden border border-white/5 shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]">
        <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 pt-3 pb-1 pointer-events-none">
          <span className="text-white/80 text-[10px] font-semibold">10:18</span>
          <div className="w-20 h-5 bg-black rounded-full flex items-center justify-center -mt-0.5 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.08)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#111] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
          </div>
          <div className="flex items-center gap-1 text-white/60">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 9l4 4 4-4"/><path d="M1 15l4 4 4-4"/></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="12" rx="2"/><path d="M6 11v4"/></svg>
          </div>
        </div>
        <div className="bg-[#0B141A] pt-10 pb-2 px-3 flex items-center gap-2.5 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-[0_0_10px_rgba(37,211,102,0.2)]">
            <Bot size={16} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-[12px] font-semibold leading-tight">Canal1 Multiagente</div>
            <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              en línea
            </div>
          </div>
          <Phone size={14} className="text-neutral-500" />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        <div className="p-3 h-full pt-2 space-y-3 relative z-10" style={{ paddingBottom: '70px' }}>
          {messages.slice(0, visible).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-2.5 rounded-2xl text-[11px] leading-relaxed shadow-sm ${msg.isUser ? 'bg-[#005c4b] text-white rounded-tr-sm' : 'bg-[#1E1E24] text-neutral-200 rounded-tl-sm'}`}>
                {msg.text}
                <span className="flex items-center gap-0.5 mt-1 text-[7px] text-white/40 justify-end">
                  {new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                  {msg.isUser && <CheckCheck size={10} className="text-[#53bdeb]" />}
                </span>
              </div>
            </motion.div>
          ))}
          {visible <= messages.length && visible > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-1.5">
              <div className="bg-[#1E1E24] px-3 py-2 rounded-2xl rounded-tl-sm flex items-center gap-1">
                <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1 h-1 rounded-full bg-neutral-500" />
                <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} className="w-1 h-1 rounded-full bg-neutral-500" />
                <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} className="w-1 h-1 rounded-full bg-neutral-500" />
              </div>
            </motion.div>
          )}
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-[#0B141A] p-2 border-t border-white/[0.06] flex items-center gap-2 z-20">
          <div className="flex-1 bg-[#1E1E24] rounded-full h-9 flex items-center px-3 gap-2 border border-white/[0.04]">
            <span className="text-[10px] text-neutral-500 flex-1">Escribe un mensaje...</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#00A884] flex items-center justify-center shadow-[0_4px_12px_rgba(0,168,132,0.3)]">
            <MessageCircle size={14} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FLOW STEP COMPONENT ─────────────────────────── */

function FlowStep({ number, icon: Icon, title, desc, delay }) {
  return (
    <FadeIn delay={delay} className="flex gap-4 items-start">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center shrink-0">
          <Icon size={18} className="text-[#25D366]" />
        </div>
        {number < 4 && <div className="w-px flex-1 min-h-[20px] bg-gradient-to-b from-[#25D366]/30 to-transparent my-1" />}
      </div>
      <div className="pb-6">
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#25D366] font-bold mb-1">Paso {number}</div>
        <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
        <p className="text-neutral-400 text-xs leading-relaxed">{desc}</p>
      </div>
    </FadeIn>
  );
}

/* ─── COMPARISON CARD ────────────────────────────── */

function ComparisonCard({ side, items, accent, delay }) {
  const isStandard = side === 'standard';
  return (
    <FadeIn delay={delay} className="flex-1">
      <div className={`rounded-2xl border p-5 h-full ${isStandard ? 'border-white/[0.06] bg-white/[0.015]' : 'border-[#25D366]/25 bg-[#25D366]/[0.03]'}`}>
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isStandard ? 'bg-neutral-800' : 'bg-[#25D366]/10'}`}>
            {isStandard ? <X size={16} className="text-red-400" /> : <Check size={16} className="text-[#25D366]" />}
          </div>
          <div>
            <div className={`text-sm font-bold ${isStandard ? 'text-neutral-400' : 'text-white'}`}>{side === 'standard' ? 'Asistente Normal' : 'Canal1 Multiagente'}</div>
            <div className={`text-[9px] uppercase tracking-wider font-semibold ${isStandard ? 'text-neutral-600' : 'text-[#25D366]'}`}>
              {side === 'standard' ? 'Limitado' : 'Multicanal Inteligente'}
            </div>
          </div>
        </div>
        <div className="space-y-2.5">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              {side === 'standard' ? (
                <X size={12} className="text-red-400/70 mt-0.5 shrink-0" />
              ) : (
                <Check size={12} className="text-[#25D366] mt-0.5 shrink-0" />
              )}
              <span className={`text-xs leading-relaxed ${isStandard ? 'text-neutral-500' : 'text-neutral-300'}`}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── FLOW VISUALIZATION ─────────────────────────── */

function FlowDiagram() {
  return (
    <div className="relative max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { icon: MessageCircle, title: 'Único Número', desc: 'Todos los clientes llegan a un solo WhatsApp', color: 'from-[#25D366] to-[#128C7E]' },
          { icon: Bot, title: 'Bot Inteligente', desc: 'Responde, califica y captura necesidades al instante', color: 'from-blue-500 to-purple-600' },
          { icon: GitBranch, title: 'Distribución', desc: 'Asigna cada lead al asesor ideal automáticamente', color: 'from-amber-500 to-orange-600' },
          { icon: Users, title: 'Equipo de Asesores', desc: 'Notifica y entrega el cliente caliente a tu equipo', color: 'from-emerald-500 to-teal-600' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 text-center hover:border-[#25D366]/30 transition-all duration-300 group h-full">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={22} className="text-white" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
            {i < 3 && (
              <div className="hidden md:flex absolute top-1/2 -right-3 z-10 w-6 h-6 rounded-full bg-[#182229] border border-[#25D366]/20 items-center justify-center">
                <ArrowRight size={10} className="text-[#25D366]" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────── */

export default function Canal1ChatbotPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, -80]);

  return (
    <main className="relative w-full min-h-screen text-[#D7E2EA] font-sans bg-[#0B141A] overflow-x-hidden selection:bg-[#25D366]/30 selection:text-white">

      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.022]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '18px 18px' }} />

      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#25D366]/[0.04] blur-[200px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6366f1]/[0.03] blur-[200px] rounded-full pointer-events-none z-0" />

      <Navbar activePage="productos" />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 1. HERO                                                 */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-24 pb-10 overflow-hidden z-10">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="flex-1 w-full max-w-xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 mb-6">
                <Sparkles size={12} className="text-[#25D366]" />
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#25D366] font-bold">Sistema Multiagente + Multicanal</span>
              </div>
            </FadeIn>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-2.5"
              >
                <BotAvatar />
                <div className="bg-[#1E1E24] p-4 rounded-2xl rounded-tl-sm shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                  <p className="text-lg sm:text-xl font-bold text-white leading-snug">
                    Canal1 <span className="text-[#25D366]">Multiagente</span>.
                  </p>
                  <p className="text-base sm:text-lg text-neutral-300 mt-1 leading-relaxed">
                    Un solo número. <br className="hidden sm:block" />
                    <strong className="text-white">Múltiples asesores. Ventas en equipo.</strong>
                  </p>
                  <span className="flex items-center gap-1 mt-3 text-[9px] text-neutral-500">
                    10:18
                    <DoubleCheck />
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-2.5"
              >
                <BotAvatar />
                <div className="bg-[#1E1E24] p-4 rounded-2xl rounded-tl-sm shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                  <p className="text-neutral-200 text-base leading-relaxed">
                    Atiendo, califico y <strong className="text-white">distribuyo cada lead</strong> al asesor ideal de tu equipo <strong className="text-white">al instante</strong>.
                  </p>
                  <span className="flex items-center gap-1 mt-3 text-[9px] text-neutral-500">
                    10:18
                    <DoubleCheck />
                  </span>
                </div>
              </motion.div>
            </div>

            <FadeIn delay={1.4}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#planes"
                  whileHover={{ scale: 1.03, backgroundColor: '#20B958' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-black font-black text-sm tracking-wider shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-all"
                >
                  Quiero Canal1
                  <ArrowRight size={16} />
                </motion.a>
                <motion.a
                  href="#como-funciona"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-sm tracking-wider hover:bg-white/[0.05] transition-all"
                >
                  Cómo funciona
                  <ChevronDown size={14} />
                </motion.a>
              </div>
            </FadeIn>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <StickyPhone />
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 opacity-40"
        >
          <span className="text-[8px] tracking-[0.3em] uppercase text-neutral-400 font-semibold">Deslizar</span>
          <ChevronDown size={12} className="text-[#25D366]" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 2. PROBLEM CONVERSATION                                  */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="como-funciona" className="relative z-10 max-w-3xl mx-auto px-6 pb-8">
        <ChatDateDivider text="El problema real" />

        <BotBubble delay={0.1}>
          <p className="font-bold text-white text-base mb-2">
            ¿Tu equipo de ventas pierde leads porque no alcanzan a responder?
          </p>
          <p className="text-neutral-300">
            Cuando un cliente escribe a tu WhatsApp, el tiempo de respuesta lo es todo. Pero si tienes 5, 10 o 20 asesores, ¿cómo sabes quién debe responder? ¿Y si todos contestan el mismo lead?
          </p>
        </BotBubble>

        <UserBubble delay={0.4}>
          <p>Exacto, a veces dos asesores terminan escribiendo al mismo cliente y queda mal. O peor, el mensaje se queda sin responder porque "no era mi turno".</p>
        </UserBubble>

        <BotBubble delay={0.7}>
          <p className="text-white font-bold text-base mb-2">
            Por eso nació Canal1: un sistema multiagente inteligente.
          </p>
          <p className="text-neutral-300">
            No es un bot normal. Es una central de atención con IA que gestiona todo tu equipo de ventas desde un solo número de WhatsApp.
          </p>
        </BotBubble>

        <BotTyping delay={1.0} />

        <BotImageBubble
          src={caseWhatsapp}
          alt="Flujo de atención multiagente Canal1"
          caption="Un solo número recibe todos los leads. El bot califica, y distribuye automáticamente al asesor disponible."
          delay={1.3}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 3. HOW IT WORKS - FLOW DIAGRAM                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-16">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 mb-4">
              <Target size={12} className="text-[#25D366]" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#25D366] font-bold">Arquitectura</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Así fluye un lead en <span className="text-[#25D366]">Canal1</span>
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl mx-auto">
              Desde que el cliente escribe hasta que un asesor lo contacta, todo ocurre en segundos.
            </p>
          </div>
        </FadeIn>

        <FlowDiagram />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FlowStep
            number={1}
            icon={MessageCircle}
            title="Cliente escribe"
            desc="El lead llega al número principal de Canal1. El bot recibe el mensaje al instante."
            delay={0.1}
          />
          <FlowStep
            number={2}
            icon={Bot}
            title="Bot califica"
            desc="La IA identifica la necesidad, captura datos clave y evalúa si es un lead caliente."
            delay={0.2}
          />
          <FlowStep
            number={3}
            icon={GitBranch}
            title="Distribuye al asesor"
            desc="Asigna el lead al asesor disponible según su especialidad, carga de trabajo o rotación."
            delay={0.3}
          />
          <FlowStep
            number={4}
            icon={Bell}
            title="Asesor recibe notificación"
            desc="El asesor recibe una notificación instantánea con todo el contexto de la conversación."
            delay={0.4}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 4. CONVERSATION SIMULATION - MULTIAGENT                  */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-8">
        <ChatDateDivider text="Mira cómo funciona en vivo" />

        <BotBubble delay={0.1}>
          <p className="text-white font-bold text-base mb-2">Escenario real:</p>
          <p className="text-neutral-300">Un cliente escribe al número principal de Canal1 preguntando por un servicio.</p>
        </BotBubble>

        <UserBubble delay={0.3}>
          <p>Hola, vi sus servicios de desarrollo web. ¿Me pueden dar más información?</p>
        </UserBubble>

        <BotTyping delay={0.6} />

        <BotBubble delay={0.9}>
          <p className="text-white font-bold mb-1">¡Hola! Claro que sí 🚀</p>
          <p className="text-neutral-300">
            Antes de darte la información completa, cuéntame: ¿qué tipo de proyecto tienes en mente?
            ¿Es una tienda online, un sitio corporativo o una aplicación web?
          </p>
        </BotBubble>

        <UserBubble delay={1.2}>
          <p>Es para una tienda online de productos físicos. Necesito que tenga carrito de compras y pasarela de pago.</p>
        </UserBubble>

        <BotTyping delay={1.5} />

        <BotBubble delay={1.8}>
          <p className="text-white font-bold mb-1">Perfecto, tengo justo lo que necesitas.</p>
          <p className="text-neutral-300">
            Déjame darte los detalles y enseguida te conecto con un asesor especializado en e-commerce que te puede guiar paso a paso.
          </p>
        </BotBubble>

        {/* Bot sends info card */}
        <FadeIn delay={2.1} className="max-w-[88%] sm:max-w-[75%]">
          <div className="flex items-start gap-2.5">
            <BotAvatar />
            <div className="bg-[#1E1E24] rounded-2xl rounded-tl-sm p-4 border border-[#25D366]/10">
              <div className="text-[9px] uppercase tracking-wider text-[#25D366] font-bold mb-2">📋 Plan E-commerce</div>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                <li className="flex items-start gap-2"><Check size={10} className="text-[#25D366] mt-0.5 shrink-0" /> Tienda online completa</li>
                <li className="flex items-start gap-2"><Check size={10} className="text-[#25D366] mt-0.5 shrink-0" /> Carrito de compras</li>
                <li className="flex items-start gap-2"><Check size={10} className="text-[#25D366] mt-0.5 shrink-0" /> Pasarela de pago integrada</li>
                <li className="flex items-start gap-2"><Check size={10} className="text-[#25D366] mt-0.5 shrink-0" /> Dashboard de administración</li>
              </ul>
            </div>
          </div>
        </FadeIn>

        <BotTyping delay={2.5} />

        <BotBubble delay={2.8}>
          <p className="text-white font-bold mb-1">¡Listo! Te voy a conectar con <strong className="text-[#25D366]">Andrea</strong>, nuestra asesora de e-commerce.</p>
          <p className="text-neutral-300 text-xs mt-2 flex items-center gap-1.5">
            <Bell size={12} className="text-amber-400" />
            Ella recibió toda esta conversación y sabe exactamente lo que necesitas.
          </p>
        </BotBubble>

        {/* System notification */}
        <FadeIn delay={3.1} className="flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 3.1 }}
            className="bg-[#182229] border border-[#25D366]/20 rounded-xl px-4 py-2 flex items-center gap-3 text-xs"
          >
            <Bell size={14} className="text-amber-400 animate-pulse" />
            <span className="text-neutral-300">
              <strong className="text-white">Andrea</strong> ha recibido la conversación
            </span>
            <div className="flex -space-x-1.5">
              <AdvisorAvatar label="A" color="from-purple-500 to-pink-600" />
            </div>
          </motion.div>
        </FadeIn>

        <AdvisorBubble label="Andrea · Asesora E-commerce" color="from-purple-500 to-pink-600" delay={3.5}>
          <p className="text-white font-bold mb-1">¡Hola! Soy Andrea 👋</p>
          <p className="text-sm leading-relaxed">
            Recibí tu consulta sobre la tienda online. Ya vi lo que necesitas y tengo todo listo para mostrarte las opciones. ¿Cuándo te parece bien que agendemos una llamada de 15 minutos?
          </p>
        </AdvisorBubble>

        <UserBubble delay={3.9}>
          <p>¡Qué rápido! Sí, me encantaría agendar. ¿Mañana a las 10am?</p>
        </UserBubble>

        <AdvisorBubble label="Andrea · Asesora E-commerce" color="from-purple-500 to-pink-600" delay={4.2}>
          <p>Perfecto, te confirmo la cita para mañana 10am. Te enviaré un recordatorio. ¡Gracias por tu interés! 😊</p>
        </AdvisorBubble>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 5. COMPARISON: NORMAL VS MULTIAGENT                     */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-8">
        <FadeIn>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 mb-4">
              <Layers size={12} className="text-[#25D366]" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#25D366] font-bold">La Diferencia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              No es un bot cualquiera. <br className="sm:hidden" />
              Es tu <span className="text-[#25D366]">equipo de ventas completo</span> en un solo número.
            </h2>
          </div>
        </FadeIn>

        <div className="flex flex-col md:flex-row gap-6">
          <ComparisonCard
            side="standard"
            items={[
              'Solo responde preguntas básicas',
              'No califica ni segmenta leads',
              'No distribuye al equipo de ventas',
              'Un solo asistente, sin escalabilidad',
              'No integra múltiples canales',
              'Sin notificaciones al equipo',
              'No gestiona carga de asesores',
            ]}
            delay={0.1}
          />
          <ComparisonCard
            side="canal1"
            items={[
              'IA que conversa, califica y cierra',
              'Segmenta leads por intención y perfil',
              'Distribuye automáticamente al asesor ideal',
              'Equipo completo de asesores vinculados',
              'Multicanal: WhatsApp, web, Messenger',
              'Notificaciones en tiempo real al equipo',
              'Balanceo de carga entre asesores',
            ]}
            delay={0.2}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 6. FEATURES GRID                                        */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-8">
        <FadeIn>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 mb-4">
              <Sparkles size={12} className="text-[#25D366]" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#25D366] font-bold">Capacidades</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Todo lo que hace <span className="text-[#25D366]">Canal1</span> por tu equipo
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <MiniFeatureCard icon={MessageCircle} title="Único Número Para Todos" desc="Un solo WhatsApp recibe todos los leads. El bot gestiona la entrada y distribuye inteligentemente." delay={0.1} />
          <MiniFeatureCard icon={Bot} title="Captura Inteligente de Leads" desc="La IA conversa, extrae necesidades, datos de contacto y nivel de interés antes de transferir." delay={0.15} />
          <MiniFeatureCard icon={GitBranch} title="Distribución Automática" desc="Asigna cada lead al asesor según especialidad, disponibilidad o reglas de negocio personalizables." delay={0.2} />
          <MiniFeatureCard icon={Bell} title="Notificaciones en Tiempo Real" desc="Los asesores reciben alerta instantánea con toda la conversación y contexto del lead." delay={0.25} />
          <MiniFeatureCard icon={Users} title="Equipo Ilimitado de Asesores" desc="Vincula todos los asesores que necesites. Cada uno con su perfil, horario y especialidad." delay={0.3} />
          <MiniFeatureCard icon={Globe} title="Multicanal Real" desc="WhatsApp, Messenger, web widget y más. Todos los canales convergen en un solo sistema." delay={0.35} />
          <MiniFeatureCard icon={BarChart3} title="Dashboard de Gestión" desc="Métrica de leads por asesor, conversión, tiempo de respuesta y rendimiento del equipo." delay={0.4} />
          <MiniFeatureCard icon={Target} title="Calificación Automática" desc="El bot identifica leads calientes, fríos y segmenta por tipo de servicio o producto." delay={0.45} />
          <MiniFeatureCard icon={Share2} title="Historial Compartido" desc="Cada asesor ve el historial completo de la conversación. Sin perder contexto nunca." delay={0.5} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 7. METRICS                                              */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-8">
        <ChatDateDivider text="Resultados con Canal1" />

        <BotBubble delay={0.1}>
          <p className="text-white font-bold text-base mb-3">Empresas que ya usan el sistema multiagente reportan:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            <MetricBadge value="3x" label="Leads calificados" />
            <MetricBadge value="92%" label="Satisfacción" />
            <MetricBadge value="-80%" label="Tiempo respuesta" />
            <MetricBadge value="+45%" label="Conversión equipo" />
          </div>
        </BotBubble>

        <UserBubble delay={0.4}>
          <p>¿Y puedo vincular a todo mi equipo de asesores?</p>
        </UserBubble>

        <BotTyping delay={0.7} />

        <BotBubble delay={1.0}>
          <p className="text-white font-bold text-base mb-2">Sí, todos los que necesites.</p>
          <p className="text-neutral-300">
            Desde 2 hasta 50 asesores. Cada uno recibe notificaciones solo de los leads que el bot les asigna.
            Tú decides las reglas: por especialidad, por rotación equitativa, o por disponibilidad en tiempo real.
          </p>
        </BotBubble>

        <BotImageBubble
          src={caseB2bMining}
          alt="Equipo de asesores usando Canal1 Multiagente"
          caption="Cada asesor recibe leads calificados con el contexto completo de la conversación."
          delay={1.3}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 8. PRICING                                              */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="planes" className="relative z-10 max-w-3xl mx-auto px-6 pb-8">
        <ChatDateDivider text="Inversión" />

        <BotBubble delay={0.1}>
          <p className="text-white font-bold text-base mb-1">Un solo plan. Sin complicaciones.</p>
        </BotBubble>

        <FadeIn delay={0.2} className="max-w-md mx-auto mt-4">
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl p-6 sm:p-8 border border-[#25D366]/30 bg-[#25D366]/[0.03] shadow-[0_0_40px_rgba(37,211,102,0.08)] text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center mx-auto mb-4">
              <Bot size={22} className="text-[#25D366]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Canal1 Multiagente</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-4">Sistema multiagente + multicanal</p>

            <div className="flex items-end justify-center gap-1 mb-6">
              <span className="text-3xl sm:text-4xl font-black text-white">{PRECIOS.chatbot.precio}</span>
              <span className="text-neutral-500 text-sm mb-1">/3 meses</span>
            </div>

            <ul className="space-y-3 mb-6 text-left max-w-xs mx-auto">
              {[
                '1 número WhatsApp principal',
                'Asistentes IA multicanales ilimitados',
                'Hasta 50 asesores vinculados',
                'Distribución inteligente de leads',
                'Captura y calificación automática',
                'Notificaciones en tiempo real',
                'Dashboard de gestión y métricas',
                'Soporte técnico prioritario',
                'Sin permanencia mínima',
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <Check size={14} className="text-[#25D366] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="w-full">
              <SlideButton
                label="Activar Canal1 ahora"
                hoverLabel="Escríbenos por WhatsApp"
                href="https://wa.me/573115893220?text=Hola%2C%20quiero%20activar%20Canal1%20Multiagente%20para%20mi%20equipo"
                target="_blank"
                rel="noopener noreferrer"
                icon={MessageCircle}
                width="100%"
                className="w-full"
              />
            </div>

            <p className="mt-4 text-[9px] text-neutral-500 flex items-center justify-center gap-1.5">
              <Shield size={9} />
              Cancela cuando quieras, sin costo adicional
            </p>
          </motion.div>
        </FadeIn>

        <BotBubble delay={0.5}>
          <p className="text-neutral-300">
            <strong className="text-white">Importante:</strong> No incluye costo de cuenta de WhatsApp Business API.
            Te asesoramos en la configuración sin costo adicional.
          </p>
        </BotBubble>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 9. TESTIMONIALS                                         */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-8">
        <ChatDateDivider text="Lo que dicen nuestros clientes" />

        <BotBubble delay={0.1}>
          <p className="text-neutral-300 italic mb-3">
            "Teníamos 12 asesores compartiendo un mismo WhatsApp. Era un caos: clientes atendidos dos veces, otros perdidos.
            Canal1 nos organizó todo. Ahora cada lead llega al asesor correcto al instante."
          </p>
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/[0.06]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-[9px] font-black text-white">R</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Ricardo Espinosa</div>
              <div className="text-[9px] text-neutral-500">Grupo Inmobiliario Horizonte</div>
            </div>
            <div className="ml-auto flex">
              {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-amber-400 fill-amber-400" />)}
            </div>
          </div>
        </BotBubble>

        <BotImageBubble
          src={caseB2bMining}
          alt="Ricardo Espinosa y su equipo con Canal1"
          caption="Ricardo organizó a sus 12 asesores en un solo sistema multiagente."
          delay={0.2}
        />

        <BotBubble delay={0.3}>
          <p className="text-neutral-300 italic mb-3">
            "Implementamos Canal1 en nuestra agencia de marketing. Pasamos de perder el 40% de los leads a capturar y distribuir el 100% entre nuestros 8 asesores. Las ventas subieron un 60%."
          </p>
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/[0.06]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-[9px] font-black text-white">M</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Mariana Vélez</div>
              <div className="text-[9px] text-neutral-500">Agencia Creedigital</div>
            </div>
            <div className="ml-auto flex">
              {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-amber-400 fill-amber-400" />)}
            </div>
          </div>
        </BotBubble>

        <UserBubble delay={0.6}>
          <p>¡Eso es exactamente lo que necesito! ¿Cómo empiezo?</p>
        </UserBubble>

        <BotTyping delay={0.8} />

        <BotBubble delay={1.0}>
          <p className="text-white font-bold text-lg">Es muy sencillo. Te activamos en minutos.</p>
        </BotBubble>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 10. FAQ                                                 */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-8">
        <ChatDateDivider text="Preguntas Frecuentes" />

        <BotBubble delay={0.1}>
          <p className="text-white font-bold text-base mb-3">Resolvamos tus dudas:</p>
          <div className="space-y-2">
            <FaqItem
              question="¿Qué diferencia a Canal1 de un chatbot normal?"
              answer="Un chatbot normal solo responde preguntas. Canal1 es un sistema multiagente: recibe, califica y distribuye leads a todo tu equipo de asesores, notificándoles en tiempo real con el contexto completo de la conversación."
              delay={0}
            />
            <FaqItem
              question="¿Cuántos asesores puedo vincular?"
              answer="Puedes vincular hasta 50 asesores. Cada uno con su propio perfil, horario y especialidad. El bot distribuye los leads de forma inteligente según las reglas que definas."
              delay={0}
            />
            <FaqItem
              question="¿Cómo saben los asesores que tienen un lead nuevo?"
              answer={'Reciben una notificación instantánea en su WhatsApp o en el panel de control, con toda la conversación previa y los datos del lead. No tienen que preguntar \u201C¿qué necesitaba?\u201D.'}
              delay={0}
            />
            <FaqItem
              question="¿Puedo usarlo en otros canales además de WhatsApp?"
              answer="Sí. Canal1 funciona en WhatsApp, Messenger, web widget, Instagram y más. Todos los canales convergen en un solo sistema y se distribuyen a tu equipo."
              delay={0}
            />
            <FaqItem
              question="¿Qué pasa si un asesor está ocupado?"
              answer="El bot detecta disponibilidad y asigna el lead a otro asesor libre, o lo pone en cola hasta que alguien esté disponible. Nunca se pierde un lead."
              delay={0}
            />
            <FaqItem
              question="¿Puedo personalizar las reglas de distribución?"
              answer="Sí. Puedes configurar distribución por especialidad, por rotación equitativa, por disponibilidad, o incluso por puntuación del lead. Tú decides."
              delay={0}
            />
            <FaqItem
              question="¿Necesito conocimientos técnicos?"
              answer="Para nada. Nosotros configuramos todo por ti. Solo necesitas tu cuenta de WhatsApp Business y nosotros hacemos el resto."
              delay={0}
            />
          </div>
        </BotBubble>

        <BotTyping delay={0.8} />

        <BotBubble delay={1.0}>
          <p className="text-white font-bold text-lg">¿Listo para transformar tu equipo de ventas?</p>
        </BotBubble>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 11. CTA FINAL                                           */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="cta" className="relative z-10 max-w-3xl mx-auto px-6 pb-16">
        <ChatDateDivider text="Empieza ahora" />

        <FadeIn>
          <motion.div
            whileHover={{ borderColor: 'rgba(37,211,102,0.5)' }}
            className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-[#25D366]/20 bg-gradient-to-br from-[#25D366]/[0.05] to-transparent"
          >
            <div className="absolute top-[-50%] right-[-30%] w-[80%] h-[80%] bg-[#25D366]/[0.06] blur-[120px] rounded-full pointer-events-none" />

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center mx-auto mb-6 relative"
            >
              <Users size={28} className="text-[#25D366]" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              Tu equipo de ventas merece <br />
              <span className="text-[#25D366]">un sistema inteligente.</span>
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto mb-8 text-base leading-relaxed">
              No pierdas más leads por falta de organización. Activa Canal1 Multiagente hoy y convierte cada mensaje en una venta para tu equipo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SlideButton
                label="Activar Canal1 ahora"
                hoverLabel="Quiero mi sistema inteligente"
                href="https://wa.me/573115893220?text=Hola%2C%20quiero%20activar%20Canal1%20Multiagente%20para%20mi%20equipo"
                target="_blank"
                rel="noopener noreferrer"
                icon={MessageCircle}
                width={320}
              />
              <motion.a
                href="#como-funciona"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full border border-white/20 text-white font-bold text-sm tracking-wider hover:bg-white/[0.05] transition-all"
              >
                Ver cómo funciona
              </motion.a>
            </div>

            <p className="mt-6 text-[10px] text-neutral-500 tracking-wider flex items-center justify-center gap-2">
              <Shield size={10} />
              Sin compromiso. Cancela cuando quieras.
            </p>
          </motion.div>
        </FadeIn>
      </section>

      <SiteFooter />

    </main>
  );
}
