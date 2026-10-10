import { NextRequest, NextResponse } from "next/server";
import { scoreAnswers, saludGeneral, detectarCuellos } from "../../../lib/scoring";
import { evaluateRules } from "../../../lib/rules";
import { retrieveKnowledge } from "../../../lib/knowledge";
import { groqInsight } from "../../../lib/groq";

// Agentic loop: contexto → reglas → conocimiento relevante → Groq → validación → respuesta + fallback.
export async function POST(req: NextRequest) {
  const t0 = Date.now();
  const { perfil, answers, groqKey, scores: scoresIn } = await req.json();
  const scores = scoresIn || scoreAnswers(answers || {});
  const salud = saludGeneral(scores);
  const cuellos = detectarCuellos(scores);
  const rules = evaluateRules(answers || {});
  const rawTags: string[] = rules.flatMap((r) => r.solutions).map((s) => s.split("_")[0]).concat(["conversion", "estrategia"]);
  const tags: string[] = rawTags.filter((t, i) => rawTags.indexOf(t) === i);
  const docs = retrieveKnowledge(tags as string[]);
  const ctx = { perfil, scores, salud, cuellos, rules: rules.slice(0, 6), conocimiento: docs.map((d) => d.titulo), extras: { nicho: answers?.nicho, objetivo: answers?.objetivo, cierre: answers?.cierre, dolor: answers?.dolor, intentos: answers?.intentos } };
  const { insight, fallback, log } = await groqInsight(ctx, "Sintetiza el diagnóstico en 3 frases accionables y priorizadas.", typeof groqKey === "string" ? groqKey : undefined);
  const resumen = insight?.explanation ||
    (cuellos[0]?.mensaje ? `${cuellos[0].mensaje} Prioridad: ${rules[0]?.need || "ordenar seguimiento y oferta"}. ${fallback ? "Consejo local verificado por reglas." : ""}` : `Salud ${salud}/100. Empieza por lo marcado como AHORA en tu plan.`);
  return NextResponse.json({ salud, scores, cuellos, rules, docs, resumen, insight, fallback, log: fallback ? { ...log, ms: Date.now() - t0 } : log });
}

