import gql from 'graphql-tag';
import { OrganizationShort } from 'openland-api/fragments/OrganizationShort';
import { UserShort } from 'openland-api/fragments/UserShort';
import { RoomShort } from 'openland-api/fragments/RoomShort';
import { CommunitySearch } from 'openland-api/fragments/CommunitySearch';

export const AvailableRoomsQuery = gql`
    query AvailableRooms {
     
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
        suggestedRooms: betaSuggestedRooms {
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
        communities: alphaComunityPrefixSearch( first: 3) {
            edges {
                node {
                    ...CommunitySearch
                }
            }
        }
        isDiscoverDone: betaIsDiscoverDone

    }
    ${CommunitySearch}
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

export const DiscoverNextPageQuery = gql`
    query DiscoverNextPage($selectedTagsIds: [String!]!, $excudedGroupsIds: [String!]!) {
        betaNextDiscoverPage(selectedTagsIds: $selectedTagsIds, excudedGroupsIds: $excudedGroupsIds) {
            chats{
                ...RoomShort
            }
            tagGroup{
                id
                title
                subtitle
                tags{
                    id
                    title
                }
            }
        }
    }
    ${RoomShort}
    ${UserShort}
`;

export const DiscoverIsDoneQuery = gql`
    query DiscoverIsDone {
        betaIsDiscoverDone
    }
`;