export const marketingServices = {
  seo: {
    route: '/marketing/seo',
    name: 'SEO services in Aberdeen',
    description: 'Help customers in Aberdeen find your business through technical SEO, local search improvements and useful service content.',
    intro: 'When someone searches for a service you offer in Aberdeen, they should be able to find the right page, understand what you do and get in touch. We work on the parts of your site that make those steps easier.',
    sections: [
      { title: 'Find what is holding your site back', body: 'We review which pages appear in search, how your services are organised and where people are sent when they click. Issues such as missing pages, conflicting canonical URLs or weak internal links go into a prioritised plan.' },
      { title: 'Make your services easier to find locally', body: 'We help you explain what you offer, where you work and what customers can expect. That can mean improving service pages, clarifying contact details and answering questions that customers ask before they enquire.' },
      { title: 'Measure progress against enquiries', body: 'We can use Search Console to see which queries and pages earn clicks, then use your existing analytics setup to see which pages lead to calls or forms. Search visibility takes time, so we agree what to measure and review as the work progresses.' },
    ],
    firstStep: 'Bring your website address, the services you want to grow and the areas you serve. If you have Search Console data, it can help us see what people already find.',
  },
  'google-ads': {
    route: '/marketing/google-ads',
    name: 'Google Ads management in Aberdeen',
    description: 'Plan and manage Google Search campaigns for your Aberdeen business, with clear budgets, relevant landing pages and enquiry tracking.',
    intro: 'Reach people searching for your services in Aberdeen with campaigns built around where you work, what you offer and what a worthwhile enquiry looks like.',
    sections: [
      { title: 'Plan the campaign around your service area', body: 'We agree which services and locations to prioritise, then group relevant searches around them. We review search terms after launch and exclude irrelevant queries so more of your budget goes towards potential customers.' },
      { title: 'Give each ad a relevant landing page', body: 'A person clicking an ad should find the service and location they expected, with a clear way to call or enquire. We review that journey before launch and flag changes that would make it easier to take the next step.' },
      { title: 'Track the enquiries that matter', body: 'We agree which calls and forms should count as conversions, review what drove them and use those findings to adjust campaigns. Your ad spend and our management fees are discussed separately, so you can see where the money goes.' },
    ],
    firstStep: 'Bring the services you want to advertise, your service area and a rough monthly budget. If you already run Google Ads, your recent campaign and enquiry data can help us plan the next step.',
  },
} as const;
