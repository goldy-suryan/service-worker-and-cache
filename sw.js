self.addEventListener('install', (e) => {
    console.log('SW Installed');
});

self.addEventListener('activate', e => {
    console.log('SW Activated');
});

self.addEventListener('fetch', e => {

    if (!navigator.onLine) {
        e.respondWith(new Response(' <h1><center>Offline</center></h1>', { headers: { 'content-type': 'text/html' } }));
    } else {
        e.respondWith(fetch(e.request));
    }
});