import * as React from 'react';
import { css, cx } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css`
    background: linear-gradient(0deg, #f7fafc, #f7fafc);
`;

const features = css`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 24px;
    margin-bottom: 5em;

    @media (max-width: 768px) {
        grid-template-columns: auto;
    }
`;

const feature = css`
    padding: 36px 46px;
    background: linear-gradient(0deg, #ffffff, #ffffff);
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.06);
    border-radius: 16px;
`;

const featureHeader = css`
    display: flex;
    align-items: center;
`;

const icon = css`
    margin-right: 20px;
`;

const name = css`
    font-size: 26px;
    line-height: 31px;
    font-weight: 800;
`;

const text = css`
    font-size: 24px;
    line-height: 36px;
    margin-top: 16px;

    @media (min-width: 768px) and (max-width: 1140px) {
        font-size: 20px;
    }

    @media (min-width: 400px) and (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 400px) {
        font-size: 16px;
    }
`;

const link = css`
    display: block;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    margin-top: 30px;

    @media (min-width: 768px) and (max-width: 1140px) {
        font-size: 20px;
    }

    @media (min-width: 400px) and (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 400px) {
        font-size: 16px;
    }
`;

const headingWrapper = css`
    margin-top: 5em;
    margin-bottom: 2em;
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={headingWrapper}>
                <Heading>Chat with us</Heading>
            </div>
            <div className={features}>
                <div className={feature}>
                    <div className={featureHeader}>
                        <img
                            className={icon}
                            src="/static/landing/icons/careers.svg"
                            width="64"
                            height="64"
                            alt=""
                        />
                        <div className={name}>Openland Careers</div>
                    </div>
                    <p className={text}>
                        Explore open positions or design your own role in our team
                    </p>
                    <a href="#" className={link}>
                        Join Chat
                    </a>
                </div>
                <div className={feature}>
                    <div className={featureHeader}>
                        <img
                            className={icon}
                            src="/static/landing/icons/support.svg"
                            width="64"
                            height="64"
                            alt=""
                        />
                        <div className={name}>Support and Feedback</div>
                    </div>
                    <p className={text}>
                        Get help, share experiences, and propose ideas for Openland.
                    </p>
                    <a href="#" className={link}>
                        Join Chat
                    </a>
                </div>
                <div className={feature}>
                    <div className={featureHeader}>
                        <img
                            className={icon}
                            src="/static/landing/icons/news.svg"
                            width="64"
                            height="64"
                            alt=""
                        />
                        <div className={name}>Openland News</div>
                    </div>
                    <p className={text}>Follow our journey to the future of community organizing</p>
                    <a href="#" className={link}>
                        Join Chat
                    </a>
                </div>
                <div className={feature}>
                    <div className={featureHeader}>
                        <img
                            className={icon}
                            src="/static/landing/icons/community.svg"
                            width="64"
                            height="64"
                            alt=""
                        />
                        <div className={name}>Community Builders</div>
                    </div>
                    <p className={text}>
                        Get inspiration and learn from the best community organizers
                    </p>
                    <a href="#" className={link}>
                        Join Chat
                    </a>
                </div>
            </div>
        </Block>
    </div>
);
