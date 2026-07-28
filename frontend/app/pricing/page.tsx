"use client";

import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { PricingSection } from "@/components/marketing/PricingSection";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export default function PublicPricingPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-900 font-sans flex flex-col justify-between">
      <MarketingNavbar />
      <main className="py-12">
        <PricingSection />
      </main>
      <SiteFooter />
    </div>
  );
}
