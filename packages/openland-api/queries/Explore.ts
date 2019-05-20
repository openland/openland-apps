import gql from 'graphql-tag';
import { OrganizationShort } from 'openland-api/fragments/OrganizationShort';
import { UserShort } from 'openland-api/fragments/UserShort';

export const AvailableRoomsQuery = gql`
    query AvailableRooms {
        userRooms: betaUserRooms(limit: 3) {
            ... on SharedRoom {
                id
                kind
                title
                photo
                membersCount
                membership
                organization {
                    id
                    name
                    photo
                }
            }
        }
        availableRooms: betaUserAvailableRooms(limit: 3) {
            ... on SharedRoom {
                id
                kind
                title
                photo
                membersCount
                membership
                organization {
                    id
                    name
                    photo
                }
            }
        }
    }
`;

export const UserRoomsQuery = gql`
    query UserRooms($limit: Int!, $after: ID) {
        betaUserRooms(limit: $limit, after: $after) {
            ... on SharedRoom {
                id
                kind
                title
                photo
                membersCount
                membership
                organization {
                    id
                    name
                    photo
                }
            }
        }
    }
`;

export const UserAvailableRoomsQuery = gql`
    query UserAvailableRooms($limit: Int!, $after: ID) {
        betaUserAvailableRooms(limit: $limit, after: $after) {
            ... on SharedRoom {
                id
                kind
                title
                photo
                membersCount
                membership
                organization {
                    id
                    name
                    photo
                }
            }
        }
    }
`;

export const GlobalSearchQuery = gql`
    query GlobalSearch($query: String!) {
        items: alphaGlobalSearch(query: $query) {
            ... on Organization {
                ...OrganizationShort
            }
            ... on User {
                ...UserShort
            }
            ... on SharedRoom {
                id
                kind
                title
                roomPhoto: photo
                membersCount
                membership
                organization {
                    id
                    name
                    photo
                }
            }
        }
    }
    ${OrganizationShort}
    ${UserShort}
`;