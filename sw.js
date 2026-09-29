// 研途规划 Service Worker：毫秒级离线极速直出 (Cache-First & Stale-While-Revalidate)
const CACHE_NAME = "grad-plan-static-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./dist/app.bundle.js",
  "./css/tailwind.min.css",
  "./css/style.css",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  // 忽略非 GET 请求或外部 API 请求
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // 离线状态回退
        return cachedResponse;
      });

      // 命中缓存则立刻 0ms 返回，后台静默更新
      return cachedResponse || fetchPromise;
    })
  );
});
