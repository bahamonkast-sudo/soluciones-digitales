import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ShieldCheck, ShieldAlert, ArrowRight, UserMinus, Clock, 
  TrendingDown, CheckCircle2, Link, Leaf, ArrowUpRight, MessageCircle, TrendingUp
} from 'lucide-react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SlideButton from '../components/SlideButton';
import { getDistUrl } from '../utils/env';

/* ─── REUSABLE COMPONENTS ────────────────────────────────────── */

function FadeIn({ children, delay = 0, y = 30, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-px bg-[#25D366]" />
      <span className="text-[9px] uppercase tracking-[0.3em] text-[#25D366] font-bold">{text}</span>
    </div>
  );
}

function DemoButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 w-full mt-4">
<a href={getDistUrl('tutorial-calentador.html')}
                  className="relative z-10 mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[11px] font-bold tracking-[0.15em] transition-all hover:scale-[1.03] shadow-[0_0_25px_rgba(37,211,102,0.35)]"
                  style={{ backgroundColor: '#25D366', color: '#050508' }}>
                  VER MANUAL DE INSTALACIÓN
                  <ArrowRight size={15} />
                </a>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */

export default function ProductosPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <main className="relative w-full min-h-screen text-[#D7E2EA] font-sans" style={{ backgroundColor: '#0B0B0F' }}>
      <Navbar activePage="productos" />

      {/* 1. EL GANCHO DE SEGURIDAD (HERO) */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-20">
        
        {/* Imagen de fondo */}
        <div className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: 'url(https://res.cloudinary.com/ddp6ychwi/image/upload/v1785950250/Console_displaying_glowing_Whats__202608051214_fepefm.jpg)', backgroundPosition: 'left center' }} />

        {/* Difuminado oscuro de izquierda a derecha */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(5,5,8,1) 0%, rgba(5,5,8,0.92) 60%, rgba(5,5,8,0.35) 88%, rgba(5,5,8,0.05) 100%)'
        }} />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 text-[10px] tracking-widest text-[#25D366] font-bold mb-6">
                <ShieldCheck size={12} />
                TRUSTFLOW <span className="text-white/30 mx-1">|</span> CALENTADOR DE CUENTAS
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-[clamp(2.2rem,6vw,64px)] font-black leading-[1.1] text-white mb-6 productos-heading">
                Cuentas maduras,<br />ventas blindadas.
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-[15px] sm:text-[17px] text-neutral-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-10">
                En el mundo digital, la confianza no se construye de la noche a la mañana. Te damos la tranquilidad de contar con un sistema de maduración <strong className="text-white">progresivo y escalonado</strong>, creando cuentas fuertes que respaldan tu negocio paso a paso.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <DemoButtons />
            </FadeIn>
          </div>
        </motion.div>
      </section>

      {/* 2. EMPATÍA CON EL DOLOR REAL */}
      <section className="relative z-20 px-6 sm:px-10 py-24 bg-neutral-900/20 border-y border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-[clamp(1.6rem,4vw,40px)] font-black text-white mb-6 productos-heading">
              El costo de la prisa y la incertidumbre
            </h2>
            <p className="text-[15px] text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Quienes lideramos negocios conocemos la tentación de querer resultados rápidos, pero en la comunicación digital, acelerar los procesos suele ser la razón por la que las líneas se apagan inesperadamente. Apurar una cuenta nueva te expone a:
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <div className="p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] h-full">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6">
                  <UserMinus size={24} className="text-red-400" />
                </div>
                <h3 className="text-[16px] font-bold text-white mb-3">Clientes perdidos</h3>
                <p className="text-[13px] text-neutral-400 leading-relaxed">Personas que vieron tu publicidad y, al intentar escribirte, encontraron una línea inexistente porque el canal se saturó antes de tiempo.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] h-full">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <Clock size={24} className="text-amber-400" />
                </div>
                <h3 className="text-[16px] font-bold text-white mb-3">Vendedores detenidos</h3>
                <p className="text-[13px] text-neutral-400 leading-relaxed">Un equipo comercial que se queda con las manos atadas a mitad de la jornada por no haber asentado las bases de sus herramientas.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] h-full">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-6">
                  <TrendingDown size={24} className="text-rose-400" />
                </div>
                <h3 className="text-[16px] font-bold text-white mb-3">Inversión perdida</h3>
                <p className="text-[13px] text-neutral-400 leading-relaxed">Dinero en publicidad que se va directo a la basura por intentar forzar el ritmo del canal de ventas.</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4} className="mt-12 text-center">
            <p className="text-[14px] text-neutral-300 font-medium px-6 py-4 rounded-xl inline-block bg-white/[0.03] border border-white/[0.05]">
              Tu empresa no necesita soluciones mágicas de un día para otro; necesita estabilidad y previsibilidad a largo plazo.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 3. LA EXPLICACIÓN HUMANA */}
      <section className="relative z-20 px-6 sm:px-10 py-24">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 w-full order-2 lg:order-1">
            <FadeIn>
              <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.06] p-8 sm:p-12" style={{ background: 'linear-gradient(145deg, #1A1A24 0%, #0D0D14 100%)' }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/5 rounded-full blur-3xl" />
                <ShieldAlert size={48} className="text-neutral-500/30 absolute bottom-8 right-8" />
                
                <h3 className="text-xl font-bold text-white mb-6">La perspectiva del algoritmo</h3>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-red-400 font-bold text-xs">X</span>
                    </div>
                    <div>
                      <p className="text-[13px] text-white font-semibold">Comportamiento Repentino</p>
                      <p className="text-[12px] text-neutral-400 mt-1">Una cuenta con 0 días intentando hablar con 1,000 desconocidos activa el bloqueo inmediato.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-[#25D366]/5 border border-[#25D366]/10">
                    <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 size={14} className="text-[#25D366]" />
                    </div>
                    <div>
                      <p className="text-[13px] text-white font-semibold">Construcción Gradual</p>
                      <p className="text-[12px] text-neutral-400 mt-1">Conversaciones reales y recíprocas diarias demuestran legitimidad al algoritmo.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="flex-1 order-1 lg:order-2">
            <FadeIn>
              <SectionLabel text="Por qué toma tiempo" />
              <h2 className="text-[clamp(1.6rem,4vw,40px)] font-black text-white mb-6 productos-heading">
                La psicología detrás del proceso
              </h2>
              <div className="space-y-5 text-[15px] text-neutral-400 leading-relaxed">
                <p>El motivo por el cual las soluciones inmediatas no existen en este campo es puramente humano.</p>
                <p>Cuando una persona entabla una relación de confianza con alguien, lo hace de manera gradual. Si un desconocido aparece de la nada y de forma masiva, genera rechazo inmediato y la reacción natural es el botón de <strong className="text-white">"Bloquear"</strong>.</p>
                <p>WhatsApp funciona exactamente igual. El sistema analiza la madurez de tu número. Si una cuenta nueva intenta comportarse como una línea que lleva años operando, el sistema nota la anomalía y la suspende por seguridad.</p>
                <p className="text-white font-medium border-l-2 border-[#25D366] pl-4 mt-6">La única forma real de tener una cuenta resistente es construyendo un historial de confianza, paso a paso y sin saltarse etapas.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECCIÓN PARALLAX (Imagen del Móvil) */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden z-20 border-y border-white/[0.04]">
        {/* Usaremos un div con background-attachment: fixed para el efecto Parallax clásico */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://res.cloudinary.com/ddp6ychwi/image/upload/v1785950250/Robotic_hand_holding_holographic__202608051214_wkgq3l.jpg)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }}
        />
        {/* Overlay para oscurecer y fusionar con el fondo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-[#0B0B0F] opacity-90" />
        <div className="absolute inset-0 bg-[#25D366]/5 mix-blend-overlay" />
        
        {/* Contenido sobre el parallax */}
        <div className="relative z-10 text-center px-6">
          <FadeIn>
            <ShieldCheck size={48} className="text-[#25D366] mx-auto mb-6 opacity-80" />
            <h2 className="text-[clamp(1.5rem,4vw,36px)] font-black text-white mb-4 tracking-tight drop-shadow-lg">
              La confianza no se simula, <span className="text-[#25D366]">se construye.</span>
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* 4. EL ALIVIO (SOLUCIÓN ESCALONADA) */}
      <section className="relative z-20 px-6 sm:px-10 py-24 bg-neutral-900/20 border-y border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <SectionLabel text="Nuestra Solución" />
              <h2 className="text-[clamp(1.6rem,4vw,40px)] font-black text-white mb-6 productos-heading">
                Entrenamos tu reputación de forma escalonada
              </h2>
              <p className="text-[15px] text-neutral-400 leading-relaxed">
                Nuestra plataforma se encarga de construir ese historial de confianza por ti, de forma <strong className="text-white">estrictamente progresiva</strong>. No forzamos tus líneas. El sistema inicia simulando interacciones humanas muy ligeras. A medida que pasan los días, el ritmo aumenta suavemente.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] h-full hover:bg-white/[0.03] transition-colors">
                <ShieldCheck size={28} className="text-[#25D366] mb-5" />
                <h3 className="text-[17px] font-bold text-white mb-3">Paz mental</h3>
                <p className="text-[13.5px] text-neutral-400 leading-relaxed">La certeza de que tus canales se están fortaleciendo sobre bases sólidas, no sobre trucos temporales que desaparecen al día siguiente.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] h-full hover:bg-white/[0.03] transition-colors">
                <ShieldAlert size={28} className="text-[#25D366] mb-5" />
                <h3 className="text-[17px] font-bold text-white mb-3">Protección de dinero</h3>
                <p className="text-[13.5px] text-neutral-400 leading-relaxed">Cada lead que atraigas con tus campañas de publicidad llegará a un canal maduro, listo para resistir el flujo de la conversación sin interrupciones.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] h-full hover:bg-white/[0.03] transition-colors">
                <CheckCircle2 size={28} className="text-[#25D366] mb-5" />
                <h3 className="text-[17px] font-bold text-white mb-3">Activo comercial real</h3>
                <p className="text-[13.5px] text-neutral-400 leading-relaxed">Cuentas de trabajo estables que no se pierden y se convierten en el patrimonio digital fundamental de tu equipo de ventas a largo plazo.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. EL PROCESO METÓDICO */}
      <section className="relative z-20 px-6 sm:px-10 py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-[clamp(1.6rem,4vw,40px)] font-black text-white mb-5 productos-heading">
              El Proceso Metódico
            </h2>
            <p className="text-[15px] text-neutral-400">
              Diseñamos un camino transparente, dividido en etapas claras para garantizar que tu comunicación se asiente de manera correcta:
            </p>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.015]">
                <div className="w-16 h-16 rounded-2xl bg-[#25D366]/10 flex items-center justify-center shrink-0 border border-[#25D366]/20">
                  <Link size={24} className="text-[#25D366]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-white mb-2">1. Fase de Conexión</h3>
                  <p className="text-[14px] text-neutral-400 leading-relaxed">Vinculas tus líneas nuevas a nuestro sistema seguro para comenzar su periodo de preparación inicial. Sin configuraciones complejas, todo en un par de clics.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 shadow-[0_0_30px_rgba(37,211,102,0.05)] relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-[#25D366]/10 blur-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-[#25D366]/20 flex items-center justify-center shrink-0 border border-[#25D366]/30">
                  <Leaf size={24} className="text-[#25D366]" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-[18px] font-bold text-white mb-2">2. Fase de Maduración Gradual</h3>
                  <p className="text-[14px] text-neutral-400 leading-relaxed">La plataforma genera conversaciones humanas recíprocas, incrementando el volumen de forma escalonada día tras día para simular un comportamiento natural y seguro ante el algoritmo.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.015]">
                <div className="w-16 h-16 rounded-2xl bg-[#25D366]/10 flex items-center justify-center shrink-0 border border-[#25D366]/20">
                  <ArrowUpRight size={24} className="text-[#25D366]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-white mb-2">3. Fase de Despliegue Comercial</h3>
                  <p className="text-[14px] text-neutral-400 leading-relaxed">Al completar el ciclo de preparación, retiras una línea con la madurez necesaria para trabajar y recibir el tráfico de tus clientes con total tranquilidad y capacidad.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 6. PRECIOS */}
      <section className="relative z-20 px-6 sm:px-10 py-24 bg-neutral-900/20 border-y border-white/[0.04]">
        {/* Glow de fondo */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[500px] pointer-events-none opacity-60" style={{ background: 'radial-gradient(ellipse at center, rgba(37,211,102,0.12) 0%, transparent 70%)' }} />

        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <SectionLabel text="Inversión" />
            <h2 className="text-[clamp(1.6rem,4vw,40px)] font-black text-white mb-6 productos-heading">
              Un costo claro para una <span className="text-[#25D366]">cuenta blindada</span>
            </h2>
            <p className="text-[15px] text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              Tarifa mensual, sin permanencia. Mientras tu cuenta se fortalece, pagas solo lo justo y cancelas cuando quieras.
            </p>
          </FadeIn>

          {/* Tarjeta principal con borde animado */}
          <div className="relative">
            {/* Halo animado */}
            <div className="absolute -inset-1 rounded-[2rem] opacity-70 blur-xl animate-pulse-glow pointer-events-none"
              style={{ background: 'linear-gradient(135deg, #25D366, #0B0B0F, #14b8a6, #25D366)', backgroundSize: '400% 400%', animation: 'gradientShift 6s ease infinite' }} />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-5 rounded-[2rem] overflow-hidden border border-[#25D366]/25 bg-[#0D0D13]"
              style={{ boxShadow: '0 20px 80px rgba(0,0,0,0.6), 0 0 40px rgba(37,211,102,0.15)' }}>
              
              {/* Columna precio */}
              <div className="lg:col-span-2 relative p-10 sm:p-12 flex flex-col justify-center text-center lg:text-left overflow-hidden"
                style={{ background: 'linear-gradient(145deg, rgba(37,211,102,0.18) 0%, rgba(11,11,15,0) 55%), #111114' }}>
                {/* Luz superior animada */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#25D366] to-transparent" />
                <div className="absolute -bottom-20 -right-16 w-72 h-72 rounded-full bg-[#25D366]/15 blur-3xl pointer-events-none animate-float" />
                <div className="absolute -top-16 -left-16 w-40 h-40 rounded-full bg-[#14b8a6]/10 blur-3xl pointer-events-none animate-float" style={{ animationDelay: '-2s' }} />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/15 text-[10px] tracking-widest text-[#25D366] font-bold mb-7">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                    </span>
                    PLAN MENSUAL
                  </div>
                  <div className="flex items-end justify-center lg:justify-start gap-2 mb-3">
                    <span className="price-glow text-[clamp(3rem,7vw,60px)] font-black text-white leading-none tracking-tight">$35.000</span>
                    <span className="text-neutral-500 text-lg mb-1.5">/mes</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-[#25D366]/15 text-[11px] text-neutral-300">
                    <CheckCircle2 size={11} className="text-[#25D366]" />
                    Sin permanencia · Cancela cuando quieras
                  </div>
                </div>

<SlideButton
                  label="VER MANUAL DE INSTALACIÓN"
                  hoverLabel="Ir al manual"
                  href={getDistUrl('tutorial-calentador.html')}
                  icon={ArrowRight}
                  width={300}
                />
              </div>

              {/* Columna características */}
              <div className="lg:col-span-3 p-10 sm:p-12 bg-white/[0.015] relative">
                <div className="absolute top-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#14b8a6] text-[#050508] text-[10px] font-black tracking-widest shadow-[0_0_20px_rgba(37,211,102,0.4)]">
                  <CheckCircle2 size={12} />
                  MÁS POPULAR
                </div>

                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold mb-8">Qué incluye tu cuenta blindada</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
                  {[
                    { icon: ShieldCheck, t: '1 línea WhatsApp', d: 'en fase de maduración' },
                    { icon: Clock, t: 'Calentamiento progresivo', d: 'ritmo gradual día a día' },
                    { icon: CheckCircle2, t: 'Historial de confianza', d: 'ante los servidores' },
                    { icon: MessageCircle, t: 'Interacciones humanas', d: 'simulación natural' },
                    { icon: TrendingUp, t: 'Ritmo ajustable', d: 'configura por días' },
                    { icon: ShieldAlert, t: 'Monitoreo y soporte', d: 'durante todo el proceso' }
                  ].map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="group flex items-start gap-3 p-3 rounded-xl border border-transparent hover:border-[#25D366]/20 hover:bg-[#25D366]/5 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#25D366]/12 border border-[#25D366]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <f.icon size={16} className="text-[#25D366]" />
                      </div>
                      <div>
                        <span className="text-[14px] font-bold text-white leading-snug block">{f.t}</span>
                        <span className="text-[11px] text-neutral-500">{f.d}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-9 pt-7 border-t border-white/[0.05] flex items-center gap-3 text-[12px] text-neutral-500">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/5 border border-red-500/15 text-red-400/80 font-semibold">
                    <span className="text-red-400/60 line-through">Mensualidades eternas forzadas</span>
                  </span>
                  <span className="text-neutral-600">No aplica en este plan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EL CIERRE PROFESIONAL (CTA) */}
      <section className="relative z-20 px-6 sm:px-10 pb-24">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden border border-[#25D366]/20"
              style={{ background: 'radial-gradient(circle at center, rgba(37,211,102,0.1) 0%, rgba(11,11,15,0) 70%), #111116' }}
            >
              <div className="relative z-10">
                <h2 className="text-[clamp(1.8rem,5vw,48px)] font-black text-white mb-6 productos-heading leading-tight">
                  Las herramientas que sostienen tus ingresos <span className="text-[#25D366]">merecen un proceso serio.</span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-10">
                  No dejes la comunicación con tus clientes en manos de la prisa o la improvisación. Toma el control hoy, construye canales de venta estables a través de un método probado y asegura el futuro comercial de tu empresa.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                  <SlideButton
                    label="VER MANUAL DE INSTALACIÓN"
                    hoverLabel="Ir al manual"
                    href={getDistUrl('tutorial-calentador.html')}
                    icon={ArrowRight}
                    width={300}
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
