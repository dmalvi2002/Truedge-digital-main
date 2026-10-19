import Link from 'next/link';
import { PortableText, type PortableTextComponents, type PortableTextTypeComponentProps } from '@portabletext/react';
import type { BLOG_POST_BY_SLUG_QUERY_RESULT } from '@/sanity.types';
import { safeHref } from '@/lib/sanity/content';
import { headingId } from '@/lib/blog';
import SanityImage, { type CmsImage } from './SanityImage';

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children, value }) => <h2 id={value._key ? headingId(value._key) : undefined}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={value._key ? headingId(value._key) : undefined}>{children}</h3>,
    h4: ({ children, value }) => <h4 id={value._key ? headingId(value._key) : undefined}>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: { bullet: ({ children }) => <ul>{children}</ul>, number: ({ children }) => <ol>{children}</ol> },
  listItem: { bullet: ({ children }) => <li>{children}</li>, number: ({ children }) => <li>{children}</li> },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>, em: ({ children }) => <em>{children}</em>, code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => {
      const href = safeHref(value?.href);
      if (!href) return <>{children}</>;
      const newTab = value?.openInNewTab === true;
      const rel = [newTab ? 'noopener noreferrer' : '', value?.relNoFollow ? 'nofollow' : ''].filter(Boolean).join(' ') || undefined;
      return href.startsWith('/') && !newTab ? <Link href={href} rel={rel}>{children}</Link> : <a href={href} target={newTab ? '_blank' : undefined} rel={rel}>{children}</a>;
    },
  },
  types: {
    image: ({ value }: PortableTextTypeComponentProps<CmsImage>) => <figure><SanityImage image={value} width={1200} />{value.caption && <figcaption>{value.caption}</figcaption>}</figure>,
  },
};

export default function PortableTextBody({ body }: { body: NonNullable<BLOG_POST_BY_SLUG_QUERY_RESULT>['body'] }) {
  return body?.length ? <PortableText value={body} components={portableTextComponents} /> : null;
}
