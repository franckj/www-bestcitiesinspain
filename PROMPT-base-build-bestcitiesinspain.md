# Claude Code Build Prompt — bestcitiesinspain.com

## What You're Building

A new travel guide website at **bestcitiesinspain.com** — an independent guide to Spain's greatest cities. This is an Astro site with Tailwind CSS, deployed on Cloudflare Pages. The domain is an exact-match keyword domain targeting "best cities in spain."

The site launches with a homepage, 8 city destination pages, an about page, and 4 legal pages. Clean, fast, mobile-first. No bloat.

---

## Project Setup

```bash
# Init Astro project (if not already done)
npm create astro@latest bestcitiesinspain -- --template minimal
cd bestcitiesinspain

# Install dependencies
npx astro add tailwind
npm install @astrojs/sitemap
npm install sharp  # for image optimization
```

**astro.config.mjs:**
```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bestcitiesinspain.com',
  integrations: [tailwind(), sitemap()],
});
```

---

## Brand Tokens

Use these throughout. Define as CSS custom properties in the global stylesheet AND as Tailwind config values.

| Token | Value | Usage |
|-------|-------|-------|
| Primary (Terracotta) | `#B7472A` | Headings, CTAs, active states, city card accents |
| Accent (Gold) | `#D4A017` | Logo highlight, stat bars, secondary buttons |
| Background | `#FAF7F2` | Page background, card backgrounds |
| Dark | `#1A1A1A` | Nav background, footer background, body text |
| Light text | `#FAF7F2` | Text on dark backgrounds |
| Body text | `#333333` | Paragraph text |
| Muted text | `#6B7280` | Captions, meta info, secondary text |

**Fonts:**
- Display: `Playfair Display` (Google Fonts — headings, logo, city names)
- Body: `Source Sans 3` (Google Fonts — everything else)

Load via `<link>` in the `<head>` of BaseLayout. Only load weights 400, 600, 700 for body; 700 for display.

---

## File Structure

```
src/
  components/
    BaseLayout.astro       # HTML shell, head, nav, footer
    Nav.astro              # Navigation bar
    Footer.astro           # Site footer
    CityCard.astro         # City preview card (used on homepage)
    CityHero.astro         # Hero section for city pages
    QuickFacts.astro       # Quick facts sidebar/box on city pages
    HighlightCard.astro    # Individual highlight item on city pages
  content/
    config.ts              # Content collection schema
    cities/
      barcelona.md
      madrid.md
      seville.md
      granada.md
      valencia.md
      san-sebastian.md
      bilbao.md
      malaga.md
  pages/
    index.astro            # Homepage
    [slug].astro           # Dynamic city page route
    about.astro
    contact.astro
    privacy.astro
    terms.astro
    disclaimer.astro
    404.astro
  styles/
    global.css             # Tailwind directives + custom properties
public/
  robots.txt
  llms.txt
  images/
    og-default.jpg         # Placeholder OG image (1200x630, generate later)
```

---

## Component Specifications

### BaseLayout.astro

Props: `title`, `description`, `ogImage` (optional), `canonicalURL` (optional), `schema` (optional JSON-LD string)

**`<head>` must include:**
- `<meta charset="utf-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<title>{title} | Best Cities in Spain</title>` (homepage just "Best Cities in Spain — An Independent Travel Guide")
- `<meta name="description" content={description}>`
- `<link rel="canonical" href={canonicalURL || Astro.url.href}>`
- Google Fonts preconnect + stylesheet links
- OG tags: `og:title`, `og:description`, `og:image` (absolute URL), `og:url`, `og:type` ("website"), `og:locale` ("en_US")
- Twitter tags: `twitter:card` ("summary_large_image"), `twitter:title`, `twitter:description`, `twitter:image`
- JSON-LD schema block if `schema` prop provided
- Favicon (use a simple emoji favicon for now: `<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🇪🇸</text></svg>">`)

**Body structure:** Nav → `<main>` slot → Footer

### Nav.astro

- Fixed/sticky at top
- Dark background (`#1A1A1A`) always (this is a practical site, not editorial — keep nav dark)
- Logo on left: "bestcities**in**spain" — "bestcities" in `#D4A017` (gold), "in" in `#FAF7F2` (light), "spain" in `#D4A017` (gold). Playfair Display, bold. Links to `/`.
- Nav links on right: **Cities** (links to `/#cities`), **Guides** (links to `/guides/` — show as "Coming Soon" or link to anchor), **About** (links to `/about/`)
- Mobile: hamburger menu
- Nav height: 64px
- Add `scroll-padding-top: 80px` to html for anchor links

### Footer.astro

- Dark background (`#1A1A1A`), light text
- Three columns (stack on mobile):
  1. Site name + tagline + disclaimer line
  2. **Cities** — links to all 8 city pages
  3. **Info** — About, Contact, Privacy, Terms, Disclaimer
- Bottom bar: "© 2026 bestcitiesinspain.com · An independent travel guide — not affiliated with any Spanish tourism board."
- Email: hello@bestcitiesinspain.com

### CityCard.astro

Props: `name`, `slug`, `region`, `hook` (one-line description), `imagePlaceholder` (a CSS gradient or color for now — real images come later)

- Card with subtle shadow, rounded corners
- Top section: colored gradient placeholder (use a different warm gradient per city based on its character — e.g., golden amber for Seville, cool blue-grey for Bilbao)
- City name in Playfair Display, bold
- Region in muted text
- Hook line (one sentence)
- "Explore →" link in terracotta
- Hover: subtle lift/shadow increase
- Links to `/{slug}/`

### CityHero.astro

Props: `name`, `region`, `hook`

