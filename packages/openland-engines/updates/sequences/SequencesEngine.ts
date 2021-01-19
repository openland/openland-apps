import { backoff } from 'openland-y-utils/timer';
import { UsersEngine } from './../engines/UsersEngine';
import { SequenceHolderEvent } from './../internal/SequenceHolder';
import { UpdatesSubscriptionClient } from './../internal/UpdatesSubscriptionClient';
import { UpdatesApiClient } from './../internal/UpdatesApiClient';
import { MainUpdatesSubscription } from './../internal/MainUpdatesSubscription';
import { UpdateEvent, UpdateSequenceState, UpdateSequenceDiff } from './../Types';
import { ShortSequence, ShortUpdate } from 'openland-api/spacex.types';
import { OpenlandClient } from 'openland-api/spacex';
import { SequenceHolder } from '../internal/SequenceHolder';
import { Persistence, Transaction } from 'openland-engines/persistence/Persistence';
import { UpdatesApi } from '../internal/UpdatesApi';

export type SequencesHandler = (tx: Transaction, event: SequenceHolderEvent | { type: 'loaded' }) => Promise<void>;

export class SequencesEngine {
    readonly client: OpenlandClient;
    readonly persistence: Persistence;
    readonly users: UsersEngine;
    handler: SequencesHandler | null = null;

    private api: UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>;
    private started = false;
    private closed = false;
    private main: MainUpdatesSubscription<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>;
    private sequences = new Map<string, SequenceHolder>();

    constructor(client: OpenlandClient, persistence: Persistence, users: UsersEngine) {
        this.client = client;
        this.persistence = persistence;
        this.users = users;
        this.api = new UpdatesApiClient(this.client, this.preprocessor);
        this.main = new MainUpdatesSubscription(this.api, new UpdatesSubscriptionClient(this.client), this.preprocessor);
    }

    start() {
        if (this.closed) {
            return;
        }
        if (this.started) {
            return;
        }
        this.started = true;
        (async () => {

            // Read start state
            let state = await this.persistence.inTx(async (tx) => {
                return tx.read('updates.state');
            });

            // Start sequence
            this.main.start(state, (event) => {
                console.log('updates: ', event);

                this.persistence.inTx(async (tx) => {
                    if (event.type === 'inited') {
                        await this.onInited(tx);
                        tx.write('updates.state', event.vt);
                    } else if (event.type === 'start') {
                        await this.receiveSequence(tx, event.state, event.pts);
                        tx.write('updates.state', event.vt);
                    } else if (event.type === 'event') {
                        await this.receiveEvent(tx, event.id, event.pts, event.event);
                        tx.write('updates.state', event.vt);
                    } else if (event.type === 'diff') {
                        await this.receiveDiff(tx, event.fromPts, event.events, event.state);
                        tx.write('updates.state', event.vt);
                    }
                });
            });
        })();
    }

    stop() {
        if (!this.closed) {
            this.closed = true;
            this.main.stop();
        }
    }

    async invalidate(tx: Transaction, id: string) {
        let sequence = this.sequences.get(id);
        if (sequence) {
            await sequence.invalidate(tx);
        }
    }

    private async receiveSequence(tx: Transaction, state: ShortSequence, pts: number) {
        let sequence = this.sequences.get(state.id);
        if (sequence) {
            await sequence.onStateReceived(tx, { pts: pts, sequence: state });
        } else {
            sequence = await SequenceHolder.createFromState(tx, { sequence: state, pts: pts }, this.handleSequenceEvent, this.api);
            this.sequences.set(state.id, sequence);
        }
    }

    private async receiveDiff(tx: Transaction, fromPts: number, events: { pts: number, event: ShortUpdate }[], state: ShortSequence) {
        let sequence = this.sequences.get(state.id);
        if (!sequence) {
            sequence = await SequenceHolder.create(tx, state.id, this.handleSequenceEvent, this.api);
            this.sequences.set(state.id, sequence);
        }
        await sequence.onDiffReceived(tx, fromPts, events, state);
    }

    private async receiveEvent(tx: Transaction, id: string, pts: number, event: ShortUpdate) {
        let sequence = this.sequences.get(id);
        if (!sequence) {
            sequence = await SequenceHolder.create(tx, id, this.handleSequenceEvent, this.api);
            this.sequences.set(id, sequence);
        }
        await sequence.onUpdate(tx, pts, event);
    }

    private onInited = async (initTx: Transaction) => {

        //
        // Loading Initial Dialogs
        // 
        let start = Date.now();
        let completed = await initTx.readBoolean('dialogs.sync.completed');
        let cursor = await initTx.read('dialogs.sync.cursor');
        if (completed) {
            if (this.handler) {
                await this.handler(initTx, { type: 'loaded' });
            }
            return;
        }
        let next = this.client.queryGetInitialDialogs({ after: cursor });

        (async () => {
            completed = false;
            while (!completed) {
                console.info('Loading dialogs...');
                let dstart = Date.now();
                let dialogs = await next;
                console.info('Dialogs read in ' + (Date.now() - dstart) + ' ms');
                // Start next loading ASAP
                if (dialogs.syncUserChats.cursor) {
                    next = this.client.queryGetInitialDialogs({ after: dialogs.syncUserChats.cursor });
                }

                await this.preprocessor(dialogs);

                await this.persistence.inTx(async (tx) => {

                    // Apply sequences
                    console.info('Apply dialogs...');
                    await Promise.all(dialogs.syncUserChats.items.map((d) => this.receiveSequence(tx, d.sequence, d.pts)));

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

                    // Call handler
                    if (completed) {
                        if (this.handler) {
                            await this.handler(tx, { type: 'loaded' });
                        }
                    }
                });
            }

            // await this.counters.onDialogsLoaded();
            console.info('Dialogs loaded in ' + (Date.now() - start) + ' ms');
        })();
    }

    private handleSequenceEvent = async (tx: Transaction, event: SequenceHolderEvent) => {
        if (this.handler) {
            await this.handler(tx, event);
        }
    }

    private preprocessor = async (src: any) => {
        let missing = await this.users.loadMissingUsers(src);
        if (missing.length > 0) {
            let start = Date.now();
            let loadedUsers = (await backoff(async () => {
                return await this.client.queryUpdateUsers({ ids: missing });
            })).users;
            console.info('users loaded in ' + (Date.now() - start) + ' ms');
            await this.persistence.inTx(async (tx) => {
                await this.users.persistUsers(tx, loadedUsers.map((u) => ({ id: u.id, name: u.name, firstName: u.firstName, lastName: u.lastName, photo: u.photo })));
            });
        }
    }
}