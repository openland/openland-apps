import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';

const wrapperClassName = css`
    display: flex;
    flex-grow: 1;
    width: 100%;
    overflow: auto;
`;

const heightClassName = css`
    height: 100%;
`;

export const Wrapper = React.forwardRef((props: { children: any; fullHeight?: boolean }, ref: React.RefObject<HTMLDivElement>) => {
    return (
        <div
            className={cx(
                wrapperClassName,
                props.fullHeight && heightClassName,
            )}
            ref={ref}
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
});
