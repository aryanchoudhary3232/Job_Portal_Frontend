export type Role = "STUDENT" | "RECRUITER" | "ADMIN" | "STAFF";

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: Role;
  headline?: string;
  location?: string;
  college?: string;
  companyName?: string;
  companyType?: string;
  employeeRange?: string;
  bio?: string;
  skills?: string[];
  verificationStatus?: string;
  isEmailVerified?: boolean;
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
  createdAt?: string;
  jobTitle?: string;
  companyName?: string;
  applicantName?: string;
  resumeFileName?: string;
  resumeMimeType?: string;
  resumeData?: string;
  details?: any;
  job?: Job;
  student?: User;
  recruiter?: User;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
