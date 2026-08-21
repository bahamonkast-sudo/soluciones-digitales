import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Shield, MessageSquare, TrendingUp, Users,
  Target, Rocket, Lock, CheckCircle2, ArrowRight, ChevronDown,
  Sparkles, Star, Zap, Bot, Image as ImageIcon, Clock, Fingerprint,
  Activity, Server, Globe, Smartphone, Wallet, ChevronLeft
} from 'lucide-react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SlideButton from '../components/SlideButton';
import { getDistUrl } from '../utils/env';
import SEO from '../components/SEO';
import { SEO_CONFIG } from '../config/seoConfig';
import { PRECIOS } from '../data/precios';

/* ─── GLASS ORBS (parallax background) ─────────────────────── */

function GlassOrb({ color, size, top, left, progress, index }) {
  const center = index * 0.25;
  const start = center - 0.5;
  const end = center + 0.5;
  const x = useTransform(progress, [start, end], ['-30vw', '30vw']);
  const opacity = useTransform(progress, [start, center, end], [0, 0.6, 0]);
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none mix-blend-screen"
      style={{ backgroundColor: color, width: size, height: size, top, left, x, opacity, filter: 'blur(100px)' }}
    />
  );
}

/* ─── SPECTACULAR VISUALS ──────────────────────────────────── */

