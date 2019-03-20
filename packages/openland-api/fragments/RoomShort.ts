import gql from 'graphql-tag';

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
            membersCount
            organization{
                ...OrganizationShort
            }
        }
    }
`;