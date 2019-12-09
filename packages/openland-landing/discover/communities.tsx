import * as React from 'react';
import { css, cx } from 'linaria';
import Block from '../next/block';
import Heading from '../next/heading';

const root = css``;

const communities = css`
    display: flex;
    margin-top: 84px;
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
        font-size: 18px;
        color: #9393a7;

        position: absolute;
        top: -48px;
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
        margin-top: 16px;
    }
`;

const typeImg = css`
    margin-right: 12px;
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
    }

    @media (max-width: 960px) {
        margin: -8px;
    }

    &:before {
        display: inline-block;
        content: 'Featured communities';
        line-height: 1.56;

        position: absolute;
        top: -36px;
        left: 12px;

        @media (max-width: 960px) {
            left: 8px;
        }

        font-weight: 600;
        font-size: 18px;
        color: #9393a7;

        // @media (max-width: 960px) {
        //     content: 'Discover communities by industry, role, skill, interest, and location';
        //     font-size: 18px;
        // }

        // @media (max-width: 768px) {
        //     top: -61px;
        // }
    }
`;

const community = css`
    position: relative;
    width: calc(50% - 24px);
    padding: 26px;
    border-radius: 16px;
    margin: 12px;

    @media (max-width: 960px) {
        margin: 8px;
        padding: 20px 24px;
    }

    @media (max-width: 768px) {
        width: 100%;
        max-width: 368px;
    }

    transition: box-shadow 0.3s, background 0.3s;

    &:hover,
    &:focus {
        text-decoration: none;
        box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
        background: white;

        .communityButton {
            opacity: 1;
        }

        .communityText {
            opacity: 0;
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
`;

const communitySubheading = css`
    display: block;
    font-size: 16px;
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
`;

const communityText = css`
    font-size: 18px;
    line-height: 1.67;
    color: #272750;
    margin-top: 20px;

    @media (max-width: 1600px) {
        font-size: 16px;
    }

    transition: opacity 0.2s;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const fundraising = css`
    background: linear-gradient(121.72deg, #d3f2ff 0%, #eaf9ff 100%);
`;

const travel = css`
    background: linear-gradient(121.72deg, #ffebd9 0%, #fff4ea 100%);
`;

const cto = css`
    background: linear-gradient(121.72deg, #ffdada 0%, #ffeaea 100%);
`;

const food = css`
    background: linear-gradient(121.72deg, #deffd6 0%, #eeffea 100%);
`;

const button = css`
    display: inline-flex;
    align-items: center;
    padding: 12px 28px;
    font-weight: 600;
    font-size: 16px;
    color: #248bf2;
    background: #e9f3fe;
    border-radius: 12px;

    position: absolute;
    bottom: 32px;

    @media (max-width: 768px) {
        bottom: 20px;
    }

    opacity: 0;
    transition: opacity 0.3s;
`;

const arrow = css`
    margin-left: 8px;
`;

const text = css`
    font-size: 20px;
    line-height: 1.5;
    color: #525273;
    margin-top: 12px;

    @media (max-width: 960px) {
        font-size: 18px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={wrapper}>
                <Heading>Communities for everyone</Heading>
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
                        <a className={cx(community, fundraising)} href="invite/TNMloKR">
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
                            <div className={cx(button, 'communityButton')}>
                                Join community
                                <img
                                    className={arrow}
                                    src="/static/landing/icons/arrow-blue.svg"
                                    width="16"
                                    height="16"
                                    alt=""
                                />
                            </div>
                        </a>

                        <a className={cx(community, travel)} href="invite/hKLqdm8">
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
                            <div className={cx(button, 'communityButton')}>
                                Join community
                                <img
                                    className={arrow}
                                    src="/static/landing/icons/arrow-blue.svg"
                                    width="16"
                                    height="16"
                                    alt=""
                                />
                            </div>
                        </a>

                        <a className={cx(community, cto)} href="invite/eD0uZPt">
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
                            <div className={cx(button, 'communityButton')}>
                                Join community
                                <img
                                    className={arrow}
                                    src="/static/landing/icons/arrow-blue.svg"
                                    width="16"
                                    height="16"
                                    alt=""
                                />
                            </div>
                        </a>

                        <a className={cx(community, food)} href="invite/skHEQcr">
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
                            <div className={cx(button, 'communityButton')}>
                                Join community
                                <img
                                    className={arrow}
                                    src="/static/landing/icons/arrow-blue.svg"
                                    width="16"
                                    height="16"
                                    alt=""
                                />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </Block>
    </div>
);
