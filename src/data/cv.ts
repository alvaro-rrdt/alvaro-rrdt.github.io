/**
 * CV-only data that does not fit the other collections.
 * Consumed by /cv (the in-site CV viewer).
 */
export const CV = {
  /** Short profile paragraph at the top of the sheet. */
  profile:
    "Infrastructure and platform engineer, most comfortable today in Python and Go, with production experience managing cloud environments as code (GCP, AWS, Terraform), container orchestration (Kubernetes), CI/CD and observability tooling (Datadog, Prometheus, Grafana), and a security mindset throughout. Diagnosed a critical failover flaw in a mission-critical VoIP system at Saab and designed its cloud-native Active/Active replacement on AWS EKS, work that won the Danish National Academies' Best Engineering Internship of the Year. Outside of work I run a self-hosted homelab to sharpen platform engineering and SRE skills hands on, with full write-ups and postmortems on this site.",

  education: [
    {
      degree: "Bachelor of Software Development (Professional Bachelor)",
      school: "Business Academy Southwest",
      period: "2021 - Oct 2025",
    },
  ],

  languages: [
    { name: "Spanish", level: "Native" },
    { name: "English", level: "C2 spoken, C1 written" },
    { name: "Italian", level: "Learning" },
  ],
};

/**
 * Flip to true once public/cv.pdf exists so the download button appears.
 * Until then the /cv page suggests using print-to-PDF instead.
 */
export const CV_PDF_READY = false;
