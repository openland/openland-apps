import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { CommentView } from './CommentView';
import { CommentWatch_event_CommentUpdateSingle_update, CommentEntryFragment, MessageReactionType, CommentEntryFragment_comment } from 'openland-api/Types';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { css } from 'linaria';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';
import { XView, XImage } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';

const wrapper = css`
    padding-bottom: 32px;
`;

interface CommentsListProps {
    messageId: string;
    groupId?: string;
    highlightId?: string;
    onReply: (id: string) => void;
    onSent: (data: URickTextValue, replyId?: string) => void;
    onSentAttach: (files: File[], replyId?: string) => void;
}

const CommentsListInner = React.memo((props: CommentsListProps & { comments: CommentEntryFragment[] }) => {
    const client = useClient();
    const messenger = React.useContext(MessengerContext);
    const { groupId, comments, highlightId, onSent, onSentAttach, onReply } = props;

    const handleDeleteClick = React.useCallback((id: string) => {
        const builder = new AlertBlanketBuilder();

        builder.title('Delete comment');
        builder.message('Delete this comment for everyone? This cannot be undone.');
        builder.action('Delete', async () => {
            await client.mutateDeleteComment({ id });
        }, 'danger');
        builder.show();
    }, []);

    const handleReactionClick = React.useCallback((comment: CommentEntryFragment_comment) => {
        const { id, reactions } = comment;
        const r = MessageReactionType.LIKE;
        const remove = reactions && reactions.filter(userReaction => userReaction.user.id === messenger.user.id && userReaction.reaction === r).length > 0;

        if (remove) {
            client.mutateCommentUnsetReaction({ commentId: id, reaction: r });
        } else {
            client.mutateCommentSetReaction({ commentId: id, reaction: r });
        }
    }, []);

    if (comments.length <= 0) {
        return (
            <XView alignItems="center" justifyContent="center" flexGrow={1} paddingVertical={30}>
                <XImage
                    width={178}
                    height={154}
                    src="/static/X/messenger/messenger-empty.svg"
                    marginBottom={40}
                />
                <XView {...TextStyles.Body} color="var(--foregroundSecondary)">
                    Write first comment
                </XView>
            </XView>
        );
    }

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
                    onReplyClick={onReply}
                    onDeleteClick={handleDeleteClick}
                    onReactionClick={handleReactionClick}
                    highlighted={highlightId === item.comment.id}
                    groupId={groupId}
                    onSent={onSent}
                    onSentAttach={onSentAttach}
                />
            ))}
        </div>
    );
});

export const CommentsList = React.memo((props: CommentsListProps) => {
    const { messageId } = props;
    const client = useClient();
    const comments = client.useComments({ peerId: messageId }, { fetchPolicy: 'cache-and-network' }).comments.comments;

    const updateHandler = async (event: CommentWatch_event_CommentUpdateSingle_update) => {
        if (event.__typename === 'CommentReceived') {
            await client.refetchComments({ peerId: messageId });
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