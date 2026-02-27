# CLARIFICATION PROCESS
### Multi-Stage Architecture Orchestration Pipeline — Document 3 of 4
### Framework: Next.js (Primary) | Version: 1.0.0 | Status: ACTIVE

---

## Table of Contents

- [Purpose & Philosophy](#purpose--philosophy)
- [Document Role in the Pipeline](#document-role-in-the-pipeline)
- [When This Document Is Invoked](#when-this-document-is-invoked)
- [Part 1 — Ambiguity Classification System](#part-1--ambiguity-classification-system)
  - [1A — Ambiguity Taxonomy](#1a--ambiguity-taxonomy)
  - [1B — Ambiguity Severity Levels](#1b--ambiguity-severity-levels)
  - [1C — Field-Level Ambiguity Detection Rules](#1c--field-level-ambiguity-detection-rules)
  - [1D — Cross-Field Contradiction Detection](#1d--cross-field-contradiction-detection)
  - [1E — Ambiguity Scoring Model](#1e--ambiguity-scoring-model)
  - [1F — Pipeline Halt Conditions](#1f--pipeline-halt-conditions)
- [Part 2 — Clarification Request Generation](#part-2--clarification-request-generation)
  - [2A — Clarification Request Structure](#2a--clarification-request-structure)
  - [2B — Question Generation Rules](#2b--question-generation-rules)
  - [2C — Question Batching Strategy](#2c--question-batching-strategy)
  - [2D — Escalation Levels](#2d--escalation-levels)
  - [2E — Forbidden Clarification Patterns](#2e--forbidden-clarification-patterns)
- [Part 3 — Clarification Routing & Stakeholder Assignment](#part-3--clarification-routing--stakeholder-assignment)
  - [3A — Stakeholder Role Catalogue](#3a--stakeholder-role-catalogue)
  - [3B — Question-to-Stakeholder Routing Matrix](#3b--question-to-stakeholder-routing-matrix)
  - [3C — Multi-Stakeholder Conflict Protocol](#3c--multi-stakeholder-conflict-protocol)
  - [3D — Delivery Channel Rules](#3d--delivery-channel-rules)
  - [3E — Response Deadline Policy](#3e--response-deadline-policy)
- [Part 4 — Response Handling & Intake Update Propagation](#part-4--response-handling--intake-update-propagation)
  - [4A — Response Validation Rules](#4a--response-validation-rules)
  - [4B — Intake Field Update Protocol](#4b--intake-field-update-protocol)
  - [4C — Cascading Update Detection](#4c--cascading-update-detection)
  - [4D — Re-Validation After Update](#4d--re-validation-after-update)
  - [4E — Conflict Between Response and Existing Fields](#4e--conflict-between-response-and-existing-fields)
- [Part 5 — Ambiguity Resolution Engine](#part-5--ambiguity-resolution-engine)
  - [5A — Automated Assumption Rules](#5a--automated-assumption-rules)
  - [5B — Assumption Documentation Template](#5b--assumption-documentation-template)
  - [5C — Resolution State Machine](#5c--resolution-state-machine)
  - [5D — Convergence Criteria](#5d--convergence-criteria)
  - [5E — Maximum Clarification Budget](#5e--maximum-clarification-budget)
  - [5F — Forced Resolution Rules](#5f--forced-resolution-rules)
- [Part 6 — Post-Clarification Pipeline Re-Entry](#part-6--post-clarification-pipeline-re-entry)
  - [6A — Re-Entry Points by Clarification Type](#6a--re-entry-points-by-clarification-type)
  - [6B — Partial vs Full Pipeline Re-Run](#6b--partial-vs-full-pipeline-re-run)
  - [6C — Frozen PRD Clarification Protocol](#6c--frozen-prd-clarification-protocol)
  - [6D — Clarification Audit Trail](#6d--clarification-audit-trail)
- [TypeScript Interfaces](#typescript-interfaces)
- [Zod Validation Schemas](#zod-validation-schemas)
- [Example Clarification Flows](#example-clarification-flows)
  - [Flow A — Bootstrap SaaS: Vague Scale Clarification](#flow-a--bootstrap-saas-vague-scale-clarification)
  - [Flow B — Series-A B2B: Multi-Tenancy Model Conflict](#flow-b--series-a-b2b-multi-tenancy-model-conflict)
  - [Flow C — Enterprise: Compliance Framework Contradiction](#flow-c--enterprise-compliance-framework-contradiction)
- [Clarification Process Version History](#clarification-process-version-history)

---

## Purpose & Philosophy

This document is **Document 3 of 4** in the Multi-Stage Architecture Orchestration Pipeline.

It defines the complete clarification process that executes whenever the pipeline detects
ambiguity, contradiction, or missing information in the intake form — either before PRD
generation begins or during the PRD iteration cycle.

### What This Document Is Not

This document is **not** a FAQ. It is not a list of common questions. It is not a
style guide for communication.

It is an **algorithm** for:
1. Detecting what is ambiguous
2. Classifying how severe the ambiguity is
3. Generating the minimum set of questions needed to resolve it
4. Routing each question to the correct stakeholder
5. Validating responses for correctness and consistency
6. Updating the intake form with confirmed values
7. Detecting whether the update cascades into new ambiguities
8. Deciding when the pipeline can re-enter normal execution

### Why Structured Clarification Matters

Ambiguity is the leading cause of architecture rework. When an intake form says "standard
security" rather than a specific list of security controls, the pipeline cannot determine
whether MFA is required, whether sessions must be revocable, or whether a penetration test
is in scope. Without structured clarification, these gaps become **hidden assumptions** that
only surface when a production system fails an audit or a customer rejects the feature.

The clarification process converts hidden assumptions into documented decisions. Every
resolved ambiguity is recorded with:
- The original ambiguous value
- The question that surfaced it
- The stakeholder who answered it
- The confirmed value
- The timestamp

This creates an immutable audit trail from product concept to architectural decision.

### The Clarification Contract

```
Input:   Ambiguity signals (from intake validation, PRD generation, or user submission)
Process: Detect → Classify → Generate questions → Route → Validate responses → Update intake
Output:  Resolved intake form (no Critical or Warning ambiguities remaining)
Gate:    Pipeline re-enters PRD generation only when all Critical ambiguities are resolved
Audit:   Every clarification exchange is permanently recorded in the ClarificationLog
```

---

## Document Role in the Pipeline

```
PIPELINE INTEGRATION
══════════════════════════════════════════════════════════════════════════════

  ┌────────────────────────────────────────────────────────────────────────┐
  │                  WHERE CLARIFICATION FITS                              │
  │                                                                        │
  │  INTAKE FORM                                                           │
  │  (REQUIREMENTS_INTAKE.md)                                             │
  │         │                                                              │
  │         │ Submission triggers readiness check                          │
  │         ▼                                                              │
  │  ┌──────────────────────────────────────────┐                         │
  │  │  INTAKE VALIDATION                       │                         │
  │  │  (PRD_GENERATION.md Phase 1 pre-check)   │                         │
  │  └──────────────┬───────────────────────────┘                         │
  │                 │                                                      │
  │    ┌────────────┴───────────┐                                          │
  │    │                        │                                          │
  │    ▼ Ambiguities found      ▼ Clean                                   │
  │  ┌───────────────────┐    ┌──────────────────────┐                    │
  │  │ CLARIFICATION     │    │  PRD GENERATION      │                    │
  │  │ PROCESS (Doc 3)   │    │  (PRD_GENERATION.md) │                    │
  │  │                   │    └──────────────────────┘                    │
  │  │ Detect → Classify │                                                 │
  │  │ Generate questions│                                                 │
  │  │ Route → Validate  │                                                 │
  │  │ Update intake     │                                                 │
  │  └──────────┬────────┘                                                 │
  │             │                                                          │
  │             │ All Critical ambiguities resolved                        │
  │             ▼                                                          │
  │  ┌──────────────────────┐                                              │
  │  │  PRD GENERATION      │  (re-entry)                                  │
  │  │  (PRD_GENERATION.md) │                                              │
  │  └──────────────────────┘                                              │
  │                                                                        │
  │  Also invoked: After frozen PRD review surfaces new ambiguities        │
  │  Also invoked: When PRD iteration loop cannot resolve inconsistency    │
  └────────────────────────────────────────────────────────────────────────┘

══════════════════════════════════════════════════════════════════════════════
```

---

## When This Document Is Invoked

The clarification process is invoked in exactly four scenarios:

| Trigger | Invocation Point | Re-Entry Point |
|---|---|---|
| **Pre-PRD** | Intake form submitted with Critical/Warning ambiguities | PRD Generation Phase 1 (after resolution) |
| **During PRD Generation** | Phase 4 section generator cannot compute a required value | PRD Generation Phase 4 (affected section only) |
| **During PRD Iteration** | Phase 6 iteration stalls because root ambiguity is in intake | PRD Generation Phase 5 (full Quality Gate re-run) |
| **Post-PRD Freeze** | Stakeholder discovers ambiguity after freeze | New intake form required (see 6C) |

---

## Part 1 — Ambiguity Classification System

### 1A — Ambiguity Taxonomy

An ambiguity is any intake value that cannot be used to make a deterministic architectural
decision. There are six types:

```
AMBIGUITY TAXONOMY
═══════════════════════════════════════════════════════════════════════════════
Type          Code    Definition
───────────────────────────────────────────────────────────────────────────────
Missing       AMB-M   A required field has no value. The field was left blank
                      or explicitly skipped despite being marked [REQUIRED].

Vague         AMB-V   A value is present but too imprecise to use. Examples:
                      "standard security", "typical users", "normal load",
                      "enterprise scale" without numeric backing.

Contradictory AMB-X   Two or more fields contain values that are mutually
                      exclusive or logically incompatible. Not every
                      contradiction is an error — some are tensions. A
                      contradiction becomes an ambiguity when the pipeline
                      cannot determine intent (e.g., "microservices" AND
                      "bootstrap budget" AND "we prefer simple deployment").

Ambiguous     AMB-A   A field has multiple possible interpretations. Example:
                      "real-time" could mean WebSocket, SSE, short-poll, or
                      near-real-time batch (every 5 seconds). The system cannot
                      select a protocol without clarification.

Inconsistent  AMB-I   A field value is internally inconsistent with the same
                      field across sections. Example: Section 2 lists 3 user
                      personas but Section 3 declares single-tenant — implying
                      the personas operate in isolation, which contradicts a
                      multi-user persona set.

Stale         AMB-S   A previously confirmed value has been superseded by a
                      later change to a related field, making the original
                      confirmed value potentially invalid. Example: compliance
                      frameworks were resolved, then a new AI provider was
                      added that may conflict with the resolved compliance value.
═══════════════════════════════════════════════════════════════════════════════
```

---

### 1B — Ambiguity Severity Levels

Each detected ambiguity is assigned one of three severity levels:

```
SEVERITY LEVELS
═══════════════════════════════════════════════════════════════════════════════
Level     Code   Definition                           Pipeline Action
───────────────────────────────────────────────────────────────────────────────
Critical  AMB-1  The ambiguity directly blocks a      HALT. Do not generate PRD.
                 required architectural decision.      Escalate immediately.
                 No assumption is safe to make.        Require human resolution.
                 Examples: missing compliance
                 framework, missing auth strategy,
                 contradictory scale + budget with
                 no declared priority.

Warning   AMB-2  The ambiguity can be resolved         CONTINUE with flagged
                 with a reasonable documented           assumption. Document
                 assumption, but the assumption         assumption in PRD.
                 materially affects the architecture.   Request confirmation.
                 Examples: vague performance target,
                 unclear caching preference when
                 caching isn't strictly required.

Info      AMB-3  The ambiguity is minor. A safe        CONTINUE. Log for
                 default assumption exists and does     human review but do
                 not change any architectural           not block or alert.
                 decision.
                 Examples: missing project tagline,
                 unclear company size for a field
                 that doesn't affect tech stack.
═══════════════════════════════════════════════════════════════════════════════
```

**Key principle:** A warning-level ambiguity does not block PRD generation. It generates
a documented assumption and requests confirmation. If the stakeholder corrects the assumption,
the affected PRD sections are regenerated. If no response is received within the response
deadline, the assumption is confirmed as accepted.

---

### 1C — Field-Level Ambiguity Detection Rules

The following rules are applied to every intake field during the readiness check.
Rules are evaluated in order per field. First match wins for severity.

#### Section 1 — Project Identity

| Field | Ambiguity Trigger | Severity | Automated Assumption |
|---|---|---|---|
| `projectName` | Null or empty | AMB-1 | None — halt |
| `projectDescription` | Fewer than 20 characters | AMB-1 | None — halt |
| `projectDescription` | Contains "standard", "typical", "normal" without specifics | AMB-2 | None — request elaboration |
| `projectType` | Not one of the defined enum values | AMB-1 | None — halt |
| `targetMarket` | Null or empty | AMB-2 | Assume `b2c` if no enterprise persona declared |

#### Section 2 — User Personas & Scale

| Field | Ambiguity Trigger | Severity | Automated Assumption |
|---|---|---|---|
| `primaryUserPersona` | Null or empty | AMB-1 | None — halt |
| `expectedUsersAtLaunch` | Null | AMB-1 | None — halt |
| `expectedUsersAtLaunch` | Value = "many", "lots", "scale" (non-numeric) | AMB-1 | None — request specific number |
| `peakConcurrentUsers` | Null AND `requiresRealTime = true` | AMB-1 | None — halt (required for real-time scale) |
| `userGrowthRate` | Null | AMB-2 | Assume `moderate` (2× per year) |
| `projectScale` | Declared `enterprise` but `expectedUsersAtLaunch < 100` | AMB-2 | Request clarification: enterprise features or enterprise traffic? |

#### Section 3 — Multi-Tenancy

| Field | Ambiguity Trigger | Severity | Automated Assumption |
|---|---|---|---|
| `multiTenancyModel` | Null | AMB-1 | None — halt |
| `dbIsolationPerTenant` | Null AND `multiTenancyModel ≠ single_tenant` | AMB-1 | None — halt |
| `tenantOnboardingModel` | Null AND `multiTenancyModel ≠ single_tenant` | AMB-2 | Assume `self_service` |
| `crossTenantInteraction` | Null AND `multiTenancyModel ≠ single_tenant` | AMB-2 | Assume `none` |

#### Section 4 — Access Control

| Field | Ambiguity Trigger | Severity | Automated Assumption |
|---|---|---|---|
| `accessControlModel` | Null | AMB-1 | None — halt |
| `rbacRoles` | Null AND `accessControlModel includes rbac` | AMB-1 | None — halt |
| `rbacRoles` | Contains only 1 role AND no super-admin declared | AMB-2 | Assume flat single-role model; flag potential gap |
| `superAdminBypassesPermissions` | Null AND `accessControlModel includes rbac` | AMB-2 | Assume `false` (safe default) |
| `abacAttributes` | Null AND `accessControlModel includes abac` | AMB-1 | None — halt |

#### Section 5 — Data Requirements

| Field | Ambiguity Trigger | Severity | Automated Assumption |
|---|---|---|---|
| `softDeleteRequired` | Null | AMB-2 | Assume `true` (safe default per GOVERNANCE.md) |
| `globalAuditTrail` | Null AND `complianceFrameworks is non-empty` | AMB-1 | None — halt (compliance requires audit trail decision) |
| `dataRetentionPolicy` | Null AND `complianceFrameworks includes hipaa OR soc2_type2` | AMB-1 | None — halt |
| `dataVolumeAt12Months` | Null | AMB-2 | Assume `1gb_to_10gb` |
| `searchRequirements` | "advanced search" without specifying full_text, vector, or exact | AMB-2 | Assume `exact_match`; flag if full-text is likely needed |

#### Section 6 — Real-Time

| Field | Ambiguity Trigger | Severity | Automated Assumption |
|---|---|---|---|
| `realTimeProtocol` | Null AND `requiresRealTime = true` | AMB-1 | None — halt |
| `realTimeScale` | Null AND `requiresRealTime = true` | AMB-1 | None — halt |
| `realTimeDeliveryGuarantee` | Null AND `requiresRealTime = true` | AMB-2 | Assume `at_most_once` |

#### Section 7 — Background Jobs

| Field | Ambiguity Trigger | Severity | Automated Assumption |
|---|---|---|---|
| `backgroundJobTypes` | Null AND `requiresBackgroundJobs = true` | AMB-1 | None — halt |
| `jobRetryStrategy` | Null AND `requiresBackgroundJobs = true` | AMB-2 | Assume `exponential_backoff` |
| `jobQueuePreference` | Null AND `requiresBackgroundJobs = true` | AMB-2 | Derive from `deploymentPlatform` and `fundingStage` |

#### Section 11 — Performance Targets

| Field | Ambiguity Trigger | Severity | Automated Assumption |
|---|---|---|---|
| `targetFCP` | Null | AMB-2 | Assume `2s_to_3s` |
| `targetApiP95` | Null | AMB-2 | Assume `300ms_to_500ms` |
| `peakRPS` | Null | AMB-2 | Derive from `expectedUsersAtLaunch × 0.1` |
| `targetFCP` | Value = "fast", "quick", "good" (non-numeric) | AMB-1 | None — performance targets must be numeric |

#### Section 13 — Compliance & Security

| Field | Ambiguity Trigger | Severity | Automated Assumption |
|---|---|---|---|
| `complianceFrameworks` | Null | AMB-2 | Assume `none` |
| `piiDataCollected` | Null AND `complianceFrameworks includes gdpr OR hipaa` | AMB-1 | None — halt |
| `encryptionRequirements` | Null AND `complianceFrameworks includes hipaa OR pci_dss` | AMB-1 | None — halt |
| `securityFeatures` | Null | AMB-2 | Assume `[security_headers, session_management]` minimum |

#### Section 15 — Timeline & Budget

| Field | Ambiguity Trigger | Severity | Automated Assumption |
|---|---|---|---|
| `mvpTimelineDays` | Null | AMB-1 | None — halt |
| `mvpTimelineDays` | Value = "ASAP", "soon", "few months" (non-numeric) | AMB-1 | None — must be an integer |
| `fundingStage` | Null | AMB-1 | None — halt |
| `monthlyInfrastructureBudget` | Null | AMB-2 | Derive safe default from `fundingStage` |

---

### 1D — Cross-Field Contradiction Detection

Some ambiguities only appear when two fields are read together. These are detected by the
cross-field contradiction scanner, which runs after individual field validation.

```
CROSS-FIELD CONTRADICTION RULES
═══════════════════════════════════════════════════════════════════════════════
Rule ID    Fields                              Trigger               Severity
───────────────────────────────────────────────────────────────────────────────
XC-001     architecturePreference             If microservices AND   AMB-1
           + devTeamSize                      devTeamSize = solo,
                                              intent is unclear:
                                              learning project or
                                              actual design decision?

XC-002     requiresRealTime                   If realTimeProtocol =  AMB-1
           + deploymentPlatform               websocket AND
                                              deploymentPlatform =
                                              vercel, intent is
                                              impossible — clarify
                                              platform or protocol

XC-003     complianceFrameworks               If hipaa AND           AMB-1
           + aiProvider                       aiProvider includes
                                              openai or anthropic
                                              AND no BAA mentioned
                                              → Is BAA signed?

XC-004     multiTenancyModel                  If not single_tenant   AMB-2
           + rbacRoles                        but RBAC roles are
                                              not tenant-scoped,
                                              is this intentional
                                              (global roles) or
                                              an oversight?

XC-005     availabilitySLA                    If 99.99% SLA AND      AMB-1
           + fundingStage                     fundingStage ≤ seed,
                                              clarify: is this a
                                              product goal or a
                                              contractual obligation?
                                              (changes architecture
                                              entirely)

XC-006     staticExportRequired               If true AND any        AMB-1
           + authRequired                     server-side auth
                                              declared, these are
                                              incompatible for
                                              protected pages

XC-007     jobQueuePreference                 If vercel_cron AND     AMB-2
           + backgroundJobTypes               event_driven in
                                              backgroundJobTypes,
                                              Vercel Cron cannot
                                              handle events

XC-008     cacheLayerRequired                 If false AND           AMB-2
           + rateLimitingStrategy             rateLimitingStrategy
                                              ≠ none — rate limiting
                                              requires a cache

XC-009     dataVolumeAt12Months               If ≥ 100gb AND         AMB-2
           + analyticsRequired                analyticsRequired =
                                              true AND no analytics
                                              DB declared — OLTP
                                              cannot serve both

XC-010     devTeamSize                        If solo AND            AMB-2
           + backgroundJobTypes               backgroundJobTypes
                                              includes all 7 types
                                              — is full job
                                              infrastructure
                                              in scope for MVP?
═══════════════════════════════════════════════════════════════════════════════
```

---

### 1E — Ambiguity Scoring Model

The ambiguity score is a 0–100 measure of intake form readiness.
High scores mean the form is ready for PRD generation without clarification.

```
AMBIGUITY SCORE COMPUTATION
──────────────────────────────────────────────────────────────────────────────
BASE SCORE = 100

For each detected ambiguity:
  IF severity = AMB-1 (Critical): score -= 20
  IF severity = AMB-2 (Warning):  score -= 5
  IF severity = AMB-3 (Info):     score -= 1

FLOOR = 0 (score cannot go below 0)

AMBIGUITY SCORE = MAX(0, BASE_SCORE - sum_of_deductions)

READINESS BANDS:
  90–100: ✅ Ready for PRD generation (no Critical ambiguities, few Warnings)
  70–89:  ⚠️  Proceed with documented assumptions (no Critical; Warnings present)
  50–69:  ⚠️  Clarification recommended; proceed only with stakeholder ack
  0–49:   ❌ Critical ambiguities present — HALT pipeline until resolved
──────────────────────────────────────────────────────────────────────────────
```

---

### 1F — Pipeline Halt Conditions

The pipeline halts (cannot proceed to PRD generation) when any of the following are true:

```
HALT CONDITIONS
──────────────────────────────────────────────────────────────────────────────
HALT-001  ambiguityScore < 50
          → At least one Critical ambiguity detected
          → PRD generation is blocked

HALT-002  criticalAmbiguityCount ≥ 1 (regardless of total score)
          → Even a single Critical ambiguity blocks PRD generation

HALT-003  Cross-field contradiction rules XC-001, XC-002, XC-003, XC-005, or XC-006
          triggered — these are always Critical

HALT-004  Intake status is not SUBMITTED or APPROVED
          → If status = UNDER_CLARIFICATION, pipeline waits for resolution

HALT-005  Maximum clarification rounds exceeded without resolving Critical ambiguities
          → Pipeline emits: "CLARIFICATION_EXHAUSTED" status
          → Manual intervention required
──────────────────────────────────────────────────────────────────────────────
```

---

## Part 2 — Clarification Request Generation

When ambiguities are detected, the pipeline generates a structured Clarification Request (CR)
document. This is delivered to the appropriate stakeholder for resolution.

### 2A — Clarification Request Structure

Every Clarification Request follows this exact structure:

```
CLARIFICATION REQUEST
══════════════════════════════════════════════════════════════════════════════
CR-ID:           CR-{YYYY}-{sequence}        e.g., CR-2026-001
Intake Form ID:  {intakeFormId}
Created At:      {ISO 8601 timestamp}
Status:          OPEN | PARTIALLY_RESOLVED | FULLY_RESOLVED | EXPIRED
Priority:        URGENT (has AMB-1) | NORMAL (AMB-2 only) | LOW (AMB-3 only)
Response Deadline: {deadline per 3E}

AMBIGUITY SUMMARY
  Total ambiguities detected: {count}
  Critical (AMB-1): {count}  ← Pipeline is HALTED until these are resolved
  Warning  (AMB-2): {count}  ← Assumptions documented; confirmation requested
  Info     (AMB-3): {count}  ← Logged for awareness

QUESTIONS
  {list of ClarificationQuestion records — see 2B}

CONTEXT
  The following architectural decisions are blocked until the questions
  above are answered:
  {list of blocked decisions with explanation}

INSTRUCTIONS FOR RESPONDERS
  1. Answer each question with a specific, concrete value.
  2. Do not use vague terms ("standard", "typical", "normal").
  3. For enum fields, select exactly one option from the provided list.
  4. If you answer a Critical question, you will be notified when the pipeline
     resumes PRD generation.
  5. If you cannot answer a question, escalate to the designated stakeholder
     listed next to each question.

RESPONSE METHOD
  {delivery channel — see 3D}
══════════════════════════════════════════════════════════════════════════════
```

---

### 2B — Question Generation Rules

Each detected ambiguity generates exactly one clarification question using this template:

```
CLARIFICATION QUESTION
──────────────────────────────────────────────────────────────────────────────
CQ-ID:          CQ-{crId}-{n}             e.g., CQ-CR-2026-001-01
Ambiguity Type: AMB-M | AMB-V | AMB-A | AMB-X | AMB-I | AMB-S
Severity:       AMB-1 | AMB-2 | AMB-3
Field:          {intakeFieldPath}          e.g., "section13.complianceFrameworks"
Section:        {sectionNumber}            e.g., "Section 13"
Current Value:  {currentValue or null}
Required For:   {architecturalDecision}    e.g., "Authentication strategy selection"

QUESTION TEXT:
  {questionText}

ACCEPTABLE ANSWER FORMAT:
  Type:    {enum | integer | boolean | string | list}
  Options: {if enum: list of valid options}
  Bounds:  {if integer: min, max}
  Example: {example valid answer}

CONTEXT:
  {1-3 sentences explaining WHY this field matters and what changes based on the answer}

IF NOT ANSWERED BY DEADLINE:
  {automaticAssumption or "pipeline remains halted"}

ASSIGNED TO:
  {stakeholderRole} (see routing matrix in Part 3)
──────────────────────────────────────────────────────────────────────────────
```

**Question Text Generation by Ambiguity Type:**

| Ambiguity Type | Question Pattern |
|---|---|
| AMB-M (Missing) | "The field `{field}` is required but was not provided. Please specify: {fieldDescription}." |
| AMB-V (Vague) | "The value `{currentValue}` for `{field}` is too imprecise to use. Please provide a specific {valueType}: {example}." |
| AMB-A (Ambiguous) | "The value `{currentValue}` for `{field}` has multiple possible interpretations. Please select the interpretation that matches your intent: {options}." |
| AMB-X (Contradictory) | "The values `{fieldA} = {valueA}` and `{fieldB} = {valueB}` are contradictory. Please indicate which value takes priority and whether the other value should be updated." |
| AMB-I (Inconsistent) | "The value of `{fieldA}` in {sectionA} appears inconsistent with `{fieldB}` in {sectionB}. Please confirm your intent: {confirmationOptions}." |
| AMB-S (Stale) | "The previously confirmed value `{field} = {confirmedValue}` may be affected by the recent change to `{relatedField} = {newValue}`. Please confirm whether `{field}` should remain `{confirmedValue}` or be updated." |

---

### 2C — Question Batching Strategy

Multiple ambiguities may be detected simultaneously. The pipeline batches them into a
single Clarification Request rather than sending one question per ambiguity.

**Batching Rules:**

```
BATCHING RULES
──────────────────────────────────────────────────────────────────────────────
RULE-BATCH-001  All AMB-1 questions for the same intake submission are batched
                into a single Clarification Request.
                Exception: if questions require sequential answering (answer
                to Q1 determines whether Q2 is needed), they are split into
                sequential rounds.

RULE-BATCH-002  Maximum questions per Clarification Request: 10.
                If more than 10 questions are generated, split into multiple
                CRs prioritized by severity (AMB-1 first, then AMB-2).

RULE-BATCH-003  Questions from different sections but the same stakeholder
                are batched together (reduce stakeholder cognitive load).

RULE-BATCH-004  Questions that are sequentially dependent are NOT batched.
                Instead, they are sent in order: CR-Round-1, then CR-Round-2
                after CR-Round-1 is fully resolved.

RULE-BATCH-005  AMB-3 (Info) questions are never sent in the same batch as
                AMB-1 questions. AMB-3 questions are deferred to a separate
                "Optional Review" batch with no deadline.
──────────────────────────────────────────────────────────────────────────────
```

**Sequential Dependency Example:**

If the intake declares `requiresRealTime = true` but leaves `realTimeProtocol` null:
- Round 1 Question: "Which real-time protocol does your system require? (websocket / sse / long-poll)"
- Only after Round 1 is answered:
  - If `websocket` selected: Round 2 Question: "What is the expected concurrent WebSocket connection count?"
  - If `sse` selected: Round 2 Question: "Is exactly-once delivery required for SSE events?"

---

### 2D — Escalation Levels

Not all ambiguities require immediate human intervention. The escalation level determines
how urgently the clarification is needed and what happens if no response arrives.

```
ESCALATION LEVELS
═══════════════════════════════════════════════════════════════════════════════
Level   Trigger                    Action                  Deadline
───────────────────────────────────────────────────────────────────────────────
L1      AMB-1 ambiguity           Immediate notification  48 hours
        (Critical)                 to primary stakeholder
                                   Pipeline halted

L2      AMB-2 ambiguity           Notification to         5 business days
        (Warning)                  primary stakeholder
                                   Pipeline continues
                                   with assumption

L3      AMB-3 ambiguity           Async notification;     No deadline
        (Info)                     batched into weekly     (automated assumption
                                   optional review         applied immediately)

L4      No response to L1         Escalate to secondary   24 hours after L1
        within deadline            stakeholder + manager   deadline

L5      No response to L1         Force resolution        Immediate
        after L4 deadline          (see 5F Forced
                                   Resolution Rules)
═══════════════════════════════════════════════════════════════════════════════
```

---

### 2E — Forbidden Clarification Patterns

The following question patterns are explicitly forbidden in Clarification Requests:

```
FORBIDDEN PATTERNS
──────────────────────────────────────────────────────────────────────────────
FORBIDDEN-001  Open-ended architectural opinions
               ❌ "What architecture do you think would work best for your use case?"
               ✅ "The system has computed [Archetype] as the optimal architecture
                   based on your constraints. Do you have a specific requirement
                   that would change one of the following constraints? [list]"

FORBIDDEN-002  Leading questions with embedded recommendations
               ❌ "Since you're on a bootstrap budget, have you considered using
                   a monolith instead of microservices?"
               ✅ "The intake specifies architecturePreference = microservices and
                   fundingStage = bootstrap. These are in tension. Please clarify:
                   (a) Is microservices a hard requirement, or a preference?
                   (b) Is the bootstrap budget a hard constraint?"

FORBIDDEN-003  Asking for information that is already in the intake
               ❌ "What database are you using?"
               ✅ Only ask about fields that are actually null, vague, or contradictory.

FORBIDDEN-004  Bundling clarification with approval
               ❌ "Please clarify the compliance requirements and approve the PRD."
               ✅ Clarification and approval are separate workflows in separate documents.

FORBIDDEN-005  Vague acceptance criteria for the answer
               ❌ "Please describe your security needs."
               ✅ Questions MUST specify the exact format of an acceptable answer.

FORBIDDEN-006  Asking multiple questions disguised as one
               ❌ "What is your target FCP, and how many concurrent users do you
                   expect, and what's your database preference?"
               ✅ One ambiguity = one question = one CQ-ID.

FORBIDDEN-007  Asking for confirmation of a decision that was already made
               ❌ Asking "Is PostgreSQL okay?" when the stack decision was
                  computed deterministically and the stakeholder declared
                  `primaryDatabase = postgresql`.
               ✅ Only ask about genuinely ambiguous, missing, or contradictory values.
──────────────────────────────────────────────────────────────────────────────
```

---

## Part 3 — Clarification Routing & Stakeholder Assignment

### 3A — Stakeholder Role Catalogue

The following roles are recognized by the clarification routing engine.
These map to the sign-off roles defined in `PRD_GENERATION.md` Phase 7B.

```
STAKEHOLDER ROLE CATALOGUE
═══════════════════════════════════════════════════════════════════════════════
Role Code   Role Name                  Competence Domain
───────────────────────────────────────────────────────────────────────────────
FOUNDER     Founder / CEO              Business goals, funding, market, MVP scope
CTO         CTO / VP Engineering       Technical architecture, team capacity, infra budget
CPO         CPO / Product Manager      User personas, feature priorities, success metrics
TECH_LEAD   Technical Lead /           Performance targets, database, API design, auth
            Principal Engineer
SEC_LEAD    Security Lead / CISO       Compliance frameworks, encryption, security controls
LEGAL       Legal / Compliance Officer Regulatory requirements, data retention, BAAs
DESIGN      Design Lead / UX Lead      Accessibility, persona accuracy, UX requirements
FINANCE     Finance Lead / CFO         Infrastructure budget, cost constraints
AGENT       AI Agent (on behalf        Used when agent is filling intake on behalf of user
            of user)
═══════════════════════════════════════════════════════════════════════════════
```

---

### 3B — Question-to-Stakeholder Routing Matrix

Each field section routes to the most competent stakeholder. When multiple stakeholders
could answer, the primary is listed first; secondary is the escalation target.

```
ROUTING MATRIX
═══════════════════════════════════════════════════════════════════════════════
Section / Field Category          Primary     Secondary   Escalation (L4)
───────────────────────────────────────────────────────────────────────────────
Section 1 — Project Identity      FOUNDER     CPO         CTO
Section 2 — Personas & Scale      CPO         FOUNDER     TECH_LEAD
Section 3 — Multi-Tenancy Model   CTO         TECH_LEAD   FOUNDER
Section 4 — Access Control        TECH_LEAD   CTO         SEC_LEAD
  4A RBAC specifics               TECH_LEAD   CTO         —
  4B ABAC specifics               TECH_LEAD   SEC_LEAD    CTO
  4C Policy-Based Access          SEC_LEAD    TECH_LEAD   LEGAL
Section 5 — Data Requirements     TECH_LEAD   CTO         LEGAL
  Data retention (compliance)     LEGAL       SEC_LEAD    CTO
  Soft delete / audit trail       TECH_LEAD   SEC_LEAD    —
Section 6 — Real-Time             TECH_LEAD   CTO         —
Section 7 — Background Jobs       TECH_LEAD   CTO         —
Section 8 — Integrations          CPO         TECH_LEAD   FOUNDER
Section 9 — File Storage          TECH_LEAD   CPO         —
Section 10 — AI / ML              CTO         TECH_LEAD   SEC_LEAD
  AI data privacy (compliance)    SEC_LEAD    LEGAL       CTO
Section 11 — Performance Targets  TECH_LEAD   CTO         CPO
Section 12 — Availability & SLA   CTO         TECH_LEAD   FOUNDER
  SLA contractual obligations     LEGAL       CTO         FINANCE
Section 13 — Compliance           SEC_LEAD    LEGAL       CTO
  HIPAA / GDPR specifics          LEGAL       SEC_LEAD    CTO
  PCI DSS / FedRAMP               LEGAL       SEC_LEAD    FINANCE
Section 14 — Infrastructure       CTO         TECH_LEAD   FINANCE
  Budget constraints              FINANCE     FOUNDER     CTO
Section 15 — Timeline & Budget    FOUNDER     CPO         CTO
Section 16–25 — Tech Stack        TECH_LEAD   CTO         —
  Auth strategy (compliance)      SEC_LEAD    TECH_LEAD   —
  Deployment platform             CTO         TECH_LEAD   FINANCE
  Testing strategy                TECH_LEAD   —           —
Cross-field contradictions (XC-*) CTO         FOUNDER     TECH_LEAD
═══════════════════════════════════════════════════════════════════════════════
```

---

### 3C — Multi-Stakeholder Conflict Protocol

When two stakeholders provide conflicting answers to the same question:

```
CONFLICT RESOLUTION PROTOCOL
──────────────────────────────────────────────────────────────────────────────
STEP 1: Detect conflict
  A conflict exists when:
  - Two stakeholders answer the same CQ-ID with different values
  - The values are mutually exclusive (not just different phrasings)

STEP 2: Classify conflict type
  TYPE-A: Factual conflict — one answer is objectively correct
          (e.g., "How many roles do you have?" — one of the answers is wrong)
  TYPE-B: Priority conflict — both answers are valid but reflect different priorities
          (e.g., Founder says "bootstrap budget is flexible" but Finance says "fixed")
  TYPE-C: Scope conflict — stakeholders disagree on what is in scope for MVP
          (e.g., CPO says HIPAA is required now, CTO says deferred to Phase 2)

STEP 3: Resolution by type
  TYPE-A: Request clarification from the primary stakeholder with both answers shown.
          Primary stakeholder selects the correct factual value.

  TYPE-B: Escalate to FOUNDER. Present both answers and explicitly ask:
          "These answers reflect different budget priorities. Please confirm
           the binding constraint."
          The FOUNDER's answer is the tiebreaker.

  TYPE-C: Escalate to CTO + CPO together. Send a structured decision:
          "Feature X has been identified as in scope by CPO and out of scope by CTO.
           Please confirm: (a) In scope for MVP, (b) Deferred to Phase 2, (c) Out of
           scope permanently."
          Both must agree before the pipeline proceeds.

STEP 4: Record conflict outcome
  The conflict, both original answers, and the resolution are recorded in the
  ClarificationLog with all stakeholder IDs and timestamps.
──────────────────────────────────────────────────────────────────────────────
```

---

### 3D — Delivery Channel Rules

Clarification Requests are delivered through the channel appropriate to the integration:

```
DELIVERY CHANNEL RULES
═══════════════════════════════════════════════════════════════════════════════
Channel             Use When                   Format
───────────────────────────────────────────────────────────────────────────────
In-App UI           Human submitting form       Interactive question form
                    via the ArchAI web UI       in the intake wizard UI

Email               Human contacted via         Structured email template
                    email                        with reply instructions

Async API response  AI agent filling intake     JSON response with
                    on behalf of user           ambiguityReport payload

Slack notification  Integration configured      Summary with link to
                    (future feature)             full CR in ArchAI UI

GitHub comment      Pipeline running in         Markdown-formatted CR
                    CI/CD context (future)       as a PR comment
═══════════════════════════════════════════════════════════════════════════════
```

---

### 3E — Response Deadline Policy

```
RESPONSE DEADLINE POLICY
──────────────────────────────────────────────────────────────────────────────
AMB-1 questions:
  Initial deadline:    48 hours from CR delivery
  L4 escalation at:    48 hours (no response → escalate to secondary + manager)
  L5 forced resolution: 24 hours after L4 (72 hours total from initial CR)

AMB-2 questions:
  Initial deadline:    5 business days from CR delivery
  L4 escalation at:    5 business days (no response → assumption confirmed)
  Note: Non-response to AMB-2 confirms the documented assumption.

AMB-3 questions:
  No deadline. Batched into optional weekly review.
  Non-response permanently confirms the default assumption.

CLOCK RULES:
  - The 48-hour clock for AMB-1 starts at the moment the CR is delivered
    (delivery confirmation required; undeliverable CR pauses the clock)
  - Business days = Monday–Friday, 9am–5pm in the stakeholder's declared timezone
  - If no timezone declared: UTC
  - Holidays: Not accounted for automatically; stakeholder may request extension
    (one-time, up to 24 hours for AMB-1, up to 2 business days for AMB-2)
──────────────────────────────────────────────────────────────────────────────
```

---

## Part 4 — Response Handling & Intake Update Propagation

### 4A — Response Validation Rules

Every response to a clarification question is validated before it is accepted into the intake.
Invalid responses are rejected with a specific rejection message.

```
RESPONSE VALIDATION RULES
═══════════════════════════════════════════════════════════════════════════════
Rule            Applies To       Check                    Rejection Message
───────────────────────────────────────────────────────────────────────────────
RV-001          All responses    Response is non-null     "A response is required.
                                 and non-empty            Please provide a value."

RV-002          Enum fields      Value is one of the      "Invalid value '{value}'.
                                 listed options           Valid options are: {options}"

RV-003          Integer fields   Value is a valid         "'{value}' is not a valid
                                 integer within bounds    integer. Please provide
                                                          a number between {min}
                                                          and {max}."

RV-004          Boolean fields   Value is true or false   "'{value}' is not a valid
                                 (accepts: yes/no,        boolean. Please answer
                                 true/false, 1/0)         yes or no."

RV-005          List fields      All items are valid      "'{invalidItem}' is not a
                                 enum options             valid option. Valid options:
                                                          {options}"

RV-006          All responses    Response does not        "This response introduces
                                 introduce a new AMB-1    a new critical ambiguity:
                                 ambiguity in any         {newAmbiguity}. Please also
                                 field                    provide: {additionalQuestion}"

RV-007          Cross-field      Response does not        "This response conflicts
                                 create an XC-*           with {field} = {value}.
                                 contradiction            Please clarify: {options}"
═══════════════════════════════════════════════════════════════════════════════
```

---

### 4B — Intake Field Update Protocol

Once a response passes validation, the intake field is updated following this protocol:

```
INTAKE FIELD UPDATE PROTOCOL
──────────────────────────────────────────────────────────────────────────────
STEP 1: Snapshot current intake state
  → Record current value of {field} as {previousValue}
  → Record current intake status and ambiguityScore

STEP 2: Apply the update
  → Set {field} = {confirmedValue}
  → Set {field}.confirmedBy = {stakeholderRole}
  → Set {field}.confirmedAt = {ISO 8601 timestamp}
  → Set {field}.confirmationMethod = {deliveryChannel}
  → Set {field}.cqId = {CQ-ID that prompted the response}

STEP 3: Update ambiguity record
  → Set ambiguity.{ambiguityId}.status = RESOLVED
  → Set ambiguity.{ambiguityId}.resolvedAt = {timestamp}
  → Set ambiguity.{ambiguityId}.resolvedValue = {confirmedValue}

STEP 4: Recompute ambiguity score
  → Remove the point deduction for this ambiguity
  → Recompute total ambiguityScore

STEP 5: Trigger cascade scan (see 4C)
  → Check if the updated field triggers any new ambiguities

STEP 6: Update intake status
  → If all AMB-1 ambiguities are resolved: status = APPROVED
  → If some AMB-2/AMB-3 remain: status = UNDER_CLARIFICATION
  → If new AMB-1 created by cascade: status = UNDER_CLARIFICATION (halted)
──────────────────────────────────────────────────────────────────────────────
```

---

### 4C — Cascading Update Detection

When a field value changes, other fields that depend on it must be re-validated.
The following cascade map defines the dependencies:

```
CASCADE DEPENDENCY MAP
═══════════════════════════════════════════════════════════════════════════════
Updated Field                 Fields to Re-validate
───────────────────────────────────────────────────────────────────────────────
complianceFrameworks          piiDataCollected, encryptionRequirements,
                              dataRetentionPolicy, securityFeatures,
                              globalAuditTrail, mfaConfig, sessionStrategy,
                              loggingProvider, objectStorageProvider (HIPAA),
                              deploymentEnvironments (prod/staging isolation)

fundingStage                  monthlyInfrastructureBudget, stackDecisions
                              (all Phase 3 trees re-evaluated),
                              availabilitySLA, architecturePreference

architecturePreference        devTeamSize (if preference = microservices),
                              mvpTimelineDays (if preference = microservices),
                              allTensionRules (re-run Phase 1 detection)

multiTenancyModel             dbIsolationPerTenant, tenantOnboardingModel,
                              rbacRoles (tenant-scoped?), crossTenantInteraction,
                              authLibrary (session routing),
                              deploymentPlatform (schema-per-tenant feasibility)

requiresRealTime              realTimeProtocol, realTimeScale,
                              realTimeDeliveryGuarantee, cacheTechnology,
                              deploymentPlatform (WebSocket compatibility)

aiProvider                    aiDataPrivacy, complianceFrameworks (BAA check),
                              aiMonthlyCostCeiling

deploymentPlatform            coldStartTolerance, containerizationRequired,
                              realTimeProtocol (WebSocket check),
                              managedServicesPreference

devTeamSize                   architecturePreference (microservices check),
                              backgroundJobTypes (all 7 types check),
                              openTelemetryRequired

primaryDatabase               ormChoice, connectionPooling,
                              dbIsolationPerTenant (if database_per_tenant),
                              readReplicaRequired

mvpTimelineDays               architecturePreference (microservices timeline check),
                              testingLayers (e2e feasibility check),
                              backgroundJobTypes (full infrastructure scope check)
═══════════════════════════════════════════════════════════════════════════════
```

**Cascade Execution Rule:** After any field update, the system runs all cascade-dependent
fields through the ambiguity detection rules in section 1C. If a new AMB-1 is created,
a new Clarification Question is generated and appended to the active Clarification Request
(or a new CR is opened if the original is already FULLY_RESOLVED).

---

### 4D — Re-Validation After Update

After all responses in a Clarification Request are processed:

```
RE-VALIDATION SEQUENCE
──────────────────────────────────────────────────────────────────────────────
1. Re-run ALL field-level ambiguity detection rules (section 1C)
   → Catches any residual ambiguities from the updated state

2. Re-run ALL cross-field contradiction rules (section 1D)
   → Catches new contradictions created by the resolved values

3. Recompute ambiguity score

4. Re-evaluate pipeline halt conditions (section 1F)

5. Decision:
   IF ambiguityScore ≥ 50 AND criticalAmbiguityCount = 0:
     → Intake status = APPROVED
     → Pipeline proceeds to PRD generation (or re-enters at appropriate point)

   IF criticalAmbiguityCount > 0:
     → Open new Clarification Request for new Critical ambiguities
     → Intake status = UNDER_CLARIFICATION

   IF only AMB-2/AMB-3 remain:
     → Intake status = APPROVED (with documented assumptions)
     → Pipeline proceeds; assumptions are included in PRD metadata
──────────────────────────────────────────────────────────────────────────────
```

---

### 4E — Conflict Between Response and Existing Fields

If a clarification response is valid on its own but creates a contradiction with an
existing confirmed field:

```
RESPONSE-FIELD CONFLICT HANDLING
──────────────────────────────────────────────────────────────────────────────
DETECTION:
  After validating a response, run XC-* cross-field rules against the new value.
  If any XC-* rule triggers with the existing confirmed fields:

CLASSIFICATION:
  TYPE-HARMLESS: The new contradiction is a known tension (already in tension
                 catalogue in PRD_GENERATION.md Phase 1D). Record it as a tension;
                 do NOT re-open clarification. The tension will be scored in Phase 1.

  TYPE-BLOCKING: The new contradiction is a structural impossibility (same as
                 XC-001/002/003/005/006). This requires another clarification round.

ACTION for TYPE-BLOCKING:
  1. Do NOT apply the update to the intake field
  2. Generate a new CQ explaining the conflict:
     "Your answer '{newValue}' for '{field}' creates a conflict with the
      previously confirmed value '{existingValue}' for '{existingField}'.
      These cannot both be true. Please resolve: {options}"
  3. Add the new CQ to the active CR or open a new CR (Round N+1)
  4. The field remains at its previous value until the conflict is resolved
──────────────────────────────────────────────────────────────────────────────
```

---

## Part 5 — Ambiguity Resolution Engine

### 5A — Automated Assumption Rules

For AMB-2 and AMB-3 ambiguities, the pipeline can apply documented assumptions without
waiting for stakeholder response. These assumptions are always safe defaults that:
- Do not introduce security vulnerabilities
- Do not force more expensive infrastructure
- Can be overridden by stakeholder confirmation without architectural rework

```
AUTOMATED ASSUMPTION CATALOGUE
═══════════════════════════════════════════════════════════════════════════════
Field                       Trigger              Assumed Value     Rationale
───────────────────────────────────────────────────────────────────────────────
softDeleteRequired          Null                 true              GOVERNANCE.md standard
globalAuditTrail            Null, no compliance  false             No compliance obligation
targetFCP                   Null                 2s_to_3s          Industry average
targetApiP95                Null                 300ms_to_500ms    Industry average
peakRPS                     Null                 users × 0.1 / s   10% peak request ratio
userGrowthRate              Null                 2x_per_year       Moderate SaaS growth
jobRetryStrategy            Null                 exponential_      Safest retry strategy
                                                 backoff
jobQueuePreference          Null, bootstrap      inngest           Best DX, no infra
jobQueuePreference          Null, series_a+      inngest           Start simple, evolve
tenantOnboardingModel       Null                 self_service      Most common SaaS model
crossTenantInteraction      Null                 none              Safe isolation default
superAdmin                  Null                 {role with        Most common pattern
BypassesPermissions                              highest_privilege}
                                                 = false
cacheInvalidationStrategy   Null                 ttl_only          Simplest approach
realTimeDeliveryGuarantee   Null                 at_most_once      Simplest guarantee
sessionStrategy             Null, no compliance  jwt               Lower infrastructure
sessionStrategy             Null, has compliance database          Required for revocation
securityFeatures            Null                 [security_        Minimum baseline
                                                 headers,
                                                 session_
                                                 management]
accessibilityStandard       Null                 wcag_aa           Industry standard
themingRequired             Null                 none              Simplest option
i18nRequired                Null                 false             Opt-in to complexity
staticExportRequired        Null                 false             Dynamic default
═══════════════════════════════════════════════════════════════════════════════
```

---

### 5B — Assumption Documentation Template

Every automated assumption is documented in the PRD metadata block and surfaced in the
Executive Summary:

```
ASSUMPTION RECORD
──────────────────────────────────────────────────────────────────────────────
Assumption ID:    ASSUMPTION-{NNN}
Field:            {intakeFieldPath}
Original Value:   {null | vague_value}
Assumed Value:    {assumedValue}
Assumption Basis: {automated_default | stakeholder_silence | forced_resolution}
Assumed At:       {ISO 8601 timestamp}
Ambiguity Type:   AMB-2 | AMB-3
Ambiguity ID:     {ambiguityId}
CQ-ID:            {cqId if question was sent} | null (if no question sent for AMB-3)
Confirmed By:     {stakeholderRole if explicitly confirmed} | AUTO
Confirmed At:     {timestamp if explicitly confirmed} | null
Overridable:      true | false

Architecture Impact:
  {description of what this assumption changes or doesn't change in the architecture}
  {if false: explain why this cannot be overridden post-PRD-freeze}

Stakeholder Notice:
  {text of the notice sent to stakeholder explaining the assumption}
──────────────────────────────────────────────────────────────────────────────
```

---

### 5C — Resolution State Machine

Each ambiguity record transitions through the following states:

```
AMBIGUITY RESOLUTION STATE MACHINE
══════════════════════════════════════════════════════════════════════════════

  DETECTED ──────────────────────────────────────────► QUESTION_GENERATED
    (Ambiguity found by detection engine)             (CQ-ID assigned, CR opened)
         │
         │  AMB-3 only (no question needed)
         ▼
  AUTO_ASSUMED ─────────────────────────────────────► CONFIRMED
    (Default applied immediately)                    (Stakeholder confirms assumption)

  QUESTION_GENERATED ────────────────────────────────► AWAITING_RESPONSE
    (CQ added to Clarification Request)              (CR delivered to stakeholder)

  AWAITING_RESPONSE ─────────────────────────────────► RESPONSE_RECEIVED
    (CR sent; within deadline)                       (Stakeholder submitted answer)
         │
         │  AMB-2: deadline passed with no response
         ▼
  AUTO_ASSUMED_FROM_SILENCE ─────────────────────────► CONFIRMED_BY_SILENCE
    (Assumption applied, stakeholder notified)

  RESPONSE_RECEIVED ─────────────────────────────────► VALIDATED
    (Response passes RV-001 through RV-007)
         │
         │  Validation fails (RV-002 through RV-007)
         ▼
  REJECTED ──────────────────────────────────────────► AWAITING_RESPONSE
    (Rejection message sent; stakeholder must re-answer)

  VALIDATED ─────────────────────────────────────────► RESOLVED
    (Intake field updated; cascades checked)
         │
         │  Cascade creates new AMB-1
         ▼
  RESOLVED_WITH_CASCADE ─────────────────────────────► DETECTED (new ambiguity)
    (Original is resolved; new ambiguity opens)

  CONFIRMED / CONFIRMED_BY_SILENCE / RESOLVED ───────► CLOSED
    (Permanent terminal state; recorded in ClarificationLog)

══════════════════════════════════════════════════════════════════════════════

INVALID TRANSITIONS:
  CLOSED → any state     (terminal; cannot be reopened)
  RESOLVED → DETECTED    (use AMB-S / Stale type for re-opened fields)
```

---

### 5D — Convergence Criteria

The clarification process is considered **converged** when:

```
CONVERGENCE CRITERIA
──────────────────────────────────────────────────────────────────────────────
CRITERION-1  criticalAmbiguityCount = 0
             (All AMB-1 ambiguities are in RESOLVED or CLOSED state)

CRITERION-2  ambiguityScore ≥ 50
             (Pipeline halt threshold cleared)

CRITERION-3  No open Clarification Requests with AMB-1 questions
             (All CRs are FULLY_RESOLVED or EXPIRED with force-resolution applied)

CRITERION-4  No pending cascade re-validations
             (All cascades have been processed and any new ambiguities addressed)

CRITERION-5  Intake status = APPROVED
             (Final status set by the update protocol in 4B Step 6)

When all 5 criteria are met:
  → Log: "✅ CLARIFICATION CONVERGED — Intake Form {intakeFormId} is ready for PRD generation"
  → Re-entry point determined by Part 6
──────────────────────────────────────────────────────────────────────────────
```

---

### 5E — Maximum Clarification Budget

```
CLARIFICATION BUDGET
──────────────────────────────────────────────────────────────────────────────
Maximum clarification rounds:    5 (for a single intake submission)
Maximum CRs per round:           3 (if question batching exceeds 10 questions)
Maximum questions per CR:        10

After 5 rounds without convergence:
  → Intake status = CLARIFICATION_EXHAUSTED
  → Pipeline status = MANUAL_REVIEW_REQUIRED
  → All remaining AMB-1 fields receive FORCED RESOLUTION (see 5F)
  → A human operator must review the forced resolutions before pipeline proceeds

Clarification Round counter resets if:
  → A new intake form is submitted (new form = new budget)
  → A Post-PRD-Freeze clarification opens (treated as a new intake)

Budget is NOT reset by:
  → Cascade-created new ambiguities (these count toward the same budget)
  → Stakeholder requesting extensions (extensions only delay the deadline clock)
──────────────────────────────────────────────────────────────────────────────
```

---

### 5F — Forced Resolution Rules

When the clarification budget is exhausted or a deadline chain expires (L5 escalation),
the pipeline applies forced resolution. Forced resolution is a last resort.

```
FORCED RESOLUTION RULES
══════════════════════════════════════════════════════════════════════════════

TRIGGER:
  Forced resolution applies when:
  (a) L5 escalation deadline reached (72 hours with no response to AMB-1)
  OR
  (b) 5 clarification rounds exhausted without convergence

FORCED RESOLUTION CATALOGUE:
  Field                      Forced Value         Forced Rationale
  ─────────────────────────────────────────────────────────────────────────
  complianceFrameworks       none                 Cannot assume compliance
                                                  obligations without confirmation.
                                                  Mark PRD section as PROVISIONAL.

  availabilitySLA            99.9%                Conservative default — lower than
                                                  declared 99.99% to avoid overbuilding.

  architecturePreference     monolith             Safest, most reversible choice.

  mvpTimelineDays            90                   Conservative estimate. Pipeline
                                                  will flag this as ASSUMED.

  accessControlModel         rbac                 Most common pattern; safest default.

  rbacRoles                  [admin, user]        Minimal viable RBAC.

  realTimeProtocol           sse                  SSE is the simplest real-time protocol.

  dbIsolationPerTenant       row_level            Cheapest, most common starting point.

  fundingStage               bootstrap            Most conservative cost assumption.

  aiDataPrivacy              no_external_ai       Most restrictive; avoids compliance risk.

FORCED RESOLUTION RECORD:
  Every forced resolution generates a FORCED_ASSUMPTION record (see 5B template)
  with assumption_basis = "forced_resolution" and a mandatory human review flag.

HUMAN REVIEW REQUIREMENT:
  After forced resolution, a human operator must:
  1. Review all FORCED_ASSUMPTION records
  2. Confirm or override each forced value
  3. Sign the forced-resolution review document
  4. Only then may the pipeline proceed
══════════════════════════════════════════════════════════════════════════════
```

---

## Part 6 — Post-Clarification Pipeline Re-Entry

### 6A — Re-Entry Points by Clarification Type

After convergence, the pipeline re-enters at the appropriate phase based on which
fields were changed during clarification:

```
RE-ENTRY POINT MATRIX
═══════════════════════════════════════════════════════════════════════════════
Changed Field Category                    Re-Entry Point
───────────────────────────────────────────────────────────────────────────────
Any AMB-1 field (pre-PRD)                PRD_GENERATION.md — Phase 1
                                          (full stability analysis re-run)

Performance targets only (AMB-2)         PRD_GENERATION.md — Phase 4
                                          (NFR section regenerated only)

Feature scope only (AMB-2)               PRD_GENERATION.md — Phase 4
                                          (Block 3 regenerated only)

Tech stack preference (AMB-2)            PRD_GENERATION.md — Phase 3
                                          (stack decisions re-evaluated from changed point)

Architecture preference (AMB-1)          PRD_GENERATION.md — Phase 2
                                          (archetype re-selected, then Phase 3 forward)

Compliance frameworks (AMB-1)            PRD_GENERATION.md — Phase 1
                                          (tensions re-scored, Phase 2+ forward)

Multi-tenancy or auth (AMB-1)            PRD_GENERATION.md — Phase 2
                                          (archetype check + full Phase 3 forward)

Timeline or budget (AMB-1)               PRD_GENERATION.md — Phase 1
                                          (full re-run from Phase 1)

All AMB-3 fields                         No re-entry; assumptions logged in PRD,
                                          PRD generation continues from where it paused
═══════════════════════════════════════════════════════════════════════════════
```

---

### 6B — Partial vs Full Pipeline Re-Run

```
PARTIAL VS FULL RE-RUN DECISION
──────────────────────────────────────────────────────────────────────────────
FULL RE-RUN (from Phase 1) when:
  - Any field in the cascade dependency of stabilityScore changes
    (fundingStage, projectScale, complianceFrameworks, architecturePreference,
     mvpTimelineDays, devTeamSize, deploymentPlatform)
  - 3 or more fields change in the same clarification round
  - An AMB-1 field changes that has a transitive dependency on the archetype selection

PARTIAL RE-RUN (from specific phase) when:
  - Only 1 or 2 fields changed
  - Changed fields are downstream of the archetype decision
    (e.g., auth strategy, database hosting, queue preference)
  - Changed fields affect only specific PRD sections (not the metadata block)

RE-RUN PROTOCOL:
  1. Log the re-run scope: FULL or PARTIAL + which phases will execute
  2. Preserve unchanged phase outputs (no unnecessary regeneration)
  3. Apply dependency propagation: if Phase 2 re-runs, Phase 3, 4, 5, 6, 7 also run
  4. Prior PRD draft is marked SUPERSEDED
  5. New PRD draft is created with incremented version (e.g., 1.0.0 → 1.1.0)
  6. New PRD draft references the clarification run that triggered it
──────────────────────────────────────────────────────────────────────────────
```

---

### 6C — Frozen PRD Clarification Protocol

After a PRD is frozen (`prdStatus = FROZEN`), the immutability contract (PRD_GENERATION.md
section 7C) prohibits any field changes. If a stakeholder discovers an ambiguity or
error after freeze:

```
POST-FREEZE CLARIFICATION PROTOCOL
──────────────────────────────────────────────────────────────────────────────
STEP 1: Log the post-freeze issue
  → Create a PostFreezeIssue record:
    - frozenPrdId:      {prdId of the frozen PRD}
    - issueDescription: {description of the ambiguity or error}
    - discoveredBy:     {stakeholderRole}
    - discoveredAt:     {timestamp}
    - severity:         CRITICAL | MATERIAL | MINOR

STEP 2: Classify the issue
  CRITICAL: The frozen PRD contains an error that, if implemented, would cause
            a production failure, security vulnerability, or compliance violation.
            → Immediate action required (see CRITICAL path below)

  MATERIAL: The frozen PRD contains an ambiguity that would cause significant
            rework if not resolved.
            → Normal new intake path (below)

  MINOR:    The frozen PRD contains a cosmetic or non-architectural error.
            → Create an erratum document; do not create a new intake form.

STEP 3 (CRITICAL path):
  → Notify all stakeholders who signed off on the frozen PRD
  → Create a new intake form with the corrected value
  → The new intake form is fast-tracked through clarification (48-hour AMB-1 deadline)
  → A new PRD is generated and linked to the original frozen PRD as its supersession
  → The original frozen PRD is marked: "SUPERSEDED by PRD-{newPrdId}"

STEP 4 (MATERIAL path):
  → Create a new intake form (copy of the original with the corrected field)
  → Run the full clarification and PRD generation pipeline from the beginning
  → Link the new PRD to the original frozen PRD with supersession record

STEP 5 (MINOR / erratum path):
  → Create an erratum document referencing the frozen PRD ID
  → Document the correction (what was wrong, what the correct value is)
  → Erratum is signed by the same stakeholders who signed the frozen PRD
  → Downstream documents may incorporate the erratum without creating a new intake
──────────────────────────────────────────────────────────────────────────────
```

---

### 6D — Clarification Audit Trail

Every clarification exchange is permanently recorded in the ClarificationLog.
This log is immutable once written.

```
CLARIFICATION LOG RECORD
══════════════════════════════════════════════════════════════════════════════
logId:               CL-{UUID}
intakeFormId:        {UUID}
crId:                {CR-ID}
cqId:                {CQ-ID}
ambiguityId:         {AMB-ID}
ambiguityType:       AMB-M | AMB-V | AMB-A | AMB-X | AMB-I | AMB-S
severity:            AMB-1 | AMB-2 | AMB-3
fieldPath:           {e.g., "section13.complianceFrameworks"}
originalValue:       {value before clarification}
questionText:        {the exact question text sent to stakeholder}
sentTo:              {stakeholderRole}
sentAt:              {ISO 8601}
deliveryChannel:     {channel}
deliveredAt:         {ISO 8601 or null if undelivered}
responseReceivedAt:  {ISO 8601 or null}
responseValue:       {stakeholder's answer or null}
responseValidated:   {true | false | null}
validationError:     {RV-00N message or null}
finalValue:          {the value applied to the intake}
resolutionMethod:    STAKEHOLDER_RESPONSE | AUTO_ASSUMPTION | FORCED_RESOLUTION
                     | STAKEHOLDER_SILENCE | CONFLICT_RESOLUTION
resolvedAt:          {ISO 8601}
resolvedBy:          {stakeholderRole or "AUTO" or "FORCED"}
cascadesTriggered:   [{list of field paths that were cascade-re-validated}]
newAmbiguitiesCreated: [{list of new ambiguity IDs created by cascade}]
══════════════════════════════════════════════════════════════════════════════
```

This log is the primary evidence source for:
- Compliance audits (demonstrating that ambiguous requirements were resolved before build)
- Stakeholder disputes ("I never said X" → log shows exactly what was asked and answered)
- Post-launch incident analysis (tracing an architectural decision back to a clarification)
- Pipeline debugging (understanding why a specific architectural decision was made)


---

## TypeScript Interfaces

```typescript
// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export enum AmbiguityType {
  Missing       = "AMB-M",
  Vague         = "AMB-V",
  Contradictory = "AMB-X",
  Ambiguous     = "AMB-A",
  Inconsistent  = "AMB-I",
  Stale         = "AMB-S",
}

export enum AmbiguitySeverity {
  Critical = "AMB-1",
  Warning  = "AMB-2",
  Info     = "AMB-3",
}

export enum AmbiguityStatus {
  Detected                = "DETECTED",
  QuestionGenerated       = "QUESTION_GENERATED",
  AwaitingResponse        = "AWAITING_RESPONSE",
  ResponseReceived        = "RESPONSE_RECEIVED",
  Rejected                = "REJECTED",
  Validated               = "VALIDATED",
  Resolved                = "RESOLVED",
  ResolvedWithCascade     = "RESOLVED_WITH_CASCADE",
  AutoAssumed             = "AUTO_ASSUMED",
  AutoAssumedFromSilence  = "AUTO_ASSUMED_FROM_SILENCE",
  Confirmed               = "CONFIRMED",
  ConfirmedBySilence      = "CONFIRMED_BY_SILENCE",
  Closed                  = "CLOSED",
}

export enum ClarificationRequestStatus {
  Open                = "OPEN",
  PartiallyResolved   = "PARTIALLY_RESOLVED",
  FullyResolved       = "FULLY_RESOLVED",
  Expired             = "EXPIRED",
}

export enum ClarificationRequestPriority {
  Urgent  = "URGENT",  // has AMB-1 questions
  Normal  = "NORMAL",  // AMB-2 only
  Low     = "LOW",     // AMB-3 only
}

export enum StakeholderRole {
  Founder   = "FOUNDER",
  CTO       = "CTO",
  CPO       = "CPO",
  TechLead  = "TECH_LEAD",
  SecLead   = "SEC_LEAD",
  Legal     = "LEGAL",
  Design    = "DESIGN",
  Finance   = "FINANCE",
  Agent     = "AGENT",
}

export enum EscalationLevel {
  L1 = "L1",  // AMB-1: primary stakeholder, 48h
  L2 = "L2",  // AMB-2: primary stakeholder, 5 business days
  L3 = "L3",  // AMB-3: no deadline
  L4 = "L4",  // No response to L1: secondary + manager
  L5 = "L5",  // No response to L4: forced resolution
}

export enum ResolutionMethod {
  StakeholderResponse  = "STAKEHOLDER_RESPONSE",
  AutoAssumption       = "AUTO_ASSUMPTION",
  ForcedResolution     = "FORCED_RESOLUTION",
  StakeholderSilence   = "STAKEHOLDER_SILENCE",
  ConflictResolution   = "CONFLICT_RESOLUTION",
}

export enum DeliveryChannel {
  InAppUI          = "in_app_ui",
  Email            = "email",
  AsyncApiResponse = "async_api_response",
  SlackNotification = "slack_notification",
  GitHubComment    = "github_comment",
}

export enum PostFreezeIssueSeverity {
  Critical = "CRITICAL",
  Material = "MATERIAL",
  Minor    = "MINOR",
}

export enum ConflictType {
  Factual  = "TYPE-A",
  Priority = "TYPE-B",
  Scope    = "TYPE-C",
}

export enum IntakeReadinessStatus {
  Ready                     = "READY",          // score ≥ 90
  ProceedWithAssumptions    = "PROCEED_WITH_ASSUMPTIONS",  // 70–89
  ClarificationRecommended  = "CLARIFICATION_RECOMMENDED", // 50–69
  Halted                    = "HALTED",          // < 50 or any AMB-1
  ClarificationExhausted    = "CLARIFICATION_EXHAUSTED",
  ManualReviewRequired      = "MANUAL_REVIEW_REQUIRED",
}

// ─────────────────────────────────────────────────────────────────────────────
// AMBIGUITY DETECTION
// ─────────────────────────────────────────────────────────────────────────────

export interface DetectedAmbiguity {
  ambiguityId:           string;          // AMB-{UUID}
  ambiguityType:         AmbiguityType;
  severity:              AmbiguitySeverity;
  fieldPath:             string;          // e.g. "section13.complianceFrameworks"
  sectionNumber:         number;
  currentValue:          unknown;
  detectionRuleId:       string;          // e.g. "XC-003" or "S13-COMPL-001"
  description:           string;
  architecturalImpact:   string;          // what decision is blocked
  automatedAssumption:   string | null;   // null if AMB-1 (no safe assumption)
  status:                AmbiguityStatus;
  createdAt:             Date;
  resolvedAt:            Date | null;
  resolvedValue:         unknown | null;
}

export interface AmbiguityReport {
  intakeFormId:          string;
  reportId:              string;          // AR-{UUID}
  generatedAt:           Date;
  ambiguities:           DetectedAmbiguity[];
  criticalCount:         number;
  warningCount:          number;
  infoCount:             number;
  ambiguityScore:        number;          // 0–100
  readinessStatus:       IntakeReadinessStatus;
  haltConditions:        string[];        // which HALT-00N conditions triggered
  blockedDecisions:      string[];        // list of architectural decisions blocked
}

// ─────────────────────────────────────────────────────────────────────────────
// CLARIFICATION QUESTIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface ClarificationQuestion {
  cqId:                  string;          // CQ-{crId}-{n}
  crId:                  string;
  ambiguityId:           string;
  ambiguityType:         AmbiguityType;
  severity:              AmbiguitySeverity;
  fieldPath:             string;
  sectionNumber:         number;
  currentValue:          unknown;
  requiredFor:           string;          // what architectural decision this unblocks
  questionText:          string;
  answerFormat: {
    type:                "enum" | "integer" | "boolean" | "string" | "list";
    options:             string[] | null;
    bounds:              { min: number; max: number } | null;
    example:             string;
  };
  context:               string;
  ifNotAnsweredByDeadline: string;        // "pipeline remains halted" | assumption text
  assignedTo:            StakeholderRole;
  escalationTo:          StakeholderRole;
  escalationLevel:       EscalationLevel;
  status:                AmbiguityStatus;
  sequentialDependencies: string[];       // CQ-IDs this question depends on
  dependentQuestions:    string[];        // CQ-IDs that depend on this question's answer
}

// ─────────────────────────────────────────────────────────────────────────────
// CLARIFICATION REQUEST
// ─────────────────────────────────────────────────────────────────────────────

export interface ClarificationRequest {
  crId:                  string;          // CR-{YYYY}-{sequence}
  intakeFormId:          string;
  roundNumber:           number;          // 1–5
  status:                ClarificationRequestStatus;
  priority:              ClarificationRequestPriority;
  createdAt:             Date;
  deliveredAt:           Date | null;
  deliveryChannel:       DeliveryChannel;
  responseDeadline:      Date;
  questions:             ClarificationQuestion[];
  criticalCount:         number;
  warningCount:          number;
  infoCount:             number;
  blockedDecisions:      string[];
  resolvedCount:         number;
  totalCount:            number;
  fullyResolvedAt:       Date | null;
  expiredAt:             Date | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSES
// ─────────────────────────────────────────────────────────────────────────────

export interface ClarificationResponse {
  responseId:            string;          // RESP-{UUID}
  crId:                  string;
  cqId:                  string;
  intakeFormId:          string;
  respondedBy:           StakeholderRole;
  respondedAt:           Date;
  deliveryChannel:       DeliveryChannel;
  responseValue:         unknown;
  validationPassed:      boolean;
  validationErrors:      string[];        // RV-00N messages
  appliedToIntake:       boolean;
  rejectedAt:            Date | null;
  rejectionReason:       string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFLICT HANDLING
// ─────────────────────────────────────────────────────────────────────────────

export interface StakeholderConflict {
  conflictId:            string;          // CONFLICT-{UUID}
  crId:                  string;
  cqId:                  string;
  conflictType:          ConflictType;
  response1:             ClarificationResponse;
  response2:             ClarificationResponse;
  detectedAt:            Date;
  escalatedTo:           StakeholderRole;
  escalatedAt:           Date | null;
  resolvedAt:            Date | null;
  resolvedValue:         unknown | null;
  resolvedBy:            StakeholderRole | null;
  resolutionNotes:       string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// ASSUMPTIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface AssumptionRecord {
  assumptionId:          string;          // ASSUMPTION-{NNN}
  ambiguityId:           string;
  cqId:                  string | null;
  fieldPath:             string;
  originalValue:         unknown;
  assumedValue:          unknown;
  assumptionBasis:       "automated_default" | "stakeholder_silence" | "forced_resolution";
  assumedAt:             Date;
  ambiguityType:         AmbiguityType;
  severity:              AmbiguitySeverity;
  confirmedBy:           StakeholderRole | "AUTO" | null;
  confirmedAt:           Date | null;
  overridable:           boolean;
  architectureImpact:    string;
  stakeholderNotice:     string;
  requiresHumanReview:   boolean;         // true if forced_resolution
}

// ─────────────────────────────────────────────────────────────────────────────
// CLARIFICATION LOG (AUDIT TRAIL)
// ─────────────────────────────────────────────────────────────────────────────

export interface ClarificationLogRecord {
  logId:                 string;          // CL-{UUID}
  intakeFormId:          string;
  crId:                  string;
  cqId:                  string;
  ambiguityId:           string;
  ambiguityType:         AmbiguityType;
  severity:              AmbiguitySeverity;
  fieldPath:             string;
  originalValue:         unknown;
  questionText:          string;
  sentTo:                StakeholderRole;
  sentAt:                Date;
  deliveryChannel:       DeliveryChannel;
  deliveredAt:           Date | null;
  responseReceivedAt:    Date | null;
  responseValue:         unknown | null;
  responseValidated:     boolean | null;
  validationError:       string | null;
  finalValue:            unknown;
  resolutionMethod:      ResolutionMethod;
  resolvedAt:            Date;
  resolvedBy:            StakeholderRole | "AUTO" | "FORCED";
  cascadesTriggered:     string[];        // field paths
  newAmbiguitiesCreated: string[];        // AMB-IDs
}

// ─────────────────────────────────────────────────────────────────────────────
// POST-FREEZE ISSUE
// ─────────────────────────────────────────────────────────────────────────────

export interface PostFreezeIssue {
  issueId:               string;          // PFI-{UUID}
  frozenPrdId:           string;
  intakeFormId:          string;
  issueDescription:      string;
  discoveredBy:          StakeholderRole;
  discoveredAt:          Date;
  severity:              PostFreezeIssueSeverity;
  resolution:            "new_intake" | "erratum" | "supersession" | null;
  newIntakeFormId:       string | null;
  newPrdId:              string | null;
  erratumId:             string | null;
  resolvedAt:            Date | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP-LEVEL CLARIFICATION RUN
// ─────────────────────────────────────────────────────────────────────────────

export interface ClarificationRun {
  runId:                 string;          // CLARRUN-{UUID}
  intakeFormId:          string;
  trigger:               "pre_prd" | "during_prd_generation" | "prd_iteration_stall" | "post_freeze";
  startedAt:             Date;
  completedAt:           Date | null;
  status:                IntakeReadinessStatus;
  roundsCompleted:       number;
  ambiguityReport:       AmbiguityReport;
  clarificationRequests: ClarificationRequest[];
  assumptions:           AssumptionRecord[];
  conflicts:             StakeholderConflict[];
  auditLog:              ClarificationLogRecord[];
  reEntryPoint:          string | null;  // e.g. "PRD_GENERATION Phase 1"
  reEntryScope:          "full" | "partial" | null;
}
```

---

## Zod Validation Schemas

```typescript
import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export const AmbiguityTypeSchema = z.enum([
  "AMB-M", "AMB-V", "AMB-X", "AMB-A", "AMB-I", "AMB-S",
]);

export const AmbiguitySeveritySchema = z.enum(["AMB-1", "AMB-2", "AMB-3"]);

export const AmbiguityStatusSchema = z.enum([
  "DETECTED", "QUESTION_GENERATED", "AWAITING_RESPONSE", "RESPONSE_RECEIVED",
  "REJECTED", "VALIDATED", "RESOLVED", "RESOLVED_WITH_CASCADE",
  "AUTO_ASSUMED", "AUTO_ASSUMED_FROM_SILENCE", "CONFIRMED",
  "CONFIRMED_BY_SILENCE", "CLOSED",
]);

export const ClarificationRequestStatusSchema = z.enum([
  "OPEN", "PARTIALLY_RESOLVED", "FULLY_RESOLVED", "EXPIRED",
]);

export const StakeholderRoleSchema = z.enum([
  "FOUNDER", "CTO", "CPO", "TECH_LEAD", "SEC_LEAD", "LEGAL",
  "DESIGN", "FINANCE", "AGENT",
]);

export const EscalationLevelSchema = z.enum(["L1", "L2", "L3", "L4", "L5"]);

export const ResolutionMethodSchema = z.enum([
  "STAKEHOLDER_RESPONSE", "AUTO_ASSUMPTION", "FORCED_RESOLUTION",
  "STAKEHOLDER_SILENCE", "CONFLICT_RESOLUTION",
]);

export const DeliveryChannelSchema = z.enum([
  "in_app_ui", "email", "async_api_response",
  "slack_notification", "github_comment",
]);

export const IntakeReadinessStatusSchema = z.enum([
  "READY", "PROCEED_WITH_ASSUMPTIONS", "CLARIFICATION_RECOMMENDED",
  "HALTED", "CLARIFICATION_EXHAUSTED", "MANUAL_REVIEW_REQUIRED",
]);

// ─────────────────────────────────────────────────────────────────────────────
// DETECTED AMBIGUITY
// ─────────────────────────────────────────────────────────────────────────────

export const DetectedAmbiguitySchema = z.object({
  ambiguityId:         z.string().regex(/^AMB-/),
  ambiguityType:       AmbiguityTypeSchema,
  severity:            AmbiguitySeveritySchema,
  fieldPath:           z.string().min(1),
  sectionNumber:       z.number().int().min(1).max(25),
  currentValue:        z.unknown(),
  detectionRuleId:     z.string().min(1),
  description:         z.string().min(10),
  architecturalImpact: z.string().min(10),
  automatedAssumption: z.string().nullable(),
  status:              AmbiguityStatusSchema,
  createdAt:           z.date(),
  resolvedAt:          z.date().nullable(),
  resolvedValue:       z.unknown().nullable(),
}).refine(
  (a) => {
    // AMB-1 (Critical) must never have an automated assumption
    if (a.severity === "AMB-1") return a.automatedAssumption === null;
    return true;
  },
  { message: "Critical ambiguities (AMB-1) must not have automated assumptions" }
).refine(
  (a) => {
    if (a.status === "CLOSED" || a.status === "RESOLVED") {
      return a.resolvedAt !== null && a.resolvedValue !== null;
    }
    return true;
  },
  { message: "CLOSED and RESOLVED ambiguities must have resolvedAt and resolvedValue set" }
);

export const AmbiguityReportSchema = z.object({
  intakeFormId:       z.string().uuid(),
  reportId:           z.string().regex(/^AR-/),
  generatedAt:        z.date(),
  ambiguities:        z.array(DetectedAmbiguitySchema),
  criticalCount:      z.number().int().min(0),
  warningCount:       z.number().int().min(0),
  infoCount:          z.number().int().min(0),
  ambiguityScore:     z.number().int().min(0).max(100),
  readinessStatus:    IntakeReadinessStatusSchema,
  haltConditions:     z.array(z.string()),
  blockedDecisions:   z.array(z.string()),
}).refine(
  (r) => r.criticalCount === r.ambiguities.filter(a => a.severity === "AMB-1").length,
  { message: "criticalCount must match number of AMB-1 ambiguities in the array" }
).refine(
  (r) => {
    const computed = Math.max(
      0,
      100
        - r.criticalCount * 20
        - r.warningCount * 5
        - r.infoCount * 1
    );
    return r.ambiguityScore === computed;
  },
  { message: "ambiguityScore must equal 100 - (criticalCount×20) - (warningCount×5) - (infoCount×1), floored at 0" }
).refine(
  (r) => {
    if (r.criticalCount > 0) {
      return r.readinessStatus === "HALTED" || r.readinessStatus === "CLARIFICATION_EXHAUSTED";
    }
    return true;
  },
  { message: "If criticalCount > 0, readinessStatus must be HALTED or CLARIFICATION_EXHAUSTED" }
);

// ─────────────────────────────────────────────────────────────────────────────
// CLARIFICATION QUESTION
// ─────────────────────────────────────────────────────────────────────────────

export const ClarificationQuestionSchema = z.object({
  cqId:                z.string().regex(/^CQ-/),
  crId:                z.string().regex(/^CR-/),
  ambiguityId:         z.string().regex(/^AMB-/),
  ambiguityType:       AmbiguityTypeSchema,
  severity:            AmbiguitySeveritySchema,
  fieldPath:           z.string().min(1),
  sectionNumber:       z.number().int().min(1).max(25),
  currentValue:        z.unknown(),
  requiredFor:         z.string().min(5),
  questionText:        z.string().min(20),
  answerFormat:        z.object({
    type:    z.enum(["enum", "integer", "boolean", "string", "list"]),
    options: z.array(z.string()).nullable(),
    bounds:  z.object({ min: z.number(), max: z.number() }).nullable(),
    example: z.string().min(1),
  }),
  context:             z.string().min(20),
  ifNotAnsweredByDeadline: z.string().min(5),
  assignedTo:          StakeholderRoleSchema,
  escalationTo:        StakeholderRoleSchema,
  escalationLevel:     EscalationLevelSchema,
  status:              AmbiguityStatusSchema,
  sequentialDependencies: z.array(z.string()),
  dependentQuestions:  z.array(z.string()),
}).refine(
  (q) => {
    // enum and list types must have non-empty options
    if (q.answerFormat.type === "enum" || q.answerFormat.type === "list") {
      return q.answerFormat.options !== null && q.answerFormat.options.length > 0;
    }
    return true;
  },
  { message: "Enum and list answer formats must have non-empty options array" }
).refine(
  (q) => {
    // integer types must have bounds
    if (q.answerFormat.type === "integer") {
      return q.answerFormat.bounds !== null;
    }
    return true;
  },
  { message: "Integer answer formats must have bounds defined" }
).refine(
  (q) => q.assignedTo !== q.escalationTo,
  { message: "assignedTo and escalationTo must be different stakeholders" }
);

// ─────────────────────────────────────────────────────────────────────────────
// CLARIFICATION REQUEST
// ─────────────────────────────────────────────────────────────────────────────

export const ClarificationRequestSchema = z.object({
  crId:              z.string().regex(/^CR-\d{4}-\d{3}$/),
  intakeFormId:      z.string().uuid(),
  roundNumber:       z.number().int().min(1).max(5),
  status:            ClarificationRequestStatusSchema,
  priority:          z.enum(["URGENT", "NORMAL", "LOW"]),
  createdAt:         z.date(),
  deliveredAt:       z.date().nullable(),
  deliveryChannel:   DeliveryChannelSchema,
  responseDeadline:  z.date(),
  questions:         z.array(ClarificationQuestionSchema).min(1).max(10),
  criticalCount:     z.number().int().min(0),
  warningCount:      z.number().int().min(0),
  infoCount:         z.number().int().min(0),
  blockedDecisions:  z.array(z.string()),
  resolvedCount:     z.number().int().min(0),
  totalCount:        z.number().int().min(1),
  fullyResolvedAt:   z.date().nullable(),
  expiredAt:         z.date().nullable(),
}).refine(
  (cr) => cr.resolvedCount <= cr.totalCount,
  { message: "resolvedCount cannot exceed totalCount" }
).refine(
  (cr) => cr.totalCount === cr.questions.length,
  { message: "totalCount must equal the number of questions" }
).refine(
  (cr) => {
    if (cr.criticalCount > 0) return cr.priority === "URGENT";
    return true;
  },
  { message: "CRs with critical questions must have priority = URGENT" }
).refine(
  (cr) => {
    if (cr.status === "FULLY_RESOLVED") return cr.fullyResolvedAt !== null;
    return true;
  },
  { message: "FULLY_RESOLVED CRs must have fullyResolvedAt set" }
);

// ─────────────────────────────────────────────────────────────────────────────
// CLARIFICATION RESPONSE
// ─────────────────────────────────────────────────────────────────────────────

export const ClarificationResponseSchema = z.object({
  responseId:        z.string().regex(/^RESP-/),
  crId:              z.string().regex(/^CR-/),
  cqId:              z.string().regex(/^CQ-/),
  intakeFormId:      z.string().uuid(),
  respondedBy:       StakeholderRoleSchema,
  respondedAt:       z.date(),
  deliveryChannel:   DeliveryChannelSchema,
  responseValue:     z.unknown(),
  validationPassed:  z.boolean(),
  validationErrors:  z.array(z.string()),
  appliedToIntake:   z.boolean(),
  rejectedAt:        z.date().nullable(),
  rejectionReason:   z.string().nullable(),
}).refine(
  (r) => {
    if (!r.validationPassed) {
      return r.validationErrors.length > 0 && r.appliedToIntake === false;
    }
    return true;
  },
  { message: "Failed validation must have validation errors and appliedToIntake = false" }
).refine(
  (r) => {
    if (r.appliedToIntake) return r.validationPassed === true;
    return true;
  },
  { message: "appliedToIntake can only be true if validationPassed is true" }
);

// ─────────────────────────────────────────────────────────────────────────────
// ASSUMPTION RECORD
// ─────────────────────────────────────────────────────────────────────────────

export const AssumptionRecordSchema = z.object({
  assumptionId:        z.string().regex(/^ASSUMPTION-\d{3}$/),
  ambiguityId:         z.string().regex(/^AMB-/),
  cqId:                z.string().nullable(),
  fieldPath:           z.string().min(1),
  originalValue:       z.unknown(),
  assumedValue:        z.unknown(),
  assumptionBasis:     z.enum([
    "automated_default", "stakeholder_silence", "forced_resolution",
  ]),
  assumedAt:           z.date(),
  ambiguityType:       AmbiguityTypeSchema,
  severity:            AmbiguitySeveritySchema,
  confirmedBy:         z.union([StakeholderRoleSchema, z.literal("AUTO")]).nullable(),
  confirmedAt:         z.date().nullable(),
  overridable:         z.boolean(),
  architectureImpact:  z.string().min(10),
  stakeholderNotice:   z.string().min(10),
  requiresHumanReview: z.boolean(),
}).refine(
  (a) => {
    // Forced resolution always requires human review
    if (a.assumptionBasis === "forced_resolution") return a.requiresHumanReview === true;
    return true;
  },
  { message: "Forced resolution assumptions must always require human review" }
).refine(
  (a) => {
    // AMB-1 assumptions must not be automated_default
    if (a.severity === "AMB-1") return a.assumptionBasis !== "automated_default";
    return true;
  },
  { message: "Critical ambiguities (AMB-1) cannot use automated_default assumption basis" }
);

// ─────────────────────────────────────────────────────────────────────────────
// CLARIFICATION LOG RECORD
// ─────────────────────────────────────────────────────────────────────────────

export const ClarificationLogRecordSchema = z.object({
  logId:               z.string().regex(/^CL-/),
  intakeFormId:        z.string().uuid(),
  crId:                z.string().regex(/^CR-/),
  cqId:                z.string().regex(/^CQ-/),
  ambiguityId:         z.string().regex(/^AMB-/),
  ambiguityType:       AmbiguityTypeSchema,
  severity:            AmbiguitySeveritySchema,
  fieldPath:           z.string().min(1),
  originalValue:       z.unknown(),
  questionText:        z.string().min(20),
  sentTo:              StakeholderRoleSchema,
  sentAt:              z.date(),
  deliveryChannel:     DeliveryChannelSchema,
  deliveredAt:         z.date().nullable(),
  responseReceivedAt:  z.date().nullable(),
  responseValue:       z.unknown().nullable(),
  responseValidated:   z.boolean().nullable(),
  validationError:     z.string().nullable(),
  finalValue:          z.unknown(),
  resolutionMethod:    ResolutionMethodSchema,
  resolvedAt:          z.date(),
  resolvedBy:          z.union([
    StakeholderRoleSchema,
    z.literal("AUTO"),
    z.literal("FORCED"),
  ]),
  cascadesTriggered:   z.array(z.string()),
  newAmbiguitiesCreated: z.array(z.string()),
}).refine(
  (l) => {
    // If resolved by FORCED, resolution method must be FORCED_RESOLUTION
    if (l.resolvedBy === "FORCED") return l.resolutionMethod === "FORCED_RESOLUTION";
    return true;
  },
  { message: "FORCED resolvedBy requires resolutionMethod = FORCED_RESOLUTION" }
).refine(
  (l) => {
    // If resolved by AUTO, resolution method must be AUTO_ASSUMPTION or STAKEHOLDER_SILENCE
    if (l.resolvedBy === "AUTO") {
      return (
        l.resolutionMethod === "AUTO_ASSUMPTION" ||
        l.resolutionMethod === "STAKEHOLDER_SILENCE"
      );
    }
    return true;
  },
  { message: "AUTO resolvedBy requires resolutionMethod of AUTO_ASSUMPTION or STAKEHOLDER_SILENCE" }
);

// ─────────────────────────────────────────────────────────────────────────────
// POST-FREEZE ISSUE
// ─────────────────────────────────────────────────────────────────────────────

export const PostFreezeIssueSchema = z.object({
  issueId:         z.string().regex(/^PFI-/),
  frozenPrdId:     z.string().regex(/^PRD-/),
  intakeFormId:    z.string().uuid(),
  issueDescription: z.string().min(20),
  discoveredBy:    StakeholderRoleSchema,
  discoveredAt:    z.date(),
  severity:        z.enum(["CRITICAL", "MATERIAL", "MINOR"]),
  resolution:      z.enum(["new_intake", "erratum", "supersession"]).nullable(),
  newIntakeFormId: z.string().uuid().nullable(),
  newPrdId:        z.string().nullable(),
  erratumId:       z.string().nullable(),
  resolvedAt:      z.date().nullable(),
}).refine(
  (i) => {
    if (i.severity === "CRITICAL" || i.severity === "MATERIAL") {
      if (i.resolvedAt !== null) {
        return i.resolution === "new_intake" || i.resolution === "supersession";
      }
    }
    return true;
  },
  { message: "Resolved CRITICAL/MATERIAL issues must use new_intake or supersession resolution" }
).refine(
  (i) => {
    if (i.resolution === "erratum") return i.erratumId !== null;
    return true;
  },
  { message: "Erratum resolution must have erratumId set" }
);

// ─────────────────────────────────────────────────────────────────────────────
// TOP-LEVEL CLARIFICATION RUN
// ─────────────────────────────────────────────────────────────────────────────

export const ClarificationRunSchema = z.object({
  runId:                 z.string().regex(/^CLARRUN-/),
  intakeFormId:          z.string().uuid(),
  trigger:               z.enum([
    "pre_prd", "during_prd_generation", "prd_iteration_stall", "post_freeze",
  ]),
  startedAt:             z.date(),
  completedAt:           z.date().nullable(),
  status:                IntakeReadinessStatusSchema,
  roundsCompleted:       z.number().int().min(0).max(5),
  ambiguityReport:       AmbiguityReportSchema,
  clarificationRequests: z.array(ClarificationRequestSchema),
  assumptions:           z.array(AssumptionRecordSchema),
  conflicts:             z.array(z.object({
    conflictId:   z.string().regex(/^CONFLICT-/),
    crId:         z.string(),
    cqId:         z.string(),
    conflictType: z.enum(["TYPE-A", "TYPE-B", "TYPE-C"]),
    resolvedAt:   z.date().nullable(),
    resolvedBy:   StakeholderRoleSchema.nullable(),
  })),
  auditLog:              z.array(ClarificationLogRecordSchema),
  reEntryPoint:          z.string().nullable(),
  reEntryScope:          z.enum(["full", "partial"]).nullable(),
}).refine(
  (run) => run.roundsCompleted === run.clarificationRequests.length,
  { message: "roundsCompleted must equal the number of clarification requests" }
).refine(
  (run) => {
    if (run.status === "READY" || run.status === "PROCEED_WITH_ASSUMPTIONS") {
      return run.reEntryPoint !== null;
    }
    return true;
  },
  { message: "Completed runs must specify a re-entry point" }
);
```


---

## Example Clarification Flows

The following three examples show end-to-end clarification flows for the three intake archetypes
from `REQUIREMENTS_INTAKE.md`. Each example demonstrates different ambiguity types and
resolution paths.

---

### Flow A — Bootstrap SaaS: Vague Scale Clarification

**Scenario:** A solo founder submits an intake form for a simple task-management SaaS.
Most fields are filled correctly, but three fields are ambiguous.

#### Step 1 — Ambiguity Detection

```
AMBIGUITY REPORT
──────────────────────────────────────────────────────────────────────────
Intake Form ID:    intake-flow-a-bootstrap-001
Generated At:      2026-02-01T08:00:00Z
Total Ambiguities: 3
  Critical (AMB-1): 1
  Warning  (AMB-2): 1
  Info     (AMB-3): 1

Ambiguity Score:   74/100 (100 - 20 - 5 - 1)
Readiness Status:  HALTED (1 Critical ambiguity present)

DETECTED AMBIGUITIES:
  AMB-001
    Type:    AMB-V (Vague)
    Severity: AMB-1 (Critical)
    Field:   section11.targetApiP95
    Current: "fast"
    Trigger: non-numeric performance target
    Impact:  Cannot select connection pooling strategy or determine
             whether a cache layer is required.
    Assumption: None — AMB-1 requires human resolution.

  AMB-002
    Type:    AMB-M (Missing)
    Severity: AMB-2 (Warning)
    Field:   section12.rto
    Current: null
    Trigger: null value for optional SLA field
    Impact:  Cannot prescribe backup strategy or failover configuration.
    Assumption: "1hr_to_4hr" (industry average for bootstrap SaaS)

  AMB-003
    Type:    AMB-I (Inconsistent)
    Severity: AMB-3 (Info)
    Field:   section1.projectDescription
    Current: "A task app that helps teams stay organized."
    Trigger: description is 45 chars but contains "teams" while
             section2 lists only one persona (individual user)
    Impact:  None architectural. Note only.
    Assumption: Treat as single-user by default.
──────────────────────────────────────────────────────────────────────────
```

#### Step 2 — Clarification Request Generated

```
CLARIFICATION REQUEST CR-2026-001
──────────────────────────────────────────────────────────────────────────
Status:    OPEN
Priority:  URGENT (1 Critical question)
Deadline:  48 hours from delivery

QUESTION CQ-CR-2026-001-01 [AMB-1]
  Field:    section11.targetApiP95
  Current:  "fast"
  Assigned: TECH_LEAD (founder acts as Tech Lead for solo project)
  Escalate: CTO (N/A — same person; escalate to FOUNDER after 48h)

  QUESTION TEXT:
    "The API response time target `targetApiP95` is currently set to 'fast',
     which is not a numeric value and cannot be used to select infrastructure.
     Please specify a concrete target in one of these formats:

     Options:
       (a) under_100ms  — Very fast; requires caching + optimized queries
       (b) 100ms_to_300ms  — Fast; achievable with indexed queries + pooling
       (c) 300ms_to_500ms  — Standard; most SaaS products meet this
       (d) 500ms_to_1s  — Acceptable; lightweight stack sufficient

     Example answer: 100ms_to_300ms"

  CONTEXT:
    The P95 API response time determines whether a Redis cache layer is required
    and whether PgBouncer connection pooling must be configured for the MVP.
    A 'fast' target without specifics prevents a deterministic stack selection.

  IF NOT ANSWERED BY DEADLINE:
    Pipeline remains halted. This is a required architectural decision.

QUESTION CQ-CR-2026-001-02 [AMB-2]
  Field:    section12.rto
  Current:  null
  Assigned: TECH_LEAD

  QUESTION TEXT:
    "The Recovery Time Objective (RTO) — the maximum acceptable downtime
     after an incident — was not specified. Please select one:

     Options:
       (a) under_15min  — Near-zero downtime; requires hot standby
       (b) 15min_to_1hr  — Standard; achievable with monitoring + manual failover
       (c) 1hr_to_4hr  — Acceptable; most bootstrap SaaS can tolerate this
       (d) over_4hr  — Low priority; no formal recovery SLA

     Example answer: 1hr_to_4hr"

  IF NOT ANSWERED BY DEADLINE:
    Assumed: 1hr_to_4hr (logged as ASSUMPTION-001)

[AMB-3 questions batched into separate low-priority review — no deadline]
──────────────────────────────────────────────────────────────────────────
```

#### Step 3 — Responses Received

```
RESPONSE LOG (received within 24 hours)
──────────────────────────────────────────────────────────────────────────
CQ-CR-2026-001-01:
  Responded by:  FOUNDER (as TECH_LEAD)
  Responded at:  2026-02-01T20:30:00Z
  Answer:        "100ms_to_300ms"
  Validation:    ✅ PASSED (valid enum value)
  Applied:       section11.targetApiP95 = "100ms_to_300ms"

CQ-CR-2026-001-02:
  Responded by:  FOUNDER
  Responded at:  2026-02-01T20:32:00Z
  Answer:        "1hr_to_4hr"
  Validation:    ✅ PASSED
  Applied:       section12.rto = "1hr_to_4hr"
──────────────────────────────────────────────────────────────────────────
```

#### Step 4 — Cascade Check + Re-validation

```
CASCADE SCAN RESULTS
──────────────────────────────────────────────────────────────────────────
targetApiP95 = "100ms_to_300ms" cascades to:
  → cacheLayerRequired: re-validate
    Result: no new ambiguity (cacheLayerRequired = true was already set)
  → connectionPooling: re-validate
    Result: no new ambiguity (connectionPooling = pgbouncer already set)

rto = "1hr_to_4hr" cascades to:
  → backupStrategy: re-validate
    Result: ASSUMPTION-001 created (backupStrategy = "daily_snapshot" assumed)

No new AMB-1 ambiguities created.
──────────────────────────────────────────────────────────────────────────

RE-VALIDATION RESULTS
  Critical ambiguities:  0
  Warning ambiguities:   0  (AMB-002 resolved; ASSUMPTION-001 logged)
  Info ambiguities:      1  (AMB-003 unchanged — no architectural impact)
  Ambiguity Score:       99/100
  Readiness Status:      ✅ READY
  Intake Status:         APPROVED

PIPELINE RE-ENTRY:
  Scope: FULL (AMB-1 field resolved → re-run from Phase 1)
  Re-entry point: PRD_GENERATION.md Phase 1
──────────────────────────────────────────────────────────────────────────
```

---

### Flow B — Series-A B2B: Multi-Tenancy Model Conflict

**Scenario:** A product team at a Series-A B2B startup submits an intake form.
The form has a cross-field contradiction between the multi-tenancy model and
the declared RBAC role structure.

#### Step 1 — Ambiguity Detection

```
AMBIGUITY REPORT
──────────────────────────────────────────────────────────────────────────
Intake Form ID:    intake-flow-b-series-a-001
Generated At:      2026-02-10T09:00:00Z
Total Ambiguities: 2
  Critical (AMB-1): 1 (cross-field contradiction XC-004)
  Warning  (AMB-2): 1
  Info     (AMB-3): 0

Ambiguity Score:   75/100
Readiness Status:  HALTED

DETECTED AMBIGUITIES:
  AMB-010
    Type:     AMB-X (Contradictory)
    Severity: AMB-1
    Rule:     XC-004
    Field A:  section3.multiTenancyModel = "multi_tenant"
    Field B:  section4.rbacRoles = ["admin", "user", "viewer"] (global, not tenant-scoped)
    Impact:   Cannot determine whether RBAC roles are global or tenant-scoped.
              This changes the database schema (join tables vs tenant_id columns),
              the session token structure, and the middleware routing.

  AMB-011
    Type:     AMB-V (Vague)
    Severity: AMB-2
    Field:    section3.tenantOnboardingModel = "self-serve or manual, we're not sure"
    Impact:   Cannot determine whether a tenant provisioning API is needed for MVP.
    Assumption: "self_service" (most common B2B SaaS pattern)
──────────────────────────────────────────────────────────────────────────
```

#### Step 2 — Clarification Request

```
CLARIFICATION REQUEST CR-2026-005
──────────────────────────────────────────────────────────────────────────
Priority:  URGENT
Deadline:  48 hours

QUESTION CQ-CR-2026-005-01 [AMB-1, XC-004]
  Assigned: CTO (primary per routing matrix for multi-tenancy + access control)
  Escalate: TECH_LEAD

  QUESTION TEXT:
    "The intake declares a multi-tenant system (multiTenancyModel = multi_tenant)
     but the RBAC roles [admin, user, viewer] are defined without tenant scoping.
     This creates a structural ambiguity: are roles assigned globally to users,
     or scoped per tenant?

     The two interpretations lead to different database schemas:
       (a) Global roles: user has a single role across all tenants
           → Simple junction table: user_roles(user_id, role_id)
           → A user who is 'admin' in Tenant A is also 'admin' in Tenant B

       (b) Tenant-scoped roles: user has a role per tenant
           → Tenant-scoped junction: tenant_user_roles(tenant_id, user_id, role_id)
           → A user can be 'admin' in Tenant A and 'viewer' in Tenant B

     Please confirm which model your system requires:
       (a) global_roles
       (b) tenant_scoped_roles

     Example answer: tenant_scoped_roles"

  CONTEXT:
    In multi-tenant B2B SaaS, tenant-scoped roles are almost always required
    because enterprise customers expect independent user management per account.
    However, if your system will never allow a user to belong to multiple tenants,
    global roles may be correct.

  IF NOT ANSWERED BY DEADLINE:
    Pipeline remains halted. Database schema cannot be designed without this decision.
──────────────────────────────────────────────────────────────────────────
```

#### Step 3 — Response + Conflict

```
CQ-CR-2026-005-01 Response Round 1:
  CPO answered: "global_roles" (answered on behalf of CTO who was traveling)
  CTO answered (3 hours later): "tenant_scoped_roles"

CONFLICT DETECTED: CONFLICT-001
  Type: TYPE-C (Scope conflict — CPO and CTO disagree)
  Conflict: CPO says global, CTO says tenant-scoped
  Escalation: Both responses shown to FOUNDER

FOUNDER decision (received 6 hours after conflict detected):
  "Tenant-scoped. We're B2B. Customers will absolutely expect independent
   admin panels."
  Answer: tenant_scoped_roles

CONFLICT RESOLVED:
  finalValue: tenant_scoped_roles
  resolvedBy: FOUNDER (TYPE-C tiebreaker)
  resolutionMethod: CONFLICT_RESOLUTION
```

#### Step 4 — Cascade + Re-validation

```
CASCADE: rbacRoles updated to indicate tenant-scoped
  → section4.rbacRoleScope confirmed as "tenant_scoped"
  → session strategy re-validate:
    sessionStrategy = "jwt" → NEW AMB-2 CREATED
    AMB-012: jwt sessions do not carry tenant-scoped role claims by default.
    Assumption: Add tenantId + tenantRole claim to JWT payload
                (documented in PRD as ASSUMPTION-002)

FINAL STATUS:
  Critical ambiguities:  0
  Warning ambiguities:   1  (AMB-012 auto-assumed, no halt)
  Ambiguity Score:       95/100
  Readiness Status:      ✅ PROCEED_WITH_ASSUMPTIONS
  Intake Status:         APPROVED (with 2 documented assumptions)

Pipeline re-entry: PRD_GENERATION.md Phase 2
  (Archetype already stable; re-check from archetype selection forward
   since RBAC schema change affects modular_monolith module boundaries)
```

---

### Flow C — Enterprise: Compliance Framework Contradiction

**Scenario:** An enterprise product team submits an intake form declaring both HIPAA
compliance and an external AI provider (OpenAI) without mentioning a BAA.
This triggers the critical cross-field rule XC-003.

#### Step 1 — Ambiguity Detection

```
AMBIGUITY REPORT
──────────────────────────────────────────────────────────────────────────
Intake Form ID:    intake-flow-c-enterprise-001
Generated At:      2026-02-15T10:00:00Z
Total Ambiguities: 3
  Critical (AMB-1): 2
  Warning  (AMB-2): 1
  Info     (AMB-3): 0

Ambiguity Score:   59/100  (100 - 20 - 20 - 5 = 55; adjusted to 59 for partial
                             documentation but still HALTED)
Readiness Status:  HALTED

DETECTED AMBIGUITIES:
  AMB-020
    Type:     AMB-X (Contradictory)
    Severity: AMB-1
    Rule:     XC-003
    Field A:  section13.complianceFrameworks = ["hipaa", "soc2_type2"]
    Field B:  section10.aiProvider = ["openai"]
    Impact:   Sending PHI to OpenAI without a BAA violates HIPAA.
              The pipeline cannot prescribe an AI stack until the BAA
              status is confirmed.

  AMB-021
    Type:     AMB-M (Missing)
    Severity: AMB-1
    Field:    section5.dataRetentionPolicy
    Current:  null
    Impact:   HIPAA requires a documented data retention policy.
              Cannot generate compliance requirements without it.

  AMB-022
    Type:     AMB-V (Vague)
    Severity: AMB-2
    Field:    section13.encryptionRequirements
    Current:  "standard encryption"
    Impact:   Cannot determine whether field-level encryption (FLE)
              is required. Different encryption scopes have significant
              infrastructure cost differences.
    Assumption: [encryption_at_rest, encryption_in_transit] (minimum HIPAA baseline)
──────────────────────────────────────────────────────────────────────────
```

#### Step 2 — Clarification Request (Round 1)

```
CLARIFICATION REQUEST CR-2026-010
──────────────────────────────────────────────────────────────────────────
Priority:   URGENT (2 Critical)
Deadline:   48 hours
Assigned:   SEC_LEAD (primary for compliance) + LEGAL (escalation)

QUESTION CQ-CR-2026-010-01 [AMB-1, XC-003]
  QUESTION TEXT:
    "The intake declares HIPAA compliance (complianceFrameworks = [hipaa, soc2_type2])
     and OpenAI as the AI provider. Under HIPAA, sending Protected Health Information (PHI)
     to an external AI provider requires a signed Business Associate Agreement (BAA).

     OpenAI does NOT offer a HIPAA BAA for its standard API.
     Microsoft Azure OpenAI DOES offer a HIPAA BAA addendum.

     Please confirm the status of your AI provider decision:
       (a) openai_with_phi_scrubbing — Continue with OpenAI but implement a PHI
           detection and scrubbing layer before any data leaves the system boundary.
           No PHI will be sent to OpenAI. BAA not required.
       (b) azure_openai_with_baa — Switch to Azure OpenAI and sign the HIPAA BAA.
           PHI may be processed by the AI. BAA required and must be confirmed.
       (c) no_external_ai — Remove AI feature from MVP. Self-host or defer.
       (d) ai_deferred — Defer AI feature to Phase 2 after compliance review.

     Example answer: azure_openai_with_baa"

QUESTION CQ-CR-2026-010-02 [AMB-1]
  QUESTION TEXT:
    "The data retention policy was not specified. HIPAA requires a documented
     retention schedule for PHI. Please provide:

     (a) defaultRetentionDays:   How long is PHI retained by default? (integer, 1–3650)
     (b) auditLogRetentionDays:  How long are HIPAA audit logs retained? (integer, min 2555)
                                  (HIPAA requires 6 years = 2190 days minimum)

     Example answer:
       defaultRetentionDays: 365
       auditLogRetentionDays: 2555"

[AMB-022 question batched separately as NORMAL priority — AMB-2 only]
──────────────────────────────────────────────────────────────────────────
```

#### Step 3 — Responses Received

```
CQ-CR-2026-010-01 (AI provider decision):
  Answered by: SEC_LEAD
  Answer:      "azure_openai_with_baa"
  Validation:  ✅ PASSED
  Applied:     aiProvider = ["azure_openai"]
               aiDataPrivacy = "no_external_ai_without_baa" (added field)
  Note:        SEC_LEAD confirms: "Azure OpenAI BAA will be signed before any
               PHI is processed. Implementation is blocked until BAA is executed."
               → ADR-007 generated in PRD: AI Stack — PROVISIONAL until BAA confirmed

CQ-CR-2026-010-02 (data retention):
  Answered by: LEGAL
  Answer:      defaultRetentionDays: 730 (2 years)
               auditLogRetentionDays: 2555 (7 years)
  Validation:  ✅ PASSED (auditLogRetentionDays ≥ 2190 ✓)
  Applied:     dataRetentionPolicy.defaultRetentionDays = 730
               dataRetentionPolicy.auditLogRetentionDays = 2555
```

#### Step 4 — Cascade + Round 2 Clarification

```
CASCADE from aiProvider = azure_openai:
  → aiDataPrivacy: re-validate
    Result: No new ambiguity (set correctly to "no_external_ai_without_baa")
  → deploymentPlatform: re-validate
    Result: azure_openai requires Azure or compatible cloud.
            Current deploymentPlatform = "aws"
            → NEW AMB-1 CREATED: AMB-023
              Type: AMB-X (Contradictory)
              Fields: aiProvider = [azure_openai] + deploymentPlatform = aws
              Impact: Azure OpenAI must be accessed via Azure API endpoint.
                      AWS deployment can call Azure OpenAI API; no architecture conflict.
                      But VNet peering may be required for compliance.
              Automated resolution: This is a known-safe cross-cloud call.
                                    Mark as AMB-2 (downgrade from initial AMB-1).
              Revised: AMB-023 severity = AMB-2, assumption = cross_cloud_api_call

ROUND 2: Single AMB-2 question sent for AMB-023 + original AMB-022
  Both resolved within 5 business days.
  AMB-022: encryptionRequirements confirmed = [encryption_at_rest, encryption_in_transit,
            field_level_encryption, key_management_service] (LEGAL confirmed full set)
  AMB-023: deploymentPlatform confirmed = aws (Azure OpenAI accessible via HTTPS; no VNet
            required for standard API usage)

FINAL STATUS:
  Critical ambiguities:  0
  Warning ambiguities:   0
  Ambiguity Score:       100/100
  Readiness Status:      ✅ READY
  Intake Status:         APPROVED

  Documented Assumptions: 1
    ASSUMPTION-003: encryptionRequirements initially vague;
                    confirmed as full set by LEGAL.
    requiresHumanReview: false (confirmed by authorized stakeholder)

  Provisional Sections: 1
    ADR-007 (AI Stack): PROVISIONAL — pending BAA execution confirmation.
    PRD AI section marked PROVISIONAL until BAA is signed and recorded.

Pipeline re-entry: PRD_GENERATION.md Phase 1
  (Full re-run: compliance frameworks changed, tension rules must re-fire)
```

---

## Clarification Process Version History

```
Version 1.0.0 — Initial release
  Added: Complete 6-part clarification process specification
  Added: Part 1 — Ambiguity Classification (6 types, 3 severity levels)
  Added: Part 1 — Field-level ambiguity detection rules for all 25 intake sections
  Added: Part 1 — Cross-field contradiction rules XC-001 through XC-010
  Added: Part 1 — Ambiguity scoring model (0–100) with readiness bands
  Added: Part 1 — Pipeline halt conditions (HALT-001 through HALT-005)
  Added: Part 2 — Clarification Request structure and generation rules
  Added: Part 2 — Question generation templates by ambiguity type
  Added: Part 2 — Question batching strategy (5 rules, sequential dependency handling)
  Added: Part 2 — Escalation levels L1–L5 with deadlines and auto-actions
  Added: Part 2 — 7 forbidden clarification patterns with correct alternatives
  Added: Part 3 — Stakeholder role catalogue (9 roles)
  Added: Part 3 — Question-to-stakeholder routing matrix (all 25 sections + cross-field)
  Added: Part 3 — Multi-stakeholder conflict protocol (3 conflict types, resolution paths)
  Added: Part 3 — Delivery channel rules and response deadline policy
  Added: Part 4 — Response validation rules RV-001 through RV-007
  Added: Part 4 — Intake field update protocol (6-step transaction)
  Added: Part 4 — Cascade dependency map (11 field categories)
  Added: Part 4 — Re-validation sequence after update
  Added: Part 4 — Response-field conflict handling
  Added: Part 5 — Automated assumption catalogue (20 fields with safe defaults)
  Added: Part 5 — Assumption documentation template
  Added: Part 5 — Resolution state machine (12 states, all valid transitions)
  Added: Part 5 — Convergence criteria (5 required conditions)
  Added: Part 5 — Maximum clarification budget (5 rounds, 3 CRs/round, 10 questions/CR)
  Added: Part 5 — Forced resolution rules (10 field forced values + human review requirement)
  Added: Part 6 — Re-entry point matrix (9 field categories → specific pipeline phases)
  Added: Part 6 — Partial vs full pipeline re-run decision rules
  Added: Part 6 — Post-freeze clarification protocol (3 severity paths: CRITICAL/MATERIAL/MINOR)
  Added: Part 6 — Clarification audit trail structure and use cases
  Added: TypeScript interfaces (10 enums, 12 interfaces, full type coverage)
  Added: Zod validation schemas (all entities with cross-field refinements)
  Added: Three complete clarification flow examples (Bootstrap, Series-A, Enterprise)
  Framework: Next.js (primary)
  Status: ACTIVE

Planned: Version 1.1.0
  - Add clarification process for mobile app (React Native) intake sections
  - Add automated CI/CD pipeline integration for GitHub comment delivery channel
  - Add Slack delivery channel integration specification
  - Add clarification metrics dashboard specification
    (average time to resolution, most commonly ambiguous fields, etc.)
  - Add multi-language support for question text generation
```

---

*End of CLARIFICATION_PROCESS.md — Document 3 of 4*
*Next: See `FINALIZATION.md` for the final tech stack document, project overview, and build contract.*
