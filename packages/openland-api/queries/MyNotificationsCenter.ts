import gql from 'graphql-tag';
import { CommentEntryFragment } from 'openland-api/fragments/Comment';
import { RoomNano } from 'openland-api/fragments/RoomNano';
import { UserBadge } from 'openland-api/fragments/UserBadge';
import { FeedItemFull } from 'openland-api/fragments/FeedItemFull';
import { MatchmakingProfileFragment } from 'openland-api/fragments/MatchmakingFragments';

export const NotificationFragment = gql`
    fragment NotificationFragment on Notification {
        id
        text
        content {
            ... on NewCommentNotification {
                comment {
                    ...CommentEntryFragment
                }
                peer {
                    id
                    peerRoot {
                        ... on CommentPeerRootMessage {
                            message {
                                ... on GeneralMessage {
                                    id
                                    fallback
                                    message
                                    sender {
                                        id
                                        name
                                    }
                                    senderBadge {
                                        ...UserBadge
                                    }
                                }
                            }
                            chat {
                                ...RoomNano
                            }
                        }
                        ... on CommentPeerRootFeedItem {
                            item {
                                ...FeedItemFull
                            }
                        }
                    }
                    subscription {
                        type
                    }
                }
            }
            ... on NewMatchmakingProfilesNotification {
                room {
                    peer {
                        ... on SharedRoom{
                            ...RoomNano
                        }
                    }
                }
                profiles{
                    ...MatchmakingProfileFragment
                }
            }
        }
    }

    ${CommentEntryFragment}
    ${UserBadge}
    ${RoomNano}
    ${FeedItemFull}
    ${MatchmakingProfileFragment}
`;

export const MyNotificationsQuery = gql`
    query MyNotifications($first: Int!, $before: ID) {
        myNotifications(first: $first, before: $before) {
            items {
                ...NotificationFragment
            }

            cursor
        }
    }

    ${NotificationFragment}
`;

export const NotificationCenterUpdateFragment = gql`
    fragment NotificationCenterUpdateFragment on NotificationCenterUpdate {
        ... on NotificationReceived {
            center {
                id
                unread
            }
            notification {
                ...NotificationFragment
            }
        }
        ... on NotificationUpdated {
            center {
                id
                unread
            }
            notification {
                ...NotificationFragment
            }
        }
        ... on NotificationDeleted {
            center {
                id
                unread
            }
            notification {
                id
            }
        }
        ... on NotificationRead {
            center {
                id
                unread
            }
        }
        ... on NotificationContentUpdated {
            content {
                ... on UpdatedNotificationContentComment {
                    peer {
                        peerRoot {
                            ... on CommentPeerRootMessage {
                                message {
                                    ... on GeneralMessage {
                                        id
                                        fallback
                                        message
                                        sender {
                                            id
                                            name
                                        }
                                        senderBadge {
                                            ...UserBadge
                                        }
                                    }
                                }
                                chat {
                                    ...RoomNano
                                }
                            }
                            ... on CommentPeerRootFeedItem {
                                item {
                                    ...FeedItemFull
                                }
                            }
                        }
                        id
                        subscription {
                            type
                        }
                    }
                    comment {
                        ...CommentEntryFragment
                    }
                }
            }
        }
    }

    ${NotificationFragment}
    ${UserBadge}
    ${RoomNano}
    ${FeedItemFull}
    ${CommentEntryFragment}
`;

export const MyNotificationsCenterSubscription = gql`
    subscription MyNotificationsCenter($state: String) {
        event: notificationCenterUpdates(fromState: $state) {
            ... on NotificationCenterUpdateSingle {
                seq
                state
                update {
                    ...NotificationCenterUpdateFragment
                }
            }
            ... on NotificationCenterUpdateBatch {
                fromSeq
                seq
                state
                updates {
                    ...NotificationCenterUpdateFragment
                }
            }
        }
    }

    ${NotificationCenterUpdateFragment}
`;

export const MyNotificationCenterQuery = gql`
    query MyNotificationCenter {
        myNotificationCenter {
            id
            unread
            state {
                state
            }
        }
    }
`;

export const MyNotificationCenterMarkSeqReadMutation = gql`
    mutation MyNotificationCenterMarkSeqRead($seq: Int!) {
        notificationCenterMarkSeqRead(toSeq: $seq)
    }
`;

export const ReadNotificationMutation = gql`
    mutation ReadNotification($notificationId: ID!) {
        readNotification(notificationId: $notificationId) {
            id
            unread
            # state
        }
    }
`;