import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';

const wrapperClassName = css`
    width: 100%;
`;

export const Wrapper = (props: { children: any }) => (
    <div className={wrapperClassName}>
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
