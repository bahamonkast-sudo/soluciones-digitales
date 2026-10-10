"use client";
import { useEffect, useState } from "react";
import { FACTORES } from "../lib/factors";

// El producto se llama "Auditor Estratégico 360°", así que el hero muestra
// literalmente eso: un barrido de radar que recorre los 15 factores y se
// detiene en cada uno para decir qué está midiendo. Sin caja: vive sobre el
// fondo, con un núcleo claro en el centro.
export default function Radar360() {
  const [i, setI] = useState(0);
  const [girar, setGirar] = useState(true);

  useEffect(() => {
    // Si el usuario pide menos movimiento, dejamos el radar quieto.
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setGirar(false);
      return;
    }
    const t = window.setInterval(() => setI((n) => (n + 1) % FACTORES.length), 1900);
    return () => window.clearInterval(t);
  }, []);

  const activo = FACTORES[i];

  return (
    // overflow-hidden: el barrido gira y su caja rotada sobresaldría del
    // contenedor, provocando scroll horizontal en móvil.
    <div className="relative mx-auto aspect-square w-full max-w-[21rem] overflow-hidden rounded-full" role="img" aria-label={`Radar de los 15 factores del diagnóstico, midiendo ${activo.nombre}`}>
      {/* Anillos concéntricos */}
      {[0, 14, 28, 42].map((inset) => (
        <span key={inset} aria-hidden className="absolute rounded-full border border-sand-200/80" style={{ inset: `${inset}%` }} />
      ))}
      {/* Cruz de referencia */}
      <span aria-hidden className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-sand-200/50" />
      <span aria-hidden className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-sand-200/50" />

      {/* Barrido del escáner */}
      <span aria-hidden className={`radar-sweep absolute inset-0 rounded-full ${girar ? "" : "opacity-0"}`} />

      {/* Los 15 factores alrededor del círculo */}
      {FACTORES.map((f, n) => {
        const ang = (n / FACTORES.length) * Math.PI * 2 - Math.PI / 2;
        const r = 43;
        const on = n === i;
        return (
          <span
            key={f.id}
            aria-hidden
            className={`absolute rounded-full transition-all duration-700 ease-smooth ${
              on ? "radar-halo h-2.5 w-2.5 bg-brand-600" : "h-1.5 w-1.5 bg-brand-300/80"
            }`}
            style={{ left: `${50 + r * Math.cos(ang)}%`, top: `${50 + r * Math.sin(ang)}%`, transform: "translate(-50%, -50%)" }}
          />
        );
      })}

      {/* Núcleo: lo que se está midiendo ahora */}
      <div className="absolute inset-[31%] grid place-items-center rounded-full bg-ivory/90 shadow-soft backdrop-blur-sm">
        <div className="px-5 text-center">
          <p className="text-2xs font-semibold uppercase tracking-kicker text-brand-700">Midiendo</p>
          <p className="ts-sub mt-1.5 text-sm font-semibold leading-tight text-ink-900">{activo.nombre}</p>
          <p className="num mt-1.5 text-2xs text-ink-400">
            {i + 1} / {FACTORES.length}
          </p>
        </div>
      </div>
    </div>
  );
}

