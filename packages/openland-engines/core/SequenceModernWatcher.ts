import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { SequenceHandler } from './SequenceHandler';

export class SequenceModernWatcher {
    readonly name: string;
    readonly client: OpenApolloClient;
    private readonly handler: (src: any) => void;
    private readonly seqHandler?: (seq: number) => void;
    private readonly query: any;
    private readonly sequenceHandler: SequenceHandler;
    private currentState: string | null;
    private observable: ZenObservable.Subscription | null = null;

    constructor(name: string, query: any, client: OpenApolloClient, handler: (src: any) => void | Promise<void>, seqHandler?: (seq: number) => void) {
        this.name = name;
        this.query = query;
        this.handler = handler;
        this.seqHandler = seqHandler;
        this.client = client;
        this.currentState = null;
        this.sequenceHandler = new SequenceHandler(this.handleInternal);
        this.client.status.subscribe(this.handleConnectionChanged);
        this.startSubsctiption();
    }

    private handleConnectionChanged = (isConnected: boolean) => {
        // if (!this.started) {
        //     console.warn('[' + this.name + ']: Connection state handler called after destruction');
        //     return;
        // }
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

    private startSubsctiption = () => {
        if (!this.client.status.isConnected) {
            return;
        }
        this.stopSubscription();
        if (this.currentState) {
            console.info('[' + this.name + ']: Start Subscription starting from #' + this.currentState);
        } else {
            console.info('[' + this.name + ']: Start Subscription starting from empty state');
        }
        let subscription = this.client.client.subscribe({
            query: this.query,
            variables: { fromState: this.currentState }
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
        console.info(e);
        this.startSubsctiption();
    }

    private handleUpdate = (update: any) => {
        if (update.errors && update.errors.length > 0) {
            throw update.errors;
        }

        let event = update.data.event;
        if (event.fromSeq) {
            // Do batch updates
            this.currentState = event.state;
            for (let u of event.updates) {
                this.sequenceHandler.push(u);
            }
            if (this.seqHandler) {
                this.seqHandler(event.seq);
            }
        } else {
            // Do single update
            this.currentState = event.state;
            this.sequenceHandler.push(event.update);
            if (this.seqHandler) {
                this.seqHandler(event.seq);
            }
        }
    }

    private handleInternal = async (update: any) => {
        await this.handler(update);
    }
}