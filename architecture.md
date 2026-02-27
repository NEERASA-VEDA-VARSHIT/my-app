# NEXT.JS PRODUCTION RULEBOOK
## A Comprehensive, Enforceable Architecture Standard for Production-Grade Next.js Applications

---

**Version:** 2.0  
**Authority:** Principal Architect / CTO  
**Scope:** All Next.js (App Router) applications — SaaS, internal tools, API platforms, AI pipelines, marketplaces  
**Status:** ENFORCED — violations block merges  
**Classification:** Every rule is HARD (violation = blocked PR) or SOFT (deviation = documented justification required)

---

# TABLE OF CONTENTS

## Part 1 — Foundation
- Chapter 01: Architecture Decision Framework
- Chapter 02: Project Initialization & Configuration
- Chapter 03: Folder Structure & Module Boundaries
- Chapter 04: TypeScript Rules & Type System
- Chapter 05: Naming Conventions

## Part 2 — Data Layer
- Chapter 06: Database Design & Selection
- Chapter 07: ORM Rules & Query Patterns
- Chapter 08: API Design — Route Handlers & Server Actions
- Chapter 09: Validation Architecture
- Chapter 10: Caching Strategy

## Part 3 — Application Layer
- Chapter 11: Authentication & Session Management
- Chapter 12: Authorization & Access Control
- Chapter 13: Server vs Client Components
- Chapter 14: State Management
- Chapter 15: Forms & Mutations

## Part 4 — Infrastructure
- Chapter 16: Testing Strategy
- Chapter 17: Security Rules
- Chapter 18: Performance Optimization
- Chapter 19: Observability & Error Handling
- Chapter 20: CI/CD & Deployment

## Part 5 — Advanced Topics
- Chapter 21: Real-Time Features
- Chapter 22: Background Jobs & Queues
- Chapter 23: File Storage & Media
- Chapter 24: Multi-Tenancy
- Chapter 25: Internationalization, SEO & Evolution

---

# PART 1 — FOUNDATION

---

## Chapter 01: Architecture Decision Framework

### 1.1 Pre-Architecture Clarification Protocol

**HARD RULE:** No folder is created. No schema is written. No stack is selected. No naming convention is chosen until every question in this section has a confirmed, explicit answer.

Before the first `git commit`, answer all of the following:

| ID | Question | Answer Options |
|----|----------|---------------|
| Q-01 | Primary domain? | SaaS / Internal tool / API platform / Marketplace / AI pipeline |
| Q-02 | User model? | Single-tenant / Multi-tenant / Public anonymous / Mixed |
| Q-03 | Access control model? | Simple roles (≤4) / Attribute-based / Policy-based / Ownership-only |
| Q-04 | Expected scale at launch? | 0–1K / 1K–10K / 10K–100K / 100K+ req/day |
| Q-05 | Primary data shape? | Relational / Document / Time-series / Graph / Mixed |
| Q-06 | Real-time data required? | No / SSE / WebSocket / Polling acceptable |
| Q-07 | Background jobs needed? | No / Short (<30s) / Long-running (>60s) |
| Q-08 | Compliance requirements? | None / GDPR-aware / GDPR-enforced / HIPAA / PCI / SOC2 |
| Q-09 | Auth requirements? | None / JWT / OAuth / Magic link / MFA / Enterprise SSO |
| Q-10 | File/asset storage? | No / Small blobs / Large media / User-uploaded code |
| Q-11 | Public API? | No / Internal only / Third-party developers |
| Q-12 | Team size now/in 6mo? | Solo / 2–3 / 4–10 / 10+ |
| Q-13 | Deployment target? | Vercel / AWS / GCP / Self-hosted / Hybrid |
| Q-14 | Cost sensitivity? | Critical / Medium / Low |
| Q-15 | Existing codebase? | Greenfield / Existing / Migration from legacy |

**Consequences of skipping this step:**
- Every architectural decision made without these answers is a guess that will become debt.
- The framework has no authority to block or approve patterns without this baseline.

---

### 1.2 Stability Score Calculation

The stability score is **not a preference** — it is a mathematical constraint on what architecture is permitted.

**Base score: 100**

Deduct points for the following tensions (auto-detected from Q-answers):

| Tension | Deduction | Severity |
|---------|-----------|----------|
| Scale > Medium + Cost = Critical | −25 | CRITICAL — unsustainable cost |
| Long jobs (Q-07=long) + Serverless deploy (Q-13=Vercel) | −25 | CRITICAL — timeout mismatch |
| Multi-tenant (Q-02) + Single DB schema without RLS | −20 | HIGH — data isolation breach |
| Public API (Q-11=yes) + No versioning plan | −15 | HIGH — breaking changes risk |
| Compliance (Q-08) + Low budget (Q-14=Critical) | −15 | HIGH — cannot skip encryption/audit |
| Team ≤3 (Q-12) + Microservices architecture | −15 | HIGH — ops overhead exceeds capacity |
| Real-time (Q-06) + No Redis/queue plan | −10 | WARNING — polling degrades at scale |
| Large media (Q-10) + DB blob storage | −10 | WARNING — DB will bloat |
| Short timeline + Complex RBAC | −10 | WARNING — scope auth correctly |

**Score → Architecture Class:**

| Score | Architecture Class | Allowed Patterns |
|-------|--------------------|-----------------|
| ≥ 70 | **Modular Monolith** | Clear service boundaries, shared DB, independent modules |
| 50–69 | **Structured Monolith** | Single module per domain, no sub-module nesting |
| < 50 | **BLOCKED** | Reduce scope before proceeding |
| ≥ 85 + Scale=Large + Team ≥8 + Timeline ≥3mo | **Microservices** | Independent deployable services, typed contracts |

**HARD RULE:** You cannot choose an architecture class above your score. A score of 65 disallows Modular Monolith. A score below 50 disallows starting. No exceptions.

---

### 1.3 Architecture Class Definitions

#### 1.3.1 Structured Monolith (score 50–69)

```
src/
├── app/                    # Next.js App Router pages and routes
├── components/             # Shared UI components
├── lib/                    # Business logic (flat, no module nesting)
├── db/                     # Database client and queries
└── types/                  # Shared TypeScript types
```

Rules:
- All business logic in `lib/` — no domain subdirectories
- A single DB client instance in `db/index.ts`
- No shared interfaces between DB and API layers — use transformation functions
- Maximum 2 levels of nesting anywhere
- All server-side code in `lib/` — none in components

#### 1.3.2 Modular Monolith (score 70–84)

```
src/
├── app/                    # Routing only — no business logic
├── modules/
│   ├── user/
│   │   ├── user.repository.ts
│   │   ├── user.service.ts
│   │   ├── user.types.ts
│   │   └── user.validators.ts
│   ├── billing/
│   └── [domain]/
├── shared/
│   ├── components/
│   ├── lib/
│   └── types/
└── db/
```

Rules:
- Each module owns its own types, validators, repository, and service
- Cross-module calls only through service interfaces — never through repositories
- `shared/` is allowed only for truly universal utilities (no domain logic)
- A module may not import from another module's repository
- DB schema may be shared but query ownership is per-module

#### 1.3.3 Microservices (score ≥ 85, large team)

- Each service is a separate Next.js app or Node.js process
- Communication via typed REST or gRPC contracts only
- **No shared databases** across services
- No shared libraries without semantic versioning
- Each service owns its own deployment pipeline
- **HARD RULE:** Do not choose microservices for teams < 8 or timelines < 3 months

---

### 1.4 Architecture Decision Records (ADRs)

Every architectural decision above the code level must have an ADR.

**Required ADR fields:**

```markdown
# ADR-{number}: {title}

## Status
Proposed | Accepted | Deprecated | Superseded by ADR-{n}

## Context
What problem are we solving? Which Q-IDs drive this decision?

## Decision
What did we decide?

## Consequences
### Positive
- ...
### Negative
- ...
### Neutral
- ...

## Alternatives Considered
| Alternative | Reason Rejected |
|-------------|----------------|
| ...         | ...            |
```

**ADRs live in `docs/decisions/`.**

**HARD RULE:** Any architectural change (adding a service, changing the DB, switching auth provider, adding a queue) requires an ADR before the PR is opened.

---

## Chapter 02: Project Initialization & Configuration

### 2.1 Project Bootstrap Checklist

Run the following in order. Do not skip steps.

```bash
# Step 1: Create the project
npx create-next-app@latest my-app \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

# Step 2: Install production dependencies (core only — add more per Q-answers)
npm install zod next-auth@beta drizzle-orm @neondatabase/serverless

# Step 3: Install dev dependencies
npm install -D drizzle-kit vitest @vitejs/plugin-react 
npm install -D @testing-library/react @testing-library/user-event
npm install -D eslint-plugin-boundaries eslint-plugin-no-restricted-imports

# Step 4: Initialize database schema
npx drizzle-kit generate

# Step 5: Configure environment
cp .env.example .env.local
```

**HARD RULE:** Never add a dependency before checking:
1. Is there a simpler built-in alternative?
2. Does this dependency have known CVEs (`npm audit`)?
3. Does this add more than 50KB to the client bundle (check with `npm run analyze`)?

---

### 2.2 `next.config.ts` — Mandatory Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  // HARD: Always enable strict mode
  reactStrictMode: true,

  // HARD: Log all slow server component renders (>500ms) in development
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // SOFT: Bundle analyzer — enable when diagnosing size issues
  // bundleAnalyzer: process.env.ANALYZE === 'true',

  images: {
    // HARD: Define allowed image domains explicitly — never use '*'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.CDN_HOSTNAME!,
      },
    ],
    // SOFT: Use WebP/AVIF formats
    formats: ['image/avif', 'image/webp'],
  },

  // HARD: Security headers on every response
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },

  // HARD: If using server actions, define origin allowlist
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.APP_URL!],
    },
  },
};

export default config;
```

---

### 2.3 Environment Variable Architecture

**HARD RULE:** No environment variable is used directly with `process.env.VARIABLE_NAME` outside of `config/env.ts`. Every variable is validated on startup.

```typescript
// config/env.ts — the single source of truth for all env vars
import { z } from 'zod';

const envSchema = z.object({
  // Runtime
  NODE_ENV: z.enum(['development', 'test', 'production']),
  APP_URL: z.string().url(),

  // Database
  DATABASE_URL: z.string().min(1),
  
  // Auth
  AUTH_SECRET: z.string().min(32), // Must be ≥32 chars
  AUTH_URL: z.string().url().optional(),
  
  // Optional — add per Q-answers
  REDIS_URL: z.string().url().optional(),
  OPENAI_API_KEY: z.string().startsWith('sk-').optional(),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional(),
  
  // CDN / Storage
  CDN_HOSTNAME: z.string().optional(),
  S3_BUCKET_NAME: z.string().optional(),
});

// Throws at startup if any required variable is missing or malformed
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten());
  throw new Error('Invalid environment variables — server refused to start');
}

export const env = parsed.data;
```

**Rules:**
- `config/env.ts` is the ONLY file that touches `process.env`
- All other files import from `config/env.ts`
- `.env.example` must be updated whenever a new variable is added — in the same commit
- Client-side env vars MUST be prefixed `NEXT_PUBLIC_` and explicitly added to the schema
- Never commit `.env.local` — it is always in `.gitignore`
- Production secrets are injected by the deployment platform, never hard-coded

---

### 2.4 TypeScript Configuration

```jsonc
// tsconfig.json — mandatory settings
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,          // HARD: TypeScript-only project
    "skipLibCheck": true,
    "strict": true,            // HARD: strict mode always on
    "noEmit": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]       // HARD: Always use alias, never relative paths ../../
    },
    // HARD: Disallow common sources of bugs
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**HARD RULE violations that block PR:**
- `strict: false` — never
- `any` type — never without `// eslint-disable-next-line @typescript-eslint/no-explicit-any` AND a justification comment
- `as unknown as X` — never without a validation boundary (Zod parse)
- `// @ts-ignore` — never; use `// @ts-expect-error` with a description

---

### 2.5 ESLint Configuration

```jsonc
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended-type-checked"
  ],
  "plugins": ["boundaries", "@typescript-eslint"],
  "rules": {
    // HARD: No any
    "@typescript-eslint/no-explicit-any": "error",
    
    // HARD: No unused variables
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }],
    
    // HARD: No floating promises
    "@typescript-eslint/no-floating-promises": "error",
    
    // HARD: Await or void every promise
    "@typescript-eslint/no-misused-promises": "error",
    
    // HARD: No console in production code (use logger)
    "no-console": ["error", { "allow": ["warn", "error"] }],
    
    // HARD: Import boundaries (Modular Monolith only)
    "boundaries/element-types": ["error", {
      "default": "disallow",
      "rules": [
        { "from": "app", "allow": ["modules", "shared"] },
        { "from": "modules", "allow": ["shared"] },
        { "from": "shared", "allow": [] }
      ]
    }],
    
    // HARD: No relative imports beyond sibling files
    "no-restricted-imports": ["error", {
      "patterns": ["../../*"]
    }]
  }
}
```

---

## Chapter 03: Folder Structure & Module Boundaries

### 3.1 Canonical Directory Tree — Structured Monolith

```
my-app/
├── docs/
│   └── decisions/           # ADRs — required
├── prisma/ or drizzle/
│   ├── schema.ts            # DB schema definition
│   └── migrations/          # Auto-generated — never hand-edited
├── src/
│   ├── app/                 # Next.js App Router — routing ONLY
│   │   ├── (auth)/          # Route group — auth pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/     # Route group — protected pages
│   │   │   ├── layout.tsx   # Auth check happens here
│   │   │   └── [domain]/
│   │   │       └── page.tsx
│   │   ├── api/             # Route handlers — API only
│   │   │   └── [domain]/
│   │   │       └── route.ts
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Landing page
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/              # Shadcn/UI components — NEVER edit these
│   │   └── [domain]/        # Domain-specific composed components
│   ├── config/
│   │   └── env.ts           # Environment variable schema & validation
│   ├── db/
│   │   ├── index.ts         # DB client singleton — only file that creates client
│   │   ├── schema.ts        # Re-exports from drizzle/schema.ts
│   │   └── [domain].queries.ts  # Domain-specific query functions
│   ├── hooks/               # Client-side React hooks only
│   │   └── use-[name].ts
│   ├── lib/
│   │   ├── auth/            # Auth utilities and session helpers
│   │   ├── [domain]/        # Domain business logic
│   │   │   ├── [domain].service.ts    # Business rules
│   │   │   ├── [domain].repository.ts # DB access
│   │   │   └── [domain].validators.ts # Zod schemas
│   │   └── utils/           # Pure utility functions
│   ├── types/               # Global shared TypeScript types
│   │   ├── api.types.ts     # API request/response shapes
│   │   └── auth.types.ts    # Auth session types
│   └── middleware.ts        # Next.js middleware — auth guards
├── .env.example             # All variables documented, no values
├── .gitignore
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

### 3.2 Canonical Directory Tree — Modular Monolith

```
my-app/
├── docs/decisions/
├── drizzle/
│   ├── schema/              # One schema file per module
│   │   ├── user.schema.ts
│   │   ├── billing.schema.ts
│   │   └── index.ts         # Re-exports all schemas
│   └── migrations/
├── src/
│   ├── app/                 # Routing + page shells only
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   └── api/
│   │       └── [module]/    # API routes delegate to module services
│   ├── modules/
│   │   ├── user/
│   │   │   ├── __tests__/
│   │   │   ├── user.repository.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.types.ts
│   │   │   ├── user.validators.ts
│   │   │   └── index.ts     # Public API of this module
│   │   ├── billing/
│   │   │   ├── billing.repository.ts
│   │   │   ├── billing.service.ts
│   │   │   ├── billing.types.ts
│   │   │   ├── billing.validators.ts
│   │   │   └── index.ts
│   │   └── [domain]/
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/          # Shadcn
│   │   │   └── layout/      # Header, Footer, Sidebar
│   │   ├── hooks/
│   │   ├── lib/
│   │   │   ├── errors.ts    # AppError class hierarchy
│   │   │   ├── logger.ts    # Structured logger
│   │   │   └── utils.ts
│   │   └── types/
│   ├── config/
│   │   └── env.ts
│   ├── db/
│   │   └── index.ts
│   └── middleware.ts
```

---

### 3.3 Import Direction Rules

These rules are **HARD** and enforced by `eslint-plugin-boundaries`:

```
app/ → modules/ → shared/ → db/
  ↓         ↓        ↓       ↓
 can       can      can    nothing
import   import   import   above
  ↓         ↓        ↓
modules/ shared/   db/
```

**Explicit prohibitions:**

| FROM | CANNOT IMPORT FROM | Reason |
|------|-------------------|--------|
| `shared/` | `modules/` | Shared must not depend on domain logic |
| `db/` | `lib/` or `modules/` | DB layer is the foundation |
| `modules/A` | `modules/B/repository` | Modules talk through services only |
| `app/` | `db/` directly | App routes must go through services |
| `components/` | `db/` directly | Components never touch the DB |

**HARD RULE:** If a new file requires a cross-boundary import, the architecture must be re-evaluated first. Fix the boundary, don't bypass it.

---

### 3.4 File Naming Rules

| Context | Pattern | Example |
|---------|---------|---------|
| React components | `PascalCase.tsx` | `UserProfile.tsx` |
| Hooks | `use-kebab-case.ts` | `use-user-data.ts` |
| Utilities/Services | `kebab-case.ts` | `format-date.ts` |
| Types files | `kebab-case.types.ts` | `user.types.ts` |
| Validators | `kebab-case.validators.ts` | `user.validators.ts` |
| Repositories | `kebab-case.repository.ts` | `user.repository.ts` |
| Services | `kebab-case.service.ts` | `user.service.ts` |
| Tests | `*.test.ts` or `*.spec.ts` | `user.service.test.ts` |
| Route handlers | `route.ts` (Next.js convention) | — |
| Page files | `page.tsx` (Next.js convention) | — |
| Layout files | `layout.tsx` (Next.js convention) | — |

**HARD RULE:** One export per file. No barrel files that re-export many components. Module `index.ts` files may re-export the public API of that module but must be explicit (no `export * from`).

---

## Chapter 04: TypeScript Rules & Type System

### 4.1 Core TypeScript Principles

**The contract:** TypeScript types are documentation that the compiler enforces. A type that doesn't accurately represent the data it describes is worse than no type.

**HARD rules:**

```typescript
// ❌ NEVER — loss of type safety
const user = response as any;
const id = response as unknown as string;

// ✅ CORRECT — parse and validate at the boundary
import { z } from 'zod';
const userSchema = z.object({ id: z.string(), email: z.string().email() });
const user = userSchema.parse(response); // throws on invalid data

// ❌ NEVER — implicit any from missing type annotation
function processUser(user) { // user is implicitly any
  return user.name;
}

// ✅ CORRECT
function processUser(user: User): string {
  return user.name;
}

// ❌ NEVER — optional chaining without null check in critical paths
const name = user?.profile?.name; // may silently produce undefined

// ✅ CORRECT — be explicit about nullability
if (!user.profile) throw new NotFoundError('User profile');
const name = user.profile.name;
```

---

### 4.2 Type Architecture Layers

There are 4 layers of types in a Next.js application. Each serves a distinct purpose.

#### Layer 1: Database Schema Types (auto-generated)

```typescript
// Never write these manually — derive from ORM
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users } from '@/db/schema';

