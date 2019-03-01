import { MessengerEngine } from '../MessengerEngine';
import {
    Dialogs_dialogs_items,
    Dialogs_dialogs_items_topMessage,
    Room_room_SharedRoom,
    Room_room_PrivateRoom,
    RoomMessageShort,
    RoomFull,
} from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { DialogsQuery, RoomQuery, RoomHistoryQuery } from 'openland-api';
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

    unread: number;
    online?: boolean;
    typing?: string;
    isMuted?: boolean;
    haveMention?: boolean;

    date?: number;
    messageId?: string;
    message?: string;
    messageEmojified?: any;
    isService?: boolean;
    sender?: string;
    isOut?: boolean;
    fileMeta?: { isImage?: boolean };
    showSenderName?: boolean;
}

export function formatMessage(message: Dialogs_dialogs_items_topMessage | any): string {
    if (!message) {
        return '';
    }
    if (message.__typename === 'Message') {
        return message.text || '';
    }
    if (message.message) {
        return message.message;
    } else if (message.file) {
        if (message.fileMetadata) {
            if (message.fileMetadata.isImage) {
                if (message.fileMetadata.imageFormat === 'GIF') {
                    return 'GIF';
                } else {
                    return 'Photo';
                }
            } else {
                return message.fileMetadata.name;
            }
        } else {
            return 'Document';
        }
    } else {
        return '';
    }
}

export const extractDialog = (
    {
        cid,
        fid,
        kind,
        title,
        photo,
        unreadCount,
        betaTopMessage,
        isMuted,
        haveMention,
    }: Dialogs_dialogs_items,
    uid: string,
): DialogDataSourceItem => {
    let msg = formatMessage(betaTopMessage);
    let isOut = betaTopMessage ? betaTopMessage!!.sender.id === uid : undefined;
    let sender = betaTopMessage
        ? betaTopMessage!!.sender.id === uid
            ? 'You'
            : betaTopMessage!!.sender.firstName
        : undefined;
    let isService = (betaTopMessage && betaTopMessage.isService) || undefined;
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
        message: msg,
        fileMeta: betaTopMessage ? betaTopMessage.fileMetadata || undefined : undefined,
        isOut: betaTopMessage ? betaTopMessage!!.sender.id === uid : undefined,
        sender: sender,
        messageId: betaTopMessage ? betaTopMessage.id : undefined,
        date: betaTopMessage ? parseInt(betaTopMessage!!.date, 10) : undefined,
        messageEmojified: msg ? emojifyMessage(msg) : undefined,
        isService: isService,
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
                    fileMeta: event.message.fileMetadata,
                });
            }
        }
    };

    handleMessageDeleted = async (cid: string, mid: string, prevMessage: RoomMessageShort) => {
        let existing = this.dataSource.getItem(cid);

        if (existing && existing.messageId === mid) {
            const message = prevMessage && prevMessage.message ? prevMessage.message : undefined;
            this.dataSource.updateItem({
                ...existing,
                message,
                messageEmojified: message ? emojifyMessage(message) : undefined,
                fileMeta: prevMessage && prevMessage.fileMetadata ? { isImage: prevMessage.fileMetadata ? prevMessage.fileMetadata.isImage : undefined } : undefined,
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
        if (res) {
            let msg = formatMessage(event.message);
            this.dataSource.updateItem({
                ...res,
                isService: event.message.isService,
                unread: !visible || res.unread > unreadCount ? unreadCount : res.unread,
                isOut: isOut,
                sender: sender,
                messageId: event.message.id,
                message: msg,
                messageEmojified: msg ? emojifyMessage(msg) : undefined,
                date: parseInt(event.message.date, 10),
                fileMeta: event.message.fileMetadata,
                showSenderName:
                    !!(msg && (isOut || res.kind !== 'PRIVATE') && sender) &&
                    !event.message.isService,
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
                    isService: event.message.isService,
                    isMuted: !!room.settings.mute,
                    haveMention: event.message.haveMention,
                    flexibleId: privateRoom ? privateRoom.user.id : room.id,
                    kind: sharedRoom ? sharedRoom.kind : 'PRIVATE',
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
                    message: msg,
                    messageEmojified: msg ? emojifyMessage(msg) : undefined,
                    date: parseInt(event.message.date, 10),
                    fileMeta: event.message.fileMetadata,
                    online: privateRoom ? privateRoom.user.online : false,
                    showSenderName:
                        !!(
                            msg &&
                            (isOut || (sharedRoom ? sharedRoom.kind : 'PRIVATE') !== 'PRIVATE') &&
                            sender
                        ) && !event.message.isService,
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
