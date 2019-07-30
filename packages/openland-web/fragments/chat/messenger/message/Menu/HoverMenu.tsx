import * as React from 'react';
import { css, cx } from "linaria";
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import MoreIcon from 'openland-icons/s/ic-more-v-24.svg';
import CommentIcon from 'openland-icons/s/ic-message-24.svg';
import LikeIcon from 'openland-icons/s/ic-like-24.svg';
import { usePopper } from 'openland-web/components/unicorn/usePopper';

////
// Menu
////
const menuButton = css`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6;
    opacity: 0;
`;

const menuContainerClass = css`
    display: flex;
    flex-direction: row;
`;
const forceVisible = css`
    opacity: 1;
`;

export const HoverMenu = (props: { message: DataSourceWebMessageItem }) => {
    let [visible, show] = usePopper({ placement: 'auto' }, () => <div style={{ width: 40, height: 40, backgroundColor: 'red' }} />);
    let showWrapped = React.useCallback((ev: React.MouseEvent) => {
        ev.stopPropagation();
        show(ev);
    }, []);
    return (
        <div className={cx(menuContainerClass)}>
            <UIcon className={cx(menuButton, 'hover-menu-button')} icon={<LikeIcon />} />
            <UIcon className={cx(menuButton, 'hover-menu-button')} icon={<CommentIcon />} />
            <UIcon className={cx(menuButton, 'hover-menu-button', visible && forceVisible)} icon={<MoreIcon onClick={showWrapped} />} />
        </div>
    );
};