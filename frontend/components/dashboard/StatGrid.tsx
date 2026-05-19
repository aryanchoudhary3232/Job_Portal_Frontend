export function StatGrid({
  items,
}: {
  items: Array<{ label: string; value: string | number; accent?: string }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article key={item.label} className="card-surface rounded-[26px] p-6">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--on-surface-variant)]">{item.label}</p>
          <p className={`mt-3 text-[2.4rem] font-black leading-none text-[var(--on-surface)] ${item.accent || ""}`}>{item.value}</p>
        </article>
      ))}
    </div>
  );
}
