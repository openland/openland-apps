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
    position: relative;
    margin-top: 15px;
    color: #525273;
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

        background: url('/static/landing/link-arrow.svg') no-repeat;
        background-size: contain;

        transform: translateY(-50%);

        position: absolute;
        top: 55%;

        @media (min-width: 1140px) {
            width: 20px;
            height: 20px;
            right: -27px;
        }

        @media (min-width: 768px) and (max-width: 1140px) {
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

const popup = css`
    position: absolute;
    top: 0;
    width: 100%;
    background-color: white;
    padding: 32px;
    box-shadow: 0px 9px 42px rgba(0, 0, 0, 0.07);
    border-radius: 32px;
    z-index: 20;

    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 0;
    }
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

    &:hover {
        background-color: #eaecf0;
    }
`;

const popupCloseIcon = css``;

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
                            Start with a chat and add more activities as you grow.{' '}
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
                                    Content
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
                            Make it easy for members to bring their friends.{' '}
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
                                    Content
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
