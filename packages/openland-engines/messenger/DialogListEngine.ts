import { MessengerEngine } from '../MessengerEngine';
import { ConversationShortFragment } from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { ChatListQuery } from 'openland-api';
import { ConversationRepository } from './repositories/ConversationRepository';
import { DataSource } from 'openland-y-utils/DataSource';
import { DataSourceLogger } from 'openland-y-utils/DataSourceLogger';

export interface DialogDataSourceItem {
    title: string;
    type: string;
    photo?: string;
    unread: number;
    date: number;
    key: string;
}

export class DialogListEngine {

    readonly engine: MessengerEngine;
    private conversations: ConversationShortFragment[] = [];
    readonly dataSource: DataSource<DialogDataSourceItem>;
    private dataSourceLogger: DataSourceLogger<DialogDataSourceItem>;
    private next?: string;
    private loading: boolean = true;
    constructor(engine: MessengerEngine) {
        this.engine = engine;
        this.dataSource = new DataSource<DialogDataSourceItem>();
        this.dataSourceLogger = new DataSourceLogger<DialogDataSourceItem>('[DIALOGS]', this.dataSource);
    }

    //
    // Update Handlers
    //

    handleInitialConversations = (conversations: any[], next: string) => {

        this.conversations = conversations;

        // Improve conversation resolving
        for (let c of this.conversations) {
            ConversationRepository.improveConversationResolving(this.engine.client, c.id);
        }

        // Update data source
        this.dataSource.initialize(this.conversations.map((c) => ({
            key: c.id,
            type: c.__typename,
            title: c.title,
            photo: c.photos.length > 0 ? c.photos[0] : undefined,
            unread: c.unreadCount,
            date: parseInt(c.topMessage!!.date, 10)
        })));

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
        if (res) {
            this.dataSource.updateItem({
                ...res,
                unread: (!visible || res.unread > unreadCount) ? unreadCount : res.unread,
                date: parseInt(event.message.date, 10)
            });
            this.dataSource.moveItem(res.key, 0);
        } else {
            this.dataSource.addItem(
                {
                    key: conversationId,
                    type: conversation.__typename,
                    title: conversation.title,
                    photo: conversation.photos.length > 0 ? conversation.photos[0] : undefined,
                    unread: unreadCount,
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

            this.conversations = [...this.conversations, ...initialDialogs.data.chats.conversations.filter((d: ConversationShortFragment) => !(this.conversations).find(existing => existing.id === d.id))].map(c => ({ ...c }));
            this.next = initialDialogs.data.chats.next;

            this.engine.client.client.writeQuery({
                query: ChatListQuery.document,
                data: { ...initialDialogs, chats: { ...initialDialogs.data.chats, conversations: [...this.conversations] } },
            });

            this.loading = false;
        }
    }

}