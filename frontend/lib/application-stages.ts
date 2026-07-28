export const STAGE_LABELS: Record<string, string> = {
  APPLIED: "Applied",
  SHORTLISTED: "Shortlisted",
  INTERVIEW: "Interview Scheduled",
  OFFER: "Offer Extended & Hired",
  HIRED: "Selected & Hired 🎉",
  REJECTED: "Rejected",
};

export const RECRUITER_STAGE_ACTIONS = [
  { stage: "SHORTLISTED", label: "Shortlist" },
  { stage: "INTERVIEW", label: "Schedule Interview" },
  { stage: "OFFER", label: "Issue Offer Letter" },
] as const;

export function stageLabel(stage: string): string {
  return STAGE_LABELS[stage] ?? stage;
}
