import * as React from 'react';
import { css } from 'linaria';
import Block from './block';
import Heading from './heading';
import { XView } from 'react-mental';

const root = css`
    @media (min-width: 1160px) {
        margin-top: 137px;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        margin-top: 113px;
    }

    @media (max-width: 768px) {
        margin-top: 0;
        padding: 40px 0;
    }

    padding: 80px 0;

    background-color: #f7fafc;
`;

const content = css`
    display: flex;
    align-items: center;
    position: relative;
`;

const list = css`
    list-style-type: none;

    display: flex;
    flex-wrap: wrap;
    flex-shrink: 2;

    margin-top: 10px;

    @media (max-width: 768px) {
        max-width: 509px;
        margin: 0 auto;
    }
`;

const item = css`
    width: 350px;
    margin-top: 30px;
    margin-right: 53px;

    display: flex;

    @media (min-width: 768px) and (max-width: 1600px) {
        margin-right: 20px;
        width: 300px;
    }

    @media (max-width: 768px) {
        width: 100%;
        max-width: 400px;
        margin-right: 0;
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
    @media (min-width: 1600px) {
        font-size: 26px;
        line-height: 32px;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
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

    @media (min-width: 1600px) {
        font-size: 22px;
        line-height: 34px;
        width: 112%;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        width: 103%;
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
    position: relative;

    display: inline-flex;
    align-items: center;

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

    &:after {
        display: inline-block;
        content: '';
        margin-left: 7px;

        background: url('https://cdn.openland.com/shared/landing/link-arrow.svg') no-repeat;
        background-size: contain;

        @media (min-width: 1600px) {
            width: 20px;
            height: 20px;
        }

        @media (min-width: 768px) and (max-width: 1600px) {
            width: 16px;
            height: 16px;
        }

        @media (max-width: 768px) {
            width: 14px;
            height: 14px;
        }
    }
`;

const wrapper = css`
    flex-shrink: 2;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`;

const img = css`
    flex-grow: 2;
    height: auto;
    position: absolute;
    right: -20px;
    top: 0;

    @media (min-width: 1160px) {
        width: 402px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        width: 351px;
    }

    @media (max-width: 960px) {
        display: none;
    }
`;

const linkWrapper = css`
    display: inline-block;

    @media (max-width: 768px) {
        display: block;
    }
`;
const headingWrapper = css`
    @media (max-width: 768px) {
        max-width: 509px;
        text-align: left;
        margin: 0 auto;
        width: 100%;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={content}>
                <div className={wrapper}>
                    <div className={headingWrapper}>
                        <Heading>Help for every step</Heading>
                    </div>

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
                                src="/static/landing/icons/loud.svg"
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
                                <div className={text}>
                                    Be a part of our community of community builders.{' '}
                                    <div className={linkWrapper}>
                                        <span className={link}>
                                            <XView path="/invite/uj4m8bo">Join now</XView>
                                        </span>
                                    </div>
                                </div>
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
                                <div className={text}>
                                    Have questions about getting started?{' '}
                                    <div className={linkWrapper}>
                                        <span className={link}>
                                            <XView path="/invite/Ryq9hof">Let's chat</XView>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <img src="/static/landing/steps.png" width="402" height="381" className={img} />
            </div>
        </Block>
    </div>
);
