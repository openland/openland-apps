import gql from 'graphql-tag';
import { FullMessage } from './Message';
import { UserBadge } from './UserBadge';

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
                enabled
            }
            pinnedMessage {
                ...FullMessage
            }
            myBadge {
                ...UserBadge
            }
        }
    }
    ${FullMessage}
    ${UserBadge}
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
`;
