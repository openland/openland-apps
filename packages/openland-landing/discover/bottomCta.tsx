import * as React from 'react';
import { css } from 'linaria';
import Block from '../next/block';
import Heading from '../next/heading';

const root = css`
    display: none;
    @media (max-width: 768px) {
        display: block;
    }
`;

const button = css`
    display: flex;
    align-items: center;
    background-color: var(--accentPrimary);
    border-radius: 16px;
    font-weight: 600;
    box-shadow: 0px 6px 17px rgba(36, 139, 242, 0.32);
    color: var(--foregroundContrast);

    will-change: color, background-color, box-shadow;
    transition: color 0.2s, background-color.2s, box-shadow 0.2s;

    &:hover,
    &:focus {
        color: var(--foregroundContrast);
        text-decoration: none;
        background: #47a3ff;
        box-shadow: 0px 6px 27px rgba(36, 139, 242, 0.32);
        transition: color 0.01s, background-color.01s, box-shadow 0.01s, transform 0.2s;
    }

    &:active {
        background: #1d84ec;
        transition: color 0.01s, background-color.01s, box-shadow 0.01s;
    }

    @media (min-width: 1600px) {
        font-size: 20px;
        padding: 13px 36px;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        font-size: 18px;
        padding: 11px 32px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 11px 32px;
    }
`;

const ctaSmall = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 200px;
    margin-bottom: 180px;

    @media (max-width: 1600px) {
        flex-direction: column;
        text-align: center;
    }

    @media (max-width: 768px) {
        margin: 70px auto;
        width: 280px;
        text-align: left;
        align-items: flex-start;
    }
`;

const content = css`
    margin-right: 120px;

    @media (max-width: 1600px) {
        margin-right: 0;
        margin-bottom: 36px;
    }
`;

const list = css`
    font-size: 24px;
    list-style-type: none;
    display: inline-block;
    color: #525273;
    margin-top: 16px;

    @media (min-width: 768px) and (max-width: 1600px) {
        font-size: 20px;
    }

    @media (min-width: 400px) and (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 400px) {
        font-size: 16px;
    }
`;

const item = css`
    display: inline;
    line-height: 1.5;

    & + &:before {
        display: inline-block;
        content: '·';
        color: #9393a7;
        margin: 0 5px;
    }
`;

const dotsLeftSmall = css`
    width: 10000px;
    height: 85px;

    background: url('https://cdn.openland.com/shared/landing/dot-left.svg');

    position: absolute;
    top: 49%;
    transform: translateY(-50%);

    @media (min-width: 1600px) {
        left: -10018px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        left: -9985px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        left: -10000px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const dotsRightSmall = css`
    width: 9999px;
    height: 85px;

    background: url('https://cdn.openland.com/shared/landing/dot-right.svg');

    position: absolute;
    top: 49%;
    transform: translateY(-50%);

    @media (min-width: 1600px) {
        right: -10018px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        right: -9985px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        right: -10000px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={ctaSmall}>
                <div className={dotsLeftSmall} />
                <div className={content}>
                    <Heading>Find your community</Heading>
                    <ul className={list}>
                        <li className={item}>Discover inspiring communities for your interests</li>
                    </ul>
                </div>
                <a className={button} href="#">
                    Join Openland
                </a>
                <div className={dotsRightSmall} />
            </div>
        </Block>
    </div>
);
