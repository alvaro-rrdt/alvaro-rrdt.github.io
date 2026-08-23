export type CertStatus = "in-progress" | "planned" | "earned";

export interface Cert {
  name: string;
  fullName: string;
  issuer: string;
  status: CertStatus;
  /** Only meaningful for in-progress certs. */
  progress?: number;
  note?: string;
  /** Official program page, linked from cards so people can read what it is */
  url?: string;
}

/**
 * Certification journey in intended completion order,
 * shown on the homepage board and the CV page.
 * TODO(phase-0): progress % and verification URLs when earned.
 */
export const CERTS: Cert[] = [
  {
    name: "CJCA",
    fullName: "Certified Junior Cybersecurity Associate",
    issuer: "HackTheBox",
    status: "in-progress",
    progress: 55,
    note: "modules in progress",
    url: "https://academy.hackthebox.com/preview/certifications/htb-certified-junior-cybersecurity-associate",
  },
  {
    name: "CKA",
    fullName: "Certified Kubernetes Administrator",
    issuer: "CNCF",
    status: "planned",
    note: "next up after CJCA",
    url: "https://www.cncf.io/training/certification/cka/",
  },
  {
    name: "CDSA",
    fullName: "Certified Defensive Security Analyst",
    issuer: "HackTheBox",
    status: "planned",
    note: "then defensive security",
    url: "https://academy.hackthebox.com/preview/certifications/htb-certified-defensive-security-analyst",
  },
  {
    name: "CPTS",
    fullName: "Certified Penetration Testing Specialist",
    issuer: "HackTheBox",
    status: "planned",
    note: "the long game",
    url: "https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist",
  },
];
