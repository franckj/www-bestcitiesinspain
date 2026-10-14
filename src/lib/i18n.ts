// Languages. English lives at the root, German under /de/ with the same slugs (Ken Lin's pattern on giliair.com).
export const LANGS = ['en', 'de'] as const;
export type Lang = (typeof LANGS)[number];
// Languages this site publishes. With only 'en', no hreflang links and no language switch are output.
export const ENABLED: Lang[] = ['en'];

export const langOf = (url: URL): Lang => (url.pathname.startsWith('/de/') || url.pathname === '/de' ? 'de' : 'en');
export const pre = (lang: Lang) => (lang === 'de' ? '/de' : '');
export const href = (lang: Lang, path: string) => `${pre(lang)}${path}`;
// The same page in the other language.
export const altPath = (path: string, to: Lang) => {
  const bare = path.replace(/^\/de(?=\/|$)/, '') || '/';
  return to === 'de' ? `/de${bare}` : bare;
};

// Content collections per language.
export const col = (kind: 'guides' | 'destinations', lang: Lang) => (lang === 'de' ? (`${kind}De` as const) : kind);

export const LOCALE: Record<Lang, string> = { en: 'en-GB', de: 'de-DE' };
export const OG_LOCALE: Record<Lang, string> = { en: 'en_GB', de: 'de_DE' };
export const fmtDateL = (d: Date, lang: Lang) =>
  d.toLocaleDateString(LOCALE[lang], { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
export const fmtIsoL = (s: string, lang: Lang) => fmtDateL(new Date(s + 'T00:00:00Z'), lang);

const en = {
  home: 'Best cities in Spain',
  places: 'Cities',
  lastChecked: 'Last checked',
  onThisPage: 'On this page',
  faq: 'Frequently asked questions',
  faqShort: 'FAQ',
  keepPlanning: 'Keep planning',
  moreTours: 'More tours on GetYourGuide',
  toursInclude: (n: string) => `Tours that include ${n}`,
  timeNeeded: 'Time needed',
  map: 'Map',
  openMap: 'Open in Google Maps',
  photo: 'Photo',
  start: 'Start',
  reviews: 'reviews',
  from: 'From',
  perGroup: ' per group',
  seePrice: 'See price',
  onGyg: 'on GetYourGuide →',
  disclose: (d: string) =>
    `Prices and ratings as shown on GetYourGuide on ${d}; they change, so check the live page. We earn a commission if you book through these links, at no extra cost to you.`,
  howWorks: 'How this works',
  skip: 'Skip to content',
  langSwitch: 'Deutsch',
  bookTour: 'Book a tour',
  nav: [
    ['/destinations/', 'Cities'],
    ['/spain-tours/', 'Tours'],
    ['/getting-around-spain/', 'Trains'],
    ['/itineraries/', 'Itineraries'],
    ['/where-to-stay/', 'Where to stay'],
    ['/best-time-to-visit-spain/', 'When to go'],
  ],
  footerAbout:
    'An independent guide to Spain\'s best cities for a first visit: how to choose, how to get between them and what to book.',
  plan: 'Plan',
  howToVisit: 'How to visit',
  about: 'About',
  aboutGuide: 'About this guide',
  contact: 'Contact',
  affiliate: 'Affiliate disclosure',
  privacy: 'Privacy',
  credits: 'Image credits',
  fine: (y: number) =>
    `<strong>Independent travel guide, not affiliated with any Spanish tourist board.</strong> Some links are affiliate links: we earn a commission from GetYourGuide and Booking.com on bookings, at no extra cost to you. Tour prices come from GetYourGuide and can change. &copy; ${y} bestcitiesinspain.com`,
};

const de: typeof en = {
  home: 'Prosecco-Hügel',
  places: 'Orte',
  lastChecked: 'Zuletzt geprüft',
  onThisPage: 'Auf dieser Seite',
  faq: 'Häufige Fragen',
  faqShort: 'FAQ',
  keepPlanning: 'Weiter planen',
  moreTours: 'Weitere Touren bei GetYourGuide',
  toursInclude: (n: string) => `Touren mit ${n}`,
  timeNeeded: 'Zeitbedarf',
  map: 'Karte',
  openMap: 'In Google Maps öffnen',
  photo: 'Foto',
  start: 'Start',
  reviews: 'Bewertungen',
  from: 'Ab',
  perGroup: ' pro Gruppe',
  seePrice: 'Preis ansehen',
  onGyg: 'bei GetYourGuide →',
  disclose: (d: string) =>
    `Preise und Bewertungen wie am ${d} bei GetYourGuide angezeigt; sie ändern sich, bitte die aktuelle Seite prüfen. Buchst du über diese Links, erhalten wir eine Provision. Für dich ändert sich der Preis nicht.`,
  howWorks: 'So funktioniert das',
  skip: 'Zum Inhalt springen',
  langSwitch: 'English',
  bookTour: 'Tour buchen',
  nav: [
    ['/prosecco-tours/', 'Touren'],
    ['/from-venice/', 'Ab Venedig'],
    ['/itineraries/', 'Reiserouten'],
    ['/where-to-stay/', 'Unterkünfte'],
    ['/destinations/', 'Orte'],
    ['/best-time-to-visit/', 'Reisezeit'],
  ],
  footerAbout:
    'Ein unabhängiger Reiseführer zu den Prosecco-Hügeln von Conegliano und Valdobbiadene, für Reisende mit Standort Venedig oder Venetien.',
  plan: 'Planen',
  howToVisit: 'Anreise und Besuch',
  about: 'Über uns',
  aboutGuide: 'Über diesen Reiseführer',
  contact: 'Kontakt',
  affiliate: 'Affiliate-Hinweis',
  privacy: 'Datenschutz',
  credits: 'Bildnachweise',
  fine: (y: number) =>
    `<strong>Unabhängiger Reiseführer, nicht mit dem Consorzio oder einem Tourismusverband verbunden.</strong> Wir verkaufen keinen Wein. Einige Links sind Affiliate-Links: Bei Buchungen erhalten wir eine Provision von GetYourGuide und Booking.com, ohne Mehrkosten für dich. Tourpreise stammen von GetYourGuide und können sich ändern. &copy; ${y} visitprosecco.com`,
};

export const T: Record<Lang, typeof en> = { en, de };
