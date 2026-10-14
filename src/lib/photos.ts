import photos from '../data/photos.json';

export type Photo = {
  slug: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string | null;
  sourceUrl: string;
  description: string;
  description_de?: string;
  width: number;
  height: number;
};

export const PHOTOS = photos as Photo[];
export const photo = (slug?: string) => (slug ? PHOTOS.find((p) => p.slug === slug) : undefined);
export const src = (slug: string, w: 800 | 1600) => `/img/${slug}-${w}.webp`;
export const altText = (p: Photo, lang: 'en' | 'de') => (lang === 'de' && p.description_de) || p.description;
