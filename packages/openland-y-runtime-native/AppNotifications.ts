import { AppNotificationsApi, AppNotifcationsState } from 'openland-y-runtime-api/AppNotificationsApi';
import Push from 'react-native-push-notification';
class AppNotiticationsStub implements AppNotificationsApi {
    state: AppNotifcationsState = 'default';

    constructor() {
        Push.checkPermissions((clb) => {
            if (clb.alert === true) {
                this.state = 'granted';
            } else if (clb.alert === false) {
                this.state = 'denied';
            } else {
                this.state = 'default';
            }
        });
        Push.configure({
            onRegister: (args) => {
                // TODO: Handle Push Token
            },
            requestPermissions: true
        });
    }

    watch(handler: (state: AppNotifcationsState) => void) {
        // Do nothing
    }
    unwatch(handler: (state: AppNotifcationsState) => void) {
        // Do nothing
    }
    requestPermission() {
        // Do nothing
    }

    displayNotification(content: { path: string, title: string, body: string, image?: string }) {
        Push.localNotification({
            title: content.title,
            message: content.body
        });
    }
}

export const AppNotifications = new AppNotiticationsStub();