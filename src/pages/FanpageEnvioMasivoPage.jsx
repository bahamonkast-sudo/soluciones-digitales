import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Users, Target, Shield, Zap, MessageCircle,
  Database, Clock, CheckCircle2, ChevronRight,
  Server, Star, ArrowRight, Globe, GitBranch,
  ListChecks, Upload, Play, Layers, Quote, Smartphone,
  Radio, Download, Settings, FileSpreadsheet, MapPin,
  Filter, RefreshCw
} from 'lucide-react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SlideButton from '../components/SlideButton';
import { PRECIOS } from '../data/precios';

const GREEN = '#25D366';
const EMERALD = '#10B981';
const AMBER = '#F59E0B';

const NAV = [
  { id: 'hero',          label: '¿Qué es?',          icon: Zap },
  { id: 'beneficios',    label: 'Beneficios',        icon: Shield },
  { id: 'funciones',     label: 'Funciones',         icon: Layers },
  { id: 'zona-nicho',    label: 'Por Zona y Nicho',  icon: MapPin },
  { id: 'grupos',        label: 'Grupos WhatsApp',   icon: Globe },
  { id: 'contactos',     label: 'Contactos',         icon: Users },
  { id: 'como-funciona', label: 'Cómo Funciona',     icon: Play },
  { id: 'testimonios',   label: 'Testimonios',       icon: Star },
  { id: 'planes',        label: 'Licencias',         icon: Target },
  { id: 'faq',           label: 'FAQ',               icon: MessageCircle },
];

/* ══════════════════════════════════════════════════════════ */
/* ─── HERO ──────────────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <div className="space-y-8">
      <div className="neomorph-relief rounded-2xl p-6 md:p-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neomorph-inset mb-6">
          <Radio size={12} className="text-emerald-400" />
          <span className="text-[10px] md:text-xs font-bold text-emerald-400 uppercase tracking-[0.2em]">Herramienta de Extracción</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5">
          ExtraData
        </h1>
        <p className="text-xl md:text-2xl text-neutral-300 font-medium mb-3">
          Extrae datos de internet y WhatsApp por zona y por nicho.
        </p>
        <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-2xl">
          Tres extractores en uno: datos de internet segmentados por zona geográfica y nicho, 
          grupos de WhatsApp activos, y contactos dentro de esos grupos. 
          Todo desde un solo panel.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {[
            { value: '+50K', label: 'Datos extraídos' },
            { value: '98%',  label: 'Datos válidos' },
            { value: '+120', label: 'Usuarios activos' },
            { value: 'Excel', label: 'Exportación directa' },
          ].map((s, i) => (
            <div key={i} className="neomorph-inset rounded-xl py-4 px-3 text-center">
              <div className="text-xl md:text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs md:text-sm text-neutral-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="neomorph-inset rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Smartphone size={28} className="text-green-500 shrink-0" />
          <div>
            <div className="text-base md:text-lg font-bold text-white">¿Listo para extraer datos?</div>
            <div className="text-xs md:text-sm text-neutral-500">Prueba gratuita de 3 días. Sin compromiso.</div>
          </div>
        </div>
        <SlideButton
          label="Probar gratis"
          hoverLabel="Contactar por WhatsApp"
          href="https://wa.me/573115893220?text=Hola%2C%20quiero%20probar%20ExtraData"
          target="_blank"
          rel="noopener noreferrer"
          icon={Zap}
          width={280}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/* ─── BENEFICIOS ────────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════ */
