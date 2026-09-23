/*
 * Papa Ginou's Service Worker
 * Network-first for mutable data and images.
 * Offline fallback for previously cached content.
 */

var CACHE_VERSION = 'v2';

var SHELL = 'pg-shell-' + CACHE_VERSION;
var DATA = 'pg-data-' + CACHE_VERSION;
var IMG = 'pg-img-' + CACHE_VERSION;

var PRECACHE = [
  'index.html',
  'menu.html',
  'favorites.html',
  'about.html',
  'contact.html',
  'cart.html',
  'checkout.html',
  '404.html',

  'css/global.css',
  'css/home.css',
  'css/menu.css',
  'css/favorites.css',
  'css/about.css',
  'css/contact.css',
  'css/cart.css',
  'css/checkout.css',

  'js/global.js',
  'js/home.js',
  'js/menu.js',
  'js/favorites.js',
  'js/cart.js',
  'js/checkout.js',

  'data/settings.json',
  'data/homepage.json',
  'data/menu.json',
  'data/deals.json',
  'data/about.json',
  'data/contact.json',
  'data/coming-soon.json',
  'data/reviews.json',
  'data/whatsapp-template.json',

  'assets/images/brand/logo-icon.svg',
  'assets/images/brand/favicon.ico',

  'manifest.webmanifest',
  'favicon.svg',
  'favicon.ico',

  'assets/images/pwa/icon-192.png',
  'assets/images/pwa/icon-512.png'
];


/* =========================================================
   INSTALL
   ========================================================= */

self.addEventListener('install', function (event) {
  /*
   * Activate the new service worker as soon as possible.
   * This prevents users from staying on the old cache version.
   */
  self.skipWaiting();

  event.waitUntil(
    caches.open(SHELL).then(function (cache) {
      return Promise.all(
        PRECACHE.map(function (url) {
          return cache.add(url).catch(function (error) {
            /*
             * Do not let one missing optional asset prevent
             * the entire service worker from installing.
             */
            console.warn(
              '[Papa Ginou\'s SW] Precache failed:',
              url,
              error
            );
          });
        })
      );
    })
  );
});


/* =========================================================
   ACTIVATE
   ========================================================= */

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {

          /*
           * Delete every previous Papa Ginou's cache.
           *
           * This is important because old users may already have
           * pg-shell-v1 / pg-img-v1 / pg-data-v1 stored.
           */
          if (
            cacheName.indexOf('pg-') === 0 &&
            cacheName !== SHELL &&
            cacheName !== DATA &&
            cacheName !== IMG
          ) {
            return caches.delete(cacheName);
          }

          return Promise.resolve(false);
        })
      );
    }).then(function () {

      /*
       * Immediately take control of existing pages.
       */
      return self.clients.claim();
    })
  );
});


/* =========================================================
   OFFLINE PAGE
   ========================================================= */

function offlinePage() {
  return new Response(
    '<!DOCTYPE html>' +
    '<html lang="en">' +
    '<head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>Offline — Papa Ginou\'s</title>' +
    '<style>' +
    'body{' +
      'margin:0;' +
      'font-family:system-ui,sans-serif;' +
      'display:flex;' +
      'min-height:100vh;' +
      'align-items:center;' +
      'justify-content:center;' +
      'background:#fff;' +
      'color:#14181D;' +
      'padding:24px;' +
      'text-align:center;' +
    '}' +
    'a{' +
      'color:#E11B23;' +
      'font-weight:700;' +
    '}' +
    '</style>' +
    '</head>' +
    '<body>' +
    '<div>' +
    '<h1>You are offline</h1>' +
    '<p>Your cart and saved pages are kept. Reconnect to browse the latest menu and order on WhatsApp.</p>' +
    '<p><a href="index.html">Back to home</a></p>' +
    '</div>' +
    '</body>' +
    '</html>',
    {
      headers: {
        'Content-Type': 'text/html'
      }
    }
  );
}


