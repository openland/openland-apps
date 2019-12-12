import * as React from 'react';
import { css, cx } from 'linaria';
import Block from './block';
import Heading from './heading';
import { XView } from 'react-mental';

const root = css``;

const cta = css`
    position: relative;
    text-align: center;
    padding-top: 125px;
    padding-bottom: 100px;

    @media (max-width: 768px) {
        padding-top: 80px;
        padding-bottom: 80px;
    }
`;

const headline = css`
    z-index: -1;
    @media (min-width: 1600px) {
        font-size: 84px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        font-size: 70px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        font-size: 65px;
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
        font-size: 24px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        margin-bottom: 40px;
        margin-top: 15px;
    }

    line-height: 1.5;

    margin-top: 15px;
    margin-bottom: 45px;
`;

const button = css`
    display: inline-flex;
    align-items: center;
    background-color: var(--accentPrimary);
    border-radius: 12px;
    font-weight: 600;
    box-shadow: 0px 6px 17px rgba(36, 139, 242, 0.32);
    color: var(--foregroundContrast);
    line-height: 1.5;
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
        padding: 16px 36px;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        padding: 11px 32px;
        font-size: 16px;
    }

    @media (max-width: 768px) {
        padding: 11px 32px;
        font-size: 16px;
    }
    margin: 10px;
    cursor: pointer;
`;

const dotsLeft = css`
    width: 10000px;
    height: 122px;

    background: url('https://cdn.openland.com/shared/landing/dot-left.svg');

    position: absolute;
    top: 49.5%;
    transform: translateY(-50%);

    @media (min-width: 1600px) {
        left: -10018px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        left: -10131px;
        top: 52.2%;
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
    top: 49.5%;
    transform: translateY(-50%);

    @media (min-width: 1600px) {
        right: -10018px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        right: -10131px;
        top: 52.2%;
    }

    @media (max-width: 960px) {
        display: none;
    }
`;

const ctaSmall = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 174px;
    margin-bottom: 150px;

    @media (min-width: 960px) and (max-width: 1600px) {
        margin-top: 120px;
        margin-bottom: 132px;
    }

    @media (max-width: 960px) {
        flex-direction: column;
        text-align: center;
    }

    @media (max-width: 768px) {
        margin: 70px auto;
        max-width: 360px;
        text-align: left;
        align-items: flex-start;
    }
`;

const content = css`
    margin-right: 120px;

    @media (max-width: 960px) {
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
    top: 53%;
    transform: translateY(-50%);

    @media (min-width: 1600px) {
        left: -10018px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        left: -10073px;
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
    top: 53%;
    transform: translateY(-50%);

    @media (min-width: 1600px) {
        right: -10018px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        right: -10073px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        right: -10000px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const hideMobile = css`
    @media (max-width: 768px) {
        display: none;
    }
`;

export default ({ small }: { small?: boolean }) => (
    <div className={root}>
        <Block>
            {small ? (
                <div className={ctaSmall}>
                    <div className={dotsLeftSmall} />
                    <div className={content}>
                        <Heading>Start a great&nbsp;community today</Heading>
                        <ul className={list}>
                            <li className={item}>Seconds to launch</li>
                            <li className={cx(item, hideMobile)}>Real-time support</li>
                            <li className={item}>Free</li>
                        </ul>
                    </div>
                    <span className={button}>
                        <XView path="/invite/h2BGtL">Start community</XView>
                    </span>
                    <div className={dotsRightSmall} />
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
                    <span className={button}>
                        <XView path="/invite/h2BGtL">Start community</XView>
                    </span>
                    <div className={dotsRight} />
                </div>
            )}
        </Block>
    </div>
);
