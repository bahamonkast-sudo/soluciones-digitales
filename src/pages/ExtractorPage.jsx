import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, MessageCircle, CheckCircle2, QrCode, Users, Database, FileSpreadsheet, ShieldAlert, Smartphone, Download, X, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SlideButton from '../components/SlideButton';
import SEO from '../components/SEO';
import { SEO_CONFIG } from '../config/seoConfig';
import { getDistUrl } from '../utils/env';
import heroBg from '../assets/hero-extractor.webp';
import parallaxExtractorBg from '../assets/parallax-extractor.webp';
import excelBg from '../assets/excel.webp';

const CYAN = '#00F0FF';
const GREEN = '#25D366';
const MEGA_RED = '#D9272E';

function CyberGridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-2] overflow-hidden" style={{ backgroundColor: '#050508' }}>
      {/* Animated Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vh] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-drift" style={{ backgroundColor: GREEN }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vh] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-drift" style={{ backgroundColor: '#2962ff', animationDelay: '-5s' }} />
      
      {/* Perspective Grid */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: `linear-gradient(${GREEN}15 1px, transparent 1px), linear-gradient(90deg, ${GREEN}15 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             transform: 'perspective(1000px) rotateX(60deg) scale(2.5) translateY(-20%)',
             transformOrigin: 'top center',
             maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
             WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)'
           }} />
           
      {/* Dark vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050508_100%)]" />
    </div>
  );
}

function Tag({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6" style={{ borderColor: `${GREEN}20`, backgroundColor: `${GREEN}06` }}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: GREEN }} />
      <span className="text-[9px] font-bold uppercase tracking-[0.25em]" style={{ color: GREEN }}>{children}</span>
    </div>
  );
}

// LeadModal moved to TutorialExtractorPage.jsx

function DemoButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 w-full mt-4">
      <SlideButton
        label="VER MANUAL DE INSTALACIÓN"
        hoverLabel="Ir al manual"
        href={getDistUrl('tutorial-extractor.html')}
        icon={ArrowRight}
        width={280}
      />
    </div>
  );
}

function HeroSection({ openModal }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[100dvh] flex flex-col lg:flex-row items-center overflow-hidden pt-24 lg:pt-0"
      style={{ 
        backgroundImage: `url(${heroBg})`, 
        backgroundPosition: 'calc(0% + 150px) center', 
        backgroundSize: 'cover',
        backgroundColor: '#050508'
      }}>
      
      {/* Adjusted overlay to reduce blur and shift focus to the right edge */}
      <div className="absolute inset-0" style={{ 
        background: 'radial-gradient(circle at 75% center, rgba(5,5,8,0) 0%, rgba(5,5,8,0.5) 40%, rgba(5,5,8,0.95) 100%)' 
      }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,5,8,0.99) 0%, rgba(5,5,8,0.9) 15%, rgba(5,5,8,0.4) 45%, rgba(5,5,8,0) 100%)' }} />

      
      {/* Expanded text container */}
      <div className="w-full max-w-3xl px-6 md:px-12 lg:pl-12 xl:pl-20 py-12 lg:py-0 z-10">
        <Tag>SOFTWARE DE ESCRITORIO · WINDOWS</Tag>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-[-0.03em] mb-5">
          <span className="tracking-[-0.02em]">EXTRACTOR PLUS</span><br />
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.08em]" style={{ color: GREEN }}>WHATSAPP</span><br />
          <span className="text-xl md:text-2xl lg:text-3xl font-medium tracking-[0.15em] text-neutral-400">GRUPOS Y CONTACTOS</span>
        </h1>
        <p className="text-sm md:text-lg text-neutral-300 max-w-xl leading-relaxed mb-8">
          La herramienta definitiva para minería de datos en WhatsApp. Extrae todos los grupos a los que perteneces y descarga miles de contactos de tus clientes potenciales a Excel en un solo clic. 100% libre de baneos.
        </p>
        <DemoButtons />
      </div>
    </motion.section>
  );
}

function GruposSection() {
  return (
    <motion.section id="grupos"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="relative px-6 md:px-12 py-24 md:py-32">
      <div className="absolute inset-0" style={{ background: 'rgba(5,5,8,0.3)' }} />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {[
                { icon: QrCode, title: 'Conexión Segura', desc: 'Escanea el QR como en WhatsApp Web. No necesitas usuario ni contraseña.' },
                { icon: Users, title: 'Grupos Activos', desc: 'Detecta automáticamente todos los grupos en los que participas.' },
                { icon: ShieldAlert, title: 'Sin Baneos', desc: 'Opera usando los canales oficiales de WhatsApp Web, protegiendo tu número.' },
                { icon: Database, title: 'Minería Rápida', desc: 'Obtiene la información de cientos de grupos en cuestión de milisegundos.' },
              ].map((item, i) => (
                <div key={i} className="p-4 md:p-5 rounded-2xl border card-hover" style={{ borderColor: 'rgba(255,255,255,0.05)', backgroundColor: 'rgba(12,12,16,0.8)' }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${GREEN}10` }}>
                    <item.icon size={16} style={{ color: GREEN }} />
                  </div>
                  <h3 className="text-xs font-bold text-white mb-1 tracking-[0.1em]">{item.title}</h3>
                  <p className="text-[10px] md:text-[11px] text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}>
              <Tag>FASE 1: CONEXIÓN Y DETECCIÓN</Tag>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black text-white leading-[0.92] tracking-[-0.02em] mb-6 uppercase">
              MINERÍA DE<br />
              <span style={{ color: GREEN }}>GRUPOS ACTIVOS.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm text-neutral-400 leading-relaxed max-w-md">
              Inicia sesión mediante código QR de manera 100% segura. El Extractor PLUS se encarga de analizar tu cuenta y recopilar instantáneamente el listado completo de todos los grupos a los que perteneces, preparándolos para la extracción de miembros.
            </motion.p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ContactosSection() {
  return (
    <motion.section id="contactos"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="relative flex items-center justify-center min-h-[500px] md:min-h-[700px] py-32 overflow-hidden bg-cover bg-top"
      style={{ backgroundImage: `url(${excelBg})` }}
    >
      {/* Heavy overlays to ensure text contrast and blend with other sections */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,5,8,1) 0%, rgba(5,5,8,0.4) 50%, rgba(5,5,8,1) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(5,5,8,0.3) 0%, rgba(5,5,8,0.85) 100%)' }} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>
          
          <div className="flex justify-center mb-6">
            <Tag>FASE 2: EXTRACCIÓN MASIVA</Tag>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.92] tracking-[-0.02em] uppercase" style={{ textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
            DESCARGA LOS CONTACTOS<br />
            <span style={{ color: GREEN }}>DIRECTO A EXCEL</span>
          </h2>
          
          <p className="text-sm md:text-lg text-neutral-200 mt-6 max-w-2xl mx-auto leading-relaxed font-medium" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.9)' }}>
            Selecciona los grupos que te interesan y extrae los números de teléfono de todos sus participantes en formato .xlsx listos para tus campañas.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

