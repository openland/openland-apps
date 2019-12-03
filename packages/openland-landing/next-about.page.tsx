import * as React from 'react';
import { css } from 'linaria';

import Header from './next/header';
import AboutHeader from './next/aboutHeader';
import Founders from './next/founders';
import AboutFeatures from './next/aboutFeatures';
import Email from './next/email';
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

export const AboutPage = React.memo(() => (
    <div className={root}>
        <Header isGrey={true} />
        <AboutHeader />
        <Founders />
        <AboutFeatures />
        <Email />
        <Footer />
    </div>
));