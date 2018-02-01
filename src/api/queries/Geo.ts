import gql from 'graphql-tag';

export const GeoShort = gql`
   fragment GeoShort on Geo {
        latitude
        longitude
   }
`;