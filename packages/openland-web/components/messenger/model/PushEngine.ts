import { trackError } from 'openland-x-analytics';

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')
        ;
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export interface PushSettings {
    applicationKey?: string;
}

export class PushEngine {
    private readonly notificationsSupported = 'Notification' in window;
    private readonly serviceWorkerSupported = 'serviceWorker' in navigator;
    private readonly pushSupported = 'PushManager' in window;
    private handleRegister: (endpoint: string) => void;
    private registration: ServiceWorkerRegistration | null = null;
    private pushSettings: PushSettings | null = null;

    constructor(handleRegister: (endpoint: string) => void) {
        this.handleRegister = handleRegister;
        if (this.serviceWorkerSupported) {
            (async () => {

                // Registering Service Worker
                let registration: ServiceWorkerRegistration;
                try {
                    registration = await navigator.serviceWorker.register('/worker.js');
                    console.log('Service Worker is registered');
                    console.log(registration);
                } catch (e) {
                    trackError(e);
                    console.warn(e);
                    return;
                }
                this.registration = registration;
                if (this.pushSettings) {
                    this.wireSubscriptions();
                }
            })();
        }
    }

    startPush(pushSettings: PushSettings) {
        this.pushSettings = pushSettings;
        if (this.registration) {
            this.wireSubscriptions();
        }
    }

    private wireSubscriptions = () => {
        if (this.serviceWorkerSupported && this.notificationsSupported && this.pushSupported) {
            (async () => {
                try {
                    let subsctiption = await this.registration!!.pushManager.getSubscription();
                    if (this.pushSettings!!.applicationKey) {
                        // Create new subscription or reuse existing
                        let key = urlBase64ToUint8Array(this.pushSettings!!.applicationKey!!);
                        if (subsctiption) {
                            if (!subsctiption.options.applicationServerKey) {
                                // WTF?
                                this.handleUnsubscription(subsctiption);
                                await subsctiption.unsubscribe();
                            } else {
                                let existing = new Uint8Array(subsctiption.options.applicationServerKey);
                                let isSame = true;
                                if (existing.length !== key.length) {
                                    isSame = false;
                                } else {
                                    for (let i = 0; i < key.length; i++) {
                                        if (key[i] !== existing[i]) {
                                            isSame = false;
                                            break;
                                        }
                                        //
                                    }
                                }
                                if (isSame) {
                                    console.log('Reusing existing');
                                    this.handleSubscription(subsctiption);
                                } else {
                                    // Resubscribe
                                    console.log('Resubscribing with new key');
                                    this.handleUnsubscription(subsctiption);
                                    await subsctiption.unsubscribe();
                                    let res = await this.registration!!.pushManager.subscribe({
                                        userVisibleOnly: true,
                                        applicationServerKey: key
                                    });
                                    this.handleSubscription(res);
                                }
                            }
                        } else {
                            console.log('New subscription');
                            let res = await this.registration!!.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: key
                            });
                            this.handleSubscription(res);
                        }
                    } else {
                        // Do unsubsctibe
                        if (subsctiption) {
                            this.handleUnsubscription(subsctiption);
                            await subsctiption.unsubscribe();
                        }
                    }
                } catch (e) {
                    trackError(e);
                }
            })();
        }
    }

    private handleUnsubscription(subscription: PushSubscription) {
        console.log('Unsubscription');
        console.log(subscription);
    }

    private handleSubscription(subsctiption: PushSubscription) {
        console.log('New subscription');
        console.log(subsctiption);
        this.handleRegister(JSON.stringify(subsctiption));
    }
}