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

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc){
    _id, title, description, "slug": slug.current,
    "postCount": count(*[_type == "blogPost" && defined(slug.current) && publishedAt <= now() && ^._id in categories[]._ref])
  }
`);

export const BLOG_LIST_NEWEST_QUERY = defineQuery(`
  {
    "total": count(*[_type == "blogPost" && defined(slug.current) && publishedAt <= now()
      && ($categoryId == "" || $categoryId in categories[]._ref)
      && ($search == "" || title match $pattern || excerpt match $pattern || pt::text(body) match $pattern)]),
    "posts": *[_type == "blogPost" && defined(slug.current) && publishedAt <= now()
      && ($categoryId == "" || $categoryId in categories[]._ref)
      && ($search == "" || title match $pattern || excerpt match $pattern || pt::text(body) match $pattern)]
      | order(publishedAt desc, _id asc)[$start...$end]{
        _id, title, "slug": slug.current, publishedAt, excerpt,
        "readingMinutes": round(length(pt::text(body)) / 1200),
        mainImage{..., asset->{_id, url, metadata{dimensions, lqip}}},
        author->{name, role, avatar{..., asset->{_id, url, metadata{dimensions, lqip}}}},
        categories[]->{_id, title, "slug": slug.current}
      }
  }
`);

export const BLOG_LIST_OLDEST_QUERY = defineQuery(`
  {
    "total": count(*[_type == "blogPost" && defined(slug.current) && publishedAt <= now()
      && ($categoryId == "" || $categoryId in categories[]._ref)
      && ($search == "" || title match $pattern || excerpt match $pattern || pt::text(body) match $pattern)]),
    "posts": *[_type == "blogPost" && defined(slug.current) && publishedAt <= now()
      && ($categoryId == "" || $categoryId in categories[]._ref)
      && ($search == "" || title match $pattern || excerpt match $pattern || pt::text(body) match $pattern)]
      | order(publishedAt asc, _id asc)[$start...$end]{
        _id, title, "slug": slug.current, publishedAt, excerpt,
        "readingMinutes": round(length(pt::text(body)) / 1200),
        mainImage{..., asset->{_id, url, metadata{dimensions, lqip}}},
        author->{name, role, avatar{..., asset->{_id, url, metadata{dimensions, lqip}}}},
        categories[]->{_id, title, "slug": slug.current}
      }
  }
`);

export const RELATED_BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && _id != $postId && defined(slug.current) && publishedAt <= now()
    && (count($categoryIds) == 0 || count(categories[@._ref in $categoryIds]) > 0)]
    | order(publishedAt desc)[0...3]{
      _id, title, "slug": slug.current, publishedAt, excerpt,
      "readingMinutes": round(length(pt::text(body)) / 1200),
      mainImage{..., asset->{_id, url, metadata{dimensions, lqip}}},
      author->{name, role}, categories[]->{_id, title, "slug": slug.current}
    }
`);
