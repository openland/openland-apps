import * as React from 'react';
import { GraphqlClient, GraphqlQuery, GraphqlMutation, GraphqlActiveSubscription } from './GraphqlClient';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { Observable } from 'apollo-link';
import { keyFromObject } from './utils/keyFromObject';

class ApolloSubscription implements GraphqlActiveSubscription {
    private readonly client: ApolloGraphqlClient;
    private source?: Observable<any>;
    private sourceSubscription?: ZenObservable.Subscription;
    private statusSubscription: () => void;
    private subscription: any;
    private vars: any;
    private queue: any[] = [];
    private pending?: (src: any) => void;
    private stopped = false;

    constructor(client: ApolloGraphqlClient, subscription: any, vars?: any) {
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
        this.source = this.client.client.client.subscribe({ query: this.subscription, variables: this.vars });
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
        if (this.pending) {
            if (this.queue.length > 0) {
                this.queue.push(src);
            } else {
                let p = this.pending;
                this.pending = undefined;
                p(src);
            }
        } else {
            this.queue.push(src);
        }
    }

    private handleError = () => {
        this.tryStop();
        this.tryStart();
    }

    async get() {
        if (this.queue.length > 0) {
            return this.queue.shift();
        } else {
            if (this.pending) {
                throw Error('Multiple subscribers are not supported yet')
            }
            return await new Promise<any>((resolver) => this.pending = resolver);
        }
    }

    updateVariables(src?: any) {
        this.vars = src;
    }

    destroy() {
        if (this.stopped) {
            return;
        }
        this.stopped = true
        this.statusSubscription();
        this.tryStop();
    }
}

export class ApolloGraphqlClient implements GraphqlClient {

    readonly client: OpenApolloClient;

    constructor(client: OpenApolloClient) {
        this.client = client;
    }

    async query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        let res = await this.client.client.query<TQuery, TVars>({ query: query.document, variables: vars });
        if (res.errors && res.errors.length > 0) {
            throw Error();
        }
        return res.data
    }

    async refetch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        let res = await this.client.client.query<TQuery, TVars>({ query: query.document, variables: vars, fetchPolicy: 'network-only' });
        if (res.errors && res.errors.length > 0) {
            throw Error();
        }
        return res.data
    }

    async updateQuery<TQuery, TVars>(updater: (data: TQuery) => TQuery | null, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<boolean> {
        let r = this.client.client.readQuery<TQuery>({ query: query.document, variables: vars });
        if (r) {
            let udpated = updater(r);
            if (udpated) {
                this.client.client.writeQuery<TQuery>({ query: query.document, variables: vars, data: udpated });
                return true;
            }
        }
        return false;
    }

    async readQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery | null> {
        try {
            return this.client.client.readQuery<TQuery>({ query: query.document, variables: vars })
        } catch (e) {
            return null;
        }
    }

    useQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery {

        // Build and wait for initial data
        const observableQuery = React.useMemo(
            () => this.client.client.watchQuery({ query: query.document, variables: vars }),
            [query.document, keyFromObject(vars)]
        );

        // Subsctibe for latest values
        const [responseId, setResponseId] = React.useState(0);
        const currentResult = React.useMemo(() => {
            return observableQuery.currentResult();
        }, [responseId, observableQuery]);
        React.useEffect(() => {
            const invalidateCurrentResult = () => setResponseId(x => x + 1);
            let subs = observableQuery.subscribe(invalidateCurrentResult, invalidateCurrentResult);
            return () => {
                subs.unsubscribe();
            }
        }, [observableQuery]);

        if (currentResult.errors && currentResult.errors.length > 0) {
            throw Error();
        }

        if (currentResult.loading || currentResult.partial) {
            throw observableQuery.result();
        }

        return currentResult.data as TQuery
    }

    readQuerySync<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery | null {
        try {
            return this.client.client.readQuery<TQuery>({ query: query.document, variables: vars })
        } catch (e) {
            return null;
        }
    }

    subscribe(subscription: any, vars?: any): GraphqlActiveSubscription {
        return new ApolloSubscription(this, subscription, vars);
    }

    async mutate<TMutation, TVars>(mutation: GraphqlMutation<TMutation, TVars>, vars?: TVars): Promise<TMutation> {
        let res = await this.client.client.mutate<TMutation, TVars>({ mutation: mutation.document, variables: vars });
        if (res.errors && res.errors.length > 0) {
            throw Error();
        }
        return res.data as TMutation;
    }
}