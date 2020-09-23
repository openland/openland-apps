import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { CommentView } from './CommentView';
import { StickerFragment, CommentWatch, CommentEntryFragment, MessageReactionType, CommentEntryFragment_comment, RoomMemberRole } from 'openland-api/spacex.types';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { css } from 'linaria';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';
import { createLogger } from 'mental-log';

const log = createLogger('CommentsList');

const wrapper = css`
    padding-bottom: 32px;
`;

interface CommentsListProps {
    peerId: string;
    groupId?: string;
    highlightId?: string;
    onReply: (id: string) => void;
    onSent: (data: URickTextValue) => Promise<boolean>;
    onSentAttach: (files: File[], isImage: boolean) => void;
    onStickerSent: (sticker: StickerFragment) => void;
}

const CommentsListInner = React.memo((props: CommentsListProps & { comments: CommentEntryFragment[], role: RoomMemberRole | undefined }) => {
    const client = useClient();
    const { groupId, comments, highlightId, onSent, onSentAttach, onReply, onStickerSent } = props;
    const commnetsUpdatedCounter = React.useRef(0);
    React.useEffect(() => {
        commnetsUpdatedCounter.current++;
    }, [comments]);

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
        if (comment.__typename === 'GeneralMessage' || comment.__typename === 'StickerMessage') {
            const { id, reactionCounters } = comment;
            const reactionType = MessageReactionType.LIKE;
            const remove = !!reactionCounters.find(r => r.setByMe);

            if (remove) {
                client.mutateCommentUnsetReaction({ commentId: id, reaction: reactionType });
            } else {
                client.mutateCommentSetReaction({ commentId: id, reaction: reactionType });
            }
        }
    }, []);

    if (comments.length <= 0) {
        return (
            <XView alignItems="center" justifyContent="center" flexGrow={1} paddingVertical={30}>
                <XView {...TextStyles.Body} color="var(--foregroundSecondary)">
                    Write the first comment!
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
                    generation={commnetsUpdatedCounter.current}
                    key={'comment-' + item.id}
                    entryId={item.id}
                    comment={item.comment}
                    deleted={item.deleted}
                    role={props.role}
                    depth={getDepthOfComment(item, commentsMap)}
                    onReplyClick={onReply}
                    onDeleteClick={handleDeleteClick}
                    onReactionClick={handleReactionClick}
                    highlighted={highlightId === item.comment.id}
                    groupId={groupId}
                    onSent={onSent}
                    onSentAttach={onSentAttach}
                    onStickerSent={onStickerSent}
                />
            ))}
        </div>
    );
});

export const CommentsList = React.memo((props: CommentsListProps) => {
    const { peerId } = props;
    const client = useClient();

    log.log(`render peerId: ${peerId}`);

    const data = client.useComments({ peerId }, { fetchPolicy: 'cache-and-network' }).comments;

    log.log(`data count: ${data.count} | state: ${data.state}`);

    const updateHandler = React.useCallback(async () => {
        log.log(`updateHandler refetch`);

        await client.refetchComments({ peerId });
    }, [peerId]);

    React.useEffect(() => {
        log.log(`useEffect before subscribe`);

        return sequenceWatcher<CommentWatch>(data.state.state, (state, handler) => client.subscribeCommentWatch({ peerId, fromState: state }, handler), (updates) => {
            log.log(`event recieved. start`);

            if (updates.event) {
                log.log(`event recieved state: ${updates.event.state}`);

                updateHandler();
                return updates.event.state;
            } else {
                return null;
            }
        });
    }, [peerId]);
    const role = data.peerRoot.__typename === 'CommentPeerRootMessage' && data.peerRoot.chat.__typename === 'SharedRoom'
        ? data.peerRoot.chat.role
        : undefined;

    return (
        <CommentsListInner {...props} comments={data.comments} role={role} />
    );
});