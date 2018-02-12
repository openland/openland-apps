import gql from 'graphql-tag';

export const BlockShort = gql`
   fragment BlockShort on Block {
        id
        title
        extrasArea
        extrasSupervisorDistrict
   }
`;

export const BlockFull = gql`
   fragment BlockFull on Block {
        id
        title
        extrasArea
        extrasSupervisorDistrict
        geometry
        parcels {
            id
            title
            geometry
        }
   }
`;

export const BlocksConnection = gql`
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

export const BlockQuery = gql`
    query Block($blockId: ID!) {
        item: block(id: $blockId) {
            ...BlockFull
        }
    }
    ${BlockFull}
`;