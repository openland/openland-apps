import { createLogger } from 'mental-log';
import { DataSource } from 'openland-y-utils/DataSource';
import { DataSourceStored, DataSourceStoredProvider } from 'openland-y-utils/DataSourceStored';
import { DataSourceAugmentor } from 'openland-y-utils/DataSourceAugmentor';
import { formatMessage } from './formatMessage';
import { MessengerEngine } from '../MessengerEngine';
import {
    DialogFragment,
    DialogMessage,
    DialogKind,
    DialogUpdateFragment,
    Room_room_PrivateRoom,
    DialogUpdateFragment_DialogPeerUpdated_peer,
    RoomPico_room_SharedRoom,
} from 'openland-api/spacex.types';

const log = createLogger('Engine-Dialogs');

export interface DialogDataSourceItemStored {
    // Chat IDs
    key: string;
    flexibleId: string;

    // Chat Description
    title: string;
    kind: 'PRIVATE' | 'INTERNAL' | 'PUBLIC' | 'GROUP';
    isChannel?: boolean;
    photo?: string;

    // Chat State
    unread: number;
    isMuted?: boolean;

    // Chat Top Message
    message?: string;
    date?: number;
    fallback: string;

    // Chat Top Message Flags
    forward?: boolean;
    haveMention?: boolean;
    isService?: boolean;
    isOut?: boolean;

    // Chat Top Message Sender
    sender?: string;
    showSenderName?: boolean;

    // Internal State
    messageId?: string;
}

export interface DialogDataSourceItem extends DialogDataSourceItemStored {
    online?: boolean;
    typing?: string;
}

const extractDialog = (dialog: DialogFragment, uid: string): DialogDataSourceItemStored => {
    let msg = formatMessage(dialog.topMessage);
    let isOut = dialog.topMessage ? dialog.topMessage!!.sender.id === uid : undefined;
    let sender = dialog.topMessage
        ? dialog.topMessage.sender.id === uid
            ? 'You'
            : dialog.topMessage.sender.firstName
        : undefined;
    let isService = (dialog.topMessage && dialog.topMessage.__typename === 'ServiceMessage') || undefined;
    return {
        haveMention: dialog.haveMention,
        isMuted: dialog.isMuted,
        kind: dialog.kind,
        isChannel: dialog.isChannel,
        title: dialog.title,
        photo: dialog.photo,
        key: dialog.cid,
        flexibleId: dialog.fid,
        unread: dialog.unreadCount,
        message: dialog.topMessage && dialog.topMessage.message ? msg : undefined,
        fallback: msg,
        isOut: dialog.topMessage ? dialog.topMessage.sender.id === uid : undefined,
        sender: sender,
        messageId: dialog.topMessage ? dialog.topMessage.id : undefined,
        date: dialog.topMessage ? parseInt(dialog.topMessage.date, 10) : undefined,
        forward: dialog.topMessage ? dialog.topMessage.__typename === 'GeneralMessage' && !!dialog.topMessage.quotedMessages.length && !dialog.topMessage.message : false,
        isService,
        showSenderName: !!(msg && (isOut || dialog.kind !== 'PRIVATE') && sender) && !isService,
    };
};

export class DialogListEngine {
    readonly engine: MessengerEngine;
    readonly _dataSourceStored: DataSourceStored<DialogDataSourceItemStored>;
    readonly dataSource: DataSource<DialogDataSourceItem>;
    private userConversationMap = new Map<string, string>();
    private visibleConversations = new Set<string>();

