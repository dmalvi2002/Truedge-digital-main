import 'server-only';
import { createClient, type QueryParams } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'w5f40uwq',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-19',
  useCdn: true,
  perspective: 'published',
  stega: false,
});

export async function sanityFetch<T>({ query, params = {}, tags = [] }: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, { next: { tags, revalidate: 3600 } });
}
