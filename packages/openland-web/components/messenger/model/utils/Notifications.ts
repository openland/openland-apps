import { Router } from '../../../../routes';
import { trackError } from 'openland-x-analytics';

export class Notifications {
    private readonly serviceWorkerSupported = 'serviceWorker' in navigator;
    private readonly notiticationServiceWorkerSupported = this.serviceWorkerSupported && 'showNotification' in ServiceWorkerRegistration.prototype;
    private readonly notificationsClassicalSupported = 'Notification' in window;
    private readonly notificationsSupported = this.notificationsClassicalSupported || this.notiticationServiceWorkerSupported;
    private readonly onGranted: () => void;

    readonly isSupported = this.notificationsSupported;
    get isDecided() { return this.notificationsSupported && (Notification as any).permission !== 'granted' && (Notification as any).permission !== 'denied'; }
    get isDenied() { return this.notificationsSupported && (Notification as any).permission === 'denied'; }
    get isGranted() { return this.notificationsSupported && (Notification as any).permission === 'granted'; }

    private registration: ServiceWorkerRegistration | null = null;

    constructor(onGranted: () => void) {
        this.onGranted = onGranted;
        try {
            if (this.isSupported) {
                if (!this.isDecided) {
                    Notification.requestPermission((permission) => {
                        if (permission === 'granted') {
                            this.onGranted();
                        }
                    });
                } else if (this.isGranted) {
                    this.onGranted();
                }
            }
        } catch (e) {
            trackError(e);
        }
    }

    setRegistration(registration: ServiceWorkerRegistration) {
        this.registration = registration;
    }

    displayNotification = (title: string, body: string, path: string, image?: string) => {
        console.warn('notification');
        try {
            if (this.isGranted) {
                if (this.notiticationServiceWorkerSupported && this.registration) {
                    this.registration.showNotification(title, {
                        body: body,
                        icon: image
                    });
                } else if (this.notificationsClassicalSupported) {
                    let notification = new Notification(title, {
                        body: body,
                        icon: image
                    });
                    notification.onclick = function () {
                        Router.replaceRoute(path);
                        window.focus();
                        this.close();
                    };
                }
            }
        } catch (e) {
            trackError(e);
        }
    }
}