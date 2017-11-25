import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';

export interface ListQueryResponse<T> {
    items: ListQueryConnection<T>;
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

export default function <TResult, TProps = {}>(document: DocumentNode) {
    return graphql<ListQueryResponse<TResult>, TProps>(document, {
        options: (args: any) => {
            return {
                variables: {
                    ...args
                }
            };
        },
        props: (props) => {
            console.warn(props);
            return {
                data: {
                    loadMoreEntries: () => {
                        props.data!!.fetchMore({
                            query: document,
                            variables: {
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
                        //
                    },
                    ...props.data
                }
            };
        }
    });
}