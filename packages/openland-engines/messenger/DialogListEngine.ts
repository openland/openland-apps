import { MessengerEngine } from '../MessengerEngine';
import {
    Dialogs_dialogs_items,
    Dialogs_dialogs_items_topMessage,
    Room_room_SharedRoom,
    Room_room_PrivateRoom,
    RoomFull,
} from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { DialogsQuery, RoomQuery } from 'openland-api';
import { ConversationRepository } from './repositories/ConversationRepository';
import { DataSource } from 'openland-y-utils/DataSource';
import { emoji } from 'openland-web/utils/emoji';

export interface DialogDataSourceItem {
    key: string;
    flexibleId: string;
    title: string;
    kind: 'PRIVATE' | 'INTERNAL' | 'PUBLIC' | 'GROUP';
    photo?: string;
    unread: number;
    online?: boolean;
    typing?: string;
    isService?: string;
    isMuted?: boolean;
    haveMention?: boolean;
    messageId?: string;
    date?: number;
    message?: string;
    messageEmojified?: any;
    sender?: string;
    isOut?: boolean;
    fileMeta?: { isImage?: boolean };
}

export function formatMessage(
    message: Dialogs_dialogs_items_topMessage | any,
): string {
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
        sender: betaTopMessage
            ? betaTopMessage!!.sender.id === uid
                ? 'You'
                : betaTopMessage!!.sender.name
            : undefined,
        messageId: betaTopMessage ? betaTopMessage.id : undefined,
        date: betaTopMessage ? parseInt(betaTopMessage!!.date, 10) : undefined,
        messageEmojified: msg ? emoji(msg, 13) : undefined,
    };
};

export const extractDialogFRomRoom = (c: RoomFull, uid: string) =>
    ({
        key: c.id,
        flexibleId: c.id,
        kind: c.__typename === 'SharedRoom' ? c.kind : 'PRIVATE',
        title: c.__typename === 'SharedRoom' ? c.title : c.user.name,
        photo: c.__typename === 'SharedRoom' ? c.photo : c.user.photo,
        unread: 0,
    } as DialogDataSourceItem);

export class DialogListEngine {
    readonly engine: MessengerEngine;
    private dialogs: Dialogs_dialogs_items[] = [];
    readonly dataSource: DataSource<DialogDataSourceItem>;
    // private dataSourceLogger: DataSourceLogger<DialogDataSourceItem>;
    private next?: string;
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
                    typing:
                        typing &&
                        (res.kind === 'PRIVATE' ? 'typing...' : typing),
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
        for (let c of this.dialogs) {
            ConversationRepository.improveRoomResolving(
                this.engine.client,
                c.cid,
            );
        }

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

    handleUserRead = (
        conversationId: string,
        unread: number,
        visible: boolean,
    ) => {
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
        this.dataSource.removeItem(cid);
    };

    handleMessageUpdated = async (event: any) => {
        const conversationId = event.cid as string;
        let existing = this.dataSource.getItem(conversationId);
        if (existing) {
            if (existing.messageId === event.message.id) {
                this.dataSource.updateItem({
                    ...existing,
                    message: formatMessage(event.message),
                    fileMeta: event.message.fileMetadata,
                });
            }
        }
    };

    handleMessageDeleted = (cid: string, mid: string) => {
        let existing = this.dataSource.getItem(cid);
        if (existing && existing.messageId === mid) {
            this.dataSource.updateItem({
                ...existing,
                message: undefined,
                fileMeta: undefined,
                date: undefined,
            });
        }
    }

    handleTitleUpdated = (cid: string, title: string) => {
        let existing = this.dataSource.getItem(cid);
        if (existing) {
            this.dataSource.updateItem({
                ...existing,
                title: title
            });
        }
    }

    handleMuteUpdated = (cid: string, mute: boolean) => {
        let existing = this.dataSource.getItem(cid);
        if (existing) {
            this.dataSource.updateItem({
                ...existing,
                isMuted: mute
            });
        }
    }

