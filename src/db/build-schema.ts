import { z } from "zod";

export const BuildInstructionSchema = z.object({
  target: z.enum(["frontend", "backend"]),
  files: z.array(z.object({
    path: z.string(),
    description: z.string(),
    referenceSpec: z.string(), // Links back to API Contract or Product Spec
  })),
  priority: z.enum(["low", "medium", "high"]),
});

export type BuildInstruction = z.infer<typeof BuildInstructionSchema>;

export const BuildSessionSchema = z.object({
  id: z.string(),
  blueprintId: z.string(),
  status: z.enum(["queued", "in_progress", "completed", "failed"]),
  instructions: z.array(BuildInstructionSchema),
});

export type BuildSession = z.infer<typeof BuildSessionSchema>;
