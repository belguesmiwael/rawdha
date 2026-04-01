/* =============================================
   Rawdha PWA — Service Worker
   Cache Strategy: Cache First with Network Fallback
   ============================================= */

const CACHE_NAME = 'rawdha-v1.0.0';
const STATIC_CACHE = 'rawdha-static-v1';
const DYNAMIC_CACHE = 'rawdha-dynamic-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
];

// ===== INSTALL =====
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// ===== ACTIVATE =====
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

// ===== FETCH =====
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Firebase requests (always network)
  if (url.hostname.includes('firebase') || url.hostname.includes('firestore')) return;

  // Cache first strategy for static assets
  if (request.destination === 'style' || request.destination === 'font' || request.destination === 'image') {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Network first for HTML
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // Stale while revalidate for everything else
  event.respondWith(staleWhileRevalidate(request));
});

// ===== STRATEGIES =====
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || caches.match('/index.html');
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const networkPromise = fetch(request).then(async (response) => {
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || await networkPromise || new Response('Offline', { status: 503 });
}

// ===== PUSH NOTIFICATIONS =====
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const options = {
    body: data.body || 'Nouvelle notification',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'Ouvrir' },
      { action: 'close', title: 'Fermer' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'Rawdha', options)
  );
});

// ===== NOTIFICATION CLICK =====
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'close') return;
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});
