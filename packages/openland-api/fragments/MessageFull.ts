import gql from 'graphql-tag';

export const MessageFull = gql`
 fragment MessageFull on ConversationMessage {
    id
    message
    file
    repeatKey
    isService
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
    urlAugmentation{
        type
        url
        title
        date
        subtitle
        description
        photo{
            uuid
                crop{
                    x
                    y
                    w
                    h
                }
        }
    }
    date
 }
`;