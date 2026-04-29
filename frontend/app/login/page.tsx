"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd authenticate here.
    // For now, redirect to the dashboard of the selected role.
    if (role === "student") router.push("/student");
    else if (role === "recruiter") router.push("/recruiter/dashboard");
    else if (role === "staff") router.push("/staff");
  };

  return (
    <div className="min-h-screen bg-surface flex relative overflow-hidden">
      {/* ... ambient blobs ... */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-[#c3c0ff]/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-[#ffdbcc]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Left brand panel */}
      {/* ... (keep existing left panel code) ... */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-14 signature-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="text-2xl font-black tracking-tighter text-white relative z-10">CareerArchitect</div>
        <div className="space-y-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tight" style={{letterSpacing: '-0.02em'}}>
            Design your<br />professional<br />future.
          </h2>
          <p className="text-white/70 leading-relaxed">
            The world&apos;s most sophisticated career management platform for modern engineers, designers, and visionaries.
          </p>
        </div>
        <div className="text-xs text-white/40 relative z-10">© 2024 CareerArchitect Global. All rights reserved.</div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile logo */}
          <div className="lg:hidden text-2xl font-black tracking-tighter text-[#3525cd] mb-6">CareerArchitect</div>

          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-on-surface" style={{letterSpacing: '-0.02em'}}>Welcome back</h1>
            <p className="text-on-surface-variant">Please enter your details to continue.</p>
          </div>

          {/* OAuth buttons */}
          <div className="space-y-3">
            <button
              onClick={() => router.push("/student")}
              id="google-login-btn"
              type="button"
              className="w-full h-13 px-5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center gap-3 font-semibold text-sm text-on-surface hover:bg-surface-container-low hover:shadow-md transition-all"
            >
              {/* Google "G" logo SVG */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button
              onClick={() => router.push("/student")}
              id="github-login-btn"
              type="button"
              className="w-full h-13 px-5 rounded-xl bg-[#24292e] flex items-center justify-center gap-3 font-semibold text-sm text-white hover:bg-[#1a1f24] hover:shadow-md transition-all"
            >
              {/* GitHub logo SVG */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-outline-variant/30" />
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">or continue with email</span>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>

          {/* Email/password form */}
          <form className="space-y-5" id="login-form" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Email Address</label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full h-14 px-5 rounded-xl bg-surface-container-low focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface font-medium placeholder:text-outline/50 outline-none border-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="password" className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot Password?</a>
              </div>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full h-14 px-5 rounded-xl bg-surface-container-low focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface font-medium placeholder:text-outline/50 outline-none border-none"
              />
            </div>

            {/* Role selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">I am a</label>
              <div className="grid grid-cols-3 gap-3">
                {["Student", "Recruiter", "Staff"].map((r) => (
                  <label key={r} className="cursor-pointer">
                    <input 
                      type="radio" 
                      name="role" 
                      value={r.toLowerCase()} 
                      className="peer sr-only" 
                      checked={role === r.toLowerCase()}
                      onChange={() => setRole(r.toLowerCase())}
                    />
                    <div className="h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-sm font-semibold text-on-surface-variant peer-checked:bg-primary-fixed peer-checked:text-primary peer-checked:font-bold transition-all hover:bg-surface-container cursor-pointer">
                      {r}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              id="login-btn"
              type="submit"
              className="w-full h-14 rounded-full text-white font-bold text-sm signature-gradient shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="fixed bottom-0 left-0 right-0 h-1 signature-gradient z-50" />
    </div>
  );
}
