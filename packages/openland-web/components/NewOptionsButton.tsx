import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { css } from 'linaria';
import CreateCommunityIcon from 'openland-icons/ic-community (1).svg';
import OrganizationIcon from 'openland-icons/ic-cell-organization.svg';
import CellRoomIcon from 'openland-icons/ic-cell-room.svg';
import CreateChannelIcon from 'openland-icons/ic-cell-channel.svg';
import PlusIcon from 'openland-icons/ic-add.svg';
import NotificationIcon from 'openland-icons/s/ic-notifications-24.svg';
import { UIconButton } from './unicorn/UIconButton';
import { showCreatingFragment } from 'openland-web/fragments/create/CreateEntityFragment';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { Placement } from 'popper.js';

const dotClass = css`
    position: absolute;
    top: 11px;
    right: 14px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    border: 2px solid var(--backgroundPrimary);
    background-color: var(--accentNegative);
    z-index: 2;
`;

const wrapperClass = css`
    position: relative;

    &:hover .${dotClass} {
        border-color: var(--backgroundPrimaryHover);
    }
`;

export const NotificationsButton = React.memo(() => {
    const client = useClient();
    const notificationsCenter = client.useWithoutLoaderMyNotificationCenter({
        fetchPolicy: 'network-only',
    });

    return (
        <div className={wrapperClass}>
            <UIconButton path="/notifications" icon={<NotificationIcon />} size="large" />
            {notificationsCenter &&
                !!notificationsCenter.myNotificationCenter.unread && <div className={dotClass} />}
        </div>
    );
});

const iconContainerClass = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    border-radius: 100%;
    background-color: rgba(23, 144, 255, 0.1);

    & > svg path {
        fill: #1a90ff;
        opacity: 1;
    }
`;

const Icon = (props: { children: JSX.Element }) => (
    <div className={iconContainerClass}>{props.children}</div>
);

const itemContainerClass = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 10px;
    padding-bottom: 10px;

    &:hover {
        background-color: var(--backgroundPrimaryHover);
    }
`;

const itemTextContainer = css`
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-direction: column;
    margin-left: 18px;
`;

const itemTitleClass = css`
    font-size: 14px;
    font-weight: 600;
`;

const itemDescriptionClass = css`
    font-size: 13px;
    opacity: 0.5;
`;

interface ItemProps {
    title: string;
    description: string;
    onClick?: ((event: React.MouseEvent) => void) | undefined;
    icon: JSX.Element;
}

const Item = ({ title, description, onClick, icon }: ItemProps) => (
    <div className={itemContainerClass} onClick={onClick}>
        {icon}
        <div className={itemTextContainer}>
            <div className={itemTitleClass}>{title}</div>
            <div className={itemDescriptionClass}>{description}</div>
        </div>
    </div>
);

const NewOptionsMenu = React.memo(() => (
    <>
        <Item
            onClick={() => {
                showCreatingFragment({ entityType: 'group' });
            }}
            icon={
                <Icon>
                    <CellRoomIcon />
                </Icon>
            }
            title="New group"
            description="Chat where everyone can write"
        />
        <Item
            onClick={() => {
                showCreatingFragment({ entityType: 'channel' });
            }}
            icon={
                <Icon>
                    <CreateChannelIcon />
                </Icon>
            }
            title="New channel"
            description="Chat where you write, others comment"
        />
        <Item
            onClick={() => {
                showCreatingFragment({ entityType: 'community' });
            }}
            icon={
                <Icon>
                    <CreateCommunityIcon />
                </Icon>
            }
            title="New community"
            description="A hub for chats for the same audience"
        />
        <Item
            onClick={() => {
                showCreatingFragment({ entityType: 'organization' });
            }}
            icon={
                <Icon>
                    <OrganizationIcon />
                </Icon>
            }
            title="New organization"
            description="A hub for chats with your teammates"
        />
    </>
));

export const NewOptionsButton = React.memo(() => {
    const isMobile = useLayout() === 'mobile';
    const [menuPlacement, setMenuPlacement] = React.useState<Placement>('bottom-end');

    React.useLayoutEffect(
        () => {
            if (isMobile) {
                setMenuPlacement('bottom');
            } else if (!isMobile) {
                setMenuPlacement('bottom-end');
            }
        },
        [isMobile],
    );

    const [, show] = usePopper(
        {
            placement: menuPlacement,
            hideOnEsc: true,
            hideOnChildClick: true,
            showTimeout: 100,
        },
        () => (
            <XView paddingVertical={8}>
                <NewOptionsMenu />
            </XView>
        ),
    );

    return (
        <div onClick={show}>
            <UIconButton icon={<PlusIcon />} size="large" />
        </div>
    );
});
