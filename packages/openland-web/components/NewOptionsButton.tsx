import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { css, cx } from 'linaria';
import GroupIcon from 'openland-icons/s/ic-group-24.svg';
import ChannelIcon from 'openland-icons/s/ic-channel-24.svg';
import CommunityIcon from 'openland-icons/s/ic-community-24.svg';
import OrganizationIcon from 'openland-icons/s/ic-organization-24.svg';
import PlusIcon from 'openland-icons/ic-add.svg';
import NotificationIcon from 'openland-icons/s/ic-notifications-24.svg';
import { UIconButton } from './unicorn/UIconButton';
import { showCreatingFragment } from 'openland-web/fragments/create/CreateEntityFragment';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { Placement } from 'popper.js';
import { TextLabel1, TextDensed } from 'openland-web/utils/TextStyles';

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
    const notificationsCenter = client.useMyNotificationCenter({
        fetchPolicy: 'network-only', suspense: false
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
    width: 24px;
    height: 24px;
    flex-shrink: 0;

    & svg {
        fill: var(--foregroundSecondary);
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
    padding: 6px 16px;

    &:hover {
        background-color: var(--backgroundPrimaryHover);
    }
`;

const itemTextContainer = css`
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-direction: column;
    margin-left: 16px;
`;

const itemDescriptionClass = css`
    color: var(--foregroundSecondary);
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
            <div className={TextLabel1}>{title}</div>
            <div className={cx(TextDensed, itemDescriptionClass)}>{description}</div>
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
                    <GroupIcon />
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
                    <ChannelIcon />
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
                    <CommunityIcon />
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

    const [isVisible, show] = usePopper(
        {
            placement: menuPlacement,
            hideOnEsc: true,
            hideOnChildClick: true,
            showTimeout: 100,
            marginTop: -4,
            marginRight: 4,
        },
        () => (
            <XView paddingVertical={8}>
                <NewOptionsMenu />
            </XView>
        ),
    );

    return (
        <div onClick={show}>
            <UIconButton active={isVisible} icon={<PlusIcon />} size="large" />
        </div>
    );
});
