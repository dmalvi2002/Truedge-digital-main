import MainHero from "@/components/MainHero";
import ClientLogosSection from "@/components/ClientLogosSection";
import PasSection from "@/components/PasSection";
import ServicesListSection from "@/components/ServicesListSection";
import OurWorksSection from "@/components/OurWorksSection";
import WhyTruedgeSection from "@/components/WhyTruedgeSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialSection from "@/components/TestimonialSection";
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import { homeFaqs } from "@/data/homeFaqs";

export default function Home() {
  return (
    <main>
      <MainHero />
      <ClientLogosSection />
      <PasSection />
      <ServicesListSection />
      <OurWorksSection />
      <WhyTruedgeSection />
      <ExpertiseSection />
      <ProcessSection />
      <TestimonialSection />
      <CtaSection />
      <FaqSection faqs={homeFaqs} />
    </main>
  );
}
