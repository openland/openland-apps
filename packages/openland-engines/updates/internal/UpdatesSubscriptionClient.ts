import { UpdatesSubscriptionHandler, UpdatesSubscription } from './UpdatesSubscription';
import { GraphqlActiveSubscription } from '@openland/spacex';
import { OpenlandClient } from 'openland-api/spacex';
import { WatchUpdates } from 'openland-api/spacex.types';
import { UpdateEvent } from './../Types';

export class UpdatesSubscriptionClient implements UpdatesSubscription<UpdateEvent> {

    private client: OpenlandClient;
    private subscription: GraphqlActiveSubscription<WatchUpdates> | null = null;
    private handler: UpdatesSubscriptionHandler<UpdateEvent> | null = null;

    constructor(client: OpenlandClient) {
        this.client = client;
    }

    start = (handler: UpdatesSubscriptionHandler<UpdateEvent>) => {
        if (this.handler) {
            throw Error('Already started');
        }
        this.handler = handler;
        this.startSubscription();
    }

    stop() {
        if (!this.handler) {
            throw Error('Already stopped');
        }
        this.handler = null;
        if (this.subscription) {
            this.subscription.destroy();
            this.subscription = null;
        }
    }

    private startSubscription() {
        if (this.subscription !== null) {
            throw Error('Invalid state');
        }
        if (!this.handler) {
            return;
        }
        this.subscription = this.client.subscribeWatchUpdates((e) => {
            if (e.type === 'stopped') {
                this.subscription = null;
                setTimeout(() => { this.startSubscription(); }, Math.floor(Math.random() * 1000 + 1000));
                this.handler!({ type: 'stopped' });
            } else if (e.type === 'message') {
                if (e.message.watchUpdates.__typename === 'UpdateSubscriptionStarted') {
                    const update = e.message.watchUpdates;
                    this.handler!({ type: 'started', seq: update.seq });
                } else if (e.message.watchUpdates.__typename === 'UpdateSubscriptionEvent') {
                    const update = e.message.watchUpdates;
                    this.handler!({ type: 'event', seq: update.seq, event: update.event, pts: update.pts, sequence: update.sequence.id });
                }
            }
        });
    }
}