import { Blueprint } from "@/db/output-schema";
import { Critique } from "../spec-validator";

/**
 * Domain 4.5: Repo Consistency Guard
 */
export function validateRepo(blueprint: Blueprint): Critique[] {
  const critiques: Critique[] = [];
  const eng = blueprint.engineeringSpec;
  const services = blueprint.services;

  // 1. Service to Folder Alignment
  services.forEach(s => {
    const folderExists = eng.folderStructure.some(f => 
      f.toLowerCase().includes(s.name.toLowerCase().split(' ')[0])
    );
    
    if (!folderExists && s.name !== "Global CDN") {
      critiques.push({
        id: "repo-001",
        field: "engineeringSpec.folderStructure",
        severity: "medium",
        message: `Service '${s.name}' defined in Architecture but missing dedicated folder in Repo Layout.`,
        fixSuggestion: `Add 'src/${s.name.toLowerCase().replace(/ /g, '-')}' to folder structure.`
      });
    }
  });

  // 2. Dependency vs Stack Consistency
  const hasKafka = blueprint.services.some(s => s.name.toLowerCase().includes("kafka") || s.name.toLowerCase().includes("message broker"));
  const hasKaflaDep = eng.keyDependencies.some(d => d.toLowerCase().includes("kafka") || d.toLowerCase().includes("kafla"));

  if (hasKafka && !hasKaflaDep) {
    critiques.push({
      id: "repo-002",
      field: "engineeringSpec.keyDependencies",
      severity: "high",
      message: "Architecture includes Message Broker (Kafka) but 'kafkajs' or equivalent is missing from dependencies.",
      fixSuggestion: "Add 'kafkajs' to key dependencies."
    });
  }

  return critiques;
}
