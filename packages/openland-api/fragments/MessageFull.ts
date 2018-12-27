import gql from 'graphql-tag';

export const RoomMessageFull = gql`
    fragment RoomMessageFull on RoomMessage {
        id
        date
        message
        edited
        file
        repeatKey
        isService
        alphaType
        alphaTitle
        plainText
        alphaPostType
        alphaButtons {
            id
            title
            style
        }
        alphaAttachments {
            fileId
            fileMetadata {
                name
                size
                isImage
                imageWidth
                imageHeight
                imageFormat
            }
        }
        serviceMetadata {
            ... on InviteServiceMetadata {
                users {
                    ...UserShort
                }
            }
            ... on KickServiceMetadata {
                user {
                    ...UserShort
                }
                kickedBy {
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
                photo
                primaryOrganization {
                    name
                    id
                }
            }
            reaction
        }
        mentions: mentions {
            ...UserShort
        }
        alphaMentions: alphaMentions {
            ... on UserMention {
                user {
                    ...UserShort
                }
            }
            ... on SharedRoomMention {
                sharedRoom {
                    id
                    title
                }
            }
        }
        urlAugmentation {
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
                crop {
                    x
                    y
                    w
                    h
                }
            }
            user: extra {
                ... on User {
                    id
                    name
                    photo
                    primaryOrganization {
                        id
                        name
                    }
                }
            }
        }
    }
`;
