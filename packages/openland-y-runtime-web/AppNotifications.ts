import { AppNotificationsApi, AppNotifcationsState } from 'openland-y-runtime-api/AppNotificationsApi';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { trackError } from 'openland-x-analytics';

class AppNotiticationsWeb implements AppNotificationsApi {
    state: AppNotifcationsState;

    private watchers: ((state: AppNotifcationsState) => void)[] = [];
    private router: { replaceRoute(path: string): void } | null = null;

    constructor() {
        if (canUseDOM) {
            const serviceWorkerSupported = 'serviceWorker' in navigator;
            const notiticationServiceWorkerSupported = serviceWorkerSupported && 'showNotification' in ServiceWorkerRegistration.prototype;
            const notificationsClassicalSupported = 'Notification' in window;
            const notificationsSupported = notificationsClassicalSupported || notiticationServiceWorkerSupported;
            if (notificationsSupported) {
                let granted = (Notification as any).permission === 'granted';
                let denied = (Notification as any).permission === 'denied';
                if (granted) {
                    this.state = 'granted';
                } else if (denied) {
                    this.state = 'denied';
                } else {
                    this.state = 'default';
                }
            } else {
                this.state = 'unsupported';
            }
        } else {
            this.state = 'unsupported';
        }
    }

    watch(handler: (state: AppNotifcationsState) => void) {
        this.watchers.push(handler);
    }

    unwatch(handler: (state: AppNotifcationsState) => void) {
        let index = this.watchers.findIndex((v) => v === handler);
        if (index >= 0) {
            this.watchers.splice(index, 1);
        } else {
            console.warn('Trying to unsubscribe unknown watcher');
        }
    }

    requestPermission() {
        if (canUseDOM) {
            if (this.state === 'default') {
                Notification.requestPermission((permission) => {
                    let changed = false;
                    if (permission === 'granted') {
                        if (this.state !== 'granted') {
                            this.state = 'granted';
                            changed = true;
                        }
                    } else if (permission === 'denied') {
                        if (this.state !== 'denied') {
                            this.state = 'denied';
                            changed = true;
                        }
                    } else {
                        if (this.state !== 'default') {
                            this.state = 'default';
                            changed = true;
                        }
                    }
                    if (changed) {
                        let s = this.state;
                        for (let w of this.watchers) {
                            try {
                                w(s);
                            } catch (e) {
                                console.warn(e);
                            }
                        }
                    }
                });
            }
        }
    }

    displayNotification(content: { path: string, title: string, body: string, image?: string }) {
        try {
            if (this.state === 'granted') {
                var audio = new Audio('/static/sounds/notification.mp3');
                audio.play();
                let notification = new Notification(content.title, {
                    body: content.body,
                    icon: content.image
                });
                let router = this.router;
                notification.onclick = function () {
                    if (router) {
                        router.replaceRoute(content.path);
                    }
                    window.focus();
                    this.close();
                };
            }
        } catch (e) {
            trackError(e);
        }
    }

    setRouter(router: { replaceRoute(path: string): void }) {
        this.router = router;
    }
}

export const AppNotifications = new AppNotiticationsWeb();