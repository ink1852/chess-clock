const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
  '/',              // 루트 HTML 파일 (index.html)
  '/index.html',    // 메인 HTML 파일
  '/CSS/style.css',    // CSS 파일
  '/JS/script.js',  // JS 파일
  '/JS/background.js'
];

// 설치 이벤트 - 파일 캐시하기
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('필수 파일들 캐시');
        return cache.addAll(urlsToCache);  // 모든 필수 파일을 캐시합니다
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

// fetch 이벤트 - 네트워크 요청이 실패하면 캐시된 리소스를 반환
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // 네트워크 요청 실패 시 캐시에서 반환
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;  // 캐시된 리소스 반환
            }
            // 캐시에도 없으면 index.html 반환
            return caches.match('/index.html');
          });
      })
  );
});

