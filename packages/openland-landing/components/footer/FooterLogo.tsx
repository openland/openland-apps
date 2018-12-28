import * as React from 'react';
import { css } from 'linaria';
import { XImage } from 'react-mental';
import { LandingLinks } from '../_links';

let footerLogoClass = css`
    margin: -18px 0 8px;
    display: block;

    @media (max-width: 767px) {
        margin: 0 auto;
        width: 145px;
    }
`;

export const FooterLogo = () => (
    <a href={LandingLinks.home} className={footerLogoClass}>
        <XImage src="/static/landing/logotype.svg" width={145} height={42} />
    </a>
);
