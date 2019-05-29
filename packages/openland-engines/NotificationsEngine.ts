import { MessengerEngine } from './MessengerEngine';
import { SettingsQuery, RoomTinyQuery } from 'openland-api';
import { RoomTiny_room_SharedRoom, RoomTiny_room_PrivateRoom } from 'openland-api/Types';
import { AppBadge } from 'openland-y-runtime/AppBadge';
import { AppNotifications } from 'openland-y-runtime/AppNotifications';
import { doSimpleHash } from 'openland-y-utils/hash';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';

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

        if (!(sharedRoom || privateRoom)!.settings.mute) {
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
