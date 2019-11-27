import * as React from 'react';
import { css } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css``;

const header = css`
    display: flex;
    align-items: center;
`;

const content = css`
    margin-left: 32px;
`;

const listWrapper = css`
    margin-top: 11px;
`;

const list = css`
    font-size: 26px;
    list-style-type: none;
    display: inline;
`;

const item = css`
    display: inline;

    & + &:before {
        display: inline-block;
        content: '·';
        color: #9393a7;
        margin: 0 5px;
    }
`;

const link = css`
    font-size: 26px;
    color: inherit;
    font-weight: bold;

    &:hover,
    &:focus {
        text-decoration: none;
        color: inherit;
    }
`;

const screenshot = css`
    margin-top: 54px;
    filter: drop-shadow(0px 13px 55px rgba(20, 64, 86, 0.05));
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={header}>
                <img src="/static/landing/logo-screenshots.svg" width="100" height="100" />
                <div className={content}>
                    <Heading>All-in-one platform you'll love</Heading>
                    <div className={listWrapper}>
                        <li className={list}>
                            <ul className={item}>Member profiles</ul>
                            <ul className={item}>Live sessions</ul>
                            <ul className={item}>Chats</ul>
                            <ul className={item}>Ultra-fast apps.</ul>
                        </li>{' '}
                        <a href="#" className={link}>
                            All features
                        </a>
                    </div>
                </div>
            </div>
            <img
                src="/static/landing/screenshots-desktop.png"
                className={screenshot}
                width="1140"
                height="667"
            />
        </Block>
    </div>
);
