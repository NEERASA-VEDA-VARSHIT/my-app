import { type Blueprint } from "@/db/output-schema";
import { type BuildInstruction, type BuildSession } from "@/db/build-schema";

/**
 * BuildDispatcher (Domain 5 Orchestrator)
 * Converts a Project Manifest (Domain 1-4) into discrete Build Instructions
 */
export async function dispatchBuild(blueprint: Blueprint): Promise<BuildSession> {
  const sessionId = crypto.randomUUID();
  
  // 1. Generate Frontend Instructions
  const frontendInstructions: BuildInstruction = {
    target: "frontend",
    priority: "high",
    files: [
      {
        path: "src/app/page.tsx",
        description: "Main dashboard/landing page with core onboarding flow.",
        referenceSpec: "Journey: " + blueprint.productSpec.coreJourneys[0]
      },
      {
        path: "src/components/shared/Header.tsx",
        description: "Universal navigation and persona-specific controls.",
        referenceSpec: "Personas: " + blueprint.productSpec.personas.join(", ")
      }
    ]
  };

  // 2. Generate Backend Instructions
  const backendInstructions: BuildInstruction = {
    target: "backend",
    priority: "high",
    files: [
      {
        path: "src/api/routes.ts",
        description: "Express/Fastify route definitions for core contracts.",
        referenceSpec: "API Contract: " + blueprint.engineeringSpec.apiContracts.map(c => c.endpoint).join(", ")
      },
      {
        path: "prisma/schema.prisma",
        description: "Database model and relation definitions.",
        referenceSpec: "Data Model: " + blueprint.engineeringSpec.databaseSchema.map(s => s.table).join(", ")
      }
    ]
  };

  return {
    id: sessionId,
    blueprintId: "bp-" + sessionId.slice(0, 8),
    status: "queued",
    instructions: [frontendInstructions, backendInstructions]
  };
}
