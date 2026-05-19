import { Hero } from "@/components/marketing/Hero";
import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { SalaryInsights } from "@/components/marketing/SalaryInsights";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { TopCompaniesStrip } from "@/components/marketing/TopCompaniesStrip";
import { TrendingJobs } from "@/components/marketing/TrendingJobs";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <MarketingNavbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <Hero />
        <TrendingJobs />
        <TopCompaniesStrip />
        <SalaryInsights />
      </main>
      <SiteFooter />
    </div>
  );
}
