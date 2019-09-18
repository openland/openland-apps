import gql from 'graphql-tag';
import { CommentEntryFragment } from 'openland-api/fragments/Comment';
import { FullMessage } from 'openland-api/fragments/Message';

export const DeleteCommentMutation = gql`
    mutation DeleteComment($id: ID!) {
        deleteComment(id: $id)
    }
`;

export const CommentsQuery = gql`
    query Comments($peerId: ID!) {
        comments(peerId: $peerId) {
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

export const AddCommentMutation = gql`
    mutation AddComment(
        $repeatKey: String
        $peerId: ID!
        $message: String
        $replyComment: ID
        $mentions: [MentionInput!]
        $fileAttachments: [FileAttachmentInput!]
        $spans: [MessageSpanInput!]
    ) {
        betaAddComment(
            repeatKey: $repeatKey
            peerId: $peerId
            message: $message
            replyComment: $replyComment
            mentions: $mentions
            fileAttachments: $fileAttachments
            spans: $spans
        ) {
            id
        }
    }
    ${CommentEntryFragment}
    ${FullMessage}
`;

export const EditCommentMutation = gql`
    mutation EditComment(
        $id: ID!
        $message: String
        $mentions: [MentionInput!]
        $fileAttachments: [FileAttachmentInput!]
        $spans: [MessageSpanInput!]
    ) {
        editComment(
            id: $id
            message: $message
            mentions: $mentions
            fileAttachments: $fileAttachments
            spans: $spans
        )
    }
`;

export const CommentUpdateFragment = gql`
    fragment CommentUpdateFragment on CommentUpdate {
        ... on CommentReceived {
            comment {
                ...CommentEntryFragment
            }
        }
        ... on CommentUpdated {
            comment {
                ...CommentEntryFragment
            }
        }
    }
`;

export const CommentWatchSubscription = gql`
    subscription CommentWatch($peerId: ID!, $fromState: String) {
        event: commentUpdates(peerId: $peerId, fromState: $fromState) {
            ... on CommentUpdateSingle {
                seq
                state
                update {
                    ...CommentUpdateFragment
                }
            }
            ... on CommentUpdateBatch {
                fromSeq
                seq
                state
                updates {
                    ...CommentUpdateFragment
                }
            }
        }
    }
    ${CommentUpdateFragment}
    ${CommentEntryFragment}
    ${FullMessage}
`;