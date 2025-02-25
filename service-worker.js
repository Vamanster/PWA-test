const cacheName = 'my-pwa-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/styles.css',
  '/manifest.json',
  '/app.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install the service worker and cache assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Service Worker: Caching files');
      return cache.addAll(assets);
    })
  );
});

// Serve from cache during fetch requests
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cacheResponse) => {
      return cacheResponse || fetch(e.request);
    })
  );
});