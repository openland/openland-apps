import gql from 'graphql-tag';
import { graphqlList, graphqlListPaged } from '../utils/graphqlList';
import { graphqlRouted } from '../utils/graphqlRouted';
import { Chart } from './Chart';

export interface Permit {
    id: string;
    issuedAt?: string;
    createdAt?: string;
    startedAt?: string;
    expiresAt?: string;
    expiredAt?: string;
    filedAt?: string;
    completedAt?: string;

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

    events: [PermitEvent];

    relatedPermits: [Permit];

    governmentalUrl: string;

    approvalTime?: number;
}

export interface StatusChanged extends PermitEvent {
    oldStatus: string;
    newStatus: string;
    date: string;
}

export interface FieldChanged extends PermitEvent {
    fieldName: string;
    oldValue: string;
    newValue: string;
    date: string;
}

export interface PermitEvent {
    __typename: string;
}

export interface StreetNumber {
    streetId: string;
    streetName: string;
    streetNameSuffix?: string;
    streetNumber: number;
    streetNumberSuffix?: string;
}

export interface PermitsStats {
    stats: {
        approvalTimes: Chart;
        approvalDistribution: Chart;
    }
}

const PermitsQuery = gql`
    query Permits($cursor: String, $filter: String, $page: Int, $type: PermitType, $sort: PermitSorting, $minUnits: Int, $issuedYear: String, $fromPipeline: Boolean) {
        items: permits(filter: $filter, first: 50, after: $cursor, page: $page, type: $type, sort: $sort, minUnits: $minUnits, issuedYear: $issuedYear, fromPipeline: $fromPipeline) {
            edges {
                node {
                    id
                    issuedAt
                    createdAt
                    status
                    statusUpdatedAt
                    type
                    typeWood
                    description
                    approvalTime
                    existingUnits
                    proposedUnits
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
                itemsCount
                currentPage
                pagesCount
                openEnded
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
            startedAt
            expiresAt
            expiredAt
            completedAt
            filedAt
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
            governmentalUrl
            approvalTime

            streetNumbers {
                streetId
                streetName
                streetNameSuffix
                streetNumber
                streetNumberSuffix
            }

            events {
                ... on PermitEventStatus {
                    oldStatus
                    newStatus
                    date
                }
                ... on PermitEventFieldChanged {
                    fieldName
                    oldValue
                    newValue
                    date
                }
            }

            relatedPermits {
                id
                createdAt
                status
                type
                typeWood
                description
                approvalTime
                existingUnits
                proposedUnits
                statusUpdatedAt
                filedAt
                streetNumbers {
                    streetId
                    streetName
                    streetNameSuffix
                    streetNumber
                    streetNumberSuffix
                }
            }
        }
    }
`;

export const withPermitsQuery = graphqlList<Permit, PermitsStats>(PermitsQuery, {
    params: ['filter', 'cursor', 'page', 'type', 'sort', 'minUnits', 'issuedYear', 'fromPipeline']
});

export const withPermitsPagedQuery = graphqlListPaged<Permit, PermitsStats>(PermitsQuery, ['filter', 'cursor', 'page', 'type', 'sort', 'minUnits', 'issuedYear', 'fromPipeline']);

export const withPermitQuery = graphqlRouted<{ permit: Permit }>(PermitQuery, ['permitId']);