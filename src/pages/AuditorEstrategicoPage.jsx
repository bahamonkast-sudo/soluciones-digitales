import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, BrainCircuit, Search, ChevronRight, CheckCircle2, Shield, Bot, User, Phone, Mail, FileText, AlertTriangle, Building, Target, Globe, DollarSign, TrendingUp, Presentation, Megaphone, Building2, Key, Loader2, MapPin, Download } from 'lucide-react';
import { fetchGroqCompletion } from '../services/groqService';
import { buildSystemInstruction, buildUserPrompt } from '../services/auditorPromptService';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SlideButton from '../components/SlideButton';
import ReactMarkdown from 'react-markdown';
import SEO from '../components/SEO';
import { SEO_CONFIG } from '../config/seoConfig';
import GroqTutorialModal from '../components/GroqTutorialModal';

const API_BASE_URL = import.meta.env.VITE_AUDITOR_URL || 'http://localhost:3006/api';
const ADMIN_WHATSAPP = '573115893220'; // Número del admin

const CATEGORIES = [
  { label: "Salud y Bienestar (Médicos, Odontólogos, Clínicas)", isDark: false },
  { label: "Bajar de Peso / Suplementos Milagrosos (Nicho Restringido)", isDark: true },
  { label: "Servicios Profesionales (Abogados, Consultores, Contadores)", isDark: false },
  { label: "Finanzas, Trading o Criptomonedas (Nicho Restringido)", isDark: true },
  { label: "Apuestas o Casino Online (Nicho Restringido)", isDark: true },
  { label: "E-commerce / Venta de Productos Físicos", isDark: false },
  { label: "Educación (Cursos, Infoproductos, Coaching)", isDark: false },
  { label: "Marketing Multinivel o Promesas de Ingresos", isDark: true },
  { label: "Bienes Raíces / Inmobiliarias", isDark: false },
  { label: "Gastronomía / Restaurantes", isDark: false },
  { label: "Otro (Especificar más adelante)", isDark: false }
];

const DIGITAL_ASSETS = [
  "Sitio Web Institucional",
  "Tienda Online (E-commerce)",
  "Landing Pages",
  "Instagram Business",
  "Facebook Page",
  "WhatsApp Business API",
  "TikTok Empresarial",
  "YouTube Channel",
  "LinkedIn Page",
  "Email Marketing"
];

const CONTENT_TYPES = [
  "Videos cortos (Reels/TikTok/Shorts)",
  "Imágenes estáticas / Carruseles",
  "Artículos de Blog (SEO)",
  "Videos largos (YouTube)",
  "Emails / Newsletters",
  "Publicidad Paga (Ads en Meta/Google)",
  "Contenido Educativo / Webinars"
];

const CLOSING_CHANNELS = [
  "WhatsApp (Cierre manual 1 a 1)",
  "Llamada Telefónica",
  "Reunión por Zoom / Google Meet",
  "Compra directa automatizada en Web",
  "Mensajes Directos (DM) en Instagram/Facebook"
];

const ETAPAS = [
  "Idea / Emprendimiento en fase inicial (Aún no facturo)",
  "Servicios Profesionales / Consultoría (B2B o Marca Personal)",
  "Empresa de Servicios Local (Clínicas, Talleres, Estéticas, etc.)",
  "E-commerce / Venta de Productos Físicos",
  "SaaS / Software o Infoproductos",
  "Empresa Consolidada B2B (Venta mayorista o corporativa)"
];

const OBJETIVOS = [
  "Conseguir clientes",
  "Aumentar ventas",
  "Validar mi idea",
  "Escalar el negocio"
];

const PRESUPUESTOS = [
  "No tengo presupuesto",
  "Menos de 100 USD",
  "100 - 500 USD",
  "500 - 2000 USD",
  "Más de 2000 USD"
];

const NIVELES_MARKETING = [
  "No tengo presencia online",
  "Tengo redes pero no vendo",
  "Ya vendo online",
  "Tengo campañas activas"
];

const COMPETIDORES = [
  "Sí, tengo competidores claros",
  "No tengo competidores directos",
  "No estoy seguro"
];

