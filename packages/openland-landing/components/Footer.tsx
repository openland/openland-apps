import * as React from 'react';
import { Container } from './Container';
import { FooterStyles } from './footer/styles';
import { FooterSocials } from './footer/FooterSocials';
import { FooterLogo } from './footer/FooterLogo';
import { FooterTitle } from './footer/FooterTitle';
import { FooterLinks, FooterLinksItem } from './footer/FooterLinks';
import { FooterApp } from './footer/FooterApp';
import PhoneIcon from 'openland-icons/landing/phone.svg';
import MailIcon from 'openland-icons/landing/mail.svg';
import { LandingLinks } from './_links';

export const Footer = () => (
    <footer className={FooterStyles.root}>
        <Container>
            <div className={FooterStyles.forMobile}>
                <FooterLogo />
            </div>
            <div className={FooterStyles.columns}>
                <div className={FooterStyles.column}>
                    <FooterLogo />
                    <FooterSocials />
                </div>
                <div className={FooterStyles.column}>
                    <FooterTitle content="Company" />
                    <FooterLinks>
                        <FooterLinksItem path={LandingLinks.about} content="About" />
                        <FooterLinksItem
                            path={LandingLinks.careers}
                            target="_blank"
                            content="Careers"
                        />
                    </FooterLinks>
                </div>
                <div className={FooterStyles.column}>
                    <FooterTitle content="Legal" />
                    <FooterLinks>
                        <FooterLinksItem path={LandingLinks.privacy} content="Privacy Policy" />
                        <FooterLinksItem path={LandingLinks.terms} content="Terms of Service" />
                    </FooterLinks>
                </div>
                <div className={FooterStyles.column}>
                    <FooterTitle content="Contacts" />
                    <FooterLinks>
                        <FooterLinksItem
                            path="tel:+14156367663"
                            content="415-636-7663"
                            icon={<PhoneIcon className="phone-icon" />}
                        />
                        <FooterLinksItem
                            path="mailto:hello@openland.com"
                            content="hello@openland.com"
                            icon={<MailIcon className="mail-icon" />}
                        />
                    </FooterLinks>
                </div>
                <div className={FooterStyles.column}>
                    <FooterTitle content="Mobile apps" />
                    <div className={FooterStyles.apps}>
                        <FooterApp system="ios" />
                        <FooterApp system="android" />
                    </div>
                </div>
            </div>
            <div className={FooterStyles.forMobile}>
                <FooterSocials />
            </div>
        </Container>
        <div className={FooterStyles.info}>
            &copy; 2018 Data Makes Perfect Inc.<span>Built in San Francisco</span>
        </div>
    </footer>
);
