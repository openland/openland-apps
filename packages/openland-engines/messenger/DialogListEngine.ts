import { MessengerEngine } from '../MessengerEngine';
import { ConversationShort } from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { ChatListQuery, ChatInfoQuery } from 'openland-api';
import { ConversationRepository } from './repositories/ConversationRepository';
import { DataSource } from 'openland-y-utils/DataSource';
import { DataSourceLogger } from 'openland-y-utils/DataSourceLogger';

export interface DialogDataSourceItem {
    key: string;
    flexibleId: string;
    title: string;
    type: string;
    photo?: string;
    unread: number;
    online?: boolean;
    typing?: string;

    date?: number;
    message?: string;
    sender?: string;
    isOut?: boolean;
    fileMeta?: { isImage?: boolean };
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
        flexibleId: c.flexibleId,
        type: c.__typename,
        title: c.title,
        photo: (c as any).photo || (c.photos.length > 0 ? c.photos[0] : undefined),
        unread: c.unreadCount,
        isOut: c.topMessage ? c.topMessage!!.sender.id === uid : undefined,
        sender: c.topMessage ? (c.topMessage!!.sender.id === uid ? 'You' : c.topMessage!!.sender.name) : undefined,
        message: c.topMessage ? formatMessage(c.topMessage) : undefined,
        date: c.topMessage ? parseInt(c.topMessage!!.date, 10) : undefined,
        fileMeta: c.topMessage ? c.topMessage.fileMetadata : undefined,
        online: false,
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
                    typing: typing && (res.type === 'PrivateConversation' ? 'typing...' : typing)
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

    handleInitialConversations = (conversations: any[], next: string) => {

        this.conversations = conversations;

        this.dialogListCallback(this.conversations.map(i => i.id));

        // Improve conversation resolving
        for (let c of this.conversations) {
            ConversationRepository.improveConversationResolving(this.engine.client, c.id);
        }

        // Update data source
        this.dataSource.initialize(
            this.conversations.map(c => {
                if (c.__typename === 'PrivateConversation' && c.flexibleId) {
                    this.userConversationMap.set(c.flexibleId, c.id);
                }
                return extractDialog(c, this.engine.user.id);
            }),
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

    handleNewMessage = async (event: any, visible: boolean) => {
        console.log(event);
        const conversationId = event.cid as string;
        // const messageId = event.message.id as string;
        const unreadCount = event.unread as number;

        // Improve resolving for faster chat switch via flexibleId
        // ConversationRepository.improveConversationResolving(this.engine.client, conversationId);

        // this.userConversationMap.set(conversation.flexibleId, conversationId);

        // Write Message to Repository
        // ConversationRepository.writeNewMessage(this.engine.client, conversationId, messageId, unreadCount, visible);

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
                date: parseInt(event.message.date, 10),
                fileMeta: event.message.fileMetadata,
            });
            this.dataSource.moveItem(res.key, 0);
        } else {
            if (event.message.serviceMetadata && event.message.serviceMetadata.__typename === 'KickServiceMetadata') {
                return;
            }

            let info = await this.engine.client.query(ChatInfoQuery, { conversationId });

            this.dataSource.addItem(
                {
                    key: conversationId,
                    flexibleId: info.data.chat.flexibleId,
                    type: info.data.chat.__typename,
                    title: info.data.chat.title,
                    photo: (info.data.chat as any).photo || (info.data.chat.photos.length > 0 ? info.data.chat.photos[0] : undefined),
                    unread: unreadCount,
                    isOut: isOut,
                    sender: sender,
                    message: formatMessage(event.message),
                    date: parseInt(event.message.date, 10),
                    fileMeta: event.message.fileMetadata,
                    online: info.data.chat.__typename === 'PrivateConversation' ? info.data.chat.user.online : false,
                },
                0);
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
            this.dialogListCallback(this.conversations.map(i => i.id));

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
                date: c.topMessage ? parseInt(c.topMessage!!.date, 10) : undefined,
                fileMeta: c.topMessage ? c.topMessage.fileMetadata : undefined,
                online: false,
            }));
            this.dataSource.loadedMore(converted, !this.next);

            this.loading = false;
        }
    }
}