---
company: Saab A/S
role: Ingeniero de Plataformas en prácticas
period: "Oct 2023 - Mar 2024"
location: "Sønderborg, Dinamarca"
order: 3
locale: es
award: "🏆 Mejor Pasantía de Ingeniería del Año · Academias Nacionales Danesas"
# Owner reminders for the deep-dive page (private notes, never rendered):
# - Add diagrams of the work: VoIP failover analysis, load-test results,
#   and the Active/Active target architecture on EKS.
# - Add photos from the internship (Saab deployment department,
#   Sønderborg) and from the award ceremony.
summary: "Diagnostiqué debilidades de failover y escalabilidad en un sistema VoIP on-prem de misión crítica construyendo un framework de pruebas con Terraform/Ansible y haciendo pruebas de carga con SIPp, que expusieron huecos de failover de varios segundos; después diseñé su reemplazo cloud-nativo Activo/Activo en AWS EKS con balanceo con afinidad de sesión para preservar el estado de las llamadas UDP de larga duración."
highlights:
  - "Construí un framework de pruebas con Terraform/Ansible/Docker para un sistema VoIP Activo/Standby on-prem (vSphere, VRRP), con pruebas de carga mediante SIPp y métricas instrumentadas en Prometheus/Grafana."
  - "Puse de manifiesto huecos de failover de varios segundos y un cuello de botella de nodo único que el diseño existente no podía superar."
  - "Diseñé una alternativa cloud-nativa Activo/Activo en AWS EKS, usando un Network Load Balancer con afinidad de sesión para preservar el estado de las llamadas UDP de larga duración y permitir el escalado horizontal."
  - "Presenté la propuesta técnica al departamento de despliegue; la pasantía fue el proyecto final de mi AP degree en Computer Science."
  - "Gané el premio a la Mejor Pasantía de Ingeniería del Año de las Academias Nacionales Danesas, junto con una recomendación pública del Head of Platform Engineering de Saab; mi mentor, el arquitecto de sistemas que dirigía el departamento de despliegue, acudió a la ceremonia para representarme."
  - "Aprendí de primera mano el entorno de seguridad on-prem de una empresa de defensa: múltiples talleres de seguridad física y digital, desde la disciplina de acceso a las instalaciones hasta el manejo de sistemas y datos sensibles."
tech: [AWS EKS, Terraform, Ansible, Docker, SIPp, Prometheus, Grafana]
---

![Nuevos empleados frente al rótulo de Saab Technologies en la entrada de Sønderborg; soy el séptimo empezando por la izquierda](../../assets/experience/saab-entrance.jpeg)

*La foto de los nuevos empleados en la entrada de Sønderborg. Soy el séptimo empezando por la izquierda.*

> 🔒 **Nota de NDA:** los detalles más allá de lo que aparece aquí están limitados por un NDA en vigor. Todo lo compartido en esta página se puede compartir abiertamente.

> ✍️ **Análisis detallado en preparación.**
