import { getRouteMetadata } from "@/lib/sanity/metadata";
import { getPageSeo, toPageContent } from "@/lib/sanity/data";
import PageSeoData from "@/components/sanity/PageSeoData";
import type { Metadata } from "next";
import WebDesignPage from "@/components/WebDesignPage";

const fallbackMetadata: Metadata = {
  title: "Web Design & Development | Truedge Digital",
  description:
    "From Figma designs to a website ready for business. Web design, development, online shops, content, integrations and ongoing support from Truedge Digital in the UK.",
};

export const revalidate = 3600;
export async function generateMetadata() { return getRouteMetadata('/web-design', fallbackMetadata); }

export default async function WebDesign() {
  const page = await getPageSeo('/web-design');
  return <><WebDesignPage content={toPageContent(page)} /><PageSeoData page={page} /></>;
}
