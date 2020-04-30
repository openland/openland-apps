import * as React from 'react';
import { css } from 'linaria';

let containerClass = css`
    margin: 0 auto;
    padding: 0 20px;
    width: 1180px;
    min-width: 320px;
    position: relative;

    @media (max-width: 767px) {
        padding: 0 15px;
        width: 100%;
    }

    @media (min-width: 768px) and (max-width: 999px) {
        padding: 0 25px;
        width: 768px;
    }

    @media (min-width: 1000px) and (max-width: 1179px) {
        width: 1000px;
    }
`;

interface ContainerProps {
    children?: any;
}

export const Container = (props: ContainerProps) => (
    <div className={containerClass}>{props.children}</div>
);
