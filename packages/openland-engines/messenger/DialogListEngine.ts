import { MessengerEngine } from '../MessengerEngine';
import { Dialogs_dialogs_items, Dialogs_dialogs_items_topMessage, Room_room_SharedRoom, Room_room_PrivateRoom, RoomFull } from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { DialogsQuery, RoomQuery } from 'openland-api';
import { ConversationRepository } from './repositories/ConversationRepository';
import { DataSource } from 'openland-y-utils/DataSource';

export interface DialogDataSourceItem {
    key: string;
    flexibleId: string;
    title: string;
    kind: 'PRIVATE' | 'INTERNAL' | 'PUBLIC' | 'GROUP';
    photo?: string;
    unread: number;
    online?: boolean;
    typing?: string;

    messageId?: string;
    date?: number;
    message?: string;
    sender?: string;
    isOut?: boolean;
    fileMeta?: { isImage?: boolean };
}

export function formatMessage(message: Dialogs_dialogs_items_topMessage | any): string {
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

export const extractDialog = (c: Dialogs_dialogs_items, uid: string) => ({
    key: c.cid,
    flexibleId: c.fid,
    kind: c.kind,
    title: c.title,
    photo: c.photo,
    unread: c.unreadCount,
    isOut: c.topMessage ? c.topMessage!!.sender.id === uid : undefined,
    sender: c.topMessage ? (c.topMessage!!.sender.id === uid ? 'You' : c.topMessage!!.sender.name) : undefined,
    message: formatMessage(c.betaTopMessage),
    messageId: c.topMessage ? c.topMessage.id : undefined,
    date: c.topMessage ? parseInt(c.topMessage!!.date, 10) : undefined,
    fileMeta: c.betaTopMessage ? c.betaTopMessage.fileMetadata || undefined : undefined,
    online: undefined,
});

export const extractDialogFRomRoom = (c: RoomFull, uid: string) => ({
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
                    online: online
                });
            }
        });

        engine.getTypings().subcribe((typing, users, conversationId) => {
            let res = this.dataSource.getItem(conversationId);
            if (res && res.typing !== typing) {
                this.dataSource.updateItem({
                    ...res,
                    typing: typing && (res.kind === 'PRIVATE' ? 'typing...' : typing)
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
            ConversationRepository.improveRoomResolving(this.engine.client, c.cid);
        }

        // Update data source
        this.dataSource.initialize(
            this.dialogs.map(c => {
                if (c.kind === 'PRIVATE' && c.fid) {
                    this.userConversationMap.set(c.fid, c.cid);
                }
                return extractDialog(c, this.engine.user.id);
            }),
            next === null);

        // Start engine
        this.loading = false;
        this.next = next;
    }

    handleUserRead = (conversationId: string, unread: number, visible: boolean) => {

        // Write counter to datasource
        let res = this.dataSource.getItem(conversationId);
        if (res) {
            this.dataSource.updateItem({
                ...res,
                unread: unread
            });
        }
    }

    handleDialogDeleted = async (event: any) => {
        const cid = event.cid as string;
        this.dataSource.removeItem(cid);
    }

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
    }

    handleNewMessage = async (event: any, visible: boolean) => {
        console.log(event);
        const conversationId = event.cid as string;
        const unreadCount = event.unread as number;

        // Write message to datasource
        let res = this.dataSource.getItem(conversationId);
        let isOut = event.message.sender.id === this.engine.user.id;
        let sender = isOut ? 'You' : event.message.sender.name;
        if (res) {
            this.dataSource.updateItem({
                ...res,
                unread: (!visible || res.unread > unreadCount) ? unreadCount : res.unread,
                isOut: isOut,
                sender: sender,
                messageId: event.message.id,
                message: formatMessage(event.message),
                date: parseInt(event.message.date, 10),
                fileMeta: event.message.fileMetadata,
            });
            this.dataSource.moveItem(res.key, 0);
        } else {
            if (event.message.serviceMetadata && event.message.serviceMetadata.__typename === 'KickServiceMetadata') {
                return;
            }

            let info = await this.engine.client.query(RoomQuery, { id: conversationId });

            let sharedRoom = info.data.room!.__typename === 'SharedRoom' ? info.data.room as Room_room_SharedRoom : null;
            let privateRoom = info.data.room!.__typename === 'PrivateRoom' ? info.data.room as Room_room_PrivateRoom : null;
            let room = (sharedRoom || privateRoom)!;

            this.dataSource.addItem(
                {
                    key: conversationId,
                    flexibleId: room.id,
                    kind: sharedRoom ? sharedRoom.kind : 'PRIVATE',
                    title: sharedRoom ? sharedRoom.title : privateRoom ? privateRoom.user.name : '',
                    photo: (sharedRoom ? sharedRoom.photo : privateRoom ? privateRoom.user.photo : undefined) || undefined,
                    unread: unreadCount,
                    isOut: isOut,
                    sender: sender,
                    messageId: event.message.id,
                    message: formatMessage(event.message),
                    date: parseInt(event.message.date, 10),
                    fileMeta: event.message.fileMetadata,
                    online: privateRoom ? privateRoom.user.online : false,
                },
                0);
        }
    }

    loadNext = async () => {
        if (!this.loading && this.next !== null) {
            this.loading = true;
            let start = Date.now();
            let res: any = await backoff(async () => {
                try {
                    return (await backoff(async () => {
                        return await this.engine.client.client.query({
                            query: DialogsQuery.document,
                            variables: {
                                ...this.next !== undefined ? { after: this.next } : {}
                            }
                        });
                    }));
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
            let converted = res.data.dialogs.items.map((c: any) => extractDialog(c, this.engine.user.id));
            this.dataSource.loadedMore(converted, !this.next);

            this.loading = false;
        }
    }
}