/**
 * Minimal typing for the Umami tracker global, injected by the analytics
 * script rendered from BaseHead when ANALYTICS_SRC and ANALYTICS_WEBSITE_ID
 * are configured (see UMAMI.md). The global is absent whenever analytics
 * are disabled or the script is blocked, so guard every access.
 */
interface Window {
  umami?: {
    track: (event: string, eventData?: Record<string, unknown>) => void;
  };
}
