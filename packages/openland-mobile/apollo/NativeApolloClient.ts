import { NativeModules, DeviceEventEmitter } from 'react-native';
import { GraphqlClient, GraphqlQuery, GraphqlMutation, GraphqlActiveSubscription } from 'openland-graphql/GraphqlClient';
import { randomKey } from 'openland-mobile/utils/randomKey';
import { print } from 'graphql/language/printer';
import { delay } from 'openland-y-utils/timer';

const NativeGraphQL = NativeModules.RNGraphQL as {
    createClient: (key: string, endpoint: string, token?: string) => void
    query: (key: string, id: string, query: string, vars?: any) => void;
    closeClient: (key: string) => void;
}

export class NativeApolloClient implements GraphqlClient {

    private key: string = randomKey();
    private handlers = new Map<string, { resolve: (src: any) => void, reject: (src: any) => void }>();

    constructor(token?: string) {
        DeviceEventEmitter.addListener('apollo_client', (src) => {
            if (src.key === this.key) {
                console.log(src);
                if (src.type === 'failure') {
                    let h = this.handlers.get(src.id);
                    if (h) {
                        h.reject('Unknown error');
                    }
                } else if (src.type === 'response') {
                    console.log('response');
                    let h = this.handlers.get(src.id);
                    if (h) {
                        console.log('response:call');
                        h.resolve(src.data);
                    }
                }
            }
        });
        NativeGraphQL.createClient(this.key, '//api.openland.com/api', token);
    }

    async query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        let id = randomKey();
        let p = new Promise<any>((resolve, reject) => {
            this.handlers.set(id, { resolve, reject });
            // this.thread.postMessage(JSON.stringify(request));
        });
        NativeGraphQL.query(this.key, id, print(query.document), vars ? vars : {});
        return await p;
    }

    async refetch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        while (true) {
            await delay(10000);
        }
    }

    async mutate<TMutation, TVars>(mutation: GraphqlMutation<TMutation, TVars>, vars?: TVars): Promise<TMutation> {
        while (true) {
            await delay(10000);
        }
    }

    subscribe(subscription: any, vars?: any): GraphqlActiveSubscription {
        return {
            get: async () => {
                while (true) {
                    await delay(10000);
                }
            },
            updateVariables: (src?: any) => {
                // this.thread.postMessage(JSON.stringify({ type: 'subscribe-update', variables: src, id: key } as Request));
            },
            destroy: () => {
                // this.thread.postMessage(JSON.stringify({ type: 'subscribe-destroy', id: key } as Request));
            }
        } as GraphqlActiveSubscription;
    }

    useQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery {
        throw (async () => {
            while (true) {
                await delay(10000);
            }
        })()
    }

    useWithoutLoaderQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery | null {
        // throw Error()
        return null;
    }

    async updateQuery<TQuery, TVars>(updater: (data: TQuery) => TQuery | null, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<boolean> {
        throw Error()
    }

    async readQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery | null> {
        throw Error()
    }

    async writeQuery<TQuery, TVars>(data: any, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery | null> {
        throw Error()
    }
}