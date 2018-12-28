import * as React from 'react';
import { css } from 'linaria';
import LinkedinIcon from 'openland-icons/landing/linkedin.svg';
import FacebookIcon from 'openland-icons/landing/facebook.svg';
import TwitterIcon from 'openland-icons/landing/twitter.svg';
import AngelIcon from 'openland-icons/landing/angel.svg';

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
        <FooterSocialsItem
            path="https://linkedin.com/company/openlandhq/"
            icon={<LinkedinIcon />}
        />
        <FooterSocialsItem path="https://facebook.com/openlandhq/" icon={<FacebookIcon />} />
        <FooterSocialsItem path="https://twitter.com/OpenlandHQ" icon={<TwitterIcon />} />
        <FooterSocialsItem path="https://angel.co/openland" icon={<AngelIcon />} />
    </div>
);
