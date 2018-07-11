self.addEventListener('install', event => {
    console.log('Installing Service Worker');
});

self.addEventListener('activate', event => {
    console.log('Activating Service Worker');
});

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
});