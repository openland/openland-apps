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
`;

const logo = css``;

const menu = css`
    list-stype-type: none;
    display: inline-block;
    margin: -18px;
`;

const menuItem = css`
    display: inline-block;
    margin: 18px;
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
`;

const socialItem = css`
    display: inline-block;
    margin: 12px;
`;

const socialLink = css``;

const socialLogo = css``;

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
                    <li className={menuItem}>
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
                    <li className={menuItem}>
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
            </div>
        </Block>
    </div>
);
