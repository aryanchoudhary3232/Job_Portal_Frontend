"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";

export default function StudentSettingsPage() {
  const [message, setMessage] = useState("");
  return (
    <PortalLayout role="STUDENT" title="Profile settings">
      {(user) => (
        <Panel title="Update profile" subtitle="These fields power recruiter discovery and dashboard summaries.">
          <form
            className="grid gap-4 md:grid-cols-2"
            onSubmit={async (event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              await api.patch("/api/users/me", {
                fullName: form.get("fullName"),
                headline: form.get("headline"),
                location: form.get("location"),
                bio: form.get("bio"),
                skills: String(form.get("skills") || "").split(",").map((item) => item.trim()).filter(Boolean),
              });
              setMessage("Profile updated successfully.");
            }}
          >
            <Field label="Full name" name="fullName" defaultValue={user.fullName} />
            <Field label="Headline" name="headline" defaultValue={user.headline} />
            <Field label="Location" name="location" defaultValue={user.location} />
            <Field label="Skills" name="skills" defaultValue={(user.skills || []).join(", ")} />
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Bio</span>
              <textarea name="bio" rows={5} defaultValue={user.bio} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" />
            </label>
            <div className="md:col-span-2 flex items-center justify-between">
              <p className="text-sm text-emerald-600">{message}</p>
              <button className="rounded-full signature-gradient px-5 py-3 text-sm font-semibold text-white">Save changes</button>
            </div>
          </form>
        </Panel>
      )}
    </PortalLayout>
  );
}

function Field({ label, ...props }: { label: string; name: string; defaultValue?: string }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</span>
      <input {...props} className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none" />
    </label>
  );
}