    constructor(engine: MessengerEngine) {
        this.engine = engine;

        //
        // DataStore
        //

        let provider: DataSourceStoredProvider<DialogDataSourceItemStored> = {
            loadMore: async (cursor?: string) => {
                let res = await this.engine.client.queryDialogs({ after: cursor }, { fetchPolicy: 'network-only' });
                return {
                    items: res.dialogs.items.filter((v) => !!v.topMessage).map((v) => extractDialog(v, engine.user.id)),
                    cursor: res.dialogs.cursor ? res.dialogs.cursor : undefined,
                    state: res.state.state!!
                };
            },
            onStarted: (state: string) => {
                engine.dialogSequence.handleDialogsStarted(state);
            }
        };
        this._dataSourceStored = new DataSourceStored('dialogs', engine.options.store, 20, provider);
        let typingsAugmentator = new DataSourceAugmentor<DialogDataSourceItemStored, { typing: string }>(this._dataSourceStored.dataSource);
        let onlineAugmentator = new DataSourceAugmentor<DialogDataSourceItemStored & { typing?: string }, { online: boolean }>(typingsAugmentator.dataSource);
        this.dataSource = onlineAugmentator.dataSource;

        //
        // Presences
        //

        this.dataSource.watch({
            onDataSourceInited: (items) => {
                for (let i of items) {
                    if (i.kind === 'PRIVATE') {
                        this.userConversationMap.set(i.flexibleId, i.key);
                        this.engine.getOnlines().onPrivateChatAppears(i.flexibleId);
                    }
                }
            },
            onDataSourceLoadedMore: (items) => {
                for (let i of items) {
                    if (i.kind === 'PRIVATE') {
                        this.userConversationMap.set(i.flexibleId, i.key);
                        this.engine.getOnlines().onPrivateChatAppears(i.flexibleId);
                    }
                }
            },
            onDataSourceItemAdded: (item) => {
                if (item.kind === 'PRIVATE') {
                    this.userConversationMap.set(item.flexibleId, item.key);
                    this.engine.getOnlines().onPrivateChatAppears(item.flexibleId);

                }
            },
            onDataSourceLoadedMoreForward: (items) => {
                // Nothing to do
            },
            onDataSourceItemRemoved: (item) => {
                // Nothing to do
            },
            onDataSourceItemMoved: () => {
                // Nothing to do
            },
            onDataSourceItemUpdated: () => {
                // Nothing to do
            },
            onDataSourceCompleted: () => {
                // Nothing to do
            },
            onDataSourceCompletedForward: () => {
                // Nothing to do
            },
            onDataSourceScrollToKeyRequested: () => {
                //
            }
        });
        engine.getOnlines().onSingleChangeChange((user, online) => {
            let conversationId = this.userConversationMap.get(user);
            if (!conversationId) {
                return;
            }
            onlineAugmentator.setAugmentation(conversationId, { online });
        });

        //
        // Typings
        //

        engine.getTypings().subcribe((typing, users, _, conversationId) => {
            if (typing) {
                typingsAugmentator.setAugmentation(conversationId, { typing });
            } else {
                typingsAugmentator.removeAugmentation(conversationId);
            }
        });
    }

    onConversationVisible = (conversationId: string) => {
        this.visibleConversations.add(conversationId);
    }

    onConversationHidden = (conversationId: string) => {
        this.visibleConversations.delete(conversationId);
    }

    handleUpdate = async (update: DialogUpdateFragment): Promise<boolean> => {
        if (update.__typename === 'DialogMessageReceived') {
            this.handleNewMessage(event, this.visibleConversations.has(update.cid));
            return true;
        } else if (update.__typename === 'DialogMessageRead') {
            await this.handleUserRead(update.cid, update.unread, this.visibleConversations.has(update.cid), update.haveMention);
            return true;
        } else if (update.__typename === 'DialogMessageDeleted') {
            await this.handleMessageDeleted(
                update.cid,
                update.message.id,
                update.prevMessage,
                update.unread,
                update.haveMention,
                this.engine.user.id
            );
            return true;
        } else if (update.__typename === 'DialogPeerUpdated') {
            await this.handlePeerUpdated(update.cid, update.peer);
            return true;
        } else if (update.__typename === 'DialogBump') {
            await this.handleNewMessage({ ...update, message: update.topMessage }, this.visibleConversations.has(update.cid));
            return true;
        } else if (update.__typename === 'DialogMuteChanged') {
            await this.handleMuteUpdated(update.cid, update.mute);
            return true;
        } else if (update.__typename === 'DialogMessageUpdated') {
            await this.handleMessageUpdated(update);
            return true;
        } else if (update.__typename === 'DialogDeleted') {
            await this.handleDialogDeleted(update);
            return true;
        }
        return false;
    }

    handleStateProcessed = async (state: string) => {
        log.log('State Processed');
        await this._dataSourceStored.updateState(state);
    }

    private handleUserRead = async (conversationId: string, unread: number, visible: boolean, haveMention: boolean) => {
        log.log('User Read');
        // Write counter to datasource
        let res = await this._dataSourceStored.getItem(conversationId);
        if (res) {
            await this._dataSourceStored.updateItem({
                ...res,
                unread: unread,
                haveMention
            });
        }
    }

    private handleDialogDeleted = async (event: any) => {
        log.log('Dialog Deleted');
        const cid = event.cid as string;
        if (await this._dataSourceStored.hasItem(cid)) {
            await this._dataSourceStored.removeItem(cid);
        }
    }

    private handleMessageUpdated = async (event: any) => {
        log.log('Message Updated');
        const conversationId = event.cid as string;
        let existing = await this._dataSourceStored.getItem(conversationId);

        if (existing) {
            if (existing.messageId === event.message.id) {
                const msg = formatMessage(event.message);

                await this._dataSourceStored.updateItem({
                    ...existing,
                    message: event.message.message ? msg : undefined,
                    fallback: msg,
                    haveMention: event.haveMention
                });
            }
        }
    }