function RecuperacionSection() {
  return (
    <motion.section id="recuperacion"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'rgba(5,5,8,0.7)' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="flex-1 space-y-6">
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Tag>RECUPERACIÓN</Tag>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-[0.92] tracking-[-0.02em] uppercase">
              RECUPERA CONTACTOS<br />
              <span style={{ color: GREEN }}>DE GRUPOS ABANDONADOS</span>
            </h2>
            <p className="text-sm text-neutral-400 mt-4 leading-relaxed">
              Incluso si ya te saliste de un grupo o el grupo fue cerrado, si el historial sigue en tu WhatsApp, el Extractor PLUS puede entrar y minar todos los números de teléfono que quedaron registrados en los mensajes anteriores.
            </p>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div>
              <div className="text-3xl font-black text-white mb-1 tracking-tighter">100%</div>
              <div className="text-[9px] font-semibold tracking-[0.2em]" style={{ color: `${GREEN}60` }}>SEGURO Y ÉTICO</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1 tracking-tighter">.XLSX</div>
              <div className="text-[9px] font-semibold tracking-[0.2em]" style={{ color: `${GREEN}60` }}>EXPORTACIÓN NATIVA</div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-[45%]">
          <div className="rounded-2xl p-6 md:p-8 text-center border" style={{ borderColor: GREEN, backgroundColor: 'rgba(13,27,30,0.9)' }}>
            <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(37,211,102,0.1)' }}>
              <Download size={24} style={{ color: GREEN }} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-[0.1em]">¿Listo para probarlo?</h3>
            <p className="text-[11px] text-neutral-400 mb-6">Descarga la versión demo gratuita. Extrae los primeros contactos y comprueba el poder de Extractor PLUS en tu propia PC.</p>
            <div className="flex justify-center -ml-2">
              <DemoButtons />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function PricingCard() {
  return (
    <div className="pricing-card mx-auto my-12">
      <div className="badge-header">FULL VERSIÓN</div>

      <div className="price-container">
        <div className="price">
          <span className="currency">$</span>55<span className="decimals">.000</span>
        </div>
        <span className="period">/mes</span>
      </div>

      <ul className="features-list text-left">
        <li>Extracción ilimitada de grupos</li>
        <li>Descarga masiva a Excel (.xlsx)</li>
        <li>Sistema 100% libre de baneos</li>
        <li>Opción de 2 Meses por solo $90.000</li>
      </ul>

      <SlideButton
        label="ADQUIRIR"
        hoverLabel="Ir a la adquisición"
        href={getDistUrl('tutorial-extractor.html')}
        icon={ArrowRight}
        width="100%"
        className="w-full"
      />
    </div>
  );
}

function CtaSection() {
  return (
    <section className="relative px-6 md:px-12 py-32 md:py-48 overflow-hidden bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${parallaxExtractorBg})` }}>
      {/* Dark overlay with circular depth of field (radial blur / fade to black) */}
      <div className="absolute inset-0" style={{ 
        background: 'radial-gradient(circle at center, rgba(5,5,8,0.2) 0%, rgba(5,5,8,0.85) 60%, rgba(5,5,8,1) 100%)' 
      }} />
      <div className="relative z-10 w-full flex justify-center">
        <PricingCard />
      </div>
    </section>
  );
}

function FooterSection() {
  return <SiteFooter />;
}

export default function ExtractorPage() {

  return (
    <div className="min-h-screen bg-[#050508] text-[#D7E2EA]">
      <SEO {...SEO_CONFIG.extractor} />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -20px) rotate(120deg); }
          66% { transform: translate(-20px, 10px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-drift { animation: drift 20s linear infinite; }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(37,211,102,0.12); border-color: rgba(37,211,102,0.2); }
        
        /* PRICING CARD STYLES - ORIGINAL CON TONOS VERDES */
        .pricing-card {
          position: relative;
          width: 320px;
          background-color: #f9f9f9;
          border-radius: 16px;
          padding: 40px 24px 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #0a4a42; /* Dark green/teal */
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          box-shadow: 0 10px 25px -5px rgba(10, 74, 66, 0.15), 0 20px 48px 0 rgba(0, 0, 0, 0.08);
        }
        
        .pricing-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 16px;
          opacity: 0.25;
          pointer-events: none;
          filter: url(#paper-noise);
        }
        
        .badge-header {
          position: absolute;
          top: -22px;
          background-color: #128C7E; /* WhatsApp Teal */
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 2px;
          padding: 10px 48px;
          border-radius: 10px;
          box-shadow: 0 6px 14px rgba(18, 140, 126, 0.35);
          text-transform: uppercase;
        }
        
        .badge-header::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 10px;
          opacity: 0.15;
          pointer-events: none;
          filter: url(#paper-noise);
        }
        
        .price-container {
          margin-top: 20px;
          margin-bottom: 24px;
          text-align: center;
        }
        
        .price {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1;
          display: inline-flex;
          align-items: flex-start;
        }
        
        .price .currency {
          font-size: 2.2rem;
          margin-top: 4px;
          margin-right: 2px;
        }
        
        .price .decimals {
          font-size: 2rem;
          margin-top: 4px;
        }
        
        .period {
          display: block;
          font-size: 0.95rem;
          font-weight: 500;
          opacity: 0.8;
          margin-top: 4px;
        }
        
        .features-list {
          list-style: none;
          width: 100%;
          margin-bottom: 32px;
        }
        
        .features-list li {
          font-size: 0.88rem;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 10px;
          display: flex;
          align-items: flex-start;
          color: #0f5950;
        }
        
        .features-list li::before {
          content: "-";
          margin-right: 8px;
          font-weight: 800;
        }
        
        .btn-select {
          width: 80%;
          background-color: #0d6b60;
          color: #ffffff;
          border: none;
          padding: 12px 0;
          border-radius: 24px;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(13, 107, 96, 0.3);
          transition: all 0.2s ease;
          position: relative;
        }
        
        .btn-select:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(13, 107, 96, 0.4);
          background-color: #128C7E;
        }
        
        .btn-select:active {
          transform: translateY(0);
        }
      `}</style>
      
      {/* Filtro SVG para textura de papel */}
      <svg className="hidden w-0 h-0 absolute pointer-events-none">
        <filter id="paper-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" />
          <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="2">
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
          <feBlend mode="multiply" in="SourceGraphic" in2="noise" />
        </filter>
      </svg>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <CyberGridBackground />
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full animate-drift" style={{ background: 'radial-gradient(circle, rgba(37,211,102,0.08) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full animate-drift" style={{ background: 'radial-gradient(circle, rgba(37,211,102,0.05) 0%, transparent 70%)', animationDelay: '-10s' }} />
      </div>
      


      <div className="relative z-10">
        <Navbar activePage="productos" />
        <HeroSection />
        <GruposSection />
        <ContactosSection />
        <RecuperacionSection />
        <CtaSection />
        <FooterSection />
      </div>
    </div>
  );
}
