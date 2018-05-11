import gql from 'graphql-tag';

export const SuperCitiesQuery = gql`
    query SuperCities {
        superCities {
            id
            key
            name
            enabled
            blockSource
            blockSourceLayer
            parcelSource
            parcelSourceLayer
        }
    }
`;