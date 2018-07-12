import * as React from 'react';

// Special Component that cleans up our server worker subscriptions to avoid push notifications for not logged-in users
export class ServiceWorkerCleaner extends React.PureComponent {

    private _mounted = false;

    componentDidMount() {
        const serviceWorkerSupported = 'serviceWorker' in navigator;
        const pushSupported = 'PushManager' in window;
        this._mounted = true;
        if (serviceWorkerSupported) {
            (async () => {
                // Registering Service Worker
                let registration: ServiceWorkerRegistration;
                try {
                    registration = await navigator.serviceWorker.register('/worker.js');
                    console.log('Service Worker is registered');
                    console.log(registration);
                } catch (e) {
                    console.warn(e);
                    return;
                }
                if (!this._mounted) {
                    return;
                }

                // Unsubscribe if there are some registrations
                if (pushSupported) {
                    let subscription = await registration.pushManager.getSubscription();
                    if (!this._mounted) {
                        return;
                    }
                    if (subscription) {
                        let res = await subscription.unsubscribe();
                        console.warn('Unsubscribe: ' + res);
                    }
                }
            })();
        }
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        return null;
    }
}