import { Queue } from 'openland-graphql/utils/Queue';
import { randomKey } from 'openland-graphql/utils/randomKey';
import { Operations } from './types';
import { GraphqlClient, GraphqlQueryResult } from './../GraphqlClient';
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

class QueryWatchState {
    hasValue: boolean = false;
    hasError: boolean = false;
    value?: any;
    error?: Error;
}

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
        let operation = this.operations[query.document.definitions[0].name.value];
        let fetchPolicy: 'cache-first' | 'network-only' | 'cache-and-network' | 'no-cache' = 'cache-first';
        if (params && params.fetchPolicy) {
            fetchPolicy = params.fetchPolicy;
        }
        if (!operation) {
            throw Error('Unknown operation');
        }
        if (operation.kind !== 'query') {
            throw Error('Invalid operation kind');
        }

        let state = new QueryWatchState();
        let callbacks = new Map<string, (args: { data?: TQuery, error?: Error }) => void>();
        let resolved = false;
        let resolve!: () => void;
        let reject!: () => void;
        let promise = new Promise<void>((rl, rj) => {
            resolve = rl;
            reject = rj;
        });

        let completed = false;
        let wasLoadedFromNetwork = false;

        let doRequest: (reload: boolean) => Promise<void>;
        let doReloadFromCache: () => Promise<void>;

        let onResult = (v: any) => {
            state.hasError = false;
            state.hasValue = true;
            state.value = v;
            state.error = undefined;

            if (!resolved) {
                resolved = true;
                resolve();
            }

            for (let i of callbacks.values()) {
                i({ data: v });
            }
        };

        let onError = (e: any) => {
            state.hasError = true;
            state.hasValue = false;
            state.value = undefined;
            state.error = e;

            if (!resolved) {
                resolved = true;
                reject();
            }

            for (let i of callbacks.values()) {
                i({ error: e });
            }
        };

        doReloadFromCache = async () => {
            this.store.readQueryAndWatch(operation, vars, (s) => {
                if (completed) {
                    return;
                }
                if (s.type === 'value') {
                    onResult(s.value);
                    if (fetchPolicy === 'cache-and-network' && !wasLoadedFromNetwork) {
                        doRequest(false);
                    }
                } else if (s.type === 'missing') {
                    doRequest(true);
                } else if (s.type === 'updated') {
                    doReloadFromCache();
                }
            });
        };

        doRequest = async (reload: boolean) => {
            wasLoadedFromNetwork = true;
            let it = await this.transport.operation(operation, vars);
            if (it.type === 'result') {
                await this.store.mergeResponse(operation, vars, it.value);

                if (completed) {
                    return;
                }
                if (reload) {
                    doReloadFromCache();
                }
            } else {
                if (reload) {
                    onError(it.error);
                }
            }
        };

        if (fetchPolicy === 'cache-first' || fetchPolicy === 'cache-and-network') {
            doReloadFromCache();
        } else {
            doRequest(true);
        }

        return {
            subscribe: (handler: (args: GraphqlQueryResult<TQuery>) => void) => {
                let cbid = randomKey();
                callbacks.set(cbid, handler);
                return () => {
                    callbacks.delete(cbid);
                };
            },
            currentResult: () => {
                if (state.hasError) {
                    return ({ error: state.error });
                } else if (state.hasValue) {
                    return ({ data: state.value });
                }
                return undefined;
            },
            result: () => {
                return promise;
            },
            destroy: () => {
                if (!completed) {
                    completed = true;
                    // TODO: Better destroy
                }
            }
        };
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
        let operation = this.operations[subscription.document.definitions[0].name.value];
        if (!operation) {
            throw Error('Unknown operation');
        }
        if (operation.kind !== 'subscription') {
            throw Error('Invalid operation kind');
        }
        let queue = new Queue();
        let runningOperation: (() => void) | null = null;
        let variables = vars;
        let completed = false;

        let restart = () => {
            if (runningOperation) {
                runningOperation();
                runningOperation = null;
            }
            let v = variables;
            runningOperation = this.transport.subscription(operation, v, (s) => {
                if (s.type === 'error') {
                    if (!completed) {
                        restart();
                    }
                } else {
                    (async () => {
                        await this.store.mergeResponse(operation, v, s.value);
                        queue.post(s.value);
                    })();
                }
            });
        };

        return {
            get: () => {
                return queue.get();
            },
            updateVariables: (vars2: TVars) => {
                variables = vars2;
            },
            destroy: () => {
                if (runningOperation) {
                    runningOperation();
                    runningOperation = null;
                }
            }
        };
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