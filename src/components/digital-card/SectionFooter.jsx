import { COLORS, FONTS } from './shared';
import { getPageUrl, getDistUrl } from '../../utils/env';

const links = [
  { label: 'Sitios Web Corporativos', url: getPageUrl('sitios-web') },
  { label: 'Probador Virtual IA', url: getPageUrl('probador-virtual') },
  { label: 'Chatbot & Piloto Pro', url: getPageUrl('chatbot') },
  { label: 'WhatsApp: Guardián de Difusión', url: getPageUrl('guardian-difusion') },
  { label: 'WhatsApp: Calentador', url: getPageUrl('calentador-cuentas') },
];

export default function SectionFooter() {
  return (
    <footer style={styles.footer}>
      <style>{`
        .foot-link {
          transition: all 0.3s ease !important;
        }
        .foot-link:hover {
          color: #c1963c !important;
          transform: translateX(4px) !important;
        }
        .foot-li {
          transition: all 0.3s ease !important;
        }
      `}</style>
      <div style={styles.container}>
        
        {/* Brand Section */}
        <div style={styles.brandBox}>
          <div style={styles.logoWrap}>
            <img 
              src={getDistUrl('365/Diseno-sin-titulo-24.png')} 
              alt="Soluciones Digitales" 
              style={styles.logo}
            />
          </div>
          <h3 style={styles.title}>Soluciones Digitales</h3>
          <p style={styles.desc}>
            Transformamos tu presencia digital en una máquina de ventas mediante Inteligencia Artificial y Automatización B2B.
          </p>
        </div>

        {/* Links Section */}
        <div style={styles.linksBox}>
          <h4 style={styles.linksTitle}>Nuestro Ecosistema</h4>
          <ul style={styles.ul}>
            {links.map((link, idx) => (
              <li key={idx} className="foot-li" style={styles.li}>
                <a href={link.url} style={styles.a} className="foot-link" target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div style={styles.bottomBar}>
        <p style={styles.copyright}>
          &copy; {new Date().getFullYear()} Soluciones Digitales. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: 'rgba(10,10,13,0.72)',
    borderTop: '1px solid #2e2e3a',
    padding: '60px 20px 20px',
    fontFamily: FONTS.raleway,
    color: '#ffffff',
    marginTop: 40,
    position: 'relative',
    zIndex: 1,
  },
  container: {
    maxWidth: 900,
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 40,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  brandBox: {
    flex: '1 1 300px',
  },
  logoWrap: {
    width: 60,
    height: 60,
    background: COLORS.card,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
    border: '1px solid #2e2e3a',
    overflow: 'hidden'
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  title: {
    fontFamily: FONTS.cinzel,
    fontSize: 20,
    color: COLORS.goldSoft,
    marginBottom: 12,
    fontWeight: 700,
  },
  desc: {
    fontSize: 13,
    color: '#a09b92',
    lineHeight: 1.6,
    maxWidth: 300,
  },
  linksBox: {
    flex: '1 1 250px',
  },
  linksTitle: {
    fontFamily: FONTS.cinzel,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 16,
    fontWeight: 700,
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  li: {
    display: 'flex',
    alignItems: 'center',
  },
  a: {
    color: '#c8c0b4',
    textDecoration: 'none',
    fontSize: 14,
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
  bottomBar: {
    maxWidth: 900,
    margin: '0 auto',
    borderTop: '1px solid #1a1a24',
    paddingTop: 20,
    textAlign: 'center',
  },
  copyright: {
    fontSize: 11,
    color: '#8a8378',
    letterSpacing: 1,
  }
};
