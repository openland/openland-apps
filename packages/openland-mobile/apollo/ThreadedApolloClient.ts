import * as React from 'react';
import { GraphqlClient, GraphqlActiveSubscription, GraphqlQuery, GraphqlMutation, GraphqlSubscription, GraphqlQueryWatch } from 'openland-graphql/GraphqlClient';
import { Thread } from 'react-native-threads';
import { Request, Response } from './api/Request';
import { randomKey } from 'openland-mobile/utils/randomKey';
import { BridgedClient } from './BridgedClient';

export class WorkerApolloClient implements GraphqlClient {

    private readonly thread: Thread;

    private client = new BridgedClient({
        postMutation: (id, mutation, vars) => {
            this.postMessage({ type: 'mutate', id, body: mutation.document, variables: vars })
        },
        postQuery: (id, query, vars) => {
            this.postMessage({ type: 'watch', id, body: query.document, variables: vars })
        },
        postSubscribe: (id, mutation, vars) => {
            this.postMessage({ type: 'subscribe', id, body: mutation.document, variables: vars })
        },
        postSubscribeUpdate: (id, vars) => {
            this.postMessage({ type: 'subscribe-update', id, variables: vars })
        },
        postUnsubscribe: (id) => {
            this.postMessage({ type: 'subscribe-destroy', id })
        },
        postRefetchQuery: (id, query, vars) => {
            this.postMessage({ type: 'refetch', id, body: query.document, variables: vars })
        },
        postReadQuery: (id, query, vars) => {
            this.postMessage({ type: 'read', id, body: query.document, variables: vars })
        },
        postWriteQuery: (id, data, query, vars) => {
            this.postMessage({ type: 'write', id, body: query.document, variables: vars, data })
        }
    });

    constructor(token?: string) {
        this.thread = new Thread('./index.thread.js');
        this.thread.onmessage = (msg) => {
            this.handleMessage(JSON.parse(msg) as Response);
        }
        this.postMessage({ type: 'init', token: token, id: randomKey() });
    }

    private handleMessage(msg: Response) {
        if (msg.type === 'result') {
            this.client.operationUpdated(msg.id, msg.data);
        } else if (msg.type === 'error') {
            this.client.operationFailed(msg.id, msg.data);
        }
    }

    private postMessage(request: Request) {
        this.thread.postMessage(JSON.stringify(request));
    }

    query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        console.log('query');
        let id = this.client.registerQuery(query, vars);
        return this.client.getOperation(id);
    }

    queryWatch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): GraphqlQueryWatch<TQuery> {
        let id = this.client.registerQuery(query, vars);
        return this.client.watchQuery(id);
    }

    refetch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        let id = this.client.registerRefetch(query, vars);
        return this.client.getOperation(id);
    }
    mutate<TMutation, TVars>(mutation: GraphqlMutation<TMutation, TVars>, vars?: TVars): Promise<TMutation> {
        let id = this.client.registerMutation(mutation, vars);
        return this.client.getOperation(id);
    }

    subscribe<TSubscription, TVars>(subscription: GraphqlSubscription<TSubscription, TVars>, vars?: TVars): GraphqlActiveSubscription<TSubscription, TVars> {
        return this.client.subscribe(subscription, vars);
    }

    useQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery {
        let id = this.client.registerQuery(query, vars);
        return this.client.useOperationSuspense(id);
    }

    useWithoutLoaderQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery | null {
        let id = this.client.registerQuery(query, vars);
        return this.client.useOperation(id);
    }

    async updateQuery<TQuery, TVars>(updater: (data: TQuery) => TQuery | null, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<boolean> {
        let r = await this.readQuery(query, vars);
        if (r) {
            let udpated = updater(r);
            if (udpated) {
                await this.writeQuery<TQuery, TVars>(r, query, vars);
                return true;
            }
        }
        return false;
    }
    async readQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery | null> {
        let id = this.client.registerReadQuery(query, vars);
        return this.client.getOperation(id);
    }

    async writeQuery<TQuery, TVars>(data: any, query: GraphqlQuery<TQuery, TVars>, vars?: TVars) {
        let id = this.client.registerWriteQuery(data, query, vars);
        return this.client.getOperation(id);
    }
}