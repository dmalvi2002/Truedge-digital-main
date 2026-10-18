import { getRouteMetadata } from "@/lib/sanity/metadata";
import { getPageSeo, toPageContent } from "@/lib/sanity/data";
import PageSeoData from "@/components/sanity/PageSeoData";
import type { Metadata } from "next";
import PricingPage from "@/components/PricingPage";

const fallbackMetadata: Metadata = {
  title: "Pricing | Truedge Digital",
  description: "Claim 50% off: web design from £120 one-off, paid marketing from £200/month and SEO from £150/month. Get a strategy and quote tailored to your business. Book a free, no-obligation strategy call. Hosting from £5/month.",
};

export const revalidate = 3600;
export async function generateMetadata() { return getRouteMetadata('/pricing', fallbackMetadata); }

export default async function Pricing() {
  const page = await getPageSeo('/pricing');
  return <><PricingPage content={toPageContent(page)} /><PageSeoData page={page} /></>;
}
