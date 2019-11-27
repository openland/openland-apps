import * as React from 'react';
import { css } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css``;

const cta = css`
    text-align: center;
    margin-top: 170px;
    margin-bottom: 170px;
`;

const headline = css`
    font-size: 80px;
`;

const headlineGradient = css`
    background: linear-gradient(166.76deg, #24bff2 0%, #2458f2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const text = css`
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 46px;
`;

const button = css`
    display: inline-block;
    background-color: var(--accentPrimary);
    border-radius: 16px;
    box-shadow: 0px 6px 17px rgba(36, 139, 242, 0.32);
    font-size: 20px;
    padding: 13px 36px;
    color: var(--foregroundContrast);

    &:hover,
    &:focus {
        color: var(--foregroundContrast);
        text-decoration: none;
    }
`;

const ctaSmall = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 180px;
    margin-bottom: 180px;
`;

const content = css`
    margin-right: 70px;
`;

const list = css`
    font-size: 24px;
    list-style-type: none;
    display: inline-block;
    color: #525273;
    margin-top: 16px;
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

export default ({ small }: { small?: boolean }) => (
    <div className={root}>
        <Block>
            {small ? (
                <div className={ctaSmall}>
                    <div className={content}>
                        <Heading>Start a great community today</Heading>
                        <ul className={list}>
                            <li className={item}>Seconds to launch</li>
                            <li className={item}>Real-time support</li>
                            <li className={item}>Free</li>
                        </ul>
                    </div>
                    <a className={button} href="#">
                        Start community
                    </a>
                </div>
            ) : (
                <div className={cta}>
                    <h1 className={headline}>
                        Build a great <span className={headlineGradient}>community</span>
                    </h1>
                    <p className={text}>
                        Openland is the best place to start and grow inspiring communities
                    </p>
                    <a className={button} href="#">
                        Start community
                    </a>
                </div>
            )}
        </Block>
    </div>
);
