import { gql, graphql } from 'react-apollo';

export interface PermitsResponse {
    permits: PermitsConnection;

    loadMoreEntries(): void;
}

export interface PermitsConnection {
    edges: [PermitEdge];
}

export interface PermitEdge {
    node: Permit;
    cursor: string;
}

export interface Permit {
    id?: string;
    issuedAt?: string;
}

const PermitsQuery = gql`
query Permits($cursor: String) {
    permits(first: 50, after: $cursor) {
        edges {
            node {
                id
                issuedAt
            }
            cursor
        }
        pageInfo {
            hasNextPage
            hasPreviousPage
        }
    }
}
`;

export const withPermitsQuery = graphql<PermitsResponse>(PermitsQuery, {
    props: (props) => {
        console.warn(props);
        return {
            data: {
                loadMoreEntries: () => {
                    props.data!!.fetchMore({
                        query: PermitsQuery,
                        variables: {
                            cursor: props.data!!.permits.edges.slice(-1)[0].cursor
                        },
                        updateQuery: (previousResult, { fetchMoreResult }) => {                            
                            let newEdges = (fetchMoreResult as PermitsResponse).permits.edges;
                            let pageInfo = (fetchMoreResult as any).permits.pageInfo;
                            return newEdges.length ? {
                                permits: {
                                    __typename: (previousResult as any).permits.__typename,
                                    edges: [...(previousResult as any).permits.edges, ...newEdges],
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