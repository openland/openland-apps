import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import gql from 'graphql-tag';

const SUBSCRIBE_TYPINGS = gql`
    subscription SubscribeTypings {
        alphaSubscribeTypings {
            conversation {
                id
            }
            user {
                id
                name
                picture
            }
            cancel
        }
    }
`;

interface TypingsUser {
    userName: string;
    userPic: string | null;
    userId: string;
}

export class TypingsWatcher {
    private typings: {
        [conversationId: string]: {
            [userId: string]: {
                userName: string,
                userPic: string | null,
                userId: string
            } | undefined
        }
    } = {};
    private timeouts: {
        [conversationId: string]: {
            [userId: string]: number
        }
    } = {};
    private sub?: ZenObservable.Subscription = undefined;
    private onChange: (conversationId: string, data?: { typing: string, users: TypingsUser[] }) => void;

    constructor(client: OpenApolloClient, onChange: (conversationId: string, data?: { typing: string, users: TypingsUser[] }) => void, currentuserId: string) {
        this.onChange = onChange;
        let typingSubscription = client.client.subscribe({
            query: SUBSCRIBE_TYPINGS
        });

        this.sub = typingSubscription.subscribe({
            next: (event) => {
                if (event.data.alphaSubscribeTypings.user.id === currentuserId) {
                    return;
                }
                let cId: string = event.data.alphaSubscribeTypings.conversation.id;

                // add new typings
                let existing = this.typings[cId] || {};

                if (!event.data.alphaSubscribeTypings.cancel) {
                    existing[event.data.alphaSubscribeTypings.user.id] = {
                        userName: event.data.alphaSubscribeTypings.user.name,
                        userPic: event.data.alphaSubscribeTypings.user.picture,
                        userId: event.data.alphaSubscribeTypings.user.id
                    };
                    this.typings[cId] = existing;

                    this.onChange(cId, this.renderTypings(cId));
                }

                // clear scehduled typing clear
                let existingTimeouts = this.timeouts[cId] || {};
                clearTimeout(existingTimeouts[event.data.alphaSubscribeTypings.user.id]);
                // schedule typing clear
                existingTimeouts[event.data.alphaSubscribeTypings.user.id] = setTimeout(
                    () => {
                        existing[event.data.alphaSubscribeTypings.user.id] = undefined;
                        onChange(cId, this.renderTypings(cId));
                    },
                    event.data.alphaSubscribeTypings.cancel ? 0 : 4000);
                this.timeouts[cId] = existingTimeouts;
            }
        });

    }

    renderTypings = (cId: string) => {
        let usersTyping: TypingsUser[] = Object.keys(this.typings[cId]).map(userId => (this.typings[cId][userId])).filter(u => !!(u)).map(u => ({ userName: u!.userName, userPic: u!.userPic, userId: u!.userId }));

        let userNames = usersTyping.map(u => u!.userName);

        let str = userNames.filter((u, i) => i < 2).join(', ') + (usersTyping.length > 2 ? ' and ' + (usersTyping.length - 2) + ' more' : '') + (usersTyping.length === 1 ? ' is ' : ' are ') + 'typing...';

        let data = {
            typing: str,
            users: usersTyping,
        };

        return usersTyping.length > 0 ? data : undefined;
    }

    destroy = () => {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}

export class TypingEngine {
    listeners: ((typing?: string, users?: TypingsUser[]) => void)[] = [];
    typing?: string;
    users?: TypingsUser[];

    onTyping = (data?: { typing: string, users: TypingsUser[] }) => {
        this.typing = data !== undefined ? data.typing : undefined;
        this.users = data !== undefined ? data.users : undefined;
        for (let l of this.listeners) {
            l(this.typing, this.users);
        }
    }

    subcribe = (listener: (typing?: string, users?: TypingsUser[]) => void) => {
        this.listeners.push(listener);
        listener(this.typing, this.users);
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