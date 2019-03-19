import * as React from 'react';
import { keyFromObject } from 'openland-graphql/utils/keyFromObject';
import { randomKey } from 'openland-mobile/utils/randomKey';
import { Queue } from 'openland-graphql/utils/Queue';

const LOG = false;

class Watch {

    value: any;
    isErrored = false;
    isCompleted = false;

    private handlers = new Map<string, () => void>();
    readonly promise: Promise<any>;
    private resolve?: () => void;

    constructor() {
        this.promise = new Promise((resolve) => {
            this.resolve = resolve;
        });
    }

    notify() {
        if (LOG) {
            console.log('notify');
        }
        if (this.resolve) {
            this.resolve();
            this.resolve = undefined;
        }
        for (let l of this.handlers.values()) {
            l();
        }
    }

    waitForUpdate(handler: () => void): () => void {
        if (LOG) {
            console.log('waitForUpdate');
        }
        let k = randomKey();
        this.handlers.set(k, handler);
        return () => {
            this.handlers.delete(k);
        }
    }

    async awaitForUpdate() {
        if (LOG) {
            console.log('awaitForUpdate');
        }
        await new Promise((resolve) => {
            let unsubscribe = this.waitForUpdate(() => {
                resolve();
                unsubscribe();
            });
        })
    }
}

export interface BridgedClientConnector {
    postQuery(key: string, query: any, vars: any): void
    postReadQuery(key: string, query: any, vars: any): void
    postWriteQuery(key: string, data: any, query: any, vars: any): void
    postRefetchQuery(key: string, query: any, vars: any): void
    postMutation(key: string, query: any, vars: any): void
    postSubscribe(key: string, query: any, vars: any): void
    postSubscribeUpdate(key: string, vars: any): void
    postUnsubscribe(key: string): void
}

export class BridgedClient {

    private readonly connector: BridgedClientConnector;
    private dataWatches = new Map<string, Watch>();

    constructor(connector: BridgedClientConnector) {
        this.connector = connector;
    }

    registerQuery(query: any, vars: any) {
        if (LOG) {
            console.log('registerQuery');
        }
        var key = vars ? keyFromObject(vars) : '';
        var name = query.document.definitions[0].name.value
        key = 'query$' + name + '$' + key
        if (!this.dataWatches.has(key)) {
            this.dataWatches.set(key, new Watch())
            this.connector.postQuery(key, query, vars)
        }
        return key
    }

    registerMutation(mutation: any, vars: any) {
        if (LOG) {
            console.log('registerMutation');
        }
        let key = 'mutation$' + randomKey()
        this.dataWatches.set(key, new Watch())
        this.connector.postMutation(key, mutation, vars)
        return key
    }

    registerRefetch(mutation: any, vars: any) {
        if (LOG) {
            console.log('registerRefetch');
        }
        let key = 'refetch$' + randomKey()
        this.dataWatches.set(key, new Watch())
        this.connector.postRefetchQuery(key, mutation, vars)
        return key
    }

    registerReadQuery(query: any, vars: any) {
        let key = 'readQuery$' + randomKey()
        this.dataWatches.set(key, new Watch())
        this.connector.postReadQuery(key, query, vars)
        return key
    }

    registerWriteQuery(data: any, query: any, vars: any) {
        if (LOG) {
            console.log('registerWriteQuery');
        }
        let key = 'writeQuery$' + randomKey()
        this.dataWatches.set(key, new Watch())
        this.connector.postWriteQuery(key, data, query, vars)
        return key
    }

    operationUpdated(key: string, data: any) {
        if (LOG) {
            console.log('operationUpdated');
        }
        let watch = this.dataWatches.get(key)!!
        watch.value = data;
        watch.isCompleted = true;
        watch.isErrored = false;
        watch.notify();
    }

    operationFailed(key: string, data: any) {
        if (LOG) {
            console.log('operationFailed');
        }
        let watch = this.dataWatches.get(key)!!
        watch.value = data;
        watch.isCompleted = true;
        watch.isErrored = true;
        watch.notify();
    }

    subscribe(query: any, vars: any) {
        if (LOG) {
            console.log('subscribe');
        }
        let key = 'subscribe$' + randomKey()
        let watch = new Watch();
        let queue = new Queue();
        this.dataWatches.set(key, watch);

        let callback = () => {
            if (!watch.isErrored) {
                queue.post(watch.value)
            } else {
                // TODO: Handle
            }
        }
        let subs = watch.waitForUpdate(callback);
        this.connector.postSubscribe(key, query, vars);

        return {
            get: queue.get,
            updateVariables: (src?: any) => {
                this.connector.postSubscribeUpdate(key, src);
            },
            destroy: () => {
                this.connector.postUnsubscribe(key)
                subs();
            }
        }
    }

    watchQuery(key: string) {
        let watch = this.dataWatches.get(key)!!;
        let queue = new Queue();
        let callback = () => {
            if (!watch.isErrored) {
                queue.post({ value: watch.value });
            } else {
                queue.post({ errors: watch.value });
            }
        }
        let subs = watch.waitForUpdate(callback);
        return {
            get: async () => {
                let q = await queue.get()
                if (q.value) {
                    return q.value;
                } else {
                    throw q.errors;
                }
            },
            destroy: () => {
                subs();
            }
        }
    }

    async getOperation(key: string) {
        if (LOG) {
            console.log('getOperation');
        }
        let watch = this.dataWatches.get(key)!;
        if (!watch.isCompleted) {
            await watch.awaitForUpdate();
        }
        if (!watch.isCompleted) {
            throw Error('Inconsistent state');
        }

        if (watch.isErrored) {
            throw watch.value
        } else {
            return watch.value
        }
    }

    useOperationSuspense(key: string) {
        if (LOG) {
            console.log('useOperationSuspense');
        }
        const watch = this.dataWatches.get(key)!!;
        const [responseId, setResponseId] = React.useState(0);
        React.useEffect(() => {
            if (LOG) {
                console.log('useEffectSuspense');
            }
            return watch.waitForUpdate(() => {
                setResponseId((x) => x + 1);
            });
        }, [key]);

        if (!watch.isCompleted) {
            throw watch.promise;
        }
        if (watch.isErrored) {
            throw watch.value
        }

        return watch.value;
    }

    useOperation(key: string) {
        if (LOG) {
            console.log('useOperation');
        }
        const watch = this.dataWatches.get(key)!!;
        const [responseId, setResponseId] = React.useState(0);
        React.useEffect(() => {
            if (LOG) {
                console.log('useEffect');
            }
            return watch.waitForUpdate(() => {
                setResponseId((x) => x + 1);
            });
        }, [key]);

        if (watch.isCompleted) {
            if (watch.isErrored) {
                throw watch.value
            } else {
                return watch.value;
            }
        } else {
            return null;
        }
    }
}