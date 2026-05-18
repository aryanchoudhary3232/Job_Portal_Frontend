import Link from "next/link";

const checklist = [
  "Complete your headline and location",
  "Add at least 3 marketable skills",
  "Review open roles and submit your first application",
  "Keep your bio concise and recruiter-friendly",
];

export default function StudentOnboardingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-10">
      <section className="rounded-[40px] bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Student onboarding</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-950">Build a profile recruiters can trust in under ten minutes.</h1>
        <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-500">
          This quick checklist lines up your profile with the student dashboard, job discovery view, and application tracker already wired into the portal.
        </p>
        <div className="mt-8 grid gap-3">
          {checklist.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700">{item}</div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/student/settings" className="rounded-full signature-gradient px-6 py-3 text-sm font-semibold text-white">Complete profile</Link>
          <Link href="/student/jobs" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700">Browse roles</Link>
        </div>
      </section>
    </main>
  );
}
