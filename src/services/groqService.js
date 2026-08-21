export const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
export const GROQ_MODEL = 'groq/compound-mini';

/**
 * Realiza una petición completa (no streaming) a Groq.
 * La API key se recibe por parámetro (la del propio usuario), nunca se
 * almacena ni se expone en el bundle.
 * @param {Array} messages - Arreglo de mensajes [{role: 'system', content: '...'}, {role: 'user', content: '...'}]
 * @param {string} apiKey - API Key de Groq del usuario (solo en memoria)
 * @returns {Promise<string>} - El texto de respuesta
 */
export async function fetchGroqCompletion(messages, apiKey) {
  if (!apiKey) throw new Error("Ingresa tu API Key de Groq para generar el análisis.");

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: messages,
      temperature: 0.75,
      max_tokens: 8192
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Error en Groq API: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'Error: No se pudo generar la respuesta.';
}

/**
 * Realiza una petición con Streaming a Groq.
 * La API key se recibe por parámetro (la del propio usuario), nunca se
 * almacena ni se expone en el bundle.
 * @param {Array} messages - Arreglo de mensajes
 * @param {string} apiKey - API Key de Groq del usuario (solo en memoria)
 * @param {Function} onChunk - Callback(textoChunk) para recibir las partes
 * @returns {Promise<void>}
 */
export async function fetchGroqStreaming(messages, apiKey, onChunk) {
  if (!apiKey) throw new Error("Ingresa tu API Key de Groq.");

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: messages,
      stream: true,
      temperature: 0.7,
      max_tokens: 1024
    })
  });

  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\n');
    
    for (const line of lines) {
      if (line.trim() === '') continue;
      if (line.trim() === 'data: [DONE]') return;
      
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.replace('data: ', ''));
          if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
            onChunk(data.choices[0].delta.content);
          }
        } catch (e) {
          console.error("Error parseando chunk JSON:", e);
        }
      }
    }
  }
}
