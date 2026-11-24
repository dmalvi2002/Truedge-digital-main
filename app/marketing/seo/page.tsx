import MarketingServicePage from '@/components/MarketingServicePage';
import { marketingServices } from '@/lib/marketing-services';
import { getRouteMetadata } from '@/lib/sanity/metadata';

const service = marketingServices.seo;

export const revalidate = 3600;
export async function generateMetadata() {
  return getRouteMetadata(service.route, { title: `${service.name} | Truedge Digital`, description: service.description });
}

export default function SeoPage() {
  return <MarketingServicePage service={service} />;
}
