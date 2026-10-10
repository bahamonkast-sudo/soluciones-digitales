"use client";
import { useState } from "react";
import Icon from "./icon";
import { generarCodigo, guardarCodigo } from "../lib/codigos";

export interface Lead { nombre: string; whatsapp: string; contactos?: number; ticket?: number }

// Puerta del regalo: a cambio del ebook personalizado pedimos nombre + WhatsApp.
// Promesa explícita: 1 mensaje útil por semana, baja con BAJA. Nada de spam.
export default function LeadModal({ onDone, titulo }: { onDone: (l: Lead) => void; titulo?: string }) {
  const [nombre, setNombre] = useState("");
  const [wa, setWa] = useState("");
  const [contactos, setContactos] = useState("");
  const [ticket, setTicket] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const enviar = async () => {
    setErr("");
    if (nombre.trim().length < 2) { setErr("Cuéntanos tu nombre para personalizar tu plan."); return; }
    if (!/^\+?\d{8,15}$/.test(wa.replace(/[\s-]/g, ""))) { setErr("Revisa tu WhatsApp (solo números, con código de país si aplica)."); return; }
    if (!ok) { setErr("Necesitamos tu permiso para enviarte el plan por WhatsApp."); return; }
    setBusy(true);
    try {
      const ref = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("ref") : null;
      const lead: Lead = { nombre: nombre.trim(), whatsapp: wa.replace(/[\s-]/g, ""), contactos: contactos ? +contactos : undefined, ticket: ticket ? +ticket : undefined };
      const codigo = generarCodigo();
      const r = await fetch("/tuconsultor/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...lead, codigo, ref: ref || undefined }) });
      if (!r.ok) throw new Error();
      try { localStorage.setItem("tuconsultor_lead", JSON.stringify(lead)); guardarCodigo(codigo); } catch { /* noop */ }
      onDone(lead);
    } catch { setErr("No se pudo registrar. Intenta de nuevo."); }
    setBusy(false);
  };

  return (
    <div className="card max-w-lg mx-auto animate-fade-up">
      <span className="chip chip-good"><Icon name="gift" className="w-3 h-3 inline-block" /> Regalo personalizado</span>
      <h2 className="text-xl font-bold mt-2">{titulo || "Descarga tu plan de crecimiento + ebook"}</h2>
      <p className="muted mt-1">Con TU negocio, TUS números y lo que NO necesitas todavía. Te lo enviamos por WhatsApp.</p>
      <div className="mt-3 space-y-2 text-sm">
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" aria-label="Tu nombre" className="field" />
        <input value={wa} onChange={(e) => setWa(e.target.value)} placeholder="WhatsApp (ej. +52 55...)" inputMode="tel" aria-label="WhatsApp (ej. +52 55...)" className="field" />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <input value={contactos} onChange={(e) => setContactos(e.target.value)} placeholder="Contactos/mes (opcional)" inputMode="numeric" aria-label="Contactos/mes (opcional)" className="field" />
          <input value={ticket} onChange={(e) => setTicket(e.target.value)} placeholder="Ticket promedio (opcional)" inputMode="numeric" aria-label="Ticket promedio (opcional)" className="field" />
        </div>
        <label className="flex gap-2 text-xs text-ink-600"><input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} className="mt-1" /><span>Acepto recibir mi plan y 1 mensaje útil por semana. Puedo responder BAJA cuando quiera.</span></label>
        {err && <p role="alert" className="tiny chip-bad rounded-xl px-3 py-2">{err}</p>}
        <button onClick={enviar} disabled={busy} className="btn-primary w-full">{busy ? "Generando tu plan…" : "Quiero mi plan personalizado →"}</button>
        <p className="tiny"><Icon name="lock" className="w-3 h-3 inline-block" /> Solo usamos tus datos para enviarte tu plan. Sin spam, sin venta agresiva.</p>
      </div>
    </div>
  );
}

