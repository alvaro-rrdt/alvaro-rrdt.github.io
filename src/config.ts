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
 * TODO(phase-0): values marked TODO are placeholders — confirm before launch.
 */
export const SITE = {
  name: "Alvaro Riccardi",
  /**
   * Production origin. TODO(deploy phase): confirm final URL —
   * `https://<user>.github.io` vs custom domain.
   */
  url: "https://alvaro-rrdt.github.io",
  jobTitle: "Software Engineer · Platform Engineering · Security-Minded",
  tagline:
    "I build reliable systems by day — and take them apart in HackTheBox labs by night.",
  description:
    "Personal site of Alvaro Riccardi — software engineer focused on platform engineering, cloud infrastructure and reliability, with a practical cybersecurity edge.",
  /** Path (served from /public). TODO(launch): replace with the real CV. */
  cvPath: "/cv.pdf",
} as const;

/**
 * Social/profile links shown in the hero and footer.
 * TODO(phase-0): confirm remaining URLs below.
 */
export const SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/alvaro-rrdt" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/TODO" }, // TODO
  { label: "HackTheBox", href: "https://app.hackthebox.com/users/TODO" }, // TODO
];

/**
 * Public read-only mirror of this site's source code. The authoring instance
 * is a private Forgejo behind a tailnet, so public links point here instead.
 * Used e.g. for a "view source" footer link.
 */
export const SOURCE_REPO_URL = "https://github.com/alvaro-rrdt/Personal-website";
