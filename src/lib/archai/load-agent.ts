import { type Blueprint } from "@/db/output-schema";

export async function runLoadSimulation(blueprint: Blueprint): Promise<Blueprint["performanceReport"]> {
  const isServerless = blueprint.architectureMode === "Serverless" || blueprint.architectureMode === "Edge-Optimized";
  const isMonolith = blueprint.architectureMode === "Modular Monolith";
  const hasKafka = blueprint.engineeringSpec.keyDependencies.some(d => d.toLowerCase().includes("kafka"));

  // Domain 8 Intelligence: Mapping architecture to virtual load limits
  let maxUsers = 5000; // Base: 5k CCU
  let bottleneck = "Database I/O";
  let latencyP99 = "180ms";
  const recommendations: string[] = [];

  if (isServerless) {
    maxUsers = 25000;
    bottleneck = "Cold Start / Concurrency Limits";
    latencyP99 = "450ms (Tail)";
    recommendations.push("Implement Provisioned Concurrency for Auth service");
  } else if (isMonolith) {
    maxUsers = 12000;
    bottleneck = "Single Process Memory Pressure";
    latencyP99 = "120ms";
    recommendations.push("Vertical scale to 8vCPU / 32GB RAM");
  } else {
    // Microservices / Distributed
    maxUsers = 75000;
    bottleneck = "Network Overhead / Service Mesh Latency";
    latencyP99 = "250ms";
    recommendations.push("Optimize gRPC payload serialization");
  }

  if (hasKafka) {
    maxUsers += 20000; // Buffering helps peaks
    recommendations.push("Tune Kafka consumer group partition count");
  }

  return {
    maxUsers,
    bottleneck,
    latencyP99,
    recommendations
  };
}
