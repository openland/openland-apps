import * as React from 'react';
import { XView } from 'react-mental';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical, XMenuItem } from 'openland-x/XMenuItem';
import { XMemo } from 'openland-y-utils/XMemo';
import { css } from 'linaria';
import CreateCommunityIcon from 'openland-icons/ic-community (1).svg';
import OrganizationIcon from 'openland-icons/ic-cell-organization.svg';
import CellRoomIcon from 'openland-icons/ic-cell-room.svg';
import CreateChannelIcon from 'openland-icons/ic-cell-channel.svg';
import NewIcon from 'openland-icons/ic-add-blue.svg';
import { makeActionable } from 'openland-x/Actionable';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XRoutingContext } from 'openland-x-routing/XRoutingContext';

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

const iconWrapperClass = css`
    & > svg path {
        fill: #1a90ff;
        opacity: 1;
    }
`;

const textClassName = css`
    letter-spacing: 0.02px;
`;

export const IconWithBackground = ({ children }: { children: any }) => {
    return (
        <XView
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            width={36}
            height={36}
            backgroundColor="rgba(23, 144, 255, 0.1)"
            borderRadius={70}
        >
            <div className={iconWrapperClass}>{children}</div>
        </XView>
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
            style="gray"
            onClick={onClick}
            TextItemWrapper={TextItemWrapper}
            path={href}
            icon={
                <XView marginRight={12} paddingTop={11} alignSelf="flex-start">
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
            description="Chat where everyone can write"
        />
        <Item
            href="/mail/create?channel=true"
            icon={
                <IconWithBackground>
                    <CreateChannelIcon />
                </IconWithBackground>
            }
            title="New channel"
            description="Chat where you write, others comment"
        />
        <Item
            href="/mail/createCommunity"
            icon={
                <IconWithBackground>
                    <CreateCommunityIcon />
                </IconWithBackground>
            }
            title="New community"
            description="A hub for chats for the same audience"
        />
        <Item
            href="/mail/createOrganization"
            icon={
                <IconWithBackground>
                    <OrganizationIcon />
                </IconWithBackground>
            }
            title="New organization"
            description="A hub for chats with your teammates"
        />
    </>
);

export const NewOptionsButton = XMemo(() => {
    let router = React.useContext(XRoutingContext)!;
    const [show, setShow] = React.useState(false);

    const closer = React.useCallback(() => {
        setShow(false);
    }, []);

    const open = React.useCallback(() => {
        setShow(true);
    }, []);

    const ctrlOptionN = () => {
        open();
        router.push(`/mail`);
    };

    const toggle = React.useCallback(() => {
        setShow(!show);
    }, []);

    return (
        <XPopper
            contentContainer={<XMenuVertical paddingTop={10} paddingBottom={10} />}
            placement="bottom-end"
            show={show}
            marginTop={10}
            marginRight={-5}
            arrow={null}
            onClickOutside={closer}
            content={<NewOptionsMenu />}
        >
            <XShortcuts
                handlerMap={{
                    CTRL_OPTION_N: ctrlOptionN,
                }}
                keymap={{
                    CTRL_OPTION_N: {
                        osx: ['ctrl+option+n'],
                        windows: ['ctrl+alt+n'],
                    },
                }}
            >
                <NewButton onClick={toggle} />
            </XShortcuts>
        </XPopper>
    );
});
