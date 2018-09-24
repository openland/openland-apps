import { apolloClient } from 'openland-x-graphql/apolloClient';
import gql from 'graphql-tag';

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
    private onlinesData = new Map<string, string>();
    private sub?: ZenObservable.Subscription = undefined;

    private listeners: ((data: {}) => void)[] = [];

    onDialogListChange(conversations: string[]) {
        let onlineSubscription = apolloClient().client.subscribe({
            query: SUBSCRIBE_ONLINES,
            variables: { conversations }
        });

        this.sub = onlineSubscription.subscribe({
            next: (event) => {
                let evData = event.data.alphaSubscribeChatOnline;
                let userId = evData.user.id;

                this.onlinesData.set(
                    userId,
                    evData.type
                );

                // if (evData.type === 'online') {
                //     setTimeout(
                //         () => {
                //             this.onlinesData.set(
                //                 userId, 
                //                 evData.type
                //             );
                //         }, 
                //         evData.timeout
                //     );
                // }

                this.listeners.forEach(l => l(this.onlinesData));
                // console.log(this.onlinesData);
            }
        });
    }

    onChange(cb: (onlines: { id: string, online: string }[]) => void) {
        this.listeners.push(cb);

        return () => {
            let index = this.listeners.indexOf(cb);
            if (index > 0) {
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
