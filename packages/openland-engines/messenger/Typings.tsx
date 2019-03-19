import { GraphqlActiveSubscription } from 'openland-graphql/GraphqlClient';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { TypingsWatchSubscription } from 'openland-api';
import { TypingsWatch } from 'openland-api/Types';

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
        } | undefined
    } = {};
    private timeouts: {
        [conversationId: string]: {
            [userId: string]: number | undefined
        } | undefined
    } = {};
    private subscription: GraphqlActiveSubscription<TypingsWatch, {}>;
    private onChange: (conversationId: string, data?: { typing: string, users: TypingsUser[] }) => void;

    constructor(client: OpenlandClient, onChange: (conversationId: string, data?: { typing: string, users: TypingsUser[] }) => void, currentuserId: string) {
        this.onChange = onChange;
        this.subscription = client.subscribeTypingsWatch();

        this.start(currentuserId);
    }

    private start(currentuserId: string) {
        (async () => {
            while (true) {
                let event = await this.subscription.get();
                if (event) {
                    if (event.typings.user.id === currentuserId) {
                        return;
                    }
                    let cId: string = event.typings.conversation.id;
                    let type: string = event.typings.conversation.__typename;

                    // add new typings
                    let existing = this.typings[cId] || {};

                    if (!event.typings.cancel) {
                        existing[event.typings.user.id] = {
                            userName: event.typings.user.name,
                            userPic: event.typings.user.picture,
                            userId: event.typings.user.id
                        };
                        this.typings[cId] = existing;

                        this.onChange(cId, this.renderTypings(cId, type));
                    }

                    // clear scehduled typing clear
                    let existingTimeouts = this.timeouts[cId] || {};
                    clearTimeout(existingTimeouts[event.typings.user.id]);
                    // schedule typing clear
                    existingTimeouts[event.typings.user.id] = window.setTimeout(
                        () => {
                            existing[event.typings.user.id] = undefined;
                            this.onChange(cId, this.renderTypings(cId));
                        },
                        event.typings.cancel ? 0 : 4000);
                    this.timeouts[cId] = existingTimeouts;
                }
            }
        })();
    }

    renderTypings = (cId: string, type?: string) => {
        let t = this.typings[cId];
        if (!t) {
            return undefined;
        }

        let isPrivate = type === 'PrivateConversation';

        let usersTyping: TypingsUser[] = Object.keys(t).map(userId => (t![userId])).filter(u => !!(u)).map(u => ({ userName: isPrivate ? u!.userName.split(' ')[0] : u!.userName, userPic: u!.userPic, userId: u!.userId }));

        let userNames = usersTyping.map(u => u!.userName);

        let str = userNames.filter((u, i) => i < 2).join(', ') + (usersTyping.length > 2 ? ' and ' + (usersTyping.length - 2) + ' more' : '') + (usersTyping.length === 1 ? ' is ' : ' are ') + 'typing...';

        let data = {
            typing: str,
            users: usersTyping,
        };

        return usersTyping.length > 0 ? data : undefined;
    }

    destroy = () => {
        this.subscription.destroy();
    }
}

export class TypingEngine {
    listeners: ((typing: string | undefined, users: TypingsUser[] | undefined, conversationId: string) => void)[] = [];
    typing?: string;
    users?: TypingsUser[];

    onTyping = (data: { typing: string, users: TypingsUser[] } | undefined, conversationId: string) => {
        this.typing = data !== undefined ? data.typing : undefined;
        this.users = data !== undefined ? data.users : undefined;
        for (let l of this.listeners) {
            l(this.typing, this.users, conversationId);
        }
    }

    subcribe = (listener: (typing: string | undefined, users: TypingsUser[] | undefined, conversationId: string) => void) => {
        this.listeners.push(listener);
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