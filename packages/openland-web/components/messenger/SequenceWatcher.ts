import { ConnectionStatus } from 'openland-x-graphql/apolloClient';
import { ApolloClient } from 'apollo-client';

export class SequenceWatcher {

    private started: boolean = true;
    private client: ApolloClient<{}>;
    private currentSeq: number | null;
    private observable: ZenObservable.Subscription | null = null;
    private connectionStatusUnsubscribe: (() => void) | null = null;
    private pending: any[] = [];
    private pendingTimeout: number | null = null;
    private query: any;
    private variables: any;
    private eventHandler: (event: any) => void | Promise<undefined> | number | Promise<number>;
    private isHandling = false;

    constructor(
        query: any,
        initialSeq: number | null,
        variables: any,
        handler: (event: any) => void | Promise<undefined> | number | Promise<number>,
        client: ApolloClient<{}>
    ) {
        this.query = query;
        this.currentSeq = initialSeq;
        this.variables = variables;
        this.client = client;
        this.eventHandler = handler;
        this.started = true;
        this.startSubsctiption();
        this.connectionStatusUnsubscribe = ConnectionStatus.subscribe(this.handleConnectionChanged);
    }

    destroy() {
        this.started = false;
        this.connectionStatusUnsubscribe!!();
        this.stopSubscription();
    }

    private startSubsctiption = () => {
        if (!this.started) {
            return;
        }
        if (!ConnectionStatus.isConnected) {
            return;
        }
        this.stopSubscription();
        console.warn('Start Subscription starting from #' + this.currentSeq);
        let subscription = this.client.subscribe({
            query: this.query,
            variables: { ...this.variables, seq: this.currentSeq }
        });
        this.observable = subscription.subscribe({
            error: this.handleError,
            next: this.handleUpdate
        });
    }

    private stopSubscription = () => {
        if (this.observable) {
            console.warn('Stopping Subscription');
            try {
                this.observable.unsubscribe();
            } catch (e) {
                // Ignore exception since this method will throw if connection already closed
            }
            this.observable = null;
        }
    }

    private handleError = (e: any) => {
        if (!this.started) {
            return;
        }
        console.warn(e);
        this.startSubsctiption();
    }

    private tryFlushPending = (timeouted: boolean) => {
        if (this.pending.length > 0) {
            for (let update of this.pending) {
                let event = update.data.event;
                let seq = event.seq as number;
                if (seq === this.currentSeq!! + 1) {
                    // Our current update
                    let index = this.pending.indexOf(update);
                    this.pending = this.pending.splice(index, 1);
                    console.warn('Replay: ' + seq);
                    this.handleUpdate(update);
                    return;
                } else if (seq <= this.currentSeq!!) {
                    // Too old remove
                    let index = this.pending.indexOf(update);
                    this.pending = this.pending.splice(index, 1);
                }
            }

            if (timeouted && this.pending.length > 0) {
                // Reset pending storage in case if there will be some garbage events
                this.pending = [];
                // Subscription restart if updates not found
                if (timeouted && this.started && !this.isHandling) {
                    this.startSubsctiption();
                }
            }
        }
    }

    private handleUpdate = (update: any) => {
        console.warn(update);
        if (!this.started) {
            return;
        }
        let event = update.data.event;
        let seq = event.seq as number;

        // Too old
        if (this.currentSeq !== null && seq <= this.currentSeq) {
            console.warn('Too old seq #' + seq);
            return;
        }

        // Too new: invalidate
        if (this.currentSeq !== null && seq > this.currentSeq + 1) {
            console.warn('Too new seq: ' + seq);

            // Too large
            if (seq > this.currentSeq + 2) {
                this.startSubsctiption();
            } else {
                this.pending.push(update);
                if (!this.pendingTimeout) {
                    this.pendingTimeout = window.setTimeout(
                        () => {
                            this.pendingTimeout = null;
                            this.tryFlushPending(true);
                        },
                        3000);
                }

            }
            return;
        }

        // Reset Pending Flush
        if (this.pendingTimeout) {
            window.clearTimeout(this.pendingTimeout);
            this.pendingTimeout = null;
        }

        console.warn('Next update #' + seq);

        this.isHandling = true;
        (async () => {
            try {
                let res = await this.eventHandler(event);
                this.isHandling = false;
                if (typeof res === 'number') {
                    if (this.currentSeq !== res + 1) {
                        this.tryFlushPending(false);
                        this.startSubsctiption();
                    }
                    this.currentSeq = res;
                } else {
                    this.currentSeq = seq;
                }
            } catch (e) {
                // Just Restart
                this.isHandling = false;
                this.startSubsctiption();
            }
            this.tryFlushPending(false);
        })();
    }

    private handleConnectionChanged = (isConnected: boolean) => {
        if (!this.started) {
            return;
        }
        if (isConnected) {
            if (!this.observable) {
                this.startSubsctiption();
            }
        } else {
            this.stopSubscription();
        }
    }
}