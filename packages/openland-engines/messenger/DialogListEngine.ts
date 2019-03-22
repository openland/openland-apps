import { MessengerEngine } from '../MessengerEngine';
import {
    Dialogs_dialogs_items,
    Dialogs_dialogs_items_topMessage,
    Room_room_SharedRoom,
    Room_room_PrivateRoom,
    RoomFull,
    Dialogs_dialogs_items_topMessage_GeneralMessage_attachments,
    TinyMessage,
} from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { DialogsQuery, RoomQuery } from 'openland-api';
import { DataSource } from 'openland-y-utils/DataSource';
import { emoji } from 'openland-y-utils/emoji';

export const emojifyMessage = (msg: string) => {
    return emoji({
        src: msg,
        size: 14,
    });
};
export interface DialogDataSourceItem {
    key: string;
    flexibleId: string;

    title: string;
    kind: 'PRIVATE' | 'INTERNAL' | 'PUBLIC' | 'GROUP';
    photo?: string;

    isOrganization?: boolean;

    unread: number;
    online?: boolean;
    typing?: string;
    isMuted?: boolean;
    haveMention?: boolean;

    date?: number;
    forward?: boolean;
    messageId?: string;
    message?: string;
    fallback: string
    messageEmojified?: any;
    isService?: boolean;
    sender?: string;
    isOut?: boolean;
    attachments?: Dialogs_dialogs_items_topMessage_GeneralMessage_attachments[];
    showSenderName?: boolean;
}

export function formatMessage(message: Dialogs_dialogs_items_topMessage | null): string {
    if (!message) {
        return '';
    }
    let res = message.fallback;
    if (message.message) {
        res = message.message;
    } else if (message.__typename === "GeneralMessage") {

        if (message.quotedMessages.length) {
            res = 'Forward'
        }
        // attchments
        if (message.attachments && message.attachments.length === 1) {
            let attachment = message.attachments[0];
            res = attachment.fallback;
            if (attachment.__typename === 'MessageAttachmentFile') {
                if (attachment.fileMetadata.isImage) {
                    if (attachment.fileMetadata.imageFormat === 'GIF') {
                        res = 'GIF';
                    } else {
                        res = 'Photo';
                    }
                } else {
                    res = 'Document';
                }
            }
        }

    }

    return res;
}

export const extractDialog = (
    {
        cid,
        fid,
        kind,
        title,
        photo,
        unreadCount,
        topMessage,
        isMuted,
        haveMention,
    }: Dialogs_dialogs_items,
    uid: string,
): DialogDataSourceItem => {
    let msg = formatMessage(topMessage);
    let isOut = topMessage ? topMessage!!.sender.id === uid : undefined;
    let sender = topMessage
        ? topMessage!!.sender.id === uid
            ? 'You'
            : topMessage!!.sender.firstName
        : undefined;
    let isService = (topMessage && topMessage.__typename === 'ServiceMessage') || undefined;
    return {
        online: undefined,
        haveMention,
        isMuted,
        kind,
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
        messageEmojified: msg ? emojifyMessage(msg) : undefined,
        isService,
        showSenderName: !!(msg && (isOut || kind !== 'PRIVATE') && sender) && !isService,
    };
};

export class DialogListEngine {
    readonly engine: MessengerEngine;
    private dialogs: Dialogs_dialogs_items[] = [];
    readonly dataSource: DataSource<DialogDataSourceItem>;
    // private dataSourceLogger: DataSourceLogger<DialogDataSourceItem>;
    private next?: string | null;
    private loading: boolean = true;
    private dialogListCallback: (convs: string[]) => void;
    private userConversationMap = new Map<string, string>();

