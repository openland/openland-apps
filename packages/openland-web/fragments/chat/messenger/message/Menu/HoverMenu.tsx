import * as React from 'react';
import { css, cx } from "linaria";
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import MoreIcon from 'openland-icons/s/ic-more-v-24.svg';
import CommentIcon from 'openland-icons/s/ic-message-24.svg';
import LikeIcon from 'openland-icons/s/ic-like-24.svg';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { buildMessageMenu } from './MessageMenu';
import { XViewRouterContext } from 'react-mental';
import { MessageReactionType } from 'openland-api/Types';
import { ReactionPicker } from '../reactions/ReactionPicker';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-web/utils/useClient';
import { trackEvent } from 'openland-x-analytics';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';

const menuContainerClass = css`
    position: absolute;
    opacity: 0;
    top: 12px;
    right: 0;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    background-color: var(--backgroundPrimary);
    border-radius: 8px;
`;
const attachTop = css`
    top: -4px;
`;
const forceVisible = css`
    opacity: 1;
`;
const forceInvisible = css`
    display: none;
`;

export const HoverMenu = React.memo((props: { message: DataSourceWebMessageItem, engine: ConversationEngine }) => {
    const { message } = props;
    const client = useClient();
    const messenger = React.useContext(MessengerContext);
    const router = React.useContext(XViewRouterContext);
    const messageRef = React.useRef(message);
    messageRef.current = message;
    const [menuVisible, menuShow] = usePopper({ placement: 'bottom-end', hideOnClick: true }, (ctx) => buildMessageMenu(ctx, messageRef.current, props.engine, router!));
    const handleCommentClick = React.useCallback((e) => {
        e.stopPropagation();

        if (router && message.id) {
            router.navigate(`/message/${message.id}`);
        }
    }, [message.id]);

    // Sorry universe
    const reactionsRef = React.useRef(message.reactions);
    reactionsRef.current = message.reactions;

    const handleReactionClick = (reaction: MessageReactionType) => {
        const reactions = reactionsRef.current;
        if (message.id) {
            const remove = reactions && reactions.filter(userReaction => userReaction.user.id === messenger.user.id && userReaction.reaction === reaction).length > 0;
            if (remove) {
                client.mutateMessageUnsetReaction({ messageId: message.id, reaction });
            } else {
                trackEvent('reaction_sent', { reaction_type: reaction.toLowerCase(), double_tap: 'not' });

                client.mutateMessageSetReaction({ messageId: message.id, reaction });
            }
        }
    };

    const [reactionsVisible, reactionsShow] = usePopper({ placement: 'top', hideOnLeave: true, borderRadius: 20, scope: 'reaction-picker' }, () => <ReactionPicker onPick={handleReactionClick} />);
    const visible = menuVisible || reactionsVisible;

    return (
        <div className={cx(menuContainerClass, message.attachTop && attachTop, 'hover-menu-container', visible && forceVisible, message.isSending && forceInvisible)}>
            <UIconButton
                icon={<LikeIcon />}
                color="var(--foregroundTertiary)"
                size="small"
                active={reactionsVisible}
                onMouseEnter={reactionsShow}
                onClick={(e) => { e.stopPropagation(); handleReactionClick(MessageReactionType.LIKE); }}
            />
            <UIconButton
                icon={<CommentIcon />}
                color="var(--foregroundTertiary)"
                size="small"
                onClick={handleCommentClick}
            />
            <UIconButton
                icon={<MoreIcon />}
                color="var(--foregroundTertiary)"
                size="small-wide"
                onClick={menuShow}
                active={menuVisible}
            />
        </div>
    );
});