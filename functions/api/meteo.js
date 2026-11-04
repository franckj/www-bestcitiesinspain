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
    const det = t?.data?.instant?.details;
    if (!t?.time || typeof det?.air_temperature !== 'number') continue; // skip malformed steps instead of crashing
    const p = Object.fromEntries(MADRID.formatToParts(new Date(t.time)).map((x) => [x.type, x.value]));
    const day = `${p.year}-${p.month}-${p.day}`;
    const hour = Number(p.hour) % 24;
    const d = days.get(day) ?? { date: day, min: Infinity, max: -Infinity, wind: 0, symbol: null };
    d.min = Math.min(d.min, det.air_temperature);
    d.max = Math.max(d.max, det.air_temperature);
    d.wind = Math.max(d.wind, det.wind_speed ?? 0);
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
  // Any failure (network, bad JSON, unexpected shape, cache) serves the last good forecast (kept 24 h, marked stale);
  // with no copy it answers 424 with the reason, never a 5xx (Cloudflare swaps 5xx for its own HTML page).
  const cache = caches.default;
  const backupKey = new Request(`https://bestcitiesinspain.com/__met-backup/${slug}`);
  try {
    const key = new Request(`https://bestcitiesinspain.com/__met-cache/v2/${slug}`);
    const hit = await cache.match(key).catch(() => null);
    if (hit) return hit;
    // 2026-11-04: MET's answer for Madrid and San Sebastián reached Cloudflare truncated (invalid JSON) while other
    // cities were fine. If the 4-decimal URL fails, ask once more at 3 decimals (about 50 m away, a different MET URL).
    const get = async (dec) => {
      const r = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${pl.lat.toFixed(dec)}&lon=${pl.lng.toFixed(dec)}`, { headers: { 'User-Agent': UA } });
      if (!r.ok) throw new Error(`MET ${r.status}`);
      const out = summarise(await r.json());
      if (!out.days.length) throw new Error('empty forecast');
      return { out, exp: Date.parse(r.headers.get('Expires') || '') || Date.now() + 1800e3 };
    };
    const { out, exp } = await get(4).catch((e) => { console.error('meteo', slug, 'retry at 3 decimals:', e); return get(3); });
    const res = json(out, 200, Math.max(600, Math.round((exp - Date.now()) / 1000)));
    waitUntil(Promise.all([cache.put(key, res.clone()), cache.put(backupKey, json(out, 200, 86400))]).catch(() => {}));
    return res;
  } catch (e) {
    console.error('meteo', slug, e);
    const old = await cache.match(backupKey).catch(() => null);
    if (old) return json({ ...(await old.json()), stale: true }, 200, 300);
    return json({ error: String(e?.message || e).slice(0, 200) }, 424);
  }
}
