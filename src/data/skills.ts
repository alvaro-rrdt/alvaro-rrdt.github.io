export interface SkillGroup {
  category: string;
  skills: string[];
}

/**
 * Toolbox grid, shown on the homepage and the CV page (first four
 * groups become the CV "core skills" column). Mirrors the CV.
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "programming & databases",
    skills: ["Python", "Go", "TypeScript", "C#", "PHP", "SQL (PostgreSQL, MySQL)"],
  },
  {
    category: "cloud & devops",
    skills: [
      "GCP (GKE, Pub/Sub)",
      "AWS (EKS)",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Ansible",
      "Pulumi",
    ],
  },
  {
    category: "ci/cd & quality",
    skills: [
      "GitHub Actions",
      "Forgejo Actions",
      "kubeconform",
      "Trivy",
      "SonarQube",
    ],
  },
  {
    category: "observability",
    skills: ["Datadog", "Prometheus", "Grafana", "Loki", "Uptime Kuma"],
  },
  {
    category: "networking & reliability",
    skills: [
      "VRRP",
      "load balancing",
      "session affinity",
      "failover architecture",
      "real-time/UDP protocols",
    ],
  },
  {
    category: "security",
    skills: [
      "HackTheBox (CJCA in progress)",
      "Exegol",
      "SOPS",
      "Tailscale mesh VPN",
      "SOC & pentest fundamentals",
    ],
  },
  {
    category: "ai-assisted development",
    skills: ["Claude Code", "MCP", "OpenCode", "agent-based workflows"],
  },
];
