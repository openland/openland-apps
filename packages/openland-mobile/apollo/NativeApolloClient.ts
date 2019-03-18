import { NativeModules, DeviceEventEmitter } from 'react-native';
import { GraphqlClient, GraphqlQuery, GraphqlMutation, GraphqlActiveSubscription, GraphqlSubscription } from 'openland-graphql/GraphqlClient';
import { randomKey } from 'openland-mobile/utils/randomKey';
import { delay } from 'openland-y-utils/timer';
import { BridgedClient } from './BridgedClient';

const NativeGraphQL = NativeModules.RNGraphQL as {
    createClient: (key: string, endpoint: string, token?: string) => void
    query: (key: string, id: string, query: string, vars?: any) => void;
    refetch: (key: string, id: string, query: string, vars?: any) => void;
    mutate: (key: string, id: string, query: string, vars?: any) => void;
    closeClient: (key: string) => void;
}

export class NativeApolloClient implements GraphqlClient {

    private key: string = randomKey();
    private client = new BridgedClient({
        postMutation: (id, mutation, vars) => {
            NativeGraphQL.mutate(this.key, id, mutation.document.definitions[0].name.value, vars ? vars : {});
        },
        postQuery: (id, mutation, vars) => {
            NativeGraphQL.query(this.key, id, mutation.document.definitions[0].name.value, vars ? vars : {});
        },
        postRefetchQuery: (id, query, vars) => {
            NativeGraphQL.refetch(this.key, id, query.document.definitions[0].name.value, vars ? vars : {});
        },
    });

    constructor(token?: string) {
        DeviceEventEmitter.addListener('apollo_client', (src) => {
            if (src.key === this.key) {
                console.log(src);
                if (src.type === 'failure') {
                    this.client.operationFailed(src.id);
                } else if (src.type === 'response') {
                    this.client.operationUpdated(src.id, src.data);
                }
            }
        });
        NativeGraphQL.createClient(this.key, '//api.openland.com/api', token);
    }

    async query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        let id = this.client.registerQuery(query, vars);
        return await this.client.getOperation(id);
    }

    async refetch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        let id = this.client.registerRefetch(query, vars);
        return await this.client.getOperation(id);
    }

    async mutate<TMutation, TVars>(mutation: GraphqlMutation<TMutation, TVars>, vars?: TVars): Promise<TMutation> {
        let id = this.client.registerMutation(mutation, vars);
        return await this.client.getOperation(id);
    }

    subscribe<TSubscription, TVars>(subscription: GraphqlSubscription<TSubscription, TVars>, vars?: TVars): GraphqlActiveSubscription {
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
        let id = this.client.registerQuery(query, vars);
        return this.client.useOperationSuspense(id);
    }

    useWithoutLoaderQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery | null {
        let id = this.client.registerQuery(query, vars);
        return this.client.useOperation(id);
    }

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
        throw Error()
    }

    async writeQuery<TQuery, TVars>(data: any, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery | null> {
        throw Error()
    }
}