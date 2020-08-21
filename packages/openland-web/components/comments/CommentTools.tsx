import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';
import MoreIcon from 'openland-icons/s/ic-more-h-24.svg';
import { MessageReactionCounter } from 'openland-api/spacex.types';
import { plural } from 'openland-y-utils/plural';
import { defaultHover } from 'openland-web/utils/Styles';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import { showReactionsList } from 'openland-web/fragments/chat/messenger/message/reactions/showReactionsList';
import { usePopper } from '../unicorn/usePopper';
import { UPopperMenuBuilder } from '../unicorn/UPopperMenuBuilder';
import { UIconButton } from '../unicorn/UIconButton';

const wrapperClass = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: -8px;
`;

const buttonClass = css`
    color: var(--foregroundTertiary);
    padding: 0 8px;
`;

const likedClass = css`
    color: var(--accentNegative);
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
    const hasMenu = !!onEditClick || !!onDeleteClick;
    const [menuVisible, menuShow] = hasMenu ? usePopper(
        { placement: 'bottom-start', hideOnClick: true },
        ctx => {
            let menu = new UPopperMenuBuilder();
            if (!!onEditClick) {
                menu.item({ title: 'Edit', icon: <EditIcon />, onClick: onEditClick });
            }
            if (!!onDeleteClick) {
                menu.item({ title: 'Delete', icon: <DeleteIcon />, onClick: onDeleteClick });
            }
            return menu.build(ctx);
        }
    ) : [false, () => { /* no op */ }];
    return (
        <div className={wrapperClass}>
            <XView onClick={onReplyClick}>
                <div className={cx(buttonClass, defaultHover, TextLabel1)}>Reply</div>
            </XView>
            <XView onClick={onReactionClick}>
                <div className={cx(buttonClass, defaultHover, TextLabel1, likedByMe && likedClass)}>{likedByMe ? 'Liked' : 'Like'}</div>
            </XView>
            {reactionCounters.length > 0 && (
                <XView onClick={() => showReactionsList(entryId, true)}>
                    <div className={cx(buttonClass, defaultHover, TextLabel1)}>{plural(reactionCounters[0].count, ['like', 'likes'])}</div>
                </XView>
            )}
            {hasMenu && (
                <UIconButton icon={<MoreIcon />} active={menuVisible} onClick={menuShow} size='small' />
            )}
        </div>
    );
});
