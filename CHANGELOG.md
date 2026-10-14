# Changelog

Log of what changed on bestcitiesinspain.com and why. Newest first.

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
