import Link from "next/link";
import { ArrowRight, BadgeCheck, FileText, GraduationCap } from "lucide-react";

const cards = [
  { title: "Create profile", href: "/register", icon: GraduationCap, text: "Build a student profile that recruiters can trust and verify quickly." },
  { title: "Apply smart", href: "/student/jobs", icon: FileText, text: "Apply to NCR internships and entry roles with a clean one-tap flow." },
  { title: "Track results", href: "/student/applications", icon: BadgeCheck, text: "See shortlist, interview, and offer updates in one simple dashboard." },
];

export function RoleGrid() {
  return (
    <section className="grid gap-8 md:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.title}
            href={card.href}
            className="group enter-fade-up block rounded-[40px] border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-10 shadow-[var(--shadow-soft)] transition duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-strong)]"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-fixed)] text-[var(--primary)] transition-colors duration-500 group-hover:bg-[var(--primary)] group-hover:text-white">
              <Icon className="h-7 w-7" />
            </div>
            <h2 className="mt-8 text-2xl font-black text-[var(--on-surface)] font-display">{card.title}</h2>
            <p className="mt-3 text-[15px] font-medium leading-relaxed text-[var(--on-surface-variant)]">{card.text}</p>
            <div className="mt-10 flex items-center gap-2 text-sm font-bold text-[var(--primary)] transition-all group-hover:gap-4">
              Enter Portal <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        );
      })}
    </section>
  );
}
