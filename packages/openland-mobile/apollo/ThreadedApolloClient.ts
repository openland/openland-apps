import * as React from 'react';
import { GraphqlClient, GraphqlActiveSubscription, GraphqlQuery, GraphqlMutation } from 'openland-graphql/GraphqlClient';
import { Thread } from 'react-native-threads';
import { Request, Response } from './api/Request';
import { randomKey } from 'openland-mobile/utils/randomKey';
import { delay } from 'openland-y-utils/timer';
import { keyFromObject } from 'openland-graphql/utils/keyFromObject';

export class WorkerApolloClient implements GraphqlClient {

    private readonly thread: Thread;
    private handlers = new Map<string, { resolve: (src: any) => void, reject: (src: any) => void }>();
    private queries = new Map<any, Map<string, any>>();

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

    query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        return this.postCall({ type: 'query', body: query.document, variables: vars, id: this.nextId() });
    }
    refetch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        return this.postCall({ type: 'refetch', body: query.document, variables: vars, id: this.nextId() });
    }
    mutate<TMutation, TVars>(mutation: GraphqlMutation<TMutation, TVars>, vars?: TVars): Promise<TMutation> {
        return this.postCall({ type: 'mutate', body: mutation.document, variables: vars, id: this.nextId() });
    }

    subscribe(subscription: any, vars?: any): GraphqlActiveSubscription {
        // throw Error();
        return {
            get: async () => {
                while (true) {
                    await delay(1000);
                }
            },
            updateVariables: (src?: any) => {
                //
            },
            destroy: () => {
                //
            }
        } as GraphqlActiveSubscription;
    }

    useQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery {
        const [responseId, setResponseId] = React.useState(0);
        let r = React.useMemo(() => {
            let key = keyFromObject(vars);

            if (this.queries.has(query.document)) {
                let q = this.queries.get(query.document)!;
                if (q.has(key)) {
                    return q.get(key)!;
                }
            } else {
                this.queries.set(query.document, new Map());
            }

            let result = {
                finished: false,
                error: false,
                data: null
            } as any;
            result.promise = this.postCall({ type: 'query', id: this.nextId(), body: query.document, variables: vars });
            result.promise
                .then((v: any) => {
                    console.log('completed')
                    result.finished = true;
                    result.data = v;
                    result.error = false;
                    setResponseId((x) => x + 1);
                })
                .catch((e: any) => {
                    console.log('errored')
                    result.finished = true;
                    result.data = e;
                    result.error = true;
                    setResponseId((x) => x + 1);
                });

            this.queries.get(query.document)!.set(key, result);
            return result;
        }, [query.document, keyFromObject(vars)]);
        if (!r.finished) {
            throw r.promise;
        }
        if (r.error) {
            throw Error('query error: ' + JSON.stringify(r.data));
        }
        return r.data;
    }

    useWithoutLoaderQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery | null {
        const [responseId, setResponseId] = React.useState(0);
        let r = React.useMemo(() => {
            let key = keyFromObject(vars);

            if (this.queries.has(query.document)) {
                let q = this.queries.get(query.document)!;
                if (q.has(key)) {
                    return q.get(key)!;
                }
            } else {
                this.queries.set(query.document, new Map());
            }

            let result = {
                finished: false,
                error: false,
                data: null
            } as any;
            result.promise = this.postCall({ type: 'query', id: this.nextId(), body: query.document, variables: vars });
            result.promise
                .then((v: any) => {
                    console.log('completed')
                    result.finished = true;
                    result.data = v;
                    result.error = false;
                    setResponseId((x) => x + 1);
                })
                .catch((e: any) => {
                    console.log('errored')
                    result.finished = true;
                    result.data = e;
                    result.error = true;
                    setResponseId((x) => x + 1);
                });

            this.queries.get(query.document)!.set(key, result);
            return result;
        }, [query.document, keyFromObject(vars)]);
        if (!r.finished) {
            return null;
        }
        if (r.error) {
            throw Error('query error: ' + JSON.stringify(r.data) + ', ' + JSON.stringify(vars));
        }
        return r.data;
    }

    async updateQuery<TQuery, TVars>(updater: (data: TQuery) => TQuery | null, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<boolean> {
        // throw Error();
        return false;
    }
    async readQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery | null> {
        // throw Error();
        return null;
    }
}