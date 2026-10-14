import tours from '../data/tours.json';
import { GYG } from './site';

export type Tour = {
  id: string;
  group: string;
  title: string;
  url: string;
  priceFrom: number | null;
  priceUnit: string | null;
  currency: string;
  rating: number | null;
  reviews: number | null;
  duration: string | null;
  start: string | null;
  summary: string;
  // German title and summary, translated by us from the English card text.
  title_de?: string;
  summary_de?: string;
  places: string[];
  checked: string;
};

export const TOURS = tours as Tour[];

const CITY_NAMES: Record<string, string> = {
  madrid: 'Madrid', barcelona: 'Barcelona', seville: 'Seville', granada: 'Granada',
  valencia: 'Valencia', malaga: 'Málaga', 'san-sebastian': 'San Sebastián', bilbao: 'Bilbao',
};
// One tour group per city (group = city slug).
export const GROUPS: Record<string, { label: string; kind: string; label_de: string; kind_de: string }> = Object.fromEntries(
  Object.entries(CITY_NAMES).map(([slug, name]) => [slug, { label: `${name} tours and tickets`, kind: name, label_de: `Touren in ${name}`, kind_de: name }]),
);
export const groupLabel = (g: string, lang: 'en' | 'de') => (lang === 'de' ? GROUPS[g]?.label_de : GROUPS[g]?.label);
export const groupKind = (g: string, lang: 'en' | 'de') => (lang === 'de' ? GROUPS[g]?.kind_de : GROUPS[g]?.kind);

// Card photo per place (our own licensed photos, not GetYourGuide's): first match wins, avoiding repeats in a list.
const PLACE_PHOTO: [string, string][] = Object.entries(CITY_NAMES).flatMap(([slug, name]) => [
  [name.toLowerCase(), slug], [name.toLowerCase(), `${slug}-2`],
] as [string, string][]);
const GROUP_PHOTO: Record<string, string> = Object.fromEntries(Object.keys(CITY_NAMES).map((s) => [s, s]));
const FALLBACKS = ['madrid', 'seville', 'granada', 'valencia'];

// Picks a photo for each tour in a list: the first of its places whose photo isn't used yet in this list.
export function cardPhotos(list: Tour[]): string[] {
  const used = new Set<string>();
  return list.map((t) => {
    const own = t.places.flatMap((pl) => PLACE_PHOTO.filter(([k]) => pl.toLowerCase().includes(k)).map(([, v]) => v));
    // A fresh photo of one of the tour's own places; else repeat its own place; filler only when no place matches.
    const pick = own.find((c) => !used.has(c)) ?? own[0] ?? [GROUP_PHOTO[t.group], ...FALLBACKS].find((c) => c && !used.has(c)) ?? FALLBACKS[0];
    used.add(pick);
    return pick;
  });
}

export const byGroup = (g: string) => TOURS.filter((t) => t.group === g);
export const byPlace = (p: string) => TOURS.filter((t) => t.places.map((x) => x.toLowerCase()).includes(p.toLowerCase()));
export const byIds = (ids: string[]) => ids.map((id) => TOURS.find((t) => t.id === id)).filter(Boolean) as Tour[];
export const tourHref = (t: Tour, lang: 'en' | 'de' = 'en') => GYG.link(t.url, lang);
export const lastChecked = (list: Tour[]) => list.map((t) => t.checked).sort().pop() ?? '';
