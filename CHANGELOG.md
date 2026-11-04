# Changelog

Log of what changed on bestcitiesinspain.com and why. Newest first.

## 2026-11-04: weather function no longer crashes
- Supervisor alert: `/api/meteo?place=madrid` answered 500 (Cloudflare 1101, uncaught exception); San Sebastián too, the other 6 cities fine, MET Norway itself answering 200. Visitors saw no error, only a hidden weather box on those two pages.
- `functions/api/meteo.js`: the whole request is now in try/catch and answers 502 with the reason (logged with `console.error`), malformed forecast steps are skipped, an empty forecast is a 502, and the cache key moved to `__met-cache/v2/` so stored entries are bypassed. Franck's go and deploy.
- Cause, seen once the reason was returned: MET's answer for Madrid reached Cloudflare truncated ("Unterminated string in JSON at position 13659"). If the 4-decimal request fails, the function now asks once more at 3 decimals (about 50 m away, a different MET URL).
- Stay22 check (Franck: "check"): the events counter holds no bestcitiesinspain.com event at all since the switch (2026-10-25 to 2026-11-04), while 20 other sites do. So the 2026-11-01 entry's "every GetYourGuide click going through stay22.com/allez" did not come from this site's data, and whether clicks went through Stay22 between 1 and 4 Nov cannot be told: there were none recorded. Today, in headless Chrome on the Madrid page, GetYourGuide links are direct with partner 0GI6KRZ and a click sends `Outbound Link: Click` and `outbound_gyg` to the counter (test requests blocked, nothing stored). The 2026-11-01 GitHub deploy run had failed ("Failed to publish your Function"); today's deploys carry that change.
- Visits behind that zero (Franck: "visits"), Cloudflare Web Analytics: 29 Oct to 4 Nov, exact: 48 visits, 49 page views, all with no referrer (none from a search engine); 25 to 28 Oct, sampled estimate: about 30. Top pages: Madrid 7, getting around 5, home 5. Zero GetYourGuide clicks fits that traffic.

## 2026-11-01: Stay22 only rewrites Booking.com links
- GetYourGuide links stay direct with partner 0GI6KRZ: Stay22 (`restrictAllezSwapDOM: '.s22'`) now rewrites only Booking.com links, each wrapped in `span.s22` before its script loads. Since 2026-10-25 the events counter showed every GetYourGuide click going through stay22.com/allez. Same fix as americawinetrails (2026-10-24). Franck's go and deploy.

## 2026-10-25: Plausible replaced by the events counter
- Plausible's tag gave way to our cookie-free events counter (ops events/README.md); `outbound_gyg` unchanged, page views stay with Cloudflare Web Analytics, privacy page updated.

## 2026-10-14: session closed
- Live: 8 cities, 6 guides, 45 tours, live weather on city pages (added today). Next check: day-42 read on 2026-11-25. Waiting on Franck: nothing.

## 2026-10-14: live weather on place pages
- 3-day forecast (MET Norway, CC BY 4.0) on all 8 place pages, via a Pages Function at `/api/meteo?place=<slug>` that caches until MET's Expires and sends an identifying User-Agent. Coordinates from each page's lat/lng.
- Files: functions/api/meteo.js, src/components/Weather.astro, styles in global.css.

## 2026-10-14 (later) — Hero button wording

- Primary hero button now reads "Browse city tours & tickets" (was "Browse Spain tours"), matching the GetYourGuide Spain page it opens, which leads with city tickets. Franck asked for better wording.

## 2026-10-14 (later) — Booking button colour

- Booking buttons: one colour on every kit site, GetYourGuide blue #0071EB, white text (4.6:1 contrast); Franck asked for a conventional booking colour, 2026-10-14.

## 2026-10-14 (later) — Header button top right

- "Book a tour" moved to the top right of the header on every screen (Franck's request); menu wraps below on phones. Checked at 360 px and 1280 px.

## 2026-10-14 — Rebuilt on the geo travel kit v2

Plan: ops/domains/geo-travel-kit-v2-plan.md (site #3, added by Franck 2026-10-14; "go everything").

- **Why:** the February build (network template) had unsourced copy and photos with no recorded licence. Search Console, 14 Jul–13 Oct 2026: best page 44 impressions at position 18.6, 0 clicks. Nothing to preserve beyond URLs.
- **Model:** Ken Lin's ArcticOcean.com hub: homepage targets "best cities in spain" (3,600/mo US, low competition, DataForSEO 2026-10-14); one page per city answering "is it worth visiting, how many days, what to see, getting there".
- **Code:** copied from www-visitprosecco (Astro 7, views, i18n with ENABLED = ['en']). Terracotta/gold palette from the brief; new arch logo, favicon.ico + PNG icons, og.jpg from the Seville photo.
- **Content (research agents, every fact sourced):** 8 city pages, 6 guides (home, Spain tours, getting around, itineraries 7/10/14 days, where to stay with 8 hotels checked on their own sites and Booking.com, best time to visit). Train times aligned on Renfe's published timetable for Wed 21 Oct 2026 everywhere.
- **Tours:** 45 GetYourGuide activities (5–6 per city, rated ≥ 4.5), checked 2026-10-14 in headless Chrome. Hero and header buttons go to GYG's Spain page (l169003).
- **Photos:** 16 Wikimedia Commons photos (CC BY / BY-SA / CC0), credited on each page and /image-credits/. Old /public/images removed.
- **Redirects:** old /<city>/ → /destinations/<city>/, /guides/best-cities-in-spain-to-visit/ → /, /disclaimer/ → /affiliate-disclosure/, /terms/ → /about/ (public/_redirects).
- **Ops:** Always Use HTTPS on (was off); hello@bestcitiesinspain.com → Franck (hola@ kept); Plausible site re-added by Franck, standard script by domain.

### Re-check
- Tour prices and ratings: monthly. Sagrada Família ticket page showed a ticket-system outage notice on 2026-10-14 (not a closure).
- Barcelona–Bilbao weekend coach replacement (Everyrail) until 12–13 Dec 2026.
- 2027 Feria de Abril and film festival dates when published.