    handleHaveMentionUpdated = (cid: string, haveMention: boolean) => {
        let existing = this.dataSource.getItem(cid);
        if (existing) {
            this.dataSource.updateItem({
                ...existing,
                haveMention: haveMention
            });
        }
    }

    handlePhotoUpdated = (cid: string, photo: string) => {
        let existing = this.dataSource.getItem(cid);
        if (existing) {
            this.dataSource.updateItem({
                ...existing,
                photo: photo
            });
        }
    }

    handleNewMessage = async (event: any, visible: boolean) => {
        const conversationId = event.cid as string;
        const unreadCount = event.unread as number;

        // Write message to datasource
        let res = this.dataSource.getItem(conversationId);
        let isOut = event.message.sender.id === this.engine.user.id;
        let sender = isOut ? 'You' : event.message.sender.name;
        if (res) {
            let msg = formatMessage(event.message);
            this.dataSource.updateItem({
                ...res,
                isService: event.message.isService,
                unread:
                    !visible || res.unread > unreadCount
                        ? unreadCount
                        : res.unread,
                isOut: isOut,
                sender: sender,
                messageId: event.message.id,
                message: msg,
                messageEmojified: msg
                    ? emoji(msg, 13)
                    : undefined,
                date: parseInt(event.message.date, 10),
                fileMeta: event.message.fileMetadata,
            });
            this.dataSource.moveItem(res.key, 0);
        } else {
            if (
                event.message.serviceMetadata &&
                event.message.serviceMetadata.__typename ===
                    'KickServiceMetadata'
            ) {
                return;
            }

            let info = await this.engine.client.query(RoomQuery, {
                id: conversationId,
            });

            let sharedRoom =
                info.data.room!.__typename === 'SharedRoom'
                    ? (info.data.room as Room_room_SharedRoom)
                    : null;
            let privateRoom =
                info.data.room!.__typename === 'PrivateRoom'
                    ? (info.data.room as Room_room_PrivateRoom)
                    : null;
            let room = (sharedRoom || privateRoom)!;

            let msg = formatMessage(event.message);

            this.dataSource.addItem(
                {
                    key: conversationId,
                    isService: event.message.isService,
                    isMuted: !!room.settings.mute,
                    haveMention: event.message.haveMention,
                    flexibleId: room.id,
                    kind: sharedRoom ? sharedRoom.kind : 'PRIVATE',
                    title: sharedRoom
                        ? sharedRoom.title
                        : privateRoom
                        ? privateRoom.user.name
                        : '',
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
                    messageEmojified: msg
                        ? emoji(msg, 13)
                        : undefined,
                    date: parseInt(event.message.date, 10),
                    fileMeta: event.message.fileMetadata,
                    online: privateRoom ? privateRoom.user.online : false,
                },
                0,
            );
        }
    };

    loadNext = async () => {
        if (!this.loading && this.next !== null) {
            this.loading = true;
            let start = Date.now();
            let res: any = await backoff(async () => {
                try {
                    return await backoff(async () => {
                        return await this.engine.client.client.query({
                            query: DialogsQuery.document,
                            variables: {
                                ...(this.next !== undefined
                                    ? { after: this.next }
                                    : {}),
                            },
                        });
                    });
                } catch (e) {
                    console.warn(e);
                    throw e;
                }
            });
            console.log('Dialogs loaded in ' + (Date.now() - start) + ' ms');

            this.next = res.data.dialogs.cursor;
            this.dialogs = [...this.dialogs, ...res.data.dialogs.items];
            this.dialogListCallback(this.dialogs.map(i => i.cid));

            // Write to datasource
            let converted = res.data.dialogs.items.map((c: any) =>
                extractDialog(c, this.engine.user.id),
            );
            this.dataSource.loadedMore(converted, !this.next);

            this.loading = false;
        }
    };
}
