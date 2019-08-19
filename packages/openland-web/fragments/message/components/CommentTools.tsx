import * as React from 'react';
import { UIconLabeled } from 'openland-web/components/unicorn/UIconLabeled';
import { css } from 'linaria';
import LikeIcon from 'openland-icons/s/ic-like-16.svg';
import LikeFilledIcon from 'openland-icons/s/ic-like-filled-16.svg';
import ReplyIcon from 'openland-icons/s/ic-reply-16.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-16.svg';
import { FullMessage_GeneralMessage_reactions } from 'openland-api/Types';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { plural } from 'openland-y-utils/plural';
import { extractReactionsUsers } from 'openland-engines/reactions/extractReactionsUsers';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
import { ReactionsUsersInstance, ReactionsUsers } from 'openland-web/components/ReactionsUsers';

const wrapperClass = css`
    display: flex;
    flex-direction: row;
    margin: 5px 0 0 -8px;
`;

interface CommentToolsProps {
    reactions: FullMessage_GeneralMessage_reactions[];
    onReactionClick: () => void;
    onReplyClick: () => void;
    onDeleteClick?: () => void;
}

export const CommentTools = React.memo((props: CommentToolsProps) => {
    const messenger = React.useContext(MessengerContext);
    const { reactions, onReactionClick, onReplyClick, onDeleteClick } = props;

    let myLike = false;
    reactions.map(r => {
        if (r.user.id === messenger.user.id) {
            myLike = true;
        }
    });

    const likeLabel = myLike && reactions.length === 1 ? 'Liked' : (reactions.length > 0 ? plural(reactions.length, ['like', 'likes']) : 'Like');

    // Sorry universe
    const listRef = React.useRef<ReactionsUsersInstance>(null);
    const usersRef = React.useRef(extractReactionsUsers(reactions, messenger.user.id));
    usersRef.current = extractReactionsUsers(reactions, messenger.user.id);

    React.useEffect(() => {
        if (listRef && listRef.current) {
            listRef.current.update(extractReactionsUsers(reactions, messenger.user.id));
        }
    }, [listRef, reactions]);

    const [show] = useCaptionPopper({
        getText: (ctx) => (
            <ReactionsUsers initialUsers={usersRef.current} ref={listRef} ctx={ctx} />
        ),
        placement: 'bottom',
        scope: 'reaction-item'
    });

    return (
        <div className={wrapperClass}>
            <UIconLabeled
                icon={myLike ? <LikeFilledIcon /> : <LikeIcon />}
                label={likeLabel}
                style={myLike ? 'danger' : 'default'}
                onClick={onReactionClick}
                onMouseEnter={reactions.length > 0 ? show : undefined}
            />

            <UIconLabeled icon={<ReplyIcon />} label="Reply" onClick={onReplyClick} />

            {!!onDeleteClick && (
                <UIconLabeled icon={<DeleteIcon />} label="Delete" onClick={onDeleteClick} />
            )}
        </div>
    );
});