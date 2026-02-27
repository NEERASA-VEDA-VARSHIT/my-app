import { FullRequirementsData } from "@/db/requirements-schema";
import { ProductRequirementsDoc } from "./pipeline-schemas";

export type TensionSeverity = "CRIT" | "WARN" | "INFO";
export type RiskLevel = "Low" | "Medium" | "High" | "Critical";
export type ArchitectureArchetype = "monolith" | "modular_monolith" | "microservices";
export type ArchetypeSelectionMethod = "FORCED" | "SUGGESTED" | "DEFAULT";

export interface DeterministicTension {
  id: string;
  severity: TensionSeverity;
  title: string;
  description: string;
  deduction: number;
  mitigation: string;
}

export interface StabilityAnalysisResult {
  baseScore: 100;
  tensions: DeterministicTension[];
  amplificationDeductions: number;
  stabilityScore: number;
  riskLevel: RiskLevel;
}

export interface ArchetypeDecisionResult {
  selectedArchetype: ArchitectureArchetype;
  selectionMethod: ArchetypeSelectionMethod;
  forcedReasons: string[];
}

export interface QualityCheckFailure {
  checkId: string;
  description: string;
  fix: string;
}

export interface QualityGateResult {
  score: number;
  status:
    | "QUALITY_GATE_PASSED"
    | "QUALITY_GATE_FAILED_SOFT"
    | "QUALITY_GATE_FAILED_HARD"
    | "QUALITY_GATE_CONSISTENCY_FAILURE";
  failedChecks: QualityCheckFailure[];
}

const EXTERNAL_AI_PROVIDERS = new Set(["openai", "anthropic", "google_gemini"]);

const isAtMostSeed = (stage: FullRequirementsData["fundingStage"]) =>
  ["bootstrapped", "pre_seed", "seed"].includes(stage);

const isAtMostSeriesA = (stage: FullRequirementsData["fundingStage"]) =>
  ["bootstrapped", "pre_seed", "seed", "series_a"].includes(stage);

const isMidMarketOrHigher = (users: FullRequirementsData["usersAt12Months"]) =>
  ["10k_to_100k", "100k_to_1m", "over_1m"].includes(users);

const isLargeScale = (users: FullRequirementsData["usersAt12Months"]) =>
  ["100k_to_1m", "over_1m"].includes(users);

const addTension = (
  list: DeterministicTension[],
  tension: Omit<DeterministicTension, "deduction">,
) => {
  list.push({
    ...tension,
    deduction: tension.severity === "CRIT" ? 25 : tension.severity === "WARN" ? 10 : 0,
  });
};

