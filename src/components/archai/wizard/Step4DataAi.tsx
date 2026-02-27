"use client"

import { useFormContext } from "react-hook-form"
import { FullRequirementsData } from "@/db/requirements-schema"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const analyticsOptions = [
  ["basic_usage_metrics", "Basic usage metrics"],
  ["funnel_analytics", "Funnel analytics"],
  ["financial_reporting", "Financial reporting"],
  ["bi_dashboards", "BI dashboards"],
  ["real_time_analytics", "Real-time analytics"],
  ["data_warehouse_export_required", "Data warehouse export required"],
] as const

const aiRoleOptions = [
  ["chat_assistant", "Chat assistant"],
  ["search_rag", "Search / RAG"],
  ["document_processing", "Document processing"],
  ["content_generation", "Content generation"],
  ["personalization", "Personalization"],
  ["computer_vision", "Computer vision"],
] as const

export function Step4DataAi() {
  const { register, setValue, watch } = useFormContext<FullRequirementsData>()
  const analytics = watch("analyticsExpectations") ?? []
  const aiRoles = watch("aiFunctionalRoles") ?? []
  const requiresAI = watch("requiresAI")

  const toggleAnalyticsExpectation = (value: NonNullable<FullRequirementsData["analyticsExpectations"]>[number]) => {
    const next = analytics.includes(value)
      ? analytics.filter((item) => item !== value)
      : [...analytics, value]
    setValue("analyticsExpectations", next)
  }

  const toggleAiRole = (value: NonNullable<FullRequirementsData["aiFunctionalRoles"]>[number]) => {
    const next = aiRoles.includes(value)
      ? aiRoles.filter((item) => item !== value)
      : [...aiRoles, value]
    setValue("aiFunctionalRoles", next)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">Step 4 — Data Architecture & AI</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Data volume projection (12 months)</Label>
            <Select onValueChange={(v) => setValue("dataVolumeAt12Months", v as FullRequirementsData["dataVolumeAt12Months"])} defaultValue={watch("dataVolumeAt12Months")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under_1gb">&lt; 1GB</SelectItem>
                <SelectItem value="1gb_to_10gb">1 - 10GB</SelectItem>
                <SelectItem value="10gb_to_100gb">10 - 100GB</SelectItem>
                <SelectItem value="100gb_to_1tb">100GB - 1TB</SelectItem>
                <SelectItem value="1tb_to_10tb">1TB+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Retention policy</Label>
            <Select onValueChange={(v) => setValue("retentionPolicy", v as FullRequirementsData["retentionPolicy"])} defaultValue={watch("retentionPolicy")}>
              <SelectTrigger><SelectValue placeholder="Select retention" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="permanent_storage">Permanent storage</SelectItem>
                <SelectItem value="time_bound_deletion">Time-bound deletion</SelectItem>
                <SelectItem value="user_controlled_deletion">User-controlled deletion</SelectItem>
                <SelectItem value="regulatory_driven_retention">Regulatory-driven retention</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Data residency requirement</Label>
          <Select onValueChange={(v) => setValue("dataResidencyConstraint", v as FullRequirementsData["dataResidencyConstraint"])} defaultValue={watch("dataResidencyConstraint")}>
            <SelectTrigger><SelectValue placeholder="Select residency" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="no_restriction">No restriction</SelectItem>
              <SelectItem value="eu_only">EU-only</SelectItem>
              <SelectItem value="us_only">US-only</SelectItem>
              <SelectItem value="multi_region_isolation_required">Multi-region isolation required</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Analytics expectations</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {analyticsOptions.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => toggleAnalyticsExpectation(value)}
                className={`rounded-md border px-3 py-2 text-sm text-left ${
                  analytics.includes(value)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h4 className="text-base font-medium">AI Architecture (Conditional)</h4>

        <label className="flex items-center gap-3 rounded-lg border border-border/60 bg-background p-3">
          <input type="checkbox" className="h-4 w-4" {...register("requiresAI")} />
          <span className="text-sm">Enable AI capabilities</span>
        </label>

        {requiresAI && (
          <>
            <div className="space-y-2">
              <Label>AI functional role</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {aiRoleOptions.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleAiRole(value)}
                    className={`rounded-md border px-3 py-2 text-sm text-left ${
                      aiRoles.includes(value)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Model strategy</Label>
                <Select onValueChange={(v) => setValue("aiModelStrategy", v as FullRequirementsData["aiModelStrategy"])} defaultValue={watch("aiModelStrategy")}>
                  <SelectTrigger><SelectValue placeholder="Select model strategy" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="external_api">External API-based</SelectItem>
                    <SelectItem value="self_hosted">Self-hosted models</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Latency requirement</Label>
                <Select onValueChange={(v) => setValue("aiLatencyRequirement", v as FullRequirementsData["aiLatencyRequirement"])} defaultValue={watch("aiLatencyRequirement")}>
                  <SelectTrigger><SelectValue placeholder="Select latency" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under_200ms">&lt; 200ms</SelectItem>
                    <SelectItem value="under_1s">&lt; 1s</SelectItem>
                    <SelectItem value="under_3s">&lt; 3s</SelectItem>
                    <SelectItem value="async_acceptable">Async acceptable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="flex items-center gap-3 rounded-lg border border-border/60 bg-background p-3">
                <input type="checkbox" className="h-4 w-4" {...register("aiDataCanLeaveRegion")} />
                <span className="text-sm">Can data leave region?</span>
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-border/60 bg-background p-3">
                <input type="checkbox" className="h-4 w-4" {...register("aiRequiresPrivateModels")} />
                <span className="text-sm">Must models be private?</span>
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-border/60 bg-background p-3">
                <input type="checkbox" className="h-4 w-4" {...register("aiPromptAuditRequired")} />
                <span className="text-sm">Audit of prompts required?</span>
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
