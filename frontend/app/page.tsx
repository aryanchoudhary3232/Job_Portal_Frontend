import { ClosingCta } from "@/components/marketing/ClosingCta";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { Hero } from "@/components/marketing/Hero";
import { RoleGrid } from "@/components/marketing/RoleGrid";

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-4 sm:px-6 lg:px-8">
      <Hero />
      <RoleGrid />
      <FeatureGrid />
      <ClosingCta />
    </main>
  );
}
