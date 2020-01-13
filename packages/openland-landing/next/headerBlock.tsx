import * as React from 'react';
import { css } from 'linaria';

const root = css`
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;

    @media (min-width: 1600px) {
        width: 1180px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        width: 960px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        width: 768px;
    }

    @media (max-width: 768px) {
        min-width: 320px;
    }
`;

export default React.memo(({ children }) => <div className={root}>{children}</div>);
