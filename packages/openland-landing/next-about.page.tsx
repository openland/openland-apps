import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
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
        <XDocumentHead
            title="About"
            titleWithoutReverse={true}
            description="Openland is a professional messenger designed to support all communication needs of a modern business. It can be used for fundraising, sales, recruiting, customer service, and business operations. The company is backed by 30 prominent venture investors, including Y Combinator, Gagarin Capital, Sinai Ventures, Soma Capital, Liquid 2 Ventures, and Rainfall Ventures."
        />
        <Header isGrey={true} startLink={true} />
        <AboutHeader />
        <Founders />
        <AboutFeatures />
        <Email />
        <Footer />
    </div>
));
