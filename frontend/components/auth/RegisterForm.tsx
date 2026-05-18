"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";
import { roleRouteMap, setSession } from "@/lib/session";
import type { Role, User } from "@/lib/types";

const roles: Array<{ value: Role; label: string }> = [
  { value: "STUDENT", label: "Student" },
  { value: "RECRUITER", label: "Recruiter" },
  { value: "STAFF", label: "Staff" },
];

export function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("STUDENT");
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
          const location = String(form.get("location") || "").trim();
          const companyName = String(form.get("companyName") || "").trim();
          const college = String(form.get("college") || "").trim();
          const bio = String(form.get("bio") || "").trim();
          const skills = String(form.get("skills") || "").split(",").map((item) => item.trim()).filter(Boolean);
          const data = await api.post<{ accessToken: string; user: User }>("/api/auth/register", {
            fullName: form.get("fullName"),
            email: form.get("email"),
            password: form.get("password"),
            role,
            ...(location ? { location } : {}),
            ...(companyName ? { companyName } : {}),
            ...(college ? { college } : {}),
            ...(skills.length ? { skills } : {}),
            ...(bio ? { bio } : {}),
          });
          setSession(data.accessToken, data.user);
          router.push(roleRouteMap[data.user.role]);
        } catch (response) {
          setError(response instanceof Error ? response.message : "Registration failed");
        } finally {
          setBusy(false);
        }
      }}
    >
      <div>
        <div className="lg:hidden text-2xl font-black tracking-tighter text-[var(--primary)] font-display">NCRJobs</div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">Create account</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--on-surface)] font-display">Launch your portal profile</h2>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {roles.map((item) => (
          <button key={item.value} type="button" onClick={() => setRole(item.value)} className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${role === item.value ? "bg-[var(--primary-fixed)] text-[var(--primary)]" : "bg-[var(--surface-container-low)] text-[var(--on-surface-variant)]"}`}>
            {item.label}
          </button>
        ))}
      </div>
      {error ? <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p> : null}
      <Field label="Full name" name="fullName" placeholder="Aryan Choudhary" />
      <Field label="Email" name="email" placeholder="you@example.com" type="email" />
      <Field label="Password" name="password" placeholder="Minimum 8 characters" type="password" />
      <Field label="Location" name="location" placeholder="Bengaluru" />
      <Field label={role === "RECRUITER" ? "Company name" : "College"} name={role === "RECRUITER" ? "companyName" : "college"} placeholder={role === "RECRUITER" ? "Orbit Labs" : "IIT Delhi"} />
      <Field label="Skills" name="skills" placeholder="React, Node.js, SQL" />
      <label className="block">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">Bio</span>
        <textarea name="bio" rows={4} className="w-full rounded-xl bg-[var(--surface-container-low)] px-4 py-3 text-sm text-[var(--on-surface)] outline-none transition focus:ring-2 focus:ring-[var(--primary)]" defaultValue="Focused on shipping high-quality work." />
      </label>
      <button className="signature-gradient w-full rounded-full px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5" disabled={busy}>
        {busy ? "Creating..." : "Start Your Journey"}
      </button>
      <p className="text-sm text-[var(--on-surface-variant)]">
        Already registered? <Link href="/login" className="font-bold text-[var(--primary)]">Sign in</Link>
      </p>
    </form>
  );
}

function Field({ label, type = "text", ...props }: { label: string; name: string; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">{label}</span>
      <input {...props} type={type} className="h-12 w-full rounded-xl bg-[var(--surface-container-low)] px-4 text-sm text-[var(--on-surface)] outline-none transition focus:ring-2 focus:ring-[var(--primary)]" required />
    </label>
  );
}
