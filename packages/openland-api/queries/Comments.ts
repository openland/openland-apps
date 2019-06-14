import gql from 'graphql-tag';
import { CommentEntryFragment } from 'openland-api/fragments/Comment';
import { FullMessage } from 'openland-api/fragments/Message';

export const NotificationFragment = gql`
    fragment NotificationFragment on NewCommentNotification {
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
                            message
                        }
                    }
                    chat {
                        ... on PrivateRoom {
                            id
                            user {
                                id
                                name
                                photo
                            }
                        }
                        ... on SharedRoom {
                            id
                            title
                            photo
                        }
                    }
                }
            }
            subscription {
                type
            }
        }
    }
`;

export const MyNotificationsQuery = gql`
    query MyNotifications($first: Int!, $before: ID) {
        myNotifications(first: $first, before: $before) {
            id
            text
            content {
                ... NotificationFragment
            }
        }
        ${FullMessage}
        ${CommentEntryFragment}
        ${NotificationFragment}
    }
`;

export const NotificationCenterUpdateFragment = gql`
    fragment NotificationCenterUpdateFragment on NotificationCenterUpdate {
        ... on NotificationReceived {
            unread
            notification {
                id
                content {
                    ... NotificationFragment
                }
            }
        }
        ... on NotificationDeleted {
            unread
            notification {
                id
                content {
                    ... NotificationFragment
                }
            }
        }
        ... on NotificationRead {
            unread
        }
    }
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
    ${FullMessage}
    ${CommentEntryFragment}
    ${NotificationFragment}
    ${NotificationCenterUpdateFragment}
`;

export const MyNotificationCenterQuery = gql`
    query MyNotificationCenter {
        myNotificationCenter {
            id
            unread
        }
    }
`;

export const DeleteCommentMutation = gql`
    mutation DeleteComment($id: ID!) {
        deleteComment(id: $id)
    }
`;

export const MessageCommentsQuery = gql`
    query MessageComments($messageId: ID!) {
        messageComments(messageId: $messageId) {
            id
            state {
                state
            }
            count
            comments {
                ...CommentEntryFragment
            }
        }
    }
    ${CommentEntryFragment}
    ${FullMessage}
`;

export const CommentSetReactionMutation = gql`
    mutation CommentSetReaction($commentId: ID!, $reaction: MessageReactionType!) {
        commentReactionAdd(commentId: $commentId, reaction: $reaction)
    }
`;

export const CommentUnsetReactionMutation = gql`
    mutation CommentUnsetReaction($commentId: ID!, $reaction: MessageReactionType!) {
        commentReactionRemove(commentId: $commentId, reaction: $reaction)
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

export const DeleteNotificationMutation = gql`
    mutation DeleteNotification($notificationId: ID!) {
        deleteNotification(notificationId: $notificationId)
    }
`;

export const SubscribeMessageCommentsMutation = gql`
    mutation SubscribeMessageComments($messageId: ID!, $type: CommentSubscriptionType!) {
        subscribeMessageComments(messageId: $messageId, type: $type)
    }
`;

export const UnSubscribeMessageCommentsMutation = gql`
    mutation UnSubscribeMessageComments($messageId: ID!) {
        unSubscribeMessageComments(messageId: $messageId)
    }
`;
