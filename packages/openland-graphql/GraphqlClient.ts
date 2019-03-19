import { GraphqlTypedQuery, GraphqlTypedMutation, GraphqlTypedSubscription } from 'openland-y-graphql/typed';

export class NetworkError {

}

export class GraphqlError {

}

export type GraphqlQuery<Q, V> = GraphqlTypedQuery<Q, V>;
export type GraphqlMutation<M, V> = GraphqlTypedMutation<M, V>;
export type GraphqlSubscription<M, V> = GraphqlTypedSubscription<M, V>;

export interface GraphqlActiveSubscription<TSubs, TVars> {
    get(): Promise<TSubs>;
    updateVariables(src?: TVars): void;
    destroy(): void;
};

export interface GraphqlQueryWatch<TQuery> {
    get(): Promise<TQuery>;
    destroy(): void;
};

export interface GraphqlClient {
    query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery>;
    queryWatch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): GraphqlQueryWatch<TQuery>;
    refetch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery>;
    mutate<TMutation, TVars>(mutation: GraphqlMutation<TMutation, TVars>, vars?: TVars): Promise<TMutation>;
    subscribe<TSubscription, TVars>(subscription: GraphqlSubscription<TSubscription, TVars>, vars?: TVars): GraphqlActiveSubscription<TSubscription, TVars>;

    useQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery;
    useWithoutLoaderQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery | null;

    updateQuery<TQuery, TVars>(updater: (data: TQuery) => TQuery | null, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<boolean>
    readQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery | null>;
    writeQuery<TQuery, TVars>(data: TQuery, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<void>;
}