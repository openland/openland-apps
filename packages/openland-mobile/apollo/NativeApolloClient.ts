import { NativeModules } from 'react-native';
import { GraphqlClient, GraphqlQuery, GraphqlMutation, GraphqlActiveSubscription } from 'openland-graphql/GraphqlClient';
import { randomKey } from 'openland-mobile/utils/randomKey';
import { print } from 'graphql/language/printer';

const NativeGraphQL = NativeModules.RNGraphQL as {
    createClient: (key: string, endpoint: string, token?: string) => void
    query: (key: string, id: string, query: string) => void;
    closeClient: (key: string) => void;
}

export class NativeApolloClient implements GraphqlClient {

    private key: string = randomKey();
    private handlers = new Map<string, { resolve: (src: any) => void, reject: (src: any) => void }>();

    constructor(token?: string) {
        NativeGraphQL.createClient(this.key, '//api.openland.com/api', token);
    }

    async query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        let id = randomKey();
        let p = new Promise<any>((resolve, reject) => {
            this.handlers.set(id, { resolve, reject });
            // this.thread.postMessage(JSON.stringify(request));
        });
        NativeGraphQL.query(this.key, id, print(query.document));
        return await p;
    }

    refetch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        throw Error()
    }

    mutate<TMutation, TVars>(mutation: GraphqlMutation<TMutation, TVars>, vars?: TVars): Promise<TMutation> {
        throw Error()
    }

    subscribe(subscription: any, vars?: any): GraphqlActiveSubscription {
        throw Error()
    }

    useQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery {
        throw Error()
    }

    useWithoutLoaderQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery | null {
        throw Error()
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