//service worker update log goes here
const expectedCaches = ["static-v1", 'dynamic-v1'];

const static_files = [
    '/index.html',
    '/css/main.css',
    '/css/svg-animation.css',
    '/gc-logo.png',
    '/gc-logo-64x64.png',
    '/gc-logo-192x192.png',
    '/gc-logo-512x512.png',
    '/manifest.json',
    '/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    //the waiting of new sw will be skipped and it will be activated asap

    event.waitUntil(
        caches.open(expectedCaches[0]).then(cache => cache.addAll(static_files))
    );
});

self.addEventListener('activate', (event) => {
    // delete any caches that aren't in expectedCaches
    // which will get rid of old caches

    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!expectedCaches.includes(key)) {
                    return caches.delete(key);
                }
            })
        ))
    );
});

self.addEventListener('fetch', (event) => {
    let cache_index = 1;
    const url = new URL(event.request.url);

    //select cache name depending on request url
    if (static_files.includes(url.pathname)) {
        cache_index = 0;
    }

    //don't cache the below origin contents
    if (url.origin.startsWith('https://firebasestorage.googleapis.com') ||
        url.origin.startsWith('https://cdn.jsdelivr.net') ||
        url.origin.startsWith('https://firestore.googleapis.com')) {

        event.respondWith(
            fetch(event.request).then(response => response)
        );

    } else {

        event.respondWith(
            caches.open(expectedCaches[cache_index]).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    const fetchPromise = fetch(event.request).then(function (networkResponse) {
                        cache.put(event.request, networkResponse.clone());
                        //if the cache.put fails, then it will not delay the response and will fail
                        return networkResponse;
                    })

                    return response || fetchPromise;
                })
            })
        );

    }
})