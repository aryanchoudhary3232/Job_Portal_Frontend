import Link from "next/link";

export default function RecruiterEntryPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-10">
      <section className="signature-gradient rounded-[40px] px-8 py-12 text-white shadow-[0_30px_80px_rgba(11,59,115,0.22)]">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-200">Recruiter workspace</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-tight font-display">Hire across NCR with a clean, verified pipeline.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-white/75">
          Publish NCR roles, review talent, progress applications, and stay compliant with staff verification checkpoints.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/recruiter/dashboard" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary-strong)]">Open dashboard</Link>
          <Link href="/recruiter/onboarding" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80">Complete onboarding</Link>
        </div>
      </section>
    </main>
  );
}
