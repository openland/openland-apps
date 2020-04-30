import * as React from 'react';
import { css } from 'linaria';

const box = css`
    color: #272750;
    line-height: 1.3;

    @media (min-width: 1600px) {
        font-size: 36px;
    }

    @media (min-width: 960px) and (max-width: 1599px) {
        font-size: 32px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        font-size: 32px;
    }

    @media (max-width: 767px) {
        font-size: 22px;
    }
`;

export const Heading = React.memo((props: { title: string }) => <h2 className={box}>{props.title}</h2>);
