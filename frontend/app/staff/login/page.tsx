"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/api-error";
import { roleRouteMap, setSession } from "@/lib/session";
import type { User } from "@/lib/types";

export default function StaffLoginPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-slate-950">
      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-slate-500 hover:text-white"
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
            aria-hidden
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to site
        </Link>
      </div>

      <main className="mx-auto flex w-full max-w-md flex-col justify-center px-6 py-12">
        <div className="rounded-[28px] border border-slate-800 bg-slate-900 p-8 shadow-2xl md:p-10">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Operations Console</p>
            <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-white">Admin Sign In</h1>
            <p className="mt-2 text-sm text-slate-400">
              Restricted access for platform administrators only.
            </p>
          </div>

          {error ? (
            <p
              role="alert"
              className="mb-6 rounded-xl border border-red-500/30 bg-red-950/50 px-4 py-3 text-sm font-medium text-red-300"
            >
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

                if (data.user.role !== "STAFF") {
                  setError("This portal is for administrator accounts only.");
                  return;
                }

                setSession(data.accessToken, data.user);
                router.push(roleRouteMap.STAFF);
              } catch (err) {
                setError(getErrorMessage(err, "Sign in failed"));
              } finally {
                setBusy(false);
              }
            }}
          >
            <Field
              label="Admin email"
              name="email"
              type="email"
              placeholder="admin@yourcompany.com"
              autoComplete="username"
              required
            />
            <Field
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />

            <button
              type="submit"
              className="h-12 w-full rounded-full bg-white text-sm font-black uppercase tracking-wider text-slate-950 shadow-lg transition hover:-translate-y-0.5 disabled:opacity-60"
              disabled={busy}
            >
              {busy ? "Signing in..." : "Sign in to console"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-500">
            Students and recruiters should use the{" "}
            <Link href="/login" className="font-semibold text-slate-300 underline-offset-2 hover:text-white hover:underline">
              public sign-in
            </Link>
            .
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
        className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 focus:ring-slate-400"
      />
    </label>
  );
}
