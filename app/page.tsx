import { getRouteMetadata } from "@/lib/sanity/metadata";
import { getPageSeo, toPageContent } from "@/lib/sanity/data";
import { getFaqs } from "@/lib/sanity/content";
import PageSeoData from "@/components/sanity/PageSeoData";
import MainHeroThree from "@/components/MainHeroThree";
import ClientLogosSection from "@/components/ClientLogosSection";
import PasSection from "@/components/PasSection";
import ServicesListSection from "@/components/ServicesListSection";
import OurWorksSection from "@/components/OurWorksSection";
import WhyTruedgeSection from "@/components/WhyTruedgeSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialSection from "@/components/TestimonialSection";
import MainCTA from "@/components/MainCTA";
import FaqSection from "@/components/FaqSection";
import { homeFaqs } from "@/data/homeFaqs";

export const revalidate = 3600;
export async function generateMetadata() {
  return getRouteMetadata('/', {title: 'Truedge Digital', description: 'Professional web development agency website built with Next.js'});
}

export default async function Home() {
  const page = await getPageSeo('/');
  const content = toPageContent(page);
  const faqs = getFaqs(content);
  return (
    <div>
      <MainHeroThree content={content} />
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
      <MainCTA />
      <FaqSection faqs={faqs.length ? faqs : homeFaqs} />
      <PageSeoData page={page} />
    </div>
  );
}
