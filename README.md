# bestcitiesinspain.com

Independent English guide to the 8 best cities in Spain for a first visit. Astro 7 static site on Cloudflare Pages (project `bestcitiesinspain`), built on the geo travel kit (`ops/domains/geo-travel-kit.md`, same code as www-visitprosecco).

## Commands
- `npm run dev`, `npm run build`
- `npm run deploy`: build and deploy to Cloudflare Pages (main). Commits tagged `[deploy]` also deploy through GitHub Actions.
- `node scripts/og.mjs`: regenerate og.jpg, icons and favicon.ico.
- `node scripts/indexnow.mjs`: ping IndexNow with all sitemap URLs.

## Where things live
- `src/lib/site.ts`: site config, GetYourGuide link helper, guide/city order. `src/lib/i18n.ts`: UI strings; `ENABLED = ['en']` (German is ready in the kit, off here).
- `src/content/guides/*.md` (home.md = homepage), `src/content/destinations/*.md` (8 cities).
- `src/data/tours.json` (merged from `src/data/parts/<city>.tours.json`), `src/data/photos.json` (from `parts/<city>.photos.json`).
- `src/views/home-text.ts`: homepage blocks (chooser, seasons, hero buttons).
- `public/_redirects`: old URLs. `functions/_middleware.js`: www and pages.dev → apex.

## Rules
- Nothing invented: every fact sourced and dated. Train times from Renfe's timetable (see getting-around-spain.md).
- Tour prices are GetYourGuide's, shown with the checked date. All GYG links via `GYG.link()` with `data-gyg` (Plausible `outbound_gyg`).
- Hotels: Booking.com links converted by Stay22; no prices, stars or scores.
- Barcelona stays short and links to ilovecatalonia.com.
