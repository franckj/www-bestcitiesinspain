import { getCollection } from 'astro:content';
import { shortName } from './site';
import { col, href, type Lang } from './i18n';

// Turns slugs (guides or destinations) into link cards, in the page's language.
export async function relatedCards(slugs: string[], lang: Lang = 'en') {
  const guides = await getCollection(col('guides', lang));
  const dests = await getCollection(col('destinations', lang));
  return slugs.flatMap((s) => {
    const g = guides.find((e) => e.id === s);
    if (g) return [{ href: href(lang, `/${s}/`), title: shortName(s, lang) ?? g.data.title, text: g.data.description }];
    const d = dests.find((e) => e.id === s);
    if (d) return [{ href: href(lang, `/destinations/${s}/`), title: d.data.name, text: d.data.short }];
    return [];
  });
}
