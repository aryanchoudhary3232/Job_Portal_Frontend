import Link from "next/link";

const footerLinks = [
  {
    title: "Students",
    items: [
      { label: "Search jobs", href: "/student/jobs" },
      { label: "Track applications", href: "/student/applications" },
      { label: "Create profile", href: "/register" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Recruiter login", href: "/login" },
      { label: "For recruiters", href: "/recruiter" },
      { label: "Admin access", href: "/staff" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help center", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer id="footer" className="mt-12 border-t border-[var(--outline-variant)] bg-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="NCRJobs" className="h-10 w-10" />
            <span className="text-lg font-black tracking-tight text-[var(--on-surface)] font-display">NCRJobs</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--on-surface-variant)]">
            NCR-first job portal for students. Discover verified internships, apply quickly, and track outcomes in one dashboard.
          </p>
        </div>
        {footerLinks.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--on-surface)]">{column.title}</p>
            <div className="mt-4 grid gap-3 text-sm text-[var(--on-surface-variant)]">
              {column.items.map((item) => (
                <Link key={item.label} href={item.href} className="transition hover:text-[var(--primary)]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--outline-variant)] py-4 text-center text-xs text-[var(--on-surface-variant)]">
        NCRJobs © 2026. All rights reserved.
      </div>
    </footer>
  );
}
