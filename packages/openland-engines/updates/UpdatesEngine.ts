import { MessengerEngine } from './../MessengerEngine';
import { UsersEngine } from './engines/UsersEngine';
import { HistoryEngine } from './engines/HistoryEngine';
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
    readonly messenger: MessengerEngine;
    readonly counters: CountersEngine;
    readonly drafts: DraftsEngine;
    readonly dialogs: DialogsEngine;
    readonly history: HistoryEngine;
    readonly users: UsersEngine;

    constructor(me: string, client: OpenlandClient, persistence: Persistence, messenger: MessengerEngine) {
        this.client = client;
        this.persistence = persistence;
        this.me = me;
        this.messenger = messenger;
        this.users = new UsersEngine(persistence);
        this.sequences = new SequencesEngine(client, persistence, this.users);
        this.dialogs = new DialogsEngine(this.me, this.messenger, this.users);
        this.counters = new CountersEngine(this.me, this, this.dialogs);
        this.drafts = new DraftsEngine(this.dialogs);
        this.history = new HistoryEngine(this.dialogs, this);
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
            console.log('[updates]: sequence: ', event);
        } else if (event.type === 'start' || event.type === 'restart') {
            if (event.sequence.__typename === 'SequenceChat') {
                // NOTE: Dialogs MUST be the first since it could miss some dialogs
                await this.dialogs.onSequenceRestart(tx, event.sequence);
                await this.counters.onSequenceRestart(tx, event.pts, event.sequence);
                await this.drafts.onSequenceRestart(tx, event.sequence);
                await this.history.onSequenceRestart(tx, event.pts, event.sequence);
            }
        } else if (event.type === 'event') {
            // NOTE: Dialogs MUST be the first since it could miss some dialogs
            await this.dialogs.onUpdate(tx, event.pts, event.event);
            await this.counters.onUpdate(tx, event.pts, event.event);
            await this.drafts.onUpdate(tx, event.event);
            await this.history.onUpdate(tx, event.pts, event.event);

            console.log('[updates]: sequence: ', event);
        }
    }
}