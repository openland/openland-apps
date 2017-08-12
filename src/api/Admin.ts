import { gql, graphql } from 'react-apollo';
// import graphqlRouted from './graphqlRouted';

export interface AdminCity {
    id: string;
    name: string;
    activated: boolean;
}

export interface AdminCitesResponse {
    adminCities: [AdminCity];
}

const QueryCities = gql`
    query {
        adminCities {
            id
            name
            activated
        }
    }
 `;

export const withAdminCities = graphql<AdminCitesResponse>(QueryCities);