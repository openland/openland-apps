import gql from 'graphql-tag';
import { UserTiny } from './UserTiny';
import { UserShort } from './UserShort';
import { UserForMention } from './UserForMention';
import { UserBadge } from './UserBadge';
import { StickerFragment } from './StickerFragment';
import { RoomNano } from './RoomNano';

export const SpanFragment = gql`
    fragment SpanFragment on MessageSpan {
        offset
        length

        ... on MessageSpanUserMention {
            user {
                ...UserForMention
            }
        }
        ... on MessageSpanMultiUserMention {
            users {
                ...UserForMention
            }
        }
        ... on MessageSpanOrganizationMention {
            organization {
                ...OrganizationShort
            }
        }
        ... on MessageSpanRoomMention {
            room {
                ...RoomNano
            }
        }
        ... on MessageSpanLink {
            url
        }
        ... on MessageSpanDate {
            date
        }
    }

    ${UserForMention}
    ${RoomNano}
`;

export const DaialogListMessage = gql`
    fragment DaialogListMessage on ModernMessage {
        id
        date
        sender {
            id
            name
            firstName
        }
        senderBadge {
            ...UserBadge
        }
        message
        fallback
        ... on GeneralMessage {
            id
            overrideName
            overrideAvatar {
                uuid
                crop {
                    x
                    y
                    w
                    h
                }
            }
            attachments {
                id
                fallback
                ... on MessageAttachmentFile {
                    id
                    fileId
                    fileMetadata {
                        isImage
                        imageFormat
                    }
                }
            }
            quotedMessages {
                id
            }
        }
    }
    ${UserBadge}
`;

export const TinyMessage = gql`
    fragment TinyMessage on ModernMessage {
        id
        date
        sender {
            ...UserTiny
        }
        senderBadge {
            ...UserBadge
        }
        message
        fallback
        ... on GeneralMessage {
            id
            overrideName
            overrideAvatar {
                uuid
                crop {
                    x
                    y
                    w
                    h
                }
            }
            isMentioned
            commentsCount
            attachments {
                id
                fallback
                ... on MessageAttachmentFile {
                    id
                    fileId
                    fileMetadata {
                        isImage
                        imageFormat
                    }
                    filePreview
                }
            }
            quotedMessages {
                id
            }
        }
    }
    ${UserTiny}
    ${UserBadge}
`;

export const QuotedMessage = gql`
    fragment QuotedMessage on ModernMessage {
        id
        date
        message
        sender {
            ...UserShort
        }
        senderBadge {
            ...UserBadge
        }
        message
        fallback
        source {
            ... on MessageSourceChat {
                chat {
                    ... on PrivateRoom {
                        id
                    }
                    ... on SharedRoom {
                        id
                    }
                }
            }
        }
        spans {
            ...SpanFragment
        }

        ... on GeneralMessage {
            id
            overrideName
            overrideAvatar {
                uuid
                crop {
                    x
                    y
                    w
                    h
                }
            }
            commentsCount
            edited
            attachments {
                fallback
                ... on MessageAttachmentFile {
                    id
                    fileId
                    fileMetadata {
                        name
                        mimeType
                        size
                        isImage
                        imageWidth
                        imageHeight
                        imageFormat
                    }
                    filePreview
                }

                ... on MessageRichAttachment {
                    id
                    title
                    subTitle
                    titleLink
                    titleLinkHostname
                    text
                    icon {
                        url
                        metadata {
                            name
                            mimeType
                            size
                            isImage
                            imageWidth
                            imageHeight
                            imageFormat
                        }
                    }
                    image {
                        url
                        metadata {
                            name
                            mimeType
                            size
                            isImage
                            imageWidth
                            imageHeight
                            imageFormat
                        }
                    }
                    imageFallback {
                        photo
                        text
                    }
                    fallback
                }
            }
        }

        ... on StickerMessage {
            id
            date
            overrideName
            overrideAvatar {
                uuid
                crop {
                    x
                    y
                    w
                    h
                }
            }
            sender {
                ...UserShort
            }
            senderBadge {
                ...UserBadge
            }
            source {
                ... on MessageSourceChat {
                    chat {
                        ... on PrivateRoom {
                            id
                        }
                        ... on SharedRoom {
                            id
                        }
                    }
                }
            }
            reactions {
                user {
                    ...UserShort
                }
                reaction
            }
            sticker {
                ... on ImageSticker {
                    id
                    pack {
                        ... on StickerPack {
                            id
                            title
                        }
                    }
                    image {
                        ... on ImageRef {
                            uuid
                        }
                    }
                }
            }
        }
    }
`;

