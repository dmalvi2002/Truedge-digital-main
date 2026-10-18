import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About Us | Truedge Digital",
  description: "Meet Truedge Digital: your Aberdeen-based partner for web design, marketing, SEO, automation and software. One team, working around your business.",
};

export default function About() {
  return <AboutPage />;
}
