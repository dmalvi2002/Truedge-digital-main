export type PricingPackage = {
  id: string;
  name: string;
  forWho: string;
  description: string;
  features: string[];
  note: string;
  price?: number;
  recommended?: boolean;
};

export const pricingServices: {
  id: string;
  name: string;
  contactService: string;
  billing: string;
  startingPrice: number;
  heading: string;
  introduction: string;
  costNote: string;
  packages: PricingPackage[];
}[] = [
  {
    id: "web-design", name: "Web Design", contactService: "Website Development", billing: "one-off", startingPrice: 120,
    heading: "A simple start. Or a website built for more.",
    introduction: "Choose a clear online introduction, a complete business website or a shop ready to take orders. Each option has a different job to do.",
    costNote: "Website design and development are one-off payments. Hosting packages start from £5 per month. Domain names, paid tools and any ongoing care are discussed separately.",
    packages: [
      { id: "web-starter", name: "Starter", price: 120, forWho: "For a simple online presence", description: "One focused page that introduces your business and gives people a way to contact you.", features: ["A single-page website", "Sections for your services, business and contact details", "Layout adapted for mobile and desktop", "Contact form and click-to-call links", "Your supplied logo, images and written content added", "Basic page title and description setup"], note: "Best for a straightforward introduction. Choose Professional for separate pages and more functionality." },
      { id: "web-professional", name: "Professional", recommended: true, forWho: "For businesses ready to grow", description: "A complete business website with dedicated pages, clear customer journeys and the functionality you actually need.", features: ["A tailored design reviewed with you in Figma", "Dedicated Home, About, Services and Contact pages", "Individual service pages agreed around your offer", "Mobile-friendly layouts throughout", "Working enquiry forms and a clear path to contact you", "A way to update your own website content", "Booking or customer-tool integrations agreed with you", "Search foundations, launch checks and handover"], note: "We agree the page count, integrations, content work and support before building. Your quote receives the 50% discount." },
      { id: "web-ecommerce", name: "Ecommerce", forWho: "For selling products online", description: "A complete online shop that lets customers browse, pay securely and place orders—and gives you the tools to manage it.", features: ["A shop design shaped around your brand", "Product pages, categories and product search", "Shopping basket and customer checkout", "Secure payment-gateway integration", "An admin dashboard for products, stock and orders", "Product management, including prices and images", "Delivery settings and order confirmation emails", "Mobile shopping checks and an admin handover"], note: "Initial product uploads, platform and delivery requirements are agreed in your quote. Payment-provider fees and paid tools are separate." },
    ],
  },
  {
    id: "marketing", name: "Paid Marketing", contactService: "Paid Marketing", billing: "per month", startingPrice: 200,
    heading: "Reach the right people. Give them a reason to act.",
    introduction: "Start with one focused advertising campaign, then grow into more creative testing and coordinated campaigns as your business needs more support.",
    costNote: "Prices cover our monthly service. Advertising spend is separate and paid to the advertising platform. We agree your budget, campaign scope and discount period before starting.",
    packages: [
      { id: "marketing-starter", name: "Starter", price: 200, forWho: "For your first focused campaign", description: "Get started on one advertising platform with a clear audience, message and next step.", features: ["One advertising platform: Google or Meta", "One focused campaign around your main offer", "Audience and location targeting setup", "Ad copy and up to two variations using your assets", "Basic enquiry or conversion tracking setup", "Regular campaign checks and adjustments", "A monthly performance summary"], note: "A focused starting point using your existing landing page. Ad spend and new landing-page development are separate." },
      { id: "marketing-growth", name: "Growth", recommended: true, forWho: "For a steadier flow of enquiries", description: "More room to test your message, improve your campaigns and understand what brings the right customers.", features: ["Campaign planning around your business goals", "Campaigns for agreed services or offers", "More ad copy and creative variations", "Conversion tracking and campaign reporting", "Regular audience, keyword and budget optimisation", "A review of the page visitors land on", "A monthly review of progress and next steps"], note: "We agree the platforms, campaign count and creative workload with you. Claim 50% off your tailored monthly service quote." },
      { id: "marketing-scale", name: "Scale", forWho: "For a broader advertising strategy", description: "Coordinate your advertising across the channels and offers that matter to your business.", features: ["A coordinated plan across agreed ad platforms", "Campaigns for multiple offers or audiences", "Remarketing where suitable and consented", "A structured creative testing plan", "Tracking across the agreed customer journey", "Ongoing budget and campaign optimisation", "Combined reporting and regular strategy reviews"], note: "For a wider scope of ongoing support. Platforms, creative production and review frequency are set out in your discounted quote." },
    ],
  },
  {
    id: "seo", name: "SEO", contactService: "Growth & SEO", billing: "per month", startingPrice: 150,
    heading: "Help customers find you when they need you.",
    introduction: "Build on clear search foundations, improve the pages that matter and grow your visibility with useful content and ongoing improvements.",
    costNote: "SEO is a monthly service. We agree the pages, content work and discount period in your proposal. Search rankings, traffic and enquiries cannot be guaranteed.",
    packages: [
      { id: "seo-starter", name: "Starter", price: 150, forWho: "For stronger search foundations", description: "Understand what needs attention and improve the essentials on your most important pages.", features: ["An initial website and search visibility review", "Keyword research for your core service", "Improvements to up to three priority pages", "Page titles, descriptions and heading checks", "Basic technical and indexing checks", "A monthly summary of work and next steps"], note: "A focused plan for an existing small website. New page writing, major technical fixes and website rebuilding are quoted separately." },
      { id: "seo-growth", name: "Growth", recommended: true, forWho: "For building visibility over time", description: "A broader plan to improve your website, answer customer questions and reach more relevant searches.", features: ["A search plan for your services and audience", "Ongoing improvements across agreed pages", "Regular technical and indexing checks", "A content plan based on customer questions", "Agreed content writing or page refreshes", "Local search improvements where relevant", "Monthly reporting and a progress review"], note: "Page and content volumes are agreed around your goals. Claim 50% off your tailored monthly SEO quote." },
      { id: "seo-scale", name: "Scale", forWho: "For larger sites or more locations", description: "More extensive search support for a wider range of services, products or locations.", features: ["A broader keyword and competitor review", "A technical improvement plan for your site", "Content support across agreed services or categories", "Search improvements for multiple locations, if needed", "Internal linking and website structure improvements", "Ongoing monitoring and prioritised recommendations", "Reporting across your agreed business priorities"], note: "We scope the number of pages, locations and content pieces before you commit. Your tailored monthly quote receives the 50% discount." },
    ],
  },
];

