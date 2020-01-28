import gql from 'graphql-tag';

export const SharedMediaQuery = gql`
    query SharedMedia($chatId: ID!, $mediaTypes: [SharedMediaType!]!, $first: Int!, $after: String) {
        sharedMedia: chatSharedMedia(
                        chatId: $chatId,
                        mediaTypes: $mediaTypes,
                        first: $first,
                        after: $after
                    ) {
                        pageInfo {
                            hasNextPage
                            currentPage
                        }
                        edges {
                            node {
                                message {
                                    ... on GeneralMessage {
                                        id
                                        fallback
                                        date
                                        sender {
                                            id
                                            name
                                        }
                                        attachments {
                                            ... on MessageAttachmentFile {
                                                id
                                                fileMetadata {
                                                    name
                                                    isImage
                                                    imageFormat
                                                    mimeType
                                                    imageWidth
                                                    imageHeight
                                                    size
                                                }
                                                filePreview
                                                fileId
                                                fallback
                                            }
                                            ... on MessageRichAttachment {
                                                id
                                                title
                                                text
                                                titleLink
                                                imagePreview
                                                image {
                                                    url
                                                }
                                                imageFallback {
                                                    photo
                                                }
                                                keyboard {
                                                    buttons {
                                                        id
                                                        title
                                                        url
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            cursor
                        }
                    }
    }
`;

export const SharedMediaCountersQuery = gql`
    query SharedMediaCounters($chatId: ID!) {
        counters: chatSharedMediaCounters(chatId: $chatId) {
            links
            images
            documents
            videos
        }
    }
`;