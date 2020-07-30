import * as React from 'react';
import { XView } from 'react-mental';
import { UIconLabeled } from 'openland-web/components/unicorn/UIconLabeled';
import { css, cx } from 'linaria';
import LikeIcon from 'openland-icons/s/ic-like-16.svg';
import LikeFilledIcon from 'openland-icons/s/ic-like-filled-16.svg';
import ReplyIcon from 'openland-icons/s/ic-reply-16.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-16.svg';
import EditIcon from 'openland-icons/s/ic-edit-16.svg';
import { MessageReactionCounter } from 'openland-api/spacex.types';
import { plural } from 'openland-y-utils/plural';
import { defaultHover } from 'openland-web/utils/Styles';
import { TextLabel2 } from 'openland-web/utils/TextStyles';
import { showReactionsList } from 'openland-web/fragments/chat/messenger/message/reactions/showReactionsList';

const wrapperClass = css`
    display: flex;
    flex-direction: row;
    margin: 5px 0 0 -8px;
`;

const likesStubClass = css`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    height: 28px;
    padding: 0 8px;
    color: var(--foregroundSecondary);
`;

interface CommentToolsProps {
    reactionCounters: MessageReactionCounter[];
    entryId: string;
    onReactionClick: () => void;
    onReplyClick: () => void;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
}

export const CommentTools = React.memo((props: CommentToolsProps) => {
    const { reactionCounters, entryId, onReactionClick, onReplyClick, onDeleteClick, onEditClick } = props;
    const likedByMe = (reactionCounters.length > 0 && reactionCounters[0].setByMe);
    return (
        <div className={wrapperClass}>
            <UIconLabeled
                icon={likedByMe ? <LikeFilledIcon /> : <LikeIcon />}
                label={likedByMe ? 'Liked' : 'Like'}
                style={likedByMe ? 'danger' : 'default'}
                onClick={onReactionClick}
            />
            {reactionCounters.length > 0 && (
                <XView onClick={() => showReactionsList(entryId, true)}>
                    <div className={cx(likesStubClass, defaultHover, TextLabel2)}>{plural(reactionCounters[0].count, ['like', 'likes'])}</div>
                </XView>
            )}
            <UIconLabeled icon={<ReplyIcon />} label="Reply" onClick={onReplyClick} />
            {!!onEditClick && <UIconLabeled icon={<EditIcon />} label="Edit" onClick={onEditClick} />}
            {!!onDeleteClick && <UIconLabeled icon={<DeleteIcon />} label="Delete" onClick={onDeleteClick} />}
        </div>
    );
});
