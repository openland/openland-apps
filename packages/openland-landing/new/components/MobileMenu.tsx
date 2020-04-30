import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { LandingLinks } from './_links';

const logo = css`
    cursor: pointer;
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

export const MobileMenu = React.memo(() => {
    const [isShown, setShown] = React.useState<boolean>(false);

    return (
        <div className={mobileMenu}>
            <span className={mobileMenuTrigger} onClick={() => setShown(true)}>
                <img
                    src="/static/landing/icons/open.svg"
                    width="24"
                    height="24"
                    alt="Open menu"
                />
            </span>
            {isShown && (
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
                            onClick={() => setShown(false)}
                        >
                            <img
                                src="/static/landing/icons/close.svg"
                                width="24"
                                height="24"
                                alt="Close menu"
                            />
                        </span>
                    </div>

                    <ul className={mobileMenuList}>
                        <li className={mobileMenuItem}>
                            <span className={mobileMenuLink}>
                                <XView path={LandingLinks.discover}>Discover</XView>
                            </span>
                        </li>
                        <li className={mobileMenuItem}>
                            <span className={mobileMenuLink}>
                                <XView path={LandingLinks.creators}>Creators</XView>
                            </span>
                        </li>

                        <li className={mobileMenuItem}>
                            <span className={mobileMenuLink}>
                                <XView path={LandingLinks.about}>About</XView>
                            </span>
                        </li>
                        <li className={mobileMenuItem}>
                            <span className={mobileMenuLink}>
                                <XView path={LandingLinks.careers}>Careers</XView>
                            </span>
                        </li>
                        <li className={mobileMenuItem}>
                            <span className={mobileMenuLink}>
                                <XView path={LandingLinks.support}>Support</XView>
                            </span>
                        </li>
                    </ul>

                    <ul className={mobileMenuList}>
                        <li className={mobileMenuItem}>
                            <span className={cx(mobileMenuLink, blue)}>
                                <XView path={LandingLinks.signup}>Sign up</XView>
                            </span>
                        </li>
                        <li className={mobileMenuItem}>
                            <span className={mobileMenuLink}>
                                <XView path={LandingLinks.signin}>Login</XView>
                            </span>
                        </li>
                    </ul>

                    <div className={mobileMenuFooter}>
                        <h2 className={appsHeading}>Install the app</h2>

                        <div className={apps}>
                            <a href={LandingLinks.apps.ios}>
                                <img
                                    src="/static/landing/apps-ios.svg"
                                    width="120"
                                    height="40"
                                />
                            </a>
                            <a href={LandingLinks.apps.android}>
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
    );
});