import { Blueprint } from "@/db/output-schema";
import { Critique } from "../spec-validator";

/**
 * Domain 2.5: PRD Consistency Validator
 */
export function validatePRD(blueprint: Blueprint): Critique[] {
  const critiques: Critique[] = [];
  const prd = blueprint.productSpec;

  // 1. Success Metrics Measurability
  const hasVagueMetrics = prd.successCriteria.some(c => 
    c.toLowerCase().includes("easy to use") || 
    c.toLowerCase().includes("good experience")
  );
  
  if (hasVagueMetrics) {
    critiques.push({
      id: "prd-001",
      field: "productSpec.successCriteria",
      severity: "medium",
      message: "Success criteria contains non-measurable qualitative terms.",
      fixSuggestion: "Replace qualitative terms with numeric KPIs (e.g., <3min onboarding)."
    });
  }

  // 2. Non-Goal Conflicts
  const hasMobileJourney = prd.coreJourneys.some(j => j.toLowerCase().includes("mobile") || j.toLowerCase().includes("app store"));
  const hasMobileNonGoal = prd.nonGoals.some(g => g.toLowerCase().includes("no native mobile"));

  if (hasMobileJourney && hasMobileNonGoal) {
    critiques.push({
      id: "prd-002",
      field: "productSpec.coreJourneys",
      severity: "high",
      message: "Contradiction: Core journeys include mobile flows despite a 'No Native Mobile' non-goal.",
      fixSuggestion: "Remove mobile journeys or remove the non-goal."
    });
  }

  return critiques;
}
