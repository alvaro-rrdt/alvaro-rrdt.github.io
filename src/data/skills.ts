export interface SkillGroup {
  category: string;
  skills: string[];
}

/**
 * Toolbox grid, shown on the homepage and the CV page.
 * TODO(phase-0): keep only what you would defend in a screen-share.
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "languages",
    skills: ["TypeScript", "Go", "Python", "Bash", "SQL"],
  },
  {
    category: "frameworks & runtimes",
    skills: ["Astro", "Node.js", "Docker", "Kubernetes"],
  },
  {
    category: "cloud & devops",
    skills: ["GCP", "AWS", "Terraform", "Pulumi", "ArgoCD", "Renovate"],
  },
  {
    category: "observability",
    skills: ["Prometheus", "Grafana", "Uptime Kuma", "Loki"],
  },
  {
    category: "security",
    skills: ["HackTheBox", "Exegol", "Nmap", "Burp Suite", "SOPS"],
  },
  {
    category: "practices",
    skills: ["GitOps", "CI/CD", "IaC", "Postmortems", "AI-assisted dev"],
  },
];
