/**
 * Locale plumbing: the canonical locale list, path helpers that keep
 * English at the root (/) while Spanish and Italian live under /es and
 * /it, and the `t()` accessor for the UI dictionaries in ./ui.
 *
 * Toggle links and hreflang alternates both derive from
 * `hasLocalizedVersion()`, so they only ever point at pages that exist:
 * sections without locale pages (blog posts, /cv, /uses, ...) fall back
 * to the locale home instead of a 404.
 */
import { ui, type Dictionary } from "./ui";

export const LOCALES = ["en", "es", "it"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const isLocale = (value: string | undefined): value is Locale =>
  (LOCALES as readonly string[]).includes(value ?? "");

/**
 * Endonyms for the language menu: always shown in their own language,
 * never translated.
 */
export const LANGUAGE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
  it: "Italiano",
};

/** Dictionary accessor: `const T = t(locale); T.hero.openTo` */
export const t = (locale: Locale): Dictionary => ui[locale];

/** Remove a locale prefix: "/es/experience" -> "/experience", "/es" -> "/" */
export const stripLocale = (path: string): string => {
  const parts = path.split("/").filter(Boolean);
  if (parts.length > 0 && isLocale(parts[0]) && parts[0] !== DEFAULT_LOCALE) {
    return "/" + parts.slice(1).join("/");
  }
  const rest = parts.join("/");
  return rest ? `/${rest}` : "/";
};

/** Prefix a locale-less path for a target locale ("en" stays at the root). */
export const localePath = (path: string, locale: Locale): string => {
  const bare = stripLocale(path);
  if (locale === DEFAULT_LOCALE) return bare;
  return bare === "/" ? `/${locale}` : `/${locale}${bare}`;
};

/** Top-level sections with translated pages in the current pass. */
const LOCALIZED_SECTIONS = new Set(["", "experience"]);

/**
 * Does an equivalent page exist for every locale? Drives the header
 * toggle and the hreflang alternates: untranslated pages never emit
 * links that would 404.
 */
export const hasLocalizedVersion = (path: string): boolean => {
  const bare = stripLocale(path);
  const section = bare.split("/").filter(Boolean)[0] ?? "";
  return LOCALIZED_SECTIONS.has(section);
};

export interface Alternate {
  locale: Locale;
  /** Absolute URL for the hreflang link tag */
  href: string;
}

/**
 * hreflang set for a page path, or [] when the page has no locale
 * equivalents (x-default handling stays in BaseHead).
 */
export const alternatesFor = (path: string, siteUrl: string): Alternate[] => {
  if (!hasLocalizedVersion(path)) return [];
  const bare = stripLocale(path);
  return LOCALES.map((locale) => ({
    locale,
    href: new URL(localePath(bare, locale), siteUrl).href,
  }));
};

/** Content-collection entry ids carry a ".es"/".it" suffix per locale. */
export const experienceSlug = (id: string): string => id.split(".")[0];
