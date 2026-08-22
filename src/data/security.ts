export type LabStatus = "planned" | "active" | "completed";

export interface ProLab {
  name: string;
  /** Difficulty tier as advertised by HackTheBox */
  tier: "intro" | "intermediate" | "advanced";
  status: LabStatus;
  note?: string;
}

/**
 * Single source of truth for the security track section.
 * TODO(phase-0): fill real stats/rank/current focus, adjust lab statuses.
 */
export const SECURITY = {
  profileUrl: "https://profile.hackthebox.com/profile/019e45c5-9186-721d-8a8c-488f1315b045",

  /**
   * Current learning focus, shown as a live list.
   * TODO(phase-0): replace placeholders with the actual module/machine names.
   */
  nowStudying: [
    "CJCA path · modules in progress",
    "TODO: current machine or module",
  ],

  /**
   * TODO(phase-0): confirm real numbers before launch.
   */
  stats: [
    { label: "machines owned", value: "TODO" },
    { label: "challenges solved", value: "TODO" },
    { label: "rank", value: "TODO" },
  ],

  /**
   * Pro Labs are multi-machine networks (often full Active Directory
   * environments) that must be entirely compromised.
   */
  proLabs: [
    {
      name: "Dante",
      tier: "intro",
      status: "planned",
      note: "the classic entry point",
    },
    {
      name: "Zephyr",
      tier: "intermediate",
      status: "planned",
      note: "windows & AD focus",
    },
    {
      name: "Offshore",
      tier: "advanced",
      status: "planned",
      note: "the long-term goal",
    },
  ] satisfies ProLab[],
};
