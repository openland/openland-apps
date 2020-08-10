import { OpenlandClient } from 'openland-api/spacex';
import { OnlineWatch } from 'openland-api/spacex.types';
import { reliableWatcher } from 'openland-api/reliableWatcher';

export class OnlineWatcher {
    private onlinesData = new Map<string, boolean>();
    private sub?: () => void = undefined;

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
        let toSubscrive = [...this.users, ...this.privateChats.filter(uid => !this.users.includes(uid))];

        let s = reliableWatcher<OnlineWatch>((handler) => this.client.subscribeOnlineWatch({ users: toSubscrive }, handler), (update) => {
            let event = update.alphaSubscribeOnline;
            this.onlinesData.set(event.user.id, event.user.online);
            this.singleChangeListeners.forEach(l => l(event.user.id, event.user.online));
            this.listeners.forEach(l => l(this.onlinesData));
        });
        this.sub = s;
    }

    onPrivateChatsAppear = (uids: string[]) => {
        const newChats = uids.filter(uid => !this.privateChats.includes(uid));
        if (newChats.length > 0) {
            this.privateChats = [...newChats, ...this.privateChats];
            this.subscribe();
        }
    }

    onUsersAppear = (uids: string[]) => {
        const newUsers = uids.filter(uid => !this.users.includes(uid));
        if (newUsers.length > 0) {
            this.users = [...newUsers, ...this.users];
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

    onSingleChange(cb: (user: string, online: boolean) => void) {
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
            this.sub();
            this.sub = undefined;
        }
    }
}
