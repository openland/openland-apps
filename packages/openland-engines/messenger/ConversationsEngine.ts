import { MessengerEngine } from '../MessengerEngine';
import { ConversationShortFragment } from 'openland-api/Types';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { backoff } from 'openland-y-utils/timer';
import { ChatListQuery } from 'openland-api';

export class ConversationsEngine {
    listeners: ((data: { conversations: ConversationShortFragment[], loadingMore?: boolean }) => void)[] = [];
    conversations: ConversationShortFragment[] = [];
    readonly engine: MessengerEngine;
    seq?: number;
    private next?: string;
    loading?: boolean;
    constructor(engine: MessengerEngine) {
        this.engine = engine;
    }

    start = async () => {
        await this.loadNext();
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

            this.conversations.map(c => console.warn('ConversationsEngine', c.title));

            this.seq = initialDialogs.data.chats.seq;
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