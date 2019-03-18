import * as React from 'react';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical, XMenuItem } from 'openland-x/XMenuItem';
import { XMemo } from 'openland-y-utils/XMemo';
import CreateRoomIcon from 'openland-icons/ic-create-room.svg';
import CreateCommunityIcon from 'openland-icons/ic-create-community.svg';

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
                            <XMenuItem
                                style="gray"
                                path="/mail/create"
                                icon={
                                    <XView marginRight={14} marginTop={-4}>
                                        <CreateRoomIcon />
                                    </XView>
                                }
                            >
                                New group
                            </XMenuItem>
                            <XMenuItem
                                style="gray"
                                icon={
                                    <XView marginRight={14} marginTop={-4}>
                                        <CreateCommunityIcon />
                                    </XView>
                                }
                                query={{
                                    field: 'createOrganization',
                                    value: 'community',
                                }}
                            >
                                New community
                            </XMenuItem>
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
