import { Operations } from './types';
import { GraphqlClient } from './../GraphqlClient';
import {
    GraphqlClientStatus,
    GraphqlQuery,
    OperationParameters,
    GraphqlQueryWatch,
    GraphqlMutation,
    GraphqlSubscription,
    GraphqlActiveSubscription
} from 'openland-graphql/GraphqlClient';
import { SpaceXTransport } from './transport/SpaceXTransport';
import { SpaceXStore } from './store/SpaceXStore';

export class SpaceXWebClient implements GraphqlClient {

    status: GraphqlClientStatus;
    private readonly store = new SpaceXStore();
    private readonly transport: SpaceXTransport;
    private readonly operations: Operations;

    constructor(operations: Operations, endpoint: string, token: string) {
        this.transport = new SpaceXTransport(endpoint, token);
        this.status = { status: 'connecting' };
        this.operations = operations;
    }

    watchStatus(handler: (status: GraphqlClientStatus) => void): (() => void) {
        return () => {
            //
        };
    }

    //
    // Operations
    //

    async query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, params?: OperationParameters): Promise<TQuery> {
        let operation = this.operations[query.document.definitions[0].name.value];
        if (!operation) {
            throw Error('Unknown operation');
        }
        if (operation.kind !== 'query') {
            throw Error('Invalid operation kind');
        }

        let fetchPolicy: 'cache-first' | 'network-only' | 'cache-and-network' | 'no-cache' = 'cache-first';
        if (params && params.fetchPolicy) {
            fetchPolicy = params.fetchPolicy;
        }

        if (fetchPolicy === 'cache-and-network') {
            throw Error('Unable to use CACHE_AND_NETWORK policy for non watchable query');
        }

        if (fetchPolicy === 'cache-first') {
            let ex = await this.store.readQuery(operation, vars);
            if (ex.result) {
                return ex.value!;
            }
        }

        let r = await this.transport.operation(operation, vars);
        if (r.type === 'result') {
            await this.store.mergeResponse(operation, vars, r.value);
            return r.value;
        } else {
            throw r.error;
        }
    }
    queryWatch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, params?: OperationParameters): GraphqlQueryWatch<TQuery> {
        throw Error('');
    }
    async mutate<TMutation, TVars>(mutation: GraphqlMutation<TMutation, TVars>, vars?: TVars): Promise<TMutation> {
        let operation = this.operations[mutation.document.definitions[0].name.value];
        if (!operation) {
            throw Error('Unknown operation');
        }
        if (operation.kind !== 'mutation') {
            throw Error('Invalid operation kind');
        }
        let r = await this.transport.operation(operation, vars);
        if (r.type === 'result') {
            await this.store.mergeResponse(operation, vars, r.value);
            return r.value;
        } else {
            throw r.error;
        }
    }
    subscribe<TSubscription, TVars>(subscription: GraphqlSubscription<TSubscription, TVars>, vars?: TVars): GraphqlActiveSubscription<TSubscription, TVars> {
        throw Error('');
    }

    // Store

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
        let name = query.document.definitions[0].name.value;
        let r = await this.store.readQuery(this.operations[name], vars);
        if (r.result) {
            return r.value! as TQuery;
        } else {
            return null;
        }
    }
    async writeQuery<TQuery, TVars>(data: TQuery, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<void> {
        let name = query.document.definitions[0].name.value;
        await this.store.mergeResponse(this.operations[name], vars, data);
    }
}