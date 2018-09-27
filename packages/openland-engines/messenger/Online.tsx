import gql from 'graphql-tag';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';

const SUBSCRIBE_ONLINES = gql`
    subscription SubscribeOnlines($conversations: [ID!]!) {
        alphaSubscribeChatOnline(conversations: $conversations) {
            user {
                id
            }
            type
            timeout
        }
    }
`;

export class OnlineWatcher {
    private onlinesData = new Map<string, boolean>();
    private sub?: ZenObservable.Subscription = undefined;

    private timeouts = new Map<string, number>();

    private listeners: ((data: {}) => void)[] = [];
    private client: OpenApolloClient;
    constructor(client: OpenApolloClient) {
        this.client = client;
    }

    onDialogListChange(conversations: string[]) {
        this.destroy();

        let onlineSubscription = this.client.client.subscribe({
            query: SUBSCRIBE_ONLINES,
            variables: { conversations }
        });

        this.sub = onlineSubscription.subscribe({
            next: (event) => {
                if (!event || !event.data) {
                    return;
                }
                let evData = event.data.alphaSubscribeChatOnline;
                let userId = evData.user.id;

                this.onlinesData.set(
                    userId,
                    evData.type === 'online' ? true : false
                );

                if (this.timeouts.has(userId)) {
                    clearTimeout(this.timeouts.get(userId));
                }

                if (evData.type === 'online') {
                    this.timeouts.set(
                        userId,
                        setTimeout(
                            () => {
                                this.onlinesData.set(
                                    userId,
                                    false
                                );
                            },
                            evData.timeout
                        )
                    );
                }

                this.listeners.forEach(l => l(this.onlinesData));
            }
        });
    }

    onChange(cb: (onlines: Map<string, boolean>) => void) {
        this.listeners.push(cb);

        return () => {
            let index = this.listeners.indexOf(cb);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    destroy = () => {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
