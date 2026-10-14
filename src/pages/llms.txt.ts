import { getCollection } from 'astro:content';
import { SITE, GUIDE_ORDER, DEST_ORDER } from '../lib/site';

// llms.txt: a plain map of the site for AI answer engines.
export async function GET() {
  const guides = await getCollection('guides');
  const dests = await getCollection('destinations');
  const home = guides.find((e) => e.id === 'home')!;
  const line = (path: string, e: { data: { title: string; summary: string } }) => `- [${e.data.title}](${SITE.url}${path}): ${e.data.summary}`;
  const body = [
    `# ${SITE.name}`,
    '',
    `> ${home.data.summary}`,
    '',
    'Independent English guide to the 8 best cities in Spain for a first visit (Madrid, Barcelona, Seville, Granada, Valencia, Málaga, San Sebastián, Bilbao). Not affiliated with any tourist board. Facts are checked against primary sources, with a last-checked date on every page. Tour prices are GetYourGuide prices on the date shown.',
    '',
    '## Start here',
    line('/', home),
    '',
    '## Guides',
    ...GUIDE_ORDER.map((s) => line(`/${s}/`, guides.find((e) => e.id === s)!)),
    '',
    '## Cities',
    ...DEST_ORDER.map((s) => line(`/destinations/${s}/`, dests.find((e) => e.id === s)!)),
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
