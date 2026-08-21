import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, MessageCircle, X, AlertTriangle, Key, MonitorPlay, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SEO from '../components/SEO';
import { getPageUrl } from '../utils/env';

const GREEN = '#25D366';
const MEGA_RED = '#D9272E';

function LeadModal({ isOpen, onClose, targetType, targetUrl }) {
  const [formData, setFormData] = useState({ name: '', phone: '', company: '', habeas: false });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.habeas) {
      alert("Debes aceptar el manejo de datos para continuar.");
      return;
    }

    if (targetType === 'whatsapp') {
      const msg = `Solicito demo de Extractor Plus.\n\nNombre: ${formData.name}\nEmpresa: ${formData.company}`;
      const url = `https://wa.me/573115893220?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    } else {
      window.open(targetUrl, '_blank');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md bg-[#0C0C10] border rounded-2xl overflow-hidden shadow-2xl"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors text-white">
            <X size={20} />
          </button>
          
          <div className="p-6 md:p-8">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
                Desbloquea el Acceso
              </h3>
              <p className="text-xs text-neutral-400">Por favor, completa tus datos para enviarte la {targetType === 'whatsapp' ? 'información' : 'descarga'} solicitada.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input required type="text" placeholder="Nombre completo"
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1A1A24] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors" />
              </div>
              <div>
                <input required type="tel" placeholder="Número de WhatsApp"
                  value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#1A1A24] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors" />
              </div>
              <div>
                <input required type="text" placeholder="Empresa o Negocio"
                  value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-[#1A1A24] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors" />
              </div>
              
              <div className="flex items-start gap-3 mt-4">
                <input required type="checkbox" id="habeas"
                  checked={formData.habeas} onChange={e => setFormData({ ...formData, habeas: e.target.checked })}
                  className="mt-1" />
                <label htmlFor="habeas" className="text-[10px] text-neutral-400 leading-tight">
                  Acepto la política de tratamiento de datos personales y autorizo a Soluciones Digitales IA para enviarme información y publicidad de sus productos.
                </label>
              </div>

              {targetType === 'whatsapp' && (
                <div className="mt-4 p-3 rounded-lg border flex gap-3 items-start" style={{ borderColor: 'rgba(255,165,0,0.3)', backgroundColor: 'rgba(255,165,0,0.1)' }}>
                  <AlertTriangle size={16} className="text-orange-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-orange-200 font-medium leading-tight">
                    Para poder responderte a la mayor brevedad POR FAVOR AGRÉGAME A TUS CONTACTOS, POR POLÍTICAS DE WHATSAPP.
                  </p>
                </div>
              )}

              <button type="submit"
                className="w-full mt-6 py-3.5 rounded-xl text-xs font-bold tracking-widest text-center transition-all hover:scale-[1.02]"
                style={{ backgroundColor: targetType === 'whatsapp' ? GREEN : MEGA_RED, color: targetType === 'whatsapp' ? '#050508' : '#FFF' }}>
                {targetType === 'whatsapp' ? 'SOLICITAR POR WHATSAPP' : 'CONTINUAR A LA DESCARGA'}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function TutorialExtractorPage() {
  const [modalState, setModalState] = useState({ isOpen: false, type: '', url: '' });

  const openModal = (url, type) => {
    setModalState({ isOpen: true, type, url });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const steps = [
    {
      icon: Download,
      title: "1. Descargar Demo",
      description: "Haz clic en uno de los botones a continuación para descargar el instalador del Extractor PLUS.",
      content: (
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
          <button onClick={() => openModal('https://mega.nz/file/FQchXDSQ#bXQy3hO0o92ZFTaq_X2uVPXrPv40JGGadfsbcFlNa8c', 'mega')}
            className="px-6 py-3 rounded-lg text-[11px] font-bold tracking-[0.1em] flex items-center justify-center w-full sm:w-auto gap-2 transition-all hover:scale-[1.02]"
            style={{ backgroundColor: MEGA_RED, color: '#FFF' }}>
            <Download size={16} />
            DESCARGAR DEMO POR MEGA
          </button>
          <button onClick={() => openModal('', 'whatsapp')}
            className="px-6 py-3 rounded-lg text-[11px] font-bold tracking-[0.1em] transition-all flex items-center justify-center w-full sm:w-auto gap-2 hover:scale-[1.02]"
            style={{ backgroundColor: GREEN, color: '#050508' }}>
            <MessageCircle size={16} />
            DESCARGAR DEMO POR WHATSAPP
          </button>
        </div>
      )
    },
    {
      icon: MonitorPlay,
      title: "2. Instalar el Software",
      description: "Una vez descargado el archivo, extrae su contenido e inicia el instalador. Abre la aplicación en tu computadora. Al abrirla por primera vez, el sistema te mostrará un Número de Serie (Serial Number) único para tu PC.",
      content: null
    },
    {
      icon: Key,
      title: "3. Solicitar Token de Activación",
      description: "Dentro de la aplicación encontrarás un botón directo para contactarnos por WhatsApp. Solo debes enviarnos el Número de Serie que te arrojó el software junto con tu nombre para que generemos tu Token.",
      content: (
        <div className="mt-4 p-4 rounded-xl border border-white/10 bg-white/5 flex items-start gap-3">
          <AlertTriangle size={18} className="text-orange-400 shrink-0 mt-0.5" />
          <p className="text-xs text-neutral-300 leading-relaxed">
            <strong className="text-orange-300">Importante:</strong> Todo el proceso de solicitud de token y activación se realiza directamente desde la interfaz del Extractor PLUS para mayor seguridad.
          </p>
        </div>
      )
    },
    {
      icon: CheckCircle,
      title: "4. Ingresar el Token y Extraer",
      description: "Cuando soporte te responda con tu Token, ingrésalo en la aplicación. ¡Listo! Ya puedes conectar tu WhatsApp Web y comenzar a extraer contactos ilimitadamente durante el periodo de prueba.",
      content: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-[#D7E2EA]">
      <SEO title="Tutorial de Instalación - Extractor PLUS" description="Manual paso a paso para instalar y activar la demo de Extractor PLUS." />
      
      <LeadModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        targetType={modalState.type} 
        targetUrl={modalState.url} 
      />

      <Navbar activePage="productos" />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <a href={getPageUrl('extractor')} className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver a Extractor PLUS
          </a>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-[-0.02em] mb-4">
            MANUAL DE <span style={{ color: GREEN }}>INSTALACIÓN</span>
          </h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-2xl">
            Sigue estos 4 sencillos pasos para descargar, instalar y activar tu licencia Demo del Extractor PLUS de WhatsApp.
          </p>
        </motion.div>

        <div className="mt-16 space-y-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="hidden md:flex absolute left-[-40px] top-0 bottom-[-48px] w-px bg-white/10 z-0"></div>
              
              <div className="bg-[#0C0C10] border border-white/5 p-6 md:p-8 rounded-2xl relative z-10 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-1" style={{ backgroundColor: `${GREEN}10` }}>
                    <step.icon size={24} style={{ color: GREEN }} />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{step.title}</h2>
                    <p className="text-sm text-neutral-400 leading-relaxed">{step.description}</p>
                    {step.content}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
