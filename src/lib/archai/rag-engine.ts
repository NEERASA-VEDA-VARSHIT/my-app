import archPatterns from "../../../rag-knowledge/architecture-patterns.json";

export interface TechPattern {
  id: string;
  name: string;
  patterns: string[];
}

/**
 * Lightweight RAG Engine (Option A: Keyword-Based)
 * 
 * Purpose: Extract relevant technical advice based on PRD and 
 * Architecture features without expensive vector DB lookups.
 */
export function retrieveRelevantPatterns(description: string, features: string[]): TechPattern[] {
  const normalizedText = (description + " " + features.join(" ")).toLowerCase();
  const matchedPatterns: TechPattern[] = [];

  for (const group of archPatterns) {
    // Check if any keyword in the group exists in the input description or features
    const hasMatch = group.keywords.some(kw => normalizedText.includes(kw.toLowerCase()));
    
    if (hasMatch) {
      matchedPatterns.push({
        id: group.id,
        name: group.name,
        patterns: group.patterns
      });
    }
  }

  return matchedPatterns;
}

/**
 * Contextual Context Injunction
 * Formats retrieved patterns for LLM grounding.
 */
export function formatRAGContext(patterns: TechPattern[]): string {
  if (patterns.length === 0) return "";

  let context = "\n--- VALIDATED ARCHITECTURE PATTERNS (CULTURAL GROUNDING) ---\n";
  patterns.forEach(p => {
    context += `[${p.name}]\n`;
    p.patterns.forEach(detail => {
      context += `- ${detail}\n`;
    });
  });
  context += "------------------------------------------------------------\n";
  
  return context;
}
