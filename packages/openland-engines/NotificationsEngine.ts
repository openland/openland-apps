import { MessengerEngine } from './MessengerEngine';
import { SettingsQuery, RoomQuery } from 'openland-api';
import { Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { AppBadge } from 'openland-y-runtime/AppBadge';
import { AppNotifications } from 'openland-y-runtime/AppNotifications';
import { doSimpleHash } from 'openland-y-utils/hash';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';
import { Platform } from 'react-native';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

export class NotificationsEngine {
    readonly engine: MessengerEngine;
    private counter?: number;
    private blinkFaviconAlreadyStarted: boolean;
    // private blinkingAlreadyStarted: boolean;

    constructor(engine: MessengerEngine) {
        this.engine = engine;

        AppVisibility.watch(isVisible => {
            if (isVisible) {
                if (this.counter !== undefined) {
                    AppBadge.setBadge(this.counter);
                }
            }
        });
        this.blinkFaviconAlreadyStarted = false;
        // this.blinkingAlreadyStarted = false;
    }

    handleGlobalCounterChanged = (counter: number) => {
        this.counter = counter;
        AppBadge.setBadge(counter);
    };

    // private blinkDocumentTitle = () => {
    //     if (!document.hasFocus() && !this.blinkingAlreadyStarted) {
    //         this.blinkingAlreadyStarted = true;
    //
    //         let prevTitle = document.title;
    //
    //         let isBlinkedTitle = false;
    //         let interval = setInterval(() => {
    //             isBlinkedTitle = !isBlinkedTitle;
    //
    //             if (!document.hasFocus() && localStorage.getItem('blinkingStarted') !== 'stoped') {
    //                 localStorage.setItem('blinkingStarted', 'started');
    //
    //                 document.title = isBlinkedTitle ? 'New message · Openland' : prevTitle;
    //             } else {
    //                 localStorage.setItem('blinkingStarted', 'stoped');
    //
    //                 if (localStorage.getItem('blinkingStopStarted') !== 'true') {
    //                     localStorage.setItem('blinkingStopStarted', 'true');
    //
    //                     setTimeout(() => {
    //                         localStorage.setItem('blinkingStarted', 'cleared');
    //                         localStorage.setItem('blinkingStopStarted', 'false');
    //                     }, 2000);
    //                 }
    //
    //                 document.title = prevTitle;
    //
    //                 this.blinkingAlreadyStarted = false;
    //
    //                 clearInterval(interval);
    //             }
    //         }, 1000);
    //     }
    // };

    private blinkDocumentFavicon = () => {
        if (canUseDOM) {
            let favicons: any = document.getElementsByClassName('favicon');
            const favIconPath16 = '/static/img/favicon/favicon-16x16.png?v=2';
            const favIconPath32 = '/static/img/favicon/favicon-32x32.png?v=2';
            const favIconNotifyPath16 = '/static/img/favicon/favicon-notify-16x16.png?v=2';
            const favIconNotifyPath32 = '/static/img/favicon/favicon-notify-32x32.png?v=2';

            if (!document.hasFocus() && !this.blinkFaviconAlreadyStarted && favicons) {
                this.blinkFaviconAlreadyStarted = true;

                let interval = setInterval(() => {
                    favicons[0].href = favIconNotifyPath32;
                    favicons[1].href = favIconNotifyPath16;
                    if (document.hasFocus()) {
                        this.blinkFaviconAlreadyStarted = false;
                        clearInterval(interval);
                        favicons[0].href = favIconPath32;
                        favicons[1].href = favIconPath16;
                    }
                }, 1000);
            }
        }
    };

    handleIncomingMessage = async (cid: string, msg: any) => {
        let settings = (await this.engine.client.client.readQuery(SettingsQuery))!.settings;

        let room = (await this.engine.client.client.query(RoomQuery, { id: cid })).room!;
        let sharedRoom = room.__typename === 'SharedRoom' ? (room as Room_room_SharedRoom) : null;
        let privateRoom =
            room.__typename === 'PrivateRoom' ? (room as Room_room_PrivateRoom) : null;

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

            this.blinkDocumentFavicon();
            // this.blinkDocumentTitle();
        }
    };
}
