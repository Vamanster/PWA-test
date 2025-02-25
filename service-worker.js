const CACHE_NAME = "my-pwa-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/icon-192x192.png",
  "/icon-512x512.png"
];

// Install event: Caches assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .catch((error) => console.error("Failed to cache assets:", error))
  );
});

// Fetch event: Serve cached files when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
      .catch(() => console.error("Fetch failed for:", event.request.url))
  );
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});