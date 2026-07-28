"use client";

import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { PricingSection } from "@/components/marketing/PricingSection";

export default function RecruiterPricingPage() {
  return (
    <PortalLayout role="RECRUITER" title="Plans & Subscription">
      <div className="space-y-6">
        <PricingSection role="RECRUITER" />
      </div>
    </PortalLayout>
  );
}
