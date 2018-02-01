import gql from 'graphql-tag';

export const PermitShort = gql`
    fragment PermitShort on Permit {
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
        streetNumbers {
            streetId
            streetName
            streetNameSuffix
            streetNumber
            streetNumberSuffix
        }
    }
`;

export const PermitFull = gql`
  fragment PermitFull on Permit {
    id
    issuedAt
    createdAt
    startedAt
    expiresAt
    expiredAt
    completedAt
    filedAt
    status
    statusUpdatedAt
    type
    typeWood
    existingStories
    proposedStories
    existingUnits
    proposedUnits
    existingAffordableUnits
    proposedAffordableUnits
    proposedUse
    description
    governmentalUrl
    approvalTime

    streetNumbers {
        streetId
        streetName
        streetNameSuffix
        streetNumber
        streetNumberSuffix
    }

    events {
        ... on PermitEventStatus {
            oldStatus
            newStatus
            date
        }
        ... on PermitEventFieldChanged {
            fieldName
            oldValue
            newValue
            date
        }
    }

    relatedPermits {
        id
        createdAt
        status
        type
        typeWood
        description
        approvalTime
        existingUnits
        proposedUnits
        statusUpdatedAt
        filedAt
        streetNumbers {
            streetId
            streetName
            streetNameSuffix
            streetNumber
            streetNumberSuffix
        }
    }
  }
`;

export const PermitQuery = gql`
    query Permit($permitId: ID!) {
        permit(id: $permitId) {
            ...PermitFull
        }
    }
    ${PermitFull}
`;

export const PermitsConnection = gql`
    query PermitsConnection($cursor: String, $filter: String, $page: Int, $type: PermitType, $sort: PermitSorting, $minUnits: Int, $issuedYear: String, $fromPipeline: Boolean) {
        items: permits(filter: $filter, first: 50, after: $cursor, page: $page, type: $type, sort: $sort, minUnits: $minUnits, issuedYear: $issuedYear, fromPipeline: $fromPipeline) {
            edges {
                node {
                    ...PermitShort
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
    ${PermitShort}
`;