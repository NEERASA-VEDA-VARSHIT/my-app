import { generateBlueprint } from "./src/lib/archai/decision-engine";
import { BlueprintInput } from "./src/db/build-schema";

async function runTests() {
  console.log("🚀 Starting Orchestrator Integrity Tests...");

  // 1. Chaos Test: Contradictory Requirements
  console.log("\n--- TEST 1: Chaos (Enterprise vs $0 Budget) ---");
  const chaosInput: BlueprintInput = {
    description: "Ultra-scale Enterprise System",
    architectureMode: "enterprise_grade",
    expectedScale: "10M+",
    targetUsers: "enterprise",
    features: ["realtime", "compliance"],
    totalBudget: "less_than_5k", // Conflict!
    timeline: "1_month"
  };

  try {
    const bp1 = await generateBlueprint(chaosInput);
    console.log("✅ Chaos Test Passed: Orchestrator completed without crash.");
    console.log(`Stability Score: ${bp1.stabilityScore}`);
    console.log(`Execution Repairs: ${bp1.executionAudit.totalRepairs}`);
    console.log("Repaired Steps:", bp1.executionAudit.history.filter(h => h.status === 'repaired').map(h => h.stage));
  } catch (e) {
    console.error("❌ Chaos Test Failed:", e);
  }

  // 2. Determinism Test: Reproducible Traces
  console.log("\n--- TEST 2: Determinism (Reproducible Traces) ---");
  const baseInput: BlueprintInput = {
    description: "Standard SaaS",
    architectureMode: "vc_ready",
    expectedScale: "10k",
    targetUsers: "consumer",
    features: ["auth"],
    totalBudget: "50k_100k",
    timeline: "3_months"
  };

  try {
    const run1 = await generateBlueprint(baseInput);
    const run2 = await generateBlueprint(baseInput);

    const stages1 = run1.executionAudit.history.map(h => h.stage).join(",");
    const stages2 = run2.executionAudit.history.map(h => h.stage).join(",");
    
    const repairs1 = run1.executionAudit.history.map(h => (h.repairs || []).join("|")).join(",");
    const repairs2 = run2.executionAudit.history.map(h => (h.repairs || []).join("|")).join(",");

    if (stages1 === stages2 && repairs1 === repairs2) {
      console.log("✅ Determinism Test Passed: Identical inputs produced identical repair traces.");
    } else {
      console.warn("⚠️ Determinism Inconsistency Detected!");
      console.log("Run 1 Repairs:", repairs1);
      console.log("Run 2 Repairs:", repairs2);
    }
  } catch (e) {
    console.error("❌ Determinism Test Failed:", e);
  }

  console.log("\n🏁 All Integrity Tests Completed.");
}

runTests();
