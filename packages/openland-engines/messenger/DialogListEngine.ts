import { MessengerEngine } from '../MessengerEngine';
import { ConversationShort, Dialogs_dialogs, Dialogs_dialogs_items, Dialogs_dialogs_items_topMessage } from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { ChatListQuery, ChatInfoQuery } from 'openland-api';
import { ConversationRepository } from './repositories/ConversationRepository';
import { DataSource } from 'openland-y-utils/DataSource';
import { DataSourceLogger } from 'openland-y-utils/DataSourceLogger';

export interface DialogDataSourceItem {
    key: string;
    fid: string;
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

export function formatMessage(message: Dialogs_dialogs_items_topMessage): string {
    return message.text || '';
}

export const extractDialog = (c: Dialogs_dialogs_items, uid: string) => ({
    key: c.cid,
    fid: c.fid,
    kind: c.kind,
    title: c.title,
    photo: c.photo,
    unread: c.unreadCount,
    isOut: c.topMessage ? c.topMessage!!.sender.id === uid : undefined,
    sender: c.topMessage ? (c.topMessage!!.sender.id === uid ? 'You' : c.topMessage!!.sender.name) : undefined,
    message: c.topMessage ? formatMessage(c.topMessage) : undefined,
    messageId: c.topMessage ? c.topMessage.id : undefined,
    date: c.topMessage ? parseInt(c.topMessage!!.date, 10) : undefined,
    fileMeta: undefined,
    online: false,
});

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

    loadNext = async () => {
        if (!this.loading && this.next !== null) {
            this.loading = true;
            let start = Date.now();
            let initialDialogs: any = await backoff(async () => {
                try {
                    return await this.engine.client.client.query({
                        query: ChatListQuery.document,
                        variables: {
                            ...this.next !== undefined ? { after: this.next } : {}
                        }
                    });
                } catch (e) {
                    console.warn(e);
                    throw e;
                }
            });
            console.log('Dialogs loaded in ' + (Date.now() - start) + ' ms');

            this.next = initialDialogs.data.chats.next;
            this.dialogListCallback(this.dialogs.map(i => i.id));

            // Write to datasource
            let converted = initialDialogs.data.chats.conversations.map((c: any) => ({
                key: c.id,
                flexibleId: c.flexibleId,
                type: c.__typename,
                title: c.title,
                photo: (c as any).photo || (c.photos.length > 0 ? c.photos[0] : undefined),
                unread: c.unreadCount,
                isOut: c.topMessage ? c.topMessage!!.sender.id === this.engine.user.id : undefined,
                sender: c.topMessage ? (c.topMessage!!.sender.id === this.engine.user.id ? 'You' : c.topMessage!!.sender.name) : undefined,
                message: c.topMessage ? formatMessage(c.topMessage) : undefined,
                messageId: c.topMessage ? formatMessage(c.topMessage.id) : undefined,
                date: c.topMessage ? parseInt(c.topMessage!!.date, 10) : undefined,
                fileMeta: c.topMessage ? c.topMessage.fileMetadata : undefined,
                online: false,
            }));
            this.dataSource.loadedMore(converted, !this.next);

            this.loading = false;
        }
    }
}