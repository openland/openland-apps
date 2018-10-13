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
    reactions: reactions {
        user {
            id
            name
        }
        reaction
    }
    urlAugmentation{
        type
        url
        title
        date
        subtitle
        description
        hostname
        imageURL
        imageInfo {
            imageWidth
            imageHeight
        }
        iconRef {
            uuid
            crop {
                x
                y
                w
                h
            }
        }
        iconInfo {
            imageWidth
            imageHeight
        }
        photo {
            uuid
            crop{
                x
                y
                w
                h
            }
        }
        user: extra {
            ...on User {
                id
                name
                photo
                primaryOrganization: alphaPrimaryOrganization {
                    id
                    name
                }
            }
        }
    }
    date
 }
`;