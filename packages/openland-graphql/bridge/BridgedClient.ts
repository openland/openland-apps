import { GraphqlClient, GraphqlQuery, GraphqlQueryWatch, OperationParameters, GraphqlSubscription, GraphqlActiveSubscription, GraphqlMutation, GraphqlFragment, ApiError } from 'openland-graphql/GraphqlClient';
import { Queue } from 'openland-graphql/utils/Queue';
import { throwFatalError } from 'openland-y-utils/throwFatalError';
import { randomKey } from 'openland-graphql/utils/randomKey';
import { createLogger } from 'mental-log';
import { getQueryName } from 'openland-graphql/utils/getQueryName';
import { delay } from 'openland-y-utils/timer';

class BridgedQueryWatch {

    hasValue: boolean = false;
    hasError: boolean = false;
    value?: any;
    error?: Error;
}

const log = createLogger('GraphQL');

export abstract class BridgedClient implements GraphqlClient {

    private handlersMap = new Map<string, string>();
    private handlers = new Map<string, (data?: any, error?: Error) => void>();
    private queryWatches = new Map<string, BridgedQueryWatch>();

    //
    // Query
    //

    async query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, params?: OperationParameters): Promise<TQuery> {
        // if (__DEV__) {
        //     log.log('Query ' + getQueryName(query) + '(' + JSON.stringify(vars || {}) + ', ' + JSON.stringify(params || {}) + ')');
        // }

        // Retry logic
        while (true) {
            try {
                let id = this.nextKey();
                let res = this.registerPromiseHandler<TQuery>(id);
                this.postQuery(id, query, vars, params);
                return await res;
            } catch (e) {
                if (e instanceof ApiError) {
                    throw e;
                } else {
                    log.warn('Unknown error during query');
                    log.warn(e);
                }
                await delay(1000);
            }
        }
    }

    queryWatch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, params?: OperationParameters): GraphqlQueryWatch<TQuery> {
        // if (__DEV__) {
        //     log.log('Query Watch ' + getQueryName(query) + '(' + JSON.stringify(vars || {}) + ', ' + JSON.stringify(params || {}) + ')');
        // }
        let id = this.nextKey();
        let currentId = id;
        let watch = new BridgedQueryWatch();
        let callbacks = new Map<string, (args: { data?: TQuery, error?: Error }) => void>();
        let resolved = false;
        let resolve!: () => void;
        let reject!: () => void;
        let promise = new Promise<void>((rl, rj) => {
            resolve = rl;
            reject = rj;
        });
        let completed = false;
        this.queryWatches.set(id, watch);
        this.handlersMap.set(currentId, id);
        this.handlers.set(id, (data, error) => {

            // Special retry action
            if (error) {
                if (!(error instanceof ApiError)) {
                    log.warn('Received unknown error: retrying watch');

                    // Stop old watch
                    this.handlersMap.delete(currentId);
                    this.postQueryWatchEnd(currentId);

                    // Launch new watch
                    currentId = this.nextKey();
                    this.handlersMap.set(currentId, id);

                    // Schedule new watch
                    setTimeout(() => {
                        if (!completed) {
                            this.postQueryWatch(currentId, query, vars, params);
                        }
                    }, 1000);

                    return;
                }
            }

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
                    reject();
                } else if (watch.hasValue) {
                    resolve();
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
            destroy: () => {
                if (!completed) {
                    this.handlersMap.delete(currentId);
                    this.postQueryWatchEnd(currentId);
                }
            }
        }
    }

    //
    // Mutation
    //

    async mutate<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        // if (__DEV__) {
        //     log.log('Mutate ' + getQueryName(query) + '(' + JSON.stringify(vars || {}) + ')');
        // }
        while (true) {
            try {
                let id = this.nextKey();
                let res = this.registerPromiseHandler<TQuery>(id);
                this.postMutation(id, query, vars);
                return await res;
            } catch (e) {
                if (e instanceof ApiError) {
                    throw e;
                } else {
                    log.warn('Unknown error during mutation');
                    log.warn(e);
                }
                await delay(1000);
            }
        }
    }

    //
    // Subscription
    //

    subscribe<TSubscription, TVars>(subscription: GraphqlSubscription<TSubscription, TVars>, vars?: TVars): GraphqlActiveSubscription<TSubscription, TVars> {
        let id = this.nextKey();
        let queue = new Queue();
        this.handlersMap.set(id, id);
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

    async writeFragment<TFragment>(data: TFragment, fragment: GraphqlFragment<TFragment>): Promise<void> {
        let id = this.nextKey();
        let res = this.registerPromiseHandler<void>(id);
        this.postWriteFragment(id, data, fragment);
        await res;
    }

    //
    // Implementation
    //

    protected operationUpdated(id: string, data: any) {
        let realId = this.handlersMap.get(id);
        if (!realId) {
            return;
        }
        let handler = this.handlers.get(realId);
        if (handler) {
            handler(data, undefined);
        }
    }
    protected operationFailed(id: string, err: Error) {
        let realId = this.handlersMap.get(id);
        if (!realId) {
            return;
        }
        let handler = this.handlers.get(realId);
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

    protected abstract postWriteFragment<TFragment>(id: string, data: any, query: GraphqlFragment<TFragment>): void

    private nextKey() {
        return randomKey();
    }

    private registerPromiseHandler<T>(id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.handlersMap.set(id, id);
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