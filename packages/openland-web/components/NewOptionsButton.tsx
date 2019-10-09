import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { XMenuVertical, XMenuItem } from 'openland-x/XMenuItem';
import { XMemo } from 'openland-y-utils/XMemo';
import { css } from 'linaria';
import CreateCommunityIcon from 'openland-icons/ic-community (1).svg';
import OrganizationIcon from 'openland-icons/ic-cell-organization.svg';
import CellRoomIcon from 'openland-icons/ic-cell-room.svg';
import CreateChannelIcon from 'openland-icons/ic-cell-channel.svg';
import PlusIcon from 'openland-icons/ic-add.svg';
import NotificationIcon from 'openland-icons/s/ic-notifications-24.svg';
import { useWithWidth } from '../hooks/useWithWidth';
import XPopper from 'openland-x/XPopper';
import { showCreateGroupModal } from 'openland-web/fragments/chat/showCreateGroupModal';
import { showCreateOrganization } from 'openland-web/fragments/org/showCreateOrganization';
import { UIconButton } from './unicorn/UIconButton';

const dotClass = css`
    position: absolute;
    top: 11px; right: 14px;
    width: 10px; height: 10px;
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
    const notificationsCenter = client.useWithoutLoaderMyNotificationCenter({ fetchPolicy: 'network-only' });

    return (
        <div className={wrapperClass}>
            <UIconButton
                path="/notifications"
                icon={<NotificationIcon />}
                size="large"
            />
            {notificationsCenter && !!notificationsCenter.myNotificationCenter.unread && (
                <div className={dotClass} />
            )}
        </div>
    );
});

const iconWrapperClass = css`
    & > svg path {
        fill: #1a90ff;
        opacity: 1;
    }
`;

const textClassName = css`
    letter-spacing: 0.02px;
`;

export const IconWithBackground = (props: { children: any }) => (
    <XView
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        width={36}
        height={36}
        backgroundColor="rgba(23, 144, 255, 0.1)"
        borderRadius={70}
    >
        <div className={iconWrapperClass}>
            {props.children}
        </div>
    </XView>
);

export const Item = ({
    title,
    description,
    href,
    onClick,
    icon,
}: {
    title: string;
    description: string;
    href?: string;
    onClick?: ((event: React.MouseEvent) => void) | undefined;
    icon: any;
}) => {
    return (
        <XMenuItem
            onClick={onClick}
            path={href}
            customContent={true}
            icon={
                <XView alignSelf="flex-start">
                    {icon}
                </XView>
            }
        >
            <XView
                paddingTop={10}
                paddingBottom={10}
                width={240}
                flexGrow={1}
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
            >
                <XView fontSize={14} fontWeight={'600'} color={'#000000'}>
                    <span className={textClassName}>{title}</span>
                </XView>
                <XView marginTop={4} fontSize={13} opacity={0.5} color={'#000000'}>
                    <span className={textClassName}>{description}</span>
                </XView>
            </XView>
        </XMenuItem>
    );
};

export const NewOptionsMenu = React.memo(() => (
    <>
        <Item
            onClick={() => showCreateGroupModal('group')}
            icon={
                <IconWithBackground>
                    <CellRoomIcon />
                </IconWithBackground>
            }
            title="New group"
            description="Chat where everyone can write"
        />
        <Item
            onClick={() => showCreateGroupModal('channel')}
            icon={
                <IconWithBackground>
                    <CreateChannelIcon />
                </IconWithBackground>
            }
            title="New channel"
            description="Chat where you write, others comment"
        />
        <Item
            onClick={() => showCreateOrganization('community')}
            icon={
                <IconWithBackground>
                    <CreateCommunityIcon />
                </IconWithBackground>
            }
            title="New community"
            description="A hub for chats for the same audience"
        />
        <Item
            onClick={() => showCreateOrganization('organization')}
            icon={
                <IconWithBackground>
                    <OrganizationIcon />
                </IconWithBackground>
            }
            title="New organization"
            description="A hub for chats with your teammates"
        />
    </>
));

export const NewOptionsButton = XMemo(() => {
    const [show, setShow] = React.useState(false);
    const [width] = useWithWidth();

    const closer = React.useCallback(() => {
        setShow(false);
    }, []);

    const toggle = React.useCallback(
        () => {
            setShow(!show);
        },
        [show],
    );

    let marginRight = 13;
    if (width && width < 951) {
        marginRight = -137;
    }
    if (width && width < 750) {
        marginRight = 13;
    }

    return (
        <XPopper
            contentContainer={<XMenuVertical paddingTop={10} paddingBottom={10} />}
            placement="bottom-end"
            show={show}
            marginTop={2}
            marginRight={marginRight}
            arrow={null}
            onClickOutside={closer}
            content={<NewOptionsMenu />}
        >
            <div onClick={toggle}>
                <UIconButton icon={<PlusIcon />} size="large" />
            </div>
        </XPopper>
    );
});
