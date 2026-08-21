import { COLORS, FONTS } from './shared';

export default function Section08Conversion() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '36px 16px', boxSizing: 'border-box', background: 'rgba(20,20,23,0.55)' }}>
      <div style={{ width: '100%', maxWidth: 900 }}>
        <div style={containerStyle}>
          <div style={headerStyle}>
            <span style={tagStyle}>El Siguiente Paso</span>
            <h2 style={tituloStyle}>
              Listo para escalar <span style={spanStyle}>tus resultados</span>
            </h2>
            <p style={subtituloStyle}>
              Toma el control de tu crecimiento digital hoy mismo. Agenda una sesión estratégica y transformemos tu negocio.
            </p>
          </div>
          <a href="https://wa.me/573115893220?text=Hola%20Guillermo,%20quiero%20agendar%20mi%20cita%20estrat%C3%A9gica." target="_blank" rel="noopener" style={ctaButtonStyle}>
            AGENDAR AHORA MI CITA
          </a>
          <div style={mapContainerStyle}>
            <div style={mapFrameStyle}>
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, borderRadius: 18 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.852324905146!2d-74.13576082414761!3d4.620138442337775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9eb200780447%3A0xe67963d76e4693a4!2sCentro%20Comercial%20Plaza%20de%20las%20Am%C3%A9ricas!5e0!3m2!1ses!2sco!4v1711234567890!5m2!1ses!2sco"
                allowFullScreen
                loading="lazy"
                title="Ubicación"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=4.6201384%2C-74.1357608"
                target="_blank"
                rel="noopener"
                style={mapsLinkStyle}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Abrir en Google Maps
              </a>
            </div>
            <div style={mapInfoStyle}>
              <div>
                <h4 style={{ fontFamily: FONTS.cinzel, fontSize: 14, color: COLORS.goldSoft, marginBottom: 4 }}>Nuestra Ubicación Central</h4>
                <p style={{ fontSize: 12, color: '#c8c0b4' }}>Plaza de las Américas, Bogotá, Colombia</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: COLORS.gold, fontWeight: 600, textTransform: 'uppercase' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                Sede Estratégica Bogotá
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  width: '100%', fontFamily: FONTS.raleway, color: '#ffffff', textAlign: 'center',
};
const headerStyle = {
  marginBottom: 40, animation: 'dgFadeUp 0.8s ease both',
};
const tagStyle = {
  fontSize: 11, fontWeight: 600, letterSpacing: 4, color: COLORS.gold,
  textTransform: 'uppercase', marginBottom: 12, display: 'block',
};
const tituloStyle = {
  fontFamily: FONTS.cinzel, fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 700,
  lineHeight: 1.1, marginBottom: 20,
};
const spanStyle = { color: COLORS.gold };
const subtituloStyle = {
  fontSize: 'clamp(14px, 2vw, 16px)', color: '#c8c0b4',
  maxWidth: 600, margin: '0 auto 40px', fontWeight: 300,
};
const ctaButtonStyle = {
  display: 'inline-block', padding: '20px 45px',
  background: 'linear-gradient(135deg, #c1963c 0%, #a67c2e 100%)',
  color: '#ffffff', textDecoration: 'none',
  fontFamily: FONTS.raleway, fontWeight: 700, fontSize: 14,
  letterSpacing: 2, borderRadius: 50, border: 'none', cursor: 'pointer',
  animation: 'dgFadeUp 0.8s ease 0.2s both, dgPulseGold 2s infinite',
  marginBottom: 60, transition: 'all 0.3s ease',
};
const mapContainerStyle = {
  width: '100%', background: '#1a1a1f', border: '1px solid #2e2e3a',
  borderRadius: 28, padding: 15, position: 'relative',
  animation: 'dgFadeUp 0.8s ease 0.4s both',
  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
};
const mapFrameStyle = {
  width: '100%', height: 350, borderRadius: 18, overflow: 'hidden',
  filter: 'grayscale(0.3) contrast(1.1) brightness(0.8)',
  transition: 'filter 0.5s ease',
  position: 'relative',
};
const mapsLinkStyle = {
  position: 'absolute', bottom: 16, right: 16, zIndex: 3,
  display: 'inline-flex', alignItems: 'center', gap: 7,
  background: 'rgba(12,12,12,0.82)', color: COLORS.gold,
  border: '1px solid rgba(193,150,60,0.4)', borderRadius: 30,
  padding: '9px 16px', fontSize: 11, fontWeight: 700, letterSpacing: 1,
  textTransform: 'uppercase', textDecoration: 'none',
  backdropFilter: 'blur(6px)', transition: 'all 0.3s ease',
  boxShadow: '0 6px 16px rgba(0,0,0,0.45)',
};
const mapInfoStyle = {
  marginTop: 20, display: 'flex', justifyContent: 'space-between',
  alignItems: 'center', padding: '0 10px',
};
