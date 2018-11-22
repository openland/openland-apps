import { MessengerEngine } from './MessengerEngine';
import { SettingsQuery, ChatInfoQuery } from 'openland-api';
import { Settings as SettingsQueryType } from 'openland-api/Types';
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

        let info = (await this.engine.client.query(ChatInfoQuery, { conversationId: cid })).data.chat;

        if (settings.desktopNotifications === 'NONE') {
            return;
        } else if (settings.desktopNotifications === 'DIRECT') {
            if (info.__typename !== 'PrivateConversation') {
                return;
            }
        }

        if (!info.settings.mute) {
            AppNotifications.playIncomingSound();
            let conversationId = info.flexibleId;
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