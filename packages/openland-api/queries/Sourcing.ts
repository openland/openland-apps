import gql from 'graphql-tag';
import { ParcelFull, ParcelShort } from './Parcels';

export const SourcingQuery = gql`
    query Sourcing($state: OpportunityState, $cursor: String, $page: Int, $sort: OpportunitySort) {
        alphaOpportunities(state: $state, first: 50, after: $cursor, page: $page, sort: $sort) {
            edges {
                node {
                    id
                    state
                    priority
                    updatedAt
                    parcel {
                        ...ParcelShort
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

export const AddOpportunityMutation = gql`
    mutation AddOpportunityMutation($parcelId: ID!) {
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
    mutation ApproveOpportunityMutation($opportunityId: ID!, $state: OpportunityState!) {
        alphaApprove(opportunityId: $opportunityId, state: $state)
    }
`;
export const RejectOpportunityMutation = gql`
    mutation RejectOpportunityMutation($opportunityId: ID!, $state: OpportunityState!) {
        alphaReject(opportunityId: $opportunityId, state: $state)
    }
`;
export const SnoozeOpportunityMutation = gql`
    mutation SnoozeOpportunityMutation($opportunityId: ID!, $state: OpportunityState!) {
        alphaSnooze(opportunityId: $opportunityId, state: $state)
    }
`;

export const AddOpportunityFromSearchMutation = gql`
    mutation alphaAddOpportunitiesFromSearch($query: String!) {
        alphaAddOpportunitiesFromSearch(state: "NY", county: "New York", city: "New York", query: $query)
    }
`;

export const NextOpportunityQuery = gql`
    query NextOpportunity($state: OpportunityState!, $initialId: ID, $sort: OpportunitySort) {
        alphaNextReviewOpportunity(state: $state, initialId: $initialId, sort: $sort) {
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
    query OpportunityStats {
        incoming: alphaOpportunitiesCount(state: INCOMING)
        approved_initial: alphaOpportunitiesCount(state: APPROVED_INITIAL)
        approved_zoning: alphaOpportunitiesCount(state: APPROVED_ZONING)
        approved: alphaOpportunitiesCount(state: APPROVED)
        rejected: alphaOpportunitiesCount(state: REJECTED)
        snoozed: alphaOpportunitiesCount(state: SNOOZED)
    }
`;