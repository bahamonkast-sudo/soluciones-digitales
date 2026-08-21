import { COLORS, FONTS } from './shared';

const services = [
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    title: 'Sitios Web & Embudos',
    desc: 'Desarrollo de Landings, Sitios Corporativos y E-commerce de alta conversión.',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
    title: 'Probador Virtual IA',
    desc: 'Motor de Inteligencia Artificial para visualizar prendas y merchandising en modelos reales.',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10h-7.5l-3.5-3.5L12 2z"/></svg>,
    title: 'Agente IA (Piloto Pro)',
    desc: 'Asistente Autónomo Multicanal que atiende, califica y cierra ventas 24/7 sin humanos.',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
    title: 'WhatsApp: Envío Masivo',
    desc: 'Plataforma Guardián para enviar miles de mensajes a tus bases de datos con control de ritmo.',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>,
    title: 'WhatsApp: Calentador',
    desc: 'Algoritmo que interactúa entre múltiples números para blindar tus cuentas contra bloqueos.',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    title: 'Minería de Datos B2B',
    desc: 'Extracción de prospectos ultra cualificados y recuperación de leads en grupos abandonados.',
  },
];

export default function Section05Ecosistema() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '36px 16px', boxSizing: 'border-box', background: 'rgba(20,20,23,0.55)' }}>
      <style>{responsiveEcosistema}</style>
      <div style={{ width: '100%', maxWidth: 1000 }}>
        <div style={containerStyle}>
          <div style={headerStyle}>
            <span style={tagStyle}>La Solución</span>
            <h2 style={tituloStyle}>
              Ecosistema de <span style={spanStyle}>Valor Digital</span>
            </h2>
          </div>
          <div style={gridStyle} className="eco-grid">
            {/* Video */}
            <div style={videoBoxStyle}>
              <div style={videoHeaderStyle}>
                <span style={videoBadgeStyle}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  Video de Presentación
                </span>
                <p style={videoSubStyle}>Conéctate con nuestra visión</p>
              </div>
              <div style={videoFrameStyle}>
                <video
                  controls
                  playsInline
                  preload="metadata"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', background: '#000', borderRadius: 16, display: 'block' }}
                >
                  <source
                    src="https://res.cloudinary.com/ddp6ychwi/video/upload/Escena_inicial_-_2026-08-03_202608021911_b395a8.mp4"
                    type="video/mp4"
                  />
                  Tu navegador no soporta el formato de video.
                </video>
              </div>
            </div>
            {/* Servicios */}
            <div style={servicesListStyle}>
              {services.map((s, i) => (
                <div key={i} className="eco-service" style={serviceItemStyle}>
                  <div style={iconWrapStyle}>{s.icon}</div>
                  <div>
                    <h3 style={{ fontFamily: FONTS.cinzel, fontSize: 14, fontWeight: 700, marginBottom: 4, color: COLORS.goldSoft }}>
                      {s.title}
                    </h3>
                    <p style={{ fontSize: 13, color: '#c8c0b4', fontWeight: 300, lineHeight: 1.4 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  width: '100%', fontFamily: FONTS.raleway, color: '#ffffff',
};
const headerStyle = {
  textAlign: 'center', marginBottom: 50, animation: 'dgFadeUp 0.8s ease both',
};
const tagStyle = {
  fontSize: 11, fontWeight: 600, letterSpacing: 4, color: COLORS.gold,
  textTransform: 'uppercase', marginBottom: 12, display: 'block',
};
const tituloStyle = {
  fontFamily: FONTS.cinzel, fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 700, lineHeight: 1.2,
};
const spanStyle = {
  color: COLORS.gold,
  background: 'linear-gradient(90deg, #c1963c, #e8d5a3, #c1963c)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
};
const gridStyle = {
  display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'center',
};
const responsiveEcosistema = `
  @media (max-width: 768px) {
    .eco-grid {
      grid-template-columns: 1fr !important;
    }
  }
  .eco-service {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
  }
  .eco-service:hover {
    transform: translateX(10px) !important;
    border-color: #c1963c !important;
    box-shadow: -5px 5px 20px rgba(193,150,60,0.1) !important;
  }
`;
const videoBoxStyle = {
  position: 'relative', background: '#1a1a1f', borderRadius: 24, padding: 14,
  border: '1px solid rgba(193,150,60,0.3)',
  boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 40px rgba(193,150,60,0.08)',
  animation: 'dgFadeUp 0.8s ease 0.2s both',
  display: 'flex', flexDirection: 'column', gap: 12,
};
const videoHeaderStyle = {
  display: 'flex', flexDirection: 'column', gap: 4, padding: '4px 6px',
};
const videoBadgeStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 7,
  fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
  color: COLORS.gold,
};
const videoSubStyle = {
  fontSize: 11, color: COLORS.goldSoft, fontWeight: 400, margin: 0,
};
const videoFrameStyle = {
  width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: 16,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  overflow: 'hidden', position: 'relative', border: '1px solid rgba(193,150,60,0.18)',
};
const servicesListStyle = {
  display: 'flex', flexDirection: 'column', gap: 16,
  animation: 'dgFadeUp 0.8s ease 0.4s both',
};
const serviceItemStyle = {
  background: COLORS.card, border: '1px solid #2e2c38', borderRadius: 16,
  padding: 18, display: 'flex', gap: 16, transition: 'all 0.3s ease', cursor: 'default',
};
const iconWrapStyle = {
  width: 44, height: 44, background: '#2a2832', borderRadius: 12,
  display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.gold, flexShrink: 0,
};
