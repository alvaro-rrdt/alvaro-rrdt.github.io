---
title: "Self-Hosted Homelab"
summary: "k3s on Hetzner provisioned with Pulumi (Go), self-healed through ArgoCD GitOps. CI validates every manifest with kubeconform and scans CVEs with Trivy before anything ships. Tailnet-only exposure, SOPS/age secrets, and disaster-recovery tooling to rebuild the whole platform from scratch."
summary_es: "k3s en Hetzner aprovisionado con Pulumi (Go), auto-reparado mediante GitOps con ArgoCD. La CI valida cada manifiesto con kubeconform y escanea CVEs con Trivy antes de publicar nada. Exposición solo por tailnet, secretos con SOPS/age y herramientas de recuperación para reconstruir toda la plataforma desde cero."
summary_it: "k3s su Hetzner provisionato con Pulumi (Go), self-healing tramite GitOps con ArgoCD. La CI valida ogni manifesto con kubeconform e scansiona le CVE con Trivy prima di pubblicare qualsiasi cosa. Esposizione solo via tailnet, segreti con SOPS/age e strumenti di disaster recovery per ricostruire l'intera piattaforma da zero."
stack: [k3s, Pulumi (Go), ArgoCD, Forgejo Actions, SOPS, Tailscale, Hetzner]
order: 2
synced: true
track: platform
---

> ✍️ **Write-up in progress.**
