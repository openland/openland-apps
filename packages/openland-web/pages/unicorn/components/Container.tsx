import * as React from 'react';
import { css } from 'linaria';
import { LayoutProvider } from './LayoutContext';

const body = css`
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    background-color: #F0F2F5;
`;

const inner = css`
    overflow-y: scroll;
    display: flex;
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
`;

export const InnerContainer = (props: { children?: any }) => {
    return (
        <div className={inner}>
            {props.children}
        </div>
    );
}

export const Container = React.memo((props: { children?: any }) => {
    return (
        <LayoutProvider>
            <div className={body}>
                <div className={inner}>
                    {props.children}
                </div>
            </div>
        </LayoutProvider>
    );
});