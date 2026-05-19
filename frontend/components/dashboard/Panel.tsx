import type { ReactNode } from "react";

export function Panel({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="card-surface rounded-[28px] p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[1.35rem] font-black tracking-[-0.03em] text-[var(--on-surface)] font-display">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm font-medium text-[var(--on-surface-variant)]">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
