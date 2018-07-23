import { delay } from 'openland-y-utils/timer';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';

export class SequenceWatcher {

    private started: boolean = true;
    private client: OpenApolloClient;
    private currentSeq: number | null;
    private observable: ZenObservable.Subscription | null = null;
    private connectionStatusUnsubscribe: (() => void) | null = null;
    private pending: any[] = [];
    private pendingTimeout: number | null = null;
    private query: any;
    private variables: any;
    private eventHandler: (event: any) => void | Promise<undefined> | number | Promise<number>;
    private seqHandler?: ((seq: number) => void) | null = null;
    private isHandling = false;
    private name: string;

    constructor(
        name: string,
        query: any,
        initialSeq: number | null,
        variables: any,
        handler: (event: any) => void | Promise<undefined> | number | Promise<number>,
        client: OpenApolloClient,
        seqHandler?: (seq: number) => void
    ) {
        this.name = name;
        this.query = query;
        this.currentSeq = initialSeq;
        this.variables = variables;
        this.client = client;
        this.eventHandler = handler;
        this.started = true;
        this.seqHandler = seqHandler;
        this.startSubsctiption();
        this.connectionStatusUnsubscribe = this.client.status.subscribe(this.handleConnectionChanged);
        if (this.seqHandler && this.currentSeq !== null) {
            this.seqHandler(this.currentSeq);
        }
    }

    destroy() {
        console.info('[' + this.name + ']: Destroy');
        this.started = false;
        this.connectionStatusUnsubscribe!!();
        this.stopSubscription();
    }

    handleExternalUpdate = async (update: any) => {
        // TODO: Implement
    }

    private startSubsctiption = () => {
        if (!this.started) {
            return;
        }
        if (!this.client.status.isConnected) {
            return;
        }
        this.stopSubscription();
        console.info('[' + this.name + ']: Start Subscription starting from #' + this.currentSeq);
        let subscription = this.client.client.subscribe({
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
            console.info('[' + this.name + ']: Stopping Subscription');
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
        console.info(e);
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
                    console.info('[' + this.name + ']: Replay: ' + seq);
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
        if (!this.started) {
            return;
        }

        try {
            if (update.errors && update.errors.length > 0) {
                throw update.errors;
            }
            let event = update.data.event;
            let seq = event.seq as number;

            // Too old
            if (this.currentSeq !== null && seq <= this.currentSeq) {
                console.info('[' + this.name + ']: Too old seq #' + seq);
                return;
            }

            // Too new: invalidate
            if (this.currentSeq !== null && seq > this.currentSeq + 1) {
                console.info('[' + this.name + ']: Too new seq: ' + seq);

                // Too large
                if (seq > this.currentSeq + 2 && !this.isHandling) {
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

            // Push to pending if handling
            if (this.isHandling) {
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

            console.info('[' + this.name + ']: Next update #' + seq);

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
                        if (this.seqHandler) {
                            this.seqHandler(this.currentSeq);
                        }
                    } else {
                        this.currentSeq = seq;
                        if (this.seqHandler) {
                            this.seqHandler(this.currentSeq);
                        }
                    }
                } catch (e) {
                    console.warn('[' + this.name + ']: Error');
                    console.warn(e);
                    console.info('Safe delay');
                    await delay(1000);
                    console.info('Safe delay: completed');
                    this.isHandling = false;
                    this.startSubsctiption();
                }
                this.tryFlushPending(false);
            })();
        } catch (e) {
            console.warn('[' + this.name + ']: Error');
            console.warn(e);
            if (!this.isHandling) {
                this.isHandling = true;
                (async () => {
                    // Small delay
                    console.info('Safe delay');
                    await delay(1000);
                    console.info('Safe delay: completed');
                    // Restarting
                    this.isHandling = false;
                    this.startSubsctiption();
                })();
            }
        }
    }

    private handleConnectionChanged = (isConnected: boolean) => {
        if (!this.started) {
            console.warn('[' + this.name + ']: Connection state handler called after destruction');
            return;
        }
        if (isConnected) {
            console.info('[' + this.name + ']: Connected');
            if (!this.observable) {
                this.startSubsctiption();
            }
        } else {
            console.info('[' + this.name + ']: Disconnected');
            this.stopSubscription();
        }
    }
}