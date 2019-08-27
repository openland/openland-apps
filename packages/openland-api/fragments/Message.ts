import gql from 'graphql-tag';
import { UserTiny } from './UserTiny';
import { UserShort } from './UserShort';
import { UserForMention } from './UserForMention';
import { UserBadge } from './UserBadge';

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
                    }
                }
            }
        }
        ... on GeneralMessage {
            id
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
                    offset
                    length

                    ... on MessageSpanUserMention {
                        user {
                            ...UserShort
                        }
                    }
                    ... on MessageSpanMultiUserMention {
                        users {
                            ...UserShort
                        }
                    }
                    ... on MessageSpanRoomMention {
                        room {
                            ... on PrivateRoom {
                                id
                                user {
                                    id
                                    name
                                }
                            }
                            ... on SharedRoom {
                                id
                                title
                            }
                        }
                    }
                    ... on MessageSpanLink {
                        url
                    }
                    ... on MessageSpanDate {
                        date
                    }
                }

                ... on GeneralMessage {
                    id
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
            }

            reactions {
                user {
                    ...UserShort
                }
                reaction
            }
        }

        spans {
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
            ... on MessageSpanRoomMention {
                room {
                    ... on PrivateRoom {
                        id
                        user {
                            id
                            name
                        }
                    }
                    ... on SharedRoom {
                        id
                        title
                    }
                }
            }
            ... on MessageSpanLink {
                url
            }
            ... on MessageSpanDate {
                date
            }
        }

        ... on ServiceMessage {
            id
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
    ${UserForMention}
    ${UserBadge}
`;
