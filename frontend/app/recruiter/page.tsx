import Link from "next/link";

export default function RecruiterEntryPage() {
  const steps = [
    {
      number: "01",
      title: "Post Your Requirements",
      description: "Quickly post tech, marketing, operations or sales roles with skills, locations, and salary parameters.",
    },
    {
      number: "02",
      title: "Get AI-Matched Talent",
      description: "Our system filters through Delhi NCR's top university pools and serves verified match lists instantly.",
    },
    {
      number: "03",
      title: "Verify & Interview",
      description: "Access verified candidate phone profiles (OTP approved) and initiate premium dynamic virtual interviews.",
    },
    {
      number: "04",
      title: "Zero Upfront Cost",
      description: "Post and hire with absolute zero subscription fees. Pay commission only after candidate receives first salary.",
    },
  ];

  const features = [
    {
      icon: "⚡",
      title: "Instant OTP Verified Pipeline",
      description: "Eliminate fake candidate registrations. Every student profile undergoes two-tier phone and email checks.",
    },
    {
      icon: "🎯",
      title: "Smart skill matching",
      description: "Match candidates accurately using skill matching. Recruiters see automated compatibility scores.",
    },
    {
      icon: "💬",
      title: "Direct Candidate Intercom",
      description: "Engage candidates dynamically. Skip emails and chat with candidate nodes directly from dashboard.",
    },
    {
      icon: "🏛️",
      title: "NCR University Networks",
      description: "Target candidates across premier engineering and business colleges in Delhi, Noida, and Gurgaon.",
    },
    {
      icon: "🛡️",
      title: "Staff Verification Escrow",
      description: "Every candidate selection goes through staff verification to ensure secure placement tracking.",
    },
    {
      icon: "💸",
      title: "Post-Placement Pay Structure",
      description: "Completely risk-free. No platform listing fee or database access fee. Focus purely on hiring.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col justify-between font-sans">
      {/* Dynamic Header */}
      <header className="border-b border-[#ebdfff] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="NCRJobs" className="h-9 w-9 animate-pulse" />
            <span className="text-lg font-black tracking-tight text-[#3b1078] font-display">NCRJobs Recruiter</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/recruiter/login"
              className="rounded-full border border-purple-200 bg-white px-5 py-2 text-sm font-bold text-[#3b1078] transition hover:border-[#6c2bd9] hover:bg-purple-50/50"
            >
              Sign In
            </Link>
            <Link
              href="/recruiter/register"
              className="rounded-full bg-gradient-to-r from-[#6c2bd9] to-[#4c1d95] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-purple-200 transition hover:shadow-xl hover:-translate-y-0.5"
            >
              Register & Post
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow w-full">
        {/* Top Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f4eeff] py-20 lg:py-28 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
          
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1.5 text-xs font-extrabold text-purple-800 ring-1 ring-purple-600/10 uppercase tracking-widest">
                🚀 Elevate your talent sourcing
              </span>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08] font-display">
                Delhi NCR's Leading <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c2bd9] to-[#4c1d95]">Recruiter Panel</span>.
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-xl font-medium">
                Connect directly with OTP-verified talents and manage placements through a fully integrated company dashboard. Zero upfront fee.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/recruiter/register"
                  className="rounded-full bg-gradient-to-r from-[#6c2bd9] to-[#4c1d95] px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Create Recruiter Account
                </Link>
                <Link
                  href="/recruiter/login"
                  className="rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 hover:border-slate-300 transition hover:-translate-y-0.5"
                >
                  Access Workspace
                </Link>
              </div>

              {/* Verified Trust Stats */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-purple-200/40 max-w-lg">
                <div>
                  <p className="text-4xl font-black text-[#3b1078]">50K+</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Verified Candidates</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-[#3b1078]">1,200+</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">NCR Tech Partners</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-[#3b1078]">99.2%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Placement Success</p>
                </div>
              </div>
            </div>

            {/* Interactive Mock Dashboard Panel */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-[48px] opacity-15 blur-2xl animate-pulse" />
              <div className="relative border border-purple-100 rounded-[32px] bg-white p-6 shadow-2xl shadow-purple-200/50 max-w-md w-full">
                
                {/* Simulated Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-2">Recruiter Suite v1.2</span>
                  </div>
                  <span className="rounded-full bg-green-50 border border-green-200/50 px-2 py-0.5 text-[9px] font-extrabold text-green-700 uppercase tracking-wider">Live Connection</span>
                </div>

                {/* Candidate Matching Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-purple-50/50 rounded-2xl p-4 border border-purple-100/60">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company Registered</h4>
                      <p className="text-sm font-extrabold text-slate-800 mt-1">NCRTech Solutions Private Limited</p>
                      <p className="text-[10px] font-semibold text-slate-500">Startup • 11-50 Employees</p>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm">🏢</span>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Active Talent Sourcing</h5>
                    
                    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3 bg-white hover:bg-slate-550 transition">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-base">👨‍💻</span>
                        <div>
                          <p className="text-xs font-extrabold text-slate-800">Aarav Sharma</p>
                          <p className="text-[9px] font-bold text-slate-400">Next.js Developer • Noida</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">94% Match</span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3 bg-white hover:bg-slate-550 transition">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-base">👩‍💻</span>
                        <div>
                          <p className="text-xs font-extrabold text-slate-800">Riya Singhal</p>
                          <p className="text-[9px] font-bold text-slate-400">Full Stack Engineer • Gurgaon</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">89% Match</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Hired Placements: 14</span>
                  <span className="text-purple-600 hover:underline cursor-pointer">Quick Post Role →</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: How NCRJobs Recruiter Works */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-purple-100">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#6c2bd9]">Simplifying Sourcing</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight font-display">How the Sourcing System Works</h2>
            <p className="text-sm text-slate-400 font-semibold max-w-md mx-auto">
              Our 4-step recruitment workflow ensures high efficiency, maximum transparency, and risk-free hiring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative rounded-[24px] border border-purple-100 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <span className="absolute top-4 right-6 text-4xl font-black text-purple-200/60 font-display">
                  {step.number}
                </span>
                <h3 className="text-base font-extrabold text-slate-950 mt-6 mb-2">{step.title}</h3>
                <p className="text-xs font-semibold leading-relaxed text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Premium Recruiter Features */}
        <section className="bg-slate-900 py-20 px-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(108,43,217,0.18),transparent_50%)]" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center space-y-3 mb-16">
              <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-purple-400">Robust Toolset</span>
              <h2 className="text-4xl font-black tracking-tight font-display text-white">Full-Suite Recruiter Features</h2>
              <p className="text-sm text-white/60 font-semibold max-w-md mx-auto">
                Discover why hundreds of tech enterprises and dynamic startups in NCR choose our unified hiring workspace.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-[28px] border border-white/5 bg-white/5 p-6 hover:bg-white/10 transition duration-300"
                >
                  <span className="text-3xl mb-4 block">{feat.icon}</span>
                  <h3 className="text-lg font-extrabold text-white mb-2 tracking-tight group-hover:text-purple-300 transition">
                    {feat.title}
                  </h3>
                  <p className="text-xs font-semibold leading-relaxed text-slate-300">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Risk-Free Recruitment Promise */}
        <section className="py-20 px-6 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 border border-purple-100 text-xl">🛡️</div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight font-display">The NCRJobs Post-Placement Guarantee</h2>
          <p className="text-sm font-semibold text-slate-400 leading-relaxed max-w-xl mx-auto">
            Our placement commission setup protects recruiters. Since staff tracks selections dynamically, you pay zero upfront setup, database search, or posting fees. Complete premium access remains active from day one!
          </p>
          <div className="pt-4">
            <Link
              href="/recruiter/register"
              className="inline-flex rounded-full bg-gradient-to-r from-[#6c2bd9] to-[#4c1d95] px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Start hiring now (No credit card needed)
            </Link>
          </div>
        </section>
      </main>

      {/* Premium Footer */}
      <footer className="border-t border-[#ebdfff] bg-white py-8 text-center text-xs font-semibold text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="NCRJobs" className="h-6 w-6" />
            <span className="font-extrabold text-[#3b1078]">NCRJobs Recruiter Portal</span>
          </div>
          <p>© 2026 NCRJobs Recruiter Platform. Built specifically for high growth teams in Delhi NCR.</p>
        </div>
      </footer>
    </div>
  );
}
