export const SITE_URL = 'https://www.nirekshetty.com';
export const SITE_NAME = 'Nirek Shetty';
export const SITE_DESCRIPTION =
  'Nirek Shetty is a founder and product engineer from Toronto. Founder of Plyxl (YC W27), former product engineer at Penseum, and founder of Hackathons Canada.';

export const SAME_AS = [
  'https://x.com/nirekshetty',
  'https://github.com/nirek13',
  'https://www.linkedin.com/in/nirekshetty/',
];

export const PLYXL_URL = 'https://plyxl.com';
export const PLYXL_DESCRIPTION =
  'Plyxl (YC W27) is a control plane for businesses. It connects to the tools a company already runs on, builds one brain out of what is inside them, and lets an agent build the apps and automations the business needs on top.';

const PERSON_ID = `${SITE_URL}/#person`;
const PLYXL_ID = `${SITE_URL}/plyxl#organization`;

export const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/icon.jpg`,
  jobTitle: 'Founder of Plyxl',
  description: SITE_DESCRIPTION,
  address: { '@type': 'PostalAddress', addressLocality: 'Toronto', addressRegion: 'ON', addressCountry: 'CA' },
  worksFor: [
    { '@type': 'Organization', '@id': PLYXL_ID, name: 'Plyxl', url: PLYXL_URL },
    { '@type': 'Organization', name: 'Hackathons Canada', url: 'https://hna.dev' },
    { '@type': 'Organization', name: 'Contractual', url: 'https://contractual.ca' },
  ],
  alumniOf: { '@type': 'Organization', name: 'Penseum', url: 'https://penseum.com' },
  knowsAbout: ['Plyxl', 'Startups', 'Product engineering', 'AI agents', 'Business software'],
  sameAs: SAME_AS,
};

export const PLYXL_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': PLYXL_ID,
  name: 'Plyxl',
  url: PLYXL_URL,
  logo: `${SITE_URL}/plyxl-mark.svg`,
  description: PLYXL_DESCRIPTION,
  founder: { '@type': 'Person', '@id': PERSON_ID, name: SITE_NAME, url: SITE_URL },
  subjectOf: { '@type': 'WebPage', url: `${SITE_URL}/plyxl` },
};
