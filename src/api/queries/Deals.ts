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