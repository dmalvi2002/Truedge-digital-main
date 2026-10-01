import type { Metadata } from "next";
import PricingPage from "@/components/PricingPage";

export const metadata: Metadata = {
  title: "Pricing | Truedge Digital",
  description: "Web design from £120, marketing from £150 and SEO from £150. Explore our starting prices and talk to Truedge Digital about the right scope for your business.",
};

export default function Pricing() {
  return <PricingPage />;
}