- Full-width section with gradient background (city-specific warm gradient, NOT an image for now)
- City name large (Playfair Display, 3xl–5xl responsive)
- Region as subtitle
- Hook as intro line
- Breadcrumb: Home > Cities > {City Name}

### QuickFacts.astro

Props: `facts` object with: `region`, `population`, `airport`, `bestMonths`, `avgTemp`, `currency` (always "Euro (€)")

- Styled box/card, sits in a sidebar on desktop or below hero on mobile
- Clean label: value pairs
- Subtle background tint

### HighlightCard.astro

Props: `title`, `description`

- Simple card with title and 2-sentence description
- Number or icon prefix
- Used in a grid of 4-5 per city page

---

## Page Specifications

### Homepage (index.astro)

**SEO:**
- Title: "Best Cities in Spain — An Independent Travel Guide"
- Description: "Discover the best cities in Spain to visit in 2026. From Barcelona to Bilbao, our independent guide covers where to go, when to visit, and what makes each city worth your time."

**Schema:** Organization JSON-LD
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Best Cities in Spain",
  "url": "https://bestcitiesinspain.com",
  "description": "An independent travel guide to Spain's greatest cities"
}
```

**Content structure:**

1. **Hero Section**
   - Headline: "Best Cities in Spain"
   - Subhead: "An independent guide to where to go, when to visit, and why it matters"
   - Brief intro paragraph (2-3 sentences): "Spain has over 8,000 cities and towns, but only a handful truly deserve your time. Whether you're drawn to Gaudí's Barcelona, the tapas bars of Madrid, or the Moorish palaces of Granada, this guide cuts through the noise. We've visited every city on this list — here's what's actually worth it."

2. **City Grid Section** (id="cities")
   - Section heading: "8 Cities Worth Your Time"
   - 8 CityCards in a responsive grid (2 cols on mobile, 3 on tablet, 4 on desktop)
   - Order: Barcelona, Madrid, Seville, Granada, Valencia, San Sebastián, Bilbao, Málaga

3. **Why Trust This Guide** section
   - Short section (3-4 sentences): "This isn't a listicle scraped from other travel sites. Best Cities in Spain is an independent guide — not affiliated with any tourism board or hotel chain. Every recommendation comes from on-the-ground experience, not press trips. We'll tell you when a city is overrated, when to skip the tourist trap, and where to find what the locals actually love."

4. **Latest Guides** section
   - Heading: "Latest Guides"
   - Placeholder text: "Our in-depth city guides are coming soon. Check back for seasonal recommendations, city comparisons, and insider travel tips."
   - (This section will show real guide cards once Phase 2 articles are published)

### City Pages ([slug].astro)

Uses Astro content collections. Dynamic route renders each city from `src/content/cities/*.md`.

**SEO per city:**
- Title: "{City Name}, Spain — Travel Guide | Best Cities in Spain"
- Description: from frontmatter `description` field

**Schema:** TravelArticle + BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "TravelArticle",
  "headline": "{City Name}, Spain — Why Visit & What to Know",
  "author": {
    "@type": "Person",
    "name": "Franck",
    "url": "https://bestcitiesinspain.com/about/"
  },
  "datePublished": "2026-02-27",
  "dateModified": "2026-02-27",
  "inLanguage": "en",
  "publisher": {
    "@type": "Organization",
    "name": "Best Cities in Spain",
    "url": "https://bestcitiesinspain.com"
  }
}
```

**Page layout:**
1. CityHero (name, region, hook)
2. Two-column layout on desktop (content left, QuickFacts sidebar right). Single column on mobile (QuickFacts after hero).
3. Content sections from markdown body (rendered with prose styling)
4. "Explore More Cities" section at bottom — grid of 3 other CityCards (exclude current city, pick randomly or by region proximity)

**Content collection schema (config.ts):**
```ts
import { defineCollection, z } from 'astro:content';

const cities = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    region: z.string(),
    hook: z.string(),
    description: z.string(), // meta description
    population: z.string(),
    airport: z.string(),
    bestMonths: z.string(),
    avgTemp: z.string(),
    gradient: z.string(), // CSS gradient for placeholder hero
    highlights: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
    order: z.number(), // display order
  }),
});

export const collections = { cities };
```

### About Page (/about/)

**Title:** "About This Guide | Best Cities in Spain"
**Description:** "Best Cities in Spain is an independent travel guide — not a tourism board, not a hotel chain. Learn about who's behind the recommendations."

**Content (write this as HTML/Astro, ~400 words):**

Heading: "About Best Cities in Spain"

"Best Cities in Spain is an independent travel guide to the cities that make this country one of Europe's most compelling destinations. We're not affiliated with any Spanish tourism board, hotel chain, or tour operator.

Spain draws over 85 million visitors a year — more than almost any country on Earth. Most of them head straight to Barcelona or Madrid, and plenty never make it beyond the resort coasts. That's a mistake. The real Spain lives in the tapas bars of Seville, the pintxo crawls of San Sebastián, the street art of Málaga, and the Moorish courtyards of Granada.

This site exists to help you figure out which cities are actually worth your time — and how to make the most of them when you get there. Every recommendation is based on personal experience, not press trips or sponsored content.

**What we cover:**
We focus on Spain's cities — not resorts, not beaches (unless they're part of a city worth visiting), not rural retreats. For each city, you'll find honest assessments of what to see, when to go, where to base yourself, and what most guides get wrong.

**What we don't do:**
We don't accept payment for recommendations. We don't rank cities based on who has the best affiliate program. If we recommend a tour or a hotel booking platform, it's because we'd use it ourselves — and yes, we may earn a commission if you book through our links. That's how we keep this site running without putting it behind a paywall.

**Who's behind this:**
This guide is written and maintained by Franck — a France-based travel writer, builder of independent regional guides, and firm believer that the best way to understand a country is through its cities. You can also find his work at ilovecatalonia.com.

Have a question or a correction? Reach out at hello@bestcitiesinspain.com."

**Schema:** Person
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Franck",
  "url": "https://bestcitiesinspain.com/about/",
  "sameAs": ["https://ilovecatalonia.com/about/"]
}
```

### Legal Pages

Build these as simple, clean pages using the BaseLayout. No sidebar. Centered prose content, max-width ~720px.

**Contact (/contact/)**
- Heading: "Contact"
- "Have a question, a correction, or a suggestion? We'd love to hear from you."
- Email: hello@bestcitiesinspain.com
- "We typically respond within 48 hours. For press inquiries or partnership proposals, please use the same address."

**Privacy Policy (/privacy/)**
- Title: "Privacy Policy"
- Last updated: February 2026
- Include: analytics disclosure ("This site uses Plausible Analytics, a privacy-first tool that collects no personal data and sets no cookies. No consent banner is required."), AdSense future disclosure ("If display advertising is active on this site, third-party vendors including Google may use cookies to serve ads based on prior visits. You can opt out at google.com/settings/ads."), affiliate link disclosure, GDPR contact (hello@bestcitiesinspain.com), data controller info.

**Terms of Service (/terms/)**
- Standard terms: content is for informational purposes, no guarantees on accuracy of travel information, prices and availability subject to change, intellectual property notice.

**Disclaimer (/disclaimer/)**
- Affiliate disclosure: "Some links on this site are affiliate links. If you book through them, we may earn a commission at no extra cost to you. This never influences our recommendations."
- Travel info disclaimer: "Travel conditions, prices, visa requirements, and local regulations change frequently. Always verify current information before traveling."
- Independence statement: "Best Cities in Spain is not affiliated with any Spanish tourism board, government body, or hotel chain."

---

## City Content (Content Collection Markdown Files)

Create these files in `src/content/cities/`. Each file has YAML frontmatter + markdown body.

### barcelona.md

```yaml
---
name: "Barcelona"
region: "Catalonia"
hook: "Where Gaudí's imagination meets Mediterranean beaches and one of Europe's best food scenes."
description: "Barcelona travel guide — what to see, when to visit, and where to stay in Spain's most creative city. An independent guide from Best Cities in Spain."
population: "1.6 million (metro: 5.5 million)"
airport: "BCN — El Prat"
bestMonths: "May, June, September, October"
avgTemp: "22°C in summer, 10°C in winter"
gradient: "linear-gradient(135deg, #E8913A 0%, #B7472A 100%)"
order: 1
highlights:
  - title: "La Sagrada Família"
    description: "Gaudí's unfinished masterpiece has been under construction since 1882 and remains the most visited monument in Spain. Book tickets weeks in advance — morning light through the stained glass is worth the early alarm."
  - title: "Gothic Quarter (Barri Gòtic)"
    description: "A maze of medieval streets hiding Roman ruins, independent shops, and some of the city's best tapas bars. Get lost on purpose — that's how you find the good stuff."
  - title: "Park Güell"
    description: "Gaudí's mosaic-covered park overlooking the city. The free zone offers views nearly as good as the ticketed monumental area. Go at opening time or sunset."
  - title: "La Boqueria Market"
    description: "One of Europe's oldest food markets, right off La Rambla. Skip the overpriced tourist smoothies at the entrance and head to the stalls deeper inside for real Catalan ingredients."
  - title: "Barceloneta Beach"
    description: "The city's most accessible beach, a short walk from the Gothic Quarter. Not the prettiest in Spain, but the combination of swimming and then tapas in the same afternoon is hard to beat."
---

## Why Barcelona

Barcelona is the city most visitors think of first when planning a trip to Spain — and for good reason. It's a place where medieval alleyways open onto futuristic architecture, where you can spend the morning in a world-class art museum and the afternoon swimming in the Mediterranean. The creative energy here is impossible to ignore. Gaudí's buildings alone would justify the trip, but Barcelona goes much deeper than that.

What makes Barcelona genuinely special is how it layers its identities. This is the capital of Catalonia, with its own language, traditions, and cultural pride. It's a Mediterranean port city with a food scene that spans Michelin-starred restaurants and €3 vermouth bars. It's a football city, a nightlife city, a design city. The risk with Barcelona is actually trying to do too much — the best visits are the ones where you slow down, pick a neighborhood, and let the city come to you.

## When to Visit

May, June, September, and October offer the best balance of good weather, manageable crowds, and reasonable prices. July and August are hot and packed with tourists — every major attraction has long queues. If you're coming in winter, Barcelona is still pleasant (10–15°C most days) and you'll have major sites nearly to yourself. Avoid the week of Mobile World Congress (late February) when hotel prices spike.

## Getting There

Barcelona–El Prat airport (BCN) is a major European hub with direct flights from most capitals. The Aerobus runs to Plaça Catalunya in 35 minutes for about €7. If you're arriving from elsewhere in Spain, the AVE high-speed train connects to Madrid in 2.5 hours and to Seville in 5.5 hours. Sants station is the main rail hub.

## Where to Base Yourself

**El Born / La Ribera** is the sweet spot — walkable to the Gothic Quarter, the beach, and Ciutadella Park, but less hectic than La Rambla. For a quieter experience with better-value accommodation, look at **Gràcia**, a village-like neighborhood with its own plaças and excellent local restaurants. Avoid staying directly on La Rambla — it's noisy, touristy, and overpriced.
```

### madrid.md

```yaml
---
name: "Madrid"
region: "Community of Madrid"
hook: "Spain's late-night capital — where world-class art, unbeatable tapas, and the country's best nightlife collide."
description: "Madrid travel guide — what to see, when to visit, and where to stay in Spain's vibrant capital. An independent guide from Best Cities in Spain."
population: "3.3 million (metro: 6.7 million)"
airport: "MAD — Barajas"
bestMonths: "March, April, May, September, October"
avgTemp: "25°C in summer, 6°C in winter"
gradient: "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)"
order: 2
highlights:
  - title: "The Prado Museum"
    description: "One of the world's finest art collections, with works by Velázquez, Goya, and El Greco. It's enormous — pick a wing and go deep rather than trying to see everything in one visit."
  - title: "Retiro Park"
    description: "Madrid's green lung — 125 hectares of fountains, gardens, and the famous Crystal Palace. Rent a rowboat on the lake or just sit under the trees with a bocadillo. Perfect for a midday break."
  - title: "Mercado de San Miguel"
    description: "A beautifully restored iron market near Plaza Mayor. Yes, it's touristy and prices reflect that. But the quality of the tapas and wine is genuinely good, especially as a first-night introduction to Spanish food."
  - title: "Plaza Mayor & Puerta del Sol"
    description: "Madrid's two iconic squares are worth crossing through but not lingering in — the real action is on the side streets radiating outward, where locals eat and drink at half the price."
  - title: "Reina Sofía Museum"
    description: "Home to Picasso's Guernica, one of the most powerful paintings in existence. Free entry on certain evenings — check the schedule. The contemporary collection is underrated."
---

## Why Madrid

Madrid doesn't try to charm you on first impression the way Barcelona or Seville do. It's a city that reveals itself gradually — through a late-night tapas crawl in La Latina, a Sunday afternoon stroll through Retiro, or the sudden silence of standing in front of Velázquez's Las Meninas at the Prado. Spain's capital is the cultural and political heart of the country, and it moves at its own pace: lunch at 2pm, dinner at 10pm, and a nightlife that genuinely doesn't get going until midnight.

What makes Madrid essential for any Spain trip is its sheer cultural density. Within a one-kilometre stretch you have three of the world's great art museums (the Prado, Reina Sofía, and Thyssen-Bornemisza). The food scene is extraordinary — from traditional tavernas serving cocido madrileño to some of the most innovative restaurants in Europe. And because Madrid is landlocked and relatively off the beach-holiday circuit, it feels more authentically Spanish than many coastal cities. This is where Spaniards from every region come to live, work, and eat.

## When to Visit

Spring (March–May) and autumn (September–October) are ideal. Madrid in summer can be brutally hot — 40°C days are common in July and August, and much of the city empties out as locals flee to the coast. Winter is cold but sunny, with far fewer tourists. Christmas in Madrid is atmospheric, with lights on Gran Vía and markets in Plaza Mayor.

## Getting There

Madrid-Barajas airport (MAD) is Spain's biggest hub, with connections worldwide. The metro runs directly from the airport to the city centre in about 30 minutes. Madrid is also the centre of Spain's AVE high-speed rail network — you can reach Barcelona, Seville, Valencia, and Málaga in under 3 hours. Atocha and Chamartín are the main stations.

## Where to Base Yourself

**Malasaña** is the best all-round neighbourhood for visitors — walkable to everything, packed with independent restaurants and bars, and full of character without being touristy. **La Latina** is ideal if food is your priority (Sunday Rastro market + the best tapas streets in the city). Avoid Gran Vía for accommodation — it's the equivalent of staying on Times Square.
```

### seville.md

```yaml
---
name: "Seville"
region: "Andalusia"
hook: "The soul of Andalusia — flamenco, orange trees, Moorish palaces, and the best tapas culture in Spain."
description: "Seville travel guide — what to see, when to visit, and where to stay in the heart of Andalusia. An independent guide from Best Cities in Spain."
population: "690,000 (metro: 1.5 million)"
airport: "SVQ — San Pablo"
bestMonths: "March, April, October, November"
avgTemp: "36°C in summer, 11°C in winter"
gradient: "linear-gradient(135deg, #D4A017 0%, #B7472A 100%)"
order: 3
highlights:
  - title: "Real Alcázar"
    description: "A stunning royal palace complex with Mudejar, Gothic, and Renaissance architecture layered over centuries. The gardens are as impressive as the interiors. Book tickets online to skip the queue."
  - title: "Seville Cathedral & La Giralda"
    description: "The largest Gothic cathedral in the world, with a Moorish minaret tower you can climb for panoramic city views. Christopher Columbus's tomb is here — though historians still debate whether it's really him."
  - title: "Flamenco in Triana"
    description: "Seville is where flamenco was born, and Triana (across the river) is its heartland. Skip the overpriced tourist tablao and find a smaller venue or peña where the performers outnumber the audience."
  - title: "Plaza de España"
    description: "A jaw-dropping semicircular plaza built for the 1929 Exposition. Each alcove represents a Spanish province with hand-painted ceramic tiles. Best at sunset when the light turns everything golden."
  - title: "Barrio Santa Cruz"
    description: "The old Jewish quarter — narrow alleyways, hidden courtyards, and orange trees everywhere. Touristy at the main plazas but quietly beautiful one street back."
---

## Why Seville

If you only visit one city in southern Spain, make it Seville. No other city in the country hits you with the same emotional force — the scent of orange blossoms, the sound of a guitar drifting from a courtyard, the visual overload of Moorish tiles and Baroque churches competing for your attention on the same street. Seville is dramatic, proud, and intensely alive, especially in the evenings when the whole city comes outside to walk, eat, and talk.

Seville is also where you feel the layers of Spanish history most vividly. The Alcázar is a living timeline from Moorish rule through Catholic reconquest to modern monarchy. The cathedral was built on top of a mosque — you can still climb the original minaret. And the flamenco here isn't a show for tourists; it's a living art form with roots that go generations deep. This city demands that you slow down, stay out late, and let it pull you in.

## When to Visit

March, April, and October–November are the sweet spots. Seville in July and August is genuinely punishing — temperatures regularly hit 40°C+ and the city feels deserted. Semana Santa (Holy Week, March/April) and the Feria de Abril are spectacular but crowded; book months ahead. Late October is underrated — warm, quiet, and affordable.

## Getting There

Seville's airport (SVQ) has limited international connections but good links from other Spanish cities. The AVE high-speed train from Madrid takes just 2.5 hours and is often the best option. From Barcelona it's about 5.5 hours by train or a 2-hour flight.

## Where to Base Yourself

**Alameda de Hércules** is Seville's best-kept secret — a tree-lined plaza surrounded by tapas bars, boutique hotels, and local life. It's walkable to the old town but feels like a neighbourhood, not a theme park. **Santa Cruz** puts you right next to the Alcázar and cathedral but is pricier and more touristy. **Triana** across the river is authentic and atmospheric, with the city's best flamenco and ceramics.
```

### granada.md

```yaml
---
name: "Granada"
region: "Andalusia"
hook: "The Alhambra alone justifies the trip — but Granada's free tapas, Moorish quarter, and Sierra Nevada views seal the deal."
description: "Granada travel guide — what to see, when to visit, and where to stay in the city of the Alhambra. An independent guide from Best Cities in Spain."
population: "230,000"
airport: "GRX — Federico García Lorca"
bestMonths: "April, May, September, October"
avgTemp: "33°C in summer, 7°C in winter"
gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
order: 4
highlights:
  - title: "The Alhambra"
    description: "A Moorish palace-fortress that's quite simply one of the most extraordinary buildings in the world. Book tickets at least 2–3 weeks ahead — they sell out every day. The Nasrid Palaces are the highlight; don't miss your timed entry."
  - title: "Albaicín Quarter"
    description: "Granada's old Moorish neighbourhood, a UNESCO World Heritage Site of whitewashed houses and winding cobblestone streets. Walk up to the Mirador de San Nicolás for the most photographed view of the Alhambra with the Sierra Nevada behind."
  - title: "Free Tapas Culture"
    description: "Granada is one of the last cities in Spain where you still get a free tapa with every drink. The portions are generous too — a full evening of bar-hopping here is essentially dinner. Calle Navas is the classic strip."
  - title: "Sacromonte"
    description: "The neighbourhood of cave dwellings above the Albaicín, historically home to Granada's Roma community. Some caves now host zambra flamenco shows — raw, intimate, and completely different from the polished performances elsewhere."
  - title: "Sierra Nevada"
    description: "Europe's southernmost ski resort is just 45 minutes from the city centre. In summer, the same mountains offer excellent hiking with views all the way to the Mediterranean. You can literally ski in the morning and be on the beach by afternoon."
---

## Why Granada

Granada is the kind of city that changes how you think about Spain. Where Barcelona and Madrid feel European and cosmopolitan, Granada pulls you somewhere closer to North Africa — the Moorish architecture, the tea houses of Calle Calderería Nueva, the smell of spices in the Alcaicería market. It's a smaller city with a university-town energy, and it costs a fraction of what you'd spend in Barcelona.

But of course, the main reason people come is the Alhambra — and it absolutely lives up to the hype. There's nothing else like it in Europe. The Nasrid Palaces are overwhelming in their detail and beauty, and the Generalife gardens offer some of the most serene spaces you'll find anywhere. What makes Granada more than a one-attraction city is everything that surrounds it: the Albaicín's cobbled alleys, the free tapas tradition, the Sierra Nevada looming in the background, and a genuine lack of pretension that bigger Spanish cities sometimes can't manage.

## When to Visit

April–May and September–October offer pleasant temperatures and fewer crowds. Summer gets very hot (35°C+), though the nights are lovely. Winter is cold by Andalusian standards but sunny, and the Alhambra is far easier to get tickets for. If you ski, winter lets you combine the slopes with city sightseeing.

## Getting There

Granada's airport (GRX) is small, with limited connections — mostly domestic and a few European routes. Most visitors arrive by bus or car from Málaga (1.5 hours), Seville (3 hours), or Madrid (4 hours by car, or 3.5 hours by AVE via Antequera). A direct high-speed rail link to Madrid opened recently.

## Where to Base Yourself

**Central Granada (around Plaza Nueva)** puts you at the foot of both the Alhambra hill and the Albaicín. It's the most practical base with the best restaurants nearby. **Albaicín** itself is atmospheric but hilly — great if you're fit and want to wake up to Alhambra views. The area around **Calle Navas** is ideal for the tapas-crawl lifestyle.
```

### valencia.md

```yaml
---
name: "Valencia"
region: "Valencian Community"
hook: "Paella's birthplace, a futuristic arts complex, golden beaches — and none of the Barcelona crowds."
description: "Valencia travel guide — what to see, when to visit, and where to stay in Spain's most underrated big city. An independent guide from Best Cities in Spain."
population: "800,000 (metro: 1.8 million)"
airport: "VLC — Manises"
bestMonths: "April, May, June, September, October"
avgTemp: "28°C in summer, 11°C in winter"
gradient: "linear-gradient(135deg, #E67E22 0%, #F39C12 100%)"
order: 5
highlights:
  - title: "City of Arts and Sciences"
    description: "Santiago Calatrava's futuristic complex is Valencia's defining landmark — a series of swooping white structures housing an aquarium, science museum, and opera house. It photographs like nowhere else in Spain."
  - title: "Authentic Paella"
    description: "This is where paella was invented, and Valencians take it seriously. Traditional paella Valenciana uses chicken and rabbit, not seafood. Eat it at lunch, never dinner, and never with chorizo. Try it in El Palmar near the Albufera lagoon for the real deal."
  - title: "Turia Gardens"
    description: "A 9km park running through the heart of the city, built in the bed of a diverted river. It connects most of Valencia's major sights and is perfect for walking, cycling, or just sitting in the shade. One of the best urban green spaces in Europe."
  - title: "El Carmen Quarter"
    description: "Valencia's old town is a collision of medieval walls, street art, and hip café culture. It's walkable, uncrowded, and full of surprises — from hidden plazas to tiny horchata bars that have been open for a century."
  - title: "Las Fallas Festival (March)"
    description: "Valencia's most famous festival fills the streets with enormous satirical sculptures, fireworks, and non-stop celebration for a week in March. The final night's Cremà, when every sculpture is burned, is one of Spain's most spectacular events."
---

## Why Valencia

Valencia is the city that people who've been to Spain keep telling you about. It has everything Barcelona offers — beaches, architecture, incredible food, walkable old town — but without the crowds, the pickpocket warnings, or the inflated prices. Spain's third-largest city has quietly become one of its best, with a quality of life that regularly tops European rankings.

The mix here is unique: you can walk from a medieval silk exchange to a Santiago Calatrava-designed aquarium in 20 minutes, eat the world's most authentic paella for lunch, cycle through 9km of gardens in the afternoon, and be on a wide golden beach by sunset. Valencia doesn't shout about itself the way Barcelona does, and that's part of its appeal. The locals aren't tired of tourists yet, the food is some of the best in Spain (and among the most affordable), and there's a genuine creative energy that feels unforced.

## When to Visit

April through June and September through October are ideal. Summer is hot but tempered by the sea breeze, and the beaches are excellent. If you time it right, Las Fallas in March is unforgettable — but book accommodation months ahead. Winter is mild and quiet.

## Getting There

Valencia airport (VLC) has good European connections and is just 20 minutes from the city centre by metro. The AVE high-speed train connects to Madrid in 1 hour 40 minutes — one of Spain's best rail links. Barcelona is about 3 hours by train.

## Where to Base Yourself

**El Carmen / Ciutat Vella** is the old town — central, walkable, and full of character. Best for first-time visitors. **Ruzafa** is Valencia's trendiest neighbourhood, with the city's best brunch spots, wine bars, and independent shops. It's a 15-minute walk south of the old town and excellent value. For beach access, **Malvarrosa/Cabanyal** puts you on the sand but still close to the centre by tram.
```

### san-sebastian.md

```yaml
---
name: "San Sebastián"
region: "Basque Country"
hook: "The pintxo capital of the world — golden beaches, Michelin stars per capita like nowhere else, and a Basque soul."
description: "San Sebastián travel guide — what to see, when to visit, and where to stay in Spain's culinary capital. An independent guide from Best Cities in Spain."
population: "187,000"
airport: "EAS — San Sebastián (or BIO — Bilbao, 1hr away)"
bestMonths: "June, July, August, September"
avgTemp: "21°C in summer, 8°C in winter"
gradient: "linear-gradient(135deg, #1ABC9C 0%, #16A085 100%)"
order: 6
highlights:
  - title: "Pintxo Bars of the Parte Vieja"
    description: "The old town's narrow streets hold one of the world's greatest food experiences. Each bar displays its pintxos (Basque tapas) on the counter — order one or two, drink a txakoli, move on. Repeat until happy. Ganbara and La Cuchara de San Telmo are legendary."
  - title: "Playa de la Concha"
    description: "Consistently rated one of Europe's best urban beaches, with a perfect crescent of golden sand framed by green hills. The promenade along it is ideal for an evening stroll. Even if you don't swim, the setting is unforgettable."
  - title: "Monte Igueldo"
    description: "Take the vintage funicular up this hill on the western end of La Concha bay for the best panoramic view of the city. There's a charmingly retro amusement park at the top — skip the rides, come for the vista."
  - title: "Michelin Star Dining"
    description: "San Sebastián has more Michelin stars per capita than almost anywhere on Earth. Arzak, Mugaritz, and Akelarre are the headliners. You don't need to splurge — the pintxo bars offer world-class food for a few euros per bite."
  - title: "Surfing at Zurriola Beach"
    description: "The east-facing Zurriola beach picks up consistent Atlantic swell and has a young, energetic scene around it. Board rental is cheap, and the Gros neighbourhood behind the beach has some of the city's best casual restaurants."
---

## Why San Sebastián

San Sebastián (Donostia in Basque) is the strongest argument that the best things in Spain aren't all in the south. Tucked into the Bay of Biscay just 20km from the French border, it's a city that revolves around two things: food and the sea. The pintxo bar scene in the Parte Vieja is genuinely one of the world's great culinary experiences — you can eat a dozen different dishes from a dozen different bars in a single evening, all within a few hundred metres, all for the price of a mediocre dinner elsewhere.

But San Sebastián is more than food. The physical setting is extraordinary — Playa de la Concha is an almost absurdly beautiful city beach, and the green hills rising on either side of the bay give the whole city a sense of enclosure and intimacy. The Basque culture here is distinct from the rest of Spain: different language, different traditions, different politics. There's a pride of place that you feel in everything from the architecture to the way people talk about their neighbourhood bar. It's small enough to walk everywhere, sophisticated enough to never feel provincial.

## When to Visit

Summer (June–September) is the best time — the weather is warm, the beaches are swimmable, and the city hosts major festivals including the San Sebastián International Film Festival in September. It rains more here than in the rest of Spain, so come prepared even in summer. Autumn and spring are beautiful but unpredictable; winter is quiet and grey but the food scene never sleeps.

## Getting There

San Sebastián's airport (EAS) is tiny with limited flights. Most visitors fly into Bilbao (BIO), about 1 hour away by bus or car. The bus service between the two cities runs every 30 minutes. You can also reach San Sebastián by train from Madrid (5–6 hours) or by bus from Bordeaux, France (2.5 hours).

## Where to Base Yourself

**Parte Vieja (Old Town)** is the obvious choice — you're steps from the pintxo bars, La Concha beach, and the harbour. It's small and walkable. **Gros** (across the river from the old town) is a great alternative if you want a slightly younger, more local feel — it's the surfing neighbourhood with excellent casual dining. **Centro / Área Romántica** has the most elegant hotels and is centrally positioned between both beaches.
```

### bilbao.md

```yaml
---
name: "Bilbao"
region: "Basque Country"
hook: "The Guggenheim transformed this industrial city into a cultural powerhouse — and the food scene might be even better."
description: "Bilbao travel guide — what to see, when to visit, and where to stay in the Basque Country's biggest city. An independent guide from Best Cities in Spain."
population: "350,000 (metro: 1 million)"
airport: "BIO — Loiu"
bestMonths: "May, June, September, October"
avgTemp: "20°C in summer, 9°C in winter"
gradient: "linear-gradient(135deg, #7F8C8D 0%, #2C3E50 100%)"
order: 7
highlights:
  - title: "Guggenheim Museum"
    description: "Frank Gehry's titanium-clad masterpiece is still jaw-dropping nearly 30 years after it opened. The building itself is the main attraction, but the contemporary art inside — particularly Richard Serra's massive steel sculptures — is worth the ticket price on its own."
  - title: "Casco Viejo (Old Town)"
    description: "Bilbao's original seven streets are compact and walkable, filled with pintxo bars, independent shops, and the Santiago Cathedral. The Sunday morning market here is excellent. This is where Bilbao's history lives."
  - title: "Mercado de la Ribera"
    description: "Europe's largest covered market, sitting on the river bank in the old town. The ground floor is a traditional fresh market; upstairs has been converted into a food hall with some of the city's best casual eating. Great for lunch."
  - title: "Pintxo Culture"
    description: "Bilbao's pintxo scene rivals San Sebastián's, and locals will argue it's better. The style is slightly different — more innovative, more avant-garde. Plaza Nueva in the old town is a good starting point."
  - title: "Nervión Riverfront"
    description: "The walk along the Nervión from the old town to the Guggenheim is Bilbao's best free experience. The river that once defined an industrial city is now lined with parks, sculptures, and modern architecture. It tells the whole story of Bilbao's transformation."
---

## Why Bilbao

Bilbao is the greatest urban reinvention story in Europe. Thirty years ago, this was a declining industrial port city — grey, polluted, and losing population. Then the Guggenheim opened in 1997 and everything changed. Today, Bilbao is a confident, creative city that's using world-class architecture and design to write its next chapter, without abandoning the gritty Basque character that makes it interesting.

The Guggenheim gets the headlines, but the real Bilbao is in the Casco Viejo — the original seven streets where old-school pintxo bars sit next to craft beer joints, where grandmothers shop at the Ribera market, and where the local athletic club (Athletic Bilbao) is almost a religion. The food here is extraordinary, the people are warm, and the city is compact enough to explore entirely on foot. Bilbao is also the natural gateway to the wider Basque Country — San Sebastián, the coast, and the wine region of Rioja are all easy day trips.

## When to Visit

May through October offers the best weather, though Bilbao never gets as hot as southern Spain — summer temperatures peak around 25°C. It rains a lot here (this is green Spain), so always have a light rain jacket. The Aste Nagusia (Great Week) festival in August is a lively celebration worth timing your visit around.

## Getting There

Bilbao airport (BIO) has good connections across Europe and is the main gateway to the Basque Country. The airport is 15 minutes from the city centre by bus. By train, Bilbao connects to Madrid and Barcelona, though the routes are slower than the AVE lines in the south. Buses to San Sebastián run every 30 minutes (1 hour).

## Where to Base Yourself

**Casco Viejo** is the best base — it's where the life is, the pintxos are, and it's an easy walk to the Guggenheim along the river. Hotels here tend to be smaller and more characterful. **Ensanche / Abando** is the modern business district between the old town and the Guggenheim — more polished, with bigger hotels and wider streets. Good if you want a central position with easy access to both areas.
```

### malaga.md

```yaml
---
name: "Málaga"
region: "Andalusia"
hook: "Picasso's birthplace has reinvented itself as a cultural hotspot — great museums, beaches, and the gateway to southern Spain."
description: "Málaga travel guide — what to see, when to visit, and where to stay in Andalusia's coastal capital. An independent guide from Best Cities in Spain."
population: "580,000 (metro: 1.6 million)"
airport: "AGP — Costa del Sol"
bestMonths: "April, May, June, September, October"
avgTemp: "30°C in summer, 12°C in winter"
gradient: "linear-gradient(135deg, #3498DB 0%, #2980B9 100%)"
order: 8
highlights:
  - title: "Museo Picasso Málaga"
    description: "Housed in a beautifully restored 16th-century palace, this museum holds over 200 works donated by Picasso's family. It's a more intimate experience than the Picasso museums in Barcelona or Paris — fitting, given this is where he was born."
  - title: "Alcazaba & Gibralfaro Castle"
    description: "An 11th-century Moorish fortress perched above the city with spectacular views over the port and coastline. Walk up through the gardens — the path from the Alcazaba to Gibralfaro is one of the best urban hikes in Andalusia."
  - title: "Calle Marqués de Larios"
    description: "Málaga's elegant main shopping street, recently pedestrianised. It leads down to the port and is the social heart of the city. During Christmas, the light display here is one of the most famous in Spain."
  - title: "Muelle Uno & Port Area"
    description: "The regenerated port area has a Centre Pompidou outpost (the colourful glass cube), restaurants, and a pleasant waterfront promenade. It bridges the gap between the old town and the beach."
  - title: "Atarazanas Market"
    description: "Málaga's central market in a gorgeous 19th-century building with a Moorish-style entrance. Come hungry — the stall holders will offer you samples of local olives, cheeses, and Málaga wine. The bars surrounding it are excellent for a late breakfast."
---

## Why Málaga

For years, Málaga was just the airport you flew into before heading to the Costa del Sol resorts. That's changed dramatically. The city itself has become one of the most interesting urban destinations in southern Spain — a place with genuine cultural weight, excellent food, year-round sunshine, and a relaxed Mediterranean personality that makes it easy to love.

The transformation has been driven by a wave of museum openings (Picasso, Pompidou, Contemporary Art, Russian Museum) and a thoughtful regeneration of the historic centre and port area. But what makes Málaga work is that it still feels like a real Andalusian city, not a tourist construct. People live here, work here, and go out for tapas at midnight just like they always have. The combination of beach, culture, history, and affordability makes it one of the strongest all-round destinations on this list — especially if you're visiting Spain for the first time and want a taste of Andalusia without the extreme heat of inland Seville or Granada.

## When to Visit

Málaga enjoys some of the best weather in mainland Europe — over 300 days of sunshine a year. April through June and September through October are ideal. Even winter is pleasant (15–18°C on many days), making it a genuine year-round destination. August is hot and busy with Spanish holidaymakers but the sea breeze takes the edge off.

## Getting There

Málaga–Costa del Sol airport (AGP) is one of Spain's busiest, with cheap flights from across Europe. The city is connected to Madrid by AVE high-speed train in about 2.5 hours. It's also the natural starting point for an Andalusian road trip — Granada (1.5 hours), Córdoba (2 hours), Seville (2.5 hours), and Ronda (1.5 hours) are all within easy reach.

## Where to Base Yourself

**Centro Histórico** is compact and walkable — stay here for proximity to museums, restaurants, and the port. Streets around **Plaza de la Merced** (where Picasso was born) are particularly pleasant. **Soho / Arts District** just south of the centre has a more creative, edgy feel with street art and newer restaurants. **Pedregalejo** is a former fishing village east of the centre with beachfront chiringuitos (fish restaurants) — ideal if you want a quieter, more local beach experience.
```

---

## Static Files

### public/robots.txt
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://bestcitiesinspain.com/sitemap-index.xml
```

### public/llms.txt
```
# bestcitiesinspain.com

> An independent travel guide to Spain's greatest cities. Not affiliated with any tourism board. Covers the best cities to visit in Spain with practical information on what to see, when to go, and where to stay.

## Core Cities
- Barcelona — Catalonia's creative capital
- Madrid — Spain's political and cultural heart
- Seville — The soul of Andalusia
- Granada — The Alhambra and Moorish heritage
- Valencia — Paella, futurism, and beaches
- San Sebastián — Culinary capital of the Basque Country
- Bilbao — Guggenheim and Basque reinvention
- Málaga — Picasso's birthplace, gateway to southern Spain

## About
Written by Franck. Independent guide — not affiliated with Spanish tourism boards.
```

---

## Styling Notes

- Use Tailwind v4 with custom properties matching the brand tokens
- Prose content on city pages: max-width 720px, comfortable line-height (1.7), readable font size (18px body)
- CityCards: subtle shadows, rounded corners (8px), smooth hover transitions
- No animations beyond simple hover effects and smooth scroll
- Mobile-first: city grid goes 1 col → 2 cols → 4 cols
- All text content must be selectable and accessible
- Images: placeholder gradients for now. Each city has a unique gradient defined in its frontmatter
- Ensure all headings have proper hierarchy (h1 → h2 → h3, no skipping)
- Add `scroll-margin-top` to sections for smooth anchor link behavior

## Performance Requirements

- No client-side JavaScript except what Astro requires
- No external dependencies beyond Google Fonts
- Inline critical CSS where possible
- All pages should be static (SSG) — no SSR needed
- Target: Lighthouse performance > 90

---

## 404 Page

Create `src/pages/404.astro`:
- Uses BaseLayout
- Friendly message: "This city doesn't exist (yet). Maybe it should — we're always expanding our guide."
- Link back to homepage
- Must return actual 404 status code (not a soft redirect)

Also add `public/_redirects`:
```
/* /404.html 404
```

---

## Deployment Notes

- GitHub repo should already be connected to Cloudflare Pages
- Build command: `npm run build`
- Build output directory: `dist`
- After first deploy: submit sitemap to Google Search Console
- Set up www → non-www 301 redirect in Cloudflare dashboard

---

## What's NOT In This Prompt (Phase 2)

- Guide articles (/guides/)
- GetYourGuide / Booking.com affiliate links
- Email signup
- OG image generation script
- FAQ schema
- Weather widgets
- Search functionality
- Analytics (add Plausible separately via Cloudflare dashboard)
