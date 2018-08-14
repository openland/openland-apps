import { MessengerEngine } from './MessengerEngine';
import { SettingsQuery } from 'openland-api';
import { SettingsQuery as SettingsQueryType } from 'openland-api/Types';
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

    handleIncomingMessage = (msg: any) => {
        let settings = this.engine.client.client.readQuery<SettingsQueryType>({
            query: SettingsQuery.document
        })!!.settings;

        if (settings.desktopNotifications === 'NONE') {
            return;
        } else if (settings.desktopNotifications === 'DIRECT') {
            if (msg.conversation.__typename !== 'PrivateConversation') {
                return;
            }
        }

        let conversationId = msg.conversation.flexibleId;
        if (msg.message.message) {
            AppNotifications.displayNotification({
                title: 'New Message',
                body: msg.message.sender.name + ': ' + msg.message.message,
                path: '/mail/' + conversationId,
                image: msg.message.sender.picture,
                id: doSimpleHash(msg.conversation.id).toString(),
            });
        } else {
            AppNotifications.displayNotification({
                title: 'New Message',
                body: msg.message.sender.name + ': <file>',
                path: '/mail/' + conversationId,
                image: msg.message.sender.picture,
                id: doSimpleHash(msg.conversation.id).toString(),
            });
        }
    }
}