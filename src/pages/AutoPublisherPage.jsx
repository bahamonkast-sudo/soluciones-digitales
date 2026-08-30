import { useState } from 'react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';

const WA_NUMBER = '573115893220';
const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export default function AutoPublisherPage() {
  const [liked, setLiked] = useState(true);
  const [reactions, setReactions] = useState(1240);
  const [spintaxText, setSpintaxText] = useState('"¡Hola vecino! Descubre cómo optimizar tus publicaciones."');

  const saludos = ["¡Hola amigo!", "¡Buenas tardes vecino!", "¡Qué tal colega!", "¡Hola a todos!"];
  const beneficios = [
    "Ahorra hasta 25 horas semanales con AutoPublisher.",
    "Llega a más de 30.000 clientes potenciales al día sin bloqueos.",
    "Organiza tus campañas en grupos con carpetas y textos con Spintax.",
    "Publica fotos o vídeos en segundo plano mientras haces otras tareas."
  ];

  const generarSpintax = () => {
    const s = saludos[Math.floor(Math.random() * saludos.length)];
    const b = beneficios[Math.floor(Math.random() * beneficios.length)];
    setSpintaxText(`"${s} ${b}"`);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#050505] font-sans antialiased overflow-x-hidden">
      <Navbar activePage="productos" />

      {/* Espaciado para navbar fijo */}
      <div className="pt-[56px]" />

      {/* ========================================== */}
      {/* 1. TOP NAVBAR Estilo Facebook (simulado)    */}
      {/* ========================================== */}
      <header className="sticky top-[56px] z-30 bg-white border-b border-[#CED0D4] px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white text-2xl font-black cursor-pointer shadow-sm">f</div>
          <div className="hidden sm:flex items-center bg-[#F0F2F5] rounded-full px-3.5 py-2 w-72 text-sm text-[#65676B]">
            <i className="fa-solid fa-magnifying-glass mr-2.5 text-xs"></i>
            <span>Buscar &quot;AutoPublisher Pro&quot;...</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <a href={waLink('Hola, deseo adquirir la Licencia de AutoPublisher Pro')} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-md transition shadow-sm">
            <i className="fa-brands fa-whatsapp text-base text-white"></i>
            <span className="hidden sm:inline">Comprar Licencia Privada</span>
            <span className="sm:hidden">Comprar</span>
          </a>
          <div className="w-9 h-9 bg-[#E4E6E9] hover:bg-gray-300 rounded-full flex items-center justify-center cursor-pointer transition" title="Notificaciones">
            <i className="fa-solid fa-bell text-[#050505] text-sm"></i>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* 2. BANNER DE PORTADA + PERFIL DE FANPAGE   */}
      {/* ========================================== */}
      <div className="bg-white border-b border-[#CED0D4] shadow-sm">
        <div className="max-w-6xl mx-auto">
          {/* Portada */}
          <div className="relative h-44 sm:h-64 md:h-80 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-b-lg overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[radial-gradient(#1877f2_1px,transparent_1px)] opacity-20" style={{ backgroundSize: '16px 16px' }}></div>
            <div className="relative text-center text-white z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[11px] font-bold px-3 py-1 rounded-full mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                Extensión Privada v2.0 Lista para Instalar
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">AutoPublisher Pro</h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Automatización inteligente de publicaciones en grupos con simulación humana y cero bloqueos.</p>
            </div>
          </div>

          {/* Info del Perfil & Acciones */}
          <div className="px-4 sm:px-8 pb-3">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-16 md:-mt-10 gap-4">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
                <div className="relative">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-4xl font-black">
                    AP
                  </div>
                  <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full shadow" title="Sistema activo 24/7"></div>
                </div>
                <div className="mb-2">
                  <div className="flex items-center justify-center md:justify-start gap-1.5">
                    <h2 className="text-2xl sm:text-3xl font-bold">AutoPublisher Pro</h2>
                    <i className="fa-solid fa-circle-check text-[#1877F2] text-xl" title="Software Verificado"></i>
                  </div>
                  <p className="text-[#65676B] text-xs sm:text-sm font-medium">
                    Software de Publicación Automática • <span className="text-emerald-600 font-semibold">100% Sin cuotas mensuales</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2 w-full md:w-auto justify-center">
                <a href={waLink('Hola, deseo adquirir la Licencia de AutoPublisher Pro')} target="_blank" rel="noopener noreferrer"
                   className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-sm px-5 py-2.5 rounded-md transition shadow-sm">
                  <i className="fa-brands fa-whatsapp text-lg"></i>
                  Enviar mensaje
                </a>
                <button onClick={() => setLiked(!liked)} className="flex items-center gap-1.5 bg-[#E4E6E9] hover:bg-gray-300 text-[#050505] font-semibold text-sm px-4 py-2.5 rounded-md transition">
                  <i className={liked ? 'fa-solid fa-thumbs-up text-blue-600' : 'fa-regular fa-thumbs-up text-gray-700'}></i>
                  <span>{liked ? 'Te gusta' : 'Me gusta'}</span>
                </button>
                <button className="bg-[#E4E6E9] hover:bg-gray-300 text-[#050505] px-3.5 py-2.5 rounded-md transition" title="Más opciones">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </div>
            </div>

            <hr className="my-3 border-[#CED0D4]" />

            <nav className="flex items-center gap-1 overflow-x-auto text-sm font-semibold text-[#65676B]">
              <a href="#feed" className="text-[#1877F2] border-b-4 border-[#1877F2] px-4 py-2.5 whitespace-nowrap">Publicaciones</a>
              <a href="#beneficios" className="hover:bg-[#F0F2F5] px-4 py-2.5 rounded-md transition whitespace-nowrap">6 Beneficios</a>
              <a href="#especificaciones" className="hover:bg-[#F0F2F5] px-4 py-2.5 rounded-md transition whitespace-nowrap">Especificaciones</a>
              <a href="#fotos" className="hover:bg-[#F0F2F5] px-4 py-2.5 rounded-md transition whitespace-nowrap">Capturas</a>
              <a href="#oferta" className="hover:bg-[#F0F2F5] px-4 py-2.5 rounded-md transition whitespace-nowrap">Bonus Pack</a>
            </nav>
          </div>
        </div>
      </div>

      {/* Historias / Destacados */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {[
            { label: 'Demo en vivo', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&auto=format&fit=crop', fallback: 'Demo' },
            { label: 'Spintax', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&auto=format&fit=crop', fallback: 'Spintax' },
            { label: '0 Bloqueos', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&auto=format&fit=crop', fallback: 'Seguridad' },
            { label: 'Métricas', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop', fallback: 'Resultados' },
            { label: 'Casos reales', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop', fallback: 'Casos' },
          ].map(s => (
            <div key={s.label} className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 group-hover:scale-105 transition">
                <img src={s.img} className="w-full h-full rounded-full object-cover border-2 border-white" alt={s.label}
                  onError={(e)=>{ e.currentTarget.src=`https://placehold.co/200x200/1877f2/ffffff?text=${s.fallback}`; }} />
              </div>
              <span className="text-[11px] font-semibold text-[#050505] text-center w-16 truncate">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================== */}
      {/* 3. CONTENEDOR PRINCIPAL (DOS COLUMNAS)     */}
      {/* ========================================== */}
      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUMNA IZQUIERDA */}
        <aside className="lg:col-span-5 space-y-4">
          {/* Rendimiento 7 días */}
          <div id="especificaciones" className="bg-white rounded-lg p-4 border border-[#CED0D4] shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-chart-line text-[#1877F2]"></i>
                <h3 className="font-bold text-sm text-[#050505]">Rendimiento de los últimos 7 días</h3>
              </div>
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">En vivo</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="p-2.5 bg-[#F0F2F5] rounded-lg">
                <span className="block text-xl font-extrabold text-[#1877F2]">100%</span>
                <span className="text-[11px] text-[#65676B] font-medium leading-tight">Grupos alcanzados</span>
              </div>
              <div className="p-2.5 bg-[#F0F2F5] rounded-lg">
                <span className="block text-xl font-extrabold text-green-600">15-25h</span>
                <span className="text-[11px] text-[#65676B] font-medium leading-tight">Ahorradas / semana</span>
              </div>
              <div className="p-2.5 bg-[#F0F2F5] rounded-lg">
                <span className="block text-xl font-extrabold text-[#050505]">30K-50K</span>
                <span className="text-[11px] text-[#65676B] font-medium leading-tight">Personas / día</span>
              </div>
              <div className="p-2.5 bg-[#F0F2F5] rounded-lg">
                <span className="block text-xl font-extrabold text-emerald-600">0</span>
                <span className="text-[11px] text-[#65676B] font-medium leading-tight">Bloqueos (Modo Humano)</span>
              </div>
            </div>
          </div>

          {/* Ficha Técnica */}
          <div className="bg-white rounded-lg p-4 border border-[#CED0D4] shadow-sm">
            <h3 className="font-bold text-sm text-[#050505] mb-3 flex items-center gap-2">
              <i className="fa-solid fa-microchip text-[#1877F2]"></i>
              Especificaciones del Sistema
            </h3>
            <ul className="space-y-2.5 text-xs text-[#050505]">
              <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-green-600 mt-0.5"></i><span><strong>Multiproducto simultáneo:</strong> Rota de 3 a 6 variantes sin mezclar contenidos.</span></li>
              <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-green-600 mt-0.5"></i><span><strong>Spintax Anti-Detección:</strong> Genera copys únicos por cada envío grupal.</span></li>
              <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-green-600 mt-0.5"></i><span><strong>Human Typing:</strong> Escritura tecla por tecla y movimientos aleatorios de ratón.</span></li>
              <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-green-600 mt-0.5"></i><span><strong>Escaneo inteligente de grupos:</strong> Rastrea y filtra automáticamente por tu feed.</span></li>
              <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-green-600 mt-0.5"></i><span><strong>Freno Auto Anti-Ban:</strong> Pausas de 15-25 min cada 7 grupos con parada de riesgo.</span></li>
              <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-green-600 mt-0.5"></i><span><strong>Detección de estados:</strong> Salta grupos con aprobación previa, bloqueos o captcha.</span></li>
              <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-green-600 mt-0.5"></i><span><strong>Background persistente:</strong> La extensión continúa trabajando si cambias de pestaña.</span></li>
              <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-green-600 mt-0.5"></i><span><strong>Gestión por carpetas:</strong> Segmentación por nichos/ciudades + Copias de seguridad.</span></li>
            </ul>
          </div>

          {/* Simulador Spintax */}
          <div className="bg-white rounded-lg p-4 border border-[#CED0D4] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-sm text-[#050505] flex items-center gap-2">
                <i className="fa-solid fa-shuffle text-indigo-600"></i>
                Simulador de Spintax en Vivo
              </h3>
              <span className="text-[10px] bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded">Interactivo</span>
            </div>
            <p className="text-xs text-[#65676B] mb-2">Presiona el botón para generar variaciones de texto en tiempo real:</p>
            <div className="p-3 bg-gray-50 border border-dashed border-gray-300 rounded text-xs font-mono text-gray-800 min-h-[48px] flex items-center justify-center text-center">
              {spintaxText}
            </div>
            <button onClick={generarSpintax} className="mt-2.5 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded transition flex items-center justify-center gap-1.5">
              <i className="fa-solid fa-rotate"></i>
              Generar nuevo texto Spintax
            </button>
          </div>

          {/* Galería */}
          <div id="fotos" className="bg-white rounded-lg p-4 border border-[#CED0D4] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-sm text-[#050505]">Fotos & Capturas del Software</h3>
                <p className="text-[11px] text-[#65676B]">Vistas reales de la extensión instalada</p>
              </div>
              <span className="text-xs text-[#1877F2] font-semibold cursor-pointer hover:underline">Ver todas</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 rounded-lg overflow-hidden">
              {[
                { alt: 'Panel de Control', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&auto=format&fit=crop', label: 'Panel' },
                { alt: 'Editor Spintax', src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&auto=format&fit=crop', label: 'Spintax' },
                { alt: 'Gestor de Grupos', src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=300&auto=format&fit=crop', label: 'Grupos' },
                { alt: 'Reportes en Vivo', src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop', label: 'Reportes' },
                { alt: 'Seguridad Anti-Ban', src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&auto=format&fit=crop', label: 'AntiBan' },
                { alt: 'Carpetas Organizadas', src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&auto=format&fit=crop', label: 'Carpetas', extra: '+12 fotos' },
              ].map((item) => (
                <div key={item.label} className="relative group cursor-pointer aspect-square bg-slate-900 overflow-hidden">
                  <img src={item.src} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" alt={item.alt}
                    onError={(e)=>{ e.currentTarget.src=`https://placehold.co/300x300/1877f2/ffffff?text=${item.label}`; }} />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition"></div>
                  {item.extra && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xs">{item.extra}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* COLUMNA DERECHA: FEED */}
        <section id="feed" className="lg:col-span-7 space-y-4">
          {/* POST FIJADO: 6 Beneficios */}
          <article id="beneficios" className="bg-white rounded-lg border border-[#CED0D4] shadow-sm">
            <div className="p-4 flex items-center justify-between pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold text-lg">AP</div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm text-[#050505]">AutoPublisher Pro</span>
                    <i className="fa-solid fa-circle-check text-[#1877F2] text-xs"></i>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#65676B]">
                    <span className="font-semibold text-[#1877F2]"><i className="fa-solid fa-thumbtack mr-1"></i>Publicación fijada</span>
                    <span>•</span>
                    <span>Hace 1 h</span>
                    <span>•</span>
                    <i className="fa-solid fa-earth-americas"></i>
                  </div>
                </div>
              </div>
              <i className="fa-solid fa-ellipsis text-[#65676B] cursor-pointer"></i>
            </div>

            <div className="px-4 pb-3 text-sm text-[#050505] space-y-3">
              <p className="font-semibold text-base">🚀 Deja de publicar a mano en grupos de Facebook. Conoce los 6 pilares de AutoPublisher:</p>
              <div className="space-y-2.5 bg-[#F0F2F5] p-3.5 rounded-lg border border-gray-200 text-xs sm:text-sm">
                <p>⚡ <strong>Ahorro radical:</strong> 15 a 25 horas libres cada semana. Configuras 1 sola vez y te vas a cerrar ventas.</p>
                <p>📈 <strong>Alcance exponencial:</strong> 1 producto x todos tus grupos = 6 productos activos equivalen a 6 veces más exposición.</p>
                <p>🛡️ <strong>Sin bloqueos:</strong> Publica 1 grupo a la vez, pausas cortas + descanso de 15-25 min cada 7 grupos con freno auto ante cualquier riesgo.</p>
                <p>🔀 <strong>Mensajes únicos con Spintax:</strong> Formato <code className="bg-white px-1.5 py-0.5 rounded text-xs text-[#1877F2] border">{`{Hola|Buenas} {amigo|vecino}`}</code> para que cada grupo reciba un texto completamente diferente.</p>
                <p>📁 <strong>Todo ordenadito:</strong> Carpetas (ej. <em>Ventas Bogotá</em>), paginación de 10 en 10 y backup exportar/importar.</p>
                <p>🎬 <strong>Con foto o video:</strong> Por variante: foto ≤4MB o video ≤25MB con temporizador individualizado.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 bg-black/5 p-1">
              <div className="relative group cursor-pointer overflow-hidden rounded-l">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop" className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition duration-300" alt="Dashboard AutoPublisher"
                  onError={(e)=>{ e.currentTarget.src='https://placehold.co/800x600/1877f2/ffffff?text=Dashboard+AutoPublisher'; }} />
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded font-medium">
                  <i className="fa-solid fa-desktop mr-1 text-[#1877F2]"></i> Dashboard en vivo
                </div>
              </div>
              <div className="grid grid-rows-2 gap-1">
                <div className="relative group cursor-pointer overflow-hidden rounded-tr">
                  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop" className="w-full h-[126px] sm:h-[142px] object-cover group-hover:scale-105 transition duration-300" alt="Motor Spintax"
                    onError={(e)=>{ e.currentTarget.src='https://placehold.co/600x300/1877f2/ffffff?text=Spintax+Generator'; }} />
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-medium">
                    <i className="fa-solid fa-code mr-1 text-indigo-400"></i> Motor Spintax
                  </div>
                </div>
                <div className="relative group cursor-pointer overflow-hidden rounded-br">
                  <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop" className="w-full h-[126px] sm:h-[142px] object-cover group-hover:scale-105 transition duration-300" alt="Protección Anti-Ban"
                    onError={(e)=>{ e.currentTarget.src='https://placehold.co/600x300/1877f2/ffffff?text=Proteccion+AntiBan'; }} />
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-medium">
                    <i className="fa-solid fa-shield-halved mr-1 text-emerald-400"></i> Simulación Humana
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">Licencia Oficial Permanente</span>
                <h4 className="font-bold text-sm sm:text-base">Automatiza tu negocio en grupos hoy</h4>
              </div>
              <a href={waLink('Hola, quiero la licencia de AutoPublisher')} target="_blank" rel="noopener noreferrer"
                 className="w-full sm:w-auto bg-[#1877F2] hover:bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-md uppercase tracking-wider text-center transition shadow">
                Solicitar Acceso
              </a>
            </div>

            <div className="px-4 py-2 flex items-center justify-between text-xs text-[#65676B] border-b border-[#CED0D4]">
              <div className="flex items-center gap-1.5">
                <span className="flex -space-x-1">
                  <span className="w-4 h-4 bg-[#1877F2] text-white rounded-full flex items-center justify-center text-[10px]"><i className="fa-solid fa-thumbs-up text-[8px]"></i></span>
                  <span className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px]"><i className="fa-solid fa-heart text-[8px]"></i></span>
                </span>
                <span>{reactions.toLocaleString()} personas</span>
              </div>
              <span>89 comentarios • 142 compartidos</span>
            </div>

            <div className="px-2 py-1 flex items-center justify-around text-[#65676B] text-xs sm:text-sm font-semibold">
              <button onClick={() => setReactions(c => c + 1)} className="flex-1 py-2 flex items-center justify-center gap-2 hover:bg-[#F0F2F5] rounded-md transition text-[#1877F2]">
                <i className="fa-solid fa-thumbs-up"></i>
                <span>Me gusta</span>
              </button>
              <button className="flex-1 py-2 flex items-center justify-center gap-2 hover:bg-[#F0F2F5] rounded-md transition">
                <i className="fa-regular fa-comment"></i>
                <span>Comentar</span>
              </button>
              <a href={waLink('Deseo información de AutoPublisher')} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 flex items-center justify-center gap-2 hover:bg-[#F0F2F5] rounded-md transition text-green-600">
                <i className="fa-brands fa-whatsapp"></i>
                <span>Pedir Info</span>
              </a>
            </div>
          </article>

          {/* OFERTA Bonus Pack */}
          <article id="oferta" className="bg-white rounded-lg border border-[#CED0D4] shadow-sm overflow-hidden">
            <div className="relative h-36 sm:h-44 bg-slate-900 overflow-hidden flex items-center">
              <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-35" alt="Paquete AutoPublisher Pro"
                onError={(e)=>{ e.currentTarget.src='https://placehold.co/1000x300/0f172a/ffffff?text=Paquete+Completo'; }} />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent p-5 flex flex-col justify-center">
                <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded w-fit mb-1">
                  Edición Limitada • Pago Único
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">Licencia Privada AutoPublisher v2.0</h3>
                <p className="text-xs sm:text-sm text-blue-200 mt-1 font-medium">Todo incluido para empezar a vender sin pagar cuotas mensuales.</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between border-b border-gray-100 pb-3 mb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wide text-[#1877F2]">Paquete Completo Incluido</span>
                  <h4 className="text-base font-bold text-[#050505]">Lo que recibes al instante:</h4>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded">100% Garantizado</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#050505] mb-4">
                <div className="flex items-center gap-2 p-2.5 rounded bg-[#F0F2F5]">
                  <i className="fa-solid fa-puzzle-piece text-[#1877F2] text-base"></i>
                  <span><strong>Extensión Privada v2.0</strong> (Sin mensualidad)</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded bg-[#F0F2F5]">
                  <i className="fa-solid fa-chalkboard-user text-[#1877F2] text-base"></i>
                  <span><strong>Onboarding 1 a 1:</strong> Sesión de 30 minutos</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded bg-[#F0F2F5]">
                  <i className="fa-solid fa-file-lines text-[#1877F2] text-base"></i>
                  <span><strong>Plantilla Pro:</strong> 20 mensajes con Spintax</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded bg-[#F0F2F5]">
                  <i className="fa-solid fa-shield-heart text-[#1877F2] text-base"></i>
                  <span><strong>Soporte Anti-Ban:</strong> 15 días de garantía directa</span>
                </div>
              </div>

              <a href={waLink('Hola, deseo comprar la Licencia Privada AutoPublisher v2.0')} target="_blank" rel="noopener noreferrer"
                 className="block w-full py-3 bg-[#1877F2] hover:bg-blue-600 text-white text-center font-bold text-sm rounded-md transition shadow">
                Adquirir Licencia Privada v2.0
              </a>
            </div>
          </article>

          {/* Comentarios / Testimonios */}
          <section className="bg-white rounded-lg border border-[#CED0D4] shadow-sm p-4 space-y-3">
            <h4 className="font-bold text-sm text-[#050505] pb-2 border-b border-gray-100">Opiniones de Usuarios</h4>
            <div className="flex gap-2.5">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop" className="w-8 h-8 rounded-full object-cover" alt="Carolina" onError={(e)=>{e.currentTarget.style.display='none'}} />
              <div className="flex-1">
                <div className="bg-[#F0F2F5] p-2.5 rounded-2xl inline-block text-xs">
                  <span className="font-bold text-[#050505] block">Carolina Mendoza</span>
                  <span>El modo Spintax y los descansos automáticos son una maravilla. Tengo 45 grupos y cero advertencias en 2 meses.</span>
                </div>
                <div className="text-[10px] text-[#65676B] font-semibold mt-1 ml-2 flex gap-3">
                  <span className="cursor-pointer hover:underline">Me gusta</span>
                  <span className="cursor-pointer hover:underline">Responder</span>
                  <span>Hace 3 h</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2.5">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop" className="w-8 h-8 rounded-full object-cover" alt="Carlos" onError={(e)=>{e.currentTarget.style.display='none'}} />
              <div className="flex-1">
                <div className="bg-[#F0F2F5] p-2.5 rounded-2xl inline-block text-xs">
                  <span className="font-bold text-[#050505] block">Carlos Andrés Vega</span>
                  <span>El ahorro de tiempo es real. Dejé de estar pegado a la pantalla publicando a mano. 100% recomendado.</span>
                </div>
                <div className="text-[10px] text-[#65676B] font-semibold mt-1 ml-2 flex gap-3">
                  <span className="cursor-pointer hover:underline">Me gusta</span>
                  <span className="cursor-pointer hover:underline">Responder</span>
                  <span>Hace 1 d</span>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>

      {/* Botón flotante WhatsApp */}
      <a href={waLink('Hola, estoy interesado en AutoPublisher Pro')} target="_blank" rel="noopener noreferrer"
         className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition hover:scale-110"
         title="Hablar por WhatsApp">
        <i className="fa-brands fa-whatsapp text-3xl"></i>
      </a>

      <div className="bg-[#F0F2F5] pt-2">
        <SiteFooter />
      </div>
    </div>
  );
}
