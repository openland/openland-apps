import gql from 'graphql-tag';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';

const SUBSCRIBE_ONLINES = gql`
    subscription SubscribeOnlines($conversations: [ID!]!) {
        alphaSubscribeChatOnline(conversations: $conversations) {
            user: user {
                id
                online
            }
            type
            timeout
        }
    }
`;

const USER_ONLINE = gql`
    fragment UserOnline on User{
        id
        online
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

                this.client.client.writeFragment({ id: userId, fragment: USER_ONLINE, data: { __typename: 'User', id: userId, online: evData.type === 'online' } });

                if (this.timeouts.has(userId)) {
                    clearTimeout(this.timeouts.get(userId));
                }

                if (evData.type === 'online' && evData.timeout) {
                    this.timeouts.set(
                        userId,
                        setTimeout(
                            () => {
                                let data = this.client.client.readFragment({
                                    id: userId,
                                    fragment: USER_ONLINE,
                                });
                                this.client.client.writeFragment({
                                    id: userId,
                                    fragment: USER_ONLINE,
                                    data: { ...data, online: false }
                                });
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