    constructor(engine: MessengerEngine, cb: (convs: string[]) => void) {
        this.engine = engine;
        this.dialogListCallback = cb;

        engine.getOnlines().onSingleChangeChange((user, online) => {
            let conversationId = this.userConversationMap.get(user);
            if (!conversationId) {
                return;
            }
            let res = this.dataSource.getItem(conversationId);
            if (res && res.online !== online) {
                this.dataSource.updateItem({
                    ...res,
                    online: online,
                });
            }
        });

        engine.getTypings().subcribe((typing, users, conversationId) => {
            let res = this.dataSource.getItem(conversationId);
            if (res && res.typing !== typing) {
                this.dataSource.updateItem({
                    ...res,
                    typing: typing && (res.kind === 'PRIVATE' ? 'typing...' : typing),
                });
            }
        });

        this.dataSource = new DataSource<DialogDataSourceItem>(() => {
            this.loadNext();
        });
        // this.dataSourceLogger = new DataSourceLogger<DialogDataSourceItem>('[DIALOGS]', this.dataSource);
    }

    //
    // Update Handlers
    //

    handleInitialDialogs = (dialogs: any[], next: string) => {
        this.dialogs = dialogs;

        this.dialogListCallback(this.dialogs.map(i => i.cid));

        // Improve conversation resolving
        // for (let c of this.dialogs) {
        //     ConversationRepository.improveRoomResolving(
        //         this.engine.client,
        //         c.cid,
        //     );
        // }

        // Update data source
        this.dataSource.initialize(
            this.dialogs.map(c => {
                if (c.kind === 'PRIVATE' && c.fid) {
                    this.userConversationMap.set(c.fid, c.cid);
                }
                return extractDialog(c, this.engine.user.id);
            }),
            next === null,
        );

        // Start engine
        this.loading = false;
        this.next = next;
    };

    handleUserRead = (conversationId: string, unread: number, visible: boolean) => {
        // Write counter to datasource
        let res = this.dataSource.getItem(conversationId);
        if (res) {
            this.dataSource.updateItem({
                ...res,
                unread: unread,
            });
        }
    };

    handleIsMuted = (conversationId: string, isMuted: boolean) => {
        let res = this.dataSource.getItem(conversationId);
        if (res) {
            this.dataSource.updateItem({
                ...res,
                isMuted,
            });
        }
    };

    handleDialogDeleted = async (event: any) => {
        const cid = event.cid as string;
        if (this.dataSource.hasItem(cid)) {
            this.dataSource.removeItem(cid);
        }
    };

    handleMessageUpdated = async (event: any) => {
        const conversationId = event.cid as string;
        let existing = this.dataSource.getItem(conversationId);

        if (existing) {
            if (existing.messageId === event.message.id) {
                const message = formatMessage(event.message);

                this.dataSource.updateItem({
                    ...existing,
                    message,
                    messageEmojified: message ? emojifyMessage(message) : undefined,
                    attachments: event.message.attachments,
                });
            }
        }
    };

    handleMessageDeleted = async (cid: string, mid: string, prevMessage: TinyMessage) => {
        let existing = this.dataSource.getItem(cid);

        if (existing && existing.messageId === mid) {
            const message = prevMessage && prevMessage.message ? prevMessage.message : undefined;
            this.dataSource.updateItem({
                ...existing,
                message,
                messageEmojified: message ? emojifyMessage(message) : undefined,
                attachments: prevMessage && prevMessage.__typename === 'GeneralMessage' ? prevMessage.attachments : undefined,
                date: prevMessage ? prevMessage.date : undefined,
                ...(prevMessage && prevMessage.id ? { messageId: prevMessage.id } : {})
            });
        }
    };

    handleTitleUpdated = (cid: string, title: string) => {
        let existing = this.dataSource.getItem(cid);
        if (existing) {
            this.dataSource.updateItem({
                ...existing,
                title: title,
            });
        }
    };

    handleMuteUpdated = (cid: string, mute: boolean) => {
        let existing = this.dataSource.getItem(cid);
        if (existing) {
            this.dataSource.updateItem({
                ...existing,
                isMuted: mute,
            });
        }
    };

