import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { CommentView } from './CommentView';
import { CommentWatch_event_CommentUpdateSingle_update } from 'openland-api/Types';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';

export const CommentsList = React.memo((props: { messageId: string }) => {
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

    const commentsMap = {};

    comments.map(comment => {
        commentsMap[comment.id] = comment;
    });

    const commentsSorted = sortComments(comments, commentsMap);

    return (
        <div>
            {commentsSorted.map(item => (
                <CommentView
                    key={'comment-' + item.id}
                    comment={item.comment}
                    depth={getDepthOfComment(item, commentsMap)}
                />
            ))}
        </div>
    );
});