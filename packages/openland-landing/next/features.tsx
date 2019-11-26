import * as React from 'react';
import { css } from 'linaria';
import Block from './block';

// @ts-ignore
import Tilt from 'react-tilt';

const root = css`
    margin-top: 110px;
    padding: 120px 0;
    background: linear-gradient(180deg, #f6f9fb 0%, rgba(255, 255, 255, 0) 100%);
`;

const wrapper = css`
    display: flex;
    margin: -60px;
`;

const feature = css`
    margin: 60px;
`;

const heading = css`
    font-size: 36px;
`;

const text = css`
    font-size: 26px;
    line-height: 1.4;
    margin-top: 15px;
`;

const link = css`
    color: inherit;
    font-weight: bold;

    &:hover,
    &:focus {
        text-decoration: none;
        color: inherit;
    }
`;

const featureImage = css`
    margin-top: 46px;
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={wrapper}>
                <div className={feature}>
                    <h2 className={heading}>Start in seconds</h2>
                    <p className={text}>
                        Start with a chat and add more activities as you grow.{' '}
                        <a href="#" className={link}>
                            Explore activities
                        </a>
                    </p>
                    <Tilt options={{ max: 25, scale: 1 }}>
                        <img
                            src="/static/landing/feature-1.svg"
                            className={featureImage}
                            width="509"
                            height="289"
                        />
                    </Tilt>
                </div>
                <div className={feature}>
                    <h2 className={heading}>Easy to grow</h2>
                    <p className={text}>
                        Make it easy for members to bring their friends.{' '}
                        <a href="#" className={link}>
                            See growth tools
                        </a>
                    </p>
                    <Tilt options={{ max: 25, scale: 1 }}>
                        <img
                            src="/static/landing/feature-2.svg"
                            className={featureImage}
                            width="509"
                            height="289"
                        />
                    </Tilt>
                </div>
            </div>
        </Block>
    </div>
);
