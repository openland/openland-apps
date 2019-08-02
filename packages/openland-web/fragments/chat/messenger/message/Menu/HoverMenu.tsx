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

const menuButton = css`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6;
    cursor: pointer;
`;

const menuManageButton = css`
    width: 24px;
`;

const menuContainerClass = css`
    position: absolute;
    opacity: 0;
    top: 12px;
    right: 0;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    background-color: #fff; // ThemeDefault.backgroundPrimary
    border-radius: 8px;
`;
const attachTop = css`
    top: 0;
`;
const forceVisible = css`
    opacity: 1;
`;
const forceInvisible = css`
    display: none;
`;

export const HoverMenu = React.memo((props: { message: DataSourceWebMessageItem, engine: ConversationEngine }) => {
    const { message } = props;
    const router = React.useContext(XViewRouterContext);
    const messageRef = React.useRef(message);
    messageRef.current = message;
    const [visible, show] = usePopper({ placement: 'bottom-end', hideOnClick: true }, (ctx) => buildMessageMenu(ctx, messageRef.current, props.engine, router!));
    const showWrapped = React.useCallback((ev: React.MouseEvent) => {
        ev.stopPropagation();
        show(ev);
    }, []);

    const handleCommentClick = React.useCallback((e) => {
        e.stopPropagation();

        if (router && message.id) {
            router.navigate(`/message/${message.id}`);
        }
    }, [message.id]);

    const handleLikeClick = React.useCallback((e) => {
        e.stopPropagation();
        if (message.id) {
            props.engine.engine.client.mutateMessageSetReaction({ messageId: message.id, reaction: MessageReactionType.LIKE });
        }
    }, [message.id]);

    return (
        <div className={cx(menuContainerClass, message.attachTop && attachTop, 'hover-menu-container', visible && forceVisible, message.isSending && forceInvisible)}>
            <UIcon className={cx(menuButton, visible && forceVisible)} icon={<LikeIcon onClick={handleLikeClick} />} />
            <UIcon className={cx(menuButton)} icon={<CommentIcon onClick={handleCommentClick} />} />
            <UIcon className={cx(menuButton, menuManageButton)} icon={<MoreIcon onClick={showWrapped} />} />
        </div>
    );
});