import { ShortSequence, ShortUpdate } from 'openland-api/spacex.types';
import { DialogsEngine } from './dialogs/DialogsEngine';
import { Transaction } from './../persistence/Persistence';
import { SequenceHolder, SequenceHolderEvent } from './internal/SequenceHolder';
import { UpdateEvent, UpdateSequenceState, UpdateSequenceDiff } from './Types';
import { UpdatesSubscriptionClient } from './internal/UpdatesSubscriptionClient';
import { UpdatesApiClient } from './internal/UpdatesApiClient';
import { MainUpdatesSubscription } from './internal/MainUpdatesSubscription';
import { OpenlandClient } from 'openland-api/spacex';
import { Persistence } from 'openland-engines/persistence/Persistence';
import { UpdatesApi } from './internal/UpdatesApi';

export class UpdatesEngine {
    readonly client: OpenlandClient;
    readonly persistence: Persistence;
    private api: UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>;
    private started = false;
    private closed = false;
    private main: MainUpdatesSubscription<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>;
    private sequences = new Map<string, SequenceHolder>();
    // private dialogs: DialogsEngine;

    constructor(client: OpenlandClient, persistence: Persistence) {
        this.client = client;
        this.persistence = persistence;
        // this.dialogs = new DialogsEngine(client, persistence);
        this.api = new UpdatesApiClient(this.client);
        this.main = new MainUpdatesSubscription(null,
            new UpdatesApiClient(this.client),
            new UpdatesSubscriptionClient(this.client));
    }

    start() {
        if (this.closed) {
            return;
        }
        if (this.started) {
            return;
        }
        this.started = true;
        this.main.start((event) => {
            console.log('updates: ', event);

            this.persistence.inTx(async (tx) => {
                if (event.type === 'inited') {
                    await this.onInited(tx);
                } else if (event.type === 'start') {
                    await this.receiveSequence(tx, event.state, event.pts);
                } else if (event.type === 'event') {
                    await this.receiveEvent(tx, event.id, event.pts, event.event);
                } else if (event.type === 'diff') {
                    await this.receiveDiff(tx, event.fromPts, event.events, event.state);
                }
            });
        });
    }

    async receiveSequence(tx: Transaction, state: ShortSequence, pts: number) {
        let sequence = this.sequences.get(state.id);
        if (sequence) {
            await sequence.onStateReceived(tx, { pts: pts, sequence: state });
        } else {
            sequence = await SequenceHolder.createFromState(tx, { sequence: state, pts: pts }, this.handleSequenceEvent, this.api);
            this.sequences.set(state.id, sequence);
        }
    }

    async receiveDiff(tx: Transaction, fromPts: number, events: { pts: number, event: ShortUpdate }[], state: ShortSequence) {
        let sequence = this.sequences.get(state.id);
        if (!sequence) {
            sequence = await SequenceHolder.create(tx, state.id, this.handleSequenceEvent, this.api);
            this.sequences.set(state.id, sequence);
        }
        await sequence.onDiffReceived(tx, fromPts, events, state);
    }

    async receiveEvent(tx: Transaction, id: string, pts: number, event: ShortUpdate) {
        let sequence = this.sequences.get(id);
        if (!sequence) {
            sequence = await SequenceHolder.create(tx, id, this.handleSequenceEvent, this.api);
            this.sequences.set(id, sequence);
        }
        await sequence.onUpdate(tx, pts, event);
    }

    close() {
        if (!this.closed) {
            this.closed = true;
            this.main.stop();
        }
    }

    private onInited = async (initTx: Transaction) => {

        //
        // Loading Initial Dialogs
        // 

        let completed = await initTx.readBoolean('dialogs.sync.completed');
        let cursor = await initTx.read('dialogs.sync.cursor');
        if (completed) {
            return;
        }

        (async () => {
            completed = false;
            while (!completed) {
                console.info('Loading dialogs...');
                let dialogs = await this.client.queryGetInitialDialogs({ after: cursor });
                await this.persistence.inTx(async (tx) => {

                    // Apply sequences
                    for (let d of dialogs.syncUserChats.items) {
                        await this.receiveSequence(tx, d.sequence, d.pts);
                    }

                    if (dialogs.syncUserChats.cursor) {
                        tx.write('dialogs.sync.cursor', cursor);
                        tx.writeBoolean('dialogs.sync.completed', false);
                        completed = false;
                        cursor = dialogs.syncUserChats.cursor;
                    } else {
                        tx.write('dialogs.sync.cursor', null);
                        tx.writeBoolean('dialogs.sync.completed', true);
                        completed = true;
                    }
                });
            }
        })();
    }

    private handleSequenceEvent = async (tx: Transaction, event: SequenceHolderEvent) => {
        console.log('updates: sequence: ', event);
    }
}