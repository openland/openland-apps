import { GraphqlActiveSubscription } from 'openland-graphql/GraphqlClient';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { OnlineWatch, OnlineWatchVariables } from 'openland-api/Types';
import { forever } from 'openland-engines/utils/forever';
import { subscribe } from 'graphql';

export class OnlineWatcher {
    private onlinesData = new Map<string, boolean>();
    private sub?: GraphqlActiveSubscription<OnlineWatch, OnlineWatchVariables> = undefined;

    private users: string[] = [];
    private privateChats: string[] = [];

    private listeners: ((data: {}) => void)[] = [];
    private singleChangeListeners: ((user: string, online: boolean) => void)[] = [];
    private client: OpenlandClient;
    constructor(client: OpenlandClient) {
        this.client = client;
    }

    subscribe() {
        this.destroy();
        let toSubscrive = [...this.users, ...this.privateChats.filter(uid => !this.users.includes(uid))]

        let s = this.client.subscribeOnlineWatch({ users: toSubscrive });
        this.sub = s;

        forever(async () => {
            let event = await s.get();
            // if (!event) {
            //     continue;
            // }
            let evData = event.alphaSubscribeOnline;

            let userId = evData.user.id;

            this.onlinesData.set(userId, evData.user.online);
            this.singleChangeListeners.forEach(l => l(userId, evData.user.online));

            this.listeners.forEach(l => l(this.onlinesData));
        });
    }

    onPrivateChatAppears = (uid: string) => {
        if (!this.privateChats.includes(uid)) {
            this.privateChats.unshift(uid);
            this.subscribe();
        }
    }

    onUserAppears = (uid: string) => {
        if (!this.users.includes(uid)) {
            this.users.unshift(uid);
            if (this.users.length > 50) {
                this.users.pop()
            }
            this.subscribe();
        }
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
    };
}
