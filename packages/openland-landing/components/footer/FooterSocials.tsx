import * as React from 'react';
import { css } from 'linaria';

let footerSocialsClass = css`
    margin: 0 0 0 -9px;

    @media (max-width: 767px) {
        margin: 0;
    }
`;

export const FooterSocials = () => <div className={footerSocialsClass}>socials</div>;
