import * as React from 'react';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical, XMenuItem } from 'openland-x/XMenuItem';
import { XMemo } from 'openland-y-utils/XMemo';
import CellRoomIcon from 'openland-icons/ic-cell-room.svg';
import CreateChannelIcon from 'openland-icons/ic-cell-channel.svg';
import { css } from 'linaria';

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

const IconWithBackground = ({ children }: { children: any }) => {
    return (
        <div className={iconBackgroundClass}>
            <div className={iconWrapperClass}>{children}</div>
        </div>
    );
};

const TextItemWrapper = ({ children }: { children: any }) => {
    return <XView height={36}>{children}</XView>;
};

const Item = ({
    title,
    description,
    href,
    icon,
}: {
    title: string;
    description: string;
    href: string;
    icon: any;
}) => {
    return (
        <XMenuItem
            TextItemWrapper={TextItemWrapper}
            path={href}
            icon={<XView marginRight={12}>{icon}</XView>}
        >
            <XView
                flexGrow={1}
                flexDirection="column"
                justifyContent={'space-between'}
                height={'100%'}
            >
                <XView fontSize={14} fontWeight={'600'} color={'#000000'}>
                    {title}
                </XView>
                <XView fontSize={13} opacity={0.5} color={'#000000'}>
                    {description}
                </XView>
            </XView>
        </XMenuItem>
    );
};

export const PopperOptionsButton = XMemo(
    ({ content, icon, title, path }: { content?: any; icon: any; title: any; path?: string }) => {
        const [show, setShow] = React.useState(false);

        const closer = () => {
            setShow(false);
        };

        const toggle = () => {
            setShow(!show);
        };

        return (
            <XPopper
                contentContainer={<XMenuVertical paddingTop={16} paddingBottom={16} />}
                placement="bottom-end"
                show={show}
                marginTop={10}
                marginRight={-5}
                arrow={null}
                onClickOutside={closer}
                content={
                    content !== undefined ? (
                        content
                    ) : (
                        <>
                            <Item
                                href="/mail/create"
                                icon={
                                    <IconWithBackground>
                                        <CellRoomIcon />
                                    </IconWithBackground>
                                }
                                title="Create new group"
                                description="Group chat for your projects or topics"
                            />

                            <XView marginTop={6}>
                                <Item
                                    href="/mail/create?channel=true"
                                    icon={
                                        <IconWithBackground>
                                            <CreateChannelIcon />
                                        </IconWithBackground>
                                    }
                                    title="Create new channel"
                                    description="Broadcast messages to your audience"
                                />
                            </XView>
                        </>
                    )
                }
            >
                <XButton
                    onClick={toggle}
                    path={path}
                    style="light"
                    text={title}
                    icon={icon}
                    size="small"
                />
            </XPopper>
        );
    },
);
