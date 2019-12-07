import gql from 'graphql-tag';

export const RoomSharedNano = gql`
    fragment RoomSharedNano on SharedRoom {
        id
        kind
        isChannel
        title
        roomPhoto: photo
        membersCount
        settings {
            id
            mute
        }
    }
`;

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
            ...RoomSharedNano
        }
    }

    ${RoomSharedNano}
`;