/* =========================================================
   FETCH HANDLER
   ========================================================= */

self.addEventListener('fetch', function (event) {
  var request = event.request;

  /*
   * Only handle GET requests.
   */
  if (request.method !== 'GET') {
    return;
  }

  var url = new URL(request.url);

  /*
   * Only handle files belonging to this website.
   */
  if (url.origin !== self.location.origin) {
    return;
  }


  /* =======================================================
     1. JSON DATA — NETWORK FIRST
     =======================================================

     This is the most important part for menu prices.

     When the customer is online:
       Website -> Server -> Latest JSON

     When the customer is offline:
       Website -> Cached JSON
  */

  if (
    url.pathname.indexOf('/data/') !== -1 ||
    /\/data\//.test(url.pathname)
  ) {

    event.respondWith(

      fetch(request, {
        cache: 'no-store'
      })

      .then(function (response) {

        /*
         * Only cache successful responses.
         */
        if (response && response.ok) {

          var dataCopy = response.clone();

          caches.open(DATA).then(function (cache) {
            cache.put(request, dataCopy);
          });
        }

        /*
         * Always return the fresh network response.
         */
        return response;
      })

      .catch(function () {

        /*
         * If there is no internet, use the previously
         * cached JSON.
         */
        return caches.match(request);
      })
    );

    return;
  }


  /* =======================================================
     2. IMAGES — NETWORK FIRST
     =======================================================

     This fixes the old logo/image problem.

     ONLINE:
       Always try the latest image from the server.

     OFFLINE:
       Use cached image.

     Therefore, if you replace:
       logo-icon.svg
       food image
       banner image
       favicon
       etc.

     the next online visit can receive the new version.
  */

  if (
    request.destination === 'image' ||
    /\.(png|jpe?g|svg|webp|ico)$/i.test(url.pathname)
  ) {

    event.respondWith(

      fetch(request, {
        cache: 'no-store'
      })

      .then(function (response) {

        /*
         * Cache the newest successful image.
         */
        if (response && response.ok) {

          var imageCopy = response.clone();

          caches.open(IMG).then(function (cache) {
            cache.put(request, imageCopy);
          });
        }

        /*
         * Return the newest server image.
         */
        return response;
      })

      .catch(function () {

        /*
         * No internet:
         * use previously cached image.
         */
        return caches.match(request);
      })
    );

    return;
  }


  /* =======================================================
     3. HTML NAVIGATION — NETWORK FIRST
     =======================================================

     Always try to load the newest HTML.

     If offline, load the cached page.
     If the page isn't cached, show offline page.
  */

  if (request.mode === 'navigate') {

    event.respondWith(

      fetch(request, {
        cache: 'no-store'
      })

      .then(function (response) {

        if (response && response.ok) {

          var pageCopy = response.clone();

          caches.open(SHELL).then(function (cache) {
            cache.put(request, pageCopy);
          });
        }

        return response;
      })

      .catch(function () {

        return caches.match(request).then(function (cachedPage) {

          if (cachedPage) {
            return cachedPage;
          }

          return offlinePage();
        });
      })
    );

    return;
  }


  /* =======================================================
     4. CSS / JS / OTHER STATIC FILES
        STALE-WHILE-REVALIDATE
     =======================================================

     Returning visitors can load cached assets quickly.

     At the same time, the browser asks the server for
     the newest version and updates the cache.
  */

  event.respondWith(

    caches.match(request).then(function (cachedResponse) {

      var networkResponse = fetch(request, {
        cache: 'no-store'
      })
      .then(function (response) {

        if (response && response.ok) {

          var staticCopy = response.clone();

          caches.open(SHELL).then(function (cache) {
            cache.put(request, staticCopy);
          });
        }

        return response;
      })
      .catch(function () {
        return null;
      });


      /*
       * If cached content exists, return it immediately.
       * Otherwise wait for the network.
       */
      return cachedResponse || networkResponse;
    })
  );
});
