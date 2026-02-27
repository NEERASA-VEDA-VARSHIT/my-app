"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Rocket, Target, Zap, Shield, HelpCircle, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  BlueprintInputSchema,
  type BlueprintInput,
  architectureModeLabels,
  scaleLabels,
  targetUserLabels,
  budgetLabels,
  timelineLabels,
} from "@/db/schema"
import { cn } from "@/lib/utils"
import { analyzeConstraints } from "@/lib/archai/constraint-analyzer"
import { useMemo, useState } from "react"

interface BlueprintFormProps {
  onSubmit: (data: BlueprintInput) => void
  isLoading: boolean
}

export function BlueprintForm({ onSubmit, isLoading }: BlueprintFormProps) {
  const form = useForm<BlueprintInput>({
    resolver: zodResolver(BlueprintInputSchema),
    defaultValues: {
      description: "",
      targetUsers: "global_consumers",
      expectedScale: "10k",
      architectureMode: "lean_mvp",
      coreFeatures: "",
      budget: "low",
      timeline: "3_months",
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form

  const selectedMode = watch("architectureMode")
  const formValues = watch()

  const analysis = useMemo(() => {
    return analyzeConstraints(formValues as any)
  }, [formValues])

  const { tensions, stabilityScore, riskLevel } = analysis
  const [showOverride, setShowOverride] = useState(false)

  const isBlocked = riskLevel === "High" && !showOverride

  return (
    <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-2xl overflow-hidden">
      <div className={cn(
        "absolute top-0 left-0 w-full h-1",
        riskLevel === "Low" ? "bg-green-500" : riskLevel === "Medium" ? "bg-yellow-500" : "bg-red-500"
      )} />
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            ArchAI Advisor
          </CardTitle>
          <CardDescription className="text-base">
            Strategic system evaluation and architecture generation.
          </CardDescription>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant={riskLevel === "High" ? "destructive" : riskLevel === "Medium" ? "secondary" : "default"}>
            {stabilityScore}% Stability
          </Badge>
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
            Risk Level: {riskLevel}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Startup Basics */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-semibold border-b border-border/50 pb-2">
              <Rocket className="w-5 h-5" />
              <span>Startup Basics</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                What are you building?
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
              </Label>
              <Textarea
                id="description"
                placeholder="e.g., AI-powered marketplace for Gen Z fashion resale"
                className="resize-none min-h-[100px] bg-muted/30 focus:bg-background transition-colors"
                {...register("description")}
              />
              <p className="text-[11px] text-muted-foreground">
                This single sentence drives 60% of your system architecture.
              </p>
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                Target Users
                <Target className="w-3.5 h-3.5 text-muted-foreground" />
              </Label>
              <Select onValueChange={(v: any) => setValue("targetUsers", v)} defaultValue={form.getValues("targetUsers")}>
                <SelectTrigger className="bg-muted/30">
                  <SelectValue placeholder="Select target user group" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.entries(targetUserLabels) as [keyof typeof targetUserLabels, string][]).map(([val, label]) => (
                    <SelectItem key={val} value={val}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.targetUsers && <p className="text-sm text-destructive">{errors.targetUsers.message}</p>}
            </div>
          </div>

          {/* Section 2: Product Requirements */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-semibold border-b border-border/50 pb-2">
              <Zap className="w-5 h-5" />
              <span>Product Requirements</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Expected Scale</Label>
                <Select
                  onValueChange={(v: any) => setValue("expectedScale", v)}
                  defaultValue={form.getValues("expectedScale")}
                >
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue placeholder="Select expected scale" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(scaleLabels) as [keyof typeof scaleLabels, string][]).map(([val, label]) => (
                      <SelectItem key={val} value={val}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.expectedScale && <p className="text-sm text-destructive">{errors.expectedScale.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Architecture Mode</Label>
                <Select
                  onValueChange={(v: any) => setValue("architectureMode", v)}
                  defaultValue={form.getValues("architectureMode")}
                >
                  <SelectTrigger className={cn("bg-muted/30 transition-all", selectedMode === "enterprise_grade" && "border-primary/50 ring-1 ring-primary/50")}>
                    <SelectValue placeholder="Select architecture mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(architectureModeLabels) as [keyof typeof architectureModeLabels, (typeof architectureModeLabels)[keyof typeof architectureModeLabels]][]).map(
                      ([val, info]) => (
                        <SelectItem key={val} value={val} className="flex flex-col items-start py-2">
                          <span className="font-medium">{info.label}</span>
                          <span className="text-[11px] text-muted-foreground block">{info.subtext}</span>
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                {errors.architectureMode && <p className="text-sm text-destructive">{errors.architectureMode.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coreFeatures">Core Features</Label>
              <Textarea
                id="coreFeatures"
                placeholder="Real-time chat, Payments (Stripe), Video Upload, AI Search..."
                className="resize-none min-h-[100px] bg-muted/30 focus:bg-background transition-colors"
                {...register("coreFeatures")}
              />
              <p className="text-[11px] text-muted-foreground">
                Detected complexity influences service decomposition and advisor verdict.
              </p>
              {errors.coreFeatures && <p className="text-sm text-destructive">{errors.coreFeatures.message}</p>}
            </div>
          </div>

          {/* Section 3: Constraints */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-semibold border-b border-border/50 pb-2">
              <Shield className="w-5 h-5" />
              <span>Constraints</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Budget Range</Label>
                <Select onValueChange={(v: any) => setValue("budget", v)} defaultValue={form.getValues("budget")}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(budgetLabels) as [keyof typeof budgetLabels, string][]).map(([val, label]) => (
                      <SelectItem key={val} value={val}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Timeline</Label>
                <Select onValueChange={(v: any) => setValue("timeline", v)} defaultValue={form.getValues("timeline")}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(timelineLabels) as [keyof typeof timelineLabels, string][]).map(([val, label]) => (
                      <SelectItem key={val} value={val}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.timeline && <p className="text-sm text-destructive">{errors.timeline.message}</p>}
              </div>
            </div>
          </div>

          {/* Architectural Advisory / Clarification */}
          {(tensions.length > 0 || analysis.clarificationRequired) && (
            <Alert variant={riskLevel === "High" ? "destructive" : "default"} className={cn(
              "border-2",
              riskLevel === "High" ? "bg-destructive/10 border-destructive/20" : "bg-primary/5 border-primary/20"
            )}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="font-bold flex items-center gap-2">
                {analysis.clarificationRequired ? "Clarification Requested" : "Architecture Stability Advisor"}
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold",
                  riskLevel === "High" ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"
                )}>
                  {riskLevel} Risk Detected
                </span>
              </AlertTitle>
              <AlertDescription className="mt-2 space-y-3">
                {analysis.questions && analysis.questions.length > 0 && (
                  <div className="bg-background/50 p-2 rounded border border-border/50">
                    <p className="text-xs font-bold uppercase mb-1 flex items-center gap-1 opacity-70">
                      <HelpCircle className="w-3 h-3" /> System requires context:
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {analysis.questions.map((q, i) => <li key={q.id || i}>{q.label}</li>)}
                    </ul>
                  </div>
                )}

                {tensions.map(t => (
                  <div key={t.id} className="text-sm">
                    <span className="font-semibold underline decoration-foreground/20">{t.title}:</span> {t.description}
                  </div>
                ))}
                
                {riskLevel === "High" && (
                  <div className="pt-2 mt-2 border-t border-destructive/20 flex items-center gap-2 text-destructive">
                    <input 
                      type="checkbox" 
                      id="override" 
                      className="w-4 h-4 rounded border-destructive text-destructive focus:ring-destructive"
                      checked={showOverride}
                      onChange={(e) => setShowOverride(e.target.checked)}
                    />
                    <label htmlFor="override" className="text-xs font-bold uppercase cursor-pointer">
                      Confirm Strategic Override (Generate high-risk architecture anyway)
                    </label>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className={cn(
              "w-full h-14 text-lg font-bold shadow-lg transition-all",
              isBlocked ? "opacity-50 grayscale cursor-not-allowed" : "hover:scale-[1.01] active:scale-[0.99] bg-gradient-to-r from-primary to-primary/80"
            )} 
            disabled={isLoading || isBlocked}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Validating System Physics...
              </>
            ) : isBlocked ? (
              "Resolution Required"
            ) : (
              "Construct Architecture Blueprint"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
