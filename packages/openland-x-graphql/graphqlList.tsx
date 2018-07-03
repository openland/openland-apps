import { GraphQLRoutedComponentProps, NotNullableDataProps } from './graphql';

export interface ListQueryResponse<T, E> {
    items: ListQueryConnection<T> & E;
    loadMoreEntries(): void;
}

export interface ListPagedQueryResponse<T, E> {
    items: ListQueryConnection<T> & E;
}

export type ListQueryData<T> = NotNullableDataProps<ListQueryResponse<T, {}>>;
export type ListQueryPagedData<T> = NotNullableDataProps<ListPagedQueryResponse<T, {}>>;

export interface ListQueryConnection<T> {
    edges: ListQueryEdge<T>[];
    pageInfo: {
        hasNextPage: boolean;
        itemsCount: number;
        pagesCount: number;
        currentPage: number;
        openEnded: boolean;
    };
}

export interface ListQueryEdge<T> {
    node: T;
    cursor: string;
}

export type GraphQLListComponentProps<TResult, TExtras> = GraphQLRoutedComponentProps<ListQueryResponse<TResult, TExtras>>;

export type GraphQLListComponentPagedProps<TResult, TExtras> = GraphQLRoutedComponentProps<ListPagedQueryResponse<TResult, TExtras>>;

export type GraphQLParamDescription = ({ key: string, default?: string } | string);

export interface GraphQLListConfig {
    params?: GraphQLParamDescription[];
}