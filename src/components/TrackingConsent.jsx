import { useEffect, useRef, useState } from 'react';

const GOOGLE_ANALYTICS_ID = 'G-82TXFYEZQJ';
const META_PIXEL_ID = '4427381410854906';
const CONSENT_KEY = 'websd-tracking-consent-v1';
const GOOGLE_CONSENT = {
  analytics_storage: 'granted',
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
};
const DENIED_GOOGLE_CONSENT = Object.fromEntries(Object.keys(GOOGLE_CONSENT).map((key) => [key, 'denied']));

function trackGooglePageView() {
  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
  });
}

function loadGoogleTag() {
  if (typeof window === 'undefined') return;
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('consent', 'default', DENIED_GOOGLE_CONSENT);
    window.gtag('consent', 'update', GOOGLE_CONSENT);
    window.gtag('config', GOOGLE_ANALYTICS_ID, { send_page_view: false });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
    document.head.appendChild(script);
    window.__websdGoogleTagInitialized = true;
    trackGooglePageView();
    return;
  }

  window.gtag('consent', 'update', GOOGLE_CONSENT);
  if (window.__websdGoogleTagInitialized) trackGooglePageView();
}

function loadMetaPixel() {
  if (typeof window === 'undefined') return;
  if (window.fbq) {
    window.fbq('consent', 'grant');
    if (window.__websdMetaPixelInitialized) window.fbq('track', 'PageView');
    return;
  }

  // Meta's base code, loaded only after the visitor accepts measurement.
  // No <noscript> beacon is included because it would fire before consent.
  // eslint-disable-next-line no-inner-declarations
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
  window.__websdMetaPixelInitialized = true;
}

function loadTracking() {
  loadGoogleTag();
  loadMetaPixel();
}

function trackConversion({ type, method }) {
  if (type === 'lead') {
    window.gtag?.('event', 'generate_lead', { method });
    window.fbq?.('track', 'Lead', { method });
    return;
  }
  window.gtag?.('event', 'contact', { method });
  window.fbq?.('track', 'Contact', { method });
}

export default function TrackingConsent({ pagePath }) {
  const [consent, setConsent] = useState(() => {
    try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const previousPath = useRef(null);

  useEffect(() => {
    if (consent === 'accepted') loadTracking();
  }, [consent]);

  useEffect(() => {
    if (consent !== 'accepted') return undefined;
    const handleWhatsAppClick = (event) => {
      const anchor = event.target.closest?.('a[href]');
      if (!anchor || !/^(https?:\/\/)?(www\.)?(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)(\/|$)/i.test(anchor.href)) return;
      trackConversion({ type: 'contact', method: 'whatsapp' });
    };
    const handleConversion = (event) => trackConversion(event.detail || {});
    document.addEventListener('click', handleWhatsAppClick, true);
    window.addEventListener('websd:conversion', handleConversion);
    return () => {
      document.removeEventListener('click', handleWhatsAppClick, true);
      window.removeEventListener('websd:conversion', handleConversion);
    };
  }, [consent]);

  useEffect(() => {
    if (previousPath.current !== null && previousPath.current !== pagePath && consent === 'accepted') {
      trackGooglePageView();
      if (window.fbq) window.fbq('track', 'PageView');
    }
    previousPath.current = pagePath;
  }, [pagePath, consent]);

  const saveConsent = (value) => {
    try { localStorage.setItem(CONSENT_KEY, value); } catch { /* The choice still applies for this page. */ }
    setConsent(value);
    setShowPreferences(false);
    if (value === 'rejected') {
      window.gtag?.('consent', 'update', DENIED_GOOGLE_CONSENT);
      window.fbq?.('consent', 'revoke');
    }
  };

  if (consent === 'accepted' || consent === 'rejected') {
    return (
      <>
        {showPreferences ? (
          <section role="dialog" aria-label="Preferencias de medición" className="fixed inset-x-0 bottom-0 z-[140] border-t border-white/10 bg-[#0d1018]/[0.98] p-4 text-white shadow-2xl backdrop-blur-xl sm:p-5">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-sm font-bold">Preferencias de medición</h2>
                <p className="mt-1 text-xs leading-relaxed text-neutral-300 sm:text-sm">Google Analytics y el Pixel de Meta ayudan a medir visitas e interacciones con campañas. Puedes aceptar o rechazar; la decisión se guarda en este navegador.</p>
              </div>
              <div className="flex shrink-0 gap-3">
                <button onClick={() => saveConsent('rejected')} className="min-h-11 rounded-lg border border-white/15 px-4 text-xs font-bold uppercase text-neutral-200 hover:bg-white/5 sm:text-sm">Rechazar</button>
                <button onClick={() => saveConsent('accepted')} className="min-h-11 rounded-lg bg-blue-600 px-4 text-xs font-bold uppercase text-white hover:bg-blue-500 sm:text-sm">Aceptar medición</button>
              </div>
            </div>
          </section>
        ) : (
          <button onClick={() => setShowPreferences(true)} className="fixed bottom-3 left-3 z-[120] rounded-full border border-white/15 bg-[#11141c]/95 px-3 py-2 text-xs font-semibold text-neutral-200 shadow-lg backdrop-blur hover:bg-[#202635]">Privacidad</button>
        )}
      </>
    );
  }

  return (
    <section role="dialog" aria-label="Preferencias de cookies y medición" className="fixed inset-x-0 bottom-0 z-[140] border-t border-white/10 bg-[#0d1018]/[0.98] p-4 text-white shadow-2xl backdrop-blur-xl sm:p-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-sm font-bold">Tu privacidad importa</h2>
          <p className="mt-1 text-xs leading-relaxed text-neutral-300 sm:text-sm">Usamos Google Analytics y el Pixel de Meta para medir visitas y resultados de campañas. Solo se activan si aceptas. Consulta el <a href="/politica-privacidad.html" className="text-blue-300 underline underline-offset-2">aviso de privacidad</a>. Puedes cambiar tu decisión desde el botón “Privacidad”.</p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button onClick={() => saveConsent('rejected')} className="min-h-11 rounded-lg border border-white/15 px-4 text-xs font-bold uppercase tracking-wide text-neutral-200 hover:bg-white/5 sm:text-sm">Rechazar</button>
          <button onClick={() => saveConsent('accepted')} className="min-h-11 rounded-lg bg-blue-600 px-4 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-500 sm:text-sm">Aceptar medición</button>
        </div>
      </div>
    </section>
  );
}
