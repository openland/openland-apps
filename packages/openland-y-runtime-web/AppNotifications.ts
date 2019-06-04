import {
    AppNotificationsApi,
    AppNotifcationsState,
} from 'openland-y-runtime-api/AppNotificationsApi';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { trackError } from 'openland-x-analytics';
import { Howl } from 'howler';

class AppNotiticationsWeb implements AppNotificationsApi {
    state: AppNotifcationsState;

    private watchers: ((state: AppNotifcationsState) => void)[] = [];
    private router: { replaceRoute(path: string): void } | null = null;
    private blinkFaviconAlreadyStarted: boolean;
    private sound = canUseDOM
        ? new Howl({
              src: ['/static/sounds/notification.mp3'],
              onloaderror: () => {
                  console.warn('sound error');
              },
              onplayerror: () => {
                  console.warn('sound play error');
              },
          })
        : undefined;

    constructor() {
        if (canUseDOM) {
            const serviceWorkerSupported = 'serviceWorker' in navigator;
            const notiticationServiceWorkerSupported =
                serviceWorkerSupported && 'showNotification' in ServiceWorkerRegistration.prototype;
            const notificationsClassicalSupported = 'Notification' in window;
            const notificationsSupported =
                notificationsClassicalSupported || notiticationServiceWorkerSupported;
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
        this.blinkFaviconAlreadyStarted = false;
    }

    watch(handler: (state: AppNotifcationsState) => void) {
        this.watchers.push(handler);
    }

    unwatch(handler: (state: AppNotifcationsState) => void) {
        let index = this.watchers.findIndex(v => v === handler);
        if (index >= 0) {
            this.watchers.splice(index, 1);
        } else {
            console.warn('Trying to unsubscribe unknown watcher');
        }
    }

    requestPermission() {
        if (canUseDOM) {
            if (this.state === 'default' || this.state === 'temporary_denied') {
                Notification.requestPermission(permission => {
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
                        } else {
                            this.state = 'temporary_denied';
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

    blinkDocumentFavicon = () => {
        if (canUseDOM) {
            let favicons: any = document.getElementsByClassName('favicon');
            const favIconPath16 = '/static/img/favicon/favicon-16x16.png?v=2';
            const favIconPath32 = '/static/img/favicon/favicon-32x32.png?v=2';
            const favIconNotifyPath16 = '/static/img/favicon/favicon-notify-16x16.png?v=2';
            const favIconNotifyPath32 = '/static/img/favicon/favicon-notify-32x32.png?v=2';

            if (document.hasFocus()) {
                localStorage.setItem('fav', 'false');
            } else if (
                !document.hasFocus() &&
                !this.blinkFaviconAlreadyStarted &&
                favicons
            ) {
                this.blinkFaviconAlreadyStarted = true;
                localStorage.setItem('fav', 'true');
                favicons[0].href = favIconNotifyPath32;
                favicons[1].href = favIconNotifyPath16;

                let interval = setInterval(() => {
                    if (document.hasFocus()) {
                        this.blinkFaviconAlreadyStarted = false;
                        clearInterval(interval);
                        localStorage.setItem('fav', 'false');
                        favicons[0].href = favIconPath32;
                        favicons[1].href = favIconPath16;
                    }

                    if (!document.hasFocus() && localStorage.getItem('fav') === 'false') {
                        this.blinkFaviconAlreadyStarted = false;
                        clearInterval(interval);
                        localStorage.setItem('fav', 'false');
                        favicons[0].href = favIconPath32;
                        favicons[1].href = favIconPath16;
                    }
                }, 1000);
            }
        }
    };

    playIncomingSound() {
        this.sound!.play();
    }

    displayNotification(content: { path: string; title: string; body: string; image?: string }) {
        try {
            this.blinkDocumentFavicon();
            if (this.state === 'granted') {
                let notification = new Notification(content.title, {
                    body: content.body,
                    icon: content.image,
                    silent: true,
                } as any);
                let router = this.router;
                notification.onclick = function() {
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
