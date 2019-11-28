import * as React from 'react';
import { css, cx } from 'linaria';
import Block from './block';

const root = css`
    padding: 32px 0;
    background: #f7fafc;
`;

const footer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const logo = css`
    @media (max-width: 768px) {
        margin-bottom: 24px;
    }
`;

const menu = css`
    list-stype-type: none;
    display: inline-block;
    margin: -18px;
    @media (max-width: 768px) {
        margin-bottom: 10px;
    }
`;

const menuItem = css`
    display: inline-block;
    margin: 18px;

    @media (max-width: 768px) {
    }
`;

const menuLink = css`
    font-size: 18px;
    color: #9393a7;

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
`;

const social = css`
    list-style-type: none;
    display: inline-block;
    position: relative;

    @media (max-width: 768px) {
        margin-top: 22px;
        &:before {
            display: inline-block;
            content: 'Follow us';
            font-size: 14px;
            line-height: 17px;
            color: #9393a7;

            position: absolute;

            top: -17px;
            left: 10px;
        }
    }
`;

const socialItem = css`
    display: inline-block;
    margin: 10px;
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

const hide = css`
    @media (min-width: 768px) and (max-width: 960px) {
        display: none;
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

    @media (max-width: 768px) {
        display: inline-block;
        margin-top: 22px;

        &:before {
            display: inline-block;
            content: 'Install the app';
            font-size: 14px;
            line-height: 17px;
            color: #9393a7;

            position: absolute;

            top: -17px;
            left: 7px;
        }
    }
`;

const appsLink = css`
    display: inline-block;
    margin: 7px;
`;

const links = css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: -10px;
`;

const menuItemWrapper = css`
    display: inline-block;
    margin-top: -10px;
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={footer}>
                <img className={logo} src="/static/landing/logo.svg" width="120" height="37" />
                <ul className={menu}>
                    <li className={menuItem}>
                        <a className={menuLink} href="#">
                            About
                        </a>
                    </li>
                    <li className={cx(menuItem, hideMobile)}>
                        <a className={menuLink} href="#">
                            Apps
                        </a>
                    </li>
                    <li className={menuItem}>
                        <a className={menuLink} href="#">
                            Careers
                        </a>
                    </li>
                    <div className={menuItemWrapper}>
                        <li className={menuItem}>
                            <a className={menuLink} href="#">
                                Legal
                            </a>
                        </li>
                        <li className={cx(menuItem, hide)}>
                            <a className={menuLink} href="#">
                                Chat with us
                            </a>
                        </li>
                    </div>
                </ul>
                <div className={links}>
                    <ul className={social}>
                        <li className={socialItem} title="Instagram">
                            <a className={socialLink} href="#">
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
                            <a className={socialLink} href="#">
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
                            <a className={socialLink} href="#">
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
                            <a className={socialLink} href="#">
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

                    <div className={apps}>
                        <a href="#" className={appsLink}>
                            <img src="/static/landing/apps-ios.svg" width="120" height="40" />
                        </a>
                        <a href="#" className={appsLink}>
                            <img src="/static/landing/apps-android.svg" width="130" height="40" />
                        </a>
                    </div>
                </div>
            </div>
        </Block>
    </div>
);
