import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper } from './XPopper';
import { XButton } from './XButton';
import { TextGlobal } from 'openland-text/TextGlobal';
import WebsiteIcon from './icons/website-2.svg';
import LinkedinIcon from './icons/linkedin-2.svg';
import PhoneIcon from './icons/ic-phone.svg';
import TwitterIcon from './icons/twitter-2.svg';
import FacebookIcon from './icons/ic-fb.svg';

const SocialIconWrapper = Glamorous.div({
    margin: '0 -16px',
    width: 32,
    justifyContent: 'center',
    display: 'flex',

    '& svg': {
        margin: '0!important'
    }
});

const Icons = {
    website: <WebsiteIcon />,
    linkedin: <LinkedinIcon />,
    phone: <PhoneIcon />,
    facebook: <FacebookIcon />,
    twitter: <TwitterIcon />,
};

interface XSocialButtonProps {
    value: string;
    style: 'website' | 'linkedin' | 'phone' | 'facebook' | 'twitter';
    placeholder?: string;
}

export const XSocialButton = (props: XSocialButtonProps) => {
    let href = (props.style === 'phone') ? 'tel:' + props.value : props.value;
    let icon = Icons[props.style];
    let title = props.placeholder || TextGlobal.socials[props.style];

    return (
        <XPopper
            placement="bottom"
            showOnHoverContent={false}
            showOnHover={true}
            style="dark"
            content={title}
        >
            <XButton
                href={href}
                icon={(
                    <SocialIconWrapper>{icon}</SocialIconWrapper>
                )}
            />
        </XPopper>
    );
};