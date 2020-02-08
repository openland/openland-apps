import { MessengerEngine } from '../MessengerEngine';
import {
    Dialogs_dialogs_items,
    Dialogs_dialogs_items_topMessage,
    Room_room_PrivateRoom,
    Dialogs_dialogs_items_topMessage_GeneralMessage_attachments,
    TinyMessage,
    DialogKind,
    FullMessage,
    ChatUpdateFragment_ChatMessageReceived,
    DialogUpdateFragment_DialogPeerUpdated_peer,
    RoomPico_room_SharedRoom,
} from 'openland-api/spacex.types';
import { DataSource } from 'openland-y-utils/DataSource';
import { createLogger } from 'mental-log';
import { DataSourceStored, DataSourceStoredProvider } from 'openland-y-utils/DataSourceStored';
import { DataSourceAugmentor } from 'openland-y-utils/DataSourceAugmentor';

const log = createLogger('Engine-Dialogs');

export interface DialogDataSourceItemStored {
    key: string;
    flexibleId: string;

    title: string;
    kind: 'PRIVATE' | 'INTERNAL' | 'PUBLIC' | 'GROUP';
    isChannel?: boolean;
    photo?: string;

    isOrganization?: boolean;

    unread: number;
    isMuted?: boolean;
    haveMention?: boolean;

    date?: number;
    forward?: boolean;
    messageId?: string;
    message?: string;
    fallback: string;
    isService?: boolean;
    sender?: string;
    isOut?: boolean;
    attachments?: Dialogs_dialogs_items_topMessage_GeneralMessage_attachments[];
    showSenderName?: boolean;
}

export interface DialogDataSourceItem extends DialogDataSourceItemStored {
    online?: boolean;
    typing?: string;
}

export function formatMessage(message: Dialogs_dialogs_items_topMessage | FullMessage | null): string {
    if (!message) {
        return '';
    }

    return (message.message && message.message.length > 0) ? message.message : message.fallback;
}

export const extractDialog = (
    {
        cid,
        fid,
        kind,
        isChannel,
        title,
        photo,
        unreadCount,
        topMessage,
        isMuted,
        haveMention,
    }: Dialogs_dialogs_items,
    uid: string,
): DialogDataSourceItemStored => {
    let msg = formatMessage(topMessage);
    let isOut = topMessage ? topMessage!!.sender.id === uid : undefined;
    let sender = topMessage
        ? topMessage!!.sender.id === uid
            ? 'You'
            : topMessage!!.sender.firstName
        : undefined;
    let isService = (topMessage && topMessage.__typename === 'ServiceMessage') || undefined;
    return {
        haveMention,
        isMuted,
        kind,
        isChannel,
        title,
        photo,
        key: cid,
        flexibleId: fid,
        unread: unreadCount,
        message: topMessage && topMessage.message ? msg : undefined,
        fallback: msg,
        attachments: topMessage && topMessage.__typename === 'GeneralMessage' ? topMessage.attachments : undefined,
        isOut: topMessage ? topMessage!!.sender.id === uid : undefined,
        sender: sender,
        messageId: topMessage ? topMessage.id : undefined,
        date: topMessage ? parseInt(topMessage!!.date, 10) : undefined,
        forward: topMessage ? topMessage.__typename === 'GeneralMessage' && !!topMessage.quotedMessages.length && !topMessage.message : false,
        isService,
        showSenderName: !!(msg && (isOut || kind !== 'PRIVATE') && sender) && !isService,
    };
};

export class DialogListEngine {
    readonly engine: MessengerEngine;
    // private dialogs: Dialogs_dialogs_items[] = [];
    readonly _dataSourceStored: DataSourceStored<DialogDataSourceItemStored>;
    readonly dataSource: DataSource<DialogDataSourceItem>;
    private userConversationMap = new Map<string, string>();
    private useOnlines = new Map<string, boolean>();
    private loadedConversations = new Set<string>();
    // private processedMessages = new Map<string, Set<string>>();

