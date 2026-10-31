export const SITE_URL = 'https://www.nirekshetty.com';
export const SITE_NAME = 'Nirek Shetty';
export const SITE_DESCRIPTION =
  'Nirek Shetty is a founder and product engineer from Toronto. Co-founder of Plyxl (YC W27), former product engineer at Penseum, and founder of Hackathons Canada.';

export const SAME_AS = [
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
  jobTitle: 'Co-founder',
  description: SITE_DESCRIPTION,
  address: { '@type': 'PostalAddress', addressLocality: 'Toronto', addressRegion: 'ON', addressCountry: 'CA' },
  worksFor: [
    { '@type': 'Organization', name: 'Plyxl', url: 'https://plyxl.com' },
    { '@type': 'Organization', name: 'Hackathons Canada', url: 'https://hna.dev' },
    { '@type': 'Organization', name: 'Contractual', url: 'https://contractual.ca' },
  ],
  alumniOf: { '@type': 'Organization', name: 'Penseum', url: 'https://penseum.com' },
  sameAs: SAME_AS,
};
