/* Test-process-only Sanity responses; never writes to the real project. */
if (process.env.SANITY_TEST_MODE === '1') {
  const originalFetch = globalThis.fetch;
  const image = { _type: 'image', alt: 'A test image with descriptive alternative text', caption: 'Test image caption', asset: { _id: 'image-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-1200x800-jpg', url: 'https://cdn.sanity.io/images/w5f40uwq/production/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-1200x800.jpg', metadata: { dimensions: { width: 1200, height: 800, aspectRatio: 1.5 } } } };
  const post = {
    _id: 'fixture-post', _type: 'blogPost', _updatedAt: '2026-01-02T12:00:00Z',
    title: 'A practical CMS integration test', slug: 'sanity-integration-test', publishedAt: '2026-01-01T12:00:00Z', excerpt: 'Testing a complete article without publishing any test content.',
    mainImage: image, author: { name: 'Test Author', role: 'Editor', bio: 'An isolated test fixture.' }, categories: [{ _id: 'fixture-category', title: 'Test category', slug: 'test' }],
    body: [
      { _key: 'heading', _type: 'block', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 'h', text: 'Semantic article heading', marks: [] }] },
      { _key: 'copy', _type: 'block', style: 'normal', markDefs: [{ _key: 'safe', _type: 'link', href: 'https://example.com', openInNewTab: true, relNoFollow: true }, { _key: 'unsafe', _type: 'link', href: 'javascript:alert(1)' }], children: [{ _type: 'span', _key: 'safe-text', text: 'Safe external link', marks: ['safe'] }, { _type: 'span', _key: 'unsafe-text', text: ' Unsafe link becomes text.', marks: ['unsafe'] }] },
      { _key: 'list', _type: 'block', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [{ _type: 'span', _key: 'item', text: 'A real semantic list item', marks: [] }] },
      { ...image, _key: 'inline-image' },
    ], seo: { metaTitle: 'CMS article title override', metaDescription: 'CMS article description override', noIndex: true },
  };
  globalThis.fetch = async (input, options) => {
    const address = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const url = new URL(address);
    if (!/^w5f40uwq\.(api|apicdn)\.sanity\.io$/.test(url.hostname) || !url.pathname.includes('/data/query/')) return originalFetch(input, options);
    const payload = options?.body && typeof options.body === 'string' ? JSON.parse(options.body) : {};
    const query = url.searchParams.get('query') || payload.query || '';
    const parameter = name => payload.params?.[name] ?? JSON.parse(url.searchParams.get('$' + name) || 'null');
    let result = null;
    if (query.includes('_type == "pageSeo"')) {
      result = query.includes('$routePath') ? parameter('routePath') === '/about' ? {
        _id: 'pageSeo.about', routePath: '/about', h1Heading: 'CMS controlled heading', heroSubheading: 'CMS controlled introduction',
        seo: { metaTitle: 'CMS about title override', metaDescription: 'CMS about description override', canonicalUrl: 'https://www.truedgedigital.co.uk/about', noIndex: true },
        faqs: [{ _key: 'faq', question: 'Does CMS FAQ publishing work?', answer: 'Yes, the same answer is in the page and its structured data.' }],
      } : null : [{ routePath: '/about', noIndex: true }];
    } else if (query.includes('_type == "blogPost"')) {
      result = query.includes('$slug') ? parameter('slug') === post.slug ? post : null : query.includes('order(publishedAt desc)') ? [post] : query.includes('seo.noIndex != true') ? [] : [{ slug: post.slug }];
    }
    if (query.includes('_type == "pageSeo"') && parameter('routePath') === '/contact') result = {
      _id: 'pageSeo.contact', routePath: '/contact', seo: { structuredData: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: '</script><script>should never execute</script>' }) },
    };
    // Exercise the real page wrappers without creating/publishing CMS records.
    const routes = ['/', '/web-design', '/marketing', '/ai-automation', '/pricing', '/contact', '/services', '/blog'];
    const route = parameter('routePath');
    if (query.includes('_type == "pageSeo"') && routes.includes(route)) {
      const name = route === '/' ? 'home' : route.slice(1);
      result = {
        ...result, routePath: route,
        h1Heading: `CMS fixture ${name} heading`,
        heroSubheading: `CMS fixture ${name} introduction`,
        seo: {
          ...result?.seo,
          metaTitle: `CMS fixture ${name} search title`,
          metaDescription: `CMS fixture ${name} search description`,
          noIndex: false, ogImage: image,
        },
        faqs: [{ _key: name, question: `CMS fixture ${name} question?`, answer: `CMS fixture ${name} answer.` }],
      };
    }
    return new Response(JSON.stringify({ result, query, ms: 1 }), { status: 200, headers: { 'content-type': 'application/json' } });
  };
}
