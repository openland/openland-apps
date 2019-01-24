import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';

const styleInner = css`
    display: flex;
    word-break: break-word;
    flex-grow: 1;
    position: relative;
    flex-direction: column;
    & > div:first-child {
        flex-grow: 1;
        position: relative;
        height: 100%;
        & > .simplebar-track.horizontal {
            display: none;
        },
        & > .simplebar-scroll-content > .simplebar-content {
            position: relative;
            height: 100%;
            overflow-x: unset !important;
            overflow-y: unset !important;
            width: 100%;
            will-change: transform;
        },
    }
`;

export const MessagesContainer = (props: { children?: any }) => {
    return (
        <XView
            flexDirection="column"
            flexGrow={1}
            paddingLeft={16}
            paddingRight={16}
            overflow="hidden"
        >
            <div className={'messages-wrapper ' + styleInner}>{props.children}</div>
        </XView>
    );
};
