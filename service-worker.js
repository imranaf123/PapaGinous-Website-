/* Papa Ginou's service worker: aggressive static cache, network-first JSON, offline-safe. */
var SHELL = 'pg-shell-v1', DATA = 'pg-data-v1', IMG = 'pg-img-v1';
var PRECACHE = [
  'index.html', 'menu.html', 'favorites.html', 'about.html', 'contact.html', 'cart.html', 'checkout.html', '404.html',
  'css/global.css', 'css/home.css', 'css/menu.css', 'css/favorites.css', 'css/about.css', 'css/contact.css', 'css/cart.css', 'css/checkout.css',
  'js/global.js', 'js/home.js', 'js/menu.js', 'js/favorites.js', 'js/cart.js', 'js/checkout.js',
  'data/settings.json', 'data/homepage.json', 'data/menu.json', 'data/deals.json',
  'data/about.json', 'data/contact.json', 'data/coming-soon.json', 'data/reviews.json',
  'data/whatsapp-template.json', 'assets/images/brand/logo-icon.svg', 'assets/images/brand/favicon.ico',
  'manifest.webmanifest', 'favicon.svg', 'favicon.ico',
  'assets/images/pwa/icon-192.png', 'assets/images/pwa/icon-512.png'
];
self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(SHELL).then(function (cache) {
    return Promise.all(PRECACHE.map(function (u) { return cache.add(u).catch(function () {}); }));
  }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('pg-') === 0 && [SHELL, DATA, IMG].indexOf(k) === -1; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
function offlinePage() {
  return new Response('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline — Papa Ginou\'s</title><style>body{margin:0;font-family:system-ui,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;background:#fff;color:#14181D;padding:24px;text-align:center}a{color:#E11B23;font-weight:700}</style></head><body><div><h1>You are offline</h1><p>Your cart and saved pages are kept. Reconnect to browse the latest menu and order on WhatsApp.</p><p><a href="index.html">Back to home</a></p></div></body></html>', { headers: { 'Content-Type': 'text/html' } });
}
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // JSON: network-first (prices never go stale)
  if (url.pathname.indexOf('/data/') !== -1 || /\/data\//.test(url.pathname)) {
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(DATA).then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () { return caches.match(req); }));
    return;
  }
// Images: network-first
if (req.destination === 'image' || /\.(png|jpe?g|svg|webp|ico)$/i.test(url.pathname)) {
  e.respondWith(
    fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(IMG).then(function (c) {
        c.put(req, copy);
      });
      return res;
    }).catch(function () {
      return caches.match(req);
    })
  );
  return;
}
  }
  // Navigations: network-first, then cache, then offline page
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(SHELL).then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () { return caches.match(req).then(function (hit) { return hit || offlinePage(); }); }));
    return;
  }
  // CSS/JS: stale-while-revalidate
  e.respondWith(caches.match(req).then(function (hit) {
    var net = fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(SHELL).then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () {});
    return hit || net;
  }));
});
