import * as React from 'react';

export class ServiceWorkerManager extends React.PureComponent {
    componentDidMount() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            console.log('Service Worker and Push is supported');
            (async () => {
                try {
                    let registration = await navigator.serviceWorker.register('/worker.js');
                    console.log('Service Worker is registered');
                    console.log(registration);
                } catch (e) {
                    console.warn(e);
                }
            })();
        } else {
            console.warn('Push messaging is not supported');
        }
    }
    render() {
        return null;
    }
}