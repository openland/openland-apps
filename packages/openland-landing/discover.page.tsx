import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { css } from 'linaria';

import Header from './next/header';
import Cta from './discover/cta';
import Communities from './discover/communities';
import Screenshots from './discover/screenshots';
import Summary from './discover/summary';
import BottomCta from './discover/bottomCta';
import Apps from './discover/apps';
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
        <XDocumentHead
            title="Inspiring communities"
            titleWithoutReverse={true}
            description="Discover and join communities for your industry, role, skills, interests, and location"
            imgUrl="https://cdn.openland.com/shared/og/og-find.png"
        />
        <Header startLink={true} />
        <Cta />
        <Communities />
        <Screenshots />
        <Summary />
        <BottomCta />
        <Apps />
        <Footer />
    </div>
));
