import { GraphqlTypedQuery, GraphqlTypedMutation, GraphqlTypedSubscription } from 'openland-y-graphql/typed';

export interface InvalidField {
    key: string;
    messages: string[];
}

export class ApiError extends Error {

    // readonly graphqlErrors: GraphQLError[];
    readonly invalidFields: InvalidField[];

    constructor(message: string, invalidFields: InvalidField[]) {
        super(message);
        this.invalidFields = invalidFields;
        (this as any).__proto__ = ApiError.prototype;
    }
}

export class UnknownError extends Error {
    constructor() {
        super('An unexpected error occurred. Please, try again. If the problem persists, please contact support@openland.com.');
        (this as any).__proto__ = UnknownError.prototype;
    }
}

export type GraphqlQuery<Q, V> = GraphqlTypedQuery<Q, V>;
export type GraphqlMutation<M, V> = GraphqlTypedMutation<M, V>;
export type GraphqlSubscription<M, V> = GraphqlTypedSubscription<M, V>;

export type GraphqlQueryResult<Q> = { data?: Q, error?: Error };

export interface GraphqlActiveSubscription<TSubs, TVars> {
    get(): Promise<TSubs>;
    updateVariables(src?: TVars): void;
    destroy(): void;
};

export interface GraphqlQueryWatch<TQuery> {
    subscribe(handler: (args: GraphqlQueryResult<TQuery>) => void): void;
    currentResult(): GraphqlQueryResult<TQuery> | undefined;
    result(): Promise<GraphqlQueryResult<TQuery>>;
    destroy(): void;
};

export interface OperationParameters {
    fetchPolicy?: 'cache-first' | 'network-only' | 'cache-and-network' | 'network-only' | 'no-cache'
}

export interface GraphqlClient {
    query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, params?: OperationParameters): Promise<TQuery>;
    queryWatch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, params?: OperationParameters): GraphqlQueryWatch<TQuery>;
    mutate<TMutation, TVars>(mutation: GraphqlMutation<TMutation, TVars>, vars?: TVars): Promise<TMutation>;
    subscribe<TSubscription, TVars>(subscription: GraphqlSubscription<TSubscription, TVars>, vars?: TVars): GraphqlActiveSubscription<TSubscription, TVars>;

    updateQuery<TQuery, TVars>(updater: (data: TQuery) => TQuery | null, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<boolean>
    readQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery | null>;
    writeQuery<TQuery, TVars>(data: TQuery, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<void>;
}