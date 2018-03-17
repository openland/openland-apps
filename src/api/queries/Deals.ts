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

            price
            extrasArea
            extrasCompany

            parcel {
                id
                title
            }
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

            price
            extrasArea
            extrasCompany
            extrasAttorney
            extrasReferee
            extrasLotShape
            extrasLotSize
            extrasTaxBill

            parcel {
                id
                title
                geometry
                extrasZoning
                extrasLandValue
            }
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

            price
            extrasArea
            extrasCompany
            extrasAttorney
            extrasReferee
            extrasLotShape
            extrasLotSize
            extrasTaxBill

            parcel {
                id
                title
                geometry
            }
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

            price
            extrasArea
            extrasCompany
            extrasAttorney
            extrasReferee
            extrasLotShape
            extrasLotSize
            extrasTaxBill

            parcel {
                id
                title
                geometry
            }
        }
    }
`;

export const RemoveDealMutation = gql`
    mutation RemoveDeal($dealId: ID!) {
        dealRemove(id: $dealId)
    }
`;