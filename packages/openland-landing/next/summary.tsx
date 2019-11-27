import * as React from 'react';
import { css } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css``;

const summary = css`
    display: flex;
    align-items: center;

    @media (max-width: 960px) {
        flex-direction: column-reverse;
    }
`;

const listWrapper = css``;

const list = css`
    margin-top: 33px;
    list-style-position: inside;
    list-style-type: none;

    @media (min-width: 1140px) {
        font-size: 28px;
        line-height: 2.2;
    }

    @media (min-width: 768px) and (max-width: 1140px) {
        font-size: 22px;
        line-height: 2.3;
    }

    @media (max-width: 768px) {
        font-size: 16px;
        line-height: 2.5;
    }
`;

const item = css`
    display: flex;
    align-items: center;

    &:before {
        display: inline-block;
        content: '';
        background: url('/static/landing/icons/bullet.svg') no-repeat;
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
    height: auto;
    max-width: 100%;

    @media (min-width: 1140px) {
        width: 560px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
        width: 514px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        width: 728px;
    }

    @media (max-width: 768px) {
        min-width: 280px;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={summary}>
                <div className={listWrapper}>
                    <Heading>Built for mission-driven organizers</Heading>
                    <ul className={list}>
                        <li className={item}>Find people who share your values</li>
                        <li className={item}>Share and organize knowledge</li>
                        <li className={item}>Help people help each other</li>
                    </ul>
                </div>
                <img
                    className={summaryImage}
                    src="/static/landing/summary.jpg"
                    width="560"
                    height="380"
                />
            </div>
        </Block>
    </div>
);
