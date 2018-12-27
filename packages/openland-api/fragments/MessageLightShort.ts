import gql from 'graphql-tag';

export const MessageLightShort = gql`
    fragment MessageLightShort on RoomMessage {
        id
        date
        text
        sender {
            ...UserTiny
        }
    }
`;
