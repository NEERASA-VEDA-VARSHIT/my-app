import { Blueprint } from "@/db/output-schema";

export interface ShipSpec {
  deploymentStrategy: string;
  ciPipeline: string;
  infraManifest: string;
  environmentConfigs: string[];
}

/**
 * Domain 7: Ship (Deployment Orchestration)
 * Generates environment-specific CI/CD and Infra payloads.
 */
export function orchestrateDeployment(blueprint: Blueprint): ShipSpec {
  const { architectureMode, recommendedStack } = blueprint;
  
  // 1. Determine Strategy
  let deploymentStrategy = "Rolling Update";
  if (architectureMode === "Enterprise Grade" || architectureMode === "VC Ready") {
    deploymentStrategy = "Blue/Green with Canary Analysis";
  }

  // 2. Generate CI/CD stub
  const ciPipeline = `
# .github/workflows/deploy.yml
name: CD
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install && npm test
      - name: Deploy to ${recommendedStack.infra.split(' ')[0]}
        run: npx ${recommendedStack.infra.toLowerCase().includes('vercel') ? 'vercel deploy --prod' : 'cdk deploy'}
  `.trim();

  // 3. Generate Infrastructure Manifest (Terraform/HCL stub)
  const infraManifest = `
// main.tf
resource "cloud_provider_service" "app" {
  name        = "${blueprint.startupSummary.slice(0, 15).replace(/ /g, '_')}"
  mode        = "${architectureMode}"
  stack       = "${recommendedStack.backend}"
  region      = "us-east-1"
  auto_scale  = true
}
  `.trim();

  // 4. Environment Configs
  const environmentConfigs = [
    "NODE_ENV=production",
    "DATABASE_URL=${SECRET_DB_URL}",
    `DEPLOY_STRATEGY=${deploymentStrategy}`
  ];

  return {
    deploymentStrategy,
    ciPipeline,
    infraManifest,
    environmentConfigs
  };
}
