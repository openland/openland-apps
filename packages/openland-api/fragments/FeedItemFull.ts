import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';
import { OrganizationShort } from '../fragments/OrganizationShort';

export const FeedPostAuthorFragment = gql`
    fragment FeedPostAuthorFragment on FeedPostAuthor {
        ... on User {
            ...UserShort
        }
        ... on Organization {
            ...OrganizationShort
        }
    }
`;

export const FeedItemFull = gql`
    fragment FeedItemFull on FeedItem {
        ... on FeedPost {
            id
            date
            author {
                ...FeedPostAuthorFragment
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

    ${FeedPostAuthorFragment}
    ${UserShort}
    ${OrganizationShort}
`;