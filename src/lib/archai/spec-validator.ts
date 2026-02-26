import { Blueprint } from "@/db/output-schema";

export interface Critique {
  id: string;
  field: string;
  severity: "low" | "medium" | "high";
  message: string;
  fixSuggestion?: string;
}

export interface ValidationResult {
  passed: boolean;
  critiques: Critique[];
  score: number;
}

/**
 * Domain 5.5: Spec Consistency Evaluator
 * Checks for logical contradictions between domains.
 */
export function validateBlueprintConsistency(blueprint: Blueprint): ValidationResult {
  const critiques: Critique[] = [];
  
  // 1. Check Product vs Architecture Scale
  const isHighScaleMode = blueprint.architectureMode === "Enterprise Grade" || blueprint.architectureMode === "VC Ready";
  const hasScalingInfrastructure = blueprint.services.some((s: { name: string }) => s.name === "Message Broker" || s.name === "Distributed Cache");
  
  if (isHighScaleMode && !hasScalingInfrastructure) {
    critiques.push({
      id: "v-001",
      field: "services",
      severity: "high",
      message: "Architecture claims High-Scale readiness but lacks asynchronous messaging or distributed caching.",
      fixSuggestion: "Add Kafka or Redis to service decomposition."
    });
  }

  // 2. Check PRD Non-Goals vs Engineering Contracts
  const hasMobilePathInEngineering = blueprint.engineeringSpec.folderStructure.some((f: string) => f.includes("mobile") || f.includes("ios"));
  const isWebOnlyNonGoal = blueprint.productSpec.nonGoals.some((g: string) => g.toLowerCase().includes("no native mobile"));

  if (hasMobilePathInEngineering && isWebOnlyNonGoal) {
    critiques.push({
      id: "v-002",
      field: "engineeringSpec.folderStructure",
      severity: "medium",
      message: "Engineering spec includes mobile paths despite 'Web-first' non-goal in PRD.",
      fixSuggestion: "Remove mobile-specific folders from structure."
    });
  }

  // 3. Database Selection vs Scale Criteria
  const isGlobalScale = blueprint.startupSummary.includes("Global");
  const usesLocalDb = blueprint.recommendedStack.database.toLowerCase().includes("supabase") || blueprint.recommendedStack.database.toLowerCase().includes("neon");

  if (isGlobalScale && usesLocalDb) {
    critiques.push({
      id: "v-003",
      field: "recommendedStack.database",
      severity: "high",
      message: "Global summary suggests multi-region needs, but standard PostgreSQL (Supabase/Neon) without read-replicas or sharding is selected.",
      fixSuggestion: "Switch to CockroachDB or Aurora with Global Replicas."
    });
  }

  const score = Math.max(0, 100 - (critiques.length * 15));
  
  return {
    passed: critiques.length === 0,
    critiques,
    score
  };
}
