import type { Metadata } from "next";
import MarketingPage from "@/components/MarketingPage";

export const metadata: Metadata = {
  title: "Marketing | Truedge Digital",
  description: "Connect search, paid advertising, content, conversion optimisation, CRM and AI automation. Practical marketing that helps customers find and choose your business.",
};

export default function Marketing() {
  return <MarketingPage />;
}
