import { OpenlandClient } from 'openland-api/spacex';
import { Persistence, Transaction } from 'openland-engines/persistence/Persistence';
import { ShortSequenceChat, ShortUpdate } from 'openland-api/spacex.types';

export class DraftsEngine {
    readonly client: OpenlandClient;
    readonly persistence: Persistence;

    private drafts = new Map<string, {
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
        this.drafts.set(state.cid, {
            draft: state.draft ? {
                version: state.draft.version,
                date: parseInt(state.draft.date, 10),
                message: state.draft.message
            } : null
        });
    }

    async onUpdate(tx: Transaction, update: ShortUpdate) {
        if (update.__typename === 'UpdateChatDraftChanged') {
            let ex = this.drafts.get(update.cid);
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
            console.log('[engine] draft update: ' + JSON.stringify(update));
        }
    }
}