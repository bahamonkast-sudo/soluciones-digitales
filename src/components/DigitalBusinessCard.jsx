import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getDistUrl } from '../utils/env';

function GlowPulseCard({ children, className = '' }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: '#1a1a1f',
        boxShadow: '8px 8px 20px #0d0d10, -4px -4px 14px #2a2a32, inset 0 0 0 1px #2e2e3a',
        animation: 'sdGlowPulse 4s infinite',
      }}
    >
      {children}
    </div>
  );
}

const items = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c1963c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '+57 311 589 3220',
    href: 'https://wa.me/573115893220',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c1963c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'Teléfono',
    value: '+57 311 589 3220',
    href: 'tel:+573115893220',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c1963c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'info@solucionesdigitalesia.co',
    href: 'mailto:info@solucionesdigitalesia.co',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c1963c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    label: 'Sitio Web',
    value: window.location.host,
    href: window.location.origin,
  },
];

export default function DigitalBusinessCard({ onClose }) {
  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.92, opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[400px] relative"
    >
      <button
        onClick={onClose}
        className="absolute -top-3 -right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-xl transition-colors"
        style={{ background: '#1a1a1f', border: '1px solid #3a3118', color: '#c1963c' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Raleway:wght@300;400;600&display=swap');

        @keyframes sdGlowPulse {
          0%, 100% {
            box-shadow: 8px 8px 20px #0d0d10, -4px -4px 14px #2a2a32, inset 0 0 0 1px #2e2e3a;
          }
          50% {
            box-shadow: 8px 8px 28px #0d0d10, -4px -4px 18px #2a2a32, inset 0 0 0 1px rgba(193, 150, 60, 0.33);
          }
        }
        @keyframes sdShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div
        className="rounded-[28px] overflow-hidden"
        style={{ background: '#1a1a1f' }}
      >
        {/* S01: Anclaje */}
        <div
          className="relative"
          style={{
            animation: 'sdGlowPulse 4s infinite',
            padding: '32px 28px',
            borderBottom: '1px solid #2a2a32',
          }}
        >
          <div
            className="absolute"
            style={{
              top: 20, right: 24,
              background: 'rgba(76,175,80,0.08)',
              border: '1px solid rgba(76,175,80,0.4)',
              borderRadius: 30,
              padding: '4px 12px',
              fontSize: 10,
              color: '#4caf50',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            ● Online
          </div>
          <div className="flex items-center gap-5">
            <div
              className="shrink-0"
              style={{
                width: 90, height: 90,
                background: '#1f1e24',
                borderRadius: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <img
                src={getDistUrl('365/Diseno-sin-titulo-24.png')}
                alt="logo"
                style={{ width: '75%' }}
              />
            </div>
            <div className="min-w-0">
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 22, color: '#e8d5a3', fontWeight: 700, lineHeight: 1.2 }}>
                Soluciones Digitales
              </div>
              <div style={{ color: '#c1963c', letterSpacing: 2, fontWeight: 600, fontSize: 12, marginTop: 4 }}>
                GUILLERMO CASTELLANOS
              </div>
              <p style={{ color: '#7a7060', fontStyle: 'italic', fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>
                "Transformamos tu presencia digital con Inteligencia Artificial."
              </p>
            </div>
          </div>
        </div>

        {/* S02: Propuesta */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #2a2a32' }}>
          <span style={{ color: '#c1963c', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>
            02 · La Propuesta
          </span>
          <p style={{ color: '#b0a898', lineHeight: 1.7, fontSize: 13, marginTop: 12 }}>
            Transformamos tu negocio mediante <strong style={{ color: '#e8d5a3' }}>estrategias de marketing</strong> potenciadas con <strong style={{ color: '#e8d5a3' }}>Inteligencia Artificial</strong>.
          </p>
        </div>

        {/* S03: Diagnóstico */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #2a2a32' }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: '#fff', marginBottom: 10 }}>
            ¿Tu negocio existe en internet?
          </div>
          <p style={{ color: '#c8c0b4', fontSize: 13, lineHeight: 1.6 }}>
            Si no te encuentran, le compran a tu competencia.
          </p>
        </div>

        {/* Contact links */}
        <div style={{ padding: '16px 28px 20px', borderBottom: '1px solid #2a2a32' }}>
          <div className="flex flex-col gap-1">
            {items.map((it, i) => (
              <a
                key={i}
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-colors"
                style={{ color: '#c8c0b4' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(193,150,60,0.06)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: '#1f1e24', border: '1px solid #2e2e3a' }}
                >
                  {it.icon}
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: '#7a7060', textTransform: 'uppercase' }}>
                    {it.label}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#e8d5a3' }} className="truncate">
                    {it.value}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* S04: Quiénes Somos + Save */}
        <div style={{ padding: '20px 28px 24px' }}>
          <h3 style={{ color: '#c1963c', fontFamily: "'Cinzel', serif", fontSize: 15, marginBottom: 8 }}>
            Quiénes Somos
          </h3>
          <p style={{ color: '#c8c0b4', fontSize: 12, lineHeight: 1.6, marginBottom: 16 }}>
            Expertos en aceleración digital y ventas automatizadas.
          </p>
          <div className="flex flex-col gap-3">
            <div
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
              style={{ background: '#1f1e24', border: '1px solid #2e2e3a' }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4caf50' }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: '#7a7060', letterSpacing: '0.5px' }}>Bogotá, Colombia</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  const vcard = [
                    'BEGIN:VCARD',
                    'VERSION:3.0',
                    'FN:Guillermo Castellanos - Soluciones Digitales IA',
                    'ORG:Soluciones Digitales IA',
                    'TEL;TYPE=WORK:+57 311 589 3220',
                    'EMAIL:info@solucionesdigitalesia.co',
                    `URL:${window.location.origin}`,
                    'ADR:;;Bogotá;;;Colombia',
                    'END:VCARD',
                  ].join('\n');
                  const blob = new Blob([vcard], { type: 'text/vcard' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'soluciones-digitales-ia.vcf';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all"
                style={{ background: '#c1963c', color: '#1a1a1f', border: 'none' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Contacto
              </button>
              <button
                onClick={() => {
                  const url = window.location.href;
                  const content = `[InternetShortcut]\r\nURL=${url}\r\n`;
                  const blob = new Blob([content], { type: 'application/x-ms-shortcut' });
                  const a = document.createElement('a');
                  a.href = URL.createObjectURL(blob);
                  a.download = 'Soluciones-Digitales.url';
                  a.click();
                  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
                  alert('Acceso directo descargado.\n\nPC: se guarda en Descargas, arrástralo al escritorio.\nMóvil Android: Menú ⋮ → Añadir a pantalla de inicio\nMóvil iPhone: Compartir → Añadir a pantalla de inicio');
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all"
                style={{ background: '#fff', color: '#1a1a1f', border: '1px solid #2e2e3a' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M3 9h18"/></svg>
                Acceso
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
