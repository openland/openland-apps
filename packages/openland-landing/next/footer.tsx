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
        margin: -5px;
    }
`;

const menuItem = css`
    display: inline-block;
    margin: 18px;

    @media (max-width: 768px) {
        margin: 5px;
        width: 40%;
    }
`;

const menuLink = css`
    &,
    &:hover,
    &:focus {
        font-size: 18px;
        color: #9393a7;
        text-decoration: none;
    }
`;

const social = css`
    list-stype-type: none;
    display: inline-block;
    margin: -12px;

    @media (max-width: 768px) {
        margin-top: 28px;
        &:before {
            margin-left: 13px;
            color: #9393a7;
            display: block;
            font-size: 14px;
            line-height: 17px;
            content: 'Follow us';
        }
    }
`;

const socialItem = css`
    display: inline-block;
    margin: 12px;

    @media (max-width: 768px) {
        width: 36px;
        height: 36px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        background-color: #eaecf0;
    }
`;

const socialLink = css``;

const socialLogo = css`
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

    @media (max-width: 768px) {
        display: block;
        margin: -7px;

        &:before {
            margin-left: 7px;
            margin-top: 24px;
            color: #9393a7;
            display: block;
            font-size: 14px;
            line-height: 17px;
            content: 'Install the app';
        }
    }
`;

const appsLink = css`
    display: inline-block;
    margin: 7px;
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
                </ul>
                <ul className={social}>
                    <li className={socialItem}>
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
                    <li className={socialItem}>
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
                    <li className={socialItem}>
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
                    <li className={socialItem}>
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
        </Block>
    </div>
);
