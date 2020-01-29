import gql from 'graphql-tag';
import { FullMessage } from './Message';
import { UserBadge } from './UserBadge';
import { MatchmakingRoomFragment } from './MatchmakingFragments';

export const RoomShort = gql`
    fragment RoomShort on Room {
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
            membership
            role
            canEdit
            canSendMessage
            membersCount
            onlineMembersCount
            previewMembers {
                id
                photo
            }
            pinnedMessage {
                ...FullMessage
            }
            matchmaking {
                ...MatchmakingRoomFragment
            }
            organization {
                ...OrganizationShort
            }
            settings {
                id
                mute
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