import { MessengerEngine } from '../MessengerEngine';
import { ConversationShort } from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { ChatListQuery } from 'openland-api';
import { ConversationRepository } from './repositories/ConversationRepository';
import { DataSource } from 'openland-y-utils/DataSource';
import { DataSourceLogger } from 'openland-y-utils/DataSourceLogger';

export interface DialogDataSourceItem {
    key: string;
    title: string;
    type: string;
    photo?: string;
    unread: number;

    date?: number;
    message?: string;
    sender?: string;
    isOut?: boolean;
}

export function formatMessage(message: any): string {
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

export const extractDialog = (c: any, uid: string) => (
    {
        key: c.id,
        type: c.__typename,
        title: c.title,
        photo: (c as any).photo || (c.photos.length > 0 ? c.photos[0] : undefined),
        unread: c.unreadCount,
        isOut: c.topMessage ? c.topMessage!!.sender.id === uid : undefined,
        sender: c.topMessage ? (c.topMessage!!.sender.id === uid ? 'You' : c.topMessage!!.sender.name) : undefined,
        message: c.topMessage ? formatMessage(c.topMessage) : undefined,
        date: c.topMessage ? parseInt(c.topMessage!!.date, 10) : undefined
    }
);

export class DialogListEngine {

    readonly engine: MessengerEngine;
    private conversations: ConversationShort[] = [];
    readonly dataSource: DataSource<DialogDataSourceItem>;
    // private dataSourceLogger: DataSourceLogger<DialogDataSourceItem>;
    private next?: string;
    private loading: boolean = true;
    private dialogListCallback: (convs: string[]) => void;

    constructor(engine: MessengerEngine, cb: (convs: string[]) => void) {
        this.engine = engine;
        this.dialogListCallback = cb;

        this.dataSource = new DataSource<DialogDataSourceItem>(() => {
            this.loadNext();
        });
        // this.dataSourceLogger = new DataSourceLogger<DialogDataSourceItem>('[DIALOGS]', this.dataSource);
    }

    //
    // Update Handlers
    //

    handleInitialConversations = (conversations: any[], next: string) => {

        this.conversations = conversations;

        this.dialogListCallback(this.conversations.map(i => i.id));

        // Improve conversation resolving
        for (let c of this.conversations) {
            ConversationRepository.improveConversationResolving(this.engine.client, c.id);
        }

        // Update data source
        this.dataSource.initialize(
            this.conversations.map(c => extractDialog(c, this.engine.user.id)),
            next === null);

        // Start engine
        this.loading = false;
        this.next = next;
    }

    handleUserRead = (conversationId: string, unread: number, visible: boolean) => {
        ConversationRepository.writeConversationCounter(this.engine.client, conversationId, unread, visible);

        // Write counter to datasource
        let res = this.dataSource.getItem(conversationId);
        if (res) {
            this.dataSource.updateItem({
                ...res,
                unread: unread
            });
        }
    }

    handleNewMessage = (event: any, visible: boolean) => {
        const conversation = event.conversation;
        const conversationId = event.conversationId as string;
        const messageId = event.message.id as string;
        const unreadCount = event.unread as number;

        // Improve resolving for faster chat switch via flexibleId
        ConversationRepository.improveConversationResolving(this.engine.client, conversationId);

        // Write Message to Repository
        ConversationRepository.writeNewMessage(this.engine.client, conversationId, messageId, unreadCount, visible);

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
                message: formatMessage(event.message),
                date: parseInt(event.message.date, 10)
            });
            this.dataSource.moveItem(res.key, 0);
        } else {
            this.dataSource.addItem(
                {
                    key: conversationId,
                    type: conversation.__typename,
                    title: conversation.title,
                    photo: (conversation as any).photo || (conversation.photos.length > 0 ? conversation.photos[0] : undefined),
                    unread: unreadCount,
                    isOut: isOut,
                    sender: sender,
                    message: formatMessage(event.message),
                    date: parseInt(event.message.date, 10)
                },
                0);
        }
    }

    loadNext = async () => {
        if (!this.loading && this.next !== null) {
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

            // Write to storage
            this.conversations = [...this.conversations, ...initialDialogs.data.chats.conversations.filter((d: ConversationShort) => !(this.conversations).find(existing => existing.id === d.id))].map(c => ({ ...c }));
            this.next = initialDialogs.data.chats.next;
            this.engine.client.client.writeQuery({
                query: ChatListQuery.document,
                data: { ...initialDialogs, chats: { ...initialDialogs.data.chats, conversations: [...this.conversations] } },
            });

            this.dialogListCallback(this.conversations.map(i => i.id));

            // Write to datasource
            let converted = initialDialogs.data.chats.conversations.map((c: any) => ({
                key: c.id,
                type: c.__typename,
                title: c.title,
                photo: (c as any).photo || (c.photos.length > 0 ? c.photos[0] : undefined),
                unread: c.unreadCount,
                isOut: c.topMessage ? c.topMessage!!.sender.id === this.engine.user.id : undefined,
                sender: c.topMessage ? (c.topMessage!!.sender.id === this.engine.user.id ? 'You' : c.topMessage!!.sender.name) : undefined,
                message: c.topMessage ? formatMessage(c.topMessage) : undefined,
                date: c.topMessage ? parseInt(c.topMessage!!.date, 10) : undefined
            }));
            this.dataSource.loadedMore(converted, !this.next);

            this.loading = false;
        }
    }
}