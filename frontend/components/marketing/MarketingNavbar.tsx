import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Jobs", href: "#roles" },
  { label: "Companies", href: "#features" },
];

export function MarketingNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 shadow-[0_12px_30px_rgba(44,22,84,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="NCRJobs" width={40} height={40} className="h-10 w-10" />
          <span className="text-lg font-black tracking-tight text-[var(--on-surface)] font-display">NCRJobs</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-[var(--on-surface-variant)] md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[var(--on-surface)]">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full border border-[var(--outline-variant)] px-4 py-2 text-sm font-semibold text-[var(--on-surface)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-[#efe6ff] px-6 py-2.5 text-sm font-extrabold uppercase tracking-[0.08em] text-[#3b1078] shadow-[0_14px_30px_rgba(108,43,217,0.2)] ring-1 ring-[#3b1078] transition hover:bg-[#e3d7ff]"
          >
            Register
          </Link>
          <Link
            href="/recruiter"
            className="hidden rounded-full bg-[var(--primary-fixed)] px-4 py-2 text-sm font-semibold text-[var(--primary)] transition hover:bg-white sm:inline-flex"
          >
            For recruiters
          </Link>
        </div>
      </div>
    </header>
  );
}
