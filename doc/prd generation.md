# PRD GENERATION
### Multi-Stage Architecture Orchestration Pipeline — Document 2 of 4
### Framework: Next.js (Primary) | Version: 1.0.0 | Status: ACTIVE

---

## Table of Contents

- [Purpose & Philosophy](#purpose--philosophy)
- [PRD Generation Pipeline Overview](#prd-generation-pipeline-overview)
- [Prerequisite: Intake Readiness Check](#prerequisite-intake-readiness-check)
- [Phase 1 — Stability Analysis](#phase-1--stability-analysis)
  - [1A — Tension Detection Engine](#1a--tension-detection-engine)
  - [1B — Stability Score Computation](#1b--stability-score-computation)
  - [1C — Risk Level Classification](#1c--risk-level-classification)
  - [1D — Tension Severity Catalogue](#1d--tension-severity-catalogue)
  - [1E — Composite Tension Amplification](#1e--composite-tension-amplification)
- [Phase 2 — Architecture Archetype Selection](#phase-2--architecture-archetype-selection)
  - [2A — Archetype Decision Matrix](#2a--archetype-decision-matrix)
  - [2B — Forced Archetype Override Rules](#2b--forced-archetype-override-rules)
  - [2C — Archetype Reasoning Template](#2c--archetype-reasoning-template)
  - [2D — Evolution Path Planning](#2d--evolution-path-planning)
- [Phase 3 — Stack Prescription Engine](#phase-3--stack-prescription-engine)
  - [3A — Frontend Decision Tree](#3a--frontend-decision-tree)
  - [3B — Backend / API Decision Tree](#3b--backend--api-decision-tree)
  - [3C — Database Selection Engine](#3c--database-selection-engine)
  - [3D — Caching Layer Decision Tree](#3d--caching-layer-decision-tree)
  - [3E — Authentication Provider Decision Tree](#3e--authentication-provider-decision-tree)
  - [3F — Queue / Job Infrastructure Decision Tree](#3f--queue--job-infrastructure-decision-tree)
  - [3G — File Storage Decision Tree](#3g--file-storage-decision-tree)
  - [3H — Observability Stack Decision Tree](#3h--observability-stack-decision-tree)
  - [3I — Hosting / Deployment Decision Tree](#3i--hosting--deployment-decision-tree)
- [Phase 4 — PRD Document Generation](#phase-4--prd-document-generation)
  - [4A — Mandatory PRD Template Structure](#4a--mandatory-prd-template-structure)
  - [4B — Section Generation Rules](#4b--section-generation-rules)
  - [4C — PRD Metadata Block](#4c--prd-metadata-block)
  - [4D — Executive Summary Generation](#4d--executive-summary-generation)
  - [4E — Problem Statement Generation](#4e--problem-statement-generation)
  - [4F — Goals & Success Metrics Generation](#4f--goals--success-metrics-generation)
  - [4G — User Persona Generation](#4g--user-persona-generation)
  - [4H — Feature Requirements Generation](#4h--feature-requirements-generation)
  - [4I — Non-Functional Requirements Generation](#4i--non-functional-requirements-generation)
  - [4J — Architecture Decision Records](#4j--architecture-decision-records)
  - [4K — Risk Register Generation](#4k--risk-register-generation)
  - [4L — Evolution Roadmap Generation](#4l--evolution-roadmap-generation)
- [Phase 5 — PRD Quality Gate](#phase-5--prd-quality-gate)
  - [5A — Completeness Scoring Model](#5a--completeness-scoring-model)
  - [5B — Internal Consistency Checks](#5b--internal-consistency-checks)
  - [5C — Quality Gate Pass / Fail Rules](#5c--quality-gate-pass--fail-rules)
- [Phase 6 — PRD Iteration & Clarification Loop](#phase-6--prd-iteration--clarification-loop)
  - [6A — When Iteration Is Triggered](#6a--when-iteration-is-triggered)
  - [6B — Partial Regeneration Rules](#6b--partial-regeneration-rules)
  - [6C — Iteration Convergence Criteria](#6c--iteration-convergence-criteria)
  - [6D — Maximum Iteration Budget](#6d--maximum-iteration-budget)
- [Phase 7 — PRD Approval & Freeze Workflow](#phase-7--prd-approval--freeze-workflow)
  - [7A — Approval State Machine](#7a--approval-state-machine)
  - [7B — Stakeholder Sign-Off Matrix](#7b--stakeholder-sign-off-matrix)
  - [7C — Immutability Contract](#7c--immutability-contract)
  - [7D — Downstream Unlock Sequence](#7d--downstream-unlock-sequence)
- [TypeScript Interfaces](#typescript-interfaces)
- [Zod Validation Schemas](#zod-validation-schemas)
- [Example Generated PRDs](#example-generated-prds)
  - [Archetype A — Bootstrap SaaS MVP PRD](#archetype-a--bootstrap-saas-mvp-prd)
  - [Archetype B — Series-A B2B Platform PRD](#archetype-b--series-a-b2b-platform-prd)
  - [Archetype C — Enterprise Compliance Platform PRD](#archetype-c--enterprise-compliance-platform-prd)
- [PRD Generation Version History](#prd-generation-version-history)

---
#Important node in this phase nothing is to be halusinated everthing is to be asked to the user.

## Purpose & Philosophy

This document is **Document 2 of 4** in the Multi-Stage Architecture Orchestration Pipeline.

It defines the deterministic algorithm that transforms a fully completed `REQUIREMENTS_INTAKE.md`
(Document 1) into a production-grade, stakeholder-ready Product Requirements Document (PRD).

### What This Document Is

This is not a PRD template. It is a **PRD generation engine specification**.

It defines:
- How tensions are detected from intake data
- How a stability score is computed
- How an architecture archetype is selected — not suggested, but **computed**
- How each technology in the stack is prescribed with specific rationale
- How the PRD document is structured and what each section must contain
- How the quality of the generated PRD is scored
- How clarification requests feed back into regeneration
- How the PRD is approved and frozen for downstream use

### Why Determinism?

Architecture decisions are not opinions. Given identical constraints, two experienced engineers
should arrive at identical (or near-identical) architectural decisions. The gap between "two
engineers disagreed" and "the algorithm decided" is accountability.

When this pipeline outputs: **"Monolith — forced: bootstrap budget + 4-week timeline"**, that is
not a recommendation. That is a **computed conclusion** from declared constraints. If stakeholders
disagree, they must change the input constraints, not argue about the output.

This prevents:
- Architecture debates that are actually budget debates in disguise
- Technology preference arguments that should be trade-off analyses
- Scope creep from vague requirements surviving into design
- PRDs that pass review but fail engineering reality

### The Contract

```
Input:   Completed REQUIREMENTS_INTAKE.md (status = SUBMITTED or APPROVED)
Process: Deterministic 7-phase pipeline defined in this document
Output:  PRD document + Architecture Decision Records + Risk Register + Evolution Roadmap
Gate:    PRD must pass quality gate (score ≥ 85/100) before approval
Freeze:  Approved PRD is immutable; all downstream documents reference its frozen ID
```

---

## PRD Generation Pipeline Overview

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    PRD GENERATION PIPELINE                                  │
│                                                                              │
│  ┌───────────────┐                                                           │
│  │  INTAKE FORM  │  (REQUIREMENTS_INTAKE.md — status: SUBMITTED)            │
│  └───────┬───────┘                                                           │
│          │                                                                   │
│          ▼                                                                   │
│  ┌───────────────────────┐                                                  │
│  │  PHASE 1              │  Tension Detection → Stability Score → Risk Level │
│  │  STABILITY ANALYSIS   │                                                  │
│  └───────────┬───────────┘                                                  │
│              │                                                               │
│              ▼                                                               │
│  ┌───────────────────────┐                                                  │
│  │  PHASE 2              │  Archetype Matrix → Forced Overrides → Reasoning │
│  │  ARCHETYPE SELECTION  │                                                  │
│  └───────────┬───────────┘                                                  │
│              │                                                               │
│              ▼                                                               │
│  ┌───────────────────────┐                                                  │
│  │  PHASE 3              │  Frontend → Backend → DB → Cache → Auth →        │
│  │  STACK PRESCRIPTION   │  Queue → Storage → Observability → Hosting        │
│  └───────────┬───────────┘                                                  │
│              │                                                               │
│              ▼                                                               │
│  ┌───────────────────────┐                                                  │
│  │  PHASE 4              │  Template Population → Section Generation →      │
│  │  PRD GENERATION       │  ADRs → Risk Register → Roadmap                  │
│  └───────────┬───────────┘                                                  │
│              │                                                               │
│              ▼                                                               │
│  ┌───────────────────────┐                                                  │
│  │  PHASE 5              │  Completeness Score → Consistency Checks →       │
│  │  QUALITY GATE         │  Pass (≥85) or Fail (trigger Phase 6)            │
│  └───────────┬───────────┘                                                  │
│              │                                                               │
│    ┌─────────┴──────────┐                                                   │
│    │                    │                                                    │
│    ▼ FAIL               ▼ PASS                                              │
│  ┌──────────┐    ┌──────────────────┐                                       │
│  │ PHASE 6  │    │    PHASE 7       │                                       │
│  │ ITERATION│───▶│ APPROVAL & FREEZE│                                       │
│  │   LOOP   │    └──────────────────┘                                       │
│  └──────────┘                                                                │
└────────────────────────────────────────────────────────────────────────────┘
```

### Phase Execution Rules

| Phase | Trigger | Blocks On | Output |
|---|---|---|---|
| Phase 1 | Intake status = SUBMITTED | Unresolved critical ambiguities | TensionReport |
| Phase 2 | Phase 1 complete | Unresolvable archetype conflict | ArchetypeDecision |
| Phase 3 | Phase 2 complete | None (all decisions are forced) | StackManifest |
| Phase 4 | Phase 3 complete | None | PRDDraft |
| Phase 5 | Phase 4 complete | None | QualityReport |
| Phase 6 | Phase 5 score < 85 | Max iterations exceeded | Updated PRDDraft |
| Phase 7 | Phase 5 score ≥ 85 | Missing stakeholder approvals | FrozenPRD |

---

## Prerequisite: Intake Readiness Check

Before Phase 1 begins, the pipeline MUST verify the following conditions. If any condition fails,
the pipeline HALTS and issues the corresponding error.

```
READINESS CHECK RULES
──────────────────────────────────────────────────────────────────────────────
CHECK-001  Intake status must be SUBMITTED or APPROVED
           └─ FAIL: "Intake status is ${status}. Submit the intake form first."

CHECK-002  All [REQUIRED] fields must be non-null and non-empty
           └─ FAIL: List all missing required fields

CHECK-003  All enum fields must contain valid option values
           └─ FAIL: "Field ${field} contains invalid value ${value}. Valid options: ${options}"

CHECK-004  Interdependency rules must be satisfied
           └─ FAIL: "Field ${dependent} requires ${dependency} to be set to ${requiredValue}"

CHECK-005  No AMBIGUOUS fields with confidence < 0.7 on REQUIRED questions
           └─ FAIL: Escalate to CLARIFICATION_PROCESS.md

CHECK-006  Intake form version must be compatible with PRD generation engine version
           └─ FAIL: "Intake schema v${intakeVersion} is not supported. Minimum: v1.0.0"
──────────────────────────────────────────────────────────────────────────────
```

If all 6 checks pass, the pipeline logs:

```
✅ READINESS CHECK PASSED
   Intake Form ID: ${intakeFormId}
   Submitted At:   ${submittedAt}
   Submitted By:   ${submittedBy}
   PRD Run ID:     ${prdRunId}   (auto-generated UUID for this generation run)
   Proceeding to Phase 1...
```

---

## Phase 1 — Stability Analysis

Phase 1 analyzes the intake data for architectural contradictions, computes a stability score,
and classifies the overall risk level. This score directly controls Phase 2 (archetype selection)
and is permanently embedded in the generated PRD.

### 1A — Tension Detection Engine

The Tension Detection Engine scans the intake form for contradictions between declared constraints.
Each contradiction is called a **tension**. Tensions are classified by severity.

#### Severity Classifications

| Severity | Code | Definition |
|---|---|---|
| Critical | `CRIT` | A contradiction that, if unresolved, will cause production failure, legal/compliance violation, or complete timeline collapse. Deducts 25 points. |
| Warning | `WARN` | A contradiction that creates operational difficulty, cost overrun, or delivery risk. Deducts 10 points. |
| Info | `INFO` | A friction point that should be noted but does not materially change the architecture. Deducts 0 points but appears in Risk Register. |

#### Tension Report Structure

Every detected tension is recorded as:

```
TENSION-{NNN}
  Severity:    CRIT | WARN | INFO
  Field A:     {intakeFieldName} = {value}
  Field B:     {intakeFieldName} = {value}
  Rule:        {tensionRuleId}
  Description: {human-readable explanation}
  Score Impact: -{points}
  Mitigation:  {what the stakeholder must do to resolve this tension}
```

---

### 1B — Stability Score Computation

The stability score is a 0–100 integer computed as follows:

```
BASE SCORE = 100

For each detected tension:
  IF severity = CRITICAL: score -= 25
  IF severity = WARNING:  score -= 10
  IF severity = INFO:     score -= 0

COMPOSITE AMPLIFICATION (see section 1E):
  IF 3 or more CRITICAL tensions: additional -10 (system is fundamentally unstable)
  IF budget = bootstrap AND timeline ≤ 60 days AND scale ≥ mid_market: additional -15

FLOOR = 0 (score cannot go below 0)

FINAL STABILITY SCORE = MAX(0, BASE_SCORE - sum_of_deductions)
```

The stability score is **deterministic**. Given identical inputs, the score is always identical.
It cannot be adjusted by stakeholder preference or AI judgement.

---

### 1C — Risk Level Classification

The stability score maps to a risk level:

| Score Range | Risk Level | Color Code | Meaning |
|---|---|---|---|
| 75–100 | **Low Risk** | 🟢 | Constraints are coherent. Proceed with standard caution. |
| 50–74 | **Medium Risk** | 🟡 | At least one significant contradiction. Resolve before MVP launch. |
| 25–49 | **High Risk** | 🟠 | Multiple serious contradictions. Stakeholder alignment required before proceeding. |
| 0–24 | **Critical Risk** | 🔴 | System is fundamentally unstable. Pipeline recommends HALT and stakeholder realignment. |

#### Risk Level Consequences

| Risk Level | PRD Generation | Archetype | Stakeholder Review Required |
|---|---|---|---|
| Low Risk | Proceed normally | Standard matrix applies | Optional |
| Medium Risk | Proceed with tension callouts in PRD | Standard matrix applies | Recommended |
| High Risk | Proceed with mandatory ADR for each tension | May force downgrade | Required |
| Critical Risk | Generate PRD but mark as PROVISIONAL | Monolith forced regardless of preference | Mandatory before any downstream work |

---

### 1D — Tension Severity Catalogue

This is the exhaustive catalogue of detectable tensions. Rules are applied in order.
Multiple tensions may fire simultaneously.

#### Budget vs Scale Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-BS-001` | `fundingStage = bootstrap` | `projectScale = enterprise` | Both true | CRIT | Enterprise-scale ambitions require enterprise-grade infrastructure. Bootstrap budget cannot sustain multi-region, HA, compliance, and the team required to operate it. |
| `T-BS-002` | `fundingStage = bootstrap` | `projectScale = mid_market` | Both true | WARN | Mid-market scale with bootstrap budget creates unsustainable unit economics. Plan for re-architecture at Series-A. |
| `T-BS-003` | `fundingStage = seed` | `projectScale = enterprise` | Both true | WARN | Seed funding for enterprise scale introduces architectural debt that compounds. Clarify scale expectations. |
| `T-BS-004` | `fundingStage = bootstrap` | `monthlyInfrastructureBudget < 500` | Both true | WARN | Very low infrastructure budget constrains managed service choices. Expect more operational burden. |
| `T-BS-005` | `fundingStage = bootstrap` | `availabilitySLA = 99.99` | Both true | CRIT | 99.99% availability requires multi-region active-active, automated failover, and 24/7 on-call. Bootstrap budget cannot fund this. |

#### Timeline vs Complexity Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-TC-001` | `architecturePreference = microservices` | `mvpTimelineDays ≤ 28` | Both true | CRIT | Microservices require service mesh, inter-service auth, distributed tracing, and contract testing. A 4-week timeline is insufficient by an order of magnitude. |
| `T-TC-002` | `architecturePreference = microservices` | `mvpTimelineDays ≤ 90` | Both true | WARN | Microservices in under 90 days produces poorly bounded services that must be re-split. Plan for re-architecture. |
| `T-TC-003` | `requiresRealTime = true` | `mvpTimelineDays ≤ 14` | Both true | CRIT | Real-time systems require infrastructure setup (Pub/Sub, WebSocket management, reconnection logic) that cannot be completed in 14 days. |
| `T-TC-004` | `multiTenancyModel = database_per_tenant` | `mvpTimelineDays ≤ 60` | Both true | WARN | Database-per-tenant provisioning requires dynamic schema migration tooling. 60 days is insufficient for production-grade implementation. |
| `T-TC-005` | `devTeamSize = solo` | `mvpTimelineDays ≤ 30` AND `projectScale ≥ mid_market` | All true | CRIT | Solo developer + mid-market scale + sub-30-day timeline produces unmaintainable code that will be rewritten. |
| `T-TC-006` | `testingLayers includes e2e` | `mvpTimelineDays ≤ 21` | Both true | WARN | E2E test infrastructure setup (Playwright, test data seeding, CI integration) requires at least 1 week of dedicated engineering. |

#### Compliance vs Budget Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-CB-001` | `complianceFrameworks includes hipaa` | `fundingStage = bootstrap` | Both true | CRIT | HIPAA compliance requires BAAs, audit logging, encryption at rest/transit, penetration testing, and security policies. Bootstrap budget cannot sustain a compliant HIPAA operation. |
| `T-CB-002` | `complianceFrameworks includes soc2_type2` | `fundingStage = bootstrap` | Both true | CRIT | SOC 2 Type II requires continuous monitoring, a 12-month observation period, and annual audits ($15K–$50K). Bootstrap budget makes this operationally impossible. |
| `T-CB-003` | `complianceFrameworks includes gdpr` | `fundingStage = bootstrap` | Both true | WARN | GDPR requires DPA agreements, data subject request workflows, breach notification systems, and a DPO for large-scale processing. Bootstrap is feasible but requires prioritization. |
| `T-CB-004` | `complianceFrameworks includes pci_dss` | `fundingStage ≤ seed` | Both true | CRIT | PCI DSS Level 1 certification costs $50K–$300K/year in audits and requires dedicated security engineering. This is incompatible with seed-stage funding. |
| `T-CB-005` | `complianceFrameworks includes fedramp` | `fundingStage ≤ series_a` | Both true | CRIT | FedRAMP authorization costs $1M–$3M and takes 12–24 months. Series-A or lower cannot sustain this. |

#### Architecture vs Team Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-AT-001` | `architecturePreference = microservices` | `devTeamSize = solo OR small` | Both true | CRIT | Microservices operated by a solo/small team creates unmanageable operational overhead. Each service requires its own deployment pipeline, monitoring, and on-call rotation. |
| `T-AT-002` | `dbIsolationPerTenant = database_per_tenant` | `devTeamSize = solo` | Both true | WARN | Database-per-tenant with a solo developer means migrations, backups, and failover multiply with tenant count. This is unsustainable. |
| `T-AT-003` | `requiresAI = true` AND `aiDataPrivacy = no_external_ai` | `devTeamSize = solo OR small` | Both true | WARN | Self-hosted LLM inference requires dedicated ML infrastructure expertise and ongoing GPU instance management. Small teams rarely have this capacity. |
| `T-AT-004` | `openTelemetryRequired = true` | `devTeamSize = solo` | Both true | INFO | Full OpenTelemetry setup (traces, metrics, logs) requires non-trivial instrumentation time. Budget appropriately. |

#### Performance vs Infrastructure Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-PI-001` | `targetApiP95 ≤ 100ms` | `cacheLayerRequired = false` | Both true | WARN | Sub-100ms P95 API response without a cache layer requires extremely optimized database queries and will be fragile at scale. |
| `T-PI-002` | `peakRPS ≥ 10000` | `archetype = monolith` | Both true | WARN | 10K+ RPS on a single monolith instance requires horizontal scaling with load balancing and careful session management. Document the scaling plan. |
| `T-PI-003` | `coldStartTolerance = zero` | `deploymentPlatform includes serverless` | Both true | CRIT | Zero cold-start tolerance is incompatible with serverless deployment. Serverless functions have inherent cold-start latency (50–3000ms). |
| `T-PI-004` | `targetFCP ≤ 1s` | `renderingStrategy = client_side_only` | Both true | WARN | Sub-1-second FCP with CSR requires aggressive code splitting, CDN-served assets, and service worker prefetching. SSR or SSG is strongly preferred. |
| `T-PI-005` | `peakRPS ≥ 1000` | `connectionPooling = none` | Both true | CRIT | 1K+ RPS without connection pooling will exhaust database connection limits and cause cascading failures. PgBouncer or equivalent is mandatory. |

#### Real-Time vs Infrastructure Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-RT-001` | `requiresRealTime = true` | `realTimeScale ≥ 10k_concurrent` AND `realTimeProtocol = polling` | All true | CRIT | 10K+ concurrent polling clients create unsustainable server load. WebSocket or SSE infrastructure is required at this scale. |
| `T-RT-002` | `requiresRealTime = true` | `realTimeDeliveryGuarantee = exactly_once` AND `realTimeProtocol = sse` | Both true | WARN | SSE does not natively support exactly-once delivery. A message deduplication layer is required. |
| `T-RT-003` | `requiresRealTime = true` | `deploymentPlatform = vercel` AND `realTimeProtocol = websocket` | Both true | WARN | Vercel serverless functions have a 60-second execution limit, making persistent WebSocket connections impossible. Use a dedicated WebSocket server. |

#### AI / ML vs Compliance Tensions

| Rule ID | Field A | Field B | Condition | Severity | Description |
|---|---|---|---|---|---|
| `T-AC-001` | `aiProvider includes openai OR anthropic` | `complianceFrameworks includes hipaa` | Both true | CRIT | Sending PHI to external AI providers (OpenAI, Anthropic) without a signed BAA violates HIPAA. Verify BAA status or use Azure OpenAI with HIPAA addendum. |
| `T-AC-002` | `aiDataPrivacy = no_external_ai` | `aiProvider includes openai OR anthropic OR gemini` | Both true | CRIT | The intake specifies no external AI data processing but lists external AI providers. This is a direct contradiction. |
| `T-AC-003` | `requiresAI = true` | `aiMonthlyCostCeiling < 100` AND `aiFeatures includes text_generation` | Both true | WARN | Text generation at meaningful scale costs significantly more than $100/month. Cost ceiling may require prompt caching, output length limits, or usage quotas. |

---

### 1E — Composite Tension Amplification

When multiple tensions interact, their combined effect is greater than the sum of their parts.
The following amplification rules apply **after** all individual tensions are computed.

```
AMPLIFICATION RULE A — FUNDAMENTAL INSTABILITY
  Trigger: 3 or more CRITICAL tensions detected
  Additional Deduction: -10 points
  Message: "Three or more critical contradictions indicate fundamental misalignment between
            ambition, budget, timeline, and capacity. The system design cannot be made stable
            without resolving at least two of the three primary constraints."

AMPLIFICATION RULE B — BOOTSTRAPPED OVERREACH
  Trigger: fundingStage = bootstrap AND mvpTimelineDays ≤ 60 AND projectScale ≥ mid_market
  Additional Deduction: -15 points
  Message: "Bootstrap budget + aggressive timeline + mid-market scale is a high-failure
            combination. 78% of projects with this profile require complete architectural
            rework within 18 months. Reduce scope or increase runway before proceeding."

AMPLIFICATION RULE C — COMPLIANCE STACK OVERLOAD
  Trigger: 3 or more compliance frameworks declared AND fundingStage ≤ seed
  Additional Deduction: -10 points
  Message: "Three or more compliance frameworks with seed-stage funding creates an
            engineering team that spends more time on compliance than product. Prioritize
            compliance frameworks by customer requirement, not aspirational certification."

AMPLIFICATION RULE D — SOLO OPERATOR COMPLEXITY OVERLOAD
  Trigger: devTeamSize = solo AND (requiresRealTime = true OR aiDataPrivacy = no_external_ai
           OR multiTenancyModel = database_per_tenant)
  Additional Deduction: -10 points
  Message: "A solo operator with real-time, self-hosted AI, or database-per-tenant multi-tenancy
            creates unsustainable operational complexity. Simplify at least one dimension."
```

---

## Phase 2 — Architecture Archetype Selection

Phase 2 takes the stability score and key intake fields to deterministically select the
architecture archetype. This is not a recommendation — it is a computed decision.

### 2A — Archetype Decision Matrix

The matrix is evaluated **top to bottom**. The **first matching rule** wins.

```
ARCHETYPE DECISION MATRIX
──────────────────────────────────────────────────────────────────────────────────────────
Priority  Condition                                           Archetype       Override
──────────────────────────────────────────────────────────────────────────────────────────
  1       stabilityScore < 50                                monolith        FORCED
  2       fundingStage = bootstrap                           monolith        FORCED
  3       mvpTimelineDays ≤ 42                               monolith        FORCED
  4       devTeamSize = solo                                 monolith        FORCED
  5       CRITICAL tension T-TC-001 detected                 monolith        FORCED
          (microservices + timeline ≤ 28 days)
  6       CRITICAL tension T-AT-001 detected                 monolith        FORCED
          (microservices + solo/small team)
  7       stabilityScore ≥ 50 AND fundingStage = seed        modular_monolith SUGGESTED
          AND projectScale ≤ mid_market
  8       stabilityScore ≥ 70                                modular_monolith SUGGESTED
          AND fundingStage ∈ {seed, series_a}
          AND projectScale ≤ mid_market
  9       stabilityScore ≥ 70                                microservices   SUGGESTED
          AND fundingStage ≥ series_a
          AND projectScale = enterprise
          AND devTeamSize ∈ {large, enterprise}
          AND mvpTimelineDays > 180
 10       All other cases                                    modular_monolith DEFAULT
──────────────────────────────────────────────────────────────────────────────────────────
```

**FORCED** archetype: Stakeholder-declared `architecturePreference` is overridden.
**SUGGESTED** archetype: Stakeholder-declared preference is honored if it matches; otherwise
the matrix archetype is used and the override is documented in an ADR.

---

### 2B — Forced Archetype Override Rules

When the computed archetype overrides the stakeholder's `architecturePreference`, the pipeline:

1. Records an **Architecture Decision Record (ADR-001)** with the override rationale
2. Lists all constraints that forced the override
3. States what constraints must change to unlock the preferred archetype
4. Sets `archetypeOverridden = true` in the PRD metadata
5. Adds the override as a **WARN-level item** in the Quality Gate

**Override Message Template:**

```
ADR-001: Architecture Archetype Override
─────────────────────────────────────────────────────────────────
Stakeholder Preference: ${architecturePreference}
Computed Archetype:     ${computedArchetype}
Override Type:          FORCED

Reason: ${archetype} was declared but is not viable because:
  ${forEach matchedForcingRule}
    - Rule ${ruleId}: ${ruleDescription}
    - Forcing Condition: ${fieldA} = ${valueA}, ${fieldB} = ${valueB}
  ${endForEach}

To unlock ${architecturePreference}:
  ${forEach matchedForcingRule}
    - Change ${fieldName} from ${currentValue} to ${requiredValue}
  ${endForEach}

Impact: This override does not change product functionality. It changes
the deployment topology and team structure required to operate it.
The ${computedArchetype} can evolve to ${architecturePreference} in
Phase 2 of the Evolution Roadmap when constraints change.
─────────────────────────────────────────────────────────────────
```

---

### 2C — Archetype Reasoning Template

For every archetype selection (forced or not), the pipeline generates a mandatory reasoning block:

```
ARCHETYPE DECISION
──────────────────────────────────────────────────────────────────
Selected Archetype:   ${archetype}
Selection Method:     FORCED | SUGGESTED | DEFAULT
Stability Score:      ${score}/100
Risk Level:           ${riskLevel}

Reasoning:
  ${archetype} was selected because:
  ${primary_reason}

  Constraint summary:
  - Funding Stage:    ${fundingStage}
  - Team Size:        ${devTeamSize}
  - MVP Timeline:     ${mvpTimelineDays} days
  - Target Scale:     ${projectScale}
  - Critical Tensions: ${criticalTensionCount}

  This archetype is ${appropriate | suboptimal but forced} for:
  - Budget coherence
  - Team capacity
  - Timeline feasibility
  - Operational complexity
──────────────────────────────────────────────────────────────────
```

---

### 2D — Evolution Path Planning

Every PRD includes a 3-stage evolution roadmap anchored to the selected archetype.

| Archetype at MVP | Stage 1 (MVP) | Stage 2 (Growth) | Stage 3 (Scale) |
|---|---|---|---|
| monolith | Single deployable monolith, vertical scaling | Modular monolith with internal domain separation, horizontal scaling with load balancer | Extract highest-load domains to independent services as justified by traffic data |
| modular_monolith | Internal module boundaries enforced at code level, shared DB | Module-specific caches, read replicas, feature flags for gradual rollout | Extract performance-critical modules to services with dedicated databases |
| microservices | 3–5 bounded services with clear contracts | Service mesh (Istio/Linkerd), distributed tracing, independent deployments | Full service independence, dedicated DBs per service, event-driven integration |

The evolution roadmap is **not a timeline**. It is a capability unlocked when:
- Traffic data justifies decomposition
- Team capacity supports operational overhead
- Budget supports infrastructure expansion

---

## Phase 3 — Stack Prescription Engine

Phase 3 deterministically selects every technology in the stack. Each decision is derived
from intake fields via the decision trees below. No technology is selected by preference
unless all other conditions are equal.

### 3A — Frontend Decision Tree

```
INPUT FIELDS: renderingStrategy, seoRequired, targetFCP, nextjsRouterType, i18nRequired,
              themingRequired, staticExportRequired

FRONTEND FRAMEWORK
  → Always: Next.js (framework is fixed per pipeline scope)

ROUTER TYPE
  IF nextjsRouterType = app_router → Use App Router (recommended)
  IF nextjsRouterType = pages_router → Use Pages Router (document reason in ADR)

RENDERING STRATEGY
  IF seoRequired = true AND renderingStrategy = client_side_only
    → OVERRIDE to hybrid (SSR for public pages, CSR for app)
    → Record ADR: SEO requirement forces SSR for public-facing pages
  IF staticExportRequired = true AND renderingStrategy includes ssr
    → OVERRIDE: Static export is incompatible with SSR dynamic routes
    → Document which routes must be statically exported
  IF targetFCP ≤ 1s AND renderingStrategy = client_side_only
    → ADD WARNING: CSR alone cannot reliably achieve <1s FCP without aggressive optimization
  OTHERWISE → Use declared renderingStrategy

STYLING
  → Always: Tailwind CSS (standardized for this pipeline version)
  → Component library: shadcn/ui (Radix UI primitives, accessible, unstyled base)

THEMING
  IF themingRequired = none → Single theme, Tailwind config only
  IF themingRequired = dark_mode → Tailwind dark mode class strategy
  IF themingRequired = tenant_theming → CSS custom properties per tenant, Next.js middleware
                                        injects tenant theme variables

I18N
  IF i18nRequired = false → No i18n infrastructure
  IF i18nRequired = true → next-intl (App Router compatible, type-safe)
```

---

### 3B — Backend / API Decision Tree

```
INPUT FIELDS: apiArchitecture, apiVersioningStrategy, apiAuthMethod, rateLimitingStrategy,
              apiDocumentation, outboundWebhooks, useResponseEnvelope

API ARCHITECTURE
  IF apiArchitecture = rest → Next.js Route Handlers (app/api/**/route.ts)
  IF apiArchitecture = graphql → Add Apollo Server + type-graphql (document in ADR)
  IF apiArchitecture = trpc → tRPC v11 with Next.js adapter (document in ADR)
  IF apiArchitecture = rest_and_graphql → REST for external, GraphQL for internal BFF

API VERSIONING
  IF apiVersioningStrategy = url_versioning → /api/v1/, /api/v2/ route groups
  IF apiVersioningStrategy = header_versioning → X-API-Version header, middleware routing
  IF apiVersioningStrategy = none → No versioning (document: breaking changes require migration)

RATE LIMITING
  IF rateLimitingStrategy = none → No rate limiting (add INFO tension: security risk)
  IF rateLimitingStrategy = global → upstash/ratelimit with Redis backing
  IF rateLimitingStrategy = per_user → upstash/ratelimit, keyed by user ID
  IF rateLimitingStrategy = tenant_based → upstash/ratelimit, keyed by tenant ID

API DOCUMENTATION
  IF apiDocumentation = none → No documentation (add WARN: DX liability)
  IF apiDocumentation = openapi_manual → swagger-ui-react + manually maintained spec
  IF apiDocumentation = openapi_auto → zod-to-openapi (derives spec from Zod schemas)
  IF apiDocumentation = trpc_panel → Only valid with tRPC architecture

RESPONSE ENVELOPE
  IF useResponseEnvelope = true → Enforce ok()/fail() envelope (mandatory per GOVERNANCE.md)
  IF useResponseEnvelope = false → Add WARN: Inconsistent response shapes create client fragility

OUTBOUND WEBHOOKS
  IF outboundWebhooks = true → Add svix (webhook delivery infrastructure)
                               Record: Svix provides delivery retry, signature verification, portal
```

---

### 3C — Database Selection Engine

```
INPUT FIELDS: primaryDatabase, ormChoice, multiTenancyModel, dbIsolationPerTenant,
              readReplicaRequired, connectionPooling, migrationStrategy, seedingStrategy,
              dataVolumeAt12Months, backupStrategy, analyticsRequired

PRIMARY DATABASE
  IF primaryDatabase = postgresql
    IF fundingStage = bootstrap → Neon (serverless Postgres, no idle cost)
    IF fundingStage = seed → Supabase Postgres OR Neon (scale-based decision)
    IF fundingStage = series_a AND deploymentPlatform = aws → AWS RDS PostgreSQL
    IF fundingStage ≥ series_a AND availabilitySLA ≥ 99.9 → AWS RDS Multi-AZ
    IF fundingStage ≥ series_b AND peakRPS ≥ 5000 → AWS Aurora PostgreSQL (autoscaling)

  IF primaryDatabase = mysql
    IF fundingStage = bootstrap → PlanetScale Hobby (MySQL-compatible, branching)
    IF fundingStage ≥ seed → AWS RDS MySQL Multi-AZ

  IF primaryDatabase = mongodb
    IF fundingStage = bootstrap → MongoDB Atlas M0 (free tier)
    IF fundingStage ≥ seed → MongoDB Atlas M10+ (dedicated)

  IF primaryDatabase = sqlite
    → ONLY permitted for: fundingStage = bootstrap AND devTeamSize = solo
    → Add WARN: SQLite has no concurrent write support; plan migration before any team growth

ORM SELECTION
  IF ormChoice = prisma → Prisma ORM (type-safe, migration-based, this pipeline's standard)
  IF ormChoice = drizzle → Drizzle ORM (lighter, SQL-like, recommended for edge deployments)
  IF ormChoice = typeorm → Add WARN: TypeORM has known N+1 issues; ensure query optimization
  IF ormChoice = raw_sql → Add WARN: No migration tooling; add a migration library (pg-migrate)

MULTI-TENANCY DATABASE ISOLATION
  IF dbIsolationPerTenant = shared_schema → Row-level tenantId on all tenant-scoped tables
  IF dbIsolationPerTenant = schema_level → PostgreSQL schemas per tenant, connection routing
  IF dbIsolationPerTenant = database_per_tenant → Dynamic DB provisioning required
    → Add WARN if devTeamSize = solo OR small: High operational overhead
    → Requires: tenant provisioning service + migration orchestration + backup per tenant

CONNECTION POOLING
  IF connectionPooling = none AND peakRPS ≥ 100 → FORCE PgBouncer
    → Record ADR: Connection pooling forced by RPS requirement
  IF connectionPooling = pgbouncer → PgBouncer sidecar or managed (Railway PgBouncer)
  IF connectionPooling = rds_proxy → AWS RDS Proxy (only for AWS deployments)
  IF connectionPooling = prisma_accelerate → Prisma Accelerate (Prisma's managed proxy)

READ REPLICAS
  IF readReplicaRequired = false AND peakRPS ≥ 5000 → ADD WARN: Consider read replicas
  IF readReplicaRequired = true AND deploymentPlatform = aws → RDS Read Replica (same region)
  IF readReplicaRequired = true AND deploymentPlatform = vercel → Neon read replicas

ANALYTICS
  IF analyticsRequired = true AND dataVolumeAt12Months ≥ 100gb_to_1tb
    → Add ClickHouse or BigQuery for analytics (separate from OLTP DB)
    → Record: OLTP and OLAP on the same database is an anti-pattern at this data volume
  IF analyticsRequired = true AND dataVolumeAt12Months < 100gb_to_1tb
    → Postgres analytics views or Metabase on read replica is sufficient
```

---

### 3D — Caching Layer Decision Tree

```
INPUT FIELDS: cacheLayerRequired, cacheTechnology, cacheTargets, cacheInvalidationStrategy,
              nextjsDataCache, requiresRealTime, rateLimitingStrategy

CACHE LAYER
  IF cacheLayerRequired = false AND rateLimitingStrategy ≠ none
    → FORCE cache layer for rate limit counters
    → Record ADR: Cache required for rate limiting even without explicit cache requirement
  IF cacheLayerRequired = false AND requiresRealTime = true AND realTimeScale ≥ 1k_to_10k
    → FORCE cache layer for pub/sub or presence tracking

CACHE TECHNOLOGY
  IF cacheTechnology = redis
    IF fundingStage = bootstrap → Upstash Redis (serverless, per-request billing, free tier)
    IF fundingStage = seed → Upstash Redis OR Railway Redis
    IF fundingStage ≥ series_a AND deploymentPlatform = aws → AWS ElastiCache (Redis)
    IF fundingStage ≥ series_b AND peakRPS ≥ 5000 → ElastiCache Cluster Mode

  IF cacheTechnology = memcached → Only permitted if no pub/sub requirement; else force Redis
  IF cacheTechnology = none AND cacheLayerRequired = true → FORCE Redis (see above)

CACHE INVALIDATION
  IF cacheInvalidationStrategy = ttl_only → Simple; add WARN for stale data windows
  IF cacheInvalidationStrategy = event_based → Requires domain event bus (see queue section)
  IF cacheInvalidationStrategy = manual → Add WARN: Manual invalidation is error-prone at scale

NEXT.JS DATA CACHE
  IF nextjsDataCache = per_route → Route-level revalidation (revalidatePath / revalidateTag)
  IF nextjsDataCache = aggressive → Static generation with incremental revalidation
  IF nextjsDataCache = disabled → All data fetches bypass Next.js cache (SSR on every request)
```

---

### 3E — Authentication Provider Decision Tree

```
INPUT FIELDS: authLibrary, oauthProviders, sessionStrategy, mfaConfig, complianceFrameworks,
              multiTenancyModel

AUTH LIBRARY
  IF authLibrary = authjs_v5 → Auth.js v5 (Next.js 15 App Router compatible)
  IF authLibrary = authjs_v4 → NextAuth.js v4 (Pages Router; add ADR if using App Router)
  IF authLibrary = clerk → Clerk (hosted, embeddable UI; higher cost but faster time-to-auth)
    → Recommended for: bootstrap + solo developer + no compliance requirements
  IF authLibrary = supabase_auth → Supabase Auth (tied to Supabase DB; check DB selection)
  IF authLibrary = custom → Add CRIT WARN: Custom auth is a security anti-pattern. Use a library.

OAUTH PROVIDERS
  → Email/Password: bcrypt hashing mandatory (never MD5/SHA1)
  → Google: OAuth2 via Auth.js Google provider
  → GitHub: OAuth2 via Auth.js GitHub provider
  → Microsoft: OAuth2 or SAML via Auth.js Microsoft Entra provider
  → SAML: Use @auth/core SAML provider or Okta

COMPLIANCE-DRIVEN AUTH REQUIREMENTS
  IF complianceFrameworks includes hipaa
    → MFA: REQUIRED (TOTP minimum)
    → Session timeout: ≤ 15 minutes idle (configurable)
    → Audit log: Every login, logout, failed attempt must be logged
  IF complianceFrameworks includes soc2_type2
    → MFA: REQUIRED for admin and privileged roles
    → Password policy: minimum 12 chars, complexity enforcement
    → Failed attempt lockout: After 5 failures, 30-minute lockout
  IF complianceFrameworks includes gdpr
    → Session data: Must be deletable on user request
    → Consent: Record auth method and consent timestamp

SESSION STRATEGY
  IF sessionStrategy = database AND authLibrary = authjs_v5
    → Use @auth/prisma-adapter, store sessions in DB
    → Required for: HIPAA (audit trail), SOC 2, session revocation
  IF sessionStrategy = jwt
    → Stateless, no DB lookup per request; trade-off: no instant revocation
  IF sessionStrategy = database AND requiresRealTime = true
    → Session lookup on every WS connection; consider Redis session store for performance

MULTI-TENANCY AUTH
  IF multiTenancyModel ≠ single_tenant
    → Tenant resolution in middleware (read tenant from subdomain, path, or header)
    → Role assignments must be tenant-scoped (not global)
    → Super-admin must be able to impersonate tenant admin (audit logged)
```

---

### 3F — Queue / Job Infrastructure Decision Tree

```
INPUT FIELDS: requiresBackgroundJobs, jobQueuePreference, backgroundJobTypes,
              jobRetryStrategy, jobFailureHandling, deploymentPlatform

QUEUE INFRASTRUCTURE
  IF requiresBackgroundJobs = false → No queue infrastructure
  IF requiresBackgroundJobs = true

    IF jobQueuePreference = inngest
      → Inngest (event-driven, durable execution, built-in retries, Next.js native)
      → Recommended for: all funding stages; no infrastructure to manage
      → Event types map to: scheduled_cron → Inngest cron, event_driven → Inngest event fn

    IF jobQueuePreference = bull_mq
      → BullMQ + Redis (high-throughput queue with job prioritization)
      → Required: Redis instance (see caching section)
      → Recommended for: series_a+ with complex job topologies

    IF jobQueuePreference = trigger_dev
      → Trigger.dev (background jobs as code, OpenTelemetry native)
      → Cloud or self-hosted; good for long-running AI tasks

    IF jobQueuePreference = vercel_cron
      → Vercel Cron Jobs (ONLY for scheduled_cron; no event-driven support)
      → Add WARN if backgroundJobTypes includes event_driven: Vercel Cron cannot handle events

    IF jobQueuePreference = sqs_lambda (AWS)
      → AWS SQS + Lambda (event-driven; high scale; cold start considerations)
      → Add if coldStartTolerance = zero: Use provisioned concurrency

FAILURE HANDLING
  IF dead_letter_queue in jobFailureHandling → Configure DLQ in queue provider
  IF email_alert in jobFailureHandling → Integrate with email delivery provider
  IF slack_alert in jobFailureHandling → Add Slack webhook integration
  IF circuit_breaker in jobFailureHandling → Implement Opossum or similar circuit breaker
  IF dashboard_monitoring in jobFailureHandling → Inngest dashboard (built-in) OR Trigger.dev UI
```

---

### 3G — File Storage Decision Tree

```
INPUT FIELDS: requiresFileStorage, objectStorageProvider, uploadStrategy, acceptedFileTypes,
              maxFileSizeMB, fileProcessing, fileAccessModel, complianceFrameworks

FILE STORAGE
  IF requiresFileStorage = false → No storage infrastructure

  PROVIDER SELECTION
    IF objectStorageProvider = aws_s3
      IF fundingStage = bootstrap → AWS S3 with CloudFront CDN (pay-per-use)
      IF fundingStage ≥ seed → AWS S3 + CloudFront + S3 Transfer Acceleration

    IF objectStorageProvider = cloudflare_r2
      → Cloudflare R2 (S3-compatible, zero egress fees)
      → Recommended for: bootstrap OR high-egress scenarios

    IF objectStorageProvider = vercel_blob
      → Vercel Blob (Vercel-native; limited to 5GB on hobby)
      → Only for: bootstrap + Vercel deployment + small file volumes

    IF objectStorageProvider = supabase_storage
      → Only if primaryDatabase = supabase

  UPLOAD STRATEGY
    IF uploadStrategy = server_proxied
      → Files uploaded to Next.js API route, streamed to storage
      → Add WARN if maxFileSizeMB > 50: Proxied uploads ≥50MB will timeout on serverless
    IF uploadStrategy = client_direct
      → Presigned URL generated by API, client uploads directly to storage
      → Recommended for: all files > 10MB or serverless deployments

  FILE PROCESSING
    IF virus_scanning in fileProcessing → AWS Lambda + ClamAV on S3 upload event
    IF image_resizing in fileProcessing → Add sharp (Node.js) or AWS Lambda@Edge
    IF pdf_extraction in fileProcessing → Add pdf-parse or AWS Textract
    IF metadata_extraction in fileProcessing → Add exifr (images) or tika (documents)

  COMPLIANCE
    IF complianceFrameworks includes hipaa
      → S3 server-side encryption: mandatory (SSE-KMS)
      → Access logging: mandatory (S3 access logs to CloudTrail)
      → Bucket policy: Block public access, enforce VPC endpoint access
```

---

### 3H — Observability Stack Decision Tree

```
INPUT FIELDS: loggingProvider, errorTrackingProvider, apmProvider, openTelemetryRequired,
              metricsAndAlerting, complianceFrameworks, fundingStage

LOGGING
  IF loggingProvider = pino
    → Pino structured JSON logger (built into this pipeline's standard stack)
    → Log transport: stdout → cloud provider ingestion
  IF loggingProvider = datadog → @datadog/datadog-api-client + dd-trace
  IF loggingProvider = axiom → next-axiom (Axiom's Next.js SDK)
  IF loggingProvider = betterstack → logtail-next
  IF fundingStage = bootstrap → Axiom (generous free tier) OR BetterStack (free tier)
  IF fundingStage ≥ series_a → Datadog (unified platform: logs, APM, metrics, alerts)

ERROR TRACKING
  IF errorTrackingProvider = sentry → @sentry/nextjs (standard integration)
  IF errorTrackingProvider = datadog → Datadog Error Tracking (unified with logs)
  IF errorTrackingProvider = highlight → @highlight-run/next (session replay included)

APM
  IF apmProvider = datadog → Datadog APM + Distributed Tracing
  IF apmProvider = new_relic → New Relic APM
  IF apmProvider = none AND openTelemetryRequired = true → Add WARN: No APM backend

OPENTELEMETRY
  IF openTelemetryRequired = true
    → @opentelemetry/sdk-node + @opentelemetry/auto-instrumentations-node
    → Exporter: OTLP to declared APM provider (Datadog, Grafana Cloud, etc.)
    → Instrumentation: HTTP, Prisma, Redis, fetch (all auto-instrumented)
  IF openTelemetryRequired = false AND fundingStage ≥ series_a
    → ADD WARN: Series-A+ systems benefit strongly from distributed tracing

COMPLIANCE OBSERVABILITY
  IF complianceFrameworks includes hipaa
    → Audit log: Dedicated audit trail table (never deleted, 7-year retention default)
    → All PHI access events: logged with user ID, timestamp, resource, action
    → Log access controls: Only compliance officers and auditors can query audit logs
  IF complianceFrameworks includes soc2_type2
    → Security events: Authentication, authorization failures, admin actions
    → Availability metrics: Uptime tracking, incident timelines
    → Change management: Deployment events logged with deployer identity
```

---

### 3I — Hosting / Deployment Decision Tree

```
INPUT FIELDS: deploymentPlatform, managedServicesPreference, containerizationRequired,
              coldStartTolerance, monthlyInfrastructureBudget, cicdPlatform,
              deploymentStrategy, environments

HOSTING PLATFORM
  IF deploymentPlatform = vercel
    IF coldStartTolerance = zero → ADD CRIT: Vercel serverless has cold starts
    IF requiresRealTime = true AND realTimeProtocol = websocket
      → ADD WARN: Vercel does not support persistent WebSocket (60s timeout)
    → Suitable for: bootstrap, seed, series-a (front-end + serverless API)

  IF deploymentPlatform = aws
    IF containerizationRequired = true → AWS ECS Fargate (container orchestration)
    IF containerizationRequired = false → AWS App Runner OR Elastic Beanstalk
    IF peakRPS ≥ 10000 → AWS EKS (Kubernetes; requires dedicated DevOps)
    IF coldStartTolerance = zero → Fargate (always-on containers, no cold start)

  IF deploymentPlatform = railway
    → Railway (container-based, auto-deploy from GitHub; excellent DX)
    → Suitable for: bootstrap to seed; limited enterprise compliance

  IF deploymentPlatform = fly_io
    → Fly.io (global edge deployment, persistent volumes)
    → Suitable for: seed to series-a; good for latency-sensitive global apps

CI/CD
  IF cicdPlatform = github_actions
    → GitHub Actions workflows (standard for this pipeline)
    → Pipeline stages: type-check → lint → test → build → deploy
    IF deploymentStrategy = blue_green → Blue-green deploy via ECS task set swap
    IF deploymentStrategy = canary → Canary via AWS CodeDeploy weight routing
    IF deploymentStrategy = rolling → Rolling update via ECS deployment config
    IF deploymentStrategy = direct → Direct deploy (only for bootstrap/development)

ENVIRONMENTS
  IF environments includes preview
    → Vercel preview deployments OR GitHub Actions ephemeral environments
  IF environments includes staging
    → Dedicated staging cluster mirroring production topology
    → Stage-gated deployment: staging must pass smoke tests before production promote
  IF complianceFrameworks includes hipaa OR soc2_type2
    → Production and staging environments must be isolated (separate AWS accounts recommended)
```


---

## Phase 4 — PRD Document Generation

Phase 4 takes the outputs of Phases 1–3 and generates the full PRD document. Every section
is generated deterministically from computed values — stability score, archetype decision,
and stack manifest. Human-authored narrative is scaffolded with computed data, then reviewed.

### 4A — Mandatory PRD Template Structure

Every generated PRD MUST contain ALL of the following sections in this order.
A PRD missing any mandatory section CANNOT pass the Quality Gate (Phase 5).

```
PRD DOCUMENT STRUCTURE
═══════════════════════════════════════════════════════════════════════════════
BLOCK 0 — METADATA & PIPELINE PROVENANCE
  0.1  PRD Header & Identity
  0.2  Pipeline Provenance Block
  0.3  Stability Analysis Summary
  0.4  Archetype Decision Summary

BLOCK 1 — PRODUCT DEFINITION
  1.1  Executive Summary
  1.2  Problem Statement
  1.3  Opportunity Hypothesis
  1.4  Goals & Non-Goals
  1.5  Success Metrics (KPIs)

BLOCK 2 — USERS & MARKET
  2.1  User Personas
  2.2  User Journey Maps
  2.3  Competitive Landscape (at minimum: 3 competitors)
  2.4  Differentiation Statement

BLOCK 3 — FEATURE REQUIREMENTS
  3.1  Feature Inventory (all features with priority)
  3.2  MVP Feature Set (Phase 1 only)
  3.3  User Stories (for all MVP features)
  3.4  Acceptance Criteria (for all user stories)
  3.5  Out of Scope (explicit list)

BLOCK 4 — NON-FUNCTIONAL REQUIREMENTS
  4.1  Performance Requirements (from intake)
  4.2  Availability & SLA Requirements
  4.3  Security Requirements
  4.4  Compliance Requirements
  4.5  Scalability Requirements
  4.6  Accessibility Requirements

BLOCK 5 — TECHNICAL ARCHITECTURE
  5.1  Architecture Overview
  5.2  Selected Tech Stack (full manifest from Phase 3)
  5.3  System Diagrams (C4 Level 1 and Level 2)
  5.4  Data Model Overview (key entities and relationships)
  5.5  API Surface Overview
  5.6  Infrastructure Overview

BLOCK 6 — ARCHITECTURE DECISION RECORDS
  6.1  ADR-001: Architecture Archetype Selection
  6.2  ADR-002: Database Selection
  6.3  ADR-003: Authentication Strategy
  6.4  ADR-004: Caching Strategy
  6.5  ADR-005: Deployment Platform
  6.x  Additional ADRs for each forced or overridden decision

BLOCK 7 — RISK REGISTER
  7.1  Technical Risks
  7.2  Business Risks
  7.3  Compliance Risks
  7.4  Operational Risks
  7.5  Risk Mitigation Plan

BLOCK 8 — EVOLUTION ROADMAP
  8.1  Stage 1 — Lean MVP (weeks 1–N)
  8.2  Stage 2 — Scalable Startup (months N–N+6)
  8.3  Stage 3 — Enterprise Grade (months N+6–N+18)
  8.4  Architecture Evolution Triggers (what metrics unlock each stage)

BLOCK 9 — DELIVERY PLAN
  9.1  Team Structure & Roles
  9.2  Sprint Structure (milestone breakdown)
  9.3  Dependency Map
  9.4  Definition of Done

BLOCK 10 — APPROVAL & SIGN-OFF
  10.1 Sign-Off Matrix
  10.2 Revision History
  10.3 Downstream Unlock Log
═══════════════════════════════════════════════════════════════════════════════
```

---

### 4B — Section Generation Rules

Each section is generated using a specific set of intake fields and computed values.
The table below defines the mandatory inputs and the generation rule for each section.

| Section | Mandatory Inputs | Generation Rule |
|---|---|---|
| 0.1 PRD Header | intakeFormId, prdRunId, generatedAt | Template substitution |
| 0.2 Pipeline Provenance | stabilityScore, riskLevel, archetype, stackManifest | Computed values block |
| 0.3 Stability Summary | tensionReport | List all tensions with severity + score impact |
| 0.4 Archetype Decision | archetypeDecision, archetypeOverridden, adrs | Archetype reasoning block from Phase 2 |
| 1.1 Executive Summary | projectName, projectDescription, archetype, mvpTimeline | 3-paragraph template: problem, solution, delivery |
| 1.2 Problem Statement | targetUsers, painPoints, currentSolutions | Structured problem template |
| 1.3 Opportunity Hypothesis | marketSize, differentiation, uniqueValue | Hypothesis template |
| 1.4 Goals & Non-Goals | mvpFeatures, outOfScopeFeatures | Explicit goal/non-goal lists |
| 1.5 Success Metrics | performanceTargets, userGrowth, revenueTargets | SMART metrics table |
| 2.1 User Personas | userPersonas (from intake Section 2) | Persona card per user type |
| 2.2 User Journey Maps | primaryUserFlow, authFlow, coreFeatureFlow | Step-by-step journey per persona |
| 2.3 Competitive Landscape | competitors (from intake) or AI-derived | 3-column table: competitor, strength, weakness |
| 2.4 Differentiation | uniqueValue, keyAdvantages | 1-paragraph differentiation statement |
| 3.1 Feature Inventory | allFeatures, priorities | Table: feature, priority, phase, story count |
| 3.2 MVP Feature Set | mvpFeatures, mvpTimelineDays | Scoped feature list with rationale for inclusion |
| 3.3 User Stories | mvpFeatures, userPersonas | As a [persona], I want [feature], so that [outcome] |
| 3.4 Acceptance Criteria | userStories | GIVEN / WHEN / THEN format per story |
| 3.5 Out of Scope | outOfScopeFeatures | Explicit table: feature, reason excluded, future phase |
| 4.1 Performance Req. | targetFCP, targetApiP95, peakRPS | Performance table with targets and measurement methods |
| 4.2 Availability | availabilitySLA, rto, rpo, maintenanceWindows | SLA table with measurement methodology |
| 4.3 Security Req. | securityFeatures, encryptionRequirements | Security controls checklist |
| 4.4 Compliance Req. | complianceFrameworks, piiDataCollected | Compliance obligations table per framework |
| 4.5 Scalability Req. | peakRPS, dataVolumeAt12Months, realTimeScale | Capacity planning table |
| 4.6 Accessibility | accessibilityStandard | WCAG compliance level and testing approach |
| 5.1 Architecture Overview | archetype, stackManifest | Narrative + C4 Level 1 diagram |
| 5.2 Tech Stack | stackManifest (all Phase 3 outputs) | Full stack table with per-technology rationale |
| 5.3 System Diagrams | archetype, services, integrations | ASCII or Mermaid C4 diagrams |
| 5.4 Data Model | entities from intake | Entity relationship table |
| 5.5 API Surface | apiArchitecture, apiVersioning | API endpoint table with method, path, auth |
| 5.6 Infrastructure | deploymentPlatform, environments | Infrastructure topology diagram |
| 6.x ADRs | each forced/overridden decision | ADR template (see section 4J) |
| 7.x Risk Register | tensions + operational risks | Risk table with likelihood, impact, mitigation |
| 8.x Roadmap | evolutionPath, archetype | 3-stage roadmap from Phase 2D |
| 9.1 Team Structure | devTeamSize, skillRequirements | Roles table with responsibilities |
| 9.2 Sprint Structure | mvpTimelineDays, features | Milestone breakdown by sprint |
| 9.3 Dependency Map | integrations, infrastructure | Dependency sequence diagram |
| 9.4 Definition of Done | ciChecks, testingLayers, coverageTargets | DoD checklist |
| 10.1 Sign-Off Matrix | stakeholders | Approval table per role |

---

### 4C — PRD Metadata Block

Every PRD begins with a mandatory metadata block:

```yaml
# PRD METADATA
prd_id:              "PRD-{YYYY}-{sequence}"         # e.g., PRD-2026-001
intake_form_id:      "{UUID from intake}"
prd_run_id:          "{UUID for this generation run}"
prd_version:         "1.0.0"
prd_status:          "DRAFT"                         # DRAFT | UNDER_REVIEW | APPROVED | FROZEN
generated_at:        "{ISO 8601 timestamp}"
generated_by:        "{agent ID or human name}"
pipeline_version:    "1.0.0"

# STABILITY ANALYSIS SUMMARY
stability_score:     {0-100}
risk_level:          "Low | Medium | High | Critical"
tension_count:
  critical:          {integer}
  warning:           {integer}
  info:              {integer}
total_score_deducted: {integer}

# ARCHETYPE DECISION
selected_archetype:  "monolith | modular_monolith | microservices"
selection_method:    "FORCED | SUGGESTED | DEFAULT"
archetype_overridden: true | false
stakeholder_preference: "{architecturePreference from intake}"

# STACK MANIFEST (abbreviated)
stack:
  frontend:         "{framework} + {router} + {styling}"
  backend:          "{api_architecture} via {framework}"
  database:         "{db_technology} via {hosted_provider}"
  orm:              "{ormChoice}"
  cache:            "{cacheTechnology} via {hosted_provider}"
  auth:             "{authLibrary}"
  queue:            "{jobQueuePreference}"
  storage:          "{objectStorageProvider}"
  observability:    "{loggingProvider} + {errorTrackingProvider} + {apmProvider}"
  hosting:          "{deploymentPlatform}"
  cicd:             "{cicdPlatform}"

# QUALITY GATE
quality_score:       null                            # filled after Phase 5
quality_passed:      null
iterations:          0

# APPROVAL
approved_by:         []
approved_at:         null
frozen_at:           null
downstream_unlocked: false
```

---

### 4D — Executive Summary Generation

The executive summary is generated from the following template:

```
EXECUTIVE SUMMARY
─────────────────────────────────────────────────────────────────────
{projectName} is a {projectType} platform designed to {corePurpose}.
The system serves {primaryUserPersona} and {secondaryUserPersona} across
{targetMarket}.

The MVP will be delivered as a {selectedArchetype} architecture using
{frontendStack} and {backendStack}. The system will be hosted on
{deploymentPlatform} with an initial infrastructure budget of
{monthlyInfrastructureBudget}/month.

The stability analysis identified {totalTensionCount} architectural tensions
({criticalCount} critical, {warningCount} warnings), resulting in a stability
score of {stabilityScore}/100 ({riskLevel} Risk). {riskSummaryNarrative}

The MVP scope encompasses {mvpFeatureCount} features targeting delivery
within {mvpTimelineDays} days by a {devTeamSize} team. Success will be
measured by {primarySuccessMetric} within {successTimeframe}.
─────────────────────────────────────────────────────────────────────
```

**Risk Summary Narratives by Risk Level:**

| Risk Level | Generated Narrative |
|---|---|
| Low Risk | "The architectural constraints are coherent and the design is executable within the declared timeline and budget." |
| Medium Risk | "The primary tension is {primaryTension}. This has been documented in ADR-{n} and requires resolution before the {affectedMilestone} milestone." |
| High Risk | "Multiple contradictions require stakeholder alignment before engineering begins. The PRD is marked PROVISIONAL until the tensions in Block 6 are resolved." |
| Critical Risk | "The system as specified is architecturally unstable. This PRD is PROVISIONAL and downstream work is blocked until at least {minimumResolutionCount} critical tensions are resolved." |

---

### 4E — Problem Statement Generation

The problem statement is generated using the structured template:

```
PROBLEM STATEMENT
─────────────────────────────────────────────────────────────────────
Current Situation:
  {targetUsers} currently {currentBehavior}. This requires {currentProcess},
  which is {inefficiencyDescription}.

Pain Points:
  {forEach painPoint}
  - {painPoint.description}: affects {painPoint.affectedPersona},
    occurs {painPoint.frequency}, costs approximately {painPoint.estimatedCost}
  {endForEach}

Root Cause:
  The core problem is {rootCause}. Existing solutions ({competitors[0]},
  {competitors[1]}) address this partially by {existingSolutionApproach}
  but fail to {existingSolutionGap}.

Impact of Inaction:
  If this problem is not solved, {negativeConsequence} which results in
  {businessImpact}.
─────────────────────────────────────────────────────────────────────
```

---

### 4F — Goals & Success Metrics Generation

Goals are separated into product goals and technical goals:

```
PRODUCT GOALS (Phase 1 — MVP)
  P-GOAL-001: {featureName} — {goalDescription}
  P-GOAL-002: {featureName} — {goalDescription}
  ...

TECHNICAL GOALS (Phase 1 — MVP)
  T-GOAL-001: Achieve {targetFCP} FCP for public pages
  T-GOAL-002: Achieve {targetApiP95} P95 API response time at {peakRPS} RPS
  T-GOAL-003: Maintain {availabilitySLA} uptime SLA
  T-GOAL-004: Zero critical security vulnerabilities at launch
  {IF complianceFrameworks is non-empty}
  T-GOAL-005: Pass {complianceFrameworks[0]} audit within {complianceTimeframe}
  {endIF}

NON-GOALS (explicitly out of scope for MVP)
  {forEach outOfScopeFeature}
  - {outOfScopeFeature}: Deferred to {plannedPhase} because {deferralReason}
  {endForEach}

SUCCESS METRICS
  ┌───────────────────────────────────────────────────────────────────┐
  │ Metric              │ Target  │ Measurement      │ Timeframe      │
  ├───────────────────────────────────────────────────────────────────┤
  │ {metric1.name}      │ {value} │ {method}         │ {timeframe}    │
  │ {metric2.name}      │ {value} │ {method}         │ {timeframe}    │
  │ Core Web Vitals FCP │ {fcp}   │ Lighthouse CI    │ Pre-launch     │
  │ API P95 Latency     │ {p95}   │ APM dashboard    │ Week 1+        │
  │ Error Rate          │ < 0.1%  │ Error tracker    │ Week 1+        │
  │ Uptime              │ {sla}   │ Status page      │ Month 1+       │
  └───────────────────────────────────────────────────────────────────┘
```

---

### 4G — User Persona Generation

One persona card is generated per declared user persona:

```
PERSONA: {personaName}
─────────────────────────────────────────────────────────────────────
Role:        {personaRole}
Description: {personaDescription}
Goals:
  - {primaryGoal}
  - {secondaryGoal}
Frustrations:
  - {primaryFrustration}
  - {secondaryFrustration}
Technical Proficiency: {technicalProficiency}
Frequency of Use:      {usageFrequency}
Key Features Used:     {keyFeatures}
Success Definition:    {successDefinition}
─────────────────────────────────────────────────────────────────────
```

User journey maps are generated as a step-by-step sequence for each persona's primary flow:

```
JOURNEY MAP: {personaName} — {flowName}
─────────────────────────────────────────────────────────────────────
Step 1 | TRIGGER        | {triggerEvent}           | Emotion: 😐 Neutral
Step 2 | DISCOVERY      | {discoveryAction}        | Emotion: 🤔 Curious
Step 3 | ONBOARDING     | {onboardingStep}         | Emotion: 😟 Uncertain
Step 4 | ACTIVATION     | {activationStep}         | Emotion: 🎉 Delighted
Step 5 | CORE VALUE     | {coreValueDelivered}     | Emotion: 😊 Satisfied
Step 6 | RETURN HABIT   | {retentionMechanism}     | Emotion: 😊 Satisfied
─────────────────────────────────────────────────────────────────────
Pain Points at Each Step:
  Step 3: {onboardingPainPoint}
  Step 4: {activationBarrier}
─────────────────────────────────────────────────────────────────────
```

---

### 4H — Feature Requirements Generation

All features receive a standardized card format:

```
FEATURE: {featureId} — {featureName}
─────────────────────────────────────────────────────────────────────
Priority:       P0 (MVP) | P1 (Phase 2) | P2 (Phase 3) | P3 (Future)
Category:       Core | Auth | Admin | Integration | Infrastructure
Personas:       {persona1}, {persona2}
Dependencies:   {featureDependencies}

Description:
  {featureDescription}

User Stories:
  US-{id}: As a {persona}, I want to {action}, so that {outcome}.
  US-{id}: As a {persona}, I want to {action}, so that {outcome}.

Acceptance Criteria:
  AC-{id}: GIVEN {context} WHEN {action} THEN {outcome} AND {assertion}
  AC-{id}: GIVEN {context} WHEN {action} THEN {outcome}

Technical Notes:
  - {technicalNote1}
  - {technicalNote2}

Estimated Effort:  {effortEstimate} (S | M | L | XL)
Phase:             {mvpPhase}
─────────────────────────────────────────────────────────────────────
```

---

### 4I — Non-Functional Requirements Generation

NFRs are generated directly from intake fields with measurement methods:

```
NON-FUNCTIONAL REQUIREMENTS
══════════════════════════════════════════════════════════════════════

PERFORMANCE
  NFR-P-001  First Contentful Paint (FCP)
             Target:      {targetFCP}
             Condition:   Measured at P75 on 4G mobile, Lighthouse CI
             Enforcement: CI pipeline fails if Lighthouse FCP > target
             Owner:       Frontend Lead

  NFR-P-002  API Response Time (P95)
             Target:      {targetApiP95}
             Condition:   Measured at {peakRPS} RPS with realistic payload
             Enforcement: APM alert if P95 > target for 5 consecutive minutes
             Owner:       Backend Lead

  NFR-P-003  Database Query Time (P99)
             Target:      < 50ms for primary queries (indexed)
             Condition:   Measured at peak load with production-scale data
             Enforcement: Slow query log alerts on queries > 100ms
             Owner:       Database Engineer

AVAILABILITY
  NFR-A-001  Uptime SLA
             Target:      {availabilitySLA}
             Measurement: External status page + synthetic monitoring
             Penalties:   {slaViolationPenalties}
             RTO:         {rto}
             RPO:         {rpo}

SECURITY
  {forEach securityFeature}
  NFR-S-{n}  {securityFeature.name}
             Requirement: {securityFeature.requirement}
             Verification: {securityFeature.verificationMethod}
  {endForEach}

COMPLIANCE
  {forEach complianceFramework}
  NFR-C-{n}  {complianceFramework} Compliance
             Obligations: {complianceFramework.keyObligations}
             Target Date: {complianceFramework.certificationDate}
             Evidence:    {complianceFramework.evidenceRequirements}
  {endForEach}

SCALABILITY
  NFR-SC-001  Horizontal Scaling
              Trigger:    CPU > 70% for 3 consecutive minutes
              Action:     Auto-scale to {maxInstances} instances
              Recovery:   Scale down when CPU < 40% for 10 minutes

  NFR-SC-002  Database Connection Limits
              Max connections: {maxDbConnections} (via {connectionPooling})
              Pool size per instance: {poolSizePerInstance}
              Alert threshold: Pool utilization > 80%

ACCESSIBILITY
  NFR-ACC-001 {accessibilityStandard} Compliance
              Scope:      All public-facing and authenticated UI
              Testing:    axe-core in CI + manual screen reader testing
              Audit:      Quarterly automated audit via Lighthouse
```

---

### 4J — Architecture Decision Records

An ADR is generated for every significant architectural decision. Format:

```
ADR-{NNN}: {Decision Title}
─────────────────────────────────────────────────────────────────────
Date:        {date}
Status:      ACCEPTED | SUPERSEDED | DEPRECATED
Deciders:    {deciders}
PRD Version: {prdVersion}

CONTEXT
  {contextDescription — what situation made this decision necessary}

DECISION
  {selectedOption}

RATIONALE
  Option A: {option} — {pros} | {cons}
  Option B: {option} — {pros} | {cons}
  Option C: {option} — {pros} | {cons}

  Selected: Option {selectedOption} because {detailedRationale}.

  Intake fields that drove this decision:
  - {intakeField1} = {value1}
  - {intakeField2} = {value2}

  Forcing conditions (if FORCED):
  - {forcingCondition1}
  - {forcingCondition2}

CONSEQUENCES
  Positive:
  - {positiveConsequence1}
  - {positiveConsequence2}

  Negative (accepted trade-offs):
  - {negativeConsequence1}

  Reversibility: EASY | MODERATE | DIFFICULT | IRREVERSIBLE
  Reversal Plan: {reversalInstructions if applicable}

FOLLOW-UP ACTIONS
  - [ ] {action1} — Owner: {owner} — Due: {date}
  - [ ] {action2} — Owner: {owner} — Due: {date}
─────────────────────────────────────────────────────────────────────
```

**Standard ADRs always generated (ADR-001 through ADR-005):**

| ADR | Decision | Always Generated |
|---|---|---|
| ADR-001 | Architecture Archetype Selection | Yes |
| ADR-002 | Database Technology & Hosting | Yes |
| ADR-003 | Authentication Strategy | Yes |
| ADR-004 | Caching Strategy | If cacheLayerRequired = true or forced |
| ADR-005 | Deployment Platform | Yes |
| ADR-006+ | Any additional forced/overridden decision | Conditional |

---

### 4K — Risk Register Generation

The risk register is populated from:
1. All detected tensions (converted to risks)
2. Standard operational risks for the selected archetype
3. Compliance risks if compliance frameworks are declared

```
RISK REGISTER
══════════════════════════════════════════════════════════════════════

FORMAT:
  RISK-{NNN}
    Category:      Technical | Business | Compliance | Operational
    Source:        Tension {tensionId} | Standard | Manual
    Description:   {riskDescription}
    Likelihood:    LOW | MEDIUM | HIGH
    Impact:        LOW | MEDIUM | HIGH | CRITICAL
    Risk Score:    {likelihood × impact} → LOW | MEDIUM | HIGH | CRITICAL
    Mitigation:    {mitigationStrategy}
    Owner:         {roleResponsible}
    Review Date:   {reviewDate}
    Status:        OPEN | MITIGATING | RESOLVED | ACCEPTED

STANDARD RISKS BY ARCHETYPE:

  monolith:
    RISK-STD-001: Deployment coupling — all features deploy together
                  → Mitigation: Feature flags, branch-by-abstraction
    RISK-STD-002: Scaling ceiling — vertical scaling has physical limits
                  → Mitigation: Define horizontal scaling plan at MVP
    RISK-STD-003: Technology lock-in — single-process constraints
                  → Mitigation: Domain module boundaries enable future extraction

  modular_monolith:
    RISK-STD-001: Module boundary drift — modules begin importing each other directly
                  → Mitigation: ESLint import boundary rules, quarterly module audits
    RISK-STD-002: Shared database bottleneck
                  → Mitigation: Read replicas, caching, query optimization

  microservices:
    RISK-STD-001: Distributed system complexity — network failures, partial availability
                  → Mitigation: Circuit breakers, timeout policies, retry budgets
    RISK-STD-002: Data consistency across services — distributed transactions
                  → Mitigation: Saga pattern or eventual consistency acceptance
    RISK-STD-003: Service contract breakage — API changes break consumers
                  → Mitigation: Consumer-driven contract testing (Pact)
══════════════════════════════════════════════════════════════════════
```

---

### 4L — Evolution Roadmap Generation

The roadmap is generated using the 3-stage model from Phase 2D, with intake-specific milestones:

```
EVOLUTION ROADMAP
══════════════════════════════════════════════════════════════════════

STAGE 1 — LEAN MVP
  Duration:    {mvpTimelineDays} days
  Archetype:   {selectedArchetype}
  Goal:        Validate core value proposition with real users
  Definition of Done:
    ✓ All P0 features deployed to production
    ✓ {availabilitySLA} uptime achieved
    ✓ {targetApiP95} P95 API response time verified
    ✓ {primarySuccessMetric} baseline established
    ✓ Security audit passed
    {IF complianceFrameworks is non-empty}
    ✓ Initial {complianceFrameworks[0]} controls implemented
    {endIF}
  Tech Milestones:
    Week 1–2:  Infrastructure setup, CI/CD, auth skeleton
    Week 3–4:  Core data model, primary API routes
    Week N–N:  {featureGroup1} features
    Week N–N:  {featureGroup2} features
    Final week: QA, performance testing, security scan, deploy

STAGE 2 — SCALABLE STARTUP
  Trigger:     {stage2Trigger — e.g., peakRPS consistently > 50% of target}
  Duration:    6 months post-Stage 1
  Changes:
    - {architectureChange1}  (e.g., Add read replicas)
    - {architectureChange2}  (e.g., Introduce Redis caching)
    - {architectureChange3}  (e.g., Extract job processing to queue)
  Team Growth: {teamGrowthPlan}
  Budget:      {stage2BudgetEstimate}/month

STAGE 3 — ENTERPRISE GRADE
  Trigger:     {stage3Trigger — e.g., enterprise customer contract signed}
  Duration:    12–18 months post-Stage 2
  Changes:
    - {architectureChange1}  (e.g., Multi-region deployment)
    - {architectureChange2}  (e.g., Extract high-traffic domains to services)
    - {architectureChange3}  (e.g., Dedicated compliance infrastructure)
  Team Growth: {teamGrowthPlan}
  Budget:      {stage3BudgetEstimate}/month

ARCHITECTURE EVOLUTION TRIGGERS (gates between stages)
  Stage 1 → Stage 2:
    ✓ MRR ≥ ${stage1ToStage2MRR}
    ✓ Consistent load > {loadThreshold} RPS
    ✓ Team size ≥ {teamSizeThreshold}
    ✓ SLA violation count = 0 for 30 consecutive days

  Stage 2 → Stage 3:
    ✓ Enterprise customer signed (ACV ≥ ${enterpriseACV})
    ✓ Compliance certification required by contract
    ✓ Engineering team ≥ {enterpriseTeamSize}
══════════════════════════════════════════════════════════════════════
```


---

## Phase 5 — PRD Quality Gate

Phase 5 scores the generated PRD against a 100-point completeness and consistency model.
A PRD must score ≥ 85 to proceed to Phase 7 (Approval). Any score below 85 triggers Phase 6
(Iteration Loop).

### 5A — Completeness Scoring Model

The quality score is computed by evaluating each mandatory PRD block against a point allocation.
Every block has a maximum score. Partial credit is awarded for partial completion.

```
QUALITY GATE SCORING MODEL
═══════════════════════════════════════════════════════════════════════════════
Block                             Max Points  Scoring Rule
───────────────────────────────────────────────────────────────────────────────
BLOCK 0 — Metadata & Provenance       5       All 4 sections present = 5; else 1pt each
BLOCK 1 — Product Definition         20       4 pts per section (5 sections)
BLOCK 2 — Users & Market             15       5 pts per section (3 sections + differentiation)
BLOCK 3 — Feature Requirements       20       5 pts per section (4 sections)
BLOCK 4 — Non-Functional Req.        10       2 pts per section (5 sections)
BLOCK 5 — Technical Architecture     15       3 pts per section (5 sections)
BLOCK 6 — Architecture Decision Recs  5       1 pt per ADR (min 3 required for full credit)
BLOCK 7 — Risk Register               5       2 pts presence + 1 pt per category covered (min 3)
BLOCK 8 — Evolution Roadmap           3       All 3 stages present = 3; 1 pt each
BLOCK 9 — Delivery Plan               2       Team structure + sprint structure = 2
BLOCK 10 — Approval Matrix            0       Not scored; required for Phase 7
───────────────────────────────────────────────────────────────────────────────
TOTAL                               100
═══════════════════════════════════════════════════════════════════════════════
```

**Scoring Sub-rules for Block 1 (Product Definition):**

| Section | Full Credit (4 pts) | Partial Credit (2 pts) | No Credit (0 pts) |
|---|---|---|---|
| 1.1 Executive Summary | 3 paragraphs, all placeholders filled | Present but < 3 paragraphs | Missing |
| 1.2 Problem Statement | All 4 sub-sections present | 2–3 sub-sections | Missing or only 1 section |
| 1.3 Opportunity Hypothesis | Hypothesis + market size + differentiator | Hypothesis only | Missing |
| 1.4 Goals & Non-Goals | Both goals AND non-goals present | Goals only | Missing |
| 1.5 Success Metrics | ≥ 3 SMART metrics with measurement methods | < 3 metrics | Missing |

**Scoring Sub-rules for Block 3 (Feature Requirements):**

| Section | Full Credit (5 pts) | Partial Credit | No Credit |
|---|---|---|---|
| 3.1 Feature Inventory | All features listed, all priorities set | > 50% of features listed | Missing |
| 3.2 MVP Feature Set | All P0 features scoped with rationale | P0 features listed, no rationale | Missing |
| 3.3 User Stories | ≥ 1 story per P0 feature | Stories for > 50% of P0 features | Missing |
| 3.4 Acceptance Criteria | ≥ 1 AC per user story in GIVEN/WHEN/THEN | AC present for > 50% of stories | Missing |
| 3.5 Out of Scope | Explicit list of excluded features | Implied but not explicit | Missing |

---

### 5B — Internal Consistency Checks

In addition to completeness scoring, the Quality Gate runs 15 consistency checks.
Each FAIL deducts 3 points from the total score (applied after completeness scoring).

```
CONSISTENCY CHECK CATALOGUE
───────────────────────────────────────────────────────────────────────────────
CC-001  Every user story in Block 3 references a persona defined in Block 2
        FAIL deduction: -3 pts | Fix: Add missing persona OR rewrite story

CC-002  Every acceptance criterion references a user story in Block 3.3
        FAIL deduction: -3 pts | Fix: Link or remove orphaned ACs

CC-003  Every ADR in Block 6 references an intake field that drove the decision
        FAIL deduction: -3 pts | Fix: Add intake field references to each ADR

CC-004  Stack manifest in Block 5.2 matches computed stack from Phase 3
        FAIL deduction: -3 pts | Fix: Re-run Phase 3, update Block 5.2

CC-005  Performance targets in Block 4.1 match intake Section 11
        FAIL deduction: -3 pts | Fix: Sync Block 4.1 with intake values

CC-006  Compliance requirements in Block 4.4 match intake Section 13
        FAIL deduction: -3 pts | Fix: Sync Block 4.4 with intake values

CC-007  Evolution roadmap stages in Block 8 are coherent with selected archetype
        (e.g., monolith roadmap must not mention service mesh in Stage 1)
        FAIL deduction: -3 pts | Fix: Regenerate roadmap for archetype

CC-008  Risk register in Block 7 includes at least one risk per detected tension
        FAIL deduction: -3 pts | Fix: Add risks derived from tension report

CC-009  Non-goal list in Block 1.4 does not contradict features in Block 3.1
        (no feature can be both in-scope and explicitly out-of-scope)
        FAIL deduction: -3 pts | Fix: Resolve scope contradiction

CC-010  Sprint plan in Block 9.2 timeline fits within mvpTimelineDays from intake
        FAIL deduction: -3 pts | Fix: Compress or expand sprint plan

CC-011  If archetypeOverridden = true, ADR-001 must be present in Block 6
        FAIL deduction: -3 pts | Fix: Add ADR-001 override record

CC-012  If complianceFrameworks is non-empty, Block 4.4 must have one entry per framework
        FAIL deduction: -3 pts | Fix: Add compliance section per framework

CC-013  If requiresRealTime = true, Block 4.5 scalability section must address
        concurrent connection limits
        FAIL deduction: -3 pts | Fix: Add NFR-SC entry for real-time scale

CC-014  If requiresBackgroundJobs = true, Block 5.2 tech stack must include queue
        infrastructure with the chosen provider
        FAIL deduction: -3 pts | Fix: Add queue entry to tech stack manifest

CC-015  If readReplicaRequired = true, Block 5.6 infrastructure overview must
        include read replica topology
        FAIL deduction: -3 pts | Fix: Update infrastructure diagram

───────────────────────────────────────────────────────────────────────────────
MAXIMUM DEDUCTION FROM CONSISTENCY CHECKS: -45 pts (all 15 fail)
EFFECTIVE MAXIMUM QUALITY SCORE: 100 pts (no deductions)
PASS THRESHOLD: 85 pts
───────────────────────────────────────────────────────────────────────────────
```

---

### 5C — Quality Gate Pass / Fail Rules

```
QUALITY GATE DECISION
──────────────────────────────────────────────────────────────────────────────
IF finalScore ≥ 85:
  status = QUALITY_GATE_PASSED
  → Proceed to Phase 7 (Approval)
  → Log: "✅ PRD Quality Gate PASSED — Score: {score}/100. Routing to approval workflow."

IF finalScore ≥ 70 AND finalScore < 85:
  status = QUALITY_GATE_FAILED_SOFT
  → Trigger Phase 6 (Iteration — targeted fixes only)
  → Log: "⚠️  PRD Quality Gate FAILED — Score: {score}/100. {failedSections} require revision."
  → List all sections that lost points with specific remediation instructions

IF finalScore < 70:
  status = QUALITY_GATE_FAILED_HARD
  → Trigger Phase 6 (Iteration — full regeneration of failing blocks)
  → Log: "❌ PRD Quality Gate FAILED HARD — Score: {score}/100. Major sections are incomplete."
  → List all failing blocks with regeneration instructions

IF 3 or more consistency checks FAILED:
  status = QUALITY_GATE_CONSISTENCY_FAILURE
  → Trigger Phase 6 regardless of completeness score
  → Log: "❌ PRD Consistency Check FAILED — {n} internal contradictions detected."
  → List all failed consistency checks with specific fix instructions

──────────────────────────────────────────────────────────────────────────────
Quality Report is attached to the PRD metadata block:
  quality_score:    {finalScore}
  quality_passed:   {true | false}
  failed_sections:  [{sectionId, pointsLost, remediationInstruction}]
  failed_checks:    [{checkId, description, fix}]
──────────────────────────────────────────────────────────────────────────────
```

---

## Phase 6 — PRD Iteration & Clarification Loop

Phase 6 is triggered when the Quality Gate fails. It identifies what changed, what must be
regenerated, and feeds the corrections back through Phase 4 for the affected sections only.

### 6A — When Iteration Is Triggered

| Trigger | Iteration Type | Scope |
|---|---|---|
| Completeness score < 85, ≥ 70 | Targeted Revision | Only sections that lost points |
| Completeness score < 70 | Full Block Regeneration | All blocks scoring < 50% |
| Consistency check failure | Targeted Fix | Specific sections identified by failed check |
| Intake clarification received | Cascading Update | All sections dependent on changed field |
| Stakeholder revision request | Manual Override | Specified sections + dependent sections |

---

### 6B — Partial Regeneration Rules

When only specific sections need regeneration, the pipeline uses dependency tracking to
determine which other sections may be affected:

```
SECTION DEPENDENCY MAP
──────────────────────────────────────────────────────────────────────────────
Section Changed          Dependent Sections That May Need Update
──────────────────────────────────────────────────────────────────────────────
1.2 Problem Statement  → 1.1 Executive Summary, 1.3 Opportunity Hypothesis
1.4 Goals & Non-Goals  → 3.5 Out of Scope, 9.2 Sprint Structure
2.1 User Personas      → 3.3 User Stories, 2.2 Journey Maps
3.1 Feature Inventory  → 3.2 MVP Feature Set, 9.2 Sprint Structure, 7.x Risk Register
3.2 MVP Feature Set    → 3.3 User Stories, 3.4 Acceptance Criteria, 9.2 Sprint Structure
4.1 Performance Req.   → 5.2 Tech Stack (if stack change needed), 7.x Risk Register
4.4 Compliance Req.    → 5.2 Tech Stack, 6.x ADRs, 7.x Compliance Risks
5.2 Tech Stack         → 5.3 System Diagrams, 5.6 Infrastructure, 6.x ADRs
6.x ADRs               → 7.x Technical Risks (risk register may need new entries)
7.x Risk Register      → No downstream dependents (leaf node)
8.x Evolution Roadmap  → 9.2 Sprint Structure (Stage 1 milestones)
──────────────────────────────────────────────────────────────────────────────
```

**Cascade Policy:** When a section is regenerated, ALL dependent sections are flagged
for review. If the regenerated section's content is materially different from the
previous version, dependent sections are automatically queued for regeneration.

---

### 6C — Iteration Convergence Criteria

An iteration is considered **converged** when:

1. Quality Gate score ≥ 85
2. Zero consistency check failures
3. No sections are still flagged with remediation instructions
4. All intake clarifications have been incorporated (if triggered by clarification)

If an iteration does not converge, the quality score delta is computed:

```
IF (newScore - previousScore) < 5 for 2 consecutive iterations:
  status = ITERATION_STALLED
  → Escalate to human review
  → Log: "PRD generation has stalled. Score improved by only {delta} pts in 2 iterations.
          Manual review required for: {stalledSections}"
```

---

### 6D — Maximum Iteration Budget

```
ITERATION BUDGET
──────────────────────────────────────────────────────────────────────────────
Maximum automated iterations:  5
After 5 failed iterations:     PRD status = MANUAL_REVIEW_REQUIRED
                                Pipeline halts automated generation
                                Human operator must intervene

Iteration Log Format:
  Iteration 1: Score {n1}/100 — Sections revised: {sections}
  Iteration 2: Score {n2}/100 — Sections revised: {sections}
  ...
  Iteration N: Score {nN}/100 — Status: {PASSED | MANUAL_REVIEW_REQUIRED}

Each iteration is stored with its quality report, failed sections, and
the specific changes made, creating a full audit trail.
──────────────────────────────────────────────────────────────────────────────
```


---

## Phase 7 — PRD Approval & Freeze Workflow

Phase 7 manages the transition from a quality-passing PRD draft to a stakeholder-approved,
immutable frozen document that unlocks downstream pipeline stages.

### 7A — Approval State Machine

```
PRD STATUS STATE MACHINE
══════════════════════════════════════════════════════════════════════

  DRAFT ──────────────────────────────────────────────► UNDER_REVIEW
    │  (Phase 4 complete, Quality Gate not yet run)    (Quality Gate ≥ 85)
    │
    │  Quality Gate < 85
    ▼
  REVISION_REQUIRED ──────────────────────────────────► UNDER_REVIEW
    (Phase 6 iteration in progress)                   (After iteration passes)

  UNDER_REVIEW ───────────────────────────────────────► APPROVED
    │  (Awaiting stakeholder sign-offs)               (All required approvals obtained)
    │
    │  Stakeholder requests changes
    ▼
  REVISION_REQUIRED

  APPROVED ────────────────────────────────────────────► FROZEN
    │  (All sign-offs collected, cooling-off period)  (Freeze triggered by team lead)
    │
    │  Critical issue discovered pre-freeze
    ▼
  UNDER_REVIEW

  FROZEN (TERMINAL STATE)
    → No mutations permitted
    → All downstream documents reference this frozen PRD ID
    → New intake form required to change any requirement

══════════════════════════════════════════════════════════════════════

VALID TRANSITIONS:
  DRAFT           → UNDER_REVIEW        (trigger: quality gate passed)
  DRAFT           → REVISION_REQUIRED   (trigger: quality gate failed)
  REVISION_REQUIRED → UNDER_REVIEW      (trigger: iteration passed quality gate)
  UNDER_REVIEW    → APPROVED            (trigger: all required approvals received)
  UNDER_REVIEW    → REVISION_REQUIRED   (trigger: stakeholder requested changes)
  APPROVED        → FROZEN              (trigger: team lead confirms freeze)
  APPROVED        → UNDER_REVIEW        (trigger: critical pre-freeze issue found)

INVALID TRANSITIONS (pipeline rejects):
  FROZEN → any state    (terminal; requires new intake form)
  APPROVED → DRAFT      (cannot regress past review)
  FROZEN → DRAFT        (terminal; no regression)
```

---

### 7B — Stakeholder Sign-Off Matrix

The required approvers are determined by the funding stage and compliance requirements:

```
SIGN-OFF MATRIX BY CONTEXT
══════════════════════════════════════════════════════════════════════

BOOTSTRAP / SOLO:
  Required:  1 sign-off (Founder / Technical Lead)
  Optional:  Early customer validation

SEED / SMALL TEAM:
  Required:  2 sign-offs
    ✓ Technical Lead (architecture accuracy)
    ✓ Product Owner (feature completeness, business goals)
  Optional:  Investor / Advisor

SERIES-A / MEDIUM TEAM:
  Required:  3 sign-offs
    ✓ CTO / Engineering Lead (technical architecture)
    ✓ Product Manager (user requirements, success metrics)
    ✓ Design Lead (UX requirements, persona accuracy)
  Optional:  Legal (if compliance frameworks declared)

SERIES-B+ / ENTERPRISE:
  Required:  4–6 sign-offs
    ✓ CTO (architecture ownership)
    ✓ VP of Engineering (delivery plan feasibility)
    ✓ CPO / Product Director (product definition)
    ✓ Security Lead (security and compliance requirements)
    ✓ Legal / Compliance Officer (if compliance frameworks declared)
    ✓ Finance Lead (if infrastructure budget declared)

COMPLIANCE-DRIVEN ADDITIONAL APPROVERS:
  IF complianceFrameworks includes hipaa:
    + HIPAA Compliance Officer (required; cannot freeze without this)
  IF complianceFrameworks includes soc2_type2:
    + Security Officer (required)
  IF complianceFrameworks includes gdpr:
    + Data Protection Officer (required if large-scale processing)
  IF complianceFrameworks includes pci_dss:
    + QSA (Qualified Security Assessor) review recommended

══════════════════════════════════════════════════════════════════════

SIGN-OFF RECORD FORMAT:
  Approver:    {name}
  Role:        {role}
  Approved At: {ISO 8601 timestamp}
  Method:      Digital signature | Documented email | Pull request approval
  Comments:    {optional comments}
  Conditions:  {any conditions attached to approval}
```

---

### 7C — Immutability Contract

```
IMMUTABILITY CONTRACT
──────────────────────────────────────────────────────────────────────────────
Once a PRD reaches status = FROZEN:

RULE-IMM-001  No field in the PRD document may be modified.
RULE-IMM-002  No section may be added or removed.
RULE-IMM-003  The frozen PRD ID ({prdId}) is permanently associated with
              the Intake Form ID ({intakeFormId}).
RULE-IMM-004  All downstream documents (CLARIFICATION_PROCESS.md outputs,
              FINALIZATION.md outputs, database schema, API contracts) MUST
              reference the frozen PRD ID.
RULE-IMM-005  If any requirement changes after freeze, a NEW intake form must
              be created. The new intake goes through the full pipeline from
              Phase 1. The existing frozen PRD is NOT modified.
RULE-IMM-006  A PRD supersession record is created linking the old frozen PRD
              to the new PRD when the new PRD is frozen.
RULE-IMM-007  The frozen PRD is stored in version control with an immutable tag:
              prd/{prdId}/frozen

RATIONALE:
  Immutability ensures that:
  - Database schemas built from this PRD have a stable reference
  - API contracts designed from this PRD do not drift
  - Team members working from this PRD are not surprised by silent changes
  - Audit trails for compliance can reference a stable document

  "Change the inputs, not the outputs. If the inputs change,
   run the pipeline again." — Pipeline Design Principle
──────────────────────────────────────────────────────────────────────────────
```

---

### 7D — Downstream Unlock Sequence

When a PRD is frozen, it unlocks the following downstream pipeline stages in order:

```
DOWNSTREAM UNLOCK SEQUENCE
══════════════════════════════════════════════════════════════════════

Frozen PRD → UNLOCKS:

  STEP 1  CLARIFICATION_PROCESS.md (Document 3)
          └─ Ambiguity resolution for any remaining open questions
          └─ Only if open ambiguities exist in the frozen PRD
          └─ If no ambiguities: skip directly to Step 2

  STEP 2  FINALIZATION.md (Document 4)
          └─ Final tech stack document (exhaustive, code-ready)
          └─ Project overview / build contract
          └─ Database schema design brief
          └─ API contract specification brief

  STEP 3  FOLDER_STRUCTURE generation
          └─ Final folder structure for the specific project
          └─ Derived from archetype + tech stack + feature set

  STEP 4  DATABASE SCHEMA DESIGN
          └─ Prisma schema generation from data model in PRD Block 5.4
          └─ Migration strategy from intake Section 18

  STEP 5  API CONTRACT SPECIFICATION
          └─ OpenAPI spec generation from PRD Block 5.5
          └─ Zod schema generation for all request/response types

  STEP 6  ENGINEERING TASK BREAKDOWN
          └─ Sprint plan from PRD Block 9.2 converted to engineering tasks
          └─ Dependencies from PRD Block 9.3

══════════════════════════════════════════════════════════════════════

unlock_log format:
  {
    prd_frozen_at:         "ISO 8601 timestamp",
    prd_id:                "PRD-{YYYY}-{sequence}",
    intake_form_id:        "UUID",
    downstream_unlocked:   true,
    unlock_sequence_state: {
      clarification:       "SKIPPED | IN_PROGRESS | COMPLETE",
      finalization:        "PENDING | IN_PROGRESS | COMPLETE",
      folder_structure:    "PENDING | IN_PROGRESS | COMPLETE",
      database_schema:     "PENDING | IN_PROGRESS | COMPLETE",
      api_contracts:       "PENDING | IN_PROGRESS | COMPLETE",
      task_breakdown:      "PENDING | IN_PROGRESS | COMPLETE"
    }
  }
```

---

## TypeScript Interfaces

The following interfaces define the complete type system for the PRD generation pipeline.
All pipeline code operates on these types. No `any` types are permitted.

```typescript
// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export enum RiskLevel {
  Low      = "Low",
  Medium   = "Medium",
  High     = "High",
  Critical = "Critical",
}

export enum TensionSeverity {
  Critical = "CRIT",
  Warning  = "WARN",
  Info     = "INFO",
}

export enum ArchitectureArchetype {
  Monolith        = "monolith",
  ModularMonolith = "modular_monolith",
  Microservices   = "microservices",
}

export enum ArchetypeSelectionMethod {
  Forced    = "FORCED",
  Suggested = "SUGGESTED",
  Default   = "DEFAULT",
}

export enum PRDStatus {
  Draft               = "DRAFT",
  RevisionRequired    = "REVISION_REQUIRED",
  UnderReview         = "UNDER_REVIEW",
  Approved            = "APPROVED",
  Frozen              = "FROZEN",
  ManualReviewRequired = "MANUAL_REVIEW_REQUIRED",
}

export enum FeaturePriority {
  P0 = "P0",  // MVP — required for launch
  P1 = "P1",  // Phase 2 — immediately post-MVP
  P2 = "P2",  // Phase 3 — growth stage
  P3 = "P3",  // Future — no committed date
}

export enum ADRStatus {
  Accepted    = "ACCEPTED",
  Superseded  = "SUPERSEDED",
  Deprecated  = "DEPRECATED",
}

export enum RiskCategory {
  Technical    = "Technical",
  Business     = "Business",
  Compliance   = "Compliance",
  Operational  = "Operational",
}

export enum RiskLikelihood {
  Low    = "LOW",
  Medium = "MEDIUM",
  High   = "HIGH",
}

export enum RiskImpact {
  Low      = "LOW",
  Medium   = "MEDIUM",
  High     = "HIGH",
  Critical = "CRITICAL",
}

export enum RiskStatus {
  Open       = "OPEN",
  Mitigating = "MITIGATING",
  Resolved   = "RESOLVED",
  Accepted   = "ACCEPTED",
}

export enum QualityGateStatus {
  Passed                = "QUALITY_GATE_PASSED",
  FailedSoft            = "QUALITY_GATE_FAILED_SOFT",
  FailedHard            = "QUALITY_GATE_FAILED_HARD",
  ConsistencyFailure    = "QUALITY_GATE_CONSISTENCY_FAILURE",
}

export enum EvolutionStage {
  Stage1 = "STAGE_1_LEAN_MVP",
  Stage2 = "STAGE_2_SCALABLE_STARTUP",
  Stage3 = "STAGE_3_ENTERPRISE_GRADE",
}

export enum DownstreamStage {
  Clarification    = "clarification",
  Finalization     = "finalization",
  FolderStructure  = "folder_structure",
  DatabaseSchema   = "database_schema",
  ApiContracts     = "api_contracts",
  TaskBreakdown    = "task_breakdown",
}

export enum DownstreamStageStatus {
  Skipped     = "SKIPPED",
  Pending     = "PENDING",
  InProgress  = "IN_PROGRESS",
  Complete    = "COMPLETE",
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 — STABILITY ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────

export interface Tension {
  id:            string;           // e.g., "TENSION-001"
  severity:      TensionSeverity;
  ruleId:        string;           // e.g., "T-BS-001"
  fieldA:        { name: string; value: unknown };
  fieldB:        { name: string; value: unknown };
  description:   string;
  scoreImpact:   number;           // 0, 10, or 25
  mitigation:    string;
}

export interface AmplificationResult {
  ruleId:        string;           // e.g., "AMPLIFICATION_RULE_A"
  triggered:     boolean;
  additionalDeduction: number;
  message:       string;
}

export interface TensionReport {
  tensions:               Tension[];
  amplifications:         AmplificationResult[];
  criticalCount:          number;
  warningCount:           number;
  infoCount:              number;
  totalScoreDeducted:     number;
}

export interface StabilityAnalysis {
  baseScore:        100;
  tensionReport:    TensionReport;
  finalScore:       number;        // 0–100
  riskLevel:        RiskLevel;
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 2 — ARCHETYPE DECISION
// ─────────────────────────────────────────────────────────────────────────────

export interface ArchetypeDecision {
  selectedArchetype:        ArchitectureArchetype;
  selectionMethod:          ArchetypeSelectionMethod;
  matchedRuleId:            string;           // which matrix rule fired
  archetypeOverridden:      boolean;
  stakeholderPreference:    ArchitectureArchetype | null;
  reasoning:                string;
  forcingConditions:        string[];         // populated if selectionMethod = FORCED
  unlockConditions:         string[];         // what must change to unlock preferred archetype
}

export interface EvolutionStageDefinition {
  stage:           EvolutionStage;
  archetype:       ArchitectureArchetype;
  durationNote:    string;
  changes:         string[];
  teamGrowthPlan:  string;
  budgetEstimate:  string;
  trigger:         string;         // what metric unlocks transition to this stage
}

export interface EvolutionRoadmap {
  stages:                  EvolutionStageDefinition[];
  stage1to2Triggers:       string[];
  stage2to3Triggers:       string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 3 — STACK MANIFEST
// ─────────────────────────────────────────────────────────────────────────────

export interface StackDecision {
  layer:           string;         // e.g., "database", "cache", "auth"
  selected:        string;         // e.g., "PostgreSQL via Neon"
  rationale:       string;
  alternatives:    string[];
  forced:          boolean;
  forcingReason:   string | null;
  adrs:            string[];       // ADR IDs that document this decision
}

export interface StackManifest {
  frontend:        StackDecision;
  backend:         StackDecision;
  database:        StackDecision;
  orm:             StackDecision;
  cache:           StackDecision | null;
  auth:            StackDecision;
  queue:           StackDecision | null;
  storage:         StackDecision | null;
  observability:   StackDecision;
  hosting:         StackDecision;
  cicd:            StackDecision;
  additionalTools: StackDecision[];
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 4 — PRD DOCUMENT STRUCTURES
// ─────────────────────────────────────────────────────────────────────────────

export interface PRDMetadata {
  prdId:              string;      // "PRD-{YYYY}-{sequence}"
  intakeFormId:       string;      // UUID from intake
  prdRunId:           string;      // UUID for this generation run
  prdVersion:         string;      // semver
  prdStatus:          PRDStatus;
  generatedAt:        Date;
  generatedBy:        string;
  pipelineVersion:    string;
  stabilityScore:     number;
  riskLevel:          RiskLevel;
  selectedArchetype:  ArchitectureArchetype;
  selectionMethod:    ArchetypeSelectionMethod;
  archetypeOverridden: boolean;
  qualityScore:       number | null;
  qualityPassed:      boolean | null;
  iterations:         number;
  approvedBy:         SignOff[];
  approvedAt:         Date | null;
  frozenAt:           Date | null;
  downstreamUnlocked: boolean;
}

export interface SignOff {
  approverName:   string;
  approverRole:   string;
  approvedAt:     Date;
  method:         "digital_signature" | "documented_email" | "pr_approval";
  comments:       string | null;
  conditions:     string | null;
}

export interface UserPersona {
  personaId:             string;
  personaName:           string;
  personaRole:           string;
  description:           string;
  primaryGoal:           string;
  secondaryGoal:         string;
  primaryFrustration:    string;
  secondaryFrustration:  string;
  technicalProficiency:  "none" | "basic" | "intermediate" | "advanced" | "expert";
  usageFrequency:        "daily" | "weekly" | "monthly" | "occasional";
  keyFeatures:           string[];
  successDefinition:     string;
}

export interface UserStory {
  storyId:       string;      // "US-{featureId}-{n}"
  featureId:     string;
  personaId:     string;
  asA:           string;      // persona name
  iWant:         string;      // action
  soThat:        string;      // outcome
  priority:      FeaturePriority;
  acceptanceCriteria: AcceptanceCriterion[];
  estimatedEffort: "S" | "M" | "L" | "XL";
}

export interface AcceptanceCriterion {
  acId:          string;      // "AC-{storyId}-{n}"
  storyId:       string;
  given:         string;
  when:          string;
  then:          string;
  additionalAssertions: string[];
}

export interface Feature {
  featureId:     string;
  featureName:   string;
  priority:      FeaturePriority;
  category:      "Core" | "Auth" | "Admin" | "Integration" | "Infrastructure";
  description:   string;
  personaIds:    string[];
  dependencies:  string[];
  userStories:   UserStory[];
  technicalNotes: string[];
  estimatedEffort: "S" | "M" | "L" | "XL";
  phase:         number;
}

export interface ADR {
  adrId:         string;      // "ADR-{NNN}"
  title:         string;
  date:          Date;
  status:        ADRStatus;
  deciders:      string[];
  prdVersion:    string;
  context:       string;
  decision:      string;
  options:       { label: string; pros: string[]; cons: string[] }[];
  selectedOption: string;
  rationale:     string;
  intakeFieldsConsidered: { fieldName: string; value: unknown }[];
  forcingConditions: string[];
  positiveConsequences: string[];
  negativeConsequences: string[];
  reversibility:  "EASY" | "MODERATE" | "DIFFICULT" | "IRREVERSIBLE";
  reversalPlan:   string | null;
  followUpActions: { action: string; owner: string; dueDate: Date }[];
}

export interface Risk {
  riskId:        string;      // "RISK-{NNN}"
  category:      RiskCategory;
  source:        string;      // tension ID, "Standard", or "Manual"
  description:   string;
  likelihood:    RiskLikelihood;
  impact:        RiskImpact;
  riskScore:     "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  mitigation:    string;
  owner:         string;
  reviewDate:    Date;
  status:        RiskStatus;
}

export interface PerformanceRequirement {
  nfrId:         string;      // "NFR-P-{n}"
  metric:        string;
  target:        string;
  condition:     string;
  enforcement:   string;
  owner:         string;
}

export interface ComplianceRequirement {
  nfrId:         string;      // "NFR-C-{n}"
  framework:     string;
  obligations:   string[];
  targetDate:    string;
  evidenceRequired: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 5 — QUALITY GATE
// ─────────────────────────────────────────────────────────────────────────────

export interface SectionScore {
  sectionId:     string;
  sectionName:   string;
  maxPoints:     number;
  earnedPoints:  number;
  remediationInstruction: string | null;
}

export interface ConsistencyCheckResult {
  checkId:       string;      // "CC-{NNN}"
  passed:        boolean;
  description:   string;
  deduction:     number;      // 0 if passed, 3 if failed
  fix:           string | null;
}

export interface QualityReport {
  prdRunId:               string;
  iterationNumber:        number;
  completenessScore:      number;
  consistencyDeduction:   number;
  finalScore:             number;
  status:                 QualityGateStatus;
  sectionScores:          SectionScore[];
  consistencyChecks:      ConsistencyCheckResult[];
  failedSections:         SectionScore[];
  failedChecks:           ConsistencyCheckResult[];
  generatedAt:            Date;
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 7 — APPROVAL & DOWNSTREAM
// ─────────────────────────────────────────────────────────────────────────────

export interface DownstreamUnlockLog {
  prdFrozenAt:         Date;
  prdId:               string;
  intakeFormId:        string;
  downstreamUnlocked:  boolean;
  unlockSequenceState: Record<DownstreamStage, DownstreamStageStatus>;
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP-LEVEL: FULL PRD GENERATION RUN
// ─────────────────────────────────────────────────────────────────────────────

export interface PRDGenerationRun {
  // Inputs
  intakeFormId:       string;
  prdRunId:           string;

  // Phase outputs
  readinessCheckPassed: boolean;
  readinessErrors:    string[];
  stabilityAnalysis:  StabilityAnalysis;
  archetypeDecision:  ArchetypeDecision;
  evolutionRoadmap:   EvolutionRoadmap;
  stackManifest:      StackManifest;
  adrs:               ADR[];
  risks:              Risk[];
  features:           Feature[];
  personas:           UserPersona[];
  qualityReports:     QualityReport[];

  // Final state
  metadata:           PRDMetadata;
  downstreamUnlockLog: DownstreamUnlockLog | null;
}
```

---

## Zod Validation Schemas

```typescript
import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export const RiskLevelSchema = z.enum(["Low", "Medium", "High", "Critical"]);

export const TensionSeveritySchema = z.enum(["CRIT", "WARN", "INFO"]);

export const ArchetypeSchema = z.enum([
  "monolith",
  "modular_monolith",
  "microservices",
]);

export const ArchetypeSelectionMethodSchema = z.enum([
  "FORCED",
  "SUGGESTED",
  "DEFAULT",
]);

export const PRDStatusSchema = z.enum([
  "DRAFT",
  "REVISION_REQUIRED",
  "UNDER_REVIEW",
  "APPROVED",
  "FROZEN",
  "MANUAL_REVIEW_REQUIRED",
]);

export const FeaturePrioritySchema = z.enum(["P0", "P1", "P2", "P3"]);

export const ADRStatusSchema = z.enum(["ACCEPTED", "SUPERSEDED", "DEPRECATED"]);

export const RiskCategorySchema = z.enum([
  "Technical",
  "Business",
  "Compliance",
  "Operational",
]);

export const RiskScoreSchema = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);

export const QualityGateStatusSchema = z.enum([
  "QUALITY_GATE_PASSED",
  "QUALITY_GATE_FAILED_SOFT",
  "QUALITY_GATE_FAILED_HARD",
  "QUALITY_GATE_CONSISTENCY_FAILURE",
]);

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1
// ─────────────────────────────────────────────────────────────────────────────

export const TensionSchema = z.object({
  id:          z.string().regex(/^TENSION-\d{3}$/),
  severity:    TensionSeveritySchema,
  ruleId:      z.string().regex(/^T-[A-Z]{2}-\d{3}$/),
  fieldA:      z.object({ name: z.string(), value: z.unknown() }),
  fieldB:      z.object({ name: z.string(), value: z.unknown() }),
  description: z.string().min(10),
  scoreImpact: z.union([z.literal(0), z.literal(10), z.literal(25)]),
  mitigation:  z.string().min(10),
});

export const TensionReportSchema = z.object({
  tensions:             z.array(TensionSchema),
  amplifications:       z.array(z.object({
    ruleId:             z.string(),
    triggered:          z.boolean(),
    additionalDeduction: z.number().int().min(0),
    message:            z.string(),
  })),
  criticalCount:        z.number().int().min(0),
  warningCount:         z.number().int().min(0),
  infoCount:            z.number().int().min(0),
  totalScoreDeducted:   z.number().int().min(0),
});

export const StabilityAnalysisSchema = z.object({
  baseScore:     z.literal(100),
  tensionReport: TensionReportSchema,
  finalScore:    z.number().int().min(0).max(100),
  riskLevel:     RiskLevelSchema,
}).refine(
  (d) => {
    const computed = Math.max(0, d.baseScore - d.tensionReport.totalScoreDeducted);
    return d.finalScore === computed;
  },
  { message: "finalScore must equal baseScore minus totalScoreDeducted (floored at 0)" }
);

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 2
// ─────────────────────────────────────────────────────────────────────────────

export const ArchetypeDecisionSchema = z.object({
  selectedArchetype:     ArchetypeSchema,
  selectionMethod:       ArchetypeSelectionMethodSchema,
  matchedRuleId:         z.string(),
  archetypeOverridden:   z.boolean(),
  stakeholderPreference: ArchetypeSchema.nullable(),
  reasoning:             z.string().min(20),
  forcingConditions:     z.array(z.string()),
  unlockConditions:      z.array(z.string()),
}).refine(
  (d) => {
    if (d.archetypeOverridden) {
      return d.selectionMethod === "FORCED" && d.forcingConditions.length > 0;
    }
    return true;
  },
  { message: "If archetypeOverridden is true, selectionMethod must be FORCED and forcingConditions must be non-empty" }
);

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 3
// ─────────────────────────────────────────────────────────────────────────────

export const StackDecisionSchema = z.object({
  layer:        z.string().min(1),
  selected:     z.string().min(1),
  rationale:    z.string().min(10),
  alternatives: z.array(z.string()),
  forced:       z.boolean(),
  forcingReason: z.string().nullable(),
  adrs:         z.array(z.string()),
});

export const StackManifestSchema = z.object({
  frontend:        StackDecisionSchema,
  backend:         StackDecisionSchema,
  database:        StackDecisionSchema,
  orm:             StackDecisionSchema,
  cache:           StackDecisionSchema.nullable(),
  auth:            StackDecisionSchema,
  queue:           StackDecisionSchema.nullable(),
  storage:         StackDecisionSchema.nullable(),
  observability:   StackDecisionSchema,
  hosting:         StackDecisionSchema,
  cicd:            StackDecisionSchema,
  additionalTools: z.array(StackDecisionSchema),
});

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 4 — PRD ENTITIES
// ─────────────────────────────────────────────────────────────────────────────

export const AcceptanceCriterionSchema = z.object({
  acId:         z.string().regex(/^AC-/),
  storyId:      z.string().regex(/^US-/),
  given:        z.string().min(5),
  when:         z.string().min(5),
  then:         z.string().min(5),
  additionalAssertions: z.array(z.string()),
});

export const UserStorySchema = z.object({
  storyId:     z.string().regex(/^US-/),
  featureId:   z.string().min(1),
  personaId:   z.string().min(1),
  asA:         z.string().min(2),
  iWant:       z.string().min(5),
  soThat:      z.string().min(5),
  priority:    FeaturePrioritySchema,
  acceptanceCriteria: z.array(AcceptanceCriterionSchema).min(1),
  estimatedEffort: z.enum(["S", "M", "L", "XL"]),
});

export const FeatureSchema = z.object({
  featureId:     z.string().min(1),
  featureName:   z.string().min(3),
  priority:      FeaturePrioritySchema,
  category:      z.enum(["Core", "Auth", "Admin", "Integration", "Infrastructure"]),
  description:   z.string().min(20),
  personaIds:    z.array(z.string()).min(1),
  dependencies:  z.array(z.string()),
  userStories:   z.array(UserStorySchema).min(1),
  technicalNotes: z.array(z.string()),
  estimatedEffort: z.enum(["S", "M", "L", "XL"]),
  phase:         z.number().int().min(1),
});

export const ADRSchema = z.object({
  adrId:         z.string().regex(/^ADR-\d{3}$/),
  title:         z.string().min(5),
  date:          z.date(),
  status:        ADRStatusSchema,
  deciders:      z.array(z.string()).min(1),
  prdVersion:    z.string(),
  context:       z.string().min(20),
  decision:      z.string().min(5),
  options:       z.array(z.object({
    label: z.string(),
    pros:  z.array(z.string()),
    cons:  z.array(z.string()),
  })).min(2),
  selectedOption:   z.string().min(1),
  rationale:        z.string().min(20),
  intakeFieldsConsidered: z.array(z.object({
    fieldName: z.string(),
    value:     z.unknown(),
  })).min(1),
  forcingConditions:    z.array(z.string()),
  positiveConsequences: z.array(z.string()).min(1),
  negativeConsequences: z.array(z.string()),
  reversibility:        z.enum(["EASY", "MODERATE", "DIFFICULT", "IRREVERSIBLE"]),
  reversalPlan:         z.string().nullable(),
  followUpActions:      z.array(z.object({
    action:  z.string(),
    owner:   z.string(),
    dueDate: z.date(),
  })),
});

export const RiskSchema = z.object({
  riskId:      z.string().regex(/^RISK-/),
  category:    RiskCategorySchema,
  source:      z.string().min(1),
  description: z.string().min(10),
  likelihood:  z.enum(["LOW", "MEDIUM", "HIGH"]),
  impact:      z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  riskScore:   RiskScoreSchema,
  mitigation:  z.string().min(10),
  owner:       z.string().min(1),
  reviewDate:  z.date(),
  status:      z.enum(["OPEN", "MITIGATING", "RESOLVED", "ACCEPTED"]),
});

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 5 — QUALITY GATE
// ─────────────────────────────────────────────────────────────────────────────

export const SectionScoreSchema = z.object({
  sectionId:    z.string(),
  sectionName:  z.string(),
  maxPoints:    z.number().int().min(0),
  earnedPoints: z.number().int().min(0),
  remediationInstruction: z.string().nullable(),
}).refine(
  (s) => s.earnedPoints <= s.maxPoints,
  { message: "earnedPoints cannot exceed maxPoints" }
);

export const QualityReportSchema = z.object({
  prdRunId:             z.string().uuid(),
  iterationNumber:      z.number().int().min(1),
  completenessScore:    z.number().int().min(0).max(100),
  consistencyDeduction: z.number().int().min(0).max(45),
  finalScore:           z.number().int().min(0).max(100),
  status:               QualityGateStatusSchema,
  sectionScores:        z.array(SectionScoreSchema),
  consistencyChecks:    z.array(z.object({
    checkId:     z.string().regex(/^CC-\d{3}$/),
    passed:      z.boolean(),
    description: z.string(),
    deduction:   z.union([z.literal(0), z.literal(3)]),
    fix:         z.string().nullable(),
  })),
  failedSections: z.array(SectionScoreSchema),
  failedChecks:   z.array(z.object({
    checkId:     z.string(),
    passed:      z.literal(false),
    description: z.string(),
    deduction:   z.literal(3),
    fix:         z.string(),
  })),
  generatedAt: z.date(),
}).refine(
  (r) => r.finalScore === r.completenessScore - r.consistencyDeduction,
  { message: "finalScore must equal completenessScore minus consistencyDeduction" }
).refine(
  (r) => {
    if (r.finalScore >= 85) return r.status === "QUALITY_GATE_PASSED";
    return true;
  },
  { message: "If finalScore ≥ 85, status must be QUALITY_GATE_PASSED" }
);

// ─────────────────────────────────────────────────────────────────────────────
// PRD METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const SignOffSchema = z.object({
  approverName: z.string().min(1),
  approverRole: z.string().min(1),
  approvedAt:   z.date(),
  method:       z.enum(["digital_signature", "documented_email", "pr_approval"]),
  comments:     z.string().nullable(),
  conditions:   z.string().nullable(),
});

export const PRDMetadataSchema = z.object({
  prdId:               z.string().regex(/^PRD-\d{4}-\d{3}$/),
  intakeFormId:        z.string().uuid(),
  prdRunId:            z.string().uuid(),
  prdVersion:          z.string().regex(/^\d+\.\d+\.\d+$/),
  prdStatus:           PRDStatusSchema,
  generatedAt:         z.date(),
  generatedBy:         z.string().min(1),
  pipelineVersion:     z.string().regex(/^\d+\.\d+\.\d+$/),
  stabilityScore:      z.number().int().min(0).max(100),
  riskLevel:           RiskLevelSchema,
  selectedArchetype:   ArchetypeSchema,
  selectionMethod:     ArchetypeSelectionMethodSchema,
  archetypeOverridden: z.boolean(),
  qualityScore:        z.number().int().min(0).max(100).nullable(),
  qualityPassed:       z.boolean().nullable(),
  iterations:          z.number().int().min(0).max(5),
  approvedBy:          z.array(SignOffSchema),
  approvedAt:          z.date().nullable(),
  frozenAt:            z.date().nullable(),
  downstreamUnlocked:  z.boolean(),
}).refine(
  (m) => {
    if (m.prdStatus === "FROZEN") return m.frozenAt !== null && m.downstreamUnlocked === true;
    return true;
  },
  { message: "If status is FROZEN, frozenAt must be set and downstreamUnlocked must be true" }
).refine(
  (m) => {
    if (m.prdStatus === "FROZEN" || m.prdStatus === "APPROVED") {
      return m.qualityPassed === true;
    }
    return true;
  },
  { message: "FROZEN and APPROVED PRDs must have qualityPassed = true" }
);
```


---

## Example Generated PRDs

The following three examples show the complete pipeline output for the three archetypes
introduced in `REQUIREMENTS_INTAKE.md`. Each example shows only the metadata block, stability
analysis, archetype decision, stack manifest, and quality gate result (the full PRD document
structure is defined in Phase 4 above).

---

### Archetype A — Bootstrap SaaS MVP PRD

**Intake Form Reference:** Archetype A — Bootstrap SaaS MVP (from REQUIREMENTS_INTAKE.md)

#### Metadata Block

```yaml
prd_id:              "PRD-2026-001"
intake_form_id:      "intake-arch-a-bootstrap-saas-001"
prd_run_id:          "run-arch-a-001"
prd_version:         "1.0.0"
prd_status:          "APPROVED"
generated_at:        "2026-02-01T09:00:00Z"
generated_by:        "archai-pipeline-v1.0.0"
pipeline_version:    "1.0.0"
stability_score:     82
risk_level:          "Low"
selected_archetype:  "monolith"
selection_method:    "DEFAULT"
archetype_overridden: false
quality_score:       91
quality_passed:      true
iterations:          1
```

#### Phase 1 — Stability Analysis

```
BASE SCORE: 100

TENSIONS DETECTED:
  TENSION-001
    Severity:    WARN
    Rule:        T-BS-004
    Field A:     fundingStage = bootstrap
    Field B:     monthlyInfrastructureBudget = under_500
    Description: Very low infrastructure budget constrains managed service choices.
    Score Impact: -10
    Mitigation:  Use Neon free tier + Upstash Redis free tier + Vercel hobby tier for
                 MVP. Budget will increase as revenue grows.

  TENSION-002
    Severity:    WARN
    Rule:        T-TC-006
    Field A:     testingLayers includes e2e
    Field B:     mvpTimelineDays = 45
    Description: E2E test infrastructure setup requires at least 1 week of dedicated
                 engineering on a 45-day timeline.
    Score Impact: -10
    Mitigation:  Defer full Playwright suite to week 5. Ship with unit + integration
                 tests only for MVP; add E2E in sprint 2.

AMPLIFICATION RULES: None triggered.

TOTAL DEDUCTED: -20
FINAL STABILITY SCORE: 80/100
RISK LEVEL: 🟢 Low Risk
```

#### Phase 2 — Archetype Decision

```
ARCHETYPE DECISION
──────────────────────────────────────────────────────────────
Selected Archetype:   monolith
Selection Method:     DEFAULT (Rule 10 — no forcing condition matched)
Archetype Overridden: false
Stakeholder Preference: monolith (matches; no override needed)

Reasoning:
  Monolith selected as the coherent default for bootstrap SaaS MVP.
  fundingStage = bootstrap, devTeamSize = solo, mvpTimelineDays = 45.
  No tension forced the archetype; stakeholder preference aligns with
  the optimal choice for these constraints.

Evolution Path: monolith → modular_monolith → (optional) microservices
  Stage 1 → Stage 2 trigger: MRR ≥ $5K or consistent 50+ RPS
  Stage 2 → Stage 3 trigger: Enterprise customer or 500+ RPS
──────────────────────────────────────────────────────────────
```

#### Phase 3 — Stack Manifest

```yaml
stack:
  frontend:
    selected:   "Next.js 15 App Router + Tailwind CSS + shadcn/ui"
    rationale:  "App Router is the current standard; Tailwind + shadcn provides
                 unstyled accessible components with minimal bundle cost."
    forced:     false

  backend:
    selected:   "Next.js Route Handlers (REST)"
    rationale:  "Collocated API routes eliminate a separate server process.
                 Ideal for solo developer on bootstrap budget."
    forced:     false

  database:
    selected:   "PostgreSQL via Neon (serverless)"
    rationale:  "fundingStage = bootstrap. Neon has a generous free tier, no idle
                 cost, and is production-grade PostgreSQL. No RDS operational burden."
    forced:     false

  orm:
    selected:   "Prisma ORM"
    rationale:  "Type-safe, migration-based, standard for this pipeline."
    forced:     false

  cache:
    selected:   "Redis via Upstash (serverless)"
    rationale:  "Required for session storage (Auth.js) and rate limiting.
                 Upstash free tier is sufficient for MVP traffic."
    forced:     true
    forcingReason: "authLibrary = authjs_v5 with database sessions requires
                    Redis for performance; rateLimitingStrategy = per_user."

  auth:
    selected:   "Auth.js v5 (email/password + Google OAuth)"
    rationale:  "App Router compatible. Google OAuth reduces friction.
                 Database sessions for revocability."
    forced:     false

  queue:
    selected:   "Inngest"
    rationale:  "jobQueuePreference = inngest. No infrastructure to manage.
                 Handles email sending and cleanup jobs declared in intake."
    forced:     false

  storage:
    selected:   "Cloudflare R2"
    rationale:  "Zero egress fees vs AWS S3. S3-compatible API.
                 fundingStage = bootstrap makes egress cost significant."
    forced:     false

  observability:
    selected:   "Axiom (logging) + Sentry (error tracking)"
    rationale:  "Both have generous free tiers. Axiom's Next.js SDK provides
                 structured logging. Sentry provides session replay for debugging."
    forced:     false

  hosting:
    selected:   "Vercel"
    rationale:  "deploymentPlatform = vercel. Optimal DX for solo Next.js developer.
                 Preview deployments included. Acceptable cold-start tolerance."
    forced:     false

  cicd:
    selected:   "GitHub Actions + Vercel auto-deploy"
    rationale:  "cicdPlatform = github_actions. Vercel auto-deploy from main branch
                 with GitHub Actions for type-check, lint, and test gates."
    forced:     false
```

#### Phase 5 — Quality Gate Result

```
QUALITY GATE RESULT (Iteration 1 — after targeted revision)
  Completeness Score:   94/100
  Consistency Deductions: -3 (CC-010: sprint plan initially exceeded 45 days)
  Final Score:          91/100
  Status:               ✅ QUALITY_GATE_PASSED

  Iteration 0 (initial): 78/100 — FAILED SOFT
    Failed Sections:
      - Block 3.3 (User Stories): 2/5 pts — Missing stories for 3 P0 features
      - Block 3.4 (Acceptance Criteria): 1/5 pts — Only 2 of 8 stories had ACs
      - CC-010: Sprint plan was 55 days for 45-day timeline

  Iteration 1 (targeted fix):
    - Added user stories for all P0 features
    - Added GIVEN/WHEN/THEN ACs for all stories
    - Compressed sprint plan to 45 days
    Score: 91/100 — PASSED
```

---

### Archetype B — Series-A B2B Platform PRD

**Intake Form Reference:** Archetype B — Series-A B2B Platform (from REQUIREMENTS_INTAKE.md)

#### Metadata Block

```yaml
prd_id:              "PRD-2026-002"
intake_form_id:      "intake-arch-b-series-a-b2b-001"
prd_run_id:          "run-arch-b-001"
prd_version:         "1.0.0"
prd_status:          "APPROVED"
generated_at:        "2026-02-15T09:00:00Z"
generated_by:        "archai-pipeline-v1.0.0"
pipeline_version:    "1.0.0"
stability_score:     70
risk_level:          "Medium"
selected_archetype:  "modular_monolith"
selection_method:    "DEFAULT"
archetype_overridden: false
quality_score:       88
quality_passed:      true
iterations:          2
```

#### Phase 1 — Stability Analysis

```
BASE SCORE: 100

TENSIONS DETECTED:
  TENSION-001
    Severity:    WARN
    Rule:        T-BS-002
    Field A:     fundingStage = series_a
    Field B:     projectScale = mid_market (approaching enterprise features)
    Description: Mid-market ambitions with Series-A budget — the multi-tenant
                 schema isolation adds significant operational complexity.
    Score Impact: -10
    Mitigation:  Use schema-level isolation (not database-per-tenant). Plan for
                 dedicated DBA at Series-B. Document migration strategy in ADR.

  TENSION-002
    Severity:    WARN
    Rule:        T-TC-004
    Field A:     multiTenancyModel = schema_level
    Field B:     mvpTimelineDays = 120
    Description: Schema-level multi-tenancy with dynamic provisioning adds
                 engineering complexity. 120 days is feasible but tight.
    Score Impact: -10
    Mitigation:  Build tenant provisioning service in Sprint 1. Use Prisma
                 Migrate with custom resolver for per-tenant schemas.

  TENSION-003
    Severity:    WARN
    Rule:        T-CB-003
    Field A:     complianceFrameworks includes gdpr
    Field B:     fundingStage = series_a
    Description: GDPR compliance with Series-A budget is achievable but requires
                 dedicated sprint capacity for data subject request workflows.
    Score Impact: -10
    Mitigation:  Implement DSR (data subject request) API in Sprint 3.
                 Appoint a DPA-compliant data processor agreement with all vendors.

  TENSION-004
    Severity:    INFO
    Rule:        T-AT-004
    Field A:     openTelemetryRequired = true
    Field B:     devTeamSize = medium (6-person team)
    Description: Full OpenTelemetry setup requires non-trivial instrumentation.
    Score Impact: -0
    Note:        Budget 3 days for OTel setup in Sprint 1.

AMPLIFICATION RULES: None triggered (only 0 CRITICAL tensions).

TOTAL DEDUCTED: -30
FINAL STABILITY SCORE: 70/100
RISK LEVEL: 🟡 Medium Risk
```

#### Phase 2 — Archetype Decision

```
ARCHETYPE DECISION
──────────────────────────────────────────────────────────────
Selected Archetype:   modular_monolith
Selection Method:     DEFAULT (Rule 10)
Archetype Overridden: false
Stakeholder Preference: modular_monolith (matches)

Reasoning:
  Modular monolith is coherent for Series-A B2B:
  - fundingStage = series_a
  - devTeamSize = medium (6 engineers)
  - mvpTimelineDays = 120
  - projectScale = mid_market
  Stakeholder preference matches computed decision.
  No forcing conditions.

  This archetype enables:
  - Domain module separation enforced at code level (ESLint boundaries)
  - Shared PostgreSQL with schema-per-tenant isolation
  - Clean extraction path to microservices when team reaches 15+

Evolution Path: modular_monolith → modular_monolith (enhanced) → microservices
  Stage 1 → Stage 2 trigger: MRR ≥ $50K, 50+ active tenants
  Stage 2 → Stage 3 trigger: Enterprise contract, team ≥ 15 engineers
──────────────────────────────────────────────────────────────
```

#### Phase 3 — Stack Manifest (Abbreviated)

```yaml
stack:
  frontend:  "Next.js 15 App Router + Tailwind CSS + shadcn/ui + next-intl (i18nRequired = true)"
  backend:   "Next.js Route Handlers (REST) + zod-to-openapi (openapi_auto)"
  database:  "PostgreSQL via AWS RDS (fundingStage = series_a, deploymentPlatform = aws)"
  orm:       "Prisma ORM + custom schema resolver for multi-tenant schemas"
  cache:     "Redis via AWS ElastiCache (fundingStage = series_a, deploymentPlatform = aws)"
  auth:      "Auth.js v5 + Microsoft Entra (SAML) + email/password"
  queue:     "Inngest (jobQueuePreference = inngest, event_driven + scheduled_cron + email)"
  storage:   "AWS S3 + presigned uploads (uploadStrategy = client_direct)"
  observability: "Datadog APM + logs + OpenTelemetry OTLP exporter"
  hosting:   "AWS ECS Fargate (containerizationRequired = true, deploymentPlatform = aws)"
  cicd:      "GitHub Actions — blue/green deploy via ECS task set swap"
```

#### ADR Summary

```
ADR-001: Modular Monolith (not microservices) — DEFAULT selection, matches preference
ADR-002: AWS RDS PostgreSQL Multi-AZ — series_a + aws + 99.9% SLA requirement
ADR-003: Auth.js v5 + Microsoft Entra SAML — B2B customers require SSO
ADR-004: ElastiCache Redis — series_a + aws deployment, unified infrastructure
ADR-005: AWS ECS Fargate — containerizationRequired = true, zero cold-start tolerance
ADR-006: Schema-per-tenant isolation — multi-tenant requirement, balanced isolation vs cost
ADR-007: Inngest over BullMQ — no Redis queue management overhead; event-driven native
```

#### Phase 5 — Quality Gate Result

```
QUALITY GATE RESULT (Iteration 2 — after two targeted revisions)
  Final Score:  88/100
  Status:       ✅ QUALITY_GATE_PASSED

  Iteration 0: 71/100 — FAILED SOFT
    Failed: Block 2.3 (Competitive Landscape, only 2 competitors listed)
            Block 4.4 (GDPR obligations section incomplete)
            CC-006: Compliance section didn't match all intake Section 13 fields

  Iteration 1: 82/100 — FAILED SOFT
    Fixed:  Competitive landscape (3 competitors added)
    Still failing: CC-012 (SOC 2 Type II section missing from compliance block)

  Iteration 2: 88/100 — PASSED
    Fixed:  Added SOC 2 Type II compliance requirements section
```

---

### Archetype C — Enterprise Compliance Platform PRD

**Intake Form Reference:** Archetype C — Enterprise Compliance Platform (from REQUIREMENTS_INTAKE.md)

#### Metadata Block

```yaml
prd_id:              "PRD-2026-003"
intake_form_id:      "intake-arch-c-enterprise-compliance-001"
prd_run_id:          "run-arch-c-001"
prd_version:         "1.0.0"
prd_status:          "APPROVED"
generated_at:        "2026-02-20T09:00:00Z"
generated_by:        "archai-pipeline-v1.0.0"
pipeline_version:    "1.0.0"
stability_score:     55
risk_level:          "High"
selected_archetype:  "modular_monolith"
selection_method:    "DEFAULT"
archetype_overridden: false
quality_score:       87
quality_passed:      true
iterations:          3
```

#### Phase 1 — Stability Analysis

```
BASE SCORE: 100

TENSIONS DETECTED:
  TENSION-001
    Severity:    CRIT
    Rule:        T-AC-001
    Field A:     aiProvider = [azure_openai]
    Field B:     complianceFrameworks includes hipaa
    Description: Sending PHI to Azure OpenAI requires a signed BAA with Microsoft.
                 Azure OpenAI DOES offer a HIPAA BAA addendum — but it must be
                 explicitly signed before deployment.
    Score Impact: -25 (CRITICAL, even though mitigatable)
    Mitigation:  Sign Azure OpenAI HIPAA BAA before processing any PHI through AI.
                 Implement PHI scrubbing layer before AI requests.
                 Add technical control: PHI detection regex + Named Entity Recognition
                 before any data leaves the system boundary.

  TENSION-002
    Severity:    WARN
    Rule:        T-BS-003
    Field A:     fundingStage = series_b
    Field B:     complianceFrameworks = [hipaa, soc2_type2, wcag_aa]
    Description: Three compliance frameworks with Series-B budget creates significant
                 engineering overhead. HIPAA + SOC 2 Type II require dedicated
                 compliance engineering, not just technical controls.
    Score Impact: -10
    Mitigation:  Hire a dedicated Compliance Engineer (or contract a vCISO) before
                 beginning compliance certification work. Budget $100K–$200K/year
                 for audit and compliance tooling.

  TENSION-003
    Severity:    WARN
    Rule:        T-PI-002
    Field A:     peakRPS = 100_to_1k
    Field B:     archetype = modular_monolith
    Description: 1K RPS on a monolith/modular monolith requires horizontal
                 scaling configuration.
    Score Impact: -10
    Mitigation:  Configure ECS Fargate auto-scaling with minimum 2 instances
                 behind ALB. Ensure session strategy supports horizontal scaling
                 (database sessions, not JWT-only).

  TENSION-004
    Severity:    INFO
    Rule:        T-RT-002
    Field A:     realTimeDeliveryGuarantee = at_least_once
    Field B:     realTimeProtocol = server_sent_events
    Description: SSE does not natively support at_least_once delivery.
    Score Impact: 0
    Note:        Implement client-side SSE reconnection + server-side event cursor
                 to replay missed events on reconnect.

AMPLIFICATION RULES:
  AMPLIFICATION_RULE_A: 3 compliance frameworks + critical AI tension
    Triggered: false (only 1 CRITICAL tension)
  AMPLIFICATION_RULE_C: 3 compliance frameworks with fundingStage ≤ seed
    Triggered: false (fundingStage = series_b, not ≤ seed)

TOTAL DEDUCTED: -25 (CRIT) - 10 (WARN) - 10 (WARN) = -45
AMPLIFICATION: none triggered (only 1 CRITICAL tension)
FINAL STABILITY SCORE: 55/100
RISK LEVEL: 🟠 High Risk

Note: The CRITICAL tension (T-AC-001) is architectural but resolvable via a
      contractual and technical control. The pipeline continues but marks the
      PRD as PROVISIONAL for the AI section until BAA confirmation is received.
```

#### Phase 2 — Archetype Decision

```
ARCHETYPE DECISION
──────────────────────────────────────────────────────────────
Selected Archetype:   modular_monolith
Selection Method:     DEFAULT (Rule 10)
Archetype Overridden: false
Stakeholder Preference: modular_monolith (matches)

Reasoning:
  Modular monolith is correct for enterprise compliance:
  - fundingStage = series_b
  - devTeamSize = large (10+ engineers)
  - mvpTimelineDays = 180
  - complianceFrameworks = [hipaa, soc2_type2, wcag_aa]

  Compliance requirements demand careful boundary control and
  audit logging — a modular monolith provides this more simply
  than microservices (distributed audit trails are significantly
  harder to make HIPAA-compliant).

  Microservices would require:
  - Distributed audit trail aggregation (complex)
  - Service-to-service auth for PHI (mTLS + service accounts)
  - Per-service HIPAA controls review (multiplied audit surface)

  Modular monolith provides:
  - Centralized audit logging (single database, single write path)
  - Clear module boundaries for compliance domain isolation
  - Simpler penetration testing surface area

Evolution Path: modular_monolith → modular_monolith (enhanced) → selective services
  Stage 1 → Stage 2 trigger: 50+ enterprise tenants, consistent 500+ RPS
  Stage 2 → Stage 3 trigger: Federal/government contract, requires FedRAMP
──────────────────────────────────────────────────────────────
```

#### Phase 3 — Stack Manifest (Abbreviated)

```yaml
stack:
  frontend:  "Next.js 15 App Router + Tailwind CSS + shadcn/ui (WCAG AA compliance required)"
  backend:   "Next.js Route Handlers (REST + url versioning) + zod-to-openapi"
  database:  "PostgreSQL via AWS RDS Multi-AZ (series_b + hipaa + 99.9% SLA)"
  orm:       "Prisma ORM + custom schema resolver + expand-contract migration strategy"
  cache:     "Redis via AWS ElastiCache Cluster (peakRPS = 100_to_1k, tenant-based rate limit)"
  auth:      "Auth.js v5 + Microsoft Entra (SAML/OIDC) + TOTP MFA (HIPAA required)"
  queue:     "Inngest (all job types: scheduled, event-driven, billing, compliance reports)"
  storage:   "AWS S3 + SSE-KMS + Block public access + CloudTrail (HIPAA mandatory)"
  observability: "Datadog APM + logs + PagerDuty alerting + OpenTelemetry"
             "HIPAA audit log: Dedicated Postgres table + 7-year retention"
  hosting:   "AWS ECS Fargate (containerizationRequired = true, zero cold start)"
             "Separate AWS accounts for prod and staging (HIPAA isolation)"
  cicd:      "GitHub Actions — blue/green deploy via ECS task set"
             "ciChecks include: security_scan + db_migration_check"
```

#### Critical ADR Summary

```
ADR-001: Modular Monolith — correct for HIPAA compliance surface area
ADR-002: AWS RDS Multi-AZ — hipaa + 99.9% SLA mandates Multi-AZ failover
ADR-003: Auth.js v5 + database sessions + TOTP MFA — HIPAA auth requirements
ADR-004: ElastiCache Redis Cluster Mode — 1K RPS + tenant rate limiting
ADR-005: AWS ECS Fargate multi-AZ — zero cold start + HIPAA isolated environment
ADR-006: Schema-per-tenant isolation — hipaa tenant data isolation requirement
ADR-007: Azure OpenAI with BAA — PROVISIONAL until BAA confirmed signed
ADR-008: Dedicated audit log table — HIPAA requires immutable, queryable audit trail
ADR-009: Separate AWS accounts per environment — HIPAA + SOC 2 isolation control
```

#### Phase 5 — Quality Gate Result

```
QUALITY GATE RESULT (Iteration 3)
  Final Score:  87/100
  Status:       ✅ QUALITY_GATE_PASSED

  Iteration 0: 66/100 — FAILED HARD
    Multiple blocks incomplete: compliance NFRs, security requirements,
    ADR-007 (AI PHI handling) missing, sprint plan not HIPAA-phased

  Iteration 1: 78/100 — FAILED SOFT
    Fixed: Compliance NFRs, security requirements
    Still failing: ADR-007 not complete (BAA path not documented),
                   Sprint plan not accounting for compliance sprint

  Iteration 2: 83/100 — FAILED SOFT
    Fixed: ADR-007 with full BAA path and PHI scrubbing controls
    Still failing: CC-012 (WCAG AA section missing from Block 4.6)

  Iteration 3: 87/100 — PASSED
    Fixed: Added WCAG AA NFR section with axe-core CI requirement
```

--