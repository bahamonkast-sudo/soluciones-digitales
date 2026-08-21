import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShoppingCart, Tag, Check, Globe, MessageCircle, Zap, Database, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import { CATALOGO } from '../data/catalogo';
import { getPageUrl } from '../utils/env';

const CATEGORIES = [
  { name: 'Sitios Web', icon: Globe },
  { name: 'Inteligencia Artificial', icon: MessageCircle },
  { name: 'WhatsApp Automation', icon: Zap },
  { name: 'Minería de Datos B2B', icon: Database },
  { name: 'Auditoría', icon: Target },
];

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

function ProductCard({ product, index }) {
  return (
    <FadeIn delay={index * 0.05} className="h-full">
      <a
        href={`${getPageUrl('producto')}?id=${product.id}`}
        className="group block h-full"
      >
        <div className="relative h-full rounded-xl border border-white/[0.05] overflow-hidden transition-all duration-300 flex flex-col bg-[#111116] hover:bg-[#16161D] hover:border-cyan-500/30 shadow-sm">
          
          {/* Solid Cyan Accent Line at the top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-cyan-400" />

          {/* Imagen del producto estilo biblioteca */}
          <div className="relative h-48 overflow-hidden bg-[#0A0A0F]">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0A0A1A] via-[#0A0A0F] to-[#101828]">
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(34,211,238,0.12), transparent 60%)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/40 transition-all duration-300">
                    <Tag size={26} className="text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              </div>
            )}
            {/* Price Badge */}
            <div className="absolute bottom-3 right-3 bg-[#050508]/80 backdrop-blur-md border border-white/10 text-white font-bold px-3 py-1.5 rounded-lg text-sm shadow-lg">
              {product.price}
            </div>
          </div>

          <div className="flex-1 flex flex-col p-5 sm:p-6">
            {/* Minimalist Category Tag */}
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border border-cyan-400/20 text-cyan-400 bg-cyan-400/5">
                <Tag size={10} /> {product.category}
              </span>
            </div>

            <h3 className="text-[18px] sm:text-[20px] font-bold text-neutral-100 leading-tight mb-3 group-hover:text-cyan-400 transition-colors duration-300">
              {product.title}
            </h3>
            
            <p className="text-[13px] text-neutral-400 leading-relaxed mb-5 flex-1 line-clamp-3">
              {product.desc}
            </p>

            {product.components && product.components.length > 0 && (
              <div className="mb-5">
                <span className="block text-[9px] uppercase tracking-widest text-neutral-600 font-bold mb-2">Incluye</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.components.map((c) => (
                    <span key={c} className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/[0.03] text-neutral-400">
                      <Check size={9} className="text-cyan-400" /> {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] mt-auto">
              <div className="flex items-center gap-1 text-[11px] text-yellow-400">
                <Star size={12} className="fill-yellow-400" />
                <Star size={12} className="fill-yellow-400" />
                <Star size={12} className="fill-yellow-400" />
                <Star size={12} className="fill-yellow-400" />
                <Star size={12} className="fill-yellow-400" />
              </div>
              <span className="flex items-center gap-1.5 text-[12px] font-medium transition-all duration-300 text-neutral-500 group-hover:text-cyan-400">
                Ver detalles
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </a>
    </FadeIn>
  );
}

export default function TiendaPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-[#2962ff] selection:text-white pb-20">
      
      {/* Barra de navegación genérica (opcional) */}
      <Navbar activePage="productos" />

      {/* HERO SECTION (Estilo Blog) */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen animate-drift" />
          <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen animate-drift" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-6">
              <ShoppingCart size={14} />
              Catálogo Oficial
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              Potencia tu negocio con <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Herramientas Premium
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-base md:text-lg text-neutral-400 leading-relaxed">
              Explora nuestro catálogo de soluciones reales: sitios web, inteligencia artificial, automatización de WhatsApp, minería de datos B2B y auditoría. Cada uno con su landing y su propuesta de valor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CATEGORÍAS + GRID DE PRODUCTOS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {CATEGORIES.map((cat) => {
          const items = CATALOGO.filter((p) => p.category === cat.name);
          if (items.length === 0) return null;
          return (
            <div key={cat.name} className="mb-16 last:mb-0">
              {/* Encabezado de categoría (como el menú) */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-lg border border-cyan-400/20 bg-cyan-400/5 flex items-center justify-center">
                  <cat.icon size={16} className="text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white tracking-wide uppercase">{cat.name}</h2>
                  <p className="text-[11px] text-neutral-500">{items.length} {items.length === 1 ? 'solución' : 'soluciones'}</p>
                </div>
                <div className="flex-1 h-px bg-white/[0.06] ml-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {items.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <SiteFooter />
    </div>
  );
}
