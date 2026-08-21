import React, { useState, useEffect } from 'react'
import { Lock, Key, LayoutDashboard, FileText, Users, Eye, Clock, CheckCircle, RefreshCw, LogOut, ChevronDown, Search, Bot, X, MessageCircle, Loader2 } from 'lucide-react'

const SECRET_STORAGE_KEY = 'admin_auditor_secret';
const ADMIN_PASS = 'soluciones2026';

// Base de los reportes HTML servidos por el backend del auditor.
// En producción usa VITE_AUDITOR_URL (sin el sufijo /api) o el dominio actual.
const REPORT_BASE = (import.meta.env.VITE_AUDITOR_URL || '').replace(/\/api\/?$/, '') || (typeof window !== 'undefined' ? window.location.origin : '');

export default function AdminAuditorPage() {
  const [secret, setSecret] = useState(() => localStorage.getItem(SECRET_STORAGE_KEY) || '')
  const [authed, setAuthed] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [checking, setChecking] = useState(false)

  const [stats, setStats] = useState(null)
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('stats')
  const [expandedAudit, setExpandedAudit] = useState(null)
  const [filter, setFilter] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (secret && !authed) {
      verifySecret(secret, false)
    }
  }, [])

  const verifySecret = async (key, showError = true) => {
    setChecking(true)
    setLoginError('')
    try {
      // Simulamos red
      await new Promise(r => setTimeout(r, 500))
      
      if (key === ADMIN_PASS || key === import.meta.env.VITE_ADMIN_SECRET) {
        localStorage.setItem(SECRET_STORAGE_KEY, key)
        setAuthed(true)
        await loadData(key)
      } else {
        if (showError) setLoginError('Clave de administrador inválida.')
        localStorage.removeItem(SECRET_STORAGE_KEY)
      }
    } catch (e) {
      setLoginError('Error de autenticación.')
    } finally {
      setChecking(false)
    }
  }

  const loadData = async (key) => {
    setLoading(true)
    setError('')
    try {
      const auditsData = JSON.parse(localStorage.getItem('websd_audits') || '[]')
      const leadsData = JSON.parse(localStorage.getItem('websd_leads') || '[]')
      
      // Transformar audits al formato esperado por la vista
      const statsObj = {
        audits: auditsData.map(a => ({
          id: a.id,
          timestamp: a.timestamp,
          pdfSent: a.pdfSent || false,
          formData: a.lead,
          leadInfo: { nombre: a.lead?.nombre, empresa: a.lead?.empresa },
          views: [],
          timeSpent: []
        }))
      }
      
      setStats(statsObj)
      setLeads(leadsData)
    } catch (e) {
      setError(e.message || 'Error cargando datos.')
    } finally {
      setLoading(false)
    }
  }

  const markSent = async (auditId) => {
    try {
      const auditsData = JSON.parse(localStorage.getItem('websd_audits') || '[]')
      const updated = auditsData.map(a => {
        if (a.id === auditId) return { ...a, pdfSent: true }
        return a
      })
      localStorage.setItem('websd_audits', JSON.stringify(updated))
      
      setToast('Reporte marcado como enviado.')
      setTimeout(() => setToast(''), 3000)
      await loadData(secret)
    } catch (e) {
      setToast('Error al marcar como enviado.')
    }
  }

  const logout = () => {
    localStorage.removeItem(SECRET_STORAGE_KEY)
    setAuthed(false)
    setSecret('')
    setStats(null)
    setLeads([])
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#13131b] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#2962ff]/10 rounded-xl flex items-center justify-center border border-[#2962ff]/20">
              <Lock size={24} className="text-[#2962ff]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Panel Admin Auditor</h1>
              <p className="text-xs text-neutral-500">Acceso restringido</p>
            </div>
          </div>

          <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Clave de Administrador</label>
          <div className="relative mb-4">
            <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="password"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && verifySecret(secret)}
              placeholder="Ingresa el ADMIN_SECRET"
              className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors"
              autoFocus
            />
          </div>

          {loginError && <p className="text-red-400 text-sm mb-4">{loginError}</p>}

          <button
            onClick={() => verifySecret(secret)}
            disabled={checking || !secret}
            className="w-full bg-[#2962ff] hover:bg-[#2962ff]/90 text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {checking ? <Loader2 size={18} className="animate-spin" /> : <><Lock size={18} /> Ingresar</>}
          </button>
        </div>
      </div>
    )
  }

  const audits = stats?.audits || []
  const filteredAudits = audits.filter(a => {
    if (!filter) return true
    const q = filter.toLowerCase()
    return (a.id || '').toLowerCase().includes(q) ||
      (a.formData?.category || '').toLowerCase().includes(q) ||
      (a.leadInfo?.nombre || '').toLowerCase().includes(q) ||
      (a.leadInfo?.empresa || '').toLowerCase().includes(q)
  })

  const totalViews = audits.reduce((s, a) => s + (a.views?.length || 0), 0)
  const totalTime = audits.reduce((s, a) => s + (a.timeSpent || []).reduce((x, t) => x + (t.seconds || 0), 0), 0)

  const StatCard = ({ icon: Icon, label, value, sub, color = 'text-[#2962ff]' }) => (
    <div className="bg-[#13131b] border border-white/5 rounded-2xl p-5">
      <div className={`w-10 h-10 bg-[#2962ff]/10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
        <Icon size={20} />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-neutral-500 mt-1">{label}</p>
      {sub && <p className="text-[10px] text-neutral-600 mt-1">{sub}</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm">{toast}</div>
      )}

      <header className="border-b border-white/5 bg-[#111118]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2962ff]/10 rounded-xl flex items-center justify-center border border-[#2962ff]/20">
              <Bot size={20} className="text-[#2962ff]" />
            </div>
            <div>
              <h1 className="font-bold">Auditor Estratégico</h1>
              <p className="text-xs text-neutral-500">Panel de Administración</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => loadData(secret)} className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors" title="Actualizar">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={logout} className="p-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-white/5 transition-colors" title="Cerrar sesión">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 mb-6 text-sm">{error}</div>}

        <div className="flex gap-2 mb-8 flex-wrap">
          <button onClick={() => setTab('stats')} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${tab === 'stats' ? 'bg-[#2962ff] text-white' : 'bg-white/5 text-neutral-400 hover:bg-white/10'}`}>
            <LayoutDashboard size={16} /> Estadísticas
          </button>
          <button onClick={() => setTab('audits')} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${tab === 'audits' ? 'bg-[#2962ff] text-white' : 'bg-white/5 text-neutral-400 hover:bg-white/10'}`}>
            <FileText size={16} /> Auditorías ({audits.length})
          </button>
          <button onClick={() => setTab('leads')} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${tab === 'leads' ? 'bg-[#2962ff] text-white' : 'bg-white/5 text-neutral-400 hover:bg-white/10'}`}>
            <Users size={16} /> Leads ({leads.length})
          </button>
        </div>

        {loading && !stats && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="text-[#2962ff] animate-spin" />
          </div>
        )}

        {tab === 'stats' && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={FileText} label="Auditorías Totales" value={stats.totalAudits} />
              <StatCard icon={Users} label="Leads Registrados" value={stats.totalLeads} sub={`${stats.usedCodes} códigos usados`} />
              <StatCard icon={MessageCircle} label="PDF Solicitados" value={stats.pdfRequested} sub={`${stats.pdfSent} enviados`} />
              <StatCard icon={CheckCircle} label="Reportes con Vista" value={stats.auditsWithViews} sub={`${totalViews} vistas en total`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#13131b] border border-white/5 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-neutral-300 mb-4 flex items-center gap-2"><Eye size={16} className="text-[#2962ff]" /> Vistas de Reportes</h3>
                <p className="text-3xl font-bold text-white">{totalViews}</p>
                <p className="text-xs text-neutral-500 mt-1">Total de veces que los leads abrieron su reporte</p>
              </div>
              <div className="bg-[#13131b] border border-white/5 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-neutral-300 mb-4 flex items-center gap-2"><Clock size={16} className="text-[#2962ff]" /> Tiempo en Página</h3>
                <p className="text-3xl font-bold text-white">{Math.round(totalTime / 60)} min</p>
                <p className="text-xs text-neutral-500 mt-1">Tiempo total invertido por los leads ({totalTime} segundos)</p>
              </div>
            </div>

            <div className="bg-[#13131b] border border-white/5 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-neutral-300 mb-4">Auditorías por Categoría</h3>
              {Object.keys(stats.auditByCategory || {}).length === 0 ? (
                <p className="text-sm text-neutral-500">Sin datos todavía.</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(stats.auditByCategory).map(([cat, count]) => {
                    const total = audits.length || 1
                    const pct = Math.round((count / total) * 100)
                    return (
                      <div key={cat}>
                        <div className="flex justify-between text-xs text-neutral-400 mb-1">
                          <span>{cat}</span>
                          <span>{count} ({pct}%)</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#2962ff] rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'audits' && (
          <div>
            <div className="relative mb-6">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Buscar por ID, categoría, nombre o empresa..."
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors"
              />
            </div>

            {filteredAudits.length === 0 ? (
              <p className="text-center text-neutral-500 py-16">No hay auditorías que coincidan.</p>
            ) : (
              <div className="space-y-3">
                {filteredAudits.map(a => {
                  const isOpen = expandedAudit === a.id
                  return (
                    <div key={a.id} className="bg-[#13131b] border border-white/5 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setExpandedAudit(isOpen ? null : a.id)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={`shrink-0 w-2 h-10 rounded-full ${a.pdfSent ? 'bg-green-500' : a.pdfRequested ? 'bg-yellow-500' : 'bg-[#2962ff]'}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs text-[#2962ff]">{a.id}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${a.status === 'pdf_sent' ? 'bg-green-500/10 text-green-400' : a.status === 'pdf_requested' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-[#2962ff]/10 text-[#2962ff]'}`}>
                                {a.status === 'pdf_sent' ? 'PDF enviado' : a.status === 'pdf_requested' ? 'PDF solicitado' : 'Completado'}
                              </span>
                              <span className="text-[10px] text-neutral-600">{a.type === 'website' ? 'Sitio Web' : 'Estratégica'}</span>
                            </div>
                            <p className="text-sm text-neutral-300 truncate mt-1">{a.formData?.category || 'Sin categoría'}</p>
                            <p className="text-xs text-neutral-500 mt-0.5">
                              {a.leadInfo?.nombre ? `${a.leadInfo.nombre} · ` : ''}{new Date(a.timestamp).toLocaleString('es-CO')}
                            </p>
                          </div>
                        </div>
                        <ChevronDown size={18} className={`text-neutral-500 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 border-t border-white/5 pt-4">
                          {a.leadInfo && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 text-xs">
                              <p className="text-neutral-400"><span className="text-neutral-600">Contacto:</span> {a.leadInfo.nombre}</p>
                              <p className="text-neutral-400"><span className="text-neutral-600">WhatsApp:</span> {a.leadInfo.whatsapp}</p>
                              <p className="text-neutral-400"><span className="text-neutral-600">Empresa:</span> {a.leadInfo.empresa || 'No especificada'}</p>
                            </div>
                          )}
                          <div className="bg-black/40 rounded-xl p-4 mb-4">
                            <p className="text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wider">Resumen Ejecutivo</p>
                            <pre className="text-xs text-neutral-400 whitespace-pre-wrap font-sans">{a.reportSummary || 'Sin resumen'}</pre>
                          </div>
                          <div className="flex items-center gap-3 flex-wrap">
                            {a.htmlUrl && (
                              <a
                                href={`${REPORT_BASE}${a.htmlUrl}`}
                                target="_blank" rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-neutral-300 px-4 py-2 rounded-lg text-sm transition-colors"
                              >
                                <Eye size={16} /> Ver Reporte
                              </a>
                            )}
                            <button
                              onClick={() => markSent(a.id)}
                              disabled={a.pdfSent}
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50 ${a.pdfSent ? 'bg-green-500/10 text-green-400 cursor-default' : 'bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20'}`}
                            >
                              <CheckCircle size={16} /> {a.pdfSent ? 'Enviado' : 'Marcar como enviado'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'leads' && (
          <div>
            {leads.length === 0 ? (
              <p className="text-center text-neutral-500 py-16">Aún no hay leads registrados.</p>
            ) : (
              <div className="bg-[#13131b] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5 text-left text-xs text-neutral-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Nombre</th>
                        <th className="px-4 py-3">WhatsApp</th>
                        <th className="px-4 py-3">Empresa</th>
                        <th className="px-4 py-3">Código</th>
                        <th className="px-4 py-3">Estado</th>
                        <th className="px-4 py-3">Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((l, i) => (
                        <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                          <td className="px-4 py-3 text-white">{l.nombre}</td>
                          <td className="px-4 py-3 text-neutral-400">{l.whatsapp}</td>
                          <td className="px-4 py-3 text-neutral-400">{l.empresa || '—'}</td>
                          <td className="px-4 py-3">
                            <span className="font-mono text-xs text-[#2962ff] bg-[#2962ff]/10 px-2 py-1 rounded">{l.code}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${l.used ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'}`}>
                              {l.used ? 'Usado' : 'Disponible'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-neutral-500">{new Date(l.registeredAt).toLocaleString('es-CO')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
