import * as React from 'react';
import { css } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css`
    @media (min-width: 1140px) {
        margin-top: 197px;
    }

    @media (min-width: 768px) and (max-width: 1140px) {
        margin-top: 128px;
    }

    @media (max-width: 768px) {
        margin-top: 0;
    }

    padding: 80px 0;

    background-color: #f7fafc;
`;

const content = css`
    display: flex;
    align-items: center;
`;

const list = css`
    list-style-type: none;

    display: flex;
    flex-wrap: wrap;
    flex-shrink: 2;

    margin-top: 10px;
`;

const item = css`
    width: 350px;
    margin-top: 30px;
    margin-right: 40px;

    display: flex;

    @media (min-width: 768px) and (max-width: 1140px) {
        margin-right: 20px;
        width: 300px;
    }
`;

const bullet = css`
    margin-right: 16px;
    width: 32px;
    height: 32px;
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 28px;
        height: 28px;
    }
`;

const itemContent = css``;

const subheading = css`
    @media (min-width: 1140px) {
        font-size: 26px;
        line-height: 32px;
    }

    @media (min-width: 768px) and (max-width: 1140px) {
        font-size: 22px;
        line-height: 30px;
    }

    @media (max-width: 768px) {
        font-size: 20px;
        line-height: 24px;
    }
`;

const text = css`
    margin-top: 7px;
    color: #525273;

    @media (min-width: 1140px) {
        font-size: 22px;
        line-height: 34px;
    }

    @media (min-width: 768px) and (max-width: 1140px) {
        font-size: 18px;
        line-height: 28px;
    }

    @media (max-width: 768px) {
        font-size: 16px;
        line-height: 26px;
    }
`;

const link = css`
    font-weight: bold;
    color: inherit;
    will-change: color;
    transition: color 0.2s;

    &:hover,
    &:focus {
        text-decoration: none;
        color: #272750;
        transition: color 0.01s;
    }

    &:active {
        color: #248bf2;
        transition: color 0.01s;
    }

    @media (max-width: 768px) {
        display: block;
    }
`;

const wrapper = css`
    flex-shrink: 2;
`;

const img = css`
    flex-grow: 2;
    height: auto;

    @media (min-width: 1140px) {
        width: 402px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
        width: 351px;
    }

    @media (max-width: 960px) {
        display: none;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={content}>
                <div className={wrapper}>
                    <Heading>Help for every step</Heading>

                    <ul className={list}>
                        <li className={item}>
                            <img
                                src="/static/landing/icons/star.svg"
                                className={bullet}
                                width="32"
                                height="32"
                            />
                            <div className={itemContent}>
                                <h3 className={subheading}>Inspiration</h3>
                                <p className={text}>
                                    Guides, templates, checklists, and actionable insights
                                </p>
                            </div>
                        </li>
                        <li className={item}>
                            <img
                                src="/static/landing/icons/share.svg"
                                className={bullet}
                                width="32"
                                height="32"
                            />
                            <div className={itemContent}>
                                <h3 className={subheading}>Support</h3>
                                <p className={text}>
                                    Real-time help for launching and growing your community
                                </p>
                            </div>
                        </li>
                        <li className={item}>
                            <img
                                src="/static/landing/icons/person.svg"
                                className={bullet}
                                width="32"
                                height="32"
                            />
                            <div className={itemContent}>
                                <h3 className={subheading}>Experts</h3>
                                <p className={text}>
                                    Be a part of our community of community builders.{' '}
                                    <a href="#" className={link}>
                                        Join now
                                    </a>
                                </p>
                            </div>
                        </li>
                        <li className={item}>
                            <img
                                src="/static/landing/icons/smile.svg"
                                className={bullet}
                                width="32"
                                height="32"
                            />
                            <div className={itemContent}>
                                <h3 className={subheading}>Onboarding</h3>
                                <p className={text}>
                                    Have questions about getting started?{' '}
                                    <a href="#" className={link}>
                                        Let's chat
                                    </a>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                <img src="/static/landing/steps.png" width="402" height="381" className={img} />
            </div>
        </Block>
    </div>
);
