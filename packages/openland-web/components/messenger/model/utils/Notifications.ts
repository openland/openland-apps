import { Router } from '../../../../routes';

export class Notifications {
    private readonly notificationsSupported = 'Notification' in window;
    private readonly onGranted: () => void;

    readonly isSupported = this.notificationsSupported;
    get isDecided() { return this.notificationsSupported && (Notification as any).permission !== 'granted' && (Notification as any).permission !== 'denied'; }
    get isDenied() { return this.notificationsSupported && (Notification as any).permission === 'denied'; }
    get isGranted() { return this.notificationsSupported && (Notification as any).permission === 'granted'; }

    constructor(onGranted: () => void) {
        this.onGranted = onGranted;
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
    }

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