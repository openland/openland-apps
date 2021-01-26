import { SequencesEngine } from './../sequences/SequencesEngine';
import { ShortSequence } from 'openland-api/spacex.types';
import { Transaction } from 'openland-engines/persistence/Persistence';
import { StoredMap } from './storage/StoredMap';

export class ChatsEngine {
    private chatSequences = new StoredMap<string>('sequences');
    private sequences: SequencesEngine;

    constructor(sequences: SequencesEngine) {
        this.sequences = sequences;
    }

    async getChatSequence(tx: Transaction, cid: string) {
        return await this.chatSequences.get(tx, cid);
    }

    async onSequenceRestart(tx: Transaction, state: ShortSequence, lost: boolean) {
        if (state.__typename === 'SequenceChat') {
            let ex = await this.chatSequences.get(tx, state.cid);
            if (!ex) {
                this.chatSequences.set(tx, state.cid, state.id);
            }
        }
    }

    async invalidate(tx: Transaction, cid: string) {
        let id = await this.getChatSequence(tx, cid);
        if (id) {
            await this.sequences.invalidate(tx, id);
        }
    }
}