    private handleMessageDeleted = async (cid: string, mid: string, prevMessage: DialogMessage | null, unread: number, haveMention: boolean, uid: string) => {
        log.log('Message Deleted');
        let existing = await this._dataSourceStored.getItem(cid);

        if (existing && existing.messageId === mid) {
            if (prevMessage === null) {
                await this._dataSourceStored.removeItem(existing.key);
            } else {
                await this._dataSourceStored.updateItem(extractDialog({
                    id: existing.key,
                    cid: cid, fid: existing.flexibleId, kind: existing.kind as DialogKind, isChannel: !!existing.isChannel, title: existing.title, photo: existing.photo || '', unreadCount: unread, topMessage: prevMessage, isMuted: !!existing.isMuted, haveMention: haveMention, __typename: "Dialog"
                }, uid));
            }
        }
    }

    private handlePeerUpdated = async (cid: string, peer: DialogUpdateFragment_DialogPeerUpdated_peer) => {
        log.log('Peer Updated');
        let existing = await this._dataSourceStored.getItem(cid);
        if (existing) {
            await this._dataSourceStored.updateItem({
                ...existing,
                title: peer.__typename === 'PrivateRoom' ? peer.user.name : peer.title,
                photo: peer.__typename === 'PrivateRoom' ? peer.user.photo || undefined : peer.photo,
            });
        }
    }

    private handleMuteUpdated = async (cid: string, mute: boolean) => {
        log.log('Mute Updated');
        let existing = await this._dataSourceStored.getItem(cid);
        if (existing) {
            await this._dataSourceStored.updateItem({
                ...existing,
                isMuted: mute,
            });
        }
    }

    private handleNewMessage = async (event: any, visible: boolean) => {
        log.log('New Message');
        const conversationId = event.cid as string;
        const unreadCount = event.unread as number;

        let res = await this._dataSourceStored.getItem(conversationId);
        let isOut = event.message.sender.id === this.engine.user.id;
        let sender = isOut ? 'You' : event.message.sender.firstName;
        let isService = event.message.__typename === 'ServiceMessage';
        if (res) {
            let msg = formatMessage(event.message);

            log.log('Update Item: ' + res.key);
            await this._dataSourceStored.updateItem({
                ...res,
                isService,
                unread: !visible || res.unread > unreadCount ? unreadCount : res.unread,
                isOut: isOut,
                sender: sender,
                haveMention: event.haveMention,
                messageId: event.message.id,
                message: event.message && event.message.message ? msg : undefined,
                fallback: msg,
                date: parseInt(event.message.date, 10),
                forward: !event.message.message && event.message.quotedMessages && event.message.quotedMessages.length,
                showSenderName:
                    !!(msg && (isOut || res.kind !== 'PRIVATE') && sender) &&
                    !isService,
            });

            log.log('Move Item: ' + res.key);
            await this._dataSourceStored.moveItem(res.key, 0);
        } else {
            if (
                event.message.serviceMetadata &&
                event.message.serviceMetadata.__typename === 'KickServiceMetadata'
            ) {
                return;
            }

            let info = await this.engine.client.queryRoomPico({
                id: conversationId,
            });

            let sharedRoom =
                info.room!.__typename === 'SharedRoom' ? (info.room as RoomPico_room_SharedRoom) : null;
            let privateRoom =
                info.room!.__typename === 'PrivateRoom'
                    ? (info.room as Room_room_PrivateRoom)
                    : null;
            let room = (sharedRoom || privateRoom)!;

            let msg = formatMessage(event.message);

            if (privateRoom) {
                this.userConversationMap.set(privateRoom!.user.id, privateRoom.id);
            }

            log.log('Add Item: ' + conversationId);
            await this._dataSourceStored.addItem(
                {
                    key: conversationId,
                    isService,
                    isMuted: !!room.settings.mute,
                    haveMention: event.haveMention,
                    flexibleId: privateRoom ? privateRoom.user.id : room.id,
                    kind: sharedRoom ? sharedRoom.kind : 'PRIVATE',
                    isChannel: sharedRoom ? sharedRoom.isChannel : false,
                    title: sharedRoom ? sharedRoom.title : privateRoom ? privateRoom.user.name : '',
                    photo:
                        (sharedRoom
                            ? sharedRoom.roomPhoto
                            : privateRoom
                                ? privateRoom.user.photo
                                : undefined) || undefined,
                    unread: unreadCount,
                    isOut: isOut,
                    sender: sender,
                    messageId: event.message.id,
                    message: event.message && event.message.message ? msg : undefined,
                    fallback: msg,
                    date: parseInt(event.message.date, 10),
                    forward: event.message.quotedMessages && !!event.message.quotedMessages.length,
                    showSenderName:
                        !!(
                            msg &&
                            (isOut || (sharedRoom ? sharedRoom.kind : 'PRIVATE') !== 'PRIVATE') &&
                            sender
                        ) && !isService,
                },
                0
            );
        }
    }
}
