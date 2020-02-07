import { randomKey } from 'openland-graphql/utils/randomKey';
import { backoff } from 'openland-y-utils/timer';
import { Watcher } from 'openland-y-utils/Watcher';
import { GraphqlEngine, GraphqlEngineStatus, OperationParameters, GraphqlSubscriptionHandler, GraphqlActiveSubscription, GraphqlQueryWatch, GraphqlQueryResult } from '@openland/spacex';

export class RetryEngine implements GraphqlEngine {

    // Status
    protected readonly statusWatcher: Watcher<GraphqlEngineStatus> = new Watcher();
    get status(): GraphqlEngineStatus {
        return this.statusWatcher.getState()!!;
    }
    watchStatus(handler: (status: GraphqlEngineStatus) => void) {
        return this.statusWatcher.watch(handler);
    }

    private inner: GraphqlEngine;
    private errorHandler: (src: Error) => Error | null;
    constructor(opts: {
        engine: GraphqlEngine,
        errorHandler: (src: Error) => Error | null
    }) {
        this.errorHandler = opts.errorHandler;
        this.inner = opts.engine;
        this.statusWatcher.setState(this.inner.status);
        this.inner.watchStatus((s) => {
            this.statusWatcher.setState(s);
        });
    }

    async query<TQuery, TVars>(query: string, vars?: TVars, params?: OperationParameters): Promise<TQuery> {
        let res = await backoff(async () => {
            try {
                let r = await this.inner.query<TQuery, TVars>(query, vars, params);
                return { type: 'result', result: r };
            } catch (e) {
                let eWrapper = this.errorHandler(e);
                if (eWrapper) {
                    console.warn(eWrapper);
                    return { type: 'error', error: eWrapper };
                } else {
                    console.warn(e);
                    throw e;
                }
            }
        });
        if (res.type === 'result') {
            return res.result!;
        } else {
            throw res.error;
        }
    }
    async mutate<TMutation, TVars>(mutation: string, vars?: TVars): Promise<TMutation> {
        let res = await backoff(async () => {
            try {
                let r = await this.inner.mutate<TMutation, TVars>(mutation, vars);
                return { type: 'result', result: r };
            } catch (e) {
                let eWrapper = this.errorHandler(e);
                if (eWrapper) {
                    console.warn(eWrapper);
                    return { type: 'error', error: eWrapper };
                } else {
                    console.warn(e);
                    throw e;
                }
            }
        });
        if (res.type === 'result') {
            return res.result!;
        } else {
            throw res.error;
        }
    }

    queryWatch<TQuery, TVars>(query: string, vars?: TVars, params?: OperationParameters): GraphqlQueryWatch<TQuery> {
        let destroyed = false;
        let currentWatch: GraphqlQueryWatch<TQuery> | undefined;
        let currentWatchSubscriber: (() => void) | undefined;
        let currentResult: GraphqlQueryResult<TQuery> | undefined;
        let callbacks = new Map<string, (args: { data?: TQuery, error?: Error }) => void>();
        let resolved = false;
        let resolve!: () => void;
        let reject!: () => void;
        let promise = new Promise<void>((rl, rj) => {
            resolve = rl;
            reject = rj;
        });

        let restart = () => {
            if (destroyed) {
                return;
            }
            if (currentWatchSubscriber) {
                currentWatchSubscriber();
                currentWatchSubscriber = undefined;
            }
            if (currentWatch) {
                currentWatch.destroy();
                currentWatch = undefined;
            }
            currentWatch = this.inner.queryWatch(query, vars, params);
            let cr = currentWatch.currentResult();
            if (cr) {
                if (cr.error) {
                    throw Error('Initial result can\'t be error!');
                }

                // Save and notify first value
                currentResult = cr;

                // Resolve start promise if needed
                if (!resolved) {
                    resolved = true;
                    if (currentResult.error) {
                        reject();
                    } else {
                        resolve();
                    }
                }

                for (let i of callbacks.values()) {
                    i(currentResult);
                }
            }
            currentWatchSubscriber = currentWatch.subscribe((u) => {
                if (destroyed) {
                    return;
                }
                if (u.error) {
                    let werror = this.errorHandler(u.error);
                    if (werror) {
                        console.warn(werror);
                        currentResult = { error: werror };
                        if (!resolved) {
                            resolved = true;
                            reject();
                        }
                        for (let i of callbacks.values()) {
                            i(currentResult);
                        }
                    } else {
                        console.warn(u.error);
                        // Unknown error - restart
                        restart();
                    }
                } else {
                    currentResult = u;
                    if (!resolved) {
                        resolved = true;
                        resolve();
                    }
                    for (let i of callbacks.values()) {
                        i(currentResult);
                    }
                }
            });
        };
        restart();

        return {
            subscribe: (handler: ((args: { data?: TQuery, error?: Error }) => void)) => {
                let cbid = randomKey();
                callbacks.set(cbid, handler);
                return () => {
                    callbacks.delete(cbid);
                };
            },
            currentResult: () => {
                return currentResult;
            },
            result: () => {
                return promise;
            },
            destroy: () => {
                if (!destroyed) {
                    destroyed = true;
                    if (currentWatchSubscriber) {
                        currentWatchSubscriber();
                        currentWatchSubscriber = undefined;
                    }
                    if (currentWatch) {
                        currentWatch.destroy();
                        currentWatch = undefined;
                    }
                }
            }
        };
    }

    subscribe<TSubscription, TVars>(handler: GraphqlSubscriptionHandler<TSubscription>, subscription: string, vars?: TVars) {
        return this.inner.subscribe<TSubscription, TVars>(handler, subscription, vars);
    }
    updateQuery<TQuery, TVars>(updater: (data: TQuery) => TQuery | null, query: string, vars?: TVars) {
        return this.inner.updateQuery<TQuery, TVars>(updater, query, vars);
    }
    readQuery<TQuery, TVars>(query: string, vars?: TVars) {
        return this.inner.readQuery<TQuery, TVars>(query, vars);
    }
    writeQuery<TQuery, TVars>(data: TQuery, query: string, vars?: TVars) {
        return this.inner.writeQuery<TQuery, TVars>(data, query, vars);
    }

    close() {
        this.inner.close();
    }
}