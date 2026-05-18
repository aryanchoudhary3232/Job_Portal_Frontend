import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, ShieldCheck, UserRoundSearch } from "lucide-react";

const cards = [
  { title: "Student", href: "/student", icon: UserRoundSearch, text: "Apply to NCR roles, track shortlists, and keep your profile ready for offers." },
  { title: "Recruiter", href: "/recruiter/dashboard", icon: BriefcaseBusiness, text: "Post NCR openings, shortlist talent, and coordinate interviews in one place." },
  { title: "Staff", href: "/staff", icon: ShieldCheck, text: "Audit outcomes, verify recruiters, and track selection settlement milestones." },
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
            className="group enter-fade-up block rounded-[40px] border border-slate-200/70 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(15,23,42,0.12)]"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-fixed)] text-[var(--primary)] transition-colors duration-500 group-hover:bg-[var(--primary)] group-hover:text-white">
              <Icon className="h-7 w-7" />
            </div>
            <h2 className="mt-8 text-2xl font-black text-slate-900 font-display">{card.title}</h2>
            <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-500">{card.text}</p>
            <div className="mt-10 flex items-center gap-2 text-sm font-bold text-[var(--primary)] transition-all group-hover:gap-4">
              Enter Portal <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        );
      })}
    </section>
  );
}
