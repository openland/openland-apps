import { DialogsEngine } from './DialogsEngine';
import { Transaction } from 'openland-engines/persistence/Persistence';
import { ShortSequenceChat, ShortUpdate } from 'openland-api/spacex.types';

export class DraftsEngine {

    readonly dialogs: DialogsEngine;

    private drafts = new Map<string, {
        draft: {
            version: number,
            date: number,
            message: string | null
        }
    }>();

    constructor(dialogs: DialogsEngine) {
        this.dialogs = dialogs;
    }

    async onSequenceRestart(tx: Transaction, state: ShortSequenceChat) {
        if (state.draft) {
            await this.applyDraft(tx, state.cid, parseInt(state.draft.date, 10), state.draft.version, state.draft.message);
        }
    }

    async onUpdate(tx: Transaction, update: ShortUpdate) {
        if (update.__typename === 'UpdateChatDraftChanged') {
            await this.applyDraft(tx, update.cid, parseInt(update.date, 10), update.version, update.draft);
            console.log('[engine] draft update: ' + JSON.stringify(update));
        }
    }

    private async applyDraft(tx: Transaction, cid: string, date: number, version: number, message: string | null) {
        let ex = this.drafts.get(cid);
        if (!ex) {
            this.drafts.set(cid, {
                draft: {
                    version,
                    date,
                    message
                }
            });
        } else {
            if (ex.draft.version < version) {
                ex.draft = {
                    version,
                    date,
                    message
                };
            }
        }
    }
}