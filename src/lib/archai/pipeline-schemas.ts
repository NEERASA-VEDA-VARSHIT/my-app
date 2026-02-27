import { z } from "zod";

// --- DOMAIN 1: INPUT ---

// STEP 01: Raw Context
export const RawInputObjectSchema = z.object({
  description: z.string(),
  stack_hints: z.string().optional(),
  compliance_hints: z.string().optional(),
  budget_tier: z.enum(["low", "moderate", "high", "enterprise", "unknown"]).default("unknown"),
  scale_hint: z.enum(["small", "medium", "large", "global", "unknown"]).default("unknown"),
});
export type RawInputObject = z.infer<typeof RawInputObjectSchema>;

// STEP 02: Ambiguity Detection
export const ClarityGapReportSchema = z.object({
  missing_fields: z.array(z.string()),
  ambiguous_areas: z.array(z.string()),
  clarity_score: z.number().min(0).max(100),
});
export type ClarityGapReport = z.infer<typeof ClarityGapReportSchema>;

// STEP 03: Clarification
export const ClarificationQuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  type: z.enum(["text", "choice", "scale"]),
  options: z.array(z.string()).optional(),
});

export const ClarificationQuestionsSchema = z.object({
  questions: z.array(ClarificationQuestionSchema),
  max_count: z.number().max(7),
});
export type ClarificationQuestions = z.infer<typeof ClarificationQuestionsSchema>;

// STEP 04: Normalized Context (The Immutable source of truth)
export const NormalizedContextSchema = z.object({
  problem_statement: z.string(),
  target_user: z.string(),
  success_metrics: z.array(z.string()),
  constraints: z.object({
    budget: z.string(),
    scale: z.string(),
    timeline: z.string(),
  }),
  compliance: z.object({
    is_required: z.boolean(),
    standards: z.array(z.string()),
  }),
});
export type NormalizedContext = z.infer<typeof NormalizedContextSchema>;

// --- DOMAIN 2: SPEC ---

// STEP 05: Problem Specification
export const ProblemSpecSchema = z.object({
  clean_statement: z.string(),
  non_goals: z.array(z.string()),
  success_criteria: z.array(z.object({
    metric: z.string(),
    target: z.string(),
    measurable: z.boolean(),
  })),
});
export type ProblemSpec = z.infer<typeof ProblemSpecSchema>;

// STEP 06: Sanitization
export const SanitizedConstraintsSchema = z.object({
  budget: z.enum(["low", "moderate", "high", "enterprise"]),
  scale: z.enum(["small", "medium", "large", "global"]),
  timeline: z.enum(["fast", "medium", "standard"]),
  compliance: z.array(z.string()),
  auth_required: z.boolean(),
  db_type: z.enum(["relational", "document", "auto"]),
  contradiction_flags: z.array(z.string()),
});
export type SanitizedConstraints = z.infer<typeof SanitizedConstraintsSchema>;

// STEP 07: Product Requirements Document (PRD)
const PriorityEnum = z.preprocess((val) => {
  if (typeof val === "string") {
    const lower = val.toLowerCase();
    if (lower === "high" || lower === "p0") return "P0";
    if (lower === "medium" || lower === "p1") return "P1";
    if (lower === "low" || lower === "p2") return "P2";
  }
  return val;
}, z.enum(["P0", "P1", "P2"]));

export const ProductRequirementsDocSchema = z.object({
  id: z.string().default(() => `prd_${Date.now()}`),
  personas: z.array(z.string()).default([]),
  user_journeys: z.array(z.string()).default([]),
  features: z.array(z.object({
    id: z.string(),
    name: z.string().optional(),
    description: z.string(),
    priority: PriorityEnum.default("P1"),
    requirements: z.array(z.union([
      z.string(),
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        description: z.string(),
        priority: PriorityEnum.optional(),
      }).passthrough()
    ])).optional(),
  }).passthrough()).default([]),
  acceptance_criteria: z.array(z.string()).default([]),
  non_functional_requirements: z.array(z.string()).default([]),
  edge_cases: z.array(z.string()).default([]),
}).passthrough();
export type ProductRequirementsDoc = z.infer<typeof ProductRequirementsDocSchema>;
