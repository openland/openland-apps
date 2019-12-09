import * as React from 'react';
import { css } from 'linaria';
import Block from '../next/block';

const root = css``;

const cta = css`
    position: relative;
    text-align: center;
    padding-top: 160px;
    padding-bottom: 100px;

    @media (max-width: 768px) {
        padding-top: 80px;
        padding-bottom: 50px;
    }
`;

const headline = css`
    z-index: -1;
    @media (min-width: 1600px) {
        font-size: 80px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        font-size: 70px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        font-size: 56px;
    }

    @media (max-width: 768px) {
        font-size: 36px;
    }
`;

const headlineGradient = css`
    background: linear-gradient(166.76deg, #24bff2 0%, #2458f2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: -1;
`;

const text = css`
    @media (min-width: 1600px) {
        font-size: 24px;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        font-size: 20px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        margin-bottom: 60px;
        margin-top: 15px;
    }

    line-height: 1.5;

    margin-top: 25px;
    margin-bottom: 50px;
`;

const button = css`
    display: inline-flex;
    align-items: center;
    background-color: var(--accentPrimary);
    border-radius: 12px;
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
        font-size: 22px;
        padding: 15px 36px;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        font-size: 20px;
        padding: 13px 32px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 11px 32px;
    }
    margin: 10px;
`;

const dotsLeft = css`
    width: 10000px;
    height: 122px;

    background: url('https://cdn.openland.com/shared/landing/dot-left.svg');

    position: absolute;
    top: 49%;
    transform: translateY(-50%);

    @media (min-width: 1600px) {
        left: -10018px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        left: -10025px;
    }

    @media (max-width: 960px) {
        display: none;
    }
`;

const dotsRight = css`
    width: 9999px;
    height: 122px;

    background: url('https://cdn.openland.com/shared/landing/dot-right.svg');

    position: absolute;
    top: 49%;
    transform: translateY(-50%);

    @media (min-width: 1600px) {
        right: -10018px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        right: -10025px;
    }

    @media (max-width: 960px) {
        display: none;
    }
`;

const buttons = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: -10px;
`;

const img = css`
    width: 100%;

    margin-top: 73px;
    margin-bottom: 73px;

    @media (max-width: 768px) {
        display: inline-block;
        width: 360px;
        margin-top: 30px;
        margin-bottom: 48px;
    }
`;

const imgWrapper = css`
    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={cta}>
                <div className={dotsLeft} />
                <h1 className={headline}>
                    Find your <span className={headlineGradient}>community</span>
                </h1>
                <p className={text}>Meet inspiring people, learn and get help</p>
                <div className={buttons}>
                    <a className={button} href="https://next.openland.com/invite/h2BGtL">
                        Join Openland
                    </a>
                </div>
                <div className={dotsRight} />
            </div>
            <div className={imgWrapper}>
                <img className={img} src="/static/landing/discover-cta.jpg" alt="" />
            </div>
        </Block>
    </div>
);
