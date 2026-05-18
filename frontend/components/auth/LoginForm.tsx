"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";
import { roleRouteMap, setSession } from "@/lib/session";
import type { User } from "@/lib/types";

export function LoginForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  return (
    <form
      className="w-full max-w-md space-y-5"
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
          setSession(data.accessToken, data.user);
          router.push(roleRouteMap[data.user.role]);
        } catch (response) {
          setError(response instanceof Error ? response.message : "Login failed");
        } finally {
          setBusy(false);
        }
      }}
    >
      <div>
        <div className="lg:hidden text-2xl font-black tracking-tighter text-[var(--primary)] font-display">NCRJobs</div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">Welcome back</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--on-surface)] font-display">Sign in to your workspace</h2>
      </div>
      {error ? <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p> : null}
      <Field label="Email" name="email" type="email" placeholder="student@demo.com" />
      <Field label="Password" name="password" type="password" placeholder="Password123" />
      <button className="signature-gradient w-full rounded-full px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5" disabled={busy}>
        {busy ? "Signing in..." : "Sign In"}
      </button>
      <p className="text-sm text-[var(--on-surface-variant)]">
        Need an account? <Link href="/register" className="font-bold text-[var(--primary)]">Create one</Link>
      </p>
    </form>
  );
}

function Field(props: { label: string; name: string; type: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">{props.label}</span>
      <input {...props} className="h-12 w-full rounded-xl bg-[var(--surface-container-low)] px-4 text-sm text-[var(--on-surface)] outline-none transition focus:ring-2 focus:ring-[var(--primary)]" required />
    </label>
  );
}