export type UserRecord = InferSelectModel<typeof users>;
export type NewUserRecord = InferInsertModel<typeof users>;

// These types live ONLY in db/ — never cross module boundaries directly
```

#### Layer 2: Domain Types (the source of truth for business logic)

```typescript
// modules/user/user.types.ts
// These are crafted, business-meaningful types — NOT raw DB rows

export type UserId = string & { readonly _brand: 'UserId' };  // Branded type

export type User = {
  readonly id: UserId;
  readonly email: string;
  readonly name: string;
  readonly role: UserRole;
  readonly createdAt: Date;
};

export type UserRole = 'admin' | 'member' | 'viewer';

// Transformation function: DB record → Domain type
export function toDomainUser(record: UserRecord): User {
  return {
    id: record.id as UserId,
    email: record.email,
    name: record.name,
    role: record.role as UserRole,
    createdAt: record.createdAt,
  };
}
```

#### Layer 3: API Types (what the API sends and receives)

```typescript
// types/api.types.ts
// These are wire-format types — what JSON looks like over the network

export type UserResponse = {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string; // ISO string — JSON has no Date type
};

export type CreateUserRequest = {
  email: string;
  name: string;
  role?: string;
};

// Transformation: Domain → API response
export function toUserResponse(user: User): UserResponse {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
  };
}
```

#### Layer 4: Component Props Types

```typescript
// components/user/UserCard.tsx
// Props are co-located with the component, not imported from types/

type UserCardProps = {
  user: User;
  onEdit?: (userId: UserId) => void;
  isLoading?: boolean;
};

export function UserCard({ user, onEdit, isLoading = false }: UserCardProps) {
  // ...
}
```

---

### 4.3 Branded Types

Branded types prevent passing a `ProjectId` where a `UserId` is expected at compile time.

```typescript
// Branded type pattern — prevents ID type confusion
type Brand<T, B> = T & { readonly _brand: B };

export type UserId = Brand<string, 'UserId'>;
export type ProjectId = Brand<string, 'ProjectId'>;
export type OrgId = Brand<string, 'OrgId'>;

// Usage — TypeScript will catch mistakes at compile time
function getUser(id: UserId): Promise<User> { ... }
function getProject(id: ProjectId): Promise<Project> { ... }

const userId = 'abc' as UserId;
const projectId = 'abc' as ProjectId;

getUser(projectId); // ❌ TypeScript error: ProjectId is not assignable to UserId
getUser(userId);    // ✅ Correct
```

**HARD RULE:** All ID types in domain models must be branded. This eliminates an entire class of runtime bugs.

---

### 4.4 Discriminated Unions for Results

Instead of throwing exceptions through multiple layers, use discriminated unions for expected error conditions:

```typescript
// lib/utils/result.ts
export type Result<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E };

export function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

export function err<E = string>(error: E): Result<never, E> {
  return { success: false, error };
}

// Usage in service
async function createUser(input: CreateUserInput): Promise<Result<User>> {
  const existing = await userRepository.findByEmail(input.email);
  if (existing) {
    return err('EMAIL_ALREADY_EXISTS');
  }
  const user = await userRepository.create(input);
  return ok(user);
}

// Usage in route handler — exhaustive handling
const result = await createUser(input);
if (!result.success) {
  return Response.json({ error: result.error }, { status: 409 });
}
return Response.json(toUserResponse(result.data));
```

---

### 4.5 Generic Utility Types

Define these once in `types/utils.types.ts` and reuse:

```typescript
// types/utils.types.ts

// Make specific keys optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make specific keys required
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Deep readonly
export type DeepReadonly<T> = T extends (infer U)[]
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

// Awaited return type helper
export type AsyncReturnType<T extends (...args: unknown[]) => Promise<unknown>> =
  Awaited<ReturnType<T>>;

// Paginated response wrapper
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

// API error response
export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: unknown;
    requestId: string;
  };
};
```

---

## Chapter 05: Naming Conventions

### 5.1 Universal Naming Rules

These apply to every identifier in the codebase. Zero exceptions.

| Category | Convention | Bad Example | Good Example |
|----------|-----------|-------------|--------------|
| Variables | `camelCase` | `UserData`, `user_data` | `userData` |
| Constants | `SCREAMING_SNAKE_CASE` | `maxRetries`, `MaxRetries` | `MAX_RETRIES` |
| Functions | `camelCase` verb | `userData()`, `ProcessUser()` | `processUser()` |
| React components | `PascalCase` noun | `userProfile`, `user-profile` | `UserProfile` |
| React hooks | `useCamelCase` | `UseUser`, `getUser` | `useUser` |
| TypeScript types | `PascalCase` | `user_type`, `usertype` | `UserType` |
| TypeScript interfaces | `PascalCase` (no `I` prefix) | `IUser`, `i_user` | `User` |
| TypeScript enums | `PascalCase` | `USER_ROLE`, `userRole` | `UserRole` |
| Enum values | `PascalCase` | `UserRole.ADMIN`, `UserRole.admin` | `UserRole.Admin` |
| Database tables | `snake_case` plural | `User`, `user_record` | `users` |
| Database columns | `snake_case` | `userId`, `UserID` | `user_id` |
| CSS classes (Tailwind) | Tailwind utilities | — | `text-sm font-medium` |
| File names (components) | `PascalCase.tsx` | `user-profile.tsx` | `UserProfile.tsx` |
| File names (utils) | `kebab-case.ts` | `userUtils.ts` | `user-utils.ts` |
| Route paths (URL) | `kebab-case` | `/userProfile`, `/user_profile` | `/user-profile` |
| API routes | `kebab-case` | `/api/getUsers` | `/api/users` |
| Environment variables | `SCREAMING_SNAKE_CASE` | `databaseUrl` | `DATABASE_URL` |

---

### 5.2 Boolean Naming

All booleans must be named with a question-framing prefix:

```typescript
// ❌ WRONG — ambiguous
const active = true;
const userStatus = false;
const loading = true;

// ✅ CORRECT — reads as a yes/no question
const isActive = true;
const hasError = false;
const isLoading = true;
const canEdit = false;
const shouldRedirect = true;
const wasDeleted = false;
```

**Allowed prefixes:** `is`, `has`, `can`, `should`, `was`, `did`, `will`

---

### 5.3 Function Naming by Category

```typescript
// Async data fetching (returns data or throws)
async function fetchUser(id: UserId): Promise<User> { ... }
async function getUsers(filter: UserFilter): Promise<User[]> { ... }

// Data mutation (creates, updates, or deletes)
async function createUser(data: CreateUserInput): Promise<User> { ... }
async function updateUser(id: UserId, data: UpdateUserInput): Promise<User> { ... }
async function deleteUser(id: UserId): Promise<void> { ... }

// Data transformation (pure, synchronous)
function toUserResponse(user: User): UserResponse { ... }
function formatUserName(user: User): string { ... }

// Validation (returns boolean or throws)
function isValidEmail(email: string): boolean { ... }
function assertUserExists(user: User | null): asserts user is User { ... }

// Event handlers (React)
function handleSubmit(event: React.FormEvent): void { ... }
function handleUserClick(userId: UserId): void { ... }

// React hooks
function useUser(id: UserId): { user: User | null; isLoading: boolean; error: Error | null } { ... }
function useCreateUser(): { createUser: (data: CreateUserInput) => Promise<void>; isLoading: boolean } { ... }
```

---

### 5.4 API Route Naming

Follow REST conventions strictly:

```
GET    /api/users              → list users
POST   /api/users              → create user
GET    /api/users/:id          → get user by ID
PUT    /api/users/:id          → full update
PATCH  /api/users/:id          → partial update
DELETE /api/users/:id          → delete user

GET    /api/users/:id/projects → list user's projects
POST   /api/users/:id/projects → create project for user

# Actions that don't fit CRUD use noun-based paths
POST   /api/users/:id/activate
POST   /api/users/:id/invite
POST   /api/auth/refresh-token
```

**HARD RULE:** Never use verbs in REST route paths (`/api/getUser`, `/api/createProject`). Verbs belong to HTTP methods.

---

### 5.5 Database Naming

```sql
-- Tables: snake_case, plural
CREATE TABLE users (...);
CREATE TABLE user_projects (...);
CREATE TABLE billing_subscriptions (...);

-- Columns: snake_case
user_id UUID NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

-- Foreign keys: {referenced_table_singular}_id
project_id UUID REFERENCES projects(id),
org_id UUID REFERENCES organizations(id),

-- Indexes: idx_{table}_{column(s)}
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_projects_user_id ON user_projects(user_id);

-- Unique constraints: uq_{table}_{column(s)}
CONSTRAINT uq_users_email UNIQUE (email),
```

---

*End of Part 1*


---

# PART 2 — DATA LAYER

---

## Chapter 06: Database Design & Selection

### 6.1 Database Selection Decision Tree

**HARD RULE:** Database selection follows Q-answers — never personal preference or familiarity.

#### PostgreSQL — Default Choice

**When to use:**
- Q-05 = Relational (structured data, joins needed)
- Q-08 = Any compliance requirement (GDPR, HIPAA, SOC2, PCI)
- Q-02 = Multi-tenant (combined with RLS or schema-per-tenant)
- Q-04 = Any scale (PostgreSQL scales from 0 to billions of rows)

**Hosting options by budget and scale:**

| Option | Cost | Scale | When to use |
|--------|------|-------|-------------|
| Neon Serverless | Free → $19/mo | 0–100K req/day | Default for MVP and early stage |
| Supabase | Free → $25/mo | 0–100K req/day | If built-in auth/storage is needed |
| Railway | $5/mo | 0–100K req/day | Simple, predictable billing |
| Neon Scale | $69/mo | 100K+ req/day | After product-market fit |
| AWS RDS | $50+/mo | 100K+ req/day | Full AWS infrastructure |
| CloudSQL | $50+/mo | 100K+ req/day | Full GCP infrastructure |

**HARD RULE:** Never use SQLite in production for any multi-user application. SQLite is acceptable only for local development and CLI tools.

---

#### MongoDB Atlas — When to Use

**Only when all of the following are true:**
- Q-05 = Document (truly schemaless, deeply nested, frequently changing shape)
- Q-06 = Real-time AND Q-13 ≠ Vercel (requires persistent WebSocket server)
- Q-02 = Single-tenant (avoid multi-tenant on document DBs without RLS)

**HARD RULE:** If 80% of your collections have consistent schemas, you don't need MongoDB. Use PostgreSQL with JSONB for the flexible parts.

---

#### Other Databases — Narrow Use Cases

| Database | Use Case | Anti-Use Case |
|----------|----------|--------------|
| TimescaleDB | Q-05 = Time-series AND rest of data is relational | Primary DB for non-time-series apps |
| InfluxDB | Q-05 = Time-series ONLY, no other data | Mixed data shapes |
| Redis | Caching, sessions, queues, rate limiting | Primary persistent storage |
| Pinecone/Weaviate | Vector similarity search for AI apps | Replacing relational storage |

---

### 6.2 Schema Design Rules

#### Required Columns on Every Table

**HARD RULE:** Every table MUST have these columns. Migrations that omit them are rejected.

```sql
-- Drizzle ORM schema example
import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  // HARD: UUID primary key — never auto-increment integer in distributed systems
  id: uuid('id').primaryKey().defaultRandom(),
  
  // ... domain columns here ...
  
  // HARD: Audit timestamps — always present, always server-side
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  
  // SOFT: Soft delete — include when deletion must be recoverable or audited
  isDeleted: boolean('is_deleted').notNull().default(false),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});
```

**Why UUID not integer?**
- UUIDs are safe to generate client-side (no sequential exposure)
- UUIDs work across distributed systems without coordination
- UUIDs don't leak record counts to end users
- UUIDs enable merging data from multiple sources

**Why `withTimezone: true`?**
- All timestamps are stored in UTC
- Application handles timezone conversion for display
- Never store local time in the database — it's ambiguous

---

#### Index Design Rules

```typescript
// Drizzle index definitions — co-located with schema
export const usersIndexes = {
  emailIdx: uniqueIndex('idx_users_email').on(users.email),
};

export const postsIndexes = {
  // Composite index — ordered by most-selective column first
  authorStatusIdx: index('idx_posts_author_status')
    .on(posts.authorId, posts.status),
    
  // Index for soft-delete pattern — only index active records
  createdAtIdx: index('idx_posts_created_at')
    .on(posts.createdAt)
    .where(sql`is_deleted = false`),
};
```

**Index rules:**

| Rule | Detail |
|------|--------|
| Foreign key columns | ALWAYS indexed — FK without index = full scan on joins |
| Columns in WHERE clauses | Index if used in frequent queries |
| Columns in ORDER BY | Index if sorting large result sets |
| Composite indexes | Most selective column first |
| Partial indexes | Use `WHERE` clause to index only relevant rows |
| NEVER | Index every column speculatively — indexes slow writes |

**HARD RULE:** Run `EXPLAIN ANALYZE` on every query that:
- Joins more than 2 tables
- Has a `WHERE` on a non-indexed column
- Returns more than 1000 rows
- Is called more than 100 times per minute

---

#### Foreign Key Rules

```typescript
// HARD: FK constraint at the DB level — not just in application code
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  // onDelete options:
  // 'cascade'   — delete posts when user is deleted
  // 'restrict'  — prevent user deletion if posts exist
  // 'set null'  — set FK to null when referenced record is deleted
  // 'no action' — default, deferred check
});
```

**HARD RULE:** No FK without a DB-level constraint. Application-level FK checks alone are not acceptable because:
1. Direct DB access bypasses application checks
2. Bulk operations skip application-level validation
3. DB constraints are atomic — application checks are not

---

### 6.3 Migration Strategy

**HARD RULE:** Migrations are generated by the ORM tool and NEVER hand-edited.

```bash
# Drizzle — generate migration from schema changes
npx drizzle-kit generate

# Review generated SQL before applying
cat drizzle/migrations/0001_*.sql

# Apply migration
npx drizzle-kit migrate

# Drizzle — check schema drift (schema vs DB)
npx drizzle-kit check
```

**Migration safety rules:**

| Operation | Safety | Procedure |
|-----------|--------|-----------|
| Add column with default | Safe | Deploy migration, then deploy code |
| Add nullable column | Safe | Deploy migration, then deploy code |
| Add non-null column (no default) | DANGEROUS | Must backfill or use two-migration pattern |
| Rename column | DANGEROUS | Two-migration pattern: add new + copy + remove old |
| Drop column | DANGEROUS | Remove from code first, deploy, then migrate |
| Add index | Safe (but locks table) | Use `CONCURRENTLY` in production |
| Drop table | DANGEROUS | Remove all references first, then drop |

**Two-migration pattern for column rename:**

```sql
-- Migration 1: Add new column
ALTER TABLE users ADD COLUMN full_name TEXT;
UPDATE users SET full_name = name;
ALTER TABLE users ALTER COLUMN full_name SET NOT NULL;

-- Code deploy: read from full_name, write to both

-- Migration 2: Drop old column (after confirming code is deployed everywhere)
ALTER TABLE users DROP COLUMN name;
```

---

### 6.4 Multi-Tenancy Data Isolation

#### Row-Level Security (RLS) — Recommended for Most Cases

```sql
-- Enable RLS on tenant-scoped tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see their own org's data
CREATE POLICY "org_isolation" ON projects
  USING (org_id = current_setting('app.current_org_id')::uuid);
```

```typescript
// db/index.ts — set org context on every request
export async function withOrgContext<T>(
  orgId: OrgId,
  operation: (db: typeof database) => Promise<T>,
): Promise<T> {
  return database.transaction(async (tx) => {
    await tx.execute(sql`SELECT set_config('app.current_org_id', ${orgId}, true)`);
    return operation(tx);
  });
}

// Usage in repository
async function getProjects(orgId: OrgId): Promise<Project[]> {
  return withOrgContext(orgId, (db) =>
    db.select().from(projects)
  );
}
```

**HARD RULE:** When using RLS, the `org_id` context MUST be set before EVERY database operation. A missing `set_config` silently returns no rows instead of throwing — this is a data leak by omission risk.

#### Schema-per-Tenant — For Compliance Requirements

```typescript
// db/tenant.ts — schema-per-tenant connection
export function getTenantDb(tenantId: string) {
  return drizzle(pool, { schema: { searchPath: `tenant_${tenantId}` } });
}
```

**Use schema-per-tenant when:**
- Q-08 = HIPAA, SOC2, or PCI (true data isolation required)
- Q-04 ≥ Large scale (schema sharding helps performance)
- Customer contract requires data segregation proof

**Cost:** Each tenant schema requires migrations to run per-tenant. Adds operational complexity.

---

## Chapter 07: ORM Rules & Query Patterns

### 7.1 ORM Selection

**For PostgreSQL + TypeScript:**

| ORM | Choose When | Avoid When |
|-----|-------------|------------|
| **Drizzle ORM** | You want SQL transparency, thin abstraction, fastest query builder | Team has zero SQL knowledge |
| **Prisma** | Team prefers ActiveRecord DX, scale < 100K req/day | Edge runtime (Prisma has Node.js-only runtime) |
| **Kysely** | You want raw SQL control with TypeScript safety | Team needs migration tooling included |

**Default recommendation:** Drizzle ORM for all new projects (SQL-transparent, edge-compatible, fastest).

---

### 7.2 Repository Pattern

**HARD RULE:** Direct ORM calls happen ONLY in repository files. Services, route handlers, and components never import the DB client.

```typescript
// lib/user/user.repository.ts

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, and, isNull, desc } from 'drizzle-orm';
import type { UserId, User, CreateUserInput, UpdateUserInput } from './user.types';
import { toDomainUser } from './user.types';
import { NotFoundError } from '@/shared/lib/errors';

export const userRepository = {
  async findById(id: UserId): Promise<User | null> {
    const [record] = await db
      .select()
      .from(users)
      .where(and(eq(users.id, id), isNull(users.deletedAt)))
      .limit(1);

    return record ? toDomainUser(record) : null;
  },

  async findByEmail(email: string): Promise<User | null> {
    const [record] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email.toLowerCase()), isNull(users.deletedAt)))
      .limit(1);

    return record ? toDomainUser(record) : null;
  },

  async findMany(opts: {
    page: number;
    perPage: number;
    orgId?: OrgId;
  }): Promise<{ users: User[]; total: number }> {
    const { page, perPage, orgId } = opts;
    const offset = (page - 1) * perPage;

    const conditions = [isNull(users.deletedAt)];
    if (orgId) conditions.push(eq(users.orgId, orgId));
    const where = and(...conditions);

    const [data, [{ count }]] = await Promise.all([
      db
        .select()
        .from(users)
        .where(where)
        .orderBy(desc(users.createdAt))
        .limit(perPage)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(users).where(where),
    ]);

    return {
      users: data.map(toDomainUser),
      total: Number(count),
    };
  },

  async create(input: CreateUserInput): Promise<User> {
    const [record] = await db
      .insert(users)
      .values({
        email: input.email.toLowerCase(),
        name: input.name,
        role: input.role ?? 'member',
      })
      .returning();

    return toDomainUser(record!);
  },

  async update(id: UserId, input: UpdateUserInput): Promise<User> {
    const [record] = await db
      .update(users)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    if (!record) throw new NotFoundError('User');
    return toDomainUser(record);
  },

  async softDelete(id: UserId): Promise<void> {
    await db
      .update(users)
      .set({ isDeleted: true, deletedAt: new Date() })
      .where(eq(users.id, id));
  },
};
```

---

### 7.3 Transaction Rules

```typescript
// Use transactions for any operation that modifies multiple tables
export async function createUserWithProfile(
  userInput: CreateUserInput,
  profileInput: CreateProfileInput,
): Promise<User> {
  return db.transaction(async (tx) => {
    // All operations use `tx`, not `db`
    const [userRecord] = await tx
      .insert(users)
      .values(userInput)
      .returning();

    await tx
      .insert(profiles)
      .values({ ...profileInput, userId: userRecord!.id });

    // If either insert fails, both are rolled back
    return toDomainUser(userRecord!);
  });
}
```

**Transaction rules:**

| Scenario | Use Transaction? |
|----------|-----------------|
| Single row insert/update | No — atomic by default |
| Multi-table insert | YES — always |
| Read then write (check-then-act) | YES — prevents race conditions |
| Bulk update across many rows | YES — ensures consistency |
| Read-only operations | No |

**HARD RULE:** Never use a transaction just for performance. Transactions hold locks. A transaction that takes > 5 seconds in production is a critical incident waiting to happen.

---

### 7.4 Query Optimization Rules

```typescript
// ❌ N+1 problem — fetching related data in a loop
const projects = await projectRepository.findAll();
for (const project of projects) {
  const owner = await userRepository.findById(project.ownerId); // N queries!
  project.owner = owner;
}

