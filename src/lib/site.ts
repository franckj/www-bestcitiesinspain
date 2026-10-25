import { plain } from './inline-md';

export const SITE = {
  name: 'Best Cities in Spain',
  url: 'https://bestcitiesinspain.com',
  description: 'An independent guide to the 8 best cities in Spain for a first visit: how to choose, how many days, trains between them, where to stay and tours worth booking.',
  // hello@ forwards to Franck through Cloudflare Email Routing.
  email: 'hello@bestcitiesinspain.com',
};

export const PUBLISHED = '2026-02-27';

export const GYG = {
  partnerId: '0GI6KRZ',
  // Adds the partner parameters to a GetYourGuide deep link.
  // German pages send readers to GetYourGuide's German site (/de-de/ path), as Ken Lin's giliair.com/de/ does.
  link: (url: string, lang: 'en' | 'de' = 'en') => {
    const u = lang === 'de' ? url.replace('://www.getyourguide.com/', '://www.getyourguide.com/de-de/') : url;
    return `${u}${u.includes('?') ? '&' : '?'}partner_id=0GI6KRZ&utm_medium=online_publisher`;
  },
};

// Guides in reading order (footer, llms.txt, homepage).
// GetYourGuide location page for Spain. Hero and header buttons go here, as on Ken Lin's sites.
export const GYG_LOCATION = 'https://www.getyourguide.com/spain-l169003/';

export const GUIDE_ORDER = ['spain-tours', 'getting-around-spain', 'itineraries', 'where-to-stay', 'best-time-to-visit-spain'];
export const DEST_ORDER = ['madrid', 'barcelona', 'seville', 'granada', 'valencia', 'malaga', 'san-sebastian', 'bilbao'];

export const SHORT_NAMES_DE: Record<string, string> = {};
export const shortName = (slug: string, lang: 'en' | 'de' = 'en') => (lang === 'de' ? SHORT_NAMES_DE[slug] : undefined) ?? SHORT_NAMES[slug];

export const SHORT_NAMES: Record<string, string> = {
  'spain-tours': 'Tours by city',
  'getting-around-spain': 'Getting around',
  itineraries: 'Itineraries',
  'where-to-stay': 'Where to stay',
  'best-time-to-visit-spain': 'Best time to visit',
  madrid: 'Madrid',
  barcelona: 'Barcelona',
  seville: 'Seville',
  granada: 'Granada',
  valencia: 'Valencia',
  malaga: 'Málaga',
  'san-sebastian': 'San Sebastián',
  bilbao: 'Bilbao',
};

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
export const fmtIso = (s: string) => fmtDate(new Date(s + 'T00:00:00Z'));

export const publisher = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#org`,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: { '@type': 'ImageObject', url: `${SITE.url}/icon-512.png` },
};

export const websiteFor = (lang: 'en' | 'de') => ({
  '@type': 'WebSite',
  '@id': `${SITE.url}${lang === 'de' ? '/de' : ''}/#website`,
  name: SITE.name,
  url: `${SITE.url}${lang === 'de' ? '/de' : ''}/`,
  description: SITE.description,
  publisher: { '@id': `${SITE.url}/#org` },
  inLanguage: lang,
});

export const website = {
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.name,
  url: `${SITE.url}/`,
  description: SITE.description,
  publisher: { '@id': `${SITE.url}/#org` },
  inLanguage: 'en',
};

export const faqSchema = (faq: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE.url}${it.path}` })),
});

export const destinationSchema = (d: { name: string; description: string; lat: number; lng: number; path: string; image?: string }) => ({
  '@type': 'TouristDestination',
  '@id': `${SITE.url}${d.path}#place`,
  name: d.name,
  description: d.description,
  url: `${SITE.url}${d.path}`,
  ...(d.image ? { image: `${SITE.url}${d.image}` } : {}),
  geo: { '@type': 'GeoCoordinates', latitude: d.lat, longitude: d.lng },
  containedInPlace: { '@type': 'Country', name: 'Spain' },
});

export const mapLink = (lat: number, lng: number) => `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
