import gql from 'graphql-tag';
import { UserTiny } from './UserTiny';
import { UserShort } from './UserShort';

export const TinyMessage = gql`
    fragment TinyMessage on ModernMessage {
        id
        date
        sender {
            ...UserTiny
        }
        message
        fallback
        ... on GeneralMessage {
            attachments {
                id
                fallback
                ... on MessageAttachmentFile {
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
`;

export const FullMessage = gql`
    fragment FullMessage on ModernMessage {
        id
        date
        sender {
            ...UserShort
        }
        message
        fallback

        ... on GeneralMessage {
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
                    keyboard {
                        buttons {
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
                message
                fallback
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
                }

                ... on GeneralMessage {
                    edited
                    attachments {
                        fallback
                        ... on MessageAttachmentFile {
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
                    ...UserTiny
                }
            }
            ... on MessageSpanMultiUserMention {
                users {
                    ...UserTiny
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
            ... on MessageSpanBold {
                offset
                length
            }
        }

        ... on ServiceMessage {
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
`;
