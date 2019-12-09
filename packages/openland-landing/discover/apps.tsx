import * as React from 'react';
import { css, cx } from 'linaria';
import Block from '../next/block';

// @ts-ignore
import { ReactComponent as Mac } from './icons/ic-mac.svg';
// @ts-ignore
import { ReactComponent as Windows } from './icons/ic-win.svg';
// @ts-ignore
import { ReactComponent as Linux } from './icons/ic-linux.svg';

const root = css`
    display: none;
    @media (min-width: 769px) {
        display: block;
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

    @media (min-width: 768px) and (max-width: 1600px) {
        font-size: 15px;
        padding: 14px 32px;
    }

    @media (max-width: 768px) {
        font-size: 15px;
        padding: 14px 32px;
    }
`;

const ctaSmall = css`
    position: relative;
    margin-top: 150px;
    margin-bottom: 130px;
`;

const content = css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 960px) {
        width: 600px;
    }
`;

const dotsLeftSmall = css`
    width: 10000px;
    height: 115px;

    background: url('https://cdn.openland.com/shared/landing/dot-left.svg');

    position: absolute;
    top: 65%;
    transform: translateY(-50%);

    @media (min-width: 1600px) {
        left: -10116px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        left: -10116px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        display: none;
    }
`;

const dotsRightSmall = css`
    width: 9999px;
    height: 115px;

    background: url('https://cdn.openland.com/shared/landing/dot-right.svg');

    position: absolute;
    top: 65%;
    transform: translateY(-50%);

    @media (min-width: 1600px) {
        right: -10116px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        right: -10116px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        display: none;
    }
`;

const webApp = css``;

const subheading = css`
    font-size: 20px;
    line-height: 1.6;

    margin-bottom: 16px;
`;

const desktopApp = css`
    @media (max-width: 960px) {
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

    @media (min-width: 768px) and (max-width: 1600px) {
        padding: 11px;
    }

    @media (max-width: 768px) {
        padding: 11px;
    }

    margin: 8px;
`;

const appButtonActive = css`
    background-color: var(--accentPrimary);
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
        padding: 16px 27px;
    }

    @media (min-width: 768px) and (max-width: 1600px) {
        padding: 11px 32px;
        font-size: 16px;
    }

    @media (max-width: 768px) {
        padding: 11px 32px;
        font-size: 16px;
    }

    & svg {
        margin-right: 8px;
    }

    order: -1;
`;

const mobileApp = css``;

const appIcon = css`
    margin-right: 8px;
`;

const getOS = () => {
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'darwin'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

    if (macosPlatforms.includes(platform)) {
        return 'mac';
    } else if (windowsPlatforms.includes(platform)) {
        return 'windows';
    } else {
        return 'linux';
    }
};

export default () => {
    const os = getOS();
    return (
        <div className={root}>
            <Block>
                <div className={ctaSmall}>
                    <div className={dotsLeftSmall} />
                    <div className={content}>
                        <div className={webApp}>
                            <h2 className={subheading}>Web app</h2>
                            <a className={button} href="invite/h2BGtL">
                                Join Openland
                            </a>
                        </div>

                        <div className={desktopApp}>
                            <h2 className={subheading}>Desktop app</h2>
                            <div className={apps}>
                                <a
                                    className={cx(appButton, os === 'mac' && appButtonActive)}
                                    href="https://oplnd.com/mac"
                                >
                                    <Mac />
                                    Mac
                                </a>
                                <a
                                    className={cx(appButton, os === 'windows' && appButtonActive)}
                                    href="https://oplnd.com/windows"
                                >
                                    <Windows />
                                    Windows
                                </a>
                                <a
                                    className={cx(appButton, os === 'linux' && appButtonActive)}
                                    href="https://oplnd.com/linux"
                                >
                                    <Linux />
                                    Linux
                                </a>
                            </div>
                        </div>

                        <div className={mobileApp}>
                            <h2 className={subheading}>Mobile app</h2>
                            <div className={apps}>
                                <a
                                    className={cx(appButton, appButtonActive)}
                                    href="https://oplnd.com/ios"
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
                                    href="https://oplnd.com/android"
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
                        </div>
                    </div>
                    <div className={dotsRightSmall} />
                </div>
            </Block>
        </div>
    );
};