    handleHaveMentionUpdated = (cid: string, haveMention: boolean) => {
        let existing = this.dataSource.getItem(cid);
        if (existing) {
            this.dataSource.updateItem({
                ...existing,
                haveMention: haveMention,
            });
        }
    };

    handlePhotoUpdated = (cid: string, photo: string) => {
        let existing = this.dataSource.getItem(cid);
        if (existing) {
            this.dataSource.updateItem({
                ...existing,
                photo: photo,
            });
        }
    };

    handleNewMessage = async (event: any, visible: boolean) => {
        const conversationId = event.cid as string;
        const unreadCount = event.unread as number;

        // Write message to datasource
        let res = this.dataSource.getItem(conversationId);
        let isOut = event.message.sender.id === this.engine.user.id;
        let sender = isOut ? 'You' : event.message.sender.firstName;
        let isService = event.message.__typename === 'ServiceMessage';
        if (res) {
            let msg = formatMessage(event.message);
            this.dataSource.updateItem({
                ...res,
                isService,
                unread: !visible || res.unread > unreadCount ? unreadCount : res.unread,
                isOut: isOut,
                sender: sender,
                messageId: event.message.id,
                message: event.message && event.message.message ? msg : undefined,
                fallback: msg,
                messageEmojified: msg ? emojifyMessage(msg) : undefined,
                date: parseInt(event.message.date, 10),
                attachments: event.message.attachments,
                forward: !event.message.message && event.message.quotedMessages && event.message.quotedMessages.length,
                showSenderName:
                    !!(msg && (isOut || res.kind !== 'PRIVATE') && sender) &&
                    !isService,
            });
            this.dataSource.moveItem(res.key, 0);
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

            this.dataSource.addItem(
                {
                    key: conversationId,
                    isService,
                    isMuted: !!room.settings.mute,
                    haveMention: event.message.haveMention,
                    flexibleId: privateRoom ? privateRoom.user.id : room.id,
                    kind: sharedRoom ? sharedRoom.kind : 'PRIVATE',
                    title: sharedRoom ? sharedRoom.title : privateRoom ? privateRoom.user.name : '',
                    photo:
                        (sharedRoom
                            ? sharedRoom.photo
                            : privateRoom
                                ? privateRoom.user.picture
                                : undefined) || undefined,
                    unread: unreadCount,
                    isOut: isOut,
                    sender: sender,
                    messageId: event.message.id,
                    message: event.message && event.message.message ? msg : undefined,
                    fallback: msg,
                    messageEmojified: msg ? emojifyMessage(msg) : undefined,
                    date: parseInt(event.message.date, 10),
                    forward: event.message.quotedMessages && !!event.message.quotedMessages.length,
                    attachments: event.message.attachments,
                    online: privateRoom ? privateRoom.user.online : false,
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

    loadNext = async () => {
        if (!this.loading && this.next !== null) {
            this.loading = true;
            let start = Date.now();
            let res = await backoff(async () => {
                try {
                    return await backoff(async () => {
                        return await this.engine.client.client.query(DialogsQuery, {
                            ...(this.next !== undefined ? { after: this.next } : {}),
                        });
                    });
                } catch (e) {
                    console.warn(e);
                    throw e;
                }
            });
            console.log('Dialogs loaded in ' + (Date.now() - start) + ' ms');

            this.next = res.dialogs.cursor;
            this.dialogs = [...this.dialogs, ...res.dialogs.items];

            res.dialogs.items.map(c => {
                if (c.kind === 'PRIVATE' && c.fid) {
                    this.userConversationMap.set(c.fid, c.cid);
                }
            });

            this.dialogListCallback(this.dialogs.map(i => i.cid));

            // Write to datasource
            let converted = res.dialogs.items.map((c: any) =>
                extractDialog(c, this.engine.user.id),
            );

            this.dataSource.loadedMore(converted, !this.next);

            this.loading = false;
        }
    };
}
