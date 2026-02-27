import { callLLM } from "./llm-client";
import { 
  RawInputObject, 
  ClarityGapReport, 
  ClarityGapReportSchema,
  ClarificationQuestions,
  ClarificationQuestionsSchema,
  NormalizedContext,
  NormalizedContextSchema,
  ProblemSpec,
  ProblemSpecSchema,
  SanitizedConstraints,
  SanitizedConstraintsSchema,
  ProductRequirementsDoc,
  ProductRequirementsDocSchema
} from "./pipeline-schemas";

function extractJSON(
  content: string,
  predicate?: (value: unknown) => boolean
): unknown {
  const parsedCandidates: unknown[] = [];

  try {
    parsedCandidates.push(JSON.parse(content));
  } catch {
    // ignore; content may include prose around JSON
  }

  const blockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/gi;
  let match: RegExpExecArray | null;
  while ((match = blockRegex.exec(content)) !== null) {
    const block = match[1];
    try {
      parsedCandidates.push(JSON.parse(block));
    } catch {
      // ignore invalid block
    }
  }

  if (parsedCandidates.length === 0) {
    throw new Error("No valid JSON found in response");
  }

  if (predicate) {
    const best = [...parsedCandidates].reverse().find(predicate);
    if (best !== undefined) return best;
  }

  return parsedCandidates[parsedCandidates.length - 1];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeClarityGapReport(value: unknown): ClarityGapReport {
  if (!isRecord(value)) {
    return { missing_fields: [], ambiguous_areas: ["Unstructured ambiguity report"], clarity_score: 50 };
  }

  const missing = Array.isArray(value.missing_fields)
    ? value.missing_fields.filter((x): x is string => typeof x === "string")
    : [];

  const ambiguous = Array.isArray(value.ambiguous_areas)
    ? value.ambiguous_areas.filter((x): x is string => typeof x === "string")
    : [];

  const scoreRaw = value.clarity_score;
  const clarityScore = typeof scoreRaw === "number"
    ? Math.max(0, Math.min(100, scoreRaw))
    : 50;

  return {
    missing_fields: missing,
    ambiguous_areas: ambiguous,
    clarity_score: clarityScore,
  };
}

function normalizeClarificationQuestions(value: unknown): ClarificationQuestions {
  if (!isRecord(value)) {
    return { questions: [], max_count: 7 };
  }

  const rawQuestions = Array.isArray(value.questions) ? value.questions : [];

  const questions = rawQuestions
    .map((q, index) => {
      if (!isRecord(q)) return null;

      const id = typeof q.id === "string" || typeof q.id === "number" ? String(q.id) : `q_${index + 1}`;
      const text = typeof q.text === "string" ? q.text : "Please provide more detail.";
      const typeRaw = typeof q.type === "string" ? q.type : "text";
      const type = typeRaw === "choice" || typeRaw === "scale" ? typeRaw : "text";

      let options: string[] | undefined;
      if (Array.isArray(q.options)) {
        options = q.options.filter((opt): opt is string => typeof opt === "string");
      } else if (isRecord(q.options) && type === "scale") {
        const labels = isRecord(q.options.labels)
          ? Object.values(q.options.labels).filter((opt): opt is string => typeof opt === "string")
          : [];
        const min = typeof q.options.min === "number" ? q.options.min : 1;
        const max = typeof q.options.max === "number" ? q.options.max : 5;
        options = labels.length > 0 ? labels : [`${min}`, `${max}`];
      }

      return {
        id,
        text,
        type,
        options,
      };
    })
    .filter((q): q is { id: string; text: string; type: "text" | "choice" | "scale"; options?: string[] } => q !== null)
    .slice(0, 7);

  const maxCountRaw = value.max_count;
  const max_count =
    typeof maxCountRaw === "number" && maxCountRaw > 0
      ? Math.min(7, maxCountRaw)
      : Math.min(7, Math.max(questions.length, 1));

  return { questions, max_count };
}

// --- DOMAIN 1: INPUT ---

// STEP 02: Ambiguity Detector Agent
export async function detectAmbiguity(input: RawInputObject): Promise<ClarityGapReport> {
  const prompt = `Analyze the following product input for ambiguity and missing information. 
  Input: ${JSON.stringify(input)}
  
  Return a JSON object with:
  - missing_fields: string[] (technical or product fields that are totally missing)
  - ambiguous_areas: string[] (areas that need more detail)
  - clarity_score: 0-100 (how ready is this for architecture design?)`;

  const response = await callLLM(prompt, "You are a senior product architect focusing on requirement precision.");
  try {
    const json = extractJSON(response, (candidate) =>
      isRecord(candidate) &&
      Array.isArray(candidate.missing_fields) &&
      Array.isArray(candidate.ambiguous_areas) &&
      typeof candidate.clarity_score === "number"
    );
    return ClarityGapReportSchema.parse(normalizeClarityGapReport(json));
  } catch (e) {
    console.error("Step 02 Fail:", e, "Response:", response);
    return { missing_fields: [], ambiguous_areas: ["High ambiguity detected in raw input"], clarity_score: 50 };
  }
}

// STEP 03: High-Leverage Clarification Agent
export async function generateClarificationQuestions(
  gapReport: ClarityGapReport, 
  input: RawInputObject
): Promise<ClarificationQuestions> {
  const prompt = `Based on the following ambiguity report and raw input, generate up to 7 high-leverage questions to resolve the most critical gaps.
  Gap Report: ${JSON.stringify(gapReport)}
  Raw Input: ${JSON.stringify(input)}
  
  Return a JSON object with a 'questions' array. Each question has: id, text, type (text|choice|scale), and optional options.`;

  const response = await callLLM(prompt, "You are an expert systems consultant. You ask only the most impactful questions.");
  try {
    const json = extractJSON(response, (candidate) =>
      isRecord(candidate) &&
      Array.isArray(candidate.questions)
    );
    return ClarificationQuestionsSchema.parse(normalizeClarificationQuestions(json));
  } catch (e) {
    console.error("Step 03 Fail:", e, "Response:", response);
    return { questions: [], max_count: 7 };
  }
}

// STEP 04: Clarification Intake Resolver
export function resolveClarificationIntake(
  input: RawInputObject, 
  answers?: Record<string, string>
): NormalizedContext {
  // Deterministic merge
  return {
    problem_statement: input.description,
    target_user: "General User", // Default to be refined in Step 05
    success_metrics: answers ? Object.values(answers) : [],
    constraints: {
      budget: input.budget_tier,
      scale: input.scale_hint,
      timeline: "unknown"
    },
    compliance: {
      is_required: !!input.compliance_hints,
      standards: input.compliance_hints ? [input.compliance_hints] : []
    }
  };
}

// --- DOMAIN 2: SPEC ---

// STEP 05: Core Problem Rewriter Agent
export async function rewriteProblemSpec(context: NormalizedContext): Promise<ProblemSpec> {
  const prompt = `Rewrite the following problem/context into a measurable, engineering-grade problem specification.
  Context: ${JSON.stringify(context)}
  
  Return a JSON object with:
  - clean_statement: precise description
  - non_goals: string[]
  - success_criteria: Array<{ metric, target, measurable: boolean }>`;

  const response = await callLLM(prompt, "You are a requirements engineer. You turn vague ideas into measurable criteria.");
  try {
    const json = extractJSON(response);
    return ProblemSpecSchema.parse(json);
  } catch (e) {
    console.error("Step 05 Fail:", e, "Response:", response);
    return { clean_statement: context.problem_statement, non_goals: [], success_criteria: [] };
  }
}

// STEP 06: Constraint Normalizer Agent
export function normalizeConstraints(context: NormalizedContext): SanitizedConstraints {
  // Pure deterministic rule engine
  const contradictions: string[] = [];
  if (context.constraints.scale === "global" && context.constraints.budget === "low") {
    contradictions.push("Global scale requires infrastructure budget (detected: low)");
  }

  const budget =
    context.constraints.budget === "low" ||
    context.constraints.budget === "moderate" ||
    context.constraints.budget === "high" ||
    context.constraints.budget === "enterprise"
      ? context.constraints.budget
      : "moderate";

  const scale =
    context.constraints.scale === "small" ||
    context.constraints.scale === "medium" ||
    context.constraints.scale === "large" ||
    context.constraints.scale === "global"
      ? context.constraints.scale
      : "small";

  return {
    budget,
    scale,
    timeline: "medium",
    compliance: context.compliance.standards,
    auth_required: true,
    db_type: "relational",
    contradiction_flags: contradictions
  };
}

// STEP 07: PRD Generator Agent
export async function generatePRD(
  spec: ProblemSpec, 
  constraints: SanitizedConstraints, 
  context: NormalizedContext
): Promise<ProductRequirementsDoc> {
  const prompt = `Generate a high-fidelity Product Requirements Document (PRD) JSON.
  
  CONTEXT:
  Problem Spec: ${JSON.stringify(spec)}
  Sanitized Constraints: ${JSON.stringify(constraints)}
  Normalized Context: ${JSON.stringify(context)}

  REQUIRED JSON KEYS (Strictly follow these):
  - id: (string)
  - personas: (string array)
  - user_journeys: (string array)
  - features: (array of objects with { id, name, description, priority, requirements: string[] })
  - acceptance_criteria: (string array)
  - non_functional_requirements: (string array)
  - edge_cases: (string array)

  Ensure 'acceptance_criteria' maps to the success criteria provided in the context.
  Do NOT include 'success_criteria' or 'constraints' keys in the root level.
  Return ONLY the JSON object.`;

  const response = await callLLM(prompt, "You are a Principal Product Manager. You architect high-fidelity PRDs.");
  try {
    const json = extractJSON(response);
    return ProductRequirementsDocSchema.parse({ ...json, id: `prd_${Date.now()}` });
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "name" in e && (e as { name?: string }).name === "ZodError") {
      const withFormat = e as { format?: () => unknown };
      if (typeof withFormat.format === "function") {
        console.error("Step 07 Zod Detail:", JSON.stringify(withFormat.format(), null, 2));
      }
    }
    console.error("Step 07 Validation Failure. Falling back to structured response. Response was:", response);
    
    // Safety Fallback: Return a minimum viable PRD instead of crashing the whole pipeline
    return {
      id: `prd_fallback_${Date.now()}`,
      personas: ["Target User"],
      user_journeys: ["Core Journey"],
      features: [
        { 
          id: "F1", 
          name: "Core Platform", 
          description: "Primary system implementation", 
          priority: "P0" 
        }
      ],
      acceptance_criteria: ["System is functional"],
      non_functional_requirements: ["Stability", "Security"],
      edge_cases: ["Unexpected input"]
    };
  }
}
