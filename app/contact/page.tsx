import type { Metadata } from "next";
import { Suspense } from "react";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Let’s Talk About Your Project | Truedge Digital",
  description: "Tell Truedge Digital about your website, marketing or AI project. Discuss your goals, explore your options and receive a clear proposal.",
};

export default function Page() {
  return <Suspense fallback={<div className="min-h-screen bg-[#08090c] px-6 py-24 text-[#f3f2e9]" role="status">Loading your enquiry…</div>}><ContactPage /></Suspense>;
}
