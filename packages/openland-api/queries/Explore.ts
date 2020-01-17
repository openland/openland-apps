import gql from 'graphql-tag';
import { OrganizationShort } from 'openland-api/fragments/OrganizationShort';
import { UserShort } from 'openland-api/fragments/UserShort';
import { RoomShort } from 'openland-api/fragments/RoomShort';
import { CommunitySearch } from 'openland-api/fragments/CommunitySearch';

export const AvailableRoomsQuery = gql`
    query AvailableRooms {
        availableChats: betaUserAvailableRooms(limit: 3, isChannel: false) {
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
        availableChannels: betaUserAvailableRooms(limit: 3, isChannel: true) {
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
        communities: alphaComunityPrefixSearch(first: 3) {
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

export const SuggestedRoomsQuery = gql`
    query SuggestedRooms {
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
        isDiscoverDone: betaIsDiscoverDone
    }
    ${CommunitySearch}
`;

export const UserAvailableRoomsQuery = gql`
    query UserAvailableRooms($limit: Int!, $after: ID, $isChannel: Boolean) {
        betaUserAvailableRooms(limit: $limit, after: $after, isChannel: $isChannel) {
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
    query GlobalSearch($query: String!, $kinds: [GlobalSearchEntryKind!]) {
        items: alphaGlobalSearch(query: $query, kinds: $kinds) {
            ... on Organization {
                id
                name
                isCommunity: alphaIsCommunity
            }
            ... on User {
                ...UserShort
            }
            ... on SharedRoom {
                id
                kind
                title
                canSendMessage
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
    ${UserShort}
`;

export const DiscoverNextPageQuery = gql`
    query DiscoverNextPage($selectedTagsIds: [String!]!, $excudedGroupsIds: [String!]!) {
        betaNextDiscoverPage: gammaNextDiscoverPage(
            selectedTagsIds: $selectedTagsIds
            excudedGroupsIds: $excudedGroupsIds
        ) {
            chats {
                ...RoomShort
            }
            tagGroup {
                id
                title
                subtitle
                tags {
                    id
                    title
                }
            }
        }
    }
    ${RoomShort}
    ${UserShort}
`;

export const BetaSubmitNextDiscoverMutation = gql`
    mutation BetaSubmitNextDiscover($selectedTagsIds: [String!]!, $excudedGroupsIds: [String!]!) {
        betaSubmitNextDiscover(
            selectedTagsIds: $selectedTagsIds
            excudedGroupsIds: $excudedGroupsIds
        ) {
            tagGroup {
                id
            }
        }
    }
`;

export const BetaDiscoverSkipMutation = gql`
    mutation BetaDiscoverSkip($selectedTagsIds: [String!]!) {
        betaDiscoverSkip(selectedTagsIds: $selectedTagsIds) {
            tagGroup {
                id
            }
        }
    }
`;

export const DiscoverIsDoneQuery = gql`
    query DiscoverIsDone {
        betaIsDiscoverDone
    }
`;