function BeneficiosSection() {
  const items = [
    { icon: MapPin,     title: 'Datos por Zona y Nicho',     desc: 'Segmenta la extracción por ubicación geográfica y categoría de negocio. Obtén exactamente los datos que necesitas, no ruido.' },
    { icon: Globe,      title: 'Extracción de Grupos WhatsApp', desc: 'Escanea y extrae grupos activos de WhatsApp filtrados por nicho, ubicación o palabra clave. Construye tu base estratégica.' },
    { icon: Users,      title: 'Contactos de Grupos',        desc: 'Extrae los números de teléfono de los participantes dentro de los grupos. Accede a leads reales y activos.' },
    { icon: FileSpreadsheet, title: 'Exportación a Excel',   desc: 'Todos los datos se exportan directamente a Excel. Sin bases de datos propietarias, sin CRM. Tú controlas tu información.' },
    { icon: Clock,      title: 'Ahorro de Tiempo',           desc: 'Lo que tomaría días o semanas de investigación manual, ExtraData lo hace en minutos. Dedica tu tiempo a convertir datos en clientes.' },
    { icon: Shield,     title: 'Extracción Discreta',        desc: 'El sistema opera de forma gradual y no invasiva. Obtienes datos sin alertar ni generar bloqueos.' },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Beneficios</h2>
        <p className="text-sm md:text-base text-neutral-400 mt-2">Por qué ExtraData es la herramienta que necesitas.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="neomorph-relief rounded-xl p-5 md:p-6 group hover:border-green-500/20 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl neomorph-inset flex items-center justify-center mb-4 group-hover:brightness-125 transition-all">
              <item.icon size={20} className="text-green-500" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/* ─── FUNCIONES ─────────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════ */
function FuncionesSection() {
  const items = [
    { icon: MapPin,     title: 'Filtro por Zona Geográfica', desc: 'Define país, ciudad, región o radio de búsqueda. El sistema extrae solo datos dentro del área que necesitas.' },
    { icon: Filter,     title: 'Filtro por Nicho',           desc: 'Segmenta por industria, categoría de negocio o palabras clave. Obtén datos relevantes para tu mercado.' },
    { icon: Globe,      title: 'Buscador de Grupos WhatsApp',desc: 'Encuentra grupos activos de WhatsApp usando palabras clave, ubicación y categoría. Resultados en segundos.' },
    { icon: Users,      title: 'Extractor de Contactos',     desc: 'Una vez identificados los grupos, extrae los números de teléfono de los miembros. Datos reales de personas reales.' },
    { icon: Search,     title: 'Búsqueda por Internet',      desc: 'Escanea páginas web, directorios y fuentes públicas para recolectar datos de negocios segmentados por zona y nicho.' },
    { icon: FileSpreadsheet, title: 'Exportación a Excel',   desc: 'Cada extracción genera un archivo .xlsx listo para usar. Columnas organizadas, datos limpios, sin procesamiento adicional.' },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Funciones</h2>
        <p className="text-sm md:text-base text-neutral-400 mt-2">Lo que ExtraData hace por ti.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="neomorph-relief rounded-xl p-5 md:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl neomorph-inset flex items-center justify-center">
                <item.icon size={20} className="text-green-500" />
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                Extracción
              </span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/* ─── ZONA Y NICHO ──────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════ */
function ZonaNichoSecion() {
  const features = [
    { title: 'Segmentación Geográfica', desc: 'Filtra por país, departamento, ciudad o incluso código postal. Obtén contactos de negocios solo en las zonas que te interesan.' },
    { title: 'Filtro por Nicho',        desc: 'Selecciona la industria: restaurantes, clínicas, talleres, tiendas, etc. Cada nicho tiene sus propias fuentes de datos.' },
    { title: 'Búsqueda por Palabras Clave', desc: 'Define términos específicos. El sistema busca en directorios, páginas web y fuentes públicas.' },
    { title: 'Resultados en Excel',     desc: 'Cada extracción entrega: nombre, teléfono, dirección, correo y sitio web del negocio. Listo para usar.' },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Extractor por Zona y Nicho</h2>
        <p className="text-sm md:text-base text-neutral-400 mt-2">Extrae datos de internet segmentados por ubicación y categoría de negocio.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <div key={i} className="neomorph-relief rounded-xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <h3 className="text-base md:text-lg font-bold text-white">{f.title}</h3>
            </div>
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed pl-7">{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="neomorph-inset rounded-xl p-5 md:p-6">
        <div className="flex items-center gap-3 text-sm md:text-base">
          <MapPin size={16} className="text-green-400 animate-pulse" />
          <span className="font-mono text-green-400">extraccion_zona_nicho.xlsx</span>
          <span className="text-neutral-500 hidden sm:inline">— 1,284 negocios · 3 zonas · 2 nichos</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/* ─── GRUPOS WHATSAPP ───────────────────────────────────── */
/* ══════════════════════════════════════════════════════════ */
function GruposWhatsAppSection() {
  const features = [
    { title: 'Búsqueda por Nicho',       desc: 'Encuentra grupos de WhatsApp relacionados con tu industria. Ej: "grupos de ventas Colombia", "grupos de tecnología México".' },
    { title: 'Filtro por Ubicación',     desc: 'Segmenta la búsqueda por país o ciudad. Obtén grupos locales relevantes para tu mercado.' },
    { title: 'Grupos Activos Verificados', desc: 'El sistema identifica grupos con actividad reciente. No extraes grupos abandonados o sin miembros.' },
    { title: 'Exportación Inmediata',    desc: 'Lista de grupos con nombre, cantidad de miembros, nivel de actividad y enlace de invitación. Todo en Excel.' },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Extractor de Grupos WhatsApp</h2>
        <p className="text-sm md:text-base text-neutral-400 mt-2">Descubre grupos activos de WhatsApp segmentados por nicho y ubicación.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <div key={i} className="neomorph-relief rounded-xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <h3 className="text-base md:text-lg font-bold text-white">{f.title}</h3>
            </div>
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed pl-7">{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="neomorph-relief rounded-xl p-5 md:p-6">
        <div className="text-sm md:text-base text-neutral-400 mb-4 font-medium">Ejemplo de resultados</div>
        <div className="space-y-3">
          {[
            { group: 'Ventas Colombia',     members: 245, activity: 'Alta' },
            { group: 'Marketing Digital',   members: 189, activity: 'Alta' },
            { group: 'Emprendedores MX',    members: 312, activity: 'Media' },
          ].map((g, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-neutral-800/50 last:border-0">
              <div className="flex items-center gap-3">
                <MessageCircle size={14} className="text-green-500 shrink-0" />
                <span className="text-sm text-neutral-200">{g.group}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-neutral-500">{g.members} miembros</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${g.activity === 'Alta' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
                  {g.activity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/* ─── CONTACTOS ─────────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════ */
function ContactosSection() {
  const features = [
    { title: 'Extracción de Miembros',    desc: 'Selecciona los grupos objetivo y extrae los números de teléfono de sus participantes. Datos reales de personas reales.' },
    { title: 'Filtro por Actividad',      desc: 'Prioriza miembros activos dentro de los grupos. Obtienes contactos que realmente participan.' },
    { title: 'Datos Limpios',            desc: 'Los números se entregan validados y formateados. Sin duplicados, sin datos basura.' },
    { title: 'Exportación Directa',      desc: 'Todos los contactos extraídos se exportan a Excel con nombre del grupo de origen, número y fecha de extracción.' },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Extractor de Contactos</h2>
        <p className="text-sm md:text-base text-neutral-400 mt-2">Extrae los números de teléfono de los miembros de grupos de WhatsApp.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <div key={i} className="neomorph-relief rounded-xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <h3 className="text-base md:text-lg font-bold text-white">{f.title}</h3>
            </div>
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed pl-7">{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="neomorph-inset rounded-xl p-5 md:p-6">
        <div className="flex items-center gap-3 text-sm md:text-base">
          <Users size={16} className="text-green-400 animate-pulse" />
          <span className="font-mono text-green-400">contactos_extraidos.xlsx</span>
          <span className="text-neutral-500 hidden sm:inline">— 3,421 contactos · 12 grupos fuente</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/* ─── CÓMO FUNCIONA ─────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════ */
function ComoFuncionaSection() {
  const steps = [
    { num: '01', icon: MapPin,  title: 'Define tu Segmento',  desc: 'Elige zona geográfica, nicho o palabras clave. El sistema prepara los parámetros de búsqueda.' },
    { num: '02', icon: Search,  title: 'Ejecuta la Extracción',desc: 'Selecciona el tipo de extractor: internet, grupos WhatsApp o contactos. Inicia la búsqueda.' },
    { num: '03', icon: Database,title: 'Revisa los Resultados',desc: 'El sistema muestra los datos encontrados. Revisa, filtra y selecciona lo que necesitas.' },
    { num: '04', icon: FileSpreadsheet, title: 'Exporta a Excel',desc: 'Descarga tu archivo .xlsx con todos los datos organizados y listos para usar.' },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Cómo Funciona</h2>
        <p className="text-sm md:text-base text-neutral-400 mt-2">Extrae datos en 4 pasos simples.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {steps.map((s, i) => (
          <div key={i} className="neomorph-relief rounded-xl p-5 md:p-6 flex gap-5 items-start">
            <div className="neomorph-inset w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-lg md:text-xl font-black text-green-500">{s.num}</span>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/* ─── TESTIMONIOS ───────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════ */
function TestimoniosSection() {
  const items = [
    { text: 'Necesitaba contactos de restaurantes en Medellín. Con ExtraData los tuve en 10 minutos. En Excel, organizados y listos para campaña.', name: 'Carlos Mejía', role: 'Director Comercial · TechCorp' },
    { text: 'El extractor de grupos me ahorró semanas de búsqueda manual. Encontré 45 grupos activos de mi nicho en una sola ejecución.', name: 'Mariana López', role: 'CEO · GrowthLab' },
    { text: 'Me gusta que exporta directo a Excel. No tengo que aprender herramientas nuevas, solo abro mi archivo y trabajo.', name: 'Andrés Rivera', role: 'Fundador · LeadGenPro' },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Testimonios</h2>
        <p className="text-sm md:text-base text-neutral-400 mt-2">Lo que dicen nuestros usuarios sobre ExtraData.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((t, i) => (
          <div key={i} className="neomorph-relief rounded-xl p-5 md:p-6 flex flex-col">
            <div className="flex gap-1 mb-4">
              {[1,2,3,4,5].map(j => <Star key={j} size={14} className="text-amber-400 fill-amber-400" />)}
            </div>
            <p className="text-sm md:text-base text-neutral-300 italic leading-relaxed mb-5 flex-grow">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-neutral-800/50">
              <div className="neomorph-inset w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-sm font-black text-green-500">{t.name[0]}</span>
              </div>
              <div>
                <div className="text-sm md:text-base font-semibold text-white">{t.name}</div>
                <div className="text-xs md:text-sm text-neutral-500">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/* ─── LICENCIAS ─────────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════ */
function PlanesSection() {
  const plans = [
    {
      name: 'Mensual', price: PRECIOS.extradata.mensual, period: 'mes',
      features: [
        'Extractor por zona y nicho',
        'Extractor de grupos WhatsApp',
        'Extractor de contactos de grupos',
        'Exportación a Excel',
        'Soporte WhatsApp',
      ],
      desc: 'Para uso personal o pruebas',
    },
    {
      name: 'Trimestral', price: PRECIOS.extradata.trimestral, period: '3 meses',
      features: [
        'Extractor por zona y nicho',
        'Extractor de grupos WhatsApp',
        'Extractor de contactos de grupos',
        'Exportación a Excel',
        'Soporte prioritario',
      ],
      desc: 'La mejor relación costo-beneficio',
      popular: true,
    },
    {
      name: 'Semestral', price: PRECIOS.extradata.semestral, period: '6 meses',
      features: [
        'Extractor por zona y nicho',
        'Extractor de grupos WhatsApp',
        'Extractor de contactos de grupos',
        'Exportación a Excel',
        'Soporte prioritario',
      ],
      desc: 'El ahorro más grande',
    },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Licencias</h2>
        <p className="text-sm md:text-base text-neutral-400 mt-2">Paga solo por el tiempo que necesites. Mismas funciones en todas las licencias.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((p, i) => (
          <div key={i} className={`neomorph-relief rounded-xl p-5 md:p-6 relative flex flex-col ${p.popular ? 'border-green-500/40' : ''}`}>
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 neomorph-inset px-4 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap" style={{ color: GREEN }}>
                Recomendado
              </div>
            )}
            <h3 className="text-lg md:text-xl font-bold text-white mb-1">{p.name}</h3>
            <p className="text-xs md:text-sm text-neutral-500 mb-4">{p.desc}</p>
            <div className="flex items-baseline gap-1.5 mb-5">
              <span className="text-3xl md:text-4xl font-black text-white">${p.price}</span>
              <span className="text-xs md:text-sm text-neutral-500">/ {p.period}</span>
            </div>
            <ul className="space-y-2.5 mb-6 flex-grow">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-xs md:text-sm text-neutral-400">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="w-full">
              <SlideButton
                label={`Adquirir licencia ${p.name}`}
                hoverLabel="Contratar por WhatsApp"
                href={`https://wa.me/573115893220?text=Quiero%20la%20licencia%20${p.name}%20de%20ExtraData`}
                target="_blank"
                rel="noopener noreferrer"
                icon={ArrowRight}
                width="100%"
                className="w-full"
              />
            </div>
          </div>
        ))}
        <div className="md:col-span-3 neomorph-inset rounded-xl p-4 text-center">
          <span className="text-xs md:text-sm text-neutral-400">
            ⚡ Pago único por período. Sin mensualidades recurrentes.
            <span className="text-emerald-400 font-bold ml-1">Semestral: ahorras $180,000 vs mensual.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/* ─── FAQ ───────────────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════ */
function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = [
    { q: '¿Qué tipo de datos puede extraer ExtraData?', a: 'ExtraData tiene tres extractores: 1) Datos de internet por zona y nicho (nombre, teléfono, dirección, correo, web de negocios). 2) Grupos activos de WhatsApp con nombre, miembros y actividad. 3) Contactos de miembros dentro de esos grupos.' },
    { q: '¿Los datos extraídos son legales?', a: 'ExtraData trabaja con fuentes públicas y datos disponibles en internet. No vulnera privacidad ni accede a información privada. Los datos de grupos se extraen de grupos públicos o a los que tengas acceso.' },
    { q: '¿En qué formato obtengo los datos?', a: 'Todos los datos se exportan en archivos .xlsx (Excel) organizados por columnas. Listos para usar, filtrar o importar a otras herramientas.' },
    { q: '¿Puedo segmentar la extracción por ubicación?', a: 'Sí. El extractor por zona y nicho permite filtrar por país, ciudad, departamento o código postal. El extractor de grupos también permite filtro geográfico.' },
    { q: '¿Los grupos que extrae están activos?', a: 'El sistema identifica grupos con actividad reciente. Filtra grupos abandonados o sin miembros activos para que solo obtengas datos de calidad.' },
    { q: '¿Ofrecen prueba gratuita?', a: 'Sí. Contáctanos por WhatsApp y te activamos una demo gratuita por 3 días para que pruebes los tres extractores sin compromiso.' },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Preguntas Frecuentes</h2>
        <p className="text-sm md:text-base text-neutral-400 mt-2">Respuestas claras sobre ExtraData.</p>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className={`neomorph-relief rounded-xl overflow-hidden transition-all duration-300 ${openIdx === i ? 'border-green-500/30' : ''}`}>
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left gap-4"
            >
              <span className="text-sm md:text-base font-bold text-white flex-1">{faq.q}</span>
              <div className={`w-7 h-7 rounded-lg neomorph-inset flex items-center justify-center transition-transform duration-300 shrink-0 ${openIdx === i ? 'rotate-180' : ''}`}>
                <ChevronRight size={14} className="text-neutral-400" />
              </div>
            </button>
            {openIdx === i && (
              <div className="px-5 pb-5 text-sm md:text-base text-neutral-400 leading-relaxed border-t border-neutral-800/50 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CONTENT MAP ───────────────────────────────────────── */
const CONTENT = {
  hero:            <HeroSection />,
  beneficios:      <BeneficiosSection />,
  funciones:       <FuncionesSection />,
  'zona-nicho':    <ZonaNichoSecion />,
  grupos:          <GruposWhatsAppSection />,
  contactos:       <ContactosSection />,
  'como-funciona': <ComoFuncionaSection />,
  testimonios:     <TestimoniosSection />,
  planes:          <PlanesSection />,
  faq:             <FaqSection />,
};

/* ═══════════════════════════════════════════════════════════════ */
/* ─── DASHBOARD LANDING ────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════ */

export default function FanpageEnvioMasivoPage() {
  const [active, setActive] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [active]);

  return (
    <div className="h-screen flex flex-col bg-[#0B0B0F] text-[#D7E2EA] selection:bg-green-500/30 overflow-hidden">
      <Navbar activePage="productos" />

      <main className="flex-1 flex overflow-hidden pt-14 md:pt-16 relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ─── SIDEBAR ───────────────────────────────────── */}
        <aside className={`
          fixed md:relative z-40 h-full bg-[#0B0B0F] border-r border-neutral-800/50
          transition-transform duration-300 ease-in-out
          w-[250px] lg:w-[270px] shrink-0 flex flex-col p-4 gap-1 overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex items-center justify-between md:hidden mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl neomorph-relief flex items-center justify-center">
                <Search size={16} style={{ color: GREEN }} />
              </div>
              <div>
                <div className="text-sm font-bold text-white">ExtraData</div>
                <div className="text-[9px] md:text-[10px] text-neutral-500 tracking-wider uppercase">Landing Page</div>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="neomorph-inset w-8 h-8 rounded-lg flex items-center justify-center">
              <ChevronRight size={14} className="text-neutral-400" />
            </button>
          </div>

          <div className="hidden md:block neomorph-inset rounded-xl p-3 md:p-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl neomorph-relief flex items-center justify-center">
                <Search size={16} style={{ color: GREEN }} />
              </div>
              <div>
                <div className="text-sm font-bold text-white">ExtraData</div>
                <div className="text-[9px] md:text-[10px] text-neutral-500 tracking-wider uppercase">Landing Page</div>
              </div>
            </div>
          </div>

          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-3 w-full px-3 md:px-4 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'neomorph-inset text-white'
                    : 'neomorph-relief text-neutral-400 hover:text-white hover:brightness-110'
                }`}
              >
                <item.icon size={16} className={isActive ? 'text-green-500' : 'text-neutral-500'} />
                {item.label}
              </button>
            );
          })}

          <div className="mt-auto neomorph-relief rounded-xl p-3 md:p-4">
            <SlideButton
              label="Probar gratis"
              hoverLabel="Contactar por WhatsApp"
              href="https://wa.me/573115893220?text=Hola%2C%20quiero%20probar%20ExtraData"
              target="_blank"
              rel="noopener noreferrer"
              icon={Zap}
              width="100%"
              className="w-full"
            />
            <div className="flex items-center gap-2 mt-3 justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] md:text-xs text-emerald-400 font-mono tracking-wide">Sistema disponible</span>
            </div>
          </div>
        </aside>

        {/* Mobile hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-20 neomorph-relief w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl"
        >
          <Search size={22} className="text-green-500" />
        </button>

        {/* ─── CONTENT ──────────────────────────────────── */}
        <section className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 bg-[#0B0B0F]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="max-w-4xl mx-auto"
            >
              {CONTENT[active]}
            </motion.div>
          </AnimatePresence>

          {/* CTA Final */}
          <div className="mt-8 neomorph-relief rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <Quote size={32} className="text-green-500 shrink-0 mt-1 hidden sm:block" />
              <div>
                <div className="text-lg md:text-xl font-bold text-white">Comienza a extraer datos hoy</div>
                <div className="text-sm md:text-base text-neutral-500 mt-1">Únete a +120 usuarios que ya extraen datos estratégicamente con ExtraData.</div>
              </div>
            </div>
            <SlideButton
              label="Contactar ahora"
              hoverLabel="Escríbenos por WhatsApp"
              href="https://wa.me/573115893220?text=Hola%2C%20quiero%20probar%20ExtraData"
              target="_blank"
              rel="noopener noreferrer"
              icon={MessageCircle}
              width={280}
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