export function runStabilityAnalysis(input: FullRequirementsData): StabilityAnalysisResult {
  const tensions: DeterministicTension[] = [];

  if (input.fundingStage === "bootstrapped" && input.usersAt12Months === "over_1m") {
    addTension(tensions, {
      id: "T-BS-002",
      severity: "WARN",
      title: "Bootstrap vs scale mismatch",
      description: "Bootstrapped funding with 1M+ users in 12 months is operationally high risk.",
      mitigation: "Reduce launch scope or increase budget before scale milestones.",
    });
  }

  if (input.fundingStage === "bootstrapped" && ["under_50", "50_to_200"].includes(input.monthlyInfrastructureBudget)) {
    addTension(tensions, {
      id: "T-BS-004",
      severity: "WARN",
      title: "Low infra budget pressure",
      description: "Very low infrastructure budget constrains reliability and managed service choices.",
      mitigation: "Prioritize managed essentials and postpone non-critical capabilities.",
    });
  }

  if (input.fundingStage === "bootstrapped" && input.acceptableDowntimePerMonth === "under_5min") {
    addTension(tensions, {
      id: "T-BS-005",
      severity: "CRIT",
      title: "SLA exceeds bootstrap capacity",
      description: "99.99% uptime target is typically incompatible with bootstrap operations.",
      mitigation: "Relax SLA or fund HA multi-region operations.",
    });
  }

  if (input.requiresRealTime && input.mvpTimelineDays <= 14) {
    addTension(tensions, {
      id: "T-TC-003",
      severity: "CRIT",
      title: "Realtime under compressed timeline",
      description: "Realtime infrastructure inside a 14-day window is unlikely to be production ready.",
      mitigation: "Reduce realtime scope or extend MVP timeline.",
    });
  }

  if (input.devTeamSize === "solo" && input.mvpTimelineDays <= 30 && isMidMarketOrHigher(input.usersAt12Months)) {
    addTension(tensions, {
      id: "T-TC-005",
      severity: "CRIT",
      title: "Solo capacity overload",
      description: "Solo team + short timeline + mid-market scale is unstable.",
      mitigation: "Reduce scope or add engineering capacity.",
    });
  }

  if (input.complianceFrameworks.includes("hipaa") && input.fundingStage === "bootstrapped") {
    addTension(tensions, {
      id: "T-CB-001",
      severity: "CRIT",
      title: "HIPAA on bootstrap",
      description: "HIPAA control and audit obligations are expensive for bootstrap operations.",
      mitigation: "Increase budget and compliance staffing before launch.",
    });
  }

  if (input.complianceFrameworks.includes("soc2_type2") && input.fundingStage === "bootstrapped") {
    addTension(tensions, {
      id: "T-CB-002",
      severity: "CRIT",
      title: "SOC2 Type II on bootstrap",
      description: "SOC2 Type II continuous evidence and audit costs are usually incompatible with bootstrap.",
      mitigation: "Stage compliance effort or secure additional funding.",
    });
  }

  if (input.complianceFrameworks.includes("gdpr") && input.fundingStage === "bootstrapped") {
    addTension(tensions, {
      id: "T-CB-003",
      severity: "WARN",
      title: "GDPR operational load",
      description: "GDPR can be done on bootstrap, but requires disciplined data workflows.",
      mitigation: "Implement DSR workflows and retention controls early.",
    });
  }

  if (input.complianceFrameworks.includes("pci_dss") && isAtMostSeed(input.fundingStage)) {
    addTension(tensions, {
      id: "T-CB-004",
      severity: "CRIT",
      title: "PCI-DSS funding mismatch",
      description: "PCI-DSS obligations are heavy for pre-seed/seed budgets.",
      mitigation: "Use tokenized third-party payment handling and defer direct card scope.",
    });
  }

  if (input.complianceFrameworks.includes("fedramp") && isAtMostSeriesA(input.fundingStage)) {
    addTension(tensions, {
      id: "T-CB-005",
      severity: "CRIT",
      title: "FedRAMP readiness mismatch",
      description: "FedRAMP authorization typically exceeds early-stage budget and timeline.",
      mitigation: "Target non-FedRAMP segment first or secure enterprise/government funding.",
    });
  }

  if (input.openTelemetryRequired && input.devTeamSize === "solo") {
    addTension(tensions, {
      id: "T-AT-004",
      severity: "INFO",
      title: "Observability setup overhead",
      description: "Full OpenTelemetry instrumentation is significant for a solo team.",
      mitigation: "Start with critical traces and expand iteratively.",
    });
  }

  if (input.targetApiP95 === "under_100ms" && !input.cacheLayerRequired) {
    addTension(tensions, {
      id: "T-PI-001",
      severity: "WARN",
      title: "Aggressive API latency without cache",
      description: "Sub-100ms p95 without caching can become fragile under load.",
      mitigation: "Enable cache layer for hot paths and rate limits.",
    });
  }

  if (input.coldStartTolerance === "zero" && input.deploymentPlatform === "vercel") {
    addTension(tensions, {
      id: "T-PI-003",
      severity: "CRIT",
      title: "Zero cold-start on serverless",
      description: "Zero cold-start tolerance conflicts with serverless behavior.",
      mitigation: "Use always-on compute or relax cold-start requirement.",
    });
  }

  if (input.targetFCP === "under_1s" && input.renderingStrategy === "csr") {
    addTension(tensions, {
      id: "T-PI-004",
      severity: "WARN",
      title: "FCP target vs CSR",
      description: "Sub-1s FCP is difficult with CSR-only rendering.",
      mitigation: "Use SSR/SSG/ISR on critical routes.",
    });
  }

  if (["1k_to_10k", "over_10k"].includes(input.peakRPS) && input.connectionPooling === "none") {
    addTension(tensions, {
      id: "T-PI-005",
      severity: "CRIT",
      title: "Missing DB pooling at high RPS",
      description: "High RPS without connection pooling can exhaust DB connections.",
      mitigation: "Enable PgBouncer or managed pooler.",
    });
  }

  if (input.requiresRealTime && input.realTimeScale === "over_10k_concurrent" && input.realTimeProtocol === "polling") {
    addTension(tensions, {
      id: "T-RT-001",
      severity: "CRIT",
      title: "Polling at extreme realtime scale",
      description: "Polling at 10k+ concurrent users creates unsustainable server load.",
      mitigation: "Switch to WebSocket/SSE with pub/sub.",
    });
  }

  if (input.requiresRealTime && input.realTimeDeliveryGuarantee === "exactly_once" && input.realTimeProtocol === "server_sent_events") {
    addTension(tensions, {
      id: "T-RT-002",
      severity: "WARN",
      title: "Exactly-once with SSE",
      description: "SSE requires deduplication to emulate exactly-once delivery.",
      mitigation: "Add message IDs and consumer-side dedupe guarantees.",
    });
  }

  if (input.requiresRealTime && input.deploymentPlatform === "vercel" && input.realTimeProtocol === "websockets") {
    addTension(tensions, {
      id: "T-RT-003",
      severity: "WARN",
      title: "WebSocket on serverless constraints",
      description: "Persistent WebSocket connections are constrained on serverless platforms.",
      mitigation: "Use dedicated realtime provider/service.",
    });
  }

  if (input.requiresAI && input.complianceFrameworks.includes("hipaa") && input.aiProvider.some((p) => p === "openai" || p === "anthropic")) {
    addTension(tensions, {
      id: "T-AC-001",
      severity: "CRIT",
      title: "HIPAA with external AI provider",
      description: "HIPAA workloads may require strict provider agreements and controls.",
      mitigation: "Use HIPAA-eligible deployment path and signed BAA.",
    });
  }

  if (input.requiresAI && input.aiDataPrivacy === "no_external_ai" && input.aiProvider.some((provider) => EXTERNAL_AI_PROVIDERS.has(provider))) {
    addTension(tensions, {
      id: "T-AC-002",
      severity: "CRIT",
      title: "AI privacy contradiction",
      description: "no_external_ai conflicts with selected external AI providers.",
      mitigation: "Use self-hosted provider or update privacy requirement.",
    });
  }

  if (input.requiresAI && input.aiMonthlyCostCeiling === "under_100" && input.aiFeatures.includes("text_generation")) {
    addTension(tensions, {
      id: "T-AC-003",
      severity: "WARN",
      title: "AI budget underestimation",
      description: "Meaningful text generation usage often exceeds $100/month.",
      mitigation: "Add caching/quotas or increase AI budget tier.",
    });
  }

  let amplificationDeductions = 0;
  const criticalCount = tensions.filter((t) => t.severity === "CRIT").length;
  if (criticalCount >= 3) amplificationDeductions += 10;
  if (input.fundingStage === "bootstrapped" && input.mvpTimelineDays <= 60 && isMidMarketOrHigher(input.usersAt12Months)) amplificationDeductions += 15;
  if (input.complianceFrameworks.length >= 3 && isAtMostSeed(input.fundingStage)) amplificationDeductions += 10;
  if (input.devTeamSize === "solo" && (input.requiresRealTime || (input.requiresAI && input.aiDataPrivacy === "no_external_ai"))) amplificationDeductions += 10;

  const directDeductions = tensions.reduce((sum, item) => sum + item.deduction, 0);
  const stabilityScore = Math.max(0, 100 - directDeductions - amplificationDeductions);

  let riskLevel: RiskLevel = "Low";
  if (stabilityScore < 25) riskLevel = "Critical";
  else if (stabilityScore < 50) riskLevel = "High";
  else if (stabilityScore < 75) riskLevel = "Medium";

  return {
    baseScore: 100,
    tensions,
    amplificationDeductions,
    stabilityScore,
    riskLevel,
  };
}

