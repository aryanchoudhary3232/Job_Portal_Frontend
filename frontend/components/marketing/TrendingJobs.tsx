import Link from "next/link";

const jobs = [
  {
    title: "Frontend Intern",
    company: "Astra Labs",
    location: "Noida",
    experience: "Fresher",
    salary: "10k-18k / month",
    tags: ["React", "UI", "Internship"],
  },
  {
    title: "Data Analyst Trainee",
    company: "InsightHub",
    location: "Gurgaon",
    experience: "0-1 years",
    salary: "4-6 LPA",
    tags: ["SQL", "Excel", "Analytics"],
  },
  {
    title: "Marketing Associate",
    company: "Campusify",
    location: "Delhi",
    experience: "Fresher",
    salary: "3-4.5 LPA",
    tags: ["Content", "Social", "Brand"],
  },
  {
    title: "UI/UX Intern",
    company: "Nova Design",
    location: "Remote",
    experience: "Fresher",
    salary: "12k-20k / month",
    tags: ["Figma", "Design", "Internship"],
  },
  {
    title: "Operations Executive",
    company: "GrowStack",
    location: "Noida",
    experience: "0-1 years",
    salary: "3.5-5 LPA",
    tags: ["Ops", "Process", "Support"],
  },
  {
    title: "Backend Intern",
    company: "CloudAxis",
    location: "Gurgaon",
    experience: "Fresher",
    salary: "15k-22k / month",
    tags: ["Node.js", "API", "Internship"],
  },
];

export function TrendingJobs() {
  return (
    <section id="jobs" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--primary)]">Trending jobs</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[var(--on-surface)] font-display">Latest student openings</h2>
        </div>
        <Link href="/student/jobs" className="text-sm font-semibold text-[var(--primary)]">View all jobs</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <article key={`${job.title}-${job.company}`} className="card-surface rounded-[24px] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--on-surface)]">{job.title}</h3>
                <p className="mt-1 text-sm font-semibold text-[var(--on-surface-variant)]">{job.company} • {job.location}</p>
              </div>
              <span className="rounded-full bg-[var(--primary-fixed)] px-3 py-1 text-[11px] font-bold text-[var(--primary)]">{job.experience}</span>
            </div>
            <p className="mt-4 text-sm font-semibold text-[var(--on-surface)]">{job.salary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[var(--outline-variant)] px-3 py-1 text-xs font-semibold text-[var(--on-surface-variant)]">
                  {tag}
                </span>
              ))}
            </div>
            <button className="mt-5 w-full rounded-xl border border-[var(--outline-variant)] px-4 py-2 text-sm font-semibold text-[var(--primary)] transition hover:border-[var(--primary)]">
              Apply now
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
