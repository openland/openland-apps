import * as React from 'react';
import { css } from 'linaria';
import Block from './block';

const root = css``;

const summary = css`
    display: flex;
    align-items: center;
`;

const listWrapper = css``;

const heading = css`
    font-size: 36px;
`;

const list = css`
    font-size: 28px;
    line-height: 2.2;
    margin-top: 33px;
    list-style-position: inside;
    list-style-type: none;
`;

const item = css`
    display: flex;
    align-items: center;

    &:before {
        display: inline-block;
        content: '';
        background: url('/static/landing/icons/bullet.svg') no-repeat;
        width: 16px;
        height: 16px;
        margin-right: 16px;
    }
`;

const summaryImage = css``;

export default () => (
    <div className={root}>
        <Block>
            <div className={summary}>
                <div className={listWrapper}>
                    <h2 className={heading}>Built for mission-driven organizers</h2>
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
