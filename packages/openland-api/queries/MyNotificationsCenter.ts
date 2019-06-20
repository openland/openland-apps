import gql from 'graphql-tag';
import { CommentEntryFragment } from 'openland-api/fragments/Comment';
import { FullMessage } from 'openland-api/fragments/Message';
import { RoomNano } from 'openland-api/fragments/RoomNano';

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
                                }
                            }
                            chat {
                                ...RoomNano
                            }
                        }
                    }
                    subscription {
                        type
                    }
                }
            }
        }
    }
`;

export const MyNotificationsQuery = gql`
    query MyNotifications($first: Int!, $before: ID) {
        myNotifications(first: $first, before: $before) {
            items {
                ...NotificationFragment
            }

            cursor
        }

        ${FullMessage}
        ${CommentEntryFragment}
        ${NotificationFragment}
        ${RoomNano}
    }
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
                                    }
                                }
                            }
                        }
                        id
                        subscription {
                            type
                        }
                    }
                }
            }
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

    ${RoomNano}
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
