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

    constructor(client: OpenlandClient, persistence: Persistence) {
        this.client = client;
        this.persistence = persistence;
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
                if (event.type === 'start') {
                    let sequence = this.sequences.get(event.state.id);
                    if (sequence) {
                        await sequence.onStateReceived(tx, { pts: event.pts, sequence: event.state });
                    } else {
                        sequence = await SequenceHolder.createFromState(tx, { sequence: event.state, pts: event.pts }, this.handleSequenceEvent, this.api);
                        this.sequences.set(event.state.id, sequence);
                    }
                } else if (event.type === 'event') {
                    let sequence = this.sequences.get(event.id);
                    if (!sequence) {
                        sequence = await SequenceHolder.create(tx, event.id, this.handleSequenceEvent, this.api);
                        this.sequences.set(event.id, sequence);
                    }
                    await sequence.onUpdate(tx, event.pts, event.event);
                } else if (event.type === 'diff') {
                    let sequence = this.sequences.get(event.state.id);
                    if (!sequence) {
                        sequence = await SequenceHolder.create(tx, event.state.id, this.handleSequenceEvent, this.api);
                        this.sequences.set(event.state.id, sequence);
                    }
                    await sequence.onDiffReceived(tx, event.fromPts, event.events, event.state);
                }
            });
        });
    }

    close() {
        if (!this.closed) {
            this.closed = true;
            this.main.stop();
        }
    }

    private handleSequenceEvent = async (tx: Transaction, event: SequenceHolderEvent) => {
        console.log('updates: sequence: ', event);
    }
}