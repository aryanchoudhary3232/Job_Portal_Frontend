const TECHNICAL_PATTERNS = [
  /prisma/i,
  /invocation/i,
  /passwordhash/i,
  /unexpected error/i,
  /failed to fetch/i,
  /networkerror/i,
  /econnrefused/i,
];

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const FIELD_HINTS: Record<string, string> = {
  title: "Job title",
  companyName: "Company",
  location: "Location",
  description: "Description",
  skills: "Skills",
  note: "Note",
  phone: "Phone",
};

function humanizeSegment(segment: string): string {
  const trimmed = segment.trim();
  if (!trimmed) return "";

  const tooSmallString = trimmed.match(
    /Too small: expected string to have >=(\d+) characters/i,
  );
  if (tooSmallString) {
    return `Too short (min ${tooSmallString[1]} characters)`;
  }

  const tooSmallArray = trimmed.match(
    /Too small: expected array to have >=(\d+) items/i,
  );
  if (tooSmallArray) {
    return `Add at least ${tooSmallArray[1]} item(s)`;
  }

  for (const [key, label] of Object.entries(FIELD_HINTS)) {
    if (trimmed.toLowerCase().includes(key.toLowerCase())) {
      return trimmed.replace(new RegExp(key, "i"), label);
    }
  }

  if (trimmed.includes(":")) {
    return trimmed;
  }

  return trimmed;
}

export function humanizeApiMessage(message: string): string {
  if (!message) return "Request failed";

  if (TECHNICAL_PATTERNS.some((pattern) => pattern.test(message))) {
    return "Server unavailable. Try again in a moment.";
  }

  const parts = message.split(/[,•]/).map(humanizeSegment).filter(Boolean);
  return parts.length ? parts.join(" • ") : message;
}

export function getErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return humanizeApiMessage(error.message) || fallback;
  }
  return fallback;
}
