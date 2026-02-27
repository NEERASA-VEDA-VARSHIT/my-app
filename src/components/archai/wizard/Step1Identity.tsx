"use client"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FullRequirementsData } from "@/db/requirements-schema"

export function Step1Identity() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<FullRequirementsData>()
  
  const projectType = watch("projectType")
  const industry = watch("industry")
  const geographies = watch("targetGeographies") ?? []

  const toggleGeography = (value: FullRequirementsData["targetGeographies"][number]) => {
    const next = geographies.includes(value)
      ? geographies.filter((g) => g !== value)
      : [...geographies, value]
    setValue("targetGeographies", next.length > 0 ? next : ["global"])
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">1. Project Identity</h3>
        <p className="text-sm text-muted-foreground mb-4">Establishing the fundamental nature of the project.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Project Name *</Label>
            <Input {...register("projectName")} placeholder="e.g., ArchAI Platform" />
            {errors.projectName && <p className="text-xs text-destructive">{String(errors.projectName.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label>Project Type *</Label>
            <Select onValueChange={(v: FullRequirementsData["projectType"]) => setValue("projectType", v)} defaultValue={projectType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="saas_b2b">B2B SaaS</SelectItem>
                <SelectItem value="saas_b2c">B2C SaaS</SelectItem>
                <SelectItem value="internal_tool">Internal Tool</SelectItem>
                <SelectItem value="marketplace">Marketplace</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>One-Line Problem Statement *</Label>
          <Textarea 
            {...register("problemStatement")} 
            placeholder="Describe the core problem (not the solution)..."
            className="h-20"
          />
        </div>

        <div className="space-y-2">
          <Label>Solution Summary *</Label>
          <Textarea 
            {...register("solutionSummary")} 
            placeholder="What does the product do to solve this problem?"
            className="h-20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Project Stage *</Label>
            <Select onValueChange={(v: FullRequirementsData["projectStage"]) => setValue("projectStage", v)} defaultValue={watch("projectStage")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="greenfield">Greenfield</SelectItem>
                <SelectItem value="mvp_in_progress">MVP In Progress</SelectItem>
                <SelectItem value="launched">Launched</SelectItem>
                <SelectItem value="scaling">Scaling</SelectItem>
                <SelectItem value="migrating">Migrating</SelectItem>
                <SelectItem value="rebuilding">Rebuilding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Industry *</Label>
            <Select onValueChange={(v: FullRequirementsData["industry"]) => setValue("industry", v)} defaultValue={industry}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fintech">Fintech</SelectItem>
                <SelectItem value="healthtech">Healthtech</SelectItem>
                <SelectItem value="edtech">Edtech</SelectItem>
                <SelectItem value="devtools">DevTools</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Target Launch Date *</Label>
            <Input type="date" {...register("targetLaunchDate")} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Target Geographies *</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { label: "US", value: "us_only" },
              { label: "EU", value: "eu_only" },
              { label: "US + EU", value: "us_and_eu" },
              { label: "Global", value: "global" },
              { label: "APAC", value: "apac" },
              { label: "LATAM", value: "latam" },
              { label: "MENA", value: "mena" },
              { label: "Specific", value: "specific" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => toggleGeography(item.value as FullRequirementsData["targetGeographies"][number])}
                className={`rounded-md border px-3 py-2 text-xs text-left ${
                  geographies.includes(item.value as FullRequirementsData["targetGeographies"][number])
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">2. Personas & Scale</h3>
        <p className="text-sm text-muted-foreground mb-4">Expected traffic and user types.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Primary User Type *</Label>
            <Select onValueChange={(v: FullRequirementsData["primaryUserType"]) => setValue("primaryUserType", v)} defaultValue={watch("primaryUserType")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="end_consumers">Consumers</SelectItem>
                <SelectItem value="business_employees">Employees</SelectItem>
                <SelectItem value="developers">Developers</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Launch Users *</Label>
            <Select onValueChange={(v: FullRequirementsData["usersAtLaunch"]) => setValue("usersAtLaunch", v)} defaultValue={watch("usersAtLaunch")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under_100">&lt; 100</SelectItem>
                <SelectItem value="100_to_1k">100 - 1k</SelectItem>
                <SelectItem value="1k_to_10k">1k - 10k</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Users at 12 Months *</Label>
            <Select onValueChange={(v: FullRequirementsData["usersAt12Months"]) => setValue("usersAt12Months", v)} defaultValue={watch("usersAt12Months")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="10k_to_100k">10k - 100k</SelectItem>
                <SelectItem value="100k_to_1m">100k - 1M</SelectItem>
                <SelectItem value="over_1m">1M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Number of Roles *</Label>
            <Input type="number" min={1} max={50} {...register("numberOfRoles", { valueAsNumber: true })} />
          </div>

          <div className="space-y-2">
            <Label>Peak Concurrent Users *</Label>
            <Select onValueChange={(v: FullRequirementsData["peakConcurrentUsers"]) => setValue("peakConcurrentUsers", v)} defaultValue={watch("peakConcurrentUsers")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under_50">&lt; 50</SelectItem>
                <SelectItem value="50_to_500">50 - 500</SelectItem>
                <SelectItem value="500_to_5k">500 - 5k</SelectItem>
                <SelectItem value="5k_to_50k">5k - 50k</SelectItem>
                <SelectItem value="over_50k">50k+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Avg Session Duration *</Label>
            <Select onValueChange={(v: FullRequirementsData["avgSessionDuration"]) => setValue("avgSessionDuration", v)} defaultValue={watch("avgSessionDuration")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under_5min">&lt; 5 min</SelectItem>
                <SelectItem value="5_to_30min">5 - 30 min</SelectItem>
                <SelectItem value="30min_to_2hr">30 min - 2 hr</SelectItem>
                <SelectItem value="over_2hr">2 hr+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>User Geographic Distribution *</Label>
            <Select onValueChange={(v: FullRequirementsData["userGeographicDistribution"]) => setValue("userGeographicDistribution", v)} defaultValue={watch("userGeographicDistribution")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="single_region">Single region</SelectItem>
                <SelectItem value="multi_region">Multi region</SelectItem>
                <SelectItem value="global">Global</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>User Technical Level *</Label>
            <Select onValueChange={(v: FullRequirementsData["userTechnicalLevel"]) => setValue("userTechnicalLevel", v)} defaultValue={watch("userTechnicalLevel")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="non_technical">Non-technical</SelectItem>
                <SelectItem value="semi_technical">Semi-technical</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="highly_technical">Highly technical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 rounded-lg border border-border/60 bg-background p-4">
            <input type="checkbox" id="hasTeamAccounts" className="w-5 h-5 rounded" {...register("hasTeamAccounts")} />
            <Label htmlFor="hasTeamAccounts" className="cursor-pointer">Supports Team Accounts</Label>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-border/60 bg-background p-4">
            <input type="checkbox" id="hasGuestAccess" className="w-5 h-5 rounded" {...register("hasGuestAccess")} />
            <Label htmlFor="hasGuestAccess" className="cursor-pointer">Allow Guest Access</Label>
          </div>
        </div>

        {watch("hasTeamAccounts") && (
          <div className="space-y-2">
            <Label>Maximum Team Size *</Label>
            <Select onValueChange={(v) => setValue("maxTeamSize", v as FullRequirementsData["maxTeamSize"])} defaultValue={watch("maxTeamSize")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under_10">Under 10</SelectItem>
                <SelectItem value="10_to_50">10 - 50</SelectItem>
                <SelectItem value="50_to_500">50 - 500</SelectItem>
                <SelectItem value="500_to_5k">500 - 5k</SelectItem>
                <SelectItem value="over_5k">5k+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">3. Multi-Tenancy</h3>
        
        <div className="flex items-center gap-4 rounded-lg border border-border/60 bg-background p-4">
          <input 
            type="checkbox" 
            id="isMultiTenant"
            className="w-5 h-5 rounded"
            {...register("isMultiTenant")}
          />
          <Label htmlFor="isMultiTenant" className="text-base cursor-pointer">
            Is this a Multi-Tenant Application? (Is this B2B SaaS?)
          </Label>
        </div>

        {watch("isMultiTenant") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 rounded-lg border border-border/60 bg-muted/20 p-4 animate-in fade-in duration-300">
            <div className="space-y-2">
              <Label>Tenant Isolation Model</Label>
              <Select onValueChange={(v) => setValue("tenantIsolationModel", v as FullRequirementsData["tenantIsolationModel"])} defaultValue={watch("tenantIsolationModel")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="shared_schema">Shared Schema (Standard)</SelectItem>
                  <SelectItem value="schema_per_tenant">Schema Per Tenant</SelectItem>
                  <SelectItem value="database_per_tenant">Database Per Tenant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Tenant Identification</Label>
              <Select onValueChange={(v) => setValue("tenantIdentificationMethod", v as FullRequirementsData["tenantIdentificationMethod"])} defaultValue={watch("tenantIdentificationMethod")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="subdomain">Subdomain (tenant.app.com)</SelectItem>
                  <SelectItem value="path_prefix">Path Prefix (/tenant/)</SelectItem>
                  <SelectItem value="jwt_claim">JWT Claim</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
