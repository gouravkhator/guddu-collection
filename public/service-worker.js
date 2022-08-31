/**
 * Cache names for different purposes..
 *
 * 1. dynamic-v1 is for runtime caching which should not be kept forever..
 *
 * 2. static-v1 is for precaching, which should be added in the cache name 'static-v1',
 * while the new service worker is installed..
 */
const expectedCaches = ["static-v1", "dynamic-v1"];

/**
 * Static file requests for pre-caching assets
 */
const static_files = [
  // html files
  "/index.html",

  // css files
  "/css/main.css",
  "/css/svg-animation.css",
  "/css/bootstrap.min.css",

  // image files
  "/images/gc-logo.png",
  "/images/gc-logo-64x64.png",
  "/images/gc-logo-192x192.png",
  "/images/gc-logo-512x512.png",
  "/images/banner-bg.png",

  // other files
  "/manifest.json",
  "/robots.txt",

  // online files like fonts and styles from CDN and other networks, etc.
  "https://fonts.googleapis.com/css2?family=Overlock&display=swap",
];

self.addEventListener("install", (event) => {
  //the waiting of new sw will be skipped and it will be activated asap
  self.skipWaiting();

  event.waitUntil(
    caches.open(expectedCaches[0]).then((cache) => cache.addAll(static_files))
  );
});

self.addEventListener("activate", (event) => {
  /**
   * delete any files, that aren't in any of the caches..
   * which will get rid of old caches
   */
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (!expectedCaches.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  let cache_index = 1;
  const url = new URL(event.request.url);

  // select static cache, if the pathname is one of the static file requests
  if (static_files.includes(url.pathname)) {
    cache_index = 0;
  }

  // don't cache the firebase images/other requests
  // TODO: Do runtime caching for firebase images with maximum expiration time and maximum number/size of images/requests to be stored..
  if (
    url.origin.startsWith("https://firebasestorage.googleapis.com") ||
    url.origin.startsWith("https://cdn.jsdelivr.net") ||
    url.origin.startsWith("https://firestore.googleapis.com")
  ) {
    event.respondWith(fetch(event.request).then((response) => response));
  } else {
    /**
     * Else, for other requests:
     *
     * We normally will be left with precached content, or other non-considered assets..
     *
     * Firstly, we check from cache, if it exists, we show the cached content, but we also update the new content if any from the network..
     * If cache does not have any of the requested content, we then also fetch from network.
     *
     * In further requests of the same file, we will show the current updated cached content.
     * So, it will show the updated content in further request of same file.
     *
     * It helps work offline..
     */
    event.respondWith(
      caches.open(expectedCaches[cache_index]).then(async function (cache) {
        const response = await cache.match(event.request);

        /*
        we don't await for fetch response, 
        as it may fail if we are offline, 
        but we want to return the cached response if we are offline, and if cache contains the content requested
        */
        const fetchPromise = fetch(event.request).then(function (
          networkResponse
        ) {
          cache.put(event.request, networkResponse.clone());

          // if the cache.put fails, then it will not delay the response and will fail
          return networkResponse;
        });

        return response || fetchPromise;
      })
    );
  }
});
