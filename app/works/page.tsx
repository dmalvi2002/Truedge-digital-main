import type { Metadata } from "next";
import WorksPage from "@/components/WorksPage";

export const metadata: Metadata = {
  title: "Our Work | Truedge Digital",
  description: "Explore Truedge Digital’s work with Sanchez Watt, Nelson College London, Walker Roofing and more. Websites and digital experiences built around real businesses.",
};

export default function Page() {
  return <WorksPage />;
}
