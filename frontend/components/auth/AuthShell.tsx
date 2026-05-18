import type { ReactNode } from "react";
import Link from "next/link";

export function AuthShell({
  eyebrow,
  title,
  description,
  stickerTitle,
  stickerSubtitle,
  stickerImage,
  stickerCta,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  stickerTitle?: string;
  stickerSubtitle?: string;
  stickerImage?: string;
  stickerCta?: string;
  children: ReactNode;
}) {
  const sticker = stickerImage ? (
    <div className="rounded-[32px] bg-white p-4 shadow-[0_25px_70px_rgba(17,24,39,0.18)] ring-1 ring-[var(--outline-variant)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="NCRJobs" className="h-9 w-9" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">NCRJobs</p>
            <p className="text-sm font-bold text-slate-900 font-display">{stickerTitle}</p>
          </div>
        </div>
        <span className="rounded-full bg-[var(--primary-fixed)] px-3 py-1 text-[10px] font-bold text-[var(--primary)]">
          {stickerCta || "Back to website"}
        </span>
      </div>
      <div className="mt-4 rounded-[24px] bg-[#f4f6ff] p-3">
        <img src={stickerImage} alt={stickerTitle || "NCRJobs sticker"} className="w-full rounded-[18px] object-cover" />
      </div>
      {stickerSubtitle ? <p className="mt-4 text-xs font-medium text-slate-500">{stickerSubtitle}</p> : null}
    </div>
  ) : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--surface)]">
      <div className="fixed -top-24 -left-24 -z-10 h-96 w-96 rounded-full bg-[rgba(195,192,255,0.2)] blur-3xl" />
      <div className="fixed -bottom-24 -right-24 -z-10 h-96 w-96 rounded-full bg-[rgba(79,70,229,0.16)] blur-3xl" />
      <div className="flex min-h-screen">
        <section className="signature-gradient relative hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between overflow-hidden p-14 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </div>
          <Link href="/" className="relative z-10 text-2xl font-black tracking-tighter font-display">NCRJobs</Link>
          <div className="relative z-10 space-y-8">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/60">{eyebrow}</p>
            <h1 className="max-w-lg text-4xl font-black leading-tight tracking-[-0.02em] font-display">{title}</h1>
            <p className="max-w-xl text-lg leading-8 text-white/80">{description}</p>
          </div>
          <div className="relative z-10 grid gap-4 sm:grid-cols-3">
            {["NCR-first hiring", "Selection tracking", "Staff oversight"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-5 text-sm font-semibold text-white/80">{item}</div>
            ))}
          </div>
          {sticker ? <div className="relative z-10 mt-8 rotate-[-1deg]">{sticker}</div> : null}
        </section>
        <section className="flex flex-1 items-center justify-center px-6 py-10 md:px-12">
          <div className="w-full max-w-md">
            {sticker ? <div className="mb-6 lg:hidden">{sticker}</div> : null}
            {children}
          </div>
        </section>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 h-1 signature-gradient" />
    </div>
  );
}
