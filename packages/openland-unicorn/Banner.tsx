import * as React from 'react';
import { css, cx } from 'linaria';
import IcClose from '../openland-icons/s/ic-close-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { TextLabel1, TextLabel2 } from 'openland-web/utils/TextStyles';
import { defaultHover } from 'openland-web/utils/Styles';
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

const bannerContainetClass = css`
    display: flex;
    height: 56px;
    background-color: #1885f2;
    justify-content: center;
`;

const iconContainetClass = css`
    position: absolute;
    top: 0;
    right: 0;
    width: 56px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const bannerTextClass = css`
    color: #fff;
    margin-right: 12px;
`;

const bannerButton = css`
    margin-right: 12px;
`;

const buttonsContainer = css`
    display: flex;
    flex-direction: row;
`;

const bannerContentWrapper = css`
    align-self: stretch;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    max-width: 592px;
`;

const bannerMobileApps = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
`;

const bannerNotification = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const bannerUpdate = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const BannerContainer = (props: { onClosePress?: () => void; banner?: any }) => {
    return (
        <div className={bannerContainetClass}>
            <div className={bannerContentWrapper}>{props.banner}</div>
            <div onClick={props.onClosePress} className={cx(iconContainetClass, defaultHover)}>
                <UIcon color="#fff" icon={<IcClose />} />
            </div>
        </div>
    );
};

const bannerButtonContainer = css`
    background-color: #009afb;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 32px;
    color: #fff;
    border-radius: 100px;
    padding: 8px 16px;
    & > div {
        margin-right: 8px;
    }
    &:hover {
        text-decoration: none;
        color: #fff;
        background-color: var(--accentPrimaryHover);
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
            {props.icon && <UIcon icon={props.icon} color="#DDEFFE" />}
            <span className={TextLabel2}>{props.text}</span>
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
        <div className={bannerMobileApps}>
            <span className={cx(TextLabel1, bannerTextClass)}>Install Openland apps</span>
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
                <BannerButton
                    text="Android"
                    href="https://oplnd.com/android"
                    onClick={() => onAppClick('Android')}
                    icon={<IcAndroid />}
                />
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
        <div className={bannerNotification}>
            <div className={cx(TextLabel1, bannerTextClass)}>Get Openland notifications</div>
            <BannerButton text="Turn on" onClick={onPress} />
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
        <div className={bannerUpdate}>
            <div className={cx(TextLabel1, bannerTextClass)}>A new version of Openland is available</div>
            <BannerButton text={isElectron ? 'Update' : 'Refresh'} onClick={onPress} />
        </div>
    );
};

const queryVersion = async () => await (await fetch('/_internal/version')).text();

let useUpdateBanner = () => {
    let [show, setShow] = React.useState(false);
    let onClose = React.useCallback(() => {
        trackEvent('banner_update_close');
        setShow(false);
    }, []);
    React.useEffect(() => {
        const checkVersion = async () => {
            let ignoreVersions = [await queryVersion()]; // ignore current version
            let timeout: any = undefined;
            setInterval(async () => {
                const newVersion = await queryVersion();
                if (!ignoreVersions.includes(newVersion)) {
                    ignoreVersions.push(newVersion);
                    if (timeout !== undefined) {
                        clearTimeout(timeout);
                    }
                    timeout = setTimeout(async () => {
                        timeout = undefined;
                        setShow(true);
                    }, 60000);
                }
            }, 15000);
        };

        checkVersion();
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
