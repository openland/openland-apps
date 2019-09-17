import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';
import { OrganizationShort } from '../fragments/OrganizationShort';
import { SpanFragment } from './Message';

export const FeedPostAuthorFragment = gql`
    fragment FeedPostAuthorFragment on FeedPostAuthor {
        ... on User {
            ...UserShort
        }
        ... on Organization {
            ...OrganizationShort
        }
    }

    ${UserShort}
    ${OrganizationShort}
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
                    isChannel
                    title
                    roomPhoto: photo
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
            edited
            commentsCount
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
    ${SlideFragment}
`;