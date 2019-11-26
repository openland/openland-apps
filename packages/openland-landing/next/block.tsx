import * as React from 'react';
import { css } from 'linaria';

const root = css`
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 20px;
`;

export default React.memo(({ children }) => <div className={root}>{children}</div>);
