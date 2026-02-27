"use client"

import { useFormContext } from "react-hook-form"
import { FullRequirementsData } from "@/db/requirements-schema"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const dataClassificationOptions = [
  ["public_content", "Public content"],
  ["account_credentials", "Account credentials"],
  ["financial_data", "Financial data"],
  ["health_records", "Health records"],
  ["government_data", "Government data"],
  ["trade_secrets", "Trade secrets"],
  ["biometric_data", "Biometric data"],
] as const

const computeNeedOptions = [
  ["scheduled_background_jobs", "Scheduled background jobs"],
  ["real_time_notifications", "Real-time notifications"],
  ["file_media_processing", "File/media processing"],
  ["large_file_uploads", "Large file uploads"],
  ["heavy_compute_tasks", "Heavy compute tasks"],
  ["ai_inference", "AI inference"],
  ["streaming_responses", "Streaming responses"],
] as const

export function Step3RiskScale() {
  const { register, setValue, watch } = useFormContext<FullRequirementsData>()
  const dataClassification = watch("dataClassification") ?? []
  const computeNeeds = watch("computeNeeds") ?? []

  const toggleDataClassification = (value: NonNullable<FullRequirementsData["dataClassification"]>[number]) => {
    const next = dataClassification.includes(value)
      ? dataClassification.filter((item) => item !== value)
      : [...dataClassification, value]
    setValue("dataClassification", next)
  }

  const toggleComputeNeed = (value: NonNullable<FullRequirementsData["computeNeeds"]>[number]) => {
    const next = computeNeeds.includes(value)
      ? computeNeeds.filter((item) => item !== value)
      : [...computeNeeds, value]
    setValue("computeNeeds", next)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">Step 3 — Risk, Compliance & Scale</h3>

        <div className="space-y-2">
          <Label>If the system is unavailable for 24 hours, what happens?</Label>
          <Select
            onValueChange={(v) => setValue("businessCriticality24hOutage", v as FullRequirementsData["businessCriticality24hOutage"])}
            defaultValue={watch("businessCriticality24hOutage")}
          >
            <SelectTrigger><SelectValue placeholder="Select impact" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="minor_inconvenience">Minor inconvenience</SelectItem>
              <SelectItem value="revenue_impact">Revenue impact</SelectItem>
              <SelectItem value="contractual_penalties">Contractual penalties</SelectItem>
              <SelectItem value="legal_exposure">Legal exposure</SelectItem>
              <SelectItem value="safety_implications">Safety implications</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Data classification stored by the system</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {dataClassificationOptions.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => toggleDataClassification(value)}
                className={`rounded-md border px-3 py-2 text-sm text-left ${
                  dataClassification.includes(value)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className="flex items-center gap-3 rounded-lg border border-border/60 bg-background p-3 md:col-span-1">
            <input type="checkbox" className="h-4 w-4" {...register("fieldLevelEncryptionRequired")} />
            <span className="text-sm">Field-level encryption required</span>
          </label>
          <label className="flex items-center gap-3 rounded-lg border border-border/60 bg-background p-3 md:col-span-1">
            <input type="checkbox" className="h-4 w-4" {...register("auditImmutabilityRequired")} />
            <span className="text-sm">Audit immutability required</span>
          </label>
          <label className="flex items-center gap-3 rounded-lg border border-border/60 bg-background p-3 md:col-span-1">
            <input type="checkbox" className="h-4 w-4" {...register("complianceCertificationWithin12Months")} />
            <span className="text-sm">Certification needed within 12 months</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Launch users</Label>
            <Select onValueChange={(v) => setValue("usersAtLaunch", v as FullRequirementsData["usersAtLaunch"])} defaultValue={watch("usersAtLaunch")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under_100">&lt; 100</SelectItem>
                <SelectItem value="100_to_1k">100 - 1k</SelectItem>
                <SelectItem value="1k_to_10k">1k - 10k</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Users at 12 months</Label>
            <Select onValueChange={(v) => setValue("usersAt12Months", v as FullRequirementsData["usersAt12Months"])} defaultValue={watch("usersAt12Months")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="10k_to_100k">10k - 100k</SelectItem>
                <SelectItem value="100k_to_1m">100k - 1M</SelectItem>
                <SelectItem value="over_1m">1M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Users at 36 months</Label>
            <Select onValueChange={(v) => setValue("usersAt36Months", v as FullRequirementsData["usersAt36Months"])} defaultValue={watch("usersAt36Months")}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="10k_to_100k">10k - 100k</SelectItem>
                <SelectItem value="100k_to_1m">100k - 1M</SelectItem>
                <SelectItem value="over_1m">1M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Traffic profile</Label>
            <Select onValueChange={(v) => setValue("trafficProfile", v as FullRequirementsData["trafficProfile"])} defaultValue={watch("trafficProfile")}>
              <SelectTrigger><SelectValue placeholder="Select profile" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="predictable_steady">Predictable steady traffic</SelectItem>
                <SelectItem value="seasonal_spikes">Seasonal spikes</SelectItem>
                <SelectItem value="viral_unpredictable">Viral unpredictable bursts</SelectItem>
                <SelectItem value="always_on_high_concurrency">Always-on high concurrency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Peak simultaneous users</Label>
            <Select onValueChange={(v) => setValue("peakConcurrentUsers", v as FullRequirementsData["peakConcurrentUsers"])} defaultValue={watch("peakConcurrentUsers")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under_50">&lt; 100</SelectItem>
                <SelectItem value="50_to_500">100 - 1k</SelectItem>
                <SelectItem value="500_to_5k">1k - 10k</SelectItem>
                <SelectItem value="5k_to_50k">10k - 100k</SelectItem>
                <SelectItem value="over_50k">100k+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Compute & processing needs</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {computeNeedOptions.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => toggleComputeNeed(value)}
                className={`rounded-md border px-3 py-2 text-sm text-left ${
                  computeNeeds.includes(value)
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