// ✅ Use a JOIN or a single batched query
const projectsWithOwners = await db
  .select({
    project: projects,
    owner: {
      id: users.id,
      name: users.name,
      email: users.email,
    },
  })
  .from(projects)
  .innerJoin(users, eq(projects.ownerId, users.id))
  .where(isNull(projects.deletedAt));

// ✅ OR use DataLoader pattern for truly dynamic cases (GraphQL / RSC)
import DataLoader from 'dataloader';
const userLoader = new DataLoader<UserId, User>(async (ids) => {
  const found = await userRepository.findManyByIds(ids as UserId[]);
  return ids.map(id => found.find(u => u.id === id) ?? null);
});
```

**Pagination rules:**

```typescript
// ❌ NEVER use offset pagination on large tables
const users = await db
  .select()
  .from(users)
  .offset(10000)   // Database scans and discards 10,000 rows
  .limit(20);

// ✅ Cursor-based pagination for large datasets
async function getUsersCursor(cursor?: string, limit = 20): Promise<{
  users: User[];
  nextCursor: string | null;
}> {
  const where = cursor
    ? and(isNull(users.deletedAt), lt(users.createdAt, new Date(cursor)))
    : isNull(users.deletedAt);

  const data = await db
    .select()
    .from(users)
    .where(where)
    .orderBy(desc(users.createdAt))
    .limit(limit + 1);  // Fetch one extra to check if there's a next page

  const hasMore = data.length > limit;
  const items = hasMore ? data.slice(0, limit) : data;

  return {
    users: items.map(toDomainUser),
    nextCursor: hasMore ? items.at(-1)!.createdAt.toISOString() : null,
  };
}
```

---

## Chapter 08: API Design — Route Handlers & Server Actions

### 8.1 Route Handler Architecture

Every route handler follows this exact pattern:

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/lib/auth/session';
import { userService } from '@/lib/user/user.service';
import { createUserSchema } from '@/lib/user/user.validators';
import { apiResponse, apiError } from '@/shared/lib/api-response';
import { AppError } from '@/shared/lib/errors';

// GET /api/users — list users
export async function GET(request: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') ?? '1');
    const perPage = Math.min(Number(searchParams.get('perPage') ?? '20'), 100);

    const result = await userService.getUsers({ page, perPage, orgId: session.orgId });
    return apiResponse(result);
  } catch (error) {
    return handleRouteError(error);
  }
}

// POST /api/users — create user
export async function POST(request: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) return apiError('UNAUTHORIZED', 'Authentication required', 401);

    const body = await request.json();
    const input = createUserSchema.parse(body); // Throws ZodError if invalid

    const result = await userService.createUser(input, session.userId);
    return apiResponse(result, 201);
  } catch (error) {
    return handleRouteError(error);
  }
}

// Centralized error handler for route handlers
function handleRouteError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    return apiError(error.code, error.message, error.status, error.details);
  }
  if (error instanceof ZodError) {
    return apiError('VALIDATION', 'Invalid input', 400, error.flatten());
  }
  console.error('[API Error]', error);
  return apiError('INTERNAL', 'An unexpected error occurred', 500);
}
```

```typescript
// shared/lib/api-response.ts — standardized response helpers
import { NextResponse } from 'next/server';

export function apiResponse<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ data }, { status });
}

export function apiError(
  code: string,
  message: string,
  status: number,
  details?: unknown,
): NextResponse {
  return NextResponse.json(
    { error: { code, message, details } },
    { status },
  );
}
```

---

### 8.2 API Versioning Strategy

**HARD RULE:** If Q-11 = public API (third-party developers), versioning is mandatory from day one.

```typescript
// app/api/v1/users/route.ts — versioned route
// app/api/v2/users/route.ts — new version when breaking changes needed

// Versioning strategy:
// - URL versioning (/api/v1/...) — simple, explicit, cacheable
// - Never header versioning for public APIs (harder to test and cache)
// - Keep v1 alive for minimum 6 months after v2 launch
// - Document deprecation in response headers

export async function GET(request: NextRequest) {
  // Add deprecation warning for old versions
  const response = await handleGetUsers(request);
  response.headers.set('Deprecation', 'true');
  response.headers.set('Sunset', 'Sat, 01 Jan 2026 00:00:00 GMT');
  response.headers.set('Link', '</api/v2/users>; rel="successor-version"');
  return response;
}
```

---

### 8.3 Server Actions — When to Use

**Use Server Actions for:**
- Form submissions (data mutations from forms)
- Simple CRUD from UI components
- Progressive enhancement (works without JavaScript)

**Use Route Handlers for:**
- Public API endpoints (third-party access)
- Endpoints consumed by mobile apps
- Webhook receivers
- File upload endpoints
- Endpoints that need custom response headers/status codes

```typescript
// lib/user/user.actions.ts — Server Actions
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/auth/session';
import { userService } from './user.service';
import { updateUserSchema } from './user.validators';

export async function updateUserAction(
  userId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getUserSession();
  if (!session) return { success: false, error: 'Unauthorized' };

  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
  };

  const parsed = updateUserSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: 'Invalid input',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await userService.updateUser(userId as UserId, parsed.data);
    revalidatePath('/dashboard/users');
    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export type ActionState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};
```

---

### 8.4 Rate Limiting

**HARD RULE:** Any public-facing API endpoint MUST have rate limiting.

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 req per 10 seconds
});

export async function rateLimitRequest(
  identifier: string,
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const { success, remaining, reset } = await ratelimit.limit(identifier);
  return { success, remaining, reset };
}

// Usage in route handler
export async function POST(request: NextRequest) {
  const ip = request.ip ?? 'anonymous';
  const { success, remaining, reset } = await rateLimitRequest(`api:${ip}`);

  if (!success) {
    return NextResponse.json(
      { error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
          'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      },
    );
  }
  // ... handle request
}
```

---

## Chapter 09: Validation Architecture

### 9.1 Validation Boundaries

**HARD RULE:** All external data is validated at the point it enters the system. "External" includes: HTTP request bodies, URL parameters, form data, database query results, third-party API responses, file contents.

```
External World → [VALIDATION BOUNDARY] → Trusted Domain
   HTTP Body    →   Zod.parse()        →   TypeScript Type
   URL Params   →   Zod.parse()        →   Typed Object
   Form Data    →   Zod.parse()        →   Typed Object
   DB Results   →   Zod.parse() (edge) →   Domain Type (via ORM types, OK to skip)
   3rd-Party    →   Zod.parse()        →   Typed Object
```

**Rule: validate ONCE, trust within the boundary.** Do not re-validate data that has already been validated and stayed within the trusted system.

---

### 9.2 Zod Schema Organization

```typescript
// lib/user/user.validators.ts

import { z } from 'zod';

// ---- Primitive schemas (reusable building blocks) ----
export const emailSchema = z
  .string()
  .email('Invalid email address')
  .min(1, 'Email is required')
  .max(255, 'Email is too long')
  .toLowerCase(); // Normalize on input

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password is too long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const uuidSchema = z
  .string()
  .uuid('Invalid ID format');

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(20),
});

// ---- Composite schemas (request/response shapes) ----
export const createUserSchema = z.object({
  email: emailSchema,
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long').trim(),
  role: z.enum(['admin', 'member', 'viewer']).default('member'),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(1).max(100).trim().optional(),
    role: z.enum(['admin', 'member', 'viewer']).optional(),
  })
  .refine(
    (data) => Object.values(data).some((v) => v !== undefined),
    { message: 'At least one field must be provided' },
  );

export const userFilterSchema = paginationSchema.extend({
  role: z.enum(['admin', 'member', 'viewer']).optional(),
  search: z.string().max(100).optional(),
});

// ---- Type exports (inferred from schemas) ----
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserFilter = z.infer<typeof userFilterSchema>;
```

---

### 9.3 Validation in Different Contexts

#### Route Handlers

```typescript
// Always use .parse() (throws) or .safeParse() (returns result)
const body = await request.json().catch(() => null);
if (!body) return apiError('VALIDATION', 'Invalid JSON body', 400);

// Use safeParse when you want to show field-level errors
const parsed = createUserSchema.safeParse(body);
if (!parsed.success) {
  return apiError('VALIDATION', 'Invalid input', 400, parsed.error.flatten());
}
// parsed.data is fully typed here
```

#### Server Actions

```typescript
// In server actions, use safeParse and return errors to the form
const parsed = createUserSchema.safeParse(Object.fromEntries(formData));
if (!parsed.success) {
  return {
    success: false,
    fieldErrors: parsed.error.flatten().fieldErrors,
  };
}
```

#### URL Search Parameters

```typescript
// Always validate search params — they're strings by default
const { searchParams } = new URL(request.url);
const params = userFilterSchema.safeParse({
  page: searchParams.get('page'),
  perPage: searchParams.get('perPage'),
  role: searchParams.get('role'),
});
if (!params.success) {
  return apiError('VALIDATION', 'Invalid query parameters', 400);
}
// params.data.page is now a number, not a string
```

#### Environment Variables (see Chapter 02)

#### Third-Party API Responses

```typescript
// Validate external API responses — they can change without notice
const response = await fetch('https://api.stripe.com/v1/customers/' + customerId);
const data = await response.json();

const stripeCustomerSchema = z.object({
  id: z.string(),
  email: z.string().email().nullable(),
  created: z.number(),
  metadata: z.record(z.string()).default({}),
});

const customer = stripeCustomerSchema.parse(data); // Throws if Stripe changes their API
```

---

### 9.4 Custom Zod Validators

```typescript
// Reusable custom validators
import { z } from 'zod';

// Phone number validation
export const phoneSchema = z
  .string()
  .regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number (must be E.164 format: +14155552671)');

// Slug validation
export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format')
  .min(2)
  .max(64);

// URL validation with additional constraints
export const httpsUrlSchema = z
  .string()
  .url('Invalid URL')
  .startsWith('https://', 'URL must use HTTPS');

// Date range validation
export const dateRangeSchema = z
  .object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  })
  .refine(
    ({ startDate, endDate }) => startDate <= endDate,
    { message: 'Start date must be before or equal to end date', path: ['endDate'] },
  );

// File upload validation
export const fileUploadSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
  size: z.number().max(10 * 1024 * 1024, 'File must be less than 10MB'),
});
```

---

## Chapter 10: Caching Strategy

### 10.1 Caching Decision Matrix

| Layer | Technology | TTL | When to Use |
|-------|-----------|-----|-------------|
| Browser cache | `Cache-Control` headers | Minutes-hours | Static assets, public pages |
| CDN / Edge | Vercel Edge, CloudFront | Minutes-days | Static + semi-static pages |
| React cache | `cache()` (React 18+) | Request lifetime | Dedup identical server-side requests |
| Next.js `fetch` cache | `next: { revalidate }` | Configurable | Server component data fetching |
| Redis | Upstash, Redis Cloud | Configurable | Computed results, sessions, rate limits |
| DB query cache | Not recommended | — | Avoid — use Redis instead |

---

### 10.2 Next.js Caching Patterns

```typescript
// Pattern 1: Static with time-based revalidation (ISR)
// Use for: product listings, blog posts, public pages
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }, // Revalidate every 1 hour
  });
  return res.json();
}

// Pattern 2: On-demand revalidation (ISR with tags)
// Use for: content that changes unpredictably
async function getPost(id: string) {
  const res = await fetch(`https://api.example.com/posts/${id}`, {
    next: { tags: [`post-${id}`, 'posts'] },
  });
  return res.json();
}

// Invalidate from a Server Action or route handler:
import { revalidateTag } from 'next/cache';
await revalidateTag(`post-${id}`); // Revalidate specific post
await revalidateTag('posts');      // Revalidate all posts

// Pattern 3: No caching (always fresh)
// Use for: user-specific data, real-time data, sensitive data
async function getUserDashboard(userId: string) {
  const res = await fetch(`/api/users/${userId}/dashboard`, {
    cache: 'no-store', // Always fresh from server
  });
  return res.json();
}

// Pattern 4: React cache for request deduplication
import { cache } from 'react';

// This function is called many times in one request, but only runs once
export const getUserCached = cache(async (userId: UserId) => {
  return userRepository.findById(userId);
});
```

---

### 10.3 Redis Caching Patterns

```typescript
// lib/cache/redis.ts — Redis cache wrapper
import { Redis } from '@upstash/redis';
import { env } from '@/config/env';

const redis = env.REDIS_URL ? Redis.fromEnv() : null;

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    if (!redis) return null;
    const value = await redis.get<T>(key);
    return value;
  },

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    if (!redis) return;
    await redis.set(key, value, { ex: ttlSeconds });
  },

  async del(key: string): Promise<void> {
    if (!redis) return;
    await redis.del(key);
  },

  async delPattern(pattern: string): Promise<void> {
    if (!redis) return;
    const keys = await redis.keys(pattern);
    if (keys.length > 0) await redis.del(...keys);
  },
};

// Cache key factory — consistent key generation
export const cacheKeys = {
  user: (id: string) => `user:${id}`,
  userByEmail: (email: string) => `user:email:${email}`,
  userList: (orgId: string, page: number) => `users:org:${orgId}:page:${page}`,
  llmResponse: (inputHash: string) => `llm:${inputHash}`,
  rateLimitCounter: (ip: string, endpoint: string) => `rate:${endpoint}:${ip}`,
};
```

```typescript
// lib/user/user.service.ts — service with caching
export const userService = {
  async getUserById(id: UserId): Promise<User | null> {
    // Check cache first
    const cached = await cache.get<User>(cacheKeys.user(id));
    if (cached) return cached;

    // Cache miss — fetch from DB
    const user = await userRepository.findById(id);
    if (user) {
      await cache.set(cacheKeys.user(id), user, 300); // Cache for 5 minutes
    }
    return user;
  },

  async updateUser(id: UserId, input: UpdateUserInput): Promise<User> {
    const user = await userRepository.update(id, input);
    
    // Invalidate all cache keys for this user
    await Promise.all([
      cache.del(cacheKeys.user(id)),
      cache.del(cacheKeys.userByEmail(user.email)),
    ]);
    
    return user;
  },
};
```

---

### 10.4 LLM Response Caching

**HARD RULE (RCOST-02):** LLM calls are cached where the input is deterministic. Identical inputs must not re-call the LLM.

```typescript
// lib/ai/llm-cache.ts
import { createHash } from 'crypto';
import { cache, cacheKeys } from '@/lib/cache/redis';

export async function cachedLLMCall<T>(
  prompt: string,
  callFn: () => Promise<T>,
  ttlSeconds = 86400, // 24 hours default
): Promise<T> {
  const inputHash = createHash('sha256').update(prompt).digest('hex');
  const cacheKey = cacheKeys.llmResponse(inputHash);

  // Check cache
  const cached = await cache.get<T>(cacheKey);
  if (cached) {
    console.info({ action: 'llm_cache_hit', hash: inputHash });
    return cached;
  }

  // Call LLM
  const result = await callFn();
  
  // Cache result
  await cache.set(cacheKey, result, ttlSeconds);
  
  return result;
}

// Usage
const summary = await cachedLLMCall(
  `Summarize this text: ${articleContent}`,
  () => openai.chat.completions.create({ ... }),
);
```

---

### 10.5 Cache Invalidation Strategies

| Strategy | When to Use | How |
|----------|-------------|-----|
| **TTL expiry** | Stale data acceptable within time window | Set TTL on `cache.set()` |
| **Write-through** | Cache must always be fresh | Update cache on every write |
| **Event-driven** | Multiple services share cache | Publish cache invalidation events |
| **Tag-based** | Groups of related cache entries | `revalidateTag()` in Next.js |
| **Manual purge** | Admin operations, emergency fixes | `cache.del()` or `cache.delPattern()` |

**HARD RULE:** Never cache mutable data without either a TTL or an explicit invalidation path. A cache entry without both is a data consistency bug waiting to happen.

---

*End of Part 2*


---

# PART 3 — APPLICATION LAYER

---

## Chapter 11: Authentication & Session Management

### 11.1 Auth Provider Selection

**Decision tree (driven by Q-09):**

| Q-09 Answer | Recommended Solution | Notes |
|-------------|---------------------|-------|
| None | No auth | Public app — skip this chapter |
| JWT self-managed | Auth.js (NextAuth) with JWT strategy | Don't roll your own JWT |
| OAuth only | Auth.js with OAuth providers | Google, GitHub, Discord, etc. |
| Magic link | Auth.js with Email provider | Requires email service (Resend, SES) |
| MFA | Auth.js + TOTP library | Add after basic auth works |
| Enterprise SSO | Auth.js with SAML/OIDC provider | Okta, Entra ID, Auth0 |

**HARD RULE:** Never implement custom JWT signing/verification logic. Auth.js handles this correctly. Rolling your own introduces security vulnerabilities that are virtually guaranteed without deep cryptography expertise.

---

### 11.2 Auth.js (NextAuth v5) Configuration

```typescript
// auth.ts — root auth configuration
import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Resend from 'next-auth/providers/resend';
import { db } from '@/db';
import { env } from '@/config/env';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  
  // Database sessions — more secure than JWT for web apps
  session: { strategy: 'database' },
  
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          // Request offline access for refresh tokens
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
    GitHub({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    // Magic link email provider
    Resend({
      apiKey: env.RESEND_API_KEY,
      from: 'auth@yourdomain.com',
    }),
  ],

  callbacks: {
    // Add custom fields to session
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role as UserRole; // From DB user record
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify-email',
  },

  events: {
    async createUser({ user }) {
      // Send welcome email, set up default settings, etc.
      await onboardingService.setupNewUser(user.id);
    },
    async signIn({ user, isNewUser }) {
      // Audit log
      await auditLog.record({ userId: user.id, action: 'SIGN_IN' });
    },
  },
});
```

```typescript
// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth';
export const { GET, POST } = handlers;
```

---

### 11.3 Protecting Routes with Middleware

```typescript
// src/middleware.ts — runs on every request before rendering
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

// Routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/login', '/register', '/api/auth', '/api/health'];
const API_ROUTES_PREFIX = '/api';

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const isAuthenticated = !!request.auth;
  
  // Allow public routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    if (pathname.startsWith(API_ROUTES_PREFIX)) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
});

