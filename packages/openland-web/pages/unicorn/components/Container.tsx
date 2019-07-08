import * as React from 'react';
import { css } from 'linaria';

const body = css`
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

export const Container = (props: { children?: any }) => {
    return (
        <div className={body}>
            <div className={inner}>
                {props.children}
            </div>
        </div>
    );
}