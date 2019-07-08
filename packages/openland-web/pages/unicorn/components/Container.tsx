import * as React from 'react';
import { css } from 'linaria';

const body = css`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #F0F2F5;
`;

export const Container = (props: { children?: any }) => {
    return (
        <div className={body}>
            {props.children}
        </div>
    );
}