import { getRouteMetadata } from "@/lib/sanity/metadata";
import { getPageSeo, toPageContent } from "@/lib/sanity/data";
import PageSeoData from "@/components/sanity/PageSeoData";
import type { Metadata } from "next";
import AiAutomationPage from "@/components/AiAutomationPage";

const fallbackMetadata: Metadata = {
  title: "AI Automation | Truedge Digital",
  description:
    "AI agents, voice agents and intelligent automation built around your business. Truedge designs reliable AI systems that listen, decide and act.",
};

export const revalidate = 3600;
export async function generateMetadata() { return getRouteMetadata('/ai-automation', fallbackMetadata); }

export default async function AiAutomation() {
  const page = await getPageSeo('/ai-automation');
  return <><AiAutomationPage content={toPageContent(page)} /><PageSeoData page={page} /></>;
}
