import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SlideButton from '../components/SlideButton';
import Lenis from 'lenis';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9998] bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-[#f51b1b] origin-left"
        style={{ scaleX: progress / 100, transformOrigin: '0% 50%' }}
      />
    </div>
  );
}

function RevealText({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function ProbadorVirtualPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-black font-sans min-h-screen text-white">
      <ScrollProgressBar />
      <Navbar activePage="productos" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/40 via-black to-black pointer-events-none -z-10" />
        <div className="max-w-4xl mx-auto relative z-10">
          <RevealText className="inline-block bg-[#f51b1b]/15 text-[#f51b1b] px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase mb-6 border border-[#f51b1b]/30">
            Inteligencia Artificial Aplicada
          </RevealText>
          <RevealText delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6">
              El E-Commerce<br />
              <span className="text-[#f51b1b]">Evolucionó.</span>
            </h1>
          </RevealText>
          <RevealText delay={0.2} className="text-neutral-400 text-base md:text-xl max-w-2xl mx-auto font-medium mb-12">
            Permite que tus clientes se prueben tu catálogo de ropa de forma virtual antes de comprar. 
            Reduce devoluciones y dispara la conversión con <strong className="text-white">Virtual Try-On</strong>.
          </RevealText>
          <RevealText delay={0.3}>
             <SlideButton
               label="Probar Demo Gratis"
               hoverLabel="Pruébalo en vivo"
               onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
               width={300}
             />
          </RevealText>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 md:py-32 px-4 md:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Pruébalo en vivo</h2>
            <p className="text-neutral-400 text-sm md:text-base">
              Sube una prenda y una foto tuya. La IA hará la fusión en segundos. 
              <br className="hidden md:block"/><span className="text-[#f51b1b] text-xs uppercase tracking-widest font-bold">* Demo alojada en servidor público. Puede haber cola de espera.</span>
            </p>
          </div>
          
          <div className="w-full bg-[#0b0b0b] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative min-h-[800px]">
            {/* The actual HF Space */}
            <iframe 
              src="https://yisol-idm-vton.hf.space"
              frameBorder="0"
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full"
              title="Virtual Try On Demo"
              allow="camera; microphone"
            />
          </div>
        </div>
      </section>

      {/* Plugin Sale Section */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="md:w-1/2">
            <div className="text-[#f51b1b] font-bold tracking-widest text-xs uppercase mb-4">Plugin Premium WordPress</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Instálalo en tu propia tienda</h2>
            <p className="text-neutral-400 text-base mb-8 leading-relaxed">
              No envíes a tus clientes a otras páginas ni los hagas esperar en colas públicas. 
              Te instalamos este módulo directamente en tu E-Commerce o WordPress.
            </p>
            <ul className="space-y-4 mb-10">
              {['100% integrado en tu dominio', 'Sin colas públicas de espera', 'Costo por uso minúsculo (~$0.05 / imagen) directamente con el proveedor IA', 'Aumenta el ticket promedio y baja las devoluciones'].map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f51b1b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1"><path d="M20 6L9 17l-5-5"/></svg>
                  <span className="text-sm md:text-base font-semibold text-neutral-300">{feat}</span>
                </li>
              ))}
            </ul>
            <SlideButton
              label="Consultar precio de instalación"
              hoverLabel="Escríbenos por WhatsApp"
              onClick={() => window.open(`https://wa.me/573115893220?text=${encodeURIComponent('Hola, me interesa instalar el módulo de Probador Virtual IA en mi sitio.')}`, '_blank', 'noopener')}
              width={340}
            />
          </div>
          <div className="md:w-1/2">
             <div className="bg-[#111] border border-neutral-800 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#f51b1b]/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
                <h3 className="text-2xl font-bold text-white mb-2">¿Cómo funciona el pago?</h3>
                <p className="text-neutral-400 text-sm mb-6">Nosotros no te cobramos mensualidades. El modelo es 100% transparente.</p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 font-bold text-[#f51b1b]">1</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Pago Único (Software)</h4>
                      <p className="text-neutral-500 text-xs leading-relaxed">Pagas una sola vez por el desarrollo e instalación del módulo en tu WordPress.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 font-bold text-[#f51b1b]">2</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Consumo IA Directo</h4>
                      <p className="text-neutral-500 text-xs leading-relaxed">Conectas tu propia tarjeta en el proveedor IA (Replicate). Pagas céntimos de dólar solo por lo que consumen tus usuarios.</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
