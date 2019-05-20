import gql from 'graphql-tag';

export const RoomNano = gql`
    fragment RoomNano on Room {
        ... on PrivateRoom {
            id
            user {
                id
                name
                photo
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
            settings {
                id
                mute
            }
        }
    }
`;