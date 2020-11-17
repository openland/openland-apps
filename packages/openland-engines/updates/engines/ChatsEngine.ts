import { OpenlandClient } from 'openland-api/spacex';
import { Persistence, Transaction } from 'openland-engines/persistence/Persistence';
import { ShortSequenceChat, ShortUpdate } from 'openland-api/spacex.types';

export class ChatsEngine {
    readonly client: OpenlandClient;
    readonly persistence: Persistence;

    private chats = new Map<string, {
        unread: number,
        draft: {
            version: number,
            date: number,
            message: string | null
        } | null
    }>();

    constructor(client: OpenlandClient, persistence: Persistence) {
        this.client = client;
        this.persistence = persistence;
    }

    async onSequenceStart(tx: Transaction, state: ShortSequenceChat) {
        this.chats.set(state.cid, {
            unread: state.unread,
            draft: state.draft ? {
                version: state.draft.version,
                date: parseInt(state.draft.date, 10),
                message: state.draft.message
            } : null
        });
    }

    async onUpdate(tx: Transaction, update: ShortUpdate) {
        if (update.__typename === 'UpdateChatDraftChanged') {
            let ex = this.chats.get(update.cid);
            if (!ex) {
                return; // Should not happen
            }
            if (!ex.draft || ex.draft.version < update.version) {
                ex.draft = {
                    version: update.version,
                    date: parseInt(update.date, 10),
                    message: update.draft
                };
            }
        } else if (update.__typename === 'UpdateChatRead') {
            // TODO: Handle
        }
    }

    async onSequenceUpdate(tx: Transaction, id: string, update: ShortUpdate) {
        if (update.__typename === 'UpdateChatMessage') {
            // TODO: Handle
        } else if (update.__typename === 'UpdateChatMessageDeleted') {
            // TODO: Handle
        }
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