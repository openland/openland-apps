import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import Logo from 'openland-unicorn/components/Logo';
import IcArrow from 'openland-icons/s/ic-chevron-16.svg';
import IcIos from 'openland-icons/s/ic-appstore-24.svg';
import IcAndroid from 'openland-icons/s/ic-googleplay-24.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import {
    TextTitle1,
    TextBody,
    TextCaption,
    TextLabel1,
    TextLabel2,
} from 'openland-web/utils/TextStyles';
import { getAppLink, detectOS } from 'openland-x-utils/detectOS';
import { trackEvent } from 'openland-x-analytics';

const sidebarContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--backgroundTertiary);
    padding: 112px 0;
    user-select: none;
    width: 424px;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 1px;
        opacity: 0.56;
        background-color: var(--border);
    }
`;

const logoContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const logoTitleContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
    margin: 16px -24px 0 0;
`;

const logoTitle = css`
    color: var(--foregroundPrimary);
    margin-right: 8px;
`;

const logoSubtitle = css`
    text-align: center;
    max-width: 230px;
    align-self: center;
    color: var(--foregroundSecondary);
    margin: 7px 0 33px;
    flex-shrink: 0;
`;

const logoStyle = css`
    width: 96px;
    height: 96px;
`;

const buttonContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
    width: 200px;
    background-color: var(--foregroundPrimary);
    border-radius: 8px;
    margin-bottom: 17px;
    cursor: pointer;
    padding: 8px 0 8px 16px;
    color: var(--foregroundInverted);
    transition: all 0.15s ease;
    &:hover {
        text-decoration: none;
        color: var(--foregroundInverted);
    }

    &:last-of-type {
        margin-bottom: 32px;
    }
`;

const buttonIcon = css`
    flex-grow: 0;
`;

const buttonTextContainer = css`
    margin-left: 16px;
    display: flex;
    flex-direction: column;
`;

const buttonTitleContainer = css`
    margin-top: -3px;
`;

const desktopLinks = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    & > a {
        color: var(--foregroundSecondary);
        &:hover {
            color: var(--foregroundSecondary);
            text-decoration: none;
        }
    }
    & > .dot {
        width: 3px;
        height: 3px;
        border-radius: 3px;
        background-color: var(--foregroundTertiary);
        opacity: 0.5;
        margin: 0 12px;
    }
`;

interface DownloadButtonProps {
    ios?: boolean;
    analyticsEvent?: {
        name: string;
        params: object;
    };
}

const DownloadButton = (props: DownloadButtonProps) => (
    <a
        className={buttonContainer}
        target="_blank"
        href={props.ios ? getAppLink('iOS') : getAppLink('Android')}
        onClick={() =>
            props.analyticsEvent &&
            trackEvent(props.analyticsEvent.name, props.analyticsEvent.params)
        }
    >
        <UIcon
            icon={props.ios ? <IcIos /> : <IcAndroid />}
            size={24}
            color="var(--foregroundInverted)"
            className={buttonIcon}
        />
        <div className={buttonTextContainer}>
            <div className={TextCaption}>{props.ios ? 'Download on the' : 'Get it on'}</div>
            <div className={cx(buttonTitleContainer, TextLabel1)}>
                {props.ios ? 'App Store' : 'Google Play'}
            </div>
        </div>
    </a>
);

export const DesktopSidebar = React.memo((props: { className?: string }) => {
    return (
        <div className={cx(sidebarContainer, props.className)}>
            <XView path={'/'} hoverTextDecoration="none" cursor="pointer">
                <div className={logoContainer}>
                    <Logo className={logoStyle} />
                    <div className={logoTitleContainer}>
                        <div className={cx(logoTitle, TextTitle1)}>Openland</div>
                        <UIcon icon={<IcArrow />} color="var(--foregroundTertiary)" />
                    </div>
                </div>
            </XView>
            <div className={cx(logoSubtitle, TextBody)}>Voice chats for everyone</div>
            <DownloadButton
                ios={true}
                analyticsEvent={{ name: 'app_download_action', params: { os: 'ios' } }}
            />
            <DownloadButton
                analyticsEvent={{ name: 'app_download_action', params: { os: 'android' } }}
            />
            <div className={desktopLinks}>
                <a href={getAppLink('Mac')} target="_blank" className={TextLabel1}>
                    Mac
                </a>
                <div className="dot" />
                <a href={getAppLink('Windows')} target="_blank" className={TextLabel1}>
                    Windows
                </a>
                <div className="dot" />
                <a href={getAppLink('Linux')} target="_blank" className={TextLabel1}>
                    Linux
                </a>
            </div>
        </div>
    );
});

const mobileHeaderContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    flex-shrink: 0;
    align-self: stretch;
    background-color: var(--tintBlue);
    color: #fff;
    & > img {
        flex-shrink: 0;
    }
`;

const mobileHeaderContent = css`
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const linkStyle = css`
    padding: 6px 16px;
    background: rgba(255, 255, 255, 0.24);
    border-radius: 100px;
    margin-top: 8px;
    color: #fff;
    &:hover {
        color: #fff;
        text-decoration: none;
    }
`;

export const MobileSidebar = React.memo(() => {
    const os = detectOS();
    return (
        <div className={mobileHeaderContainer}>
            <img
                src="https://cdn.openland.com/shared/ic/ic-ios.png"
                srcSet="https://cdn.openland.com/shared/ic/ic-ios@2x.png 2x"
                alt=""
                width={64}
                height={64}
            />
            <div className={mobileHeaderContent}>
                <div className={cx(TextLabel1)}>Don’t have Openland yet?</div>
                <a
                    className={cx(linkStyle, TextLabel2)}
                    target="_blank"
                    href={getAppLink(os || 'iOS')}
                >
                    Install app
                </a>
            </div>
        </div>
    );
});
