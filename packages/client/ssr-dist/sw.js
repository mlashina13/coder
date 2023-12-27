const CACHE_NAME = 'coder-cache-v1'; 

const URLS = [
  '/',
  '/index.html',
  '/icon.svg',
  '/src/*'
];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Opened cache", cache);
        return cache.addAll(URLS);
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  );
});

this.addEventListener("activate", (event) => {
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
        cacheNames
          .filter(name => !cacheAllowlist.includes(name))
          .map(name => caches.delete(name))
      ))
  )
});

this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();
      return fetch(fetchRequest)
        .then((resp) => {
          if (!resp || resp.status !== 200 || resp.type !== 'basic') {
            return resp;
          }

          const responseToCache = resp.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return resp;
        });
    })
  );
});
