import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import gql from 'graphql-tag';

const SUBSCRIBE_TYPINGS = gql`
    subscription SubscribeTypings {
        alphaSubscribeTypings {
            conversation{
                id
            }
            user{
                id
                name
            }
            cancel
        }
    }
`;

export class TypingsWatcher {
    private typings: { [conversationId: string]: { [userId: string]: string | undefined } } = {};
    private timeouts: { [conversationId: string]: { [userId: string]: number } } = {};
    private sub?: ZenObservable.Subscription = undefined;
    private onChange: (conversationId: string, typing?: string) => void;
    constructor(client: OpenApolloClient, onChange: (conversationId: string, typing?: string) => void, currentUserId: string) {
        this.onChange = onChange;
        let typingSubscription = client.client.subscribe({
            query: SUBSCRIBE_TYPINGS
        });

        this.sub = typingSubscription.subscribe({
            next: (event) => {
                if (event.data.alphaSubscribeTypings.user.id === currentUserId) {
                    return;
                }
                let cId: string = event.data.alphaSubscribeTypings.conversation.id;
                // console.warn(event.data.alphaSubscribeTypings.user.name, 'typing in ', cId);
                // add new typings
                let existing = this.typings[cId] || {};
                if (!event.data.alphaSubscribeTypings.cancel) {
                    existing[event.data.alphaSubscribeTypings.user.id] = event.data.alphaSubscribeTypings.user.name;
                    this.typings[cId] = existing;
                    this.onChange(cId, this.renderString(cId));
                }

                // clear scehduled typing clear
                let existingTimeouts = this.timeouts[cId] || {};
                clearTimeout(existingTimeouts[event.data.alphaSubscribeTypings.user.id]);
                // schedule typing clear
                existingTimeouts[event.data.alphaSubscribeTypings.user.id] = setTimeout(
                    () => {
                        existing[event.data.alphaSubscribeTypings.user.id] = undefined;
                        onChange(cId, this.renderString(cId));
                    },
                    event.data.alphaSubscribeTypings.cancel ? 0 : 4000);
                this.timeouts[cId] = existingTimeouts;
            }
        });

    }

    renderString = (cId: string) => {
        let usersTyping = Object.keys(this.typings[cId]).map(userId => this.typings[cId][userId]).filter(u => u);
        let str = usersTyping.filter((u, i) => i < 2).join(', ') + (usersTyping.length > 2 ? ' and ' + (usersTyping.length - 2) + ' more' : '') + (usersTyping.length === 1 ? ' is ' : ' are ') + 'typing';
        return usersTyping.length > 0 ? str : undefined;
    }

    destroy = () => {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}

export class TypingEngine {
    listeners: ((typing?: string) => void)[] = [];
    typing?: string;

    onTyping = (typing?: string) => {
        this.typing = typing;
        for (let l of this.listeners) {
            l(this.typing);
        }
    }

    subcribe = (listener: (typing?: string) => void) => {
        this.listeners.push(listener);
        listener(this.typing);
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