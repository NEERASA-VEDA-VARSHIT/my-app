import { Blueprint } from "@/db/output-schema";

export interface QualityReport {
  score: number;
  securityAudit: string[];
  performanceAudit: string[];
  technicalDebt: string[];
}

/**
 * Domain 6: QA & Deep Analysis Agent
 * Performs heuristic-based technical audits on the Engineering Spec.
 */
export function runQualityAudit(blueprint: Blueprint): QualityReport {
  const securityAudit: string[] = [];
  const performanceAudit: string[] = [];
  const technicalDebt: string[] = [];
  
  const { engineeringSpec, architectureMode } = blueprint;

  // 1. Security Audit: Check for PII in schema or unsafe API patterns
  const hasUserTable = engineeringSpec.databaseSchema.some(s => s.table.toLowerCase() === "users");
  const hasPasswordColumn = engineeringSpec.databaseSchema.some(s => 
    s.columns.some(c => c.toLowerCase().includes("password") || c.toLowerCase().includes("secret"))
  );

  if (hasUserTable && !hasPasswordColumn) {
     securityAudit.push("[Safe] User table detected with no plaintext password storage.");
  } else if (hasPasswordColumn) {
     securityAudit.push("[Critical] Potential plaintext secret storage detected in DB schema.");
     technicalDebt.push("Refactor: Move secrets to dedicated KMS or Hashicorp Vault.");
  }

  const hasAuthPath = engineeringSpec.apiContracts.some(c => c.endpoint.includes("/auth"));
  if (!hasAuthPath && architectureMode === "Enterprise Grade") {
    securityAudit.push("[High Risk] Enterprise mode selected but no explicit Auth contracts defined.");
  }

  // 2. Performance Audit: Indexing and Scaling
  engineeringSpec.databaseSchema.forEach(table => {
    if (!table.indexes || table.indexes.length === 0) {
      performanceAudit.push(`[Warning] Table '${table.table}' lacks explicit indexes. Potential full-table scans.`);
      technicalDebt.push(`Add indexes to '${table.table}' foreign keys and frequently queried columns.`);
    }
  });

  const isHighScale = blueprint.recommendedStack.backend.toLowerCase().includes("distributed");
  if (isHighScale && !engineeringSpec.keyDependencies.some(d => d.includes("redis") || d.includes("cache"))) {
    performanceAudit.push("[Bottleneck] High-scale backend detected without a distributed caching layer.");
    technicalDebt.push("Implementation: Integrate Redis for hot-path caching.");
  }

  // 3. Score Calculation
  let score = 100;
  score -= securityAudit.filter(s => s.includes("[Critical]") || s.includes("[High Risk]")).length * 20;
  score -= performanceAudit.filter(p => p.includes("[Warning]") || p.includes("[Bottleneck]")).length * 10;
  score = Math.max(0, score);

  return {
    score,
    securityAudit,
    performanceAudit,
    technicalDebt
  };
}
