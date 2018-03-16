import gql from 'graphql-tag';

export const AllDealsQuery = gql`
    query AllDeals {
        deals {
            id
            title
            location
            address
            status
            statusDescription
            statusDate
        }
    }
`;

export const DealQuery = gql`
    query Deal($dealId: ID!) {
        deal(id: $dealId) {
            id
            title
            location
            address
            status
            statusDescription
            statusDate
        }
    }
`;

export const AddDealMitation = gql`
    mutation AddDeal($data: DealInput!) {
        dealAdd(input: $data) {
            id
            title
            location
            address
            status
            statusDescription
            statusDate
        }
    }
`;

export const AlterDealMitation = gql`
    mutation AlterDeal($dealId: ID!, $data: DealInput!) {
        dealAlter(id: $dealId, input: $data) {
            id
            title
            location
            address
            status
            statusDescription
            statusDate
        }
    }
`;