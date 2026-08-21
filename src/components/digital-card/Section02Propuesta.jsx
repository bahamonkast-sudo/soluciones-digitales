import { glowCardStyle, COLORS, goldGradientText, glowBtnStyle } from './shared';
import { getSiteUrl } from '../../utils/env';

const VCARD = (siteUrl) =>
  `data:text/vcard;charset=utf-8,BEGIN%3AVCARD%0AVERSION%3A3.0%0AFN%3AGuillermo%20Castellanos%0AN%3ACastellanos%3BGuillermo%3B%3B%3B%0AORG%3ASoluciones%20Digitales%0ATITLE%3AFundador%20%26%20CEO%0ATEL%3BTYPE%3DCELL%3A%2B573115893220%0AURL%3A${encodeURIComponent(siteUrl)}%0AX-SOCIALPROFILE%3Btype%3Dfacebook%3Ahttps%3A%2F%2Fwww.facebook.com%2FDatafastMarketing%0ANOTE%3AMarketing%20Digital%20potenciado%20con%20Inteligencia%20Artificial%0AEND%3AVCARD`;

const styles = {
  wrap: {
    ...glowCardStyle({ borderRadius: 24, padding: '44px 52px' }),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  wrapBefore: {
    position: 'absolute', top: -80, right: -80,
    width: 300, height: 300,
    background: 'radial-gradient(circle, rgba(193,150,60,0.07) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  wrapAfter: {
    position: 'absolute', bottom: -60, left: -60,
    width: 220, height: 220,
    background: 'radial-gradient(circle, rgba(193,150,60,0.04) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  tag: {
    fontSize: 10, fontWeight: 600, letterSpacing: 3, color: COLORS.gold,
    textTransform: 'uppercase', background: '#211e17',
    border: `1px solid ${COLORS.borderGold}`, padding: '5px 14px',
    borderRadius: 20, display: 'inline-block', marginBottom: 24,
    animation: 'dgFadeUp 0.6s ease 0.1s both',
  },
  text: {
    fontSize: 'clamp(14px, 2vw, 17px)', fontWeight: 300, color: '#b0a898',
    lineHeight: 1.85, animation: 'dgFadeUp 0.6s ease 0.2s both',
  },
  textStrong: {
    ...goldGradientText(),
    fontWeight: 600,
  },
  divider: {
    width: 50, height: 1,
    background: 'linear-gradient(90deg, transparent, #c1963c, transparent)',
    margin: '28px auto', animation: 'dgFadeUp 0.6s ease 0.3s both',
  },
  label: {
    fontSize: 10, fontWeight: 600, letterSpacing: 2.5, color: '#8a8378',
    textTransform: 'uppercase', marginBottom: 14,
  },
  actions: {
    display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center',
    marginBottom: 28, animation: 'dgFadeUp 0.6s ease 0.4s both',
  },
  btn: glowBtnStyle(),
  socialsRow: {
    display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center',
    paddingBottom: 24, animation: 'dgFadeUp 0.6s ease 0.5s both',
  },
  social: {
    width: 42, height: 42, borderRadius: 12, background: 'transparent',
    border: `1px solid rgba(193,150,60,0.15)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 0.3s ease',
    textDecoration: 'none', position: 'relative' ,
  },
};

const socialLinks = [
  {
    href: 'https://www.facebook.com/DatafastMarketing',
    title: 'Facebook',
    active: true,
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    href: 'https://wa.me/573115893220',
    title: 'WhatsApp',
    active: true,
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  },
];

export default function Section02Propuesta() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '36px 16px', boxSizing: 'border-box' }}>
      <style>{`
        .social-btn {
          color: #8c857b;
        }
        .social-btn:hover {
          color: #c1963c;
          border-color: #c1963c !important;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(193,150,60,0.15);
        }
        .social-btn svg {
          width: 20px;
          height: 20px;
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 854 }}>
        <div style={styles.wrap}>
          <div style={styles.wrapBefore} />
          <div style={styles.wrapAfter} />
          <span style={styles.tag}>La Propuesta</span>
          <p style={styles.text}>
            Transformamos tu operación mediante{' '}
            <strong style={styles.textStrong}>Automatización B2B, Minería de Datos</strong> y{' '}
            <strong style={styles.textStrong}>Agentes de Inteligencia Artificial</strong>. Construimos ecosistemas que 
            automatizan tu prospección y generan <strong style={styles.textStrong}>ventas escalables</strong>.
          </p>
          <div style={styles.divider} />
          <div style={styles.label}>Contáctanos</div>
          <div style={styles.actions}>
            <a style={styles.btn} href="tel:+573115893220">
              <svg width="14" height="14" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              Llamar
            </a>
            <a style={styles.btn} href={getSiteUrl()} target="_blank" rel="noopener">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93V18c0-.55.45-1 1-1s1 .45 1 1v1.93A8.003 8.003 0 0 1 4.07 13H6c.55 0 1-.45 1-1s-.45-1-1-1H4.07A8.003 8.003 0 0 1 11 4.07V6c0 .55-.45 1-1 1s-1-.45-1-1V4.07A8.003 8.003 0 0 1 19.93 11H18c-.55 0-1 .45-1 1s.45 1 1 1h1.93A8.003 8.003 0 0 1 13 19.93V18c0-.55.45-1 1-1s1 .45 1 1v1.93A8.003 8.003 0 0 1 11 19.93z"/></svg>
              Sitio Web
            </a>
            <a style={styles.btn} href={VCARD(getSiteUrl())} download="guillermo_castellanos.vcf">
              <svg width="14" height="14" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
              Descargar Contacto
            </a>
          </div>
          <div style={styles.label}>Síguenos</div>
          <div style={styles.socialsRow}>
            {socialLinks.map((s, i) => (
              <a key={i} className="social-btn" style={styles.social} href={s.href} target="_blank" rel="noopener" title={s.title}>
                {s.svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
