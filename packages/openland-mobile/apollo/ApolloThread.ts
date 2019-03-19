import { self } from 'react-native-threads';
import { Request, Response } from './api/Request';
import { OpenApolloClient, buildClient } from 'openland-y-graphql/apolloClient';
import { Observable } from 'apollo-link';

var client!: OpenApolloClient;

function postMessage(msg: Response) {
    self.postMessage(JSON.stringify(msg));
}

class ApolloSubscription {
    private readonly id: string;
    private source?: Observable<any>;
    private sourceSubscription?: ZenObservable.Subscription;
    private statusSubscription: () => void;
    private subscription: any;
    private vars: any;
    private stopped = false;

    constructor(id: string, subscription: any, vars?: any) {
        this.vars = vars;
        this.subscription = subscription;
        this.id = id;

        this.statusSubscription = client.status.subscribe((isConnected) => {
            if (isConnected) {
                this.handleConnected();
            } else {
                this.handleDisconnected();
            }
        });
        if (client.status.isConnected) {
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
        this.source = client.client.subscribe({ query: this.subscription, variables: this.vars });
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
        postMessage({ type: 'result', id: this.id, data: src.data });
    }

    private handleError = () => {
        this.tryStop();
        this.tryStart();
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

const subscriptions = new Map<string, ApolloSubscription>();

self.onmessage = (message: string) => {
    let msg = JSON.parse(message) as Request;
    if (msg.type === 'init') {
        if (!client) {
            client = buildClient({
                token: msg.token,
                endpoint: 'https://api.openland.com/api',
                wsEndpoint: 'wss://api.openland.com/api'
            });
        }
    } else if (msg.type === 'query' || msg.type === 'refetch') {
        client.client.query({ query: msg.body, variables: msg.variables, fetchPolicy: msg.type === 'refetch' ? 'network-only' : 'cache-first' })
            .then((v) => {
                if (v.errors && v.errors.length > 0) {
                    postMessage({ id: msg.id, type: 'error', data: v.errors });
                } else {
                    postMessage({ id: msg.id, type: 'result', data: v.data });
                }
            })
            .catch((v) => {
                postMessage({ id: msg.id, type: 'error', data: v.message });
            });
    } else if (msg.type === 'read') {
        let q = null;
        try {
            // https://github.com/apollographql/apollo-feature-requests/issues/1
            q = client.client.readQuery({ query: msg.body, variables: msg.variables });
        } catch (e) {
            //
        }
        postMessage({ id: msg.id, type: 'result', data: q });
    } else if (msg.type === 'write') {
        client.client.writeQuery({ query: msg.body, variables: msg.variables, data: msg.data });
        postMessage({ id: msg.id, type: 'result', data: msg.data });
    } else if (msg.type === 'mutate') {
        client.client.mutate({ mutation: msg.body, variables: msg.variables })
            .then((v) => {
                if (v.errors && v.errors.length > 0) {
                    postMessage({ id: msg.id, type: 'error', data: v.errors });
                } else {
                    postMessage({ id: msg.id, type: 'result', data: v.data });
                }
            })
            .catch((v) => {
                postMessage({ id: msg.id, type: 'error', data: v.message });
            });
    } else if (msg.type === 'watch') {
        let r = client.client.watchQuery({ query: msg.body, variables: msg.variables })
        r.subscribe({
            next: (v) => {
                postMessage({ id: msg.id, type: 'result', data: v.data });
            },
            error: (v) => {
                postMessage({ id: msg.id, type: 'error', data: v });
            },
            complete: () => {
                // console.log('complete');
            }
        });
        // let cr = r.currentResult();
        // if (!cr.partial) {
        //     if (cr.errors && cr.errors.length > 0) {
        //         postMessage({ id: msg.id, type: 'error', data: cr.errors });
        //     } else {
        //         postMessage({ id: msg.id, type: 'result', data: cr.data });
        //     }
        // }
    } else if (msg.type === 'subscribe') {
        let s = new ApolloSubscription(msg.id, msg.body, msg.variables);
        subscriptions.set(msg.id, s);
    } else if (msg.type === 'subscribe-destroy') {
        if (subscriptions.has(msg.id)) {
            let s = subscriptions.get(msg.id)!;
            subscriptions.delete(msg.id);
            s.destroy();
        }
    } else if (msg.type === 'subscribe-update') {
        if (subscriptions.has(msg.id)) {
            let s = subscriptions.get(msg.id)!;
            s.updateVariables(msg.variables);
        }
    }
};