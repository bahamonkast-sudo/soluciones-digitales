import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Wifi, WifiOff, Eye, Monitor, Clock, RotateCcw, X, ChevronUp, Menu, Navigation } from 'lucide-react';
import { useNetworkStatus, useMenuVisibility, useActivityLogger } from '../hooks/useNetworkStatus';

const TYPE_CONFIG = {
  network: { label: 'Red', color: '#2962ff' },
  navigation: { label: 'Navegación', color: '#10b981' },
  menu: { label: 'Menú', color: '#f59e0b' },
  visibility: { label: 'Visibilidad', color: '#8b5cf6' },
};

export default function ActivityMonitor() {
  const [open, setOpen] = useState(false);
  const { online, log } = useNetworkStatus();
  const visibility = useMenuVisibility();
  const { clearLog } = useActivityLogger();
  const [stats, setStats] = useState({ total: log.length, offline: 0, online: 0 });

  useEffect(() => {
    const offline = log.filter(e => e.status === 'offline').length;
    const onlineCount = log.filter(e => e.status === 'online').length;
    setStats({ total: log.length, offline, online: onlineCount });
  }, [log]);

  const statusColor = online ? '#10b981' : '#ef4444';
  const statusText = online ? 'Conectado' : 'Sin conexión';

  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <>
      {/* Floating indicator bar */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed top-16 right-4 z-[60] flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] tracking-wider font-semibold cursor-pointer border transition-all duration-300 hover:scale-105"
        style={{
          background: online ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.15)',
          borderColor: online ? 'rgba(16,185,129,0.35)' : 'rgba(239,68,68,0.4)',
          color: online ? '#10b981' : '#ef4444',
          backdropFilter: 'blur(12px)',
        }}
      >
        {online ? <Wifi size={11} /> : <WifiOff size={11} />}
        <span>{statusText}</span>
        <span className="ml-1 opacity-50">{stats.total}</span>
        <ChevronUp size={10} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-28 right-4 z-[60] w-[380px] max-w-[calc(100vw-32px)] max-h-[60vh] rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.95)] flex flex-col"
            style={{
              background: 'rgba(11,11,15,0.92)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Activity size={13} className="text-[#2962ff]" />
                <span className="text-[11px] font-bold tracking-wider text-white">Monitor de Actividad</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearLog} className="p-1 text-neutral-500 hover:text-white transition-colors" title="Limpiar registro">
                  <RotateCcw size={12} />
                </button>
                <button onClick={() => setOpen(false)} className="p-1 text-neutral-500 hover:text-white transition-colors">
                  <X size={12} />
                </button>
              </div>
            </div>

            {/* Stats bar */}
            <div className="flex gap-3 px-4 py-2 border-b border-white/5 text-[9px] tracking-wider text-neutral-400">
              <span className="flex items-center gap-1">
                <Activity size={9} /> {stats.total} eventos
              </span>
              <span className="flex items-center gap-1" style={{ color: '#10b981' }}>
                <Wifi size={9} /> {stats.online} conexiones
              </span>
              <span className="flex items-center gap-1" style={{ color: '#ef4444' }}>
                <WifiOff size={9} /> {stats.offline} desconexiones
              </span>
            </div>

            {/* Menu visibility section */}
            <div className="px-4 py-2 border-b border-white/5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Eye size={10} className="text-[#8b5cf6]" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Visibilidad del Menú</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[9px]">
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Monitor size={9} /> Viewport: <span className="text-white">{visibility.viewportWidth}px</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Menu size={9} /> Navbar: <span style={{ color: visibility.navbarVisible ? '#10b981' : '#ef4444' }}>{visibility.navbarVisible ? 'Visible' : 'Oculto'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Navigation size={9} /> Dropdown: <span style={{ color: visibility.productosOpen ? '#f59e0b' : '#6b7280' }}>{visibility.productosOpen ? 'Abierto' : 'Cerrado'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Menu size={9} /> Móvil: <span style={{ color: visibility.mobileMenuOpen ? '#f59e0b' : '#6b7280' }}>{visibility.mobileMenuOpen ? 'Abierto' : 'Cerrado'}</span>
                </div>
              </div>
            </div>

            {/* Activity log */}
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5" style={{ maxHeight: '300px' }}>
              {log.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-neutral-600">
                  <Activity size={20} className="mb-2 opacity-30" />
                  <span className="text-[10px] tracking-wider">Sin actividad registrada</span>
                </div>
              ) : (
                [...log].reverse().map((entry, i) => {
                  const cfg = TYPE_CONFIG[entry.type] || { label: entry.type, color: '#6b7280' };
                  return (
                    <div key={i} className="flex items-start gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.03] transition-colors">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1 shrink-0"
                        style={{ backgroundColor: cfg.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: cfg.color }}>{cfg.label}</span>
                          <span className="text-[8px] text-neutral-600">{formatTime(entry.timestamp)}</span>
                        </div>
                        <p className="text-[10px] text-neutral-300 truncate">{entry.message}</p>
                      </div>
                      {entry.status && (
                        <span
                          className="text-[8px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider shrink-0"
                          style={{
                            backgroundColor: entry.status === 'online' || entry.status === 'visible' ? 'rgba(16,185,129,0.12)' : entry.status === 'offline' || entry.status === 'hidden' ? 'rgba(239,68,68,0.12)' : 'rgba(245,158,11,0.12)',
                            color: entry.status === 'online' || entry.status === 'visible' ? '#10b981' : entry.status === 'offline' || entry.status === 'hidden' ? '#ef4444' : '#f59e0b',
                          }}
                        >
                          {entry.status}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
