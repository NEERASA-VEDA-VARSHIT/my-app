import { z } from "zod"

export const ArchitectureMode = z.enum([
  "lean_mvp",
  "scalable_startup",
  "vc_ready",
  "enterprise_grade",
])

export const TargetUserCategory = z.enum([
  "developers",
  "gen_z",
  "enterprise",
  "internal_ops",
  "global_consumers",
])

export const ScaleCategory = z.enum([
  "10k",
  "100k",
  "1M",
  "10M+",
])

export const BudgetRange = z.enum([
  "low",
  "moderate",
  "high",
])

export const TimelineInterval = z.enum([
  "3_months",
  "6_months",
  "12_months",
])

export const BlueprintInputSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  targetUsers: TargetUserCategory,
  expectedScale: ScaleCategory,
  architectureMode: ArchitectureMode,
  coreFeatures: z.string().min(10, "Core features must be specified"),
  budget: BudgetRange,
  timeline: TimelineInterval,
})

export type BlueprintInput = z.infer<typeof BlueprintInputSchema>

export const architectureModeLabels: Record<z.infer<typeof ArchitectureMode>, { label: string; subtext: string }> = {
  lean_mvp: { label: "Lean MVP", subtext: "Ship fast. Optimize for speed and cost." },
  scalable_startup: { label: "Scalable Startup", subtext: "Balance velocity with future scaling." },
  vc_ready: { label: "VC-Ready Infra", subtext: "Fundable, growth-ready architecture." },
  enterprise_grade: { label: "Enterprise Grade", subtext: "Compliance, audit, security-first design." },
}

export const scaleLabels: Record<z.infer<typeof ScaleCategory>, string> = {
  "10k": "< 10k users",
  "100k": "10k–100k users",
  "1M": "100k–1M users",
  "10M+": "1M+ users",
}

export const targetUserLabels: Record<z.infer<typeof TargetUserCategory>, string> = {
  developers: "Developers (API-first)",
  gen_z: "Gen Z (Mobile-first)",
  enterprise: "Enterprise (B2B/Security)",
  internal_ops: "Internal Teams (Admin/Dashboards)",
  global_consumers: "Global Consumers (Multi-region)",
}

export const budgetLabels: Record<z.infer<typeof BudgetRange>, string> = {
  low: "Low (Managed / Serverless)",
  moderate: "Moderate (Standard Cloud)",
  high: "High (Custom Infra / K8s)",
}

export const timelineLabels: Record<z.infer<typeof TimelineInterval>, string> = {
  "3_months": "3 Months (Rapid MVP)",
  "6_months": "6 Months (Balanced)",
  "12_months": "12 Months (Foundational)",
}
