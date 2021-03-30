import { MessengerEngine } from './MessengerEngine';
import {
    RoomChat_room_SharedRoom,
    RoomChat_room_PrivateRoom,
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
        const silent = (AppConfig.getPlatform() === 'mobile' && !settings.mobile.comments.sound) ||
            (AppConfig.getPlatform() === 'desktop' && !settings.desktop.comments.sound);
        const soundOnly = (AppConfig.getPlatform() === 'mobile' && !settings.mobile.comments.showNotification) ||
            (AppConfig.getPlatform() === 'desktop' && !settings.desktop.comments.showNotification);

        const { key, sender, peerRootId, text, fallback, room } = comment;
        const path = '/message/' + peerRootId + (!!comment.id ? ('/comment/' + comment.id) : '');

        if (room && room.__typename === 'SharedRoom') {
            AppNotifications.displayNotification({
                title: sender.name + ' commented in @' + room.title,
                body: text || fallback,
                path,
                image: sender.photo || undefined,
                id: doSimpleHash(key).toString(),
                replace: false,
                silent,
                soundOnly
            });
        } else {
            AppNotifications.displayNotification({
                title: sender.name + ' commented',
                body: text || fallback,
                path,
                image: sender.photo || undefined,
                id: doSimpleHash(key).toString(),
                replace: false,
                silent,
                soundOnly
            });
        }
    }

    handleIncomingMessage = async (cid: string, event: NewMessageEvent) => {
        const msg = event.message;
        let room = (await this.engine.client.queryRoomChat({ id: cid })).room!;
        let sharedRoom =
            room.__typename === 'SharedRoom' ? (room as RoomChat_room_SharedRoom) : null;
        let privateRoom =
            room.__typename === 'PrivateRoom' ? (room as RoomChat_room_PrivateRoom) : null;
        let conversationId = privateRoom ? privateRoom.user.id : sharedRoom!.id;
        let message = msg.message || msg.fallback;

        const silent = (AppConfig.getPlatform() === 'mobile' && event.silent.mobile) ||
            (AppConfig.getPlatform() === 'desktop' && event.silent.desktop);
        const soundOnly = (AppConfig.getPlatform() === 'mobile' && !event.showNotification.mobile) ||
            (AppConfig.getPlatform() === 'desktop' && !event.showNotification.desktop);

        if (sharedRoom) {
            AppNotifications.displayNotification({
                title: msg.sender.name + ' @' + sharedRoom.title,
                body: message,
                path: '/mail/' + cid,
                image: msg.sender.photo || '',
                id: doSimpleHash(cid).toString(),
                silent,
                soundOnly
            });
        } else if (privateRoom) {
            AppNotifications.displayNotification({
                title: msg.sender.name,
                body: message,
                path: '/mail/' + conversationId,
                image: msg.sender.photo || '',
                id: doSimpleHash(cid).toString(),
                silent,
                soundOnly
            });
        }
    }
}
