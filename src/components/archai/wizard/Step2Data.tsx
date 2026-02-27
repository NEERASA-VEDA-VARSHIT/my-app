"use client"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FullRequirementsData } from "@/db/requirements-schema"

export function Step2Data() {
  const { register, setValue, watch } = useFormContext<FullRequirementsData>()
  const complianceFrameworks = watch("complianceFrameworks") ?? []
  const integrations = watch("integrations") ?? []
  const securityFeatures = watch("securityFeatures") ?? []

  const toggleArray = <T extends string>(
    current: T[],
    setter: (next: T[]) => void,
    value: T,
    fallback: T
  ) => {
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]
    setter(next.length > 0 ? next : [fallback])
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">4. Access Control</h3>
        
        <div className="space-y-2 mb-4">
          <Label>Access Control Model *</Label>
          <Select onValueChange={(v: FullRequirementsData["accessControlModel"]) => setValue("accessControlModel", v)} defaultValue={watch("accessControlModel")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (Public/Internal)</SelectItem>
              <SelectItem value="rbac">RBAC (Role-Based)</SelectItem>
              <SelectItem value="abac">ABAC (Attribute-Based)</SelectItem>
              <SelectItem value="pbac">PBAC (Policy-Based)</SelectItem>
              <SelectItem value="rbac_with_abac">RBAC + Contextual ABAC</SelectItem>
              <SelectItem value="ownership_based">Ownership Based</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">5. Data Requirements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Workload Profile *</Label>
            <Select onValueChange={(v: FullRequirementsData["workloadProfile"]) => setValue("workloadProfile", v)} defaultValue={watch("workloadProfile")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="read_heavy">Read Heavy (&gt;10:1)</SelectItem>
                <SelectItem value="write_heavy">Write Heavy</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="bursty_reads">Bursty Reads</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Data Volume at 12 Months *</Label>
            <Select onValueChange={(v: FullRequirementsData["dataVolumeAt12Months"]) => setValue("dataVolumeAt12Months", v)} defaultValue={watch("dataVolumeAt12Months")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under_1gb">&lt; 1GB</SelectItem>
                <SelectItem value="1gb_to_10gb">1GB - 10GB</SelectItem>
                <SelectItem value="10gb_to_100gb">10GB - 100GB</SelectItem>
                <SelectItem value="100gb_to_1tb">100GB - 1TB</SelectItem>
                <SelectItem value="1tb_to_10tb">1TB - 10TB</SelectItem>
                <SelectItem value="over_10tb">10TB+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 rounded-lg border border-border/60 bg-background p-4">
          <input 
            type="checkbox" 
            id="softDeleteRequired"
            className="w-5 h-5 rounded"
            {...register("softDeleteRequired")}
          />
          <Label htmlFor="softDeleteRequired" className="text-base cursor-pointer">
            Require Soft Delete (Retain deleted records)
          </Label>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">Capabilities</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-4 rounded-lg border border-border/60 bg-background p-4">
            <input type="checkbox" id="requiresRealTime" className="w-5 h-5 rounded" {...register("requiresRealTime")} />
            <Label htmlFor="requiresRealTime" className="cursor-pointer">Real-Time Features</Label>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-border/60 bg-background p-4">
            <input type="checkbox" id="requiresBackgroundJobs" className="w-5 h-5 rounded" {...register("requiresBackgroundJobs")} />
            <Label htmlFor="requiresBackgroundJobs" className="cursor-pointer">Background Jobs</Label>
          </div>
          
          <div className="flex items-center gap-4 rounded-lg border border-border/60 bg-background p-4">
            <input type="checkbox" id="requiresFileStorage" className="w-5 h-5 rounded" {...register("requiresFileStorage")} />
            <Label htmlFor="requiresFileStorage" className="cursor-pointer">File Uploads & Storage</Label>
          </div>
          
          <div className="flex items-center gap-4 rounded-lg border border-border/60 bg-background p-4">
            <input type="checkbox" id="requiresAI" className="w-5 h-5 rounded" {...register("requiresAI")} />
            <Label htmlFor="requiresAI" className="cursor-pointer">AI/ML Features</Label>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">Security, Compliance & Integrations</h3>

        <div className="space-y-2">
          <Label>Compliance Frameworks</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { label: "None", value: "none" },
              { label: "GDPR", value: "gdpr" },
              { label: "HIPAA", value: "hipaa" },
              { label: "PCI-DSS", value: "pci_dss" },
              { label: "SOC2 Type I", value: "soc2_type1" },
              { label: "SOC2 Type II", value: "soc2_type2" },
              { label: "ISO 27001", value: "iso_27001" },
              { label: "WCAG AA", value: "wcag_aa" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => toggleArray(
                  complianceFrameworks,
                  (next) => setValue("complianceFrameworks", next as FullRequirementsData["complianceFrameworks"]),
                  item.value as FullRequirementsData["complianceFrameworks"][number],
                  "none" as FullRequirementsData["complianceFrameworks"][number]
                )}
                className={`rounded-md border px-3 py-2 text-xs text-left ${
                  complianceFrameworks.includes(item.value as FullRequirementsData["complianceFrameworks"][number])
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Security Features</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { label: "MFA", value: "mfa" },
              { label: "SAML SSO", value: "sso_saml" },
              { label: "Session Mgmt", value: "session_management" },
              { label: "Security Headers", value: "security_headers" },
              { label: "Brute Force Protection", value: "brute_force_protection" },
              { label: "Vuln Scanning", value: "vulnerability_scanning" },
              { label: "DDoS Protection", value: "ddos_protection" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => toggleArray(
                  securityFeatures,
                  (next) => setValue("securityFeatures", next as FullRequirementsData["securityFeatures"]),
                  item.value as FullRequirementsData["securityFeatures"][number],
                  "security_headers" as FullRequirementsData["securityFeatures"][number]
                )}
                className={`rounded-md border px-3 py-2 text-xs text-left ${
                  securityFeatures.includes(item.value as FullRequirementsData["securityFeatures"][number])
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Integrations</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { label: "None", value: "none" },
              { label: "Payment", value: "payment_processing" },
              { label: "Email", value: "email_delivery" },
              { label: "OAuth", value: "oauth_providers" },
              { label: "Analytics", value: "analytics" },
              { label: "Inbound Webhooks", value: "webhooks_inbound" },
              { label: "Logging", value: "logging" },
              { label: "Error Tracking", value: "error_tracking" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => toggleArray(
                  integrations,
                  (next) => setValue("integrations", next as FullRequirementsData["integrations"]),
                  item.value as FullRequirementsData["integrations"][number],
                  "none" as FullRequirementsData["integrations"][number]
                )}
                className={`rounded-md border px-3 py-2 text-xs text-left ${
                  integrations.includes(item.value as FullRequirementsData["integrations"][number])
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
    </div>
  )
}
