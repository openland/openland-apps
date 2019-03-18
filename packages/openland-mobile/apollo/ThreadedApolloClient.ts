import * as React from 'react';
import { GraphqlClient, GraphqlActiveSubscription, GraphqlQuery, GraphqlMutation, GraphqlSubscription } from 'openland-graphql/GraphqlClient';
import { Thread } from 'react-native-threads';
import { Request, Response } from './api/Request';
import { randomKey } from 'openland-mobile/utils/randomKey';
import { keyFromObject } from 'openland-graphql/utils/keyFromObject';
import { Queue } from 'openland-graphql/utils/Queue';

class QueryWatch {

    value: any;
    isErrored = false;
    isCompleted = false;
    promise: any;

    private handlers = new Map<string, () => void>();

    notify() {
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
}

export class WorkerApolloClient implements GraphqlClient {

    private readonly thread: Thread;
    private handlers = new Map<string, { resolve: (src: any) => void, reject: (src: any) => void }>();
    private watches = new Map<any, Map<string, QueryWatch>>();

    constructor(token?: string) {
        this.thread = new Thread('./index.thread.js');
        this.thread.onmessage = (msg) => {
            this.handleMessage(JSON.parse(msg) as Response);
        }
        this.postMessage({ type: 'init', token: token, id: this.nextId() });
    }

    private nextId() {
        return randomKey();
    }

    private handleMessage(msg: Response) {
        if (msg.type === 'result') {
            if (this.handlers.has(msg.id)) {
                this.handlers.get(msg.id)!.resolve(msg.data);
            }
        } else if (msg.type === 'error') {
            if (this.handlers.has(msg.id)) {
                this.handlers.get(msg.id)!.reject(msg.data);
            }
        }
    }

    private postMessage(request: Request) {
        this.thread.postMessage(JSON.stringify(request));
    }

    private async postCall(request: Request) {
        try {
            return await new Promise<any>((resolve, reject) => {
                this.handlers.set(request.id, { resolve, reject });
                this.thread.postMessage(JSON.stringify(request));
            });
        } finally {
            this.handlers.delete(request.id);
        }
    }

    private async postWatch(request: Request, watch: QueryWatch) {
        return await new Promise<any>((resolve, reject) => {
            this.handlers.set(request.id, {
                resolve: (v) => {
                    if (!watch.isCompleted) {
                        resolve(v);
                    }
                    // console.log('watch:update');
                    // console.log(v);
                    watch.isCompleted = true;
                    watch.isErrored = false;
                    watch.value = v;
                    watch.notify();
                },
                reject: (v) => {
                    if (!watch.isCompleted) {
                        reject(v);
                    }
                    watch.isCompleted = true;
                    watch.isErrored = true;
                    watch.value = v;
                    watch.notify();
                }
            });
            this.thread.postMessage(JSON.stringify(request));
        });
    }

    private useQueryRaw<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): QueryWatch {
        if (!query.document) {
            throw Error('Broken request');
        }
        return React.useMemo(() => {
            let key = keyFromObject(vars);

            if (this.watches.has(query.document)) {
                let q = this.watches.get(query.document)!;
                if (q.has(key)) {
                    return q.get(key)!;
                }
            } else {
                this.watches.set(query.document, new Map());
            }

            let res = new QueryWatch();
            res.promise = this.postWatch({ type: 'watch', id: this.nextId(), body: query.document, variables: vars }, res);
            // res.promise
            //     .then((v: any) => {
            //         console.log('completed')
            //         res.isCompleted = true;
            //         res.isErrored = false;
            //         res.value = v;
            //         res.notify();
            //     })
            //     .catch((e: any) => {
            //         res.isCompleted = false;
            //         res.isErrored = true;
            //         res.value = e;
            //         res.notify();
            //     });

            this.watches.get(query.document)!.set(key, res);
            return res;
        }, [query.document, keyFromObject(vars)]);
    }

    query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        if (!query.document) {
            throw Error('Broken request');
        }
        return this.postCall({ type: 'query', body: query.document, variables: vars, id: this.nextId() });
    }
    refetch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        if (!query.document) {
            throw Error('Broken request');
        }
        return this.postCall({ type: 'refetch', body: query.document, variables: vars, id: this.nextId() });
    }
    mutate<TMutation, TVars>(mutation: GraphqlMutation<TMutation, TVars>, vars?: TVars): Promise<TMutation> {
        if (!mutation.document) {
            throw Error('Broken request');
        }
        return this.postCall({ type: 'mutate', body: mutation.document, variables: vars, id: this.nextId() });
    }

    subscribe<TSubscription, TVars>(subscription: GraphqlSubscription<TSubscription, TVars>, vars?: TVars): GraphqlActiveSubscription {
        let queue = new Queue();

        let key = this.nextId();
        this.handlers.set(key, {
            resolve: (v) => {
                queue.post(v);
                // if (!watch.isCompleted) {
                //     resolve(v);
                // }
                // watch.isCompleted = true;
                // watch.isErrored = false;
                // watch.value = v;
                // watch.notify();
            },
            reject: (v) => {
                // if (!watch.isCompleted) {
                //     reject(v);
                // }
                // watch.isCompleted = true;
                // watch.isErrored = true;
                // watch.value = v;
                // watch.notify();
            }
        });
        this.thread.postMessage(JSON.stringify({ type: 'subscribe', body: subscription.document, variables: vars, id: key } as Request));

        return {
            get: queue.get,
            updateVariables: (src?: any) => {
                this.thread.postMessage(JSON.stringify({ type: 'subscribe-update', variables: src, id: key } as Request));
            },
            destroy: () => {
                this.thread.postMessage(JSON.stringify({ type: 'subscribe-destroy', id: key } as Request));
            }
        } as GraphqlActiveSubscription;
    }

    useQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery {

        let q = this.useQueryRaw(query, vars);
        const [responseId, setResponseId] = React.useState(0);
        React.useEffect(() => {
            return q.waitForUpdate(() => {
                setResponseId((x) => x + 1);
            });
        }, [q]);

        if (!q.isCompleted) {
            throw q.promise;
        }
        if (q.isErrored) {
            throw Error('query error: ' + JSON.stringify(q.value));
        }

        // console.log('q: ' + JSON.stringify(q.value));
        return q.value;
    }

    useWithoutLoaderQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery | null {

        let q = this.useQueryRaw(query, vars);
        const [responseId, setResponseId] = React.useState(0);
        React.useEffect(() => {
            return q.waitForUpdate(() => {
                setResponseId((x) => x + 1);
            });
        }, [q]);

        if (!q.isCompleted) {
            return null;
        }
        if (q.isErrored) {
            throw Error('query error: ' + JSON.stringify(q.value));
        }
        return q.value;
    }

    async updateQuery<TQuery, TVars>(updater: (data: TQuery) => TQuery | null, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<boolean> {
        let r = undefined;
        try {
            // https://github.com/apollographql/apollo-feature-requests/issues/1
            r = await this.readQuery(query, vars);
        } catch (e) {
            //
        }
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
        if (!query.document) {
            throw Error('Broken request');
        }
        return this.postCall({ type: 'read', body: query.document, variables: vars, id: this.nextId() });
    }

    async writeQuery<TQuery, TVars>(data: any, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery | null> {
        if (!query.document) {
            throw Error('Broken request');
        }
        return this.postCall({ type: 'write', body: query.document, variables: vars, id: this.nextId(), data });
    }
}