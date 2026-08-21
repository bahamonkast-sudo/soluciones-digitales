import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Facebook, Twitter, Youtube, Instagram, X } from 'lucide-react';
import TarjetaDigitalPage from './digital-card/TarjetaDigitalPage';
import { getPageUrl, getFrontPageUrl } from '../utils/env';

export default function SiteFooter() {
  const [showDataPolicy, setShowDataPolicy] = useState(false);
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showBusinessCard, setShowBusinessCard] = useState(false);

  // Open legal modals triggered externally (e.g. cookie consent banner)
  useEffect(() => {
    const handleOpenModal = (e) => {
      if (e.detail === 'cookiePolicy') setShowCookiePolicy(true);
      if (e.detail === 'dataPolicy') setShowDataPolicy(true);
      if (e.detail === 'privacy') setShowPrivacy(true);
      if (e.detail === 'terms') setShowTerms(true);
    };
    window.addEventListener('websd:openLegalModal', handleOpenModal);
    return () => window.removeEventListener('websd:openLegalModal', handleOpenModal);
  }, []);

  const isDev = import.meta.env.DEV;
  const homePath = isDev ? '/index.html' : getFrontPageUrl();
  const qsPath = isDev ? '/quienes-somos.html' : getPageUrl('quienes-somos');
  const casosPath = isDev ? '/index.html#casos' : getFrontPageUrl() + '#casos';
  const contactoPath = isDev ? '/index.html#mensaje' : getFrontPageUrl() + '#mensaje';
  const servLink = (dev, prod) => (isDev ? dev : prod);

  // Lock body scroll when legal or business card modals are open
  useEffect(() => {
    if (showDataPolicy || showCookiePolicy || showPrivacy || showTerms || showBusinessCard) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [showDataPolicy, showCookiePolicy, showPrivacy, showTerms, showBusinessCard]);

  const columns = [
    {
      title: 'Servicios',
      links: [
        { label: 'Desarrollo Web', href: servLink('/sitios-web.html', getPageUrl('sitios-web')) },
        { label: 'IA Conversacional', href: servLink('/chatbot.html', getPageUrl('chatbot')) },
        { label: 'WhatsApp Automation', href: servLink('/guardian-difusion.html', getPageUrl('guardian-difusion')) },
        { label: 'Minería B2B', href: servLink('/extractor.html', getPageUrl('extractor')) },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Quiénes somos', href: qsPath },
        { label: 'Casos de éxito', href: casosPath },
        { label: 'Contacto', href: contactoPath },
        { label: 'Tarjeta Digital', modal: 'businessCard' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacidad', modal: 'privacy' },
        { label: 'Términos de uso', modal: 'terms' },
        { label: 'Política de datos', modal: 'dataPolicy' },
        { label: 'Cookies', modal: 'cookiePolicy' },
      ],
    },
  ];

  const openModal = (key) => {
    if (key === 'privacy') setShowPrivacy(true);
    if (key === 'terms') setShowTerms(true);
    if (key === 'dataPolicy') setShowDataPolicy(true);
    if (key === 'cookiePolicy') setShowCookiePolicy(true);
    if (key === 'businessCard') setShowBusinessCard(true);
  };

  return (
    <>
      <footer className="relative z-30 max-w-7xl mx-auto px-6 md:px-10">
        <div className="neomorph-relief rounded-3xl p-6 sm:p-8 md:p-12 mt-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-8 md:mb-10">

            {/* Brand */}
            <div className="md:col-span-5 flex flex-col gap-5">
              <div>
                <span className="text-lg font-black text-white tracking-wide">
                  Soluciones Digitales{' '}
                  <span className="text-transparent" style={{ WebkitTextFillColor: 'transparent', WebkitTextStroke: '1.5px #2962ff', filter: 'drop-shadow(0 0 6px rgba(41,98,255,0.8))' }}>IA</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed text-neutral-500 max-w-xs">
                Creamos y optimizamos infraestructuras de software a la medida, automatizaciones comerciales y sistemas de inteligencia artificial para impulsar la productividad de tu organización.
              </p>
              <div className="flex items-center gap-3 mt-2">
                {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-lg neomorph-inset flex items-center justify-center text-neutral-500 hover:text-[#2962ff] transition-colors duration-200">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-4">
                  <h4 className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">{col.title}</h4>
                  <ul className="flex flex-col gap-2.5">
                    {col.links.map((link, i) => (
                      <li key={link.label}>
                        {link.modal ? (
                          <button onClick={() => openModal(link.modal)} className="text-[11px] text-neutral-500 hover:text-white transition-colors duration-200">{link.label}</button>
                        ) : (
                          <a href={link.href} className="text-[11px] text-neutral-500 hover:text-white transition-colors duration-200">{link.label}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-neutral-600 tracking-wider">© 2025 Soluciones Digitales IA. Todos los derechos reservados.</p>
            <p className="text-[10px] text-neutral-600 tracking-wider">Bogotá, Colombia &nbsp;·&nbsp; <a href="https://wa.me/573115893220" className="hover:text-neutral-400 transition-colors">+57 311 589 3220</a></p>
          </div>
        </div>
      </footer>

      {/* ── DATA POLICY MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {showDataPolicy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-start justify-center p-4 pt-16 sm:pt-20 overflow-y-auto"
            style={{ background: 'rgba(0,0,0,0.85)' }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="neomorph-relief rounded-2xl w-full max-w-3xl p-6 sm:p-8 md:p-10 relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowDataPolicy(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg neomorph-inset flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>

              <h2 className="text-xl sm:text-2xl font-display text-white mb-6 tracking-wide">Política de Tratamiento de Datos Personales</h2>
              <p className="text-[10px] text-neutral-500 mb-6 tracking-wider">Última actualización: Junio 2026</p>

              <div className="space-y-5 text-[11px] sm:text-xs leading-relaxed text-neutral-300">
                <p><strong className="text-white">SOLUCIONES DIGITALES IA</strong> (en adelante, "la Empresa"), identificada con NIT en trámite, domiciliada en Bogotá, Colombia, actúa como responsable del tratamiento de los datos personales que usted suministre, conforme a la <strong className="text-white">Ley 1581 de 2012</strong>, el <strong className="text-white">Decreto Reglamentario 1377 de 2013</strong> y las disposiciones de la Superintendencia de Industria y Comercio (SIC).</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">1. Datos que Recopilamos</h3>
                <p>Recopilamos información personal que usted nos proporciona voluntariamente a través de nuestros formularios de contacto, chatbot, WhatsApp y redes sociales, incluyendo: nombre, correo electrónico, número de teléfono, empresa y cargo. También recopilamos datos de navegación como dirección IP, tipo de navegador, páginas visitadas y duración de la sesión mediante cookies y tecnologías análogas.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">2. Finalidades del Tratamiento</h3>
                <p>Sus datos serán tratados para las siguientes finalidades: (a) atender solicitudes de información, cotizaciones y soporte; (b) enviar comunicaciones comerciales sobre nuestros servicios, promociones y eventos; (c) realizar análisis de mercado, perfiles comerciales y prospección B2B con fuentes de acceso público; (d) mejorar nuestros productos y experiencia de usuario; (e) cumplir obligaciones legales y contractuales.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">3. Derechos del Titular</h3>
                <p>De conformidad con la Ley 1581 de 2012, usted tiene los siguientes derechos: (a) conocer, actualizar y rectificar sus datos personales; (b) solicitar prueba de la autorización otorgada; (c) ser informado del uso que se ha dado a sus datos; (d) presentar quejas ante la SIC por infracciones a la ley; (e) revocar la autorización y/o solicitar la supresión de sus datos cuando no exista deber legal de conservarlos; (f) acceder en forma gratuita a sus datos personales.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">4. Ejercicio de Derechos</h3>
                <p>Para ejercer sus derechos, puede contactarnos a través de los siguientes canales: correo electrónico <strong className="text-white">datos@solucionesdigitalesia.co</strong>, WhatsApp <strong className="text-white">+57 311 589 3220</strong> o mediante el formulario de contacto en nuestro sitio web. La solicitud será atendida en un plazo máximo de 15 días hábiles conforme a la normativa vigente.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">5. Transferencia y Transferencia Internacional</h3>
                <p>Sus datos personales podrán ser almacenados y procesados en servidores ubicados en Colombia y en países que ofrezcan niveles adecuados de protección de datos. Al aceptar esta política, usted autoriza la transferencia internacional de sus datos cuando sea necesario para la prestación de nuestros servicios.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">6. Conservación de Datos</h3>
                <p>Conservaremos sus datos personales durante el tiempo necesario para cumplir con las finalidades descritas en esta política, o durante el plazo exigido por las disposiciones legales aplicables. Una vez cumplidas dichas finalidades, sus datos serán eliminados de nuestras bases de datos activas.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">7. Seguridad de la Información</h3>
                <p>La Empresa adopta las medidas técnicas, administrativas y jurídicas necesarias para proteger la seguridad de sus datos personales contra acceso no autorizado, pérdida, alteración o divulgación indebida, de conformidad con la Política de Seguridad de la Información y el principio de confidencialidad establecido en la Ley 1581 de 2012.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">8. Modificaciones</h3>
                <p>Nos reservamos el derecho de modificar la presente política en cualquier momento. Los cambios serán publicados en este sitio web con la fecha de actualización correspondiente. Le recomendamos revisar periódicamente esta política para estar informado sobre cómo protegemos su información.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── COOKIE POLICY MODAL ──────────────────────────────────────── */}
      <AnimatePresence>
        {showCookiePolicy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-start justify-center p-4 pt-16 sm:pt-20 overflow-y-auto"
            style={{ background: 'rgba(0,0,0,0.85)' }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="neomorph-relief rounded-2xl w-full max-w-3xl p-6 sm:p-8 md:p-10 relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowCookiePolicy(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg neomorph-inset flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>

              <h2 className="text-xl sm:text-2xl font-display text-white mb-6 tracking-wide">Política de Cookies</h2>
              <p className="text-[10px] text-neutral-500 mb-6 tracking-wider">Última actualización: Junio 2026</p>

              <div className="space-y-5 text-[11px] sm:text-xs leading-relaxed text-neutral-300">
                <p>En <strong className="text-white">SOLUCIONES DIGITALES IA</strong> utilizamos cookies y tecnologías de seguimiento para garantizar el correcto funcionamiento del sitio web, analizar el tráfico, mejorar la experiencia del usuario y personalizar contenidos. Esta política explica qué son las cookies, cómo las usamos y cómo puede gestionar sus preferencias.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">1. ¿Qué son las Cookies?</h3>
                <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (computador, tableta, teléfono móvil) cuando visita un sitio web. Permiten que el sitio recuerde sus acciones y preferencias durante un período de tiempo, para que no tenga que volver a configurarlas cada vez que nos visite.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">2. Tipos de Cookies que Utilizamos</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-white">Cookies Esenciales:</strong> necesarias para el funcionamiento básico del sitio. Permiten la navegación y el acceso a áreas seguras. Sin estas cookies, el sitio no puede funcionar correctamente.</li>
                  <li><strong className="text-white">Cookies de Rendimiento:</strong> recopilan información anónima sobre cómo los visitantes usan el sitio (páginas más visitadas, tiempo de permanencia, errores). Nos ayudan a mejorar el funcionamiento del sitio.</li>
                  <li><strong className="text-white">Cookies de Funcionalidad:</strong> permiten recordar sus preferencias (idioma, región, inicio de sesión) para ofrecerle una experiencia personalizada.</li>
                  <li><strong className="text-white">Cookies de Publicidad y Segmentación:</strong> rastrean sus hábitos de navegación para mostrarle contenido relevante y medir la efectividad de nuestras campañas publicitarias.</li>
                  <li><strong className="text-white">Cookies de Redes Sociales:</strong> permiten compartir contenido en plataformas como Facebook, Instagram y LinkedIn, y rastrear la interacción con nuestros perfiles sociales.</li>
                </ul>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">3. Cookies de Terceros</h3>
                <p>En algunas páginas podemos incorporar servicios de terceros (Google Analytics, Facebook Pixel, YouTube, Vimeo, WhatsApp Business API) que pueden establecer sus propias cookies. No tenemos control sobre estas cookies. Le recomendamos revisar las políticas de privacidad de estos terceros para obtener información detallada.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">4. Gestión de Preferencias</h3>
                <p>Al ingresar al sitio por primera vez, se le presenta un banner de consentimiento donde puede aceptar, rechazar o configurar sus preferencias de cookies. Puede cambiar sus preferencias en cualquier momento desde la configuración de su navegador. A continuación, le indicamos cómo hacerlo en los navegadores más comunes:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong className="text-white">Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
                  <li><strong className="text-white">Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
                  <li><strong className="text-white">Microsoft Edge:</strong> Configuración → Cookies y permisos de sitio → Cookies</li>
                  <li><strong className="text-white">Safari:</strong> Preferencias → Privacidad → Cookies</li>
                </ul>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">5. Base Legal</h3>
                <p>El uso de cookies se fundamenta en el consentimiento del usuario (Artículo 6.1.a del Reglamento General de Protección de Datos - GDPR) y en la Ley 1581 de 2012 de Colombia. El consentimiento se obtiene mediante el banner de cookies y puede ser retirado en cualquier momento.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">6. Actualizaciones</h3>
                <p>Podemos actualizar esta política de cookies en cualquier momento. Le notificaremos cualquier cambio publicando la nueva política en esta página. Le recomendamos revisar periódicamente esta política para mantenerse informado.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PRIVACY POLICY MODAL ─────────────────────────────────────── */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-start justify-center p-4 pt-16 sm:pt-20 overflow-y-auto"
            style={{ background: 'rgba(0,0,0,0.85)' }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="neomorph-relief rounded-2xl w-full max-w-3xl p-6 sm:p-8 md:p-10 relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowPrivacy(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg neomorph-inset flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>

              <h2 className="text-xl sm:text-2xl font-display text-white mb-6 tracking-wide">Política de Privacidad</h2>
              <p className="text-[10px] text-neutral-500 mb-6 tracking-wider">Última actualización: Junio 2026</p>

              <div className="space-y-5 text-[11px] sm:text-xs leading-relaxed text-neutral-300">
                <p>En <strong className="text-white">SOLUCIONES DIGITALES IA</strong> (en adelante, "la Empresa") nos comprometemos a proteger la privacidad y los datos personales de todos nuestros usuarios y visitantes. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos la información personal que nos confía al interactuar con nuestro sitio web y nuestros servicios, en cumplimiento de la <strong className="text-white">Ley 1581 de 2012</strong> de Colombia, el <strong className="text-white">Decreto 1377 de 2013</strong> y las normas aplicables en materia de protección de datos personales.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">1. Alcance</h3>
                <p>Esta política aplica a toda la información personal que la Empresa recopile a través de sus canales digitales: sitio web, formularios de contacto, chatbot, WhatsApp, redes sociales, correo electrónico y cualquier otro medio oficial de comunicación.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">2. Información que Recopilamos</h3>
                <p>Recopilamos información que usted nos proporciona de forma voluntaria, como nombre, correo electrónico, número de teléfono, empresa, cargo y mensajes de contacto. También recopilamos información de navegación de manera automática (dirección IP, tipo de dispositivo, navegador, páginas visitadas y duración de la sesión), la cual es tratada de forma agregada y con fines estadísticos.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">3. Uso de la Información</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Atender sus solicitudes de información, cotizaciones y soporte técnico.</li>
                  <li>Enviar comunicaciones comerciales y de interés sobre nuestros servicios, siempre con su autorización previa.</li>
                  <li>Mejorar la experiencia de usuario y la calidad de nuestros productos.</li>
                  <li>Realizar análisis de mercado y prospección comercial con fuentes de acceso público.</li>
                  <li>Cumplir con obligaciones legales y contractuales.</li>
                </ul>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">4. Bases de Legitimación</h3>
                <p>Tratamos sus datos personales con fundamento en: (a) su consentimiento libre, previo, expreso e informado; (b) la ejecución de un contrato o solicitud precontractual; (c) el cumplimiento de obligaciones legales; y (d) nuestro interés legítimo en mejorar nuestros servicios, siempre que no prevalezcan sus derechos y libertades fundamentales.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">5. Menores de Edad</h3>
                <p>Nuestros servicios no están dirigidos a menores de 14 años. No recopilamos deliberadamente información personal de menores. Si detectamos que un menor nos ha suministrado sus datos, procederemos a su eliminación inmediata. Los menores de 14 años requieren autorización de sus padres o representantes legales para el tratamiento de sus datos.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">6. Enlaces a Terceros</h3>
                <p>Nuestro sitio web puede contener enlaces a sitios de terceros (redes sociales, herramientas de análisis, plataformas de pago). No somos responsables de las prácticas de privacidad de dichos sitios. Le recomendamos revisar las políticas de privacidad de cada sitio que visite.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">7. Derechos del Titular</h3>
                <p>De acuerdo con la normativa vigente, usted tiene derecho a conocer, actualizar y rectificar sus datos; solicitar prueba de la autorización otorgada; ser informado de cualquier uso de sus datos; revocar la autorización y solicitar su supresión; y acceder gratuitamente a la información que nos ha suministrado.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">8. Contacto y Ejercicio de Derechos</h3>
                <p>Para ejercer sus derechos o resolver cualquier inquietud sobre esta política, puede escribirnos a <strong className="text-white">datos@solucionesdigitalesia.co</strong>, llamarnos al <strong className="text-white">+57 311 589 3220</strong> o usar nuestro formulario de contacto. Atenderemos su solicitud en un plazo máximo de 15 días hábiles.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">9. Modificaciones</h3>
                <p>Nos reservamos el derecho de actualizar esta Política de Privacidad. Los cambios serán publicados en esta página con la fecha de actualización correspondiente. El uso continuado del sitio después de la publicación de cambios constituye la aceptación de los mismos.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TERMS OF USE MODAL ───────────────────────────────────────── */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-start justify-center p-4 pt-16 sm:pt-20 overflow-y-auto"
            style={{ background: 'rgba(0,0,0,0.85)' }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="neomorph-relief rounded-2xl w-full max-w-3xl p-6 sm:p-8 md:p-10 relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowTerms(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg neomorph-inset flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>

              <h2 className="text-xl sm:text-2xl font-display text-white mb-6 tracking-wide">Términos de Uso</h2>
              <p className="text-[10px] text-neutral-500 mb-6 tracking-wider">Última actualización: Junio 2026</p>

              <div className="space-y-5 text-[11px] sm:text-xs leading-relaxed text-neutral-300">
                <p>Los presentes <strong className="text-white">Términos de Uso</strong> regulan el acceso y la utilización del sitio web de <strong className="text-white">SOLUCIONES DIGITALES IA</strong> (en adelante, "la Empresa") y de todos los contenidos, servicios y funcionalidades ofrecidos a través del mismo. Al acceder, navegar o utilizar este sitio web, usted acepta cumplir y quedar vinculado por estos términos. Si no está de acuerdo con ellos, le solicitamos abstenerse de utilizar el sitio.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">1. Aceptación de los Términos</h3>
                <p>El uso del sitio web implica la aceptación plena de estos Términos de Uso y de cualquier otra política que se encuentre vigente. La Empresa podrá modificar estos términos en cualquier momento; los cambios entrarán en vigor a partir de su publicación en esta página.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">2. Uso Adecuado del Sitio</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Utilizar el sitio y sus contenidos de forma lícita, responsable y de conformidad con la legislación colombiana.</li>
                  <li>Abstenerse de reproducir, distribuir, modificar o explotar comercialmente los contenidos sin autorización previa de la Empresa.</li>
                  <li>No intentar acceder a áreas restringidas del sitio, vulnerar la seguridad de los sistemas ni interferir con el funcionamiento normal del mismo.</li>
                  <li>No utilizar mecanismos automatizados (bots, scrapers) sin autorización expresa.</li>
                  <li>No suplantar la identidad de otras personas ni proporcionar información falsa en los formularios.</li>
                </ul>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">3. Propiedad Intelectual</h3>
                <p>Todos los contenidos del sitio (textos, imágenes, logotipos, gráficos, animaciones, código fuente, marcas y demás elementos) son propiedad de la Empresa o de sus licenciantes y están protegidos por las normas de propiedad intelectual colombianas e internacionales. Queda prohibida su reproducción total o parcial sin autorización previa y escrita.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">4. Propuestas, Cotizaciones y Contratos</h3>
                <p>La información publicada en el sitio tiene carácter informativo y no constituye una oferta comercial vinculante. Las propuestas, cotizaciones y condiciones de contratación serán definidas de forma particular en cada caso y quedarán sujetas a las condiciones pactadas por escrito entre la Empresa y el cliente.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">5. Enlaces y Contenidos de Terceros</h3>
                <p>El sitio puede contener enlaces a páginas web externas. La Empresa no controla dichos contenidos y no se hace responsable de la disponibilidad, exactitud o legalidad de los mismos. La inclusión de enlaces no implica respaldo ni asociación con los sitios enlazados.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">6. Limitación de Responsabilidad</h3>
                <p>La Empresa no será responsable por daños directos o indirectos derivados del uso o la imposibilidad de uso del sitio, incluyendo errores en la información, interrupciones del servicio, fallas técnicas o pérdida de datos. La información publicada se ofrece con la máxima diligencia, pero no se garantiza su exactitud o actualización permanente.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">7. Protección de Datos</h3>
                <p>El tratamiento de sus datos personales se rige por nuestra Política de Privacidad y por la Política de Tratamiento de Datos Personales, disponibles en esta misma página y accesibles desde el pie de página del sitio.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">8. Legislación Aplicable y Jurisdicción</h3>
                <p>Estos Términos de Uso se rigen por las leyes de la República de Colombia. Cualquier controversia será sometida a la jurisdicción ordinaria de la ciudad de Bogotá D.C., Colombia.</p>

                <h3 className="text-white font-semibold text-xs sm:text-sm mt-5">9. Contacto</h3>
                <p>Para cualquier consulta sobre estos Términos de Uso, puede contactarnos a través de <strong className="text-white">datos@solucionesdigitalesia.co</strong> o al <strong className="text-white">+57 311 589 3220</strong>.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BUSINESS CARD MODAL ──────────────────────────────────────── */}
      <AnimatePresence>
        {showBusinessCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black overflow-y-auto"
            data-lenis-prevent="true"
          >
            <TarjetaDigitalPage onClose={() => setShowBusinessCard(false)} isModal={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}