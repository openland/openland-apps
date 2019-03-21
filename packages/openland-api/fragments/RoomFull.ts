import gql from 'graphql-tag';
import { FullMessage } from './Message';

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
        }
        ... on SharedRoom {
            id
            kind
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
            welcomeMessage {
                isOn
                sender {
                    id
                    name
                }
                message
            }
            pinnedMessage{
                ...FullMessage
            }
        }
    }
    ${FullMessage}
`;
