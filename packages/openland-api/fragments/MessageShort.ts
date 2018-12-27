import gql from 'graphql-tag';

export const RoomMessageShort = gql`
    fragment RoomMessageShort on RoomMessage {
        id
        date
        message
        file
        isService
        fileMetadata {
            name
            mimeType
            isImage
        }
        sender {
            ...UserTiny
        }
    }
`;
