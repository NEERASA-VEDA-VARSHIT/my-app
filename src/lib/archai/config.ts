/**
 * ArchAI Orchestrator Configuration
 * 
 * TRACK 1: Demo Mode (Deterministic, No AI Dependency)
 * TRACK 2: Live Mode (RAG + LLM Intelligence)
 */

export const EXECUTION_MODE: "demo" | "live" = (process.env.NEXT_PUBLIC_EXECUTION_MODE as any) || "demo";

export const API_CONFIG = {
  MODEL_ID: "llama-3.3-70b-versatile",
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  BASE_URL: "https://api.groq.com/openai/v1",
  TEMPERATURE: 0,
};

export const ORCHESTRATOR_CONFIG = {
  VERSION: "1.3.0-rag-hybrid",
  MAX_REPAIR_ATTEMPTS: 3,
  MAX_LATENCY_THRESHOLD_MS: 7000, // Demo safety threshold
};
