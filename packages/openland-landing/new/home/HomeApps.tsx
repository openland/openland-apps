import * as React from 'react';
import { css, cx } from 'linaria';
import { Container } from '../components/Container';
import Mac from './icons/ic-mac.svg';
import Windows from './icons/ic-win.svg';
import Linux from './icons/ic-linux.svg';
import { XView } from 'react-mental';
import { detectOS } from 'openland-x-utils/detectOS';
import { LandingLinks } from '../components/_links';
import { emojiAnimated } from 'openland-y-utils/emojiAnimated';

const box = css`
    padding: 100px 0 200px;

    @media (min-width: 768px) and (max-width: 1199px) {
        padding: 0 0 120px;
    }

    @media (max-width: 767px) {
        display: none;
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

    @media (min-width: 1200px) {
        font-size: 20px;
        padding: 16px 36px;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
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
    font-size: 32px;
    line-height: 36px;
    margin-bottom: 24px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 20px;
        line-height: 32px;
        margin: 0 0 16px;
    }
`;

const webApp = css`
    @media (max-width: 767px) {
        h2 { display: none; }
    }
`;

const desktopApp = css`
    @media (max-width: 1199px) {
        display: none;
    }
`;

const mobileApp = css`
    @media (min-width: 768px) and (max-width: 1199px) {
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

    @media (min-width: 1200px) {
        padding: 16px;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
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

    @media (min-width: 1200px) {
        font-size: 20px;
        padding: 16px 28px;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
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
    font-size: 62px;
    line-height: 64px;
    margin: 0 0 28px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 40px;
        line-height: 44px;
        margin: 0 0 4px;
    }

    @media (max-width: 767px) {
        font-size: 24px;
        line-height: 40px;
        margin: 0;
    }

    img {
        display: inline-block;
        vertical-align: top;
        width: 128px; height: 128px;
        margin: -48px 0 -16px 20px;

        @media (min-width: 768px) and (max-width: 1199px) {
            width: 80px; height: 80px;
            margin: -28px 0 -8px 10px;
        }
    }
`;

const text = css`
    font-size: 32px;
    line-height: 36px;
    margin: 0 0 86px;
    font-weight: 600;

    @media (min-width: 768px) and (max-width: 1199px) {
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
    color: var(--tintBlue);

    @media (min-width: 768px) and (max-width: 1199px) {
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
        opacity: 0.4;
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
                <div className={title}>Welcome aboard{emojiAnimated('🎉')}</div>
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