export default function AuditorEstrategicoPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  
  // Resultados del Backend
  const [reportSummary, setReportSummary] = useState(null);
  const [secretCode, setSecretCode] = useState(null);
  const [auditId, setAuditId] = useState(null);

  // Form State
  const [lead, setLead] = useState({ 
    nombre: '', 
    whatsapp: '', 
    email: '',
    empresa: '', 
    apiKey: '',
    aceptaTerminos: false 
  });
  
  const [formData, setFormData] = useState({
    category: '',
    isDarkNiche: false,
    etapa: '',
    web: '',
    pais: '',
    ticket: '',
    objetivo: '',
    presupuesto: '',
    nivel: '',
    competidores: '',
    intentos: '',
    descripcion: '',
    digitalAssets: [],
    contentType: [],
    closingChannel: '',
    mainProblem: ''
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 15));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  // 1. Validar uso previo e iniciar formulario
  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    if (!lead.nombre || !lead.whatsapp || !lead.apiKey || !lead.aceptaTerminos) {
      setError("Por favor completa los campos obligatorios (incluyendo tu API Key) y acepta los términos.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      // Nota: el control de uso único (una sola vez por email/teléfono)
      // se aplica al pulsar "Descargar ebook", no aquí, para no bloquear
      // el análisis a usuarios legítimos.
      setStep(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => {
      const arr = prev[field];
      if (arr.includes(item)) return { ...prev, [field]: arr.filter(i => i !== item) };
      return { ...prev, [field]: [...arr, item] };
    });
  };

  const selectCategory = (cat) => {
    setFormData(prev => ({
      ...prev,
      category: cat.label,
      isDarkNiche: cat.isDark
    }));
  };

  // 2. Generar el resumen (ahora usando Groq directo desde React)
  const generateAudit = async () => {
    if (!formData.category || !formData.mainProblem) {
      setError("Categoría y Problema Principal son obligatorios.");
      return;
    }
    setError(null);
    setLoading(true);
    setStep(14); // Pantalla de carga
    try {
      const payload = {
        ...formData,
        empresa: lead.empresa || '',
        digitalAssets: formData.digitalAssets.join(', '),
        contentType: formData.contentType.join(', '),
        userContact: `Nombre: ${lead.nombre}, WA: ${lead.whatsapp}, Email: ${lead.email}, Empresa: ${lead.empresa}`
      };
      
      const systemPrompt = buildSystemInstruction();
      const userPrompt = buildUserPrompt(payload);

      const reportMarkdown = await fetchGroqCompletion([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], lead.apiKey);
      
      const generatedAuditId = 'AUDIT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // Intentamos extraer un mini resumen si Groq lo generó, si no usamos un default
      let summaryStr = reportMarkdown.substring(0, 500) + '...';
      const summaryMatch = reportMarkdown.match(/# 2\. DIAGNOSTICO[^#]+/i);
      if (summaryMatch) {
        summaryStr = summaryMatch[0].substring(0, 300) + '...';
      }

      setReportSummary(summaryStr);
      setAuditId(generatedAuditId);
      
      // Guardar auditoría en localStorage
      const savedAudits = JSON.parse(localStorage.getItem('websd_audits') || '[]');
      savedAudits.push({
        id: generatedAuditId,
        timestamp: new Date().toISOString(),
        report: reportMarkdown,
        summary: summaryStr,
        lead: payload
      });
      localStorage.setItem('websd_audits', JSON.stringify(savedAudits));

      setStep(15); // Pantalla de Mini Resumen
    } catch (err) {
      setError(err.message || 'Error generando reporte.');
      setStep(13); // Volver al último paso
    } finally {
      setLoading(false);
    }
  };

  // 3. Solicitar informe completo (genera código secreto y guarda lead en localStorage)
  const requestFullReport = async () => {
    setLoading(true);
    setError(null);
    try {
      // Generar código secreto único
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const newLead = {
        nombre: lead.nombre,
        whatsapp: lead.whatsapp,
        email: lead.email || '',
        empresa: lead.empresa || 'No especificada',
        nicho: formData.category || '',
        aceptaTerminos: lead.aceptaTerminos,
        code: code,
        timestamp: new Date().toISOString(),
        used: false
      };

      const savedLeads = JSON.parse(localStorage.getItem('websd_leads') || '[]');
      savedLeads.push(newLead);
      localStorage.setItem('websd_leads', JSON.stringify(savedLeads));
      
      setSecretCode(code);
      setStep(16); // Pantalla de Código Secreto / WhatsApp Handoff
    } catch (err) {
      setError(err.message || 'Error generando código.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleInitialSubmit} className="max-w-md mx-auto space-y-5 bg-neutral-900/50 p-8 rounded-2xl border border-white/5 backdrop-blur-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#2962ff]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#2962ff]/20">
                <Bot size={32} className="text-[#2962ff]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Auditor Estratégico IA</h2>
              <p className="text-neutral-400 text-sm">Descubre las fugas de conversión y verifica tu cumplimiento de políticas de Meta/Google.</p>
            </div>
            
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
                <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Tu Nombre *</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="text" required value={lead.nombre} onChange={e => setLead({...lead, nombre: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="Ej. Juan Pérez" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">WhatsApp *</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="tel" required value={lead.whatsapp} onChange={e => setLead({...lead, whatsapp: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="+57 300 000 0000" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Email *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="email" required value={lead.email} onChange={e => setLead({...lead, email: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="tucorreo@empresa.com" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Empresa (Opcional)</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="text" value={lead.empresa} onChange={e => setLead({...lead, empresa: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="Tu negocio" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex justify-between items-center gap-2">
                  <span>Groq API Key *</span>
                  <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-[#2962ff] hover:underline text-[10px] hidden sm:inline">console.groq.com/keys</a>
                </label>
                <div className="relative">
                  <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="password" required value={lead.apiKey} onChange={e => setLead({...lead, apiKey: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="gsk_..." />
                </div>
                <div className="mt-2 relative">
                  <motion.div
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-1 -top-1 hidden sm:flex w-7 h-7 bg-red-600 rounded-full items-center justify-center shadow-lg shadow-red-600/30 z-10 pointer-events-none"
                  >
                    <ArrowRight size={14} className="text-white" />
                  </motion.div>
                  <button type="button" onClick={() => setShowApiKeyModal(true)} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-xs font-black tracking-wide py-3 px-3 rounded-xl transition-all shadow-[0_8px_24px_rgba(220,38,38,0.35)] border border-red-500/50 ring-2 ring-red-500/20 hover:ring-red-500/30 animate-pulse">
                    <Sparkles size={14} className="text-white" /> Ver tutorial con pantallazos — 30 seg <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 0.9, repeat: Infinity }} className="inline-flex"><ChevronRight size={14} /></motion.span>
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500 mt-2 text-center">Gratis, sin tarjeta. Te llevamos paso a paso <span className="text-neutral-400">con capturas reales</span>.</p>
              </div>

              <label className="flex items-start gap-3 p-4 bg-black/30 rounded-xl border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                <input type="checkbox" required checked={lead.aceptaTerminos} onChange={e => setLead({...lead, aceptaTerminos: e.target.checked})} className="mt-1" />
                <span className="text-sm text-neutral-400">Acepto que mis datos sean procesados para generar la auditoría y contactarme por WhatsApp.</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#2962ff] hover:bg-[#2962ff]/90 text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(41,98,255,0.3)] disabled:opacity-50">
              {loading ? <Loader2 size={20} className="animate-spin" /> : 'Comenzar Análisis'}
            </button>
          </motion.form>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿A qué categoría pertenece tu negocio?</h2>
            <p className="text-neutral-400">Esto nos ayuda a evaluar políticas de cumplimiento (nichos oscuros) en Meta y Google Ads.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CATEGORIES.map(cat => (
                <button key={cat.label} onClick={() => { selectCategory(cat); setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.category === cat.label ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20 hover:bg-neutral-800'}`}>
                  {cat.label}
                  {cat.isDark && <AlertTriangle size={14} className="inline ml-2 text-yellow-500" />}
                </button>
              ))}
            </div>
            <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿En qué etapa se encuentra tu proyecto?</h2>
            <p className="text-neutral-400">Esto nos ayuda a priorizar las recomendaciones según tu madurez.</p>
            <div className="grid grid-cols-1 gap-3">
              {ETAPAS.map(item => (
                <button key={item} onClick={() => { setFormData({...formData, etapa: item}); setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.etapa === item ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">Tu presencia digital</h2>
            <p className="text-neutral-400">Cuéntanos sobre tu sitio web, tu mercado y tu ticket promedio.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Sitio web o red social</label>
                <div className="relative">
                  <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="text" value={formData.web} onChange={e => setFormData({...formData, web: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="https://tusitio.com o @tuinstagram" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">País donde operas</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="text" value={formData.pais} onChange={e => setFormData({...formData, pais: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="Ej. Colombia" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Ticket promedio de venta (USD)</label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="number" min="0" value={formData.ticket} onChange={e => setFormData({...formData, ticket: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="Ej. 50" />
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button onClick={nextStep} className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-neutral-200">Siguiente</button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Cuál es tu principal objetivo ahora?</h2>
            <p className="text-neutral-400">Selecciona lo más urgente para tu negocio en este momento.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {OBJETIVOS.map(item => (
                <button key={item} onClick={() => { setFormData({...formData, objetivo: item}); setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.objetivo === item ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Cuánto inviertes al mes en marketing?</h2>
            <p className="text-neutral-400">Esto nos permite recomendar estrategias realistas según tu presupuesto.</p>
            <div className="grid grid-cols-1 gap-3">
              {PRESUPUESTOS.map(item => (
                <button key={item} onClick={() => { setFormData({...formData, presupuesto: item}); setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.presupuesto === item ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Cuál es tu nivel actual en marketing digital?</h2>
            <p className="text-neutral-400">Elige la opción que mejor describa tu situación hoy.</p>
            <div className="grid grid-cols-1 gap-3">
              {NIVELES_MARKETING.map(item => (
                <button key={item} onClick={() => { setFormData({...formData, nivel: item}); setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.nivel === item ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
            </div>
          </motion.div>
        );

      case 7:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Tienes competidores claros?</h2>
            <p className="text-neutral-400">Saber contra quién compites nos ayuda a encontrar tu ventaja.</p>
            <div className="grid grid-cols-1 gap-3">
              {COMPETIDORES.map(item => (
                <button key={item} onClick={() => { setFormData({...formData, competidores: item}); setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.competidores === item ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
            </div>
          </motion.div>
        );

      case 8:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Qué has intentado antes en marketing?</h2>
            <p className="text-neutral-400">Cuéntanos qué has probado (anuncios, redes, agencias...) y qué pasó.</p>
            <textarea value={formData.intentos} onChange={e => setFormData({...formData, intentos: e.target.value})} className="w-full h-32 bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#2962ff] outline-none" placeholder="Ej: Pauté en Meta por 3 meses pero no vi ventas, tuve una agencia que no me renovó..." />
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button onClick={nextStep} className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-neutral-200">Siguiente</button>
            </div>
          </motion.div>
        );

      case 9:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">Cuéntanos sobre tu negocio o idea</h2>
            <p className="text-neutral-400">Describe qué vendes, a quién y qué te hace diferente.</p>
            <textarea value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} className="w-full h-40 bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#2962ff] outline-none" placeholder="Ej: Vendo software contable para pymes en Colombia, mi diferenciador es la atención personalizada..." />
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button onClick={nextStep} className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-neutral-200">Siguiente</button>
            </div>
          </motion.div>
        );

      case 10:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Qué activos digitales tienes actualmente?</h2>
            <p className="text-neutral-400">Selecciona todos los que apliquen. Evaluaremos tu presencia digital.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DIGITAL_ASSETS.map(item => (
                <button key={item} onClick={() => toggleArrayItem('digitalAssets', item)} className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${formData.digitalAssets.includes(item) ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                  {formData.digitalAssets.includes(item) && <CheckCircle2 size={18} className="text-[#2962ff]" />}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button onClick={nextStep} className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-neutral-200">Siguiente</button>
            </div>
          </motion.div>
        );

      case 11:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Qué tipo de formato de contenido usas más?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CONTENT_TYPES.map(item => (
                <button key={item} onClick={() => toggleArrayItem('contentType', item)} className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${formData.contentType.includes(item) ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                  {formData.contentType.includes(item) && <CheckCircle2 size={18} className="text-[#2962ff]" />}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button onClick={nextStep} className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-neutral-200">Siguiente</button>
            </div>
          </motion.div>
        );

      case 12:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Por dónde cierras la mayoría de tus ventas?</h2>
            <div className="grid grid-cols-1 gap-3">
              {CLOSING_CHANNELS.map(item => (
                <button key={item} onClick={() => { setFormData({...formData, closingChannel: item}); setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.closingChannel === item ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
            </div>
          </motion.div>
        );

      case 13:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Cuál es tu mayor problema o cuello de botella hoy?</h2>
            <p className="text-neutral-400">Describe brevemente por qué estás buscando una auditoría.</p>
            <textarea value={formData.mainProblem} onChange={e => setFormData({...formData, mainProblem: e.target.value})} className="w-full h-40 bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#2962ff] outline-none" placeholder="Ej: Recibo muchos mensajes pero nadie compra, Meta me bloquea las cuentas, no sé cómo automatizar..."></textarea>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button onClick={generateAudit} disabled={loading} className="bg-[#2962ff] hover:bg-[#2962ff]/90 text-white px-8 py-3 rounded-full font-medium shadow-[0_0_20px_rgba(41,98,255,0.3)] flex items-center gap-2">
                Analizar Ecosistema <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        );

      case 14:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <Loader2 size={48} className="text-[#2962ff] animate-spin mx-auto" />
            <h2 className="text-2xl font-bold text-white">La IA está auditando tu ecosistema...</h2>
            <div className="max-w-sm mx-auto text-neutral-400 space-y-2 text-sm">
              <p className="animate-pulse">Verificando cumplimiento de políticas...</p>
              <p className="animate-pulse delay-100">Analizando fricción en el embudo...</p>
              <p className="animate-pulse delay-200">Redactando resumen ejecutivo...</p>
            </div>
          </div>
        );

      case 15:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-8 backdrop-blur-xl mb-8">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
                <div className="w-16 h-16 bg-[#2962ff]/10 rounded-full flex items-center justify-center border border-[#2962ff]/20">
                  <Bot size={32} className="text-[#2962ff]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Resumen Ejecutivo IA</h2>
                  <p className="text-[#2962ff]">Primeros hallazgos para {lead.empresa || lead.nombre}</p>
                </div>
              </div>

              <div className="prose prose-invert prose-blue max-w-none mb-10">
                <ReactMarkdown>{reportSummary || "No se pudo generar el resumen."}</ReactMarkdown>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 mb-6">
                  <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <div className="bg-black/50 border border-[#2962ff]/20 rounded-xl p-8 text-center space-y-4">
                <h3 className="text-xl font-bold text-white">¡Hay mucho más por descubrir!</h3>
                <p className="text-neutral-400 max-w-2xl mx-auto">
                  Este es solo un vistazo inicial. Hemos generado un <strong>Ebook completo</strong> con el diagnóstico de tu dolor principal, la metodología recomendada, controles de medición (Google Analytics, Search Console, Meta Pixel), análisis de tu embudo, recomendaciones antobloqueos y un plan de acción prioritario.
                </p>
                <button onClick={requestFullReport} disabled={loading} className="mt-4 inline-flex items-center gap-2 bg-[#2962ff] hover:bg-[#2962ff]/90 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(41,98,255,0.4)] transition-all disabled:opacity-50">
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <><Download size={24} /> Descargar Informe Completo</>}
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 16:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto text-center space-y-8 bg-neutral-900/50 p-10 rounded-3xl border border-[#2962ff]/20">
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">¡Reporte Generado!</h2>
              <p className="text-neutral-400">
                Tu Ebook completo está listo. Para descargarlo, envíale este código de seguridad a nuestro especialista.
              </p>
            </div>

            <div className="bg-black border border-dashed border-[#2962ff]/50 rounded-2xl p-6 relative group">
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Tu Código Secreto</p>
              <p className="text-4xl font-mono font-bold text-[#2962ff] tracking-wider">{secretCode}</p>
            </div>

            <SlideButton
              label="Enviar solicitud del ebook por WhatsApp"
              hoverLabel="Enviar por WhatsApp"
              href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(
                `Hola, acabo de usar el Auditor Estratégico y quiero recibir mi informe completo.\n\n` +
                `Datos de contacto:\n` +
                `Nombre: ${lead.nombre}\n` +
                `Correo: ${lead.email || 'No proporcionado'}\n` +
                `Teléfono WhatsApp: ${lead.whatsapp}\n` +
                `Empresa: ${lead.empresa || 'No especificada'}\n` +
                `Nicho: ${formData.category || 'No especificado'}\n\n` +
                `Mi código de acceso es: ${secretCode}\n\n` +
                `Quedo atento a la entrega del ebook. Gracias.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full"
              width="100%"
            />
            
            <p className="text-xs text-neutral-500">
              El mensaje incluye tu nombre, correo, teléfono, empresa y nicho, junto con tu código de acceso. El especialista validará tus datos y te enviará el ebook en formato HTML/PDF.
            </p>
          </motion.div>
        );
        
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      <SEO {...SEO_CONFIG.auditor} />
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        {renderStep()}
      </div>

      <GroqTutorialModal isOpen={showApiKeyModal} onClose={() => setShowApiKeyModal(false)} />
      <SiteFooter />
    </div>
  );
}
