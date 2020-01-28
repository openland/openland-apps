import gql from 'graphql-tag';

export const SharedRoomView = gql`
    fragment SharedRoomView on SharedRoom {
        id
        title
        photo
        membersCount
        photo
    }
`;
