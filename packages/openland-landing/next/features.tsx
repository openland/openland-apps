import * as React from 'react';
import { css } from 'linaria';
import Block from './block';
import Heading from './heading';

// @ts-ignore
import Tilt from 'react-tilt';

const root = css`
    margin-top: 132px;

    @media (min-width: 1600px) {
        padding: 120px 0;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        padding: 102px 0;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        padding: 80px 0;
    }

    @media (max-width: 768px) {
        margin-top: 70px;
        padding: 40px 0;
    }

    background: linear-gradient(180deg, #f6f9fb 0%, rgba(255, 255, 255, 0) 100%);
`;

const wrapper = css`
    display: flex;
    align-items: flex-start;

    @media (min-width: 1600px) {
        margin: -60px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
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

    @media (min-width: 1600px) {
        padding: 60px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        padding: 50px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        padding: 10px;
    }

    @media (max-width: 768px) {
        padding: 20px;
        width: initial;

        &:first-child {
            margin-top: 40px;
        }
    }
`;

const text = css`
    position: relative;
    margin-top: 25px;
    color: #525273;
    @media (min-width: 1600px) {
        font-size: 26px;
        line-height: 1.4;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        font-size: 20px;
        line-height: 1.7;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        line-height: 1.6;
    }
`;

const link = css`
    position: relative;
    color: inherit;
    font-weight: bold;

    will-change: color;
    transition: color 0.2s;
    cursor: pointer;

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

        background: url('https://cdn.openland.com/shared/landing/link-arrow.svg') no-repeat;
        background-size: contain;

        transform: translateY(-50%);

        position: absolute;
        top: 55%;

        @media (min-width: 1600px) {
            width: 20px;
            height: 20px;
            right: -27px;
        }

        @media (min-width: 768px) and (max-width: 1600px) {
            width: 16px;
            height: 16px;
            right: -23px;
        }

        @media (max-width: 768px) {
            width: 14px;
            height: 14px;
            right: -21px;
        }
    }
`;

const linkWrapper = css`
    display: inline-block;

    @media (max-width: 960px) {
        display: block;
    }
`;

const featureImage = css`
    margin-top: 46px;

    width: 100%;
    max-width: 509px;
    height: auto;

    @media (max-width: 768px) {
        margin-top: 20px;
    }
`;

const popup = css`
    position: absolute;
    top: 0;
    width: 100%;
    background-color: white;
    padding: 32px;
    padding-top: 16px;
    padding-right: 16px;
    box-shadow: 0px 9px 42px rgba(0, 0, 0, 0.07);
    border-radius: 32px;
    z-index: 20;

    display: flex;
    flex-direction: column;

    // @media (max-width: 768px) {
    //     position: fixed;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    //     bottom: 0;
    //     border-radius: 0;
    // }
`;

const popupClose = css`
    align-self: flex-end;

    width: 40px;
    height: 40px;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    cursor: pointer;

    // @media (max-width: 768px) {
    //     position: relative;
    //     right: 20px;
    //     top: 10px;
    // }

    &:hover {
        background-color: #eaecf0;
    }
`;

const popupCloseIcon = css``;

const popupContent = css`
    margin-top: -30px;
    pointer-events: none;
`;

const popupHeading = css`
    font-weight: 800;
    font-size: 30px;
    line-height: 46px;
    color: #272750;
`;

const popupSection = css`
    margin-top: 20px;
`;

const popupSectionHeading = css`
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    color: #272750;
`;

const popupSectionText = css`
    font-size: 16px;
    line-height: 2;
    color: #525273;
    @media (max-width: 768px) {
        font-size: 14px;
        margin-right: 15px;
    }
`;

const dot = css`
    @media (max-width: 960px) {
        display: none;
    }
`;

export default () => {
    const [isLeftOpen, setLeftOpen] = React.useState<boolean>(false);
    const [isRightOpen, setRightOpen] = React.useState<boolean>(false);

    return (
        <div className={root}>
            <Block>
                <div className={wrapper}>
                    <div className={feature}>
                        <Heading>Start in seconds</Heading>
                        <div className={text}>
                            Start with a chat and add more activities as you grow
                            <span className={dot}>.</span>
                            {' '}
                            <div className={linkWrapper}>
                                <span className={link} onClick={() => setLeftOpen(true)}>
                                    Explore activities
                                </span>
                            </div>
                            {isLeftOpen && (
                                <div className={popup}>
                                    <div className={popupClose} onClick={() => setLeftOpen(false)}>
                                        <img
                                            className={popupCloseIcon}
                                            src="/static/landing/icons/close.svg"
                                            width="21"
                                            height="21"
                                            alt="Close modal"
                                        />
                                    </div>
                                    <div className={popupContent}>
                                        <h2 className={popupHeading}>Activities</h2>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>
                                                Questions and answers
                                            </h2>
                                            <p className={popupSectionText}>
                                                Dedicated chat for answering community questions
                                                <br />
                                                Recognition badges for experts and top contributors
                                            </p>
                                        </div>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>
                                                Member directory
                                            </h2>
                                            <p className={popupSectionText}>
                                                Custom profiles for your own community
                                                <br />
                                                Pick your own questions to ask new members
                                            </p>
                                        </div>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>
                                                Matchmaking and intros
                                            </h2>
                                            <p className={popupSectionText}>
                                                Member cards to explore and connect
                                                <br />
                                                Secret chats to make individual and small group
                                                intros
                                            </p>
                                        </div>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>Live sessions</h2>
                                            <p className={popupSectionText}>
                                                Voice conferences with crystal clear sound
                                                <br />
                                                Talk-and-chat multitasking
                                            </p>
                                        </div>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>
                                                Community library
                                            </h2>
                                            <p className={popupSectionText}>
                                                Shared photos, videos, files, and links for your
                                                community
                                                <br />
                                                Message search to find every conversation
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
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
                        <div className={text}>
                            Make it easy for members to bring their friends
                            <span className={dot}>.</span>
                            {' '}
                            <div className={linkWrapper}>
                                <span className={link} onClick={() => setRightOpen(true)}>
                                    See growth tools
                                </span>
                            </div>
                            {isRightOpen && (
                                <div className={popup}>
                                    <div className={popupClose} onClick={() => setRightOpen(false)}>
                                        <img
                                            className={popupCloseIcon}
                                            src="/static/landing/icons/close.svg"
                                            width="21"
                                            height="21"
                                            alt="Close modal"
                                        />
                                    </div>
                                    <div className={popupContent}>
                                        <h2 className={popupHeading}>Growth tools</h2>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>
                                                Invite pages and links
                                            </h2>
                                            <p className={popupSectionText}>
                                                Special invite pages for your community
                                                <br />
                                                Easy-to-share invite link with community preview
                                            </p>
                                        </div>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>
                                                Featuring on Openland
                                            </h2>
                                            <p className={popupSectionText}>
                                                Get recommended to new users on Openland
                                                <br />
                                                Community search and leaderboards
                                                <br />
                                                Cross-promotion with related communities
                                            </p>
                                        </div>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>Sharing tools</h2>
                                            <p className={popupSectionText}>
                                                Public post sharing to other social apps
                                                <br />
                                                Widgets and buttons for websites
                                            </p>
                                        </div>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>
                                                Member onboarding
                                            </h2>
                                            <p className={popupSectionText}>
                                                Individual welcome messages to newcomers
                                                <br />
                                                Pinned posts and community rules
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
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
};
