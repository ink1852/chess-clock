const CACHE_NAME = 'offline-cache-v1'; // 현재 캐시 이름
const urlsToCache = [
  '/offline.html',
  '/IMG/offlineImg.png'
];

// 설치 이벤트
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching files...');
      return cache.addAll(urlsToCache);
    })
  );
});

// 활성화 이벤트 (캐시 무효화 로직 추가)
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]; // 유지할 캐시 이름
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName); // 이전 캐시 삭제
          }
        })
      );
    })
  );
});

// fetch 이벤트
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // 요청된 리소스를 캐시에서 찾기
      return caches.match(event.request).then((response) => {
        if (response) {
          return response; // 요청과 일치하는 캐시 반환
        }
        if (event.request.mode === 'navigate') {
          // 일치하는 캐시가 없으면 offline.html 반환
          return caches.match('/offline.html');
        }
      });
    })
  );
});
