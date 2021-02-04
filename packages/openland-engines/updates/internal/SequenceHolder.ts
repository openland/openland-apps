import { SequenceSubscription } from './SequenceSubscription';
import { Transaction } from './../../persistence/Persistence';
import { UpdateSequenceState, UpdateEvent, UpdateSequenceDiff } from './../Types';
import { Persistence } from 'openland-engines/persistence/Persistence';
import { UpdatesApi } from './UpdatesApi';

async function updateInvalidated(tx: Transaction, id: string, invalidated: boolean) {
    let existingInvalidated = await tx.readBoolean(`updates.sequence.${id}.invalidated`);
    if (existingInvalidated !== invalidated) {
        if (invalidated) {
            let ex = await tx.readJson<{ ids: string[] }>(`updates.sequence.invalidated`);
            tx.writeBoolean(`updates.sequence.${id}.invalidated`, true);
            if (!ex) {
                tx.writeJson(`updates.sequence.invalidated`, { ids: [id] });
            } else {
                tx.writeJson(`updates.sequence.invalidated`, { ids: [...ex.ids.filter((i) => i !== id), id] });
            }
        } else {
            let ex = await tx.readJson<{ ids: string[] }>(`updates.sequence.invalidated`);
            tx.writeBoolean(`updates.sequence.${id}.invalidated`, false);
            if (ex) {
                tx.writeJson(`updates.sequence.invalidated`, { ids: ex.ids.filter((i) => i !== id) });
            }
        }
    }
}

function persistPts(tx: Transaction, id: string, pts: number) {
    tx.writeInt(`updates.sequence.${id}.pts`, pts);
}

export type SequenceHolderEvent =
    | { type: 'restart', pts: number, sequence: UpdateSequenceDiff, lost: boolean }
    | { type: 'event', pts: number, id: string, event: UpdateEvent };
export type SequenceHolderHandler = (tx: Transaction, event: SequenceHolderEvent) => Promise<void>;

export class SequenceHolder {

    static async create(tx: Transaction, id: string, handler: SequenceHolderHandler, api: UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>) {
        return await this.createImpl(tx, id, null, handler, api);
    }

    static async createFromState(tx: Transaction, state: { pts: number, sequence: UpdateSequenceState }, handler: SequenceHolderHandler, api: UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>) {
        return await this.createImpl(tx, state.sequence.id, state, handler, api);
    }

    private static async createImpl(tx: Transaction, id: string, state: { pts: number, sequence: UpdateSequenceState } | null, handler: SequenceHolderHandler, api: UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>) {
        // console.log('updates: sequence: ' + id + ': creating');
        let pts = await tx.readInt(`updates.sequence.${id}.pts`);
        let invalidated = (await tx.readBoolean(`updates.sequence.${id}.invalidated`)) || false; // Default state is not invalidated

        // Mark sequence as invalidated once we get 
        if (pts === null || state !== null) {
            invalidated = true;
            await updateInvalidated(tx, id, true);
        }

        let res = new SequenceHolder(id, pts, invalidated, tx.persistence, handler, api);
        await res.start(tx, state);
        return res;
    }

    readonly id: string;
    private handler: SequenceHolderHandler;
    private persistence: Persistence;
    private api: UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>;
    private startPts: number | null = null;
    private startInvalidated: boolean;
    private loading = true;
    private loadingPromise: Promise<void>;
    private loadingResolve!: () => void;
    private loadingPending: ((tx: Transaction) => Promise<void>)[] = [];
    private subscription: SequenceSubscription | null = null;

    private constructor(
        id: string,
        pts: number | null,
        invalidated: boolean,
        persistence: Persistence,
        handler: SequenceHolderHandler,
        api: UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>
    ) {
        this.id = id;
        this.startPts = pts;
        this.startInvalidated = invalidated;
        this.api = api;
        this.handler = handler;
        this.persistence = persistence;
        this.loading = pts === null;
        if (pts !== null) {
            this.loadingPromise = Promise.resolve();
        } else {
            this.loadingPromise = new Promise((resolve) => this.loadingResolve = resolve);
        }
    }

    get awaitLoading() {
        return this.loadingPromise;
    }

    /**
     * Starting Sequence Holder from specific known state or not
     */
    private async start(tx: Transaction, state: { pts: number, sequence: UpdateSequenceState } | null) {
        if (this.loading) {
            if (state) {
                // console.log('updates: sequence: ' + this.id + ': loading from initial state');
                await this.onStateReceived(tx, state);
            } else {
                // console.log('updates: sequence: ' + this.id + ': download state');
                this.downloadState(); // NOTE: No await
            }
        } else {
            // console.log('updates: sequence: ' + this.id + ': recover');
            await this.doStart(tx);
        }
    }

