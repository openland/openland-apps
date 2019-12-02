import * as React from 'react';
import { css, cx } from 'linaria';
import Block from './block';

const root = css`
    padding: 5px 0;
    @media (max-width: 768px) {
        padding-bottom: 40px;
        padding-top: 20px;
    }
    background: #f7fafc;
`;

const footer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const logo = css``;

const menu = css`
    list-style-type: none;
    position: relative;
    margin: 10px -20px;
    @media (max-width: 960px) {
        margin: 10px -10px;
    }

    display: flex;
    flex-wrap: wrap;

    @media (min-width: 1140px) {
        left: 25px;
    }
`;

const menuItem = css`
    display: inline-block;
    margin: 20px;
    @media (max-width: 960px) {
        margin: 10px;
    }
`;

const menuLink = css`
    font-size: 18px;

    @media (max-width: 960px) {
        font-size: 16px;
    }
    color: #9393a7;
    position: relative;

    will-change: color;
    transition: color 0.2s;

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

    @media (max-width: 768px) {
        display: block;
    }

    cursor: pointer;
`;

const social = css`
    list-style-type: none;
    display: inline-block;
    position: relative;

    @media (max-width: 768px) {
        margin-top: 35px;
        &:before {
            position: absolute;
            display: inline-block;
            content: 'Follow us';
            left: 5px;
            top: -20px;

            font-size: 14px;
            line-height: 17px;
            color: #9393a7;
        }
    }

    @media (min-width: 1140px) {
        left: 12px;
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

    @media (max-width: 768px) {
        background-color: #eaecf0;
    }

    &:hover,
    &:focus,
    &:active {
        background-color: #eaecf0;
        transition: background-color 0.01s;
    }
`;

const socialLink = css``;

const socialLogo = css`
    display: inline-block;
    @media (max-width: 768px) {
        position: relative;
        top: 1.5px;
    }
`;

const hideMobile = css`
    @media (max-width: 768px) {
        display: none;
    }
`;

const apps = css`
    display: none;
    position: relative;
    margin-right: 10px;
    margin-top: 25px;

    @media (max-width: 768px) {
        display: inline-block;
        margin-top: 40px;
    }

    &:before {
        position: absolute;
        display: inline-block;
        content: 'Install the app';
        left: 7px;
        top: -20px;

        font-size: 14px;
        line-height: 17px;
        color: #9393a7;
    }
`;

const appsLink = css`
    display: inline-block;
    margin: 7px;
`;

const links = css`
    display: flex;
    flex-wrap: wrap-reverse;
    align-items: center;
    margin: -5px;
`;

const menuItemWrapper = css`
    display: inline-block;
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
`;
const popupIcon = css`
    margin-right: 20px;
`;
const popupText = css``;
const popupSeparator = css`
    border-bottom: 1px solid #8e90a6;
    opacity: 0.2;
    margin-top: 16px;
    margin-bottom: 8px;
`;

const popupCloser = css`
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    top: 0;
    left: 0;
`;

