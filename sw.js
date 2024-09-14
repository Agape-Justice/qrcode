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

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('Qrcode').then(cache => cache.addAll(filesToCache))
    )
})

self.addEventListener('fetch', (e) => {
    if (e.request.mode === 'navigate')
        e.respondWith(fetch(e.request).catch(() => {
            return caches.match('/loading.html');
        }))
    else {
        e.respondWith (
            caches.match(e.request).then(response => {
                return response || fetch (e.request)
            })
        )
    }
})