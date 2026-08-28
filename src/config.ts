/**
 * Single source of truth for site identity and links.
 * Components must read personal data from here instead of hardcoding it,
 * so updates happen in exactly one place.
 */

export interface SocialLink {
  label: string;
  href: string;
}

/**
 * Values marked TODO are placeholders pending confirmation.
 */
export const SITE = {
  name: "Alvaro Riccardi",
  /**
   * Production origin. Confirmed 2026-08-25: user-site repo, served from
   * the root of https://alvaro-rrdt.github.io (no base path).
   */
  url: "https://alvaro-rrdt.github.io",
  /**
   * Localized identity strings. English is the source of truth; es/it
   * translations live here so every consumer stays in sync (UI
   * chrome strings that are NOT personal data live in src/i18n/ui.ts).
   */
  jobTitle: {
    en: "Platform Engineer · Cloud Infrastructure & Reliability · Security-Minded",
    es: "Ingeniero de Plataformas · Infraestructura Cloud y Fiabilidad · Mentalidad de Seguridad",
    it: "Ingegnere di Piattaforme · Infrastruttura Cloud e Affidabilità · Orientato alla Sicurezza",
  },
  /** Where I am based, shown in the hero and on the CV sheet. */
  location: {
    en: "Madrid, Spain",
    es: "Madrid, España",
    it: "Madrid, Spagna",
  },
  /** Geographic scope of the job search, shown in the hero availability line. */
  availabilityScope: {
    en: "Europe & Switzerland",
    es: "Europa y Suiza",
    it: "Europa e Svizzera",
  },
  /** Public phone number for the CV sheet only (recruiters). */
  phone: "+34 623 965 701",
  tagline: {
    en: "I build reliable systems by day and take them apart in HackTheBox labs by night.",
    es: "De día construyo sistemas fiables y de noche los desmonto en los laboratorios de HackTheBox.",
    it: "Di giorno costruisco sistemi affidabili e di notte li smonto nei lab di HackTheBox.",
  },
  description: {
    en: "Personal site of Alvaro Riccardi, platform engineer focused on cloud infrastructure and reliability with a security mindset: GCP and AWS as code, Kubernetes, and a self-hosted homelab with full write-ups.",
    es: "Web personal de Alvaro Riccardi, ingeniero de plataformas enfocado en infraestructura cloud y fiabilidad con mentalidad de seguridad: GCP y AWS como código, Kubernetes y un homelab autoalojado con write-ups completos.",
    it: "Sito personale di Alvaro Riccardi, ingegnere di piattaforme focalizzato su infrastruttura cloud e affidabilità con mentalità security: GCP e AWS come codice, Kubernetes e un homelab self-hosted con write-up completi.",
  },
  /** Path served from /public. TODO(launch): replace with the real CV. */
  cvPath: "/cv.pdf",
  /** Public contact address, shown in footer/CV/palette. */
  email: "alvaro.rm.rdt@gmail.com",
} as const;

/**
 * Social/profile links shown in the hero and footer.
 */
export const SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/alvaro-rrdt" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alvarorrdt/" },
  {
    label: "HackTheBox",
    // canonical profile URL (utm tracking param stripped)
    href: "https://profile.hackthebox.com/profile/019e45c5-9186-721d-8a8c-488f1315b045",
  },
];

/**
 * Public read-only mirror of this site's source code. The authoring instance
 * is a private Forgejo behind a tailnet, so public links point here instead.
 * Used e.g. for a "view source" footer link.
 */
export const SOURCE_REPO_URL = "https://github.com/alvaro-rrdt/alvaro-rrdt.github.io";

/**
 * Public status endpoint fetched ONCE at build time to bake the homepage
 * status strip into static HTML (zero runtime JS). Leave empty ("") to hide
 * the strip.
 * TODO(phase-0): e.g. an Uptime Kuma status-page URL, anything returning
 * HTTP 200 when healthy.
 */
export const STATUS_URL = "";

/**
 * Contact form endpoint: a Cloudflare Worker (worker/contact/) that
 * forwards submissions to Telegram. Leave empty ("") until the worker is
 * deployed; the /contact page then shows the email CTA instead of the
 * form. Fill with the workers.dev URL after `wrangler deploy`.
 * Example: "https://alvaro-contact.<subdomain>.workers.dev"
 */
export const CONTACT_ENDPOINT = "";
