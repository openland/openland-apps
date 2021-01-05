import { MessagesHistory } from './history/MessagesHistory';
import { UpdatesEngine } from 'openland-engines/updates/UpdatesEngine';
import { Transaction } from 'openland-engines/persistence/Persistence';
import { DialogsEngine } from './DialogsEngine';
import { ShortSequenceChat, ShortUpdate } from 'openland-api/spacex.types';

export class HistoryEngine {
    readonly dialogs: DialogsEngine;
    readonly updates: UpdatesEngine;
    readonly history = new Map<string, MessagesHistory>();

    constructor(dialogs: DialogsEngine, updates: UpdatesEngine) {
        this.dialogs = dialogs;
        this.updates = updates;
    }

    async onSequenceRestart(tx: Transaction, state: ShortSequenceChat) {
        // TODO: Handle
        await this.dialogs.onTopMessageUpdate(tx, state.cid, state.topMessage);
    }

    async onUpdate(tx: Transaction, pts: number, update: ShortUpdate) {
        // TODO: Handle
    }
}