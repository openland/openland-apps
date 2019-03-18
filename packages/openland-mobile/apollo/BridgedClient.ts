import * as React from 'react';
import { keyFromObject } from 'openland-graphql/utils/keyFromObject';
import { randomKey } from 'openland-mobile/utils/randomKey';
import { Queue } from 'openland-graphql/utils/Queue';

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
        if (this.resolve) {
            this.resolve();
            this.resolve = undefined;
        }
        for (let l of this.handlers.values()) {
            l();
        }
    }

    waitForUpdate(handler: () => void): () => void {
        let k = randomKey();
        this.handlers.set(k, handler);
        return () => {
            this.handlers.delete(k);
        }
    }

    async awaitForUpdate() {
        await new Promise((resolve) => {
            this.waitForUpdate(resolve);
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
    postUnsubscribe(key: string): void
}

export class BridgedClient {

    private readonly connector: BridgedClientConnector;
    private dataWatches = new Map<string, Watch>();

    constructor(connector: BridgedClientConnector) {
        this.connector = connector;
    }

    registerQuery(query: any, vars: any) {
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
        let key = 'mutation$' + randomKey()
        this.dataWatches.set(key, new Watch())
        this.connector.postMutation(key, mutation, vars)
        return key
    }

    registerRefetch(mutation: any, vars: any) {
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
        let key = 'writeQuery$' + randomKey()
        this.dataWatches.set(key, new Watch())
        this.connector.postWriteQuery(key, data, query, vars)
        return key
    }

    operationUpdated(key: string, data: any) {
        let watch = this.dataWatches.get(key)!!
        watch.value = data;
        watch.isCompleted = true;
        watch.isErrored = false;
        watch.notify();
    }

    operationFailed(key: string) {
        let watch = this.dataWatches.get(key)!!
        watch.value = {};
        watch.isCompleted = true;
        watch.isErrored = true;
        watch.notify();
    }

    subscribe(query: any, vars: any) {
        let key = 'subscribe$' + randomKey()
        let watch = new Watch();
        let queue = new Queue();
        this.dataWatches.set(key, watch);

        let callback = () => {
            if (!watch.isErrored) {
                queue.post(watch.value)
                watch.waitForUpdate(callback)
            } else {
                // TODO: Handle
            }
        }
        watch.waitForUpdate(callback);
        this.connector.postSubscribe(key, query, vars);

        return {
            get: queue.get,
            updateVariables: (src?: any) => {
                // this.connector.postSubscribe(key, query, src);
                // this.thread.postMessage(JSON.stringify({ type: 'subscribe-update', variables: src, id: key } as Request));
            },
            destroy: () => {
                // this.connector.postUnsubscribe(key)
                // this.thread.postMessage(JSON.stringify({ type: 'subscribe-destroy', id: key } as Request));
            }
        }
    }

    // watchOperation(key: string, handler: { resolve: (src: any) => void, reject: (src: any) => void }) {
    //     let watch = this.dataWatches.get(key)!!;
    // }

    async getOperation(key: string) {
        let watch = this.dataWatches.get(key)!;
        if (!watch.isCompleted) {
            await watch.awaitForUpdate();
        }
        if (!watch.isCompleted) {
            throw Error('Inconsistent state');
        }

        if (watch.isErrored) {
            throw Error('Unknown error');
        } else {
            return watch.value
        }
    }

    useOperationSuspense(key: string) {
        const watch = this.dataWatches.get(key)!!;
        const [responseId, setResponseId] = React.useState(0);
        React.useEffect(() => {
            return watch.waitForUpdate(() => {
                setResponseId((x) => x + 1);
            });
        }, [key]);

        if (!watch.isCompleted) {
            throw watch.promise;
        }
        if (watch.isErrored) {
            throw Error('query error: ' + JSON.stringify(watch.value));
        }

        return watch.value;
    }

    useOperation(key: string) {
        const watch = this.dataWatches.get(key)!!;
        const [responseId, setResponseId] = React.useState(0);
        React.useEffect(() => {
            return watch.waitForUpdate(() => {
                setResponseId((x) => x + 1);
            });
        }, [key]);

        if (watch.isCompleted) {
            if (watch.isErrored) {
                throw Error('query error: ' + JSON.stringify(watch.value));
            } else {
                return watch.value;
            }
        } else {
            return null;
        }
    }
}