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
`;

const logo = css``;

const menu = css`
    margin: -23px;
`;

const menuItem = css`
    display: inline-block;
    font-weight: bold;
    font-size: 18px;
    margin: 23px;
    opacity: 0.8;

    &:hover,
    &:focus {
        text-decoration: none;
        opacity: 1;
    }
`;

const menuItemActive = css`
    padding: 9px 24px;
    color: var(--accentPrimary);
    background-color: rgba(36, 139, 242, 0.1);
    border-radius: 12px;
    opacity: 1;

    &:hover,
    &:focus {
        color: var(--accentPrimary);
    }
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
                    <a className={menuItem} href="#">
                        Apps
                    </a>
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