import { Observable } from "apollo-link";
import { DirectApollolClient } from './DirectApolloClient';
import { GraphqlActiveSubscription } from 'openland-graphql/GraphqlClient';

export class DirectApolloSubscription<TSubscription, TVars> implements GraphqlActiveSubscription<TSubscription, TVars> {
    private readonly client: DirectApollolClient;
    private source?: Observable<any>;
    private sourceSubscription?: ZenObservable.Subscription;
    private statusSubscription: () => void;
    private subscription: any;
    private vars: any;
    private queue: any[] = [];
    private pending?: (src: any) => void;
    private stopped = false;

    constructor(client: DirectApollolClient, subscription: any, vars?: any) {
        this.client = client;
        this.vars = vars;
        this.subscription = subscription;

        this.statusSubscription = client.client.status.subscribe((isConnected) => {
            if (isConnected) {
                this.handleConnected();
            } else {
                this.handleDisconnected();
            }
        });
        if (client.client.status.isConnected) {
            this.handleConnected();
        } else {
            this.handleDisconnected();
        }
    }

    private tryStart = () => {
        if (this.stopped) {
            return;
        }
        if (this.source) {
            return;
        }
        console.log('trying to start');
        this.source = this.client.client.client.subscribe({ query: this.subscription, variables: this.vars, fetchPolicy: 'no-cache' });
        this.sourceSubscription = this.source.subscribe({
            next: this.handleNext,
            error: this.handleError,
            complete: this.handleError
        });
    }

    private tryStop = () => {
        if (!this.source) {
            return;
        }
        console.log('trying to stop');
        try {
            if (!this.sourceSubscription!.closed) {
                this.sourceSubscription!.unsubscribe();
            }
        } catch (e) {
            // Ignore exception since this method will throw if connection already closed
        }
        this.sourceSubscription = undefined;
        this.source = undefined;
    }

    private handleConnected = () => {
        this.tryStart();
    }

    private handleDisconnected = () => {
        this.tryStop();
    }

    private handleNext = (src: any) => {
        if (this.pending) {
            if (this.queue.length > 0) {
                this.queue.push(src.data);
            } else {
                let p = this.pending;
                this.pending = undefined;
                p(src.data);
            }
        } else {
            this.queue.push(src.data);
        }
    }

    private handleError = (err?: any) => {
        console.log('error');
        console.log(err);
        this.tryStop();
        this.tryStart();
    }

    get = async () => {
        if (this.queue.length > 0) {
            return this.queue.shift();
        } else {
            if (this.pending) {
                throw Error('Multiple subscribers are not supported yet')
            }
            return await new Promise<any>((resolver) => this.pending = resolver);
        }
    }

    updateVariables = (src?: any) => {
        this.vars = src;
    }

    destroy = () => {
        if (this.stopped) {
            return;
        }
        this.stopped = true
        this.statusSubscription();
        this.tryStop();
    }
}