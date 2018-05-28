//declarare default path pentru cache
const cacheNume = 'v7';
const cacheFiles = [
    './',
    './index.html',
    './assets/html.svg',
    './assets/javascript.svg',
    './assets/css.svg',
    './assets/clock.svg',
    './assets/calculator.svg',
    './assets/envelope.jpg',
    './assets/pic-cover.jpg',
    './assets/pic-html5.jpg',
    './assets/pic-css.jpg',
    './assets/pic-js-1.jpg',
    './css/style.css',
    './js/script.js',
    'https://unpkg.com/lazysizes@4.0.2/lazysizes.js',
    './sw.js',
    'https://fonts.googleapis.com/css?family=Montserrat'
    
];
    

// instalare serviceworker
self.addEventListener('install', function(e) {
    console.log("serviceworker is installed");
    e.waitUntil(
        caches.open(cacheNume)
        .then( cache => {
            console.log("service  caching files");
            return cache.addAll(cacheFiles);
            
        })
    )
});

// activare serviceworker
self.addEventListener('activate', function(e) {
    console.log("serviceworker is activated");

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(thisCacheNames => {
                if(thisCacheNames !== cacheNume) {
                    console.log("[serviceWorker] Removing cached files from", thisCacheNames);
                    return caches.delete(thisCacheNames);
                }
            }))
        })
    )
});

// fetch serviceworker
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            console.log("SERVICEWORKER ", event.request.url);
            return response;
            
          }
  
          // IMPORTANT: Clone the request. A request is a stream and
          // can only be consumed once. Since we are consuming this
          // once by cache and once by the browser for fetch, we need
          // to clone the response.
          var fetchRequest = event.request.clone();
  
          return fetch(fetchRequest).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open(cacheNume)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });