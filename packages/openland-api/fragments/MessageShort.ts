import gql from 'graphql-tag';

export const MessageShort = gql`
 fragment MessageShort on ConversationMessage {
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