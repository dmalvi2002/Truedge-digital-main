import { getRouteMetadata } from "@/lib/sanity/metadata";
import { getPageSeo, toPageContent } from "@/lib/sanity/data";
import PageSeoData from "@/components/sanity/PageSeoData";
import type { Metadata } from "next";
import { Suspense } from "react";
import ContactPage from "@/components/ContactPage";

const fallbackMetadata: Metadata = {
  title: "Let’s Talk About Your Project | Truedge Digital",
  description: "Tell Truedge Digital about your website, marketing or AI project. Discuss your goals, explore your options and receive a clear proposal.",
};

export const revalidate = 3600;
export async function generateMetadata() { return getRouteMetadata('/contact', fallbackMetadata); }

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [page, params] = await Promise.all([getPageSeo('/contact'), searchParams]);
  return <><Suspense fallback={<div className="min-h-screen bg-[#08090c] px-6 py-24 text-[#f3f2e9]" role="status">Loading your enquiry…</div>}><ContactPage content={toPageContent(page)} offerId={typeof params.offer === 'string' ? params.offer : undefined} projectId={typeof params.project === 'string' ? params.project : undefined} /></Suspense><PageSeoData page={page} renderFaqs /></>;
}
