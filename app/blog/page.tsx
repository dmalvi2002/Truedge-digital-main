import type { Metadata } from 'next';
import Journal, { getJournal, journalMetadata } from '@/components/blog/Journal';
import { blogFilters, type BlogSearchParams } from '@/lib/blog';

export const revalidate = 3600;
type Props = { searchParams: Promise<BlogSearchParams> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const filters = blogFilters(await searchParams);
  return journalMetadata(await getJournal('', filters.q, filters.sort, filters.page), filters);
}

export default async function Blog({ searchParams }: Props) {
  const filters = blogFilters(await searchParams);
  const data = await getJournal('', filters.q, filters.sort, filters.page);
  return <Journal data={data} filters={filters} />;
}
