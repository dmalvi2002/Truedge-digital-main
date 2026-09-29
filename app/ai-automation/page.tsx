import type { Metadata } from "next";
import AiAutomationPage from "@/components/AiAutomationPage";

export const metadata: Metadata = {
  title: "AI Automation | Truedge Digital",
  description:
    "AI agents, voice agents and intelligent automation built around your business. Truedge designs reliable AI systems that listen, decide and act.",
};

export default function AiAutomation() {
  return <AiAutomationPage />;
}
