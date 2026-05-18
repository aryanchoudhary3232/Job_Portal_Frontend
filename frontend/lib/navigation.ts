import { BarChart3, BriefcaseBusiness, FolderKanban, GraduationCap, Home, Settings, ShieldCheck, Users2 } from "lucide-react";

export const navigation = {
  STUDENT: [
    { href: "/student", label: "Overview", icon: Home },
    { href: "/student/jobs", label: "Jobs", icon: BriefcaseBusiness },
    { href: "/student/applications", label: "Applications", icon: FolderKanban },
    { href: "/student/skills", label: "Skills", icon: GraduationCap },
    { href: "/student/settings", label: "Settings", icon: Settings },
  ],
  RECRUITER: [
    { href: "/recruiter/dashboard", label: "Dashboard", icon: Home },
    { href: "/recruiter/jobs", label: "Jobs", icon: BriefcaseBusiness },
    { href: "/recruiter/applications", label: "Applications", icon: FolderKanban },
    { href: "/recruiter/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/recruiter/users", label: "Talent", icon: Users2 },
    { href: "/recruiter/settings", label: "Settings", icon: Settings },
  ],
  STAFF: [
    { href: "/staff", label: "Overview", icon: Home },
    { href: "/staff/candidates", label: "Candidates", icon: Users2 },
    { href: "/staff/jobs", label: "Jobs", icon: BriefcaseBusiness },
    { href: "/staff/verification", label: "Verification", icon: ShieldCheck },
    { href: "/staff/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/staff/settings", label: "Settings", icon: Settings },
  ],
};
