import { MessengerEngine } from '../MessengerEngine';
import {
    Dialogs_dialogs_items,
    Dialogs_dialogs_items_topMessage,
    Room_room_SharedRoom,
    Room_room_PrivateRoom,
    Dialogs_dialogs_items_topMessage_GeneralMessage_attachments,
    TinyMessage,
    DialogKind,
    Message_message,
} from 'openland-api/Types';
import { RoomQuery } from 'openland-api';
import { DataSource } from 'openland-y-utils/DataSource';
import { createLogger } from 'mental-log';
import { DataSourceStored, DataSourceStoredProvider } from 'openland-y-utils/DataSourceStored';
import { DataSourceAugmentor } from 'openland-y-utils/DataSourceAugmentor';
import { DataSourceLogger } from 'openland-y-utils/DataSourceLogger';

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
    fallback: string
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

export function formatMessage(message: Dialogs_dialogs_items_topMessage | Message_message | null): string {
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
    private dialogs: Dialogs_dialogs_items[] = [];
    readonly _dataSourceStored: DataSourceStored<DialogDataSourceItemStored>;
    readonly dataSource: DataSource<DialogDataSourceItem>;
    private userConversationMap = new Map<string, string>();
    private useOnlines = new Map<string, boolean>();
    private loadedConversations = new Set<string>();
    private dialogListCallback: (convs: string[]) => void;

    constructor(engine: MessengerEngine, cb: (convs: string[]) => void) {
        this.engine = engine;
        this.dialogListCallback = cb;

        let provider: DataSourceStoredProvider<DialogDataSourceItemStored> = {
            loadMore: async (cursor?: string) => {
                let res = await this.engine.client.queryDialogs({ after: cursor });
                // for (let c of res.dialogs.items) {
                //     if (c.kind === 'PRIVATE' && c.fid) {
                //         this.userConversationMap.set(c.fid, c.cid);
                //     }
                // }
                return {
                    items: res.dialogs.items.map((v) => extractDialog(v, engine.user.id)),
                    cursor: res.dialogs.cursor ? res.dialogs.cursor : undefined,
                    state: res.state.state!!
                }
            },
            onStarted: (state: string) => {
                engine.global.handleDialogsStarted(state);
            }
        }
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
                            onlineAugmentator.setAugmentation(i.flexibleId, { online: this.useOnlines.get(i.flexibleId)!! })
                        }
                    }
                    this.loadedConversations.add(i.key);
                }
                this.dialogListCallback(Array.from(this.loadedConversations))
            },
            onDataSourceLoadedMore: (items) => {
                for (let i of items) {
                    if (i.kind === 'PRIVATE') {
                        this.userConversationMap.set(i.flexibleId, i.key);
                        if (this.useOnlines.has(i.flexibleId)) {
                            onlineAugmentator.setAugmentation(i.flexibleId, { online: this.useOnlines.get(i.flexibleId)!! })
                        }
                    }
                    this.loadedConversations.add(i.key);
                }
                this.dialogListCallback(Array.from(this.loadedConversations))
            },
            onDataSourceItemAdded: (item) => {
                if (item.kind === 'PRIVATE') {
                    this.userConversationMap.set(item.flexibleId, item.key);
                    if (this.useOnlines.has(item.flexibleId)) {
                        onlineAugmentator.setAugmentation(item.flexibleId, { online: this.useOnlines.get(item.flexibleId)!! })
                    }
                }
                this.loadedConversations.add(item.key);
                this.dialogListCallback(Array.from(this.loadedConversations))
            },
            onDataSourceItemRemoved: (item) => {
                this.loadedConversations.delete(item.key);
                this.dialogListCallback(Array.from(this.loadedConversations))
            },
            onDataSourceItemMoved: () => {
                // Nothing to do
            },
            onDataSourceItemUpdated: () => {
                // Nothing to do
            },
            onDataSourceCompleted: () => {
                // Nothing to do
            }
        });
        // let a = new DataSourceLogger('dialogs', this.dataSource);

        engine.getOnlines().onSingleChangeChange((user, online) => {
            let conversationId = this.userConversationMap.get(user);
            if (!conversationId) {
                return;
            }
            onlineAugmentator.setAugmentation(conversationId, { online })
        });

        engine.getTypings().subcribe((typing, users, conversationId) => {
            if (typing) {
                typingsAugmentator.setAugmentation(conversationId, { typing });
            } else {
                typingsAugmentator.removeAugmentation(conversationId);
            }
        });
    }

    handleStateProcessed = async (state: string) => {
        await this._dataSourceStored.updateState(state);
    }

    handleUserRead = async (conversationId: string, unread: number, visible: boolean) => {
        // Write counter to datasource
        let res = await this._dataSourceStored.getItem(conversationId);
        if (res) {
            await this._dataSourceStored.updateItem({
                ...res,
                unread: unread,
            });
        }
    };

    handleIsMuted = async (conversationId: string, isMuted: boolean) => {
        let res = await this._dataSourceStored.getItem(conversationId);
        if (res) {
            await this._dataSourceStored.updateItem({
                ...res,
                isMuted,
            });
        }
    };

    handleDialogDeleted = async (event: any) => {
        const cid = event.cid as string;
        if (await this._dataSourceStored.hasItem(cid)) {
            await this._dataSourceStored.removeItem(cid);
        }
    };

    handleMessageUpdated = async (event: any) => {
        const conversationId = event.cid as string;
        let existing = await this._dataSourceStored.getItem(conversationId);

        if (existing) {
            if (existing.messageId === event.message.id) {
                const message = formatMessage(event.message);

                await this._dataSourceStored.updateItem({
                    ...existing,
                    message,
                    fallback: message,
                    attachments: event.message.attachments,
                });
            }
        }
    };

    handleMessageDeleted = async (cid: string, mid: string, prevMessage: TinyMessage, unread: number, haveMention: boolean, uid: string) => {
        let existing = await this._dataSourceStored.getItem(cid);

        if (existing && existing.messageId === mid) {
            await this._dataSourceStored.updateItem(extractDialog({
                cid: cid, fid: existing.flexibleId, kind: existing.kind as DialogKind, isChannel: !!existing.isChannel, title: existing.title, photo: existing.photo || '', unreadCount: unread, topMessage: prevMessage, isMuted: !!existing.isMuted, haveMention: haveMention, __typename: "Dialog"
            }, uid));
        }
    };

    handleTitleUpdated = async (cid: string, title: string) => {
        let existing = await this._dataSourceStored.getItem(cid);
        if (existing) {
            await this._dataSourceStored.updateItem({
                ...existing,
                title: title,
            });
        }
    };

    handleMuteUpdated = async (cid: string, mute: boolean) => {
        let existing = await this._dataSourceStored.getItem(cid);
        if (existing) {
            await this._dataSourceStored.updateItem({
                ...existing,
                isMuted: mute,
            });
        }
    };

    handleHaveMentionUpdated = async (cid: string, haveMention: boolean) => {
        let existing = await this._dataSourceStored.getItem(cid);
        if (existing) {
            await this._dataSourceStored.updateItem({
                ...existing,
                haveMention: haveMention,
            });
        }
    };

    handlePhotoUpdated = async (cid: string, photo: string) => {
        let existing = await this._dataSourceStored.getItem(cid);
        if (existing) {
            await this._dataSourceStored.updateItem({
                ...existing,
                photo: photo,
            });
        }
    };

    handleNewMessage = async (event: any, visible: boolean) => {
        const conversationId = event.cid as string;
        const unreadCount = event.unread as number;

        let res = await this._dataSourceStored.getItem(conversationId);
        let isOut = event.message.sender.id === this.engine.user.id;
        let sender = isOut ? 'You' : event.message.sender.firstName;
        let isService = event.message.__typename === 'ServiceMessage';
        if (res) {
            let msg = formatMessage(event.message);
            await this._dataSourceStored.updateItem({
                ...res,
                isService,
                unread: !visible || res.unread > unreadCount ? unreadCount : res.unread,
                isOut: isOut,
                sender: sender,
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
            await this._dataSourceStored.moveItem(res.key, 0);
        } else {
            if (
                event.message.serviceMetadata &&
                event.message.serviceMetadata.__typename === 'KickServiceMetadata'
            ) {
                return;
            }

            let info = await this.engine.client.client.query(RoomQuery, {
                id: conversationId,
            });

            let sharedRoom =
                info.room!.__typename === 'SharedRoom' ? (info.room as Room_room_SharedRoom) : null;
            let privateRoom =
                info.room!.__typename === 'PrivateRoom'
                    ? (info.room as Room_room_PrivateRoom)
                    : null;
            let room = (sharedRoom || privateRoom)!;

            let msg = formatMessage(event.message);

            if (privateRoom) {
                this.userConversationMap.set(privateRoom!.user.id, privateRoom.id);
            }

            await this._dataSourceStored.addItem(
                {
                    key: conversationId,
                    isService,
                    isMuted: !!room.settings.mute,
                    haveMention: event.message.haveMention,
                    flexibleId: privateRoom ? privateRoom.user.id : room.id,
                    kind: sharedRoom ? sharedRoom.kind : 'PRIVATE',
                    isChannel: sharedRoom ? sharedRoom.isChannel : false,
                    title: sharedRoom ? sharedRoom.title : privateRoom ? privateRoom.user.name : '',
                    photo:
                        (sharedRoom
                            ? sharedRoom.photo
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
                0,
            );
        }
    };
}
