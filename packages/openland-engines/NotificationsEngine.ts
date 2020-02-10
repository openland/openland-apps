import { MessengerEngine } from './MessengerEngine';
import {
    RoomTiny_room_SharedRoom,
    RoomTiny_room_PrivateRoom,
    DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived,
} from 'openland-api/spacex.types';
import { AppBadge } from 'openland-y-runtime/AppBadge';
import { AppNotifications } from 'openland-y-runtime/AppNotifications';
import { doSimpleHash } from 'openland-y-utils/hash';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';
import { NotificationsDataSourceItem } from './NotificationCenterEngine';
import { AppConfig } from 'openland-y-runtime/AppConfig';

type NewMessageEvent = DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived;

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
        let settings = (await this.engine.client.querySettings())!.settings;

        if (AppConfig.getPlatform() === 'mobile' && !settings.mobile.comments.showNotification) {
            return;
        } else if (AppConfig.getPlatform() === 'desktop' && !settings.desktop.comments.showNotification) {
            return;
        }

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

    handleIncomingMessage = async (cid: string, event: NewMessageEvent) => {
        const msg = event.message;
        let room = (await this.engine.client.queryRoomTiny({ id: cid })).room!;
        let sharedRoom =
            room.__typename === 'SharedRoom' ? (room as RoomTiny_room_SharedRoom) : null;
        let privateRoom =
            room.__typename === 'PrivateRoom' ? (room as RoomTiny_room_PrivateRoom) : null;
        let conversationId = privateRoom ? privateRoom.user.id : sharedRoom!.id;
        let message = msg.message || msg.fallback;

        if ((AppConfig.getPlatform() === 'mobile' && !event.silent.mobile) ||
            (AppConfig.getPlatform() === 'desktop' && !event.silent.desktop)) {
            AppNotifications.playIncomingSound();
        }

        if (AppConfig.getPlatform() === 'mobile' && !event.showNotification.mobile) {
            return;
        } else if (AppConfig.getPlatform() === 'desktop' && !event.showNotification.desktop) {
            return;
        }

        if (sharedRoom) {
            AppNotifications.displayNotification({
                title: msg.sender.name + ' @' + sharedRoom.title,
                body: message,
                path: AppConfig.getPlatform() === 'mobile' ? '/message/' + msg.id : '/mail/' + cid,
                image: msg.sender.photo || '',
                id: doSimpleHash(cid).toString(),
            });
        } else if (privateRoom) {
            AppNotifications.displayNotification({
                title: msg.sender.name,
                body: message,
                path: AppConfig.getPlatform() === 'mobile' ? '/message/' + msg.id : '/mail/' + conversationId,
                image: msg.sender.photo || '',
                id: doSimpleHash(cid).toString(),
            });
        }
    }
}
