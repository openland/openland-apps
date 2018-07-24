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

    displayNotification(content: { path: string, title: string, body: string, image?: string }) {
        Push.localNotification({
            title: content.title,
            message: content.body
        });
    }
}

export const AppNotifications = new AppNotiticationsIOS();