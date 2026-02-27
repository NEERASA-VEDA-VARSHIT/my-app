import { FullRequirementsData } from "../../db/requirements-schema"

export type TensionLevel = "low" | "medium" | "high"

export interface ConstraintTension {
  id: string
  title: string
  description: string
  severity: TensionLevel
}

export interface ClarificationQuestion {
  id: string
  label: string
  type: "text" | "choice" | "boolean"
  options?: string[]
}

export interface Advisory {
  tensions: ConstraintTension[]
  stabilityScore: number
  riskLevel: "Low" | "Medium" | "High"
  overrideRecommended: boolean
  clarificationRequired: boolean
  questions: ClarificationQuestion[]
}

const HIGH_INTENSITY_KEYWORDS = [
  "real-time", "video", "ai", "blockchain", "global", "sync", "pci", "compliance"
]

export function analyzeConstraints(input: FullRequirementsData): Advisory {
  const tensions: ConstraintTension[] = []
  const questions: ClarificationQuestion[] = []
  let scoreSync = 100

  // 1. Scale vs Budget Tension
  if (input.usersAtLaunch === "over_1m" && (input.monthlyInfrastructureBudget === "under_50" || input.monthlyInfrastructureBudget === "50_to_200")) {
    tensions.push({
      id: "scale_budget_conflict",
      title: "Scale/Budget Mismatch",
      description: "Supporting 1M+ users on a <$200 budget is structurally unstable. Managed services may exceed budget quickly.",
      severity: "high",
    })
    scoreSync -= 35
  }

  // 2. Timeline vs Architecture Mode
  if (input.mvpTimelineDays < 60 && input.priorityRank?.includes("scalability")) {
    tensions.push({
      id: "timeline_complexity_conflict",
      title: "Complexity/Velocity Conflict",
      description: "Building an highly scalable Enterprise-grade system in <60 months risks significant technical debt.",
      severity: "high",
    })
    scoreSync -= 25
  }

  // 3. Feature Intensity Check
  const detectedHighIntensity = HIGH_INTENSITY_KEYWORDS.filter(kw => 
    input.solutionSummary.toLowerCase().includes(kw.toLowerCase()) || 
    input.problemStatement.toLowerCase().includes(kw.toLowerCase())
  );

  if (detectedHighIntensity.length > 2 && input.fundingStage === "bootstrapped") {
    tensions.push({
      id: "feature_overload",
      title: "Feature Density Crisis",
      description: "Too many high-intensity features detected for a lean bootstrapped MVP. Consider descope.",
      severity: "high",
    })
    scoreSync -= 20
  }

  // 4. Clarification Triggers
  if (input.problemStatement.length < 25) {
    questions.push({
      id: "detail_request",
      label: "Could you provide more detail on the core problem your app solves?",
      type: "text"
    });
  }
  
  if (input.requiresAI) {
    questions.push({
      id: "ai_strategy",
      label: "What is your primary AI strategy?",
      type: "choice",
      options: ["Third-party APIs (OpenAI/Groq)", "Custom Model Hosting", "Edge-based Inference"]
    });
  }

  if (input.complianceFrameworks.includes("soc2_type2") || input.complianceFrameworks.includes("hipaa")) {
    questions.push({
      id: "compliance_needs",
      label: "Do you have an existing compliance officer or automated auditor platform setup?",
      type: "boolean"
    });
  }

  const finalScore = Math.max(0, scoreSync)
  
  return {
    tensions,
    tensions: tensions,
    stabilityScore: finalScore,
    riskLevel: finalScore > 75 ? "Low" : finalScore > 40 ? "Medium" : "High",
    overrideRecommended: finalScore < 40,
    clarificationRequired: questions.length > 0,
    questions
  }
}
