import * as React from 'react';
import { css, cx } from 'linaria';
import IcClose from '../openland-icons/s/ic-close-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { TextLabel3, TextTitle3 } from 'openland-web/utils/TextStyles';
import { AppNotifications } from 'openland-y-runtime-web/AppNotifications';
import { useLayout } from './components/utils/LayoutContext';
import { isElectron } from 'openland-y-utils/isElectron';
import { detectOS, OS } from 'openland-x-utils/detectOS';
import { trackEvent } from 'openland-x-analytics';
import IcIos from 'openland-icons/s/ic-apple-16.svg';
import IcAndroid from 'openland-icons/s/ic-android-16.svg';
import IcWin from 'openland-icons/s/ic-win-16.svg';
import IcMac from 'openland-icons/s/ic-mac-16.svg';
import IcLinux from 'openland-icons/s/ic-linux-16.svg';
import { getConfig } from 'openland-web/config';
import { delayBreakable } from 'openland-y-utils/timer';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';

const bannerContainerClass = css`
    right: 16px;
    top: 0;
    padding: 16px 0 0 0;
    z-index: 10;
    position: absolute;
`;

const bannerCloseClass = css`
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const bannerTextClass = css`
    color: var(--foregroundPrimary);
    margin-bottom: 12px;
`;

const bannerButton = css`
    & + & {
        margin-left: 8px
    }
`;

const buttonsContainer = css`
    display: flex;
    flex-direction: row;
`;

const bannerContentWrapper = css`
    width: 400px;
    box-shadow: var(--boxShadowPopper);
    border-radius: 12px;
    background-color: var(--backgroundSecondary);
    padding: 20px 24px;
    position: relative;
`;

const BannerContainer = (props: { onClosePress?: () => void; banner?: any }) => {
    return (
        <div className={bannerContainerClass}>
            <div className={bannerContentWrapper}>
                <div className={bannerCloseClass}>
                    <UIconButton size="xsmall" icon={<IcClose />} color="var(--foregroundTertiary)" onClick={props.onClosePress} />
                </div>
                {props.banner}
            </div>
        </div>
    );
};

const bannerButtonContainer = css`
    text-decoration: none!important;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 32px;
    border-radius: 32px;
    padding: 6px 16px;
    color: var(--foregroundSecondary)!important;
    background-color: var(--backgroundTertiaryTrans);

    &:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }
    &:active {
        background-color: var(--backgroundTertiaryActiveTrans);
    }
    &:focus {
        background-color: var(--backgroundTertiaryActiveTrans);
    }

    & > div {
        margin-right: 8px;
    }
