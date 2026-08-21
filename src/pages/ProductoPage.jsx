import React, { useState } from 'react';
import { ShoppingCart, Star, ShieldCheck, Truck, Check, ChevronRight, CreditCard, X, Tag, ExternalLink, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATALOGO } from '../data/catalogo';
import SlideButton from '../components/SlideButton';
import SiteFooter from '../components/SiteFooter';
import { getPageUrl } from '../utils/env';

function getProductFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  return CATALOGO.find((p) => p.id === id) || CATALOGO[0];
}

export default function ProductoPage() {
  const [showCheckout, setShowCheckout] = useState(false);
  const product = getProductFromQuery();
  const isReservedPrice = product.price === 'A consultar' || product.price === 'Próximamente';

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans pb-20">
      
      {/* HEADER TIPO E-COMMERCE */}
      <header className="sticky top-0 z-40 bg-[#0A0A0F] border-b border-[#1f1f2e] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href=getPageUrl('tienda')}>
              <ChevronRight size={18} className="rotate-180 text-gray-400" />
              <span className="font-bold text-sm">Volver a la Tienda</span>
            </div>
            <a href={getPageUrl('tienda')} className="text-sm text-[#00F0FF] flex items-center gap-1">
              <ShoppingCart size={16} /> Catálogo
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        <div className="bg-[#0A0A0F] border border-[#1f1f2e] rounded-2xl p-6 lg:p-10 flex flex-col lg:flex-row gap-10">
          
          {/* COLUMNA IZQUIERDA: IMAGEN */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="aspect-video sm:aspect-[4/3] bg-[#14141E] rounded-xl overflow-hidden border border-[#1f1f2e] relative">
              {product.image ? (
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0A0A1A] via-[#0A0A0F] to-[#101828] flex items-center justify-center">
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(34,211,238,0.12), transparent 60%)' }} />
                  <div className="w-20 h-20 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 flex items-center justify-center">
                    <Tag size={32} className="text-cyan-400/60" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA: INFO Y COMPRA */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="text-sm text-gray-400 mb-2">{product.category}</div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">{product.title}</h1>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
              </div>
              <span className="text-sm text-gray-400">Producto del catálogo oficial</span>
            </div>

            {/* Precio */}
            <div className="mb-8">
              <div className={`flex items-center gap-3 ${isReservedPrice ? 'text-2xl font-black text-gray-300' : 'text-4xl font-black'}`}>
                {product.price}
              </div>
              <div className="text-xs text-gray-500 mt-1">{product.priceNote || 'COP'}</div>
            </div>

            {/* Detalles de entrega */}
            <div className="bg-[#14141E] border border-[#1f1f2e] rounded-xl p-4 mb-8 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-[#25D366] mt-0.5" size={20} />
                <div>
                  <div className="text-sm font-semibold text-[#25D366]">Compra Protegida</div>
                  <div className="text-xs text-gray-400">Recibe el producto que esperabas o te devolvemos tu dinero.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="text-[#00F0FF] mt-0.5" size={20} />
                <div>
                  <div className="text-sm font-semibold text-[#00F0FF]">Entrega Inmediata Digital</div>
                  <div className="text-xs text-gray-400">Recibirás la licencia y el acceso a tu correo al confirmar el pago.</div>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-sm text-gray-300 leading-relaxed mb-6">{product.desc}</p>

            {product.components && product.components.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Incluye:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.components.map((c) => (
                    <span key={c} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-300">
                      <Check size={12} className="text-cyan-400" /> {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Lo que tienes que saber de este producto:</h3>
              <ul className="flex flex-col gap-2">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check size={16} className="text-[#00F0FF] mt-0.5 shrink-0" /> {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Details extra */}
            {product.details && product.details.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Detalles:</h3>
                <ul className="flex flex-col gap-2">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-[#00F0FF] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00F0FF] shrink-0" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Acciones */}
            <div className="mt-auto flex flex-col gap-3">
              {isReservedPrice ? (
                <SlideButton
                  label="Consultar por WhatsApp"
                  hoverLabel="Escríbenos ahora"
                  href="https://wa.me/573115893220?text=Hola, quiero información sobre este producto"
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={MessageCircle}
                  width="100%"
                  className="w-full"
                />
              ) : (
                <div className="w-full">
                  <SlideButton
                    label="Comprar ahora"
                    hoverLabel="Continuar al pago"
                    onClick={() => setShowCheckout(true)}
                    icon={ShoppingCart}
                    width="100%"
                    className="w-full"
                  />
                </div>
              )}
              <a
                href={getPageUrl(product.landing)}
                className="w-full bg-[#14141E] hover:bg-[#1f1f2e] border border-[#2962ff]/30 text-[#00F0FF] font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                <ExternalLink size={18} /> Ver landing oficial
              </a>
            </div>

          </div>
        </div>
      </main>

      {/* MODAL CHECKOUT (SIMULADO) */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCheckout(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0A0A0F] border border-[#1f1f2e] rounded-2xl p-6 shadow-2xl z-10"
            >
              <button onClick={() => setShowCheckout(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#1f1f2e]">
                <CreditCard className="text-[#00F0FF]" size={24} />
                <h2 className="text-xl font-bold">Pasarela de Pagos (Mockup)</h2>
              </div>

              <div className="flex items-center gap-4 mb-6">
                {product.image ? (
                  <img src={product.image} className="w-16 h-16 rounded-lg object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#0A0A1A] to-[#101828] flex items-center justify-center border border-[#1f1f2e]">
                    <Tag size={20} className="text-cyan-400/60" />
                  </div>
                )}
                <div>
                  <div className="font-semibold">{product.title}</div>
                  <div className="text-xl font-black text-[#00F0FF]">{product.price}</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Nombre Completo</label>
                  <input type="text" className="w-full bg-[#14141E] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#00F0FF] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Correo Electrónico (Donde enviaremos el acceso)</label>
                  <input type="email" className="w-full bg-[#14141E] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#00F0FF] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Número de Tarjeta</label>
                  <input type="text" placeholder="**** **** **** ****" className="w-full bg-[#14141E] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#00F0FF] focus:outline-none" />
                </div>
              </div>

              <button className="w-full bg-[#25D366] hover:bg-[#20b858] text-[#050508] font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                Pagar Seguro <ShieldCheck size={18} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}
