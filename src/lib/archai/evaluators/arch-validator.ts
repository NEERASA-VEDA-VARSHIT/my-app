import { Blueprint } from "@/db/output-schema";
import { Critique } from "../spec-validator";

/**
 * Domain 3.5: Architecture Feasibility Guard
 */
export function validateArchitecture(blueprint: Blueprint): Critique[] {
  const critiques: Critique[] = [];
  const stack = blueprint.recommendedStack;
  const services = blueprint.services;

  // 1. Data Mode vs Infra
  if (blueprint.architectureMode === "Enterprise Grade" && stack.infra.toLowerCase().includes("vercel")) {
    critiques.push({
      id: "arch-001",
      field: "recommendedStack.infra",
      severity: "medium",
      message: "Enterprise Grade mode suggested Vercel; AWS/EKS is preferred for corporate compliance and fine-grained control.",
      fixSuggestion: "Switch infrastructure to AWS (EKS/Terraform)."
    });
  }

  // 2. Auth Consistency
  const hasUserPersona = blueprint.productSpec.personas.some(p => p.toLowerCase().includes("user") || p.toLowerCase().includes("customer"));
  const hasAuthService = services.some(s => s.name.toLowerCase().includes("auth") || s.name.toLowerCase().includes("identity"));

  if (hasUserPersona && !hasAuthService) {
    critiques.push({
      id: "arch-002",
      field: "services",
      severity: "high",
      message: "User personas detected but no dedicated Auth/Identity service assigned.",
      fixSuggestion: "Add 'Auth & Identity' service to decomposition."
    });
  }

  return critiques;
}
