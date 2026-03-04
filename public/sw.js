// Dummy Service Worker to prevent 404 errors
self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // Standard fetch handler
});
