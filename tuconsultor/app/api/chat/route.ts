import { NextRequest, NextResponse } from "next/server";
import { groqChat } from "../../../lib/groq";
import { buscarFuentes } from "../../../lib/fuentes-live";
import { scoreAnswers, saludGeneral, detectarCuellos } from "../../../lib/scoring";
import { evaluateRules } from "../../../lib/rules";
import { solutionById } from "../../../lib/solutions";
export async function POST(req: NextRequest) {
  const { perfil, answers, history, groqKey, scores: scoresIn } = await req.json();
  const scores = scoresIn || scoreAnswers(answers || {});
  const rules = evaluateRules(answers || {});
  const solIds = rules.flatMap((r) => r.solutions).filter((s, i, a) => a.indexOf(s) === i).slice(0, 6);
  const soluciones = solIds.map((id) => solutionById(id)).filter(Boolean).map((s: any) => ({
    solution_id: s.solution_id, name: s.name, description: s.description,
    when_to_use: s.when_to_use, when_not_to_use: s.when_not_to_use,
    cost_level: s.cost_level, kpis: s.kpis,
  }));
  const ultimaPregunta = ((history || []) as any[]).filter((h) => h.role === "user").slice(-1)[0]?.content || "";
  // Capa live: fuentes reales de internet por dolor (si hay TAVILY_API_KEY;
  // si no, la IA trabaja con la base verificada y lo declara).
  const fuentesWeb = await buscarFuentes(`marketing pyme negocio ${String(ultimaPregunta).slice(0, 150)}`, 3).catch(() => []);
  const ctx = {
    perfil, scores, salud: saludGeneral(scores),
    cuellos: detectarCuellos(scores),
    rules: rules.map((r) => ({ need: r.need, solutions: r.solutions, priority: r.priority, reason: r.reason })),
    soluciones,
    extras: { nicho: answers?.nicho, objetivo: answers?.objetivo, cierre: answers?.cierre, dolor: answers?.dolor, intentos: answers?.intentos, pais: perfil?.mercado },
    fuentesWeb,
  };
  const { answer, fallback } = await groqChat(ctx, history || [], typeof groqKey === "string" ? groqKey : undefined);
  return NextResponse.json({ answer, fallback });
}

