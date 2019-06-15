import { NotificationsDataSourceItem } from './NotificationCenterEngine';

export class NotificationCenterState {
    readonly notifications: NotificationsDataSourceItem[];
    readonly loading: boolean;

    constructor(loading: boolean, notifications: NotificationsDataSourceItem[]) {
        this.notifications = notifications;
        this.loading = loading;
    }
}

export interface NotificationCenterStateHandler {
    onNotificationCenterUpdated(state: NotificationCenterState): void;
}