---
company: Saab A/S
role: Platform Engineer Intern
period: "Oct 2023 - Mar 2024"
location: "Sønderborg, Denmark"
order: 3
award: "🏆 Best Engineering Internship of the Year · Danish National Academies"
# Owner reminders for the deep-dive page (private notes, never rendered):
# - Add diagrams of the work: VoIP failover analysis, load-test results,
#   and the Active/Active target architecture on EKS.
# - Add photos from the internship (Saab deployment department,
#   Sønderborg) and from the award ceremony.
# - Story context: joined Saab for the final project of the AP degree in
#   Computer Science (Sønderborg, 2.5 years), which came before the
#   Bachelor of Software Development (Esbjerg). Mentor was the system
#   architect and head of the deployment department and attended the
#   ceremony to represent me.
summary: "Diagnosed failover and scalability weaknesses in a mission-critical on-prem VoIP system by building a Terraform/Ansible test framework and load-testing with SIPp, exposing multi-second failover gaps; then designed its cloud-native Active/Active replacement on AWS EKS with session-affinity load balancing for long-lived UDP call state."
highlights:
  - "Built a Terraform/Ansible/Docker test framework for an on-prem Active/Standby VoIP system (vSphere, VRRP), load-testing with SIPp and instrumenting Prometheus/Grafana metrics."
  - "Exposed multi-second failover gaps and a single-node bottleneck that the existing design could not survive."
  - "Designed a cloud-native Active/Active alternative on AWS EKS, using a Network Load Balancer with session affinity to preserve long-lived UDP call state and allow horizontal scaling."
  - "Presented the technical case to the deployment department; the internship ran as the final project of my AP degree in Computer Science."
  - "Won Best Engineering Internship of the Year from the Danish National Academies, plus a public endorsement from Saab's Head of Platform Engineering; my mentor, the system architect who headed the deployment department, joined the award ceremony to represent me."
tech: [AWS EKS, Terraform, Ansible, Docker, SIPp, Prometheus, Grafana]
---

> ✍️ **Deep-dive in progress.**
