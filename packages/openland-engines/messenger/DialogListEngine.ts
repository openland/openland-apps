import { MessengerEngine } from '../MessengerEngine';
import { ConversationShortFragment } from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { ChatListQuery } from 'openland-api';
import { ConversationRepository } from './repositories/ConversationRepository';

export class DialogListEngine {

    readonly engine: MessengerEngine;
    private listeners: ((data: { conversations: ConversationShortFragment[], loadingMore?: boolean }) => void)[] = [];
    private conversations: ConversationShortFragment[] = [];
    private next?: string;
    private loading: boolean = true;
    constructor(engine: MessengerEngine) {
        this.engine = engine;
    }

    //
    // Update Handlers
    //

    handleInitialConversations = (conversations: any[]) => {
        // Improve conversation resolving
        for (let c of conversations) {
            ConversationRepository.improveConversationResolving(this.engine.client, c.id);
        }

        // Start engine
        this.loading = false;
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
            this.loading = true;
            this.onUpdate();
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
            this.loading = false;
            this.onUpdate();
        }
    }

    onUpdate = () => {
        for (let l of this.listeners) {
            l({ conversations: this.conversations, loadingMore: this.loading });
        }
    }

    subcribe = (listener: (data: { conversations: ConversationShortFragment[], loadingMore?: boolean }) => void) => {
        this.listeners.push(listener);
        listener({ conversations: this.conversations, loadingMore: this.loading });
        return () => {
            let index = this.listeners.indexOf(listener);
            if (index < 0) {
                console.warn('Double unsubscribe detected!');
            } else {
                this.listeners.splice(index, 1);
            }
        };
    }

}