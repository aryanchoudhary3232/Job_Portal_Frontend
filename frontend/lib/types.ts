export type Role = "STUDENT" | "RECRUITER" | "STAFF";

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  headline?: string;
  location?: string;
  college?: string;
  companyName?: string;
  bio?: string;
  skills?: string[];
  verificationStatus?: string;
};

export type Job = {
  id: string;
  title: string;
  companyName: string;
  location: string;
  workMode: string;
  type: string;
  salaryRange: string;
  skills: string[];
  description: string;
  status: string;
};

export type Application = {
  id: string;
  jobId: string;
  stage: string;
  note: string;
  appliedAt: string;
  job?: Job;
  student?: User;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
