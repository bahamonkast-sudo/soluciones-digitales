import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Check, ChevronDown, Clock, Users, Star, Sparkles, Brain, TrendingUp, MessageCircle, Bot, Repeat } from 'lucide-react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SlideButton from '../components/SlideButton';
import SEO from '../components/SEO';
import { SEO_CONFIG } from '../config/seoConfig';
import { PRECIOS } from '../data/precios';

function useCountUp(end, duration = 2) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const sv = useSpring(mv, { stiffness: 50, damping: 20 });
  const [dsp, setDsp] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const step = end / (duration * 60);
    const t = setInterval(() => {
      const next = Math.min(mv.get() + step, end);
      mv.set(next);
      if (next >= end) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [inView]);
  useEffect(() => { const u = sv.on('change', v => setDsp(Math.floor(v))); return u; }, [sv]);
  return { ref, dsp };
}

const GOLD = '#C7A254';

function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    rx.set(-(e.clientY - (r.top + r.height / 2)) / r.height * 10);
    ry.set((e.clientX - (r.left + r.width / 2)) / r.width * 10);
    gx.set(((e.clientX - r.left) / r.width) * 100);
    gy.set(((e.clientY - r.top) / r.height) * 100);
  };
  const leave = () => { rx.set(0); ry.set(0); gx.set(50); gy.set(50); };
  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ rotateX: rx, rotateY: ry, perspective: 1000 }} className={`relative ${className}`}>
      <motion.div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at ${gx}% ${gy}%, rgba(199,162,84,0.12), transparent 70%)` }} />
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const leave = () => { x.set(0); y.set(0); };
  return <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ x: sx, y: sy }} className={className}>{children}</motion.div>;
}

function GridBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.015]">
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(199,162,84,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(199,162,84,0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
    </div>
  );
}

function CornerFrame({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-0 left-0 w-3 h-px bg-gradient-to-r from-yellow-400/60 to-transparent" />
      <div className="absolute top-0 left-0 w-px h-3 bg-gradient-to-b from-yellow-400/60 to-transparent" />
      <div className="absolute top-0 right-0 w-3 h-px bg-gradient-to-l from-yellow-400/60 to-transparent" />
      <div className="absolute top-0 right-0 w-px h-3 bg-gradient-to-b from-yellow-400/60 to-transparent" />
      <div className="absolute bottom-0 left-0 w-3 h-px bg-gradient-to-r from-yellow-400/60 to-transparent" />
      <div className="absolute bottom-0 left-0 w-px h-3 bg-gradient-to-t from-yellow-400/60 to-transparent" />
      <div className="absolute bottom-0 right-0 w-3 h-px bg-gradient-to-l from-yellow-400/60 to-transparent" />
      <div className="absolute bottom-0 right-0 w-px h-3 bg-gradient-to-t from-yellow-400/60 to-transparent" />
      {children}
    </div>
  );
}

function GlassCard({ children, className = '' }) {
  return (
    <div className={`relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent" />
      {children}
    </div>
  );
}

function FadeIn({ children, delay = 0, y = 40, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      <div className="w-1 h-1 rotate-45 bg-yellow-400/40" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
    </div>
  );
}

function ParallaxBg({ speed = 0.5, children, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  );
}

function PulseDot() {
  return (
    <span className="relative inline-flex w-1.5 h-1.5">
      <span className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-40" />
      <span className="relative rounded-full bg-yellow-400 w-1.5 h-1.5" />
    </span>
  );
}

