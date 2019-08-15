import { MessengerEngine } from './MessengerEngine';
import { SettingsQuery, RoomTinyQuery } from 'openland-api';
import {
    RoomTiny_room_SharedRoom,
    RoomTiny_room_PrivateRoom,
    MyNotificationsCenter_event_NotificationCenterUpdateSingle_update_NotificationReceived,
    DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message,
} from 'openland-api/Types';
import { AppBadge } from 'openland-y-runtime/AppBadge';
import { AppNotifications } from 'openland-y-runtime/AppNotifications';
import { doSimpleHash } from 'openland-y-utils/hash';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';
import { NotificationsDataSourceItem } from './NotificationCenterEngine';

type NewMessage = DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message;

export class NotificationsEngine {
    readonly engine: MessengerEngine;
    private counter?: number;

    constructor(engine: MessengerEngine) {
        this.engine = engine;

        AppVisibility.watch(isVisible => {
            if (isVisible) {
                if (this.counter !== undefined) {
                    AppBadge.setBadge(this.counter);
                }
            }
        });
    }

    handleGlobalCounterChanged = (counter: number) => {
        this.counter = counter;
        AppBadge.setBadge(counter);
    }

    handleIncomingNotification = async (comment: NotificationsDataSourceItem) => {
        let settings = (await this.engine.client.client.readQuery(SettingsQuery))!.settings;
        if (settings.commentNotificationsDelivery === 'ALL') {
            const { key, sender, peerRootId, text, fallback, room } = comment;

            AppNotifications.playIncomingSound();

            if (room && room.__typename === 'SharedRoom') {
                AppNotifications.displayNotification({
                    title: sender.name + ' commented in @' + room.title,
                    body: text || fallback,
                    path: '/message/' + peerRootId,
                    image: sender.photo || undefined,
                    id: doSimpleHash(key).toString(),
                });
            } else {
                AppNotifications.displayNotification({
                    title: sender.name + ' commented',
                    body: text || fallback,
                    path: '/message/' + peerRootId,
                    image: sender.photo || undefined,
                    id: doSimpleHash(key).toString(),
                });
            }
        }
    }

    handleIncomingMessage = async (cid: string, event: NewMessage) => {
        const msg = event;
        let settings = (await this.engine.client.client.readQuery(SettingsQuery))!.settings;

        let room = (await this.engine.client.client.query(RoomTinyQuery, { id: cid })).room!;
        let sharedRoom =
            room.__typename === 'SharedRoom' ? (room as RoomTiny_room_SharedRoom) : null;
        let privateRoom =
            room.__typename === 'PrivateRoom' ? (room as RoomTiny_room_PrivateRoom) : null;

        if (settings.desktopNotifications === 'NONE') {
            return;
        } else if (settings.desktopNotifications === 'DIRECT') {
            if (!privateRoom) {
                return;
            }
        }

        if (!(sharedRoom || privateRoom)!.settings.mute || (event && (event as any).isMentioned)) {
            AppNotifications.playIncomingSound();
            let conversationId = privateRoom ? privateRoom.user.id : sharedRoom!.id;
            let message = msg.message || msg.fallback;

            if (sharedRoom) {
                AppNotifications.displayNotification({
                    title: msg.sender.name + ' @' + sharedRoom.title,
                    body: message,
                    path: '/mail/' + cid,
                    image: msg.sender.photo || '',
                    id: doSimpleHash(cid).toString(),
                });
            } else if (privateRoom) {
                AppNotifications.displayNotification({
                    title: msg.sender.name,
                    body: message,
                    path: '/mail/' + conversationId,
                    image: msg.sender.photo || '',
                    id: doSimpleHash(cid).toString(),
                });
            }
        }
    }
}
