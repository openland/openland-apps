import { GraphqlClient, GraphqlQuery, GraphqlQueryWatch, OperationParameters, GraphqlSubscription, GraphqlActiveSubscription, GraphqlMutation } from 'openland-graphql/GraphqlClient';
import { Queue } from 'openland-graphql/utils/Queue';
import { throwFatalError } from 'openland-y-utils/throwFatalError';
import { randomKey } from 'openland-graphql/utils/randomKey';

class BridgedQueryWatch {

    hasValue: boolean = false;
    hasError: boolean = false;
    value?: any;
    error?: Error;
}

export abstract class BridgedClient implements GraphqlClient {

    private handlers = new Map<string, (data?: any, error?: Error) => void>();
    private queryWatches = new Map<string, BridgedQueryWatch>();

    //
    // Query
    //

    async query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, params?: OperationParameters): Promise<TQuery> {
        let id = this.nextKey();
        let res = this.registerPromiseHandler<TQuery>(id);
        this.postQuery(id, query, vars, params);
        return await res;
    }

    queryWatch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, params?: OperationParameters): GraphqlQueryWatch<TQuery> {
        let id = this.nextKey();
        let watch = new BridgedQueryWatch();
        let callbacks = new Map<string, (args: { data?: TQuery, error?: Error }) => void>();
        let resolved = false;
        let resolve!: (data: TQuery) => void;
        let reject!: (error: Error) => void;
        let promise = new Promise<TQuery>((rl, rj) => {
            resolve = rl;
            reject = rj;
        });
        this.queryWatches.set(id, watch);
        this.handlers.set(id, (data, error) => {
            if (error) {
                watch.hasError = true;
                watch.hasValue = false;
                watch.value = undefined;
                watch.error = error;
            } else {
                watch.hasError = false;
                watch.hasValue = true;
                watch.value = data;
                watch.error = undefined;
            }
            if (!resolved) {
                resolved = true;
                if (watch.hasError) {
                    reject(watch.error!);
                } else if (watch.hasValue) {
                    resolve(watch.value!);
                }
            }
            for (let i of callbacks.values()) {
                if (watch.hasError) {
                    i({ error: watch.error });
                } else if (watch.hasValue) {
                    i({ data: watch.value });
                }
            }
        });
        this.postQueryWatch(id, query, vars, params);
        return {
            subscribe: (handler: ((args: { data?: TQuery, error?: Error }) => void)) => {
                let cbid = randomKey();
                callbacks.set(cbid, handler);
                return () => {
                    callbacks.delete(cbid);
                }
            },
            currentResult: () => {
                if (watch.hasError) {
                    return ({ error: watch.error })
                } else if (watch.hasValue) {
                    return ({ data: watch.value })
                }
                return undefined;
            },
            result: () => {
                return promise;
            },
            // destroy: () => {
            //     this.queryWatches.delete(id);
            //     this.handlers.delete(id);
            //     this.postQueryWatchEnd(id);
            // }
        }
    }

    //
    // Mutation
    //

    async mutate<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        let id = this.nextKey();
        let res = this.registerPromiseHandler<TQuery>(id);
        this.postMutation(id, query, vars);
        return await res;
    }

    //
    // Subscription
    //

    subscribe<TSubscription, TVars>(subscription: GraphqlSubscription<TSubscription, TVars>, vars?: TVars): GraphqlActiveSubscription<TSubscription, TVars> {
        let id = this.nextKey();
        let queue = new Queue();
        this.handlers.set(id, (data, error) => {
            if (error) {
                throwFatalError('Subscriptions can\'t throw errors');
            } else {
                queue.post(data);
            }
        });
        this.postSubscribe(id, subscription, vars);
        return {
            get: () => {
                return queue.get()
            },
            updateVariables: (vars2: TVars) => {
                this.postSubscribeUpdate(id, vars2);
            },
            destroy: () => {
                this.postUnsubscribe(id);
            }
        }
    }

    //
    // Store
    // 

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

    async readQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        let id = this.nextKey();
        let res = this.registerPromiseHandler<TQuery>(id);
        this.postReadQuery(id, query, vars);
        return await res;
    }

    async writeQuery<TQuery, TVars>(data: TQuery, query: GraphqlQuery<TQuery, TVars>, vars?: TVars) {
        let id = this.nextKey();
        let res = this.registerPromiseHandler<void>(id);
        this.postWriteQuery(id, data, query, vars);
        await res;
    }

    //
    // Implementation
    //

    protected operationUpdated(id: string, data: any) {
        let handler = this.handlers.get(id);
        if (handler) {
            handler(data, undefined);
        }
    }
    protected operationFailed(id: string, err: Error) {
        let handler = this.handlers.get(id);
        if (handler) {
            handler(undefined, err);
        }
    }

    protected abstract postQuery<TQuery, TVars>(id: string, query: GraphqlQuery<TQuery, TVars>, vars?: TVars, params?: OperationParameters): void
    protected abstract postQueryWatch<TQuery, TVars>(id: string, query: GraphqlQuery<TQuery, TVars>, vars?: TVars, params?: OperationParameters): void
    protected abstract postQueryWatchEnd(id: string): void

    protected abstract postMutation<TMutation, TVars>(id: string, query: GraphqlMutation<TMutation, TVars>, vars?: TVars): void

    protected abstract postSubscribe<TSubscription, TVars>(id: string, query: GraphqlSubscription<TSubscription, TVars>, vars?: TVars): void
    protected abstract postSubscribeUpdate(id: string, vars: any): void
    protected abstract postUnsubscribe(id: string): void

    protected abstract postReadQuery<TQuery, TVars>(id: string, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): void
    protected abstract postWriteQuery<TQuery, TVars>(id: string, data: any, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): void

    private nextKey() {
        return randomKey();
    }

    private registerPromiseHandler<T>(id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.handlers.set(id, (data, error) => {
                this.handlers.delete(id);
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }
}