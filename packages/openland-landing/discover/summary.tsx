import * as React from 'react';
import { css } from 'linaria';
import Block from '../next/block';
import Heading from '../next/heading';
import { XView } from 'react-mental';

const root = css`
    background-color: #f7fafc;
    margin-top: 120px;
    padding-top: 48px;
    padding-bottom: 75px;

    @media (max-width: 960px) {
        padding-bottom: 56px;
    }

    @media (max-width: 768px) {
        padding-top: 22px;
        padding-bottom: 29px;
        margin-top: 61px;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        margin-top: 100px;
        padding-top: 35px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        margin-top: 84px;
        padding-top: 76px;
        padding-bottom: 98px;
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
    margin-top: 18px;
    list-style-position: inside;
    list-style-type: none;

    @media (min-width: 1600px) {
        font-size: 24px;
        line-height: 2;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        font-size: 20px;
        line-height: 2.3;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        line-height: 2;
        margin-top: 38px;
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
        width: 555px;
        left: 150px;
        top: 10px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        width: 502px;
        left: 74px;
        top: 18px;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        margin-top: -10px;
        margin-bottom: -20px;
    }

    // @media (max-width: 960px) {
    //     position: absolute;
    //     width: 425px;
    //     right: -10px;
    //     top: 10px;
    // }

    @media (max-width: 960px) and (min-width: 768px) {
        width: 466px;
        top: 18px;
        right: -20px;
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
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        margin-top: 23px;
        margin-bottom: 0;
    }
`;

const cta = css`
    display: inline-flex;
    width: initial;
    align-items: center;
    padding: 15px 28px;
    background-color: #e9f3fe;
    border-radius: 12px;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    cursor: pointer;
    color: #248bf2;
    transition: box-shadow 0.2s, background-color 0.2s;

    &:hover,
    &:focus {
        text-decoration: none;
        background-color: #3596f7;
        box-shadow: 0px 6px 27px rgba(36, 139, 242, 0.32);
        color: white;
    }

    &:active {
        background-color: #1c84ec;
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
                    <XView path="/start">
                        <span>
                            <span className={cta}>
                                Become an organizer
                                <img
                                    className={arrow}
                                    src="/static/landing/icons/arrow-blue.svg"
                                    width="16"
                                    height="16"
                                    alt=""
                                />
                            </span>
                        </span>
                    </XView>
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