    constructor(engine: MessengerEngine) {
        this.engine = engine;

        let provider: DataSourceStoredProvider<DialogDataSourceItemStored> = {
            loadMore: async (cursor?: string) => {
                let res = await this.engine.client.queryDialogs({ after: cursor }, { fetchPolicy: 'network-only' });
                // for (let c of res.dialogs.items) {
                //     if (c.kind === 'PRIVATE' && c.fid) {
                //         this.userConversationMap.set(c.fid, c.cid);
                //     }
                // }
                return {
                    items: res.dialogs.items.filter((v) => !!v.topMessage).map((v) => extractDialog(v, engine.user.id)),
                    cursor: res.dialogs.cursor ? res.dialogs.cursor : undefined,
                    state: res.state.state!!
                };
            },
            onStarted: (state: string) => {
                engine.global.handleDialogsStarted(state);

            }
        };
        this._dataSourceStored = new DataSourceStored('dialogs', engine.options.store, 20, provider);
        let typingsAugmentator = new DataSourceAugmentor<DialogDataSourceItemStored, { typing: string }>(this._dataSourceStored.dataSource);
        let onlineAugmentator = new DataSourceAugmentor<DialogDataSourceItemStored & { typing?: string }, { online: boolean }>(typingsAugmentator.dataSource);
        this.dataSource = onlineAugmentator.dataSource;

        this.dataSource.watch({
            onDataSourceInited: (items) => {
                for (let i of items) {
                    if (i.kind === 'PRIVATE') {
                        this.userConversationMap.set(i.flexibleId, i.key);
                        if (this.useOnlines.has(i.flexibleId)) {
                            onlineAugmentator.setAugmentation(i.flexibleId, { online: this.useOnlines.get(i.flexibleId)!! });
                        }
                        this.engine.getOnlines().onPrivateChatAppears(i.flexibleId);
                    }
                    this.loadedConversations.add(i.key);
                }
            },
            onDataSourceLoadedMore: (items) => {
                for (let i of items) {
                    if (i.kind === 'PRIVATE') {
                        this.userConversationMap.set(i.flexibleId, i.key);
                        if (this.useOnlines.has(i.flexibleId)) {
                            onlineAugmentator.setAugmentation(i.flexibleId, { online: this.useOnlines.get(i.flexibleId)!! });
                        }
                        this.engine.getOnlines().onPrivateChatAppears(i.flexibleId);
                    }
                    this.loadedConversations.add(i.key);
                }
            },
            onDataSourceLoadedMoreForward: (items) => {
                // Nothing to do
            },
            onDataSourceItemAdded: (item) => {
                if (item.kind === 'PRIVATE') {
                    this.userConversationMap.set(item.flexibleId, item.key);
                    if (this.useOnlines.has(item.flexibleId)) {
                        onlineAugmentator.setAugmentation(item.flexibleId, { online: this.useOnlines.get(item.flexibleId)!! });
                    }
                    this.engine.getOnlines().onPrivateChatAppears(item.flexibleId);

                }
                this.loadedConversations.add(item.key);
            },
            onDataSourceItemRemoved: (item) => {
                this.loadedConversations.delete(item.key);
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
        // let a = new DataSourceLogger('dialogs', this.dataSource);

        engine.getOnlines().onSingleChangeChange((user, online) => {
            let conversationId = this.userConversationMap.get(user);
            if (!conversationId) {
                return;
            }
            onlineAugmentator.setAugmentation(conversationId, { online });
        });

        engine.getTypings().subcribe((typing, users, _, conversationId) => {
            if (typing) {
                typingsAugmentator.setAugmentation(conversationId, { typing });
            } else {
                typingsAugmentator.removeAugmentation(conversationId);
            }
        });
    }

    handleStateProcessed = async (state: string) => {
        log.log('State Processed');
        await this._dataSourceStored.updateState(state);
    }

    handleUserRead = async (conversationId: string, unread: number, visible: boolean, haveMention: boolean) => {
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

    handleIsMuted = async (conversationId: string, isMuted: boolean) => {
        log.log('Is Muted: ' + isMuted);
        let res = await this._dataSourceStored.getItem(conversationId);
        if (res) {
            await this._dataSourceStored.updateItem({
                ...res,
                isMuted,
            });
        }
    }

    handleDialogDeleted = async (event: any) => {
        log.log('Dialog Deleted');
        const cid = event.cid as string;
        if (await this._dataSourceStored.hasItem(cid)) {
            await this._dataSourceStored.removeItem(cid);
        }
    }

    handleMessageUpdated = async (event: any) => {
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
                    attachments: event.message.attachments,
                    haveMention: event.haveMention
                });
            }
        }
    }

    handleMessageDeleted = async (cid: string, mid: string, prevMessage: TinyMessage | null, unread: number, haveMention: boolean, uid: string) => {
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

    handlePeerUpdated = async (cid: string, peer: DialogUpdateFragment_DialogPeerUpdated_peer) => {
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

    handleMuteUpdated = async (cid: string, mute: boolean) => {
        log.log('Mute Updated');
        let existing = await this._dataSourceStored.getItem(cid);
        if (existing) {
            await this._dataSourceStored.updateItem({
                ...existing,
                isMuted: mute,
            });
        }
    }

    handleChatNewMessage = async (event: ChatUpdateFragment_ChatMessageReceived, cid: string) => {
        // this.handleNewMessage({ message: event.message, cid, unread: 0, haveMention: false }, false, true);
    }

    handleNewMessage = async (event: any, visible: boolean) => {
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
                attachments: event.message.attachments,
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
                    attachments: event.message.attachments,
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
