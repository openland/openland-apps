import * as React from 'react';
import { css, cx } from 'linaria';
import Block from './headerBlock';
import { XView } from 'react-mental';

const root = css``;

const grey = css`
    background-color: #f7fafc;
`;

const header = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    margin-bottom: 16px;

    z-index: 10;
`;

const logo = css`
    cursor: pointer;
`;

const menu = css`
    position: relative;
    margin: -21px;
    top: 5px;

    @media (max-width: 768px) {
        display: none;
    }
    z-index: 10;
`;

const menuItem = css`
    display: inline-block;
    font-size: 16px;
    margin: 21px;

    position: relative;

    color: #9393a7;
    font-weight: 600;
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

    cursor: pointer;
`;

const menuItemActive = css`
    padding: 10px 22px;
    color: #50a2f5;
    background-color: rgba(36, 139, 242, 0.1);
    border-radius: 8px;
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

const trigger = css``;
const popup = css`
    display: flex;

    position: absolute;
    flex-direction: column;
    width: 160px;

    top: 30px;

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

const mobileMenu = css`
    z-index: 20;
`;

const mobileMenuTrigger = css`
    cursor: pointer;
    display: none;

    @media (max-width: 768px) {
        display: initial;
    }
`;

const mobileMenuInner = css`
    position: fixed;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const mobileMenuHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    padding-top: 16px;
`;

const mobileMenuClose = css`
    cursor: pointer;
`;

const mobileMenuList = css`
    margin-top: 16px;
`;

const mobileMenuItem = css`
    padding: 0 20px;
    line-height: 2.4;
    font-size: 20px;
`;

const mobileMenuLink = css`
    color: #272750;
    &:hover,
    &:active {
        text-decoration: none;
        color: #248bf2;
    }

    cursor: pointer;
`;

const mobileMenuFooter = css`
    position: absolute;
    bottom: 0;
`;

const blue = css`
    &,
    &:hover,
    &:active {
        color: #248bf2;
    }
`;

const appsHeading = css`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #9393a7;
    margin-left: 20px;
`;

const apps = css`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 14px;
    margin: 12px 20px;
`;

const appsLink = css``;

const mobileMenuOpenIcon = css``;
const mobileMenuCloseIcon = css``;

const XViewWrapper = css`
    &,
    & * {
        display: inline-block;
    }
