import { BlueprintInput } from "../../db/schema"

export type TensionLevel = "low" | "medium" | "high"

export interface ConstraintTension {
  id: string
  title: string
  description: string
  severity: TensionLevel
}

export interface Advisory {
  tensions: ConstraintTension[]
  stabilityScore: number
  riskLevel: "Low" | "Medium" | "High"
  overrideRecommended: boolean
  clarificationRequired: boolean
  clarificationQuestions: string[]
}

const HIGH_INTENSITY_KEYWORDS = [
  "real-time", "video", "ai", "blockchain", "global", "sync", "pci", "compliance"
]

export function analyzeConstraints(input: BlueprintInput): Advisory {
  const tensions: ConstraintTension[] = []
  const clarificationQuestions: string[] = []
  let scoreSync = 100

  // 1. Scale vs Budget Tension
  if (input.expectedScale === "10M+" && input.budget === "low") {
    tensions.push({
      id: "scale_budget_conflict",
      title: "Scale/Budget Mismatch",
      description: "Supporting 10M+ users on a low budget is structurally unstable. Managed services may exceed budget quickly.",
      severity: "high",
    })
    scoreSync -= 35
  }

  // 2. Timeline vs Architecture Mode
  if (input.timeline === "3_months" && input.architectureMode === "enterprise_grade") {
    tensions.push({
      id: "timeline_complexity_conflict",
      title: "Complexity/Velocity Conflict",
      description: "Building an Enterprise-grade system in 3 months risks significant technical debt.",
      severity: "high",
    })
    scoreSync -= 25
  }

  // 3. Feature Intensity Check
  const detectedHighIntensity = HIGH_INTENSITY_KEYWORDS.filter(kw => 
    input.coreFeatures.toLowerCase().includes(kw.toLowerCase()) || 
    input.description.toLowerCase().includes(kw.toLowerCase())
  );

  if (detectedHighIntensity.length > 2 && input.architectureMode === "lean_mvp") {
    tensions.push({
      id: "feature_overload",
      title: "Feature Density Crisis",
      description: "Too many high-intensity features detected for a Lean MVP. Consider descope.",
      severity: "high",
    })
    scoreSync -= 20
  }

  // 4. Clarification Triggers
  let clarificationRequired = clarificationQuestions.length > 0;
  
  if (input.description.length < 20) {
    clarificationRequired = true;
    clarificationQuestions.push("Could you provide more detail on the core value proposition?");
  }
  
  if (detectedHighIntensity.includes("ai") && !input.coreFeatures.toLowerCase().includes("model")) {
    clarificationQuestions.push("For AI features, do you intend to use third-party APIs or host custom models?")
  }

  const finalScore = Math.max(0, scoreSync)
  
  return {
    tensions,
    stabilityScore: finalScore,
    riskLevel: finalScore > 75 ? "Low" : finalScore > 40 ? "Medium" : "High",
    overrideRecommended: finalScore < 40,
    clarificationRequired: clarificationQuestions.length > 0,
    clarificationQuestions
  }
}
