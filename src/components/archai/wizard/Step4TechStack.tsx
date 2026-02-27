"use client"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FullRequirementsData } from "@/db/requirements-schema"

export function Step4TechStack() {
  const { register, setValue, watch } = useFormContext<FullRequirementsData>()
  const oauthProviders = watch("oauthProviders") ?? []

  const toggleProvider = (value: FullRequirementsData["oauthProviders"][number]) => {
    const next = oauthProviders.includes(value)
      ? oauthProviders.filter((v) => v !== value)
      : [...oauthProviders, value]
    setValue("oauthProviders", next.length > 0 ? next : ["email_password"])
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">16. Rendering & Next.js</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Primary Rendering Strategy</Label>
            <Select onValueChange={(v: FullRequirementsData["renderingStrategy"]) => setValue("renderingStrategy", v)} defaultValue={watch("renderingStrategy")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="hybrid">Hybrid (Recommended)</SelectItem>
                <SelectItem value="ssr">SSR (Server-Side)</SelectItem>
                <SelectItem value="ssg">SSG (Static)</SelectItem>
                <SelectItem value="csr">CSR (Client-Side)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Router Type</Label>
            <Select onValueChange={(v: FullRequirementsData["nextjsRouterType"]) => setValue("nextjsRouterType", v)} defaultValue={watch("nextjsRouterType")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="app_router">App Router (React Server Configs)</SelectItem>
                <SelectItem value="pages_router">Pages Router (Legacy)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-4 rounded-lg border border-border/60 bg-background p-4">
          <input type="checkbox" id="seoRequired" className="w-5 h-5 rounded" {...register("seoRequired")} />
          <Label htmlFor="seoRequired" className="cursor-pointer">SEO Required (SSR/SSG ready pages)</Label>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">17. API Layer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>API Versioning</Label>
            <Select onValueChange={(v) => setValue("apiVersioningStrategy", v as FullRequirementsData["apiVersioningStrategy"])} defaultValue={watch("apiVersioningStrategy")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="url_versioning">URL versioning</SelectItem>
                <SelectItem value="header_versioning">Header versioning</SelectItem>
                <SelectItem value="query_param">Query param versioning</SelectItem>
                <SelectItem value="no_versioning">No versioning</SelectItem>
                <SelectItem value="content_negotiation">Content negotiation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>API Documentation</Label>
            <Select onValueChange={(v) => setValue("apiDocumentation", v as FullRequirementsData["apiDocumentation"])} defaultValue={watch("apiDocumentation")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="openapi_auto">OpenAPI Auto</SelectItem>
                <SelectItem value="openapi_manual">OpenAPI Manual</SelectItem>
                <SelectItem value="postman">Postman</SelectItem>
                <SelectItem value="readme_only">README Only</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">18. Database & ORM</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Primary Database</Label>
            <Select onValueChange={(v: FullRequirementsData["primaryDatabase"]) => setValue("primaryDatabase", v)} defaultValue={watch("primaryDatabase")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="neon">Neon (Serverless Postgres)</SelectItem>
                <SelectItem value="postgresql">PostgreSQL (Standard)</SelectItem>
                <SelectItem value="supabase">Supabase</SelectItem>
                <SelectItem value="planetscale">PlanetScale (MySQL)</SelectItem>
                <SelectItem value="turso">Turso (SQLite Edge)</SelectItem>
                <SelectItem value="mongodb">MongoDB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>ORM Choice</Label>
            <Select onValueChange={(v: FullRequirementsData["ormChoice"]) => setValue("ormChoice", v)} defaultValue={watch("ormChoice")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="prisma">Prisma</SelectItem>
                <SelectItem value="drizzle">Drizzle</SelectItem>
                <SelectItem value="kysely">Kysely</SelectItem>
                <SelectItem value="supabase_client">Supabase Client</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="text-lg font-medium">21. Authentication</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Auth Library</Label>
            <Select onValueChange={(v: FullRequirementsData["authLibrary"]) => setValue("authLibrary", v)} defaultValue={watch("authLibrary")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="authjs_v5">Auth.js v5 (NextAuth)</SelectItem>
                <SelectItem value="clerk">Clerk (Managed UI)</SelectItem>
                <SelectItem value="supabase_auth">Supabase Auth</SelectItem>
                <SelectItem value="lucia">Lucia</SelectItem>
                <SelectItem value="auth0">Auth0</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Session Storage</Label>
            <Select onValueChange={(v: FullRequirementsData["sessionStrategy"]) => setValue("sessionStrategy", v)} defaultValue={watch("sessionStrategy")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="jwt">JWT (Stateless)</SelectItem>
                <SelectItem value="database">Database (Revocable)</SelectItem>
                <SelectItem value="redis_session">Redis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 mt-2">
          <Label>OAuth Providers</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { label: "Email/Password", value: "email_password" },
              { label: "Google", value: "google" },
              { label: "GitHub", value: "github" },
              { label: "Microsoft", value: "microsoft" },
              { label: "SAML", value: "saml" },
              { label: "Passkey", value: "passkey" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => toggleProvider(item.value as FullRequirementsData["oauthProviders"][number])}
                className={`rounded-md border px-3 py-2 text-xs text-left ${
                  oauthProviders.includes(item.value as FullRequirementsData["oauthProviders"][number])
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
        <h3 className="text-lg font-medium">19. Caching</h3>
        <div className="flex items-center gap-4 rounded-lg border border-border/60 bg-background p-4">
          <input type="checkbox" id="cacheLayerRequired" className="w-5 h-5 rounded" {...register("cacheLayerRequired")} />
          <Label htmlFor="cacheLayerRequired" className="cursor-pointer">Enable Cache Layer</Label>
        </div>

        {watch("cacheLayerRequired") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cache Technology</Label>
              <Select onValueChange={(v) => setValue("cacheTechnology", v as FullRequirementsData["cacheTechnology"])} defaultValue={watch("cacheTechnology")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="upstash">Upstash</SelectItem>
                  <SelectItem value="redis">Redis</SelectItem>
                  <SelectItem value="vercel_kv">Vercel KV</SelectItem>
                  <SelectItem value="in_memory">In-memory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Cache Invalidation</Label>
              <Select onValueChange={(v) => setValue("cacheInvalidationStrategy", v as FullRequirementsData["cacheInvalidationStrategy"])} defaultValue={watch("cacheInvalidationStrategy")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ttl_based">TTL-based</SelectItem>
                  <SelectItem value="event_based">Event-based</SelectItem>
                  <SelectItem value="tag_based">Tag-based</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
