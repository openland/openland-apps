import * as React from 'react';
import { css, cx } from 'linaria';
import { Container } from './Container';
import { XView } from 'react-mental';
import { LandingLinks } from './_links';
import { MobileMenu } from './MobileMenu';
import { HeaderApps } from './HeaderApps';

const box = css`
    padding: 0 0 8px;
`;

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
    margin: 0 0 -4px;
`;

const menu = css`
    z-index: 10;
    position: relative;
    margin: -21px;
    top: 5px;

    @media (max-width: 767px) {
        display: none;
    }
`;

const menuItem = css`
    display: inline-block;
    font-size: 16px;
    margin: 20px;
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
    padding: 10px 20px;
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
                            src="/static/landing/logo.svg"
                            width="155"
                            height="52"
                        />
                    </XView>

                    <MobileMenu />

                    <div className={menu}>
                        <span className={menuItem}>
                            <XView path={LandingLinks.discover}>Discover</XView>
                        </span>
                        <a href={LandingLinks.creators} target="_blank" className={menuItem}>
                            Creators
                        </a>

                        <HeaderApps className={menuItem} />

                        <span className={XViewWrapper}>
                            <XView path={LandingLinks.signin}>
                                <span className={cx(menuItem, menuItemActive)}>Login</span>
                            </XView>
                        </span>
                    </div>
                </div>
            </Container>
        </div>
    );
});