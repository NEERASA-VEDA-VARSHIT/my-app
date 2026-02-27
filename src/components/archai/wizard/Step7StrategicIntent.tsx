"use client"

import { useFormContext } from "react-hook-form"
import { FullRequirementsData } from "@/db/requirements-schema"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Step7StrategicIntent() {
  const { register, setValue, watch } = useFormContext<FullRequirementsData>()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">Step 7 — Strategic Architecture Intent</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Intended system lifespan</Label>
            <Select onValueChange={(v) => setValue("intendedSystemLifespan", v as FullRequirementsData["intendedSystemLifespan"])} defaultValue={watch("intendedSystemLifespan")}>
              <SelectTrigger><SelectValue placeholder="Select lifespan" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="prototype">Prototype</SelectItem>
                <SelectItem value="mvp_1_to_2_years">MVP (1–2 years)</SelectItem>
                <SelectItem value="long_term_scalable_platform">Long-term scalable platform</SelectItem>
                <SelectItem value="enterprise_grade_system">Enterprise-grade system</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Exit vision</Label>
            <Select onValueChange={(v) => setValue("exitVision", v as FullRequirementsData["exitVision"])} defaultValue={watch("exitVision")}>
              <SelectTrigger><SelectValue placeholder="Select vision" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="acquisition">Acquisition</SelectItem>
                <SelectItem value="ipo_scale">IPO-scale</SelectItem>
                <SelectItem value="cash_flow_lifestyle">Cash-flow positive lifestyle business</SelectItem>
                <SelectItem value="internal_tool_only">Internal tool only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Strategic architecture intent</Label>
          <Textarea
            {...register("strategicArchitectureIntent")}
            className="min-h-28"
            placeholder="Describe long-term architecture direction, constraints, and non-negotiables"
          />
        </div>
      </div>
    </div>
  )
}
