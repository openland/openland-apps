import * as React from 'react';
import { css, cx } from 'linaria';
import { TextTitle1, TextLabel1, TextBody } from 'openland-web/utils/TextStyles';
import { defaultHover } from 'openland-web/utils/Styles';
import { detectOS, OS } from 'openland-x-utils/detectOS';
import { trackEvent } from 'openland-x-analytics';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import IcIos from 'openland-icons/ic-app-ios.svg';
import IcAndroid from 'openland-icons/ic-app-android.svg';
import IcMac from 'openland-icons/ic-app-mac.svg';
import IcWin from 'openland-icons/ic-app-win.svg';
import IcLinux from 'openland-icons/ic-app-linux.svg';

const containerClass = css`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const contentClass = css`
    padding-top: 30px;
    padding-bottom: 30px;
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const titleClass = css`
    color: var(--foregroundPrimary);
    margin-bottom: 8px;
    flex-shrink: 0;
    text-align: center;
`;

const subtitleClass = css`
    color: var(--foregroundSecondary);
    margin-bottom: 48px;
    flex-shrink: 0;
    text-align: center;
`;

const appsContainer = css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    & > div:first-child {
        margin-right: 8px;
    }
    & > div:last-child {
        margin-left: 8px;
    }
    @media (max-width: 1100px) {
        flex-direction: column;
        & > div:first-child {
            margin-right: 0;
            margin-bottom: 48px;
        }
        & > div:last-child {
            margin-left: 0;
        }
    }
`;

const appsContent = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const buttonsContent = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    & > div:first-child {
        margin-right: 10px;
    }
    & > div:last-child {
        margin-left: 10px;
    }
`;

const linksContent = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    margin-top: 16px;
`;

const linksSeparator = css`
    margin: 0 13px;
    width: 3px;
    height: 3px;
    border-radius: 3px;
    flex-shrink: 0;
    background-color: var(--foregroundQuaternary);
`;

const secondaryOsLink = css`
    cursor: pointer;
    color: var(--foregroundSecondary);
`;

const buttonContainer = css`
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transition: color 0.08s ease-in, all 0.15s ease;
    color: var(--foregroundContrast);
    background-color: var(--accentPrimary);
    border-radius: 8px;
    height: 40px;
    padding: 10px 24px;
    & > svg {
        margin-right: 12px;
        width: 24px;
        path {
            fill: var(--foregroundContrast);
        }
    }
    &:hover {
        background-color: var(--accentPrimaryHover);
    }
`;

const imgClass = css`
    margin-bottom: 32px;
    flex-shrink: 0;
    user-select: none;
    pointer-events: none;
`;

interface ButtonProps {
    title: string;
    icon: JSX.Element;
    onClick: () => void;
}

const Button = React.memo((props: ButtonProps) => {
    return (
        <div className={buttonContainer} onClick={props.onClick}>
            {props.icon}
            <div className={TextLabel1}>{props.title}</div>
        </div>
    );
});

export const DownloadAppsComponent = React.memo(() => {
    const os = detectOS();

    // https://oplnd.com/ios
    // https://oplnd.com/android
    // https://oplnd.com/mac
    // https://oplnd.com/windows
    // https://oplnd.com/linux

    const onAppClick = React.useCallback((selectedOS: OS, path: string) => {
        const platform = ['iOS', 'Android'].includes(selectedOS) ? 'mobile' : 'desktop';

        trackEvent('app_download_action', {
            os: selectedOS.toLowerCase(),
            app_platform: platform,
        });
        window.open(path, '_blank');
    }, []);

    let activeOsIcon = <IcMac />;
    let activeOsTitle = 'Mac';
    let activeOsOnClick = () => onAppClick('Mac', 'https://oplnd.com/mac');

    let secondaryLeftLinkTitle = 'Windows';
    let secondaryLeftLinkOnClick = () => onAppClick('Mac', 'https://oplnd.com/windows');
    let secondaryRightLinkTitle = 'Linux';
    let secondaryRightLinkOnClick = () => onAppClick('Mac', 'https://oplnd.com/linux');

    if (os === 'Windows') {
        activeOsIcon = <IcWin />;
        activeOsTitle = 'Windows';
        activeOsOnClick = () => onAppClick('Mac', 'https://oplnd.com/windows');
        secondaryLeftLinkTitle = 'Mac';
        secondaryLeftLinkOnClick = () => onAppClick('Mac', 'https://oplnd.com/mac');
        secondaryRightLinkTitle = 'Linux';
        secondaryRightLinkOnClick = () => onAppClick('Mac', 'https://oplnd.com/linux');
    }
    if (os === 'Linux') {
        activeOsIcon = <IcLinux />;
        activeOsTitle = 'Linux';
        activeOsOnClick = () => onAppClick('Mac', 'https://oplnd.com/linux');
        secondaryLeftLinkTitle = 'Mac';
        secondaryLeftLinkOnClick = () => onAppClick('Mac', 'https://oplnd.com/mac');
        secondaryRightLinkTitle = 'Windows';
        secondaryRightLinkOnClick = () => onAppClick('Mac', 'https://oplnd.com/windows');
    }

    return (
        <div className={containerClass}>
            <div className={contentClass}>
                <div className={cx(TextTitle1, titleClass)}>Install Openland apps</div>
                <div className={cx(TextBody, subtitleClass)}>
                    Get our fastest experience and never miss a message
                </div>
                <div className={cx(appsContainer)}>
                    <div className={appsContent}>
                        <img
                            className={imgClass}
                            src="/static/nativeApps/ic-mobile.png"
                            srcSet="/static/nativeApps/ic-mobile@2x.png 2x"
                        />
                        <div className={buttonsContent}>
                            <Button
                                onClick={() => onAppClick('iOS', 'https://oplnd.com/ios')}
                                icon={<IcIos />}
                                title="iOS"
                            />
                            <Button
                                onClick={() => onAppClick('iOS', 'https://oplnd.com/android')}
                                icon={<IcAndroid />}
                                title="Android"
                            />
                        </div>
                    </div>
                    <div className={appsContent}>
                        <img
                            className={imgClass}
                            src="/static/nativeApps/ic-desktop.png"
                            srcSet="/static/nativeApps/ic-desktop@2x.png 2x"
                        />
                        <Button
                            onClick={activeOsOnClick}
                            icon={activeOsIcon}
                            title={activeOsTitle}
                        />
                        <div className={linksContent}>
                            <div
                                className={cx(secondaryOsLink, TextLabel1, defaultHover)}
                                onClick={secondaryLeftLinkOnClick}
                            >
                                {secondaryLeftLinkTitle}
                            </div>
                            <div className={linksSeparator} />
                            <div
                                className={cx(secondaryOsLink, TextLabel1, defaultHover)}
                                onClick={secondaryRightLinkOnClick}
                            >
                                {secondaryRightLinkTitle}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export const DownloadAppsFragment = React.memo(() => (
    <Page track="account_apps" scroll="enable" appearance="fullwidth" flexGrow={1}>
        <UHeader documentTitle="Download apps" />
        <DownloadAppsComponent />
    </Page>
));
