import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper } from './XPopper';
import { XButton } from './XButton';
import WebsiteIcon from './icons/website-2.svg';
import LinkedinIcon from './icons/linkedin-2.svg';
import PhoneIcon from './icons/ic-phone.svg';

const SocialIconWrapper = Glamorous.div({
    margin: '0 -16px',
    width: 32,
    justifyContent: 'center',
    display: 'flex',

    '& svg': {
        margin: '0!important'
    }
});

export const XSocialButton = (props: { value: string; style: 'website' | 'linkedin' | 'phone' }) => {
    let icon;
    let title;
    let href = (props.style === 'phone') ? 'tel:' + props.value : props.value;

    switch (props.style) {
        case 'website': icon = <WebsiteIcon />; break;
        case 'linkedin': icon = <LinkedinIcon />; break;
        case 'phone': icon = <PhoneIcon />; break;

        default: icon = <WebsiteIcon />;
    }

    switch (props.style) {
        case 'website': title = 'Website'; break;
        case 'linkedin': title = 'Linkedin'; break;
        case 'phone': title = 'Phone'; break;

        default: icon = 'Social';
    }

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