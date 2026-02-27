"use client"

import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { FullRequirementsData } from "@/db/requirements-schema"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Step0Engagement() {
  const { setValue, watch } = useFormContext<FullRequirementsData>()
  const profile = watch("engagementProfile")
  const mode = watch("engagementMode")

  useEffect(() => {
    if (!profile || mode) return
    const inferred =
      profile === "technical_founder" ||
      profile === "engineering_lead_cto" ||
      profile === "enterprise_it_representative"
        ? "technical"
        : "non_technical"
    setValue("engagementMode", inferred)
  }, [profile, mode, setValue])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">Step 0 — Engagement Profile</h3>
        <p className="text-sm text-muted-foreground">Choose who is completing discovery and the required depth level.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Who is completing this architecture discovery? *</Label>
            <Select
              onValueChange={(v) => setValue("engagementProfile", v as FullRequirementsData["engagementProfile"])}
              defaultValue={profile}
            >
              <SelectTrigger><SelectValue placeholder="Select profile" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="non_technical_founder">Non-technical founder</SelectItem>
                <SelectItem value="product_manager">Product manager</SelectItem>
                <SelectItem value="technical_founder">Technical founder</SelectItem>
                <SelectItem value="engineering_lead_cto">Engineering lead / CTO</SelectItem>
                <SelectItem value="enterprise_it_representative">Enterprise IT representative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Discovery Mode *</Label>
            <Select
              onValueChange={(v) => setValue("engagementMode", v as FullRequirementsData["engagementMode"])}
              defaultValue={mode}
            >
              <SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="non_technical">Non-Technical Mode (advisory)</SelectItem>
                <SelectItem value="technical">Technical Mode (deep controls)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
