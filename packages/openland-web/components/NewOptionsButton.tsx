import * as React from 'react';
import { XView } from 'react-mental';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical, XMenuItem } from 'openland-x/XMenuItem';
import { XMemo } from 'openland-y-utils/XMemo';
import { css } from 'linaria';
import { showCreateOrganization } from 'openland-web/fragments/showCreateOrganization';
import CreateCommunityIcon from 'openland-icons/ic-community (1).svg';
import OrganizationIcon from 'openland-icons/ic-cell-organization.svg';
import CellRoomIcon from 'openland-icons/ic-cell-room.svg';
import CreateChannelIcon from 'openland-icons/ic-cell-channel.svg';
import NewIcon from 'openland-icons/ic-add-blue.svg';
import { makeActionable } from 'openland-x/Actionable';

const NewButton = makeActionable<{ onClick: () => void }>(props => (
    <XView
        cursor="pointer"
        fontSize={16}
        fontWeight="600"
        color="#1790ff"
        flexDirection="row"
        alignItems="center"
        onClick={props.onClick}
    >
        <XView marginRight={5}>
            <NewIcon />
        </XView>
        New
    </XView>
));

let iconBackgroundClass = css`
    position: relative;
    width: 36px;
    height: 36px;
    background-color: rgba(23, 144, 255, 0.1);
    border-radius: 70px;
`;

let iconWrapperClass = css`
    & > svg {
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }

    & > svg path {
        fill: #1a90ff;
        opacity: 1;
    }
`;

export const IconWithBackground = ({ children }: { children: any }) => {
    return (
        <div className={iconBackgroundClass}>
            <div className={iconWrapperClass}>{children}</div>
        </div>
    );
};

const TextItemWrapper = ({ children }: { children: any }) => {
    return <XView>{children}</XView>;
};

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
            style={'gray'}
            onClick={onClick}
            TextItemWrapper={TextItemWrapper}
            path={href}
            icon={
                <XView marginRight={12} paddingTop={8} alignSelf="flex-start">
                    {icon}
                </XView>
            }
        >
            <XView
                paddingTop={9}
                paddingBottom={9}
                maxWidth={250}
                flexGrow={1}
                flexDirection="column"
                justifyContent={'space-between'}
                height={'100%'}
            >
                <XView fontSize={14} fontWeight={'600'} color={'#000000'}>
                    {title}
                </XView>
                <XView marginTop={5} fontSize={13} opacity={0.5} color={'#000000'}>
                    {description}
                </XView>
            </XView>
        </XMenuItem>
    );
};

export const NewOptionsMenu = () => (
    <>
        <Item
            href="/mail/create"
            icon={
                <IconWithBackground>
                    <CellRoomIcon />
                </IconWithBackground>
            }
            title="New group"
            description="Group chat for your projects or topics"
        />
        <Item
            href="/mail/create?channel=true"
            icon={
                <IconWithBackground>
                    <CreateChannelIcon />
                </IconWithBackground>
            }
            title="New channel"
            description="Broadcast messages to your audience"
        />
        <Item
            href="/mail/createOrganization?community=true"
            icon={
                <IconWithBackground>
                    <CreateCommunityIcon />
                </IconWithBackground>
            }
            title="New community"
            description="A hub for groups and channels"
        />
        <Item
            onClick={() => showCreateOrganization('organization')}
            icon={
                <IconWithBackground>
                    <OrganizationIcon />
                </IconWithBackground>
            }
            title="New organization"
            description="Showcase your company and chat with co-workers"
        />
    </>
);

export const NewOptionsButton = XMemo(() => {
    const [show, setShow] = React.useState(false);

    const closer = () => {
        setShow(false);
    };

    const toggle = () => {
        setShow(!show);
    };

    return (
        <XPopper
            contentContainer={<XMenuVertical paddingTop={8} paddingBottom={8} />}
            placement="bottom-end"
            show={show}
            marginTop={10}
            arrow={null}
            onClickOutside={closer}
            content={<NewOptionsMenu />}
        >
            <NewButton onClick={toggle} />
        </XPopper>
    );
});
