"use client"

import { useMemo, useState } from "react"
import type { SVGProps } from "react"
import { useForm, FormProvider, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import { FullRequirementsSchema, FullRequirementsData } from "@/db/requirements-schema"
import { cn } from "@/lib/utils"

import { Step0Engagement } from "./Step0Engagement"
import { Step1BusinessIntent } from "./Step1BusinessIntent"
import { Step2DomainWorkflow } from "./Step2DomainWorkflow"
import { Step3RiskScale } from "./Step3RiskScale"
import { Step4DataAi } from "./Step4DataAi"
import { Step5TechnicalDeepDive } from "./Step5TechnicalDeepDive"
import { Step6GovernanceRisk } from "./Step6GovernanceRisk"
import { Step7StrategicIntent } from "./Step7StrategicIntent"

// Default partial values based on schema
const defaultValues: Partial<z.input<typeof FullRequirementsSchema>> = {
  engagementProfile: "non_technical_founder",
  engagementMode: "non_technical",
  businessObjective: "new_revenue_streams",
  businessSuccessKpi: "",
  revenueArchitecture: "subscription_tiers",
  entitlementsVaryByPlan: true,
  pricingChangesFrequently: false,
  requiresBillingProration: false,
  expectsRefundsCredits: false,
  competitivePositioning: ["ux_simplicity"],
  coreDomainObjectsList: ["User", "Workspace", "Project"],
  objectOwnershipNotes: "",
  lifecycleStates: "",
  stateTransitionsMode: "manual",
  stateTransitionsReversible: true,
  stateTransitionsTriggerNotifications: true,
  stateTransitionsTriggerFinancialEvents: false,
  workflowComplexityLevel: "multi_step_forms",
  workflowsConfigurableByAdmins: false,
  workflowsDifferByTenant: false,
  businessCriticality24hOutage: "revenue_impact",
  dataClassification: ["account_credentials"],
  fieldLevelEncryptionRequired: false,
  auditImmutabilityRequired: false,
  complianceCertificationWithin12Months: false,
  usersAt36Months: "100k_to_1m",
  trafficProfile: "seasonal_spikes",
  computeNeeds: ["scheduled_background_jobs"],
  retentionPolicy: "time_bound_deletion",
  dataResidencyConstraint: "no_restriction",
  analyticsExpectations: ["basic_usage_metrics"],
  aiFunctionalRoles: ["chat_assistant"],
  aiModelStrategy: "external_api",
  aiLatencyRequirement: "under_1s",
  aiDataCanLeaveRegion: true,
  aiRequiresPrivateModels: false,
  aiPromptAuditRequired: false,
  adminControlsRequired: ["user_management", "audit_logs"],
  observabilityRequirementsDesired: ["error_tracking_only", "structured_logging"],
  intendedSystemLifespan: "long_term_scalable_platform",
  exitVision: "acquisition",
  strategicArchitectureIntent: "",

  projectName: "",
  projectType: "saas_b2b",
  problemStatement: "",
  solutionSummary: "",
  projectStage: "greenfield",
  industry: "other",
  targetGeographies: ["global"],
  targetLaunchDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  
  primaryUserType: "mixed",
  numberOfRoles: 3,
  usersAtLaunch: "100_to_1k",
  usersAt12Months: "10k_to_100k",
  peakConcurrentUsers: "500_to_5k",
  avgSessionDuration: "30min_to_2hr",
  userGeographicDistribution: "global",
  userTechnicalLevel: "semi_technical",
  hasTeamAccounts: false,
  hasGuestAccess: false,
  
  isMultiTenant: false,
  tenantIsolationModel: "shared_schema",
  tenantIdentificationMethod: "subdomain",
  tenantOnboardingModel: "self_service",
  tenantCustomization: ["none"],
  crossTenantSharing: "none",
  tenantTierModel: "flat_pricing",
  tenantsAtLaunch: "under_10",
  tenantsAt12Months: "10_to_100",
  tenantDataDeletion: "grace_period",
  tenantAdminCapabilities: ["user_management"],
  tenantDataResidency: "no_requirement",

  accessControlModel: "ownership_based",
  roles: [
    {
      name: "owner",
      description: "Resource owner",
      scope: "resource",
      isDefault: true,
      isSuperAdmin: false,
    },
  ],
  roleHierarchy: "flat",
  permissionGranularity: "resource_level",
  resourcePermissions: [
    {
      resourceName: "Project",
      actions: ["create", "read", "update", "delete"],
      ownershipRule: "Owner can modify own resources",
    },
  ],
  dynamicRoles: false,
  superAdminBypassesChecks: true,
  rolesAreTenantScoped: true,
  multipleRolesPerUser: false,
  roleAssignmentRequiresApproval: false,
  ownershipOverride: true,
  abacAttributes: [
    {
      name: "user.id",
      source: "user",
      type: "string",
      example: "user_123",
    },
  ],
  abacPolicies: [
    {
      id: "POL-001",
      description: "Owner can access owned resources",
      effect: "allow",
      condition: "user.id == resource.ownerId",
      priority: 10,
    },
  ],
  abacConflictResolution: "deny_overrides",
  abacPolicyManagement: "static_developer",
  policyEngine: "cerbos",
  policiesAuditable: true,
  policiesUseExternalData: false,
  
  coreEntities: [
    { name: "User", description: "Standard user", estimatedRows: "10k_to_100k", writeFrequency: "occasional", readFrequency: "frequent", relationships: [], requiresAudit: false, requiresSoftDelete: true }
  ],
  workloadProfile: "balanced",
  searchRequirements: "basic_filter",
  dataVolumeAt12Months: "10gb_to_100gb",
  backupStrategy: "managed_automatic",
  
  requiresRealTime: false,
  realTimeFeatures: ["live_notifications"],
  realTimeProtocol: "server_sent_events",
  realTimeScale: "under_100_concurrent",
  realTimeDeliveryGuarantee: "best_effort",
  requiresBackgroundJobs: false,
  backgroundJobTypes: ["scheduled_cron"],
  jobQueuePreference: "inngest",
  jobRetryStrategy: "exponential_backoff",
  jobFailureHandling: ["dead_letter_queue"],
  integrations: ["none"],
  inboundWebhookSources: ["placeholder"],
  paymentDetail: {
    provider: "stripe",
    taxHandling: "stripe_tax",
  },
  requiresFileStorage: false,
  acceptedFileTypes: ["images"],
  maxFileSizeMB: 10,
  fileProcessing: ["none"],
  fileAccessModel: "private_signed",
  objectStorageProvider: "cloudflare_r2",
  uploadStrategy: "client_direct",
  requiresAI: false,
  aiFeatures: ["text_generation"],
  aiProvider: ["openai"],
  aiDataPrivacy: "cloud_acceptable",
  aiMonthlyCostCeiling: "under_100",
  
  targetFCP: "1s_to_2s",
  targetApiP95: "100ms_to_300ms",
  peakRPS: "100_to_1k",
  acceptableDowntimePerMonth: "under_45min",
  rto: "1hr_to_4hr",
  rpo: "under_24hr",
  complianceFrameworks: ["none"],
  piiDataCollected: ["name", "email"],
  encryptionRequirements: ["encryption_at_rest", "encryption_in_transit"],
  securityFeatures: ["security_headers"],
  
  deploymentPlatform: "vercel",
  managedServicesPreference: "managed_only",
  coldStartTolerance: "under_2s",
  monthlyInfrastructureBudget: "50_to_200",
  
  devTeamSize: "solo",
  mvpTimelineDays: 30,
  fundingStage: "bootstrapped",
  priorityRank: ["speed_to_market", "developer_experience"],
  
  renderingStrategy: "hybrid",
  nextjsRouterType: "app_router",
  rscUsageModel: "server_first",
  middlewareRequirements: ["none"],
  themingRequired: "dark_mode",
  
  apiArchitecture: "rest_and_trpc",
  apiVersioningStrategy: "url_versioning",
  apiAuthMethod: ["session_cookie"],
  rateLimitingStrategy: "user_based",
  apiDocumentation: "openapi_auto",
  
  primaryDatabase: "neon",
  ormChoice: "prisma",
  connectionPooling: "neon_pooler",
  migrationStrategy: "prisma_migrate",
  seedingStrategy: "prisma_seed",
  cacheLayerRequired: false,
  cacheTechnology: "upstash",
  cacheTargets: ["database_queries"],
  cacheInvalidationStrategy: "ttl_based",
  messageQueueRequired: false,
  queuePattern: "simple_queue",
  
  authLibrary: "authjs_v5",
  oauthProviders: ["email_password"],
  sessionStrategy: "jwt",
  jwtConfig: {
    accessTokenExpiry: "15m",
    refreshTokenExpiry: "30d",
    rotateRefreshTokens: true,
  },
  nextjsDataCache: "default_cache",
  
  loggingProvider: "axiom",
  errorTrackingProvider: "sentry",
  apmProvider: "vercel_analytics",
  metricsAndAlerting: {},
  
  cicdPlatform: "github_actions",
  branchStrategy: "github_flow",
}

const STEPS = [
  {
    id: "engagement",
    title: "Engagement Profile",
    description: "Audience and discovery depth.",
    component: Step0Engagement,
  },
  {
    id: "business-intent",
    title: "Business Intent",
    description: "Objectives, monetization, and competitive edge.",
    component: Step1BusinessIntent,
  },
  {
    id: "domain-workflow",
    title: "Domain Workflow",
    description: "Core objects, lifecycle, and workflow entropy.",
    component: Step2DomainWorkflow,
  },
  {
    id: "risk-scale",
    title: "Risk & Scale",
    description: "Criticality, compliance pressure, and growth profile.",
    component: Step3RiskScale,
  },
  {
    id: "data-ai",
    title: "Data & AI",
    description: "Data architecture and conditional AI governance.",
    component: Step4DataAi,
  },
  {
    id: "governance",
    title: "Governance",
    description: "Operational controls and observability expectations.",
    component: Step6GovernanceRisk,
  },
  {
    id: "strategic-intent",
    title: "Strategic Intent",
    description: "Lifespan, exit vision, and architecture direction.",
    component: Step7StrategicIntent,
  },
]

const TECHNICAL_STEP = {
  id: "technical-deep-dive",
  title: "Technical Deep Dive",
  description: "Database, API, auth, cache, and tenancy controls.",
  component: Step5TechnicalDeepDive,
}

interface RequirementsWizardProps {
  onSubmit: (data: FullRequirementsData) => void
  isLoading: boolean
}

export function RequirementsWizard({ onSubmit, isLoading }: RequirementsWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  
  const form = useForm<z.input<typeof FullRequirementsSchema>, unknown, z.output<typeof FullRequirementsSchema>>({
    resolver: zodResolver(FullRequirementsSchema),
    defaultValues,
    mode: "onChange",
  })
  
  const { handleSubmit, formState: { errors } } = form
  const engagementMode = useWatch({ control: form.control, name: "engagementMode" })

  const steps = useMemo(() => {
    if (engagementMode === "technical") {
      return [
        STEPS[0],
        STEPS[1],
        STEPS[2],
        STEPS[3],
        STEPS[4],
        TECHNICAL_STEP,
        STEPS[5],
        STEPS[6],
      ]
    }

    return STEPS
  }, [engagementMode])

  const safeStepIndex = Math.min(currentStepIndex, steps.length - 1)
  const isLastStep = safeStepIndex === steps.length - 1
  const CurrentStepComponent = steps[safeStepIndex].component
  
  const handleNext = async () => {
    // In a real app, we'd validate only the fields for the current step.
    // For now, we'll allow generic next and validate everything at the end.
    if (safeStepIndex < steps.length - 1) {
      setCurrentStepIndex(safeStepIndex + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }
  
  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(safeStepIndex - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }
  
  const submitForm = (data: FullRequirementsData) => {
    onSubmit(data)
  }

  return (
    <Card className="w-full max-w-5xl mx-auto overflow-hidden border-border/50 bg-background/95 shadow-2xl">
      <div className="flex w-full h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${((safeStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      <CardHeader className="border-b pb-5">
        <CardTitle className="text-2xl font-bold tracking-tight">Architecture Orchestration</CardTitle>
        <CardDescription>
          Step {safeStepIndex + 1} of {steps.length}: {steps[safeStepIndex].title}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(submitForm)} className="grid md:grid-cols-[260px_1fr]">
            <aside className="border-b md:border-b-0 md:border-r p-4 md:p-5 space-y-2 bg-muted/20">
              {steps.map((step, idx) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setCurrentStepIndex(idx)}
                  disabled={isLoading}
                  className={cn(
                    "w-full rounded-lg border p-3 text-left transition-colors",
                    idx === safeStepIndex
                      ? "border-primary bg-primary/10"
                      : "border-border/60 bg-background hover:bg-muted/40"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold",
                        idx < safeStepIndex
                          ? "border-primary bg-primary text-primary-foreground"
                          : idx === safeStepIndex
                            ? "border-primary text-primary"
                            : "border-border text-muted-foreground"
                      )}
                    >
                      {idx < safeStepIndex ? <CheckCircle2 className="h-3.5 w-3.5" /> : idx + 1}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold leading-none">{step.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </aside>

            <section className="p-5 md:p-6 space-y-6">
              <div className="rounded-lg border bg-card p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Current Step</p>
                <p className="text-base font-semibold mt-1">{steps[safeStepIndex].title}</p>
                <p className="text-sm text-muted-foreground mt-1">{steps[safeStepIndex].description}</p>
              </div>

              <div className="min-h-100">
                <CurrentStepComponent />

                {isLastStep && Object.keys(errors).length > 0 && (
                  <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive text-sm">
                    <p className="font-semibold mb-2">Please fix the following validation errors:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {Object.entries(errors).map(([path, err]) => (
                        <li key={path}>{path}: {String(err?.message)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  disabled={safeStepIndex === 0 || isLoading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {isLastStep ? (
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating PRD...</>
                    ) : (
                      <><Zap className="w-4 h-4 mr-2" /> Generate Architecture</>
                    )}
                  </Button>
                ) : (
                  <Button type="button" onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </section>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

function Zap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
