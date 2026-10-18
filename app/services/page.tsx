import { getRouteMetadata } from '@/lib/sanity/metadata';
import { getPageSeo, toPageContent } from '@/lib/sanity/data';
import PageSeoData from '@/components/sanity/PageSeoData';
import ServicesPage from '@/components/ServicesPage';

export const revalidate = 3600;
export async function generateMetadata() { return getRouteMetadata('/services', {title:'Truedge Digital',description:'Professional web development agency website built with Next.js'}); }
export default async function Services() {
 const page = await getPageSeo('/services');
 return <><ServicesPage content={toPageContent(page)} /><PageSeoData page={page} /></>;
}
