import { DialogsEngine } from './engines/DialogsEngine';
import { SequencesEngine } from './sequences/SequencesEngine';
import { DraftsEngine } from './engines/DraftsEngine';
import { CountersEngine } from './engines/CountersEngine';
import { Transaction } from './../persistence/Persistence';
import { SequenceHolderEvent } from './internal/SequenceHolder';
import { OpenlandClient } from 'openland-api/spacex';
import { Persistence } from 'openland-engines/persistence/Persistence';

export class UpdatesEngine {
    readonly client: OpenlandClient;
    readonly persistence: Persistence;
    private readonly sequences: SequencesEngine;
    private started = false;
    private closed = false;

    readonly me: string;
    readonly counters: CountersEngine;
    readonly drafts: DraftsEngine;
    readonly dialogs: DialogsEngine;

    constructor(me: string, client: OpenlandClient, persistence: Persistence) {
        this.client = client;
        this.persistence = persistence;
        this.me = me;
        this.sequences = new SequencesEngine(client, persistence);
        this.dialogs = new DialogsEngine();
        this.counters = new CountersEngine(this.me, this, this.dialogs);
        this.drafts = new DraftsEngine();
    }

    start() {
        if (this.closed) {
            return;
        }
        if (this.started) {
            return;
        }
        this.started = true;
        this.sequences.handler = this.handleEvent;
        this.sequences.start();
    }

    async invalidate(tx: Transaction, id: string) {
        await this.sequences.invalidate(tx, id);
    }

    close() {
        if (!this.closed) {
            this.closed = true;
            this.sequences.stop();
        }
    }

    private handleEvent = async (tx: Transaction, event: SequenceHolderEvent | { type: 'loaded' }) => {
        if (event.type === 'loaded') {
            await this.dialogs.onDialogsLoaded(tx);
        } else if (event.type === 'start' || event.type === 'restart') {
            if (event.sequence.__typename === 'SequenceChat') {
                await this.dialogs.onSequenceRestart(tx, event.sequence);
                await this.drafts.onSequenceRestart(tx, event.sequence);
                await this.counters.onSequenceRestart(tx, event.pts, event.sequence);
            }
        } else if (event.type === 'event') {
            await this.dialogs.onUpdate(tx, event.event);
            await this.counters.onUpdate(tx, event.pts, event.event);
            await this.drafts.onUpdate(tx, event.event);
        }
        console.log('updates: sequence: ', event);
    }
}