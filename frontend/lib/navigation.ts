import { BarChart3, BriefcaseBusiness, CreditCard, FolderKanban, GraduationCap, Home, Settings, ShieldCheck, Sparkles, Users2 } from "lucide-react";

export const navigation = {
  STUDENT: [
    { href: "/student", label: "Overview", icon: Home },
    { href: "/student/jobs", label: "Jobs", icon: BriefcaseBusiness },
    { href: "/student/applications", label: "Applications", icon: FolderKanban },
    { href: "/student/ai-suite", label: "AI Suite", icon: Sparkles },
    { href: "/student/skills", label: "Skills", icon: GraduationCap },
    { href: "/student/settings", label: "Settings", icon: Settings },
  ],
  RECRUITER: [
    { href: "/recruiter/dashboard", label: "Dashboard", icon: Home },
    { href: "/recruiter/jobs", label: "Jobs", icon: BriefcaseBusiness },
    { href: "/recruiter/applications", label: "Applications", icon: FolderKanban },
    { href: "/recruiter/ai-suite", label: "AI Tools", icon: Sparkles },
    { href: "/recruiter/pricing", label: "Plans & Pricing", icon: CreditCard },
    { href: "/recruiter/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/recruiter/users", label: "Talent", icon: Users2 },
    { href: "/recruiter/settings", label: "Settings", icon: Settings },
  ],
  ADMIN: [
    { href: "/admin", label: "Overview", icon: Home },
    { href: "/admin/candidates", label: "Candidates", icon: Users2 },
    { href: "/admin/jobs", label: "Jobs", icon: BriefcaseBusiness },
    { href: "/admin/verification", label: "Verification", icon: ShieldCheck },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ],
};