export function getPricingOffer(id: string | null) {
  if (!id) return null;
  for (const service of pricingServices) {
    const plan = service.packages.find((item) => item.id === id);
    if (plan) return { service, plan };
  }
  return null;
}

export const pricingEnquiryHref = (id: string) => `/contact?offer=${encodeURIComponent(id)}`;

export const carePlans = [
  {
    id: "care-core", name: "Core Hosting Plan",
    description: "The essentials to keep your website online, protected and running.",
    includes: "Your hosting and care essentials",
    features: ["Secure web hosting", "SSL certificate management", "Up to 5 content edits per month", "Security updates", "Website health checks for uptime and broken links", "Emergency bug fixes when your site is down", "Mail server maintenance", "DNS support", "Basic performance optimisation"],
    note: "SEO is not included in Core.",
  },
  {
    id: "care-pro", name: "Pro Care Plan",
    description: "Ongoing improvements, updates and SEO support for peace of mind.",
    includes: "Everything in Core, plus",
    features: ["Unlimited content edits per month (terms apply)", "Basic on-page and technical SEO optimisation", "Speed and mobile performance checks", "Bug fixes for errors and broken layouts", "Priority support within 24 hours", "Quarterly image compression and optimisation", "Form testing and spam protection", "SEO health checks using tools", "Deeper ongoing performance and technical optimisation"],
    note: "Content-edit terms and support arrangements are agreed with you before starting.",
  },
  {
    id: "care-elite", name: "Elite Care Plan",
    description: "Complete website management with generous content edits and full technical support.",
    includes: "Everything in Pro, plus",
    features: ["Unlimited content edits per month (terms apply)", "24/7 VIP support", "Same-day urgent fixes", "Monthly user-experience review and improvement suggestions", "Conversion tips and layout suggestions", "Proactive content ideas to keep your site fresh", "Advanced on-page and technical SEO optimisation", "Quarterly SEO and speed performance snapshot"],
    note: "Content-edit terms and urgent support coverage are agreed with you before starting.",
  },
];
