import gql from 'graphql-tag';
import { FeedItemFull } from '../fragments/FeedItemFull';

export const FeedQuery = gql`
    query Feed($first: Int!, $after: String) {
        feed: alphaHomeFeed(first: $first, after: $after) {
            items {
                ...FeedItemFull
            }
            cursor
        }

        ${FeedItemFull}
    }
`;

export const FeedCreatePostMutation = gql`
    mutation FeedCreatePost($input: [SlideInput!]!) {
        createFeedPost: alphaCreateFeedPost(slides: $input) {
            ...FeedItemFull
        }

        ${FeedItemFull}
    }
`;

export const FeedCreateGlobalPostMutation = gql`
    mutation FeedCreateGlobalPost($input: [SlideInput!]!) {
        createFeedPost: alphaCreateGlobalFeedPost(slides: $input) {
            ...FeedItemFull
        }

        ${FeedItemFull}
    }
`;

export const FeedUpdateFragment = gql`
    fragment FeedUpdateFragment on FeedUpdate {
        ... on FeedItemReceived {
            item {
                ...FeedItemFull
            }
        }
        ... on FeedItemUpdated {
            item {
                ...FeedItemFull
            }
        }
        ... on FeedItemDeleted {
            item {
                ...FeedItemFull
            }
        }
    }

    ${FeedItemFull}
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