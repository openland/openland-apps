import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { Container } from './Container';
import { LandingLinks, LandingSocials } from './_links';

const root = css`
    padding-bottom: 4px;
    background: #f7fafc;

    @media (max-width: 767px) {
        padding-bottom: 30px;
        padding-top: 30px;
    }
`;

const footer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 767px) {
        flex-direction: column;
        align-items: flex-start;
        width: 360px;
        margin: 0 auto;
    }
`;

const logo = css`
    cursor: pointer;

    @media (max-width: 767px) {
        position: relative;
        left: -5px;
    }
`;

const menu = css`
    list-style-type: none;
    position: relative;
    margin: 10px -20px;

    @media (max-width: 959px) {
        margin: 10px -10px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        margin: 10px -15px;
    }

    display: flex;
    flex-wrap: wrap;

    @media (min-width: 1600px) {
        left: 25px;
    }

    @media (max-width: 767px) {
        left: 3px;
    }

    top: 3px;

    z-index: 10;
`;

const menuItem = css`
    display: inline-block;
    margin: 20px;
    z-index: 20;

    @media (max-width: 959px) {
        margin: 8px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        margin: 15px;
    }
`;

const menuLink = css`
    font-size: 16px;
    font-weight: 600;
    color: #9393a7;
    position: relative;

    will-change: color;
    transition: color 0.2s;

    @media (max-width: 959px) {
        font-size: 16px;
    }

    &:hover,
    &:focus {
        text-decoration: none;
        color: #272750;
        transition: color 0.01s;
    }

    &:active {
        color: #248bf2;
        transition: color 0.01s;
    }

    @media (max-width: 767px) {
        display: block;
    }

    cursor: pointer;
    z-index: 30;
`;

const social = css`
    list-style-type: none;
    display: inline-block;
    position: relative;
    margin-top: 5px;

    @media (min-width: 1600px) {
        left: 12px;
    }

    @media (max-width: 767px) {
        margin-left: -5px;
    }
`;

const socialItem = css`
    display: inline-block;
    margin: 5px;
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background-color: transparent;

    will-change: background-color;
    transition: background-color 0.2s;

    cursor: pointer;

    @media (max-width: 767px) {
        background-color: #eaecf0;
    }

    &:hover,
    &:focus,
    &:active {
        background-color: #eaecf0;
        transition: background-color 0.01s;
    }

    @media (max-width: 767px) {
        margin: 10px;
    }
`;

const socialLink = css``;

const socialLogo = css`
    display: inline-block;
    position: relative;
    top: 1.5px;
`;

const apps = css`
    display: none;
    position: relative;
    margin-top: 10px;

    @media (max-width: 767px) {
        display: block;
    }
`;

const appsLink = css`
    display: inline-block;
    margin: 7px;
`;

const links = css`
    display: flex;
    flex-direction: column;
    margin: -5px;
`;

const menuItemWrapper = css`
    display: inline-block;
    z-index: -1;

    .landingHeaderPopup:before {
        width: 50%;
    }
`;

const popup = css`
    display: flex;

    position: absolute;
    flex-direction: column;
    width: 160px;

    bottom: 50px;

    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    padding: 8px 0;
    z-index: 5;
    background: white;

    &:before {
        position: absolute;
        bottom: -50px;
        display: block;
        content: '';
        width: 100%;
        height: 50px;

        z-index: -3;
    }
`;

const popupItem = css`
    line-height: 40px;
    padding: 0 20px;

    display: flex;
    align-items: center;

    color: #272750;
    font-weight: normal;

    &,
    &:hover,
    &:focus,
    &:active {
        text-decoration: none;
        color: #272750;
    }

    &:hover {
        background-color: #f7fafc;
    }

    cursor: pointer;
`;

const popupText = css`
    font-size: 16px;
`;

export const Footer = React.memo(() => {
    const [legalIsOpen, legalSetOpen] = React.useState<boolean>(false);

    return (
        <div className={root}>
            <Container>
                <div className={footer}>
                    <XView path={LandingLinks.home}>
                        <img
                            className={logo}
                            src="/static/landing/logo-footer.svg"
                            width="120"
                            height="37"
                        />
                    </XView>
                    <ul className={menu}>
                        <li className={menuItem}>
                            <span className={menuLink}>
                                <XView path={LandingLinks.about}>About</XView>
                            </span>
                        </li>
                        <li className={menuItem}>
                            <span className={menuLink}>
                                Communities
                            </span>
                        </li>
                        <li className={menuItem}>
                            <span className={menuLink}>
                                <XView path={LandingLinks.support}>Help</XView>
                            </span>
                        </li>
                        <li className={menuItem}>
                            <span className={menuLink}>
                                <XView path={LandingLinks.careers}>Careers</XView>
                            </span>
                        </li>
                        <div className={menuItemWrapper}>
                            <li className={menuItem} onMouseLeave={() => legalSetOpen(false)}>
                                <span
                                    className={menuLink}
                                    onClick={() => legalSetOpen(true)}
                                    onMouseOver={() => legalSetOpen(true)}
                                >
                                    Legal
                                </span>

                                {legalIsOpen && (
                                    <div
                                        className={cx(popup, 'landingHeaderPopup')}
                                        onMouseLeave={() => legalSetOpen(false)}
                                    >
                                        <span className={popupItem}>
                                            <XView path={LandingLinks.privacy}>
                                                <span className={popupText}>Privacy Policy</span>
                                            </XView>
                                        </span>
                                        <span className={popupItem}>
                                            <XView path={LandingLinks.terms}>
                                                <span className={popupText}>Terms of Service</span>
                                            </XView>
                                        </span>
                                    </div>
                                )}
                            </li>
                        </div>
                    </ul>
                    <div className={links}>
                        <ul className={social}>
                            <li className={socialItem}>
                                <a className={socialLink} href={LandingSocials.instagram}>
                                    <img
                                        className={socialLogo}
                                        src="/static/landing/icons/1.svg"
                                        width="24"
                                        height="24"
                                    />
                                </a>
                            </li>
                            <li className={socialItem}>
                                <a className={socialLink} href={LandingSocials.twitter}>
                                    <img
                                        className={socialLogo}
                                        src="/static/landing/icons/2.svg"
                                        width="24"
                                        height="24"
                                    />
                                </a>
                            </li>
                        </ul>
                        <div className={apps}>
                            <a href={LandingLinks.apps.ios} className={appsLink}>
                                <img src="/static/landing/apps-ios.svg" width="120" height="40" />
                            </a>
                            <a href={LandingLinks.apps.android} className={appsLink}>
                                <img src="/static/landing/apps-android.svg" width="130" height="40" />
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
});