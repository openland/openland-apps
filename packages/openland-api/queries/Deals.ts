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
                extrasArea
            }
        }
    }
`;

export const AllDealsMapQuery = gql`
    query AllDealsMap {
        deals {
            id
            status
            parcel {
                id
                title
                center { 
                    latitude
                    longitude
                }
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
                extrasArea
                extrasShapeType
                extrasShapeSides
                extrasFitProjects
                extrasAnalyzed
                extrasVacant
                compatibleBuildings {
                    key
                    title
                    width
                    height
                    center {
                        latitude
                        longitude
                    }
                    angle
                    shape
                }

                city {
                    id
                    name
                    county {
                        id
                        name
                    }
                    state {
                        id
                        name
                        code
                    }
                }
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