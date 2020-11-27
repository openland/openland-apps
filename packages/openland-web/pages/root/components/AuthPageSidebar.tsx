import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import Logo from 'openland-unicorn/components/Logo';
import IcArrow from 'openland-icons/s/ic-chevron-16.svg';
import IcIos from 'openland-icons/s/ic-appstore-24.svg';
import IcAndroid from 'openland-icons/s/ic-googleplay-24.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import { detectOS } from 'openland-x-utils/detectOS';
import { useTheme } from 'openland-x-utils/useTheme';
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
    background-color: var(--backgroundTertiaryTrans);
    border-radius: 8px;
    margin-bottom: 17px;
    cursor: pointer;
    padding: 8px 0 8px 16px;
    color: var(--foregroundSecondary);
    transition: all 0.15s ease;
    &:hover {
        text-decoration: none;
        color: var(--foregroundSecondary);
        background-color: var(--backgroundTertiaryHoverTrans);
    }

    &:last-of-type {
        margin-bottom: 31px;
    }
`;

const buttonIcon = css`
    width: 24px;
    height: 24px;
    opacity: 0.72;
    & path {
        fill: var(--foregroundSecondary);
    }
`;

const buttonTextContainer = css`
    margin-left: 16px;
    display: flex;
    flex-direction: column;
`;

const buttonNounContainer = css`
    font-size: 13px;
    line-height: 18px;
`;

const buttonTitleContainer = css`
    font-weight: 600;
    font-size: 15px;
    line-height: 24px;
    margin-top: -3px;
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
        href={props.ios ? 'https://oplnd.com/ios' : 'https://oplnd.com/android'}
        onClick={() =>
            props.analyticsEvent &&
            trackEvent(props.analyticsEvent.name, props.analyticsEvent.params)
        }
    >
        {props.ios ? <IcIos className={buttonIcon} /> : <IcAndroid className={buttonIcon} />}
        <div className={buttonTextContainer}>
            <div className={buttonNounContainer}>{props.ios ? 'Download on the' : 'Get it on'}</div>
            <div className={buttonTitleContainer}>{props.ios ? 'App Store' : 'Google Play'}</div>
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
            <div className={cx(logoSubtitle, TextBody)}>
                The best place to find and build inspiring communities
            </div>
            <DownloadButton
                ios={true}
                analyticsEvent={{ name: 'app_download_action', params: { os: 'ios' } }}
            />
            <DownloadButton
                analyticsEvent={{ name: 'app_download_action', params: { os: 'android' } }}
            />
        </div>
    );
});

const mobileHeaderContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 6px 15px;
    flex-shrink: 0;
    align-self: stretch;
`;

export const MobileSidebar = React.memo(() => {
    const theme = useTheme();
    const os = detectOS();
    let path = 'https://oplnd.com/ios';
    if (os === 'Android') {
        path = 'https://oplnd.com/android';
    }
    return (
        <div className={mobileHeaderContainer}>
            {theme.theme === 'dark' ? (
                <img src="/static/landing/logo-light.svg" width={130} height={44} />
            ) : (
                <img src="/static/landing/logo.svg" width={130} height={44} />
            )}
            <UButton
                text="Install the app"
                size="small"
                style="secondary"
                marginBottom={-4}
                href={path}
                hoverTextDecoration="none"
                target="_blank"
                as="a"
            />
        </div>
    );
});