function PhoneMockup() {
  const messages = [
    { side: 'left', text: 'Hola, ¿me pueden dar información sobre sus planes?', time: '2:13 AM' },
    { side: 'right', text: '¡Hola! Claro. Soy BotWeb IA, el asistente virtual de Soluciones Digitales.', time: '2:13 AM', read: true },
    { side: 'right', text: `Tenemos un plan desde ${PRECIOS.pilotoPro.mensual}/mes o ${PRECIOS.pilotoPro.trimestral}/trimestral. ¿Te interesa para tu negocio?`, time: '2:13 AM', read: true },
    { side: 'left', text: 'Sí, ¿puedo agendar una llamada?', time: '2:14 AM' },
    { side: 'right', text: 'Claro, te confirmo el precio y te paso más información. ¿Te parece bien?', time: '2:14 AM', read: true },
  ];

  return (
    <div className="mx-auto w-[260px] sm:w-[290px]">
      <div className="relative rounded-[2.2rem] border-4 border-black bg-black shadow-[0_0_80px_rgba(199,162,84,0.08),0_0_0_1px_rgba(199,162,84,0.06)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[22px] bg-black rounded-b-2xl z-10" />
        <div className="bg-white rounded-[1.7rem] overflow-hidden">
          <div className="bg-[#075e54] px-3.5 py-2.5 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center"><Bot size={12} className="text-white" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-[10px] font-semibold">BotWeb IA</div>
              <div className="text-[#96c6c0] text-[7px] flex items-center gap-1"><PulseDot /><span>en línea</span></div>
            </div>
          </div>
          <div className="bg-[#e5ddd5] min-h-[340px] p-2.5 space-y-2" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4c5b3\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.35, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`flex ${msg.side === 'right' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[82%] rounded-lg px-2.5 py-1.5 text-[10px] leading-relaxed shadow-sm ${msg.side === 'right' ? 'bg-[#dcf8c6] text-[#303030] rounded-br-sm' : 'bg-white text-[#303030] rounded-bl-sm'}`}>
                  <div>{msg.text}</div>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <span className="text-[7px] text-[#8c8c8c]">{msg.time}</span>
                    {msg.read && <Check size={8} className="text-[#4fc3f7]" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-white px-2.5 py-2 flex items-center gap-2 border-t border-gray-100">
            <div className="flex-1 bg-[#f0f2f5] rounded-full px-3.5 py-1.5 text-[9px] text-gray-400">Escribe un mensaje...</div>
            <div className="w-6 h-6 rounded-full bg-[#075e54] flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatbotPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end end'] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [openFaq, setOpenFaq] = useState(null);
  const [planTrimestral, setPlanTrimestral] = useState(false);

  return (
    <main ref={heroRef} className="relative w-full min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-yellow-400/30 selection:text-black">
      <SEO {...SEO_CONFIG.chatbot} />
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent z-50 origin-left" style={{ scaleX: scrollYProgress }} />
      <GridBg />
      <Navbar activePage="productos" />

      <section className="relative z-10 min-h-[100dvh] flex items-center px-6 pt-24 sm:pt-0">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div style={{ y: heroBgY }} className="absolute inset-0">
            <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-yellow-500/5 blur-[140px]" />
            <div className="absolute bottom-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-yellow-500/3 blur-[100px]" />
          </motion.div>
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/[0.03] backdrop-blur-xl mb-6">
              <PulseDot />
              <span className="text-[8px] uppercase tracking-[0.3em] text-yellow-400 font-semibold">Disponible 24/7 en WhatsApp</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-6xl sm:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight mb-4">
              <span className="block">BotWeb</span>
              <span className="block text-yellow-400 mt-1">IA</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-base sm:text-lg text-neutral-500 max-w-md leading-relaxed font-light mx-auto lg:mx-0">
              Mientras tu equipo descansa, mientras tú atiendes otras áreas del negocio, mientras el teléfono suena sin que nadie conteste... <span className="text-white font-semibold">BotWeb IA ya está respondiendo y asistiendo a tus clientes en WhatsApp.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-10 flex flex-col sm:flex-row items-center lg:justify-start gap-4">
              <MagneticButton>
                <SlideButton
                  label="Activar BotWeb IA"
                  hoverLabel="Escríbenos ahora"
                  href="https://wa.me/573115893220?text=Hola%2C%20quiero%20activar%20BotWeb%20IA%20para%20mi%20negocio"
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={MessageCircle}
                  width={300}
                />
              </MagneticButton>
              <a href="#como-funciona" className="inline-flex items-center gap-2 px-8 py-4 rounded-full backdrop-blur-xl border border-white/15 text-white/60 font-semibold text-sm tracking-wider hover:border-white/30 transition-colors"><Zap size={12} /> Ver funcionamiento</a>
            </motion.div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <GlassCard className="p-8 w-full max-w-sm">
                <div className="text-[10px] uppercase tracking-[0.25em] text-yellow-400/70 font-semibold mb-6 text-center">— Resultados comprobados —</div>
                <div className="space-y-5">
                  {[
                    { icon: TrendingUp, value: '+40%', label: 'Más leads calificados' },
                    { icon: Clock, value: '24/7', label: 'Respuesta inmediata en WhatsApp' },
                    { icon: Users, value: '∞', label: 'Conversaciones simultáneas ilimitadas' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/15 flex items-center justify-center shrink-0"><item.icon size={15} className="text-yellow-400" /></div>
                      <div>
                        <div className="text-white font-bold text-base">{item.value}</div>
                        <div className="text-neutral-500 text-[10px]">{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-white/[0.04]"><div className="text-[10px] text-neutral-600 text-center">Licencia por período contratado · Equipo local</div></div>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
          <span className="text-[7px] uppercase tracking-[0.3em] text-neutral-600">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="w-px h-6 bg-gradient-to-b from-yellow-400/40 to-transparent" />
        </motion.div>
      </section>

      <SectionDivider />

      <section className="relative z-10 py-32 sm:py-48 px-6">
        <ParallaxBg speed={0.4}>
          <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-yellow-500/[0.02] blur-[100px]" />
        </ParallaxBg>
        <ParallaxBg speed={-0.3}>
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-yellow-500/[0.015] blur-[120px]" />
        </ParallaxBg>
        <div className="max-w-4xl mx-auto relative">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.015] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] p-8 sm:p-12 md:p-16">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent" />
            <div className="relative space-y-5 text-sm sm:text-base text-neutral-500 leading-relaxed font-light">
              <div className="text-[10px] uppercase tracking-[0.3em] text-yellow-400/60 font-semibold">— Capítulo I · El diagnóstico —</div>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">Hay un momento del día en que <span className="text-yellow-400">tu negocio se queda completamente solo.</span></h2>
              <p>Son las 10 de la noche. Tu equipo se fue. Tú estás cenando. Pero en algún lugar de la ciudad hay un cliente con el teléfono en la mano, escribiendo un mensaje en WhatsApp. Quiere saber el precio de tu producto. Quiere contratar tu servicio. Quiere <span className="text-white/70 font-medium">darle su dinero a quien le responda primero.</span></p>
              <p>Y si no respondes, se lo dará a otro. Así de simple. El 78% de los clientes espera una respuesta inmediata. Cada hora sin respuesta es una oportunidad de atención que se pierde.</p>
              <p className="text-white/70 font-medium">BotWeb IA es la persona que tu negocio necesita cuando tú no puedes estar. No es un chatbot genérico con respuestas prefabricadas. Es un asistente con inteligencia conversacional que entiende el contexto de cada cliente y responde con la información que le has proporcionado. 24/7. En WhatsApp. Sin dormir. Sin errores. Sin límite de consultas simultáneas.</p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="como-funciona" className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-20">
            <div className="text-[10px] uppercase tracking-[0.3em] text-yellow-400/60 font-semibold mb-4">— Protocolo de activación —</div>
            <h2 className="text-4xl sm:text-6xl font-black leading-[1.05] mb-4">De cero a atendiendo en <span className="text-yellow-400">menos de 5 minutos</span></h2>
            <p className="text-neutral-500 text-sm max-w-xl mx-auto font-light mt-4">Instalas el software en tu PC, le cargas la información de tu negocio y empieza a atender clientes en WhatsApp al instante.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: MessageCircle, title: 'Instalas en tu PC', desc: 'Descargas e instalas el software en tu equipo local. Una sola vez. Sin depender de servidores externos ni conexiones cloud.' },
              { step: '02', icon: Brain, title: 'Cargas tu información', desc: 'Le proporcionas la información de tu negocio: productos, servicios, precios, horarios y tono de atención. Ella aprende al instante.' },
              { step: '03', icon: TrendingUp, title: 'Ella atiende por ti', desc: 'Desde el primer mensaje, BotWeb IA responde consultas, resuelve dudas y asiste a tus clientes automáticamente. Tú solo supervisas.' }
            ].map((item, i) => (
              <TiltCard key={i}>
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                  <GlassCard className="p-8 sm:p-10 text-center group hover:border-yellow-500/25 transition-all duration-500">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/15 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={22} className="text-yellow-400" />
                    </div>
                    <div className="text-yellow-400 text-[11px] font-mono mb-3 tracking-wider">{item.step}</div>
                    <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                    <div className="mt-6 flex items-center justify-center gap-1.5 text-[8px] text-yellow-400/40 uppercase tracking-widest">
                      <span className="w-2 h-px bg-yellow-400/30" />
                      {['Instalar', 'Entrenar', 'Atender'][i]}
                      <span className="w-2 h-px bg-yellow-400/30" />
                    </div>
                  </GlassCard>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="relative z-10 py-32 px-6 overflow-hidden">
        <ParallaxBg speed={0.3}>
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-yellow-500/[0.012] blur-[150px]" />
        </ParallaxBg>
        <div className="max-w-6xl mx-auto relative">
          <FadeIn className="text-center mb-16">
            <div className="text-[10px] uppercase tracking-[0.3em] text-yellow-400/60 font-semibold mb-4">— Especificaciones —</div>
            <h2 className="text-4xl sm:text-6xl font-black leading-[1.05] mb-4">Esto no es un chatbot <span className="text-yellow-400">cualquiera</span></h2>
            <p className="text-neutral-500 text-sm max-w-2xl mx-auto font-light mt-4">La mayoría de los chatbots repiten respuestas prefabricadas como un menú de opciones. BotWeb IA entiende contexto, detecta emociones y se adapta al tono de cada cliente. No es un formulario con patas. Es una conversación real con inteligencia artificial.</p>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="lg:col-span-2 lg:row-span-2">
              <TiltCard className="h-full group">
                <motion.div initial={{ opacity: 0, scale: 0.8, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="h-full">
                  <GlassCard className="p-6 sm:p-8 group-hover:border-yellow-500/20 transition-all duration-500 h-full flex flex-col items-center justify-center">
                    <CornerFrame className="w-full flex flex-col items-center">
                      <div className="text-[9px] uppercase tracking-[0.25em] text-yellow-400/50 font-semibold mb-4">— Vista previa en vivo —</div>
                      <motion.div initial={{ scale: 0.6 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
                        <PhoneMockup />
                      </motion.div>
                      <div className="mt-4 text-[8px] text-neutral-600 max-w-xs text-center leading-relaxed">Conversación real a las 2:13 AM. Cliente escribe, BotWeb IA responde al instante con tono empático y cierra una reunión.</div>
                    </CornerFrame>
                  </GlassCard>
                </motion.div>
              </TiltCard>
            </div>

            <TiltCard className="group">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard className="p-6 h-full group-hover:border-yellow-500/20 transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/15 to-yellow-500/5 border border-yellow-500/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"><Zap size={18} className="text-yellow-400" /></div>
                  <h3 className="text-white font-bold text-sm mb-2 tracking-wide">Velocidad Relámpago</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">BotWeb IA responde en milisegundos. El cliente escribe y recibe una respuesta antes de que termine de leer su propio mensaje. El primero en responder gana la venta, y BotWeb IA es siempre el primero.</p>
                </GlassCard>
              </motion.div>
            </TiltCard>

            <TiltCard className="group">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard className="p-6 h-full group-hover:border-yellow-500/20 transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/15 to-yellow-500/5 border border-yellow-500/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"><Brain size={18} className="text-yellow-400" /></div>
                  <h3 className="text-white font-bold text-sm mb-2 tracking-wide">Conversión Integrada</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">Analiza el tono y las palabras del cliente para detectar si está interesado, frustrado o indeciso. Adapta cada respuesta al estado emocional del cliente. Si está molesto, responde con empatía. Si está listo para comprar, acelera el cierre sin ser invasivo.</p>
                </GlassCard>
              </motion.div>
            </TiltCard>

            <TiltCard className="group">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard className="p-6 h-full group-hover:border-yellow-500/20 transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/15 to-yellow-500/5 border border-yellow-500/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"><Users size={18} className="text-yellow-400" /></div>
                  <h3 className="text-white font-bold text-sm mb-2 tracking-wide">Base de Conocimiento</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">BotWeb IA solo responde sobre la información que le proporcionas. Si no sabe algo, lo dice claramente. Sin inventar respuestas, sin dar información falsa, sin poner en riesgo tu reputación.</p>
                </GlassCard>
              </motion.div>
            </TiltCard>

            <TiltCard className="group">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard className="p-6 h-full group-hover:border-yellow-500/20 transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/15 to-yellow-500/5 border border-yellow-500/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"><Star size={18} className="text-yellow-400" /></div>
                  <h3 className="text-white font-bold text-sm mb-2 tracking-wide">Personalidad Única</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">No hay dos BotWeb IA iguales. Le enseñas tu tono de voz, tu conocimiento del producto, tu forma de manejar objeciones. El resultado es una conversación tan natural que tus clientes no sabrán que están hablando con una inteligencia artificial.</p>
                </GlassCard>
              </motion.div>
            </TiltCard>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-black leading-[1.1] mb-4">Quienes ya <span className="text-yellow-400">despertaron</span></h2>
            <p className="text-neutral-500 text-sm max-w-lg mx-auto font-light">Negocios como el tuyo ya están facturando mientras duermen. Esto es lo que dicen.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-12 text-left">
            {[
              { text: 'Recibíamos consultas a las 3 de la mañana. Pensé que era mi equipo trabajando de madrugada. Era BotWeb IA.', name: 'Carlos Mendoza', role: 'Seguros López' },
              { text: 'Recuperé 15 horas a la semana. BotWeb IA agenda, califica y responde por mí. Yo solo llego a las reuniones que ella dejó agendadas.', name: 'María Fernanda', role: 'Inmobiliaria Horizonte' },
              { text: 'Mis pacientes creen que hablan con una asistente humana real. El tono, la calidez, la precisión en cada respuesta. Es impresionante.', name: 'Andrés Rojas', role: 'Clínica Dental Care' }
            ].map((t, i) => (
              <TiltCard key={i}>
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                  <GlassCard className="p-6 flex flex-col h-full group hover:border-yellow-500/20 transition-all duration-500">
                    <svg className="w-5 h-5 text-yellow-400/30 mb-3" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z"/></svg>
                    <p className="text-sm text-white/80 leading-relaxed flex-1 mb-5">"{t.text}"</p>
                    <div className="pt-4 border-t border-white/[0.04]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 border border-yellow-400/15 flex items-center justify-center text-[10px] text-yellow-400 font-bold">{t.name.charAt(0)}</div>
                        <div><div className="text-white font-bold text-sm">{t.name}</div><div className="text-neutral-500 text-[10px]">{t.role}</div></div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="relative z-10 py-32 px-6">
        <div className="max-w-lg mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] mb-4">Una inversión. <span className="text-yellow-400">Resultados reales.</span></h2>
            <p className="text-neutral-500 text-sm mt-4 font-light max-w-xs mx-auto">Licencia por período contratado. Funciona en tu propio PC.</p>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8">
            <div className="inline-flex items-center gap-4 p-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <button onClick={() => setPlanTrimestral(false)} className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${!planTrimestral ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(199,162,84,0.15)]' : 'text-neutral-500 hover:text-white'}`}>Mensual</button>
              <button onClick={() => setPlanTrimestral(true)} className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${planTrimestral ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(199,162,84,0.15)]' : 'text-neutral-500 hover:text-white'}`}>Trimestral</button>
            </div>
          </FadeIn>
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={planTrimestral ? 'trimestral' : 'mensual'}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard>
                  <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                    <GlassCard className={`p-8 sm:p-10 relative overflow-hidden ${planTrimestral ? 'border-yellow-500/20' : 'border-white/[0.06]'}`}>
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
                      {planTrimestral && <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-yellow-500 text-[8px] text-black font-bold uppercase tracking-wider">Recomendado</div>}
                      <CornerFrame>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-yellow-400/70 font-semibold mb-2">{planTrimestral ? 'Trimestral' : 'Mensual'}</div>
                        <div className="flex items-end justify-center gap-1.5 mb-2">
                          <span className="text-5xl sm:text-6xl font-black text-white">{planTrimestral ? PRECIOS.pilotoPro.trimestral : PRECIOS.pilotoPro.mensual}</span>
                          {!planTrimestral && <span className="text-neutral-500 text-sm mb-1.5">/mes</span>}
                        </div>
                        {planTrimestral && <div className="text-neutral-500 text-sm">3 meses · <span className="text-yellow-400/80 font-semibold">ahorras {PRECIOS.pilotoPro.mensualTxt}</span></div>}
                        {!planTrimestral && <div className="text-[8px] text-neutral-600 mt-1 uppercase tracking-wider">Cancela cuando quieras</div>}
                        <div className="mt-6 space-y-2.5 mb-8 text-left max-w-xs mx-auto">
                          {[
                            'Respuestas inteligentes 24/7 en WhatsApp',
                            'Atención automática de consultas de clientes',
                            'Análisis de tono y emociones del cliente',
                            'Notas de voz y mensajes de texto',
                            'Reportes semanales de conversaciones',
                            'Soporte prioritario 1:1',
                            'Instalación en tu PC local'
                          ].map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }} className="flex items-start gap-2.5 text-sm text-neutral-400">
                              <Check size={13} className="text-yellow-400 mt-0.5 shrink-0" /> {f}
                            </motion.div>
                          ))}
                        </div>
                        <MagneticButton>
                          <div className="w-full">
                            <SlideButton
                              label={planTrimestral ? 'Elegir trimestral' : 'Elegir mensual'}
                              hoverLabel="Activar por WhatsApp"
                              href={`https://wa.me/573115893220?text=${encodeURIComponent(`Hola, quiero activar BotWeb IA por $${planTrimestral ? `${PRECIOS.pilotoPro.trimestralTxt} trimestral` : `${PRECIOS.pilotoPro.mensualTxt} mensual`}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              icon={ArrowRight}
                              width="100%"
                              className="w-full"
                            />
                          </div>
                        </MagneticButton>
                      </CornerFrame>
                    </GlassCard>
                  </motion.div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-black text-white">— Preguntas frecuentes —</h2>
            <p className="text-neutral-500 text-sm mt-2 font-light">Lo que siempre quisiste saber antes de contratar un asistente con inteligencia artificial.</p>
          </FadeIn>
          <div className="space-y-1">
            {[
              { q: '¿Necesito conocimientos técnicos para usarlo?', a: 'Para nada. Si sabes enviar un mensaje de WhatsApp, sabes usar BotWeb IA. Nosotros configuramos todo por ti. Tú solo tienes que estar listo para recibir más clientes.' },
              { q: '¿Qué pasa si el bot no sabe responder algo?', a: 'BotWeb IA responde únicamente con la información que le has proporcionado. Si alguien pregunta algo que no está en su base de conocimiento, responde de forma honesta que no está capacitado para ese tema. Nunca inventa respuestas ni da información falsa.' },
              { q: '¿Realmente entiende las emociones de mis clientes?', a: 'Sí. BotWeb IA analiza el lenguaje, las palabras clave y el tono de cada mensaje para detectar el estado emocional del cliente. Si está molesto, responde con empatía. Si está indeciso, refuerza los beneficios. Si está listo para comprar, acelera el cierre.' },
              { q: '¿Funciona con mi número de WhatsApp actual?', a: 'Sí. BotWeb IA se conecta directamente con tu WhatsApp Business existente. No pierdes tu número, no pierdes tus conversaciones, no tienes que migrar nada.' },
              { q: '¿Funciona en la nube o en mi PC?', a: 'BotWeb IA se instala directamente en tu PC. No depende de servidores externos ni conexiones cloud. Toda la información se procesa de forma local.' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="border-b border-white/[0.04]">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-5 text-white font-semibold text-sm tracking-wide text-left gap-4 hover:text-yellow-400 transition-colors">
                  {item.q}
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center shrink-0"><ChevronDown size={10} className="text-neutral-500" /></motion.div>
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="text-neutral-500 text-sm leading-relaxed max-w-2xl pb-5">{item.a}</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="relative z-10 py-40 sm:py-56 px-6 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-yellow-500/[0.02] blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-yellow-500/[0.015] blur-[120px]" />
        </div>
        <div className="max-w-3xl mx-auto relative">
          <FadeIn delay={0.2}>
            <h2 className="text-5xl sm:text-7xl font-black leading-[1.0] mb-6">Tu cliente está escribiendo <span className="text-yellow-400">ahora mismo</span></h2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-neutral-500 text-base sm:text-lg max-w-lg mx-auto mb-10 font-light">No importa si son las 2 de la tarde o las 3 de la mañana. BotWeb IA ya está activa en tu WhatsApp, esperando el próximo mensaje. La pregunta no es si vas a tener un asistente con IA. La pregunta es <span className="text-white font-medium">cuánto más esperas para que empiece a trabajar para ti.</span></p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <MagneticButton>
              <SlideButton
                label="Activar BotWeb IA ahora"
                hoverLabel="Quiero mi asistente 24/7"
                href="https://wa.me/573115893220?text=Hola%2C%20quiero%20activar%20BotWeb%20IA%20para%20mi%20negocio"
                target="_blank"
                rel="noopener noreferrer"
                icon={MessageCircle}
                width={320}
              />
            </MagneticButton>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      <SiteFooter />
    </main>
  );
}
