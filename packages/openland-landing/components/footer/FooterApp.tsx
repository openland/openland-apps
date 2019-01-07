import * as React from 'react';
import { css } from 'linaria';
import { LandingLinks } from '../_links';

const AppPaths = {
    ios: LandingLinks.apple,
    android: LandingLinks.google,
};

let footerAppClass = css`
    margin: 0 15px 0 0;
    background: no-repeat;
    background-size: 100% 100%;

    &:last-child {
        margin: 0;
    }

    &:hover {
        opacity: 0.7;
    }

    @media (max-width: 999px) {
        margin: 0 0 10px;
    }
`;

let footerAppIosClass = css`
    display: block;
    width: 119px;
    height: 40px;
`;

let footerAppAndroidClass = css`
    display: block;
    width: 135px;
    height: 40px;

    @media (max-width: 999px) {
        width: 120px;
        height: 35px;
    }
`;

interface FooterAppProps {
    system: 'ios' | 'android';
}

export const FooterApp = (props: FooterAppProps) => (
    <a href={AppPaths[props.system]} target="_blank" className={footerAppClass}>
        {props.system === 'ios' && (
            <img src="/static/landing/appstore.png" alt="" className={footerAppIosClass} />
        )}
        {props.system === 'android' && (
            <img src="/static/landing/googleplay.png" alt="" className={footerAppAndroidClass} />
        )}
    </a>
);
