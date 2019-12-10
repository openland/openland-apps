import * as React from 'react';
import { DocumentContent } from '../messenger/message/content/DocumentContent';
import { emoji } from 'openland-y-utils/emoji';
import { css, cx } from 'linaria';
import { SharedItemFile, sharedItemMenu } from './SharedMediaFragment';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import ManageVerticalIcon from 'openland-icons/ic-more-v.svg';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XViewRouterContext } from 'react-mental';

const MenuContainer = css`
    display: flex;
    align-items: center;
    position: absolute;
    right: 8px;
    top:0;
    bottom: 0;
    opacity: 0;
`;
const MenuVisible = css`
    opacity: 1;
`;

const DocumentContentClass = css`
    width: 100%;
    max-width: unset;
    background: unset;
    padding: 6px 16px 8px;
    transition: unset;
`;

const DocumentContentContainerClass = css`
    width: calc(100% + 32px);
    margin: 0 -16px;
    position: relative;
    border-radius: 8px;
    :hover{
        background: var(--backgroundTertiary);
        .menu-container{
            opacity: 1;
        }
    }
`;

export const DocContent = (props: { item: SharedItemFile }) => {
    const messenger = React.useContext(MessengerContext);
    const router = React.useContext(XViewRouterContext)!;
    const menuClick = React.useCallback((ctx: UPopperController) => {
        return sharedItemMenu(messenger, router, ctx, props.item);
    }, []);
    const [menuVisible, menuShow] = usePopper({ placement: 'bottom-end', hideOnClick: true }, menuClick);

    return (
        <div className={DocumentContentContainerClass}>
            <DocumentContent file={props.item.attach} className={DocumentContentClass} sender={props.item.sender} senderNameEmojify={emoji(props.item.sender.name)} />
            <div className={cx('menu-container', MenuContainer, menuVisible && MenuVisible)}>
                <UIconButton
                    icon={<ManageVerticalIcon />}
                    active={menuVisible}
                    onClick={menuShow}
                />
            </div>
        </div>
    );
};