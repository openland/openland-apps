import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import * as qs from 'query-string';

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

function fetchSearchQuery(): any {
    let s = qs.parse(location.search);
    if (s.year === undefined) {
        s.year = null;
    }
    if (s.minUnits === undefined) {
        s.minUnits = null;
    }
    return s;
}

export default function <TResult, TProps = {}>(document: DocumentNode) {
    return graphql<ListQueryResponse<TResult>, TProps>(document, {
        options: (args: any) => {
            return {
                variables: {
                    ...fetchSearchQuery(),
                    ...args
                }
            };
        },
        props: (props) => {
            return {
                data: {
                    loadMoreEntries: () => {
                        props.data!!.fetchMore({
                            query: document,
                            variables: {
                                ...fetchSearchQuery(),
                                ...(props.ownProps as any),
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
}