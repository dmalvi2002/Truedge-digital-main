import { getRouteMetadata } from "@/lib/sanity/metadata";
import { getPageSeo, toPageContent } from "@/lib/sanity/data";
import PageSeoData from "@/components/sanity/PageSeoData";
import type { Metadata } from "next";
import WorksPage from "@/components/WorksPage";

const fallbackMetadata: Metadata = {
  title: "Our Work | Truedge Digital",
  description: "Explore Truedge Digital’s work with Sanchez Watt, Nelson College London, Walker Roofing and more. Websites and digital experiences built around real businesses.",
};

export const revalidate = 3600;
export async function generateMetadata() { return getRouteMetadata('/works', fallbackMetadata); }

export default async function Page() {
  const page = await getPageSeo('/works');
  return <><WorksPage content={toPageContent(page)} /><PageSeoData page={page} renderFaqs /></>;
}
