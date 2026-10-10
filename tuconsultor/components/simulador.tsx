"use client";
import { useState } from "react";
import Icon from "./icon";

// Simulador "¿y si mejoro?": matemática real con los números del usuario.
// Supuestos explícitos, sin promesas: es una PROYECCIÓN, no una garantía.
const hookVal = (k: string, d: number) => {
  if (typeof window === "undefined") return d;
  try { const h = JSON.parse(localStorage.getItem("tuconsultor_hook") || "{}"); return Number(h[k]) || d; } catch { return d; }
};
export default function Simulador({ conversionActual }: { conversionActual: number }) {
  const [leads, setLeads] = useState(() => hookVal("leads", 40));
  const [ticket, setTicket] = useState(() => hookVal("ticket", 500));
  const [mejora, setMejora] = useState(10);

  const conv = Math.max(1, Math.min(90, conversionActual || 10));
  const ventasHoy = (leads * conv) / 100;
  const ingresoHoy = ventasHoy * ticket;
  const conv2 = Math.min(90, conv + mejora);
  const ingresoNuevo = ((leads * conv2) / 100) * ticket;
  const delta = ingresoNuevo - ingresoHoy;

  const num = (n: number) => n.toLocaleString("es", { maximumFractionDigits: 0 });

  return (
    <div className="card section">
      <div className="section-head">
        <h3 className="flex items-center gap-2 font-bold"><Icon name="chart" className="w-5 h-5 shrink-0 text-brand-700" /> Simulador: ¿y si mejoras tu conversión?</h3>
      </div>
      <p className="muted">Con TUS números. Proyección ilustrativa con supuestos explícitos — no una promesa.</p>
      <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
        <label className="field-label">Contactos/mes<input type="number" min={0} value={leads} onChange={(e) => setLeads(+e.target.value)} className="field mt-1" /></label>
        <label className="field-label">Ticket promedio<input type="number" min={0} value={ticket} onChange={(e) => setTicket(+e.target.value)} className="field mt-1" /></label>
        <label className="field-label">+ puntos conversión<input type="number" min={1} max={50} value={mejora} onChange={(e) => setMejora(+e.target.value)} className="field mt-1" /></label>
      </div>
      <div className="grid grid-cols-1 gap-3 text-center text-sm md:grid-cols-3">
        <div className="stat"><div className="stat-label">HOY ({conv}% conv.)</div><div className="stat-value">{num(ventasHoy)} ventas</div><div className="font-bold text-ink-700 num">${num(ingresoHoy)}/mes</div></div>
        <div className="stat border-brand-300 bg-brand-50"><div className="stat-label text-brand-700">CON +{mejora} PTS ({conv2}%)</div><div className="stat-value text-brand-700">{num((leads * conv2) / 100)} ventas</div><div className="font-bold text-brand-700 num">${num(ingresoNuevo)}/mes</div></div>
        <div className="stat"><div className="stat-label">DIFERENCIA</div><div className="stat-value">+${num(delta)}/mes</div><div className="tiny">mismo tráfico, mejor cierre</div></div>
      </div>
      <p className="tiny flex items-start gap-1.5"><Icon name="bulb" className="w-4 h-4 shrink-0 text-gold-500" /> Cómo ganar esos puntos: respuesta en minutos + seguimiento a 24h + oferta clara.</p>
    </div>
  );
}