export default () => {
    const [appsIsOpen, appsSetOpen] = React.useState<boolean>(false);
    const [legalIsOpen, legalSetOpen] = React.useState<boolean>(false);

    return (
        <div className={root}>
            <Block>
                <div className={footer}>
                    <img className={logo} src="/static/landing/logo.svg" width="120" height="37" />
                    <ul className={menu}>
                        <li className={menuItem}>
                            <a className={menuLink} href="/next/about">
                                About
                            </a>
                        </li>
                        <li className={cx(menuItem, hideMobile)}>
                            <span className={menuLink} onClick={() => appsSetOpen(!appsIsOpen)}>
                                Apps
                            </span>

                            {appsIsOpen && (
                                <div className={cx(popup, 'landingHeaderPopup')}>
                                    <div
                                        className={popupCloser}
                                        onClick={() => appsSetOpen(false)}
                                    />
                                    <a className={popupItem} href="https://oplnd.com/ios">
                                        <img
                                            className={popupIcon}
                                            src="/static/landing/icons/ios.svg"
                                            width="24"
                                            height="24"
                                            alt="ios"
                                        />
                                        <span className={popupText}>iOS</span>
                                    </a>
                                    <a className={popupItem} href="https://oplnd.com/android">
                                        <img
                                            className={popupIcon}
                                            src="/static/landing/icons/android.svg"
                                            width="24"
                                            height="24"
                                            alt="ios"
                                        />
                                        <span className={popupText}>Android</span>
                                    </a>
                                    <div className={popupSeparator} />
                                    <a className={popupItem} href="https://oplnd.com/mac">
                                        <img
                                            className={popupIcon}
                                            src="/static/landing/icons/mac.svg"
                                            width="24"
                                            height="24"
                                            alt="ios"
                                        />
                                        <span className={popupText}>Mac</span>
                                    </a>
                                    <a className={popupItem} href="https://oplnd.com/windows">
                                        <img
                                            className={popupIcon}
                                            src="/static/landing/icons/win.svg"
                                            width="24"
                                            height="24"
                                            alt="ios"
                                        />
                                        <span className={popupText}>Windows</span>
                                    </a>
                                    <a className={popupItem} href="https://oplnd.com/linux">
                                        <img
                                            className={popupIcon}
                                            src="/static/landing/icons/linux.svg"
                                            width="24"
                                            height="24"
                                            alt="ios"
                                        />
                                        <span className={popupText}>Linux</span>
                                    </a>
                                </div>
                            )}
                        </li>
                        <li className={menuItem}>
                            <a className={menuLink} href="/invite/EGVDClq">
                                Careers
                            </a>
                        </li>
                        <div className={menuItemWrapper}>
                            <li className={menuItem}>
                                <span
                                    className={menuLink}
                                    onClick={() => legalSetOpen(!appsIsOpen)}
                                >
                                    Legal
                                </span>

                                {legalIsOpen && (
                                    <div className={cx(popup, 'landingHeaderPopup')}>
                                        <div
                                            className={popupCloser}
                                            onClick={() => legalSetOpen(false)}
                                        />
                                        <a className={popupItem} href="/next/privacy">
                                            <span className={popupText}>Privacy Policy</span>
                                        </a>
                                        <a className={popupItem} href="/next/terms">
                                            <span className={popupText}>Terms of Service</span>
                                        </a>
                                    </div>
                                )}
                            </li>
                            <li className={menuItem}>
                                <a className={menuLink} href="/invite/Ryq9hof">
                                    Chat with us
                                </a>
                            </li>
                        </div>
                    </ul>
                    <div className={links}>
                        <div className={apps}>
                            <a href="https://oplnd.com/ios" className={appsLink}>
                                <img src="/static/landing/apps-ios.svg" width="120" height="40" />
                            </a>
                            <a href="https://oplnd.com/android" className={appsLink}>
                                <img
                                    src="/static/landing/apps-android.svg"
                                    width="130"
                                    height="40"
                                />
                            </a>
                        </div>
                        <ul className={social}>
                            <li className={socialItem} title="Instagram">
                                <a
                                    className={socialLink}
                                    href="https://www.instagram.com/openlandhq/"
                                >
                                    <img
                                        className={socialLogo}
                                        src="/static/landing/icons/instagram.svg"
                                        alt="Instagram"
                                        width="24"
                                        height="24"
                                    />
                                </a>
                            </li>
                            <li className={socialItem} title="Twitter">
                                <a className={socialLink} href="https://twitter.com/OpenlandHQ">
                                    <img
                                        className={socialLogo}
                                        src="/static/landing/icons/twitter.svg"
                                        alt="Twitter"
                                        width="24"
                                        height="24"
                                    />
                                </a>
                            </li>
                            <li className={socialItem} title="Facebook">
                                <a
                                    className={socialLink}
                                    href="https://www.facebook.com/openlandhq/"
                                >
                                    <img
                                        className={socialLogo}
                                        src="/static/landing/icons/facebook.svg"
                                        alt="Facebook"
                                        width="24"
                                        height="24"
                                    />
                                </a>
                            </li>
                            <li className={socialItem} title="Angelist">
                                <a className={socialLink} href="https://angel.co/company/openland">
                                    <img
                                        className={socialLogo}
                                        src="/static/landing/icons/angelist.svg"
                                        alt="Angelist"
                                        width="24"
                                        height="24"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Block>
        </div>
    );
};
