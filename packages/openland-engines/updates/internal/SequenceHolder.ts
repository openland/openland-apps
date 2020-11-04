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
    | { type: 'start', sequence: UpdateSequenceState }
    | { type: 'restart', sequence: UpdateSequenceDiff }
    | { type: 'event', id: string, event: UpdateEvent };
export type SequenceHolderHandler = (tx: Transaction, event: SequenceHolderEvent) => Promise<void>;

export class SequenceHolder {

    static async create(tx: Transaction, id: string, handler: SequenceHolderHandler, api: UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>) {
        return await this.createImpl(tx, id, null, handler, api);
    }

    static async createFromState(tx: Transaction, state: { pts: number, sequence: UpdateSequenceState }, handler: SequenceHolderHandler, api: UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>) {
        return await this.createImpl(tx, state.sequence.id, state, handler, api);
    }

    private static async createImpl(tx: Transaction, id: string, state: { pts: number, sequence: UpdateSequenceState } | null, handler: SequenceHolderHandler, api: UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff>) {
        let pts = await tx.readInt(`updates.sequence.${id}.pts`);
        let invalidated = (await tx.readBoolean(`updates.sequence.${id}.invalidated`)) || false; // Default state is not invalidated

        // Mark sequence as invalidated once we get 
        if (pts === null || state !== null) {
            invalidated = true;
            await updateInvalidated(tx, id, true);
        }

        let res = new SequenceHolder(id, pts, invalidated, tx.persistence, handler, api);
        res.start(tx, state);
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
                await this.onStateReceived(tx, state);
            } else {
                this.downloadState(); // NOTE: No await
            }
        } else {
            this.doStart();
        }
    }

    private async downloadState() {
        let response = await this.api.getSequenceState(this.id);
        await this.persistence.inTx(async (tx) => {
            this.onStateReceived(tx, { pts: response.pts, sequence: response.state });
        });
    }

    async onStateReceived(tx: Transaction, state: { pts: number, sequence: UpdateSequenceState }) {
        if (this.loading) {

            // Call Handler
            this.handler(tx, { type: 'start', sequence: state.sequence });

            // Save pts and enforce invalidated flag
            this.startPts = state.pts;
            this.startInvalidated = true;
            updateInvalidated(tx, this.id, true);
            persistPts(tx, this.id, state.pts);

            // Start
            this.doStart();
        }
    }

    private doStart() {
        // Start sequence subscription
        console.log('updates: sequence: start subscription from ' + this.startPts);
        this.subscription = new SequenceSubscription(this.id, this.api, this.persistence);
        this.subscription.start(this.startPts!, this.startInvalidated, async (tx, event) => {
            if (event.type === 'event') {
                await this.onSequenceUpdate(tx, event.pts, event.event);
            } else if (event.type === 'restart') {
                await this.onSequenceRestart(tx, event.pts, event.sequence);
            } else if (event.type === 'invalidated') {
                await this.onSequenceInvalidated(tx);
            } else if (event.type === 'validated') {
                await this.onSequenceValidated(tx);
            }
        });

        // Mark as loaded if needed
        if (this.loading) {
            this.loading = false;
            this.loadingResolve();
        }
    }

    //
    // Handle sequence updates
    //

    private async onSequenceInvalidated(tx: Transaction) {
        await updateInvalidated(tx, this.id, false);
    }

    private async onSequenceValidated(tx: Transaction) {
        await updateInvalidated(tx, this.id, true);
    }

    private async onSequenceRestart(tx: Transaction, pts: number, sequence: UpdateSequenceDiff) {

        // Handle event
        this.handler(tx, { type: 'restart', sequence: sequence });

        // Persist pts
        persistPts(tx, this.id, pts);
    }

    private async onSequenceUpdate(tx: Transaction, pts: number, update: UpdateEvent) {

        // Handle event
        this.handler(tx, { type: 'event', id: this.id, event: update });

        // Persist pts
        persistPts(tx, this.id, pts);
    }

    //
    // Handle Main Updates
    //

    async onDiffReceived(tx: Transaction, fromPts: number, events: { pts: number, event: UpdateEvent }[], state: UpdateSequenceDiff) {
        if (this.loading) {
            await updateInvalidated(tx, this.id, true);

            // Forward to sequence
            (async () => {
                await this.loadingPromise;
                await this.persistence.inTx(async (tx2) => {
                    await this.subscription!.onDiff(tx2, fromPts, events, state);
                });
            })();
        } else {
            await this.subscription!.onDiff(tx, fromPts, events, state);
        }
    }

    async onUpdate(tx: Transaction, pts: number, update: UpdateEvent) {
        if (this.loading) {
            await updateInvalidated(tx, this.id, true);

            // Forward to sequence
            (async () => {
                await this.loadingPromise;
                await this.persistence.inTx(async (tx2) => {
                    await this.subscription!.onEvent(tx2, pts, update);
                });
            })();
        } else {
            await this.subscription!.onEvent(tx, pts, update);
        }
    }
}