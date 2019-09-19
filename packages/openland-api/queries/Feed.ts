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
    }

    ${FeedItemFull}
`;

export const FeedItemQuery = gql`
    query FeedItem($id: ID!) {
        item: alphaFeedItem(id: $id) {
            ...FeedItemFull
        }
    }

    ${FeedItemFull}
`;

export const FeedCreatePostMutation = gql`
    mutation FeedCreatePost($input: [SlideInput!]!, $repeatKey: String) {
        createFeedPost: alphaCreateFeedPost(slides: $input, repeatKey: $repeatKey) {
            ...FeedItemFull
        }
    }

    ${FeedItemFull}
`;

export const FeedCreateGlobalPostMutation = gql`
    mutation FeedCreateGlobalPost($input: [SlideInput!]!, $repeatKey: String) {
        createFeedPost: alphaCreateGlobalFeedPost(slides: $input, repeatKey: $repeatKey) {
            ...FeedItemFull
        }
    }

    ${FeedItemFull}
`;

export const FeedReactionAddMutation = gql`
    mutation FeedReactionAdd($feedItemId: ID!, $reaction: MessageReactionType!) {
        feedReactionAdd(feedItemId: $feedItemId, reaction: $reaction)
    }
`;

export const FeedReactionRemoveMutation = gql`
    mutation FeedReactionRemove($feedItemId: ID!, $reaction: MessageReactionType!) {
        feedReactionRemove(feedItemId: $feedItemId, reaction: $reaction)
    }
`;

export const FeedDeletePostMutation = gql`
    mutation FeedDeletePost($feedItemId: ID!) {
        alphaDeleteFeedPost(feedItemId: $feedItemId)
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