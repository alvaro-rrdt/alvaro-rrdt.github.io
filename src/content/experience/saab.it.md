---
company: Saab A/S
role: Tirocinante Ingegnere di Piattaforme
period: "Ott 2023 - Mar 2024"
location: "Sønderborg, Danimarca"
order: 3
locale: it
award: "🏆 Miglior Tirocinio di Ingegneria dell'Anno · Accademie Nazionali Danesi"
# Owner reminders for the deep-dive page (private notes, never rendered):
# - Add diagrams of the work: VoIP failover analysis, load-test results,
#   and the Active/Active target architecture on EKS.
# - Add photos from the internship (Saab deployment department,
#   Sønderborg) and from the award ceremony.
summary: "Ho diagnosticato debolezze di failover e scalabilità in un sistema VoIP on-prem mission-critical costruendo un framework di test con Terraform/Ansible e test di carico con SIPp, portando alla luce gap di failover di diversi secondi; poi ne ho progettato la sostituzione cloud-native Active/Active su AWS EKS con load balancing con session affinity per lo stato delle chiamate UDP di lunga durata."
highlights:
  - "Ho costruito un framework di test con Terraform/Ansible/Docker per un sistema VoIP Active/Standby on-prem (vSphere, VRRP), con test di carico tramite SIPp e metriche strumentate su Prometheus/Grafana."
  - "Ho messo in luce gap di failover di diversi secondi e un collo di bottiglia su singolo nodo che il design esistente non poteva superare."
  - "Ho progettato un'alternativa cloud-native Active/Active su AWS EKS, usando un Network Load Balancer con session affinity per preservare lo stato delle chiamate UDP di lunga durata e permettere lo scaling orizzontale."
  - "Ho presentato la proposta tecnica al reparto deployment; il tirocinio è stato il progetto finale del mio AP degree in Computer Science."
  - "Ho vinto il premio di Miglior Tirocinio di Ingegneria dell'Anno delle Accademie Nazionali Danesi, oltre a un endorsement pubblico dal Capo del Platform Engineering di Saab; il mio mentore, l'architetto di sistema a capo del reparto deployment, ha partecipato alla cerimonia per rappresentarmi."
  - "Ho conosciuto dall'interno l'ambiente di sicurezza on-prem di un'azienda di difesa: più workshop di sicurezza fisica e digitale, dalla disciplina degli accessi agli impianti alla gestione di sistemi e dati sensibili."
tech: [AWS EKS, Terraform, Ansible, Docker, SIPp, Prometheus, Grafana]
---

![Nuovi assunti davanti al logo Saab Technologies all'ingresso di Sønderborg; sono il settimo partendo da sinistra](../../assets/experience/saab-entrance.jpeg)

*La foto dei nuovi assunti all'ingresso di Sønderborg. Sono il settimo partendo da sinistra.*

> 🔒 **Nota NDA:** i dettagli oltre a quelli mostrati qui sono limitati da un NDA ancora in vigore. Tutto ciò che è pubblicato in questa pagina è condivisibile apertamente.

> ✍️ **Analisi dettagliata in preparazione.**
