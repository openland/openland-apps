import gql from 'graphql-tag';
import { FullMessage } from './Message';
import { UserBadge } from './UserBadge';
import { MatchmakingRoomFragment } from '../fragments/MatchmakingFragments';

export const RoomFull = gql`
    fragment RoomFull on Room {
        ... on PrivateRoom {
            id
            user {
                ...UserShort
            }
            settings {
                id
                mute
            }
            pinnedMessage {
                ...FullMessage
            }
            myBadge {
                ...UserBadge
            }
        }
        ... on SharedRoom {
            id
            kind
            isChannel
            title
            photo
            socialImage
            description
            organization {
                ...OrganizationMedium
            }
            membership
            role
            membersCount
            featuredMembersCount
            onlineMembersCount
            previewMembers {
                id
                photo
            }
            members {
                role
                membership
                user {
                    ...UserShort
                }
                canKick
                badge {
                    ...UserBadge
                }
            }
            requests {
                user {
                    ...UserShort
                }
            }
            settings {
                id
                mute
            }
            canEdit
            canSendMessage
            welcomeMessage {
                isOn
                sender {
                    id
                    name
                }
                message
            }
            matchmaking {
                ...MatchmakingRoomFragment
            }
            pinnedMessage {
                ...FullMessage
            }
            myBadge {
                ...UserBadge
            }
            isPremium
            premiumPassIsActive
            premiumSubscription{
                id
                state
            }   
            premiumSettings{
                id
                price
                interval
            }
        }
    }
    ${FullMessage}
    ${UserBadge}
    ${MatchmakingRoomFragment}
`;

export const RoomFullWithoutMembers = gql`
    fragment RoomFullWithoutMembers on Room {
        ... on PrivateRoom {
            id
            user {
                ...UserShort
            }
            settings {
                id
                mute
            }
            myBadge {
                ...UserBadge
            }
        }
        ... on SharedRoom {
            id
            kind
            isChannel
            title
            photo
            socialImage
            description
            organization {
                ...OrganizationMedium
            }
            membership
            role
            membersCount
            featuredMembersCount
            settings {
                id
                mute
            }
            matchmaking {
                ...MatchmakingRoomFragment
            }
            canEdit
            canSendMessage
            welcomeMessage {
                isOn
                sender {
                    id
                    name
                }
                message
            }
            pinnedMessage {
                ...FullMessage
            }
            myBadge {
                ...UserBadge
            }
        }
    }
    ${UserBadge}
    ${FullMessage}
    ${MatchmakingRoomFragment}
`;
