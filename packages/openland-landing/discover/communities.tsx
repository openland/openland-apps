import * as React from 'react';
import { css, cx } from 'linaria';
import Block from '../next/block';
import Heading from '../next/heading';

const root = css``;

const communities = css`
    display: flex;
    margin-top: 92px;

    @media (min-width: 768px) and (max-width: 1600px) {
        margin-top: 80px;
    }

    @media (max-width: 768px) {
        margin-top: 64px;
    }
`;

const wrapper = css`
    @media (max-width: 768px) {
        max-width: 368px;
        margin: 0 auto;
    }
`;

const topCommunities = css`
    position: relative;
    flex-shrink: 0;
    margin-right: 24px;
    @media (max-width: 960px) {
        display: none;
    }

    &:before {
        display: inline-block;
        content: 'Top categories';
        line-height: 1.56;

        font-weight: 600;
        font-size: 22px;
        color: #9393a7;

        position: absolute;
        top: -52px;

        @media (min-width: 768px) and (max-width: 1600px) {
            font-size: 18px;
            top: -47px;
        }
    }
`;

const type = css`
    display: flex;
    align-items: center;
    padding: 14px 20px;
    background-color: #f7fafc;
    border-radius: 12px;
    width: 300px;

    @media (max-width: 1600px) {
        width: 240px;
    }

    & + & {
        margin-top: 18px;

        @media (min-width: 768px) and (max-width: 1600px) {
            margin-top: 15px;
        }
    }
`;

const typeImg = css`
    margin-right: 12px;

    @media (min-width: 768px) and (max-width: 1600px) {
        width: 24px;
    }
`;

const typeText = css`
    font-weight: 600;
    font-size: 18px;
    line-height: 1.7;
    color: #272750;

    @media (max-width: 1600px) {
        font-size: 15px;
    }
`;

const featuredCommunities = css`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin: -12px;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        align-items: center;
        margin: -9px;
    }

    &:before {
        display: inline-block;
        content: 'Featured communities';
        line-height: 1.56;

        position: absolute;
        top: -40px;
        left: 12px;

        @media (max-width: 960px) {
            left: 12px;
        }

        font-weight: 600;
        font-size: 22px;
        color: #9393a7;

        @media (min-width: 768px) and (max-width: 1600px) {
            font-size: 18px;
            top: -35px;
        }

        @media (max-width: 768px) {
            font-size: 18px;
            top: -30px;
        }
    }

    @media (max-width: 960px) {
        display: block;
        margin: -12px;
    }
`;

const community = css`
    @media (max-width: 960px) {
        margin: 12px;
        padding: 20px 24px;
    }

    position: relative;
    width: calc(50% - 24px);
    padding: 30px;
    border-radius: 16px;
    margin: 12px;

    display: inline-block;

    @media (min-width: 768px) and (max-width: 960px) {
        padding: 30px;
    }

    @media (max-width: 768px) {
        width: 100%;
        max-width: 368px;
        margin: 9px;
    }

    transition: box-shadow 0.3s, background 0.3s;

    &:hover,
    &:focus {
        text-decoration: none;
        box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);

        .communityButton {
            opacity: 1;
        }

        .communityText {
            opacity: 0;
        }

        & *:not(.communityButton) {
            color: white;
        }
    }
`;

const fundraising = css`
    background: linear-gradient(121.72deg, #d3f2ff 0%, #eaf9ff 100%);

    &:hover {
        background: linear-gradient(117.71deg, #0fabee 0%, #3ad0ff 100%);

        .communityButton {
            color: #089fe1;
        }
    }
`;

const travel = css`
    background: linear-gradient(121.72deg, #ffebd9 0%, #fff4ea 100%);

    &:hover {
        background: linear-gradient(117.71deg, #ffa855 0%, #ffc978 100%);

        .communityButton {
            color: #e98e37;
        }
    }
`;

const cto = css`
    background: linear-gradient(121.72deg, #ffdada 0%, #ffeaea 100%);

    &:hover {
        background: linear-gradient(117.71deg, #ff8989 0%, #ffa5a5 100%);

        .communityButton {
            color: #f07c7c;
        }
    }
`;

const food = css`
    background: linear-gradient(121.72deg, #deffd6 0%, #eeffea 100%);

    &:hover {
        background: linear-gradient(117.71deg, #71cc5a 0%, #b0df8b 100%);

        .communityButton {
            color: #5cbc44;
        }
    }
`;

const communityHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const communityTitle = css``;

const communityHeading = css`
    font-weight: 600;
    font-size: 24px;
    line-height: 1.17;
    color: #272750;

    @media (max-width: 1600px) {
        font-size: 22px;
    }

    @media (max-width: 960px) {
        font-size: 22px;
    }

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const communitySubheading = css`
    display: block;
    font-size: 18px;
    line-height: 1.33;
    color: #525273;
    margin-top: 8px;

    @media (max-width: 960px) {
        font-size: 16px;
    }
`;

const communityImg = css`
    @media (max-width: 960px) {
        width: 52px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        width: 60px;
    }
`;

const communityText = css`
    font-size: 18px;
    line-height: 1.67;
    color: #272750;
    margin-top: 20px;

    @media (max-width: 1600px) {
        font-size: 16px;
    }

    @media (max-width: 768px) {
        font-size: 16px;
        margin-top: 12px;
    }
