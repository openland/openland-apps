import { gql, graphql } from 'react-apollo';
import graphqlRouted from './graphqlRouted';

export interface AdminCity {
    id: string;
    name: string;
    activated: boolean;
}

export interface AdminCitesResponse {
    adminCities: [AdminCity];
}

export interface AdminCityResponse {
    adminCity: AdminCity;
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

const QueryCity = gql`
    query city($cityId: ID!){
        adminCity(id: cityId) {
            id
            name
            activated
        }
    }
 `;

export const withAdminCities = graphql<AdminCitesResponse>(QueryCities);
export const withAdminCity = graphqlRouted<AdminCityResponse>(QueryCity);