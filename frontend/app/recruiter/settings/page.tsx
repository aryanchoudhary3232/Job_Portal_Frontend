"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";
import { Sparkles, Key, Globe, ShieldCheck, Copy, Check, Headset } from "lucide-react";

export default function RecruiterSettingsPage() {
  const [message, setMessage] = useState("");
  const [activePlan, setActivePlan] = useState("Recruiter Pro AI");
  const [apiKey, setApiKey] = useState("");
  const [copiedKey, setCopiedKey] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("https://api.yourcompany.com/webhooks/hireverse");
  const [customDomain, setCustomDomain] = useState("careers.yourcompany.com");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const plan = localStorage.getItem("recruiter_active_plan") || "Recruiter Pro AI";
      setActivePlan(plan);
      setApiKey("hv_live_sk_" + Math.random().toString(36).substring(2, 18) + Date.now().toString(36));
    }
  }, []);

  return (
    <PortalLayout role="RECRUITER" title="Recruiter settings">
      {(user) => (
        <div className="space-y-6">
          {/* Active Plan & Subscription Summary */}
          <div className="rounded-[28px] bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-6 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 border border-purple-400/30 text-purple-300 font-black">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-300">Active Membership Plan</span>
                <h3 className="text-2xl font-black font-display">{activePlan}</h3>
                <p className="text-xs text-purple-200 font-medium mt-0.5">
                  {activePlan === "Recruiter Basic"
                    ? "Includes 10 job postings & 100 resume views."
                    : activePlan === "Enterprise"
                    ? "Unlimited Jobs, Custom White-label Domain & Dedicated SLA Manager."
                    : "Unlimited jobs, AI candidate screening & fit scoring unlocked."}
                </p>
              </div>
            </div>

            <Link
              href="/recruiter/pricing"
              className="rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg transition hover:bg-purple-100 shrink-0 text-center"
            >
              Manage & Upgrade Plan
            </Link>
          </div>

          {/* Recruiter Workspace Profile */}
          <Panel title="Workspace Profile" subtitle="Keep company and recruiter details accurate for candidate trust.">
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
                setMessage("Recruiter profile updated successfully.");
              }}
            >
              <div className="space-y-1">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Recruiter Full Name</label>
                <input name="fullName" defaultValue={user.fullName || ""} placeholder="Full Name" className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Headline / Title</label>
                <input name="headline" defaultValue={user.headline || ""} placeholder="Headline" className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Location</label>
                <input name="location" defaultValue={user.location || ""} placeholder="Location" className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Company Name</label>
                <input name="companyName" defaultValue={user.companyName || ""} placeholder="Company Name" className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none" />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Company Overview / Bio</label>
                <textarea name="bio" rows={4} defaultValue={user.bio} placeholder="Tell candidates about your team and culture..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none" />
              </div>
              <div className="md:col-span-2 flex items-center justify-between">
                <p className="text-sm font-bold text-emerald-600">{message}</p>
                <button className="rounded-full signature-gradient px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg">Save Profile</button>
              </div>
            </form>
          </Panel>

          {/* Enterprise REST API & Webhooks */}
          <Panel title="REST API & Webhooks (Enterprise)" subtitle="Integrate your ATS, HRIS, or custom backend directly via REST API.">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <Key className="h-4 w-4 text-purple-600" /> Enterprise REST API Secret Key
                </label>
                <div className="flex items-center gap-2">
                  <input type="text" readOnly value={apiKey} className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 font-mono font-bold text-slate-800" />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(apiKey);
                      setCopiedKey(true);
                      setTimeout(() => setCopiedKey(false), 2000);
                    }}
                    className="h-11 px-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    {copiedKey ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    {copiedKey ? "Copied!" : "Copy Key"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-purple-600" /> Real-Time Event Webhook Endpoint
                </label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 font-mono font-bold text-slate-800"
                />
              </div>
            </div>
          </Panel>

          {/* White-Label Custom Career Portal */}
          <Panel title="White-Label Career Page Domain" subtitle="Host your candidate portal under your company's custom URL.">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-500 mb-1.5">Custom Domain Endpoint</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 font-mono font-bold text-slate-800"
                  />
                  <span className="rounded-xl bg-green-100 border border-green-200 px-3.5 py-3 font-bold text-green-800 flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4" /> CNAME SSL Active
                  </span>
                </div>
              </div>
            </div>
          </Panel>

          {/* Dedicated Account Manager & SLA Badge */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-black">
                <Headset className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-950">Dedicated Account Manager & SLA Support</h4>
                <p className="text-xs font-semibold text-indigo-800">Assigned Manager: <strong>sarah.enterprise@hireverse.com</strong> • Response SLA: &lt; 2 Hours</p>
              </div>
            </div>
            <a href="mailto:sarah.enterprise@hireverse.com" className="rounded-xl signature-gradient px-4 py-2 text-xs font-bold text-white shadow-md">
              Contact Manager
            </a>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
