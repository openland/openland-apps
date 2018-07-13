import { Router } from '../../../../routes';
import { trackError } from 'openland-x-analytics';

export class Notifications {
    private readonly notificationsSupported = 'Notification' in window;
    private readonly onGranted: () => void;

    readonly isSupported = this.notificationsSupported;
    get isDecided() { return this.notificationsSupported && (Notification as any).permission !== 'granted' && (Notification as any).permission !== 'denied'; }
    get isDenied() { return this.notificationsSupported && (Notification as any).permission === 'denied'; }
    get isGranted() { return this.notificationsSupported && (Notification as any).permission === 'granted'; }

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

    displayNotification = (title: string, body: string, path: string, image?: string) => {
        console.warn('notification');
        try {
            if (this.isGranted) {
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
        } catch (e) {
            trackError(e);
        }
    }
}