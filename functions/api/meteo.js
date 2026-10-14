// GET /api/meteo?place=<slug>: 3-day forecast for one destination page, cached until MET Norway's Expires.
// Source: MET Norway Locationforecast 2.0 (CC BY 4.0, https://api.met.no/doc/License). Their terms ask browsers not to
// call the API directly, to send an identifying User-Agent and to respect Expires: this proxy does all three.
// Coordinates come from each page's frontmatter (lat/lng, 4 decimals as MET asks).
const PLACES = {"barcelona": {"lat": 41.387, "lng": 2.1701}, "bilbao": {"lat": 43.2569, "lng": -2.9236}, "granada": {"lat": 37.1773, "lng": -3.5986}, "madrid": {"lat": 40.4169, "lng": -3.7035}, "malaga": {"lat": 36.7213, "lng": -4.4214}, "san-sebastian": {"lat": 43.3214, "lng": -1.9864}, "seville": {"lat": 37.3891, "lng": -5.9845}, "valencia": {"lat": 39.4699, "lng": -0.3763}};
const UA = 'bestcitiesinspain.com (hello@bestcitiesinspain.com)';
const MADRID = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' });
const json = (body, status = 200, maxAge = 0) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': maxAge ? `public, max-age=${maxAge}` : 'no-store' } });

function summarise(data) {
  const ts = data.properties.timeseries;
  const days = new Map();
  for (const t of ts) {
    const p = Object.fromEntries(MADRID.formatToParts(new Date(t.time)).map((x) => [x.type, x.value]));
    const day = `${p.year}-${p.month}-${p.day}`;
    const hour = Number(p.hour) % 24;
    const d = days.get(day) ?? { date: day, min: Infinity, max: -Infinity, wind: 0, symbol: null };
    const det = t.data.instant.details;
    d.min = Math.min(d.min, det.air_temperature);
    d.max = Math.max(d.max, det.air_temperature);
    d.wind = Math.max(d.wind, det.wind_speed);
    if (hour >= 11 && hour <= 14 && !d.symbol) d.symbol = t.data.next_6_hours?.summary?.symbol_code ?? t.data.next_1_hours?.summary?.symbol_code ?? null;
    days.set(day, d);
  }
  return {
    updated: data.properties.meta.updated_at,
    days: [...days.values()].filter((d) => d.symbol).slice(0, 3).map((d) => ({ ...d, min: Math.round(d.min), max: Math.round(d.max), wind: Math.round(d.wind * 3.6) })),
  };
}

export async function onRequestGet({ request, waitUntil }) {
  const slug = new URL(request.url).searchParams.get('place') || '';
  const pl = PLACES[slug];
  if (!pl) return json({ error: 'unknown place' }, 404);
  const cache = caches.default;
  const key = new Request(`https://bestcitiesinspain.com/__met-cache/${slug}`);
  const hit = await cache.match(key);
  if (hit) return hit;
  const r = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${pl.lat}&lon=${pl.lng}`, { headers: { 'User-Agent': UA } });
  if (!r.ok) return json({ error: r.status }, 502);
  const exp = Date.parse(r.headers.get('Expires') || '') || Date.now() + 1800e3;
  const res = json(summarise(await r.json()), 200, Math.max(600, Math.round((exp - Date.now()) / 1000)));
  waitUntil(cache.put(key, res.clone()));
  return res;
}
