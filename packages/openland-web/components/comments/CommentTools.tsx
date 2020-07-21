import * as React from 'react';
import { UIconLabeled } from 'openland-web/components/unicorn/UIconLabeled';
import { css } from 'linaria';
import LikeIcon from 'openland-icons/s/ic-like-16.svg';
import LikeFilledIcon from 'openland-icons/s/ic-like-filled-16.svg';
import ReplyIcon from 'openland-icons/s/ic-reply-16.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-16.svg';
import EditIcon from 'openland-icons/s/ic-edit-16.svg';
import { MessageCounterReactions } from 'openland-api/spacex.types';
import { plural } from 'openland-y-utils/plural';

const wrapperClass = css`
    display: flex;
    flex-direction: row;
    margin: 5px 0 0 -8px;
`;

interface CommentToolsProps {
    reactionCounters: MessageCounterReactions[];
    onReactionClick: () => void;
    onReplyClick: () => void;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
}

export const CommentTools = React.memo((props: CommentToolsProps) => {
    const { reactionCounters, onReactionClick, onReplyClick, onDeleteClick, onEditClick } = props;

    const myLike = reactionCounters.filter(r => r.setByMe).length > 0;
    const likeLabel =
        myLike && !!reactionCounters.length && reactionCounters[0].count === 1
            ? 'Liked'
            : !!reactionCounters.length && reactionCounters[0].count > 0
                ? plural(reactionCounters[0].count, ['like', 'likes'])
                : 'Like';

    return (
        <div className={wrapperClass}>
            <UIconLabeled
                icon={myLike ? <LikeFilledIcon /> : <LikeIcon />}
                label={likeLabel}
                style={myLike ? 'danger' : 'default'}
                onClick={onReactionClick}
            />

            <UIconLabeled icon={<ReplyIcon />} label="Reply" onClick={onReplyClick} />

            {!!onEditClick && <UIconLabeled icon={<EditIcon />} label="Edit" onClick={onEditClick} />}
            {!!onDeleteClick && <UIconLabeled icon={<DeleteIcon />} label="Delete" onClick={onDeleteClick} />}
        </div>
    );
});
