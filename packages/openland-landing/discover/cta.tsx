import * as React from 'react';
import { css } from 'linaria';
import Block from '../next/block';
import { XView } from 'react-mental';

const root = css``;

const cta = css`
    position: relative;
    text-align: center;
    padding-top: 125px;
    padding-bottom: 100px;

    @media (max-width: 768px) {
        padding-top: 80px;
        padding-bottom: 50px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        padding-bottom: 84px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        padding-top: 113px;
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
        font-size: 70px;
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
        font-size: 28px;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        font-size: 24px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        margin-bottom: 60px;
        margin-top: 15px;
    }

    line-height: 1.5;

    margin-top: 15px;
    margin-bottom: 45px;
    color: #525273;
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
    margin-top: 8px;
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

const buttons = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: -10px;
`;

const img = css`
    width: 100%;
    max-width: 100%;
    height: auto;

    margin-top: 30px;
    margin-bottom: 65px;

    @media (max-width: 768px) {
        display: inline-block;
        width: 320px;
        height: auto;
        margin-top: 30px;
        margin-bottom: 48px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        height: auto;
        margin-top: 20px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        margin-bottom: 75px;
    }
`;

const imgWrapper = css`
    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        align-items: flex-start;
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
                <p className={text}>Meet inspiring people, learn and&nbsp;get&nbsp;help</p>
                <div className={buttons}>
                    <XView path="/signin">
                        <span className={button}>Join Openland</span>
                    </XView>
                </div>
                <div className={dotsRight} />
            </div>
            <div className={imgWrapper}>
                <img
                    className={img}
                    src="/static/landing/discover-cta.jpg"
                    alt=""
                    width="1172"
                    height="472"
                />
            </div>
        </Block>
    </div>
);
