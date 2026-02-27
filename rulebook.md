# THE COMPLETE NEXT.JS PRODUCTION RULEBOOK
## AI Coding Agent Constitution · CTO-Level Engineering Standards
### Version 3.0 — The Definitive Guide for AI-Assisted Production Codebases

> **PURPOSE:** This document is the single source of truth for any AI coding agent, intern, or engineer building a Next.js production system. Treat every rule as a **hard constraint** unless explicitly overridden with a documented reason. Following these rules produces codebases that are secure, maintainable, testable, and scalable without rewriting from scratch.

---

## TABLE OF CONTENTS

### PART 0 — AGENT CONSTITUTION
- [0.1 How to Use This Document](#01-how-to-use-this-document)
- [0.2 The Agent Operating Protocol (The Loop)](#02-the-agent-operating-protocol-the-loop)
- [0.3 Quality Gates](#03-quality-gates)
- [0.4 Evaluation Metrics & Scoring](#04-evaluation-metrics--scoring)
- [0.5 Anti-Duplication Protocol](#05-anti-duplication-protocol)

### PART 1 — PRD TO TECH STACK DECISION FRAMEWORK
- [1.1 PRD Analysis Protocol](#11-prd-analysis-protocol)
- [1.2 Tech Stack Decision Matrix](#12-tech-stack-decision-matrix)
- [1.3 Database Selection Rules](#13-database-selection-rules)
- [1.4 Auth Provider Selection Rules](#14-auth-provider-selection-rules)
- [1.5 Rendering Strategy Selection](#15-rendering-strategy-selection)
- [1.6 Infrastructure Selection](#16-infrastructure-selection)
- [1.7 Third-Party Service Selection](#17-third-party-service-selection)
- [1.8 HLD Template](#18-hld-template)
- [1.9 LLD Template](#19-lld-template)

### PART 2 — PROJECT ARCHITECTURE & FOLDER STRUCTURE
- [2.1 Canonical Folder Structure](#21-canonical-folder-structure)
- [2.2 File Naming Rules](#22-file-naming-rules)
- [2.3 Module Boundary Rules](#23-module-boundary-rules)
- [2.4 Barrel Export Rules](#24-barrel-export-rules)
- [2.5 Domain Module Pattern](#25-domain-module-pattern)

### PART 3 — CODE QUALITY & LINTING RULES
- [3.1 TypeScript Rules](#31-typescript-rules)
- [3.2 ESLint Configuration](#32-eslint-configuration)
- [3.3 Prettier Configuration](#33-prettier-configuration)
- [3.4 Import Order Rules](#34-import-order-rules)
- [3.5 Dead Code Rules](#35-dead-code-rules)
- [3.6 Complexity Rules](#36-complexity-rules)
- [3.7 Comment Rules](#37-comment-rules)
- [3.8 Magic Number & Constant Rules](#38-magic-number--constant-rules)

### PART 4 — SCHEMA & DATA DESIGN RULES
- [4.1 Database Schema Design Checklist](#41-database-schema-design-checklist)
- [4.2 Prisma Schema Rules](#42-prisma-schema-rules)
- [4.3 Naming Conventions for DB Objects](#43-naming-conventions-for-db-objects)
- [4.4 Index Design Rules](#44-index-design-rules)
- [4.5 Migration Rules](#45-migration-rules)
- [4.6 Soft Delete Rules](#46-soft-delete-rules)
- [4.7 Audit Log Pattern](#47-audit-log-pattern)

### PART 5 — DTO, VALIDATION & TYPE SYSTEM RULES
- [5.1 DTO Definition Rules (No Duplicates)](#51-dto-definition-rules-no-duplicates)
- [5.2 Zod Schema Rules](#52-zod-schema-rules)
- [5.3 Type Inference Rules](#53-type-inference-rules)
- [5.4 Response Type Rules](#54-response-type-rules)
- [5.5 Enum Rules](#55-enum-rules)

### PART 6 — REPOSITORY PATTERN RULES
- [6.1 Repository Layer Rules](#61-repository-layer-rules)
- [6.2 No Duplicate Repository Logic](#62-no-duplicate-repository-logic)
- [6.3 Query Builder Rules](#63-query-builder-rules)
- [6.4 Transaction Rules](#64-transaction-rules)
- [6.5 Pagination Rules](#65-pagination-rules)

### PART 7 — SERVICE LAYER RULES
- [7.1 Service Layer Responsibility](#71-service-layer-responsibility)
- [7.2 No Duplicate Service Logic](#72-no-duplicate-service-logic)
- [7.3 Service Composition Rules](#73-service-composition-rules)
- [7.4 Error Handling in Services](#74-error-handling-in-services)
- [7.5 Side Effect Management](#75-side-effect-management)

### PART 8 — API LAYER RULES
- [8.1 Route Handler Rules](#81-route-handler-rules)
- [8.2 Server Action Rules](#82-server-action-rules)
- [8.3 Response Format Standards](#83-response-format-standards)
- [8.4 Error Response Standards](#84-error-response-standards)
- [8.5 Rate Limiting Rules](#85-rate-limiting-rules)
- [8.6 Input Sanitization Rules](#86-input-sanitization-rules)

### PART 9 — AUTHENTICATION & AUTHORIZATION RULES
- [9.1 Authentication Architecture Decision](#91-authentication-architecture-decision)
- [9.2 NextAuth.js Rules](#92-nextauthjs-rules)
- [9.3 JWT Rules](#93-jwt-rules)
- [9.4 Session Management Rules](#94-session-management-rules)
- [9.5 Role-Based Access Control (RBAC)](#95-role-based-access-control-rbac)
- [9.6 Attribute-Based Access Control (ABAC)](#96-attribute-based-access-control-abac)
- [9.7 Middleware & Route Protection Rules](#97-middleware--route-protection-rules)
- [9.8 Permission Checking Rules](#98-permission-checking-rules)
- [9.9 Multi-Tenant Auth Rules](#99-multi-tenant-auth-rules)
- [9.10 API Key Auth Rules](#910-api-key-auth-rules)
- [9.11 OAuth / Social Login Rules](#911-oauth--social-login-rules)
- [9.12 MFA Rules](#912-mfa-rules)

### PART 10 — COMPONENT RULES
- [10.1 Server vs Client Component Decision Tree](#101-server-vs-client-component-decision-tree)
- [10.2 Component Design Rules](#102-component-design-rules)
- [10.3 Prop Rules](#103-prop-rules)
- [10.4 Composition Rules](#104-composition-rules)
- [10.5 Form Component Rules](#105-form-component-rules)

### PART 11 — STATE MANAGEMENT RULES
- [11.1 State Placement Decision Tree](#111-state-placement-decision-tree)
- [11.2 URL State Rules](#112-url-state-rules)
- [11.3 Server State Rules (React Query / SWR)](#113-server-state-rules-react-query--swr)
- [11.4 Global State Rules (Zustand)](#114-global-state-rules-zustand)

### PART 12 — TESTING RULES
- [12.1 Testing Strategy & Coverage Requirements](#121-testing-strategy--coverage-requirements)
- [12.2 Unit Test Rules](#122-unit-test-rules)
- [12.3 Integration Test Rules](#123-integration-test-rules)
- [12.4 E2E Test Rules](#124-e2e-test-rules)
- [12.5 Test Data Rules](#125-test-data-rules)
- [12.6 Mock & Stub Rules](#126-mock--stub-rules)

### PART 13 — SECURITY RULES
- [13.1 Input Validation Rules](#131-input-validation-rules)
- [13.2 SQL Injection Prevention](#132-sql-injection-prevention)
- [13.3 XSS Prevention Rules](#133-xss-prevention-rules)
- [13.4 CSRF Prevention Rules](#134-csrf-prevention-rules)
- [13.5 Secrets Management Rules](#135-secrets-management-rules)
- [13.6 Security Headers Rules](#136-security-headers-rules)
- [13.7 Dependency Security Rules](#137-dependency-security-rules)

### PART 14 — PERFORMANCE RULES
- [14.1 Core Web Vitals Targets](#141-core-web-vitals-targets)
- [14.2 Image Optimization Rules](#142-image-optimization-rules)
- [14.3 Bundle Optimization Rules](#143-bundle-optimization-rules)
- [14.4 Caching Strategy Rules](#144-caching-strategy-rules)
- [14.5 Database Query Performance Rules](#145-database-query-performance-rules)

### PART 15 — OBSERVABILITY RULES
- [15.1 Logging Rules](#151-logging-rules)
- [15.2 Error Tracking Rules](#152-error-tracking-rules)
- [15.3 Metrics Rules](#153-metrics-rules)
- [15.4 Distributed Tracing Rules](#154-distributed-tracing-rules)
- [15.5 Alerting Rules](#155-alerting-rules)

### PART 16 — CI/CD & DEPLOYMENT RULES
- [16.1 CI Pipeline Rules](#161-ci-pipeline-rules)
- [16.2 CD Pipeline Rules](#162-cd-pipeline-rules)
- [16.3 Environment Rules](#163-environment-rules)
- [16.4 Feature Flag Rules](#164-feature-flag-rules)
- [16.5 Database Migration in CD](#165-database-migration-in-cd)

### PART 17 — ADVANCED PATTERNS
- [17.1 Multi-Tenancy Rules](#171-multi-tenancy-rules)
- [17.2 Background Job Rules](#172-background-job-rules)
- [17.3 File Storage Rules](#173-file-storage-rules)
- [17.4 Real-Time Feature Rules](#174-real-time-feature-rules)
- [17.5 Internationalization Rules](#175-internationalization-rules)
- [17.6 Email Service Rules](#176-email-service-rules)
- [17.7 Payment Integration Rules](#177-payment-integration-rules)
- [17.8 Search Rules](#178-search-rules)

### APPENDICES
- [Appendix A: Decision Flowcharts](#appendix-a-decision-flowcharts)
- [Appendix B: Anti-Pattern Catalog](#appendix-b-anti-pattern-catalog)
- [Appendix C: Code Review Checklist](#appendix-c-code-review-checklist)
- [Appendix D: Prompt Templates for Agents](#appendix-d-prompt-templates-for-agents)

---


---

# PART 0 — AGENT CONSTITUTION

## 0.1 How to Use This Document

This document is **executable law** for any AI coding agent, software engineer, or intern building a Next.js application. Every rule has a **severity level**:

| Level | Symbol | Meaning |
|-------|--------|---------|
| HARD | 🔴 | Never violate. Zero exceptions. Automatic PR rejection. |
| STRONG | 🟠 | Violate only with written architectural justification committed to the repo. |
| RECOMMENDED | 🟡 | Default. Override when you have a concrete technical reason. |
| OPTIONAL | 🟢 | Best practice. Apply when time allows. |

**Before writing any code**, the agent MUST:
1. Read Part 0 completely (this section) — understand the operating loop
2. Read Part 1 — understand the tech stack decision framework for the given PRD
3. Read the relevant Parts for the feature being built
4. Execute the Anti-Duplication Protocol (Section 0.5) — search existing code before writing any new file
5. Only then write code, following the rules

---

## 0.2 The Agent Operating Protocol (The Loop)

This is the exact decision loop every AI coding agent MUST follow on every task:

```
┌─────────────────────────────────────────────────────────────────────┐
│                      AGENT OPERATING LOOP                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  INPUT: Task Description / PRD / Feature Request                   │
│                                                                     │
│  PHASE 1: UNDERSTAND                                                │
│  ─────────────────────────────────────────────────────────────────  │
│  1.1 Parse the input. Extract:                                      │
│       - What entities/models are involved?                         │
│       - What user roles interact with this?                        │
│       - What are the input/output boundaries?                      │
│       - What are the edge cases mentioned or implied?              │
│       - What are the performance requirements (explicit/implicit)? │
│       - What are the security requirements?                        │
│                                                                     │
│  1.2 Classify the task type:                                        │
│       [ ] New feature (greenfield)                                 │
│       [ ] Feature extension (existing domain)                      │
│       [ ] Bug fix                                                  │
│       [ ] Refactor                                                 │
│       [ ] Performance optimization                                 │
│       [ ] Security fix                                             │
│                                                                     │
│  PHASE 2: EXPLORE (Run before writing ANY code)                     │
│  ─────────────────────────────────────────────────────────────────  │
│  2.1 Map the existing codebase:                                     │
│       - List all existing domain modules: src/modules/*/           │
│       - List all existing types/DTOs: src/types/*, src/**/dto.*    │
│       - List all existing services: src/**/service.*               │
│       - List all existing repositories: src/**/repository.*        │
│       - List all existing validators/schemas: src/**/schema.*      │
│       - List all existing route handlers: src/app/api/**/route.ts  │
│       - List all existing server actions: src/**/actions.ts        │
│                                                                     │
│  2.2 Execute Anti-Duplication Check (see 0.5):                     │
│       - Search for existing code that matches the new feature      │
│       - If found: REUSE. If not found: CREATE new.                 │
│       - NEVER CREATE a second file that does what the first does.  │
│                                                                     │
│  2.3 Identify dependencies:                                         │
│       - What existing services does this feature need?             │
│       - What existing types can be reused or extended?             │
│       - What DB tables/models are affected?                        │
│                                                                     │
│  PHASE 3: DESIGN                                                    │
│  ─────────────────────────────────────────────────────────────────  │
│  3.1 Write the LLD FIRST (see Section 1.9 for template):           │
│       - List all files that will be created or modified            │
│       - Define all types/interfaces for this feature               │
│       - Define the DB schema changes (if any)                      │
│       - Define the API contract (request/response shapes)          │
│       - Define the authorization rules                             │
│       - Identify all error cases                                   │
│                                                                     │
│  3.2 Get LLD reviewed (or self-validate against this rulebook)     │
│                                                                     │
│  PHASE 4: IMPLEMENT                                                 │
│  ─────────────────────────────────────────────────────────────────  │
│  4.1 Implement in this ORDER:                                       │
│       a) DB schema / migration (if needed)                         │
│       b) Zod validation schemas (DTOs)                             │
│       c) TypeScript types (inferred from Zod)                      │
│       d) Repository layer (data access)                            │
│       e) Service layer (business logic)                            │
│       f) Route handler / Server action (HTTP layer)                │
│       g) Client components (UI layer)                              │
│       h) Tests                                                     │
│                                                                     │
│  4.2 Apply quality gates at each step (see 0.3)                    │
│                                                                     │
│  PHASE 5: VALIDATE                                                  │
│  ─────────────────────────────────────────────────────────────────  │
│  5.1 Run linter: pnpm lint — zero warnings/errors allowed          │
│  5.2 Run type checker: pnpm tsc --noEmit — zero errors allowed     │
│  5.3 Run tests: pnpm test — all tests must pass                    │
│  5.4 Run security check: pnpm audit — no critical vulnerabilities  │
│  5.5 Run Code Review Checklist (Appendix C)                        │
│                                                                     │
│  PHASE 6: ITERATE                                                   │
│  ─────────────────────────────────────────────────────────────────  │
│  6.1 If any validation fails → RETURN TO PHASE 4 step 4.2          │
│  6.2 If LLD was wrong → update LLD first, then re-implement        │
│  6.3 Maximum iteration depth: 3 attempts per file                  │
│       - If after 3 attempts a file still fails: escalate/ask       │
│                                                                     │
│  OUTPUT: Working, tested, linted, type-safe code                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 0.3 Quality Gates

Every piece of code must pass ALL gates before being committed.

### Gate G1: Type Safety Gate 🔴
```
PASS criteria:
  ✓ pnpm tsc --noEmit exits with code 0
  ✓ No `any` types (except in test mocks — and only when explicitly typed as `as unknown as T`)
  ✓ No `@ts-ignore` or `@ts-nocheck` (use `@ts-expect-error` with a comment if truly needed)
  ✓ All function parameters and return types are explicitly typed
  ✓ No implicit `any` from JSON.parse — always use Zod or typed assertion

FAIL action: Fix type errors. Do NOT suppress them.
```

### Gate G2: Lint Gate 🔴
```
PASS criteria:
  ✓ pnpm lint exits with code 0
  ✓ Zero ESLint errors
  ✓ Zero ESLint warnings (treat warnings as errors in CI)
  ✓ pnpm prettier --check exits with code 0

FAIL action: Run pnpm lint:fix then pnpm prettier --write then re-check.
```

### Gate G3: Test Gate 🟠
```
PASS criteria:
  ✓ pnpm test exits with code 0
  ✓ New business logic has ≥80% line coverage
  ✓ All happy paths have tests
  ✓ All error paths have tests
  ✓ All permission/auth paths have tests

FAIL action: Write the missing tests. Do NOT skip or comment them out.
```

### Gate G4: Security Gate 🔴
```
PASS criteria:
  ✓ No user input goes to DB without Zod validation
  ✓ No user input is interpolated into SQL strings
  ✓ All route handlers check authentication first
  ✓ All mutations check authorization (not just authentication)
  ✓ No secrets in source code (checked by git-secrets or trufflehog)
  ✓ All HTTP responses omit sensitive fields (no password hash in response)

FAIL action: Fix the security issue. Shipping insecure code is never acceptable.
```

### Gate G5: Duplication Gate 🟠
```
PASS criteria:
  ✓ Anti-Duplication Protocol was executed before writing any new file
  ✓ No two files export a type with the same shape under different names
  ✓ No two repositories query the same table in the same way
  ✓ No two services implement the same business rule
  ✓ No two Zod schemas validate the same data shape

FAIL action: Merge/consolidate. Remove the duplicate.
```

### Gate G6: Performance Gate 🟡
```
PASS criteria:
  ✓ No N+1 queries (all related data loaded with include/join)
  ✓ All list endpoints paginated
  ✓ DB queries on frequently accessed data have indexes
  ✓ Server Components used where no client interactivity needed
  ✓ Large data operations are async/background (not blocking HTTP response)

FAIL action: Refactor the query or component.
```

### Gate G7: Documentation Gate 🟡
```
PASS criteria:
  ✓ Every exported function has a JSDoc comment (single line minimum)
  ✓ Every non-obvious type has a comment explaining its purpose
  ✓ All env variables documented in .env.example
  ✓ Complex business rules have inline comments
  ✓ LLD updated to reflect actual implementation

FAIL action: Add the missing documentation.
```

---

## 0.4 Evaluation Metrics & Scoring

After completing a feature, score it against this rubric. A passing score is **≥80 points**.

| Category | Max Points | Measurement |
|----------|-----------|-------------|
| Type Safety | 15 | 15 if zero `any`, -3 per `any` found |
| Test Coverage | 15 | (actual_coverage / 80%) × 15 |
| Security | 20 | 20 if all gates pass, -5 per unprotected route, -10 per SQLi/XSS vector |
| No Duplication | 10 | 10 if no duplicates, -5 per duplicate found |
| Code Complexity | 10 | 10 if all functions ≤10 cyclomatic complexity, -2 per function over |
| Error Handling | 10 | 10 if all error paths handled, -2 per unhandled error path |
| Performance | 10 | 10 if no N+1, paginated, indexed; -3 per violation |
| Documentation | 5 | 5 if all docs present, -1 per missing doc |
| Lint/Format | 5 | 5 if clean, 0 if any errors |

**Scoring interpretation:**
- 90–100: Mergeable. CTO-quality.
- 80–89: Mergeable with minor cleanup. 
- 70–79: Needs revisions. Fix the gaps, re-score.
- <70: Reject. Significant rework required.

---

## 0.5 Anti-Duplication Protocol

**This is mandatory BEFORE creating any new file.** Execute this checklist:

### Step 1: Search for Existing Types
```bash
# Before creating any new type/interface/DTO:
grep -r "type.*User\b\|interface.*User\b" src/ --include="*.ts" --include="*.tsx"
# Replace "User" with your entity name
# If found: REUSE or EXTEND, never create a parallel type
```

### Step 2: Search for Existing Schemas
```bash
# Before creating any new Zod schema:
grep -r "z\.object\|z\.string\|createSchema\|Schema\s*=" src/ --include="*.ts" -l
# Examine each file. If a schema exists for this entity: REUSE it.
```

### Step 3: Search for Existing Repository Methods
```bash
# Before creating a new repository or adding a method:
grep -r "findBy\|findMany\|findUnique\|create\|update\|delete" src/modules/ --include="*.repository.ts" -l
# Open matching files. If method logic is duplicated: EXTRACT to shared repository base.
```

### Step 4: Search for Existing Service Logic
```bash
# Before implementing business logic:
grep -r "function.*Service\|class.*Service" src/ --include="*.ts" -l
# If similar logic exists: MOVE to shared service / utility, import in both places.
```

### Step 5: Search for Existing API Routes
```bash
# Before creating a new route handler:
ls src/app/api/**/*.ts 2>/dev/null
# If a route for this resource exists: ADD to it, don't create a parallel route.
```

### Step 6: Search for Existing Constants/Enums
```bash
# Before defining a new constant:
grep -r "const.*ROLE\|enum.*Role\|PERMISSIONS" src/ --include="*.ts" -l
# Reuse existing constants. Never define the same constant in two files.
```

### Decision Tree: Create vs Reuse
```
Is there existing code that does ≥80% of what I need?
├── YES → Extend/modify the existing code
│         ├── Extension requires <20 new lines → Add to existing file
│         ├── Extension is substantial → Create sub-module under existing domain
│         └── Extension breaks existing API → Create v2, deprecate v1
└── NO  → Create new file following folder structure rules (Part 2)
           └── Document: why no existing code could be reused
```

### The Duplication Violations (NEVER do these):

```typescript
// ❌ VIOLATION: Two types for the same entity in different files
// src/types/user.ts
type User = { id: string; name: string; email: string }

// src/modules/auth/types.ts (DUPLICATE!)
type AuthUser = { id: string; name: string; email: string }

// ✅ CORRECT: One source of truth
// src/types/user.ts
type User = { id: string; name: string; email: string }
// src/modules/auth/types.ts
import type { User } from '@/types/user'
type AuthUser = Pick<User, 'id' | 'name'>  // explicit reduction
```

```typescript
// ❌ VIOLATION: Two Zod schemas for the same shape
// src/modules/users/schema.ts
const CreateUserSchema = z.object({ name: z.string(), email: z.string().email() })

// src/app/api/users/route.ts (DUPLICATE!)
const schema = z.object({ name: z.string(), email: z.string() })

// ✅ CORRECT: Import and reuse the schema from the module
import { CreateUserSchema } from '@/modules/users/schema'
```

```typescript
// ❌ VIOLATION: Same business rule in two services
// src/modules/users/user.service.ts
async function checkEmailUnique(email: string) { ... }

// src/modules/auth/auth.service.ts (DUPLICATE!)
async function validateEmailNotTaken(email: string) { ... }

// ✅ CORRECT: One service owns the rule; the other imports it
import { checkEmailUnique } from '@/modules/users/user.service'
```

---

---

# PART 1 — PRD TO TECH STACK DECISION FRAMEWORK

## 1.1 PRD Analysis Protocol

When given a PRD, extract the following signals to drive all technical decisions:

### Signal Extraction Checklist
```
□ User Scale
  - How many concurrent users? (1-100 | 100-1K | 1K-10K | 10K-100K | 100K+)
  - Is user count predictable or bursty?

□ Data Model Complexity
  - How many distinct entity types? (<10 simple | 10-30 | 30+ complex relationships)
  - Are relationships mostly hierarchical, graph-like, or document-like?
  - Is schema likely to change frequently in early stages?

□ Query Patterns
  - Primarily reads or writes?
  - Complex aggregations? (analytics, dashboards)
  - Full-text search required?
  - Geospatial queries required?
  - Real-time updates required?

□ Auth Complexity
  - Public app (no auth) | Single role | Multiple roles | Fine-grained permissions
  - Social login required?
  - Enterprise SSO (SAML/OIDC) required?
  - Multi-tenant (one app, many organizations)?
  - API key access required (machine-to-machine)?

□ Operational Requirements
  - Regulatory compliance? (HIPAA, GDPR, PCI, SOC2)
  - Data residency requirements?
  - SLA requirements? (uptime %, response time)
  - Team size? (1-3 | 4-10 | 10+)

□ Integration Requirements
  - Third-party APIs to integrate?
  - Webhooks (inbound/outbound)?
  - Background jobs required?
  - File upload/storage required?
  - Email/SMS notifications?
  - Payments?
  - Search (full-text)?

□ Rendering Requirements
  - Content mostly static or dynamic?
  - SEO required?
  - Personalization per user?
  - Internationalization required?
```

---

## 1.2 Tech Stack Decision Matrix

### Primary Stack (Default — use unless PRD signals indicate otherwise)

```
Framework:        Next.js 14+ (App Router)
Language:         TypeScript 5+ (strict mode)
Styling:          Tailwind CSS + shadcn/ui
ORM:              Prisma
Database:         PostgreSQL (via Supabase or Neon for managed)
Auth:             NextAuth.js v5 (Auth.js)
Validation:       Zod
State:            Zustand (global) + TanStack Query (server state)
Testing:          Vitest + Testing Library + Playwright
Deployment:       Vercel (Next.js) + Railway/Supabase (Database)
Monitoring:       Sentry (errors) + Posthog (analytics) + Axiom (logs)
Email:            Resend
Background Jobs:  Trigger.dev or Inngest
File Storage:     Uploadthing or S3-compatible
Payments:         Stripe
Search:           Algolia or Meilisearch
```

### Database Selection Decision Tree

```
Does the data have complex, unpredictable relationships?
├── YES → Is the data mostly connected like a graph (social networks, org hierarchies)?
│         ├── YES → Consider Neo4j (rare — justify carefully)
│         └── NO  → PostgreSQL + JSONB for semi-structured parts
└── NO  → Is the primary access pattern key-value (sessions, caches, ephemeral)?
          ├── YES → Redis (do NOT use as primary DB — only for caching/sessions)
          └── NO  → Is schema extremely volatile (early MVP, unknown shape)?
                    ├── YES → MongoDB (but plan to migrate to PostgreSQL at scale)
                    └── NO  → PostgreSQL (default, handles 99% of cases)
```

**Default: PostgreSQL for everything. Use Redis only as a cache layer, never as primary storage.**

### Auth Provider Decision Tree

```
Team size ≤5 and standard auth requirements?
├── YES → NextAuth.js v5 (Auth.js) — no extra cost, full control
└── NO  → Enterprise SSO required (SAML, OIDC, SCIM)?
          ├── YES → Workos or Auth0
          └── NO  → Compliance-heavy (SOC2, HIPAA)?
                    ├── YES → Auth0 or Clerk
                    └── NO  → Large scale, complex permissions?
                              ├── YES → Clerk (best DX) or Auth0
                              └── NO  → NextAuth.js v5 (default)
```

### Rendering Strategy Decision Tree

```
Is the page content the same for all users?
├── YES → Is content updated frequently (< every hour)?
│         ├── NO  → Static Site Generation (SSG) / generateStaticParams
│         └── YES → Incremental Static Regeneration (ISR) with revalidate
└── NO  → Does the page need to be indexed by search engines?
          ├── YES → Server-Side Rendering (SSR) with cookies/session
          └── NO  → Is this a highly interactive dashboard?
                    ├── YES → Client-Side Rendering (CSR) with SWR/React Query
                    └── NO  → Server Component (default, best TTFB)
```

### Deployment Infrastructure Decision Tree

```
Is the team ≤10 engineers at a startup?
├── YES → Vercel + Supabase/Neon + Upstash (Redis) — minimum ops overhead
└── NO  → Do you need Kubernetes, custom networking, or compliance isolation?
          ├── YES → AWS ECS/EKS + RDS + ElastiCache
          └── NO  → Railway + Supabase + Upstash — still simple, more control
```

---

## 1.3 Database Selection Rules

🔴 **RULE DB-1**: Use PostgreSQL as the default relational database. Deviation requires written justification.

🔴 **RULE DB-2**: Never use the database as a message queue or job scheduler. Use Trigger.dev/Inngest for jobs and Redis/SQS for queues.

🟠 **RULE DB-3**: Never store blobs (images, PDFs, videos) in the database. Store in object storage (S3/Cloudflare R2) and save the URL reference.

🟠 **RULE DB-4**: Every table MUST have:
- `id` (CUID2 or UUID — never auto-increment int for public-facing IDs)
- `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`
- `updated_at TIMESTAMPTZ NOT NULL` (updated via trigger or ORM middleware)

🟡 **RULE DB-5**: Use `TIMESTAMPTZ` (with timezone), never `TIMESTAMP` without timezone. Store all times in UTC.

🟡 **RULE DB-6**: Use database-level constraints (NOT NULL, UNIQUE, FK) as the last line of defense. Application-level validation (Zod) is the first line.

### Supported Database Providers (in order of preference for new projects)

| Provider | When to Use | When Not to Use |
|----------|-------------|-----------------|
| **Supabase** | Team ≤20, needs realtime, needs auth backup | Enterprise, complex compliance |
| **Neon** | Serverless, branch-per-PR workflows | High sustained write loads |
| **PlanetScale** | High write throughput MySQL | When PostgreSQL-specific features needed |
| **Railway** | Full control, simple setup | Very high scale |
| **AWS RDS** | Enterprise, compliance, VPC isolation | Small teams |
| **Self-hosted** | Cost optimization at scale | Any team without a DBA |

---

## 1.4 Auth Provider Selection Rules

🔴 **RULE AUTH-PROVIDER-1**: Never build your own auth system from scratch. Always use one of: NextAuth.js, Clerk, Auth0, Workos.

🔴 **RULE AUTH-PROVIDER-2**: Never store plain-text passwords. If using NextAuth.js Credentials provider, use bcrypt (cost ≥12) or argon2id.

🟠 **RULE AUTH-PROVIDER-3**: If the PRD mentions "enterprise customers", "SSO", or "organization management", default to Clerk or Workos, not NextAuth.js.

🟡 **RULE AUTH-PROVIDER-4**: If the PRD mentions "social login", enable at least Google + GitHub via OAuth. Never implement social login manually.

| PRD Signal | Recommended Provider |
|-----------|---------------------|
| Simple app, small team | NextAuth.js v5 |
| Social login + magic links | Clerk |
| Enterprise SSO (SAML) | Workos |
| Complex permissions | Clerk + custom RBAC |
| B2B SaaS (multi-tenant orgs) | Clerk Organizations |
| Self-hosted requirement | NextAuth.js + Keycloak |
| High compliance | Auth0 |

---

## 1.5 Rendering Strategy Selection

Apply this matrix per-route, not globally:

| Route Type | Strategy | Next.js Implementation |
|-----------|----------|----------------------|
| Marketing homepage | SSG | No `dynamic` export, no cookies |
| Blog/docs (content) | ISR | `export const revalidate = 3600` |
| Product pages with shared data | ISR | `revalidate = 60` |
| Dashboard (authenticated) | SSR or RSC | `cookies()` or session read |
| Real-time dashboard | CSR | Client component + SWR |
| Admin panel | SSR + auth check | Server component + redirect |
| API routes | — | `export async function GET/POST` |
| User profile | SSR | Personalized, no CDN cache |

🔴 **RULE RENDER-1**: Never use Client Components for data fetching that can be done in Server Components. Check if the component needs: `useState`, `useEffect`, browser APIs, or event listeners. If none of these — it MUST be a Server Component.

---

## 1.6 Infrastructure Selection

### Minimum Production Infrastructure Checklist

```
□ Application hosting: Vercel / Railway / AWS
□ Primary database: PostgreSQL (managed provider)
□ Cache layer: Upstash Redis or Vercel KV
□ CDN: Cloudflare (all traffic) or Vercel Edge Network
□ Object storage: Cloudflare R2 (cheapest) or AWS S3
□ Error tracking: Sentry (free tier covers most startups)
□ Log aggregation: Axiom or Datadog (Axiom cheaper)
□ Secrets management: Vercel env vars OR AWS Secrets Manager (larger teams)
□ DNS: Cloudflare (free, best DDoS protection)
□ Email: Resend (cheapest, best DX) or Postmark
□ CI/CD: GitHub Actions (default)
```

### Cost-Optimized Stack for Early-Stage (≤$200/month)
```
Vercel Hobby/Pro: $0-20/month
Supabase Free/Pro: $0-25/month
Upstash Redis: $0-10/month
Cloudflare R2: ~$0-5/month
Resend: $0-20/month
Sentry Free: $0
Axiom Free: $0
Total: ~$0-80/month
```

---

## 1.7 Third-Party Service Selection

🔴 **RULE 3RD-PARTY-1**: Never integrate a third-party service directly into route handlers or server actions. Always wrap in a service class under `src/lib/services/`.

🔴 **RULE 3RD-PARTY-2**: All third-party API keys MUST be in environment variables. Never hardcode.

🟠 **RULE 3RD-PARTY-3**: All third-party service calls MUST have timeout configurations (max 10 seconds for synchronous calls).

🟠 **RULE 3RD-PARTY-4**: All outbound HTTP calls MUST be wrapped in try/catch with typed error handling.

| Need | First Choice | Alternative |
|------|-------------|-------------|
| Email | Resend | Postmark, SendGrid |
| SMS | Twilio | Vonage |
| Payments | Stripe | Paddle (better for EU VAT) |
| File storage | Uploadthing | AWS S3 + presigned URLs |
| Search | Algolia | Meilisearch (self-hosted), Typesense |
| Background jobs | Trigger.dev | Inngest, Quirrel |
| Push notifications | OneSignal | Firebase FCM |
| Maps | Google Maps | Mapbox |
| Analytics | PostHog | Mixpanel, Amplitude |
| Feature flags | PostHog | LaunchDarkly, Unleash |
| AI/LLM | Vercel AI SDK + OpenAI | Anthropic, Gemini |

---

## 1.8 HLD Template

> 🔴 **RULE HLD-1**: Write an HLD for any feature that involves: new database tables, new microservices, new third-party integrations, or changes affecting >3 existing modules.

```markdown
# HLD: [Feature Name]
**Date:** YYYY-MM-DD  
**Author:** [Name]  
**Status:** Draft | Review | Approved  
**Ticket:** [JIRA-123]

## 1. Problem Statement
[One paragraph. What user problem does this solve? What is the business value?]

## 2. Goals & Non-Goals
### Goals
- [Specific, measurable goal 1]
- [Specific, measurable goal 2]

### Non-Goals
- [What this design explicitly does NOT address]

## 3. User Flows
[ASCII diagram or numbered steps for each key user journey]

Example:
User → POST /api/auth/register → Create User → Send Welcome Email → Return JWT

## 4. System Architecture
[ASCII diagram showing components, data flows, external services]

Example:
┌──────────┐    HTTPS     ┌──────────────┐    SQL    ┌────────┐
│  Browser │ ──────────→  │  Next.js App │ ────────→ │  DB   │
└──────────┘              └──────────────┘           └────────┘
                                  │ HTTP
                                  ▼
                          ┌──────────────┐
                          │  Resend API  │
                          └──────────────┘

## 5. Data Model Changes
[List all new or modified tables, with key fields]

New: users, sessions
Modified: posts (add author_id FK)

## 6. API Design
[List all new endpoints]

POST   /api/auth/register     Create account
POST   /api/auth/login        Authenticate
GET    /api/users/:id         Get user profile
PATCH  /api/users/:id         Update profile

## 7. Authentication & Authorization
[Who can access what? What permissions are required?]

## 8. Non-Functional Requirements
| Requirement | Target |
|-------------|--------|
| Response time (p95) | <500ms |
| Availability | 99.9% |
| Data retention | 7 years |

## 9. Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| [Risk] | H/M/L | H/M/L | [How to mitigate] |

## 10. Open Questions
- [ ] [Question that needs resolution before implementation]

## 11. Decision Log
| Decision | Option Chosen | Reason |
|----------|--------------|--------|
| [What was decided] | [Choice] | [Why] |
```

---

## 1.9 LLD Template

> 🔴 **RULE LLD-1**: Write an LLD for EVERY feature involving more than 2 new files. The LLD must be committed alongside the code.

```markdown
# LLD: [Feature Name]
**HLD Reference:** [link to HLD if applicable]  
**Date:** YYYY-MM-DD  
**Author:** [Name]

## 1. Files to Create
| File Path | Purpose |
|-----------|---------|
| src/modules/users/user.repository.ts | Data access for users |
| src/modules/users/user.service.ts | Business logic for users |
| src/modules/users/user.schema.ts | Zod validation schemas |
| src/modules/users/user.types.ts | TypeScript types |
| src/app/api/users/route.ts | Route handlers |
| src/app/(app)/users/page.tsx | Users list page |

## 2. Files to Modify
| File Path | Change Description |
|-----------|-------------------|
| src/lib/db/schema.prisma | Add users table |
| src/middleware.ts | Add /users/* auth check |

## 3. Database Schema
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      UserRole @default(USER)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
}

enum UserRole {
  ADMIN
  USER
}
```

## 4. TypeScript Types & DTOs
```typescript
// All types for this feature
type CreateUserInput = z.infer<typeof CreateUserSchema>
type UserResponse = Omit<User, 'passwordHash'>
```

## 5. API Contract
### POST /api/users
**Auth:** Required — ADMIN role
**Request:**
```json
{ "email": "user@example.com", "name": "Alice", "role": "USER" }
```
**Response 201:**
```json
{ "id": "cuid", "email": "...", "name": "...", "role": "USER", "createdAt": "..." }
```
**Error 400:** Validation failure
**Error 409:** Email already exists
**Error 403:** Caller is not ADMIN

## 6. Business Rules
1. Email must be unique across all tenants
2. Role can only be set/changed by ADMIN
3. Users cannot delete themselves
4. [etc.]

## 7. Error Cases
| Scenario | HTTP Status | Error Code | Message |
|----------|------------|-----------|---------|
| Invalid input | 400 | VALIDATION_ERROR | [Zod error details] |
| Email taken | 409 | EMAIL_ALREADY_EXISTS | Email is already in use |
| Not authenticated | 401 | UNAUTHORIZED | Authentication required |
| Not authorized | 403 | FORBIDDEN | Insufficient permissions |
| User not found | 404 | USER_NOT_FOUND | User does not exist |

## 8. Authorization Matrix
| Action | ADMIN | USER | Guest |
|--------|-------|------|-------|
| List users | ✓ | ✗ | ✗ |
| Get own profile | ✓ | ✓ | ✗ |
| Get other's profile | ✓ | ✗ | ✗ |
| Create user | ✓ | ✗ | ✗ |
| Update own profile | ✓ | ✓ | ✗ |
| Update other's profile | ✓ | ✗ | ✗ |
| Delete user | ✓ | ✗ | ✗ |
```

---

---

# PART 2 — PROJECT ARCHITECTURE & FOLDER STRUCTURE

## 2.1 Canonical Folder Structure

🔴 **RULE STRUCT-1**: Every project MUST follow this structure. Deviation requires written justification in `/docs/ARCHITECTURE.md`.

```
project-root/
├── .env.example                    # Template for all required env vars (NO real values)
├── .env.local                      # Local development values (git-ignored)
├── .eslintrc.json                  # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── next.config.ts                  # Next.js configuration
├── package.json
├── tsconfig.json
├── prisma/
│   ├── schema.prisma               # Single schema file
│   ├── migrations/                 # Migration files (committed)
│   └── seed.ts                     # Seed script for development/test data
├── docs/
│   ├── ARCHITECTURE.md             # HLD for the overall system
│   ├── CONTRIBUTING.md             # How to run & contribute
│   └── decisions/                  # ADR (Architecture Decision Records)
│       └── 001-use-postgresql.md
├── public/                         # Static assets served at /
│   └── icons/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Root page (marketing home)
│   │   ├── (auth)/                 # Route group: auth pages
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (app)/                  # Route group: authenticated app
│   │   │   ├── layout.tsx          # Auth-required layout with sidebar
│   │   │   ├── dashboard/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── (admin)/                # Route group: admin panel
│   │   │   ├── layout.tsx          # Admin-required layout
│   │   │   └── users/page.tsx
│   │   └── api/                    # API routes
│   │       ├── auth/[...nextauth]/route.ts  # Auth.js handler
│   │       ├── users/
│   │       │   └── route.ts        # GET /api/users, POST /api/users
│   │       └── users/[id]/
│   │           └── route.ts        # GET /api/users/:id, PATCH, DELETE
│   ├── components/                 # Shared UI components (no business logic)
│   │   ├── ui/                     # shadcn/ui components (auto-generated)
│   │   │   ├── button.tsx
│   │   │   └── ...
│   │   ├── layout/                 # Layout components
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   └── shared/                 # App-level shared components
│   │       ├── data-table.tsx
│   │       └── confirm-dialog.tsx
│   ├── modules/                    # Feature modules (domain-driven)
│   │   ├── users/
│   │   │   ├── index.ts            # Public API of this module (barrel)
│   │   │   ├── user.types.ts       # TypeScript types for this domain
│   │   │   ├── user.schema.ts      # Zod schemas (DTOs)
│   │   │   ├── user.repository.ts  # Data access layer
│   │   │   ├── user.service.ts     # Business logic
│   │   │   ├── user.actions.ts     # Server actions for this domain
│   │   │   ├── components/         # Domain-specific components
│   │   │   │   ├── user-form.tsx
│   │   │   │   └── user-table.tsx
│   │   │   └── __tests__/
│   │   │       ├── user.service.test.ts
│   │   │       └── user.repository.test.ts
│   │   ├── auth/
│   │   │   ├── index.ts
│   │   │   ├── auth.types.ts
│   │   │   ├── auth.schema.ts
│   │   │   ├── auth.service.ts
│   │   │   └── __tests__/
│   │   └── [other-domain]/
│   ├── lib/                        # Framework-level utilities & singletons
│   │   ├── db.ts                   # Prisma client singleton
│   │   ├── auth.ts                 # Auth.js config
│   │   ├── env.ts                  # Environment variable validation (t3-env)
│   │   ├── errors.ts               # Typed error classes
│   │   ├── logger.ts               # Logger instance
│   │   ├── redis.ts                # Redis client singleton (if used)
│   │   └── services/               # Third-party service wrappers
│   │       ├── email.service.ts
│   │       ├── storage.service.ts
│   │       └── stripe.service.ts
│   ├── hooks/                      # Custom React hooks (client-side only)
│   │   ├── use-current-user.ts
│   │   └── use-debounce.ts
│   ├── types/                      # Global TypeScript types
│   │   ├── index.ts                # Re-exports all global types
│   │   ├── api.ts                  # API request/response types
│   │   ├── next-auth.d.ts          # NextAuth session type augmentation
│   │   └── env.d.ts                # Environment variable types (if using process.env)
│   ├── constants/                  # Application-wide constants
│   │   ├── roles.ts                # Role definitions
│   │   ├── permissions.ts          # Permission definitions
│   │   └── routes.ts               # Route constants (avoids string literals)
│   ├── middleware.ts               # Next.js middleware (auth, rate limiting)
│   └── styles/
│       └── globals.css             # Tailwind base styles
└── tests/
    ├── e2e/                        # Playwright E2E tests
    │   ├── auth.test.ts
    │   └── dashboard.test.ts
    └── fixtures/                   # Shared test fixtures
        └── test-db.ts
```

---

## 2.2 File Naming Rules

🔴 **RULE NAMING-1**: File names MUST use the format: `[domain].[layer].ts`
- Good: `user.service.ts`, `user.repository.ts`, `user.schema.ts`
- Bad: `userService.ts`, `UserService.ts`, `UserSvc.ts`

🔴 **RULE NAMING-2**: React components MUST use `PascalCase.tsx`
- Good: `UserForm.tsx`, `DataTable.tsx`
- Bad: `user-form.tsx`, `userForm.tsx`

🟠 **RULE NAMING-3**: Route groups (folders in app/) MUST use `(kebab-case)`

🟠 **RULE NAMING-4**: Dynamic routes MUST use `[paramName]` — param names in camelCase

🟡 **RULE NAMING-5**: Test files MUST be co-located in `__tests__/` within the module, named `[filename].test.ts`

| File Type | Convention | Example |
|-----------|-----------|---------|
| Service | `[domain].service.ts` | `user.service.ts` |
| Repository | `[domain].repository.ts` | `user.repository.ts` |
| Schema (Zod) | `[domain].schema.ts` | `user.schema.ts` |
| Types | `[domain].types.ts` | `user.types.ts` |
| Actions | `[domain].actions.ts` | `user.actions.ts` |
| React component | `PascalCase.tsx` | `UserForm.tsx` |
| Hook | `use-kebab-case.ts` | `use-current-user.ts` |
| API route | `route.ts` (fixed by Next.js) | — |
| Page | `page.tsx` (fixed by Next.js) | — |
| Layout | `layout.tsx` (fixed by Next.js) | — |
| Test | `[filename].test.ts` | `user.service.test.ts` |
| E2E test | `[feature].test.ts` | `auth.test.ts` |
| Constants | `[domain].ts` | `permissions.ts` |

---

## 2.3 Module Boundary Rules

🔴 **RULE MODULE-1**: Modules MUST NOT directly import from other modules' internal files. They MUST import from the module's `index.ts` barrel only.

```typescript
// ❌ VIOLATION: Direct internal import
import { UserRepository } from '@/modules/users/user.repository'

// ✅ CORRECT: Import from module barrel
import { UserRepository } from '@/modules/users'
```

🔴 **RULE MODULE-2**: `lib/` files MUST NOT import from `modules/`. The `lib/` layer is a foundation layer — it cannot depend on domain modules.

```
Dependency direction (arrows = allowed imports):
modules/ → lib/ → (external packages)
app/ → modules/ → lib/
app/ → lib/
components/ → lib/ (for hooks, utilities)
```

🟠 **RULE MODULE-3**: If two modules need to share logic, extract it to `lib/` or create a shared module (`modules/shared/`). Never create circular dependencies.

🟠 **RULE MODULE-4**: The `index.ts` barrel of each module exports ONLY what is intended to be public API.

```typescript
// src/modules/users/index.ts — ONLY export what consumers need
export { UserService } from './user.service'
export { UserRepository } from './user.repository'
export type { User, CreateUserInput, UserResponse } from './user.types'
export { CreateUserSchema, UpdateUserSchema } from './user.schema'
// Do NOT export internal helpers
```

---

## 2.4 Barrel Export Rules

🟠 **RULE BARREL-1**: Do NOT create barrel `index.ts` files in `components/ui/` — shadcn components are individually imported to optimize tree-shaking.

🟡 **RULE BARREL-2**: Barrel files MUST NOT re-export `*` (wildcard) — always name the exports explicitly.

```typescript
// ❌ VIOLATION: Wildcard re-export prevents tree-shaking
export * from './user.service'

// ✅ CORRECT: Named re-exports
export { UserService } from './user.service'
export type { User } from './user.types'
```

🟡 **RULE BARREL-3**: Barrel files in `types/` SHOULD re-export all global types for single-import convenience.

```typescript
// src/types/index.ts
export type * from './api'
export type * from './next-auth'
```

---

## 2.5 Domain Module Pattern

Every domain module follows the same internal structure:

### Layer Responsibilities (NEVER mix these)

| Layer | File | What it does | What it NEVER does |
|-------|------|-------------|-------------------|
| Repository | `*.repository.ts` | Prisma queries only | Business logic, HTTP, auth checks |
| Service | `*.service.ts` | Business logic, calls repository | Direct Prisma usage, HTTP parsing |
| Schema | `*.schema.ts` | Zod validation schemas | Business logic |
| Types | `*.types.ts` | TypeScript types (inferred from schemas) | Runtime logic |
| Actions | `*.actions.ts` | Next.js Server Actions (calls service) | Direct DB access |
| Route | `app/api/.../route.ts` | HTTP parsing, auth, calls service | Direct DB access, business logic |

### How Data Flows Through Layers

```
HTTP Request / Server Action Call
         │
         ▼
Route Handler / Server Action
  - Parse request body (use Zod schema)
  - Validate authentication (getServerSession / auth())
  - Validate authorization (check role/permission)
  - Call service method
  - Format response
         │
         ▼
Service Layer
  - Validate business rules
  - Orchestrate repository calls
  - Handle transactions
  - Emit events (if needed)
  - Return typed result
         │
         ▼
Repository Layer
  - Execute Prisma queries
  - Map DB model to domain type
  - Handle DB-specific errors
         │
         ▼
Prisma / Database
```

---

---

# PART 3 — CODE QUALITY & LINTING RULES

## 3.1 TypeScript Rules

🔴 **RULE TS-1**: `tsconfig.json` MUST use strict mode. No exceptions.

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

🔴 **RULE TS-2**: `any` is FORBIDDEN except in:
- Test mock factories where value is immediately cast: `{} as unknown as MyType`
- Third-party library type gaps (document why)

🔴 **RULE TS-3**: `@ts-ignore` is FORBIDDEN. Use `@ts-expect-error` with an explanatory comment if truly needed. `@ts-expect-error` should be removed as soon as the underlying issue is fixed.

🔴 **RULE TS-4**: All exported functions MUST have explicit return types.

```typescript
// ❌ VIOLATION: Implicit return type
export async function createUser(input: CreateUserInput) {
  return prisma.user.create({ data: input })
}

// ✅ CORRECT: Explicit return type
export async function createUser(input: CreateUserInput): Promise<User> {
  return prisma.user.create({ data: input })
}
```

🔴 **RULE TS-5**: Never use `Object`, `Function`, `any[]` as types. Use specific types.

```typescript
// ❌ VIOLATION
function process(data: Object): Function { ... }

// ✅ CORRECT
function process(data: Record<string, unknown>): () => void { ... }
```

🟠 **RULE TS-6**: Prefer `type` over `interface` for data shapes. Use `interface` only when you need declaration merging.

```typescript
// ✅ CORRECT: Use type for data shapes
type User = { id: string; name: string }

// ✅ CORRECT: Use interface only for extensible contracts
interface Repository<T> {
  findById(id: string): Promise<T | null>
}
```

🟠 **RULE TS-7**: Use discriminated unions for result types, not thrown errors in service boundaries.

```typescript
// ❌ VIOLATION: Throwing errors across service boundaries
async function createUser(input: CreateUserInput): Promise<User> {
  throw new Error('Email taken')
}

// ✅ CORRECT: Discriminated union result
type CreateUserResult =
  | { success: true; user: User }
  | { success: false; error: 'EMAIL_TAKEN' | 'VALIDATION_ERROR'; message: string }

async function createUser(input: CreateUserInput): Promise<CreateUserResult> {
  const exists = await userRepo.findByEmail(input.email)
  if (exists) return { success: false, error: 'EMAIL_TAKEN', message: 'Email already in use' }
  const user = await userRepo.create(input)
  return { success: true, user }
}
```

🟠 **RULE TS-8**: Never use non-null assertion operator `!` unless you KNOW the value is non-null and can document why. Comment required.

```typescript
// ❌ VIOLATION: Silent assumption
const user = users.find(u => u.id === id)!

// ✅ CORRECT: Explicit guard
const user = users.find(u => u.id === id)
if (!user) throw new NotFoundError('USER_NOT_FOUND')
```

🟡 **RULE TS-9**: Use `satisfies` operator to validate object literals against types without widening.

```typescript
// ✅ CORRECT: satisfies catches mismatches at compile time
const config = {
  database: { host: 'localhost', port: 5432 },
} satisfies DatabaseConfig
```

🟡 **RULE TS-10**: Use `const` assertions for literal types.

```typescript
// ✅ CORRECT
const ROLES = ['ADMIN', 'USER', 'GUEST'] as const
type Role = (typeof ROLES)[number]  // 'ADMIN' | 'USER' | 'GUEST'
```

---

## 3.2 ESLint Configuration

🔴 **RULE LINT-1**: The following ESLint configuration is REQUIRED for all projects:

```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:unicorn/recommended"
  ],
  "plugins": ["@typescript-eslint", "import", "unicorn", "unused-imports"],
  "rules": {
    // TypeScript: Hard rules
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/consistent-type-imports": ["error", { "prefer": "type-imports" }],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/require-await": "error",

    // Import rules
    "import/order": ["error", {
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      "newlines-between": "always",
      "alphabetize": { "order": "asc" }
    }],
    "import/no-duplicates": "error",
    "import/no-cycle": "error",

    // Unused imports
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": ["error", {
      "vars": "all", "varsIgnorePattern": "^_",
      "args": "after-used", "argsIgnorePattern": "^_"
    }],

    // React
    "react/no-unescaped-entities": "error",
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",

    // General quality
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "no-debugger": "error",
    "prefer-const": "error",
    "no-var": "error",
    "eqeqeq": ["error", "always"],
    "no-nested-ternary": "error",
    "unicorn/no-array-for-each": "error",
    "unicorn/prefer-array-find": "error",
    "unicorn/no-useless-undefined": "error"
  }
}
```

🔴 **RULE LINT-2**: CI pipeline MUST run ESLint with `--max-warnings=0`. Zero tolerance for warnings in CI.

🟠 **RULE LINT-3**: `eslint-disable` comments are FORBIDDEN in production code except for:
- Third-party type incompatibilities (with a comment explaining why)
- Auto-generated files (add `/* eslint-disable */` at the top of generated files)

---

## 3.3 Prettier Configuration

🔴 **RULE FORMAT-1**: All projects MUST use Prettier with this configuration:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "arrowParens": "always",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

🔴 **RULE FORMAT-2**: Prettier MUST run as a pre-commit hook (`lint-staged` + `husky`) and in CI.

```json
// package.json lint-staged configuration
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

---

## 3.4 Import Order Rules

🔴 **RULE IMPORT-1**: Import order MUST be:
1. Node.js built-ins (`node:fs`, `node:path`)
2. External packages (`react`, `next`, `zod`)
3. Internal aliases (`@/lib`, `@/modules`, `@/components`)
4. Relative imports (`./user.service`, `../shared`)
5. Type-only imports (last, with `import type`)

```typescript
// ✅ CORRECT import order
import { readFile } from 'node:fs/promises'

import { z } from 'zod'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { UserService } from '@/modules/users'

import { formatDate } from '../utils'

import type { User } from './user.types'
import type { NextRequest } from 'next/server'
```

🔴 **RULE IMPORT-2**: Use `import type` for all type-only imports. This ensures they are removed at runtime.

🟠 **RULE IMPORT-3**: Path aliases MUST be defined in `tsconfig.json` and `next.config.ts`. Use `@/` for `src/`.

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 3.5 Dead Code Rules

🔴 **RULE DEAD-1**: No commented-out code in committed code. Use version control to recover old code.

🔴 **RULE DEAD-2**: No unused exports. Run `ts-prune` or `eslint-plugin-unused-imports` in CI.

🟠 **RULE DEAD-3**: `TODO` and `FIXME` comments MUST include a ticket reference.

```typescript
// ❌ VIOLATION
// TODO: fix this

// ✅ CORRECT
// TODO: [PROJ-123] Implement rate limiting for this endpoint
```

---

## 3.6 Complexity Rules

🟠 **RULE COMPLEX-1**: No function should have a cyclomatic complexity >10. If it does, refactor into smaller functions.

🟠 **RULE COMPLEX-2**: No function body should exceed 50 lines. If it does, extract helper functions.

🟠 **RULE COMPLEX-3**: No file should exceed 300 lines. If it does, split into multiple files.

🟡 **RULE COMPLEX-4**: Maximum nesting depth is 3. If you have 4+ levels of nesting, use early returns (guard clauses).

```typescript
// ❌ VIOLATION: Deep nesting
async function processOrder(order: Order): Promise<void> {
  if (order) {
    if (order.status === 'PENDING') {
      if (order.items.length > 0) {
        if (await hasInventory(order.items)) {
          // actual logic buried at level 5
        }
      }
    }
  }
}

// ✅ CORRECT: Guard clauses (flat structure)
async function processOrder(order: Order): Promise<void> {
  if (!order) return
  if (order.status !== 'PENDING') return
  if (order.items.length === 0) return
  if (!await hasInventory(order.items)) return
  // actual logic at level 1
}
```

---

## 3.7 Comment Rules

🟡 **RULE COMMENT-1**: Comments explain WHY, not WHAT. The code should explain what it does.

```typescript
// ❌ BAD: Explains what (obvious from code)
// Increment counter by 1
counter++

// ✅ GOOD: Explains why
// Rate limit uses a sliding window, so we increment even on failure
// to prevent enumeration attacks even when returning 401
counter++
```

🟡 **RULE COMMENT-2**: All exported functions, classes, and types in `lib/` MUST have JSDoc.

```typescript
/**
 * Creates a new user account and sends a welcome email.
 * Validates email uniqueness before creation.
 * @throws {EmailTakenError} if email already exists
 */
export async function createUser(input: CreateUserInput): Promise<User> { ... }
```

🟡 **RULE COMMENT-3**: All complex business rules MUST have a comment linking to the spec/ticket.

```typescript
// BUSINESS RULE [PROJ-45]: Subscription plan downgrade only allowed at billing period end.
// Immediate downgrade loses features instantly which caused support tickets.
if (isDowngrade && !isAtBillingPeriodEnd) {
  return scheduleDowngrade(userId, newPlan)
}
```

---

## 3.8 Magic Number & Constant Rules

🔴 **RULE CONST-1**: No magic numbers in code. All numbers MUST be named constants.

```typescript
// ❌ VIOLATION: Magic number
if (password.length < 8) throw new Error('Too short')
const hash = await bcrypt.hash(password, 12)
await redis.setex(key, 3600, value)

// ✅ CORRECT: Named constants in constants/ directory
import { MIN_PASSWORD_LENGTH, BCRYPT_ROUNDS, SESSION_TTL_SECONDS } from '@/constants/auth'
if (password.length < MIN_PASSWORD_LENGTH) throw new Error('Too short')
const hash = await bcrypt.hash(password, BCRYPT_ROUNDS)
await redis.setex(key, SESSION_TTL_SECONDS, value)
```

```typescript
// src/constants/auth.ts
export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 128
export const BCRYPT_ROUNDS = 12
export const SESSION_TTL_SECONDS = 3600       // 1 hour
export const REFRESH_TOKEN_TTL_SECONDS = 604800 // 7 days
export const MAX_LOGIN_ATTEMPTS = 5
export const LOCKOUT_DURATION_SECONDS = 900   // 15 minutes
```

🔴 **RULE CONST-2**: No magic strings. Route paths, event names, error codes MUST be constants.

```typescript
// src/constants/routes.ts
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  USER: (id: string) => `/users/${id}`,
} as const

// src/constants/errors.ts
export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
} as const
export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES]
```

---

---

# PART 4 — SCHEMA & DATA DESIGN RULES

## 4.1 Database Schema Design Checklist

Run this checklist before writing ANY migration:

```
□ Every table has: id, created_at, updated_at
□ IDs use CUID2 or UUID (never auto-increment integers for public-facing IDs)
□ All string columns have appropriate length limits or are TEXT (not VARCHAR(255) blindly)
□ All monetary values stored as INTEGER cents (never FLOAT or DECIMAL for money)
□ All timestamps use TIMESTAMPTZ (with timezone), values stored in UTC
□ Foreign keys have ON DELETE behavior defined (RESTRICT | CASCADE | SET NULL — document the choice)
□ All frequently-queried columns have indexes (foreign keys, status fields, email)
□ Unique constraints on email, slug, and any natural unique identifiers
□ Soft delete considered: does this data need to be recoverable?
□ Audit log needed: does this data need a full change history?
□ Enum fields: is this truly fixed (enum) or might it change (lookup table)?
□ No blob storage in DB (use object storage URLs)
□ Schema reviewed against GDPR: which fields are PII? Can they be anonymized?
□ Multi-tenancy considered: should this table have a tenant_id/organization_id?
```

---

## 4.2 Prisma Schema Rules

🔴 **RULE PRISMA-1**: All models MUST have the standard base fields:

```prisma
model User {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // ... domain fields

  @@map("users")  // snake_case table name
}
```

🔴 **RULE PRISMA-2**: All model names use PascalCase. All field names use camelCase. All DB column names use snake_case (via `@map`). All table names use snake_case with `@@map`.

🔴 **RULE PRISMA-3**: Never use `Float` for monetary amounts. Use `Int` (cents) or `Decimal` with explicit precision.

```prisma
// ❌ VIOLATION: Float loses precision with money
price Float

// ✅ CORRECT: Store in cents as Int
priceInCents Int  // 1999 = $19.99

// ✅ ALTERNATIVE: Decimal with precision
price Decimal @db.Decimal(10, 2)
```

🔴 **RULE PRISMA-4**: All enum names use SCREAMING_SNAKE_CASE values.

```prisma
enum UserRole {
  ADMIN
  USER
  GUEST

  @@map("user_role")
}
```

🟠 **RULE PRISMA-5**: All `@relation` fields on the non-owning side MUST be explicit:

```prisma
model Post {
  id       String @id @default(cuid())
  authorId String @map("author_id")
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
  @@map("posts")
}

model User {
  id    String @id @default(cuid())
  posts Post[]  // explicit backlink
  @@map("users")
}
```

🟠 **RULE PRISMA-6**: For every FK, document and enforce the `onDelete` behavior:

| Scenario | onDelete |
|----------|---------|
| Post owned by User — delete post when user deleted | `Cascade` |
| Order created by User — keep orders when user deleted | `Restrict` |
| Optional assignment (assigned-to user deleted) | `SetNull` |

🟡 **RULE PRISMA-7**: Keep a single `schema.prisma` file. If schema exceeds 500 lines, split using Prisma's multi-file schema feature (Prisma 5.15+).

🟡 **RULE PRISMA-8**: Use Prisma Client Extensions for soft delete, audit logging, and row-level security to avoid writing the same middleware repeatedly.

### Standard Soft Delete Extension

```typescript
// src/lib/db.ts
import { PrismaClient } from '@prisma/client'

const prismaBase = new PrismaClient()

export const db = prismaBase.$extends({
  model: {
    $allModels: {
      async softDelete<T>(this: T, id: string): Promise<void> {
        const context = Prisma.getExtensionContext(this)
        await (context as any).update({
          where: { id },
          data: { deletedAt: new Date() }
        })
      },
      async findManyActive<T, A>(
        this: T,
        args?: Prisma.Exact<A, Prisma.Args<T, 'findMany'>>
      ) {
        const context = Prisma.getExtensionContext(this)
        return (context as any).findMany({
          ...(args as any),
          where: { ...(args as any)?.where, deletedAt: null }
        })
      }
    }
  }
})

export type DbClient = typeof db
```

---

## 4.3 Naming Conventions for DB Objects

| Object | Convention | Example |
|--------|-----------|---------|
| Table | `snake_case` plural | `users`, `blog_posts`, `user_roles` |
| Column | `snake_case` | `created_at`, `author_id`, `is_active` |
| Primary key | `id` | — |
| Foreign key | `[table_singular]_id` | `user_id`, `post_id` |
| Boolean | `is_[adjective]` or `has_[noun]` | `is_active`, `has_verified_email` |
| Timestamp | `[past_tense]_at` | `created_at`, `deleted_at`, `verified_at` |
| Enum | `snake_case` | `user_role`, `payment_status` |
| Index | `[table]_[columns]_idx` | `users_email_idx`, `posts_author_id_status_idx` |
| Unique index | `[table]_[columns]_key` | `users_email_key` |
| FK constraint | `[table]_[column]_fkey` | `posts_author_id_fkey` |

---

## 4.4 Index Design Rules

🔴 **RULE INDEX-1**: Every foreign key column MUST have an index.

🔴 **RULE INDEX-2**: Every column used in a `WHERE` clause in a hot query path MUST have an index.

🟠 **RULE INDEX-3**: Never create an index without profiling query performance first (use `EXPLAIN ANALYZE`). Too many indexes slow down writes.

🟠 **RULE INDEX-4**: Use composite indexes for multi-column WHERE clauses. Column order matters — put the most selective column first.

```prisma
// For query: WHERE tenant_id = ? AND status = ? ORDER BY created_at DESC
@@index([tenantId, status, createdAt(sort: Desc)])
```

🟠 **RULE INDEX-5**: Use partial indexes for common filtered queries.

```sql
-- Only index active users (avoids indexing soft-deleted rows)
CREATE INDEX users_email_active_idx ON users(email) WHERE deleted_at IS NULL;
```

🟡 **RULE INDEX-6**: All `email` columns with uniqueness constraint need a case-insensitive unique index.

```sql
CREATE UNIQUE INDEX users_email_unique_idx ON users(LOWER(email));
```

---

## 4.5 Migration Rules

🔴 **RULE MIGRATION-1**: NEVER edit an existing migration file. Always create a new migration.

🔴 **RULE MIGRATION-2**: Every migration MUST be reversible (have a `down` path). If Prisma doesn't generate one, write it manually.

🔴 **RULE MIGRATION-3**: Never add a NOT NULL column to an existing table in a single migration step (causes table lock / downtime):

```
❌ VIOLATION: Single-step NOT NULL column addition
ALTER TABLE users ADD COLUMN phone VARCHAR(20) NOT NULL;

✅ CORRECT: Three-step zero-downtime migration
Step 1 (migrate): ADD COLUMN phone VARCHAR(20) NULL
Step 2 (backfill): UPDATE users SET phone = '' WHERE phone IS NULL
Step 3 (constrain): ALTER TABLE users ALTER COLUMN phone SET NOT NULL
(Commit 3 separate migrations, deploy between steps 1 and 2)
```

🟠 **RULE MIGRATION-4**: Name migrations descriptively.

```
✅ CORRECT: 20240115120000_add_phone_to_users
✅ CORRECT: 20240115130000_create_posts_table
❌ BAD: 20240115_migration
❌ BAD: 20240115_update
```

🟠 **RULE MIGRATION-5**: Schema migrations are run BEFORE code deployment in the CD pipeline. Never deploy code that requires a schema change before the migration runs.

---

## 4.6 Soft Delete Rules

🟠 **RULE SOFTDELETE-1**: Any entity that might need recovery, audit, or historical reference MUST use soft delete (not hard delete). Add a `deleted_at TIMESTAMPTZ` column.

🟠 **RULE SOFTDELETE-2**: All queries on soft-deletable tables MUST filter `WHERE deleted_at IS NULL` by default.

🔴 **RULE SOFTDELETE-3**: Hard delete ONLY for: test data, anonymization under GDPR requests, and truly ephemeral data (sessions, tokens).

```typescript
// ✅ CORRECT: Soft delete implementation
// prisma/schema.prisma
model User {
  // ...
  deletedAt DateTime? @map("deleted_at")
  @@map("users")
}

// src/modules/users/user.repository.ts
export class UserRepository {
  async findAll(): Promise<User[]> {
    return db.user.findMany({ where: { deletedAt: null } })
  }

  async delete(id: string): Promise<void> {
    await db.user.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
  }

  // For admin: find including deleted
  async findAllIncludingDeleted(): Promise<User[]> {
    return db.user.findMany()
  }
}
```

---

## 4.7 Audit Log Pattern

🟡 **RULE AUDIT-1**: Any entity that stores financial, medical, or compliance-relevant data MUST have an audit log.

```prisma
model AuditLog {
  id         String   @id @default(cuid())
  entityType String   @map("entity_type")   // "User", "Order"
  entityId   String   @map("entity_id")
  action     String                          // "CREATE", "UPDATE", "DELETE"
  actorId    String?  @map("actor_id")       // Who did it (null = system)
  actorRole  String?  @map("actor_role")
  before     Json?                           // State before change
  after      Json?                           // State after change
  metadata   Json?                           // Additional context
  ipAddress  String?  @map("ip_address")
  userAgent  String?  @map("user_agent")
  createdAt  DateTime @default(now()) @map("created_at")

  @@index([entityType, entityId])
  @@index([actorId])
  @@index([createdAt])
  @@map("audit_logs")
}
```

```typescript
// src/lib/audit.ts
export async function createAuditLog(params: {
  entityType: string
  entityId: string
  action: 'CREATE' | 'UPDATE' | 'DELETE'
  actorId?: string
  actorRole?: string
  before?: Record<string, unknown>
  after?: Record<string, unknown>
  metadata?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
}): Promise<void> {
  await db.auditLog.create({ data: params })
}
```

---

---

# PART 5 — DTO, VALIDATION & TYPE SYSTEM RULES

## 5.1 DTO Definition Rules (No Duplicates)

🔴 **RULE DTO-1**: There is EXACTLY ONE Zod schema per input shape. No duplicate schemas.

🔴 **RULE DTO-2**: All TypeScript types for a domain entity are inferred from the single Zod schema. Never hand-write a type that mirrors a Zod schema.

```typescript
// src/modules/users/user.schema.ts — THE SINGLE SOURCE OF TRUTH

import { z } from 'zod'

// ── BASE ─────────────────────────────────────────────────────────────
const UserBaseSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().toLowerCase(),
})

// ── INPUT SCHEMAS (for API/action layer validation) ──────────────────
export const CreateUserSchema = UserBaseSchema.extend({
  password: z.string().min(8).max(128),
  role: z.enum(['ADMIN', 'USER']).default('USER'),
})

export const UpdateUserSchema = UserBaseSchema.partial().extend({
  role: z.enum(['ADMIN', 'USER']).optional(),
})

export const UserIdSchema = z.object({
  id: z.string().cuid2(),
})

export const ListUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  role: z.enum(['ADMIN', 'USER']).optional(),
  orderBy: z.enum(['name', 'email', 'createdAt']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
})

// ── INFERRED TYPES (no hand-written types that duplicate these) ───────
export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
export type ListUsersQuery = z.infer<typeof ListUsersQuerySchema>
```

🔴 **RULE DTO-3**: Response types are derived from the Prisma model using `Omit` / `Pick` / `Select`. Never define a response type from scratch if it mirrors a Prisma model.

```typescript
// src/modules/users/user.types.ts

import type { User as PrismaUser } from '@prisma/client'
import type { CreateUserSchema, UpdateUserSchema } from './user.schema'

// ── DB MODEL (Prisma generates this — don't redefine it)
export type { User as DbUser } from '@prisma/client'

// ── RESPONSE TYPES (derive from Prisma type, omit sensitive fields)
export type UserResponse = Omit<PrismaUser, 'passwordHash' | 'deletedAt'>

export type UserListResponse = {
  data: UserResponse[]
  pagination: PaginationMeta
}

// ── INPUT TYPES (derive from Zod schemas, never duplicate)
export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
```

🔴 **RULE DTO-4**: Never define the same DTO in both a module file AND a route handler. The route handler ALWAYS imports from the module schema.

```typescript
// src/app/api/users/route.ts

// ❌ VIOLATION: Re-defining schema in route
const schema = z.object({ name: z.string(), email: z.string() })
const body = schema.parse(await req.json())

// ✅ CORRECT: Import from module
import { CreateUserSchema } from '@/modules/users'
const body = CreateUserSchema.parse(await req.json())
```

---

## 5.2 Zod Schema Rules

🔴 **RULE ZOD-1**: ALL external input MUST be validated with Zod before use:
- API route request bodies
- API route query parameters
- Server Action arguments
- URL search params
- Environment variables
- Third-party webhook payloads

🔴 **RULE ZOD-2**: Never use `schema.parse()` in route handlers — use `schema.safeParse()` and handle the error case.

```typescript
// ❌ VIOLATION: parse() throws, which creates unhandled promise rejection patterns
const body = CreateUserSchema.parse(await req.json())

// ✅ CORRECT: safeParse() returns a Result type
const parsed = CreateUserSchema.safeParse(await req.json())
if (!parsed.success) {
  return NextResponse.json(
    { error: 'VALIDATION_ERROR', details: parsed.error.flatten() },
    { status: 400 }
  )
}
const body = parsed.data
```

🟠 **RULE ZOD-3**: Email fields MUST use `.email().toLowerCase()` — normalize before storage.

🟠 **RULE ZOD-4**: String fields MUST have explicit `.min()` and `.max()` bounds.

🟠 **RULE ZOD-5**: ID fields MUST validate format — `.cuid2()` for CUID2, `.uuid()` for UUID.

🟠 **RULE ZOD-6**: Use `z.coerce.number()` for query parameters (they arrive as strings from URL).

🟡 **RULE ZOD-7**: Compose schemas with `extend`, `merge`, `partial`, `omit`, `pick` rather than rewriting from scratch.

```typescript
// ✅ CORRECT: Schema composition
const AdminUpdateUserSchema = UpdateUserSchema.extend({
  role: z.enum(['ADMIN', 'USER', 'SUPERADMIN']),  // Admin can set more roles
  isActive: z.boolean().optional(),
})
```

🟡 **RULE ZOD-8**: Use `z.discriminatedUnion` for polymorphic payloads.

```typescript
const WebhookPayloadSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('user.created'), data: UserCreatedEventSchema }),
  z.object({ type: z.literal('user.deleted'), data: UserDeletedEventSchema }),
  z.object({ type: z.literal('payment.completed'), data: PaymentCompletedEventSchema }),
])
```

---

## 5.3 Type Inference Rules

🔴 **RULE INFER-1**: Never manually write a TypeScript type that could be inferred. Use `typeof`, `ReturnType<>`, `Awaited<>`, `Parameters<>`, `z.infer<>`.

```typescript
// ❌ VIOLATION: Hand-written type that mirrors function signature
type ServiceResult = { user: User; token: string }
async function loginUser(...): Promise<ServiceResult> { ... }

// ✅ CORRECT: Infer the type from the function
async function loginUser(...) {
  // ...
  return { user, token }
}
type LoginResult = Awaited<ReturnType<typeof loginUser>>
```

🟠 **RULE INFER-2**: Use `Prisma.UserGetPayload<...>` to type Prisma query results when using `include` or `select`.

```typescript
import type { Prisma } from '@prisma/client'

// Type-safe result of a Prisma query with includes
type UserWithPosts = Prisma.UserGetPayload<{
  include: { posts: true }
}>

// Or derive from the actual query
const userWithPosts = await db.user.findUnique({
  where: { id },
  include: { posts: true },
})
type UserWithPostsResult = typeof userWithPosts
```

---

## 5.4 Response Type Rules

🔴 **RULE RESPONSE-1**: Every API response has an explicit TypeScript type. Never return `any` or untyped objects from route handlers.

🔴 **RULE RESPONSE-2**: Sensitive fields MUST be excluded from all responses:
- `passwordHash`
- `deletedAt` (for non-admin endpoints)
- Internal system fields
- Any PII not needed by the consumer

```typescript
// src/modules/users/user.types.ts

// The DB user type includes ALL fields
type DbUser = Prisma.User  // { id, email, passwordHash, role, createdAt, updatedAt, deletedAt }

// The response type omits sensitive fields
export type UserResponse = Omit<DbUser, 'passwordHash' | 'deletedAt'>

// Helper to create a safe response (never miss a field)
export function toUserResponse(user: DbUser): UserResponse {
  const { passwordHash, deletedAt, ...safeUser } = user
  return safeUser
}
```

🟠 **RULE RESPONSE-3**: All list responses MUST include pagination metadata:

```typescript
export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type PaginatedResponse<T> = {
  data: T[]
  pagination: PaginationMeta
}
```

---

## 5.5 Enum Rules

�� **RULE ENUM-1**: Enums that are also in the DB schema MUST use `as const` objects (not TypeScript `enum`), synchronized with Prisma enum values.

```typescript
// ❌ VIOLATION: TypeScript enum creates runtime object with reverse mappings
enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// ✅ CORRECT: const object, matches Prisma enum values exactly
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  GUEST: 'GUEST',
} as const
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]
// UserRole = 'ADMIN' | 'USER' | 'GUEST'
```

🟠 **RULE ENUM-2**: All Zod schemas for enum fields use `z.enum([...values] as const)`, derived from the const object:

```typescript
const USER_ROLE_VALUES = Object.values(USER_ROLES) as [UserRole, ...UserRole[]]
export const UserRoleSchema = z.enum(USER_ROLE_VALUES)
```

---

---

# PART 6 — REPOSITORY PATTERN RULES

## 6.1 Repository Layer Rules

🔴 **RULE REPO-1**: ALL database access MUST go through a repository class. No direct Prisma calls in services, route handlers, or server actions.

🔴 **RULE REPO-2**: Repositories MUST NOT contain business logic. They query the database and return typed results. Nothing else.

🔴 **RULE REPO-3**: Every repository method MUST have a return type annotation.

```typescript
// src/modules/users/user.repository.ts

import type { Prisma, User } from '@prisma/client'

import { db } from '@/lib/db'
import type { CreateUserInput, UpdateUserInput } from './user.types'

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    return db.user.findUnique({ where: { id, deletedAt: null } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return db.user.findFirst({
      where: { email: email.toLowerCase(), deletedAt: null },
    })
  }

  async findMany(params: {
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
    skip?: number
    take?: number
  }): Promise<User[]> {
    return db.user.findMany({
      where: { deletedAt: null, ...params.where },
      orderBy: params.orderBy,
      skip: params.skip,
      take: params.take,
    })
  }

  async count(where?: Prisma.UserWhereInput): Promise<number> {
    return db.user.count({ where: { deletedAt: null, ...where } })
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return db.user.create({ data })
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return db.user.update({ where: { id }, data })
  }

  async softDelete(id: string): Promise<User> {
    return db.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  }
}

// Export a singleton instance
export const userRepository = new UserRepository()
```

---

## 6.2 No Duplicate Repository Logic

🔴 **RULE REPO-4**: Before adding a new repository method, grep for existing methods that do the same thing:

```bash
# Search for existing findBy* methods in user repository
grep -n "async find\|async count\|async create\|async update\|async delete" \
  src/modules/users/user.repository.ts
```

🔴 **RULE REPO-5**: If two repositories need similar query logic, extract to a `BaseRepository`:

```typescript
// src/lib/base.repository.ts

import type { Prisma } from '@prisma/client'

import { db } from '@/lib/db'

export type PaginationParams = {
  page: number
  limit: number
}

export type PaginatedResult<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export abstract class BaseRepository<
  T,
  CreateInput,
  UpdateInput,
  WhereInput,
  OrderByInput,
> {
  protected abstract get model(): {
    findUnique: (args: { where: { id: string } }) => Promise<T | null>
    findMany: (args: { where?: WhereInput; skip?: number; take?: number; orderBy?: OrderByInput }) => Promise<T[]>
    count: (args: { where?: WhereInput }) => Promise<number>
    create: (args: { data: CreateInput }) => Promise<T>
    update: (args: { where: { id: string }; data: UpdateInput }) => Promise<T>
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } })
  }

  async paginate(
    params: PaginationParams,
    where?: WhereInput,
    orderBy?: OrderByInput,
  ): Promise<PaginatedResult<T>> {
    const skip = (params.page - 1) * params.limit
    const [data, total] = await Promise.all([
      this.model.findMany({ where, skip, take: params.limit, orderBy }),
      this.model.count({ where }),
    ])
    return {
      data,
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit),
    }
  }
}
```

---

## 6.3 Query Builder Rules

🟠 **RULE QUERY-1**: Never build raw SQL strings for filtering. Use Prisma's typed `where` objects.

🟠 **RULE QUERY-2**: Always use `select` or `omit` when you know exactly which fields you need. Avoid fetching full records when you only need 2-3 fields.

```typescript
// ❌ VIOLATION: Fetching full record for a display list
const users = await db.user.findMany()
return users.map(u => ({ id: u.id, name: u.name }))

// ✅ CORRECT: Select only needed fields
const users = await db.user.findMany({
  select: { id: true, name: true },
})
```

🟠 **RULE QUERY-3**: Always use `include` or nested `select` for related data. Never make N+1 queries.

```typescript
// ❌ VIOLATION: N+1 query (1 post query + N author queries)
const posts = await db.post.findMany()
const postsWithAuthors = await Promise.all(
  posts.map(async (post) => {
    const author = await db.user.findUnique({ where: { id: post.authorId } })
    return { ...post, author }
  })
)

// ✅ CORRECT: Single query with include
const posts = await db.post.findMany({
  include: { author: { select: { id: true, name: true, email: true } } },
})
```

---

## 6.4 Transaction Rules

🔴 **RULE TX-1**: Any operation that modifies MORE THAN ONE table MUST use a database transaction.

```typescript
// ✅ CORRECT: Multi-table write in transaction
async function transferCredits(fromUserId: string, toUserId: string, amount: number): Promise<void> {
  await db.$transaction(async (tx) => {
    const sender = await tx.user.findUnique({ where: { id: fromUserId } })
    if (!sender || sender.credits < amount) {
      throw new Error('INSUFFICIENT_CREDITS')
    }
    await tx.user.update({
      where: { id: fromUserId },
      data: { credits: { decrement: amount } },
    })
    await tx.user.update({
      where: { id: toUserId },
      data: { credits: { increment: amount } },
    })
    await tx.creditTransfer.create({
      data: { fromUserId, toUserId, amount }
    })
  })
}
```

🟠 **RULE TX-2**: Transactions MUST NOT contain external I/O (HTTP calls, email sending). Transactions should be as short as possible. Move email/events to AFTER the transaction.

```typescript
// ✅ CORRECT: Separate transaction from side effects
async function createUser(input: CreateUserInput): Promise<User> {
  // 1. DB transaction (fast, atomic)
  const user = await db.$transaction(async (tx) => {
    const user = await tx.user.create({ data: input })
    await tx.userProfile.create({ data: { userId: user.id } })
    return user
  })

  // 2. Side effects AFTER transaction (non-blocking if possible)
  await emailService.sendWelcomeEmail(user.email, user.name)

  return user
}
```

🟠 **RULE TX-3**: Set a timeout on long-running transactions.

```typescript
await db.$transaction(async (tx) => {
  // ...
}, {
  maxWait: 5000,  // Max time waiting for transaction slot
  timeout: 10000, // Max transaction duration
})
```

---

## 6.5 Pagination Rules

🔴 **RULE PAGINATION-1**: ALL list endpoints MUST be paginated. Never return unbounded lists.

🔴 **RULE PAGINATION-2**: Maximum page size is 100 records. Never return more than 100 in a single request.

🟠 **RULE PAGINATION-3**: Use cursor-based pagination for high-performance infinite scroll. Use offset-based pagination for traditional page navigation.

```typescript
// ── OFFSET PAGINATION (for traditional paging) ────────────────────────────
async function listUsers(params: ListUsersQuery): Promise<PaginatedResult<UserResponse>> {
  const { page, limit, search, role, orderBy, order } = params
  const skip = (page - 1) * limit

  const where: Prisma.UserWhereInput = {
    deletedAt: null,
    ...(role && { role }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
    }),
  }

  const [data, total] = await Promise.all([
    userRepository.findMany({ where, orderBy: { [orderBy]: order }, skip, take: limit }),
    userRepository.count(where),
  ])

  return {
    data: data.map(toUserResponse),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPreviousPage: page > 1,
  }
}

// ── CURSOR PAGINATION (for infinite scroll / feeds) ───────────────────────
async function listPostsFeed(params: {
  cursor?: string
  limit: number
}): Promise<{ data: Post[]; nextCursor: string | null }> {
  const items = await db.post.findMany({
    take: params.limit + 1,  // fetch one extra to check if there's a next page
    ...(params.cursor && { cursor: { id: params.cursor }, skip: 1 }),
    orderBy: { createdAt: 'desc' },
    where: { deletedAt: null },
  })

  const hasNextPage = items.length > params.limit
  const data = hasNextPage ? items.slice(0, -1) : items
  const nextCursor = hasNextPage ? data[data.length - 1]?.id ?? null : null

  return { data, nextCursor }
}
```

---

---

# PART 7 — SERVICE LAYER RULES

## 7.1 Service Layer Responsibility

The service layer owns all business logic. It is the ONLY place where business rules live.

| ✅ Service DOES | ❌ Service DOES NOT |
|----------------|-------------------|
| Validate business rules | Parse HTTP requests |
| Coordinate repository calls | Access Prisma directly |
| Handle transactions | Render HTML/JSX |
| Emit events/jobs | Check HTTP auth headers |
| Hash passwords | Read cookies directly |
| Calculate derived values | Format API responses |
| Enforce authorization (by checking permissions passed to it) | Make auth decisions |

---

## 7.2 No Duplicate Service Logic

🔴 **RULE SVC-1**: Before implementing any service method, search for existing implementations:

```bash
grep -rn "function.*create\|function.*update\|function.*delete\|function.*validate" \
  src/modules/*/\*.service.ts
```

🔴 **RULE SVC-2**: Shared business logic MUST be extracted to a utility in `src/lib/` or a shared service in `src/modules/shared/`.

Common candidates for shared services:
- Slug generation
- Email normalization
- Permission checking
- Rate limit management
- File upload handling
- Search indexing

---

## 7.3 Service Composition Rules

🔴 **RULE SVC-3**: Services are injected (or imported as singletons), never instantiated inline in handlers.

```typescript
// src/modules/users/user.service.ts

import { userRepository } from './user.repository'
import type { EmailService } from '@/lib/services/email.service'
import type { UserRepository } from './user.repository'

export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly emailSvc: EmailService,
  ) {}

  async createUser(input: CreateUserInput, actorId?: string): Promise<CreateUserResult> {
    // Business rule 1: Email must be unique
    const existing = await this.userRepo.findByEmail(input.email)
    if (existing) {
      return { success: false, error: 'EMAIL_TAKEN', message: 'Email is already in use' }
    }

    // Business rule 2: Password must be hashed
    const passwordHash = await hashPassword(input.password)

    // Create user
    const user = await this.userRepo.create({
      name: input.name,
      email: input.email.toLowerCase(),
      passwordHash,
      role: input.role,
    })

    // Side effect: welcome email (non-blocking)
    void this.emailSvc.sendWelcomeEmail(user.email, user.name)

    return { success: true, user: toUserResponse(user) }
  }
}

// Singleton for use in route handlers
import { emailService } from '@/lib/services/email.service'
export const userService = new UserService(userRepository, emailService)
```

🟠 **RULE SVC-4**: Services MUST be instantiated as singletons and exported. Never `new UserService()` inside a route handler.

```typescript
// ❌ VIOLATION: New instance per request
export async function POST(req: NextRequest) {
  const service = new UserService(new UserRepository(), new EmailService())
  // ...
}

// ✅ CORRECT: Imported singleton
import { userService } from '@/modules/users'
export async function POST(req: NextRequest) {
  const result = await userService.createUser(body)
  // ...
}
```

---

## 7.4 Error Handling in Services

🔴 **RULE SVC-5**: Services use typed Result types, not thrown errors, for expected failure cases (validation, not found, conflict).

```typescript
// src/lib/errors.ts — Typed error classes for UNEXPECTED failures only

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number,
    public readonly details?: unknown,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    super(
      `${resource}${id ? ` with id ${id}` : ''} not found`,
      'NOT_FOUND',
      404,
    )
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 'FORBIDDEN', 403)
  }
}

export class ConflictError extends AppError {
  constructor(message: string, code: string) {
    super(message, code, 409)
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfterSeconds: number) {
    super('Too many requests', 'RATE_LIMIT_EXCEEDED', 429, { retryAfterSeconds })
  }
}
```

🟠 **RULE SVC-6**: Services throw `AppError` subclasses for infrastructure failures (DB connection lost, external API down). Route handlers catch `AppError` and convert to HTTP responses.

```typescript
// ✅ Pattern: Service uses Result for business failures, throws AppError for infra failures
async function getUserById(id: string): Promise<GetUserResult> {
  try {
    const user = await userRepository.findById(id)
    if (!user) {
      return { success: false, error: 'USER_NOT_FOUND' }
    }
    return { success: true, user: toUserResponse(user) }
  } catch (error) {
    // DB failure — throw up, let global error handler deal with it
    throw new AppError('Database query failed', 'DB_ERROR', 500)
  }
}
```

---

## 7.5 Side Effect Management

🟠 **RULE SVC-7**: Fire-and-forget side effects MUST use `void` keyword to silence the floating promise lint error, AND be wrapped in try/catch.

```typescript
// ❌ VIOLATION: Floating promise silently fails
this.emailService.sendWelcomeEmail(user.email, user.name)

// ✅ CORRECT: Explicit fire-and-forget with error logging
void this.emailService.sendWelcomeEmail(user.email, user.name).catch((err) => {
  logger.error('Failed to send welcome email', { userId: user.id, error: err })
})
```

🟠 **RULE SVC-8**: For critical side effects (audit logs, webhooks), use background jobs (Trigger.dev/Inngest), not fire-and-forget.

```typescript
// ✅ CORRECT: Background job for reliable execution
import { client } from '@/lib/trigger'

await client.sendEvent({
  name: 'user.created',
  payload: { userId: user.id, email: user.email },
})
```

---

---

# PART 8 — API LAYER RULES

## 8.1 Route Handler Rules

🔴 **RULE API-1**: Every route handler MUST follow this exact structure:

```typescript
// src/app/api/users/route.ts

import { type NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { AppError } from '@/lib/errors'
import { logger } from '@/lib/logger'
import { userService } from '@/modules/users'
import { CreateUserSchema, ListUsersQuerySchema } from '@/modules/users'
import { USER_ROLES } from '@/constants/roles'

// GET /api/users
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // 1. Authentication check (ALWAYS first)
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
    }

    // 2. Authorization check
    if (session.user.role !== USER_ROLES.ADMIN) {
      return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 })
    }

    // 3. Parse & validate input
    const query = Object.fromEntries(req.nextUrl.searchParams)
    const parsed = ListUsersQuerySchema.safeParse(query)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    // 4. Call service
    const result = await userService.listUsers(parsed.data)

    // 5. Return response
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    // 6. Error handling
    return handleApiError(error)
  }
}

// POST /api/users
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
    }
    if (session.user.role !== USER_ROLES.ADMIN) {
      return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 })
    }

    const body: unknown = await req.json()
    const parsed = CreateUserSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const result = await userService.createUser(parsed.data, session.user.id)
    if (!result.success) {
      const statusMap = {
        EMAIL_TAKEN: 409,
        VALIDATION_ERROR: 400,
      } as const
      return NextResponse.json(
        { error: result.error, message: result.message },
        { status: statusMap[result.error] ?? 400 },
      )
    }

    return NextResponse.json(result.user, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

// Central error handler — import from lib
function handleApiError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.code, message: error.message, details: error.details },
      { status: error.statusCode },
    )
  }
  logger.error('Unhandled API error', { error })
  return NextResponse.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 })
}
```

🔴 **RULE API-2**: Route handlers are the ONLY layer that reads HTTP context (cookies, headers, query params). They pass typed data to the service layer.

🔴 **RULE API-3**: Auth check is ALWAYS the FIRST thing in a route handler, before ANY other logic.

🟠 **RULE API-4**: Never parse request body twice. Parse once with `req.json()` and pass to Zod.

---

## 8.2 Server Action Rules

🔴 **RULE ACTION-1**: Server Actions follow the same structure: auth → validate → service → return.

```typescript
// src/modules/users/user.actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { userService } from './user.service'
import { CreateUserSchema } from './user.schema'
import { USER_ROLES } from '@/constants/roles'

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string; details?: unknown }

export async function createUserAction(
  formData: FormData,
): Promise<ActionResult<UserResponse>> {
  // 1. Auth
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: 'UNAUTHORIZED' }
  }
  if (session.user.role !== USER_ROLES.ADMIN) {
    return { success: false, error: 'FORBIDDEN' }
  }

  // 2. Parse form data into object
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  }

  // 3. Validate
  const parsed = CreateUserSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: 'VALIDATION_ERROR', details: parsed.error.flatten() }
  }

  // 4. Service call
  const result = await userService.createUser(parsed.data, session.user.id)
  if (!result.success) {
    return { success: false, error: result.error, details: result.message }
  }

  // 5. Revalidate (only for mutations)
  revalidatePath('/users')

  return { success: true, data: result.user }
}
```

🔴 **RULE ACTION-2**: All Server Actions are `'use server'` files. Never mix with Client Components.

🟠 **RULE ACTION-3**: Server Actions that mutate data MUST call `revalidatePath` or `revalidateTag` for the affected routes.

🟠 **RULE ACTION-4**: Use `useFormState` (React 19: `useActionState`) to handle Server Action results in forms. Never throw errors from server actions — always return Result types.

---

## 8.3 Response Format Standards

🔴 **RULE RESP-1**: ALL API responses follow a consistent JSON structure:

```typescript
// Success response (single resource)
{ "id": "...", "name": "...", "email": "..." }

// Success response (list with pagination)
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}

// Error response
{
  "error": "VALIDATION_ERROR",
  "message": "Request validation failed",
  "details": {
    "fieldErrors": {
      "email": ["Invalid email format"],
      "name": ["Name is required"]
    }
  }
}
```

🔴 **RULE RESP-2**: Never expose stack traces or internal error details in production API responses.

🟠 **RULE RESP-3**: Use appropriate HTTP status codes:

| Scenario | Status Code |
|----------|------------|
| Created | 201 |
| Updated/Deleted | 200 (with body) or 204 (no body) |
| Validation error | 400 |
| Not authenticated | 401 |
| Authenticated but not authorized | 403 |
| Resource not found | 404 |
| Resource conflict (duplicate) | 409 |
| Input creates an impossible state | 422 |
| Rate limited | 429 |
| Server error | 500 |

---

## 8.4 Error Response Standards

🔴 **RULE ERROR-1**: Create a centralized `handleApiError` utility. Every route handler uses it.

```typescript
// src/lib/api-error-handler.ts

import { NextResponse } from 'next/server'

import { AppError } from './errors'
import { logger } from './logger'

export function handleApiError(error: unknown): NextResponse {
  // Known application errors
  if (error instanceof AppError) {
    // Don't log 4xx errors as they're client mistakes
    if (error.statusCode >= 500) {
      logger.error('Server error', { code: error.code, message: error.message })
    }
    return NextResponse.json(
      {
        error: error.code,
        message: error.message,
        ...(error.details ? { details: error.details } : {}),
      },
      { status: error.statusCode },
    )
  }

  // Unknown errors — log fully, return generic message
  logger.error('Unhandled API error', { error })
  return NextResponse.json(
    { error: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' },
    { status: 500 },
  )
}
```

---

## 8.5 Rate Limiting Rules

🔴 **RULE RATE-1**: ALL authentication endpoints MUST have rate limiting:
- Login: 5 attempts per 15 minutes per IP
- Registration: 3 per hour per IP  
- Password reset: 3 per hour per email

🟠 **RULE RATE-2**: ALL public-facing API endpoints MUST have rate limiting.

🟡 **RULE RATE-3**: Use Upstash Redis for rate limiting with the `@upstash/ratelimit` package.

```typescript
// src/lib/rate-limit.ts

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export const rateLimiters = {
  // For auth endpoints
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '15 m'),
    prefix: 'rl:auth',
  }),
  // For API endpoints
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'),
    prefix: 'rl:api',
  }),
}

export async function checkRateLimit(
  limiter: Ratelimit,
  identifier: string,
): Promise<{ allowed: boolean; reset: number; remaining: number }> {
  const result = await limiter.limit(identifier)
  return {
    allowed: result.success,
    reset: Math.ceil((result.reset - Date.now()) / 1000),
    remaining: result.remaining,
  }
}
```

---

## 8.6 Input Sanitization Rules

🔴 **RULE SANITIZE-1**: Trim all string inputs. Use `.trim()` in Zod schemas.

🔴 **RULE SANITIZE-2**: Normalize emails to lowercase before storage and lookup.

🔴 **RULE SANITIZE-3**: Never interpolate user input directly into:
- SQL queries (use Prisma's parameterized queries)
- HTML templates (use React's JSX escaping)
- Shell commands (avoid shell entirely)
- File paths (use `path.resolve` + validate is within expected directory)

🟠 **RULE SANITIZE-4**: For rich text/HTML input, use DOMPurify (client-side) or `sanitize-html` (server-side).

---

---

# PART 9 — AUTHENTICATION & AUTHORIZATION RULES

## 9.1 Authentication Architecture Decision

```
Authentication answers: WHO are you?
Authorization answers: WHAT can you do?
```

🔴 **RULE AUTHZ-0**: Authentication and authorization are SEPARATE concerns. NEVER check both in a single if-statement.

```typescript
// ❌ VIOLATION: Mixed auth check
if (!session || session.user.role !== 'ADMIN') {
  return redirect('/login')  // Wrong! Unauthenticated users get same redirect as unauthorized
}

// ✅ CORRECT: Separate checks with appropriate responses
if (!session) {
  return redirect('/login')  // Not authenticated → go to login
}
if (session.user.role !== 'ADMIN') {
  return redirect('/403')    // Authenticated but not authorized → show 403
}
```

---

## 9.2 NextAuth.js Rules

🔴 **RULE NEXTAUTH-1**: ALWAYS augment the NextAuth session types to include custom fields.

```typescript
// src/types/next-auth.d.ts

import type { UserRole } from '@prisma/client'
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: UserRole
      image?: string | null
    }
  }

  interface User {
    id: string
    role: UserRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: UserRole
  }
}
```

🔴 **RULE NEXTAUTH-2**: Auth configuration lives in `src/lib/auth.ts`. Never spread it across multiple files.

```typescript
// src/lib/auth.ts

import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from './db'
import { verifyPassword } from './crypto'
import { LoginSchema } from '@/modules/auth/auth.schema'
import { USER_ROLES } from '@/constants/roles'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },  // Use JWT for edge middleware compatibility

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Always validate with Zod even in authorize
        const parsed = LoginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await db.user.findFirst({
          where: { email: parsed.data.email.toLowerCase(), deletedAt: null },
        })
        if (!user?.passwordHash) return null

        const isValid = await verifyPassword(parsed.data.password, user.passwordHash)
        if (!isValid) return null

        return { id: user.id, name: user.name, email: user.email, role: user.role }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      return session
    },
  },

  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
})
```

🟠 **RULE NEXTAUTH-3**: Use `auth()` from `src/lib/auth.ts` for session in Server Components/Route Handlers. Use `useSession()` ONLY in Client Components.

---

## 9.3 JWT Rules

🔴 **RULE JWT-1**: JWT secrets MUST be at least 32 random bytes (64 hex chars). Use `openssl rand -hex 32` to generate.

🔴 **RULE JWT-2**: JWT tokens MUST expire. Access tokens: 15-60 minutes. Refresh tokens: 7-30 days.

🔴 **RULE JWT-3**: NEVER store sensitive data in JWT payload (passwords, PII beyond what's needed, full permission lists).

🔴 **RULE JWT-4**: JWT payload MUST contain `sub` (subject = user ID), `iat` (issued at), `exp` (expires), `jti` (unique ID for revocation if needed).

🟠 **RULE JWT-5**: For stateless revocation, maintain a token blocklist in Redis (check on each request).

---

## 9.4 Session Management Rules

🔴 **RULE SESSION-1**: Use database sessions for security-critical apps (banking, healthcare). Use JWT sessions for performance-critical apps (content platforms).

| Strategy | Pros | Cons | Use When |
|----------|------|------|----------|
| JWT | Fast, no DB lookup per request | Can't revoke immediately | Content platforms, low-security apps |
| Database | Instant revocation, full control | DB lookup per request | Finance, health, admin systems |
| Hybrid | JWT + Redis blocklist | Complex, Redis dependency | Security + performance needed |

🔴 **RULE SESSION-2**: Session cookies MUST have:
- `HttpOnly: true` (prevents JS access)
- `Secure: true` (HTTPS only, in production)
- `SameSite: lax` (CSRF protection)
- Appropriate `Max-Age`

🟠 **RULE SESSION-3**: On password change or logout, invalidate ALL existing sessions for that user.

---

## 9.5 Role-Based Access Control (RBAC)

🔴 **RULE RBAC-1**: Role definitions are the SINGLE SOURCE OF TRUTH in `src/constants/roles.ts`.

```typescript
// src/constants/roles.ts

export const USER_ROLES = {
  SUPERADMIN: 'SUPERADMIN',  // Platform administrators
  ADMIN: 'ADMIN',            // Organization admins
  MANAGER: 'MANAGER',        // Team managers
  USER: 'USER',              // Regular users
  GUEST: 'GUEST',            // Read-only access
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

// Role hierarchy: higher index = more permissions
export const ROLE_HIERARCHY: UserRole[] = [
  USER_ROLES.GUEST,
  USER_ROLES.USER,
  USER_ROLES.MANAGER,
  USER_ROLES.ADMIN,
  USER_ROLES.SUPERADMIN,
]

/** Returns true if actorRole has at least as much access as requiredRole */
export function hasMinimumRole(actorRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY.indexOf(actorRole) >= ROLE_HIERARCHY.indexOf(requiredRole)
}
```

🔴 **RULE RBAC-2**: Permission definitions live in `src/constants/permissions.ts`:

```typescript
// src/constants/permissions.ts

export const PERMISSIONS = {
  // Users
  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  USERS_DELETE: 'users:delete',
  // Posts
  POSTS_READ: 'posts:read',
  POSTS_WRITE: 'posts:write',
  POSTS_DELETE: 'posts:delete',
  POSTS_PUBLISH: 'posts:publish',
  // Admin
  ADMIN_ACCESS: 'admin:access',
  BILLING_MANAGE: 'billing:manage',
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

// Role → Permissions mapping (single source of truth)
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPERADMIN: Object.values(PERMISSIONS),  // All permissions
  ADMIN: [
    PERMISSIONS.USERS_READ, PERMISSIONS.USERS_WRITE, PERMISSIONS.USERS_DELETE,
    PERMISSIONS.POSTS_READ, PERMISSIONS.POSTS_WRITE, PERMISSIONS.POSTS_DELETE,
    PERMISSIONS.POSTS_PUBLISH, PERMISSIONS.ADMIN_ACCESS, PERMISSIONS.BILLING_MANAGE,
  ],
  MANAGER: [
    PERMISSIONS.USERS_READ,
    PERMISSIONS.POSTS_READ, PERMISSIONS.POSTS_WRITE, PERMISSIONS.POSTS_PUBLISH,
  ],
  USER: [
    PERMISSIONS.POSTS_READ, PERMISSIONS.POSTS_WRITE,
  ],
  GUEST: [
    PERMISSIONS.POSTS_READ,
  ],
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}
```

🔴 **RULE RBAC-3**: Permission checking is done via `hasPermission()`, NOT string comparisons.

```typescript
// ❌ VIOLATION: String comparison
if (session.user.role === 'ADMIN' || session.user.role === 'SUPERADMIN') { ... }

// ✅ CORRECT: Permission check
import { hasPermission, PERMISSIONS } from '@/constants/permissions'
if (!hasPermission(session.user.role, PERMISSIONS.USERS_WRITE)) {
  return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 })
}
```

---

## 9.6 Attribute-Based Access Control (ABAC)

For complex rules like "users can only edit their own posts":

🟠 **RULE ABAC-1**: Ownership checks MUST be explicit. Never rely on the client to filter.

```typescript
// src/lib/access-control.ts

import type { Session } from 'next-auth'

export type AccessContext = {
  user: Session['user']
  resource: { ownerId?: string; organizationId?: string; [key: string]: unknown }
}

export function canAccess(
  action: 'read' | 'write' | 'delete',
  context: AccessContext,
): boolean {
  const { user, resource } = context

  // Superadmin can do anything
  if (user.role === 'SUPERADMIN') return true

  // Owner can always read/write/delete their own resources
  if (resource.ownerId === user.id) return true

  // Role-based fallback
  switch (action) {
    case 'read':
      return hasPermission(user.role, PERMISSIONS.POSTS_READ)
    case 'write':
      return hasPermission(user.role, PERMISSIONS.POSTS_WRITE)
    case 'delete':
      return hasPermission(user.role, PERMISSIONS.POSTS_DELETE)
  }
}
```

---

## 9.7 Middleware & Route Protection Rules

🔴 **RULE MIDDLEWARE-1**: Use Next.js middleware (`src/middleware.ts`) to protect route groups.

```typescript
// src/middleware.ts

import { auth } from '@/lib/auth'
import { ROUTES } from '@/constants/routes'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuthenticated = !!req.auth?.user

  // Protected app routes
  const isAppRoute = pathname.startsWith('/(app)') || pathname.startsWith('/dashboard')
  if (isAppRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url))
  }

  // Admin routes require ADMIN or SUPERADMIN role
  const isAdminRoute = pathname.startsWith('/admin')
  if (isAdminRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url))
    }
    const role = req.auth?.user?.role
    if (role !== 'ADMIN' && role !== 'SUPERADMIN') {
      return NextResponse.redirect(new URL('/403', req.url))
    }
  }

  // Auth routes (login/register) → redirect to dashboard if already logged in
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register')
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.url))
  }

  return NextResponse.next()
})

export const config = {
  // Run middleware on all routes except static assets and Next.js internals
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
```

🟠 **RULE MIDDLEWARE-2**: Middleware is for ROUTING decisions only (redirect/block). Authorization logic (what they can DO) stays in route handlers and services.

---

## 9.8 Permission Checking Rules

🔴 **RULE PERM-1**: Create a `requirePermission` helper for route handlers:

```typescript
// src/lib/require-permission.ts

import { auth } from './auth'
import { hasPermission } from '@/constants/permissions'
import type { Permission } from '@/constants/permissions'
import { NextResponse } from 'next/server'

type AuthCheckResult =
  | { ok: true; session: NonNullable<Awaited<ReturnType<typeof auth>>> }
  | { ok: false; response: NextResponse }

export async function requirePermission(permission: Permission): Promise<AuthCheckResult> {
  const session = await auth()
  if (!session?.user) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 }),
    }
  }
  if (!hasPermission(session.user.role, permission)) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 }),
    }
  }
  return { ok: true, session }
}
```

```typescript
// Usage in route handler
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const check = await requirePermission(PERMISSIONS.USERS_DELETE)
  if (!check.ok) return check.response

  // Now we have check.session
  const result = await userService.deleteUser(params.id, check.session.user.id)
  // ...
}
```

---

## 9.9 Multi-Tenant Auth Rules

🔴 **RULE TENANT-1**: In multi-tenant apps, EVERY database query MUST be scoped to the current tenant.

```typescript
// src/lib/tenant-context.ts

import { auth } from './auth'

export async function getTenantContext(): Promise<{
  userId: string
  tenantId: string
  role: UserRole
}> {
  const session = await auth()
  if (!session?.user) throw new UnauthorizedError()
  if (!session.user.tenantId) throw new Error('No tenant in session')
  return {
    userId: session.user.id,
    tenantId: session.user.tenantId,
    role: session.user.role,
  }
}
```

🔴 **RULE TENANT-2**: Never trust the `tenantId` from the request body. Always derive it from the session.

```typescript
// ❌ VIOLATION: Client-provided tenantId
const { tenantId, name } = await req.json()
await db.post.create({ data: { tenantId, name } })  // Tenant injection attack!

// ✅ CORRECT: Server-derived tenantId
const { tenantId } = await getTenantContext()
const { name } = CreatePostSchema.parse(await req.json())
await db.post.create({ data: { tenantId, name } })  // Safe
```

🔴 **RULE TENANT-3**: Use Row-Level Security (RLS) at the PostgreSQL level as the final enforcement layer.

```sql
-- Enable RLS on all tenant-scoped tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON posts
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

---

## 9.10 API Key Auth Rules

🔴 **RULE APIKEY-1**: API keys are for machine-to-machine auth. They MUST be:
- Generated with `crypto.randomBytes(32).toString('hex')`
- Stored as a hashed value (SHA-256) in the database
- Sent by clients in `Authorization: Bearer <key>` header
- Validated in an API key middleware

```typescript
// src/lib/api-key.ts

import { createHash } from 'node:crypto'

import { db } from './db'

export function hashApiKey(key: string): string {
  return createHash('sha256').update(key).digest('hex')
}

export async function validateApiKey(key: string): Promise<ApiKey | null> {
  const hash = hashApiKey(key)
  return db.apiKey.findFirst({
    where: { keyHash: hash, revokedAt: null, expiresAt: { gt: new Date() } },
    include: { user: true },
  })
}
```

🔴 **RULE APIKEY-2**: API keys MUST have expiration dates. Maximum 1-year expiry.

🟠 **RULE APIKEY-3**: API keys MUST be shown to the user ONCE (at creation). Never store the plain-text key.

---

## 9.11 OAuth / Social Login Rules

🔴 **RULE OAUTH-1**: Always verify the OAuth callback URL matches the registered callback URL. NextAuth handles this automatically — never override the callback URL.

🟠 **RULE OAUTH-2**: When a user signs in with OAuth for the first time, check if an account with the same email already exists. If yes, link accounts. If no, create a new account.

🟠 **RULE OAUTH-3**: Store OAuth provider data (provider name, provider account ID) in a separate `accounts` table. Never mix with the `users` table.

---

## 9.12 MFA Rules

🟡 **RULE MFA-1**: If MFA is required, use TOTP (Time-based One-Time Password) via `@oslojs/otp` or `speakeasy`.

🟡 **RULE MFA-2**: TOTP secrets are encrypted at rest with a server-side encryption key (not just hashed).

🟡 **RULE MFA-3**: Backup codes are generated as 8-12 random codes, stored as bcrypt hashes, and each can only be used ONCE.

```typescript
// src/modules/auth/mfa.service.ts

import { generateTOTP, verifyTOTP } from '@oslojs/otp'
import { encryptValue, decryptValue } from '@/lib/crypto'

export class MFAService {
  async setupTOTP(userId: string): Promise<{ secret: string; qrCodeUrl: string }> {
    const secret = generateSecret()
    const encryptedSecret = encryptValue(secret)

    await db.user.update({
      where: { id: userId },
      data: { totpSecret: encryptedSecret, totpEnabled: false },  // Not enabled until verified
    })

    const qrCodeUrl = generateTOTPQRUrl(secret, userId)
    return { secret, qrCodeUrl }
  }

  async verifyAndEnableTOTP(userId: string, token: string): Promise<boolean> {
    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user?.totpSecret) return false

    const secret = decryptValue(user.totpSecret)
    const isValid = verifyTOTP(secret, token)

    if (isValid) {
      await db.user.update({
        where: { id: userId },
        data: { totpEnabled: true },
      })
    }
    return isValid
  }
}
```

---

---

# PART 10 — COMPONENT RULES

## 10.1 Server vs Client Component Decision Tree

🔴 **RULE COMP-1**: Default to Server Components. Add `'use client'` ONLY when needed.

```
Does this component need:
├── useState / useReducer?        → Client Component
├── useEffect / useLayoutEffect?  → Client Component
├── Browser APIs (window, document, localStorage)? → Client Component
├── Event listeners (onClick with state changes)?  → Client Component
├── Real-time updates (websocket, SSE)?            → Client Component
├── Third-party library that uses hooks?           → Client Component
└── NONE of the above?                             → Server Component ✓
```

🟠 **RULE COMP-2**: Push `'use client'` boundary as far DOWN the component tree as possible.

```tsx
// ❌ VIOLATION: Entire page is client component just for a button
'use client'
// page.tsx imports ALL data fetching + UI as client
export default function UsersPage() {
  const [users, setUsers] = useState([])
  useEffect(() => { fetch('/api/users').then(r => r.json()).then(setUsers) }, [])
  return <UserTable users={users} />
}

// ✅ CORRECT: Server component handles data, client component handles interactivity
// page.tsx (Server Component)
export default async function UsersPage() {
  const users = await userService.listUsers({ page: 1, limit: 20 })
  return <UserTable initialUsers={users} />
}

// UserTable.tsx (Client Component — only the interactive parts)
'use client'
export function UserTable({ initialUsers }: { initialUsers: User[] }) {
  const [search, setSearch] = useState('')
  // ...
}
```

---

## 10.2 Component Design Rules

🔴 **RULE COMP-3**: Every component file exports EXACTLY ONE React component. No multiple named component exports per file.

🟠 **RULE COMP-4**: Component props are always typed with an explicit `type` (not `interface`).

```tsx
type UserCardProps = {
  user: UserResponse
  onEdit?: (userId: string) => void
  isLoading?: boolean
}

export function UserCard({ user, onEdit, isLoading = false }: UserCardProps) { ... }
```

🟠 **RULE COMP-5**: Components MUST NOT directly call services or access the database. Data flows via props (Server Components pass data to child components).

🟡 **RULE COMP-6**: Components over 100 lines SHOULD be split into sub-components.

---

## 10.3 Prop Rules

🔴 **RULE PROPS-1**: Never pass `any` as a prop. Never accept `any` as a prop type.

🟠 **RULE PROPS-2**: Optional props MUST have a default value or be explicitly `undefined`-handled.

🟡 **RULE PROPS-3**: Don't spread unknown props (`{...rest}`) unless the component is explicitly a wrapper.

---

## 10.4 Composition Rules

🟠 **RULE COMP-7**: Use the `children` pattern for layout components. Don't pass JSX as arbitrary props.

```tsx
// ✅ CORRECT: children pattern
export function Card({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="rounded-lg border p-4">
      <h3>{title}</h3>
      {children}
    </div>
  )
}
```

🟡 **RULE COMP-8**: Use `React.Suspense` with a loading fallback for all async Server Components.

```tsx
// page.tsx
import { Suspense } from 'react'
import { UserTableSkeleton } from './UserTableSkeleton'
import { UserTable } from './UserTable'

export default function UsersPage() {
  return (
    <Suspense fallback={<UserTableSkeleton />}>
      <UserTable />
    </Suspense>
  )
}
```

---

## 10.5 Form Component Rules

🔴 **RULE FORM-1**: ALL forms use `react-hook-form` with `zodResolver`. Never manage form state manually.

```tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'

import { CreateUserSchema } from '@/modules/users'
import { createUserAction } from '@/modules/users/user.actions'
import type { CreateUserInput } from '@/modules/users'

export function CreateUserForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: { name: '', email: '', password: '', role: 'USER' },
  })

  function onSubmit(data: CreateUserInput) {
    startTransition(async () => {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => formData.append(key, String(value)))

      const result = await createUserAction(formData)
      if (result.success) {
        form.reset()
        toast.success('User created successfully')
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" {...field} /></FormControl>
              <FormMessage />  {/* Shows Zod validation error */}
            </FormItem>
          )}
        />
        {/* ... other fields ... */}
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create User'}
        </Button>
      </form>
    </Form>
  )
}
```

---

# PART 11 — STATE MANAGEMENT RULES

## 11.1 State Placement Decision Tree

```
Where does this state live?

Is it URL-shareable / bookmark-worthy?
├── YES → URL state (useSearchParams, router.push)
│         Examples: filters, sort order, active tab, page number
└── NO  → Is it server data (from DB/API)?
          ├── YES → TanStack Query / SWR (server state)
          │         Examples: user profile, posts list, notifications
          └── NO  → Is it needed by many unrelated components?
                    ├── YES → Zustand store (global UI state)
                    │         Examples: sidebar open, theme, selected items
                    └── NO  → Component-level useState
                              Examples: form state (use react-hook-form), modal open
```

🔴 **RULE STATE-1**: Do NOT store server data in Zustand. Server data lives in TanStack Query.

🔴 **RULE STATE-2**: Never use Context for frequently updated state (causes re-render cascades). Use Zustand.

---

## 11.2 URL State Rules

🟠 **RULE URL-1**: Use `nuqs` library for type-safe URL search params.

```typescript
import { useQueryState, parseAsInteger, parseAsString } from 'nuqs'

export function useUsersFilters() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''))
  const [role, setRole] = useQueryState('role', parseAsString)
  return { page, setPage, search, setSearch, role, setRole }
}
```

---

## 11.3 Server State Rules (React Query / SWR)

🟠 **RULE QUERY-1**: All TanStack Query keys are defined as constants, not inline strings.

```typescript
// src/lib/query-keys.ts
export const queryKeys = {
  users: {
    all: () => ['users'] as const,
    list: (params: ListUsersQuery) => ['users', 'list', params] as const,
    detail: (id: string) => ['users', 'detail', id] as const,
  },
  posts: {
    all: () => ['posts'] as const,
    list: (params: ListPostsQuery) => ['posts', 'list', params] as const,
  },
}
```

🟠 **RULE QUERY-2**: After mutations, ALWAYS invalidate affected queries.

```typescript
const { mutate: createUser } = useMutation({
  mutationFn: (data: CreateUserInput) =>
    fetch('/api/users', { method: 'POST', body: JSON.stringify(data) }).then(r => r.json()),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.users.all() })
  },
})
```

---

## 11.4 Global State Rules (Zustand)

🟠 **RULE ZUSTAND-1**: One Zustand store per feature domain. Never one giant global store.

```typescript
// src/modules/ui/ui.store.ts
import { create } from 'zustand'

type UIState = {
  isSidebarOpen: boolean
  theme: 'light' | 'dark'
  selectedUserIds: string[]
}

type UIActions = {
  toggleSidebar: () => void
  setTheme: (theme: UIState['theme']) => void
  toggleUserSelection: (id: string) => void
  clearSelection: () => void
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  isSidebarOpen: true,
  theme: 'light',
  selectedUserIds: [],
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  setTheme: (theme) => set({ theme }),
  toggleUserSelection: (id) =>
    set((s) => ({
      selectedUserIds: s.selectedUserIds.includes(id)
        ? s.selectedUserIds.filter((x) => x !== id)
        : [...s.selectedUserIds, id],
    })),
  clearSelection: () => set({ selectedUserIds: [] }),
}))
```

---

---

# PART 12 — TESTING RULES

## 12.1 Testing Strategy & Coverage Requirements

```
Test Pyramid:
         /\
        /  \
       / E2E \     (5-10% of tests) — Playwright
      /________\
     /           \
    / Integration \  (20-30% of tests) — Vitest + real DB
   /_______________\
  /                 \
 /    Unit Tests     \  (60-70% of tests) — Vitest + mocks
/______________________\
```

**Coverage Requirements:**
- All service methods: 90%+ line coverage
- All repository methods: 80%+ line coverage
- All route handlers: 80%+ line coverage (integration tests)
- Business-critical flows: 100% (auth, payments, access control)

---

## 12.2 Unit Test Rules

🔴 **RULE TEST-1**: Tests MUST test BEHAVIOR, not implementation. Test what the function DOES, not HOW it does it.

🔴 **RULE TEST-2**: Each test has ONE assertion per logical concern (not one `expect()` per test — one IDEA per test).

🔴 **RULE TEST-3**: Test file structure follows AAA pattern: Arrange, Act, Assert.

```typescript
// src/modules/users/__tests__/user.service.test.ts

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UserService } from '../user.service'
import type { UserRepository } from '../user.repository'
import type { EmailService } from '@/lib/services/email.service'

// ── MOCKS ────────────────────────────────────────────────────────────────────
const mockUserRepo: UserRepository = {
  findById: vi.fn(),
  findByEmail: vi.fn(),
  findMany: vi.fn(),
  count: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
}

const mockEmailSvc = {
  sendWelcomeEmail: vi.fn().mockResolvedValue(undefined),
} as unknown as EmailService

// ── SETUP ────────────────────────────────────────────────────────────────────
let service: UserService

beforeEach(() => {
  vi.clearAllMocks()
  service = new UserService(mockUserRepo, mockEmailSvc)
})

// ── TESTS ────────────────────────────────────────────────────────────────────
describe('UserService.createUser', () => {
  const validInput = {
    name: 'Alice',
    email: 'alice@example.com',
    password: 'password123',
    role: 'USER' as const,
  }

  it('returns EMAIL_TAKEN error if email already exists', async () => {
    // Arrange
    vi.mocked(mockUserRepo.findByEmail).mockResolvedValue({ id: 'existing-id' } as any)

    // Act
    const result = await service.createUser(validInput)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBe('EMAIL_TAKEN')
    }
    expect(mockUserRepo.create).not.toHaveBeenCalled()
  })

  it('creates user and sends welcome email on success', async () => {
    // Arrange
    vi.mocked(mockUserRepo.findByEmail).mockResolvedValue(null)
    const createdUser = { id: 'new-id', name: 'Alice', email: 'alice@example.com', role: 'USER' }
    vi.mocked(mockUserRepo.create).mockResolvedValue(createdUser as any)

    // Act
    const result = await service.createUser(validInput)

    // Assert
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.user.id).toBe('new-id')
      expect(result.user.email).toBe('alice@example.com')
    }
    // Side effect: welcome email sent
    expect(mockEmailSvc.sendWelcomeEmail).toHaveBeenCalledWith('alice@example.com', 'Alice')
  })

  it('normalizes email to lowercase', async () => {
    // Arrange
    vi.mocked(mockUserRepo.findByEmail).mockResolvedValue(null)
    vi.mocked(mockUserRepo.create).mockResolvedValue({ id: 'id', email: 'alice@example.com' } as any)

    // Act
    await service.createUser({ ...validInput, email: 'ALICE@EXAMPLE.COM' })

    // Assert
    expect(mockUserRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'alice@example.com' })
    )
  })

  it('does not store plain-text password', async () => {
    // Arrange
    vi.mocked(mockUserRepo.findByEmail).mockResolvedValue(null)
    vi.mocked(mockUserRepo.create).mockResolvedValue({ id: 'id' } as any)

    // Act
    await service.createUser(validInput)

    // Assert: password hash is stored, not plain text
    const createCall = vi.mocked(mockUserRepo.create).mock.calls[0]?.[0]
    expect(createCall).not.toHaveProperty('password')
    expect(createCall).toHaveProperty('passwordHash')
    expect(createCall?.passwordHash).not.toBe('password123')
  })
})

describe('UserService.getUserById', () => {
  it('returns USER_NOT_FOUND for non-existent user', async () => {
    vi.mocked(mockUserRepo.findById).mockResolvedValue(null)

    const result = await service.getUserById('nonexistent')

    expect(result.success).toBe(false)
    if (!result.success) expect(result.error).toBe('USER_NOT_FOUND')
  })
})
```

---

## 12.3 Integration Test Rules

🟠 **RULE TEST-4**: Integration tests use a real test database (test Postgres instance or in-memory via `@databases/pg-test`).

🔴 **RULE TEST-5**: Integration tests MUST clean up after themselves. Use transactions that are rolled back.

```typescript
// tests/fixtures/test-db.ts
import { PrismaClient } from '@prisma/client'

const testDb = new PrismaClient({
  datasources: { db: { url: process.env.TEST_DATABASE_URL } },
})

export async function withTestTransaction<T>(
  fn: (tx: Omit<PrismaClient, '$transaction' | '$connect' | '$disconnect'>) => Promise<T>
): Promise<T> {
  return testDb.$transaction(async (tx) => {
    const result = await fn(tx)
    throw new Error('ROLLBACK_TEST')  // Always rollback
    return result
  }).catch((err) => {
    if (err.message === 'ROLLBACK_TEST') return undefined as T
    throw err
  })
}
```

---

## 12.4 E2E Test Rules

🟠 **RULE TEST-6**: E2E tests cover USER FLOWS, not individual functions. Each test simulates a real user session.

🟡 **RULE TEST-7**: E2E test file covers ONE complete user journey.

```typescript
// tests/e2e/auth.test.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('user can register, login, and access dashboard', async ({ page }) => {
    // Register
    await page.goto('/register')
    await page.fill('[name=name]', 'Test User')
    await page.fill('[name=email]', 'test@example.com')
    await page.fill('[name=password]', 'SecurePass123!')
    await page.click('[type=submit]')
    await expect(page).toHaveURL('/dashboard')

    // Verify session
    await expect(page.getByText('Test User')).toBeVisible()

    // Logout
    await page.click('[data-testid=logout-button]')
    await expect(page).toHaveURL('/login')

    // Login
    await page.fill('[name=email]', 'test@example.com')
    await page.fill('[name=password]', 'SecurePass123!')
    await page.click('[type=submit]')
    await expect(page).toHaveURL('/dashboard')
  })

  test('redirects unauthenticated users from protected routes', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/login/)
  })

  test('blocks non-admin from admin routes', async ({ page, context }) => {
    // Login as regular user
    await loginAs(page, 'user@example.com', 'password')
    await page.goto('/admin/users')
    await expect(page).toHaveURL('/403')
  })
})
```

---

## 12.5 Test Data Rules

🔴 **RULE TEST-8**: Use factory functions for test data. Never use magic strings.

```typescript
// tests/fixtures/factories.ts
import { faker } from '@faker-js/faker'
import type { CreateUserInput } from '@/modules/users'

export function makeUser(overrides?: Partial<CreateUserInput>): CreateUserInput {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: 'TestPassword123!',
    role: 'USER',
    ...overrides,
  }
}

export function makeAdmin(overrides?: Partial<CreateUserInput>): CreateUserInput {
  return makeUser({ role: 'ADMIN', ...overrides })
}
```

---

## 12.6 Mock & Stub Rules

🔴 **RULE TEST-9**: Mock at the SERVICE boundary, not the DB level for unit tests. Mock at the HTTP level for integration tests.

🟠 **RULE TEST-10**: Never mock `Date.now()` without restoring it afterward. Use `vi.useFakeTimers()` / `vi.useRealTimers()`.

�� **RULE TEST-11**: MSW (Mock Service Worker) for mocking external API calls in browser tests.

---

# PART 13 — SECURITY RULES

## 13.1 Input Validation Rules

🔴 **RULE SEC-1**: Trust NO input from clients. Validate everything with Zod before use.

🔴 **RULE SEC-2**: Validate input at the ENTRY POINT (route handler/server action), not inside services.

🔴 **RULE SEC-3**: Validate BOTH format (is it a valid email?) AND semantic correctness (does the email domain match the allowed list?).

---

## 13.2 SQL Injection Prevention

🔴 **RULE SEC-4**: Use Prisma for ALL database queries. Never use `db.$queryRaw` with string interpolation.

```typescript
// ❌ CRITICAL VIOLATION: SQL injection
const users = await db.$queryRaw`SELECT * FROM users WHERE email = '${userInput}'`

// ✅ CORRECT: Parameterized
const users = await db.$queryRaw`SELECT * FROM users WHERE email = ${userInput}`
// Or better: use Prisma's typed query methods
const users = await db.user.findMany({ where: { email: userInput } })
```

🟠 **RULE SEC-5**: If raw SQL is truly needed (complex analytics), use `Prisma.$queryRaw` with template literals (auto-parameterized), NEVER string concatenation.

---

## 13.3 XSS Prevention Rules

🔴 **RULE SEC-6**: React escapes JSX by default. NEVER use `dangerouslySetInnerHTML` unless the content is sanitized.

```tsx
// ❌ CRITICAL VIOLATION: XSS attack vector
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ CORRECT: Sanitize before rendering HTML
import DOMPurify from 'dompurify'
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
```

---

## 13.4 CSRF Prevention Rules

🔴 **RULE SEC-7**: Next.js App Router Server Actions have built-in CSRF protection. Route Handlers using cookies for session MUST validate the `Origin` header.

```typescript
// For route handlers using cookie-based sessions:
function validateOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin')
  const host = req.headers.get('host')
  if (!origin || !host) return false
  return new URL(origin).host === host
}
```

---

## 13.5 Secrets Management Rules

🔴 **RULE SEC-8**: ZERO secrets in source code. Use environment variables.

🔴 **RULE SEC-9**: Validate ALL required environment variables at startup using `t3-env` or a custom validator.

```typescript
// src/lib/env.ts — FAIL FAST if env vars are missing
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(32),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().startsWith('re_'),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
```

🔴 **RULE SEC-10**: `.env.local` and `.env.production` are ALWAYS in `.gitignore`.

🔴 **RULE SEC-11**: `.env.example` with placeholder values MUST be committed to the repo.

---

## 13.6 Security Headers Rules

🔴 **RULE SEC-12**: All production deployments MUST have these security headers:

```typescript
// next.config.ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",  // Tighten in production
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://api.example.com",
    ].join('; ')
  },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]
```

---

## 13.7 Dependency Security Rules

🟠 **RULE SEC-13**: Run `pnpm audit` in CI. BLOCK on critical/high vulnerabilities.

🟡 **RULE SEC-14**: Use Renovate or Dependabot to automatically open PRs for dependency updates.

🟡 **RULE SEC-15**: Review changelogs for major dependency updates before merging.

---
