"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";

export default function StaffSettingsPage() {
  const [message, setMessage] = useState("");
  return (
    <PortalLayout role="STAFF" title="Staff profile">
      {(user) => (
        <Panel title="Operations profile" subtitle="Internal contact details for platform administrators.">
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
              });
              setMessage("Staff profile updated.");
            }}
          >
            <input name="fullName" defaultValue={user.fullName || ""} className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none" />
            <input name="headline" defaultValue={user.headline || ""} className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none" />
            <input name="location" defaultValue={user.location || ""} className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none" />
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
