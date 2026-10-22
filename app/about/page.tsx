import { getRouteMetadata } from "@/lib/sanity/metadata";
import { getPageSeo, toPageContent } from "@/lib/sanity/data";
import PageSeoData from "@/components/sanity/PageSeoData";
import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";
import MainCTA from "@/components/MainCTA";

const fallbackMetadata: Metadata = {
  title: "About Us | Truedge Digital",
  description: "Meet Truedge Digital: your Aberdeen-based partner for web design, marketing, SEO, automation and software. One team, working around your business.",
};

export const revalidate = 3600;
export async function generateMetadata() { return getRouteMetadata('/about', fallbackMetadata); }

export default async function About() {
  const page = await getPageSeo('/about');
  return <><AboutPage content={toPageContent(page)} /><MainCTA /><PageSeoData page={page} renderFaqs /></>;
}
