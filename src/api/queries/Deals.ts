import gql from 'graphql-tag';

export const AllDealsQuery = gql`
    query AllDeals {
        deals {
            id
            title
        }
    }
`;

export const AddDealMitation = gql`
    mutation AddDeal($data: DealInput!) {
        dealAdd(input: $data) {
            id
            title
        }
    }
`;