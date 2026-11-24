const previewTitles: Record<string, string> = {
  home: 'Your one-stop partner for digital growth',
  about: 'Meet Truedge Digital',
  'web-design': 'Web design and development',
  marketing: 'Digital marketing',
  'marketing-seo': 'SEO services in Aberdeen',
  'marketing-google-ads': 'Google Ads management in Aberdeen',
  'ai-automation': 'AI automation',
  pricing: 'Plans and pricing',
  works: 'Selected work',
  contact: 'Talk to Truedge Digital',
  blog: 'Ideas and insights',
};

export function previewTitle(key: string) {
  return Object.hasOwn(previewTitles, key) ? previewTitles[key] : undefined;
}

export function previewForPath(path: string) {
  const key = path.slice(1).replaceAll('/', '-') || 'home';
  return previewTitle(key) ? key : path.startsWith('/blog/') ? 'blog' : 'home';
}
