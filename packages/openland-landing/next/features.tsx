import * as React from 'react';
import { css } from 'linaria';
import Block from './block';
import Heading from './heading';

// @ts-ignore
import Tilt from 'react-tilt';

const root = css`
    margin-top: 110px;

    @media (min-width: 1140px) {
        padding: 120px 0;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
        padding: 102px 0;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        padding: 90px 0;
    }

    @media (max-width: 768px) {
        padding: 50px 0;
    }

    background: linear-gradient(180deg, #f6f9fb 0%, rgba(255, 255, 255, 0) 100%);
`;

const wrapper = css`
    display: flex;
    align-items: flex-start;

    @media (min-width: 1140px) {
        margin: -60px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
        margin: -50px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        margin: -10px;
    }

    @media (max-width: 768px) {
        margin: -20px;
        flex-direction: column;
        align-items: center;
    }
`;

const feature = css`
    display: inline-block;
    width: 50%;

    @media (min-width: 1140px) {
        padding: 60px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
        padding: 50px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        padding: 10px;
    }

    @media (max-width: 768px) {
        padding: 20px;
        width: initial;
    }
`;

const text = css`
    margin-top: 15px;

    @media (min-width: 1140px) {
        font-size: 26px;
        line-height: 1.4;
    }

    @media (min-width: 768px) and (max-width: 1140px) {
        font-size: 20px;
        line-height: 1.7;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        line-height: 1.6;
    }
`;

const link = css`
    color: inherit;
    font-weight: bold;

    &:hover,
    &:focus {
        text-decoration: none;
        color: inherit;
    }

    @media (max-width: 768px) {
        display: block;
    }
`;

const featureImage = css`
    margin-top: 46px;

    width: 100%;
    max-width: 509px;
    height: auto;
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={wrapper}>
                <div className={feature}>
                    <Heading>Start in seconds</Heading>
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
                    <Heading>Easy to grow</Heading>
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
