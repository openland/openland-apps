import gql from 'graphql-tag';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { GraphqlClient, GraphqlActiveSubscription } from 'openland-graphql/GraphqlClient';

const SUBSCRIBE_ONLINES = gql`
    subscription SubscribeOnlines($conversations: [ID!]!) {
        alphaSubscribeChatOnline(conversations: $conversations) {
            user: user {
                id
                online
                lastSeen
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
    private sub?: GraphqlActiveSubscription = undefined;

    private listeners: ((data: {}) => void)[] = [];
    private singleChangeListeners: ((user: string, online: boolean) => void)[] = [];
    private client: GraphqlClient;
    constructor(client: GraphqlClient) {
        this.client = client;
    }

    onDialogListChange(conversations: string[]) {
        this.destroy();

        this.sub = this.client.subscribe(SUBSCRIBE_ONLINES, { conversations });

        (async () => {
            while (true) {
                let event = await this.sub!.get();
                if (!event || !event.data) {
                    continue;
                }
                let evData = event.data.alphaSubscribeChatOnline;
                let userId = evData.user.id;

                this.onlinesData.set(userId, evData.user.online);
                this.singleChangeListeners.forEach(l => l(userId, evData.user.online));

                this.listeners.forEach(l => l(this.onlinesData));
            }
        })();
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

    onSingleChangeChange(cb: (user: string, online: boolean) => void) {
        this.singleChangeListeners.push(cb);

        return () => {
            let index = this.singleChangeListeners.indexOf(cb);
            if (index > -1) {
                this.singleChangeListeners.splice(index, 1);
            }
        };
    }

    destroy = () => {
        if (this.sub) {
            this.sub.destroy();
        }
    }
}
