import * as React from 'react';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical, XMenuItem } from 'openland-x/XMenuItem';
import { XMemo } from 'openland-y-utils/XMemo';
import CellRoomIcon from 'openland-icons/ic-cell-room.svg';
import CreateChannelIcon from 'openland-icons/ic-cell-channel.svg';
import { css } from 'linaria';

let iconClass = css`
    opacity: 0.1;
    background-color: #1790ff;
`;

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
            path={href}
            icon={
                <XView marginRight={14} marginTop={-4}>
                    <div className={iconClass}>{icon}</div>
                </XView>
            }
        >
            <XView flexDirection="column">
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
        const [show, setShow] = React.useState(true);

        const closer = () => {
            // setShow(false);
        };

        const toggle = () => {
            setShow(!show);
        };

        return (
            <XPopper
                contentContainer={<XMenuVertical />}
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
                                icon={<CellRoomIcon />}
                                title="Create new group"
                                description="Group chat for your projects or topics"
                            />

                            <Item
                                href="/mail/create?channel=true"
                                icon={<CreateChannelIcon />}
                                title="Create new channel"
                                description="Broadcast messages to your audience"
                            />
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
