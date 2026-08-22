/**
 * CV-only data that does not fit the other collections.
 * Consumed by /cv (the in-site CV viewer).
 */
export const CV = {
  /** Short profile paragraph at the top of the sheet. */
  profile:
    "Fresh-graduate software engineer focused on platform engineering: cloud infrastructure on GCP and AWS with Terraform, GitOps delivery with ArgoCD, and reliability habits sharpened on a self-hosted k3s homelab. Security-minded by practice, with active HackTheBox certification work.",

  /**
   * TODO(phase-0): fill in real education once you share it.
   */
  education: [
    {
      degree: "Degree name (TODO)",
      school: "University (TODO)",
      period: "TODO years",
    },
  ],

  /**
   * TODO(phase-0): confirm proficiency levels.
   */
  languages: [
    { name: "Spanish", level: "Native" },
    { name: "Italian", level: "Native" },
    { name: "English", level: "Professional" },
  ],
};

/**
 * Flip to true once public/cv.pdf exists so the download button appears.
 * Until then the /cv page suggests using print-to-PDF instead.
 */
export const CV_PDF_READY = false;
