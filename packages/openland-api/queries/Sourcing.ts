import gql from 'graphql-tag';
import { ParcelFull } from './Parcels';

export const SourcingQuery = gql`
    query Sourcing($state: OpportunityState, $cursor: String, $page: Int) {
        alphaOpportunities(state: $state, first: 50, after: $cursor, page: $page) {
            edges {
                node {
                    id
                    state
                    priority
                    parcel {
                        ...ParcelFull
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
    ${ParcelFull}
`;

export const AddOpportunityMutation = gql`
    mutation AddOpportunityMutation($parcelId: ID!) {
        aphaAddOpportunity(parcelId: $parcelId) {
            id
            state
            priority
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

export const NextOpportunityQuery = gql`
    query NextOpportunity($state: OpportunityState!) {
        alphaNextReviewOpportunity(state: $state) {
            id
            state
            priority
            parcel {
                ...ParcelFull
            }
        }
    }
    ${ParcelFull}
`;