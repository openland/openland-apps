import gql from 'graphql-tag';
import { RoomShort } from './RoomShort';

export const MessageFull = gql`
    fragment MessageFull on ConversationMessage {
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
                invitedBy {
                    ...UserShort
                }
            }
            ... on KickServiceMetadata {
                user {
                    ...UserShort
                }
                kickedBy {
                    ...UserShort
                }
            }
            ... on TitleChangeServiceMetadata {
                title
            }
            ... on PostRespondServiceMetadata {
                post {
                    id
                    message
                    postType: alphaPostType
                    title: alphaTitle
                    sender {
                        ...UserShort
                    }
                }
                postRoom {
                    ...RoomShort
                }
                responder {
                    ...UserShort
                }
                respondType
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
            extra {
                ... on Organization {
                    id
                    name
                    photo
                }
                ... on ChannelConversation {
                    id
                    title
                    photo
                    organization {
                        name
                    }
                }
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

    ${RoomShort}
`;

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
                invitedBy {
                    ...UserShort
                }
            }
            ... on KickServiceMetadata {
                user {
                    ...UserShort
                }
                kickedBy {
                    ...UserShort
                }
            }
            ... on TitleChangeServiceMetadata {
                title
            }
            ... on PostRespondServiceMetadata {
                post {
                    id
                    message
                    postType: alphaPostType
                    title: alphaTitle
                    sender {
                        ...UserShort
                    }
                }
                postRoom {
                    ...RoomShort
                }
                responder {
                    ...UserShort
                }
                respondType
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
            extra {
                ... on Organization {
                    id
                    name
                    photo
                }
                ... on ChannelConversation {
                    id
                    title
                    photo
                    organization {
                        name
                    }
                }
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

    ${RoomShort}
`;
