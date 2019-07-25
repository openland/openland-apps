import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { CommentView } from './CommentView';
import { CommentWatch_event_CommentUpdateSingle_update, MessageComments_messageComments_comments } from 'openland-api/Types';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';

interface CommentsListProps {
    messageId: string;
    groupId?: string;
    onSent: (data: URickTextValue, replyId?: string) => void;
}

const CommentsListInner = React.memo((props: CommentsListProps & { comments: MessageComments_messageComments_comments[] }) => {
    const client = useClient();
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
        client.mutateDeleteComment({ id });
    }, []);

    const commentsMap = {};

    comments.map(comment => { commentsMap[comment.id] = comment; });
    const commentsSorted = sortComments(comments, commentsMap);

    return (
        <div>
            {commentsSorted.map(item => (
                <CommentView
                    key={'comment-' + item.id}
                    comment={item.comment}
                    deleted={item.deleted}
                    depth={getDepthOfComment(item, commentsMap)}
                    onReplyClick={handleReplyClick}
                    onDeleteClick={handleDeleteClick}
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