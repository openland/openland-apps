import * as React from 'react';
import { Container } from './Container';
import { FooterStyles } from './footer/styles';
import { FooterSocials } from './footer/FooterSocials';
import { FooterLogo } from './footer/FooterLogo';
import { FooterTitle } from './footer/FooterTitle';
import { FooterLinks, FooterLinksItem } from './footer/FooterLinks';

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
                        <FooterLinksItem path="/about" content="About" />
                        <FooterLinksItem
                            path="https://angel.co/openland/jobs"
                            target="_blank"
                            content="Careers"
                        />
                    </FooterLinks>
                </div>
                <div className={FooterStyles.column}>
                    <FooterTitle content="Legal" />
                    <FooterLinks>
                        <FooterLinksItem path="/privacy" content="Privacy Policy" />
                        <FooterLinksItem path="/terms" content="Terms of Service" />
                    </FooterLinks>
                </div>
                <div className={FooterStyles.column}>
                    <FooterTitle content="Contacts" />
                    <FooterLinks>
                        <FooterLinksItem path="tel:+14156367663" content="415-636-7663" />
                        <FooterLinksItem
                            path="mailto:hello@openland.com"
                            content="hello@openland.com"
                        />
                    </FooterLinks>
                </div>
                <div className={FooterStyles.column}>
                    <FooterTitle content="Mobile apps" />
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
