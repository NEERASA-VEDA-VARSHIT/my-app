"use client"

import { useState } from "react"
import { BlueprintForm } from "@/components/archai/BlueprintForm"
import { BlueprintResult } from "@/components/archai/BlueprintResult"
import { Blueprint } from "@/db/output-schema"
import { ApiResponse } from "@/types/api"
import nProgress from "nprogress"
import "nprogress/nprogress.css"

export default function Home() {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async (data: any) => {
    let retries = 2;
    let success = false;

    setIsLoading(true)
    nProgress.start()
    setBlueprint(null)

    while (retries >= 0 && !success) {
      try {
        const response = await fetch("/api/v1/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        if (!response.ok) throw new Error("Network response was not ok");
        
        const result: ApiResponse<Blueprint> = await response.json()

        if (result.success) {
          setBlueprint(result.data)
          success = true;
        } else {
          throw new Error((result as any).error?.message || "Generation failed");
        }
      } catch (error: any) {
        console.warn(`Attempt failed. Retries left: ${retries}`, error);
        if (retries === 0) {
          alert("Generation failed after multiple attempts: " + error.message);
        }
        retries--;
        if (retries >= 0) await new Promise(r => setTimeout(r, 1000)); // Wait before retry
      }
    }
    
    setIsLoading(false)
    nProgress.done()
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Decorative Gradient */}
      <div className="fixed inset-0 bg-[#030303] -z-10" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-wide text-blue-400 mb-4 animate-pulse">
            v0 RELENTLESS SHUTTLE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            ArchAI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Stop guessing your architecture. Generate opinionated, fundable system designs in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <BlueprintForm onSubmit={handleGenerate} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-7">
            {blueprint ? (
              <BlueprintResult blueprint={blueprint} />
            ) : (
              <div className="h-full min-h-[400px] rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Ready to architect</h3>
                  <p className="text-sm text-muted-foreground max-w-[280px]">
                    Enter your startup details on the left to generate your technical blueprint.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="py-12 border-t border-white/5 text-center text-sm text-muted-foreground">
        Built for Speed. ArchAI © 2026.
      </footer>
    </main>
  )
}
