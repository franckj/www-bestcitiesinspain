// Renders public/og.jpg (1200x630) and the PNG icons with the site's font, palette and hero photo.
//   node scripts/og.mjs
import { chromium } from 'playwright-core';
import { homedir } from 'os';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

const font = readFileSync('public/fonts/fraunces-latin-wght-normal.woff2').toString('base64');
const hero = readFileSync('public/img/seville-1600.webp').toString('base64');
const logo = readFileSync('public/favicon.svg', 'utf8');
const og = `<!doctype html><html><head><style>
@font-face{font-family:Fraunces;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900}
body{margin:0;width:1200px;height:630px;font-family:Fraunces;color:#fff;position:relative;overflow:hidden}
img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.shade{position:absolute;inset:0;background:linear-gradient(to top,rgba(34,18,12,.88) 0%,rgba(34,18,12,.35) 55%,rgba(34,18,12,.1) 100%)}
.in{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
.logo svg{width:76px;height:76px}
h1{margin:0;font-size:76px;line-height:1.02;font-weight:600;letter-spacing:-0.02em}
h1 span{color:#f0c75a}
.foot{display:flex;justify-content:space-between;font-size:28px;font-family:system-ui,sans-serif;color:#eee}
</style></head><body>
<img class="bg" src="data:image/webp;base64,${hero}">
<div class="shade"></div>
<div class="in"><div class="logo">${logo}</div>
<div><h1>The best cities in Spain,<br><span>and how to choose.</span></h1>
<div class="foot" style="margin-top:28px"><span>8 cities, trains between them, tours worth booking</span><b>bestcitiesinspain.com</b></div></div></div>
</body></html>`;
const icon = (size) => `<!doctype html><html><body style="margin:0;background:transparent">${logo.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`;
const chromeDir = readdirSync(`${homedir()}/.cache/ms-playwright`).filter((d) => /^chromium-\d+$/.test(d)).sort().pop();
const browser = await chromium.launch({ executablePath: `${homedir()}/.cache/ms-playwright/${chromeDir}/chrome-linux64/chrome` });
const shoot = async (html, w, h, path, omit = false, jpeg = false) => {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html);
  await page.waitForTimeout(400);
  await page.screenshot(jpeg ? { path, type: 'jpeg', quality: 82 } : { path, omitBackground: omit });
  await page.close();
};
await shoot(og, 1200, 630, 'public/og.jpg', false, true);
await shoot(icon(512), 512, 512, 'public/icon-512.png', true);
await shoot(icon(180).replace('background:transparent', 'background:#faf7f2'), 180, 180, 'public/apple-touch-icon.png');
await shoot(icon(32), 32, 32, 'scripts/.favicon-32.png', true);
await browser.close();
// Wrap the 32px PNG in an ICO container (PNG-in-ICO is supported by every current browser).
const png = readFileSync('scripts/.favicon-32.png');
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
head.writeUInt8(32, 6); head.writeUInt8(32, 7); head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12);
head.writeUInt32LE(png.length, 14); head.writeUInt32LE(22, 18);
writeFileSync('public/favicon.ico', Buffer.concat([head, png]));
console.log('og.jpg, icons and favicon.ico written');
