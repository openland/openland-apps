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
`;

const menuItem = css`
    display: inline-block;
    font-weight: bold;
    font-size: 18px;
    margin: 23px;
    opacity: 0.8;

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
