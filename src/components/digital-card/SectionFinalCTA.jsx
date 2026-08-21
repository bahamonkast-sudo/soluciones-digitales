import { COLORS, FONTS } from './shared';

export default function SectionFinalCTA() {
  return (
    <div style={containerStyle}>
      <style>{`
        .fcta-btn {
          transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .fcta-btn:hover {
          background: linear-gradient(135deg, #c1963c 0%, #a67c2e 100%) !important;
          color: #ffffff !important;
          box-shadow: 0 12px 28px rgba(193,150,60,0.4) !important;
          transform: translateY(-3px) !important;
        }
        .fcta-link:hover {
          color: #c1963c !important;
        }
      `}</style>
      <div style={cardStyle}>
        <div style={cardBeforeStyle} />
        <div style={cardAfterStyle} />
        <span style={tagStyle}>Último paso</span>
        <h2 style={titleStyle}>
          El futuro de tu empresa no es manual,<br />
          <span style={spanStyle}>es automatizado.</span>
        </h2>
        <p style={subStyle}>
          Adquiere hoy la infraestructura que tu negocio necesita para escalar sin límites con nuestra instrucción experta.
        </p>
        <a
          href="https://wa.me/573115893220?text=Hola,%20quiero%20conocer%20mas%20sobre%20vuestra%20automatizaci%C3%B3n%20e%20infraestructura"
          target="_blank"
          rel="noopener"
          className="fcta-btn"
          style={btnStyle}
        >
          Contactanos para mas informacion
        </a>
        <p style={{ color: '#9a9184', fontSize: 12, marginTop: 20, letterSpacing: 1, textTransform: 'uppercase', position: 'relative', zIndex: 2 }}>
          <i className="fas fa-shield-alt" style={{ color: COLORS.gold }} />
          {' '}Instalación rápida + instrucción estratégica incluida
        </p>
      </div>
      <footer style={footerStyle}>
        <div style={{ fontFamily: FONTS.cinzel, color: '#ffffff', fontSize: 22, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
          GUILLERMO<span style={spanStyle}>CASTELLANOS</span>
        </div>
        <div style={{ color: '#8e8678', fontSize: 13 }}>Infraestructura Digital & Soluciones con IA</div>
        <div style={linksStyle}>
          <a href="#" className="fcta-link" style={linkStyle}>Términos</a>
          <a href="#" className="fcta-link" style={linkStyle}>Privacidad</a>
          <a href="#" className="fcta-link" style={linkStyle}>Soporte</a>
          <a href="#" className="fcta-link" style={linkStyle}>Contacto</a>
        </div>
        <div style={{ color: '#8a8378', fontSize: 11, marginTop: 20, letterSpacing: 1 }}>
          &copy; {new Date().getFullYear()} SOLUCIONES DIGITALES. TODOS LOS DERECHOS RESERVADOS.
        </div>
      </footer>
    </div>
  );
}

const containerStyle = {
  width: '100%', maxWidth: 850, margin: '60px auto 20px',
  fontFamily: FONTS.raleway, textAlign: 'center',
};
const cardStyle = {
  background: '#1a1a1f', padding: '60px 40px', borderRadius: 32,
  border: '1px solid #3a3118', position: 'relative', overflow: 'hidden',
  boxShadow: '8px 8px 20px #0d0d10, -4px -4px 14px #2a2a32, inset 0 0 0 1px #2e2e3a',
};
const cardBeforeStyle = {
  position: 'absolute', top: -120, right: -100,
  width: 320, height: 320,
  background: 'radial-gradient(circle, rgba(193,150,60,0.08), transparent 70%)',
  pointerEvents: 'none',
};
const cardAfterStyle = {
  position: 'absolute', bottom: -80, left: -60,
  width: 240, height: 240,
  background: 'radial-gradient(circle, rgba(193,57,57,0.05), transparent 70%)',
  pointerEvents: 'none',
};
const tagStyle = {
  display: 'inline-block', padding: '6px 14px', borderRadius: 999,
  background: '#211e17', border: '1px solid #3a3118',
  color: COLORS.gold, fontSize: 11, fontWeight: 700,
  letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20,
  position: 'relative', zIndex: 2,
};
const titleStyle = {
  fontFamily: FONTS.cinzel, color: '#ffffff', fontSize: 34, fontWeight: 700,
  lineHeight: 1.25, marginBottom: 20, position: 'relative', zIndex: 2,
};
const spanStyle = {
  background: 'linear-gradient(90deg, #c1963c, #e8d5a3, #c1963c)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
};
const subStyle = {
  color: '#c8c0b4', fontSize: 16, maxWidth: 560,
  margin: '0 auto 35px', lineHeight: 1.8, fontWeight: 300,
  position: 'relative', zIndex: 2,
};
const btnStyle = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  textDecoration: 'none', background: COLORS.card, color: COLORS.gold,
  border: '1px solid #3a3118', padding: '16px 34px', borderRadius: 999,
  fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
  transition: 'all 0.3s ease', position: 'relative', zIndex: 2,
  boxShadow: '3px 3px 8px #0f0f13, -2px -2px 6px #2d2c36',
};
const footerStyle = {
  marginTop: 45, paddingTop: 35,
  borderTop: '1px solid rgba(193,150,60,0.15)',
};
const linksStyle = {
  display: 'flex', justifyContent: 'center', gap: 25, margin: '20px 0', flexWrap: 'wrap',
};
const linkStyle = {
  color: '#8e8678', textDecoration: 'none', fontSize: 13, transition: '0.25s ease',
};
