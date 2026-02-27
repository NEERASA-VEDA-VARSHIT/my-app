"use client"

import { useState } from "react"
import { RequirementsWizard } from "@/components/archai/wizard/RequirementsWizard"
import { BlueprintResult } from "@/components/archai/BlueprintResult"
import { Blueprint } from "@/db/output-schema"
import { ApiResponse } from "@/types/api"
import nProgress from "nprogress"
import "nprogress/nprogress.css"

export default function Home() {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null)
  const [lastInput, setLastInput] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isClarifying, setIsClarifying] = useState(false)

  const handleGenerate = async (data: any, answersOrEvent?: any) => {
    let retries = 0; // Limit to 1 call until fixed
    let success = false;

    // Detect if second arg is a SyntheticEvent or actual answers
    const isEvent = answersOrEvent && (typeof answersOrEvent === 'object' && ('nativeEvent' in answersOrEvent || 'preventDefault' in answersOrEvent));
    const answers = isEvent ? undefined : answersOrEvent;

    if (answers) {
      setIsClarifying(true);
    } else {
      setIsLoading(true);
      setLastInput(data);
      setBlueprint(null); // Clear previous results on fresh start
    }
    
    nProgress.start()

    while (retries >= 0 && !success) {
      try {
        const response = await fetch("/api/v1/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, answers }),
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
        if (retries >= 0) await new Promise(r => setTimeout(r, 1000));
      }
    }
    
    setIsLoading(false)
    setIsClarifying(false)
    nProgress.done()
  }

  const handleClarify = (answers: Record<string, string>) => {
    handleGenerate(lastInput, answers);
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

        <div >
          <div className="lg:col-span-5">
            <RequirementsWizard onSubmit={handleGenerate} isLoading={isLoading} />
          </div>
          {/* <div className="lg:col-span-7">
            {blueprint ? (
              <BlueprintResult 
                blueprint={blueprint} 
                onClarify={handleClarify}
                isClarifying={isClarifying}
              />
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
          </div> */}
        </div>
      </div>

      <footer className="py-12 border-t border-white/5 text-center text-sm text-muted-foreground">
        Built for Speed. ArchAI © 2026.
      </footer>
    </main>
  )
}
