import { MessengerEngine } from '../MessengerEngine';
import { ConversationShortFragment } from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { ChatListQuery } from 'openland-api';
import { ConversationRepository } from './repositories/ConversationRepository';

export class DialogListEngine {

    readonly engine: MessengerEngine;
    private conversations: ConversationShortFragment[] = [];
    private next?: string;
    private loading: boolean = true;
    constructor(engine: MessengerEngine) {
        this.engine = engine;
    }

    //
    // Update Handlers
    //

    handleInitialConversations = (conversations: any[], next: string) => {
        // Improve conversation resolving
        for (let c of conversations) {
            ConversationRepository.improveConversationResolving(this.engine.client, c.id);
        }

        // Start engine
        this.loading = false;
        this.conversations = conversations;
        this.next = next;
    }

    handleUserRead = (conversationId: string, unread: number, visible: boolean) => {
        ConversationRepository.writeConversationCounter(this.engine.client, conversationId, unread, visible);
    }

    handleNewMessage = (event: any, visible: boolean) => {
        const conversationId = event.conversationId as string;
        const messageId = event.message.id as string;
        const unreadCount = event.unread as number;

        // Improve resolving for faster chat switch via flexibleId
        ConversationRepository.improveConversationResolving(this.engine.client, conversationId);

        // Write Message to Repository
        ConversationRepository.writeNewMessage(this.engine.client, conversationId, messageId, unreadCount, visible);
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