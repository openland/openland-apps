export type AppNotifcationsState = 'granted' | 'denied' | 'default' | 'temporary_denied' | 'unsupported';

export interface AppNotificationsApi {
    state: AppNotifcationsState;
    watch(handler: (state: AppNotifcationsState) => void): void;
    unwatch(handler: (state: AppNotifcationsState) => void): void;
    requestPermission(): void;
    playIncomingSound(): void;
    displayNotification(content: { path: string, title: string, body: string, image?: string }): void;
    onNotificationClick(handler: (data: any) => void): void;
}