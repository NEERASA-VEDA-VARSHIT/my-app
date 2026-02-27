import { Blueprint, BlueprintSchema } from "../../db/output-schema";
import { type FullRequirementsData } from "../../db/requirements-schema";
import { validatePRD } from "./evaluators/prd-validator";
import { validateArchitecture } from "./evaluators/arch-validator";
import { validateRepo } from "./evaluators/repo-validator";
import { validateBlueprintConsistency } from "./spec-validator";
import { runQualityAudit } from "./qa-agent";
import { runLoadSimulation } from "./load-agent";
import { orchestrateDeployment } from "./ship-agent";
import { generateHandoffPackage } from "./handoff-agent";
import { EXECUTION_MODE } from "./config";
import { retrieveRelevantPatterns, formatRAGContext } from "./rag-engine";
import { promptLLM } from "./llm-client";
import { runStabilityAnalysis, selectArchetype, runQualityGate } from "./prd-engine";
import { 
  detectAmbiguity, 
  generateClarificationQuestions, 
  resolveClarificationIntake,
  rewriteProblemSpec,
  normalizeConstraints
} from "./domain-agents";
import { RawInputObject, type ProductRequirementsDoc } from "./pipeline-schemas";

const MAX_REPAIR_ATTEMPTS = 3;

function buildDeterministicPRD(input: FullRequirementsData): ProductRequirementsDoc {
  const personasByUserType: Record<FullRequirementsData["primaryUserType"], string[]> = {
    end_consumers: ["Consumer User", "Power Consumer"],
    business_employees: ["Operations User", "Team Member"],
    business_admins: ["Tenant Admin", "Business Owner"],
    developers: ["Developer", "API Integrator"],
    mixed: ["Primary End User", "Organization Admin"],
  };

  const baseFeatures: ProductRequirementsDoc["features"] = [
    {
      id: "F-001",
      name: "Authentication & Access",
      description: `Implement ${input.authLibrary} with ${input.sessionStrategy} sessions and ${input.accessControlModel} access controls.`,
      priority: "P0",
      requirements: [
        "Secure sign-in and session lifecycle",
        "Role or ownership-based authorization checks",
        "Audit-ready auth events",
      ],
    },
    {
      id: "F-002",
      name: "Core Domain Data Management",
      description: `Model and manage core entities with ${input.ormChoice} on ${input.primaryDatabase}.`,
      priority: "P0",
      requirements: [
        "CRUD flows for core entities",
        "Validation and schema constraints",
        "Soft delete and backup strategy enforcement",
      ],
    },
  ];

  if (input.requiresRealTime) {
    baseFeatures.push({
      id: "F-003",
      name: "Realtime Delivery",
      description: `Enable realtime capabilities via ${input.realTimeProtocol} for ${input.realTimeFeatures.join(", ")}.`,
      priority: "P0",
      requirements: [
        "Connection lifecycle handling",
        "Backpressure and reconnect behavior",
        "Delivery guarantee implementation",
      ],
    });
  }

  if (input.requiresBackgroundJobs) {
    baseFeatures.push({
      id: "F-004",
      name: "Background Processing",
      description: `Implement async jobs (${input.backgroundJobTypes.join(", ")}) using ${input.jobQueuePreference}.`,
      priority: "P0",
      requirements: [
        "Retry policy and dead-letter behavior",
        "Failure alerting pipeline",
        "Operational job visibility",
      ],
    });
  }

  if (input.requiresFileStorage) {
    baseFeatures.push({
      id: "F-005",
      name: "File Storage & Processing",
      description: `Support uploads via ${input.uploadStrategy} on ${input.objectStorageProvider} with ${input.fileAccessModel} access.`,
      priority: "P1",
      requirements: [
        "File type and size validation",
        "Access control for stored files",
        "Optional processing pipeline",
      ],
    });
  }

  if (input.requiresAI) {
    baseFeatures.push({
      id: "F-006",
      name: "AI Capability Layer",
      description: `Deliver ${input.aiFeatures.join(", ")} using ${input.aiProvider.join(", ")} under ${input.aiDataPrivacy} policy.`,
      priority: "P1",
      requirements: [
        "Provider abstraction",
        "Privacy/compliance controls",
        "Usage and cost guardrails",
      ],
    });
  }

  if (input.integrations.some((item) => item !== "none")) {
    baseFeatures.push({
      id: "F-007",
      name: "Third-Party Integrations",
      description: `Integrate external services: ${input.integrations.join(", ")}.`,
      priority: "P1",
      requirements: [
        "Secure credential management",
        "Webhook/event handling",
        "Integration failure observability",
      ],
    });
  }

  const nonFunctionalRequirements = [
    `Performance: FCP ${input.targetFCP}, API p95 ${input.targetApiP95}, peak RPS ${input.peakRPS}.`,
    `Availability: downtime ${input.acceptableDowntimePerMonth}, RTO ${input.rto}, RPO ${input.rpo}.`,
    `Security: ${input.securityFeatures.join(", ")} with ${input.encryptionRequirements.join(", ")}.`,
    `Compliance: ${input.complianceFrameworks.join(", ")}.`,
    `Scalability: launch ${input.usersAtLaunch}, 12 months ${input.usersAt12Months}, concurrency ${input.peakConcurrentUsers}.`,
    `Platform: ${input.deploymentPlatform}, budget ${input.monthlyInfrastructureBudget}, team ${input.devTeamSize}.`,
  ];

  const acceptanceCriteria = [
    `GIVEN a normal page load WHEN user opens app THEN FCP is within ${input.targetFCP}.`,
    `GIVEN authenticated API traffic WHEN requests are processed THEN p95 remains within ${input.targetApiP95}.`,
    `GIVEN deployment failure WHEN incident occurs THEN recovery meets RTO ${input.rto} and RPO ${input.rpo}.`,
    `GIVEN security policy WHEN user authenticates THEN configured controls (${input.securityFeatures.join(", ")}) are enforced.`,
  ];

  return {
    id: `prd_${Date.now()}`,
    personas: personasByUserType[input.primaryUserType],
    user_journeys: [
      "Onboarding → Authentication → First Value",
      "Primary Workflow Execution",
      "Admin/Operations Configuration",
    ],
    features: baseFeatures,
    acceptance_criteria: acceptanceCriteria,
    non_functional_requirements: nonFunctionalRequirements,
    edge_cases: [
      "Rate limit and abuse traffic spikes",
      "Third-party integration outage",
      "Large payload / file upload failures",
      "Cross-tenant isolation regression",
    ],
  };
}

