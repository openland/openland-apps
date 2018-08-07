import { MessengerEngine } from '../MessengerEngine';
import { ConversationShortFragment } from 'openland-api/Types';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { backoff } from 'openland-y-utils/timer';
import { ChatListQuery } from 'openland-api';

export class ConversationsEngine {
    listeners: ((conversations: ConversationShortFragment[]) => void)[] = [];
    conversations: ConversationShortFragment[] = [];
    readonly engine: MessengerEngine;
    seq?: number;
    private next?: string;
    private loading?: boolean;
    constructor(engine: MessengerEngine) {
        this.engine = engine;
    }

    start = async () => {
        await this.loadNext();
    }

    loadNext = async () => {
        if (!this.loading) {
            this.loading = true;
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
            this.seq = initialDialogs.data.seq;
            this.next = initialDialogs.data.next;

            this.onUpdate();
            this.loading = false;
        }

    }

    onUpdate = () => {
        for (let l of this.listeners) {
            l(this.conversations);
        }
    }

    subcribe = (listener: (conversations: ConversationShortFragment[]) => void) => {
        this.listeners.push(listener);
        listener(this.conversations);
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