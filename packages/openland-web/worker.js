self.addEventListener('install', event => {
    console.log('Installing Service Worker');
});

self.addEventListener('activate', event => {
    console.log('Activating Service Worker');
});

self.addEventListener('notificationclick', function (event) {
    // console.log('On notification click: ', event.notification.tag);  
    // Android doesn't close the notification when you click on it  
    // See: http://crbug.com/463146  
    event.notification.close();

    // This looks to see if the current is already open and  
    // focuses if it is  
    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
        .then(function (clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url == '/' && 'focus' in client)
                    return client.focus();
            }
            if (clients.openWindow) {
                return clients.openWindow('/mail');
            }
        })
    );
});

self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
    let contents = event.data.json();
    const promiseChain = self.registration.showNotification(contents.title, {
        body: contents.body,
        icon: contents.picture
    });
    event.waitUntil(promiseChain);
});