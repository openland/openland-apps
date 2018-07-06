import gql from 'graphql-tag';

export const MessageFull = gql`
 fragment MessageFull on ConversationMessage {
    id
    message
    file
    repeatKey
    fileMetadata {
        name
        mimeType
        isImage
        imageWidth
        imageHeight
        imageFormat
        size
    }
    sender {
        ...UserShort
    }
    date
 }
`;