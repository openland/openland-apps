import { OpenlandClient } from 'openland-api/spacex';
import { Persistence, Transaction } from 'openland-engines/persistence/Persistence';
import { ShortSequenceChat } from 'openland-api/spacex.types';

export class ChatsEngine {
    readonly client: OpenlandClient;
    readonly persistence: Persistence;

    private chats = new Map<string, { unread: number }>();

    constructor(client: OpenlandClient, persistence: Persistence) {
        this.client = client;
        this.persistence = persistence;
    }

    async onSequenceStart(tx: Transaction, state: ShortSequenceChat) {
        this.chats.set(state.cid, { unread: state.unread });
    }

    async onDialogsLoaded() {
        let unread = 0;
        let count = 0;
        for (let v of this.chats.values()) {
            if (v.unread > 0) {
                unread += v.unread;
                count++;
            }
        }
        console.log('loaded unread: ' + unread + '/' + count);
    }
}