`;

interface Props {
    isGrey?: boolean;
    startLink?: boolean;
    discoverLink?: boolean;
}

export default ({ isGrey, startLink, discoverLink }: Props) => {
    const [isOpen, setOpen] = React.useState<boolean>(false);
    const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);

    return (
        <div className={isGrey ? grey : root}>
            <Block>
                <div className={header}>
                    <XView path="/">
                        <img
                            className={logo}
                            src="/static/landing/logo.svg"
                            width="155"
                            height="48"
                        />
                    </XView>

                    <div className={mobileMenu}>
                        <span className={mobileMenuTrigger} onClick={() => setMenuOpen(true)}>
                            <img
                                src="/static/landing/icons/open.svg"
                                className={mobileMenuOpenIcon}
                                width="24"
                                height="24"
                                alt="Open menu"
                            />
                        </span>
                        {isMenuOpen && (
                            <div className={mobileMenuInner}>
                                <div className={mobileMenuHeader}>
                                    <img
                                        className={logo}
                                        src="/static/landing/logo.svg"
                                        width="155"
                                        height="48"
                                    />
                                    <span
                                        className={mobileMenuClose}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <img
                                            src="/static/landing/icons/close.svg"
                                            className={mobileMenuCloseIcon}
                                            width="24"
                                            height="24"
                                            alt="Close menu"
                                        />
                                    </span>
                                </div>

                                <ul className={mobileMenuList}>
                                    <li className={mobileMenuItem}>
                                        <span className={mobileMenuLink}>
                                            <XView path="/">Discover</XView>
                                        </span>
                                    </li>
                                    <li className={mobileMenuItem}>
                                        <span className={mobileMenuLink}>
                                            <XView path="/start">Start community</XView>
                                        </span>
                                    </li>

                                    <li className={mobileMenuItem}>
                                        <span className={mobileMenuLink}>
                                            <XView path="/about">About</XView>
                                        </span>
                                    </li>
                                    <li className={mobileMenuItem}>
                                        <span className={mobileMenuLink}>
                                            <XView path="/invite/EGVDClq">Careers</XView>
                                        </span>
                                    </li>
                                    <li className={mobileMenuItem}>
                                        <span className={mobileMenuLink}>
                                            <XView path="/invite/Ryq9hof">Chat with us</XView>
                                        </span>
                                    </li>
                                </ul>

                                <ul className={mobileMenuList}>
                                    <li className={mobileMenuItem}>
                                        <span className={cx(mobileMenuLink, blue)}>
                                            <XView path="/invite/h2BGtL">Sign up</XView>
                                        </span>
                                    </li>
                                    <li className={mobileMenuItem}>
                                        <span className={mobileMenuLink}>
                                            <XView path="/signin">Login</XView>
                                        </span>
                                    </li>
                                </ul>

                                <div className={mobileMenuFooter}>
                                    <h2 className={appsHeading}>Install the app</h2>

                                    <div className={apps}>
                                        <a href="https://oplnd.com/ios" className={appsLink}>
                                            <img
                                                src="/static/landing/apps-ios.svg"
                                                width="120"
                                                height="40"
                                            />
                                        </a>
                                        <a href="https://oplnd.com/android" className={appsLink}>
                                            <img
                                                src="/static/landing/apps-android.svg"
                                                width="130"
                                                height="40"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={menu}>
                        {discoverLink && (
                            <span className={menuItem}>
                                <XView path="/">Discover</XView>
                            </span>
                        )}
                        {startLink && (
                            <span className={menuItem}>
                                <XView path="/start">Start community</XView>
                            </span>
                        )}
                        <span className={menuItem} onMouseLeave={() => setOpen(false)}>
                            <span
                                className={trigger}
                                onClick={() => setOpen(true)}
                                onMouseOver={() => setOpen(true)}
                            >
                                Apps
                            </span>

                            {isOpen && (
                                <div
                                    className={cx(popup, 'landingHeaderPopup')}
                                    onMouseLeave={() => setOpen(false)}
                                >
                                    <a
                                        className={popupItem}
                                        href="https://oplnd.com/ios"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className={popupIcon}
                                            src="/static/landing/icons/ios.svg"
                                            width="24"
                                            height="24"
                                            alt="ios"
                                        />
                                        <span className={popupText}>iOS</span>
                                    </a>
                                    <a
                                        className={popupItem}
                                        href="https://oplnd.com/android"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
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
                                    <a
                                        className={popupItem}
                                        href="https://oplnd.com/mac"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className={popupIcon}
                                            src="/static/landing/icons/mac.svg"
                                            width="24"
                                            height="24"
                                            alt="ios"
                                        />
                                        <span className={popupText}>Mac</span>
                                    </a>
                                    <a
                                        className={popupItem}
                                        href="https://oplnd.com/windows"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className={popupIcon}
                                            src="/static/landing/icons/win.svg"
                                            width="24"
                                            height="24"
                                            alt="ios"
                                        />
                                        <span className={popupText}>Windows</span>
                                    </a>
                                    <a
                                        className={popupItem}
                                        href="https://oplnd.com/linux"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
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
                        </span>
                        <span className={menuItem}>
                            <XView path="/about">About</XView>
                        </span>
                        <span className={XViewWrapper}>
                            <XView path="/signin">
                                <span className={cx(menuItem, menuItemActive)}>Login</span>
                            </XView>
                        </span>
                    </div>
                </div>
            </Block>
        </div>
    );
};
