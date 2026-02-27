"use client"

import { useFormContext } from "react-hook-form"
import { FullRequirementsData } from "@/db/requirements-schema"
import { Label } from "@/components/ui/label"

const adminControlOptions = [
  ["user_management", "User management"],
  ["role_management", "Role management"],
  ["tenant_configuration", "Tenant configuration"],
  ["sla_monitoring", "SLA monitoring"],
  ["escalation_workflows", "Escalation workflows"],
  ["feature_flags", "Feature flags"],
  ["audit_logs", "Audit logs"],
  ["system_announcements", "System-wide announcements"],
] as const

const observabilityOptions = [
  ["error_tracking_only", "Error tracking only"],
  ["structured_logging", "Structured logging"],
  ["distributed_tracing", "Distributed tracing"],
  ["sla_monitoring", "SLA monitoring"],
  ["alerting", "Alerting"],
] as const

export function Step6GovernanceRisk() {
  const { setValue, watch } = useFormContext<FullRequirementsData>()
  const adminControls = watch("adminControlsRequired") ?? []
  const observability = watch("observabilityRequirementsDesired") ?? []

  const toggleAdminControl = (value: NonNullable<FullRequirementsData["adminControlsRequired"]>[number]) => {
    const next = adminControls.includes(value)
      ? adminControls.filter((item) => item !== value)
      : [...adminControls, value]
    setValue("adminControlsRequired", next)
  }

  const toggleObservability = (value: NonNullable<FullRequirementsData["observabilityRequirementsDesired"]>[number]) => {
    const next = observability.includes(value)
      ? observability.filter((item) => item !== value)
      : [...observability, value]
    setValue("observabilityRequirementsDesired", next)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">Step 6 — Governance & Risk Modeling</h3>

        <div className="space-y-2">
          <Label>Administrative controls required</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {adminControlOptions.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => toggleAdminControl(value)}
                className={`rounded-md border px-3 py-2 text-sm text-left ${
                  adminControls.includes(value)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Observability requirements</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {observabilityOptions.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => toggleObservability(value)}
                className={`rounded-md border px-3 py-2 text-sm text-left ${
                  observability.includes(value)
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
    </div>
  )
}
