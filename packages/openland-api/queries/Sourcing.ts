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