import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { CommentView } from './CommentView';
import { CommentWatch_event_CommentUpdateSingle_update, MessageComments_messageComments_comments, MessageReactionType, MessageComments_messageComments_comments_comment } from 'openland-api/Types';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { css } from 'linaria';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';

const wrapper = css`
    padding-bottom: 32px;
`;

interface CommentsListProps {
    messageId: string;
    groupId?: string;
    onSent: (data: URickTextValue, replyId?: string) => void;
}

const CommentsListInner = React.memo((props: CommentsListProps & { comments: MessageComments_messageComments_comments[] }) => {
    const client = useClient();
    const messenger = React.useContext(MessengerContext);
    const { messageId, groupId, comments, onSent } = props;
    const [highlightId, setHighlightId] = React.useState<string | undefined>(undefined);

    const handleCommentSent = React.useCallback((data: URickTextValue) => {
        onSent(data, highlightId);
        setHighlightId(undefined);
    }, [messageId, highlightId]);

    const handleReplyClick = React.useCallback((id: string) => {
        setHighlightId(id === highlightId ? undefined : id);
    }, [highlightId]);

    const handleDeleteClick = React.useCallback((id: string) => {
        const builder = new AlertBlanketBuilder();

        builder.title('Delete comment');
        builder.message('Delete this comment for everyone? This cannot be undone.');
        builder.action('Delete', async () => {
            await client.mutateDeleteComment({ id });
        }, 'danger');
        builder.show();
    }, []);

    const handleReactionClick = React.useCallback((comment: MessageComments_messageComments_comments_comment) => {
        const { id, reactions } = comment;
        const r = MessageReactionType.LIKE;
        const remove = reactions && reactions.filter(userReaction => userReaction.user.id === messenger.user.id && userReaction.reaction === r).length > 0;

        if (remove) {
            client.mutateCommentUnsetReaction({ commentId: id, reaction: r });
        } else {
            client.mutateCommentSetReaction({ commentId: id, reaction: r });
        }
    }, []);

    const commentsMap = {};

    comments.map(comment => { commentsMap[comment.id] = comment; });
    const commentsSorted = sortComments(comments, commentsMap);

    return (
        <div className={wrapper}>
            <UListHeader text="Comments" counter={commentsSorted.length} padded={false} />

            {commentsSorted.map(item => (
                <CommentView
                    key={'comment-' + item.id}
                    comment={item.comment}
                    deleted={item.deleted}
                    depth={getDepthOfComment(item, commentsMap)}
                    onReplyClick={handleReplyClick}
                    onDeleteClick={handleDeleteClick}
                    onReactionClick={handleReactionClick}
                    highlighted={highlightId === item.comment.id}
                    groupId={groupId}
                    onSent={handleCommentSent}
                />
            ))}
        </div>
    );
});

export const CommentsList = React.memo((props: CommentsListProps) => {
    const { messageId } = props;
    const client = useClient();
    const comments = client.useMessageComments({ messageId }, { fetchPolicy: 'cache-and-network' }).messageComments.comments;

    const updateHandler = async (event: CommentWatch_event_CommentUpdateSingle_update) => {
        if (event.__typename === 'CommentReceived') {
            await client.refetchMessageComments({ messageId });
        }
    };

    React.useEffect(() => {
        const watcher = new SequenceModernWatcher('comment messageId:' + messageId, client.subscribeCommentWatch({ peerId: messageId }), client.client, updateHandler, undefined, { peerId: messageId }, null);

        return () => {
            watcher.destroy();
        };
    });

    return (
        <CommentsListInner {...props} comments={comments} />
    );
});