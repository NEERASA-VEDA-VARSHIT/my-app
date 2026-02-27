import { API_CONFIG } from "./config";

export async function callLLM(prompt: string, systemInstructions?: string): Promise<string> {
  const systemPrompt = systemInstructions || "You are an expert technical architect. Return only JSON unless specified otherwise.";

  try {
    const response = await fetch(API_CONFIG.BASE_URL + "/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_CONFIG.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: API_CONFIG.MODEL_ID,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.1, // Lower temperature for more deterministic JSON
        max_tokens: 2000
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.error("LLM Call Failure:", error);
    return "";
  }
}

/**
 * Lightweight Groq Client used for "Live Mode" descriptive seasoning.
 */
export async function promptLLM(prompt: string, context: string): Promise<string> {
  const systemPrompt = `
  You are the "ArchAI Decision-Support Intelligence".
  Your role is to enrich architectural narratives based on STRICT technical patterns.
  GUARDRAILS:
  1. ONLY use the provided [VALIDATED ARCHITECTURE PATTERNS].
  2. If context is insufficient, provide a high-level technical best-practice without hallucinating specific tool versions not mentioned.
  3. NEVER mention the word "LLM", "AI", or "Assistant". Sound like a Principal Engineer.
  4. Output must be raw text. No markdown blocks unless specifically requested.
  5. Max length: 3 sentences.
  
  TECHNICAL CONTEXT:
  ${context}
  `;

  return callLLM(prompt, systemPrompt);
}
