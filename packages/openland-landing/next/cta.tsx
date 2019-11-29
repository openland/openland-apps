import * as React from 'react';
import { css } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css``;

const cta = css`
    position: relative;
    text-align: center;
    padding-top: 160px;
    padding-bottom: 100px;
    margin-bottom: 70px;
`;

const headline = css`
    z-index: -1;
    @media (min-width: 1140px) {
        font-size: 80px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
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
    @media (min-width: 1140px) {
        font-size: 24px;
    }

    @media (min-width: 768px) and (max-width: 1140px) {
        font-size: 20px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
    }

    margin-top: 25px;
    margin-bottom: 50px;
`;

const button = css`
    display: inline-block;
    background-color: var(--accentPrimary);
    border-radius: 16px;
    font-weight: bold;
    box-shadow: 0px 6px 17px rgba(36, 139, 242, 0.32);
    color: var(--foregroundContrast);

    will-change: color, background-color, box-shadow, transform;
    transition: color 0.2s, background-color.2s, box-shadow 0.2s, transform 0.2s;

    &:hover,
    &:focus {
        color: var(--foregroundContrast);
        text-decoration: none;
        background: #47a3ff;
        box-shadow: 0px 6px 27px rgba(36, 139, 242, 0.32);
        transform: translateY(-4px);
        transition: color 0.01s, background-color.01s, box-shadow 0.01s, transform 0.2s;
    }

    &:active {
        background: #1d84ec;
        transition: color 0.01s, background-color.01s, box-shadow 0.01s;
    }

    @media (min-width: 1140px) {
        font-size: 20px;
        padding: 13px 36px;
    }

    @media (min-width: 768px) and (max-width: 1140px) {
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
    margin-left: -30px;
    margin-bottom: 180px;

    @media (max-width: 1140px) {
        flex-direction: column;
        text-align: center;
    }
`;

const content = css`
    margin-right: 120px;

    @media (max-width: 1140px) {
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

    @media (min-width: 768px) and (max-width: 1140px) {
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

    & + &:before {
        display: inline-block;
        content: '·';
        color: #9393a7;
        margin: 0 5px;
    }
`;

const dotsLeft = css`
    width: 10000px;
    height: 122px;

    background: url('https://cdn.openland.com/shared/landing/dot-left.svg');

    position: absolute;
    top: 49%;
    transform: translateY(-50%);

    @media (min-width: 1160px) {
        left: -10018px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
        left: -9985px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        left: -10000px;
    }

    @media (max-width: 768px) {
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

    @media (min-width: 1140px) {
        right: -10018px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
        right: -9985px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        right: -10000px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

export default ({ small }: { small?: boolean }) => (
    <div className={root}>
        <Block>
            {small ? (
                <div className={ctaSmall}>
                    <div className={dotsLeft} />
                    <div className={content}>
                        <Heading>Start a great community today</Heading>
                        <ul className={list}>
                            <li className={item}>Seconds to launch</li>
                            <li className={item}>Real-time support</li>
                            <li className={item}>Free</li>
                        </ul>
                    </div>
                    <a className={button} href="https://next.openland.com/invite/h2BGtL">
                        Start community
                    </a>
                    <div className={dotsRight} />
                </div>
            ) : (
                <div className={cta}>
                    <div className={dotsLeft} />
                    <h1 className={headline}>
                        Build a great <span className={headlineGradient}>community</span>
                    </h1>
                    <p className={text}>
                        Openland is the best place to start and grow inspiring communities
                    </p>
                    <a className={button} href="https://next.openland.com/invite/h2BGtL">
                        Start community
                    </a>
                    <div className={dotsRight} />
                </div>
            )}
        </Block>
    </div>
);
