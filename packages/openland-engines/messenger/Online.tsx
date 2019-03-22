import { GraphqlActiveSubscription } from 'openland-graphql/GraphqlClient';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { OnlineWatch, OnlineWatchVariables } from 'openland-api/Types';

export class OnlineWatcher {
    private onlinesData = new Map<string, boolean>();
    private sub?: GraphqlActiveSubscription<OnlineWatch, OnlineWatchVariables> = undefined;

    private listeners: ((data: {}) => void)[] = [];
    private singleChangeListeners: ((user: string, online: boolean) => void)[] = [];
    private client: OpenlandClient;
    constructor(client: OpenlandClient) {
        this.client = client;
    }

    onDialogListChange(conversations: string[]) {
        this.destroy();

        let s = this.client.subscribeOnlineWatch({ conversations });
        this.sub = s;

        (async () => {
            while (true) {
                let event = await s.get();
                // if (!event) {
                //     continue;
                // }
                let evData = event.alphaSubscribeChatOnline;
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
