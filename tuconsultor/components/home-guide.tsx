"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "./icon";

const ROUTES = {
  check: { icon: "chart", label: "No sé qué me está frenando", detail: "Revisa ocho señales con cifras de tu negocio, como consultas, ventas y seguimiento. Es una lectura rápida de tu situación actual.", outcome: "Identificas señales a mejorar y eliges una prioridad medible, como responder más rápido o convertir más consultas.", action: "Empezar el chequeo", href: "/chequeo" },
  goal: { icon: "target", label: "Ya sé qué quiero lograr", detail: "Elige objetivos como conseguir clientes, vender más o mejorar el seguimiento. Te pedimos solo el contexto necesario.", outcome: "Te llevas una secuencia Ahora, Próximo y Después, adaptada a tu meta y presupuesto.", action: "Elegir mi meta", href: "/metas" },
  deep: { icon: "chat", label: "Quiero entenderlo a fondo", detail: "Explora con preguntas guiadas los 15 factores del negocio, sus causas y efectos. Es un recorrido más amplio para comprender el contexto y construir un plan.", outcome: "Comprendes los factores que influyen, recibes prioridades e indicadores y puedes consultar al asistente de marketing IA.", action: "Iniciar diagnóstico", href: "/diagnostico" },
} as const;

type RouteKey = keyof typeof ROUTES;

export default function HomeGuide() {
  const [selected, setSelected] = useState<RouteKey>("check");
  const route = ROUTES[selected];
  return (
    <div className="mt-8 rounded-3xl border border-sand-200/80 bg-white/85 p-4 shadow-card backdrop-blur-sm sm:p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-800 text-xs font-bold text-white">1</span>
        <div><p className="text-sm font-semibold text-ink-900">¿Por dónde quieres empezar?</p><p className="tiny">Elige el camino que más se parece a tu situación.</p></div>
      </div>
      <div className="mt-4 grid gap-2">
        {(Object.entries(ROUTES) as [RouteKey, (typeof ROUTES)[RouteKey]][]).map(([key, option]) => {
          const active = selected === key;
          return <button key={key} type="button" aria-pressed={active} onClick={() => setSelected(key)} className={`flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all duration-200 ${active ? "border-brand-600 bg-brand-50/80 shadow-soft" : "border-sand-200/70 bg-white/70 hover:border-brand-300 hover:bg-brand-50/40"}`}>
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${active ? "bg-brand-700 text-white" : "bg-sand-50 text-brand-700"}`}><Icon name={option.icon} className="h-4 w-4" /></span>
            <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-ink-900">{option.label}</span>{active && <span className="mt-1 block text-xs leading-relaxed text-ink-600">{option.detail}</span>}</span>
            <span aria-hidden className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${active ? "border-brand-700 bg-brand-700 text-white" : "border-sand-300 text-transparent"}`}><Icon name="check" className="h-3 w-3" /></span>
          </button>;
        })}
      </div>
      <div aria-live="polite" className="mt-4 rounded-2xl bg-sand-50/80 p-4">
        <p className="eyebrow-ink">{selected === "goal" ? "Si ya tienes una meta" : "Lo que vas a lograr"}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-700">{selected === "goal" ? route.outcome : "Puedes empezar con una medición breve o hacer un análisis más profundo. Elige el nivel de detalle que necesitas."}</p>
        {selected === "goal" && <Link href={route.href} className="btn-primary mt-4 w-full sm:w-auto"><Icon name={route.icon} className="h-4 w-4" /> {route.action} <span aria-hidden>→</span></Link>}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <article className="card-quiet card-hover p-4 sm:p-5">
          <p className="eyebrow-ink">Lectura rápida · 8 señales</p>
          <h3 className="mt-2 text-base font-semibold text-ink-900">Chequeo</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">Mide datos actuales para detectar alertas y decidir qué indicador atender primero. Ideal si quieres una primera revisión concreta.</p>
          <Link href="/chequeo" className="btn-primary mt-4 w-full justify-center">Empezar chequeo <span aria-hidden>→</span></Link>
        </article>
        <article className="card-quiet card-hover p-4 sm:p-5">
          <p className="eyebrow-ink">Análisis guiado · 15 factores</p>
          <h3 className="mt-2 text-base font-semibold text-ink-900">Diagnóstico</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">Responde sobre tu negocio para entender causas, relaciones y oportunidades. Al final tendrás prioridades y un plan de acción.</p>
          <Link href="/diagnostico" className="btn-secondary mt-4 w-full justify-center">Empezar diagnóstico <span aria-hidden>→</span></Link>
        </article>
      </div>
      <div className="mt-4 border-t border-sand-200/70 pt-4"><p className="tiny">El consultor de marketing está disponible en el botón flotante de cualquier pantalla. Funciona sin diagnóstico y se enfoca en tus ideas y contenidos.</p></div>
    </div>
  );
}



