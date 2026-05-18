"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";

export default function RecruiterSettingsPage() {
  const [message, setMessage] = useState("");
  return (
    <PortalLayout role="RECRUITER" title="Recruiter settings">
      {(user) => (
        <Panel title="Workspace profile" subtitle="Keep company and recruiter details accurate for trust and moderation.">
          <form
            className="grid gap-4 md:grid-cols-2"
            onSubmit={async (event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              await api.patch("/api/users/me", {
                fullName: form.get("fullName"),
                headline: form.get("headline"),
                location: form.get("location"),
                companyName: form.get("companyName"),
                bio: form.get("bio"),
              });
              setMessage("Recruiter profile updated.");
            }}
          >
            <Field name="fullName" defaultValue={user.fullName || ""} />
            <Field name="headline" defaultValue={user.headline || ""} />
            <Field name="location" defaultValue={user.location || ""} />
            <Field name="companyName" defaultValue={user.companyName || ""} />
            <label className="md:col-span-2"><textarea name="bio" rows={5} defaultValue={user.bio} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" /></label>
            <div className="md:col-span-2 flex items-center justify-between">
              <p className="text-sm text-emerald-600">{message}</p>
              <button className="rounded-full signature-gradient px-5 py-3 text-sm font-semibold text-white">Save profile</button>
            </div>
          </form>
        </Panel>
      )}
    </PortalLayout>
  );
}

function Field({ name, defaultValue }: { name: string; defaultValue: string }) {
  return <input name={name} defaultValue={defaultValue} placeholder={name} className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none" />;
}
