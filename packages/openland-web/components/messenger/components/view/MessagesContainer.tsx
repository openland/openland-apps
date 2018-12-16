import * as React from 'react';
import { css } from 'linaria';

const styleContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    padding-left: 16;
    padding-right: 16;
    overflow: hidden;
`;

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
    & > div:first-child: {
        width: 100%;
        max-width: 100%;
        flex-basis: 100%;
        height: 100%;
        max-height: 100%;
        flex-grow: 1;
        & > .simplebar-track.horizontal: {
            display: none;
        },
        & > .simplebar-scroll-content > .simplebar-content: {
            overflow-x: unset !important;
            overflow-y: unset !important;
            width: 100%;
            justify-content: flex-end;
            will-change: transform;
        },
    }
`;

export const MessagesContainer = (props: { children?: any }) => {
    return (
        <div className={styleContainer}>
            <div className={'messages-wrapper ' + styleInner}>
                {props.children}
            </div>
        </div>
    );
};