export function selectArchetype(input: FullRequirementsData, stability: StabilityAnalysisResult): ArchetypeDecisionResult {
  if (stability.stabilityScore < 50) {
    return {
      selectedArchetype: "monolith",
      selectionMethod: "FORCED",
      forcedReasons: ["stabilityScore < 50"],
    };
  }

  if (input.devTeamSize === "solo" || input.devTeamSize === "small") {
    return {
      selectedArchetype: "monolith",
      selectionMethod: "FORCED",
      forcedReasons: ["solo/small team favors low operational complexity"],
    };
  }

  if (input.mvpTimelineDays <= 60) {
    return {
      selectedArchetype: "monolith",
      selectionMethod: "FORCED",
      forcedReasons: ["tight timeline (<= 60 days)"],
    };
  }

  if (
    input.devTeamSize === "enterprise" &&
    ["series_b", "series_c_plus", "enterprise_budget", "government"].includes(input.fundingStage) &&
    isLargeScale(input.usersAt12Months) &&
    input.mvpTimelineDays >= 365
  ) {
    return {
      selectedArchetype: "microservices",
      selectionMethod: "SUGGESTED",
      forcedReasons: [],
    };
  }

  return {
    selectedArchetype: "modular_monolith",
    selectionMethod: "DEFAULT",
    forcedReasons: [],
  };
}

