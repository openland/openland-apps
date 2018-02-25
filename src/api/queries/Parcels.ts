import gql from 'graphql-tag';

export const ParcelFull = gql`
  fragment ParcelFull on Parcel {
      id
      title
      geometry
      extrasArea
      extrasSupervisorDistrict
      extrasZoning
      extrasLandValue
      extrasImprovementValue
      extrasPropertyValue
      extrasFixturesValue
      extrasStories
      extrasUnits
      extrasRooms
      extrasBathrooms
      extrasBedrooms
      extrasYear
      extrasNeighborhood
      extrasMetroDistance
      extrasMetroStation
      extrasTrainDistance
      extrasTrainStation
      extrasTrainLocalDistance
      extrasTrainLocalStation
      addresses {
        streetId
        streetName
        streetNameSuffix
        streetNumber
        streetNumberSuffix
      }
      block {
        id
        title
        extrasArea
      }
      metadata {
        description
        available
        currentUse
      }
      likes {
          liked
          count
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
    query BlocksConnection($cursor: String, $page: Int) {
        items: blocksConnection(state: "CA", county: "San Francisco", city: "San Francisco", first: 50, after: $cursor, page: $page) {
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
    query ParcelsConnection($cursor: String, $query: String, $page: Int) {
        items: parcelsConnection(state: "CA", county: "San Francisco", city: "San Francisco", first: 50, after: $cursor, page: $page, query: $query) {
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

export const ParcelsFavorites = gql`
    query ParcelsFavorites {
        items: parcelFavorites {
            ...ParcelFull
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

export const ParcelsTileOverlay = gql`
    query ParcelsTileOverlay($box: GeoBox!, $query: String) {
        tiles: parcelsOverlay(box: $box, limit: 5000, query: $query) {
            id
            geometry
        }
    }
`;

export const ParcelsPointOverlay = gql`
    query ParcelsPointOverlay($box: GeoBox!, $query: String) {
        tiles: parcelsOverlay(box: $box, limit: 5000, query: $query) {
            id
            center {
                latitude
                longitude
            }
        }
    }
`;

export const BlocksTileOverlay = gql`
    query BlocksTileOverlay($box: GeoBox!, $query: String) {
        tiles: blocksOverlay(box: $box, limit: 5000, query: $query) {
            id
            geometry
        }
    }
`;

export const ParcelAlter = gql`
    mutation ParcelAlter($parcelId: ID!, $data: ParcelMetadataInput!) {
        parcelAlterMetadata(id: $parcelId, data: $data) {
            id
            metadata {
                description
                available
                currentUse
            }
        }
    }
`;

export const ParcelLike = gql`
    mutation ParcelLike($parcelId: ID!) {
        likeParcel(id: $parcelId) {
            id
            likes {
                liked
                count
            }
        }
    }
`;

export const ParcelUnlike = gql`
    mutation ParcelUnlike($parcelId: ID!) {
        unlikeParcel(id: $parcelId) {
            id
            likes {
                liked
                count
            }
        }
    }
`;

export const ParcelsStats = gql`
    query ParcelsStats($query: String) {
        parcelsStats(query: $query)
    }
`;
