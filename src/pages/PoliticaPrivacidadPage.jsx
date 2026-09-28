import React from 'react';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import { SEO_CONFIG } from '../config/seoConfig';
import SiteFooter from '../components/SiteFooter';

const sections = [
  {
    title: '1. Responsable y canales de atención',
    body: 'El responsable informado para esta autoevaluación es Soluciones Digitales IA Studio. Puedes escribir a privacidad@solucionesdigitalesia.com o al WhatsApp +57 311 589 3220 para consultas y solicitudes relacionadas con tus datos personales.',
  },
  {
    title: '2. Qué información usamos',
    body: 'En la autoevaluación podemos tratar tu nombre, WhatsApp, correo electrónico (opcional), nombre de la empresa y las respuestas sobre el negocio, su presencia digital y sus retos. La clave de Groq la ingresas directamente en el formulario para autenticar la solicitud; este sitio no la escribe en su almacenamiento local.',
  },
  {
    title: '3. Para qué la usamos',
    body: 'Usamos las respuestas para generar y mostrar el análisis inicial. El nombre y WhatsApp permiten identificar la solicitud y atenderte si pides el informe ampliado. El correo es opcional. Este aviso no autoriza el envío de publicidad; cualquier finalidad adicional requiere información y autorización separadas.',
  },
  {
    title: '4. Cómo se procesa el análisis',
    body: 'Las respuestas de tu negocio y el nombre de empresa, si lo escribes, se envían desde tu navegador a la API de Groq para generar el análisis. El nombre, WhatsApp y correo no se incluyen en el mensaje enviado a Groq. Groq recibe la solicitud autenticada con la clave que ingresaste y aplica sus propios términos y políticas.',
  },
  {
    title: '5. Almacenamiento en tu navegador',
    body: 'El reporte y los datos de contacto se guardan en el almacenamiento local (localStorage) del navegador que utilizaste. En el flujo actual no se envían desde esta página a una base de datos central de IA Studio. Permanecen en ese navegador hasta que borres los datos del sitio; no hay una eliminación automática configurada.',
  },
  {
    title: '6. Solicitud del informe ampliado por WhatsApp',
    body: 'Si eliges pedir el informe ampliado, se abrirá WhatsApp con un mensaje preparado que puede incluir tu nombre, correo, teléfono, empresa, sector y un código de solicitud. Tú decides si lo envías. Si lo haces, WhatsApp y el equipo de IA Studio recibirán la información incluida en ese mensaje para atender la solicitud.',
  },
  {
    title: '7. Tus derechos y cómo ejercerlos',
    body: 'Como titular puedes solicitar conocer, actualizar o rectificar tus datos; pedir prueba de la autorización e información sobre su uso; y, cuando proceda, revocar la autorización o solicitar la supresión. También puedes presentar una queja ante la Superintendencia de Industria y Comercio. Para ejercer tus derechos, escribe a privacidad@solucionesdigitalesia.com o al WhatsApp +57 311 589 3220 e indica que tu solicitud se refiere a la autoevaluación estratégica.',
  },
  {
    title: '8. Medición del sitio y campañas',
    body: 'Con tu aceptación, cargamos Google Analytics 4 para medir el uso del sitio y el Pixel de Meta para medir visitas e interacciones con campañas. Google y Meta pueden tratar identificadores del navegador, información del dispositivo y páginas visitadas conforme a sus políticas. La preferencia se guarda en el navegador y puedes cambiarla o retirarla desde el botón “Privacidad” del sitio. Si rechazas, estas etiquetas no se cargan.',
  },
];

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <SEO {...SEO_CONFIG.privacidad} />
      <Navbar activePage="home" />
      <main className="mx-auto max-w-4xl px-5 pb-20 pt-28 sm:px-8">
        <a href="/index.html" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-white">
          <ArrowLeft size={16} /> Volver al inicio
        </a>
        <header className="mb-10 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-[#111827] to-[#0B0B0F] p-7 sm:p-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-300/10 text-blue-200">
            <ShieldCheck size={24} />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Soluciones Digitales IA Studio</p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">Aviso de privacidad</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
            Información sobre el tratamiento de datos en la autoevaluación y la medición del sitio. Actualizado: 27 de septiembre de 2026.
          </p>
        </header>

        <div className="space-y-5">
          {sections.map(({ title, body }) => (
            <section key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <h2 className="text-lg font-bold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-300">{body}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-neutral-900/70 p-6 text-xs leading-relaxed text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <span>Este aviso describe el flujo actual de la autoevaluación. Puedes revisar la norma colombiana de protección de datos personales.</span>
          <a href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-blue-300 hover:text-white">
            Ley 1581 de 2012 <ExternalLink size={13} />
          </a>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-neutral-500">
          Para información sobre el tratamiento de datos que realiza Groq, consulta su documentación de privacidad de datos de API.
          {' '}<a href="https://console.groq.com/docs/your-data" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline underline-offset-2">Ver información de Groq</a>.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
