const version = 'v2';

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(version)
            .then((cache) => {
                return cache.addAll([
                    '/css/style.css',
                    '/about.html',
                    '/contact.html',
                    '/index.html',
                    '/offline.html',
                    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
                    '//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css',
                    'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
                    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'
                ])
            })
    )
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then((keys) => {
                keys.map(key => {
                    if (keys.indexOf(version) !== -1) {
                        return caches.delete(key);
                    }
                })
            })
    )
})

self.addEventListener('fetch', e => {

    e.respondWith(caches.match(e.request)
        .then(res => {
            if (res) {
                return res;
            }

            if (!navigator.onLine) {
                return caches.match(new Request('/offline.html'));
            }

            var fetchRequest = e.request.clone();

            return fetch(fetchRequest)
                .then(response => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();

                    caches.open(version)
                        .then((cache) => {
                            cache.put(e.request, responseToCache)
                        })

                    return response;
                })
        })
    )
})