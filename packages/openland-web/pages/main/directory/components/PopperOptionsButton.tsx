import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical } from 'openland-x/XMenuItem';
import { XMemo } from 'openland-y-utils/XMemo';

const PopperOptionsButtonWrapper = Glamorous(XButton)({
    '& svg > g > path': {
        transition: 'all .2s',
    },
    '& svg > g > path:last-child': {
        fill: '#1790ff',
        opacity: 0.5,
    },
});

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
                content={content}
                arrow={null}
                onClickOutside={closer}
            >
                <PopperOptionsButtonWrapper
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
