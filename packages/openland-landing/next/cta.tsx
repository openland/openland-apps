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

    @media (min-width: 768px) and (max-width: 960px) {
        padding-top: 112px;
    }

    @media (max-width: 768px) {
        padding-top: 40px;
        padding-bottom: 70px;
    }
`;

const headline = css`
    z-index: -1;
    @media (min-width: 1601px) {
        font-size: 84px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        font-size: 70px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        font-size: 60px;
    }

    @media (max-width: 768px) {
        font-size: 42px;
        width: 300px;
        margin: 0 auto;
    }
`;

const headlineGradient = css`
    background: linear-gradient(166.76deg, #24bff2 0%, #2458f2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: -1;
`;

const text = css`
    @media (min-width: 1601px) {
        font-size: 24px;
        margin-bottom: 38px;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        font-size: 24px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        font-size: 20px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        font-size: 20px;
    }

    @media (max-width: 768px) {
        display: none;
    }

    line-height: 1.5;

    margin-top: 15px;
    margin-bottom: 45px;
    color: #525273;
`;

const mobileOnly = css`
    display: none;
    @media (max-width: 768px) {
        font-size: 18px;
        margin-bottom: 48px;
        margin-top: 15px;
        margin-left: auto;
        margin-right: auto;

        display: block;

        max-width: 368px;

        font-size: 20px;
        line-height: 32px;
    }

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

    line-height: 1.2;

    @media (min-width: 1601px) {
        font-size: 20px;
        padding: 16px 36px;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        padding: 11px 32px;
        font-size: 16px;
        line-height: 1.5;
    }

    @media (max-width: 768px) {
        padding: 11px 32px;
        font-size: 16px;
        line-height: 1.5;
    }
    margin-bottom: 10px;
    cursor: pointer;

    margin-top: 3px;
`;

const dotsLeft = css`
    width: 10000px;
    height: 122px;

    background: url('https://cdn.openland.com/shared/landing/dot-left.svg');

    position: absolute;
    top: 49.5%;
    transform: translateY(-50%);

    @media (min-width: 1601px) {
        left: -10018px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        left: -10112px;
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

    @media (min-width: 1601px) {
        right: -10018px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        right: -10112px;
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

    @media (min-width: 768px) and (max-width: 960px) {
        margin-top: 80px;
        margin-bottom: 86px;
    }

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

    @media (min-width: 1601px) {
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

    @media (min-width: 768px) and (max-width: 960px) {
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

    @media (min-width: 1601px) {
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

    @media (min-width: 768px) and (max-width: 960px) {
        display: none;
    }
`;

const hideMobile = css`
    @media (max-width: 768px) {
        display: none;
    }
`;

const XViewWrapper = css`
    &,
    & * {
        display: inline-block;
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
                    <div className={XViewWrapper}>
                        <XView as="div" path="/signin">
                            <span className={button}>Start community</span>
                        </XView>
                    </div>
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
                    <p className={mobileOnly}>
                        Discover&nbsp;inspiring&nbsp;communities to learn, get help, and find new
                        friends
                    </p>
                    <div className={XViewWrapper}>
                        <XView as="div" path="/signin">
                            <span className={button}>Start community</span>
                        </XView>
                    </div>
                    <div className={dotsRight} />
                </div>
            )}
        </Block>
    </div>
);
