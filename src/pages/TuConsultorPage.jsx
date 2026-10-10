import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SEO from '../components/SEO';

const CONSULTOR_URL = import.meta.env.DEV
  ? 'http://localhost:3000/'
  : (import.meta.env.VITE_TUCONSULTOR_URL || 'https://tuconsultor.soluciones-digitales.ai.studio/');

export default function TuConsultorPage() {
  const frameRef = useRef(null);
  const [height, setHeight] = useState(900);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    const onMessage = (event) => {
      if (event.source !== frame.contentWindow) return;
      try {
        if (event.origin !== new URL(frame.src).origin) return;
      } catch {
        return;
      }
      if (event.data?.type !== 'tuconsultor:resize') return;
      const nextHeight = Number(event.data.height);
      if (Number.isFinite(nextHeight)) setHeight(Math.min(50000, Math.max(720, nextHeight)));
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      <SEO
        title="TuConsultor | Consultoría de marketing para tu negocio"
        description="Recibe orientación clara sobre marketing, contenido, ventas y los próximos pasos que puede tomar tu negocio."
        path="/tuconsultor.html"
      />
      <Navbar activePage="tuconsultor" />
      <main className="mx-auto w-full max-w-[1600px] px-0 pt-16 sm:pt-20">
        <iframe
          ref={frameRef}
          src={CONSULTOR_URL}
          title="TuConsultor: asesoría de marketing, diagnóstico y plan de crecimiento"
          className="block w-full border-0 bg-[#f7f8f5]"
          style={{ height }}
          loading="eager"
          allow="clipboard-read; clipboard-write"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
