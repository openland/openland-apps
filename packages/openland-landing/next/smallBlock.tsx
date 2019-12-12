import * as React from 'react';
import { css } from 'linaria';

const root = css`
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 20px;

    @media (min-width: 1600px) {
        width: 960px;
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
