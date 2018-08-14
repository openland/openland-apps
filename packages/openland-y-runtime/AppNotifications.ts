import { AppNotificationsApi, AppNotifcationsState } from 'openland-y-runtime-api/AppNotificationsApi';

class AppNotiticationsStub implements AppNotificationsApi {
    state: AppNotifcationsState = 'unsupported';
    
    watch(handler: (state: AppNotifcationsState) => void) {
        // Do nothing
    }
    unwatch(handler: (state: AppNotifcationsState) => void) {
        // Do nothing
    }
    requestPermission() {
        // Do nothing
    }

    displayNotification(content: { path: string, title: string, body: string, image?: string, id?: string }) {
        // Do nothing
    }
}

export const AppNotifications = new AppNotiticationsStub();