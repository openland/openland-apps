import gql from 'graphql-tag';

export const BlockShort = gql`
   fragment BlockShort on Block {
        id
        title
   }
`;

export const PermitsConnection = gql`
    query BlocksConnection($cursor: String, $filter: String, $page: Int) {
        items: blocksConnection(state: "CA", county: "San Francisco", city: "San Francisco", filter: $filter, first: 50, after: $cursor, page: $page) {
            edges {
                node {
                    ...BlockShort
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                itemsCount
                currentPage
                pagesCount
                openEnded
            }
        }
    }
    ${BlockShort}
`;