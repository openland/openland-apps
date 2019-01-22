import { GraphqlTypedQuery, GraphqlTypedMutation } from 'openland-y-graphql/typed';

export class NetworkError {

}

export class GraphqlError {

}

export type GraphqlQuery<Q, V> = GraphqlTypedQuery<Q, V>;
export type GraphqlMutation<M, V> = GraphqlTypedMutation<M, V>;

export interface GraphqlActiveSubscription {
    get(): Promise<any>;
    updateVariables(src?: any): void;
    destroy(): void;
};

export interface GraphqlClient {
    query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery>;
    subscribe(subscription: any, vars?: any): GraphqlActiveSubscription;
    mutate<TMutation, TVars>(mutation: GraphqlMutation<TMutation, TVars>, vars?: TVars): Promise<TMutation>;

    readQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery | null;
    writeQuery<TQuery, TVars>(data: TQuery, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): void;
}