function SpectacularShield({ progress, index }) {
  const center = index * 0.25;
  const y = useTransform(progress, [center - 0.25, center, center + 0.25], [100, 0, -100]);
  const rotate = useTransform(progress, [center - 0.25, center, center + 0.25], [-20, 0, 20]);
  const scale = useTransform(progress, [center - 0.25, center, center + 0.25], [0.8, 1.1, 0.8]);
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <GlassOrb color="#1a8f55" size="400px" top="10%" left="10%" progress={progress} index={index} />
      <GlassOrb color="#0f725a" size="300px" top="50%" left="40%" progress={progress} index={index} />
      <motion.div style={{ y, rotate, scale }} className="relative z-10 w-72 h-80 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center shadow-[0_8px_32px_rgba(26,143,85,0.2)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
        <div className="relative z-10 flex flex-col items-center">
          <ShieldCheck className="w-24 h-24 text-[#1a8f55] drop-shadow-[0_0_15px_rgba(26,143,85,0.8)]" strokeWidth={1} />
          <div className="mt-6 px-4 py-1.5 rounded-full border border-[#1a8f55]/30 bg-[#1a8f55]/10">
            <span className="text-[#1a8f55] font-bold text-xs tracking-[0.3em] uppercase">PROTEGIDO</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SpectacularChat({ progress, index }) {
  const center = index * 0.25;
  const y1 = useTransform(progress, [center - 0.25, center, center + 0.25], [150, 0, -150]);
  const y2 = useTransform(progress, [center - 0.25, center, center + 0.25], [50, 0, -50]);
  const rotateY = useTransform(progress, [center - 0.25, center, center + 0.25], [-30, 0, 30]);
  const messages = [
    { text: 'Hola, ¿sigues interesado en nuestros servicios?', align: 'left' },
    { text: 'Sí, cuéntame más', align: 'right' },
    { text: 'Tenemos una oferta especial para ti...', align: 'left' },
  ];
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center" style={{ perspective: 1000 }}>
      <GlassOrb color="#0a4f3c" size="500px" top="-10%" left="20%" progress={progress} index={index} />
      <motion.div style={{ rotateY, y: y2 }} className="relative z-10 w-80 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a8f55] to-[#0f725a] flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-white text-xs font-semibold">Guardián IA</div>
            <div className="text-[9px] text-emerald-400">en línea</div>
          </div>
        </div>
        <div className="space-y-2.5">
          {messages.map((msg, i) => (
            <motion.div key={i} style={{ y: i === 0 ? y1 : y2 }} className={`flex ${msg.align === 'right' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-2.5 rounded-2xl text-xs leading-relaxed ${msg.align === 'right' ? 'bg-[#005c4b] text-white rounded-tr-sm' : 'bg-[#1E1E24] text-neutral-200 rounded-tl-sm'}`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function SpectacularScale({ progress, index }) {
  const center = index * 0.25;
  const scale = useTransform(progress, [center - 0.25, center, center + 0.25], [0.5, 1, 0.5]);
  const opacity = useTransform(progress, [center - 0.25, center, center + 0.25], [0, 1, 0]);
  const barHeight1 = useTransform(progress, [center - 0.25, center, center + 0.25], ['0%', '40%', '0%']);
  const barHeight2 = useTransform(progress, [center - 0.25, center, center + 0.25], ['0%', '70%', '0%']);
  const barHeight3 = useTransform(progress, [center - 0.25, center, center + 0.25], ['0%', '100%', '0%']);
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <GlassOrb color="#0f725a" size="400px" top="10%" left="20%" progress={progress} index={index} />
      <motion.div style={{ scale, opacity }} className="relative z-10 w-72 rounded-[40px] border border-white/20 bg-white/5 backdrop-blur-xl p-8 shadow-[0_8px_32px_rgba(15,114,90,0.3)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-30 rounded-[40px]" />
        <div className="relative z-10 text-center">
          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 drop-shadow-lg">10x</div>
          <p className="mt-2 text-[#1a8f55] tracking-[0.3em] text-xs uppercase font-bold">Volumen Seguro</p>
          <div className="w-full mt-8 flex items-end justify-center h-20 gap-3">
            <motion.div style={{ height: barHeight1 }} className="w-full bg-gradient-to-t from-[#1a8f55]/30 to-[#1a8f55] rounded-t-sm shadow-[0_0_15px_rgba(26,143,85,0.5)]" />
            <motion.div style={{ height: barHeight2 }} className="w-full bg-gradient-to-t from-[#1a8f55]/40 to-[#1a8f55] rounded-t-sm shadow-[0_0_15px_rgba(26,143,85,0.5)]" />
            <motion.div style={{ height: barHeight3 }} className="w-full bg-gradient-to-t from-[#1a8f55]/50 to-[#1a8f55] rounded-t-sm shadow-[0_0_15px_rgba(26,143,85,0.5)]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── HORIZONTAL SCROLL PANELS ─────────────────────────────── */

function HeroPanel({ progress }) {
  const y = useTransform(progress, [0, 0.25], ['0vh', '50vh']);
  const opacity = useTransform(progress, [0, 0.15], [1, 0]);
  const scale = useTransform(progress, [0, 0.25], [1, 0.8]);
  return (
    <section className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative px-6 md:px-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#000000]" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ 
          backgroundImage: `url('https://res.cloudinary.com/ddp6ychwi/image/upload/v1786063225/descarga_1_qwe7sp.png')`,
          filter: 'blur(3px)'
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#000000_100%)] opacity-80" />
      <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#1a8f55]/30 bg-[#1a8f55]/10 backdrop-blur-md mb-8">
          <ShieldCheck size={14} className="text-[#1a8f55]" />
          <span className="text-[#1a8f55] font-bold text-xs tracking-[0.25em] uppercase">Guardián de Difusión</span>
        </div>
        <h1 className="text-5xl md:text-[5rem] lg:text-[6.5rem] font-black leading-[1.1] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] pb-4">
          IMPACTO <span className="text-[#1a8f55] bg-none drop-shadow-[0_0_20px_rgba(26,143,85,0.4)]">DIRECTO</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl lg:text-2xl text-neutral-400 font-light max-w-3xl mx-auto leading-relaxed">
          Elimina el cuello de botella en tu comunicación. Difunde información relevante a miles de destinatarios de forma inmediata, segura y con cero esfuerzo repetitivo.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-10">
          <a href={getDistUrl('tutorial-guardian-difusion.html')}
            className="px-6 py-3.5 rounded-xl text-[11px] font-bold tracking-[0.15em] transition-all flex items-center justify-center w-full sm:w-auto gap-2 hover:scale-[1.02] shadow-[0_0_20px_rgba(26,143,85,0.3)]"
            style={{ backgroundColor: '#1a8f55', color: '#050508' }}>
            VER MANUAL DE INSTALACIÓN
            <ArrowRight size={16} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function FeaturePanel({ progress, index, subtitle, title, description, points, Visual }) {
  const center = index * 0.25;
  const start = center - 0.25;
  const end = center + 0.25;
  const textX = useTransform(progress, [start, center, end], ['30vw', '0vw', '-30vw']);
  const textOpacity = useTransform(progress, [start, center, end], [0, 1, 0]);
  const visualX = useTransform(progress, [start, center, end], ['-30vw', '0vw', '30vw']);
  const visualOpacity = useTransform(progress, [start, center, end], [0, 1, 0]);
  return (
    <section className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative px-6 md:px-24">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div style={{ x: visualX, opacity: visualOpacity }} className="order-2 lg:order-1">
          <Visual progress={progress} index={index} />
        </motion.div>
        <motion.div style={{ x: textX, opacity: textOpacity }} className="order-1 lg:order-2">
          <h3 className="text-[#1a8f55] tracking-[0.2em] font-bold text-sm uppercase mb-4">{subtitle}</h3>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white leading-[1.1]">{title}</h2>
          <p className="text-base md:text-lg text-neutral-400 mb-6 leading-relaxed">{description}</p>
          <ul className="space-y-3">
            {points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-neutral-300">
                <CheckCircle2 className="w-5 h-5 text-[#1a8f55] mt-0.5 shrink-0" />
                <span className="text-sm md:text-base">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FADE IN COMPONENT ────────────────────────────────────── */

function FadeIn({ children, delay = 0, y = 30, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GlowBadge({ text }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-xl mb-6">
      <div className="w-1.5 h-1.5 rounded-full bg-[#1a8f55] animate-pulse shadow-[0_0_8px_#1a8f55]" />
      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-300">{text}</span>
    </div>
  );
}

/* ─── BENEFIT CARD ─────────────────────────────────────────── */

function BenefitCard({ icon: Icon, title, desc, delay }) {
  return (
    <FadeIn delay={delay} className="group h-full">
      <motion.div whileHover={{ y: -3, scale: 1.01 }} transition={{ duration: 0.3 }} className="relative p-[1px] h-full rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a8f55]/70 via-[#1a8f55]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative p-6 h-full rounded-[23px] bg-[#050508] border border-white/[0.05] flex flex-col z-10 group-hover:bg-[#07090b] transition-colors duration-500">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#1a8f55]/0 rounded-full blur-[40px] group-hover:bg-[#1a8f55]/10 transition-colors duration-500 pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-black/50 border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#1a8f55]/40 transition-all duration-500">
            <Icon size={20} className="text-[#1a8f55]" />
          </div>
          <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#1a8f55] transition-colors duration-300">{title}</h3>
          <p className="text-xs text-neutral-400 leading-relaxed flex-grow">{desc}</p>
        </div>
      </motion.div>
    </FadeIn>
  );
}

/* ─── PRICING CARD (único) ──────────────────────────────────── */

function PricingCard() {
  const features = [
    '1 línea WhatsApp protegida',
    'Envíos ilimitados con rotación inteligente',
    'Varianza lexical + mutación de hashes',
    'Calentamiento progresivo de cuenta',
    'Dashboard de monitoreo en tiempo real',
    'Soporte prioritario 24/7',
  ];
  return (
    <FadeIn className="max-w-lg mx-auto">
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl p-8 sm:p-10 border border-[#1a8f55]/30 ring-1 ring-inset ring-[#1a8f55]/10 bg-gradient-to-br from-[#1a8f55]/[0.04] to-transparent shadow-[0_0_50px_rgba(26,143,85,0.08)] text-center relative overflow-hidden"
      >
        <div className="absolute top-[-30%] right-[-20%] w-[60%] h-[60%] bg-[#1a8f55]/[0.06] blur-[100px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a8f55]/10 border border-[#1a8f55]/20 mb-6">
          <ShieldCheck size={12} className="text-[#1a8f55]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#1a8f55]">Inversión única</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">Protección Total</h3>
        <p className="text-sm text-neutral-400 mb-6">Todo lo que necesitas para blindar tu canal de difusión.</p>

        <div className="flex items-baseline justify-center gap-2 mb-8">
          <span className="text-5xl sm:text-6xl font-black text-white">{PRECIOS.envioMasivo.precio}</span>
          <span className="text-neutral-400 text-sm font-medium">/ 3 meses</span>
        </div>

        <ul className="space-y-3 mb-8 text-left max-w-sm mx-auto">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
              <CheckCircle2 size={16} className="text-[#1a8f55] mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <SlideButton
          label="Proteger mi canal ahora"
          hoverLabel="Escríbenos por WhatsApp"
          href={`https://wa.me/573115893220?text=${encodeURIComponent(`Hola, quiero el plan de Protección Total de Guardián de Difusión por $${PRECIOS.envioMasivo.precio}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          icon={ShieldCheck}
          width={320}
        />

        <p className="mt-4 text-[10px] text-neutral-500">Pago único · Sin mensualidades · Sin permanencia</p>
      </motion.div>
    </FadeIn>
  );
}

/* ─── TESTIMONIAL ──────────────────────────────────────────── */

function TestimonialCard({ text, name, role, delay }) {
  return (
    <FadeIn delay={delay} className="h-full">
      <motion.div 
        whileHover={{ y: -3, scale: 1.01 }} 
        transition={{ duration: 0.3 }}
        className="h-full rounded-2xl border border-white/[0.06] ring-1 ring-inset ring-white/[0.02] bg-white/[0.02] p-6 backdrop-blur-sm flex flex-col"
      >
        <div className="flex mb-3">
          {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
        </div>
        <p className="text-sm text-neutral-300 italic leading-relaxed mb-4">"{text}"</p>
        <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a8f55] to-[#0f725a] flex items-center justify-center">
            <span className="text-[10px] font-black text-white">{name[0]}</span>
          </div>
          <div>
            <div className="text-xs font-semibold text-white">{name}</div>
            <div className="text-[9px] text-neutral-500">{role}</div>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

/* ─── FAQ ──────────────────────────────────────────────────── */

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div 
      whileHover={{ scale: 1.005, x: 2 }}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl border transition-all duration-400 overflow-hidden ${open ? 'bg-[#005c4b]/10 border-[#1a8f55]/30 ring-1 ring-inset ring-[#1a8f55]/20' : 'bg-[#1E1E24]/50 border-white/[0.06] hover:border-white/20 ring-1 ring-inset ring-white/[0.02]'}`}
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left gap-4">
        <span className="text-sm font-bold text-white flex-1">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center shrink-0">
          <ChevronDown size={12} className="text-neutral-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="px-4 pb-4 text-sm text-neutral-400 leading-relaxed border-t border-white/[0.04] pt-3">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── STICKY METRICS BAR ──────────────────────────────────── */

function MetricBar({ value, label, sub, delay }) {
  return (
    <FadeIn delay={delay} className="h-full">
      <motion.div 
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="text-center p-5 h-full rounded-2xl bg-white/[0.02] border border-white/[0.06] ring-1 ring-inset ring-white/[0.02] backdrop-blur-sm flex flex-col justify-center"
      >
        <div className="text-3xl font-black text-[#1a8f55]">{value}</div>
        <div className="text-xs font-bold text-white mt-1">{label}</div>
        <div className="text-[9px] text-neutral-500 mt-0.5">{sub}</div>
      </motion.div>
    </FadeIn>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* ─── MAIN PAGE ───────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════ */

export default function GuardianDifusionPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });
  const x = useTransform(smoothProgress, [0, 1], ['0vw', '-400vw']);

  return (
    <div className="bg-[#000000] text-white min-h-screen selection:bg-[#1a8f55]/30 font-sans">
      <SEO {...SEO_CONFIG.guardian} />
      <Navbar activePage="productos" />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* HORIZONTAL SCROLL — 5 PANELS (500vh)                    */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section ref={targetRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-[#000000]">
          <motion.div style={{ x }} className="flex h-full w-[500vw]">
            <HeroPanel progress={smoothProgress} />
            <FeaturePanel
              index={1}
              progress={smoothProgress}
              subtitle="Seguridad Absoluta"
              title="Escudo Anti-Baneo"
              description="Nuestra infraestructura rota firmas digitales, simula comportamiento humano real y distribuye los envíos en ventanas naturales para que Meta nunca detecte un patrón anómalo."
              Visual={SpectacularShield}
              points={['Rotación de proxies 4G/5G con IPs limpias.', 'Simulación de escritura humana con pausas y correcciones.', 'Límites dinámicos de envío que evolucionan con tu cuenta.']}
            />
            <FeaturePanel
              index={2}
              progress={smoothProgress}
              subtitle="Empatía Sintética"
              title="Psicología Aplicada"
              description="No enviamos texto estático. Creamos micro-conversaciones: el bot saluda, espera, responde y reacciona como una persona real. Cada interacción es única."
              Visual={SpectacularChat}
              points={['Tiempos de escritura y lectura dinámicos no repetitivos.', 'Spintax profundo: cada mensaje tiene estructura única.', 'Inicio con cuentas semilla para calentar el terreno.']}
            />
            <FeaturePanel
              index={3}
              progress={smoothProgress}
              subtitle="Crecimiento Inteligente"
              title="Escalabilidad Gradual"
              description="Rampas de volumen algorítmicas. Empezamos con interacciones ligeras y escalamos progresivamente. Tu Trust Score crece de forma orgánica, no sospechosa."
              Visual={SpectacularScale}
              points={['Algoritmo de Trust Score que monitorea tu reputación.', 'Curva de envíos segura: sin picos antinaturales.', 'Monitoreo 24/7 del estado de tu línea telefónica.']}
            />
            <div className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-fixed opacity-60"
                style={{ backgroundImage: `url('https://res.cloudinary.com/ddp6ychwi/image/upload/v1786063225/descarga_1_qwe7sp.png')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050508]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 2. MÉTRICAS DE IMPACTO                                  */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-12 py-24 bg-[#050508] border-y border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <GlowBadge text="Resultados Reales" />
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Números que <span className="text-[#1a8f55]">importan</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricBar value="98%" label="Tasa de Entrega" sub="Mensajes que llegan a destino" delay={0.1} />
            <MetricBar value="0" label="Cuentas Bloqueadas" sub="En más de 6 meses de operación" delay={0.2} />
            <MetricBar value="+340%" label="ROI en Campañas" sub="Vs. envío tradicional sin protección" delay={0.3} />
            <MetricBar value="24/7" label="Monitoreo Activo" sub="Vigilamos tu reputación en tiempo real" delay={0.4} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 3. BENEFICIOS DETALLADOS                                */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="beneficios" className="relative z-10 px-6 md:px-12 py-32 bg-fixed bg-center bg-cover" style={{ backgroundImage: `url('https://res.cloudinary.com/ddp6ychwi/image/upload/v1786066975/Mobile_phone_displaying_holograp__202608062042_1_cuwc9y.jpg')` }}>
        <div className="absolute inset-0 bg-[#000000]/70 backdrop-blur-[2px]" />
        
        {/* Difuminado superior para evitar corte brusco */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050508] to-transparent" />
        {/* Difuminado inferior para evitar corte brusco */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <GlowBadge text="6 Capas de Protección" />
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">Arquitectura <span className="text-[#1a8f55]">Anti-Baneo</span></h2>
            <p className="text-neutral-300 max-w-2xl mx-auto text-base">Cada envío pasa por seis filtros de seguridad antes de tocar WhatsApp.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <BenefitCard icon={Fingerprint} title="1. Varianza Lexical" desc="Spintax profundo que altera sinónimos y estructura de oraciones en cada mensaje. Meta nunca lee dos mensajes iguales." delay={0.1} />
            <BenefitCard icon={ImageIcon} title="2. Mutación de Hashes" desc="Las imágenes se modifican binariamente en cada envío. Para WhatsApp, es un archivo nuevo cada vez." delay={0.2} />
            <BenefitCard icon={Clock} title="3. Estocástica de Tiempos" desc="El sistema inyecta retrasos, pausas para 'pensar' y simulación de tipeo. Nadie escribe a intervalos perfectos." delay={0.3} />
            <BenefitCard icon={Users} title="4. Personalización Total" desc="Cada mensaje lleva nombre, cargo o dato personalizado. La empatía frena el botón de 'Reportar'." delay={0.4} />
            <BenefitCard icon={Server} title="5. Enrutamiento Limpio" desc="Difusión segmentada para bases calientes y frías. Evita saturar contactos nuevos con volumen agresivo." delay={0.5} />
            <BenefitCard icon={Activity} title="6. Maduración Continua" desc="Integración con sistemas de calentamiento. Tu número nunca deja de construir reputación positiva." delay={0.6} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 4. TESTIMONIOS                                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-12 py-24 bg-[#050508] border-y border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <GlowBadge text="Casos de Éxito" />
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Lo que dicen <span className="text-[#1a8f55]">nuestros clientes</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TestimonialCard
              text="Perdía 3 números al mes por enviar campañas sin protección. Con Guardián llevo 8 meses con la misma línea y he triplicado mis envíos."
              name="Ricardo Torres"
              role="Director Comercial · InnovaGroup"
              delay={0.1}
            />
            <TestimonialCard
              text="La diferencia entre quemar cuentas y construir un canal sólido. Implementamos Guardián y nuestra tasa de entrega pasó del 40% al 95%."
              name="Ana Lucía Herrera"
              role="CEO · MarketPro"
              delay={0.2}
            />
            <TestimonialCard
              text="Lo mejor es que no tengo que pensar en límites. El sistema solo funciona, escala solo, y mis campañas llegan sin bloqueos."
              name="Jorge Martínez"
              role="Fundador · LeadGen"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 5. PRECIOS                                              */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="precios" className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <GlowBadge text="Inversión" />
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">Protección <span className="text-[#1a8f55]">Completa</span></h2>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm">Un solo plan. Todo incluido. Sin sorpresas.</p>
          </div>
          <PricingCard />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 6. FAQ                                                  */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-12 py-24 bg-[#050508] border-y border-white/[0.04]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <GlowBadge text="Respuestas Claras" />
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Preguntas <span className="text-[#1a8f55]">Frecuentes</span></h2>
          </div>
          <div className="space-y-3">
            <FaqItem question="¿Guardián asegura al 100% que mi número no será bloqueado?" answer="Mitigamos hasta un 98% de los riesgos algorítmicos. La seguridad total no existe si los usuarios te reportan manualmente. Nuestro sistema evita al algoritmo, pero el contenido debe aportar valor." />
            <FaqItem question="¿Necesito conocimientos técnicos para usarlo?" answer="No. Es un plugin que se instala en tu WordPress en minutos. La interfaz gráfica te guía para configurar campañas sin escribir código." />
            <FaqItem question="¿Cómo funciona la Varianza Lexical?" answer="Implementamos Spintax avanzado. Si tu mensaje dice 'Hola {nombre}, tenemos una {oferta|promoción|rebaja}', cada destinatario recibe una combinación única. Meta nunca ve un patrón repetido." />
            <FaqItem question="¿Qué pasa si Meta actualiza sus algoritmos?" answer="Nuestro equipo monitorea cambios en las políticas de WhatsApp día a día. La licencia incluye actualizaciones automáticas del Escudo Anti-Baneo." />
            <FaqItem question="¿Puedo importar mi propia base de datos?" answer="Sí. Carga tus contactos desde CSV o Excel. El sistema mapea nombres y datos para personalizar cada mensaje automáticamente." />
            <FaqItem question="¿Funciona para envíos a grupos de WhatsApp?" answer="Sí. Contamos con enrutamiento limpio para grupos, respetando tiempos de espera naturales y evitando activar alarmas de spam." />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 7. CTA FINAL                                            */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <motion.div whileHover={{ borderColor: 'rgba(26,143,85,0.5)' }} className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-[#1a8f55]/20 bg-gradient-to-br from-[#1a8f55]/[0.05] to-transparent">
              <div className="absolute top-[-50%] right-[-30%] w-[80%] h-[80%] bg-[#1a8f55]/[0.06] blur-[120px] rounded-full pointer-events-none" />
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="w-16 h-16 rounded-2xl bg-[#1a8f55]/10 border border-[#1a8f55]/20 flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={28} className="text-[#1a8f55]" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Tu inversión publicitaria <br />
                <span className="text-[#1a8f55]">merece un canal protegido.</span>
              </h2>
              <p className="text-neutral-400 max-w-xl mx-auto mb-8 text-base leading-relaxed">
                No arriesgues tu base de datos con herramientas que banean tu número en la primera hora. Construye un canal de ventas sólido que realmente funcione.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-8">
                <a href={getDistUrl('tutorial-guardian-difusion.html')}
                  className="px-6 py-3.5 rounded-xl text-[11px] font-bold tracking-[0.15em] transition-all flex items-center justify-center w-full sm:w-auto gap-2 hover:scale-[1.02] shadow-[0_0_20px_rgba(26,143,85,0.3)]"
                  style={{ backgroundColor: '#1a8f55', color: '#050508' }}>
                  VER MANUAL DE INSTALACIÓN
                  <ArrowRight size={16} />
                </a>
              </div>
              <p className="mt-6 text-[10px] text-neutral-500 tracking-wider flex items-center justify-center gap-2">
                <Lock size={10} />
                Sin compromiso. Cancela cuando quieras.
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────── */}
      <SiteFooter />

    </div>
  );
}