`;

const button = css`
    display: inline-flex;
    align-items: center;
    padding: 12px 28px;
    font-weight: 600;
    font-size: 16px;
    color: #248bf2;
    background-color: white;
    border-radius: 12px;

    position: absolute;
    bottom: 32px;

    @media (max-width: 768px) {
        bottom: 20px;
    }

    opacity: 0;
`;

const text = css`
    font-size: 24px;
    line-height: 1.5;
    color: #525273;
    margin-top: 10px;

    font-size: 20px;
    white-space: nowrap;

    @media (max-width: 768px) {
        font-size: 18px;
        white-space: initial;
        max-width: 350px;
    }
`;

const headingWrapper = css`
    @media (min-width: 768px) and (max-width: 960px) {
        font-size: 32px !important;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={wrapper}>
                <div className={headingWrapper}>
                    <Heading>Communities for everyone</Heading>
                </div>
                <p className={text}>
                    Discover and join communities for your industry, role, skills, interests, and
                    location
                </p>
                <div className={communities}>
                    <div className={topCommunities}>
                        <div className={type}>
                            <img
                                className={typeImg}
                                src="/static/landing/icons/ic-business.svg"
                                width="28"
                                height="28"
                                alt=""
                            />
                            <span className={typeText}>Business and startups</span>
                        </div>
                        <div className={type}>
                            <img
                                className={typeImg}
                                src="/static/landing/icons/ic-tech.svg"
                                width="28"
                                height="28"
                                alt=""
                            />
                            <span className={typeText}>Tech and science</span>
                        </div>
                        <div className={type}>
                            <img
                                className={typeImg}
                                src="/static/landing/icons/ic-health.svg"
                                width="28"
                                height="28"
                                alt=""
                            />
                            <span className={typeText}>Health and fitness</span>
                        </div>
                        <div className={type}>
                            <img
                                className={typeImg}
                                src="/static/landing/icons/ic-art.svg"
                                width="28"
                                height="28"
                                alt=""
                            />
                            <span className={typeText}>Arts and creativity</span>
                        </div>
                        <div className={type}>
                            <img
                                className={typeImg}
                                src="/static/landing/icons/ic-fashion.svg"
                                width="28"
                                height="28"
                                alt=""
                            />
                            <span className={typeText}>Fashion and beauty</span>
                        </div>
                        <div className={type}>
                            <img
                                className={typeImg}
                                src="/static/landing/icons/ic-education.svg"
                                width="28"
                                height="28"
                                alt=""
                            />
                            <span className={typeText}>Education and career</span>
                        </div>
                    </div>

                    <div className={featuredCommunities}>
                        <a
                            className={cx(community, fundraising)}
                            href="invite/TNMloKR"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className={communityHeader}>
                                <div className={communityTitle}>
                                    <h2 className={communityHeading}>Fundraising Help</h2>
                                    <span className={communitySubheading}>1200+ members</span>
                                </div>
                                <img
                                    className={communityImg}
                                    src="/static/landing/icons/fundraising.svg"
                                    width="60"
                                    height="60"
                                    alt=""
                                />
                            </div>
                            <div className={cx(communityText, 'communityText')}>
                                Get pitch deck feedback and
                                <br />
                                investor intros
                            </div>
                            <div className={cx(button, 'communityButton')}>Join community</div>
                        </a>

                        <a
                            className={cx(community, travel)}
                            href="invite/hKLqdm8"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className={communityHeader}>
                                <div className={communityTitle}>
                                    <h2 className={communityHeading}>Travel Hacks</h2>
                                    <span className={communitySubheading}>⚡ New</span>
                                </div>
                                <img
                                    className={communityImg}
                                    src="/static/landing/icons/travel.svg"
                                    width="60"
                                    height="60"
                                    alt=""
                                />
                            </div>
                            <div className={cx(communityText, 'communityText')}>
                                Find inspiration for your next trip
                                <br />
                                and share your own experiences
                            </div>
                            <div className={cx(button, 'communityButton')}>Join community</div>
                        </a>

                        <a
                            className={cx(community, cto)}
                            href="invite/eD0uZPt"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className={communityHeader}>
                                <div className={communityTitle}>
                                    <h2 className={communityHeading}>CTOs</h2>
                                    <span className={communitySubheading}>1000+ members</span>
                                </div>
                                <img
                                    className={communityImg}
                                    src="/static/landing/icons/cto.svg"
                                    width="60"
                                    height="60"
                                    alt=""
                                />
                            </div>
                            <div className={cx(communityText, 'communityText')}>
                                Share best practices and discuss
                                <br />
                                developer tools choices
                            </div>
                            <div className={cx(button, 'communityButton')}>Join community</div>
                        </a>

                        <a
                            className={cx(community, food)}
                            href="invite/skHEQcr"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className={communityHeader}>
                                <div className={communityTitle}>
                                    <h2 className={communityHeading}>Future of Food</h2>
                                    <span className={communitySubheading}>120+ members</span>
                                </div>
                                <img
                                    className={communityImg}
                                    src="/static/landing/icons/food.svg"
                                    width="60"
                                    height="60"
                                    alt=""
                                />
                            </div>
                            <div className={cx(communityText, 'communityText')}>
                                Discover and discuss the latest
                                <br /> trends in food innovation
                            </div>
                            <div className={cx(button, 'communityButton')}>Join community</div>
                        </a>
                    </div>
                </div>
            </div>
        </Block>
    </div>
);
