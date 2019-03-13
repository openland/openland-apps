import gql from 'graphql-tag';

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
                ...OrganizationFull
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
        }
    }
`;