    private async downloadState() {
        let response = await this.api.getSequenceState(this.id);
        await this.persistence.inTx(async (tx) => {
            await this.onStateReceived(tx, { pts: response.pts, sequence: response.state });
        });
    }

    async onStateReceived(tx: Transaction, state: { pts: number, sequence: UpdateSequenceState }) {
        if (this.loading) {

            // Call Handler
            await this.handler(tx, { type: 'restart', pts: state.pts, sequence: state.sequence, lost: true });

            // Save pts and enforce invalidated flag
            this.startPts = state.pts;
            this.startInvalidated = false;
            await updateInvalidated(tx, this.id, false);
            persistPts(tx, this.id, state.pts);

            // Start
            await this.doStart(tx);
        }
    }

    private async doStart(tx: Transaction) {
        // Start sequence subscription
        // console.log('updates: sequence: ' + this.id + ': start sequence from ' + this.startPts);
        this.subscription = new SequenceSubscription(this.id, this.api, this.persistence);
        this.subscription.start(this.startPts!, this.startInvalidated, async (tx2, event) => {
            if (event.type === 'event') {
                await this.onSequenceUpdate(tx2, event.pts, event.event);
            } else if (event.type === 'restart') {
                await this.onSequenceRestart(tx2, event.pts, event.sequence, event.lost);
            } else if (event.type === 'invalidated') {
                await this.onSequenceInvalidated(tx2);
            } else if (event.type === 'validated') {
                await this.onSequenceValidated(tx2);
            }
        });

        // Mark as loaded if needed
        if (this.loading) {
            this.loading = false;
            this.loadingResolve();

            // Ovewrite invalidated state because it could be overwritten
            // by pending operations
            if (this.startInvalidated) {
                await updateInvalidated(tx, this.id, true);
            } else {
                await updateInvalidated(tx, this.id, false);
            }

            // Apply pending
            for (let p of this.loadingPending) {
                await p(tx);
            }
            this.loadingPending = [];
        }

        // console.log('updates: sequence: ' + this.id + ': loaded');
    }

    //
    // Handle sequence updates
    //

    private async onSequenceInvalidated(tx: Transaction) {
        // console.log('updates: sequence: ' + this.id + ': invalidated');
        await updateInvalidated(tx, this.id, false);
    }

    private async onSequenceValidated(tx: Transaction) {
        // console.log('updates: sequence: ' + this.id + ': validated');
        await updateInvalidated(tx, this.id, true);
    }

    private async onSequenceRestart(tx: Transaction, pts: number, sequence: UpdateSequenceDiff, lost: boolean) {

        // Handle event
        await this.handler(tx, { type: 'restart', pts, sequence, lost });

        // Persist pts
        persistPts(tx, this.id, pts);
    }

    private async onSequenceUpdate(tx: Transaction, pts: number, update: UpdateEvent) {

        // Handle event
        await this.handler(tx, { type: 'event', id: this.id, pts, event: update });

        // Persist pts
        persistPts(tx, this.id, pts);
    }

    //
    // Handle Main Updates
    //

    async onDiffReceived(tx: Transaction, fromPts: number, events: { pts: number, event: UpdateEvent }[], state: UpdateSequenceDiff) {
        let toPts = events[0].pts;
        for (let e of events) {
            toPts = Math.max(toPts, e.pts);
        }
        if (this.loading) {
            await updateInvalidated(tx, this.id, true);
            this.loadingPending.push(async (tx2) => {
                await this.subscription!.onDiff(tx2, fromPts, toPts, events, state);
            });
        } else {
            await this.subscription!.onDiff(tx, fromPts, toPts, events, state);
        }
    }

    async onUpdate(tx: Transaction, pts: number, update: UpdateEvent) {
        if (this.loading) {
            await updateInvalidated(tx, this.id, true);
            this.loadingPending.push(async (tx2) => {
                await this.subscription!.onEvent(tx2, pts, update);
            });
        } else {
            await this.subscription!.onEvent(tx, pts, update);
        }
    }

    async invalidate(tx: Transaction) {
        if (!this.loading) {
            await updateInvalidated(tx, this.id, true);
            await this.subscription!.invalidate(tx);
        } else {
            this.loadingPending.push(async (tx2) => {
                await updateInvalidated(tx2, this.id, true);
                await this.subscription!.invalidate(tx2);
            });
        }
    }
}