export const config = {
  // Run middleware on all routes except static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
```

---

### 11.4 Session Utilities

```typescript
// lib/auth/session.ts — server-side session helpers
import { auth } from '@/auth';
import { UnauthorizedError, ForbiddenError } from '@/shared/lib/errors';
import type { UserRole } from '@/types/auth.types';

export type Session = {
  userId: string;
  email: string;
  role: UserRole;
  orgId?: string;
};

// Get session or return null (use in layouts)
export async function getSession(): Promise<Session | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  
  return {
    userId: session.user.id,
    email: session.user.email!,
    role: session.user.role ?? 'member',
  };
}

// Get session or throw (use in protected route handlers)
export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) throw new UnauthorizedError();
  return session;
}

// Require a specific role or throw
export async function requireRole(
  requiredRole: UserRole | UserRole[],
): Promise<Session> {
  const session = await requireSession();
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
  if (!roles.includes(session.role)) {
    throw new ForbiddenError();
  }
  return session;
}
```

---

### 11.5 MFA Implementation (When Q-09 = MFA)

```typescript
// lib/auth/mfa.ts — TOTP-based MFA
import { authenticator } from 'otplib';
import QRCode from 'qrcode';

export const mfaService = {
  generateSecret(email: string): { secret: string; otpauthUrl: string } {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(email, 'YourApp', secret);
    return { secret, otpauthUrl };
  },

  async generateQRCode(otpauthUrl: string): Promise<string> {
    return QRCode.toDataURL(otpauthUrl);
  },

  verifyToken(token: string, secret: string): boolean {
    return authenticator.verify({ token, secret });
  },

  // Backup codes — single-use codes for account recovery
  generateBackupCodes(): string[] {
    return Array.from({ length: 10 }, () =>
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );
  },
};
```

---

## Chapter 12: Authorization & Access Control

### 12.1 Authorization Model Selection

See Chapter 01 for the decision tree. Implementation for each model:

---

### 12.2 RBAC Implementation

```typescript
// types/auth.types.ts — role and permission definitions
export type UserRole = 'admin' | 'manager' | 'member' | 'viewer';

export type Permission =
  | 'users:read'
  | 'users:write'
  | 'users:delete'
  | 'projects:read'
  | 'projects:write'
  | 'projects:delete'
  | 'billing:read'
  | 'billing:write'
  | 'admin:all';

// lib/auth/permissions.ts — explicit permission matrix
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: ['admin:all'],
  manager: [
    'users:read', 'users:write',
    'projects:read', 'projects:write', 'projects:delete',
    'billing:read',
  ],
  member: [
    'users:read',
    'projects:read', 'projects:write',
  ],
  viewer: [
    'users:read',
    'projects:read',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  if (role === 'admin') return true; // Admin has all permissions
  return rolePermissions[role]?.includes(permission) ?? false;
}

// lib/auth/guards.ts — reusable guard functions
export async function requirePermission(permission: Permission): Promise<Session> {
  const session = await requireSession();
  if (!hasPermission(session.role, permission)) {
    throw new ForbiddenError();
  }
  return session;
}
```

---

### 12.3 ABAC Implementation with CASL

```typescript
// lib/auth/abilities.ts — CASL ability definitions
import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';
import type { User } from '@/modules/user/user.types';
import type { Project } from '@/modules/project/project.types';

type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';
type Subjects = 'User' | 'Project' | 'Billing' | 'all' | User | Project;

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilitiesFor(user: User): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  switch (user.role) {
    case 'admin':
      can('manage', 'all'); // Admin can do anything
      break;

    case 'manager':
      can('read', 'User');
      can('update', 'User', { orgId: user.orgId }); // Only within their org
      can('manage', 'Project', { orgId: user.orgId });
      can('read', 'Billing');
      cannot('delete', 'User', { id: user.id }); // Can't delete self
      break;

    case 'member':
      can('read', 'User');
      can(['create', 'read', 'update'], 'Project', { orgId: user.orgId });
      cannot('delete', 'Project'); // Members cannot delete projects
      break;

    case 'viewer':
      can('read', ['User', 'Project']);
      break;
  }

  return build();
}

// Usage in service
export async function updateProject(
  projectId: ProjectId,
  input: UpdateProjectInput,
  currentUser: User,
): Promise<Project> {
  const project = await projectRepository.findById(projectId);
  if (!project) throw new NotFoundError('Project');

  const ability = defineAbilitiesFor(currentUser);
  if (ability.cannot('update', project)) throw new ForbiddenError();

  return projectRepository.update(projectId, input);
}
```

---

## Chapter 13: Server vs Client Components

### 13.1 The Core Decision

**Default: Server Component. Add 'use client' ONLY when the feature cannot work without it.**

```
Server Component → Client Component
      ↑                   ↑
  Renders on server    Renders on client
  No JS sent to client Sends JS to client
  Can be async         Cannot be async
  Can access DB        Cannot access DB
  Cannot use hooks     Can use hooks
  Cannot use events    Can use events
  Cannot use browser APIs  Can use browser APIs
```

---

### 13.2 Server Component Rules

```typescript
// ✅ Server component — correct patterns

// app/(dashboard)/users/page.tsx
import { userRepository } from '@/lib/user/user.repository';
import { requireSession } from '@/lib/auth/session';
import { UserTable } from '@/components/user/UserTable';

// Server components CAN be async
export default async function UsersPage() {
  // Server components CAN access the database directly
  const session = await requireSession();
  const { users } = await userRepository.findMany({ page: 1, perPage: 20 });

  // Server components pass data as props to client components
  return (
    <main>
      <h1>Users</h1>
      <UserTable users={users} currentUserRole={session.role} />
    </main>
  );
}

// METADATA — only in server components
export async function generateMetadata({ params }: { params: { id: string } }) {
  const user = await userRepository.findById(params.id as UserId);
  return {
    title: user ? `${user.name} — Users` : 'User Not Found',
  };
}
```

**What server components CAN do:**
- `async/await` at the component level
- Direct database access
- Read environment variables
- Read HTTP headers/cookies (via `headers()`, `cookies()`)
- Render other server components
- Render client components (but not the other way)

**What server components CANNOT do:**
- `useState`, `useEffect`, or any React hooks
- Browser APIs (`window`, `localStorage`, `navigator`)
- Event handlers (`onClick`, `onChange`)
- Context providers that use state

---

### 13.3 Client Component Rules

```typescript
'use client'; // Required — every file that uses hooks/events

// components/user/UserTable.tsx
import { useState, useTransition } from 'react';
import { deleteUserAction } from '@/lib/user/user.actions';
import type { User } from '@/modules/user/user.types';

type UserTableProps = {
  users: User[];
  currentUserRole: UserRole;
};

export function UserTable({ users, currentUserRole }: UserTableProps) {
  const [isPending, startTransition] = useTransition();
  
  function handleDelete(userId: string) {
    startTransition(async () => {
      await deleteUserAction(userId);
    });
  }

  return (
    <table>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {currentUserRole === 'admin' && (
              <td>
                <button 
                  onClick={() => handleDelete(user.id)}
                  disabled={isPending}
                >
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

**Rules for client components:**
- Place `'use client'` at the very top of the file, before imports
- Client components receive data as props from server components
- Never fetch data inside client components — use server components or hooks
- Keep client components as small as possible — push state to leaves
- Client component boundaries are viral — a server component that imports a client component becomes part of the client bundle

---

### 13.4 Component Composition Patterns

#### Pattern 1: Server Shell, Client Leaf

```typescript
// Server component provides data, client component handles interaction
// app/projects/page.tsx (Server)
export default async function ProjectsPage() {
  const projects = await projectRepository.findMany({ page: 1, perPage: 20 });
  return <ProjectList projects={projects} />; // Client component
}

// components/project/ProjectList.tsx (Client)
'use client';
export function ProjectList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('');
  const filtered = projects.filter(p => p.name.includes(filter));
  // ...
}
```

#### Pattern 2: Passing Server Components as Children to Client Components

```typescript
// This pattern allows nesting server components inside client component wrappers
// components/layout/Modal.tsx (Client — handles open/close state)
'use client';
export function Modal({ children, title }: { children: React.ReactNode; title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      {isOpen && (
        <div className="modal">
          <h2>{title}</h2>
          {children} {/* This can be a server component! */}
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </>
  );
}

// app/users/[id]/page.tsx (Server)
import { Modal } from '@/components/layout/Modal';
import { UserDetails } from '@/components/user/UserDetails'; // Can be server component

export default async function UserPage({ params }: { params: { id: string } }) {
  return (
    <Modal title="User Details">
      <UserDetails userId={params.id} /> {/* Server component as children */}
    </Modal>
  );
}
```

#### Pattern 3: Suspense Boundaries

```typescript
// app/(dashboard)/dashboard/page.tsx
import { Suspense } from 'react';
import { UserStats } from '@/components/dashboard/UserStats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { LoadingSkeleton } from '@/shared/components/LoadingSkeleton';

export default function DashboardPage() {
  return (
    <div>
      {/* Each Suspense boundary loads independently */}
      <Suspense fallback={<LoadingSkeleton />}>
        <UserStats /> {/* Slow query — doesn't block other sections */}
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <RecentActivity /> {/* Different slow query — loads in parallel */}
      </Suspense>
    </div>
  );
}
```

---

## Chapter 14: State Management

### 14.1 State Management Decision Tree

**HARD RULE:** Use the simplest state solution that works. Do not add Zustand/Redux before exhausting simpler options.

```
Question: Where does this state live?
│
├─ Server data (fetched from API/DB)?
│   └─ Use: Server Components + Server Actions (no client state needed)
│       └─ If client needs interaction: React Query / SWR
│
├─ UI state local to one component?
│   └─ Use: useState
│
├─ UI state shared between a few nearby components?
│   └─ Use: Lift state up to common parent + props
│
├─ UI state shared across the whole page?
│   └─ Use: React Context (no library needed)
│
├─ Complex UI state with many transitions?
│   └─ Use: useReducer
│
├─ Global app state (auth, theme, notifications)?
│   └─ Use: Zustand (minimal, no boilerplate)
│
└─ Remote server state with sync/invalidation?
    └─ Use: React Query (TanStack Query)
```

---

### 14.2 React Query for Server State

```typescript
// hooks/use-users.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query key factory — consistent, typesafe query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: UserFilter) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// List query
export function useUsers(filter: UserFilter) {
  return useQuery({
    queryKey: userKeys.list(filter),
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(filter.page),
        perPage: String(filter.perPage),
      });
      const res = await fetch(`/api/users?${params}`);
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json() as Promise<PaginatedResponse<User>>;
    },
    staleTime: 1000 * 60, // 1 minute
  });
}

// Detail query
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}`);
      if (!res.ok) throw new Error('Failed to fetch user');
      const data = await res.json();
      return data.data as User;
    },
    enabled: !!id, // Only run if id exists
  });
}

// Mutation
export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: UpdateUserInput }) => {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error('Failed to update user');
      const data = await res.json();
      return data.data as User;
    },
    onSuccess: (updatedUser) => {
      // Update specific query
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error) => {
      toast.error('Failed to update user');
    },
  });
}
```

---

### 14.3 Zustand for Global UI State

```typescript
// lib/store/app-store.ts — global UI state (theme, notifications, etc.)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Notification = {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
};

type AppStore = {
  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: AppStore['theme']) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  
  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            { ...notification, id: crypto.randomUUID() },
          ],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      
      isSidebarOpen: true,
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({ theme: state.theme, isSidebarOpen: state.isSidebarOpen }),
    },
  ),
);
```

---

## Chapter 15: Forms & Mutations

### 15.1 Form Architecture

**The React 19 / Next.js approach to forms:**

```typescript
// components/user/CreateUserForm.tsx
'use client';

import { useActionState } from 'react';
import { createUserAction } from '@/lib/user/user.actions';
import type { ActionState } from '@/lib/user/user.actions';

const initialState: ActionState = { success: false };

export function CreateUserForm() {
  const [state, formAction, isPending] = useActionState(
    createUserAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-describedby={state.fieldErrors?.email ? 'email-error' : undefined}
          aria-invalid={!!state.fieldErrors?.email}
          className="input"
        />
        {state.fieldErrors?.email && (
          <p id="email-error" role="alert" className="text-red-500 text-sm">
            {state.fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="input"
        />
        {state.fieldErrors?.name && (
          <p role="alert" className="text-red-500 text-sm">
            {state.fieldErrors.name[0]}
          </p>
        )}
      </div>

      {state.error && (
        <div role="alert" className="rounded bg-red-50 p-3 text-red-700">
          {state.error}
        </div>
      )}
      
      {state.success && (
        <div role="status" className="rounded bg-green-50 p-3 text-green-700">
          User created successfully
        </div>
      )}

      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

---

### 15.2 React Hook Form (for Complex Forms)

When forms have complex validation, dynamic fields, or real-time validation, use React Hook Form:

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema, type CreateUserInput } from '@/lib/user/user.validators';
import { useCreateUser } from '@/hooks/use-users';

export function AdvancedCreateUserForm() {
  const createUser = useCreateUser();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      role: 'member',
    },
  });

  async function onSubmit(data: CreateUserInput) {
    try {
      await createUser.mutateAsync(data);
      reset();
      toast.success('User created');
    } catch (error) {
      if (error instanceof ConflictError) {
        setError('email', { message: 'Email already exists' });
      } else {
        toast.error('Failed to create user');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="role">Role</label>
        <select id="role" {...register('role')}>
          <option value="viewer">Viewer</option>
          <option value="member">Member</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

---

### 15.3 Optimistic Updates

```typescript
'use client';

import { useOptimistic, useTransition } from 'react';
import { toggleTodoAction } from '@/lib/todo/todo.actions';

type Todo = { id: string; title: string; completed: boolean };

export function TodoList({ todos: initialTodos }: { todos: Todo[] }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticTodos, updateOptimisticTodo] = useOptimistic(
    initialTodos,
    (state, { id, completed }: { id: string; completed: boolean }) =>
      state.map(todo => todo.id === id ? { ...todo, completed } : todo),
  );

  function handleToggle(todo: Todo) {
    startTransition(async () => {
      // Update UI immediately (optimistic)
      updateOptimisticTodo({ id: todo.id, completed: !todo.completed });
      // Then sync with server
      await toggleTodoAction(todo.id);
      // If server action fails, Next.js reverts to the real state automatically
    });
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo)}
          />
          {todo.title}
        </li>
      ))}
    </ul>
  );
}
```

---

*End of Part 3*


---

# PART 4 — INFRASTRUCTURE

---

## Chapter 16: Testing Strategy

### 16.1 Testing Philosophy

**The Testing Pyramid for Next.js:**

```
         /\
        /E2E\          ← Few (5–15 critical paths)
       /------\
      / Integr \       ← Some (service + DB integration tests)
     /----------\
    /  Unit Tests \    ← Many (pure functions, validators, services)
   /--------------\
```

| Layer | Tool | What to Test | Coverage Goal |
|-------|------|-------------|--------------|
| Unit | Vitest | Pure functions, validators, formatters | 80%+ |
| Integration | Vitest + test DB | Services, repositories | Key flows |
| Component | Testing Library | Complex component logic | Critical components |
| E2E | Playwright | Critical user journeys | 5–15 flows |

**HARD RULE:** Tests for the same file live in a `__tests__/` directory next to the file, not in a separate top-level `tests/` folder.

---

### 16.2 Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'node', // Use 'jsdom' for component tests
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'src/app/**',          // Pages/routes — test with E2E
        'src/components/ui/**', // Shadcn components — not our code
        '**/*.types.ts',
        '**/*.config.ts',
      ],
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
    },
  },
});
```

```typescript
// src/__tests__/setup.ts
import { beforeAll, afterAll, afterEach } from 'vitest';

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});
```

---

### 16.3 Unit Testing Patterns

```typescript
// lib/user/__tests__/user.validators.test.ts
import { describe, it, expect } from 'vitest';
import { createUserSchema } from '../user.validators';

