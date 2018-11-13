import gql from 'graphql-tag';
import { OrganizationShort } from '../fragments/OrganizationShort';
import { UserShort } from '../fragments/UserShort';

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
            id
            name
            firstName
            lastName
            photo
            phone
            email
            website
            about
            location
            isBot
            isYou
            online
            lastSeen
            linkedin
            twitter
            primaryOrganization {
                ...OrganizationShort
            }
            channels: channelsJoined {
                id
                title
                hidden
                photos
                photo
                membersCount
                organization{
                    ...OrganizationShort
                }
            }
        }
        conversation: alphaChat(conversationId: $userId){
            id
            settings{
                id
                mobileNotifications
                mute
            }
        }
    }
    ${OrganizationShort}
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