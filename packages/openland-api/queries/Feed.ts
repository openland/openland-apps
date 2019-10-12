import gql from 'graphql-tag';
import { FeedItemFull } from '../fragments/FeedItemFull';
import { FeedChannelFull } from '../fragments/FeedChannelFull';
import { UserShort } from 'openland-api/fragments/UserShort';

export const InitFeedQuery = gql`
    query InitFeed($first: Int!) {
        feed: alphaHomeFeed(first: $first) {
            items {
                ...FeedItemFull
            }
            cursor
        }
        drafts: alphaFeedMyDraftsChannel {
            ...FeedChannelFull
        }
    }

    ${FeedItemFull}
    ${FeedChannelFull}
`;

export const FeedLoadMoreQuery = gql`
    query FeedLoadMore($first: Int!, $after: String) {
        feed: alphaHomeFeed(first: $first, after: $after) {
            items {
                ...FeedItemFull
            }
            cursor
        }
    }

    ${FeedItemFull}
`;

export const FeedSubscriptionsQuery = gql`
    query FeedSubscriptions($first: Int!, $after: ID) {
        channels: alphaFeedMySubscriptions(first: $first, after: $after) {
            items {
                ...FeedChannelFull
            }
            cursor
        }
    }

    ${FeedChannelFull}
`;

export const FeedWritableChannelsQuery = gql`
    query FeedWritableChannels($first: Int!, $after: ID) {
        channels: alphaWritableChannels(first: $first, after: $after) {
            items {
                ...FeedChannelFull
            }
            cursor
        }
    }

    ${FeedChannelFull}
`;

export const FeedChannelsSearchQuery = gql`
    query FeedChannelsSearch($query: String, $sort: String, $first: Int!, $after: String) {
        search: alphaFeedChannelSearch(query: $query, sort: $sort, first: $first, after: $after) {
            edges {
                node {
                    ...FeedChannelFull
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                itemsCount
                pagesCount
                currentPage
                openEnded
            }
        }
    }

    ${FeedChannelFull}
`;

export const FeedRecommendedChannelsQuery = gql`
    query FeedRecommendedChannels($first: Int!, $after: String) {
        search: alphaRecommendedChannels(first: $first, after: $after) {
            edges {
                node {
                    ...FeedChannelFull
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                itemsCount
                pagesCount
                currentPage
                openEnded
            }
        }
    }

    ${FeedChannelFull}
`;

export const FeedChannelQuery = gql`
    query FeedChannel($id: ID!) {
        channel: alphaFeedChannel(id: $id) {
            ...FeedChannelFull
        }
    }

    ${FeedChannelFull}
`;

export const FeedChannelWritersQuery = gql`
    query FeedChannelWriters($id: ID!, $first: Int!, $after: ID) {
        writers: alphaFeedChannelAdmins(id: $id, first: $first, after: $after) {
            items {
                user {
                    ...UserShort
                }
                role
            }
            cursor
        }
    }

    ${UserShort}
`;

export const FeedChannelSubscribersQuery = gql`
    query FeedChannelSubscribers($channelId: ID!, $query: String, $first: Int!, $after: String) {
        subscribers: alphaFeedChannelSubscribers(channelId: $channelId, query: $query, first: $first, after: $after) {
            edges {
                node {
                    user {
                        ...UserShort
                    }
                    role
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                itemsCount
                pagesCount
                currentPage
                openEnded
            }
        }
    }

    ${UserShort}
`;

export const FeedChannelContentQuery = gql`
    query FeedChannelContent($id: ID!, $first: Int!, $after: String) {
        content: alphaFeedChannelContent(id: $id, first: $first, after: $after) {
            items {
                ...FeedItemFull
            }
            cursor
        }
    }

    ${FeedItemFull}
`;

export const FeedChannelCreateMutation = gql`
    mutation FeedChannelCreate($title: String!, $about: String, $photoRef: ImageRefInput, $global: Boolean) {
        channel: alphaFeedCreateChannel(title: $title, about: $about, photoRef: $photoRef, global: $global) {
            ...FeedChannelFull
        }
    }

    ${FeedChannelFull}
`;

export const FeedChannelUpdateMutation = gql`
    mutation FeedChannelUpdate($id: ID!, $title: String!, $about: String, $photoRef: ImageRefInput, $global: Boolean) {
        channel: alphaFeedUpdateChannel(id: $id, title: $title, about: $about, photoRef: $photoRef, global: $global) {
            id
        }
    }
`;

export const FeedChannelSubscribeMutation = gql`
    mutation FeedChannelSubscribe($id: ID!) {
        alphaFeedChannelSubscribe(id: $id)
    }
`;

export const FeedChannelUnsubscribeMutation = gql`
    mutation FeedChannelUnsubscribe($id: ID!) {
        alphaFeedChannelUnsubscribe(id: $id)
    }
`;

export const FeedChannelAddWriterMutation = gql`
    mutation FeedChannelAddWriter($id: ID!, $userId: ID!) {
        alphaFeedChannelAddEditor(id: $id, userId: $userId)
    }
`;

export const FeedChannelRemoveWriterMutation = gql`
    mutation FeedChannelRemoveWriter($id: ID!, $userId: ID!) {
        alphaFeedChannelRemoveEditor(id: $id, userId: $userId)
    }
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
    mutation FeedCreatePost($channel: ID!, $slides: [SlideInput!]!, $repeatKey: String) {
        post: alphaCreateFeedPost(channel: $channel, slides: $slides, repeatKey: $repeatKey) {
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
    subscription FeedUpdates($state: String) {
        event: homeFeedUpdates(fromState: $state) {
            updates {
                ...FeedUpdateFragment
            }
            state
        }
    }

    ${FeedUpdateFragment}
`;