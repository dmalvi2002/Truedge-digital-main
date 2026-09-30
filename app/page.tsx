import MainHeroThree from "@/components/MainHeroThree";
import ClientLogosSection from "@/components/ClientLogosSection";
import PasSection from "@/components/PasSection";
import ServicesListSection from "@/components/ServicesListSection";
import OurWorksSection from "@/components/OurWorksSection";
import WhyTruedgeSection from "@/components/WhyTruedgeSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialSection from "@/components/TestimonialSection";
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import { homeFaqs } from "@/data/homeFaqs";

export default function Home() {
  return (
    <div>
      <MainHeroThree />
      <div data-hero-following className="overflow-hidden bg-[#06070b]">
        <div className="bg-white">
          <ClientLogosSection />
        </div>
      </div>
      <PasSection />
      <ServicesListSection />
      <OurWorksSection />
      <WhyTruedgeSection />
      <ProcessSection />
      <TestimonialSection />
      <CtaSection />
      <FaqSection faqs={homeFaqs} />
    </div>
  );
}