`;

const BannerButton = (props: {
    text: string;
    icon?: JSX.Element;
    onClick?: () => void;
    href?: string;
}) => (
        <a
            target={props.href ? '_blank' : undefined}
            href={props.href}
            className={bannerButtonContainer}
            onClick={props.onClick}
        >
            {props.icon && <UIcon icon={props.icon} color="var(--foregroundSecondary)" />}
            <span className={TextLabel3}>{props.text}</span>
        </a>
    );

const links = {
    Mac: 'https://oplnd.com/mac',
    Windows: 'https://oplnd.com/windows',
    Linux: 'https://oplnd.com/linux',
};

const icons = {
    Mac: <IcMac />,
    Windows: <IcWin />,
    Linux: <IcLinux />,
};

const MobileAppsBanner = () => {
    React.useEffect(() => {
        trackEvent('banner_app_appear');
    }, []);
    let os = detectOS();

    let onAppClick = React.useCallback((selectedOS: OS) => {
        const platform = ['iOS', 'Android'].includes(selectedOS) ? 'mobile' : 'desktop';

        trackEvent('banner_app_download_action', {
            os: selectedOS.toLowerCase(),
            app_platform: platform,
        });
    }, []);

    return (
        <div>
            <div className={cx(TextTitle3, bannerTextClass)}>Install Openland apps</div>
            <div className={buttonsContainer}>
                {os &&
                    ['Mac', 'Windows', 'Linux'].includes(os) && (
                        <div className={bannerButton}>
                            <BannerButton
                                text={os}
                                href={links[os]}
                                onClick={() => onAppClick(os!)}
                                icon={icons[os]}
                            />
                        </div>
                    )}
                <div className={bannerButton}>
                    <BannerButton
                        text="iOS"
                        href="https://oplnd.com/ios"
                        onClick={() => onAppClick('iOS')}
                        icon={<IcIos />}
                    />
                </div>
                <div className={bannerButton}>
                    <BannerButton
                        text="Android"
                        href="https://oplnd.com/android"
                        onClick={() => onAppClick('Android')}
                        icon={<IcAndroid />}
                    />
                </div>
            </div>
        </div>
    );
};

interface Banner {
    show: boolean;
    onClose: () => void;
    BannerComponent: () => JSX.Element;
    electronEnabled?: boolean;
}

let useMobileAppsBanner = () => {
    let [show, setShow] = React.useState(!window.localStorage.getItem('banner-apps-closed'));

    let onClose = React.useCallback(() => {
        window.localStorage.setItem('banner-apps-closed', 'true');
        trackEvent('banner_app_close');
        setShow(false);
    }, []);

    return { show, onClose, BannerComponent: MobileAppsBanner };
};

const NotificationsBanner = () => {
    React.useEffect(() => {
        trackEvent('banner_notifications_appear');
    }, []);
    let onPress = React.useCallback(() => {
        AppNotifications.requestPermission();
        trackEvent('banner_notifications_allow');
    }, []);

    return (
        <div>
            <div className={cx(TextTitle3, bannerTextClass)}>Get Openland notifications</div>
            <div className={buttonsContainer}>
                <BannerButton text="Turn on" onClick={onPress} />
            </div>
        </div>
    );
};

let useNotificationsBanner = () => {
    let [ttl, setTTL] = React.useState(
        Number.parseInt(window.localStorage.getItem('banner-notifications-closed-ttl') || '0', 10),
    );
    let [permissionState, setPermissionNeeded] = React.useState(AppNotifications.state);
    React.useEffect(() => {
        AppNotifications.watch(s => {
            setPermissionNeeded(s);
        });
    }, []);

    let onClose = React.useCallback(() => {
        let newttl = new Date().getTime() + 1000 * 60 * 60 * 24 * 30; // ask again after 30d
        window.localStorage.setItem('banner-notifications-closed-ttl', newttl + '');
        setTTL(newttl);
        trackEvent('banner_notifications_close');
    }, []);

    let ttlOK = ttl <= new Date().getTime();
    let show = ttlOK && (permissionState === 'temporary_denied' || permissionState === 'default');

    return { show, onClose, BannerComponent: NotificationsBanner };
};

const UpdateBanner = () => {
    React.useEffect(() => {
        trackEvent('banner_update_appear');
    }, []);
    let onPress = React.useCallback(() => {
        trackEvent('banner_update_action');
        location.reload();
    }, []);

    return (
        <div>
            <div className={cx(TextTitle3, bannerTextClass)}>A new version of Openland is available</div>
            <div className={buttonsContainer}>
                <BannerButton text={isElectron ? 'Update' : 'Refresh'} onClick={onPress} />
            </div>
        </div>
    );
};

let useUpdateBanner = () => {
    let [show, setShow] = React.useState(false);
    let onClose = React.useCallback(() => {
        trackEvent('banner_update_close');
        setShow(false);
    }, []);
    React.useEffect(() => {
        let lastStableVersion = getConfig().release || '';
        // console.log('update-banner: initial version', lastStableVersion);
        let run = true;
        let breaker: (() => void) | null = null;

        const queryVersion = async () => await (await fetch('/_internal/version', { cache: 'no-store' })).text();

        const worker = async () => {
            while (run) {
                let delay = delayBreakable(15000);
                breaker = delay.resolver;
                await delay.promise;
                breaker = null;
                if (!run) {
                    break;
                }
                const newVersion = await queryVersion();
                // console.log('update-banner: new version', newVersion, 'old version', lastStableVersion, 'neq', newVersion !== lastStableVersion);
                if (newVersion !== lastStableVersion) {
                    // console.log('update-banner: recheck delay');
                    delay = delayBreakable(60000);
                    breaker = delay.resolver;
                    await delay.promise;
                    breaker = null;
                    // console.log('update-banner: rechecking', newVersion);
                    if (await queryVersion() === newVersion && run) {
                        // console.log('update-banner: recheck successful');
                        if (!(lastStableVersion === 'development' && newVersion === 'unknown')) {
                            setShow(true);
                        }
                        lastStableVersion = newVersion;
                    }
                }
            }
        };

        worker();

        return () => {
            run = false;
            if (breaker) {
                breaker();
            }
        };
    }, []);

    return { show, onClose, BannerComponent: UpdateBanner, electronEnabled: true };
};

export const Banners = () => {
    let layout = useLayout();
    let banners: Banner[] = [useNotificationsBanner(), useMobileAppsBanner(), useUpdateBanner()];

    let BannerComponent, onClose;
    for (let b of banners) {
        if (b.show && (!isElectron || b.electronEnabled)) {
            BannerComponent = b.BannerComponent;
            onClose = b.onClose;
            break;
        }
    }

    if (BannerComponent && layout === 'desktop') {
        return <BannerContainer onClosePress={onClose} banner={<BannerComponent />} />;
    }
    return null;
};