describe('createUserSchema', () => {
  it('accepts valid user data', () => {
    const result = createUserSchema.safeParse({
      email: 'user@example.com',
      name: 'John Doe',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.role).toBe('member'); // Default value
      expect(result.data.email).toBe('user@example.com'); // Lowercased
    }
  });

  it('rejects invalid email', () => {
    const result = createUserSchema.safeParse({
      email: 'not-an-email',
      name: 'John',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it('normalizes email to lowercase', () => {
    const result = createUserSchema.safeParse({
      email: 'USER@EXAMPLE.COM',
      name: 'John',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('user@example.com');
    }
  });

  it('rejects empty name', () => {
    const result = createUserSchema.safeParse({
      email: 'user@example.com',
      name: '',
    });
    expect(result.success).toBe(false);
  });
});
```

```typescript
// lib/user/__tests__/user.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userService } from '../user.service';
import { userRepository } from '../user.repository';

// Mock the repository — unit tests don't touch the DB
vi.mock('../user.repository');
const mockUserRepository = vi.mocked(userRepository);

describe('userService.createUser', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('creates a user when email is not taken', async () => {
    const mockUser = { id: '123', email: 'new@example.com', name: 'New User', role: 'member' };
    
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue(mockUser as User);

    const result = await userService.createUser({
      email: 'new@example.com',
      name: 'New User',
    });

    expect(result.success).toBe(true);
    expect(mockUserRepository.create).toHaveBeenCalledOnce();
  });

  it('returns error when email already exists', async () => {
    const existingUser = { id: '456', email: 'existing@example.com' };
    mockUserRepository.findByEmail.mockResolvedValue(existingUser as User);

    const result = await userService.createUser({
      email: 'existing@example.com',
      name: 'Another User',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('EMAIL_ALREADY_EXISTS');
    }
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });
});
```

---

### 16.4 Integration Testing

```typescript
// lib/user/__tests__/user.repository.integration.test.ts
// These tests run against a real (test) database
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { userRepository } from '../user.repository';
import * as schema from '@/db/schema';

let pool: Pool;

beforeAll(async () => {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });
  await migrate(db, { migrationsFolder: 'drizzle/migrations' });
});

afterAll(async () => {
  await pool.end();
});

beforeEach(async () => {
  // Clean test data
  await pool.query('TRUNCATE TABLE users CASCADE');
});

describe('userRepository', () => {
  it('creates and retrieves a user', async () => {
    const created = await userRepository.create({
      email: 'test@example.com',
      name: 'Test User',
    });

    expect(created.id).toBeDefined();
    expect(created.email).toBe('test@example.com');

    const found = await userRepository.findById(created.id as UserId);
    expect(found).not.toBeNull();
    expect(found!.email).toBe('test@example.com');
  });

  it('returns null for soft-deleted users', async () => {
    const user = await userRepository.create({
      email: 'deleted@example.com',
      name: 'Deleted User',
    });

    await userRepository.softDelete(user.id as UserId);
    const found = await userRepository.findById(user.id as UserId);
    
    expect(found).toBeNull();
  });
});
```

---

### 16.5 Component Testing

```typescript
// components/user/__tests__/UserCard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserCard } from '../UserCard';

const mockUser: User = {
  id: '123' as UserId,
  email: 'user@example.com',
  name: 'John Doe',
  role: 'member',
  createdAt: new Date('2024-01-01'),
};

describe('UserCard', () => {
  it('renders user name and email', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    
    render(<UserCard user={mockUser} onEdit={onEdit} />);
    
    await user.click(screen.getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith(mockUser.id);
  });

  it('shows loading state', () => {
    render(<UserCard user={mockUser} isLoading />);
    expect(screen.getByRole('status')).toBeInTheDocument(); // Loading indicator
  });
});
```

---

### 16.6 E2E Testing with Playwright

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can sign in with email', async ({ page }) => {
    await page.goto('/login');
    
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByRole('button', { name: 'Send magic link' }).click();
    
    await expect(
      page.getByText('Check your email for a login link')
    ).toBeVisible();
  });

  test('unauthenticated user is redirected to login', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page).toHaveURL(/.*login.*/);
  });

  test('authenticated user can access dashboard', async ({ page, context }) => {
    // Use pre-authenticated state (set up in playwright.config.ts)
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });
});
```

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  
  projects: [
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/.auth/user.json', // Authenticated state
      },
      dependencies: ['setup'],
    },
  ],
  
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Chapter 17: Security Rules

### 17.1 Input Security

**HARD RULE:** Never trust user input. Validate and sanitize at every boundary.

```typescript
// lib/security/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

// Sanitize HTML content (for rich text fields)
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'blockquote'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    FORCE_BODY: true,
  });
}

// Prevent SQL injection — use parameterized queries (Drizzle handles this)
// ❌ NEVER do this:
const query = `SELECT * FROM users WHERE email = '${email}'`; // SQL injection!

// ✅ Drizzle parameterizes automatically:
const users = await db.select().from(users).where(eq(users.email, email));

// Prevent path traversal
export function sanitizePath(path: string): string {
  // Remove any directory traversal sequences
  return path.replace(/\.\.\//g, '').replace(/\.\./g, '');
}
```

---

### 17.2 Authentication Security

```typescript
// Secure session configuration
export const authConfig = {
  // HARD: Use database sessions for web apps — JWTs can't be revoked
  session: {
    strategy: 'database' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Extend session if used within 24 hours
  },

  // HARD: Require HTTPS in production (handled by HOST_URL validation)
  cookies: {
    sessionToken: {
      name: '__Secure-next-auth.session-token', // __Secure prefix requires HTTPS
      options: {
        httpOnly: true,  // Not accessible via JavaScript
        sameSite: 'lax' as const,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
};

// CSRF protection — built into Next.js Server Actions
// Route handlers need manual CSRF check for sensitive operations
export function verifyCsrfToken(request: NextRequest): void {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  
  if (origin && !origin.includes(host ?? '')) {
    throw new ForbiddenError();
  }
}
```

---

### 17.3 API Security

```typescript
// lib/security/api-security.ts

// HARD: Validate API keys for programmatic access
export function validateApiKey(request: NextRequest): string {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) throw new UnauthorizedError();
  
  // API keys are hashed in storage — compare hash
  const keyHash = createHash('sha256').update(apiKey).digest('hex');
  // Look up in DB...
  return keyHash;
}

// HARD: Request size limits — prevent DoS via large payloads
export async function parseRequestBody<T>(
  request: NextRequest,
  schema: ZodSchema<T>,
  maxSizeBytes = 1024 * 1024, // 1MB default
): Promise<T> {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > maxSizeBytes) {
    throw new AppError('PAYLOAD_TOO_LARGE', 413, 'Request body too large');
  }
  
  const body = await request.json().catch(() => {
    throw new AppError('INVALID_JSON', 400, 'Invalid JSON body');
  });
  
  return schema.parse(body);
}

// HARD: Security headers (also set in next.config.ts)
export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
```

---

### 17.4 Data Security

```typescript
// lib/security/encryption.ts — for sensitive data at rest
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { env } from '@/config/env';

const scryptAsync = promisify(scrypt);
const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;

export async function encryptField(plaintext: string): Promise<string> {
  const iv = randomBytes(16);
  const key = (await scryptAsync(env.ENCRYPTION_KEY, 'salt', KEY_LENGTH)) as Buffer;
  
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();
  
  // Store: iv + authTag + encrypted as base64
  return Buffer.concat([iv, authTag, encrypted]).toString('base64');
}

export async function decryptField(ciphertext: string): Promise<string> {
  const buffer = Buffer.from(ciphertext, 'base64');
  const iv = buffer.subarray(0, 16);
  const authTag = buffer.subarray(16, 32);
  const encrypted = buffer.subarray(32);
  
  const key = (await scryptAsync(env.ENCRYPTION_KEY, 'salt', KEY_LENGTH)) as Buffer;
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  
  return decipher.update(encrypted) + decipher.final('utf8');
}

// Usage: encrypt PII fields in DB
// db/schema.ts
export const users = pgTable('users', {
  // ...
  ssn: text('ssn'), // Store encrypted — decrypt in repository layer only
});
```

---

### 17.5 Dependency Security

```bash
# Run before every PR merge — catches known vulnerabilities
npm audit --audit-level=moderate

# Use in CI pipeline
npm audit --audit-level=high --json | jq '.metadata.vulnerabilities'

# Lock dependency versions
npm ci  # Use instead of npm install in CI
```

**HARD RULE:** No production dependency with a `high` or `critical` severity CVE. Either upgrade or explicitly document why the vulnerable code path cannot be reached.

---

## Chapter 18: Performance Optimization

### 18.1 Core Web Vitals Targets

| Metric | Target | Tools to Monitor |
|--------|--------|-----------------|
| LCP (Largest Contentful Paint) | < 2.5s | PageSpeed, Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | PageSpeed, Web Vitals |
| FID/INP (Interaction to Next Paint) | < 200ms | PageSpeed, Web Vitals |
| TTFB (Time to First Byte) | < 600ms | PageSpeed |
| TBT (Total Blocking Time) | < 200ms | Lighthouse |

---

### 18.2 Image Optimization

```typescript
// ✅ Always use next/image — never <img> for user-facing images
import Image from 'next/image';

// Known dimensions — always set width and height
function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <Image
        src={product.imageUrl}
        alt={product.name} // HARD: alt text is required
        width={400}
        height={300}
        sizes="(max-width: 768px) 100vw, 400px" // Responsive sizing
        priority={false} // Set to true ONLY for above-the-fold images
        placeholder="blur" // SOFT: blur-up for better perceived performance
        blurDataURL={product.blurDataUrl}
      />
    </div>
  );
}

// Above-the-fold hero image
function HeroSection() {
  return (
    <Image
      src="/hero.webp"
      alt="Hero image"
      fill  // Fill the container
      priority  // Preload — only for above-the-fold
      sizes="100vw"
    />
  );
}
```

---

### 18.3 Bundle Size Optimization

```typescript
// Dynamic imports — code split heavy libraries
import dynamic from 'next/dynamic';

// ❌ Static import — always in bundle
import { Chart } from 'recharts';

// ✅ Dynamic import — only loads when component renders
const Chart = dynamic(() => import('recharts').then(m => ({ default: m.LineChart })), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Charts often need browser APIs
});

// Dynamic import with named export
const RichTextEditor = dynamic(
  () => import('@/components/editor/RichTextEditor'),
  { ssr: false }
);
```

```bash
# Analyze bundle size — run before shipping
ANALYZE=true npm run build
# Opens interactive bundle analyzer
```

**HARD RULE:** No client-side library > 50KB without:
1. Confirming there's no smaller alternative
2. Confirming it's code-split (dynamic import)
3. Documenting the justification in the PR

---

### 18.4 Database Query Performance

```typescript
// SOFT: Use select() to fetch only needed columns
// ❌ Fetches all columns including large text fields
const users = await db.select().from(users);

// ✅ Fetch only what you need
const users = await db.select({
  id: users.id,
  name: users.name,
  email: users.email,
}).from(users);

// HARD: Use cursor-based pagination for large datasets (see Chapter 07)

// SOFT: Batch related queries with Promise.all
// ❌ Sequential queries — each waits for the previous
const user = await userRepository.findById(userId);
const projects = await projectRepository.findByUserId(userId);
const billing = await billingRepository.findByUserId(userId);

// ✅ Parallel queries
const [user, projects, billing] = await Promise.all([
  userRepository.findById(userId),
  projectRepository.findByUserId(userId),
  billingRepository.findByUserId(userId),
]);
```

---

## Chapter 19: Observability & Error Handling

### 19.1 Error Class Hierarchy

```typescript
// shared/lib/errors.ts — the complete error contract
export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly status: number,
    public override readonly message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', 404, `${resource} not found`);
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super('UNAUTHORIZED', 401, 'Authentication required');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access denied') {
    super('FORBIDDEN', 403, message);
  }
}

export class ValidationError extends AppError {
  constructor(details: unknown) {
    super('VALIDATION', 400, 'Invalid input', details);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super('CONFLICT', 409, message);
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super('RATE_LIMITED', 429, 'Too many requests');
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(service: string) {
    super('SERVICE_UNAVAILABLE', 503, `${service} is temporarily unavailable`);
  }
}
```

---

### 19.2 Structured Logging

```typescript
// shared/lib/logger.ts
import pino from 'pino';
import { env } from '@/config/env';

export const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  
  // Pretty print in development
  transport: env.NODE_ENV === 'development'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined,
  
  // Production: structured JSON
  formatters: {
    level: (label) => ({ level: label }),
  },
  
  // Base fields on every log
  base: {
    service: 'my-app',
    env: env.NODE_ENV,
  },
});

// Usage patterns:
// logger.info({ userId, action: 'create', domain: 'user' }, 'User created');
// logger.error({ err, requestId, domain: 'billing' }, 'Payment failed');
// logger.warn({ userId, resource: 'project', action: 'delete' }, 'Admin action');

// Request-scoped logger (adds requestId to every log in a request)
export function createRequestLogger(requestId: string) {
  return logger.child({ requestId });
}
```

---

### 19.3 Health Check Endpoint

```typescript
// app/api/health/route.ts — monitored by uptime services
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Health check can't run on Edge

export async function GET() {
  const checks = await Promise.allSettled([
    checkDatabase(),
    checkRedis(),
  ]);

  const results = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      database: checks[0].status === 'fulfilled' ? 'ok' : 'error',
      redis: checks[1].status === 'fulfilled' ? 'ok' : 'error',
    },
  };

  const isHealthy = checks.every(c => c.status === 'fulfilled');
  
  return NextResponse.json(results, { status: isHealthy ? 200 : 503 });
}

async function checkDatabase(): Promise<void> {
  await db.execute(sql`SELECT 1`);
}

async function checkRedis(): Promise<void> {
  // Only check if Redis is configured
  if (!process.env.REDIS_URL) return;
  const { Redis } = await import('@upstash/redis');
  const redis = Redis.fromEnv();
  await redis.ping();
}
```

---

### 19.4 Error Boundary for Client Components

```typescript
// components/errors/ErrorBoundary.tsx
'use client';

import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
};

type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
    // Log to monitoring service
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div role="alert" className="rounded-lg border border-red-200 p-6">
          <h2 className="text-lg font-semibold text-red-700">Something went wrong</h2>
          <p className="mt-2 text-sm text-red-600">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 text-sm text-blue-600 underline"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Next.js error.tsx — catches server-rendered errors
// app/error.tsx
'use client';
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

---

## Chapter 20: CI/CD & Deployment

### 20.1 GitHub Actions Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      
      # HARD: TypeScript must compile with zero errors
      - name: TypeScript check
        run: npx tsc --noEmit
      
      # HARD: ESLint must pass with zero violations
      - name: Lint
        run: npm run lint
      
      # HARD: All tests must pass
      - name: Unit & Integration Tests
        run: npm run test:ci
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      
      # HARD: Coverage thresholds
      - name: Coverage Check
        run: npm run test:coverage

  security:
    name: Security Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      
      # HARD: No high/critical vulnerabilities
      - name: Dependency Audit
        run: npm audit --audit-level=high
      
      # SOFT: Secret scanning
      - name: Detect Secrets
        uses: trufflesecurity/trufflehog@main

  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: [quality]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - name: Run E2E
        run: npm run test:e2e
        env:
          BASE_URL: http://localhost:3000
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    needs: [quality, security, e2e]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

### 20.2 Deployment Checklist

**Before every production deployment:**

```markdown
## Pre-Deployment Checklist

### Code Quality
- [ ] `tsc --noEmit` passes with zero errors
- [ ] `eslint .` passes with zero violations
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] All E2E tests pass for critical paths
- [ ] No new `any` types introduced
- [ ] No `console.log` in production paths

### Database
- [ ] Migration script generated and reviewed
- [ ] Migration tested against staging DB
- [ ] Rollback plan documented for destructive migrations
- [ ] No N+1 queries introduced

### Security
- [ ] `npm audit` — no high/critical CVEs
- [ ] No secrets in source code
- [ ] All new environment variables in `.env.example`
- [ ] Input validation for all new endpoints

### Performance
- [ ] Bundle size analyzed for new dependencies
- [ ] All new images use `next/image`
- [ ] New pages have correct cache headers
- [ ] LLM calls use caching (if applicable)

### Observability
- [ ] New features have appropriate logging
- [ ] Error cases are handled and logged
- [ ] Health check still passes

### Documentation
- [ ] PR description explains what changed and why
- [ ] ADR created for architectural decisions
- [ ] `CHANGELOG.md` updated (if public-facing)
```

---

### 20.3 Environment Strategy

| Environment | Purpose | DB | Cache | Notes |
|-------------|---------|-----|-------|-------|
| `local` | Developer machine | Local Postgres | Optional local Redis | Uses `.env.local` |
| `preview` | PR review | Neon branch | Shared test Redis | Auto-deployed by Vercel |
| `staging` | Pre-production | Neon staging | Staging Redis | Manual deploy |
| `production` | Live | Neon production | Production Redis | Main branch auto-deploy |

**HARD RULE:** Never run migrations against production without testing against staging first. Never use production credentials in any non-production environment.

---

*End of Part 4*


---

# PART 5 — ADVANCED TOPICS

---

## Chapter 21: Real-Time Features

### 21.1 Real-Time Strategy Selection

**Decision tree (driven by Q-06):**

| Q-06 Answer | Technology | When |
|-------------|-----------|------|
| No real-time | None needed | Default |
| Polling acceptable | `setInterval` + fetch | Update frequency ≥ 10s, simple status checks |
| SSE (Server-Sent Events) | `ReadableStream` route handler | One-directional: server → client (notifications, progress, AI streaming) |
| WebSocket | Socket.io or native WS | Bi-directional: chat, collaborative editing, live cursors |

**HARD RULE:** Do not implement WebSocket if SSE satisfies the requirement. WebSocket requires a persistent server process (incompatible with Vercel serverless without additional infrastructure).

---

### 21.2 Server-Sent Events (SSE)

```typescript
// app/api/notifications/stream/route.ts — SSE endpoint
import { NextRequest } from 'next/server';
import { requireSession } from '@/lib/auth/session';
import { notificationService } from '@/lib/notification/notification.service';

export const runtime = 'nodejs'; // SSE requires Node.js runtime
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = await requireSession();
  
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial connection confirmation
      controller.enqueue(
        encoder.encode('data: {"type":"connected"}\n\n')
      );
      
      // Subscribe to notifications for this user
      const unsubscribe = await notificationService.subscribe(
        session.userId,
        (notification) => {
          const data = JSON.stringify({ type: 'notification', data: notification });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        },
      );
      
      // Clean up when client disconnects
      request.signal.addEventListener('abort', () => {
        unsubscribe();
        controller.close();
      });
      
      // Keep connection alive with heartbeat
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': heartbeat\n\n'));
        } catch {
          clearInterval(heartbeat);
        }
      }, 30_000);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable nginx buffering
    },
  });
}
```

```typescript
// hooks/use-notifications.ts — client-side SSE consumer
'use client';
import { useEffect, useRef, useState } from 'react';

type Notification = { id: string; message: string; type: string };

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const eventSource = new EventSource('/api/notifications/stream');
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => setIsConnected(true);
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'notification') {
        setNotifications(prev => [data.data, ...prev].slice(0, 50)); // Keep last 50
      }
    };
    
    eventSource.onerror = () => {
      setIsConnected(false);
      // Browser automatically reconnects EventSource
    };

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, []);

  return { notifications, isConnected };
}
```

---

### 21.3 AI Streaming with SSE

```typescript
// app/api/ai/chat/route.ts — streaming LLM responses
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { requireSession } from '@/lib/auth/session';

export const runtime = 'edge'; // Edge runtime supports streaming

export async function POST(request: Request) {
  const session = await requireSession();
  
  const { messages } = await request.json();
  
  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
    system: 'You are a helpful assistant.',
    maxTokens: 1000,
    onFinish: async ({ text, usage }) => {
      // Log usage for cost tracking
      await usageLogger.record({
        userId: session.userId,
        tokens: usage.totalTokens,
        model: 'gpt-4o-mini',
      });
    },
  });

  return result.toDataStreamResponse();
}
```

```typescript
// components/chat/ChatInterface.tsx — streaming chat UI
'use client';
import { useChat } from 'ai/react';

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/chat',
    onError: (error) => console.error('Chat error:', error),
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className="inline-block max-w-3xl p-3 rounded-lg bg-gray-100">
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="animate-pulse">AI is thinking...</div>}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="w-full p-2 border rounded"
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
```

---

## Chapter 22: Background Jobs & Queues

### 22.1 Queue Architecture

**When Q-07 = long-running jobs (>30s):**

```
HTTP Request → Route Handler → BullMQ Queue → Worker Process → DB/External API
     ↓               ↓              ↓                               ↓
  < 200ms        enqueue        persistent              actual work happens here
  response        job            job store
     ↓
  return jobId
  
Client → Poll GET /api/jobs/{jobId} → Return status/result
```

---

### 22.2 BullMQ Setup

```typescript
// lib/queue/queues.ts — queue definitions
import { Queue, Worker, QueueEvents } from 'bullmq';
import { Redis } from 'ioredis';
import { env } from '@/config/env';

const connection = new Redis(env.REDIS_URL!, {
  maxRetriesPerRequest: null, // Required by BullMQ
  enableReadyCheck: false,
});

// Define job data types
export type EmailJobData = {
  to: string;
  subject: string;
  template: 'welcome' | 'reset-password' | 'invoice';
  variables: Record<string, string>;
};

export type ExportJobData = {
  userId: string;
  orgId: string;
  format: 'csv' | 'xlsx' | 'json';
  filters: Record<string, unknown>;
};

// Queues — one per job category
export const emailQueue = new Queue<EmailJobData>('email', { connection });
export const exportQueue = new Queue<ExportJobData>('export', { connection });

// Queue events for monitoring
export const emailQueueEvents = new QueueEvents('email', { connection });
```

```typescript
// lib/queue/workers/email.worker.ts — runs as separate process
import { Worker } from 'bullmq';
import { emailQueue } from '../queues';
import { emailService } from '@/lib/email/email.service';
import { logger } from '@/shared/lib/logger';

