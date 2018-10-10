import { AppNotificationsApi, AppNotifcationsState } from 'openland-y-runtime-api/AppNotificationsApi';
import Push from 'react-native-push-notification';
import { Platform } from 'react-native';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';

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

    displayNotification(content: { path: string, title: string, body: string, image?: string, id?: string }) {
        // On android show only when app is visible?
        if (Platform.OS === 'android') {
            if (!AppVisibility.isVisible) {
                return;
            }
        }
        // Do not show local notifications since remove one is good enougth
        if (Platform.OS === 'ios') {
            return;
        }
        Push.localNotification({
            title: content.title,
            message: content.body,
            group: 'conversation_message',
            color: '#4747EC',
            ...content.id ? { id: content.id } : {},
        });
    }
}

export const AppNotifications = new AppNotiticationsIOS();