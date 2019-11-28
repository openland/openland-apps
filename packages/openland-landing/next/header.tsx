import * as React from 'react';
import { css, cx } from 'linaria';
import Block from './block';

const root = css``;

const header = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 22px;
    margin-bottom: 22px;

    z-index: 10;
`;

const logo = css`
    position: relative;

    @media (min-width: 1140px) {
        top: 14px;
        right: 14px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
    }

    @media (min-width: 768px) and (max-width: 960px) {
    }

    @media (max-width: 768px) {
    }
`;

const menu = css`
    position: relative;
    margin: -23px;

    @media (min-width: 1140px) {
        top: 20px;
        right: -20px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
    }

    @media (min-width: 768px) and (max-width: 960px) {
    }

    @media (max-width: 768px) {
    }
    z-index: 10;
`;

const menuItem = css`
    display: inline-block;
    font-weight: bold;
    font-size: 18px;
    margin: 23px;
    opacity: 0.8;

    position: relative;

    color: #525273;
    will-change: color;
    transition: color 0.2s;

    &:hover,
    &:focus {
        color: #272750;
        transition: color 0.01s;
        text-decoration: none;
        opacity: 1;
    }

    &:active {
        color: #248bf2;
        transition: color 0.01s;
        text-decoration: none;
        opacity: 1;
    }
    z-index: 10;

    &:hover .landingHeaderPopup {
        display: flex;
    }

    cursor: pointer;
`;

const menuItemActive = css`
    padding: 9px 24px;
    color: var(--accentPrimary);
    background-color: rgba(36, 139, 242, 0.1);
    border-radius: 12px;
    opacity: 1;

    will-change: color, background-color;
    transition: color 0.2s, background-color 0.2s;

    &:hover,
    &:focus {
        transition: color 0.01s, background-color 0.01s;
        color: white;
        background-color: #47a3ff;
    }

    &:active {
        transition: color 0.01s, background-color 0.01s;
        color: white;
        background-color: #1d84ec;
    }
`;

const trigger = css`
    &:hover ~ .landingHeaderPopup {
        display: flex;
    }
`;
const popup = css`
    display: none;

    position: absolute;
    flex-direction: column;
    width: 160px;

    top: 50px;

    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    padding: 8px 0;
    z-index: 5;
    background: white;

    &:before {
        position: absolute;
        top: -50px;
        display: block;
        content: '';
        width: 100%;
        height: 50px;
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

export default () => (
    <div className={root}>
        <Block>
            <div className={header}>
                <img className={logo} src="/static/landing/logo.svg" width="155" height="48" />

                <div className={menu}>
                    <a className={menuItem} href="#">
                        Discover
                    </a>
                    <span className={menuItem}>
                        <span className={trigger}>Apps</span>

                        <div className={cx(popup, 'landingHeaderPopup')}>
                            <a className={popupItem} href="#">
                                <img
                                    className={popupIcon}
                                    src="/static/landing/icons/ios.svg"
                                    width="24"
                                    height="24"
                                    alt="ios"
                                />
                                <span className={popupText}>iOS</span>
                            </a>
                            <a className={popupItem} href="#">
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
                            <a className={popupItem} href="#">
                                <img
                                    className={popupIcon}
                                    src="/static/landing/icons/mac.svg"
                                    width="24"
                                    height="24"
                                    alt="ios"
                                />
                                <span className={popupText}>Mac</span>
                            </a>
                            <a className={popupItem} href="#">
                                <img
                                    className={popupIcon}
                                    src="/static/landing/icons/win.svg"
                                    width="24"
                                    height="24"
                                    alt="ios"
                                />
                                <span className={popupText}>Windows</span>
                            </a>
                            <a className={popupItem} href="#">
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
                    </span>
                    <a className={menuItem} href="#">
                        About
                    </a>
                    <a className={cx(menuItem, menuItemActive)} href="#">
                        Login
                    </a>
                </div>
            </div>
        </Block>
    </div>
);
