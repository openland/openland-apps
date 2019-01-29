import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';

const styleInner = css`
    display: flex;
    flex-grow: 1;
    flex-basis: 100%;
    flex-direction: column;
    justify-content: flex-end;
    align-self: center;
    position: relative;
    max-height: 100%;
    height: 100%;
    width: 100%;
    max-width: 100%;
    overflow: hidden;

    & .simplebar-track.horizontal {
        display: none !important;
    }

    & .simplebar-scroll-content .simplebar-content {
        align-items: center !important;
        overflow-x: unset !important;
        overflow-y: unset !important;
        width: 100%;
        justify-content: flex-end;
        will-change: transform;
    }
`;

export const MessagesContainer = (props: { children?: any }) => {
    return (
        <XView
            flexDirection="column"
            flexGrow={1}
            flexShrink={1}
            paddingLeft={16}
            paddingRight={16}
            overflow="hidden"
        >
            <div className={'messages-wrapper ' + styleInner}>{props.children}</div>
        </XView>
    );
};
