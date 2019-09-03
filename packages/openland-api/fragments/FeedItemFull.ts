import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';
import { FullMessage } from '../fragments/Message';

export const FeedItemFull = gql`
    fragment FeedItemFull on FeedItem {
        ... on FeedPost {
            id
            date
            sender {
                ...UserShort
            }
            edited
            isMentioned
            message
            commentsCount
            fallback
            reactions {
                user {
                    ...UserShort
                }
                reaction
            }
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
        }
    }

    ${FullMessage}
    ${UserShort}
`;