import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Search, Shield, Send, MessageCircle, Globe,
  ArrowRight, CheckCircle2, Zap, Monitor, Rocket
} from 'lucide-react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SlideButton from '../components/SlideButton';
import { getPageUrl } from '../utils/env';

// Brand Blue
const BLUE = '#2962ff';

function TimelineStep({ num, icon: Icon, title, product, desc, side = 'left', index, href }) {
  const ref = useRef(null);
  // Usamos animaciones basadas en viewport (whileInView) para lograr el efecto de rebote autónomo
  const initialX = side === 'left' ? -100 : 100;

  return (
    <div ref={ref} className="relative flex flex-col md:flex-row items-center py-12 md:py-20 w-full">
      {/* Línea conectora central eléctrica */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#2962ff]/0 via-[#2962ff]/80 to-[#2962ff]/0 shadow-[0_0_15px_#2962ff]" />
      
      {/* Nodo Central Animado con Ondas */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -40% 0px" }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 neomorph-relief rounded-full items-center justify-center z-10 bg-[#0B0B0F]"
      >
        <div className="w-3 h-3 rounded-full bg-[#2962ff] shadow-[0_0_15px_#2962ff] relative">
          <motion.div
            animate={{ scale: [1, 2.5, 4], opacity: [0.8, 0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border border-[#2962ff]"
          />
          <motion.div
            animate={{ scale: [1, 2.5, 4], opacity: [0.8, 0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1 }}
            className="absolute inset-0 rounded-full border border-[#2962ff]"
          />
        </div>
      </motion.div>

      {/* MITAD IZQUIERDA */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-10">
        {side === 'left' && (
          <motion.div
            initial={{ opacity: 0, y: 150, x: initialX }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -35% 0px" }}
            transition={{ type: 'spring', bounce: 0.5, duration: 1.2 }}
            className="w-full max-w-lg text-left"
          >
            <div className="rounded-[32px] group hover:-translate-y-3 transition-all duration-500 relative overflow-hidden p-[1px] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              
              {/* Rayo de Luz de Neón Giratorio */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_280deg,#2962ff_360deg)] animate-[spin_4s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Contenedor Interno Real */}
              <div className="relative z-10 p-8 md:p-10 rounded-[31px] bg-[#0B0B0F]/80 backdrop-blur-xl border border-white/10 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] group-hover:shadow-[inset_0_0_60px_rgba(41,98,255,0.15)] transition-all duration-500 h-full w-full">
                
                {/* Luz de fondo en hover interna */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2962ff]/0 to-[#2962ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[31px]" />
                
                <div className="relative z-20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 neomorph-inset rounded-2xl flex items-center justify-center text-[#2962ff]">
                    <Icon size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 block mb-1">Paso {num}</span>
                    <span className="text-xs uppercase tracking-widest font-bold text-white px-3 py-1 rounded-full neomorph-inset inline-block">
                      {product}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight group-hover:text-[#2962ff] transition-colors">{title}</h3>
                <p className="text-neutral-400 leading-relaxed mb-8">{desc}</p>

                <a
                  href={href}
                  className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-white hover:text-[#2962ff] transition-colors group/link"
                >
                  Explorar Solución
                  <div className="w-8 h-8 rounded-full neomorph-inset flex items-center justify-center group-hover/link:translate-x-2 transition-transform">
                    <ArrowRight size={14} />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      </div>

      {/* MITAD DERECHA */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-10 mt-8 md:mt-0">
        {side === 'right' && (
          <motion.div
            initial={{ opacity: 0, y: 150, x: initialX }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -35% 0px" }}
            transition={{ type: 'spring', bounce: 0.5, duration: 1.2 }}
            className="w-full max-w-lg text-left"
          >
            <div className="rounded-[32px] group hover:-translate-y-3 transition-all duration-500 relative overflow-hidden p-[1px] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              
              {/* Rayo de Luz de Neón Giratorio */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_280deg,#2962ff_360deg)] animate-[spin_4s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Contenedor Interno Real */}
              <div className="relative z-10 p-8 md:p-10 rounded-[31px] bg-[#0B0B0F]/80 backdrop-blur-xl border border-white/10 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] group-hover:shadow-[inset_0_0_60px_rgba(41,98,255,0.15)] transition-all duration-500 h-full w-full">
                
                {/* Luz de fondo en hover interna */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2962ff]/0 to-[#2962ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[31px]" />
                
                <div className="relative z-20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 neomorph-inset rounded-2xl flex items-center justify-center text-[#2962ff]">
                    <Icon size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 block mb-1">Paso {num}</span>
                    <span className="text-xs uppercase tracking-widest font-bold text-white px-3 py-1 rounded-full neomorph-inset inline-block">
                      {product}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight group-hover:text-[#2962ff] transition-colors">{title}</h3>
                <p className="text-neutral-400 leading-relaxed mb-8">{desc}</p>

                <a
                  href={href}
                  className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-white hover:text-[#2962ff] transition-colors group/link"
                >
                  Explorar Solución
                  <div className="w-8 h-8 rounded-full neomorph-inset flex items-center justify-center group-hover/link:translate-x-2 transition-transform">
                    <ArrowRight size={14} />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      </div>
    </div>
  );
}

export default function EcosistemaPage() {
  const globalScroll = useScroll();
  const pageBgY = useTransform(globalScroll.scrollYProgress, [0, 1], ['0%', '30%']);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const steps = [
    {
      num: '01', icon: Shield, product: 'TrustFlow',
      title: 'Calentamiento Inteligente',
      desc: 'Preparamos y maduramos las cuentas de WhatsApp por un tiempo amplio. Activamos el Calentador Inteligente para asegurar una reputación impecable ante los servidores y evitar cualquier riesgo de bloqueo.',
      side: 'left', href: getPageUrl('calentador-cuentas')
    },
    {
      num: '02', icon: Search, product: 'ExtraData',
      title: 'Minería de Prospectos',
      desc: 'Dejamos de adivinar y usamos nuestra Minería de Datos para localizar por nicho y zona a los negocios que nos necesitan. Rescatamos contactos de grupos y extraemos datos clave de internet para ampliar nuestras bases.',
      side: 'right', href: getPageUrl('extractor')
    },
    {
      num: '03', icon: Send, product: 'Guardián',
      title: 'Difusión a Gran Escala',
      desc: 'Con la infraestructura segura, preparamos el contenido y enviamos campañas masivas a grupos y contactos. Usamos mensajes hiper-personalizados llamándolos por su nombre para que captar su atención sea inevitable.',
      side: 'left', href: getPageUrl('guardian-difusion')
    },
    {
      num: '04', icon: MessageCircle, product: 'Piloto Pro',
      title: 'Atención y Perfilamiento',
      desc: 'Los interesados son recibidos al instante por nuestro Chatbot Multicanal y Agente IA Autónomo. Escucha sus dudas, los analiza, perfila y filtra con sutileza, entregando solo los contactos listos y calificados.',
      side: 'right', href: getPageUrl('chatbot')
    },
    {
      num: '05', icon: Globe, product: 'Hub Digital',
      title: 'Auditoría y Conversión',
      desc: 'Finalmente, hacemos el contacto personal para la auditoría y los dirigimos a nuestro Ecosistema Web (Vitrinas o Tarjetas Digitales). Navegan con total claridad y descubren las soluciones sin sentir la presión de una venta.',
      side: 'left', href: getPageUrl('sitios-web')
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#D7E2EA] font-sans selection:bg-[#2962ff]/30 selection:text-white relative">
      
      {/* FONDO GLOBAL PARALLAX (Unsplash Abstract Tech) */}
      <motion.div 
        style={{ y: pageBgY }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <video
          src="https://res.cloudinary.com/ddp6ychwi/video/upload/Planet_Moving_eruhrm.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover opacity-80 mix-blend-screen brightness-110"
        />
        {/* Gradiente más suave para que la imagen tenga más luz en toda la página */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F]/10 via-[#0B0B0F]/40 to-[#0B0B0F]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0B0F_90%)]" />
      </motion.div>

      <Navbar activePage="ecosistema" />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[95vw] mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neomorph-relief mb-8">
              <Zap size={14} className="text-[#2962ff]" />
              <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.2em]">El ciclo perfecto</span>
            </div>

            <div className="inline-flex flex-col items-center uppercase font-black mb-12 w-full">
              <motion.div
                initial={{ backgroundPosition: 'top' }}
                animate={{ backgroundPosition: 'bottom' }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
                className="text-[12vw] md:text-[7vw] leading-[0.85] tracking-tighter text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(to top, #ffffff 50%, rgba(255,255,255,0.05) 50%)',
                  backgroundSize: '100% 200%'
                }}
              >
                ARQUITECTURA
              </motion.div>
              
              <div className="text-[#2962ff] text-xl md:text-4xl mt-2 drop-shadow-[0_0_15px_rgba(41,98,255,0.5)] font-bold tracking-widest">
                DE VENTAS INFALIBLE
              </div>
            </div>

            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-12">
              No es solo software. Es un ecosistema interconectado donde cada herramienta cumple un propósito vital: Extraer, Preparar, Difundir, Atender y Cerrar.
            </p>

            <a
              href="#ecosistema"
              className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl neomorph-relief text-white font-bold tracking-widest uppercase hover:text-[#2962ff] transition-colors group"
            >
              Conocer el flujo
              <ArrowRight size={18} className="group-hover:translate-y-1 group-hover:rotate-90 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* TIMELINE ECOSISTEMA */}
      <section id="ecosistema" className="relative z-10 px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20 md:mb-32">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">El Motor de Crecimiento</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">Cinco fases modulares. Impleméntalas todas para un flujo automatizado completo, o elige solo la pieza que le falta a tu negocio.</p>
          </div>

          <div className="relative">
            {steps.map((step, i) => (
              <TimelineStep key={i} {...step} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative z-10 px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="neomorph-relief rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden group bg-[#0B0B0F]/60 backdrop-blur-md">
            
            <div className="absolute inset-0 bg-gradient-to-b from-[#2962ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto neomorph-inset rounded-full flex items-center justify-center mb-8">
                <Rocket size={32} className="text-[#2962ff]" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                El ciclo se cierra. <br />El lead es tuyo.
              </h2>
              
              <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-lg">
                Miles de empresas ya están extrayendo, contactando y cerrando ventas en piloto automático. ¿Estás listo para integrarlo en tu negocio?
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SlideButton
                  label="Contactar Asesor"
                  hoverLabel="Escríbenos por WhatsApp"
                  href="https://wa.me/573115893220?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20ecosistema%20modular"
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={MessageCircle}
                  width={280}
                />
                <a
                  href={getPageUrl('tienda')}
                  className="neomorph-inset px-8 py-4 rounded-xl text-sm font-bold tracking-widest uppercase text-white flex items-center gap-3 hover:-translate-y-1 transition-transform"
                >
                  <Search size={18} />
                  Explorar Tienda
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
