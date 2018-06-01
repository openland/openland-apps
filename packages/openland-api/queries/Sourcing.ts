import gql from 'graphql-tag';
import { ParcelFull, ParcelShort, ParcelShortNoFolder } from './Parcels';

export const SourcingQuery = gql`
    query Sourcing($state: OpportunityState, $cursor: String, $page: Int, $sort: OpportunitySort, $query: String) {
        alphaOpportunities(state: $state, first: 50, after: $cursor, page: $page, sort: $sort, query: $query) {
            edges {
                node {
                    id
                    state
                    priority
                    updatedAt
                    parcel {
                        ...ParcelShort
                        extrasOwnerName
                    }
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

export const SourcingFirstQuery = gql`
    query SourcingFirst($state: OpportunityState, $cursor: String, $page: Int, $sort: OpportunitySort, $query: String, $first: Int!) {
        alphaOpportunities(state: $state, first: $first, after: $cursor, page: $page, sort: $sort, query: $query) {
            edges {
                node {
                    id
                    state
                    priority
                    updatedAt
                    parcel {
                        ...ParcelShort
                        extrasOwnerName
                    }
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

export const SourcingAllQuery = gql`
    query SourcingAll($state: OpportunityState, $query: String) {
        alphaAllOpportunities(state: $state, query: $query) {
            id
            state
            priority
            updatedAt
            parcel {
                ...ParcelShort
                extrasOwnerName
            }
        }
    }
    ${ParcelShort}
`;

export const SourcingAllReportQuery = gql`
    query SourcingAllReport($state: OpportunityState, $query: String) {
        alphaAllOpportunities(state: $state, query: $query) {
            id
            state
            priority
            updatedAt
            parcel {
                ...ParcelShortNoFolder
                extrasOwnerName
            }
        }
    }
    ${ParcelShortNoFolder}
`;

export const ProspectingCapacityQuery = gql`
    query ProspectingCapacity($state: OpportunityState, $query: String) {
        totalCapacity: alphaOpportunitiesCapacity(state: $state, query: $query)
    }
`;

export const OpportunityQuery = gql`
    query Opportunity($opportunityId: ID!) {
        alphaOpportunity(id: $opportunityId) {
            id
            state
            priority
            updatedAt
            parcel {
                ...ParcelFull
            }
        }
    }
    ${ParcelFull}
`;

export const OpportunityTileOverlayQuery = gql`
    query OpportunityTileOverlay($box: GeoBox!, $query: String) {
        tiles: alphaOpportunityOverlay(box: $box, limit: 5000, query: $query) {
            id
            center {
                latitude
                longitude
            }
            parcel {
                id
            }
        }
    }
`;

export const AddOpportunityMutation = gql`
    mutation AddOpportunity($parcelId: ID!) {
        aphaAddOpportunity(parcelId: $parcelId) {
            id
            state
            priority
            updatedAt
            parcel {
                id
                opportunity {
                    id
                }
            }
        }
    }
`;

export const ApproveOpportunityMutation = gql`
    mutation ApproveOpportunity($opportunityId: ID!, $state: OpportunityState!) {
        alphaApprove(opportunityId: $opportunityId, state: $state)
    }
`;
export const RejectOpportunityMutation = gql`
    mutation RejectOpportunity($opportunityId: ID!, $state: OpportunityState!) {
        alphaReject(opportunityId: $opportunityId, state: $state)
    }
`;
export const SnoozeOpportunityMutation = gql`
    mutation SnoozeOpportunity($opportunityId: ID!, $state: OpportunityState!) {
        alphaSnooze(opportunityId: $opportunityId, state: $state)
    }
`;

export const ResetOpportunityMutation = gql`
    mutation ResetOpportunity($opportunityId: ID!, $state: OpportunityState!) {
        alphaReset(opportunityId: $opportunityId, state: $state)
    }
`;

export const AddOpportunityFromSearchMutation = gql`
    mutation AddOpportunityFromSearch($query: String!) {
        alphaAddOpportunitiesFromSearch(state: "NY", county: "New York", city: "New York", query: $query)
    }
`;

export const NextOpportunityQuery = gql`
    query NextOpportunity($state: OpportunityState!, $initialId: ID, $sort: OpportunitySort, $query: String) {
        alphaNextReviewOpportunity(state: $state, initialId: $initialId, sort: $sort, query: $query) {
            id
            state
            priority
            updatedAt
            parcel {
                ...ParcelFull
            }
        }
    }
    ${ParcelFull}
`;

export const OpportunityStatsQuery = gql`
    query OpportunityStats($query: String) {
        incoming: alphaOpportunitiesCount(state: INCOMING, query: $query)
        approved_initial: alphaOpportunitiesCount(state: APPROVED_INITIAL, query: $query)
        approved_zoning: alphaOpportunitiesCount(state: APPROVED_ZONING, query: $query)
        approved: alphaOpportunitiesCount(state: APPROVED, query: $query)
        rejected: alphaOpportunitiesCount(state: REJECTED, query: $query)
        snoozed: alphaOpportunitiesCount(state: SNOOZED, query: $query)
    }
`;

export const OwnersQuery = gql`
    query Owners($state: OpportunityState, $query: String) {
        items: alphaOpportunityUsers(state: $state, query: $query)
    }
`;