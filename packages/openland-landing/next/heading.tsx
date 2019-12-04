import * as React from 'react';
import { css } from 'linaria';

const root = css`
    color: #272750;
    line-height: 1.3;

    @media (min-width: 1600px) {
        font-size: 36px;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        font-size: 32px;
    }

    @media (max-width: 768px) {
        font-size: 22px;
    }
`;

export default React.memo(({ children }) => <h2 className={root}>{children}</h2>);
