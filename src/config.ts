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
  jobTitle: "Software Engineer · Platform Engineering · Security-Minded",
  tagline:
    "I build reliable systems by day and take them apart in HackTheBox labs by night.",
  description:
    "Personal site of Alvaro Riccardi, software engineer focused on platform engineering, cloud infrastructure and reliability, with a practical cybersecurity edge.",
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