export function runQualityGate(
  prd: ProductRequirementsDoc,
  input: FullRequirementsData,
  stability: StabilityAnalysisResult,
  archetype: ArchetypeDecisionResult,
): QualityGateResult {
  let score = 100;
  const failedChecks: QualityCheckFailure[] = [];

  const fail = (checkId: string, description: string, fix: string) => {
    failedChecks.push({ checkId, description, fix });
    score -= 3;
  };

  if (prd.personas.length === 0) {
    fail("CC-001", "PRD has no personas.", "Add at least one concrete persona.");
  }

  if (prd.features.length === 0) {
    fail("CC-002", "PRD has no feature inventory.", "Generate complete feature list with priorities.");
  }

  const hasP0 = prd.features.some((f) => (f.priority ?? "P1") === "P0");
  if (!hasP0) {
    fail("CC-003", "PRD has no P0 MVP features.", "Mark launch-critical features as P0.");
  }

  if (prd.acceptance_criteria.length === 0) {
    fail("CC-004", "PRD has no acceptance criteria.", "Add GIVEN/WHEN/THEN acceptance criteria.");
  }

  if (input.complianceFrameworks.length > 0 && input.complianceFrameworks[0] !== "none" && prd.non_functional_requirements.length === 0) {
    fail("CC-006", "Compliance declared but NFR section is empty.", "Add compliance NFR controls and audits.");
  }

  if (input.requiresRealTime && !prd.non_functional_requirements.some((item) => item.toLowerCase().includes("concurrent") || item.toLowerCase().includes("real-time"))) {
    fail("CC-013", "Realtime declared but scalability NFR lacks concurrent connection handling.", "Add realtime connection/concurrency NFR.");
  }

  if (input.requiresBackgroundJobs && !prd.non_functional_requirements.some((item) => item.toLowerCase().includes("queue") || item.toLowerCase().includes("retry"))) {
    fail("CC-014", "Background jobs declared but queue/retry requirements are missing.", "Add queue provider and retry semantics to NFR.");
  }

  if (input.readReplicaRequired && !prd.non_functional_requirements.some((item) => item.toLowerCase().includes("read replica") || item.toLowerCase().includes("replica"))) {
    fail("CC-015", "Read replica required but not represented in NFR.", "Add read-replica topology requirement.");
  }

  if (archetype.selectionMethod === "FORCED" && stability.stabilityScore >= 75) {
    fail("CC-011", "Forced archetype with high stability should be justified.", "Add explicit ADR rationale or relax forced rule.");
  }

  if (score < 0) score = 0;

  let status: QualityGateResult["status"] = "QUALITY_GATE_PASSED";
  if (failedChecks.length >= 3) status = "QUALITY_GATE_CONSISTENCY_FAILURE";
  else if (score < 70) status = "QUALITY_GATE_FAILED_HARD";
  else if (score < 85) status = "QUALITY_GATE_FAILED_SOFT";

  return {
    score,
    status,
    failedChecks,
  };
}
