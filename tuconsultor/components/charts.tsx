"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import type { ReactNode } from "react";
// Paleta del sistema visual "Cálido y elevado": brand (verde) para las series,
// sand para la rejilla y las líneas de los ejes, ink solo en las etiquetas y
// gold en los puntos activos. El tooltip es una caja más del sistema: borde
// cálido, radio amable y relieve suave. Sin cambios en datos ni en lógica.
const BRAND_600 = "#15803d";
const BRAND_500 = "#16a34a";
const SAND_100 = "#FBF3E6";
const SAND_200 = "#F1E5D2";
const SAND_300 = "#E8D5B0";
const IVORY = "#FFFDF8";
const INK_500 = "#64748b";
const GOLD_500 = "#D99B27";
const AXIS_TICK = { fontSize: 10, fill: INK_500 };
const TOOLTIP_STYLE = { borderRadius: 16, border: `1px solid ${SAND_200}`, background: IVORY, color: "#0f172a", boxShadow: "0 1px 2px rgba(122,92,44,.06), 0 10px 26px -14px rgba(122,92,44,.28)" };
function ChartShell({ label, className, children }: { label: string; className: string; children: ReactNode }) {
  return (<div className={className} role="img" aria-label={label}>{children}</div>);
}
export function Radar15({ data, ariaLabel }: { data: { factor: string; v: number }[]; ariaLabel?: string }) {
  return (<ChartShell className="h-80" label={ariaLabel || "Radar de factores"}><ResponsiveContainer><RadarChart data={data}><PolarGrid stroke={SAND_300} strokeOpacity={0.7} /><PolarAngleAxis dataKey="factor" tick={AXIS_TICK} /><Radar dataKey="v" stroke={BRAND_600} fill={BRAND_500} fillOpacity={0.35} dot={{ r: 2, fill: GOLD_500, stroke: BRAND_600 }} activeDot={{ r: 4, fill: GOLD_500 }} /><Tooltip contentStyle={TOOLTIP_STYLE} /></RadarChart></ResponsiveContainer></ChartShell>);
}
export function Bars({ data, ariaLabel }: { data: { etapa: string; valor: number }[]; ariaLabel?: string }) {
  return (<ChartShell className="h-64" label={ariaLabel || "Gráfica de barras por etapa"}><ResponsiveContainer><BarChart data={data} layout="vertical"><XAxis type="number" domain={[0, 100]} tick={AXIS_TICK} stroke={SAND_300} /><YAxis type="category" dataKey="etapa" width={110} tick={AXIS_TICK} stroke={SAND_300} /><Tooltip cursor={{ fill: SAND_100 }} contentStyle={TOOLTIP_STYLE} /><Bar dataKey="valor" fill={BRAND_500} radius={[0, 8, 8, 0]} /></BarChart></ResponsiveContainer></ChartShell>);
}

