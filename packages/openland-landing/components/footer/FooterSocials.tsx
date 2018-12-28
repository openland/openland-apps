import * as React from 'react';
import { css } from 'linaria';
import LinkedinIcon from 'openland-icons/landing/linkedin.svg';
import FacebookIcon from 'openland-icons/landing/facebook.svg';
import TwitterIcon from 'openland-icons/landing/twitter.svg';
import AngelIcon from 'openland-icons/landing/angel.svg';
import { LandingSocials } from '../_links';

let footerSocialsClass = css`
    margin: 0 0 0 -9px;
    display: flex;

    @media (max-width: 767px) {
        margin: 0;
        align-item: center;
        justify-content: center;
    }
`;

let footerSocialsItemClass = css`
    display: flex;
    width: 42px;
    height: 36px;
    align-items: center;
    justify-content: center;

    svg * {
        fill: #a6acbf;
    }

    &:hover svg * {
        fill: #1790ff;
    }
`;

interface FooterSocialsItemProps {
    path: string;
    icon: any;
}

const FooterSocialsItem = (props: FooterSocialsItemProps) => (
    <a href={props.path} target="_blank" className={footerSocialsItemClass}>
        {props.icon}
    </a>
);

export const FooterSocials = () => (
    <div className={footerSocialsClass}>
        <FooterSocialsItem path={LandingSocials.linkedin} icon={<LinkedinIcon />} />
        <FooterSocialsItem path={LandingSocials.facebook} icon={<FacebookIcon />} />
        <FooterSocialsItem path={LandingSocials.twitter} icon={<TwitterIcon />} />
        <FooterSocialsItem path={LandingSocials.angellist} icon={<AngelIcon />} />
    </div>
);
