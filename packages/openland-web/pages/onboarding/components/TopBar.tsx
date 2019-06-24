import * as React from 'react';
import { css } from 'linaria';

const topBarClassName = css`
    width: 100%;
    position: absolute;
    height: 5px;
    left: 0px;
    top: 0px;
    background: rgba(23, 144, 255, 0.1);
    mix-blend-mode: normal;
`;

const topBarActiveClassName = css`
    position: absolute;
    width: 790px;
    height: 5px;
    left: 0px;
    top: 0px;

    background: rgba(23, 144, 255, 0.8);
    background: #1790ff;
    mix-blend-mode: normal;
`;

export const TopBar = ({ progressInPercents }: { progressInPercents: number }) => {
    return (
        <div className={topBarClassName}>
            <div className={topBarActiveClassName} style={{ width: `${progressInPercents}%` }} />
        </div>
    );
};
