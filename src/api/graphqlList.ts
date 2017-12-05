import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { GraphQLRoutedComponentProps } from './utils';
import { RouteQueryStringProps, withRouterQueryString } from './withRouterQueryString';

export interface ListQueryResponse<T> {
    items: ListQueryConnection<T>;
    isLoading: boolean;
    loadMoreEntries(): void;
}

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

export type GraphQLListComponentProps<TResult> = GraphQLRoutedComponentProps<ListQueryResponse<TResult>>;

export default function <TResult>(document: DocumentNode) {
    return function (component: React.ComponentType<GraphQLListComponentProps<TResult>>): React.ComponentType<{}> {
        let qlWrapper = graphql<ListQueryResponse<TResult>, RouteQueryStringProps, GraphQLListComponentProps<TResult>>(document, {
            options: (props: RouteQueryStringProps) => {
                return {
                    variables: {
                        ...props.match.params,
                        ...props.queryString
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
                                    ...props.ownProps.queryString,
                                    ...props.ownProps.match.params,
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

        return withRouterQueryString(qlWrapper(component));
    };
}