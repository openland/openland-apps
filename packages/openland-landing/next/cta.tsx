import * as React from 'react';
import { css } from 'linaria';
import Block from './block';

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
`;

const button = css`
    margin-top: 46px;
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

export default () => (
    <div className={root}>
        <Block>
            <div className={cta}>
                <h1 className={headline}>
                    Build a great <span className={headlineGradient}>community</span>
                </h1>
                <p className={text}>
                    Openland is the best place to start and grow inspiring communities
                </p>
                <a className={button}>Start community</a>
            </div>
        </Block>
    </div>
);
