import * as React from 'react';
import { css, cx } from 'linaria';
import { Container } from './Container';
import { XView } from 'react-mental';
import { LandingLinks } from './_links';
import { MobileMenu } from './MobileMenu';
import { HeaderApps } from './HeaderApps';

const box = css`
    padding: 0 0 4px;
`;

const grey = css`
    background-color: #F7F8F9;
`;

const header = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    margin-bottom: 16px;

    z-index: 10;
`;

const logo = css`
    cursor: pointer;
    margin: 0 0 -4px;

    @media (max-width: 767px) {
        width: 157px; height: 54px;
    }
`;

const menu = css`
    z-index: 10;
    position: relative;
    top: 5px;
    margin: -16px 0 -16px -24px;

    @media (max-width: 767px) {
        display: none;
    }
`;

const menuItem = css`
    display: inline-block;
    font-size: 18px;
    line-height: 24px;
    padding: 16px 24px 16px 24px;
    z-index: 10;
    cursor: pointer;
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
`;

const menuItemActive = css`
    padding: 12px 24px;
    margin: 0 0 0 24px;
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

const XViewWrapper = css`
    &,
    & * {
        display: inline-block;
    }
`;

interface HeaderProps {
    transparent?: boolean;
}

export const Header = React.memo((props: HeaderProps) => {
    return (
        <div className={cx(box, !props.transparent && grey)}>
            <Container inHeader={true}>
                <div className={header}>
                    <XView path={LandingLinks.home}>
                        <img
                            className={logo}
                            src="/static/landing/logo-header-2.svg"
                            width="180"
                            height="60"
                        />
                    </XView>

                    <MobileMenu />

                    <div className={menu}>
                        <span className={menuItem}>
                            <XView path={LandingLinks.signin}>
                                Join on web
                            </XView>
                        </span>

                        <HeaderApps className={menuItem} />

                        <span className={XViewWrapper}>
                            <XView path={LandingLinks.signin}>
                                <span className={cx(menuItem, menuItemActive)}>Sign in</span>
                            </XView>
                        </span>
                    </div>
                </div>
            </Container>
        </div>
    );
});