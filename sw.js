const filesToCache = [
    '/',
    'index.html',
    'main.js',
    'style.css',
    'sw.js',
    'loading.html',
    'image/logo512.png',
    'image/logo192.png'
]

let cacheName = "QRcode";

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
});

// Fetch event handler
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('offline.html'); // Return cached offline page
            })
    );
});

// Activate event handler
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheKeys => {
            return Promise.all(
                cacheKeys.map(cacheKey => {
                    if (cacheKey !== cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});