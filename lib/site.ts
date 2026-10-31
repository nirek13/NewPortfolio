export const SITE_URL = 'https://www.nirekshetty.com';
export const SITE_NAME = 'Nirek Shetty';
export const SITE_TITLE = 'Co-founder & CTO of Plyxl (YC W27)';
export const SITE_DESCRIPTION =
  'Nirek Shetty is the co-founder and CTO of Plyxl (YC W27), the workspace that does the work. Based in Toronto; former product engineer at Penseum and founder of Hackathons Canada.';

export const YC_FOUNDER_URL = 'https://www.ycombinator.com/founders/nirek-shetty';
export const YC_COMPANY_URL = 'https://www.ycombinator.com/companies/plyxl';

export const SAME_AS = [
  YC_FOUNDER_URL,
  'https://x.com/nirekshetty',
  'https://github.com/nirek13',
  'https://www.linkedin.com/in/nirekshetty/',
];

export const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/icon.jpg`,
  jobTitle: 'Co-founder & CTO',
  description: SITE_DESCRIPTION,
  address: { '@type': 'PostalAddress', addressLocality: 'Toronto', addressRegion: 'ON', addressCountry: 'CA' },
  worksFor: [
    {
      '@type': 'Organization',
      name: 'Plyxl',
      url: 'https://plyxl.com',
      sameAs: [YC_COMPANY_URL, 'https://x.com/plyxlapp'],
      founder: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    },
    { '@type': 'Organization', name: 'Hackathons Canada', url: 'https://hna.dev' },
    { '@type': 'Organization', name: 'Contractual', url: 'https://contractual.ca' },
  ],
  memberOf: { '@type': 'Organization', name: 'Y Combinator', url: 'https://www.ycombinator.com' },
  alumniOf: { '@type': 'Organization', name: 'Penseum', url: 'https://penseum.com' },
  sameAs: SAME_AS,
};
