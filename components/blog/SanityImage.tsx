import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import type { BLOG_POST_BY_SLUG_QUERY_RESULT } from '@/sanity.types';

export type CmsImage = NonNullable<NonNullable<BLOG_POST_BY_SLUG_QUERY_RESULT>['mainImage']>;

export default function SanityImage({ image, width = 1400, className, priority = false }: { image?: CmsImage | null; width?: number; className?: string; priority?: boolean }) {
  if (!image?.asset) return null;
  const dimensions = image.asset.metadata?.dimensions;
  const ratio = dimensions?.aspectRatio || 1.6;
  return <Image src={urlFor(image).width(width).url()} alt={image.alt || ''}
    width={width} height={Math.round(width / ratio)} className={className} priority={priority}
    sizes="(max-width: 700px) 92vw, (max-width: 1100px) 85vw, 1100px"
    placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'} blurDataURL={image.asset.metadata?.lqip || undefined} />;
}
