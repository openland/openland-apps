import { GraphqlClient, GraphqlQuery, GraphqlQueryWatch, OperationParameters, GraphqlSubscription, GraphqlActiveSubscription, GraphqlMutation, GraphqlFragment, ApiError, GraphqlClientStatus } from 'openland-graphql/GraphqlClient';
import { Queue } from 'openland-graphql/utils/Queue';
import { randomKey } from 'openland-graphql/utils/randomKey';
import { createLogger } from 'mental-log';
import { delay } from 'openland-y-utils/timer';
import { Watcher } from 'openland-y-utils/Watcher';

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

    // Status
    protected readonly statusWatcher: Watcher<GraphqlClientStatus> = new Watcher();
    get status(): GraphqlClientStatus {
        return this.statusWatcher.getState()!!;
    }
    watchStatus(handler: (status: GraphqlClientStatus) => void) {
        return this.statusWatcher.watch(handler);
    }

    constructor() {
        this.statusWatcher.setState({ status: 'connecting' });
    }

    abstract close(): void;

    //
    // Query
    //

    async query<TQuery, TVars>(query: string, vars?: TVars, params?: OperationParameters): Promise<TQuery> {
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

    queryWatch<TQuery, TVars>(query: string, vars?: TVars, params?: OperationParameters): GraphqlQueryWatch<TQuery> {
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
                };
            },
            currentResult: () => {
                if (watch.hasError) {
                    return ({ error: watch.error });
                } else if (watch.hasValue) {
                    return ({ data: watch.value });
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
        };
    }

    //
    // Mutation
    //

    async mutate<TQuery, TVars>(query: string, vars?: TVars): Promise<TQuery> {
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

    subscribe<TSubscription, TVars>(subscription: string, vars?: TVars): GraphqlActiveSubscription<TSubscription, TVars> {
        let id = this.nextKey();
        let queue = new Queue();
        var variables = vars;
        var currentId = id;
        this.handlersMap.set(currentId, id);
        this.handlers.set(id, (data, error) => {
            if (error) {
                log.warn('Received subscription error: restarting');
                log.warn(variables);
                this.handlersMap.delete(currentId);
                currentId = this.nextKey();
                this.handlersMap.set(currentId, id);
                this.postSubscribe(currentId, subscription, variables);
            } else {
                queue.post(data);
            }
        });
        this.postSubscribe(id, subscription, vars);
        return {
            get: () => {
                return queue.get();
            },
            updateVariables: (vars2: TVars) => {
                variables = vars2;
            },
            destroy: () => {
                this.handlersMap.delete(currentId);
                this.handlers.delete(id);
                this.postUnsubscribe(id);
            }
        };
    }

    //
    // Store
    // 

    async updateQuery<TQuery, TVars>(updater: (data: TQuery) => TQuery | null, query: string, vars?: TVars): Promise<boolean> {
        let r = await this.readQuery<TQuery, TVars>(query, vars);
        if (r) {
            let udpated = updater(r);
            if (udpated) {
                await this.writeQuery<TQuery, TVars>(r, query, vars);
                return true;
            }
        }
        return false;
    }

    async readQuery<TQuery, TVars>(query: string, vars?: TVars): Promise<TQuery> {
        let id = this.nextKey();
        let res = this.registerPromiseHandler<TQuery>(id);
        this.postReadQuery<TQuery, TVars>(id, query, vars);
        return await res;
    }

    async writeQuery<TQuery, TVars>(data: TQuery, query: string, vars?: TVars) {
        let id = this.nextKey();
        let res = this.registerPromiseHandler<void>(id);
        this.postWriteQuery(id, data, query, vars);
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

    protected abstract postQuery<TQuery, TVars>(id: string, query: string, vars?: TVars, params?: OperationParameters): void;
    protected abstract postQueryWatch<TQuery, TVars>(id: string, query: string, vars?: TVars, params?: OperationParameters): void;
    protected abstract postQueryWatchEnd(id: string): void;

    protected abstract postMutation<TMutation, TVars>(id: string, query: string, vars?: TVars): void;

    protected abstract postSubscribe<TSubscription, TVars>(id: string, query: string, vars?: TVars): void;
    protected abstract postUnsubscribe(id: string): void;

    protected abstract postReadQuery<TQuery, TVars>(id: string, query: string, vars?: TVars): void;
    protected abstract postWriteQuery<TQuery, TVars>(id: string, data: any, query: string, vars?: TVars): void;

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