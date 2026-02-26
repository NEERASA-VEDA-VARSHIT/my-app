import { type Blueprint } from "@/db/output-schema";

export async function generateHandoffPackage(blueprint: Blueprint): Promise<Blueprint["handoffSpec"]> {
  const readinessScore = blueprint.stabilityScore;
  const projectName = blueprint.startupSummary.split('"')[1] || "ArchAI Project";
  
  // Domain 9 Intelligence: Generating a final handoff roadmap
  const nextSteps = [
    "Clone the generated repository structure to your local machine.",
    "Provision necessary secrets in your CI/CD provider (e.g., GitHub Actions).",
    "Run initial infrastructure deployment using Terraform/Vercel CLI.",
    "Execute database migrations defined in the Engineering Spec.",
    "Initiate security hardening based on the QA report findings."
  ];

  if (blueprint.architectureMode.includes("Enterprise")) {
    nextSteps.push("Schedule a review with the infrastructure security team for IAM audits.");
    nextSteps.push("Configure VPC peering between the backend services and the database cluster.");
  }

  const documentationLinks = [
    { title: "Architecture Decision Log", url: "#" },
    { title: "API Reference (v1)", url: "#" },
    { title: "Deployment Playbook", url: "#" },
    { title: "Security Compliance Report", url: "#" }
  ];

  const handoffPackageUrl = `https://arch-ai.sh/packages/${projectName.toLowerCase().replace(/ /g, '-')}-${Date.now()}.zip`;

  return {
    readinessScore,
    handoffPackageUrl,
    nextSteps,
    documentationLinks
  };
}
