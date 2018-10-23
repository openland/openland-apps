import gql from 'graphql-tag';

export const MessageFull = gql`
 fragment MessageFull on ConversationMessage {
    id
    message
    edited
    file
    repeatKey
    isService
    serviceMetadata{
        ...on KickServiceMetadata{
            user {
                id
            }
            kickedBy{
                 id
            }
        }
    }
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
    reply: replyMessages {
        sender {
            ...UserShort
        }
        id
        date
        message
        edited
        file
        fileMetadata {
            name
            mimeType
            isImage
            imageWidth
            imageHeight
            imageFormat
            size
        }
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