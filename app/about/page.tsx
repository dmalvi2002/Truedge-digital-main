import { getRouteMetadata } from "@/lib/sanity/metadata";
import { getPageSeo, toPageContent } from "@/lib/sanity/data";
import PageSeoData from "@/components/sanity/PageSeoData";
import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";
import MainCTA from "@/components/MainCTA";
import JsonLd from "@/components/sanity/JsonLd";
import { siteUrl } from "@/lib/sanity/content";

const team = [
  { name: "Shovon Mostofa", jobTitle: "Managing Director", anchor: "shovon-mostofa" },
  { name: "Abu Bakar Siddique DM", jobTitle: "Technical Director", anchor: "abu-bakar-siddique-dm" },
];

const fallbackMetadata: Metadata = {
  title: "About Us | Truedge Digital",
  description: "Meet Truedge Digital: your Aberdeen-based partner for web design, marketing, SEO, automation and software. One team, working around your business.",
};

export const revalidate = 3600;
export async function generateMetadata() { return getRouteMetadata('/about', fallbackMetadata); }

export default async function About() {
  const page = await getPageSeo('/about');
  return <>
    <AboutPage content={toPageContent(page)} />
    <JsonLd data={{
      "@context": "https://schema.org",
      "@graph": team.map(({ name, jobTitle, anchor }) => ({
        "@type": "Person",
        "@id": siteUrl(`/about#${anchor}`),
        name,
        jobTitle,
        worksFor: { "@type": "Organization", name: "Truedge Digital", url: siteUrl() },
      })),
    }} />
    <MainCTA />
    <PageSeoData page={page} renderFaqs />
  </>;
}
