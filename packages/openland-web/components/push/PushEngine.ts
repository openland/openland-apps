import { trackError } from 'openland-x-analytics';
import { AppNotifications } from 'openland-y-runtime/AppNotifications';
import { AppNotifcationsState } from 'openland-y-runtime-api/AppNotificationsApi';
import gql from 'graphql-tag';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { backoff } from 'openland-y-utils/timer';
import { logger } from 'openland-y-utils/logger';

const log = logger('push');

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')
        ;
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

const FetchPushSettings = gql`
    query FetchPushSettings {
        pushSettings {
            webPushKey
        }
    }
`;

const RegisterPush = gql`
    mutation RegisterPush($endpoint: String!) {
        registerWebPush(endpoint: $endpoint)
    }
`;

export class PushEngine {
    private readonly serviceWorkerSupported = 'serviceWorker' in navigator;
    private readonly notiticationServiceWorkerSupported = this.serviceWorkerSupported && 'showNotification' in ServiceWorkerRegistration.prototype;
    private readonly notificationsClassicalSupported = 'Notification' in window;
    private readonly notificationsSupported = this.notificationsClassicalSupported || this.notiticationServiceWorkerSupported;
    private readonly pushSupported = 'PushManager' in window;
    readonly enablePush: boolean;
    readonly client: OpenApolloClient;
    private registration: ServiceWorkerRegistration | null = null;
    private grantedReceived = false;

    constructor(enablePush: boolean, client: OpenApolloClient) {
        this.enablePush = enablePush;
        this.client = client;
        this.startServiceWorker();
    }

    private startServiceWorker = async () => {
        if (this.serviceWorkerSupported) {
            (async () => {
                try {
                    log.log('Registering service worker');
                    let registration: ServiceWorkerRegistration;
                    try {
                        registration = await navigator.serviceWorker.register('/worker.js');
                        log.log('Service Worker is registered');
                        log.log(registration);
                    } catch (e) {
                        trackError(e);
                        log.warn(e);
                        return;
                    }
                    this.registration = registration;
                    log.log('Service worker registered');

                    // Configuring service worker
                    if (this.enablePush) {
                        log.log('Waiting for granted state...');
                        AppNotifications.watch(this.handleNotificationsState);
                        await this.handleNotificationsState(AppNotifications.state);
                    } else {
                        log.log('Removing all subscriptions...');
                        await this.deleteSubscriptions();
                    }
                } catch (e) {
                    log.error(e);
                    trackError(e);
                }
            })();
        } else {
            log.warn('Service Workers not supported');
        }
    }

    private handleNotificationsState = (state: AppNotifcationsState) => {
        if (state === 'granted' && !this.grantedReceived) {
            this.grantedReceived = true;
            log.log('Granted state received');
            this.createSubscriptions();
        }
    }

    private deleteSubscriptions = async () => {
        if (this.pushSupported) {
            let subscription = await this.registration!!.pushManager.getSubscription();
            if (subscription) {
                await subscription.unsubscribe();
                log.log('Unsubscribe current subscription');
            }
            log.warn('Push engine stopped');
        }
    }

    private createSubscriptions = () => {
        if (this.serviceWorkerSupported && this.notificationsSupported && this.pushSupported) {
            (async () => {
                try {

                    //
                    // Loading Push Settings
                    //

                    log.log('Downloading push settings...');
                    let settings = await backoff(async () => await this.client.client.query({
                        query: FetchPushSettings
                    }));
                    let key = (settings.data as any).pushSettings.webPushKey as string | null;
                    if (key) {
                        log.log('Settings downloaded');
                    } else {
                        log.log('No settings provided');
                    }

                    //
                    // Configure subscriptions
                    //

                    let subsctiption = await this.registration!!.pushManager.getSubscription();
                    if (key) {
                        // Create new subscription or reuse existing
                        let encodedKey = urlBase64ToUint8Array(key);
                        if (subsctiption) {
                            if (!subsctiption.options.applicationServerKey) {
                                // WTF?
                                log.warn('Unexpected state: No application server key in subscription options. Unsubscribing.');
                                await this.handleUnsubscription(subsctiption);
                                log.warn('Push engine stopped');
                            } else {
                                let existing = new Uint8Array(subsctiption.options.applicationServerKey);
                                let isSame = true;
                                if (existing.length !== encodedKey.length) {
                                    isSame = false;
                                } else {
                                    for (let i = 0; i < encodedKey.length; i++) {
                                        if (encodedKey[i] !== existing[i]) {
                                            isSame = false;
                                            break;
                                        }
                                        //
                                    }
                                }
                                if (isSame) {
                                    log.log('Push registration is not changed: reusing existing one.');
                                    await this.handleSubscription(subsctiption);
                                } else {
                                    // Resubscribe
                                    log.log('It seems that server key was changed: resubscribing.');
                                    this.handleUnsubscription(subsctiption);
                                    let res = await this.registration!!.pushManager.subscribe({
                                        userVisibleOnly: true,
                                        applicationServerKey: encodedKey
                                    });
                                    await this.handleSubscription(res);
                                }
                            }
                        } else {
                            log.log('Starting new push subscription');
                            let res = await this.registration!!.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: encodedKey
                            });
                            await this.handleSubscription(res);
                        }
                    } else {
                        // Do unsubsctibe
                        if (subsctiption) {
                            await this.handleUnsubscription(subsctiption);
                        }
                    }
                } catch (e) {
                    log.error(e);
                    trackError(e);
                }
            })();
        } else {
            log.warn('Push notifications not supported');
        }
    }

    private async handleUnsubscription(subscription: PushSubscription) {
        log.log('Unsubscribing');
        log.log(subscription);
        await subscription.unsubscribe();
        // TODO: Implement token deletion
    }

    private async handleSubscription(subscription: PushSubscription) {
        log.log('Registering subscription');
        log.log(subscription);
        await backoff(async () => await this.client.client.mutate({
            mutation: RegisterPush,
            variables: {
                endpoint: JSON.stringify(subscription)
            }
        }));
        log.log('Push registered successfully.');
    }
}

let cachedEngine: PushEngine | null = null;

export function initPushEngine(enablePush: boolean, client: OpenApolloClient) {
    if (cachedEngine) {
        if (cachedEngine.enablePush !== enablePush) {
            throw Error('Insonsistent state');
        }
    } else {
        cachedEngine = new PushEngine(enablePush, client);
    }
}