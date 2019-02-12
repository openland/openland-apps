import gql from 'graphql-tag';
import { OrganizationShort } from 'openland-api/fragments/OrganizationShort';
import { UserShort } from 'openland-api/fragments/UserShort';

export const AvailableRoomsQuery = gql`
    query AvailableRooms {
        rooms: betaAvailableRooms {
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