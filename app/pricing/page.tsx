import type { Metadata } from "next";
import PricingPage from "@/components/PricingPage";

export const metadata: Metadata = {
  title: "Pricing | Truedge Digital",
  description: "Claim 50% off: web design from £120 one-off, paid marketing from £200/month and SEO from £150/month. Get a strategy and quote tailored to your business. Book a free, no-obligation strategy call. Hosting from £5/month.",
};

export default function Pricing() {
  return <PricingPage />;
}
