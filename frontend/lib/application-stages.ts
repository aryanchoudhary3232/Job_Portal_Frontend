export const STAGE_LABELS: Record<string, string> = {
  APPLIED: "Applied",
  SHORTLISTED: "Shortlisted",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  HIRED: "Selected",
  REJECTED: "Rejected",
};

export const RECRUITER_STAGE_ACTIONS = [
  { stage: "SHORTLISTED", label: "Shortlist" },
  { stage: "INTERVIEW", label: "Interview" },
  { stage: "OFFER", label: "Offer" },
  { stage: "HIRED", label: "Selected" },
  { stage: "REJECTED", label: "Rejected" },
] as const;

export function stageLabel(stage: string): string {
  return STAGE_LABELS[stage] ?? stage;
}
