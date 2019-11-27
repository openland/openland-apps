import * as React from 'react';
import { css, cx } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css`
    margin-top: 197px;
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

    display: flex;

    margin-right: 40px;
`;

const bullet = css`
    margin-right: 16px;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
`;

const itemContent = css``;

const subheading = css`
    font-size: 26px;
    line-height: 1.2;
`;

const text = css`
    font-size: 22px;
    line-height: 1.5;
    margin-top: 7px;
`;

const link = css`
    &,
    &:hover,
    &:focus {
        color: inherit;
        text-decoration: none;
        font-weight: bold;
    }
`;

const wrapper = css`
    flex-shrink: 2;
`;

const img = css`
    width: 402px;
    height: auto;
    flex-grow: 2;
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
