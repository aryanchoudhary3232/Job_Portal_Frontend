import { Search } from "lucide-react";

export function Hero() {
  return (
    <section className="rounded-[36px] bg-white/80 p-6 shadow-[0_20px_60px_rgba(44,22,84,0.08)] ring-1 ring-[var(--outline-variant)] md:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--primary)]">Student jobs in NCR</p>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-[var(--on-surface)] sm:text-5xl lg:text-6xl font-display">
            Find internships and first jobs faster.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--on-surface-variant)]">
            One clean place to discover verified openings, apply with your student profile, and track every update.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["2k+", "Student openings"],
              ["450+", "Verified companies"],
              ["1 dashboard", "Track all applications"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-[var(--outline-variant)] bg-white px-4 py-4">
                <p className="text-2xl font-black text-[var(--on-surface)]">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--on-surface-variant)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <form className="card-surface rounded-[28px] p-6">
          <p className="text-sm font-bold text-[var(--on-surface)]">Search internships & entry roles</p>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">
              Role or skills
              <input
                type="text"
                placeholder="Frontend, UI/UX, Data"
                className="h-12 w-full rounded-xl border border-[var(--outline-variant)] bg-white px-4 text-sm text-[var(--on-surface)] outline-none focus:border-[var(--primary)]"
              />
            </label>
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">
              Location
              <input
                type="text"
                placeholder="Noida, Gurgaon, Delhi"
                className="h-12 w-full rounded-xl border border-[var(--outline-variant)] bg-white px-4 text-sm text-[var(--on-surface)] outline-none focus:border-[var(--primary)]"
              />
            </label>
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">
              Experience
              <select className="h-12 w-full rounded-xl border border-[var(--outline-variant)] bg-white px-4 text-sm text-[var(--on-surface)] outline-none focus:border-[var(--primary)]">
                <option>Fresher</option>
                <option>0-1 years</option>
                <option>1-2 years</option>
                <option>2-3 years</option>
              </select>
            </label>
            <button
              type="button"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(108,43,217,0.3)]"
            >
              <Search className="h-4 w-4" />
              Search jobs
            </button>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-[var(--primary)]">
            {["UI/UX", "Frontend", "Data Analyst", "Marketing"].map((item) => (
              <span key={item} className="rounded-full bg-[var(--primary-fixed)] px-3 py-1">{item}</span>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
