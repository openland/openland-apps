import * as React from 'react';
import { css, cx } from 'linaria';
import { Container } from '../components/Container';
import Mac from './icons/ic-mac.svg';
import Windows from './icons/ic-win.svg';
import Linux from './icons/ic-linux.svg';
import { XView } from 'react-mental';
import { detectOS } from 'openland-x-utils/detectOS';
import { LandingLinks } from '../components/_links';

const box = css`
    padding: 141px 0 166px;

    @media (min-width: 960px) and (max-width: 1599px) {
        padding: 100px 0 120px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        padding: 100px 0 116px;
    }

    @media (max-width: 767px) {
        padding: 70px 0 76px;
    }
`;

const button = css`
    display: flex;
    align-items: center;
    background-color: var(--accentPrimary);
    border-radius: 12px;
    font-weight: 600;
    box-shadow: 0px 6px 17px rgba(36, 139, 242, 0.32);
    color: var(--foregroundContrast);

    will-change: color, background-color, box-shadow;
    transition: color 0.2s, background-color.2s, box-shadow 0.2s;

    &:hover,
    &:focus {
        color: var(--foregroundContrast);
        text-decoration: none;
        background: #47a3ff;
        box-shadow: 0px 6px 27px rgba(36, 139, 242, 0.32);
        transition: color 0.01s, background-color.01s, box-shadow 0.01s, transform 0.2s;
    }

    &:active {
        background: #1d84ec;
        transition: color 0.01s, background-color.01s, box-shadow 0.01s;
    }

    @media (min-width: 1600px) {
        font-size: 20px;
        padding: 16px 36px;
    }

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 15px;
        padding: 14px 32px;
    }

    @media (max-width: 767px) {
        font-size: 15px;
        padding: 14px 32px;
    }

    cursor: pointer;
`;

const content = css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 767px) {
        width: 600px;
        margin: 0 auto;
    }
`;

const subheading = css`
    font-size: 24px;
    line-height: 1.6;

    margin-bottom: 20px;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 20px;
    }
`;

const webApp = css`
    @media (max-width: 767px) {
        h2 { display: none; }
    }
`;

const desktopApp = css`
    @media (max-width: 959px) {
        display: none;
    }
`;

const mobileApp = css`
    @media (min-width: 768px) and (max-width: 959px) {
        width: 368px;
    }

    @media (max-width: 767px) {
        display: none;
    }
`;

const apps = css`
    display: flex;
    margin: -8px;
`;

const appButton = css`
    display: flex;
    align-items: center;
    border-radius: 12px;
    font-weight: 600;
    color: #50a2f5;
    background-color: rgba(36, 139, 242, 0.1);

    will-change: color, background-color, box-shadow;
    transition: color 0.2s, background-color.2s, box-shadow 0.2s;

    font-size: 0;

    &:hover,
    &:focus {
        transition: color 0.01s, background-color 0.01s;
        box-shadow: 0px 6px 27px rgba(36, 139, 242, 0.32);
        color: white;
        background-color: #47a3ff;
        text-decoration: none;
    }

    &:active {
        transition: color 0.01s, background-color 0.01s;
        color: white;
        background-color: #1d84ec;
    }

    @media (min-width: 1600px) {
        padding: 16px;
    }

    @media (min-width: 768px) and (max-width: 1599px) {
        padding: 11px;
    }

    @media (max-width: 767px) {
        padding: 11px;
    }

    margin: 8px;
