import * as React from 'react';
import { css, cx } from 'linaria';
import Block from './block';
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

const logo = css``;

const menu = css`
    position: relative;
    margin: -23px;

    @media (max-width: 767px) {
        display: none;
    }
    z-index: 10;
`;

const menuItem = css`
    display: inline-block;
    font-size: 18px;
    margin: 23px;

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
    padding: 9px 24px;
    color: #50a2f5;
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
    font-weight: 600;

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

    @media (max-width: 767px) {
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
    }
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

export default ({ isGrey, startLink }: { isGrey?: boolean; startLink?: boolean }) => {
    const [isOpen, setOpen] = React.useState<boolean>(false);
    const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);

    return (
        <div className={isGrey ? grey : root}>
            <Block>
                <div className={header}>
                    <img className={logo} src="/static/landing/logo.svg" width="155" height="48" />

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
                                        <a href="#" className={mobileMenuLink}>
                                            Discover
                                        </a>
                                    </li>
                                    <li className={mobileMenuItem}>
                                        <a href="/next/start" className={mobileMenuLink}>
                                            Start community
                                        </a>
                                    </li>
                                    <li className={mobileMenuItem}>
                                        <a href="/next/about" className={mobileMenuLink}>
                                            About
                                        </a>
                                    </li>
                                    <li className={mobileMenuItem}>
                                        <a href="/invite/EGVDClq" className={mobileMenuLink}>
                                            Careers
                                        </a>
                                    </li>
                                    <li className={mobileMenuItem}>
                                        <a href="/invite/Ryq9hof" className={mobileMenuLink}>
                                            Chat with us
                                        </a>
                                    </li>
                                </ul>

                                <ul className={mobileMenuList}>
                                    <li className={mobileMenuItem}>
                                        <a
                                            href="https://next.openland.com/invite/h2BGtL"
                                            className={cx(mobileMenuLink, blue)}
                                        >
                                            Sign up
                                        </a>
                                    </li>
                                    <li className={mobileMenuItem}>
                                        <a href="/signin" className={mobileMenuLink}>
                                            Login
                                        </a>
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
                        <a className={menuItem} href="#">
                            Discover
                        </a>
                        {startLink && (
                            <a className={menuItem} href="/next/start">
                                Start community
                            </a>
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
                            <XView path="/next/about">About</XView>
                        </span>
                        <span className={cx(menuItem, menuItemActive)}>
                            <XView path="/signin">Login</XView>
                        </span>
                    </div>
                </div>
            </Block>
        </div>
    );
};
