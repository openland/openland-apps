import * as React from 'react';
import { css, cx } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css`
    margin-top: 80px;
`;

const header = css`
    display: flex;
    align-items: center;
`;

const content = css``;

const listWrapper = css`
    margin-top: 11px;

    @media (min-width: 1140px) {
        font-size: 26px;
        line-height: 38px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
        font-size: 22px;
        line-height: 35px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        font-size: 22px;
        line-height: 35px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        line-height: 30px;
    }
`;

const list = css`
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
    font-size: inherit;
    color: inherit;
    font-weight: bold;

    &:hover,
    &:focus {
        text-decoration: none;
        color: inherit;
    }

    @media (max-width: 768px) {
        display: block;
    }
`;

const screenshot = css`
    width: 100%;
    max-width: 1140px;
    height: auto;
    margin-top: 54px;
    filter: drop-shadow(0px 13px 55px rgba(20, 64, 86, 0.05));
    @media (max-width: 768px) {
        display: none;
    }
`;

const hide = css`
    @media (min-width: 768px) and (max-width: 960px) {
        display: none;
    }
`;

const logo = css`
    margin-right: 32px;

    @media (max-width: 768px) {
        display: none;
    }
`;

const screenshotMobile = css`
    display: none;
    width: 100%;
    max-width: 560px;
    height: auto;
    margin-top: 54px;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 768px) {
        display: block;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={header}>
                <img
                    src="/static/landing/logo-screenshots.svg"
                    width="100"
                    height="100"
                    className={logo}
                />
                <div className={content}>
                    <Heading>All-in-one platform you'll love</Heading>
                    <div className={listWrapper}>
                        <li className={list}>
                            <ul className={item}>Member profiles</ul>
                            <ul className={item}>Live sessions</ul>
                            <ul className={item}>Chats</ul>
                            <ul className={cx(item, hide)}>Ultra-fast apps</ul>
                        </li>
                        {'. '}
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
            <img
                src="/static/landing/screenshots-mobile.png"
                className={screenshotMobile}
                width="560"
                height="1188"
            />
        </Block>
    </div>
);
