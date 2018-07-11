import { Router } from '../../../../routes';

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')
        ;
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export class Notifications {
    private readonly notificationsSupported = 'Notification' in window;
    private readonly serviceWorkerSupported = 'serviceWorker' in navigator;
    private readonly pubhSupported = 'PushManager' in window;

    readonly isSupported = this.notificationsSupported;
    get isDecided() { return this.notificationsSupported && (Notification as any).permission !== 'granted' && (Notification as any).permission !== 'denied'; }
    get isDenied() { return this.notificationsSupported && (Notification as any).permission === 'denied'; }
    get isGranted() { return this.notificationsSupported && (Notification as any).permission === 'granted'; }

    constructor() {
        if (this.isSupported) {
            if (!this.isDecided) {
                Notification.requestPermission((permission) => {
                    if (permission === 'granted') {
                        this.handleGranted();
                    }
                });
            } else if (this.isGranted) {
                this.handleGranted();
            }
        }
        // this.notify.then((v) => {
        //     if ((v as any).needsPermission && (v as any).isSupported()) {
        //         (v as any).requestPermission();
        //     }
        //     this.handleNotification();
        // });
        // if (this.isSupported && )
    }

    private handleGranted() {
        if (this.serviceWorkerSupported && this.pubhSupported) {
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

                // Subscribing for pushes
                let res = await registration.pushManager.getSubscription();
                if (!res) {
                    res = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array('BOvxoJt3pHvDl9XDfwtcYPEtKxu7-K1Ztfxh7AyYyNSZa65rsBlt--8d72Y5X7_5kwQWlbaY30J82Olt_g-R7oE')
                    });
                }
                console.log(res);
            })();
        }
    }

    // private handleNotification() {
    //     this.notify.then((v) => {
    //         if (!(v as any).needsPermission) {
    //             if ('serviceWorker' in navigator && 'PushManager' in window) {
    //                 console.log('Service Worker and Push is supported');
    //                 (async () => {
    //                     try {
    //                         let registration = await navigator.serviceWorker.register('/worker.js');
    //                         console.log('Service Worker is registered');
    //                         console.log(registration);
    //                         // registration.pushManager.getSubscription();
    //                     } catch (e) {
    //                         console.warn(e);
    //                     }
    //                 })();
    //             } else {
    //                 console.warn('Push messaging is not supported');
    //             }
    //         }
    //     });
    // }

    displayNotification = (title: string, body: string, path: string, image?: string) => {
        console.warn('notification');
        if (this.isGranted) {
            let notification = new Notification(title, {
                body: body
            });
            notification.onclick = function () {
                Router.replaceRoute(path);
                window.focus();
                this.close();
            };
        }
    }
}