import * as React from 'react';
import { css, cx } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css`
    margin-top: 22px;
`;

const wrapper = css`
    @media (max-width: 768px) {
        margin: 0 auto;
        max-width: 360px;
    }
`;

const header = css`
    position: relative;
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const content = css`
    @media (max-width: 768px) {
        margin-bottom: -30px;
        width: 509px;
    }
`;

const listWrapper = css`
    margin-top: 11px;

    position: relative;
    @media (min-width: 1600px) {
        font-size: 24px;
        line-height: 38px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        font-size: 20px;
        line-height: 35px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        font-size: 20px;
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

const screenshot = css`
    width: 100%;
    max-width: 1600px;
    height: auto;
    margin-top: 40px;
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

    @media (max-width: 1600px) and (min-width: 960px) {
        width: 88px;
        height: 88px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const screenshotMobile = css`
    display: none;
    width: 100%;
    max-width: 509px;
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

const dot = css`
    @media (max-width: 768px) {
        display: none;
    }
`;

const popup = css`
    position: absolute;
    top: -10px;
    width: 100%;
    background-color: white;
    padding: 32px;
    padding-top: 16px;
    padding-right: 16px;
    box-shadow: 0px 9px 42px rgba(0, 0, 0, 0.07);
    border-radius: 20px;
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
    margin-top: -80px;
    pointer-events: none;
`;

const popupHeading = css`
    font-weight: bold;
    font-size: 30px;
    line-height: 46px;
    color: #272750;
    margin-bottom: 12px;
    margin-top: 40px;

    @media (min-width: 720px) and (max-width: 960px) {
        font-size: 25px;
        margin-bottom: 0;
    }

    // @media (max-width: 960px) and (min-width: 768px) {
    //     font-size: 14px;
    // }
`;

const popupSection = css`
    display: inline-block;
`;

const popupSectionHeading = css`
    font-weight: bold;
    font-size: 22px;
    line-height: 28px;
    margin-bottom: 8px;
    margin-top: 5px;
    color: #272750;

    @media (min-width: 720px) and (max-width: 960px) {
        font-size: 18px;
    }
`;

const popupSectionText = css`
    line-height: 1.8;
    color: #525273;

    @media (min-width: 1600px) {
        font-size: 20px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        font-size: 17px;
    }

    @media (max-width: 960px) and (min-width: 768px) {
        font-size: 14px;
    }
`;

const popupSections = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, 30%);
    grid-gap: 20px;
    text-align: left;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, 100%);
    }
`;

const hideMobile = css`
    @media (max-width: 768px) {
        display: none;
    }
`;

export default () => {
    const [isOpen, setOpen] = React.useState<boolean>(false);

    return (
        <div className={root}>
            <Block>
                <div className={wrapper}>
                    <div className={header}>
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
                                    <h2 className={popupHeading}>Messaging</h2>
                                    <div className={popupSections}>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>Chats</h2>
                                            <p className={popupSectionText}>
                                                Reactions, stickers, link previews
                                                <br />
                                                Formatting, editing, drafts
                                                <br />
                                                Mentions, replies, forwards
                                                <br />
                                                Threaded comments
                                            </p>
                                        </div>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>Calls</h2>
                                            <p className={popupSectionText}>
                                                Crystal-clear sound
                                                <br />
                                                Direct and conference calls
                                                <br />
                                                Call-and-chat multitasking
                                                <br />
                                                Screen sharing (coming soon)
                                            </p>
                                        </div>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>Apps</h2>
                                            <p className={popupSectionText}>
                                                All platforms
                                                <br />
                                                Beautiful and ultra-fast
                                                <br />
                                                Stress-free notifications
                                                <br />
                                                Dark mode and color themes
                                            </p>
                                        </div>
                                    </div>
                                    <h2 className={popupHeading}>Community</h2>
                                    <div className={popupSections}>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>Learn</h2>
                                            <p className={popupSectionText}>
                                                News sharing and discussion
                                                <br />
                                                Live sessions with experts
                                                <br />
                                                Shared docs and best practices
                                            </p>
                                        </div>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>Connect</h2>
                                            <p className={popupSectionText}>
                                                Member directories
                                                <br />
                                                Matchmaking and intros
                                                <br />
                                                Career opportunities
                                            </p>
                                        </div>
                                        <div className={popupSection}>
                                            <h2 className={popupSectionHeading}>Get help</h2>
                                            <p className={popupSectionText}>
                                                Advice and recommendations
                                                <br />
                                                Showcase and feedback
                                                <br />
                                                Customer research
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <img
                            src="/static/landing/logo-screenshots.svg"
                            width="100"
                            height="100"
                            className={logo}
                        />
                        <div className={content}>
                            <Heading>
                                All-in-one platform <span className={hideMobile}>you'll love</span>
                            </Heading>
                            <div className={listWrapper}>
                                <li className={list}>
                                    <ul className={item}>Chats</ul>
                                    <ul className={item}>Calls</ul>
                                    <ul className={item}>Community profiles</ul>
                                    <ul className={cx(item, hide)}>Ultra-fast apps</ul>
                                </li>
                                <span className={dot}>.</span>
                                {' '}
                                <div className={linkWrapper}>
                                    <span className={link} onClick={() => setOpen(true)}>
                                        All features
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img
                        src="/static/landing/screenshots-desktop.png"
                        className={screenshot}
                        width="1600"
                        height="667"
                    />
                    <img
                        src="/static/landing/screenshots-mobile.png"
                        className={screenshotMobile}
                        width="560"
                        height="1188"
                    />
                </div>
            </Block>
        </div>
    );
};
