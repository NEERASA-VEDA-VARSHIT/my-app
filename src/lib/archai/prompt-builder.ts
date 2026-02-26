import { BlueprintSchema } from "../../db/output-schema";
import { 
  type BlueprintInput, 
  targetUserLabels, 
  scaleLabels, 
  architectureModeLabels, 
  budgetLabels, 
  timelineLabels 
} from "../../db/schema";
import { type Advisory } from "./constraint-analyzer";

export function buildSystemPrompt() {
  return `You are a senior startup CTO and expert systems architect.
Your goal is to design a high-quality, fundable architecture blueprint for a new startup.

Constraints:
- Be opinionated and decisive.
- Justify your tradeoffs (e.g., why this DB over that one).
- Optimize for the given budget and timeline.
- MUST follow this technical tone: Professional, Senior, CTO-level.
- Return ONLY a strict JSON object that matches the provided schema.

Output Schema:
${JSON.stringify((BlueprintSchema as any)._def, null, 2)}
`;
}

export function buildUserPrompt(input: BlueprintInput, advisory?: Advisory) {
  const modeLabel = architectureModeLabels[input.architectureMode].label;
  const scaleLabel = scaleLabels[input.expectedScale];

  const advisoryContext = advisory
    ? `
CRITICAL ADVISORY CONTEXT:
- Stability Score: ${advisory.stabilityScore}%
- Risk Level: ${advisory.riskLevel}
- Tensions Detected: ${advisory.tensions.map(t => t.title).join(", ") || "None"}
`
    : "";

  return `
Role: Senior CTO and AI Systems Architect.
Task: Generate a comprehensive "Project Manifest" for a new startup, following the ArchAI Autonomous Flow.

STAGES TO COVER:
1. DOMAIN 2: Product Spec (PRD) - Define personas, journeys, features, and non-goals.
2. DOMAIN 3: Architecture & Design - System synthesis, stack bias resolution, and stability assessment.
3. DOMAIN 4: Engineering Planning - Detailed API contracts (schemas), Database models (tables/indexes), and Repo layout.

INPUT CONSTRAINTS:
- Product: ${input.description}
- Target Users: ${input.targetUsers}
- Expected Scale: ${scaleLabel}
- Architecture Mode: ${modeLabel}
- Core Features: ${input.coreFeatures}
- Budget: ${input.budget}
- Timeline: ${input.timeline}
${advisoryContext}

OUTPUT FORMAT:
Return a strict JSON Project Manifest that matches the provided BlueprintSchema.
Be decisive, opinionated, and technical.
`;
}
