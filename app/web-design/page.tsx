import type { Metadata } from "next";
import WebDesignPage from "@/components/WebDesignPage";

export const metadata: Metadata = {
  title: "Web Design & Development | Truedge Digital",
  description:
    "From Figma designs to a website ready for business. Web design, development, online shops, content, integrations and ongoing support from Truedge Digital in the UK.",
};

export default function WebDesign() {
  return <WebDesignPage />;
}
