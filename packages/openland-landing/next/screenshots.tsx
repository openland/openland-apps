import * as React from 'react';
import { css, cx } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css`
    margin-top: 58px;
`;

const header = css`
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const content = css`
    @media (max-width: 768px) {
        text-align: center;
    }
`;

const listWrapper = css`
    margin-top: 11px;

    position: relative;
    @media (min-width: 1140px) {
        font-size: 26px;
        line-height: 38px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
        font-size: 22px;
        line-height: 35px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        font-size: 22px;
        line-height: 35px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        line-height: 30px;
    }
`;

const list = css`
    list-style-type: none;
    display: inline;
`;

const item = css`
    display: inline;
    color: #525273;

    & + &:before {
        display: inline-block;
        content: '·';
        color: #9393a7;
        margin: 0 5px;
    }
`;

const link = css`
    font-size: inherit;
    color: inherit;
    font-weight: bold;
    color: #525273;
    position: relative;
    cursor: pointer;

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

const screenshot = css`
    width: 100%;
    max-width: 1140px;
    height: auto;
    margin-top: 54px;
    filter: drop-shadow(0px 13px 55px rgba(20, 64, 86, 0.05));
    @media (max-width: 768px) {
        display: none;
    }
`;

const hide = css`
    @media (min-width: 768px) and (max-width: 960px) {
        display: none;
    }
`;

const logo = css`
    margin-right: 32px;

    @media (max-width: 768px) {
        display: none;
    }
`;

const screenshotMobile = css`
    display: none;
    width: 100%;
    max-width: 560px;
    height: auto;
    margin-top: 54px;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 768px) {
        display: block;
    }
`;

const linkWrapper = css`
    display: inline-block;

    @media (max-width: 768px) {
        display: block;
    }
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
    display: inline-block;
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

const popupSections = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, 220px);
    grid-gap: 40px;
    justify-content: center;
    text-align: left;
`;

export default () => {
    const [isOpen, setOpen] = React.useState<boolean>(false);

    return (
        <div className={root}>
            <Block>
                <div className={header}>
                    <img
                        src="/static/landing/logo-screenshots.svg"
                        width="100"
                        height="100"
                        className={logo}
                    />
                    <div className={content}>
                        <Heading>All-in-one platform you'll love</Heading>
                        <div className={listWrapper}>
                            <li className={list}>
                                <ul className={item}>Member profiles</ul>
                                <ul className={item}>Live sessions</ul>
                                <ul className={item}>Chats</ul>
                                <ul className={cx(item, hide)}>Ultra-fast apps</ul>
                            </li>
                            {'. '}
                            <div className={linkWrapper}>
                                <span className={link} onClick={() => setOpen(true)}>
                                    All features
                                </span>
                            </div>
                            {isOpen && (
                                <div className={popup}>
                                    <div className={popupClose} onClick={() => setOpen(false)}>
                                        <img
                                            className={popupCloseIcon}
                                            src="/static/landing/icons/close.svg"
                                            width="21"
                                            height="21"
                                            alt="Close modal"
                                        />
                                    </div>
                                    <div className={popupContent}>
                                        <h2 className={popupHeading}>Features</h2>
                                        <div className={popupSections}>
                                            <div className={popupSection}>
                                                <h2 className={popupSectionHeading}>Chats</h2>
                                                <p className={popupSectionText}>
                                                    Public and invite-only
                                                    <br />
                                                    Emojis, stickers, formatting
                                                    <br />
                                                    Mentions, replies, forwards
                                                    <br />
                                                    Threaded comments
                                                    <br />
                                                    Link and file previews
                                                </p>
                                            </div>
                                            <div className={popupSection}>
                                                <h2 className={popupSectionHeading}>Growth</h2>
                                                <p className={popupSectionText}>
                                                    Invite pages and links
                                                    <br />
                                                    Social sharing tools
                                                    <br />
                                                    Featuring on Openland
                                                    <br />
                                                    Website widgests and buttons
                                                    <br />
                                                    New member onboarding
                                                </p>
                                            </div>
                                            <div className={popupSection}>
                                                <h2 className={popupSectionHeading}>Activities</h2>
                                                <p className={popupSectionText}>
                                                    Questions and answers
                                                    <br />
                                                    Member directory
                                                    <br />
                                                    Matchmaking and intros
                                                    <br />
                                                    Live sessions
                                                    <br />
                                                    Community library
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <img
                    src="/static/landing/screenshots-desktop.png"
                    className={screenshot}
                    width="1140"
                    height="667"
                />
                <img
                    src="/static/landing/screenshots-mobile.png"
                    className={screenshotMobile}
                    width="560"
                    height="1188"
                />
            </Block>
        </div>
    );
};
