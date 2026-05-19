const features = [
  ["Student-first listings", "Internships and entry roles curated for NCR students."],
  ["Clean application tracker", "Know exactly where you stand at every stage."],
  ["Verified recruiters", "Apply with confidence to approved companies."],
];

export function FeatureGrid() {
  return (
    <section className="glass-effect rounded-[40px] px-6 py-10 shadow-[0_20px_60px_rgba(35,28,78,0.08)] ring-1 ring-[var(--outline-variant)] md:px-10">
      <div className="mb-10 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--primary)]">Capabilities</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-[var(--on-surface)] md:text-5xl font-display">Everything you need to run the NCR hiring flow well.</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {features.map(([title, text], index) => (
          <article key={title} className="enter-fade-up rounded-[30px] border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] px-6 py-7 shadow-[0_18px_40px_rgba(35,28,78,0.06)]" style={{ animationDelay: `${index * 140}ms` }}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--on-surface-variant)]">Feature</p>
            <h3 className="mt-4 text-xl font-black text-[var(--on-surface)] font-display">{title}</h3>
            <p className="mt-3 text-sm font-medium leading-7 text-[var(--on-surface-variant)]">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
