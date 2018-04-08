import gql from 'graphql-tag';
import { ParcelFull } from './Parcels';

export const SourcingQuery = gql`
    query Sourcing($cursor: String, $page: Int) {
        alphaOpportunities(first: 50, after: $cursor, page: $page) {
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