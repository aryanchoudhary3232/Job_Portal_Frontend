import Link from "next/link";

export function ClosingCta() {
  return (
    <section className="signature-gradient rounded-[60px] px-6 py-12 text-center text-white shadow-[0_30px_80px_rgba(67,43,160,0.25)] md:px-10 md:py-16">
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-white/70">Ready for your next role</p>
      <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-[-0.05em] md:text-6xl font-display">Get matched with NCR internships and entry roles.</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80">
        Create your student profile, apply with confidence, and track results without the noise.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/register" className="rounded-[24px] bg-white px-8 py-4 text-sm font-black text-[var(--primary-strong)]">Create account</Link>
        <Link href="/login" className="rounded-[24px] border border-white/20 px-8 py-4 text-sm font-black text-white/90">Use demo login</Link>
      </div>
    </section>
  );
}
