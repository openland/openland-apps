import gql from 'graphql-tag';
import { UserShort } from './UserShort';
import { SpanFragment } from './Message';
import { FeedChannelFull } from './FeedChannelFull';

export const FeedPostAuthorFragment = gql`
    fragment FeedPostAuthorFragment on FeedPostAuthor {
        ... on User {
            ...UserShort
        }
    }

    ${UserShort}
`;

export const FeedPostSourceFragment = gql`
    fragment FeedPostSourceFragment on FeedPostSource {
        ... on FeedChannel {
            ...FeedChannelFull
        }
    }

    ${FeedChannelFull}
`;

export const SlideFragment = gql`
    fragment SlideFragment on Slide {
        ... on TextSlide {
            id
            text
            spans {
                ...SpanFragment
            }
            cover {
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
            coverAlign
            attachments {
                ... on User {
                    ...UserShort
                }
                ... on SharedRoom {
                    id
                    kind
                    title
                    roomPhoto: photo
                    membersCount
                    membership
                    organization {
                        id
                        name
                        photo
                    }
                }
                ... on Organization {
                    ...OrganizationShort
                }
            }
        }
    }

    ${SpanFragment}
`;

export const FeedItemFull = gql`
    fragment FeedItemFull on FeedItem {
        ... on FeedPost {
            id
            date
            author {
                ...FeedPostAuthorFragment
            }
            source {
                ...FeedPostSourceFragment
            }
            edited
            canEdit
            commentsCount
            message
            fallback
            reactions {
                user {
                    ...UserShort
                }
                reaction
            }
            slides {
                ...SlideFragment
            }
        }
    }

    ${FeedPostAuthorFragment}
    ${FeedPostSourceFragment}
    ${SlideFragment}
`;