const worker = new Worker<EmailJobData>(
  'email',
  async (job) => {
    logger.info({ jobId: job.id, to: job.data.to }, 'Processing email job');
    
    await emailService.send({
      to: job.data.to,
      subject: job.data.subject,
      template: job.data.template,
      variables: job.data.variables,
    });
    
    logger.info({ jobId: job.id }, 'Email sent successfully');
    return { sentAt: new Date().toISOString() };
  },
  {
    connection,
    concurrency: 5, // Process up to 5 emails simultaneously
    limiter: {
      max: 100,
      duration: 60_000, // Max 100 emails per minute
    },
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000, // 2s, 4s, 8s
      },
      removeOnComplete: { count: 1000 }, // Keep last 1000 completed jobs
      removeOnFail: { age: 7 * 24 * 60 * 60 }, // Keep failed jobs for 7 days
    },
  },
);

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Email job failed');
});
```

```typescript
// app/api/export/route.ts — enqueue job, return immediately
export async function POST(request: NextRequest) {
  const session = await requireSession();
  const input = exportJobSchema.parse(await request.json());

  // Enqueue job — returns in < 200ms
  const job = await exportQueue.add('export', {
    userId: session.userId,
    orgId: session.orgId,
    format: input.format,
    filters: input.filters,
  });

  return apiResponse({ jobId: job.id }, 202); // 202 Accepted
}

// app/api/export/[jobId]/route.ts — poll for status
export async function GET(
  _request: NextRequest,
  { params }: { params: { jobId: string } },
) {
  const session = await requireSession();
  const job = await exportQueue.getJob(params.jobId);
  
  if (!job) return apiError('NOT_FOUND', 'Job not found', 404);
  
  const state = await job.getState();
  const progress = job.progress;
  
  return apiResponse({
    jobId: params.jobId,
    status: state,
    progress: typeof progress === 'number' ? progress : 0,
    result: state === 'completed' ? job.returnvalue : null,
    error: state === 'failed' ? job.failedReason : null,
  });
}
```

---

## Chapter 23: File Storage & Media

### 23.1 File Storage Decision

**HARD RULE (RCOST-05):** Any file > 100KB MUST be stored in object storage. Never store binary blobs in the database.

| Solution | When to Use | Cost |
|----------|-------------|------|
| Cloudflare R2 | Default — zero egress fees | $0.015/GB/month, free egress |
| AWS S3 | AWS-native stack | $0.023/GB/month + egress fees |
| Vercel Blob | Vercel-native, simple setup | $0.023/GB/month |
| Uploadthing | SaaS with DX focus | Free tier available |

---

### 23.2 File Upload Pattern

```typescript
// lib/storage/upload.ts — storage abstraction
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '@/config/env';
import { createHash } from 'crypto';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

export const storage = {
  // Generate presigned URL — client uploads directly to R2 (no server bottleneck)
  async createPresignedUploadUrl(opts: {
    key: string;
    contentType: string;
    maxSizeBytes?: number;
  }): Promise<{ uploadUrl: string; fileUrl: string }> {
    const command = new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: opts.key,
      ContentType: opts.contentType,
    });
    
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 min
    const fileUrl = `${env.CDN_URL}/${opts.key}`;
    
    return { uploadUrl, fileUrl };
  },

  // Generate presigned GET URL for private files
  async createPresignedDownloadUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: key,
    });
    return getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour
  },

  // Generate a secure storage key for uploaded files
  generateKey(opts: { userId: string; filename: string }): string {
    const ext = opts.filename.split('.').pop()!;
    const hash = createHash('sha256')
      .update(`${opts.userId}:${Date.now()}:${opts.filename}`)
      .digest('hex')
      .substring(0, 16);
    return `uploads/${opts.userId}/${hash}.${ext}`;
  },
};
```

```typescript
// app/api/upload/route.ts — presigned URL endpoint
export async function POST(request: NextRequest) {
  const session = await requireSession();
  
  const body = fileUploadRequestSchema.parse(await request.json());
  
  // Security: validate file type and size
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (!ALLOWED_TYPES.includes(body.contentType)) {
    return apiError('VALIDATION', 'File type not allowed', 400);
  }
  
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (body.fileSize > MAX_SIZE) {
    return apiError('VALIDATION', 'File too large (max 10MB)', 400);
  }
  
  const key = storage.generateKey({
    userId: session.userId,
    filename: body.filename,
  });
  
  const { uploadUrl, fileUrl } = await storage.createPresignedUploadUrl({
    key,
    contentType: body.contentType,
    maxSizeBytes: MAX_SIZE,
  });
  
  return apiResponse({ uploadUrl, fileUrl, key });
}
```

```typescript
// Client-side upload flow
async function uploadFile(file: File): Promise<string> {
  // Step 1: Get presigned URL from our server
  const { data } = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      fileSize: file.size,
    }),
  }).then(r => r.json());

  // Step 2: Upload directly to R2 (bypasses our server)
  await fetch(data.uploadUrl, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type },
  });

  // Step 3: Return the public URL to store in DB
  return data.fileUrl;
}
```

---

## Chapter 24: Multi-Tenancy

### 24.1 Tenant Identification

```typescript
// middleware.ts — identify tenant on every request
import { auth } from '@/auth';

export default auth((request) => {
  const session = request.auth;
  
  // Subdomain-based tenant identification
  const hostname = request.headers.get('host') ?? '';
  const subdomain = hostname.split('.')[0];
  
  if (subdomain && subdomain !== 'www' && subdomain !== 'app') {
    // Inject tenant identifier for downstream use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-tenant-slug', subdomain);
    
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
  
  return NextResponse.next();
});
```

```typescript
// lib/tenant/tenant.service.ts
export const tenantService = {
  async getTenantFromRequest(request: NextRequest): Promise<Tenant | null> {
    // Method 1: Subdomain
    const subdomain = request.headers.get('x-tenant-slug');
    if (subdomain) return tenantRepository.findBySlug(subdomain);
    
    // Method 2: Session (user's default org)
    const session = await getSession();
    if (session?.orgId) return tenantRepository.findById(session.orgId);
    
    return null;
  },
  
  async requireTenant(request: NextRequest): Promise<Tenant> {
    const tenant = await this.getTenantFromRequest(request);
    if (!tenant) throw new NotFoundError('Tenant');
    return tenant;
  },
};
```

---

### 24.2 Tenant-Scoped Data Access

```typescript
// All repository methods take orgId as an explicit parameter
// Never rely on implicit tenant context in application code

export const projectRepository = {
  async findMany(opts: {
    orgId: OrgId;
    page: number;
    perPage: number;
  }): Promise<{ projects: Project[]; total: number }> {
    // orgId is ALWAYS in the WHERE clause
    const where = and(
      eq(projects.orgId, opts.orgId),
      isNull(projects.deletedAt),
    );
    // ...
  },

  async findById(id: ProjectId, orgId: OrgId): Promise<Project | null> {
    // Include orgId check — prevents tenant data leakage
    const [record] = await db
      .select()
      .from(projects)
      .where(and(
        eq(projects.id, id),
        eq(projects.orgId, orgId), // HARD: Always scope by tenant
        isNull(projects.deletedAt),
      ))
      .limit(1);
    
    return record ? toDomainProject(record) : null;
  },
};

// Service layer enforces tenant context
export const projectService = {
  async getProject(id: ProjectId, session: Session): Promise<Project> {
    const project = await projectRepository.findById(id, session.orgId as OrgId);
    if (!project) throw new NotFoundError('Project');
    return project;
  },
};
```

---

### 24.3 Tenant Provisioning

```typescript
// lib/tenant/tenant-provisioning.service.ts
export const tenantProvisioningService = {
  async createTenant(opts: {
    name: string;
    slug: string;
    adminUserId: string;
  }): Promise<Tenant> {
    return db.transaction(async (tx) => {
      // 1. Create the organization
      const [org] = await tx
        .insert(organizations)
        .values({
          name: opts.name,
          slug: opts.slug,
        })
        .returning();

      // 2. Add the creating user as admin
      await tx.insert(orgMembers).values({
        orgId: org!.id,
        userId: opts.adminUserId,
        role: 'admin',
      });

      // 3. Create default settings
      await tx.insert(orgSettings).values({
        orgId: org!.id,
        plan: 'free',
        maxMembers: 5,
        maxProjects: 3,
      });

      // 4. Enqueue welcome email
      await emailQueue.add('welcome-org', {
        to: opts.adminUserId,
        template: 'org-created',
        variables: { orgName: opts.name, slug: opts.slug },
      });

      return org!;
    });
  },
};
```

---

## Chapter 25: Internationalization, SEO & Evolution

### 25.1 Internationalization (i18n)

```typescript
// next.config.ts — enable i18n routing
const config: NextConfig = {
  i18n: {
    locales: ['en', 'es', 'fr', 'de', 'ja'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};
```

```typescript
// lib/i18n/index.ts — using next-intl
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'es', 'fr', 'de', 'ja'] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();
  
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'UTC',
    now: new Date(),
  };
});

// messages/en.json
// {
//   "common": {
//     "save": "Save",
//     "cancel": "Cancel",
//     "loading": "Loading..."
//   },
//   "users": {
//     "title": "Users",
//     "createUser": "Create User",
//     "noUsers": "No users found"
//   }
// }
```

```typescript
// Usage in server components
import { useTranslations } from 'next-intl';

export default function UsersPage() {
  const t = useTranslations('users');
  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{t('createUser')}</button>
    </div>
  );
}
```

---

### 25.2 SEO Rules

```typescript
// app/layout.tsx — root metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // HARD: Always set these
  title: {
    template: '%s | My App',
    default: 'My App — Your tagline here',
  },
  description: 'Your app description (150-160 characters)',
  
  // Open Graph — for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myapp.com',
    siteName: 'My App',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'My App',
    }],
  },
  
  // Twitter/X card
  twitter: {
    card: 'summary_large_image',
    creator: '@myhandle',
  },
  
  // Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// Dynamic metadata — for specific pages
// app/blog/[slug]/page.tsx
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await postRepository.findBySlug(params.slug);
  if (!post) return { title: 'Not Found' };
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author.name],
    },
  };
}
```

```typescript
// app/sitemap.ts — auto-generated sitemap
import type { MetadataRoute } from 'next';
import { postRepository } from '@/lib/post/post.repository';

