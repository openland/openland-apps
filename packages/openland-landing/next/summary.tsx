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

    @media (min-width: 768px) and (max-width: 960px) {
        margin-top: 21px;
    }
`;

const listWrapper = css`
    @media (min-width: 1600px) {
        margin-top: 60px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        position: relative;
        top: 24px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        margin-top: 15px;
    }
`;

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
        margin-top: 20px;
    }

    @media (max-width: 768px) {
        font-size: 16px;
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
        width: 493px;
        left: 77px;
        top: 35px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        width: 401px;
        top: 28px;
        left: 28px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        width: 616px;
    }

    @media (max-width: 768px) {
        max-width: 100%;
        height: auto;
        min-width: 280px;
    }

    z-index: -1;
`;

const headingWrapper = css`
    @media (min-width: 1600px) {
        margin-bottom: -20px;
    }

    @media (max-width: 768px) {
        margin-top: 20px;
        margin-bottom: -15px;
    }

    @media (min-width: 920px) {
        white-space: nowrap;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={summary}>
                <div className={listWrapper}>
                    <div className={headingWrapper}>
                        <Heading>Built for mission-driven organizers</Heading>
                    </div>
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
