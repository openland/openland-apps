import gql from 'graphql-tag';
import { OrganizationFull } from '../fragments/OrganizationFull';
import { UserShort } from '../fragments/UserShort';
import { UserFull } from '../fragments/UserFull';

export const UsersQuery = gql`
    query Users($query: String!) {
        items: users(query: $query) {
            id
            title: name
            subtitle: email
        }
    }
`;

export const UserQuery = gql`
    query User($userId: ID!) {
        user: user(id: $userId) {
            ...UserFull
        }
        conversation: room(id: $userId) {
            ... on PrivateRoom {
                id
                settings {
                    id
                    mute
                }
            }
        }
    }
    ${UserFull}
`;

export const OnlineQuery = gql`
    query Online($userId: ID!) {
        user: user(id: $userId) {
            id
            online
            lastSeen
        }
    }
`;

export const OnlineWatchSubscription = gql`
    subscription OnlineWatch($users: [ID!]!) {
        alphaSubscribeOnline(users: $users) {
            userId
            online
            active
            lastSeen
            timeout
        }
    }
`;

export const ExplorePeopleQuery = gql`
    query ExplorePeople($query: String, $sort: String, $page: Int, $after: String) {
        items: userSearch(query: $query, sort: $sort, page: $page, first: 25, after: $after) {
            edges {
                node {
                    ...UserShort
                    isYou
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
    ${UserShort}
`;

export const ResolveShortNameQuery = gql`
    query ResolveShortName($shortname: String!) {
        item: alphaResolveShortName(shortname: $shortname) {
            ... on User {
                ...UserFull
            }
            ... on Organization {
                ...OrganizationFull
            }
        }
    }
    ${UserFull}
    ${OrganizationFull}
`;

export const DeleteUserMutation = gql`
    mutation DeleteUser($id: ID!) {
        superDeleteUser(id: $id)
    }
`;