export const FullMessage = gql`
    fragment FullMessage on ModernMessage {
        id
        date
        sender {
            ...UserShort
        }
        senderBadge {
            ...UserBadge
        }
        message
        fallback
        source {
            ... on MessageSourceChat {
                chat {
                    ... on PrivateRoom {
                        id
                    }
                    ... on SharedRoom {
                        id
                        isChannel
                        membersCount
                    }
                }
            }
        }
        ... on GeneralMessage {
            id
            overrideName
            overrideAvatar {
                uuid
                crop {
                    x
                    y
                    w
                    h
                }
            }
            edited
            commentsCount
            attachments {
                fallback
                ... on MessageAttachmentFile {
                    id
                    fileId
                    fileMetadata {
                        name
                        mimeType
                        size
                        isImage
                        imageWidth
                        imageHeight
                        imageFormat
                    }
                    filePreview
                }

                ... on MessageRichAttachment {
                    id
                    title
                    subTitle
                    titleLink
                    titleLinkHostname
                    text
                    icon {
                        url
                        metadata {
                            name
                            mimeType
                            size
                            isImage
                            imageWidth
                            imageHeight
                            imageFormat
                        }
                    }
                    image {
                        url
                        metadata {
                            name
                            mimeType
                            size
                            isImage
                            imageWidth
                            imageHeight
                            imageFormat
                        }
                    }
                    imageFallback {
                        photo
                        text
                    }
                    keyboard {
                        buttons {
                            id
                            title
                            style
                            url
                        }
                    }
                    fallback
                }
            }
            quotedMessages {
                ...QuotedMessage
            }

            reactions {
                user {
                    ...UserShort
                }
                reaction
            }
        }

        spans {
            ...SpanFragment
        }
        
        ... on StickerMessage {
            id
            overrideName
            overrideAvatar {
                uuid
                crop {
                    x
                    y
                    w
                    h
                }
            }
            date
            commentsCount
            sender {
                ...UserShort
            }
            senderBadge {
                ...UserBadge
            }
            source {
                ... on MessageSourceChat {
                    chat {
                        ... on PrivateRoom {
                            id
                        }
                        ... on SharedRoom {
                            id
                        }
                    }
                }
            }
            quotedMessages {
                ...QuotedMessage
            }
            reactions {
                user {
                    ...UserShort
                }
                reaction
            }
            sticker {
                ...StickerFragment
            }
        }

        ... on ServiceMessage {
            id
            overrideName
            overrideAvatar {
                uuid
                crop {
                    x
                    y
                    w
                    h
                }
            }
            serviceMetadata {
                ... on InviteServiceMetadata {
                    users {
                        ...UserTiny
                    }
                    invitedBy {
                        ...UserTiny
                    }
                }

                ... on KickServiceMetadata {
                    user {
                        ...UserTiny
                    }
                    kickedBy {
                        ...UserTiny
                    }
                }

                ... on TitleChangeServiceMetadata {
                    title
                }

                ... on PhotoChangeServiceMetadata {
                    photo
                }

                ... on PostRespondServiceMetadata {
                    respondType
                }
            }
        }
    }
    ${UserTiny}
    ${UserShort}
    ${UserBadge}
    ${SpanFragment}
    ${QuotedMessage}
    ${StickerFragment}
`;
