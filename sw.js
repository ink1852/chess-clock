const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
  '/offline.html',    // 오프라인 페이지
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('필수 파일들 캐시');
        return cache.addAll(urlsToCache);  // 필수 파일들을 캐시
      })
  );
});

// 활성화 이벤트 - 불필요한 캐시 삭제
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);  // 이전 캐시 삭제
          }
        })
      );
    })
  );
});

// fetch 이벤트 - 네트워크 요청이 실패하면 오프라인 페이지를 반환
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // 네트워크 요청 실패 시 캐시에서 반환
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;  // 캐시된 리소스를 반환
            }
            // 캐시에도 없으면 오프라인 페이지 반환
            return caches.match('/offline.html');
          });
      })
  );
});
