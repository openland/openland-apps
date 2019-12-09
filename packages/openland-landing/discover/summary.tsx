import * as React from 'react';
import { css } from 'linaria';
import Block from '../next/block';
import Heading from '../next/heading';

const root = css`
    background-color: #f7fafc;
    margin-top: 120px;
    padding: 36px 0;
    padding-top: 60px;

    @media (max-width: 960px) {
        padding-bottom: 56px;
    }

    @media (max-width: 768px) {
        background-color: initial;
        padding-top: 64px;
        padding-bottom: 0;
        margin-top: 0;
    }
`;

const summary = css`
    display: flex;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
        align-items: flex-start;

        max-width: 340px;
        width: 100%;
        margin: 0 auto;
    }
`;

const listWrapper = css``;

const list = css`
    margin-top: 33px;
    list-style-position: inside;
    list-style-type: none;

    @media (min-width: 1600px) {
        font-size: 24px;
        line-height: 2.2;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        font-size: 20px;
        line-height: 2.3;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        line-height: 2.4;
    }
`;

const item = css`
    display: flex;
    align-items: center;

    &:before {
        display: inline-block;
        content: '';
        background: url('https://cdn.openland.com/shared/landing/bullet.svg') no-repeat;
        background-size: contain;
        width: 16px;
        height: 16px;
        margin-right: 16px;

        @media (max-width: 768px) {
            width: 12px;
            height: 12px;
            margin-right: 12px;
        }
    }
`;

const summaryImage = css`
    max-width: 100%;
    height: auto;

    position: relative;

    @media (min-width: 1600px) {
        width: 640px;
        left: 130px;
        top: 20px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        width: 561px;
    }

    @media (max-width: 960px) {
        position: absolute;
        width: 425px;
        right: -10px;
        top: 10px;
    }

    @media (max-width: 768px) {
        display: none;
    }

    z-index: 0;
`;

const headingWrapper = css`
    @media (max-width: 768px) {
        margin-top: 20px;
        margin-bottom: -20px;
    }

    @media (min-width: 920px) {
        white-space: nowrap;
        margin-bottom: -20px;
    }
`;

const cta = css`
    display: inline-flex;
    align-items: center;
    padding: 15px 28px;
    background-color: #e9f3fe;
    border-radius: 12px;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;

    &:hover,
    &:focus {
        text-decoration: none;
    }

    margin-top: 36px;

    @media (min-width: 768px) and (max-width: 1600px) {
        padding: 11px 32px;
        font-size: 16px;
    }

    @media (max-width: 768px) {
        padding: 11px 32px;
        font-size: 16px;
    }
`;

const arrow = css`
    margin-left: 8px;
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={summary}>
                <div className={listWrapper}>
                    <div className={headingWrapper}>
                        <Heading>Build&nbsp;your&nbsp;own&nbsp;community</Heading>
                    </div>
                    <ul className={list}>
                        <li className={item}>Bring people together</li>
                        <li className={item}>Share and organize knowledge</li>
                        <li className={item}>Help people help each other</li>
                    </ul>
                    <a href="/start" className={cta}>
                        Become an organizer
                        <img
                            className={arrow}
                            src="/static/landing/icons/arrow-blue.svg"
                            width="16"
                            height="16"
                            alt=""
                        />
                    </a>
                </div>
                <img
                    className={summaryImage}
                    src="/static/landing/summary.png"
                    width="560"
                    height="380"
                />
            </div>
        </Block>
    </div>
);
