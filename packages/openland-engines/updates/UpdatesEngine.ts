import { WatchUpdates_watchUpdates_UpdateSubscriptionEvent, GetState } from './../../openland-api/spacex.types';
import { GraphqlActiveSubscription } from '@openland/spacex';
import { backoff } from 'openland-y-utils/timer';
import { OpenlandClient } from 'openland-api/spacex';
import { WatchUpdates } from 'openland-api/spacex.types';

type Event = WatchUpdates_watchUpdates_UpdateSubscriptionEvent['event'];
type Sequence = WatchUpdates_watchUpdates_UpdateSubscriptionEvent['sequence'];

export class UpdatesEngine {
    readonly client: OpenlandClient;
    private closed = false;
    private subscription: GraphqlActiveSubscription<WatchUpdates> | null = null;

    constructor(client: OpenlandClient) {
        this.client = client;
        this.init();
    }

    private onStateLoaded(state: GetState) {
        console.warn(state);
        // TODO: Handle
    }

    private onSubscriptionStopped() {
        console.warn('subscription stopped');
        setTimeout(() => { this.startSubscription(); }, Math.floor(Math.random() * 1000 + 1000));
    }

    private onSubscriptionStarted(seq: number, state: string) {
        console.warn('subscription started: ' + seq);
        
        // TODO: Handle
    }

    private onSubscriptionEvent(seq: number, pts: number, event: Event, sequence: Sequence) {
        console.warn('subscription event: ' + seq);

        // TODO: Handle
    }

    private onSubscriptionCheckpoint(seq: number, state: string) {
        console.warn('subscription checkpoing: ' + seq);
        
        // TODO: Handle
    }

    //
    // Lifecycle
    //

    private async init() {
        // Start subscription to start receiving updates asap
        this.startSubscription();

        // Resolve initial state
        let state = await backoff(() => this.client.queryGetState({ fetchPolicy: 'network-only' }));
        if (this.closed) {
            return;
        }
        this.onStateLoaded(state);
    }

    close() {
        if (this.closed) {
            this.closed = true;
            if (this.subscription) {
                this.subscription.destroy();
                this.subscription = null;
            }
        }
    }

    private startSubscription() {
        if (this.closed) {
            return;
        }
        if (this.subscription) {
            throw Error('Already started');
        }
        this.subscription = this.client.subscribeWatchUpdates((e) => {
            if (e.type === 'stopped') {
                this.subscription = null;
                this.onSubscriptionStopped();
            } else if (e.type === 'message') {
                if (e.message.watchUpdates.__typename === 'UpdateSubscriptionStarted') {
                    this.onSubscriptionStarted(e.message.watchUpdates.seq, e.message.watchUpdates.state);
                } else if (e.message.watchUpdates.__typename === 'UpdateSubscriptionEvent') {
                    this.onSubscriptionEvent(e.message.watchUpdates.seq, e.message.watchUpdates.pts, e.message.watchUpdates.event, e.message.watchUpdates.sequence);
                } else if (e.message.watchUpdates.__typename === 'UpdateSubscriptionCheckpoint') {
                    this.onSubscriptionCheckpoint(e.message.watchUpdates.seq, e.message.watchUpdates.state);
                }
            }
        });
    }
}