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

const menuButton = css`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6;
    opacity: 0;
    cursor: pointer;
`;

const menuContainerClass = css`
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
`;
const forceVisible = css`
    opacity: 1;
`;

export const HoverMenu = (props: { message: DataSourceWebMessageItem, engine: ConversationEngine }) => {
    const { message } = props;
    const router = React.useContext(XViewRouterContext);
    const [visible, show] = usePopper({ placement: 'top-end', hideOnClick: true }, (ctx) => buildMessageMenu(ctx, props.message, props.engine, router!));
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

    return (
        <div className={cx(menuContainerClass)}>
            <UIcon className={cx(menuButton, 'hover-menu-button', visible && forceVisible)} icon={<LikeIcon />} />
            <UIcon className={cx(menuButton, 'hover-menu-button', visible && forceVisible)} icon={<CommentIcon onClick={handleCommentClick} />} />
            <UIcon className={cx(menuButton, 'hover-menu-button', visible && forceVisible)} icon={<MoreIcon onClick={showWrapped} />} />
        </div>
    );
};