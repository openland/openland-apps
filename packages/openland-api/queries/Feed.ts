import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';
import { FullMessage } from '../fragments/Message';

export const FeedItemFragment = gql`
    fragment FeedItemFragment on FeedItem {
        id
        content {
            ... on FeedPost {
                message {
                    id
                    message
                }
            }
        }
    }

    ${FullMessage}
    ${UserShort}
`;

export const FeedQuery = gql`
    query Feed($first: Int!, $after: String) {
        feed: alphaHomeFeed(first: $first, after: $after) {
            items {
                ...FeedItemFragment
            }
            cursor
        }

        ${FeedItemFragment}
    }
`;

export const FeedUpdateFragment = gql`
    fragment FeedUpdateFragment on FeedUpdate {
        ... on FeedItemReceived {
            post {
                ...FeedItemFragment
            }
        }
        ... on FeedItemUpdated {
            post {
                ...FeedItemFragment
            }
        }
    }

    ${FeedItemFragment}
`;

export const FeedUpdatesSubscription = gql`
    subscription FeedUpdates {
        event: homeFeedUpdates {
            updates {
                ...FeedUpdateFragment
            }
        }
    }

    ${FeedUpdateFragment}
`;