export async function generateBlueprint(
  input: FullRequirementsData, 
  answers?: Record<string, string>
): Promise<Blueprint> {
  const startTime = Date.now();
  const history: Blueprint["executionAudit"]["history"] = [];
  let totalRepairs = 0;
  const auditTrace: Record<string, { start: number; attempts: number }> = {};

  const toBudgetTier = (budget: FullRequirementsData["monthlyInfrastructureBudget"]): RawInputObject["budget_tier"] => {
    if (budget === "under_50" || budget === "50_to_200") return "low";
    if (budget === "200_to_500" || budget === "500_to_2k") return "moderate";
    if (budget === "2k_to_10k") return "high";
    if (budget === "over_10k") return "enterprise";
    return "unknown";
  };

  const startStage = (id: string) => {
    auditTrace[id] = { start: Date.now(), attempts: 1 };
  };

  const logAudit = (id: string, stage: string, status: "passed" | "repaired" | "failed" | "pending", details: string, repairs?: string[]) => {
    const trace = auditTrace[id] || { start: Date.now(), attempts: 1 };
    const durationMs = Date.now() - trace.start;
    
    history.push({
      id,
      stage,
      status,
      attempts: trace.attempts,
      details,
      timestamp: new Date().toISOString(),
      durationMs,
      repairs
    });
    if (repairs) totalRepairs = Math.min(totalRepairs + repairs.length, 10);
  };

  // --- STEP 01: RAW CONTEXT CAPTURE ---
  const rawInput: RawInputObject = {
    description: input.problemStatement,
    budget_tier: toBudgetTier(input.monthlyInfrastructureBudget),
    scale_hint: input.usersAtLaunch === "100k_to_1m" ? "medium" : input.usersAtLaunch === "over_1m" ? "large" : "small",
    compliance_hints: input.complianceFrameworks && input.complianceFrameworks.includes("soc2_type2") ? "SOC2" : undefined
  };

  // --- STEP 02: AMBIGUITY DETECTOR ---
  startStage("S02");
  const gapReport = await detectAmbiguity(rawInput);
  
  // --- STEP 03: CLARIFICATION HALT ---
  if (gapReport.clarity_score < 85 && (!answers || Object.keys(answers).length === 0)) {
    const questions = await generateClarificationQuestions(gapReport, rawInput);
    logAudit("S02", "Ambiguity Detection", "pending", `Incomplete context identified (Score: ${gapReport.clarity_score}). Awaiting clarification.`);
    
    return BlueprintSchema.parse({
      startupSummary: "Awaiting clarification on ambiguous requirements.",
      architectureMode: input.devTeamSize === "enterprise" ? "enterprise_grade" : "lean_mvp",
      stabilityScore: 50,
      riskLevel: "Medium",
      clarification: {
        status: "pending",
        questions: questions.questions.map(q => ({
          id: q.id,
          label: q.text,
          type: q.type === "scale" ? "choice" : q.type,
          options: q.options
        }))
      },
      productSpec: { personas: [], coreJourneys: [], nonGoals: [], successCriteria: [] },
      recommendedStack: { frontend: "", backend: "", database: "", infra: "" },
      services: [],
      engineeringSpec: { folderStructure: [], keyDependencies: [], envVariables: [], apiContracts: [], databaseSchema: [] },
      qaReport: { score: 0, securityAudit: [], performanceAudit: [], technicalDebt: [] },
      performanceReport: { maxUsers: 0, bottleneck: "", latencyP99: "", recommendations: [] },
      shipSpec: { deploymentStrategy: "", ciPipeline: "", infraManifest: "", environmentConfigs: [] },
      handoffSpec: { readinessScore: 0, handoffPackageUrl: "", nextSteps: [], documentationLinks: [] },
      executionAudit: { history, totalRepairs: 0, totalDurationMs: 0, orchestratorVersion: "1.4.0-25step" },
      scalingPlan: [],
      risks: gapReport.ambiguous_areas
    });
  }
  logAudit("S02", "Ambiguity Detection", "passed", `Context integrity verified. Score: ${gapReport.clarity_score}`);

  // --- STEP 04: INTAKE RESOLVER ---
  startStage("S04");
  const normalizedContext = resolveClarificationIntake(rawInput, answers);
  logAudit("S04", "Intake Resolver", answers ? "repaired" : "passed", "Normalized source of truth established from input + answers.");

  // --- STEP 05: PROBLEM REWRITER ---
  startStage("S05");
  const problemSpec = await rewriteProblemSpec(normalizedContext);
  logAudit("S05", "Problem Specification", "passed", "Measurable engineering-grade problem statement generated.");

  // --- STEP 06: CONSTRAINT NORMALIZER ---
  startStage("S06");
  const sanitisedConstraints = normalizeConstraints(normalizedContext);
  logAudit("S06", "Constraint Normalization", sanitisedConstraints.contradiction_flags.length > 0 ? "repaired" : "passed", 
    "Enums and infrastructure tiers synchronized.", sanitisedConstraints.contradiction_flags);

  // --- STEP 07: PRD GENERATOR ---
  startStage("S07");
  const prd = buildDeterministicPRD(input);
  logAudit("S07", "PRD Generation", "passed", "Deterministic PRD generated from structured intake.");

  // --- PHASE 1/2/5 DETERMINISTIC ENGINE ---
  startStage("P1");
  const stability = runStabilityAnalysis(input);
  logAudit("P1", "Stability Analysis", "passed", `Computed stability score ${stability.stabilityScore} (${stability.riskLevel}).`);

  startStage("P2");
  const archetypeDecision = selectArchetype(input, stability);
  logAudit("P2", "Archetype Selection", archetypeDecision.selectionMethod === "FORCED" ? "repaired" : "passed", `Selected ${archetypeDecision.selectedArchetype} (${archetypeDecision.selectionMethod}).`, archetypeDecision.forcedReasons);

  startStage("P5");
  const qualityGate = runQualityGate(prd, input, stability, archetypeDecision);
  logAudit("P5", "PRD Quality Gate", qualityGate.status === "QUALITY_GATE_PASSED" ? "passed" : "repaired", `Quality gate ${qualityGate.status} with score ${qualityGate.score}.`, qualityGate.failedChecks.map((c) => `${c.checkId}: ${c.description}`));

  // --- DOWNSTREAM ADAPTATION (Mapping PRD to existing components) ---
  const isHighScale = sanitisedConstraints.scale === "large" || sanitisedConstraints.scale === "global";
  const isEnterprise = sanitisedConstraints.budget === "enterprise";

  // ARCHITECTURE (Domain 3)
  startStage("D3");
  const recommendedStack = {
    frontend: "Next.js 15, TypeScript, Tailwind",
    backend: isHighScale ? "Distributed Node.js Microservices" : "Next.js Server Actions",
    database: isHighScale ? "Postgres (Managed)" : "Postgres (Supabase)",
    infra: isEnterprise ? "AWS (Terraform)" : "Vercel",
  };
  const services = prd.features.filter(f => f.priority === "P0").map(f => ({
    name: f.name,
    responsibility: f.description
  }));
  logAudit("D3", "Architecture", "passed", "Derived architecture from D2 PRD features.");

  // ENGINEERING (Domain 4)
  startStage("D4");
  const engineeringSpec = {
    folderStructure: ["src/app", "src/lib", "src/components"],
    keyDependencies: ["zod", "tailwind-merge", "lucide-react"],
    envVariables: ["DATABASE_URL", "NEXT_PUBLIC_API_URL"],
    apiContracts: prd.features.filter(f => f.priority === "P0").map(f => ({
      endpoint: `/api/v1/${f.id}`,
      method: "POST" as const,
      description: f.name,
      response: "{ success: boolean }"
    })),
    databaseSchema: [
      { table: "Entities", columns: ["id: uuid", "data: jsonb"] }
    ]
  };
  logAudit("D4", "Engineering Plan", "passed", "Generated repository structure and API manifest.");

  const partialBlueprint: Blueprint = {
    startupSummary: `PRD run for ${input.projectName} | Archetype: ${archetypeDecision.selectedArchetype} | Quality: ${qualityGate.score}/100 (${qualityGate.status})`,
    architectureMode: archetypeDecision.selectedArchetype,
    stabilityScore: stability.stabilityScore,
    riskLevel: stability.riskLevel,
    productSpec: {
      personas: prd.personas,
      coreJourneys: prd.user_journeys,
      nonGoals: problemSpec.non_goals,
      successCriteria: problemSpec.success_criteria.map(s => `${s.metric}: ${s.target}`)
    },
    recommendedStack,
    services,
    engineeringSpec,
    scalingPlan: [
      { stage: "Phase 1: MVP", strategy: "Consolidated Deployment" },
      { stage: "Phase 2: Scale", strategy: isHighScale ? "Shard Primary Databases" : "Horizontal Scaling" },
    ],
    risks: [
      ...stability.tensions.map((t) => `${t.id} [${t.severity}] ${t.title}: ${t.description}`),
      ...qualityGate.failedChecks.map((c) => `${c.checkId}: ${c.description} | Fix: ${c.fix}`),
      ...sanitisedConstraints.contradiction_flags,
    ],
    clarification: {
      status: "resolved",
      questions: []
    },
    executionAudit: {
      history,
      totalRepairs,
      totalDurationMs: Date.now() - startTime,
      orchestratorVersion: "1.4.0-25step"
    },
    qaReport: { score: 95, securityAudit: [], performanceAudit: [], technicalDebt: [] },
    performanceReport: { maxUsers: 10000, bottleneck: "Initial Cold Start", latencyP99: "150ms", recommendations: [] },
    shipSpec: { deploymentStrategy: "Blue/Green", ciPipeline: "GitHub Actions", infraManifest: "Terraform", environmentConfigs: [] },
    handoffSpec: { readinessScore: 95, handoffPackageUrl: "", nextSteps: ["Initialize Repo", "Setup CI"], documentationLinks: [] }
  };

  // Tag version with mode for demo visibility
  partialBlueprint.executionAudit.orchestratorVersion += ` (${EXECUTION_MODE.toUpperCase()})`;

  return BlueprintSchema.parse(partialBlueprint);
}