export default async function sitemap(): MetadataRoute.Sitemap {
  const posts = await postRepository.findPublished();
  
  return [
    { url: 'https://myapp.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://myapp.com/blog', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    ...posts.map(post => ({
      url: `https://myapp.com/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];
}

// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/dashboard/'] },
    ],
    sitemap: 'https://myapp.com/sitemap.xml',
  };
}
```

---

### 25.3 Accessibility Rules

**HARD RULE:** All interactive elements must be keyboard-accessible and have proper ARIA attributes.

```typescript
// Accessibility checklist for every component

// 1. Semantic HTML
// ❌ Wrong
<div onClick={handleClick}>Delete</div>

// ✅ Correct
<button type="button" onClick={handleClick}>Delete</button>

// 2. ARIA labels for icon-only buttons
// ❌ Wrong
<button><TrashIcon /></button>

// ✅ Correct
<button type="button" aria-label="Delete user">
  <TrashIcon aria-hidden="true" />
</button>

// 3. Form labels — always explicit
// ❌ Wrong
<input type="email" placeholder="Enter email" />

// ✅ Correct
<label htmlFor="email">Email address</label>
<input id="email" type="email" />

// 4. Error announcements
// ❌ Wrong (screen reader doesn't announce this)
{error && <p className="text-red-500">{error}</p>}

// ✅ Correct
{error && <p role="alert" aria-live="assertive" className="text-red-500">{error}</p>}

// 5. Loading states
// ❌ Wrong
<button disabled={isLoading}>Submit</button>

// ✅ Correct
<button
  disabled={isLoading}
  aria-disabled={isLoading}
  aria-busy={isLoading}
>
  {isLoading ? 'Submitting...' : 'Submit'}
</button>

// 6. Skip navigation link (required for keyboard users)
// app/layout.tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:bg-white focus:p-4"
>
  Skip to main content
</a>
<main id="main-content">...</main>
```

---

### 25.4 Evolution Rules

#### When to Evolve (Not Before)

| Evolution | Trigger | Not Before |
|-----------|---------|------------|
| Add Redis | First job > 30s OR rate limiting needed | Never speculatively |
| Add second DB | Analytics queries degrading OLTP | Read replica first |
| Extract microservice | Distinct team + deploy cadence + scaling | Team > 8, timeline > 6mo |
| Add CDN | Cache-hit rate < 80% OR TTFB > 500ms for static | Measure first |
| Add full-text search | ILIKE in P95 slow queries + index optimization failed | Postgres FTS before Elasticsearch |
| Add event bus | > 3 services react to same event + source shouldn't know consumers | Synchronous calls first |
| Add GraphQL | Multiple client types with divergent data needs TODAY | Never for single client |
| Add Kubernetes | Cloud managed services exhausted + dedicated platform team | Never without these criteria |

---

#### Anti-Patterns That Are Always Blocked

```typescript
// ❌ NEVER: Over-abstracted repository with generic methods
class GenericRepository<T> {
  findAll(): Promise<T[]> { ... }
  findOne(id: string): Promise<T | null> { ... }
  save(entity: T): Promise<T> { ... }
}
// This hides SQL, prevents query optimization, and provides false safety

// ✅ Domain-specific repositories with explicit queries
export const userRepository = {
  findById(id: UserId): Promise<User | null> { ... },
  findByEmail(email: string): Promise<User | null> { ... },
  findManyByOrgId(orgId: OrgId, opts: PaginationOpts): Promise<User[]> { ... },
};

// ❌ NEVER: Global error handler that swallows errors
try {
  const result = await doSomething();
} catch {
  // ignore
}

// ✅ Always handle or re-throw explicitly
try {
  const result = await doSomething();
} catch (error) {
  if (error instanceof KnownError) {
    return handleKnownError(error);
  }
  logger.error({ err: error }, 'Unexpected error in doSomething');
  throw error; // Re-throw unknown errors
}

// ❌ NEVER: Magic string configuration scattered in code
if (user.plan === 'pro') { ... }
if (process.env.FEATURE_FLAG === 'true') { ... }

// ✅ Centralized, typed configuration
import { env } from '@/config/env';
import { PLANS } from '@/config/plans';

if (user.plan === PLANS.PRO) { ... }
if (env.ENABLE_FEATURE_X) { ... }
```

---

### 25.5 Technical Debt Management

#### Debt Taxonomy

| Category | Example | Priority |
|----------|---------|----------|
| **Security debt** | Unvalidated input, missing auth checks | P0 — fix immediately |
| **Correctness debt** | Known bugs with workarounds | P1 — fix in next sprint |
| **Reliability debt** | Missing error handling, no retries | P2 — fix before scaling |
| **Performance debt** | N+1 queries, no indexes | P3 — fix before hitting scale |
| **Maintainability debt** | Missing types, no tests, duplicate code | P4 — fix when touching code |

#### Debt Tracking Rule

**HARD RULE:** Technical debt is not tracked in comments (`// TODO: fix this later`). It is tracked as issues in the project management tool with a `tech-debt` label, a priority, and an owner.

```typescript
// ❌ Never: silent debt accumulation
const result = data as any; // TODO: fix this

// ✅ Create a tracking issue, then add a typed suppression
// Tracking issue: [PROJ-123] Remove type assertion in user service
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- PROJ-123: pending schema migration
const result = data as any;
```

---

### 25.6 The Master Checklist — Before Every PR

**Gates that block merge:**

```markdown
## Pre-Merge Quality Gate

### ✅ TypeScript
- [ ] `npx tsc --noEmit` — zero errors
- [ ] No `any` without suppression comment + tracking issue
- [ ] No `@ts-ignore` (use `@ts-expect-error` with description)

### ✅ Linting
- [ ] `npx eslint . --max-warnings 0` — zero warnings
- [ ] No import boundary violations

### ✅ Testing
- [ ] All existing tests pass — zero regressions
- [ ] New domain logic has unit tests
- [ ] New API endpoints have integration tests

### ✅ Database
- [ ] If schema changed: migration generated and committed
- [ ] If migration is destructive: rollback plan in PR description
- [ ] No raw SQL in service/domain layer

### ✅ Security
- [ ] All new inputs are validated with Zod
- [ ] No secrets in source code
- [ ] New env vars in `.env.example`
- [ ] Auth guard on all new protected routes

### ✅ Performance
- [ ] No N+1 queries introduced
- [ ] New images use `next/image`
- [ ] No synchronous operations > 5s in HTTP handlers

### ✅ Architecture
- [ ] No import boundary violations
- [ ] Business logic in service/lib, not in components
- [ ] No direct DB access outside repository layer
- [ ] ADR created if architectural decision was made

### ✅ Documentation
- [ ] PR description: what changed, why, what was NOT changed
- [ ] If API changed: `types/api.types.ts` updated
- [ ] If Q-answers changed: rulebook updated
```

---

### 25.7 Appendix: Quick Reference Cards

#### Folder Location Quick Reference

| What are you creating? | Where does it go? |
|------------------------|-------------------|
| A page | `app/(group)/page-name/page.tsx` |
| An API endpoint | `app/api/domain-name/route.ts` |
| A server action | `lib/domain/domain.actions.ts` |
| Business logic | `lib/domain/domain.service.ts` |
| DB query | `lib/domain/domain.repository.ts` |
| Input validation schema | `lib/domain/domain.validators.ts` |
| TypeScript types (domain) | `lib/domain/domain.types.ts` |
| TypeScript types (shared) | `types/shared-name.types.ts` |
| A React component | `components/domain/ComponentName.tsx` |
| A shared UI component | `components/ui/ComponentName.tsx` |
| A custom React hook | `hooks/use-feature-name.ts` |
| An environment variable | `config/env.ts` + `.env.example` |
| A utility function | `shared/lib/utils.ts` or `lib/utils/name.ts` |
| An error class | `shared/lib/errors.ts` |
| A test | `lib/domain/__tests__/feature.test.ts` |

---

#### Technology Decision Quick Reference

| Need | Solution | Never Use |
|------|----------|-----------|
| Form validation | Zod + React Hook Form | Yup, Joi (prefer Zod) |
| Database | Drizzle ORM + PostgreSQL | Raw SQL in services |
| Auth | Auth.js (NextAuth) | Custom JWT implementation |
| Access control | CASL (ABAC) or role matrix (RBAC) | UI-only permission checks |
| Email | Resend | SMTP directly |
| File storage | Cloudflare R2 | Database blobs |
| Background jobs | BullMQ + Redis | `setTimeout` for long work |
| Real-time (1-way) | SSE | WebSocket for server→client only |
| Caching | Redis (Upstash) + Next.js cache | DB as cache |
| State (server data) | React Query (TanStack) | Prop drilling 5+ levels |
| State (UI global) | Zustand | Redux for simple cases |
| UI components | Shadcn/UI | Building from scratch |
| Styling | Tailwind CSS | Inline styles |
| Testing (unit) | Vitest | Jest (Vitest is faster) |
| E2E testing | Playwright | Cypress (Playwright is better) |
| Logging | Pino | `console.log` |
| Error tracking | Sentry | Custom error tracker |
| Analytics | PostHog | Mixpanel (PostHog is open-source) |

---

#### Common Mistakes Quick Reference

| Mistake | Correct Pattern |
|---------|----------------|
| `console.log` in production code | `logger.info()` |
| `process.env.VAR` outside `config/env.ts` | `import { env } from '@/config/env'` |
| DB client outside `db/index.ts` | Import `db` only in repositories |
| `useEffect` for data fetching | Server component or React Query |
| Long computation in HTTP handler | BullMQ job queue |
| `any` type | Zod parse or proper type annotation |
| Relative import `../../` | Path alias `@/module` |
| Untested user input | `schema.parse(input)` before use |
| Inline style `style={{color:'red'}}` | Tailwind class `text-red-500` |
| Magic string `'admin'` | `UserRole.Admin` enum value |
| Missing error boundary | Wrap sections with `<ErrorBoundary>` |
| N+1 queries | JOIN or batch query in repository |
| File > 100KB in DB | Object storage (R2/S3) |

---

*End of Part 5*

---

# CONCLUSION

This rulebook is a living document. It evolves with the platform, but always through the same process:

1. **New requirement arrives** → Re-evaluate against Q-01 through Q-15
2. **Q-answer changes** → Run the update protocol (Section 00)
3. **Stability score drops** → Architecture class may need to downgrade
4. **Team/scale grows** → Architecture class may be upgraded with justification

**The goal is not perfection on day one.** The goal is a system that grows predictably, without surprises, without entropy.

Every rule in this document was earned by a real failure mode. Every pattern was validated in production. Every prohibition exists because someone, somewhere, paid the cost of ignoring it.

Build with discipline. Ship with confidence.

---

*NEXT.JS PRODUCTION RULEBOOK v2.0*  
*© 2025 — Internal Use Only*  
*Reviewed before every new domain or service is created*


---

# PART 6 — COMPONENT SYSTEM & UI ARCHITECTURE

---

## Chapter 26: Design System Architecture

### 26.1 Component Hierarchy

Every UI element belongs to exactly one level of the component hierarchy. Violating this creates spaghetti UIs that are hard to maintain.

```
Level 1: Design Tokens     → CSS variables, Tailwind config
Level 2: Primitive UI      → components/ui/ (Shadcn — never edit)
Level 3: Composite UI      → components/shared/ (assembled from primitives)
Level 4: Domain Components → components/[domain]/ (business-aware)
Level 5: Page Sections     → components/sections/ (page-specific layouts)
Level 6: Pages             → app/**/page.tsx (routing + composition only)
```

**Rules:**
- Higher levels CAN import lower levels
- Lower levels CANNOT import higher levels
- Level 2 (Shadcn) is NEVER modified — extend by composition only
- Level 3 has no business logic — only layout, styling, and composition
- Level 4 knows about domain types (User, Project, etc.) but not about DB

---

### 26.2 Component File Anatomy

Every component file follows this exact structure:

```typescript
// components/user/UserCard.tsx

// 1. Imports — in this order: React, external, internal
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { User } from '@/modules/user/user.types';
import { cn } from '@/shared/lib/utils';

// 2. Types — co-located, named {ComponentName}Props
type UserCardProps = {
  user: User;
  variant?: 'compact' | 'full';
  className?: string;
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
};

// 3. Component — one per file, named export
export function UserCard({
  user,
  variant = 'full',
  className,
  onEdit,
  onDelete,
}: UserCardProps) {
  // 3a. Hooks at the top
  const [isExpanded, setIsExpanded] = useState(false);

  // 3b. Derived values
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  // 3c. Event handlers
  function handleEditClick() {
    onEdit?.(user.id);
  }

  // 3d. Render
  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-4',
        variant === 'compact' && 'p-2',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{user.name}</p>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
        </div>
        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
          {user.role}
        </Badge>
      </div>

      {variant === 'full' && (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Joined {formatDistanceToNow(user.createdAt, { addSuffix: true })}
          </span>
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={handleEditClick}>
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() => onDelete(user.id)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 4. Sub-components — only if tightly coupled and not reused elsewhere
function UserCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 rounded bg-muted" />
          <div className="h-3 w-1/2 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

// Export sub-components as named properties of main export
UserCard.Skeleton = UserCardSkeleton;
```

---

### 26.3 Tailwind Configuration

```typescript
// tailwind.config.ts — design tokens as first-class configuration
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Map Shadcn CSS variables to Tailwind utilities
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

```css
/* src/app/globals.css — CSS variables for theming */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode values ... */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

### 26.4 cn() Utility — Conditional Classes

```typescript
// shared/lib/utils.ts — required utility
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merges Tailwind classes safely — no conflicting utilities
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  'base-class another-base',        // Always applied
  isActive && 'active-class',       // Conditionally applied
  variant === 'large' && 'p-6',     // Based on prop
  'text-red-500',                   // Will NOT conflict with inherited text-blue-500
  className,                        // Caller-provided overrides go last
)} />
```

---

### 26.5 Loading & Skeleton States

```typescript
// Every data-fetching component MUST handle loading state
// Use skeleton components that match the real content layout

// components/user/UserCardSkeleton.tsx
export function UserCardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="rounded-lg border bg-card p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// In server component — wrap in Suspense with skeleton fallback
<Suspense fallback={<UserCardSkeleton count={3} />}>
  <UserList orgId={orgId} />
</Suspense>
```

---

### 26.6 Toast Notifications

```typescript
// Standardized toast usage — consistency across the app

import { toast } from 'sonner';

// Success
toast.success('User created successfully');

// Error — always show code if available
toast.error('Failed to create user', {
  description: 'This email is already registered',
});

// Promise toast — handles loading/success/error states
toast.promise(createUserAction(data), {
  loading: 'Creating user...',
  success: 'User created!',
  error: (err) => err.message || 'Failed to create user',
});

// With action
toast.success('File deleted', {
  action: {
    label: 'Undo',
    onClick: () => restoreFileAction(fileId),
  },
});
```

---

## Chapter 27: Data Tables & Complex UI

### 27.1 Data Table Architecture with TanStack Table

```typescript
// components/shared/DataTable.tsx — reusable data table
'use client';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
};

export function DataTable<TData>({
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Search...',
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnFilters },
    initialState: { pagination: { pageSize: 20 } },
  });

  return (
    <div className="space-y-4">
      {searchKey && (
        <Input
          placeholder={searchPlaceholder}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} total rows
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="flex items-center text-sm">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
```

```typescript
// Usage — define columns for a specific domain
// components/user/UserColumns.tsx
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from '@/modules/user/user.types';

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Badge variant={row.original.role === 'admin' ? 'default' : 'secondary'}>
        {row.original.role}
      </Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem>Edit user</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete user</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
```

---

## Chapter 28: Advanced TypeScript Patterns

### 28.1 Template Literal Types

```typescript
// Use template literal types for type-safe string construction

// HTTP methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Event names — type-safe event bus
type DomainEventName = `${string}:${'created' | 'updated' | 'deleted'}`;
// 'user:created' ✅, 'project:updated' ✅, 'user:exploded' ❌

// CSS class builder
type TailwindSize = 'sm' | 'md' | 'lg' | 'xl';
type PaddingClass = `p-${number}` | `px-${number}` | `py-${number}`;

// Route paths — type-safe routing
type AppRoute =
  | '/dashboard'
  | '/dashboard/users'
  | `/dashboard/users/${string}`
  | '/dashboard/settings'
  | '/api/users'
  | `/api/users/${string}`;
```

---

### 28.2 Conditional Types

```typescript
// Conditional types for flexible, reusable generics

// Extract promise return type
type Awaited<T> = T extends Promise<infer U> ? U : T;

// Make response type depend on input
type ApiResponse<T, E extends boolean = false> = E extends true
  ? { success: false; error: string }
  : { success: true; data: T };

// Non-nullable helper
type NonNullable<T> = T extends null | undefined ? never : T;

// Recursive partial (deep partial)
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

// Pick properties of a specific type
type PickByType<T, Type> = {
  [K in keyof T as T[K] extends Type ? K : never]: T[K];
};

// Example: get all string properties of User
type UserStringProps = PickByType<User, string>;
// { name: string; email: string; role: string; }
```

---

### 28.3 Declaration Merging for Typed Environment

```typescript
// types/next-auth.d.ts — extend NextAuth types
import 'next-auth';
import type { UserRole } from '@/types/auth.types';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
      role: UserRole;
      orgId?: string;
    };
  }

  interface User {
    role: UserRole;
    orgId?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    orgId?: string;
  }
}
```

```typescript
// types/global.d.ts — global type augmentations
declare global {
  // Extend window with analytics
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
      identify: (userId: string, properties?: Record<string, unknown>) => void;
    };
  }
}

// Ensure this is a module
export {};
```

---

### 28.4 Type-Safe Event Emitter

```typescript
// lib/events/event-emitter.ts — type-safe domain events

type EventMap = {
  'user.created': { userId: string; email: string };
  'user.deleted': { userId: string };
  'project.created': { projectId: string; orgId: string; userId: string };
  'billing.subscription.created': { subscriptionId: string; planId: string; orgId: string };
};

type EventHandler<T> = (payload: T) => void | Promise<void>;

class TypedEventEmitter {
  private handlers = new Map<string, EventHandler<unknown>[]>();

  on<K extends keyof EventMap>(event: K, handler: EventHandler<EventMap[K]>): void {
    const existing = this.handlers.get(event as string) ?? [];
    this.handlers.set(event as string, [...existing, handler as EventHandler<unknown>]);
  }

  off<K extends keyof EventMap>(event: K, handler: EventHandler<EventMap[K]>): void {
    const existing = this.handlers.get(event as string) ?? [];
    this.handlers.set(
      event as string,
      existing.filter(h => h !== handler),
    );
  }

  async emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): Promise<void> {
    const handlers = this.handlers.get(event as string) ?? [];
    await Promise.all(handlers.map(h => h(payload)));
  }
}

export const domainEvents = new TypedEventEmitter();

// Usage
domainEvents.on('user.created', async ({ userId, email }) => {
  await emailService.sendWelcomeEmail(email);
  await analyticsService.track('user_created', { userId });
});

// In service
await userRepository.create(input);
await domainEvents.emit('user.created', { userId: user.id, email: user.email });
```

---

## Chapter 29: API Documentation & OpenAPI

### 29.1 OpenAPI Specification

**HARD RULE (if Q-11 = public API):** Every public API endpoint MUST have an OpenAPI spec. Auto-generate from route handlers — never write by hand.

```typescript
// Using next-swagger-doc or Zod-to-OpenAPI

// lib/api/openapi.ts
import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createUserSchema, updateUserSchema } from '@/lib/user/user.validators';

const registry = new OpenAPIRegistry();

// Register schemas
registry.register('CreateUserRequest', createUserSchema.openapi({ title: 'Create User Request' }));
registry.register('UpdateUserRequest', updateUserSchema.openapi({ title: 'Update User Request' }));

// Register paths
registry.registerPath({
  method: 'post',
  path: '/api/users',
  description: 'Create a new user',
  summary: 'Create user',
  request: {
    body: {
      content: { 'application/json': { schema: createUserSchema } },
    },
  },
  responses: {
    200: {
      description: 'User created successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: z.object({
              id: z.string().uuid(),
              email: z.string().email(),
              name: z.string(),
              createdAt: z.string().datetime(),
            }),
          }),
        },
      },
    },
    400: {
      description: 'Validation error',
    },
    401: {
      description: 'Not authenticated',
    },
  },
});

export function generateOpenApiSpec() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'My App API',
      version: '1.0.0',
      description: 'API documentation for My App',
    },
    servers: [{ url: process.env.APP_URL! }],
  });
}
```

```typescript
// app/api/docs/route.ts — serve OpenAPI spec
import { generateOpenApiSpec } from '@/lib/api/openapi';

export async function GET() {
  const spec = generateOpenApiSpec();
  return Response.json(spec);
}

// app/api/docs/ui/route.ts — serve Swagger UI
export async function GET() {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      url: '/api/docs',
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
    });
  </script>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
```

---

## Chapter 30: Feature Flags & Configuration

### 30.1 Feature Flag Pattern

```typescript
// config/feature-flags.ts — type-safe feature flags
import { env } from './env';

// All feature flags in one place — never scattered in code
export const featureFlags = {
  // Infrastructure flags
  enableRedis: !!env.REDIS_URL,
  enableEmailVerification: env.NODE_ENV === 'production',
  
  // Product flags — can be env-var or DB-driven
  enableAiFeatures: env.OPENAI_API_KEY !== undefined,
  enableBilling: env.STRIPE_SECRET_KEY !== undefined,
  
  // Gradual rollout flags — boolean or user-segment based
  newDashboard: env.FEATURE_NEW_DASHBOARD === 'true',
  betaFeatures: env.FEATURE_BETA === 'true',
} as const;

export type FeatureFlag = keyof typeof featureFlags;

// Usage in components/pages
import { featureFlags } from '@/config/feature-flags';

if (featureFlags.enableAiFeatures) {
  // Render AI features
}
```

```typescript
// For DB-driven feature flags (PostHog, LaunchDarkly, or custom):
// lib/feature-flags/flags.service.ts

import PostHog from 'posthog-node';
import { env } from '@/config/env';

const client = new PostHog(env.POSTHOG_API_KEY, { host: 'https://app.posthog.com' });

export async function isFeatureEnabled(
  flag: string,
  userId: string,
  properties?: Record<string, string>,
): Promise<boolean> {
  const isEnabled = await client.isFeatureEnabled(flag, userId, { personProperties: properties });
  return isEnabled ?? false;
}

// Usage
const showNewUI = await isFeatureEnabled('new-dashboard', session.userId, {
  plan: session.plan,
  orgSize: String(orgMemberCount),
});
```

---

## Chapter 31: Email & Notifications

### 31.1 Email Architecture

```typescript
// lib/email/email.service.ts — email abstraction
import { Resend } from 'resend';
import { env } from '@/config/env';
import { logger } from '@/shared/lib/logger';

const resend = new Resend(env.RESEND_API_KEY);

export type EmailTemplate =
  | { template: 'welcome'; variables: { name: string } }
  | { template: 'reset-password'; variables: { resetUrl: string; expiresIn: string } }
  | { template: 'invite'; variables: { inviterName: string; orgName: string; inviteUrl: string } }
  | { template: 'invoice'; variables: { amount: string; dueDate: string; invoiceUrl: string } };

type SendEmailOptions = EmailTemplate & {
  to: string;
  subject: string;
};

export const emailService = {
  async send(opts: SendEmailOptions): Promise<void> {
    const html = await renderEmailTemplate(opts.template, opts.variables);
    
    try {
      const { data, error } = await resend.emails.send({
        from: 'My App <noreply@myapp.com>',
        to: opts.to,
        subject: opts.subject,
        html,
      });

      if (error) throw error;
      
      logger.info({
        action: 'email_sent',
        template: opts.template,
        messageId: data?.id,
      }, 'Email sent successfully');
    } catch (error) {
      logger.error({ err: error, template: opts.template, to: opts.to }, 'Email failed');
      throw error;
    }
  },
};

// Email templates with React Email
// emails/WelcomeEmail.tsx
import { Html, Head, Body, Container, Text, Button } from '@react-email/components';

type WelcomeEmailProps = { name: string };

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container>
          <Text>Hi {name},</Text>
          <Text>Welcome to My App! We're excited to have you on board.</Text>
          <Button href="https://myapp.com/dashboard">
            Go to Dashboard
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

---

## Chapter 32: Webhook Handling

### 32.1 Secure Webhook Reception

```typescript
// app/api/webhooks/stripe/route.ts — Stripe webhook handler
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { env } from '@/config/env';
import { billingService } from '@/lib/billing/billing.service';
import { logger } from '@/shared/lib/logger';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

// HARD: Webhooks must be verified — never process unverified webhooks
export async function POST(request: NextRequest) {
  const body = await request.text(); // Raw body for signature verification
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    // Verify webhook signature — prevents replay attacks and fake webhooks
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    logger.warn({ err }, 'Invalid Stripe webhook signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Idempotency — check if this event was already processed
  const alreadyProcessed = await webhookLogRepository.exists(event.id);
  if (alreadyProcessed) {
    return NextResponse.json({ received: true, status: 'duplicate' });
  }

  // Process event asynchronously to respond quickly to Stripe
  try {
    switch (event.type) {
      case 'customer.subscription.created':
        await billingService.handleSubscriptionCreated(
          event.data.object as Stripe.Subscription
        );
        break;
      case 'customer.subscription.updated':
        await billingService.handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription
        );
        break;
      case 'invoice.payment_failed':
        await billingService.handlePaymentFailed(
          event.data.object as Stripe.Invoice
        );
        break;
      default:
        logger.info({ eventType: event.type }, 'Unhandled Stripe event');
    }

    // Mark event as processed
    await webhookLogRepository.create({ eventId: event.id, type: event.type });
    
    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error({ err: error, eventId: event.id, eventType: event.type }, 'Webhook processing failed');
    // Return 500 — Stripe will retry
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
```

---

*End of Part 6*


---

# PART 7 — MONITORING, ANALYTICS & DEVELOPER EXPERIENCE

---

## Chapter 33: Application Monitoring

### 33.1 Error Tracking with Sentry

```typescript
// sentry.client.config.ts — client-side Sentry
import * as Sentry from '@sentry/nextjs';
import { env } from '@/config/env';

Sentry.init({
  dsn: env.SENTRY_DSN,
  environment: env.NODE_ENV,
  
  // Performance monitoring
  tracesSampleRate: env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Replay — capture session recordings on error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
  ],
  
  // Don't capture certain errors
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Network Error',
    /^AbortError/,
  ],
  
  // Scrub sensitive data
  beforeSend(event) {
    // Remove sensitive fields from events
    if (event.request?.data) {
      const data = event.request.data as Record<string, unknown>;
      delete data.password;
      delete data.creditCard;
    }
    return event;
  },
});
```

```typescript
// sentry.server.config.ts — server-side Sentry
import * as Sentry from '@sentry/nextjs';
import { env } from '@/config/env';

Sentry.init({
  dsn: env.SENTRY_DSN,
  environment: env.NODE_ENV,
  tracesSampleRate: 0.1,
  
  // Capture unhandled promise rejections
  captureUnhandledRejections: true,
});
```

```typescript
// Structured error context — helps Sentry group errors correctly
import * as Sentry from '@sentry/nextjs';

// Add user context when session is established
export function setSentryUser(session: Session): void {
  Sentry.setUser({
    id: session.userId,
    email: session.email,
  });
}

// Add breadcrumbs for tracing error paths
Sentry.addBreadcrumb({
  message: 'User initiated export',
  category: 'ui.action',
  level: 'info',
  data: { format: 'csv', rowCount: 1500 },
});

// Manual error capture with context
try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: { domain: 'billing', action: 'subscription_create' },
    extra: { planId, orgId },
  });
  throw error; // Still throw — Sentry is not a swallow
}
```

---

### 33.2 Performance Monitoring

```typescript
// lib/monitoring/performance.ts — custom performance tracking
import * as Sentry from '@sentry/nextjs';

// Track custom business metrics
export async function withPerformanceTracking<T>(
  name: string,
  operation: () => Promise<T>,
  tags?: Record<string, string>,
): Promise<T> {
  const transaction = Sentry.startSpan({ name, attributes: tags }, async (span) => {
    try {
      const result = await operation();
      span.setStatus({ code: 1 }); // OK
      return result;
    } catch (error) {
      span.setStatus({ code: 2 }); // Error
      throw error;
    }
  });
  return transaction;
}

// Usage
const users = await withPerformanceTracking(
  'db.query.users.findMany',
  () => userRepository.findMany({ page: 1, perPage: 20 }),
  { table: 'users', operation: 'select' },
);
```

---

### 33.3 Analytics with PostHog

```typescript
// lib/analytics/analytics.ts — analytics abstraction
import PostHog from 'posthog-node';
import { env } from '@/config/env';

const client = env.POSTHOG_API_KEY
  ? new PostHog(env.POSTHOG_API_KEY, {
      host: 'https://app.posthog.com',
      flushAt: 20,
      flushInterval: 10_000,
    })
  : null;

export type AnalyticsEvent =
  | { event: 'user_signed_up'; properties: { plan: string } }
  | { event: 'project_created'; properties: { projectType: string } }
  | { event: 'export_completed'; properties: { format: string; rowCount: number } }
  | { event: 'ai_generation_started'; properties: { model: string; tokensRequested: number } }
  | { event: 'subscription_upgraded'; properties: { fromPlan: string; toPlan: string } };

export const analytics = {
  track(userId: string, { event, properties }: AnalyticsEvent): void {
    if (!client) return;
    client.capture({ distinctId: userId, event, properties });
  },

  identify(userId: string, traits: Record<string, unknown>): void {
    if (!client) return;
    client.identify({ distinctId: userId, properties: traits });
  },

  group(userId: string, orgId: string, traits: Record<string, unknown>): void {
    if (!client) return;
    client.groupIdentify({ groupType: 'organization', groupKey: orgId, properties: traits });
  },

  async flush(): Promise<void> {
    await client?.shutdown();
  },
};

// Client-side analytics
// components/providers/AnalyticsProvider.tsx
'use client';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
      capture_pageview: false, // Manual pageview tracking with Next.js router
      persistence: 'localStorage',
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
```

---

## Chapter 34: Developer Experience

### 34.1 VS Code Configuration

```json
// .vscode/settings.json — shared team settings
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "files.exclude": {
    "**/.git": true,
    "**/node_modules": true,
    "**/.next": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

```json
// .vscode/extensions.json — recommended extensions
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "Prisma.prisma",
    "drizzle-team.drizzle-vscode",
    "github.vscode-github-actions",
    "eamodio.gitlens",
    "usernamehw.errorlens",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

---

### 34.2 Git Hooks with Husky

```bash
# Setup pre-commit and pre-push hooks
npm install --save-dev husky lint-staged
npx husky init
```

```bash
# .husky/pre-commit — run before every commit
#!/bin/sh
npx lint-staged
```

```bash
# .husky/pre-push — run before every push
#!/bin/sh
npx tsc --noEmit
npm run test:ci
```

```json
// package.json — lint-staged configuration
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix --max-warnings 0",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

---

### 34.3 NPM Scripts — Standardized

```json
// package.json — all projects use these script names
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    
    "lint": "eslint . --max-warnings 0",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    
    "test": "vitest",
    "test:ci": "vitest run --reporter=verbose",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio",
    "db:push": "drizzle-kit push",
    
    "analyze": "ANALYZE=true next build",
    "storybook": "storybook dev -p 6006"
  }
}
```

---

### 34.4 Makefile for Common Operations

```makefile
# Makefile — developer shortcuts
.PHONY: setup dev build test lint clean

setup:
npm ci
cp -n .env.example .env.local || true
npm run db:migrate

dev:
npm run dev

build:
npm run typecheck && npm run build

test:
npm run test:ci

lint:
npm run lint && npm run format:check && npm run typecheck

clean:
rm -rf .next node_modules
npm ci

# Database operations
db-reset:
psql $(DATABASE_URL) -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
npm run db:migrate

db-seed:
npx tsx db/seed.ts

# Docker operations (if applicable)
docker-up:
docker compose up -d

docker-down:
docker compose down
```

---

## Chapter 35: Advanced Testing Patterns

### 35.1 Test Data Factories

```typescript
// src/__tests__/factories/user.factory.ts
import { faker } from '@faker-js/faker';
import type { User, UserId } from '@/modules/user/user.types';

// Factory with sensible defaults — override any field
export function createUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.string.uuid() as UserId,
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName(),
    role: 'member',
    createdAt: faker.date.past(),
    updatedAt: new Date(),
    ...overrides,
  };
}

// Specialized factories
export function createAdminUser(overrides: Partial<User> = {}): User {
  return createUser({ role: 'admin', ...overrides });
}

export function createUserList(count: number, overrides: Partial<User> = {}): User[] {
  return Array.from({ length: count }, () => createUser(overrides));
}

// Usage in tests
const user = createUser({ email: 'specific@example.com' });
const adminUser = createAdminUser();
const users = createUserList(10);
```

---

### 35.2 Mock Patterns

```typescript
// Consistent mocking patterns across the test suite

// Mock module
vi.mock('@/lib/user/user.repository', () => ({
  userRepository: {
    findById: vi.fn(),
    findByEmail: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    softDelete: vi.fn(),
  },
}));

// Mock with implementation
vi.mock('@/lib/auth/session', () => ({
  getSession: vi.fn().mockResolvedValue({
    userId: 'test-user-id',
    email: 'test@example.com',
    role: 'admin',
  }),
  requireSession: vi.fn().mockResolvedValue({
    userId: 'test-user-id',
    email: 'test@example.com',
    role: 'admin',
  }),
}));

// Mock fetch globally
global.fetch = vi.fn().mockImplementation((url: string) => {
  if (url.includes('/api/users')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: createUserList(5) }),
    });
  }
  return Promise.reject(new Error(`Unmocked URL: ${url}`));
});
```

---

### 35.3 Testing Async Operations

```typescript
// Testing BullMQ jobs
import { Queue } from 'bullmq';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('bullmq', () => ({
  Queue: vi.fn().mockImplementation(() => ({
    add: vi.fn().mockResolvedValue({ id: 'test-job-id' }),
    getJob: vi.fn(),
  })),
}));

describe('emailQueue', () => {
  it('enqueues welcome email when user is created', async () => {
    const { emailQueue } = await import('@/lib/queue/queues');
    
    await userService.createUser({ email: 'new@example.com', name: 'New User' });
    
    expect(emailQueue.add).toHaveBeenCalledWith(
      'welcome',
      expect.objectContaining({ to: 'new@example.com' }),
      expect.any(Object),
    );
  });
});

// Testing with timers
it('retries on failure with exponential backoff', async () => {
  vi.useFakeTimers();
  
  const mockFn = vi.fn()
    .mockRejectedValueOnce(new Error('Network error'))
    .mockRejectedValueOnce(new Error('Network error'))
    .mockResolvedValue('success');
  
  const resultPromise = retryWithBackoff(mockFn, { maxAttempts: 3, initialDelay: 1000 });
  
  await vi.advanceTimersByTimeAsync(1000); // First retry
  await vi.advanceTimersByTimeAsync(2000); // Second retry (2x delay)
  
  const result = await resultPromise;
  expect(result).toBe('success');
  expect(mockFn).toHaveBeenCalledTimes(3);
  
  vi.useRealTimers();
});
```

---

## Chapter 36: Database Advanced Patterns

### 36.1 Soft Delete Pattern

```typescript
// db/schema.ts — soft delete fields
export const resources = pgTable('resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  // ... domain columns
  isDeleted: boolean('is_deleted').notNull().default(false),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  deletedBy: uuid('deleted_by').references(() => users.id),
});

// lib/resource/resource.repository.ts
export const resourceRepository = {
  // HARD: Always filter out deleted records in queries
  findMany(): Promise<Resource[]> {
    return db
      .select()
      .from(resources)
      .where(eq(resources.isDeleted, false));
  },
  
  // Soft delete — set flags, don't DELETE
  async softDelete(id: ResourceId, deletedByUserId: string): Promise<void> {
    await db
      .update(resources)
      .set({
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: deletedByUserId,
        updatedAt: new Date(),
      })
      .where(eq(resources.id, id));
  },
  
  // Hard delete — for compliance/GDPR right-to-erasure
  async hardDelete(id: ResourceId): Promise<void> {
    await db.delete(resources).where(eq(resources.id, id));
  },
  
  // Admin: list deleted records
  findDeleted(afterDate: Date): Promise<Resource[]> {
    return db
      .select()
      .from(resources)
      .where(
        and(
          eq(resources.isDeleted, true),
          gte(resources.deletedAt, afterDate),
        ),
      );
  },
};
```

---

### 36.2 Audit Log Pattern

```typescript
// db/schema.ts — audit log table
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  orgId: uuid('org_id').references(() => organizations.id),
  action: text('action').notNull(), // 'user.create', 'project.delete', etc.
  resourceType: text('resource_type').notNull(), // 'user', 'project', etc.
  resourceId: text('resource_id'), // ID of the affected resource
  before: jsonb('before'), // State before the action
  after: jsonb('after'),   // State after the action
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  // Indexed for common query patterns
  userIdx: index('audit_logs_user_id_idx').on(table.userId),
  resourceIdx: index('audit_logs_resource_idx').on(table.resourceType, table.resourceId),
  createdAtIdx: index('audit_logs_created_at_idx').on(table.createdAt),
}));

// lib/audit/audit.service.ts
export const auditLog = {
  async record(opts: {
    userId: string;
    orgId?: string;
    action: string;
    resourceType: string;
    resourceId?: string;
    before?: unknown;
    after?: unknown;
    request?: NextRequest;
  }): Promise<void> {
    await db.insert(auditLogs).values({
      userId: opts.userId,
      orgId: opts.orgId,
      action: opts.action,
      resourceType: opts.resourceType,
      resourceId: opts.resourceId,
      before: opts.before ? JSON.stringify(opts.before) : null,
      after: opts.after ? JSON.stringify(opts.after) : null,
      ipAddress: opts.request?.ip,
      userAgent: opts.request?.headers.get('user-agent'),
    });
  },
};

// Usage in service layer
async function deleteProject(id: ProjectId, session: Session): Promise<void> {
  const project = await projectRepository.findById(id, session.orgId);
  if (!project) throw new NotFoundError('Project');

  await projectRepository.softDelete(id, session.userId);
  
  // HARD: Log all destructive actions
  await auditLog.record({
    userId: session.userId,
    orgId: session.orgId,
    action: 'project.delete',
    resourceType: 'project',
    resourceId: id,
    before: project,
  });
}
```

---

### 36.3 Full-Text Search

```typescript
// When ILIKE is too slow — upgrade to Postgres full-text search

// db/schema.ts — add tsvector column for search
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  // Generated tsvector column for full-text search
  searchVector: sql`
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(body, ''))
  `.as('search_vector'),
}, (table) => ({
  searchIdx: sql`CREATE INDEX idx_posts_search ON posts USING GIN(search_vector)`,
}));

// lib/post/post.repository.ts
export const postRepository = {
  async search(query: string, opts: PaginationOpts): Promise<Post[]> {
    const tsQuery = query
      .trim()
      .split(/\s+/)
      .map(term => `${term}:*`) // Prefix matching
      .join(' & ');
    
    return db
      .select()
      .from(posts)
      .where(
        and(
          sql`search_vector @@ to_tsquery('english', ${tsQuery})`,
          isNull(posts.deletedAt),
        ),
      )
      .orderBy(
        // Rank by relevance
        sql`ts_rank(search_vector, to_tsquery('english', ${tsQuery})) DESC`,
      )
      .limit(opts.perPage)
      .offset((opts.page - 1) * opts.perPage);
  },
};
```

---

## Chapter 37: Security Deep Dive

### 37.1 OWASP Top 10 Mitigations

| Vulnerability | Next.js Risk | Mitigation |
|--------------|-------------|-----------|
| **A01: Broken Access Control** | Server Actions callable by anyone | Always check session + permission in every action |
| **A02: Cryptographic Failures** | JWT secrets too short, plaintext PII | 32+ char secrets, encrypted PII fields |
| **A03: Injection** | SQL via ORM params, XSS via dangerouslySetInnerHTML | Drizzle parameterizes, never use dangerouslySetInnerHTML |
| **A04: Insecure Design** | No rate limiting, no CSRF | Rate limit all endpoints, CSRF via SameSite cookies |
| **A05: Security Misconfiguration** | Missing security headers | next.config.ts security headers (Chapter 02) |
| **A06: Vulnerable Components** | Old dependencies with CVEs | `npm audit` in CI, Dependabot enabled |
| **A07: Auth Failures** | Rolling own auth, weak sessions | Auth.js, database sessions, 30-day max age |
| **A08: Integrity Failures** | Unverified webhooks | Always verify webhook signatures |
| **A09: Logging Failures** | No audit trail | Structured logging + audit log table |
| **A10: SSRF** | fetch() with user-provided URLs | Allowlist domains, never fetch arbitrary user URLs |

---

### 37.2 SSRF Prevention

```typescript
// HARD: Never fetch a user-provided URL without validation
// Server-Side Request Forgery allows attackers to reach internal services

// ❌ DANGEROUS — SSRF vulnerability
export async function previewUrl(request: NextRequest) {
  const { url } = await request.json();
  const response = await fetch(url); // Attacker could provide http://169.254.169.254 (AWS metadata)
  return NextResponse.json(await response.json());
}

// ✅ SAFE — only allow specific domains
const ALLOWED_PREVIEW_DOMAINS = ['twitter.com', 'github.com', 'youtube.com'];

export async function previewUrl(request: NextRequest) {
  const { url } = await request.json();
  
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return apiError('VALIDATION', 'Invalid URL', 400);
  }
  
  // Only HTTPS — never HTTP, never internal protocols
  if (parsed.protocol !== 'https:') {
    return apiError('VALIDATION', 'Only HTTPS URLs allowed', 400);
  }
  
  // Only allowed domains
  if (!ALLOWED_PREVIEW_DOMAINS.some(d => parsed.hostname.endsWith(d))) {
    return apiError('VALIDATION', 'Domain not allowed', 400);
  }
  
  // Only public IPs — prevent access to internal services
  const ip = await resolveHostname(parsed.hostname);
  if (isPrivateIp(ip)) {
    return apiError('VALIDATION', 'Private IP addresses not allowed', 400);
  }
  
  const response = await fetch(url, {
    signal: AbortSignal.timeout(5000), // 5 second timeout
  });
  return NextResponse.json(await response.json());
}
```

---

### 37.3 Content Security Policy

```typescript
// next.config.ts — add CSP header
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://*.cloudflare.com;
  font-src 'self';
  frame-src https://js.stripe.com;
  connect-src 'self' https://api.stripe.com https://app.posthog.com;
`;

// In headers():
{
  key: 'Content-Security-Policy',
  value: cspHeader.replace(/\n/g, ''),
},
```

---

### 37.4 Secrets Management

```typescript
// Never store secrets in:
// ❌ Source code
// ❌ Environment variable files committed to git
// ❌ Client-side bundles (NEXT_PUBLIC_ prefix)
// ❌ Browser localStorage or cookies (for sensitive secrets)

// Rotation pattern — secrets that need rotation
// lib/secrets/rotation.ts
export async function rotateApiKey(userId: string): Promise<string> {
  const newKey = `sk_${crypto.randomUUID().replace(/-/g, '')}`;
  const keyHash = createHash('sha256').update(newKey).digest('hex');
  
  await db.transaction(async (tx) => {
    // Invalidate old key
    await tx
      .update(apiKeys)
      .set({ revokedAt: new Date() })
      .where(and(eq(apiKeys.userId, userId), isNull(apiKeys.revokedAt)));
    
    // Store hash of new key (never store plaintext)
    await tx.insert(apiKeys).values({
      userId,
      keyHash,
      lastFour: newKey.slice(-4),
    });
  });
  
  // Return plaintext ONCE — never retrieve again
  return newKey;
}
```

---

## Chapter 38: Advanced Caching Patterns

### 38.1 Stale-While-Revalidate in Redis

```typescript
// lib/cache/swr-cache.ts — stale-while-revalidate pattern
import { cache } from './redis';

type SWROptions<T> = {
  key: string;
  ttl: number;          // Time until stale (data is fresh)
  staleTtl: number;     // Time until expired (data is unusable)
  revalidate: () => Promise<T>;
};

export async function swrCache<T>(opts: SWROptions<T>): Promise<T> {
  const { key, ttl, staleTtl, revalidate } = opts;
  
  const cached = await cache.get<{ data: T; cachedAt: number }>(key);
  
  if (cached) {
    const age = Date.now() - cached.cachedAt;
    
    if (age < ttl * 1000) {
      // Fresh — return immediately
      return cached.data;
    }
    
    if (age < staleTtl * 1000) {
      // Stale — return stale data AND revalidate in background
      revalidate().then(async (fresh) => {
        await cache.set(key, { data: fresh, cachedAt: Date.now() }, staleTtl);
      }).catch(console.error);
      
      return cached.data; // Return stale immediately
    }
  }
  
  // Expired or not cached — fetch fresh
  const fresh = await revalidate();
  await cache.set(key, { data: fresh, cachedAt: Date.now() }, staleTtl);
  return fresh;
}

// Usage
const leaderboard = await swrCache({
  key: 'leaderboard:global',
  ttl: 60,          // Fresh for 60 seconds
  staleTtl: 300,    // Usable for 5 minutes (while revalidating)
  revalidate: () => leaderboardRepository.getGlobal(),
});
```

---

### 38.2 Cache Warming

```typescript
// lib/cache/warm-cache.ts — pre-populate cache on deployment
export async function warmCriticalCaches(): Promise<void> {
  console.log('Warming critical caches...');
  
  await Promise.allSettled([
    // Warm navigation menus (infrequently changing)
    navigationService.getMainMenu().then(menu =>
      cache.set('nav:main', menu, 3600)
    ),
    
    // Warm popular content
    postRepository.findPopular({ limit: 20 }).then(posts =>
      cache.set('posts:popular', posts, 1800)
    ),
    
    // Warm pricing data
    pricingService.getPlans().then(plans =>
      cache.set('pricing:plans', plans, 86400)
    ),
  ]);
  
  console.log('Cache warming complete');
}

// Called after deployment in CI/CD pipeline
// or from a cron job
```

---

## Chapter 39: Monorepo Considerations

### 39.1 When to Consider a Monorepo

**Use a monorepo when:**
- Multiple Next.js apps share significant code (≥ 30% of codebase)
- A design system package is needed by multiple apps
- A shared utility/types package is needed by both frontend and backend

**Tools:**
- **Turborepo** — recommended for Next.js monorepos
- **pnpm workspaces** — package management
- **changesets** — versioning for internal packages

---

### 39.2 Monorepo Structure

```
my-platform/
├── apps/
│   ├── web/              # Main Next.js app
│   ├── admin/            # Admin Next.js app
│   └── docs/             # Documentation site
├── packages/
│   ├── ui/               # Shared component library
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── types/            # Shared TypeScript types
│   │   ├── src/
│   │   └── package.json
│   ├── config/           # Shared configs (ESLint, Prettier, TS)
│   │   ├── eslint/
│   │   ├── prettier/
│   │   └── typescript/
│   └── db/               # Shared database client
│       ├── src/
│       └── package.json
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

```json
// turbo.json — build pipeline
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

---

## Chapter 40: Migrations & Upgrades

### 40.1 Next.js Version Upgrades

**Process for every major Next.js upgrade:**

```markdown
## Next.js Upgrade Checklist (e.g., 14 → 15)

### Before Upgrading
- [ ] Read the Next.js upgrade guide for this version
- [ ] Run the codemods: `npx @next/codemod@latest next-async-request-api .`
- [ ] Review breaking changes list — mark all that affect this codebase
- [ ] Create a dedicated upgrade branch

### During Upgrade
- [ ] Update `next` package and peer dependencies
- [ ] Update `@types/node`, `@types/react`, `@types/react-dom`
- [ ] Run `tsc --noEmit` — fix all new TypeScript errors
- [ ] Run `eslint .` — fix all new lint errors
- [ ] Run full test suite

### After Upgrade
- [ ] Deploy to staging — run E2E tests
- [ ] Check Lighthouse scores (regression ± 5 points is acceptable)
- [ ] Monitor error tracking for 24h after production deploy
```

---

*End of Part 7*