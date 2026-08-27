import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, ExternalLink, Copy, Check, Key, Clock, Shield, Eye, MousePointer2, Sparkles } from 'lucide-react';

const STEPS = [
  {
    n: 1,
    title: "Abre Groq Console",
    desc: "Haz clic en el botón y abre console.groq.com/keys en una nueva pestaña.",
    detail: "Es la página oficial de Groq para crear API Keys. Es 100% gratuita.",
    img: "/tutorial/groq/step-01-console.webp",
    fallbackIcon: "🌐",
    highlight: "Verás el dominio console.groq.com/keys",
    cta: { label: "Abrir Groq Console", href: "https://console.groq.com/keys" },
    tip: "Si no tienes cuenta, la creas en 10 segundos con Google."
  },
  {
    n: 2,
    title: "Inicia sesión",
    desc: "Entra con Google o GitHub. No necesitas tarjeta de crédito.",
    detail: "Groq te pide login para asociar tu clave gratuita a tu cuenta.",
    img: "/tutorial/groq/step-02-login.webp",
    fallbackIcon: "🔐",
    highlight: 'Botón "Sign in with Google"',
    tip: "Acepta los términos y ya estás dentro."
  },
  {
    n: 3,
    title: 'Haz clic en "Create API Key"',
    desc: "Dentro del dashboard, busca el botón azul Create API Key arriba a la derecha.",
    detail: "Está en la sección API Keys. Es el único botón azul grande.",
    img: "/tutorial/groq/step-03-create.webp",
    fallbackIcon: "➕",
    highlight: 'Botón azul "Create API Key"',
    tip: "Si ya tienes claves, igual puedes crear otra nueva."
  },
  {
    n: 4,
    title: "Ponle un nombre y créala",
    desc: 'Escribe un nombre como "auditor-websd" y confirma. Copia enseguida.',
    detail: "El nombre es solo para que recuerdes para qué la usas.",
    img: "/tutorial/groq/step-04-name.webp",
    fallbackIcon: "🏷️",
    highlight: 'Campo "Name" + botón Create',
    tip: "No cierres la ventana hasta copiarla."
  },
  {
    n: 5,
    title: "Copia tu clave gsk_...",
    desc: "Verás tu clave empezando con gsk_. Haz clic en Copy y pégala aquí en WebSD.",
    detail: "Solo se muestra una vez completa. Guárdala si quieres, pero no la compartas.",
    img: "/tutorial/groq/step-05-copy.webp",
    fallbackIcon: "📋",
    highlight: 'Texto gsk_... + botón Copy',
    copyExample: "gsk_2aB7x...9fQ1",
    tip: "Pégala en el campo Groq API Key del formulario. ¡Listo para auditar!"
  }
];

