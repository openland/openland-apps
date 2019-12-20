import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { css } from 'linaria';

import Header from './next/header';
import Cta from './next/cta';
import Summary from './next/summary';
import Features from './next/features';
import Screenshots from './next/screenshots';
import Testimonials from './next/testimonials';
import Steps from './next/steps';
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

export const NextPage = React.memo(() => (
    <div className={root}>
        <XDocumentHead
            title="Modern community platform"
            titleWithoutReverse={true}
            description="An all-in-one platform for building great communities: start in seconds and grow fast"
            imgUrl="https://cdn.openland.com/shared/og/og-build.png"
        />
        <Header discoverLink={true} />
        <Cta />
        <Summary />
        <Features />
        <Screenshots />
        <Testimonials />
        <Steps />
        <Cta small={true} />
        <Footer />
    </div>
));
