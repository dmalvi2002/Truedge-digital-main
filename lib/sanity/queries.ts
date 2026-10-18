import { defineQuery } from 'next-sanity';

export const PAGE_SEO_BY_ROUTE_QUERY = defineQuery(`
  *[_type == "pageSeo" && routePath == $routePath] | order(_updatedAt desc)[0]{
    _id, _updatedAt, pageName, routePath, h1Heading, heroSubheading,
    seo{metaTitle, metaDescription, focusKeyword, canonicalUrl, noIndex, structuredData,
      ogImage{..., asset->{_id, url, metadata{dimensions, lqip}}}},
    faqs[]{_key, question, answer}
  }
`);

export const ALL_BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc){
    _id, title, "slug": slug.current, publishedAt, excerpt,
    mainImage{..., asset->{_id, url, metadata{dimensions, lqip}}},
    author->{name, role}, categories[]->{_id, title, "slug": slug.current}
  }
`);

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug && publishedAt <= now()][0]{
    _id, _updatedAt, title, "slug": slug.current, publishedAt, updatedAt, excerpt,
    mainImage{..., asset->{_id, url, metadata{dimensions, lqip}}},
    author->{name, role, bio, "slug": slug.current,
      avatar{..., asset->{_id, url, metadata{dimensions, lqip}}}},
    categories[]->{_id, title, "slug": slug.current},
    body[]{..., _type == "image" => {asset->{_id, url, metadata{dimensions, lqip}}}},
    seo{metaTitle, metaDescription, focusKeyword, canonicalUrl, noIndex, structuredData,
      ogImage{..., asset->{_id, url, metadata{dimensions, lqip}}}}
  }
`);

export const SITEMAP_SLUGS_QUERY = defineQuery(`
  *[_type == "blogPost" && defined(slug.current) && publishedAt <= now() && seo.noIndex != true]{
    "slug": slug.current, _updatedAt, updatedAt, publishedAt
  }
`);

export const PAGE_SITEMAP_QUERY = defineQuery(`
  *[_type == "pageSeo"]{routePath, _updatedAt, "noIndex": seo.noIndex}
`);

export const BLOG_STATIC_PARAMS_QUERY = defineQuery(`
  *[_type == "blogPost" && defined(slug.current) && publishedAt <= now()]{"slug": slug.current}
`);
