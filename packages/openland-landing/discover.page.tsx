import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { css } from 'linaria';

import Header from './next/header';
import Screenshots from './discover/screenshots';
import Summary from './discover/summary';
import Footer from './next/footer';

const root = css`
    width: 100%;
    line-height: 1.2;
    color: #272750;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

export const DiscoverPage = React.memo(() => (
    <div className={root}>
        <XDocumentHead title="Discover" titleWithoutReverse={true} />
        <Header startLink={true} />
        <Screenshots />
        <Summary />
        <Footer />
    </div>
));
