import * as React from 'react';
import { css } from 'linaria';

import Header from './next/header';
import Cta from './next/cta';
import Summary from './next/summary';
import Features from './next/features';
import Screenshots from './next/screenshots';
import Testimonials from './next/testimonials';

const root = css`
    @import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');
    width: 100%;
    line-height: 1.2;
    font-family: 'Lato', sans-serif;
    color: #272750;
`;

export const NextPage = React.memo(() => (
    <div className={root}>
        <Header />
        <Cta />
        <Summary />
        <Features />
        <Screenshots />
        <Testimonials />

        {/* steps */}
        {/* cta-small */}
        {/* footer */}
    </div>
));
