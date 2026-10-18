import { getRouteMetadata } from "@/lib/sanity/metadata";
import { getPageSeo, toPageContent } from "@/lib/sanity/data";
import PageSeoData from "@/components/sanity/PageSeoData";
import type { Metadata } from "next";
import MarketingPage from "@/components/MarketingPage";

const fallbackMetadata: Metadata = {
  title: "Marketing | Truedge Digital",
  description: "Connect search, paid advertising, content, conversion optimisation, CRM and AI automation. Practical marketing that helps customers find and choose your business.",
};

export const revalidate = 3600;
export async function generateMetadata() { return getRouteMetadata('/marketing', fallbackMetadata); }

export default async function Marketing() {
  const page = await getPageSeo('/marketing');
  return <><MarketingPage content={toPageContent(page)} /><PageSeoData page={page} /></>;
}
