// Cloudflare Pages middleware: send www and the bestcitiesinspain.pages.dev copy to bestcitiesinspain.com; everything else is static.
// Per-deploy preview URLs (<hash>.bestcitiesinspain.pages.dev) stay reachable; Cloudflare serves them with noindex.
export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);
    if (url.hostname === 'www.bestcitiesinspain.com' || url.hostname === 'bestcitiesinspain.pages.dev') {
      url.hostname = 'bestcitiesinspain.com';
      return Response.redirect(url.toString(), 301);
    }
  } catch {}
  return context.next();
}
