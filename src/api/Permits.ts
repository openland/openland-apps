import { gql } from 'react-apollo';
import graphqlList from './graphqlList';
import graphqlRouted from './graphqlRouted';

export interface Permit {
    id?: string;
    issuedAt?: string;
    createdAt?: string;
    status?: string;
    streetNumbers?: [StreetNumber];
}

export interface StreetNumber {
    streetId: string;
    streetName: string;
    streetNameSuffix?: string;
    streetNumber: number;
    steetNumberSuffix?: string;
}

const PermitsQuery = gql`
query Permits($cursor: String, $filter: String) {
    items: permits(filter: $filter, first: 50, after: $cursor) {
        edges {
            node {
                id
                issuedAt
                createdAt
                status
                streetNumbers {
                    streetId
                    streetName
                    streetNameSuffix
                    streetNumber
                    streetNumberSuffix
                }
            }
            cursor
        }
        pageInfo {
            hasNextPage
            hasPreviousPage
        }
    }
}
`;

const PermitQuery = gql`
    query Permit($permitId: ID!) {
        permit(id: $permitId) {
            id
            issuedAt
            createdAt
            status
            streetNumbers {
                streetId
                streetName
                streetNameSuffix
                streetNumber
                streetNumberSuffix
            }
        }
    }
`;

export const withPermitsQuery = graphqlList<Permit, { filter?: string }>(PermitsQuery);

export const withPermitQuery = graphqlRouted<{ permit: Permit }>(PermitQuery);