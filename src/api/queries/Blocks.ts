import gql from 'graphql-tag';

export const ParcelFull = gql`
  fragment ParcelFull on Parcel {
      id
      title
      geometry
      extrasArea
      extrasSupervisorDistrict
      extrasZoning
      block {
        id
        title
        extrasArea
      }
  }
`

export const BlockShort = gql`
   fragment BlockShort on Block {
        id
        title
        extrasArea
        extrasSupervisorDistrict
        extrasZoning
   }
`;

export const BlockFull = gql`
   fragment BlockFull on Block {
        id
        title
        extrasArea
        extrasZoning
        extrasSupervisorDistrict
        geometry
        parcels {
            id
            title
            geometry
            extrasZoning
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

export const ParcelsConnection = gql`
    query ParcelsConnection($cursor: String, $filter: String, $page: Int) {
        items: parcelsConnection(state: "CA", county: "San Francisco", city: "San Francisco", filter: $filter, first: 50, after: $cursor, page: $page) {
            edges {
                node {
                    ...ParcelFull
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
    ${ParcelFull}
`;

export const ParcelQuery = gql`
    query Parcel($parcelId: ID!) {
        item: parcel(id: $parcelId) {
            ...ParcelFull
        }
    }
    ${ParcelFull}
`;