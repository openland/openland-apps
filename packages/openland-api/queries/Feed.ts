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

export const FeedEditPostMutation = gql`
    mutation FeedEditPost($feedItemId: ID!, $slides: [SlideInput!]!) {
        editFeedPost: alphaEditFeedPost(feedItemId: $feedItemId, slides: $slides) {
            ...FeedItemFull
        }
    }

    ${FeedItemFull}
`;

export const FeedCreatePostMutation = gql`
    mutation FeedCreatePost($slides: [SlideInput!]!, $repeatKey: String) {
        createFeedPost: alphaCreateFeedPost(slides: $slides, repeatKey: $repeatKey) {
            ...FeedItemFull
        }
    }

    ${FeedItemFull}
`;

export const FeedCreateGlobalPostMutation = gql`
    mutation FeedCreateGlobalPost($slides: [SlideInput!]!, $repeatKey: String) {
        createFeedPost: alphaCreateGlobalFeedPost(slides: $slides, repeatKey: $repeatKey) {
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