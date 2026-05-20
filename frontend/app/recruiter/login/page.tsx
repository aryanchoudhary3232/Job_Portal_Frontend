"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { InputHTMLAttributes } from "react";
import { api } from "@/lib/api";
import { roleRouteMap, setSession } from "@/lib/session";
import type { User } from "@/lib/types";

export default function RecruiterLoginPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("registered") === "true") {
        setSuccess("Company profile registered! Please verify your official email address using the link we sent before logging in.");
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (params.get("email_verified") === "true") {
        setSuccess("Email verified successfully! You can now access your recruiter workspace.");
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#faf8ff] flex flex-col justify-center">
      {/* Top Left Floating Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/recruiter"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold transition hover:border-[#6c2bd9] hover:text-[#6c2bd9]"
          style={{ color: "#475569" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>
      </div>

      <main className="mx-auto flex w-full max-w-xl flex-col justify-center px-6 py-12">
        <div className="card-surface rounded-[28px] p-8 md:p-10 shadow-2xl border border-slate-100 bg-white">
          
          {/* Header Branding */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Recruiter Workspace</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display mt-1">Sign In to Company Panel</h2>
          </div>



        {success ? (
          <p className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {success}
          </p>
        ) : null}
        {error ? (
          <p className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <form
          className="space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            setBusy(true);
            setError("");
            try {
              const data = await api.post<{ accessToken: string; user: User }>("/api/auth/login", {
                email: form.get("email"),
                password: form.get("password"),
              });
              
              if (data.user.role !== "RECRUITER") {
                setError("Authorized for recruiter accounts only!");
                return;
              }

              setSession(data.accessToken, data.user);
              router.push(roleRouteMap[data.user.role]);
            } catch (response) {
              setError(response instanceof Error ? response.message : "Login failed");
            } finally {
              setBusy(false);
            }
          }}
        >
          <Field label="Official Email ID" name="email" type="email" placeholder="name@company.com" required />
          <Field label="Password" name="password" type="password" placeholder="••••••••" required />

          <button
            className="w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-black uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5"
            disabled={busy}
          >
            {busy ? "Signing In..." : "Sign In to Workspace"}
          </button>
        </form>



        <p className="mt-6 text-center text-xs font-semibold text-slate-400">
          Need a recruiter account?{" "}
          <Link href="/recruiter/register" className="text-purple-600 font-extrabold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </main>
   </div>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Field({ label, type = "text", ...props }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{label}</span>
      <input
        {...props}
        type={type}
        className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-purple-600"
      />
    </label>
  );
}
