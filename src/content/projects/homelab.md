---
title: "Self-Hosted Homelab"
summary: "k3s on Hetzner provisioned with Pulumi (Go), self-healed through ArgoCD GitOps. CI validates every manifest with kubeconform and scans CVEs with Trivy before anything ships. Tailnet-only exposure, SOPS/age secrets, and disaster-recovery tooling to rebuild the whole platform from scratch."
stack: [k3s, Pulumi (Go), ArgoCD, Forgejo Actions, SOPS, Tailscale, Hetzner]
order: 2
synced: true
track: platform
---

> ✍️ **Write-up in progress.**