function StepImage({ src, alt, fallbackIcon, highlight }) {
  const [failed, setFailed] = useState(false);
  const [enlarged, setEnlarged] = useState(false);
  if (failed) {
    return (
      <div className="relative w-full aspect-[16/10] rounded-xl border-2 border-dashed border-white/10 bg-gradient-to-br from-[#2962ff]/10 via-[#0f172a] to-black flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(400px 200px at 50% 0%, rgba(41,98,255,0.15), transparent)' }} />
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-3">{fallbackIcon}</div>
        <p className="text-xs font-mono text-neutral-500 max-w-[280px] leading-relaxed">Reemplaza con pantallazo real:<br /><span className="text-[#2962ff]">{src}</span></p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
          <MousePointer2 size={12} /> {highlight}
        </div>
        <p className="mt-2 text-[10px] text-neutral-600">Ver public/tutorial/groq/README.md</p>
      </div>
    );
  }
  return (
    <>
      <div
        onClick={() => setEnlarged(true)}
        className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl cursor-zoom-in group"
        title="Clic para pantalla completa"
      >
        {/* browser chrome */}
        <div className="h-7 bg-[#0f172a] border-b border-white/10 flex items-center gap-1.5 px-3">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="ml-3 text-[10px] font-mono text-neutral-500 truncate">console.groq.com/keys</span>
          <span className="ml-auto text-[10px] font-semibold text-white/60 group-hover:text-white flex items-center gap-1">⛶ Ampliar</span>
        </div>
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="w-full h-[calc(100%-28px)] object-cover object-top group-hover:brightness-105 transition"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white/90 text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"><Eye size={14}/> Clic para pantalla completa</span>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#2962ff] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 pointer-events-none">
          <Eye size={12} /> {highlight}
        </div>
      </div>

      <AnimatePresence>
        {enlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8"
            onClick={() => setEnlarged(false)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-[1280px] max-h-[85vh] bg-[#0f172a] rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.7)] flex flex-col"
            >
              <div className="h-9 bg-[#0f172a] border-b border-white/10 flex items-center gap-1.5 px-4 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-3 text-[11px] font-mono text-neutral-400 truncate">console.groq.com/keys — {alt}</span>
                <button onClick={() => setEnlarged(false)} className="ml-auto w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white"><X size={16} /></button>
              </div>
              <div className="flex-1 overflow-auto bg-white flex items-center justify-center">
                <img src={src} alt={alt} className="w-full h-auto max-h-[75vh] object-contain" />
              </div>
              <div className="shrink-0 p-3 bg-black/50 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="text-xs text-neutral-400 flex items-center gap-1.5"><Eye size={12}/> {highlight}</span>
                <button onClick={() => setEnlarged(false)} className="text-xs font-semibold bg-white text-black px-4 py-1.5 rounded-full hover:bg-neutral-200">Cerrar ×</button>
              </div>
            </motion.div>
            <p className="mt-4 text-xs text-white/60">Clic fuera o × para cerrar • ESC</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function GroqTutorialModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = STEPS[step];

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const handleCopyExample = async () => {
    try {
      await navigator.clipboard.writeText(current.copyExample || 'gsk_');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-[880px] max-h-[92vh] md:max-h-[88vh] bg-[#0d0d12] border border-white/10 rounded-[20px] md:rounded-[24px] overflow-hidden flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
        >
          {/* Header */}
          <div className="shrink-0 px-5 md:px-7 pt-5 md:pt-6 pb-4 border-b border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="hidden md:flex w-10 h-10 rounded-xl bg-[#2962ff]/15 border border-[#2962ff]/20 items-center justify-center shrink-0">
                  <Key size={18} className="text-[#2962ff]" />
                </div>
                <div>
                  <h2 className="text-[17px] md:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    Consigue tu API Key en 30 segundos
                    <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase bg-[#2962ff]/15 text-[#2962ff] border border-[#2962ff]/20 px-2 py-1 rounded-full">
                      <Sparkles size={10} /> gratis
                    </span>
                  </h2>
                  <p className="text-[12px] md:text-[13px] text-neutral-400 mt-1 leading-relaxed">
                    Sigue los pantallazos. Te llevamos de la mano, sin tecnicismos.
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500">
                      <Clock size={12} /> ~30s
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500">
                      <Shield size={12} /> Sin tarjeta
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-emerald-400">
                      <Check size={12} /> gsk_... segura
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors shrink-0">
                <X size={16} />
              </button>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-neutral-500">Paso {step + 1} de {STEPS.length}</span>
                <span className="text-[11px] font-medium text-[#2962ff]">{current.title}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden flex gap-1">
                {STEPS.map((_, i) => (
                  <div key={i} className={`h-full rounded-full transition-all duration-500 flex-1 ${i <= step ? 'bg-[#2962ff]' : 'bg-white/10'}`} />
                ))}
              </div>
              <div className="flex gap-1.5 mt-3">
                {STEPS.map((s, i) => (
                  <button
                    key={s.n}
                    onClick={() => setStep(i)}
                    className={`flex-1 py-2.5 rounded-xl border text-[11px] font-semibold transition-all flex flex-col items-center gap-1 ${i === step ? 'bg-[#2962ff] border-[#2962ff] text-white shadow-lg shadow-[#2962ff]/20' : i < step ? 'bg-[#2962ff]/15 border-[#2962ff]/20 text-[#8fb0ff] hover:bg-[#2962ff]/20' : 'bg-white/[0.04] border-white/10 text-neutral-500 hover:bg-white/[0.06] hover:text-neutral-300'}`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i === step ? 'bg-white text-[#2962ff]' : i < step ? 'bg-[#2962ff] text-white' : 'bg-white/10 text-neutral-400'}`}>{i < step ? <Check size={10} /> : s.n}</span>
                    <span className="hidden md:block leading-none truncate w-full px-1">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-5 md:p-7">
              <div className="grid md:grid-cols-[1.05fr_1.45fr] gap-6 md:gap-7 items-start">
                {/* Left: text */}
                <div className="order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-[#2962ff] text-white flex items-center justify-center text-sm font-black shrink-0">{current.n}</span>
                    <h3 className="text-[18px] md:text-xl font-bold text-white leading-tight">{current.title}</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-white font-medium">{current.desc}</p>
                  <p className="text-[12.5px] leading-relaxed text-neutral-400 mt-2">{current.detail}</p>

                  {current.copyExample && (
                    <div className="mt-4 p-3 rounded-xl bg-black border border-white/10 flex items-center justify-between gap-3">
                      <code className="font-mono text-[13px] text-[#2962ff] truncate">{current.copyExample}</code>
                      <button onClick={handleCopyExample} className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-bold bg-white text-black px-3 py-1.5 rounded-full hover:bg-neutral-200 transition-colors">
                        {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copiado' : 'Copiar'}
                      </button>
                    </div>
                  )}

                  <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex gap-2.5">
                    <span className="text-amber-400 mt-0.5">💡</span>
                    <p className="text-[12px] leading-relaxed text-amber-200/80"><strong className="text-amber-300">Tip:</strong> {current.tip}</p>
                  </div>

                  {current.cta && (
                    <a href={current.cta.href} target="_blank" rel="noreferrer" className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#2962ff] hover:bg-[#1e4fd6] text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-[#2962ff]/20">
                      {current.cta.label} <ExternalLink size={16} />
                    </a>
                  )}

                  <div className="mt-4 bg-white/[0.03] border border-white/5 rounded-xl p-3">
                    <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-500 mb-1.5 flex items-center gap-1.5"><Shield size={12} /> Privacidad</p>
                    <p className="text-[11px] leading-relaxed text-neutral-500">Tu clave se usa solo en tu navegador para llamar a Groq. No la guardamos en nuestros servidores. Puedes revocarla cuando quieras en el mismo panel.</p>
                  </div>
                </div>

                {/* Right: image */}
                <div className="order-1 md:order-2">
                  <StepImage src={current.img} alt={current.title} fallbackIcon={current.fallbackIcon} highlight={current.highlight} />
                  <p className="text-[11px] text-center text-neutral-500 mt-2.5">Pantallazo {current.n} de {STEPS.length} — haz clic en la imagen para ampliar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer navigation */}
          <div className="shrink-0 p-4 md:p-5 border-t border-white/[0.06] bg-[#0a0a0f] flex items-center justify-between gap-3">
            <button
              onClick={prev}
              disabled={step === 0}
              className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full border border-white/10 text-white text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
            >
              <ArrowLeft size={16} /> Anterior
            </button>

            <div className="flex items-center gap-1.5">
              {STEPS.map((_, i) => (
                <button key={i} onClick={() => setStep(i)} className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-[#2962ff] w-6' : i < step ? 'bg-[#2962ff]/50' : 'bg-white/15'}`} aria-label={`Ir a paso ${i+1}`} />
              ))}
            </div>

            {step < STEPS.length - 1 ? (
              <button onClick={next} className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-neutral-200 transition-colors shadow-lg">
                Siguiente <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={onClose} className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-full bg-[#2962ff] text-white text-sm font-bold hover:bg-[#1e4fd6] transition-colors shadow-lg shadow-[#2962ff]/20">
                ¡Ya la tengo! <Check size={16} />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
