import gql from 'graphql-tag';
import { FullMessage } from './Message';

export const RoomShort = gql`
    fragment RoomShort on Room {
        ... on PrivateRoom {
            id
            user {
                ...UserShort
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
            pinnedMessage {
                ...FullMessage
            }
            organization{
                ...OrganizationShort
            }
        }
    }
    ${FullMessage}
`;