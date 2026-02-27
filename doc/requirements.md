# REQUIREMENTS INTAKE
### Multi-Stage Architecture Orchestration Pipeline — Document 1 of 4
### Framework: Next.js (Primary) | Version: 1.0.0 | Status: ACTIVE

---

## Table of Contents

- [Purpose & Philosophy](#purpose--philosophy)
- [How to Use This Document](#how-to-use-this-document)
- [Intake Versioning Contract](#intake-versioning-contract)
- [PART 1 — General Requirements Intake](#part-1--general-requirements-intake)
  - [Section 1 — Project Identity](#section-1--project-identity)
  - [Section 2 — User Personas & Scale](#section-2--user-personas--scale)
  - [Section 3 — Multi-Tenancy Model](#section-3--multi-tenancy-model)
  - [Section 4 — Access Control Model](#section-4--access-control-model)
    - [4A — RBAC (Role-Based Access Control)](#4a--rbac-role-based-access-control)
    - [4B — ABAC (Attribute-Based Access Control)](#4b--abac-attribute-based-access-control)
    - [4C — Policy-Based Access Control](#4c--policy-based-access-control)
  - [Section 5 — Data Requirements](#section-5--data-requirements)
  - [Section 6 — Real-Time Requirements](#section-6--real-time-requirements)
  - [Section 7 — Background Jobs](#section-7--background-jobs)
  - [Section 8 — Integrations](#section-8--integrations)
  - [Section 9 — File Storage](#section-9--file-storage)
  - [Section 10 — AI / ML Requirements](#section-10--ai--ml-requirements)
  - [Section 11 — Performance Targets](#section-11--performance-targets)
  - [Section 12 — Availability & SLA](#section-12--availability--sla)
  - [Section 13 — Compliance & Security](#section-13--compliance--security)
  - [Section 14 — Infrastructure Constraints](#section-14--infrastructure-constraints)
  - [Section 15 — Timeline & Budget](#section-15--timeline--budget)
- [PART 2 — Tech Stack Questionnaire (Next.js)](#part-2--tech-stack-questionnaire-nextjs)
  - [Section 16 — Rendering Strategy](#section-16--rendering-strategy)
  - [Section 17 — API Layer Design](#section-17--api-layer-design)
  - [Section 18 — Database & ORM Selection](#section-18--database--orm-selection)
  - [Section 19 — Caching Strategy](#section-19--caching-strategy)
  - [Section 20 — Queue & Job Infrastructure](#section-20--queue--job-infrastructure)
  - [Section 21 — Authentication Provider](#section-21--authentication-provider)
  - [Section 22 — File Storage Provider](#section-22--file-storage-provider)
  - [Section 23 — Observability Stack](#section-23--observability-stack)
  - [Section 24 — CI/CD Pipeline](#section-24--cicd-pipeline)
  - [Section 25 — Testing Strategy](#section-25--testing-strategy)
- [TypeScript Interfaces](#typescript-interfaces)
- [Zod Validation Schemas](#zod-validation-schemas)
- [Decision Matrices](#decision-matrices)
- [Example Filled Forms](#example-filled-forms)
  - [Archetype A — Bootstrap SaaS MVP](#archetype-a--bootstrap-saas-mvp)
  - [Archetype B — Series-A B2B Platform](#archetype-b--series-a-b2b-platform)
  - [Archetype C — Enterprise Compliance Platform](#archetype-c--enterprise-compliance-platform)

---

## Purpose & Philosophy

This document is **not** a prompt. It is not a template. It is not a set of guidelines.

It is the **Input Contract** for the Multi-Stage Architecture Orchestration Pipeline.

Every decision downstream — the PRD, the tech stack, the database schema design, the access
control model, the observability configuration, the deployment topology — is computed
**deterministically** from the answers captured in this document.

If this intake is incomplete, ambiguous, or inconsistent, the pipeline will:

1. Detect the ambiguity
2. Classify its severity (Critical / Warning / Info)
3. Halt progression and issue a clarification request (see `CLARIFICATION_PROCESS.md`)
4. Refuse to generate a PRD until all Critical ambiguities are resolved

This is not optional. Vague inputs produce vague architectures. Vague architectures cause
production failures. Production failures cost money, reputation, and users.

**The contract is: structured input → deterministic output.**

### Why This Level of Detail?

Consider RBAC. Most intake forms ask: "Do you need role-based access control? Yes / No."

This is catastrophically insufficient.

The correct intake asks:
- How many roles?
- Is the role hierarchy flat or nested?
- Are roles global (platform-wide) or tenant-scoped?
- Can a single user hold multiple roles simultaneously?
- Are there resource-level ownership overrides?
- Can roles be created dynamically by admins?
- Does a super-admin bypass all permission checks or obey them?
- What is the cross-tenant interaction model?
- Does role assignment require approval workflows?

Each of those answers changes the database schema. Some require junction tables. Some require
a full policy engine. Some require tenant-scoped role tables. Getting this wrong at schema
design time means migrations at scale — the most expensive mistake in production engineering.

This is why the intake is deep. Every question exists because an answer changes a decision.

---

## How to Use This Document

### For Humans (Product Owners, Founders, CTOs)

1. Read each section carefully.
2. Answer every question marked `[REQUIRED]`. Questions marked `[OPTIONAL]` may be skipped
   but skipping them will trigger an automatic assumption documented in the PRD.
3. For questions with predefined options, select exactly one option unless the question
   explicitly permits multiple selections.
4. For questions with free-text answers, be specific. Avoid phrases like "standard",
   "normal", "typical", "as needed". These will be flagged as ambiguous.
5. After completing both Part 1 and Part 2, submit the completed form to the pipeline.
6. The pipeline will run the Clarification Process (see `CLARIFICATION_PROCESS.md`) before
   generating the PRD.

### For AI Agents

1. Parse this document as a structured schema.
2. When filling on behalf of a user, extract values from the user's description using the
   extraction rules defined in each question.
3. For any value you cannot extract with high confidence, mark the field as `AMBIGUOUS`
   with your best-guess value and a confidence score (0.0–1.0).
4. All `AMBIGUOUS` fields with confidence < 0.7 on a REQUIRED question will be escalated
   to the Clarification Process.
5. Do not infer access control model, data model, or compliance requirements. Always ask.

### Validation Rules (Global)

- All `[REQUIRED]` fields must be non-null, non-empty.
- Enum fields must contain exactly one of the listed options (unless `multi: true`).
- Numeric fields must be within the specified bounds.
- Interdependent fields: see the dependency map in each section.
- Contradictions (e.g., `scale: enterprise` + `budget: bootstrap`) are not validation
  errors — they are **tension signals** passed to the stability scorer in `PRD_GENERATION.md`.

---

## Intake Versioning Contract

```
Intake Form ID:     auto-generated UUID on submission
Intake Version:     1.0.0
Schema Version:     1.0.0
Submitted At:       ISO 8601 timestamp
Submitted By:       user ID or agent ID
PRD Reference:      null until PRD is generated
Status:             DRAFT | SUBMITTED | UNDER_CLARIFICATION | APPROVED | FROZEN
Immutability:       Once status = FROZEN, no field may be modified.
                    A new intake must be created for any change.
```

Rationale: The PRD and all downstream documents reference the **Intake Form ID**. If the
intake could be modified post-PRD, the entire downstream chain would be invalidated silently.
Immutability enforces traceability.

---

## PART 1 — General Requirements Intake

---

### Section 1 — Project Identity

This section establishes the fundamental nature of the project. Answers here set the
primary context for all downstream decisions. Take your time. Be precise.

---

#### Q1.1 — Project Name
```
Field:      projectName
Type:       string
Required:   YES
Min length: 2
Max length: 100
Pattern:    alphanumeric, spaces, hyphens allowed
Example:    "ArchAI Platform"
```

**Why it matters:** Used as namespace prefix in generated file structures, environment
variable prefixes, and documentation headers. Affects no architectural decisions directly
but required for all generated artifacts.

---

#### Q1.2 — Project Type
```
Field:      projectType
Type:       enum
Required:   YES
Options:
  - saas_b2b          # Software-as-a-Service sold to businesses
  - saas_b2c          # Software-as-a-Service sold to consumers
  - saas_b2b2c        # SaaS sold to businesses who serve consumers
  - internal_tool     # Internal tooling for a single organization
  - marketplace       # Platform connecting buyers and sellers
  - api_product       # API-first product sold to developers
  - developer_tool    # CLI, SDK, or developer productivity tool
  - e_commerce        # Online storefront with transactions
  - content_platform  # Blog, media, publishing platform
  - data_platform     # Analytics, BI, data pipeline platform
  - iot_platform      # IoT device management and telemetry
  - ai_product        # AI/ML product or wrapper
  - other             # Requires free-text description
```

**Why it matters:** Project type is the primary driver for:
- Multi-tenancy decision (saas_b2b almost always requires it; b2c rarely does)
- Default access control model (marketplace needs ownership model; internal_tool may not)
- Default compliance assumptions (e_commerce triggers PCI-DSS check; healthcare triggers HIPAA)
- Billing model inference (b2b → subscription; e_commerce → transactional)
- Landing page and onboarding flow patterns

**Dependency:** If `projectType = other`, field `projectTypeDescription` becomes REQUIRED.

---

#### Q1.3 — Project Type Description (Conditional)
```
Field:      projectTypeDescription
Type:       string
Required:   CONDITIONAL (required when projectType = other)
Max length: 500
```

---

#### Q1.4 — One-Line Problem Statement
```
Field:      problemStatement
Type:       string
Required:   YES
Min length: 20
Max length: 300
```

**Why it matters:** This is parsed by the PRD generator to identify the core value
proposition. It should describe the problem being solved, not the solution.

**Good example:** "Marketing teams at mid-size companies waste 6+ hours per week manually
compiling performance data from 5+ ad platforms into spreadsheets."

**Bad example:** "A dashboard for marketing analytics." (Describes solution, not problem.)

**Rejection criteria:** Inputs that describe the solution rather than the problem will be
flagged and the clarification process will ask for a problem restatement.

---

#### Q1.5 — Solution Summary
```
Field:      solutionSummary
Type:       string
Required:   YES
Min length: 30
Max length: 500
```

**Why it matters:** The solution summary, combined with the problem statement, allows the
PRD generator to derive: feature scope, boundary conditions, and what the product does NOT
do. Vague solutions generate vague PRDs.

**Good example:** "A unified marketing analytics dashboard that pulls data from Google Ads,
Meta, LinkedIn, and TikTok via OAuth integrations, normalizes it into a single data model,
and generates weekly performance reports with AI-generated commentary."

**Bad example:** "An AI-powered analytics platform." (Too vague, insufficient for PRD
generation.)

---

#### Q1.6 — Current Project Stage
```
Field:      projectStage
Type:       enum
Required:   YES
Options:
  - greenfield        # Nothing exists yet; starting from scratch
  - mvp_in_progress   # MVP is being built; no production users
  - launched          # Product is live with real users
  - scaling           # Product is growing; hitting infrastructure limits
  - migrating         # Migrating from existing system to new architecture
  - rebuilding        # Rewriting existing system with new stack
```

**Why it matters:** Project stage directly impacts:
- Risk tolerance (greenfield = higher; scaling = lower)
- Migration strategy (migrating/rebuilding require data migration plans)
- Whether to force a monolith (mvp_in_progress always gets monolith)
- Downtime tolerance (launched, scaling = zero-downtime required)
- Test coverage requirements (scaling = high; greenfield = medium)

---

#### Q1.7 — Existing Tech Stack (Conditional)
```
Field:      existingStack
Type:       string[]
Required:   CONDITIONAL (required when projectStage IN [migrating, rebuilding, scaling])
Options:    Free text list of technologies currently in use
Example:    ["Rails 6", "PostgreSQL 12", "Heroku", "React 17", "Sidekiq"]
```

**Why it matters:** Informs migration complexity, data migration strategy, and whether
incremental migration is possible. A Rails → Next.js migration has known patterns. A
COBOL → Next.js migration has completely different risk profiles.

---

#### Q1.8 — Industry / Vertical
```
Field:      industry
Type:       enum
Required:   YES
Options:
  - fintech           # Financial technology, payments, lending
  - healthtech        # Healthcare, medical records, patient data
  - edtech            # Education, learning management
  - legaltech         # Legal services, contracts, compliance
  - hrtech            # HR, payroll, workforce management
  - martech           # Marketing technology, analytics, CRM
  - devtools          # Developer tooling, CI/CD, infrastructure
  - ecommerce         # Retail, commerce, inventory
  - logistics         # Supply chain, shipping, tracking
  - proptech          # Real estate, property management
  - govtech           # Government, public sector
  - media             # Content, publishing, streaming
  - social            # Social networks, communities
  - enterprise_saas   # General enterprise software
  - consumer          # General consumer application
  - other             # Requires description
```

**Why it matters:** Industry is the primary trigger for:
- Compliance requirements (fintech → SOC2/PCI-DSS; healthtech → HIPAA; govtech → FedRAMP)
- Default data retention policies
- Default encryption requirements
- Audit trail requirements
- Geographic data residency requirements

**Automatic inference rules:**
- `fintech` → triggers `complianceRequirements` to include PCI-DSS check
- `healthtech` → triggers `complianceRequirements` to include HIPAA check
- `legaltech` → triggers `auditTrailRequired = true` by default
- `govtech` → triggers `dataResidency` question as REQUIRED

---

#### Q1.9 — Geographic Target Markets
```
Field:      targetGeographies
Type:       enum[]
Required:   YES
Multi:      true
Options:
  - us_only           # United States only
  - eu_only           # European Union only
  - us_and_eu         # Both US and EU
  - global            # Worldwide
  - apac              # Asia-Pacific
  - latam             # Latin America
  - mena              # Middle East and North Africa
  - specific          # Specific countries (requires detail)
```

**Why it matters:**
- `eu_only` or `us_and_eu` or `global` → GDPR compliance becomes REQUIRED
- `us_only` with `fintech` → PCI-DSS + CCPA analysis triggered
- `global` → CDN strategy becomes critical; edge deployment considered
- `specific` → data residency requirements may apply
- Multi-region targets affect database replication strategy

**Dependency:** If `specific` is selected, `targetGeographiesDetail` is REQUIRED.

---

#### Q1.10 — Target Launch Date
```
Field:      targetLaunchDate
Type:       date (ISO 8601)
Required:   YES
Constraint: Must be at least 14 days from intake submission date
Example:    "2025-09-01"
```

**Why it matters:** The timeline is the second-most critical tension signal. A 4-week
timeline with microservices preference is a Critical tension (-25 points on stability
score). An 8-week timeline with enterprise scale is a Warning tension (-10 points).

**Timeline bands used by the stability scorer:**
- < 4 weeks: Extreme constraint — forces Monolith, limits feature scope
- 4–8 weeks: Tight constraint — forces Monolith, moderate feature scope
- 8–16 weeks: Standard — Modular Monolith possible
- 16+ weeks: Flexible — full architecture options open
- > 52 weeks: Enterprise timeline — Microservices potentially viable

---

### Section 2 — User Personas & Scale

This section captures who uses the system and at what volume. These inputs directly drive
infrastructure sizing, database connection pool configuration, cache strategy, rate limiting
design, and cost projections.

---

#### Q2.1 — Primary User Type
```
Field:      primaryUserType
Type:       enum
Required:   YES
Options:
  - end_consumers         # Individual consumers (B2C)
  - business_employees    # Employees of a business (B2B internal)
  - business_admins       # Administrators managing a business account
  - developers            # Software developers using an API/SDK
  - mixed                 # Both consumers and businesses
```

**Why it matters:** Determines authentication flow complexity, onboarding design, and
default session duration. Consumer apps use social login + short sessions. Business apps
use SSO + long sessions. Developer tools use API keys + no UI sessions.

---

#### Q2.2 — Number of Distinct User Roles
```
Field:      numberOfRoles
Type:       integer
Required:   YES
Min:        1
Max:        50
Example:    3
```

**Why it matters:** This is one of the most impactful inputs in the entire intake.

- 1 role → Flat permission model; no RBAC infrastructure needed
- 2–4 roles → Standard RBAC; `roles` table + `user_roles` junction table
- 5–10 roles → Complex RBAC; consider role hierarchy; role inheritance analysis required
- 10–20 roles → Full RBAC engine; potential role-permission matrix; consider Casbin or similar
- 20+ roles → Policy engine likely required; consider OPA; RBAC alone insufficient

The database schema changes completely at each of these thresholds.

---

#### Q2.3 — Expected Number of Users at Launch
```
Field:      usersAtLaunch
Type:       enum
Required:   YES
Options:
  - under_100         # Internal tool, pilot, closed beta
  - 100_to_1k         # Early access, small B2B customers
  - 1k_to_10k         # Growing startup, limited public launch
  - 10k_to_100k       # Established product, regional launch
  - 100k_to_1m        # Scale-up, national/global launch
  - over_1m           # Hyper-scale from day one
```

**Why it matters:** Launch user count sets the initial infrastructure tier. It drives:
- Database tier selection (serverless vs. dedicated vs. pooled)
- Cache layer necessity (< 10k users → cache optional; > 100k → cache required)
- CDN configuration
- Rate limiting thresholds
- Connection pool sizing
- Whether horizontal scaling is needed at launch

---

#### Q2.4 — Expected Number of Users at 12 Months
```
Field:      usersAt12Months
Type:       enum
Required:   YES
Options:    (same as Q2.3)
```

**Why it matters:** The gap between `usersAtLaunch` and `usersAt12Months` defines the
**growth multiplier**. This drives:
- Whether the architecture needs horizontal scaling capability from day one
- Auto-scaling group configuration
- Database read replica strategy
- Whether queue infrastructure is needed pre-launch or can be added later

**Tension signal:** If `usersAt12Months = over_1m` and `budget = bootstrap`, this is a
Warning tension (-10 pts). The architecture must account for scale with minimal cost.

---

#### Q2.5 — Concurrent Active Users (Peak)
```
Field:      peakConcurrentUsers
Type:       enum
Required:   YES
Options:
  - under_50          # Small tool; no concurrency concern
  - 50_to_500         # Moderate; standard pooling sufficient
  - 500_to_5k         # Notable concurrency; connection pooling required
  - 5k_to_50k         # High concurrency; stateless architecture required
  - over_50k          # Hyper-concurrency; edge/CDN critical; WebSockets expensive
```

**Why it matters:** Peak concurrent users is the most direct driver of:
- Web server instance count
- Database connection pool size (PgBouncer consideration)
- WebSocket server capacity (if real-time features present)
- Cache hit rate requirements
- Rate limiting configuration

**Formula used in infrastructure sizing:**
```
db_connections_needed = peak_concurrent_users * 0.3 * avg_queries_per_request
pgbouncer_required = db_connections_needed > 100
```

---

#### Q2.6 — User Session Duration
```
Field:      avgSessionDuration
Type:       enum
Required:   YES
Options:
  - under_5min        # Quick reference tool; high bounce rate expected
  - 5_to_30min        # Moderate engagement
  - 30min_to_2hr      # High engagement; dashboard, working application
  - over_2hr          # Power users; editors, long-running workflows
```

**Why it matters:** Session duration affects:
- JWT expiry configuration
- Refresh token strategy
- Session storage requirements
- WebSocket connection lifecycle
- Idle timeout design

---

#### Q2.7 — User Geographic Distribution
```
Field:      userGeographicDistribution
Type:       enum
Required:   YES
Options:
  - single_region     # All users in one geographic area
  - multi_region      # Users spread across 2–5 regions
  - global            # Users across all major continents
```

**Why it matters:**
- `single_region` → single deployment zone sufficient; CDN optional
- `multi_region` → CDN required; consider database read replicas per region
- `global` → CDN mandatory; consider edge runtime for API routes; database replication plan required;
  latency SLA per region must be defined

---

#### Q2.8 — User Technical Sophistication
```
Field:      userTechnicalLevel
Type:       enum
Required:   YES
Options:
  - non_technical     # General consumers; no technical knowledge assumed
  - semi_technical    # Knowledge workers; comfortable with software
  - technical         # Developers, data analysts, technical operators
  - highly_technical  # Engineers, DevOps, power users
```

**Why it matters:** Affects:
- Error message design (human-friendly vs. technical details)
- Onboarding complexity tolerance
- Feature exposure strategy (progressive disclosure vs. full exposure)
- API documentation requirements
- CLI tooling necessity
- Default tour/help system requirement

---

#### Q2.9 — Will Users Have Sub-Accounts or Teams?
```
Field:      hasTeamAccounts
Type:       boolean
Required:   YES
Default:    false
```

**Why it matters:** If `true`, the user model requires a `teams` or `organizations` table,
membership tables, invitation flows, and team-level permission scoping. This is a
significant schema change. Many founders say "no" here and add it later — at great cost.
Force the decision now.

---

#### Q2.10 — Maximum Team / Organization Size
```
Field:      maxTeamSize
Type:       enum
Required:   CONDITIONAL (required when hasTeamAccounts = true)
Options:
  - under_10          # Small teams; startup internal tool
  - 10_to_50          # Small-medium teams
  - 50_to_500         # Medium-large enterprises
  - 500_to_5k         # Large enterprise departments
  - over_5k           # Enterprise-wide; division or company-level
```

**Why it matters:** Drives:
- Organization hierarchy depth (flat vs. nested departments)
- Permission propagation complexity
- Bulk user management requirements
- Directory sync necessity (SCIM/LDAP for > 500 users)
- Seat-based billing model requirements

---

#### Q2.11 — Does the App Support Guest / Anonymous Users?
```
Field:      hasGuestAccess
Type:       boolean
Required:   YES
Default:    false
```

**Why it matters:** If `true`:
- Rate limiting must be designed for unauthenticated traffic
- Guest session model must be defined (cookie-based? IP-based?)
- Progressive auth (guest → registered) flow must be planned
- Database must handle guest data lifecycle (cleanup, conversion, deletion)
- GDPR implications if guest data is stored

---

### Section 3 — Multi-Tenancy Model

Multi-tenancy is one of the most consequential architectural decisions in a SaaS product.
It cannot be changed after data is in production without a full migration. This section
captures everything needed to make the right decision once, correctly.

---

#### Q3.1 — Is This a Multi-Tenant Application?
```
Field:      isMultiTenant
Type:       boolean
Required:   YES
Default:    false
```

**Why it matters:** Multi-tenancy changes:
- The entire database schema (every table needs tenant scoping)
- The authentication flow (tenant resolution on login)
- The routing model (subdomain routing vs. path-based vs. header-based)
- The caching strategy (all cache keys must be tenant-scoped)
- The background job model (all jobs must carry tenant context)
- The logging strategy (all log lines must include tenant ID)
- The API design (tenant context must be validated on every request)

If `isMultiTenant = false`, Sections Q3.2 through Q3.12 are skipped.

---

#### Q3.2 — Tenant Isolation Model
```
Field:      tenantIsolationModel
Type:       enum
Required:   CONDITIONAL (required when isMultiTenant = true)
Options:
  - shared_schema         # All tenants in same tables; tenant_id column on every table
  - schema_per_tenant     # Separate PostgreSQL schema per tenant; same DB
  - database_per_tenant   # Separate database per tenant; highest isolation
  - hybrid                # Shared by default; dedicated for enterprise customers
```

**Decision guidance:**

| Model | Isolation | Cost | Complexity | Compliance | Recommended When |
|---|---|---|---|---|---|
| shared_schema | Low | Low | Low | Harder | Bootstrap, < 1000 tenants |
| schema_per_tenant | Medium | Medium | High | Medium | 100–10k tenants, compliance needed |
| database_per_tenant | High | Very High | Very High | Easy | Enterprise, HIPAA, FedRAMP |
| hybrid | Configurable | Medium | Very High | Configurable | Series-B+, mixed customer tiers |

**Why it matters:** This choice determines:
- Whether Row Level Security (RLS) is needed (shared_schema → yes)
- Whether Prisma can handle the schema cleanly (schema_per_tenant → complex)
- Whether connection pooling strategy changes per tenant (database_per_tenant → yes)
- Whether automated tenant provisioning is needed
- Cost per tenant (database_per_tenant can cost 10–100x shared_schema)

---

#### Q3.3 — Tenant Identification Method
```
Field:      tenantIdentificationMethod
Type:       enum
Required:   CONDITIONAL (required when isMultiTenant = true)
Options:
  - subdomain         # tenant.app.com — most common for B2B SaaS
  - custom_domain     # app.customer.com — premium tier feature
  - path_prefix       # app.com/tenant-slug/ — simpler but less professional
  - header_based      # X-Tenant-ID header — API-first products
  - query_param       # ?tenant=slug — avoid in production; acceptable for internal tools
  - jwt_claim         # Tenant ID embedded in auth token — clean; requires auth integration
```

**Why it matters:** Affects:
- Next.js middleware configuration (subdomain routing requires custom middleware)
- DNS configuration requirements
- SSL certificate strategy (wildcard cert for subdomain; per-cert for custom domain)
- Session isolation
- The tenant resolution function that runs on every request

**Recommendation:** For B2B SaaS, `subdomain` is the default. For API products, `jwt_claim`
or `header_based`. For internal tools, `path_prefix` or `jwt_claim`.

---

#### Q3.4 — Tenant Onboarding Model
```
Field:      tenantOnboardingModel
Type:       enum
Required:   CONDITIONAL (required when isMultiTenant = true)
Options:
  - self_service      # Tenants sign up themselves; instant provisioning
  - sales_assisted    # Sales team creates tenant; manual provisioning
  - invite_only       # Admin creates and invites tenants
  - api_provisioned   # Tenants created via API (partner/reseller model)
```

**Why it matters:**
- `self_service` → requires automated tenant provisioning job, email verification,
  payment method capture at signup, immediate database seeding
- `sales_assisted` → requires internal admin panel for tenant creation
- `invite_only` → requires invitation token system, email delivery
- `api_provisioned` → requires provisioning API with strong auth, webhook events

---

#### Q3.5 — Can Tenants Customize Their Instance?
```
Field:      tenantCustomization
Type:       enum[]
Required:   CONDITIONAL (required when isMultiTenant = true)
Multi:      true
Options:
  - branding          # Logo, colors, custom CSS
  - custom_domain     # Tenant brings their own domain
  - feature_flags     # Tenant can enable/disable features
  - custom_roles      # Tenant can create their own roles
  - custom_fields     # Tenant can add custom fields to entities
  - webhooks          # Tenant can configure outbound webhooks
  - sso_config        # Tenant configures their own SSO provider
  - billing_limits    # Tenant has configurable usage limits
  - none              # No customization; all tenants identical
```

**Why it matters:** Each customization type adds schema tables:
- `branding` → `tenant_branding` table
- `custom_domain` → `tenant_domains` table + DNS verification flow
- `feature_flags` → `tenant_feature_flags` table
- `custom_roles` → tenant-scoped `roles` table (complex RBAC)
- `custom_fields` → `entity_custom_fields` + `entity_custom_field_values` (EAV pattern)
- `webhooks` → `tenant_webhooks` + `webhook_deliveries` tables + delivery queue
- `sso_config` → `tenant_sso_configs` table + SSO provider integration

---

#### Q3.6 — Cross-Tenant Data Sharing
```
Field:      crossTenantSharing
Type:       enum
Required:   CONDITIONAL (required when isMultiTenant = true)
Options:
  - none              # Strict isolation; no data crosses tenant boundary
  - read_only         # Tenants can view shared public resources
  - configurable      # Tenants can opt-in to sharing specific resources
  - marketplace       # Tenants publish and consume each other's resources
```

**Why it matters:** Any cross-tenant sharing fundamentally changes the security model.
- `none` → standard RLS; no cross-tenant queries ever
- `read_only` → need a `public_resources` concept; soft permissions
- `configurable` → need a `sharing_permissions` table; complex query logic
- `marketplace` → need full permission grants between tenants; near-ABAC complexity

**Security implication:** Cross-tenant data access is the #1 source of data breach in
multi-tenant SaaS. If this is not `none`, a formal security review must occur before launch.

---

#### Q3.7 — Tenant Tier / Pricing Model
```
Field:      tenantTierModel
Type:       enum
Required:   CONDITIONAL (required when isMultiTenant = true)
Options:
  - flat_pricing      # All tenants pay the same; no tiers
  - tiered_pricing    # Free / Pro / Business / Enterprise tiers
  - usage_based       # Pay per usage (API calls, seats, storage)
  - hybrid            # Flat subscription + usage overages
  - custom            # Enterprise custom contracts
```

**Why it matters:**
- `tiered_pricing` → requires `subscription_plans` table + feature gates per tier
- `usage_based` → requires usage metering infrastructure; counters per tenant
- `hybrid` → requires both subscription AND metering
- All paid models → billing integration required (Stripe, Paddle, etc.)

---

#### Q3.8 — Number of Expected Tenants at Launch
```
Field:      tenantsAtLaunch
Type:       enum
Required:   CONDITIONAL (required when isMultiTenant = true)
Options:
  - under_10          # Pilot; known customers
  - 10_to_100         # Early access; manual provisioning feasible
  - 100_to_1k         # Growth stage; automation required
  - 1k_to_10k         # Scale stage; ops tooling required
  - over_10k          # Hyper-scale; full automation + monitoring required
```

---

#### Q3.9 — Number of Expected Tenants at 12 Months
```
Field:      tenantsAt12Months
Type:       enum
Required:   CONDITIONAL (required when isMultiTenant = true)
Options:    (same as Q3.8)
```

---

#### Q3.10 — Tenant Data Deletion Model
```
Field:      tenantDataDeletion
Type:       enum
Required:   CONDITIONAL (required when isMultiTenant = true)
Options:
  - soft_delete       # tenant marked deleted; data retained per retention policy
  - hard_delete       # all tenant data permanently removed on cancellation
  - grace_period      # soft delete + X-day grace period before hard delete
  - export_then_delete # data export provided before deletion; then hard delete
  - archive           # data archived to cold storage; not deleted
```

**Why it matters:** GDPR Article 17 "Right to Erasure" requires the ability to permanently
delete all personal data on request. This must be built into the tenant deletion workflow.
`soft_delete` alone is NOT GDPR-compliant if a tenant requests erasure. The schema must
support both soft-delete (for operational recovery) and hard-delete (for legal compliance).

---

#### Q3.11 — Tenant Admin Capabilities
```
Field:      tenantAdminCapabilities
Type:       enum[]
Required:   CONDITIONAL (required when isMultiTenant = true)
Multi:      true
Options:
  - user_management       # Invite/remove users within tenant
  - role_assignment       # Assign roles to users
  - role_creation         # Create custom roles (advanced)
  - billing_management    # View/update billing info
  - api_key_management    # Generate/revoke API keys
  - audit_log_access      # View audit logs for their tenant
  - data_export           # Export tenant data
  - sso_configuration     # Configure SSO for their organization
  - webhook_management    # Configure outbound webhooks
  - feature_control       # Toggle feature flags
  - subdomain_management  # Change their subdomain
```

---

#### Q3.12 — Tenant Data Residency Requirements
```
Field:      tenantDataResidency
Type:       enum
Required:   CONDITIONAL (required when isMultiTenant = true)
Options:
  - no_requirement        # Data can be stored anywhere
  - tenant_chooses        # Tenant selects their region at onboarding
  - eu_only               # All tenant data must stay in EU
  - us_only               # All tenant data must stay in US
  - regional_routing      # Data routes to tenant's nearest region
```

**Why it matters:** Data residency requirements fundamentally change deployment topology.
`regional_routing` may require multi-region databases, which is complex and expensive.
This is a Critical tension if paired with a bootstrap budget.

---

### Section 4 — Access Control Model

Access control is the second most consequential architectural decision after multi-tenancy.
The wrong model costs 3–6 months of rework at scale. Answer every sub-section that applies.

---

#### Q4.1 — Primary Access Control Model
```
Field:      accessControlModel
Type:       enum
Required:   YES
Options:
  - none              # No access control; all authenticated users have full access
  - rbac              # Role-Based Access Control
  - abac              # Attribute-Based Access Control
  - pbac              # Policy-Based Access Control
  - rbac_with_abac    # RBAC as primary; ABAC for fine-grained overrides
  - ownership_based   # Resource owner has full access; no roles needed
  - acl               # Access Control Lists per resource
```

**Decision guidance:**

| Model | Complexity | Flexibility | Performance | Use When |
|---|---|---|---|---|
| none | None | None | Best | Internal tools with 1 user type |
| ownership_based | Low | Low | Good | Personal apps; each user owns their data |
| rbac | Medium | Medium | Good | Business apps with defined roles |
| abac | High | Very High | Moderate | Fine-grained rules involving context |
| pbac | Very High | Maximum | Slower | Enterprise; compliance-driven; auditable |
| rbac_with_abac | High | High | Moderate | Most enterprise SaaS products |
| acl | Medium | High | Moderate | File systems; document sharing |

**Warning:** Do not select `abac` or `pbac` for bootstrap budgets or < 8-week timelines.
These models require dedicated engineering time to implement correctly.

---

## 4A — RBAC (Role-Based Access Control)

*Complete this section if `accessControlModel` is `rbac` or `rbac_with_abac`.*

---

#### Q4A.1 — List All Roles
```
Field:      roles
Type:       object[]
Required:   CONDITIONAL (required when accessControlModel IN [rbac, rbac_with_abac])
Each role:
  name:         string    (required)
  description:  string    (required)
  scope:        enum      (platform | tenant | resource)
  isDefault:    boolean   (assigned automatically on user creation)
  isSuperAdmin: boolean   (bypasses all permission checks)
```

**Instructions:** List every distinct role in your system. Be exhaustive. Missing a role
here means missing a permission check in the code, which is a security vulnerability.

**Example (B2B SaaS with 5 roles):**
```yaml
roles:
  - name: super_admin
    description: "Platform operator; full access to all tenants and system config"
    scope: platform
    isDefault: false
    isSuperAdmin: true

  - name: tenant_admin
    description: "Manages a single tenant; full access within their org"
    scope: tenant
    isDefault: false
    isSuperAdmin: false

  - name: tenant_member
    description: "Standard team member; can read and create; cannot delete or manage users"
    scope: tenant
    isDefault: true
    isSuperAdmin: false

  - name: billing_manager
    description: "Can manage billing and subscription; cannot access product features"
    scope: tenant
    isDefault: false
    isSuperAdmin: false

  - name: viewer
    description: "Read-only access to all resources within their tenant"
    scope: tenant
    isDefault: false
    isSuperAdmin: false
```

---

#### Q4A.2 — Role Hierarchy Model
```
Field:      roleHierarchy
Type:       enum
Required:   CONDITIONAL (required when accessControlModel IN [rbac, rbac_with_abac])
Options:
  - flat              # No hierarchy; roles are independent
  - strict_hierarchy  # Roles inherit all permissions of lower roles
  - partial_hierarchy # Some roles inherit from others; not a strict chain
  - group_based       # Roles grouped into categories with shared permissions
```

**Why it matters:**
- `flat` → simple; `roles` table + `user_roles` junction; no inheritance logic
- `strict_hierarchy` → requires ordered role ranking; inheritance computed at check time
- `partial_hierarchy` → requires a `role_parents` adjacency table; graph traversal at check time
- `group_based` → requires `role_groups` table; group membership determines permission set

**Performance implication:** `partial_hierarchy` and `group_based` can cause N+1 queries on
permission checks if not cached. Redis-based permission cache is recommended for > 10k DAU.

---

#### Q4A.3 — Permission Granularity
```
Field:      permissionGranularity
Type:       enum
Required:   CONDITIONAL (required when accessControlModel IN [rbac, rbac_with_abac])
Options:
  - resource_level    # Permissions per resource type (e.g., "can access projects")
  - action_level      # Permissions per action per resource (e.g., "can create projects")
  - field_level       # Permissions per field per action per resource (most granular)
```

**Recommendation by role count:**
- 1–3 roles → `resource_level` sufficient
- 4–10 roles → `action_level` appropriate
- 10+ roles or dynamic roles → `action_level` with potential `field_level` exceptions

**Schema impact:**
- `resource_level` → `permissions` table with resource name + role_id
- `action_level` → `permissions` table with resource + action (CRUD) + role_id
- `field_level` → `permissions` table + `field_restrictions` table; very complex to maintain

---

#### Q4A.4 — List All Resources and Their Permitted Actions
```
Field:      resourcePermissions
Type:       object[]
Required:   CONDITIONAL (required when accessControlModel IN [rbac, rbac_with_abac])
Each resource:
  resourceName:   string      (e.g., "Project", "Invoice", "User")
  actions:        string[]    (e.g., ["create", "read", "update", "delete", "export"])
  ownershipRule:  string      (optional: e.g., "owner can always update")
```

**Instructions:** List every data entity that has access restrictions. For each entity,
list every action that needs permission control. Do not skip entities. A missing resource
means a missing permission check, which is a security hole.

**Example:**
```yaml
resourcePermissions:
  - resourceName: Project
    actions: [create, read, update, delete, archive, export, share]
    ownershipRule: "Creator always retains read + update unless explicitly revoked"

  - resourceName: Invoice
    actions: [create, read, update, delete, send, void, refund]
    ownershipRule: null

  - resourceName: User
    actions: [invite, read, update, deactivate, delete, assign_role]
    ownershipRule: "User can always update their own profile"

  - resourceName: Report
    actions: [create, read, schedule, export, delete]
    ownershipRule: null

  - resourceName: APIKey
    actions: [create, read, revoke]
    ownershipRule: "User can always manage their own API keys"
```

---

#### Q4A.5 — Role-Permission Matrix
```
Field:      rolePermissionMatrix
Type:       matrix (role x resource x action -> boolean)
Required:   CONDITIONAL (required when accessControlModel IN [rbac, rbac_with_abac])
```

**Instructions:** For every role defined in Q4A.1 and every resource+action pair defined
in Q4A.4, specify whether the role has that permission.

**Example (abbreviated):**

| Resource | Action | super_admin | tenant_admin | tenant_member | billing_manager | viewer |
|---|---|---|---|---|---|---|
| Project | create | Y | Y | Y | N | N |
| Project | read | Y | Y | Y | N | Y |
| Project | update | Y | Y | own only | N | N |
| Project | delete | Y | Y | N | N | N |
| Project | export | Y | Y | Y | N | Y |
| Invoice | create | Y | Y | N | Y | N |
| Invoice | read | Y | Y | N | Y | Y |
| Invoice | void | Y | Y | N | Y | N |
| User | invite | Y | Y | N | N | N |
| User | deactivate | Y | Y | N | N | N |
| User | assign_role | Y | Y | N | N | N |

**Note:** "own only" means the permission applies only to resources the user created or owns.
This requires an ownership check in addition to the role check.

---

#### Q4A.6 — Can Roles Be Created Dynamically?
```
Field:      dynamicRoles
Type:       boolean
Required:   CONDITIONAL (required when accessControlModel IN [rbac, rbac_with_abac])
Default:    false
```

**Why it matters:** If `true`:
- Roles cannot be hardcoded as enums in the application
- All permission checks must query the database (or a cache) at runtime
- The role management UI becomes a product feature that must be built
- The permission check function changes from a simple enum check to a DB query
- Role validation must prevent privilege escalation (a user cannot create a role with
  more permissions than their own)

---

#### Q4A.7 — Does Super Admin Bypass All Checks?
```
Field:      superAdminBypassesChecks
Type:       boolean
Required:   CONDITIONAL (required when any role has isSuperAdmin = true)
Default:    true
```

**Why it matters:** The standard behavior is `true` (super admins bypass everything).
However, some compliance frameworks (PCI-DSS, SOX) require that even super admins cannot
access certain data without approval. If your compliance framework requires this, set to
`false` and define the exceptions in `superAdminRestrictions`.

---

#### Q4A.8 — Are Roles Scoped Per Tenant?
```
Field:      rolesAreTenantScoped
Type:       boolean
Required:   CONDITIONAL (required when isMultiTenant = true AND accessControlModel IN [rbac, rbac_with_abac])
Default:    true
```

**Why it matters:** If `true`:
- A user can have different roles in different tenants (e.g., admin in Org A, viewer in Org B)
- The `user_roles` junction table must include `tenant_id`
- Every permission check must validate against the current tenant context
- Session token must carry the active tenant context

**Schema difference:**
```sql
-- rolesAreTenantScoped = false
user_roles (user_id, role_id)

-- rolesAreTenantScoped = true
user_roles (user_id, role_id, tenant_id)
-- + unique constraint on (user_id, role_id, tenant_id)
-- + index on (user_id, tenant_id) for fast lookups
```

---

#### Q4A.9 — Can a Single User Hold Multiple Roles Simultaneously?
```
Field:      multipleRolesPerUser
Type:       boolean
Required:   CONDITIONAL (required when accessControlModel IN [rbac, rbac_with_abac])
Default:    false
```

**Why it matters:** If `true`:
- User's effective permissions = union of all assigned roles' permissions
- The `user_roles` table becomes a proper junction table (many-to-many)
- Permission checks must aggregate across all of the user's roles
- UI must show combined effective permissions to admins for clarity

If `false`:
- The `user_roles` table has a unique constraint on `user_id` (one role per user)
- Simpler permission checks
- Consider using a `role` enum column on the `users` table directly

---

#### Q4A.10 — Does Role Assignment Require an Approval Workflow?
```
Field:      roleAssignmentRequiresApproval
Type:       boolean
Required:   CONDITIONAL (required when accessControlModel IN [rbac, rbac_with_abac])
Default:    false
```

**Why it matters:** If `true`:
- Need a `role_assignment_requests` table with status (pending/approved/rejected)
- Need a notification system for approval requests
- Need an approval UI for admins
- The role is not active until approved; need a "pending role" state
- Audit trail must record who approved each assignment and when

---

#### Q4A.11 — Is There a Resource Ownership Override?
```
Field:      ownershipOverride
Type:       boolean
Required:   CONDITIONAL (required when accessControlModel IN [rbac, rbac_with_abac])
Default:    false
```

**Why it matters:** If `true`, a user who "owns" a resource (e.g., created it) may have
different permissions than their role normally grants. For example: a `viewer` role user
who created a document can still edit and delete that document.

This requires:
- Every resource table must have a `created_by` (owner) column
- Permission checks become: `check_role_permission(user, resource, action) OR is_owner(user, resource)`
- The ownership rule must be defined per resource type (see Q4A.4 `ownershipRule`)

---

## 4B — ABAC (Attribute-Based Access Control)

*Complete this section if `accessControlModel` is `abac` or `rbac_with_abac`.*

---

#### Q4B.1 — What Attributes Are Used in Access Decisions?
```
Field:      abacAttributes
Type:       object[]
Required:   CONDITIONAL (required when accessControlModel IN [abac, rbac_with_abac])
Each attribute:
  name:       string    (attribute identifier)
  source:     enum      (user | resource | environment | request)
  type:       enum      (string | number | boolean | enum | date | set)
  example:    any       (example value)
```

**Attribute sources:**
- `user` — attribute of the user making the request (e.g., `user.department`, `user.clearance_level`)
- `resource` — attribute of the resource being accessed (e.g., `document.classification`)
- `environment` — contextual attribute (e.g., `time_of_day`, `ip_address`, `is_vpn`)
- `request` — attributes of the request itself (e.g., `request.method`, `request.origin`)

**Example:**
```yaml
abacAttributes:
  - name: user.department
    source: user
    type: enum
    example: "engineering"

  - name: user.clearance_level
    source: user
    type: number
    example: 3

  - name: document.classification
    source: resource
    type: enum
    example: "confidential"

  - name: document.owner_department
    source: resource
    type: string
    example: "legal"

  - name: environment.is_vpn
    source: environment
    type: boolean
    example: true

  - name: environment.business_hours
    source: environment
    type: boolean
    example: true
```

---

#### Q4B.2 — List All Access Policies
```
Field:      abacPolicies
Type:       object[]
Required:   CONDITIONAL (required when accessControlModel IN [abac, rbac_with_abac])
Each policy:
  id:           string    (unique policy identifier)
  description:  string    (human-readable description)
  effect:       enum      (allow | deny)
  condition:    string    (boolean expression using attribute names)
  priority:     number    (lower = higher priority; deny policies typically priority 1)
```

**Example:**
```yaml
abacPolicies:
  - id: POL-001
    description: "Users can only read documents in their own department"
    effect: allow
    condition: "user.department === document.owner_department AND action === 'read'"
    priority: 10

  - id: POL-002
    description: "Users with clearance_level >= 3 can read confidential documents"
    effect: allow
    condition: "user.clearance_level >= 3 AND document.classification === 'confidential'"
    priority: 10

  - id: POL-003
    description: "Never allow access to classified documents outside business hours"
    effect: deny
    condition: "document.classification === 'classified' AND environment.business_hours === false"
    priority: 1

  - id: POL-004
    description: "Deny all access from non-VPN connections for sensitive resources"
    effect: deny
    condition: "document.classification IN ['confidential', 'classified'] AND environment.is_vpn === false"
    priority: 1
```

---

#### Q4B.3 — Policy Conflict Resolution Strategy
```
Field:      abacConflictResolution
Type:       enum
Required:   CONDITIONAL (required when accessControlModel IN [abac, rbac_with_abac])
Options:
  - deny_overrides    # Any matching deny policy overrides all allow policies
  - allow_overrides   # Any matching allow policy overrides all deny policies
  - priority_based    # Policy with lowest priority number wins
  - first_applicable  # First matching policy (by priority order) is final decision
```

**Recommendation:** For security-sensitive applications, always use `deny_overrides`.
`allow_overrides` should only be used in very specific scenarios where false denials are
more dangerous than false allows.

---

#### Q4B.4 — Are ABAC Policies Static or Customer-Managed?
```
Field:      abacPolicyManagement
Type:       enum
Required:   CONDITIONAL (required when accessControlModel IN [abac, rbac_with_abac])
Options:
  - static_developer  # Policies written in code; only developers can change them
  - static_config     # Policies in config files; operators can change without deploy
  - admin_managed     # Platform admins can create/modify policies via UI
  - tenant_managed    # Each tenant can create/modify their own policies
  - customer_managed  # Customers write policies in a policy language (DSL)
```

---

## 4C — Policy-Based Access Control

*Complete this section if `accessControlModel` is `pbac`.*

---

#### Q4C.1 — Policy Language / Engine
```
Field:      policyEngine
Type:       enum
Required:   CONDITIONAL (required when accessControlModel = pbac)
Options:
  - custom_dsl        # Build a custom domain-specific policy language
  - opa_rego          # Open Policy Agent with Rego language
  - cedar             # Amazon Cedar policy language
  - casbin            # Casbin policy framework with PERM model
  - spice_db          # SpiceDB / Zanzibar-style relationship-based access
  - cerbos            # Cerbos policy-as-code engine
```

**Decision guidance:**

| Engine | Learning Curve | Performance | Multi-Tenant | Compliance | Use When |
|---|---|---|---|---|---|
| custom_dsl | Very High | Custom | Manual | Manual | Only if others are insufficient |
| opa_rego | High | Good | Manual | Good | General enterprise policy |
| cedar | Medium | Very Good | Good | Good | AWS ecosystem; fine-grained |
| casbin | Medium | Good | Good | Good | Go/Node.js; PERM model |
| spice_db | High | Excellent | Excellent | Good | Google-scale; relationship-based |
| cerbos | Low | Good | Good | Good | Node.js friendly; easiest integration |

**Recommendation for Next.js:** `cerbos` or `casbin` are the most production-ready
options for Next.js applications. SpiceDB is overkill unless you have Google-scale
relationship complexity.

---

#### Q4C.2 — Are Policies Auditable?
```
Field:      policiesAuditable
Type:       boolean
Required:   CONDITIONAL (required when accessControlModel = pbac)
Default:    true
```

**Why it matters:** If `true`, every policy evaluation must be logged with:
- The policy that was evaluated
- The input attributes
- The decision (allow/deny)
- The timestamp
- The user and resource involved

This is required for SOX, HIPAA, and most financial compliance frameworks. It generates
significant log volume (every request creates an audit log entry for every policy check).
Plan storage accordingly.

---

#### Q4C.3 — Can Policies Reference External Data Sources?
```
Field:      policiesUseExternalData
Type:       boolean
Required:   CONDITIONAL (required when accessControlModel = pbac)
Default:    false
```

**Why it matters:** If `true`, policies may need to query external sources (e.g., check
if a user's subscription is active, check a user's org chart position, check a resource's
classification from an external system). This adds latency to every permission check
and requires caching strategies for external data.

---

### Section 5 — Data Requirements

Database schema design depends entirely on the answers in this section. Do not rush
through it. Every answer changes a table, an index, or a constraint.

---

#### Q5.1 — Core Data Entities
```
Field:      coreEntities
Type:       object[]
Required:   YES
Each entity:
  name:               string    (entity name, e.g., "User", "Project", "Invoice")
  description:        string    (what this entity represents)
  estimatedRows:      enum      (under_1k | 1k_10k | 10k_100k | 100k_1m | over_1m)
  writeFrequency:     enum      (rare | occasional | frequent | very_frequent | stream)
  readFrequency:      enum      (rare | occasional | frequent | very_frequent | burst)
  relationships:      string[]  (list of other entities this relates to)
  requiresAudit:      boolean   (must every change be logged?)
  requiresSoftDelete: boolean   (should deleted records be retained?)
```

**Instructions:** List every major data entity in your domain. Be thorough. A missing
entity here means a missing table in the initial schema, which always causes a migration.

**Example:**
```yaml
coreEntities:
  - name: User
    description: "A person who has an account in the system"
    estimatedRows: 10k_100k
    writeFrequency: occasional
    readFrequency: very_frequent
    relationships: [Organization, Role, Project, AuditLog]
    requiresAudit: true
    requiresSoftDelete: true

  - name: Organization
    description: "A tenant/company account"
    estimatedRows: 1k_10k
    writeFrequency: rare
    readFrequency: frequent
    relationships: [User, Subscription, Feature]
    requiresAudit: true
    requiresSoftDelete: true

  - name: Project
    description: "A workspace where users collaborate on tasks"
    estimatedRows: 100k_1m
    writeFrequency: frequent
    readFrequency: very_frequent
    relationships: [User, Organization, Task, Comment, File]
    requiresAudit: true
    requiresSoftDelete: true

  - name: Task
    description: "An individual work item within a project"
    estimatedRows: over_1m
    writeFrequency: very_frequent
    readFrequency: very_frequent
    relationships: [Project, User, Comment, Attachment, Label]
    requiresAudit: false
    requiresSoftDelete: true
```

---

#### Q5.2 — Write-Heavy vs. Read-Heavy
```
Field:      workloadProfile
Type:       enum
Required:   YES
Options:
  - read_heavy        # Reads >> writes (> 10:1 ratio)
  - write_heavy       # Writes >> reads (> 5:1 ratio)
  - balanced          # Roughly equal reads and writes
  - bursty_reads      # Normally balanced but burst reads (e.g., viral traffic)
  - bursty_writes     # Normally balanced but burst writes (e.g., batch processing)
  - streaming         # Continuous high-volume writes (IoT, event stream)
```

**Architecture impact:**
- `read_heavy` → read replicas valuable; aggressive caching; denormalized views
- `write_heavy` → write-optimized DB config; careful indexing; event sourcing consideration
- `bursty_reads` → CDN + cache layers critical; DB must handle 10-100x normal load
- `bursty_writes` → queue-backed writes; write buffer patterns; rate limiting
- `streaming` → time-series DB or append-only tables; consider ClickHouse or TimescaleDB

---

#### Q5.3 — Soft Delete Required?
```
Field:      softDeleteRequired
Type:       boolean
Required:   YES
Default:    true
```

**Why it matters:** Soft delete (adding `deleted_at TIMESTAMPTZ` column instead of
removing rows) affects every query in the application. Every `SELECT` must include
`WHERE deleted_at IS NULL`. Prisma middleware can handle this automatically, but it must
be configured from day one.

Soft delete is required if:
- You need an "undo" / restore feature
- You need to keep data for billing purposes after cancellation
- Your compliance framework requires data retention before deletion
- You need to reference deleted records from audit logs

---

#### Q5.4 — Global Audit Trail Required?
```
Field:      globalAuditTrail
Type:       boolean
Required:   YES
Default:    false
```

**Why it matters:** If `true`, every INSERT, UPDATE, and DELETE on audited tables
must be recorded in an audit log with:
- Table name
- Record ID
- Change type (create/update/delete)
- Before snapshot (previous values)
- After snapshot (new values)
- User who made the change
- Timestamp
- IP address / request ID (optional but recommended)

Implementation options:
- Prisma middleware (captures at ORM level; misses direct DB operations)
- PostgreSQL triggers (captures at DB level; always runs; more reliable)
- Application-level audit service (most flexible; risk of missing some operations)

---

#### Q5.5 — Data Retention Policy
```
Field:      dataRetentionPolicy
Type:       object
Required:   YES
Structure:
  defaultRetentionDays:   number    (0 = forever; -1 = delete immediately on soft-delete)
  retentionByEntity:      object[]  (per-entity overrides)
    - entityName: string
      retentionDays: number
  auditLogRetentionDays:  number    (typically 365 for compliance, 90 for non-compliance)
  backupRetentionDays:    number    (how long to keep database backups)
```

**Example:**
```yaml
dataRetentionPolicy:
  defaultRetentionDays: 365
  retentionByEntity:
    - entityName: AuditLog
      retentionDays: 2555    # 7 years (SOX/financial compliance)
    - entityName: Invoice
      retentionDays: 2555    # 7 years (tax compliance)
    - entityName: UserActivity
      retentionDays: 90      # 3 months (GDPR minimization)
    - entityName: Session
      retentionDays: 30
  auditLogRetentionDays: 2555
  backupRetentionDays: 30
```

---

#### Q5.6 — Search Requirements
```
Field:      searchRequirements
Type:       enum
Required:   YES
Options:
  - none              # No search; use filtering only
  - basic_filter      # WHERE clause filtering; no full-text needed
  - full_text_search  # Full-text search on specific fields (PostgreSQL FTS sufficient)
  - fuzzy_search      # Typo-tolerant search (requires dedicated search engine)
  - faceted_search    # Filter by multiple facets simultaneously (Algolia / Elasticsearch)
  - semantic_search   # AI-powered meaning-based search (vector embeddings required)
  - hybrid            # Full-text + semantic combined
```

**Architecture impact:**
- `basic_filter` → PostgreSQL indexes only; no additional infrastructure
- `full_text_search` → PostgreSQL `tsvector` + GIN index; no additional service
- `fuzzy_search` → Algolia, Typesense, or Meilisearch; additional cost and infrastructure
- `faceted_search` → Elasticsearch or Algolia; requires data sync pipeline
- `semantic_search` → Vector DB (pgvector extension, Pinecone, Weaviate); AI embeddings pipeline
- `hybrid` → Most complex; requires both text and vector infrastructure

---

#### Q5.7 — Analytical / Reporting Queries Required?
```
Field:      analyticsRequired
Type:       boolean
Required:   YES
Default:    false
```

**Why it matters:** If `true`, complex aggregation queries (GROUP BY, window functions,
multi-table JOINs) will run on the primary database. This creates a performance risk.
Options:
- Acceptable for < 10k users: run analytics on primary DB with proper indexing
- Required for > 10k users: separate read replica for analytics queries
- Required for > 100k users or complex dashboards: dedicated OLAP database (ClickHouse,
  BigQuery, Snowflake) with ETL/CDC pipeline from primary DB

---

#### Q5.8 — Isolation Per Tenant (Database Level)
```
Field:      dbIsolationPerTenant
Type:       enum
Required:   CONDITIONAL (required when isMultiTenant = true)
Options:
  - row_level_security  # PostgreSQL RLS policies; most common for shared_schema
  - application_level   # tenant_id WHERE clause enforced by application code
  - schema_level        # Separate PostgreSQL schema per tenant
  - database_level      # Separate database per tenant
```

**Critical security note:** `application_level` isolation relies entirely on every query
including `WHERE tenant_id = $currentTenant`. A single missed WHERE clause is a data leak.
`row_level_security` (PostgreSQL RLS) enforces isolation at the database engine level and
cannot be bypassed by application code bugs. For any compliance-sensitive application,
`row_level_security` is strongly recommended over `application_level`.

---

#### Q5.9 — Expected Data Volume at 12 Months
```
Field:      dataVolumeAt12Months
Type:       enum
Required:   YES
Options:
  - under_1gb         # Small application; SQLite could handle this
  - 1gb_to_10gb       # Small-medium; standard PostgreSQL
  - 10gb_to_100gb     # Medium; PostgreSQL with good indexing
  - 100gb_to_1tb      # Large; requires careful query optimization + partitioning
  - 1tb_to_10tb       # Very large; partitioning + archival strategy required
  - over_10tb         # Hyper-scale; sharding or distributed DB consideration
```

---

#### Q5.10 — Database Backup Strategy
```
Field:      backupStrategy
Type:       enum
Required:   YES
Options:
  - managed_automatic # Cloud provider handles automated backups (e.g., Neon, PlanetScale)
  - pgdump_scheduled  # Scheduled pg_dump to S3 or equivalent
  - wal_streaming     # WAL-based continuous backup (point-in-time recovery)
  - multi_region      # Backup replicated across regions
```

**Recommendation:** For any production application with real users, `wal_streaming` (PITR)
is the minimum acceptable backup strategy. `pgdump_scheduled` risks data loss between
dump cycles. Managed databases like Neon or Supabase provide PITR by default.

---

### Section 6 — Real-Time Requirements

---

#### Q6.1 — Does the App Require Real-Time Features?
```
Field:      requiresRealTime
Type:       boolean
Required:   YES
Default:    false
```

If `false`, skip to Section 7.

---

#### Q6.2 — Real-Time Feature Types
```
Field:      realTimeFeatures
Type:       enum[]
Required:   CONDITIONAL (required when requiresRealTime = true)
Multi:      true
Options:
  - live_notifications      # "You have a new message" — push notification
  - live_feed               # Activity feed updates in real-time
  - collaborative_editing   # Multiple users editing the same document simultaneously
  - live_cursors            # See where other users are in real-time
  - live_comments           # Comments appear without page refresh
  - live_dashboard          # Dashboard metrics update automatically
  - live_chat               # Real-time messaging between users
  - presence_indicators     # "3 people are viewing this" — online status
  - live_form_validation    # Server-side validation as user types
  - event_streaming         # Subscribe to a stream of domain events
  - live_map                # Real-time location updates on a map
  - live_video              # Real-time video streaming (WebRTC)
```

---

#### Q6.3 — Real-Time Transport Protocol
```
Field:      realTimeProtocol
Type:       enum
Required:   CONDITIONAL (required when requiresRealTime = true)
Options:
  - websockets        # Persistent bi-directional connection; best for chat, collab
  - server_sent_events # Server-to-client only; simpler; good for notifications, feeds
  - polling           # Client polls at interval; simplest; least efficient
  - long_polling      # Client holds connection open; middle ground
  - webrtc            # Peer-to-peer; video/audio; most complex
```

**Decision guidance:**

| Feature Type | Recommended Protocol |
|---|---|
| live_notifications | server_sent_events or websockets |
| live_feed | server_sent_events |
| collaborative_editing | websockets (with CRDT library) |
| live_cursors | websockets |
| live_comments | server_sent_events or websockets |
| live_dashboard | server_sent_events |
| live_chat | websockets |
| presence_indicators | websockets |
| live_video | webrtc |

**Infrastructure impact:**
- WebSockets require sticky sessions or a pub/sub layer (Redis) when running multiple instances
- Next.js Serverless functions do NOT support WebSocket connections natively
- For WebSockets with Next.js, a separate WebSocket server (or Ably, Pusher, PartyKit) is required

---

#### Q6.4 — Real-Time Scale
```
Field:      realTimeScale
Type:       enum
Required:   CONDITIONAL (required when requiresRealTime = true)
Options:
  - under_100_concurrent    # Small; in-process event emitter sufficient
  - 100_to_1k_concurrent    # Moderate; Redis pub/sub recommended
  - 1k_to_10k_concurrent    # High; dedicated WebSocket service needed
  - over_10k_concurrent     # Very high; managed service (Ably, Pusher) recommended
```

---

#### Q6.5 — Real-Time Delivery Guarantee
```
Field:      realTimeDeliveryGuarantee
Type:       enum
Required:   CONDITIONAL (required when requiresRealTime = true)
Options:
  - best_effort           # Messages may be lost if client disconnects; acceptable
  - at_least_once         # Messages will eventually be delivered; duplicates possible
  - exactly_once          # Messages delivered exactly once; no duplicates; complex
```

---

### Section 7 — Background Jobs

---

#### Q7.1 — Does the App Require Background Jobs?
```
Field:      requiresBackgroundJobs
Type:       boolean
Required:   YES
Default:    false
```

If `false`, skip to Section 8.

---

#### Q7.2 — Background Job Types
```
Field:      backgroundJobTypes
Type:       enum[]
Required:   CONDITIONAL (required when requiresBackgroundJobs = true)
Multi:      true
Options:
  - scheduled_cron        # Run on a schedule (e.g., "every day at midnight")
  - triggered_async       # Triggered by user action; runs asynchronously
  - event_driven          # Triggered by a domain event (e.g., "user signed up")
  - batch_processing      # Process large data sets in bulk
  - data_sync             # Sync data between systems
  - report_generation     # Generate reports in background
  - email_sending         # Send transactional emails
  - notification_delivery # Deliver push notifications
  - file_processing       # Process uploaded files (resize, convert, extract)
  - ai_inference          # Run AI model inference in background
  - webhook_delivery      # Deliver outbound webhooks
  - cleanup               # Periodic cleanup of old data
  - billing_calculation   # Calculate usage-based billing charges
```

---

#### Q7.3 — Job Queue Infrastructure Preference
```
Field:      jobQueuePreference
Type:       enum
Required:   CONDITIONAL (required when requiresBackgroundJobs = true)
Options:
  - inngest           # Serverless-native job queue; works with Vercel
  - bull_redis        # Bull/BullMQ with Redis; Node.js standard
  - pg_boss           # PostgreSQL-backed queue; no Redis needed
  - trigger_dev       # Trigger.dev; serverless job framework
  - temporal          # Temporal workflow engine; for complex workflows
  - aws_sqs           # AWS Simple Queue Service
  - vercel_cron       # Vercel built-in cron jobs (limited features)
  - no_preference     # Let the pipeline decide based on other constraints
```

**Decision logic (used by pipeline if `no_preference`):**
- Vercel deployment + serverless → `inngest` or `trigger_dev`
- Self-hosted + Redis available → `bull_redis`
- Self-hosted + no Redis → `pg_boss`
- Complex multi-step workflows → `temporal`
- AWS infrastructure → `aws_sqs`

---

#### Q7.4 — Job Retry Strategy
```
Field:      jobRetryStrategy
Type:       enum
Required:   CONDITIONAL (required when requiresBackgroundJobs = true)
Options:
  - no_retry          # Jobs run once; failure is permanent
  - fixed_retry       # Retry N times with fixed delay
  - exponential_backoff # Retry with exponentially increasing delay
  - custom            # Custom retry logic per job type
```

---

#### Q7.5 — Job Failure Handling
```
Field:      jobFailureHandling
Type:       enum[]
Required:   CONDITIONAL (required when requiresBackgroundJobs = true)
Multi:      true
Options:
  - dead_letter_queue     # Failed jobs moved to DLQ for manual inspection
  - email_alert           # Email sent to ops team on job failure
  - slack_alert           # Slack notification on failure
  - auto_retry            # Automatic retry per Q7.4 strategy
  - circuit_breaker       # Stop retrying if failure rate exceeds threshold
  - fallback_action       # Run alternative logic on permanent failure
  - dashboard_monitoring  # Failed jobs visible in ops dashboard
```

---

### Section 8 — Integrations

---

#### Q8.1 — Third-Party Service Integrations Required
```
Field:      integrations
Type:       enum[]
Required:   YES
Multi:      true
Options:
  - payment_processing    # Stripe, Paddle, Braintree
  - email_delivery        # SendGrid, Postmark, Resend, SES
  - sms_delivery          # Twilio, Vonage
  - push_notifications    # FCM, APNs, OneSignal
  - oauth_providers       # Google, GitHub, Slack, Microsoft SSO
  - saml_sso              # Enterprise SAML SSO
  - crm                   # Salesforce, HubSpot
  - analytics             # Mixpanel, Amplitude, PostHog
  - error_tracking        # Sentry, Datadog
  - logging               # Datadog, Logtail, Axiom
  - feature_flags         # LaunchDarkly, Flagsmith, Unleash
  - search                # Algolia, Typesense, Elasticsearch
  - maps                  # Google Maps, Mapbox
  - video                 # Mux, Cloudflare Stream
  - ai_llm                # OpenAI, Anthropic, Google Gemini
  - ai_embeddings         # OpenAI Embeddings, Cohere
  - vector_db             # Pinecone, Weaviate, pgvector
  - storage               # S3, Cloudflare R2, Vercel Blob
  - cdn                   # Cloudflare, Fastly, CloudFront
  - webhooks_inbound      # Receive webhooks from external systems
  - data_warehouse        # BigQuery, Snowflake, Redshift
  - calendar              # Google Calendar, Microsoft Calendar
  - communication         # Slack, Teams, Discord
  - none                  # No third-party integrations
```

---

#### Q8.2 — Inbound Webhook Sources
```
Field:      inboundWebhookSources
Type:       string[]
Required:   CONDITIONAL (required when integrations INCLUDES webhooks_inbound)
Example:    ["Stripe payment events", "GitHub repository events", "Twilio SMS status"]
```

**Why it matters:** Inbound webhooks require:
- A webhook endpoint per source
- Signature verification per source (HMAC-SHA256 is standard)
- Idempotency handling (webhooks are delivered at-least-once)
- A `webhook_events` log table to track received events
- Async processing (never process a webhook synchronously in the request handler)

---

#### Q8.3 — Payment Processing Detail
```
Field:      paymentDetail
Type:       object
Required:   CONDITIONAL (required when integrations INCLUDES payment_processing)
Structure:
  provider:           enum    (stripe | paddle | braintree | square | custom)
  billingModel:       enum    (one_time | subscription | usage_based | hybrid)
  currencies:         string[] (ISO 4217 codes, e.g., ["USD", "EUR", "GBP"])
  trialPeriodDays:    number  (0 = no trial)
  requiresInvoicing:  boolean (formal invoices for B2B billing)
  taxHandling:        enum    (none | stripe_tax | manual | third_party)
```

---

### Section 9 — File Storage

---

#### Q9.1 — Does the App Require File Uploads?
```
Field:      requiresFileStorage
Type:       boolean
Required:   YES
Default:    false
```

If `false`, skip to Section 10.

---

#### Q9.2 — File Types Accepted
```
Field:      acceptedFileTypes
Type:       enum[]
Required:   CONDITIONAL (required when requiresFileStorage = true)
Multi:      true
Options:
  - images            # PNG, JPEG, GIF, WebP, SVG
  - videos            # MP4, MOV, AVI, WebM
  - documents         # PDF, DOCX, XLSX, PPTX
  - audio             # MP3, WAV, AAC
  - data_files        # CSV, JSON, XML
  - code_files        # Source code files
  - archives          # ZIP, TAR, GZ
  - any               # Unrestricted file types
```

---

#### Q9.3 — Maximum File Size
```
Field:      maxFileSizeMB
Type:       number
Required:   CONDITIONAL (required when requiresFileStorage = true)
Min:        1
Max:        10000
Default:    10
```

---

#### Q9.4 — File Processing Required?
```
Field:      fileProcessing
Type:       enum[]
Required:   CONDITIONAL (required when requiresFileStorage = true)
Multi:      true
Options:
  - image_resize          # Generate thumbnails, resize to multiple dimensions
  - image_optimization    # Compress images for web delivery
  - video_transcoding     # Convert video to multiple resolutions/formats
  - pdf_generation        # Generate PDFs from HTML/data
  - pdf_extraction        # Extract text/data from uploaded PDFs
  - virus_scanning        # Scan uploads for malware
  - content_moderation    # AI-powered inappropriate content detection
  - ocr                   # Extract text from images/scanned documents
  - metadata_extraction   # Extract EXIF, duration, dimensions, etc.
  - none                  # Store files as-is; no processing
```

---

#### Q9.5 — File Access Model
```
Field:      fileAccessModel
Type:       enum
Required:   CONDITIONAL (required when requiresFileStorage = true)
Options:
  - public            # All files publicly accessible via URL (no auth needed)
  - private_signed    # Private storage; access via time-limited signed URLs
  - private_proxied   # Private storage; all access proxied through API with auth check
  - mixed             # Some files public (avatars), some private (documents)
```

**Security note:** Never use `public` for files containing personal data, financial records,
or any sensitive content. `private_signed` is the recommended default for most applications.
`private_proxied` offers more control but adds latency and server load.

---

### Section 10 — AI / ML Requirements

---

#### Q10.1 — Does the App Use AI/ML?
```
Field:      requiresAI
Type:       boolean
Required:   YES
Default:    false
```

If `false`, skip to Section 11.

---

#### Q10.2 — AI Feature Types
```
Field:      aiFeatures
Type:       enum[]
Required:   CONDITIONAL (required when requiresAI = true)
Multi:      true
Options:
  - text_generation       # Generate text using LLM
  - code_generation       # Generate code using LLM
  - image_generation      # Generate images (DALL-E, Stable Diffusion, Flux)
  - text_to_speech        # Convert text to audio
  - speech_to_text        # Transcribe audio to text
  - document_analysis     # Analyze and extract from documents
  - sentiment_analysis    # Classify sentiment of text
  - classification        # Classify inputs into categories
  - recommendation        # Recommend items based on user behavior
  - semantic_search       # Meaning-based search using embeddings
  - rag_pipeline          # Retrieval-Augmented Generation for Q&A
  - fine_tuned_model      # Use a fine-tuned domain-specific model
  - agent_workflow        # AI agent that takes actions autonomously
  - data_extraction       # Extract structured data from unstructured inputs
```

---

#### Q10.3 — AI Provider Preference
```
Field:      aiProvider
Type:       enum[]
Required:   CONDITIONAL (required when requiresAI = true)
Multi:      true
Options:
  - openai            # OpenAI GPT-4, GPT-4o, DALL-E, Whisper, TTS
  - anthropic         # Claude 3.5 Sonnet, Claude 3 Haiku
  - google_gemini     # Gemini 1.5 Pro, Gemini Flash
  - mistral           # Mistral AI models
  - cohere            # Cohere Command, Embed
  - replicate         # Open-source models via API
  - aws_bedrock       # Multiple models via AWS
  - azure_openai      # OpenAI models via Azure (enterprise, data residency)
  - self_hosted       # Run models on own infrastructure (privacy-sensitive data)
  - no_preference     # Let pipeline decide based on requirements
```

---

#### Q10.4 — AI Data Privacy Requirements
```
Field:      aiDataPrivacy
Type:       enum
Required:   CONDITIONAL (required when requiresAI = true)
Options:
  - cloud_acceptable      # User data can be sent to cloud AI providers
  - opt_in_only           # Only send data when user explicitly opts in
  - anonymized_only       # Data must be anonymized before sending to AI
  - no_external_ai        # AI must run on-premise or self-hosted; no external APIs
```

**Compliance note:** For HIPAA-covered data, `azure_openai` with a BAA (Business Associate
Agreement) is often the only compliant option. For GDPR, ensure your AI provider processes
data within the EU or has adequate safeguards.

---

#### Q10.5 — AI Cost Ceiling
```
Field:      aiMonthlyCostCeiling
Type:       enum
Required:   CONDITIONAL (required when requiresAI = true)
Options:
  - under_100         # Very limited AI usage; caching critical
  - 100_to_500        # Modest AI features; careful token management
  - 500_to_2k         # Moderate AI usage; cost monitoring required
  - 2k_to_10k         # Heavy AI usage; rate limiting + cost alerts needed
  - over_10k          # AI-core product; AI cost is primary infrastructure cost
```

---

### Section 11 — Performance Targets

---

#### Q11.1 — Page Load Time Target (First Contentful Paint)
```
Field:      targetFCP
Type:       enum
Required:   YES
Options:
  - under_1s          # Excellent; requires SSG or edge caching
  - 1s_to_2s          # Good; SSR with caching or SSG
  - 2s_to_3s          # Acceptable; standard SSR
  - over_3s           # Below average; acceptable only for internal tools
```

---

#### Q11.2 — API Response Time Target (p95)
```
Field:      targetApiP95
Type:       enum
Required:   YES
Options:
  - under_100ms       # High performance; requires caching + optimized queries
  - 100ms_to_300ms    # Good; standard well-optimized API
  - 300ms_to_1s       # Acceptable; some complex operations
  - over_1s           # Acceptable only for complex AI or batch operations
```

---

#### Q11.3 — Expected Requests Per Second (Peak)
```
Field:      peakRPS
Type:       enum
Required:   YES
Options:
  - under_10          # Very low; single instance more than sufficient
  - 10_to_100         # Low; single instance sufficient
  - 100_to_1k         # Moderate; horizontal scaling may be needed
  - 1k_to_10k         # High; horizontal scaling required
  - over_10k          # Very high; CDN + edge + auto-scaling required
```

---

#### Q11.4 — Acceptable Downtime Per Month
```
Field:      acceptableDowntimePerMonth
Type:       enum
Required:   YES
Options:
  - under_5min        # 99.99% uptime (4.3 min/month)
  - under_45min       # 99.9% uptime (43.8 min/month) — standard SLA
  - under_8hr         # 99% uptime (7.2 hr/month) — acceptable for internal tools
  - any               # No SLA; acceptable for development/staging
```

**Architecture impact:**
- `under_5min` → multi-region deployment; active-active redundancy; zero-downtime deploys
- `under_45min` → single region with health checks; blue-green deploys recommended
- `under_8hr` → single region; rolling deploys acceptable
- `any` → no HA requirements

---

### Section 12 — Availability & SLA

---

#### Q12.1 — Disaster Recovery Objective (RTO)
```
Field:      rto
Type:       enum
Required:   YES
Options:
  - under_15min       # Critical; requires hot standby
  - 15min_to_1hr      # Important; warm standby
  - 1hr_to_4hr        # Standard; cold standby with automation
  - 4hr_to_24hr       # Acceptable for non-critical tools
  - best_effort       # No formal RTO; restore when possible
```

RTO = Recovery Time Objective — how long before the system must be restored after an outage.

---

#### Q12.2 — Data Recovery Objective (RPO)
```
Field:      rpo
Type:       enum
Required:   YES
Options:
  - zero              # No data loss acceptable; synchronous replication required
  - under_5min        # Minimal loss; continuous WAL streaming required
  - under_1hr         # Low loss; hourly backups + WAL
  - under_24hr        # Standard; daily backups acceptable
  - best_effort       # No formal RPO
```

RPO = Recovery Point Objective — maximum acceptable data loss measured in time.

---

#### Q12.3 — Planned Maintenance Windows Acceptable?
```
Field:      maintenanceWindowsAcceptable
Type:       boolean
Required:   YES
Default:    false
```

**Why it matters:** If `false`, all schema migrations must be backward-compatible and
deployed with zero-downtime migration strategies (expand-and-contract pattern). This is
significantly more complex but required for 24/7 applications.

---

### Section 13 — Compliance & Security

---

#### Q13.1 — Compliance Frameworks Required
```
Field:      complianceFrameworks
Type:       enum[]
Required:   YES
Multi:      true
Options:
  - none              # No formal compliance requirements
  - gdpr              # EU General Data Protection Regulation
  - ccpa              # California Consumer Privacy Act
  - hipaa             # Health Insurance Portability and Accountability Act
  - pci_dss           # Payment Card Industry Data Security Standard
  - soc2_type1        # SOC 2 Type I audit
  - soc2_type2        # SOC 2 Type II audit (ongoing)
  - iso_27001         # ISO 27001 Information Security
  - fedramp           # Federal Risk and Authorization Management Program
  - sox               # Sarbanes-Oxley Act (financial reporting)
  - coppa             # Children's Online Privacy Protection Act
  - wcag_aa           # Web Content Accessibility Guidelines AA
  - wcag_aaa          # Web Content Accessibility Guidelines AAA
```

**Auto-inference rules:**
- `industry = fintech` → `pci_dss` added if not present
- `industry = healthtech` → `hipaa` added if not present
- `targetGeographies INCLUDES eu` → `gdpr` added if not present
- `targetGeographies INCLUDES us` + `industry = consumer` → `ccpa` flagged for review
- `industry = govtech` → `fedramp` flagged for review

---

#### Q13.2 — PII Data Collected
```
Field:      piiDataCollected
Type:       enum[]
Required:   YES
Multi:      true
Options:
  - name              # Full name
  - email             # Email address
  - phone             # Phone number
  - address           # Physical address
  - date_of_birth     # Date of birth
  - government_id     # SSN, passport number, driver's license
  - financial_data    # Bank accounts, credit cards, financial records
  - health_data       # Medical records, health conditions
  - biometric_data    # Fingerprints, face recognition, voice prints
  - location_data     # GPS location, IP-based location
  - behavioral_data   # Clickstream, usage patterns
  - communications    # Messages, emails, call logs
  - none              # No PII collected
```

---

#### Q13.3 — Data Encryption Requirements
```
Field:      encryptionRequirements
Type:       enum[]
Required:   YES
Multi:      true
Options:
  - encryption_at_rest        # Database and file storage encrypted at rest
  - encryption_in_transit     # TLS 1.2+ for all network communication
  - field_level_encryption    # Specific sensitive fields encrypted individually
  - end_to_end_encryption     # Data encrypted from sender to recipient
  - key_management_service    # External KMS (AWS KMS, Google KMS) for key management
  - tenant_managed_keys       # Enterprise tenants bring their own encryption keys
```

---

#### Q13.4 — Security Features Required
```
Field:      securityFeatures
Type:       enum[]
Required:   YES
Multi:      true
Options:
  - mfa                       # Multi-Factor Authentication
  - sso_saml                  # SAML 2.0 Enterprise SSO
  - sso_oidc                  # OpenID Connect SSO
  - api_key_auth              # API key authentication for programmatic access
  - ip_allowlist              # Restrict access to approved IP ranges
  - session_management        # Force logout, active session list, device management
  - password_policies         # Minimum length, complexity, rotation requirements
  - brute_force_protection    # Account lockout, rate limiting on auth
  - security_headers          # HSTS, CSP, X-Frame-Options, etc.
  - vulnerability_scanning    # Automated dependency vulnerability scanning
  - penetration_testing       # Third-party security assessment
  - bug_bounty                # Public or private bug bounty program
  - intrusion_detection       # Runtime threat detection
  - ddos_protection           # DDoS mitigation (Cloudflare, AWS Shield)
```

---

### Section 14 — Infrastructure Constraints

---

#### Q14.1 — Deployment Platform Preference
```
Field:      deploymentPlatform
Type:       enum
Required:   YES
Options:
  - vercel            # Vercel (Serverless-first; best DX for Next.js)
  - aws               # Amazon Web Services (full control; complex)
  - gcp               # Google Cloud Platform
  - azure             # Microsoft Azure (enterprise preferred)
  - railway           # Railway (simple; good for early-stage)
  - render            # Render (Heroku replacement; simple)
  - fly_io            # Fly.io (edge deployment; good for global)
  - self_hosted       # Own servers / bare metal / VPS
  - kubernetes        # Kubernetes cluster (any cloud or self-hosted)
  - no_preference     # Let pipeline decide
```

**Decision logic (used if `no_preference`):**
- Bootstrap budget → Railway or Render
- Next.js → Vercel (obvious default)
- Enterprise + compliance → AWS or Azure
- Global low-latency → Vercel Edge or Fly.io
- Maximum control → Kubernetes

---

#### Q14.2 — Managed Services Preference
```
Field:      managedServicesPreference
Type:       enum
Required:   YES
Options:
  - managed_only      # Use fully managed services; minimize ops burden
  - hybrid            # Mix of managed and self-hosted based on cost/control tradeoffs
  - self_hosted_preferred # Prefer self-hosted; accept ops burden
```

---

#### Q14.3 — Cold Start Tolerance
```
Field:      coldStartTolerance
Type:       enum
Required:   YES
Options:
  - zero              # No cold starts acceptable; always-warm required
  - under_500ms       # Brief cold starts acceptable
  - under_2s          # Moderate cold starts acceptable
  - any               # Cold starts acceptable
```

**Architecture impact:**
- `zero` → serverless functions must be warmed or replaced with always-on server
- `under_500ms` → edge runtime preferred for fast cold starts
- `under_2s` → standard serverless acceptable with optimization
- `any` → no constraints

---

#### Q14.4 — Containerization Required?
```
Field:      containerizationRequired
Type:       boolean
Required:   YES
Default:    false
```

---

#### Q14.5 — Expected Monthly Infrastructure Budget
```
Field:      monthlyInfrastructureBudget
Type:       enum
Required:   YES
Options:
  - under_50          # Bootstrap; free tiers + minimal paid services
  - 50_to_200         # Early stage; basic paid tiers
  - 200_to_500        # Growing; standard production setup
  - 500_to_2k         # Scale; multi-service production
  - 2k_to_10k         # Enterprise; full production + redundancy
  - over_10k          # Large enterprise; multi-region, compliance, HA
```

---

#### Q14.6 — Cloud Provider Restrictions
```
Field:      cloudProviderRestrictions
Type:       string[]
Required:   NO
Example:    ["Must use AWS (existing credits)", "Cannot use Chinese cloud providers"]
```

---

### Section 15 — Timeline & Budget

---

#### Q15.1 — Development Team Size
```
Field:      devTeamSize
Type:       enum
Required:   YES
Options:
  - solo              # 1 developer (founder, indie hacker)
  - small             # 2-4 developers
  - medium            # 5-10 developers
  - large             # 11-25 developers
  - enterprise        # 25+ developers
```

**Architecture impact:** Solo/small teams should always use Monolith or Modular Monolith.
Microservices require dedicated team ownership per service. A solo developer owning
10 microservices is not sustainable.

---

#### Q15.2 — MVP Feature Budget (Time)
```
Field:      mvpTimelineDays
Type:       integer
Required:   YES
Min:        7
Max:        730
Example:    60
```

---

#### Q15.3 — Total Funding Stage / Budget Category
```
Field:      fundingStage
Type:       enum
Required:   YES
Options:
  - bootstrapped      # Self-funded; every dollar counts
  - pre_seed          # < $500k raised
  - seed              # $500k - $2M raised
  - series_a          # $2M - $15M raised
  - series_b          # $15M - $50M raised
  - series_c_plus     # $50M+ raised
  - enterprise_budget # Internal enterprise project with dedicated IT budget
  - government        # Government/public sector funding
```

This is the second most important tension signal. Bootstrap + enterprise scale = Critical
tension. Seed + microservices = Warning tension. Series-A + monolith = acceptable but
modular monolith recommended.

---

#### Q15.4 — Priority Stack Rank
```
Field:      priorityRank
Type:       enum[]
Required:   YES
Multi:      true (ordered — put highest priority first)
Options:
  - speed_to_market   # Ship fast; cut scope if needed
  - scalability       # Architecture must handle 100x growth
  - security          # Security and compliance are non-negotiable
  - cost_efficiency   # Minimize infrastructure and operational costs
  - developer_experience # Optimize for developer productivity
  - user_experience   # Optimize for end-user performance and delight
  - maintainability   # Code quality and long-term maintainability first
```

**Example:** `["speed_to_market", "cost_efficiency", "scalability"]`

This directly influences architecture trade-offs. When a conflict arises, the pipeline
uses this priority stack to resolve it. First item always wins.

---


---

## PART 2 — Tech Stack Questionnaire (Next.js)

This section captures all technical decisions for the Next.js application. Every answer
feeds the TechStackDoc generated in Phase 2 of the pipeline. Nothing here is hardcoded.
All stack decisions are derived from the answers in Part 1 combined with your answers here.

---

### Section 16 — Rendering Strategy

Next.js supports multiple rendering strategies. Choosing the wrong one is a costly mistake.

---

#### Q16.1 — Primary Rendering Strategy
```
Field:      renderingStrategy
Type:       enum
Required:   YES
Options:
  - ssg               # Static Site Generation — all pages pre-rendered at build time
  - ssr               # Server-Side Rendering — pages rendered on each request
  - isr               # Incremental Static Regeneration — SSG with timed revalidation
  - csr               # Client-Side Rendering — data fetched in browser; no SSR
  - hybrid            # Mix of strategies per route (most production apps)
  - edge_ssr          # SSR at the edge (Vercel Edge Runtime; limited Node.js APIs)
```

**Decision guidance:**

| Content Type | Recommended Strategy |
|---|---|
| Marketing / landing pages | SSG or ISR |
| Blog / documentation | SSG or ISR |
| Dashboard (authenticated) | SSR or CSR |
| Product listings (public) | ISR |
| User-specific pages | SSR or CSR |
| Real-time data pages | CSR or SSR |
| Public APIs response display | SSR |

**Performance implications:**
- `ssg` → fastest TTFB; no server runtime needed; must rebuild on content change
- `ssr` → fresh data on every request; higher TTFB; requires server
- `isr` → compromise: stale-while-revalidate; good for most cases
- `csr` → slowest FCP (loading state); no SEO; good for authenticated dashboards
- `hybrid` → optimal but requires per-route strategy decisions in the codebase

---

#### Q16.2 — SEO Requirements
```
Field:      seoRequired
Type:       boolean
Required:   YES
Default:    false
```

**Why it matters:** If `true`:
- All public pages must use SSG or SSR (not CSR)
- Dynamic metadata (title, description, OG tags) must be server-rendered
- Sitemap generation must be automated
- Structured data (JSON-LD) may be required
- Core Web Vitals become a product requirement (not just a nice-to-have)

If `false` (e.g., authenticated dashboard apps), CSR is acceptable and SSG is not
required. This simplifies the rendering strategy significantly.

---

#### Q16.3 — Static Export Required?
```
Field:      staticExportRequired
Type:       boolean
Required:   YES
Default:    false
```

**Why it matters:** `next export` produces a fully static site that can be hosted on S3,
Cloudflare Pages, or any CDN without a Node.js server. This requires:
- No Server Components with dynamic data
- No API routes (these are server-side)
- No authentication that relies on middleware
- No ISR or SSR

If `true`, the architecture is significantly constrained. Only choose this for fully
static sites (documentation, marketing pages) where no server-side logic is needed.

---

#### Q16.4 — App Router vs Pages Router
```
Field:      nextjsRouterType
Type:       enum
Required:   YES
Options:
  - app_router        # Next.js 13+ App Router; React Server Components; recommended
  - pages_router      # Legacy Pages Router; well-understood; wider ecosystem support
  - mixed             # Both (migration scenario; use with caution)
```

**Recommendation:** For all new Next.js projects, use `app_router`. The App Router enables
React Server Components (RSC), which dramatically reduces client-side JavaScript and
improves performance. The Pages Router is being deprecated and should only be chosen if
migrating from an existing Pages Router codebase.

**Implications of `app_router`:**
- All components are Server Components by default; must opt-in to `"use client"` for
  client-side interactivity
- Data fetching happens in Server Components (not `getServerSideProps`)
- Layouts are persistent and don't re-render on navigation
- Streaming and Suspense are first-class features
- Slightly steeper learning curve than Pages Router

---

#### Q16.5 — React Server Components Usage Model
```
Field:      rscUsageModel
Type:       enum
Required:   CONDITIONAL (required when nextjsRouterType = app_router)
Options:
  - server_first      # Default to Server Components; use Client only for interactivity
  - client_heavy      # Most components are Client Components; RSC used selectively
  - balanced          # Deliberate mix based on data needs vs. interactivity needs
```

**Performance recommendation:** `server_first` is the recommended approach. Server
Components allow direct database access without exposing credentials to the client,
eliminate the need for redundant API calls for page data, and reduce bundle size.

---

#### Q16.6 — Middleware Requirements
```
Field:      middlewareRequirements
Type:       enum[]
Required:   YES
Multi:      true
Options:
  - auth_protection       # Redirect unauthenticated users to login
  - tenant_resolution     # Resolve tenant from subdomain or header
  - rate_limiting         # Rate limit requests per IP or user
  - geo_blocking          # Block requests from specific countries
  - ab_testing            # Route users to different variants
  - feature_flags         # Gate routes behind feature flags
  - logging               # Log all requests for observability
  - cors                  # Handle CORS headers for API routes
  - none                  # No middleware needed
```

**Performance note:** Next.js Middleware runs on the Edge Runtime (Cloudflare Workers-like
environment). It has a 1MB size limit and restricted Node.js APIs. Complex logic (DB
queries, heavy libraries) should NOT run in middleware. Keep middleware fast and light.

---

#### Q16.7 — Internationalization (i18n) Required?
```
Field:      i18nRequired
Type:       boolean
Required:   YES
Default:    false
```

**Why it matters:** If `true`:
- All user-facing strings must use a translation key system (next-intl, react-i18next)
- URL routing must support locale prefixes (`/en/dashboard`, `/fr/dashboard`)
- Date, number, and currency formatting must be locale-aware
- RTL (right-to-left) layout support may be needed for Arabic, Hebrew
- Translation management workflow must be established

---

#### Q16.8 — Dark Mode / Theming Required?
```
Field:      themingRequired
Type:       enum
Required:   YES
Options:
  - none              # Single theme; no dark mode
  - dark_mode         # Light and dark mode toggle
  - custom_theming    # User-selectable themes or brand customization
  - tenant_theming    # Each tenant has their own theme (multi-tenant only)
```

---

### Section 17 — API Layer Design

---

#### Q17.1 — API Architecture
```
Field:      apiArchitecture
Type:       enum
Required:   YES
Options:
  - rest              # RESTful JSON API (standard)
  - graphql           # GraphQL API (flexible; higher complexity)
  - trpc              # tRPC (end-to-end type safety; Next.js friendly)
  - rest_and_trpc     # REST for external; tRPC for internal (recommended pattern)
  - grpc              # gRPC (binary protocol; microservices; not browser-friendly)
  - none              # No API; Server Components handle all data access
```

**Decision guidance:**

| Use Case | Recommended API |
|---|---|
| Public API consumed by external clients | REST |
| Internal Next.js frontend only | tRPC or Server Components |
| Mobile app + web app sharing an API | REST |
| Complex relational data needs (over-fetching concern) | GraphQL |
| Type-safe full-stack TypeScript monorepo | tRPC |
| Microservices internal communication | gRPC |

**Warning:** GraphQL is high complexity for most applications. Only choose it if your
data access patterns genuinely benefit from client-specified queries (avoid over-fetching
across multiple client types). For most Next.js apps, REST or tRPC is sufficient.

---

#### Q17.2 — API Versioning Strategy
```
Field:      apiVersioningStrategy
Type:       enum
Required:   CONDITIONAL (required when apiArchitecture IN [rest, graphql, grpc])
Options:
  - url_versioning        # /api/v1/ prefix — most common; visible
  - header_versioning     # Accept-Version header — cleaner URLs; harder to test
  - query_param           # ?version=1 — simplest; not recommended for production
  - no_versioning         # No versioning; breaking changes via deprecation notices
  - content_negotiation   # Accept header (e.g., application/vnd.api.v2+json)
```

**Recommendation:** `url_versioning` is the pragmatic choice for most production APIs.
It's immediately visible, easy to test with curl/Postman, and easy to deploy (route
v1 and v2 to different handlers simultaneously during migration).

---

#### Q17.3 — API Authentication Method
```
Field:      apiAuthMethod
Type:       enum[]
Required:   YES
Multi:      true
Options:
  - session_cookie        # NextAuth.js session cookies (browser clients)
  - jwt_bearer            # JWT in Authorization header (mobile, API clients)
  - api_key               # Static API key (server-to-server, developer access)
  - oauth2_client_creds   # OAuth 2.0 Client Credentials (machine-to-machine)
  - mutual_tls            # mTLS certificate authentication (highest security)
  - none                  # No authentication (public API)
```

---

#### Q17.4 — Rate Limiting Strategy
```
Field:      rateLimitingStrategy
Type:       enum
Required:   YES
Options:
  - none                  # No rate limiting (internal tools; risk accepted)
  - ip_based              # Limit per IP address (basic protection)
  - user_based            # Limit per authenticated user
  - api_key_based         # Limit per API key (developer/partner APIs)
  - tenant_based          # Limit per tenant organization (multi-tenant)
  - tiered                # Different limits per subscription tier
  - adaptive              # Dynamic limits based on system load
```

---

#### Q17.5 — API Documentation
```
Field:      apiDocumentation
Type:       enum
Required:   CONDITIONAL (required when apiArchitecture IN [rest, graphql, grpc])
Options:
  - openapi_auto      # Auto-generate OpenAPI spec from code (e.g., Zod to OpenAPI)
  - openapi_manual    # Manually written OpenAPI/Swagger spec
  - graphql_introspection # GraphQL self-documenting via introspection
  - postman           # Postman collection
  - readme_only       # Basic README documentation
  - none              # No documentation (internal APIs only)
```

---

#### Q17.6 — Webhook Support (Outbound)?
```
Field:      outboundWebhooks
Type:       boolean
Required:   YES
Default:    false
```

**Why it matters:** If `true`, the platform can notify external systems of events.
Requires:
- `webhook_endpoints` table per customer
- `webhook_events` table (log of delivery attempts)
- Background job for delivery with retry + exponential backoff
- HMAC-SHA256 signature on every webhook payload
- Webhook testing/replay UI for developers
- Delivery failure alerting

---

#### Q17.7 — API Response Envelope Pattern
```
Field:      useResponseEnvelope
Type:       boolean
Required:   YES
Default:    true
```

**Recommended:** Always `true`. The envelope pattern wraps all API responses:
```json
{
  "ok": true,
  "data": { ... },
  "meta": { "requestId": "uuid", "timestamp": "iso8601" }
}
```
or for errors:
```json
{
  "ok": false,
  "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...] }
}
```

This provides consistent error handling across the entire API, simplifies client-side
error handling, and enables automatic retry logic based on error codes.

---

### Section 18 — Database & ORM Selection

---

#### Q18.1 — Primary Database Engine
```
Field:      primaryDatabase
Type:       enum
Required:   YES
Options:
  - postgresql        # PostgreSQL (recommended default for most applications)
  - mysql             # MySQL / MariaDB
  - sqlite            # SQLite (development only; not for production)
  - mongodb           # MongoDB (document store; schema flexibility)
  - planetscale       # PlanetScale (MySQL-compatible; serverless; branching)
  - turso             # Turso (SQLite at the edge; ultra-low latency)
  - supabase          # Supabase (PostgreSQL with BaaS features)
  - neon              # Neon (serverless PostgreSQL; best for Vercel)
  - cockroachdb       # CockroachDB (distributed SQL; global; expensive)
```

**Recommendation by deployment:**
- Vercel deployment → `neon` (native integration; serverless; scales to zero)
- Self-hosted → `postgresql` (standard; mature; full ecosystem)
- Edge deployment → `turso` (ultra-low latency at edge; limited SQL features)
- Multi-region global → `cockroachdb` or `neon` with multi-region
- Schema flexibility needed → `mongodb`

**Why not SQLite in production:** SQLite is single-writer; no concurrent writes; no
network access; not suitable for multi-server deployments.

---

#### Q18.2 — ORM / Query Builder
```
Field:      ormChoice
Type:       enum
Required:   YES
Options:
  - prisma            # Prisma ORM (TypeScript-first; recommended for Next.js)
  - drizzle           # Drizzle ORM (lightweight; TypeScript; close to SQL)
  - kysely            # Kysely (type-safe query builder; no code generation)
  - typeorm           # TypeORM (mature; decorators; heavier)
  - sequelize         # Sequelize (oldest; JavaScript-first; legacy)
  - raw_sql           # Raw SQL via pg/mysql2 driver (maximum control; no type safety)
  - supabase_client   # Supabase JavaScript client (BaaS pattern)
```

**Recommendation for Next.js:** `prisma` is the default recommendation.
- Auto-generates TypeScript types from schema
- Prisma Client is tree-shaken and optimized for serverless
- Prisma Migrate handles schema migrations
- Strong community; excellent documentation
- Works with Neon, Supabase, PlanetScale, standard PostgreSQL

`drizzle` is a strong alternative if you prefer SQL-first development and want less
abstraction. It's lighter than Prisma and faster in some benchmarks.

---

#### Q18.3 — Read Replica Required?
```
Field:      readReplicaRequired
Type:       boolean
Required:   YES
Default:    false
```

**When to use:**
- `usersAt12Months >= 100k_to_1m` → read replica strongly recommended
- `workloadProfile = read_heavy` → read replica recommended
- `analyticsRequired = true` → dedicated read replica for analytics queries
- `reportingRequired = true` → read replica to offload report queries

---

#### Q18.4 — Connection Pooling Configuration
```
Field:      connectionPooling
Type:       enum
Required:   YES
Options:
  - prisma_accelerate # Prisma Accelerate (managed; caching + pooling; Vercel-native)
  - pgbouncer         # PgBouncer (self-hosted; industry standard)
  - neon_pooler       # Neon built-in connection pooler (if using Neon)
  - supabase_pooler   # Supabase built-in pooler (if using Supabase)
  - none              # Direct connections (only acceptable for < 10 concurrent users)
```

**Why this matters:** Each serverless function invocation creates a new database
connection. Without pooling, a spike to 100 concurrent serverless functions creates
100 database connections simultaneously. PostgreSQL defaults to 100 max connections.
Without a pooler, your database crashes under moderate load.

**Rule:** If deploying to Vercel (serverless), connection pooling is MANDATORY.

---

#### Q18.5 — Database Migration Strategy
```
Field:      migrationStrategy
Type:       enum
Required:   YES
Options:
  - prisma_migrate        # Prisma Migrate (recommended; tracks migration history)
  - drizzle_kit           # Drizzle Kit migrations (if using Drizzle ORM)
  - flyway                # Flyway (Java ecosystem but works with any DB)
  - liquibase             # Liquibase (enterprise; XML/YAML migrations)
  - manual_sql            # Hand-written SQL migrations in version control
  - expand_contract       # Zero-downtime expansion then contraction pattern
```

**Zero-downtime migrations (expand-and-contract):**
When `maintenanceWindowsAcceptable = false`, all schema changes must follow:
1. EXPAND: Add new column/table (backward-compatible with old code)
2. MIGRATE: Dual-write to old + new; backfill data
3. CONTRACT: Remove old column/table once old code is fully deployed

This triples the complexity of every schema change and is required for 99.9%+ uptime.

---

#### Q18.6 — Data Seeding Strategy
```
Field:      seedingStrategy
Type:       enum
Required:   YES
Options:
  - prisma_seed       # Prisma seed script (package.json prisma.seed)
  - fixtures          # JSON/YAML fixture files loaded by seed script
  - factory_pattern   # Faker-based factories for development + test data
  - none              # Manual data creation; no automated seeding
```

---

#### Q18.7 — Multi-Database Support?
```
Field:      multiDatabaseSupport
Type:       boolean
Required:   YES
Default:    false
```

**Why it matters:** Some applications use multiple databases:
- Primary PostgreSQL + Redis (cache) + MongoDB (document store)
- Primary PostgreSQL + ClickHouse (analytics)
- Primary PostgreSQL + Elasticsearch (search)

If `true`, the architecture must include a data synchronization strategy between
databases and the application must handle multiple connection instances.

---

### Section 19 — Caching Strategy

---

#### Q19.1 — Cache Layer Required?
```
Field:      cacheLayerRequired
Type:       boolean
Required:   YES
Default:    false
```

**Auto-set to `true` if:**
- `usersAt12Months >= 10k_to_100k`
- `peakRPS >= 100_to_1k`
- `targetApiP95 = under_100ms`
- `requiresRealTime = true` (pub/sub via Redis)
- `workloadProfile = read_heavy`

---

#### Q19.2 — Cache Technology
```
Field:      cacheTechnology
Type:       enum
Required:   CONDITIONAL (required when cacheLayerRequired = true)
Options:
  - redis             # Redis (industry standard; versatile; pub/sub + caching)
  - upstash           # Upstash Redis (serverless Redis; REST API; Vercel-native)
  - memcached         # Memcached (simpler than Redis; caching only)
  - vercel_kv         # Vercel KV (Upstash-backed; tight Vercel integration)
  - cloudflare_kv     # Cloudflare KV (edge key-value store)
  - in_memory         # In-process LRU cache (single instance only; not distributed)
```

**Recommendation by deployment:**
- Vercel → `upstash` or `vercel_kv`
- Self-hosted → `redis`
- Edge/global → `cloudflare_kv`
- Low-concurrency single-server → `in_memory` (with Redis as future upgrade path)

---

#### Q19.3 — What Is Being Cached?
```
Field:      cacheTargets
Type:       enum[]
Required:   CONDITIONAL (required when cacheLayerRequired = true)
Multi:      true
Options:
  - database_queries      # Cache expensive or frequent DB query results
  - api_responses         # Cache full API response bodies
  - session_data          # Cache user session data
  - user_permissions      # Cache computed permission checks per user
  - rate_limit_counters   # Redis counters for rate limiting
  - feature_flags         # Cache feature flag evaluations
  - computed_aggregates   # Cache expensive computed values (counts, sums)
  - external_api          # Cache responses from third-party APIs
  - page_cache            # Cache rendered HTML pages (CDN or Redis)
  - pubsub_channels       # Redis pub/sub for real-time events
```

---

#### Q19.4 — Cache Invalidation Strategy
```
Field:      cacheInvalidationStrategy
Type:       enum
Required:   CONDITIONAL (required when cacheLayerRequired = true)
Options:
  - ttl_based         # Time-to-live expiry; simple; may serve stale data
  - event_based       # Invalidate cache on specific events (write-through)
  - tag_based         # Group cache entries by tag; invalidate by tag
  - hybrid            # TTL for most; event-based for critical data
```

---

#### Q19.5 — Next.js Data Cache Configuration
```
Field:      nextjsDataCache
Type:       enum
Required:   CONDITIONAL (required when nextjsRouterType = app_router)
Options:
  - default_cache     # Use Next.js built-in fetch cache with revalidate
  - no_store          # Disable all caching (dynamic data; always fresh)
  - per_route         # Configure cache behavior per route individually
  - isr_revalidation  # ISR-style timed revalidation for static pages
  - on_demand         # On-demand revalidation via revalidatePath/revalidateTag
```

---

### Section 20 — Queue & Job Infrastructure

---

#### Q20.1 — Message Queue Required?
```
Field:      messageQueueRequired
Type:       boolean
Required:   YES
Default:    false
```

**Auto-set to `true` if `requiresBackgroundJobs = true`.**

---

#### Q20.2 — Queue Architecture Pattern
```
Field:      queuePattern
Type:       enum
Required:   CONDITIONAL (required when messageQueueRequired = true)
Options:
  - simple_queue          # Single queue; FIFO; no routing
  - priority_queue        # Jobs have priority; higher priority processed first
  - delayed_queue         # Jobs scheduled for future execution
  - dead_letter_queue     # Failed jobs moved to separate queue for inspection
  - fan_out               # One message delivered to multiple consumers (pub/sub)
  - work_queue            # Multiple workers consuming from shared queue (standard)
  - saga_pattern          # Long-running multi-step workflows with compensation
```

---

#### Q20.3 — Job Concurrency Model
```
Field:      jobConcurrency
Type:       object
Required:   CONDITIONAL (required when messageQueueRequired = true)
Structure:
  maxConcurrentJobs:  number    (total concurrent workers)
  maxPerJobType:      object    (max concurrency per job type)
  rateLimiting:       boolean   (apply rate limits per job type)
```

**Example:**
```yaml
jobConcurrency:
  maxConcurrentJobs: 20
  maxPerJobType:
    email_sending: 5       # Don't overwhelm email provider
    ai_inference: 3        # Expensive; limit parallelism
    report_generation: 2   # Heavy DB queries; limit
    webhook_delivery: 10   # Generally fast; allow more
  rateLimiting: true
```

---

#### Q20.4 — Job Observability Requirements
```
Field:      jobObservability
Type:       enum[]
Required:   CONDITIONAL (required when messageQueueRequired = true)
Multi:      true
Options:
  - job_dashboard         # UI to view job status, history, failed jobs
  - prometheus_metrics    # Expose job metrics for Prometheus/Grafana
  - datadog_integration   # Ship job metrics to Datadog
  - sentry_integration    # Report job failures to Sentry
  - log_aggregation       # Structured logs per job execution
  - alerting              # Alerts when queue depth or failure rate exceeds threshold
```

---

### Section 21 — Authentication Provider

---

#### Q21.1 — Authentication Library
```
Field:      authLibrary
Type:       enum
Required:   YES
Options:
  - nextauth_v4       # NextAuth.js v4 (Auth.js predecessor; stable; well-documented)
  - authjs_v5         # Auth.js v5 (NextAuth.js v5; App Router native; recommended)
  - clerk             # Clerk (managed auth; UI components included; fastest to implement)
  - auth0             # Auth0 (enterprise managed auth; expensive at scale)
  - supabase_auth     # Supabase Auth (if using Supabase DB)
  - lucia             # Lucia Auth (lightweight; full control; more boilerplate)
  - better_auth       # Better Auth (new; TypeScript-first; comprehensive)
  - custom            # Custom auth implementation (avoid unless specific reason)
```

**Decision guidance:**

| Scenario | Recommended |
|---|---|
| Bootstrap; fast to implement | Clerk |
| Full control; no managed service cost | Auth.js v5 or Lucia |
| Enterprise with SAML/AD requirements | Auth0 or Clerk (Enterprise) |
| Using Supabase | Supabase Auth |
| Compliance-heavy; audit requirements | Auth.js v5 with custom session storage |

---

#### Q21.2 — Authentication Providers (OAuth)
```
Field:      oauthProviders
Type:       enum[]
Required:   YES
Multi:      true
Options:
  - email_password    # Email + password (local credentials)
  - magic_link        # Passwordless email magic link
  - google            # Google OAuth
  - github            # GitHub OAuth
  - microsoft         # Microsoft / Azure AD OAuth
  - apple             # Sign in with Apple
  - slack             # Slack OAuth
  - linkedin          # LinkedIn OAuth
  - twitter_x         # Twitter/X OAuth
  - facebook          # Facebook OAuth
  - discord           # Discord OAuth
  - saml              # Enterprise SAML (any provider)
  - ldap              # LDAP directory integration
  - passkey           # WebAuthn passkeys (biometric authentication)
```

---

#### Q21.3 — Session Strategy
```
Field:      sessionStrategy
Type:       enum
Required:   YES
Options:
  - jwt               # Stateless JWT; no DB lookup on each request
  - database          # Session stored in DB; can be revoked instantly
  - redis_session     # Session stored in Redis; fast + revocable
```

**Trade-offs:**
- `jwt` → Fastest; no DB lookup per request; BUT cannot be revoked before expiry
  (logout doesn't truly log out until token expires); requires short expiry
- `database` → Fully revocable; logout works immediately; adds DB query per request
- `redis_session` → Fast + revocable; requires Redis; best of both worlds

**Recommendation:**
- If `securityFeatures INCLUDES session_management` → use `database` or `redis_session`
- Otherwise → `jwt` is acceptable for most applications

---

#### Q21.4 — JWT Configuration (if using JWT)
```
Field:      jwtConfig
Type:       object
Required:   CONDITIONAL (required when sessionStrategy = jwt)
Structure:
  accessTokenExpiry:  string    (e.g., "15m", "1h", "24h")
  refreshTokenExpiry: string    (e.g., "7d", "30d", "90d")
  algorithm:          enum      (HS256 | HS512 | RS256 | ES256)
  rotateRefreshTokens: boolean  (generate new refresh token on each use)
```

**Security recommendation:**
```yaml
jwtConfig:
  accessTokenExpiry: "15m"   # Short-lived; reduces window if compromised
  refreshTokenExpiry: "7d"   # Longer-lived; stored in HttpOnly cookie
  algorithm: "HS512"         # Stronger than HS256; same performance
  rotateRefreshTokens: true  # Detect token theft via rotation
```

---

#### Q21.5 — MFA Implementation
```
Field:      mfaConfig
Type:       object
Required:   CONDITIONAL (required when securityFeatures INCLUDES mfa)
Structure:
  methods:      enum[]    (totp | sms | email | passkey | backup_codes)
  enforcement:  enum      (optional | required_on_first_login | required_for_all |
                           required_for_admins | required_for_sensitive_actions)
  gracePeriodDays: number (days before MFA enforcement kicks in for existing users)
```

---

### Section 22 — File Storage Provider

---

#### Q22.1 — Object Storage Provider
```
Field:      objectStorageProvider
Type:       enum
Required:   CONDITIONAL (required when requiresFileStorage = true)
Options:
  - aws_s3            # AWS S3 (industry standard; most integrations)
  - cloudflare_r2     # Cloudflare R2 (S3-compatible; no egress fees; cheaper)
  - vercel_blob       # Vercel Blob (native Vercel integration; simple)
  - supabase_storage  # Supabase Storage (if using Supabase DB)
  - gcs               # Google Cloud Storage
  - azure_blob        # Azure Blob Storage
  - minio             # MinIO (self-hosted S3-compatible)
  - uploadthing       # UploadThing (Next.js-optimized; developer experience focus)
```

**Cost comparison (approximate, for 100GB storage + 1TB egress/month):**
- AWS S3: ~$25/month storage + ~$90/month egress = ~$115/month
- Cloudflare R2: ~$15/month storage + $0 egress = ~$15/month
- Vercel Blob: ~$25/month (50GB included in Pro)
- MinIO (self-hosted): infrastructure cost only

---

#### Q22.2 — Upload Strategy
```
Field:      uploadStrategy
Type:       enum
Required:   CONDITIONAL (required when requiresFileStorage = true)
Options:
  - client_direct     # Client uploads directly to storage (presigned URL); recommended
  - server_proxy      # All uploads go through the Next.js server; simpler but slower
  - multipart         # Large file multipart upload (for files > 100MB)
  - chunked_resumable # Resumable chunked uploads (for very large files; unreliable networks)
```

**Recommendation:** `client_direct` (presigned URLs) is almost always the right choice.
The flow is:
1. Client requests a presigned upload URL from the API
2. API validates the request, generates a presigned URL from the storage provider
3. Client uploads directly to storage using the presigned URL
4. Client notifies the API of completion with the storage key
5. API stores the metadata in the database

This avoids proxying large files through your server, reducing bandwidth costs and
eliminating the server as a bottleneck for file uploads.

---

### Section 23 — Observability Stack

---

#### Q23.1 — Logging Provider
```
Field:      loggingProvider
Type:       enum
Required:   YES
Options:
  - axiom             # Axiom (modern; affordable; excellent Next.js integration)
  - datadog           # Datadog (comprehensive; expensive)
  - logtail           # Better Stack Logtail (affordable; beautiful UI)
  - grafana_loki      # Grafana Loki + Grafana (self-hosted; powerful)
  - cloudwatch        # AWS CloudWatch (if on AWS)
  - vercel_logs       # Vercel built-in logs (basic; no persistence)
  - console_only      # No external logging (development only)
```

**Recommendation for Next.js on Vercel:** `axiom` has the best native integration
with Vercel and is the most cost-effective option for most startups. It supports
structured logging, OpenTelemetry, and SQL-like query language.

---

#### Q23.2 — Error Tracking Provider
```
Field:      errorTrackingProvider
Type:       enum
Required:   YES
Options:
  - sentry            # Sentry (industry standard; excellent Next.js SDK)
  - datadog           # Datadog APM + error tracking
  - highlight         # Highlight.io (session replay + error tracking; modern)
  - bugsnag           # Bugsnag (mature; good for mobile too)
  - rollbar           # Rollbar (solid; real-time alerting)
  - vercel_monitoring # Vercel Web Analytics + monitoring (basic)
  - none              # No error tracking (accept blind spots)
```

---

#### Q23.3 — Application Performance Monitoring (APM)
```
Field:      apmProvider
Type:       enum
Required:   YES
Options:
  - datadog           # Datadog APM (traces, spans, service maps)
  - new_relic         # New Relic (comprehensive; expensive)
  - grafana_tempo     # Grafana Tempo + OpenTelemetry (self-hosted; free)
  - vercel_analytics  # Vercel Speed Insights (basic; Web Vitals only)
  - axiom             # Axiom with OpenTelemetry traces
  - none              # No APM (acceptable for early-stage)
```

---

#### Q23.4 — Metrics & Alerting
```
Field:      metricsAndAlerting
Type:       object
Required:   YES
Structure:
  metricsProvider:  enum    (prometheus | datadog | cloudwatch | grafana_cloud | none)
  alertingProvider: enum    (pagerduty | opsgenie | slack_alerts | email | none)
  alertThresholds:  object[]
    - metric:     string    (e.g., "error_rate", "p95_latency", "queue_depth")
      threshold:  any       (value that triggers the alert)
      severity:   enum      (critical | warning | info)
```

---

#### Q23.5 — OpenTelemetry Required?
```
Field:      openTelemetryRequired
Type:       boolean
Required:   YES
Default:    false
```

**Why it matters:** OpenTelemetry (OTel) provides vendor-neutral distributed tracing,
metrics, and logging. If `true`:
- All HTTP requests get a trace ID propagated through the system
- Database queries are instrumented with span timing
- Background jobs emit spans
- External API calls are traced
- Enables correlation between logs, traces, and metrics

For any application with > 5 services or complex background job workflows, OTel is
strongly recommended. Next.js has built-in OTel support via `instrumentation.ts`.

---

### Section 24 — CI/CD Pipeline

---

#### Q24.1 — CI/CD Platform
```
Field:      cicdPlatform
Type:       enum
Required:   YES
Options:
  - github_actions    # GitHub Actions (most common; free for public repos)
  - vercel_preview    # Vercel automatic preview deployments (excellent DX)
  - gitlab_ci         # GitLab CI/CD (if using GitLab)
  - bitbucket_pipes   # Bitbucket Pipelines
  - circleci          # CircleCI (mature; flexible)
  - jenkins           # Jenkins (self-hosted; legacy enterprise)
  - aws_codepipeline  # AWS CodePipeline (if on AWS)
```

**Recommendation:** `github_actions` + `vercel_preview` is the best DX combination
for Next.js projects. GitHub Actions handles tests, linting, and type checking. Vercel
handles preview and production deployments automatically.

---

#### Q24.2 — Branch Strategy
```
Field:      branchStrategy
Type:       enum
Required:   YES
Options:
  - trunk_based       # Single main branch; feature flags for incomplete work
  - gitflow           # main + develop + feature/* + release/* + hotfix/*
  - github_flow       # main + feature branches; PR merges to main
  - environment_branches # branch per environment (dev, staging, prod)
```

**Recommendation:** `trunk_based` development with feature flags is the most productive
for small-medium teams. `github_flow` is a good compromise for teams new to trunk-based
development.

---

#### Q24.3 — Deployment Strategy
```
Field:      deploymentStrategy
Type:       enum
Required:   YES
Options:
  - rolling           # Replace instances one by one (brief downtime possible)
  - blue_green        # Deploy new version alongside old; switch traffic instantly
  - canary            # Route small % of traffic to new version first
  - feature_flags     # Deploy code, then gradually expose via flags
  - all_at_once       # Replace all instances simultaneously (downtime)
```

---

#### Q24.4 — Required CI Checks
```
Field:      ciChecks
Type:       enum[]
Required:   YES
Multi:      true
Options:
  - type_check        # tsc --noEmit TypeScript type checking
  - unit_tests        # Run unit test suite
  - integration_tests # Run integration test suite
  - e2e_tests         # Run end-to-end tests (Playwright, Cypress)
  - lint              # ESLint code quality checks
  - format_check      # Prettier formatting verification
  - security_scan     # Dependency vulnerability scanning (npm audit, Snyk)
  - bundle_analysis   # Track and alert on bundle size increases
  - lighthouse        # Automated Lighthouse performance audit
  - docker_build      # Verify Docker image builds successfully
  - db_migration_check # Verify migrations apply cleanly
  - storybook_build   # Verify Storybook builds (if used)
```

---

#### Q24.5 — Environment Configuration
```
Field:      environments
Type:       enum[]
Required:   YES
Multi:      true
Options:
  - development       # Local development environment
  - preview           # Ephemeral per-PR preview environment
  - staging           # Stable staging environment (mirrors production)
  - production        # Production environment
  - canary            # Canary slice of production (if using canary deploys)
```

---

### Section 25 — Testing Strategy

---

#### Q25.1 — Testing Layers Required
```
Field:      testingLayers
Type:       enum[]
Required:   YES
Multi:      true
Options:
  - unit              # Unit tests for pure functions and domain logic
  - integration       # Integration tests for API routes + DB operations
  - component         # React component tests (React Testing Library)
  - e2e               # End-to-end tests for critical user flows
  - visual            # Visual regression tests (Chromatic, Percy)
  - performance       # Performance regression tests (Lighthouse CI)
  - contract          # API contract tests (Pact)
  - mutation          # Mutation testing to verify test quality
  - none              # No automated testing (not recommended)
```

---

#### Q25.2 — Testing Frameworks
```
Field:      testingFrameworks
Type:       object
Required:   YES
Structure:
  unitFramework:        enum    (vitest | jest | mocha | none)
  componentFramework:   enum    (testing_library | storybook_play | none)
  e2eFramework:         enum    (playwright | cypress | none)
  mockingLibrary:       enum    (msw | jest_mock | sinon | none)
```

**Recommendations:**
- Unit: `vitest` (faster than Jest; native ESM support; same API as Jest)
- Component: `testing_library` (React Testing Library; testing user behavior, not impl)
- E2E: `playwright` (more reliable than Cypress; multi-browser; faster)
- Mocking: `msw` (Mock Service Worker; intercepts at network level; no implementation coupling)

---

#### Q25.3 — Code Coverage Targets
```
Field:      coverageTargets
Type:       object
Required:   YES
Structure:
  overall:          number    (target % overall coverage; 0 = no requirement)
  domain:           number    (target for lib/domain/ — should be highest)
  services:         number    (target for lib/services/)
  repositories:     number    (target for lib/repositories/)
  apiRoutes:        number    (target for app/api/)
  components:       number    (target for components/)
```

**Example (realistic targets by project stage):**
```yaml
coverageTargets:
  overall: 70
  domain: 90        # Pure business logic must be thoroughly tested
  services: 80
  repositories: 60  # Hard to test without DB; integration tests preferred
  apiRoutes: 70
  components: 50    # UI components rely more on visual/E2E tests
```

---

#### Q25.4 — E2E Test Scope
```
Field:      e2eTestScope
Type:       enum[]
Required:   CONDITIONAL (required when testingLayers INCLUDES e2e)
Multi:      true
Options:
  - authentication_flow   # Sign up, login, logout, password reset
  - onboarding_flow       # New user / tenant onboarding
  - core_feature_flow     # The 1-3 most critical user journeys
  - payment_flow          # Checkout, subscription upgrade/downgrade
  - admin_flow            # Admin panel operations
  - api_e2e               # API-level end-to-end tests (no browser)
  - accessibility         # Automated accessibility checks in E2E
```

---

#### Q25.5 — Test Data Strategy
```
Field:      testDataStrategy
Type:       enum
Required:   YES
Options:
  - in_memory         # Tests use in-memory state; fastest; no DB required
  - test_db           # Dedicated test database; reset between test runs
  - docker_db         # Docker container for test database (CI-friendly)
  - factories         # Test factories generating realistic fake data
  - snapshots         # Database snapshot restored before test run
  - mocked            # All DB calls mocked; fastest but less realistic
```

---

#### Q25.6 — Continuous Testing in CI?
```
Field:      continuousTestingInCI
Type:       boolean
Required:   YES
Default:    true
```

**When `true`:**
- Unit + integration tests run on every commit to every branch
- E2E tests run on every PR (or nightly for slow suites)
- Failed tests block deployment
- Coverage reports generated and tracked over time

---


---

## TypeScript Interfaces

These interfaces are the canonical type definitions for the intake form. All pipeline
components consume the `IntakeForm` type. The Zod schemas below validate against these.

```typescript
// src/types/intake.ts

// ─── Enums ────────────────────────────────────────────────────────────────────

export type ProjectType =
  | 'saas_b2b' | 'saas_b2c' | 'saas_b2b2c' | 'internal_tool' | 'marketplace'
  | 'api_product' | 'developer_tool' | 'e_commerce' | 'content_platform'
  | 'data_platform' | 'iot_platform' | 'ai_product' | 'other';

export type ProjectStage =
  | 'greenfield' | 'mvp_in_progress' | 'launched' | 'scaling'
  | 'migrating' | 'rebuilding';

export type Industry =
  | 'fintech' | 'healthtech' | 'edtech' | 'legaltech' | 'hrtech' | 'martech'
  | 'devtools' | 'ecommerce' | 'logistics' | 'proptech' | 'govtech' | 'media'
  | 'social' | 'enterprise_saas' | 'consumer' | 'other';

export type Geography =
  | 'us_only' | 'eu_only' | 'us_and_eu' | 'global' | 'apac' | 'latam'
  | 'mena' | 'specific';

export type UserCountBand =
  | 'under_100' | '100_to_1k' | '1k_to_10k' | '10k_to_100k'
  | '100k_to_1m' | 'over_1m';

export type TenantIsolationModel =
  | 'shared_schema' | 'schema_per_tenant' | 'database_per_tenant' | 'hybrid';

export type TenantIdentificationMethod =
  | 'subdomain' | 'custom_domain' | 'path_prefix' | 'header_based'
  | 'query_param' | 'jwt_claim';

export type TenantOnboardingModel =
  | 'self_service' | 'sales_assisted' | 'invite_only' | 'api_provisioned';

export type TenantCustomization =
  | 'branding' | 'custom_domain' | 'feature_flags' | 'custom_roles'
  | 'custom_fields' | 'webhooks' | 'sso_config' | 'billing_limits' | 'none';

export type CrossTenantSharing =
  | 'none' | 'read_only' | 'configurable' | 'marketplace';

export type TenantTierModel =
  | 'flat_pricing' | 'tiered_pricing' | 'usage_based' | 'hybrid' | 'custom';

export type TenantDataDeletion =
  | 'soft_delete' | 'hard_delete' | 'grace_period' | 'export_then_delete' | 'archive';

export type TenantDataResidency =
  | 'no_requirement' | 'tenant_chooses' | 'eu_only' | 'us_only' | 'regional_routing';

export type AccessControlModel =
  | 'none' | 'rbac' | 'abac' | 'pbac' | 'rbac_with_abac' | 'ownership_based' | 'acl';

export type RoleHierarchy = 'flat' | 'strict_hierarchy' | 'partial_hierarchy' | 'group_based';

export type PermissionGranularity = 'resource_level' | 'action_level' | 'field_level';

export type PolicyEngine = 'custom_dsl' | 'opa_rego' | 'cedar' | 'casbin' | 'spice_db' | 'cerbos';

export type WorkloadProfile =
  | 'read_heavy' | 'write_heavy' | 'balanced' | 'bursty_reads' | 'bursty_writes' | 'streaming';

export type SearchRequirements =
  | 'none' | 'basic_filter' | 'full_text_search' | 'fuzzy_search'
  | 'faceted_search' | 'semantic_search' | 'hybrid';

export type RealTimeProtocol =
  | 'websockets' | 'server_sent_events' | 'polling' | 'long_polling' | 'webrtc';

export type JobQueuePreference =
  | 'inngest' | 'bull_redis' | 'pg_boss' | 'trigger_dev' | 'temporal'
  | 'aws_sqs' | 'vercel_cron' | 'no_preference';

export type DeploymentPlatform =
  | 'vercel' | 'aws' | 'gcp' | 'azure' | 'railway' | 'render' | 'fly_io'
  | 'self_hosted' | 'kubernetes' | 'no_preference';

export type FundingStage =
  | 'bootstrapped' | 'pre_seed' | 'seed' | 'series_a' | 'series_b'
  | 'series_c_plus' | 'enterprise_budget' | 'government';

export type PriorityDimension =
  | 'speed_to_market' | 'scalability' | 'security' | 'cost_efficiency'
  | 'developer_experience' | 'user_experience' | 'maintainability';

export type RenderingStrategy = 'ssg' | 'ssr' | 'isr' | 'csr' | 'hybrid' | 'edge_ssr';

export type RouterType = 'app_router' | 'pages_router' | 'mixed';

export type ApiArchitecture = 'rest' | 'graphql' | 'trpc' | 'rest_and_trpc' | 'grpc' | 'none';

export type DatabaseEngine =
  | 'postgresql' | 'mysql' | 'sqlite' | 'mongodb' | 'planetscale' | 'turso'
  | 'supabase' | 'neon' | 'cockroachdb';

export type OrmChoice = 'prisma' | 'drizzle' | 'kysely' | 'typeorm' | 'sequelize' | 'raw_sql' | 'supabase_client';

export type CacheTechnology = 'redis' | 'upstash' | 'memcached' | 'vercel_kv' | 'cloudflare_kv' | 'in_memory';

export type SessionStrategy = 'jwt' | 'database' | 'redis_session';

export type AuthLibrary =
  | 'nextauth_v4' | 'authjs_v5' | 'clerk' | 'auth0' | 'supabase_auth'
  | 'lucia' | 'better_auth' | 'custom';

export type ObjectStorageProvider =
  | 'aws_s3' | 'cloudflare_r2' | 'vercel_blob' | 'supabase_storage'
  | 'gcs' | 'azure_blob' | 'minio' | 'uploadthing';

export type LoggingProvider = 'axiom' | 'datadog' | 'logtail' | 'grafana_loki' | 'cloudwatch' | 'vercel_logs' | 'console_only';
export type ErrorTrackingProvider = 'sentry' | 'datadog' | 'highlight' | 'bugsnag' | 'rollbar' | 'vercel_monitoring' | 'none';
export type CicdPlatform = 'github_actions' | 'vercel_preview' | 'gitlab_ci' | 'bitbucket_pipes' | 'circleci' | 'jenkins' | 'aws_codepipeline';
export type DeploymentStrategy = 'rolling' | 'blue_green' | 'canary' | 'feature_flags' | 'all_at_once';

// ─── Sub-Objects ──────────────────────────────────────────────────────────────

export interface RoleDefinition {
  name: string;
  description: string;
  scope: 'platform' | 'tenant' | 'resource';
  isDefault: boolean;
  isSuperAdmin: boolean;
}

export interface ResourcePermission {
  resourceName: string;
  actions: string[];
  ownershipRule: string | null;
}

export interface RolePermissionEntry {
  role: string;
  resource: string;
  action: string;
  allowed: boolean | 'own_only';
}

export interface AbacAttribute {
  name: string;
  source: 'user' | 'resource' | 'environment' | 'request';
  type: 'string' | 'number' | 'boolean' | 'enum' | 'date' | 'set';
  example: unknown;
}

export interface AbacPolicy {
  id: string;
  description: string;
  effect: 'allow' | 'deny';
  condition: string;
  priority: number;
}

export interface EntityDefinition {
  name: string;
  description: string;
  estimatedRows: 'under_1k' | '1k_10k' | '10k_100k' | '100k_1m' | 'over_1m';
  writeFrequency: 'rare' | 'occasional' | 'frequent' | 'very_frequent' | 'stream';
  readFrequency: 'rare' | 'occasional' | 'frequent' | 'very_frequent' | 'burst';
  relationships: string[];
  requiresAudit: boolean;
  requiresSoftDelete: boolean;
}

export interface DataRetentionPolicy {
  defaultRetentionDays: number;
  retentionByEntity: Array<{ entityName: string; retentionDays: number }>;
  auditLogRetentionDays: number;
  backupRetentionDays: number;
}

export interface PaymentDetail {
  provider: 'stripe' | 'paddle' | 'braintree' | 'square' | 'custom';
  billingModel: 'one_time' | 'subscription' | 'usage_based' | 'hybrid';
  currencies: string[];
  trialPeriodDays: number;
  requiresInvoicing: boolean;
  taxHandling: 'none' | 'stripe_tax' | 'manual' | 'third_party';
}

export interface JwtConfig {
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
  algorithm: 'HS256' | 'HS512' | 'RS256' | 'ES256';
  rotateRefreshTokens: boolean;
}

export interface MfaConfig {
  methods: Array<'totp' | 'sms' | 'email' | 'passkey' | 'backup_codes'>;
  enforcement: 'optional' | 'required_on_first_login' | 'required_for_all' | 'required_for_admins' | 'required_for_sensitive_actions';
  gracePeriodDays: number;
}

export interface JobConcurrencyConfig {
  maxConcurrentJobs: number;
  maxPerJobType: Record<string, number>;
  rateLimiting: boolean;
}

export interface AlertThreshold {
  metric: string;
  threshold: unknown;
  severity: 'critical' | 'warning' | 'info';
}

export interface MetricsConfig {
  metricsProvider: 'prometheus' | 'datadog' | 'cloudwatch' | 'grafana_cloud' | 'none';
  alertingProvider: 'pagerduty' | 'opsgenie' | 'slack_alerts' | 'email' | 'none';
  alertThresholds: AlertThreshold[];
}

export interface TestingFrameworkConfig {
  unitFramework: 'vitest' | 'jest' | 'mocha' | 'none';
  componentFramework: 'testing_library' | 'storybook_play' | 'none';
  e2eFramework: 'playwright' | 'cypress' | 'none';
  mockingLibrary: 'msw' | 'jest_mock' | 'sinon' | 'none';
}

export interface CoverageTargets {
  overall: number;
  domain: number;
  services: number;
  repositories: number;
  apiRoutes: number;
  components: number;
}

// ─── Main Intake Form Interface ───────────────────────────────────────────────

export interface IntakeFormPart1 {
  // Section 1 — Project Identity
  projectName: string;
  projectType: ProjectType;
  projectTypeDescription?: string;
  problemStatement: string;
  solutionSummary: string;
  projectStage: ProjectStage;
  existingStack?: string[];
  industry: Industry;
  targetGeographies: Geography[];
  targetGeographiesDetail?: string;
  targetLaunchDate: string;

  // Section 2 — User Personas & Scale
  primaryUserType: 'end_consumers' | 'business_employees' | 'business_admins' | 'developers' | 'mixed';
  numberOfRoles: number;
  usersAtLaunch: UserCountBand;
  usersAt12Months: UserCountBand;
  peakConcurrentUsers: 'under_50' | '50_to_500' | '500_to_5k' | '5k_to_50k' | 'over_50k';
  avgSessionDuration: 'under_5min' | '5_to_30min' | '30min_to_2hr' | 'over_2hr';
  userGeographicDistribution: 'single_region' | 'multi_region' | 'global';
  userTechnicalLevel: 'non_technical' | 'semi_technical' | 'technical' | 'highly_technical';
  hasTeamAccounts: boolean;
  maxTeamSize?: 'under_10' | '10_to_50' | '50_to_500' | '500_to_5k' | 'over_5k';
  hasGuestAccess: boolean;

  // Section 3 — Multi-Tenancy
  isMultiTenant: boolean;
  tenantIsolationModel?: TenantIsolationModel;
  tenantIdentificationMethod?: TenantIdentificationMethod;
  tenantOnboardingModel?: TenantOnboardingModel;
  tenantCustomization?: TenantCustomization[];
  crossTenantSharing?: CrossTenantSharing;
  tenantTierModel?: TenantTierModel;
  tenantsAtLaunch?: 'under_10' | '10_to_100' | '100_to_1k' | '1k_to_10k' | 'over_10k';
  tenantsAt12Months?: 'under_10' | '10_to_100' | '100_to_1k' | '1k_to_10k' | 'over_10k';
  tenantDataDeletion?: TenantDataDeletion;
  tenantAdminCapabilities?: string[];
  tenantDataResidency?: TenantDataResidency;

  // Section 4 — Access Control
  accessControlModel: AccessControlModel;
  roles?: RoleDefinition[];
  roleHierarchy?: RoleHierarchy;
  permissionGranularity?: PermissionGranularity;
  resourcePermissions?: ResourcePermission[];
  rolePermissionMatrix?: RolePermissionEntry[];
  dynamicRoles?: boolean;
  superAdminBypassesChecks?: boolean;
  rolesAreTenantScoped?: boolean;
  multipleRolesPerUser?: boolean;
  roleAssignmentRequiresApproval?: boolean;
  ownershipOverride?: boolean;
  abacAttributes?: AbacAttribute[];
  abacPolicies?: AbacPolicy[];
  abacConflictResolution?: 'deny_overrides' | 'allow_overrides' | 'priority_based' | 'first_applicable';
  abacPolicyManagement?: 'static_developer' | 'static_config' | 'admin_managed' | 'tenant_managed' | 'customer_managed';
  policyEngine?: PolicyEngine;
  policiesAuditable?: boolean;
  policiesUseExternalData?: boolean;

  // Section 5 — Data Requirements
  coreEntities: EntityDefinition[];
  workloadProfile: WorkloadProfile;
  softDeleteRequired: boolean;
  globalAuditTrail: boolean;
  dataRetentionPolicy: DataRetentionPolicy;
  searchRequirements: SearchRequirements;
  analyticsRequired: boolean;
  dbIsolationPerTenant?: 'row_level_security' | 'application_level' | 'schema_level' | 'database_level';
  dataVolumeAt12Months: 'under_1gb' | '1gb_to_10gb' | '10gb_to_100gb' | '100gb_to_1tb' | '1tb_to_10tb' | 'over_10tb';
  backupStrategy: 'managed_automatic' | 'pgdump_scheduled' | 'wal_streaming' | 'multi_region';

  // Section 6 — Real-Time
  requiresRealTime: boolean;
  realTimeFeatures?: string[];
  realTimeProtocol?: RealTimeProtocol;
  realTimeScale?: 'under_100_concurrent' | '100_to_1k_concurrent' | '1k_to_10k_concurrent' | 'over_10k_concurrent';
  realTimeDeliveryGuarantee?: 'best_effort' | 'at_least_once' | 'exactly_once';

  // Section 7 — Background Jobs
  requiresBackgroundJobs: boolean;
  backgroundJobTypes?: string[];
  jobQueuePreference?: JobQueuePreference;
  jobRetryStrategy?: 'no_retry' | 'fixed_retry' | 'exponential_backoff' | 'custom';
  jobFailureHandling?: string[];

  // Section 8 — Integrations
  integrations: string[];
  inboundWebhookSources?: string[];
  paymentDetail?: PaymentDetail;

  // Section 9 — File Storage
  requiresFileStorage: boolean;
  acceptedFileTypes?: string[];
  maxFileSizeMB?: number;
  fileProcessing?: string[];
  fileAccessModel?: 'public' | 'private_signed' | 'private_proxied' | 'mixed';

  // Section 10 — AI/ML
  requiresAI: boolean;
  aiFeatures?: string[];
  aiProvider?: string[];
  aiDataPrivacy?: 'cloud_acceptable' | 'opt_in_only' | 'anonymized_only' | 'no_external_ai';
  aiMonthlyCostCeiling?: 'under_100' | '100_to_500' | '500_to_2k' | '2k_to_10k' | 'over_10k';

  // Section 11 — Performance
  targetFCP: 'under_1s' | '1s_to_2s' | '2s_to_3s' | 'over_3s';
  targetApiP95: 'under_100ms' | '100ms_to_300ms' | '300ms_to_1s' | 'over_1s';
  peakRPS: 'under_10' | '10_to_100' | '100_to_1k' | '1k_to_10k' | 'over_10k';
  acceptableDowntimePerMonth: 'under_5min' | 'under_45min' | 'under_8hr' | 'any';

  // Section 12 — Availability
  rto: 'under_15min' | '15min_to_1hr' | '1hr_to_4hr' | '4hr_to_24hr' | 'best_effort';
  rpo: 'zero' | 'under_5min' | 'under_1hr' | 'under_24hr' | 'best_effort';
  maintenanceWindowsAcceptable: boolean;

  // Section 13 — Compliance
  complianceFrameworks: string[];
  piiDataCollected: string[];
  encryptionRequirements: string[];
  securityFeatures: string[];

  // Section 14 — Infrastructure
  deploymentPlatform: DeploymentPlatform;
  managedServicesPreference: 'managed_only' | 'hybrid' | 'self_hosted_preferred';
  coldStartTolerance: 'zero' | 'under_500ms' | 'under_2s' | 'any';
  containerizationRequired: boolean;
  monthlyInfrastructureBudget: 'under_50' | '50_to_200' | '200_to_500' | '500_to_2k' | '2k_to_10k' | 'over_10k';
  cloudProviderRestrictions?: string[];

  // Section 15 — Timeline & Budget
  devTeamSize: 'solo' | 'small' | 'medium' | 'large' | 'enterprise';
  mvpTimelineDays: number;
  fundingStage: FundingStage;
  priorityRank: PriorityDimension[];
}

export interface IntakeFormPart2 {
  // Section 16 — Rendering
  renderingStrategy: RenderingStrategy;
  seoRequired: boolean;
  staticExportRequired: boolean;
  nextjsRouterType: RouterType;
  rscUsageModel?: 'server_first' | 'client_heavy' | 'balanced';
  middlewareRequirements: string[];
  i18nRequired: boolean;
  themingRequired: 'none' | 'dark_mode' | 'custom_theming' | 'tenant_theming';

  // Section 17 — API Layer
  apiArchitecture: ApiArchitecture;
  apiVersioningStrategy?: 'url_versioning' | 'header_versioning' | 'query_param' | 'no_versioning' | 'content_negotiation';
  apiAuthMethod: string[];
  rateLimitingStrategy: 'none' | 'ip_based' | 'user_based' | 'api_key_based' | 'tenant_based' | 'tiered' | 'adaptive';
  apiDocumentation?: string;
  outboundWebhooks: boolean;
  useResponseEnvelope: boolean;

  // Section 18 — Database
  primaryDatabase: DatabaseEngine;
  ormChoice: OrmChoice;
  readReplicaRequired: boolean;
  connectionPooling: 'prisma_accelerate' | 'pgbouncer' | 'neon_pooler' | 'supabase_pooler' | 'none';
  migrationStrategy: 'prisma_migrate' | 'drizzle_kit' | 'flyway' | 'liquibase' | 'manual_sql' | 'expand_contract';
  seedingStrategy: 'prisma_seed' | 'fixtures' | 'factory_pattern' | 'none';
  multiDatabaseSupport: boolean;

  // Section 19 — Caching
  cacheLayerRequired: boolean;
  cacheTechnology?: CacheTechnology;
  cacheTargets?: string[];
  cacheInvalidationStrategy?: 'ttl_based' | 'event_based' | 'tag_based' | 'hybrid';
  nextjsDataCache?: 'default_cache' | 'no_store' | 'per_route' | 'isr_revalidation' | 'on_demand';

  // Section 20 — Queue
  messageQueueRequired: boolean;
  queuePattern?: string;
  jobConcurrency?: JobConcurrencyConfig;
  jobObservability?: string[];

  // Section 21 — Auth
  authLibrary: AuthLibrary;
  oauthProviders: string[];
  sessionStrategy: SessionStrategy;
  jwtConfig?: JwtConfig;
  mfaConfig?: MfaConfig;

  // Section 22 — File Storage Provider
  objectStorageProvider?: ObjectStorageProvider;
  uploadStrategy?: 'client_direct' | 'server_proxy' | 'multipart' | 'chunked_resumable';

  // Section 23 — Observability
  loggingProvider: LoggingProvider;
  errorTrackingProvider: ErrorTrackingProvider;
  apmProvider: string;
  metricsAndAlerting: MetricsConfig;
  openTelemetryRequired: boolean;

  // Section 24 — CI/CD
  cicdPlatform: CicdPlatform;
  branchStrategy: 'trunk_based' | 'gitflow' | 'github_flow' | 'environment_branches';
  deploymentStrategy: DeploymentStrategy;
  ciChecks: string[];
  environments: string[];

  // Section 25 — Testing
  testingLayers: string[];
  testingFrameworks: TestingFrameworkConfig;
  coverageTargets: CoverageTargets;
  e2eTestScope?: string[];
  testDataStrategy: 'in_memory' | 'test_db' | 'docker_db' | 'factories' | 'snapshots' | 'mocked';
  continuousTestingInCI: boolean;
}

export interface IntakeFormMetadata {
  intakeFormId: string;
  intakeVersion: '1.0.0';
  schemaVersion: '1.0.0';
  submittedAt: string;
  submittedBy: string;
  prdReference: string | null;
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_CLARIFICATION' | 'APPROVED' | 'FROZEN';
}

export interface IntakeForm extends IntakeFormPart1, IntakeFormPart2 {
  meta: IntakeFormMetadata;
}
```

---

## Zod Validation Schemas

```typescript
// src/lib/validators/intake.schema.ts
import { z } from 'zod';

// ─── Reusable Field Schemas ────────────────────────────────────────────────────

const projectTypeSchema = z.enum([
  'saas_b2b', 'saas_b2c', 'saas_b2b2c', 'internal_tool', 'marketplace',
  'api_product', 'developer_tool', 'e_commerce', 'content_platform',
  'data_platform', 'iot_platform', 'ai_product', 'other',
]);

const industrySchema = z.enum([
  'fintech', 'healthtech', 'edtech', 'legaltech', 'hrtech', 'martech',
  'devtools', 'ecommerce', 'logistics', 'proptech', 'govtech', 'media',
  'social', 'enterprise_saas', 'consumer', 'other',
]);

const userCountBandSchema = z.enum([
  'under_100', '100_to_1k', '1k_to_10k', '10k_to_100k', '100k_to_1m', 'over_1m',
]);

const fundingStageSchema = z.enum([
  'bootstrapped', 'pre_seed', 'seed', 'series_a', 'series_b',
  'series_c_plus', 'enterprise_budget', 'government',
]);

const deploymentPlatformSchema = z.enum([
  'vercel', 'aws', 'gcp', 'azure', 'railway', 'render', 'fly_io',
  'self_hosted', 'kubernetes', 'no_preference',
]);

// ─── Role Definition Schema ────────────────────────────────────────────────────

const roleDefinitionSchema = z.object({
  name: z.string().min(1).max(50).regex(/^[a-z_]+$/, 'Role name must be lowercase with underscores'),
  description: z.string().min(10).max(200),
  scope: z.enum(['platform', 'tenant', 'resource']),
  isDefault: z.boolean(),
  isSuperAdmin: z.boolean(),
});

// ─── Resource Permission Schema ────────────────────────────────────────────────

const resourcePermissionSchema = z.object({
  resourceName: z.string().min(1).max(100),
  actions: z.array(z.string().min(1)).min(1),
  ownershipRule: z.string().nullable(),
});

// ─── ABAC Schemas ─────────────────────────────────────────────────────────────

const abacAttributeSchema = z.object({
  name: z.string().min(1),
  source: z.enum(['user', 'resource', 'environment', 'request']),
  type: z.enum(['string', 'number', 'boolean', 'enum', 'date', 'set']),
  example: z.unknown(),
});

const abacPolicySchema = z.object({
  id: z.string().regex(/^POL-\d{3,}$/, 'Policy ID must be in format POL-001'),
  description: z.string().min(10).max(500),
  effect: z.enum(['allow', 'deny']),
  condition: z.string().min(5),
  priority: z.number().int().min(1).max(1000),
});

// ─── Entity Definition Schema ─────────────────────────────────────────────────

const entityDefinitionSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(10).max(300),
  estimatedRows: z.enum(['under_1k', '1k_10k', '10k_100k', '100k_1m', 'over_1m']),
  writeFrequency: z.enum(['rare', 'occasional', 'frequent', 'very_frequent', 'stream']),
  readFrequency: z.enum(['rare', 'occasional', 'frequent', 'very_frequent', 'burst']),
  relationships: z.array(z.string()),
  requiresAudit: z.boolean(),
  requiresSoftDelete: z.boolean(),
});

// ─── Part 1 Schema ────────────────────────────────────────────────────────────

export const intakeFormPart1Schema = z.object({
  projectName: z.string().min(2).max(100).regex(/^[\w\s-]+$/),
  projectType: projectTypeSchema,
  projectTypeDescription: z.string().max(500).optional(),
  problemStatement: z.string().min(20).max(300),
  solutionSummary: z.string().min(30).max(500),
  projectStage: z.enum(['greenfield', 'mvp_in_progress', 'launched', 'scaling', 'migrating', 'rebuilding']),
  existingStack: z.array(z.string()).optional(),
  industry: industrySchema,
  targetGeographies: z.array(z.enum(['us_only', 'eu_only', 'us_and_eu', 'global', 'apac', 'latam', 'mena', 'specific'])).min(1),
  targetGeographiesDetail: z.string().optional(),
  targetLaunchDate: z.string().datetime(),
  primaryUserType: z.enum(['end_consumers', 'business_employees', 'business_admins', 'developers', 'mixed']),
  numberOfRoles: z.number().int().min(1).max(50),
  usersAtLaunch: userCountBandSchema,
  usersAt12Months: userCountBandSchema,
  peakConcurrentUsers: z.enum(['under_50', '50_to_500', '500_to_5k', '5k_to_50k', 'over_50k']),
  avgSessionDuration: z.enum(['under_5min', '5_to_30min', '30min_to_2hr', 'over_2hr']),
  userGeographicDistribution: z.enum(['single_region', 'multi_region', 'global']),
  userTechnicalLevel: z.enum(['non_technical', 'semi_technical', 'technical', 'highly_technical']),
  hasTeamAccounts: z.boolean(),
  maxTeamSize: z.enum(['under_10', '10_to_50', '50_to_500', '500_to_5k', 'over_5k']).optional(),
  hasGuestAccess: z.boolean(),
  isMultiTenant: z.boolean(),
  tenantIsolationModel: z.enum(['shared_schema', 'schema_per_tenant', 'database_per_tenant', 'hybrid']).optional(),
  tenantIdentificationMethod: z.enum(['subdomain', 'custom_domain', 'path_prefix', 'header_based', 'query_param', 'jwt_claim']).optional(),
  tenantOnboardingModel: z.enum(['self_service', 'sales_assisted', 'invite_only', 'api_provisioned']).optional(),
  tenantCustomization: z.array(z.string()).optional(),
  crossTenantSharing: z.enum(['none', 'read_only', 'configurable', 'marketplace']).optional(),
  tenantTierModel: z.enum(['flat_pricing', 'tiered_pricing', 'usage_based', 'hybrid', 'custom']).optional(),
  tenantsAtLaunch: z.enum(['under_10', '10_to_100', '100_to_1k', '1k_to_10k', 'over_10k']).optional(),
  tenantsAt12Months: z.enum(['under_10', '10_to_100', '100_to_1k', '1k_to_10k', 'over_10k']).optional(),
  tenantDataDeletion: z.enum(['soft_delete', 'hard_delete', 'grace_period', 'export_then_delete', 'archive']).optional(),
  tenantAdminCapabilities: z.array(z.string()).optional(),
  tenantDataResidency: z.enum(['no_requirement', 'tenant_chooses', 'eu_only', 'us_only', 'regional_routing']).optional(),
  accessControlModel: z.enum(['none', 'rbac', 'abac', 'pbac', 'rbac_with_abac', 'ownership_based', 'acl']),
  roles: z.array(roleDefinitionSchema).optional(),
  roleHierarchy: z.enum(['flat', 'strict_hierarchy', 'partial_hierarchy', 'group_based']).optional(),
  permissionGranularity: z.enum(['resource_level', 'action_level', 'field_level']).optional(),
  resourcePermissions: z.array(resourcePermissionSchema).optional(),
  dynamicRoles: z.boolean().optional(),
  superAdminBypassesChecks: z.boolean().optional(),
  rolesAreTenantScoped: z.boolean().optional(),
  multipleRolesPerUser: z.boolean().optional(),
  roleAssignmentRequiresApproval: z.boolean().optional(),
  ownershipOverride: z.boolean().optional(),
  abacAttributes: z.array(abacAttributeSchema).optional(),
  abacPolicies: z.array(abacPolicySchema).optional(),
  abacConflictResolution: z.enum(['deny_overrides', 'allow_overrides', 'priority_based', 'first_applicable']).optional(),
  abacPolicyManagement: z.enum(['static_developer', 'static_config', 'admin_managed', 'tenant_managed', 'customer_managed']).optional(),
  policyEngine: z.enum(['custom_dsl', 'opa_rego', 'cedar', 'casbin', 'spice_db', 'cerbos']).optional(),
  policiesAuditable: z.boolean().optional(),
  policiesUseExternalData: z.boolean().optional(),
  coreEntities: z.array(entityDefinitionSchema).min(1),
  workloadProfile: z.enum(['read_heavy', 'write_heavy', 'balanced', 'bursty_reads', 'bursty_writes', 'streaming']),
  softDeleteRequired: z.boolean(),
  globalAuditTrail: z.boolean(),
  dataRetentionPolicy: z.object({
    defaultRetentionDays: z.number().int().min(-1),
    retentionByEntity: z.array(z.object({ entityName: z.string(), retentionDays: z.number().int() })),
    auditLogRetentionDays: z.number().int().min(0),
    backupRetentionDays: z.number().int().min(1),
  }),
  searchRequirements: z.enum(['none', 'basic_filter', 'full_text_search', 'fuzzy_search', 'faceted_search', 'semantic_search', 'hybrid']),
  analyticsRequired: z.boolean(),
  dbIsolationPerTenant: z.enum(['row_level_security', 'application_level', 'schema_level', 'database_level']).optional(),
  dataVolumeAt12Months: z.enum(['under_1gb', '1gb_to_10gb', '10gb_to_100gb', '100gb_to_1tb', '1tb_to_10tb', 'over_10tb']),
  backupStrategy: z.enum(['managed_automatic', 'pgdump_scheduled', 'wal_streaming', 'multi_region']),
  requiresRealTime: z.boolean(),
  realTimeFeatures: z.array(z.string()).optional(),
  realTimeProtocol: z.enum(['websockets', 'server_sent_events', 'polling', 'long_polling', 'webrtc']).optional(),
  realTimeScale: z.enum(['under_100_concurrent', '100_to_1k_concurrent', '1k_to_10k_concurrent', 'over_10k_concurrent']).optional(),
  realTimeDeliveryGuarantee: z.enum(['best_effort', 'at_least_once', 'exactly_once']).optional(),
  requiresBackgroundJobs: z.boolean(),
  backgroundJobTypes: z.array(z.string()).optional(),
  jobQueuePreference: z.enum(['inngest', 'bull_redis', 'pg_boss', 'trigger_dev', 'temporal', 'aws_sqs', 'vercel_cron', 'no_preference']).optional(),
  jobRetryStrategy: z.enum(['no_retry', 'fixed_retry', 'exponential_backoff', 'custom']).optional(),
  jobFailureHandling: z.array(z.string()).optional(),
  integrations: z.array(z.string()).min(1),
  inboundWebhookSources: z.array(z.string()).optional(),
  paymentDetail: z.object({
    provider: z.enum(['stripe', 'paddle', 'braintree', 'square', 'custom']),
    billingModel: z.enum(['one_time', 'subscription', 'usage_based', 'hybrid']),
    currencies: z.array(z.string().length(3)),
    trialPeriodDays: z.number().int().min(0),
    requiresInvoicing: z.boolean(),
    taxHandling: z.enum(['none', 'stripe_tax', 'manual', 'third_party']),
  }).optional(),
  requiresFileStorage: z.boolean(),
  acceptedFileTypes: z.array(z.string()).optional(),
  maxFileSizeMB: z.number().int().min(1).max(10000).optional(),
  fileProcessing: z.array(z.string()).optional(),
  fileAccessModel: z.enum(['public', 'private_signed', 'private_proxied', 'mixed']).optional(),
  requiresAI: z.boolean(),
  aiFeatures: z.array(z.string()).optional(),
  aiProvider: z.array(z.string()).optional(),
  aiDataPrivacy: z.enum(['cloud_acceptable', 'opt_in_only', 'anonymized_only', 'no_external_ai']).optional(),
  aiMonthlyCostCeiling: z.enum(['under_100', '100_to_500', '500_to_2k', '2k_to_10k', 'over_10k']).optional(),
  targetFCP: z.enum(['under_1s', '1s_to_2s', '2s_to_3s', 'over_3s']),
  targetApiP95: z.enum(['under_100ms', '100ms_to_300ms', '300ms_to_1s', 'over_1s']),
  peakRPS: z.enum(['under_10', '10_to_100', '100_to_1k', '1k_to_10k', 'over_10k']),
  acceptableDowntimePerMonth: z.enum(['under_5min', 'under_45min', 'under_8hr', 'any']),
  rto: z.enum(['under_15min', '15min_to_1hr', '1hr_to_4hr', '4hr_to_24hr', 'best_effort']),
  rpo: z.enum(['zero', 'under_5min', 'under_1hr', 'under_24hr', 'best_effort']),
  maintenanceWindowsAcceptable: z.boolean(),
  complianceFrameworks: z.array(z.string()).min(1),
  piiDataCollected: z.array(z.string()).min(1),
  encryptionRequirements: z.array(z.string()).min(1),
  securityFeatures: z.array(z.string()).min(1),
  deploymentPlatform: deploymentPlatformSchema,
  managedServicesPreference: z.enum(['managed_only', 'hybrid', 'self_hosted_preferred']),
  coldStartTolerance: z.enum(['zero', 'under_500ms', 'under_2s', 'any']),
  containerizationRequired: z.boolean(),
  monthlyInfrastructureBudget: z.enum(['under_50', '50_to_200', '200_to_500', '500_to_2k', '2k_to_10k', 'over_10k']),
  cloudProviderRestrictions: z.array(z.string()).optional(),
  devTeamSize: z.enum(['solo', 'small', 'medium', 'large', 'enterprise']),
  mvpTimelineDays: z.number().int().min(7).max(730),
  fundingStage: fundingStageSchema,
  priorityRank: z.array(z.enum([
    'speed_to_market', 'scalability', 'security', 'cost_efficiency',
    'developer_experience', 'user_experience', 'maintainability',
  ])).min(1).max(7),
}).superRefine((data, ctx) => {
  // Conditional validations
  if (data.projectType === 'other' && !data.projectTypeDescription) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'projectTypeDescription required when projectType is other', path: ['projectTypeDescription'] });
  }
  if (data.projectStage === 'migrating' || data.projectStage === 'rebuilding') {
    if (!data.existingStack || data.existingStack.length === 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'existingStack required for migrating/rebuilding projects', path: ['existingStack'] });
    }
  }
  if (data.hasTeamAccounts && !data.maxTeamSize) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'maxTeamSize required when hasTeamAccounts is true', path: ['maxTeamSize'] });
  }
  if (data.isMultiTenant) {
    if (!data.tenantIsolationModel) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'tenantIsolationModel required for multi-tenant apps', path: ['tenantIsolationModel'] });
    if (!data.tenantIdentificationMethod) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'tenantIdentificationMethod required for multi-tenant apps', path: ['tenantIdentificationMethod'] });
    if (!data.tenantOnboardingModel) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'tenantOnboardingModel required for multi-tenant apps', path: ['tenantOnboardingModel'] });
    if (!data.crossTenantSharing) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'crossTenantSharing required for multi-tenant apps', path: ['crossTenantSharing'] });
    if (!data.tenantTierModel) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'tenantTierModel required for multi-tenant apps', path: ['tenantTierModel'] });
    if (!data.tenantDataDeletion) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'tenantDataDeletion required for multi-tenant apps', path: ['tenantDataDeletion'] });
    if (!data.tenantDataResidency) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'tenantDataResidency required for multi-tenant apps', path: ['tenantDataResidency'] });
  }
  if ((data.accessControlModel === 'rbac' || data.accessControlModel === 'rbac_with_abac') && (!data.roles || data.roles.length === 0)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'roles required for RBAC access control', path: ['roles'] });
  }
  if (data.requiresRealTime && !data.realTimeProtocol) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'realTimeProtocol required when requiresRealTime is true', path: ['realTimeProtocol'] });
  }
  if (data.requiresBackgroundJobs && !data.jobQueuePreference) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'jobQueuePreference required when requiresBackgroundJobs is true', path: ['jobQueuePreference'] });
  }
  if (data.requiresFileStorage && !data.fileAccessModel) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'fileAccessModel required when requiresFileStorage is true', path: ['fileAccessModel'] });
  }
  if (data.requiresAI && !data.aiDataPrivacy) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'aiDataPrivacy required when requiresAI is true', path: ['aiDataPrivacy'] });
  }
});
```

---

## Decision Matrices

These matrices are used by the pipeline's automated decision engine to resolve ambiguities
and generate the TechStackDoc. They are not for human completion — they document the
logic the pipeline applies.

---

### Matrix 1 — Architecture Archetype Selection

```
INPUT:  fundingStage, mvpTimelineDays, usersAt12Months, stability_score (from PRD)

OUTPUT: archetype (monolith | modular_monolith | microservices)

RULES (evaluated in order; first match wins):
  1. stability_score < 50                    → monolith    (forced)
  2. fundingStage IN [bootstrapped, pre_seed] → monolith    (forced)
  3. mvpTimelineDays < 56                    → monolith    (forced)
  4. devTeamSize IN [solo, small]            → monolith    (forced)
  5. stability_score >= 70
     AND fundingStage IN [series_a, series_b, series_c_plus]
     AND devTeamSize IN [medium, large, enterprise]
     AND usersAt12Months >= 100k_to_1m       → microservices (permitted)
  6. stability_score >= 50
     AND fundingStage IN [seed, series_a]    → modular_monolith (recommended)
  DEFAULT:                                   → monolith
```

---

### Matrix 2 — Database Selection Logic

```
INPUT:  deploymentPlatform, isMultiTenant, tenantIsolationModel, dataVolumeAt12Months,
        complianceFrameworks, managedServicesPreference

OUTPUT: primaryDatabase recommendation

RULES:
  1. deploymentPlatform = vercel
     AND managedServicesPreference = managed_only → neon (primary recommendation)

  2. deploymentPlatform = vercel
     AND tenantIsolationModel = schema_per_tenant  → supabase (schema management)

  3. complianceFrameworks INCLUDES hipaa
     AND managedServicesPreference != self_hosted_preferred → neon or supabase (HIPAA ready)

  4. dataVolumeAt12Months IN [1tb_to_10tb, over_10tb]
     AND deploymentPlatform = aws                 → postgresql on RDS + read replicas

  5. userGeographicDistribution = global
     AND acceptableDowntimePerMonth = under_5min  → cockroachdb or neon multi-region

  6. managedServicesPreference = self_hosted_preferred → postgresql (self-managed)

  DEFAULT: postgresql (managed via Neon for Vercel, standalone otherwise)
```

---

### Matrix 3 — Auth Library Selection Logic

```
INPUT:  fundingStage, devTeamSize, securityFeatures, oauthProviders, mvpTimelineDays,
        complianceFrameworks

OUTPUT: authLibrary recommendation

RULES:
  1. mvpTimelineDays < 28                           → clerk    (fastest to implement)
  2. fundingStage = bootstrapped AND mvpTimelineDays < 56 → clerk or authjs_v5
  3. securityFeatures INCLUDES saml_sso             → clerk_enterprise or auth0
  4. complianceFrameworks INCLUDES hipaa            → authjs_v5 + custom session (full control)
  5. deploymentPlatform = vercel
     AND devTeamSize IN [solo, small]               → authjs_v5 (Vercel-native)
  6. isMultiTenant = true
     AND tenantIsolationModel = database_per_tenant → authjs_v5 + custom tenant session
  DEFAULT: authjs_v5
```

---

### Matrix 4 — Caching Technology Selection

```
INPUT:  deploymentPlatform, requiresRealTime, peakRPS, usersAt12Months

OUTPUT: cacheTechnology recommendation

RULES:
  1. deploymentPlatform = vercel
     AND requiresRealTime = true                    → upstash (Redis + pub/sub on Vercel)
  2. deploymentPlatform = vercel
     AND requiresRealTime = false                   → vercel_kv or upstash
  3. deploymentPlatform IN [railway, render, fly_io]
     AND peakRPS >= 100_to_1k                       → redis (managed; Railway Redis, etc.)
  4. deploymentPlatform IN [aws, gcp, azure]        → redis (ElastiCache, MemoryStore, Cache for Redis)
  5. deploymentPlatform = self_hosted               → redis (self-hosted)
  6. peakRPS < 10_to_100
     AND requiresRealTime = false                   → in_memory (acceptable; no Redis needed)
  DEFAULT: upstash
```

---

### Matrix 5 — Queue Infrastructure Selection

```
INPUT:  deploymentPlatform, backgroundJobTypes, managedServicesPreference

OUTPUT: jobQueuePreference recommendation

RULES:
  1. deploymentPlatform = vercel
     AND backgroundJobTypes INCLUDES any_job_type  → inngest (serverless-native)
  2. deploymentPlatform IN [railway, render, fly_io]
     AND cacheLayerRequired = true (Redis available) → bull_redis (BullMQ)
  3. deploymentPlatform IN [railway, render, fly_io]
     AND cacheLayerRequired = false                 → pg_boss (no Redis dependency)
  4. backgroundJobTypes INCLUDES ai_inference
     OR backgroundJobTypes INCLUDES complex_workflows → temporal
  5. deploymentPlatform IN [aws]                   → aws_sqs
  DEFAULT: inngest (if Vercel), bull_redis (if Redis), pg_boss (otherwise)
```

---

### Matrix 6 — Stability Score Computation

```
INPUT:  All Part 1 intake answers

ALGORITHM:
  base_score = 100

  CRITICAL tensions (-25 pts each):
    - usersAt12Months >= enterprise AND fundingStage = bootstrapped
    - preferredArchitecture = microservices AND mvpTimelineDays < 28
    - preferredArchitecture = microservices AND mvpTimelineDays < 84
    - complianceFrameworks INCLUDES [hipaa, pci_dss, fedramp] AND fundingStage = bootstrapped
    - tenantDataResidency = regional_routing AND fundingStage IN [bootstrapped, pre_seed]
    - acceptableDowntimePerMonth = under_5min AND fundingStage = bootstrapped
    - accessControlModel IN [abac, pbac] AND mvpTimelineDays < 56

  WARNING tensions (-10 pts each):
    - usersAt12Months >= 100k_to_1m AND fundingStage = pre_seed
    - requiresRealTime = true AND deploymentPlatform = vercel (WebSocket constraint)
    - globalAuditTrail = true AND maintenanceWindowsAcceptable = false
    - multipleRolesPerUser = true AND dynamicRoles = true AND devTeamSize IN [solo, small]
    - searchRequirements IN [semantic_search, hybrid] AND fundingStage = bootstrapped
    - requiresAI = true AND aiDataPrivacy = no_external_ai AND fundingStage = bootstrapped

  INFO tensions (-5 pts each):
    - i18nRequired = true AND mvpTimelineDays < 42
    - tenantCustomization INCLUDES custom_fields (EAV complexity warning)
    - fileProcessing INCLUDES video_transcoding (high infrastructure cost)

  final_score = MAX(0, base_score - sum_of_deductions)

RISK CLASSIFICATION:
  75-100: Low Risk
  50-74:  Medium Risk
  25-49:  High Risk
  0-24:   Critical Risk
```

---

## Example Filled Forms

---

### Archetype A — Bootstrap SaaS MVP

**Context:** A solo founder building a project management tool for freelancers.
Bootstrap budget, 8-week MVP timeline, targeting US users initially.

```yaml
meta:
  intakeFormId: "intake_a1b2c3"
  intakeVersion: "1.0.0"
  schemaVersion: "1.0.0"
  submittedAt: "2025-09-01T10:00:00Z"
  submittedBy: "founder@example.com"
  prdReference: null
  status: "SUBMITTED"

# Section 1
projectName: "FreelanceFlow"
projectType: saas_b2c
problemStatement: >
  Freelancers lose 3-5 hours per week switching between Notion, Google Drive,
  and invoicing tools to manage their client projects and payments.
solutionSummary: >
  A unified workspace combining project management, file storage, time tracking,
  and client invoicing in a single Next.js application.
projectStage: greenfield
industry: enterprise_saas
targetGeographies: [us_only]
targetLaunchDate: "2025-11-01T00:00:00Z"

# Section 2
primaryUserType: end_consumers
numberOfRoles: 2
usersAtLaunch: under_100
usersAt12Months: 1k_to_10k
peakConcurrentUsers: under_50
avgSessionDuration: 30min_to_2hr
userGeographicDistribution: single_region
userTechnicalLevel: semi_technical
hasTeamAccounts: false
hasGuestAccess: true

# Section 3
isMultiTenant: false

# Section 4
accessControlModel: ownership_based

# Section 5
coreEntities:
  - name: User
    description: "Freelancer account"
    estimatedRows: under_1k
    writeFrequency: occasional
    readFrequency: frequent
    relationships: [Project, Invoice, Client, TimeEntry]
    requiresAudit: false
    requiresSoftDelete: true
  - name: Project
    description: "A client project being tracked"
    estimatedRows: 1k_10k
    writeFrequency: frequent
    readFrequency: very_frequent
    relationships: [User, Client, Task, File, Invoice]
    requiresAudit: false
    requiresSoftDelete: true
  - name: Invoice
    description: "A billing document sent to a client"
    estimatedRows: 1k_10k
    writeFrequency: occasional
    readFrequency: occasional
    relationships: [User, Project, Client]
    requiresAudit: true
    requiresSoftDelete: false
  - name: Client
    description: "A client who receives invoices"
    estimatedRows: under_1k
    writeFrequency: rare
    readFrequency: frequent
    relationships: [User, Project, Invoice]
    requiresAudit: false
    requiresSoftDelete: true
workloadProfile: balanced
softDeleteRequired: true
globalAuditTrail: false
dataRetentionPolicy:
  defaultRetentionDays: 365
  retentionByEntity:
    - entityName: Invoice
      retentionDays: 2555
  auditLogRetentionDays: 90
  backupRetentionDays: 7
searchRequirements: basic_filter
analyticsRequired: false
dataVolumeAt12Months: under_1gb
backupStrategy: managed_automatic

# Section 6
requiresRealTime: false

# Section 7
requiresBackgroundJobs: true
backgroundJobTypes: [email_sending, scheduled_cron]
jobQueuePreference: inngest
jobRetryStrategy: exponential_backoff
jobFailureHandling: [dead_letter_queue, email_alert]

# Section 8
integrations: [payment_processing, email_delivery, oauth_providers]
paymentDetail:
  provider: stripe
  billingModel: subscription
  currencies: [USD]
  trialPeriodDays: 14
  requiresInvoicing: false
  taxHandling: stripe_tax

# Section 9
requiresFileStorage: true
acceptedFileTypes: [images, documents]
maxFileSizeMB: 25
fileProcessing: [image_resize]
fileAccessModel: private_signed

# Section 10
requiresAI: false

# Section 11
targetFCP: 1s_to_2s
targetApiP95: 100ms_to_300ms
peakRPS: under_10
acceptableDowntimePerMonth: under_8hr

# Section 12
rto: 1hr_to_4hr
rpo: under_24hr
maintenanceWindowsAcceptable: true

# Section 13
complianceFrameworks: [none]
piiDataCollected: [name, email, address]
encryptionRequirements: [encryption_at_rest, encryption_in_transit]
securityFeatures: [brute_force_protection, security_headers]

# Section 14
deploymentPlatform: vercel
managedServicesPreference: managed_only
coldStartTolerance: under_2s
containerizationRequired: false
monthlyInfrastructureBudget: 50_to_200

# Section 15
devTeamSize: solo
mvpTimelineDays: 56
fundingStage: bootstrapped
priorityRank: [speed_to_market, cost_efficiency, user_experience]

# Part 2
renderingStrategy: hybrid
seoRequired: true
staticExportRequired: false
nextjsRouterType: app_router
rscUsageModel: server_first
middlewareRequirements: [auth_protection, logging]
i18nRequired: false
themingRequired: dark_mode
apiArchitecture: rest_and_trpc
apiVersioningStrategy: no_versioning
apiAuthMethod: [session_cookie]
rateLimitingStrategy: user_based
outboundWebhooks: false
useResponseEnvelope: true
primaryDatabase: neon
ormChoice: prisma
readReplicaRequired: false
connectionPooling: neon_pooler
migrationStrategy: prisma_migrate
seedingStrategy: prisma_seed
multiDatabaseSupport: false
cacheLayerRequired: false
messageQueueRequired: true
queuePattern: simple_queue
authLibrary: authjs_v5
oauthProviders: [email_password, google]
sessionStrategy: jwt
jwtConfig:
  accessTokenExpiry: "1h"
  refreshTokenExpiry: "30d"
  algorithm: HS512
  rotateRefreshTokens: true
objectStorageProvider: cloudflare_r2
uploadStrategy: client_direct
loggingProvider: axiom
errorTrackingProvider: sentry
apmProvider: vercel_analytics
metricsAndAlerting:
  metricsProvider: none
  alertingProvider: email
  alertThresholds:
    - metric: error_rate
      threshold: 0.05
      severity: warning
openTelemetryRequired: false
cicdPlatform: github_actions
branchStrategy: github_flow
deploymentStrategy: rolling
ciChecks: [type_check, unit_tests, lint, security_scan]
environments: [development, preview, production]
testingLayers: [unit, integration, e2e]
testingFrameworks:
  unitFramework: vitest
  componentFramework: testing_library
  e2eFramework: playwright
  mockingLibrary: msw
coverageTargets:
  overall: 60
  domain: 85
  services: 70
  repositories: 50
  apiRoutes: 60
  components: 40
e2eTestScope: [authentication_flow, core_feature_flow, payment_flow]
testDataStrategy: docker_db
continuousTestingInCI: true
```

**Expected Pipeline Output:**
- Stability Score: 90/100 (Low Risk)
- Archetype: Monolith (bootstrap + solo developer)
- Stack: Next.js App Router + Neon + Prisma + Auth.js v5 + Cloudflare R2 + Inngest + Axiom + Sentry

---

### Archetype B — Series-A B2B Platform

**Context:** A 12-person team building a B2B project intelligence platform.
Series-A funded ($8M), 4-month timeline, multi-tenant with RBAC.

```yaml
meta:
  intakeFormId: "intake_b2c3d4"
  intakeVersion: "1.0.0"
  schemaVersion: "1.0.0"
  submittedAt: "2025-09-01T10:00:00Z"
  submittedBy: "cto@projectintel.io"
  prdReference: null
  status: "SUBMITTED"

# Section 1
projectName: "ProjectIntel"
projectType: saas_b2b
problemStatement: >
  Engineering managers at mid-size tech companies (50-500 engineers) lack
  visibility into project health, team velocity, and delivery risk across
  multiple squads using different tools (Jira, Linear, GitHub, Slack).
solutionSummary: >
  A multi-tenant SaaS platform that aggregates data from engineering tools,
  generates weekly project health reports, detects delivery risk signals,
  and provides actionable insights to engineering managers and executives.
projectStage: greenfield
industry: devtools
targetGeographies: [us_and_eu]
targetLaunchDate: "2026-01-15T00:00:00Z"

# Section 2
primaryUserType: business_employees
numberOfRoles: 5
usersAtLaunch: 100_to_1k
usersAt12Months: 10k_to_100k
peakConcurrentUsers: 500_to_5k
avgSessionDuration: 30min_to_2hr
userGeographicDistribution: multi_region
userTechnicalLevel: technical
hasTeamAccounts: true
maxTeamSize: 50_to_500
hasGuestAccess: false

# Section 3
isMultiTenant: true
tenantIsolationModel: shared_schema
tenantIdentificationMethod: subdomain
tenantOnboardingModel: self_service
tenantCustomization: [branding, feature_flags, webhooks, sso_config]
crossTenantSharing: none
tenantTierModel: tiered_pricing
tenantsAtLaunch: 10_to_100
tenantsAt12Months: 100_to_1k
tenantDataDeletion: grace_period
tenantAdminCapabilities: [user_management, role_assignment, billing_management, audit_log_access, webhook_management, sso_configuration]
tenantDataResidency: no_requirement

# Section 4
accessControlModel: rbac
roles:
  - name: super_admin
    description: "Platform-level operator; full system access"
    scope: platform
    isDefault: false
    isSuperAdmin: true
  - name: org_admin
    description: "Manages org settings, users, and billing"
    scope: tenant
    isDefault: false
    isSuperAdmin: false
  - name: eng_manager
    description: "Access to all team reports and risk signals"
    scope: tenant
    isDefault: false
    isSuperAdmin: false
  - name: team_lead
    description: "Access to their team's data only"
    scope: tenant
    isDefault: true
    isSuperAdmin: false
  - name: viewer
    description: "Read-only access to reports"
    scope: tenant
    isDefault: false
    isSuperAdmin: false
roleHierarchy: strict_hierarchy
permissionGranularity: action_level
dynamicRoles: false
superAdminBypassesChecks: true
rolesAreTenantScoped: true
multipleRolesPerUser: false
roleAssignmentRequiresApproval: false
ownershipOverride: false

# Section 5
coreEntities:
  - name: Organization
    description: "A tenant company"
    estimatedRows: 1k_10k
    writeFrequency: rare
    readFrequency: frequent
    relationships: [User, Subscription, Integration, Report]
    requiresAudit: true
    requiresSoftDelete: true
  - name: User
    description: "An engineering team member"
    estimatedRows: 100k_1m
    writeFrequency: occasional
    readFrequency: very_frequent
    relationships: [Organization, Role, Report]
    requiresAudit: true
    requiresSoftDelete: true
  - name: Integration
    description: "A connected external tool (Jira, GitHub, etc.)"
    estimatedRows: 10k_100k
    writeFrequency: rare
    readFrequency: frequent
    relationships: [Organization, DataSync]
    requiresAudit: true
    requiresSoftDelete: false
  - name: Report
    description: "A generated project health report"
    estimatedRows: over_1m
    writeFrequency: frequent
    readFrequency: very_frequent
    relationships: [Organization, User, RiskSignal]
    requiresAudit: false
    requiresSoftDelete: true
  - name: RiskSignal
    description: "A detected delivery risk indicator"
    estimatedRows: over_1m
    writeFrequency: very_frequent
    readFrequency: frequent
    relationships: [Report, Organization]
    requiresAudit: false
    requiresSoftDelete: false
workloadProfile: read_heavy
softDeleteRequired: true
globalAuditTrail: true
dataRetentionPolicy:
  defaultRetentionDays: 365
  retentionByEntity:
    - entityName: AuditLog
      retentionDays: 730
    - entityName: Report
      retentionDays: 730
  auditLogRetentionDays: 730
  backupRetentionDays: 30
searchRequirements: full_text_search
analyticsRequired: true
dbIsolationPerTenant: row_level_security
dataVolumeAt12Months: 10gb_to_100gb
backupStrategy: wal_streaming

# Section 6
requiresRealTime: true
realTimeFeatures: [live_dashboard, live_notifications]
realTimeProtocol: server_sent_events
realTimeScale: 100_to_1k_concurrent
realTimeDeliveryGuarantee: at_least_once

# Section 7
requiresBackgroundJobs: true
backgroundJobTypes: [scheduled_cron, event_driven, data_sync, report_generation, email_sending, webhook_delivery]
jobQueuePreference: inngest
jobRetryStrategy: exponential_backoff
jobFailureHandling: [dead_letter_queue, slack_alert, circuit_breaker, dashboard_monitoring]

# Section 8
integrations: [email_delivery, oauth_providers, saml_sso, analytics, error_tracking, logging, feature_flags, webhooks_inbound]
inboundWebhookSources: ["GitHub repository events", "Linear issue events", "Jira project events"]

# Section 9
requiresFileStorage: true
acceptedFileTypes: [images, documents, data_files]
maxFileSizeMB: 50
fileProcessing: [none]
fileAccessModel: private_signed

# Section 10
requiresAI: true
aiFeatures: [text_generation, data_extraction, sentiment_analysis]
aiProvider: [anthropic]
aiDataPrivacy: cloud_acceptable
aiMonthlyCostCeiling: 500_to_2k

# Section 11
targetFCP: 1s_to_2s
targetApiP95: 100ms_to_300ms
peakRPS: 100_to_1k
acceptableDowntimePerMonth: under_45min

# Section 12
rto: 15min_to_1hr
rpo: under_1hr
maintenanceWindowsAcceptable: false

# Section 13
complianceFrameworks: [gdpr, soc2_type1]
piiDataCollected: [name, email, behavioral_data]
encryptionRequirements: [encryption_at_rest, encryption_in_transit, field_level_encryption]
securityFeatures: [mfa, sso_saml, brute_force_protection, security_headers, vulnerability_scanning, session_management]

# Section 14
deploymentPlatform: vercel
managedServicesPreference: managed_only
coldStartTolerance: under_500ms
containerizationRequired: false
monthlyInfrastructureBudget: 2k_to_10k

# Section 15
devTeamSize: medium
mvpTimelineDays: 120
fundingStage: series_a
priorityRank: [scalability, security, user_experience, speed_to_market]

# Part 2
renderingStrategy: hybrid
seoRequired: false
staticExportRequired: false
nextjsRouterType: app_router
rscUsageModel: server_first
middlewareRequirements: [auth_protection, tenant_resolution, rate_limiting, logging]
i18nRequired: false
themingRequired: tenant_theming
apiArchitecture: rest_and_trpc
apiVersioningStrategy: url_versioning
apiAuthMethod: [session_cookie, api_key]
rateLimitingStrategy: tenant_based
apiDocumentation: openapi_auto
outboundWebhooks: true
useResponseEnvelope: true
primaryDatabase: neon
ormChoice: prisma
readReplicaRequired: true
connectionPooling: neon_pooler
migrationStrategy: expand_contract
seedingStrategy: factory_pattern
multiDatabaseSupport: false
cacheLayerRequired: true
cacheTechnology: upstash
cacheTargets: [database_queries, user_permissions, rate_limit_counters, feature_flags, pubsub_channels]
cacheInvalidationStrategy: hybrid
nextjsDataCache: per_route
messageQueueRequired: true
queuePattern: work_queue
authLibrary: authjs_v5
oauthProviders: [email_password, google, github, microsoft, saml]
sessionStrategy: database
objectStorageProvider: cloudflare_r2
uploadStrategy: client_direct
loggingProvider: axiom
errorTrackingProvider: sentry
apmProvider: datadog
metricsAndAlerting:
  metricsProvider: datadog
  alertingProvider: pagerduty
  alertThresholds:
    - metric: error_rate
      threshold: 0.01
      severity: critical
    - metric: p95_latency_ms
      threshold: 500
      severity: warning
    - metric: queue_depth
      threshold: 1000
      severity: warning
openTelemetryRequired: true
cicdPlatform: github_actions
branchStrategy: trunk_based
deploymentStrategy: blue_green
ciChecks: [type_check, unit_tests, integration_tests, e2e_tests, lint, security_scan, bundle_analysis, db_migration_check]
environments: [development, preview, staging, production]
testingLayers: [unit, integration, component, e2e, performance]
testingFrameworks:
  unitFramework: vitest
  componentFramework: testing_library
  e2eFramework: playwright
  mockingLibrary: msw
coverageTargets:
  overall: 75
  domain: 90
  services: 85
  repositories: 65
  apiRoutes: 75
  components: 55
e2eTestScope: [authentication_flow, onboarding_flow, core_feature_flow, admin_flow]
testDataStrategy: docker_db
continuousTestingInCI: true
```

**Expected Pipeline Output:**
- Stability Score: 75/100 (Low Risk)
- Archetype: Modular Monolith
- Stack: Next.js App Router + Neon (multi-region) + Prisma + Auth.js v5 + Upstash Redis +
  Inngest + Cloudflare R2 + Axiom + Sentry + Datadog APM + OpenTelemetry

---

### Archetype C — Enterprise Compliance Platform

**Context:** A 35-person team building a healthcare compliance platform.
Series-B funded ($30M), HIPAA compliance required, multi-tenant, 6-month timeline.
No cold starts, 99.9% uptime, strict data residency.

```yaml
meta:
  intakeFormId: "intake_c3d4e5"
  intakeVersion: "1.0.0"
  schemaVersion: "1.0.0"
  submittedAt: "2025-09-01T10:00:00Z"
  submittedBy: "cto@complianceos.health"
  prdReference: null
  status: "SUBMITTED"

projectName: "ComplianceOS"
projectType: saas_b2b
problemStatement: >
  Hospital compliance officers at mid-size US healthcare systems (500-5000 staff)
  spend 20+ hours per week manually tracking HIPAA compliance tasks across
  departments using spreadsheets and email chains, creating audit risk.
solutionSummary: >
  A HIPAA-compliant multi-tenant SaaS platform that automates compliance task
  assignment, tracking, evidence collection, and audit trail generation for
  healthcare organizations, with role-based access for compliance officers,
  department managers, and auditors.
projectStage: greenfield
industry: healthtech
targetGeographies: [us_only]
targetLaunchDate: "2026-03-01T00:00:00Z"
primaryUserType: business_employees
numberOfRoles: 6
usersAtLaunch: 1k_to_10k
usersAt12Months: 10k_to_100k
peakConcurrentUsers: 500_to_5k
avgSessionDuration: 30min_to_2hr
userGeographicDistribution: single_region
userTechnicalLevel: semi_technical
hasTeamAccounts: true
maxTeamSize: 500_to_5k
hasGuestAccess: false
isMultiTenant: true
tenantIsolationModel: schema_per_tenant
tenantIdentificationMethod: subdomain
tenantOnboardingModel: sales_assisted
tenantCustomization: [branding, feature_flags, sso_config, audit_log_access]
crossTenantSharing: none
tenantTierModel: custom
tenantsAtLaunch: under_10
tenantsAt12Months: 10_to_100
tenantDataDeletion: export_then_delete
tenantDataResidency: us_only
accessControlModel: rbac_with_abac
roles:
  - name: platform_admin
    description: "ComplianceOS engineering/ops; full system access"
    scope: platform
    isDefault: false
    isSuperAdmin: true
  - name: compliance_officer
    description: "Hospital compliance team; full access within their org"
    scope: tenant
    isDefault: false
    isSuperAdmin: false
  - name: department_manager
    description: "Manages compliance tasks for their department only"
    scope: tenant
    isDefault: false
    isSuperAdmin: false
  - name: staff_member
    description: "Receives and completes assigned compliance tasks"
    scope: tenant
    isDefault: true
    isSuperAdmin: false
  - name: external_auditor
    description: "Read-only access to audit evidence; time-limited access"
    scope: tenant
    isDefault: false
    isSuperAdmin: false
  - name: it_admin
    description: "Manages SSO, user provisioning; no compliance data access"
    scope: tenant
    isDefault: false
    isSuperAdmin: false
roleHierarchy: flat
permissionGranularity: action_level
dynamicRoles: false
superAdminBypassesChecks: false
rolesAreTenantScoped: true
multipleRolesPerUser: false
roleAssignmentRequiresApproval: true
ownershipOverride: false
abacAttributes:
  - name: user.department
    source: user
    type: string
    example: "radiology"
  - name: task.assigned_department
    source: resource
    type: string
    example: "radiology"
  - name: user.employment_status
    source: user
    type: enum
    example: "active"
  - name: environment.audit_mode
    source: environment
    type: boolean
    example: false
abacPolicies:
  - id: POL-001
    description: "Department managers can only access tasks in their department"
    effect: allow
    condition: "role === 'department_manager' AND user.department === task.assigned_department"
    priority: 10
  - id: POL-002
    description: "Terminated employees cannot access any data"
    effect: deny
    condition: "user.employment_status === 'terminated'"
    priority: 1
  - id: POL-003
    description: "External auditors can only access pre-approved evidence packages"
    effect: allow
    condition: "role === 'external_auditor' AND resource.type === 'audit_evidence_package'"
    priority: 10
abacConflictResolution: deny_overrides
abacPolicyManagement: static_developer
softDeleteRequired: true
globalAuditTrail: true
dataRetentionPolicy:
  defaultRetentionDays: 2555
  retentionByEntity:
    - entityName: AuditLog
      retentionDays: 2555
    - entityName: ComplianceEvidence
      retentionDays: 2555
    - entityName: UserActivity
      retentionDays: 365
  auditLogRetentionDays: 2555
  backupRetentionDays: 90
searchRequirements: full_text_search
analyticsRequired: true
dbIsolationPerTenant: schema_level
dataVolumeAt12Months: 10gb_to_100gb
backupStrategy: wal_streaming
requiresRealTime: true
realTimeFeatures: [live_notifications, live_dashboard]
realTimeProtocol: server_sent_events
realTimeScale: 100_to_1k_concurrent
realTimeDeliveryGuarantee: at_least_once
requiresBackgroundJobs: true
backgroundJobTypes: [scheduled_cron, event_driven, report_generation, email_sending, notification_delivery, cleanup, billing_calculation]
jobQueuePreference: inngest
jobRetryStrategy: exponential_backoff
jobFailureHandling: [dead_letter_queue, email_alert, slack_alert, circuit_breaker, dashboard_monitoring]
integrations: [email_delivery, saml_sso, analytics, error_tracking, logging]
requiresFileStorage: true
acceptedFileTypes: [images, documents, data_files]
maxFileSizeMB: 100
fileProcessing: [virus_scanning, pdf_extraction, metadata_extraction]
fileAccessModel: private_proxied
requiresAI: true
aiFeatures: [text_generation, data_extraction, classification]
aiProvider: [azure_openai]
aiDataPrivacy: no_external_ai
aiMonthlyCostCeiling: 500_to_2k
targetFCP: 1s_to_2s
targetApiP95: 100ms_to_300ms
peakRPS: 100_to_1k
acceptableDowntimePerMonth: under_45min
rto: 15min_to_1hr
rpo: under_5min
maintenanceWindowsAcceptable: false
complianceFrameworks: [hipaa, soc2_type2, wcag_aa]
piiDataCollected: [name, email, health_data, behavioral_data]
encryptionRequirements: [encryption_at_rest, encryption_in_transit, field_level_encryption, key_management_service]
securityFeatures: [mfa, sso_saml, sso_oidc, session_management, password_policies, brute_force_protection, security_headers, vulnerability_scanning, intrusion_detection, ddos_protection]
deploymentPlatform: aws
managedServicesPreference: managed_only
coldStartTolerance: zero
containerizationRequired: true
monthlyInfrastructureBudget: 2k_to_10k
cloudProviderRestrictions: ["Must stay within AWS us-east-1 and us-west-2 only"]
devTeamSize: large
mvpTimelineDays: 180
fundingStage: series_b
priorityRank: [security, scalability, maintainability, user_experience]
renderingStrategy: hybrid
seoRequired: false
staticExportRequired: false
nextjsRouterType: app_router
rscUsageModel: server_first
middlewareRequirements: [auth_protection, tenant_resolution, rate_limiting, logging, security_headers]
i18nRequired: false
themingRequired: tenant_theming
apiArchitecture: rest
apiVersioningStrategy: url_versioning
apiAuthMethod: [session_cookie, api_key, oauth2_client_creds]
rateLimitingStrategy: tenant_based
apiDocumentation: openapi_auto
outboundWebhooks: false
useResponseEnvelope: true
primaryDatabase: postgresql
ormChoice: prisma
readReplicaRequired: true
connectionPooling: pgbouncer
migrationStrategy: expand_contract
seedingStrategy: factory_pattern
multiDatabaseSupport: false
cacheLayerRequired: true
cacheTechnology: redis
cacheTargets: [database_queries, user_permissions, session_data, rate_limit_counters]
cacheInvalidationStrategy: event_based
nextjsDataCache: per_route
messageQueueRequired: true
queuePattern: work_queue
authLibrary: authjs_v5
oauthProviders: [email_password, microsoft, saml]
sessionStrategy: database
mfaConfig:
  methods: [totp, backup_codes]
  enforcement: required_for_all
  gracePeriodDays: 7
objectStorageProvider: aws_s3
uploadStrategy: client_direct
loggingProvider: datadog
errorTrackingProvider: datadog
apmProvider: datadog
metricsAndAlerting:
  metricsProvider: datadog
  alertingProvider: pagerduty
  alertThresholds:
    - metric: error_rate
      threshold: 0.005
      severity: critical
    - metric: p95_latency_ms
      threshold: 300
      severity: warning
    - metric: failed_auth_attempts
      threshold: 10
      severity: critical
    - metric: hipaa_audit_log_gap
      threshold: 60
      severity: critical
openTelemetryRequired: true
cicdPlatform: github_actions
branchStrategy: github_flow
deploymentStrategy: blue_green
ciChecks: [type_check, unit_tests, integration_tests, e2e_tests, lint, format_check, security_scan, bundle_analysis, lighthouse, docker_build, db_migration_check]
environments: [development, preview, staging, production]
testingLayers: [unit, integration, component, e2e, visual, performance, contract]
testingFrameworks:
  unitFramework: vitest
  componentFramework: testing_library
  e2eFramework: playwright
  mockingLibrary: msw
coverageTargets:
  overall: 85
  domain: 95
  services: 90
  repositories: 75
  apiRoutes: 85
  components: 65
e2eTestScope: [authentication_flow, onboarding_flow, core_feature_flow, admin_flow, accessibility]
testDataStrategy: docker_db
continuousTestingInCI: true
```

**Expected Pipeline Output:**
- Stability Score: 68/100 (Medium Risk — schema_per_tenant complexity + HIPAA + series_b)
- Archetype: Modular Monolith
- Stack: Next.js App Router + PostgreSQL (AWS RDS Multi-AZ) + Prisma + PgBouncer +
  Auth.js v5 + Redis (ElastiCache) + AWS S3 + Inngest + Datadog + OpenTelemetry + Azure OpenAI

---

## Intake Form Version History

```
Version 1.0.0 — Initial release
  Added: All 25 sections covering general requirements + tech stack questionnaire
  Added: TypeScript interfaces for IntakeForm
  Added: Zod validation schemas with cross-field validation
  Added: Decision matrices for architecture, DB, auth, cache, queue selection
  Added: Three example filled forms (Bootstrap, Series-A, Enterprise)
  Framework: Next.js (primary and only supported framework in v1.0.0)
  Status: ACTIVE

Planned: Version 1.1.0
  - Add mobile app (React Native) tech stack questionnaire as Part 2B
  - Add data pipeline / ETL requirements section
  - Add multi-region active-active deployment requirements
  - Add API gateway section for external API products
  - Add white-labeling section for OEM/reseller scenarios
```

---

*End of REQUIREMENTS_INTAKE.md — Document 1 of 4*
*Next: See `PRD_GENERATION.md` for Phase 1 — PRD generation algorithm and approval workflow.*
