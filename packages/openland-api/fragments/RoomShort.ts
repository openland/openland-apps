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
            title
            photo
            membership
            role
            canEdit
            membersCount
            pinnedMessage{
                ...FullMessage
            }
            organization{
                ...OrganizationShort
            }
        }
    }
    ${FullMessage}
`;