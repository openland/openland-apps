import { gql } from 'react-apollo';
import graphqlList from './graphqlList';
import graphqlRouted from './graphqlRouted';

export interface Permit {
    id?: string;
    issuedAt?: string;
    createdAt?: string;
    status?: string;
    statusUpdatedAt?: string;
    streetNumbers?: [StreetNumber];

    type?: string;
    typeWood?: boolean;

    existingStories?: number;
    proposedStories?: number;
    existingUnits?: number;
    proposedUnits?: number;
    existingAffordableUnits?: number;
    proposedAffordableUnits?: number;
    proposedUse?: string;
    description?: string;
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
                statusUpdatedAt
                type
                typeWood
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

const PermitsPipelineQuery = gql`
query Permits($cursor: String) {
    items: permitsPipeline(first: 50, after: $cursor) {
        edges {
            node {
                id
                issuedAt
                createdAt
                status
                statusUpdatedAt
                type
                typeWood
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
            statusUpdatedAt
            type
            typeWood
            existingStories
            proposedStories
            existingUnits
            proposedUnits
            existingAffordableUnits
            proposedAffordableUnits
            proposedUse
            description
            
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

export const withPermitsQuery = graphqlList<Permit>(PermitsQuery);

export const withPermitsPipelineQuery = graphqlList<Permit>(PermitsPipelineQuery);

export const withPermitQuery = graphqlRouted<{ permit: Permit }>(PermitQuery);