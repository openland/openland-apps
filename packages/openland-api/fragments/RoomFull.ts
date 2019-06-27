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
            pinnedMessage {
                ...FullMessage
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
        }
    }
    ${FullMessage}
`;