`;

const appButtonActive = css`
    background-color: var(--accentPrimary);
    color: var(--foregroundContrast);

    will-change: color, background-color, box-shadow;
    transition: color 0.2s, background-color.2s, box-shadow 0.2s;
    box-shadow: 0px 6px 17px rgba(36, 139, 242, 0.32);

    &:hover,
    &:focus {
        color: var(--foregroundContrast);
        text-decoration: none;
        background: #47a3ff;
        box-shadow: 0px 6px 27px rgba(36, 139, 242, 0.32);
        transition: color 0.01s, background-color.01s, box-shadow 0.01s, transform 0.2s;
    }

    &:active {
        background: #1d84ec;
        transition: color 0.01s, background-color.01s, box-shadow 0.01s;
    }

    @media (min-width: 1600px) {
        font-size: 20px;
        padding: 16px 28px;
    }

    @media (min-width: 768px) and (max-width: 1599px) {
        padding: 11px 22px;
        font-size: 16px;
    }

    @media (max-width: 767px) {
        padding: 11px 32px;
        font-size: 16px;
    }

    & svg {
        margin-right: 8px;
    }

    order: -1;
`;

const appIcon = css`
    margin-right: 13px;
`;

const title = css`
    font-weight: 800;
    font-size: 36px;
    line-height: 40px;
    color: #272750;
    margin: 0 0 12px;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 32px;
        line-height: 40px;
        margin: 0 0 8px;
    }

    @media (max-width: 767px) {
        font-size: 24px;
        line-height: 40px;
        margin: 0;
    }
`;

const text = css`
    font-size: 24px;
    line-height: 36px;
    color: #525273;
    margin: 0 0 56px;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 22px;
        line-height: 32px;
        margin: 0 0 40px;
    }

    @media (max-width: 767px) {
        font-size: 18px;
        line-height: 28px;
        margin: 0 0 24px;
    }
`;

const link = css`
    display: inline-block;
    margin-left: 6px;
    font-weight: 600;
    color: #006FDE;

    @media (min-width: 768px) and (max-width: 1599px) {
        margin-left: 5px;
    }

    @media (min-width: 400px) and (max-width: 767px) {
        margin-left: 4px;
    }

    @media (max-width: 399px) {
        margin-left: 0;
        display: block;
    }

    span {
        opacity: 0.5;
    }
`;

export const HomeAppsMobile = React.memo(() => (
    <div className={apps}>
        <a
            className={cx(appButton, appButtonActive)}
            href={LandingLinks.apps.ios}
        >
            <img
                className={appIcon}
                src="/static/landing/icons/ic-ios.svg"
                width="24"
                height="24"
                alt=""
            />
                iOS
        </a>
        <a
            className={cx(appButton, appButtonActive)}
            href={LandingLinks.apps.android}
        >
            <img
                className={appIcon}
                src="/static/landing/icons/ic-android.svg"
                width="24"
                height="24"
                alt=""
            />
                Android
        </a>
    </div>
));

export const HomeApps = React.memo(() => {
    const os = detectOS() || 'Mac';

    return (
        <div className={box}>
            <Container>
                <div className={title}>Get your party started  🎉</div>
                <div className={text}>Join now and claim<span className={link}>openland.com/<span>name</span></span></div>
                <div className={content}>
                    <div className={webApp}>
                        <h2 className={subheading}>Web</h2>

                        <XView path={LandingLinks.signin}>
                            <span className={button}>Join Openland</span>
                        </XView>
                    </div>

                    <div className={desktopApp}>
                        <h2 className={subheading}>Desktop app</h2>
                        <div className={apps}>
                            <a
                                className={cx(appButton, os === 'Mac' && appButtonActive)}
                                href={LandingLinks.apps.macos}
                            >
                                <Mac />
                                Mac
                            </a>
                            <a
                                className={cx(appButton, os === 'Windows' && appButtonActive)}
                                href={LandingLinks.apps.windows}
                            >
                                <Windows />
                                Windows
                            </a>
                            <a
                                className={cx(appButton, os === 'Linux' && appButtonActive)}
                                href={LandingLinks.apps.linux}
                            >
                                <Linux />
                                Linux
                            </a>
                        </div>
                    </div>

                    <div className={mobileApp}>
                        <h2 className={subheading}>Mobile app</h2>
                        <HomeAppsMobile />
                    </div>
                </div>
            </Container>
        </div>
    );
});
