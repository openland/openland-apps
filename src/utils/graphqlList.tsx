import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { GraphQLRoutedComponentProps, NotNullableDataProps } from './graphql';
import { withRouter, RouterState } from './withRouter';
import { prepareParams } from './utils';

export interface ListQueryResponse<T, E> {
    items: ListQueryConnection<T> & E;
    loadMoreEntries(): void;
}

export type ListQueryData<T> = NotNullableDataProps<ListQueryResponse<T, {}>>;

export interface ListQueryConnection<T> {
    edges: [ListQueryEdge<T>];
    pageInfo: {
        hasNextPage: boolean
    };
}

export interface ListQueryEdge<T> {
    node: T;
    cursor: string;
}

export type GraphQLListComponentProps<TResult, TExtras> = GraphQLRoutedComponentProps<ListQueryResponse<TResult, TExtras>>;

export function graphqlList<TResult, TExtras = {}>(document: DocumentNode, params: string[] = []) {
    return function (component: React.ComponentType<GraphQLListComponentProps<TResult, TExtras>>): React.ComponentType<{}> {
        let qlWrapper = graphql<ListQueryResponse<TResult, TExtras>, { router: RouterState }, GraphQLListComponentProps<TResult, TExtras>>(document, {
            options: (props: { router: RouterState }) => {
                return {
                    variables: {
                        ...prepareParams(params, props.router.query)
                    },
                    notifyOnNetworkStatusChange: true
                };
            },
            props: (props) => {
                return {
                    data: {
                        loadMoreEntries: () => {
                            if (props.data!!.networkStatus !== 7 || !props.data!!.items.pageInfo.hasNextPage) {
                                return;
                            }
                            props.data!!.fetchMore({
                                query: document,
                                variables: {
                                    ...props.ownProps.router.query,
                                    cursor: props.data!!.items.edges.slice(-1)[0].cursor,
                                },
                                updateQuery: (previousResult, { fetchMoreResult }) => {
                                    let newEdges = (fetchMoreResult as any).items.edges;
                                    let pageInfo = (fetchMoreResult as any).items.pageInfo;
                                    return newEdges.length ? {
                                        items: {
                                            __typename: (previousResult as any).items.__typename,
                                            edges: [...(previousResult as any).items.edges, ...newEdges],
                                            pageInfo: pageInfo
                                        }
                                    } : previousResult;
                                }
                            });
                        },
                        ...props.data
                    }
                };
            }
        });

        return withRouter(qlWrapper(component));
    };
}