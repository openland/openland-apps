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

type NewNotification = MyNotificationsCenter_event_NotificationCenterUpdateSingle_update_NotificationReceived;
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
    };

    handleIncomingNotification = async (event: NewNotification) => {
        let settings = (await this.engine.client.client.readQuery(SettingsQuery))!.settings;
        if (settings.commentNotificationsDelivery === 'ALL') {
            const commentData = event.notification.content[0];
            const comment = commentData.comment.comment;
            const commentPeer = commentData.peer;
            const commentId = comment.id;
            const commentMessage = comment.message || comment.fallback;
            const commentSenderName = comment.sender.name;
            const commentSenderPhoto = comment.sender.photo;

            const room = commentPeer.peerRoot.chat;
            const privateRoom = room.__typename === 'PrivateRoom' ? (room as RoomTiny_room_PrivateRoom) : null;
            const sharedRoom = room.__typename === 'SharedRoom' ? (room as RoomTiny_room_SharedRoom) : null;

            AppNotifications.playIncomingSound();

            if (privateRoom) {
                AppNotifications.displayNotification({
                    title: commentSenderName + ' commented',
                    body: commentMessage,
                    path: '/notifications/comments',
                    image: commentSenderPhoto || '',
                    id: doSimpleHash(commentId).toString(),
                });
            }
            if (sharedRoom) {
                AppNotifications.displayNotification({
                    title: commentSenderName + ' commented in @' + sharedRoom.title,
                    body: commentMessage,
                    path: '/notifications/comments',
                    image: commentSenderPhoto || '',
                    id: doSimpleHash(commentId).toString(),
                });
            }
        }
    };

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
            if (privateRoom) {
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
    };
}
