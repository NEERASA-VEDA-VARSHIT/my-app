"use client"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FullRequirementsData } from "@/db/requirements-schema"

export function Step3Infrastructure() {
  const { register, setValue, watch } = useFormContext<FullRequirementsData>()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">11. Performance & 12. Availability</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Target API p95 *</Label>
            <Select onValueChange={(v: FullRequirementsData["targetApiP95"]) => setValue("targetApiP95", v)} defaultValue={watch("targetApiP95")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under_100ms">&lt; 100ms (High Perf)</SelectItem>
                <SelectItem value="100ms_to_300ms">100-300ms (Standard)</SelectItem>
                <SelectItem value="300ms_to_1s">300ms-1s</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Acceptable Downtime *</Label>
            <Select onValueChange={(v: FullRequirementsData["acceptableDowntimePerMonth"]) => setValue("acceptableDowntimePerMonth", v)} defaultValue={watch("acceptableDowntimePerMonth")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under_5min">&lt; 5min (99.99%)</SelectItem>
                <SelectItem value="under_45min">&lt; 45min (99.9%)</SelectItem>
                <SelectItem value="under_8hr">&lt; 8hr (99.0%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="space-y-2">
            <Label>Recovery Time Objective (RTO) *</Label>
            <Select onValueChange={(v: FullRequirementsData["rto"]) => setValue("rto", v)} defaultValue={watch("rto")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under_15min">Under 15 min</SelectItem>
                <SelectItem value="15min_to_1hr">15 min - 1 hr</SelectItem>
                <SelectItem value="1hr_to_4hr">1 hr - 4 hr</SelectItem>
                <SelectItem value="4hr_to_24hr">4 hr - 24 hr</SelectItem>
                <SelectItem value="best_effort">Best effort</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Recovery Point Objective (RPO) *</Label>
            <Select onValueChange={(v: FullRequirementsData["rpo"]) => setValue("rpo", v)} defaultValue={watch("rpo")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="zero">Zero data loss</SelectItem>
                <SelectItem value="under_5min">Under 5 min</SelectItem>
                <SelectItem value="under_1hr">Under 1 hr</SelectItem>
                <SelectItem value="under_24hr">Under 24 hr</SelectItem>
                <SelectItem value="best_effort">Best effort</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">14. Infrastructure Constraints</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Deployment Platform *</Label>
            <Select onValueChange={(v: FullRequirementsData["deploymentPlatform"]) => setValue("deploymentPlatform", v)} defaultValue={watch("deploymentPlatform")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="vercel">Vercel (Default for Next.js)</SelectItem>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="gcp">GCP</SelectItem>
                <SelectItem value="azure">Azure</SelectItem>
                <SelectItem value="railway">Railway</SelectItem>
                <SelectItem value="render">Render</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Monthly Infra Budget *</Label>
            <Select onValueChange={(v: FullRequirementsData["monthlyInfrastructureBudget"]) => setValue("monthlyInfrastructureBudget", v)} defaultValue={watch("monthlyInfrastructureBudget")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under_50">&lt; $50 / mo (Bootstrap)</SelectItem>
                <SelectItem value="50_to_200">$50 - $200 / mo</SelectItem>
                <SelectItem value="200_to_500">$200 - $500 / mo</SelectItem>
                <SelectItem value="500_to_2k">$500 - $2k / mo</SelectItem>
                <SelectItem value="2k_to_10k">$2k - $10k / mo</SelectItem>
                <SelectItem value="over_10k">$10k+ (Enterprise)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="space-y-2">
            <Label>Managed Services Preference *</Label>
            <Select onValueChange={(v: FullRequirementsData["managedServicesPreference"]) => setValue("managedServicesPreference", v)} defaultValue={watch("managedServicesPreference")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="managed_only">Managed only</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="self_hosted_preferred">Self-hosted preferred</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Cold Start Tolerance *</Label>
            <Select onValueChange={(v: FullRequirementsData["coldStartTolerance"]) => setValue("coldStartTolerance", v)} defaultValue={watch("coldStartTolerance")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="zero">Zero</SelectItem>
                <SelectItem value="under_500ms">Under 500ms</SelectItem>
                <SelectItem value="under_2s">Under 2s</SelectItem>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">15. Timeline & Budget</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Dev Team Size *</Label>
            <Select onValueChange={(v: FullRequirementsData["devTeamSize"]) => setValue("devTeamSize", v)} defaultValue={watch("devTeamSize")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="solo">Solo (1 dev)</SelectItem>
                <SelectItem value="small">Small (2-4 devs)</SelectItem>
                <SelectItem value="medium">Medium (5-10 devs)</SelectItem>
                <SelectItem value="large">Large (10+ devs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Funding Stage *</Label>
            <Select onValueChange={(v: FullRequirementsData["fundingStage"]) => setValue("fundingStage", v)} defaultValue={watch("fundingStage")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="bootstrapped">Bootstrapped</SelectItem>
                <SelectItem value="pre_seed">Pre-Seed</SelectItem>
                <SelectItem value="seed">Seed</SelectItem>
                <SelectItem value="series_a">Series A</SelectItem>
                <SelectItem value="enterprise_budget">Enterprise Budget</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>MVP Timeline (Days) *</Label>
          <Input type="number" min={7} max={730} {...register("mvpTimelineDays", { valueAsNumber: true })} />
        </div>
      </div>
    </div>
  )
}
