import MainHero from "@/components/MainHero";
import ContrastSection from "../components/ContrastSection";
import ProofSection from "../components/ProofSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialSection from "@/components/TestimonialSection";
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import StackRevealSection from "@/components/StackRevealSection";
import { homeFaqs } from "@/data/homeFaqs";

export default function Home() {
  return (
    <main>
      <MainHero />
      <StackRevealSection />
      <ContrastSection />
      <ProofSection />
      <ExpertiseSection />
      <ProcessSection />
      <TestimonialSection />
      <CtaSection />
      <FaqSection faqs={homeFaqs} />
    </main>
  );
}
