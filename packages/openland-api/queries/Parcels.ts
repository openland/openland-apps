import gql from 'graphql-tag';
import { ParcelID } from '../fragments/ParcelID';

export const ParcelFull = gql`
  fragment ParcelFull on Parcel {
      id
      number {
          ...ParcelID
      }
      geometry
      center {
          latitude
          longitude
      }
      address

      compatibleBuildings {
          key
          title
          width
          height
          center {
              latitude
              longitude
          }
          angle
          shape
      }

      city {
          id
          name
          county {
              id
              name
          }
          state {
              id
              name
              code
          }
      }

      area {
          value
      }
      depth {
          value
      }
      front {
          value
      }

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
      extrasVacant
      extrasNeighborhood
      extrasBorough
      extrasMetroDistance
      extrasMetroStation
      extrasTrainDistance
      extrasTrainStation
      extrasTrainLocalDistance
      extrasTrainLocalStation

      extrasNearestTransitDistance
      extrasNearestTransitType
      extrasNearestTransitStation

      extrasLandUse
      extrasSalesDate
      extrasSalesPriorDate
      extrasRecordationDate

      extrasOwnerName
      extrasOwnerType
      extrasOwnerPublic

      extrasShapeType
      extrasShapeSides
      extrasFitProjects
      extrasAnalyzed
      extrasOwnerPublic

      extrasUnitCapacity
      extrasUnitCapacityFar
      extrasUnitCapacityDencity

      folder {
          id
          name
      }

      userData {
          notes
      }

      opportunity {
          id
          priority
          state
      }

      metadata {
        description
        available
        currentUse
        isOkForTower
      }
      likes {
          liked
          count
      }
      permits {
          id
          createdAt
          status
          statusUpdatedAt
          type
          typeWood
          description
          approvalTime
          proposedUnits
          existingUnits
          governmentalUrl
      }
      links {
          title
          url
      }
  }
  ${ParcelID}
`;

export const ParcelShort = gql`
  fragment ParcelShort on Parcel {
      id
      number {
          ...ParcelID
      }

      address
      geometry

      area {
          value
      }
      depth {
          value
      }
      front {
          value
      }

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
      extrasVacant
      extrasNeighborhood
      extrasBorough
      extrasMetroDistance
      extrasMetroStation
      extrasTrainDistance
      extrasTrainStation
      extrasTrainLocalDistance
      extrasTrainLocalStation

      extrasNearestTransitDistance
      extrasNearestTransitType
      extrasNearestTransitStation

      extrasLandUse
      extrasSalesDate
      extrasSalesPriorDate
      extrasRecordationDate

      extrasShapeType
      extrasShapeSides
      extrasFitProjects
      extrasAnalyzed

      extrasUnitCapacity
      extrasUnitCapacityFar
      extrasUnitCapacityDencity

      folder {
          id
          name
      }
      
      city {
          id
          name
          county {
              id
              name
          }
          state {
              id
              name
              code
          }
      }
  }
  ${ParcelID}
`;

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

export const BlocksConnectionQuery = gql`
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

export const ParcelsConnectionQuery = gql`
    query ParcelsConnection($cursor: String, $query: String, $page: Int, $state: String!, $county: String!, $city: String!) {
        items: parcelsConnection(state: $state, county: $county, city: $city, first: 50, after: $cursor, page: $page, query: $query) {
            edges {
                node {
                    ...ParcelShort
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
    ${ParcelShort}
`;

export const ParcelsFavoritesQuery = gql`
    query ParcelsFavorites {
        items: parcelFavorites {
            ...ParcelShort
        }
    }
    ${ParcelShort}
`;

export const ParcelsFavoritesCountQuery = gql`
    query ParcelsFavoritesCount {
        parcelFavoritesCount
        dealsCount
    }
`;

export const ParcelQuery = gql`
    query Parcel($parcelId: ID!) {
        item: parcel(id: $parcelId) {
            ...ParcelFull
        }
    }
    ${ParcelFull}
`;

export const ParcelsTileOverlayQuery = gql`
    query ParcelsTileOverlay($box: GeoBox!, $query: String) {
        tiles: parcelsOverlay(box: $box, limit: 5000, query: $query) {
            id
            geometry
        }
    }
`;

export const ParcelsMapSearchQuery = gql`
    query ParcelsMapSearch($box: GeoBox!, $query: String!, $zoom: Int!) {
        results: alphaParcelMap(box: $box, limit: 5000, query: $query, zoom: $zoom) {
            ref
            count
            lat
            lon
        }
    }
`;

export const ParcelsPointOverlayQuery = gql`
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

export const BlocksTileOverlayQuery = gql`
    query BlocksTileOverlay($box: GeoBox!, $query: String) {
        tiles: blocksOverlay(box: $box, limit: 5000, query: $query) {
            id
            geometry
        }
    }
`;

export const ParcelAlterMutation = gql`
    mutation ParcelAlter($parcelId: ID!, $data: ParcelMetadataInput!) {
        parcelAlterMetadata(id: $parcelId, data: $data) {
            id
            metadata {
                description
                available
                currentUse
                isOkForTower
            }
        }
    }
`;

export const ParcelLikeMutation = gql`
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

export const ParcelUnlikeMutation = gql`
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

export const ParcelsStatsQuery = gql`
    query ParcelsStats($query: String, $state: String!, $county: String!, $city: String!) {
        parcelsStats(query: $query, state: $state, county: $county, city: $city)
    }
`;

export const ParcelsSearchQuery = gql`
    query ParcelsSearch($query: String!) {
        items: searchParcels(query: $query) {
            id
            title
        }
    }
`;

export const ParcelNotesMutation = gql`
    mutation ParcelNotes($parcelId: ID!, $notes: String!) {
        alphaSetNote(parcelId: $parcelId, notes: $notes) {
            id
            userData {
                notes
            }
        }
    }
`;