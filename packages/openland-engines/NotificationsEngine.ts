import { MessengerEngine } from './MessengerEngine';
import { SettingsQuery, RoomTinyQuery } from 'openland-api';
import {
    RoomTiny_room_SharedRoom,
    RoomTiny_room_PrivateRoom,
    MyNotificationsCenter_event_NotificationCenterUpdateSingle_update_NotificationReceived,
} from 'openland-api/Types';
import { AppBadge } from 'openland-y-runtime/AppBadge';
import { AppNotifications } from 'openland-y-runtime/AppNotifications';
import { doSimpleHash } from 'openland-y-utils/hash';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';

interface NewNotification
    extends MyNotificationsCenter_event_NotificationCenterUpdateSingle_update_NotificationReceived {}

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
            const commentMessage = comment.message;
            const commentAttachment = comment.attachments.length && comment.attachments[0];
            const commentAttachmentImage = commentAttachment
                ? (commentAttachment as any).fileMetadata.isImage
                : false;
            const commentSenderName = comment.sender.name;
            const commentSenderPhoto = comment.sender.photo;
            const commentChat = commentPeer.peerRoot.chat;
            const privateRoom = commentChat.__typename === 'PrivateRoom';
            const sharedRoom = commentChat.__typename === 'SharedRoom';
            AppNotifications.playIncomingSound();
            if (privateRoom) {
                AppNotifications.displayNotification({
                    title: commentSenderName + ' commented',
                    body: commentMessage
                        ? commentMessage
                        : commentAttachmentImage
                            ? '<photo>'
                            : '<document>',
                    path: '/notifications/comments',
                    image: commentSenderPhoto || '',
                    id: doSimpleHash(commentId).toString(),
                });
            }
            if (sharedRoom) {
                AppNotifications.displayNotification({
                    title: commentSenderName + ' commented in @' + (commentChat as any).title,
                    body: commentMessage
                        ? commentMessage
                        : commentAttachmentImage
                            ? '<photo>'
                            : '<document>',
                    path: '/notifications/comments',
                    image: commentSenderPhoto || '',
                    id: doSimpleHash(commentId).toString(),
                });
            }
        }
    };

    handleIncomingMessage = async (cid: string, msg: any) => {
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

        if (!(sharedRoom || privateRoom)!.settings.mute || msg.isMentioned) {
            AppNotifications.playIncomingSound();
            let conversationId = privateRoom ? privateRoom.user.id : sharedRoom!.id;
            if (msg.message) {
                AppNotifications.displayNotification({
                    title: 'New Message',
                    body:
                        msg.sender.name +
                        (!privateRoom ? '@' + sharedRoom!.title : '') +
                        ': ' +
                        msg.message,
                    path: '/mail/' + cid,
                    image: msg.sender.picture,
                    id: doSimpleHash(cid).toString(),
                });
            } else {
                AppNotifications.displayNotification({
                    title: 'New Message',
                    body:
                        msg.sender.name +
                        (!privateRoom ? '@' + sharedRoom!.title : '') +
                        ': <file>',
                    path: '/mail/' + conversationId,
                    image: msg.sender.picture,
                    id: doSimpleHash(cid).toString(),
                });
            }
        }
    };
}
