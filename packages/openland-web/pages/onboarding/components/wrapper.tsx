import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';

const wrapperClassName = css`
    display: flex;
    flex-grow: 1;
    width: 100%;
`;

const heightClassName = css`
    height: 100%;
`;

const iosClassName = css`
    overflow: hidden;
`;

export const Wrapper = (props: { children: any; fullHeight?: boolean }) => {
    let platform = window.navigator.platform,
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        isIos = false;

    if (iosPlatforms.indexOf(platform) !== -1) {
        isIos = true;
    }
    return (
        <div
            className={cx(
                wrapperClassName,
                props.fullHeight && heightClassName,
                props.fullHeight && isIos && iosClassName,
            )}
        >
            <XView
                backgroundColor="white"
                flexGrow={1}
                flexShrink={0}
                flexBasis={0}
                width="100%"
                height="100%"
            >
                <XView flexShrink={1} flexGrow={1} flexBasis={0}>
                    {props.children}
                </XView>
            </XView>
        </div>
    );
};
