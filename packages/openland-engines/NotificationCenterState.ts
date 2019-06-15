import { NotificationsDataSourceItem } from './NotificationCenterEngine';

export class NotificationCenterState {
    readonly notifications: NotificationsDataSourceItem[];

    constructor(notifications: NotificationsDataSourceItem[]) {
        this.notifications = notifications;
    }
}

export interface NotificationCenterStateHandler {
    onNotificationCenterUpdated(state: NotificationCenterState): void;
}