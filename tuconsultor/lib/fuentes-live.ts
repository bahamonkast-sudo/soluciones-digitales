// Búsqueda de fuentes REALES en internet por dolor (capa live).
// Usa Tavily si hay TAVILY_API_KEY; si no, devuelve [] y el motor trabaja
// con la base verificada local. Nunca inventa: sin resultados, lo declara.
export interface FuenteLive { titulo: string; url: string; medio: string }

export async function buscarFuentes(tema: string, top = 3): Promise<FuenteLive[]> {
  const key = process.env.TAVILY_API_KEY;
  if (!key) return [];
  try {
    const r = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: key, query: tema, search_depth: "advanced", max_results: top, include_answer: false }),
      signal: AbortSignal.timeout(20000),
    });
    if (!r.ok) return [];
    const j = await r.json();
    return ((j.results || []) as any[])
      .filter((x) => x.url && x.title)
      .slice(0, top)
      .map((x) => ({ titulo: String(x.title).slice(0, 120), url: String(x.url), medio: "web" }));
  } catch {
    return [];
  }
}
