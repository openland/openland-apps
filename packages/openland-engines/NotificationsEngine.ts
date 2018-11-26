import { MessengerEngine } from './MessengerEngine';
import { SettingsQuery, RoomQuery } from 'openland-api';
import { Settings as SettingsQueryType, Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { AppBadge } from 'openland-y-runtime/AppBadge';
import { AppNotifications } from 'openland-y-runtime/AppNotifications';
import { doSimpleHash } from 'openland-y-utils/hash';

export class NotificationsEngine {
    readonly engine: MessengerEngine;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
    }

    handleGlobalCounterChanged = (counter: number) => {
        AppBadge.setBadge(counter);
    }

    handleIncomingMessage = async (cid: string, msg: any) => {

        let settings = this.engine.client.client.readQuery<SettingsQueryType>({
            query: SettingsQuery.document
        })!!.settings;

        let room = (await this.engine.client.query(RoomQuery, { id: cid })).data.room!;
        let sharedRoom = room.__typename === 'SharedRoom' ? room as Room_room_SharedRoom : null;
        let privateRoom = room.__typename === 'PrivateRoom' ? room as Room_room_PrivateRoom : null;

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
                    body: msg.sender.name + ': ' + msg.message,
                    path: '/mail/' + cid,
                    image: msg.sender.picture,
                    id: doSimpleHash(cid).toString(),
                });
            } else {
                AppNotifications.displayNotification({
                    title: 'New Message',
                    body: msg.sender.name + ': <file>',
                    path: '/mail/' + conversationId,
                    image: msg.sender.picture,
                    id: doSimpleHash(cid).toString(),
                });
            }
        }
    }
}