import { AppNotificationsApi, AppNotifcationsState } from 'openland-y-runtime-api/AppNotificationsApi';
import Push from 'react-native-push-notification';

var token: string | null = null;
var tokenListeners: ((token: string) => void)[] = [];

Push.configure({
    onRegister: (args) => {
        token = args.token;
        for (let t of tokenListeners) {
            t(token);
        }
        tokenListeners = [];
    },
    senderID: '1095846783035',
    requestPermissions: false,
    onNotification: (n) => {
        // AppNotifications.onNotificationClick(n.data);
        console.warn('boom', n);

    }

});

class AppNotiticationsIOS implements AppNotificationsApi {
    state: AppNotifcationsState = 'granted';

    constructor() {
        // How we need to handle permissions?
        // Push.checkPermissions((clb) => {
        //     if (clb.alert === true) {
        //         this.state = 'granted';
        //     } else if (clb.alert === false) {
        //         this.state = 'denied';
        //     } else {
        //         this.state = 'default';
        //     }
        // });
    }

    watch(handler: (state: AppNotifcationsState) => void) {
        // Do nothing
    }
    unwatch(handler: (state: AppNotifcationsState) => void) {
        // Do nothing
    }

    onPushRegistered(handler: (token: string) => void) {
        if (token) {
            handler(token);
        } else {
            tokenListeners.push(handler);
        }
    }

    requestPermission() {
        Push.requestPermissions();
    }

    playIncomingSound() {
        // Do nothing
    }

    displayNotification(content: { path: string, title: string, body: string, image?: string, id?: string }) {
        // Do not show local notifications since remote one is good enougth
    }

    onNotificationClick = (data: any) => {
        // to be replaced from messenger
    }
}

export const AppNotifications = new AppNotiticationsIOS();