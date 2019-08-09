import * as React from 'react';
import { css, cx } from 'linaria';
import IcClose from '../openland-icons/s/ic-close-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import { defaultHover } from 'openland-web/utils/Styles';
import { AppNotifications } from 'openland-y-runtime-web/AppNotifications';
import { useLayout } from './components/utils/LayoutContext';
import { isElectron } from 'openland-y-utils/isElectron';
import { detectOS } from 'openland-x-utils/detectOS';

const bannerContainetClass = css`
    display: flex;
    height: 48px;
    background-color: #1885F2;
    
    justify-content: center;
`;

const iconContainetClass = css`
    position: absolute;
    top: 0;
    right: 0;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const bannerTextClass = css`
    color: #fff;
`;

const bannerButton = css`
    & > a > div {
        background-color: rgba(255,255,255, 0.16);
        :hover{
            background-color: rgba(255,255,255, 0.24);
        }
    }
    & > a  {
        text-decoration: none;
    }
    margin-left: 8px;
`;

const buttonsContainer = css`
    display: flex;
    flex-direction: 'row';

`;

const bannerContentWrapper = css`
    align-self: stretch;
    flex-grow: 1;
    display: flex;
    flex-direction: 'row';
    align-items: center;
    max-width: 592px;
`;

const bannerMobileApps = css`
    display: flex;
    flex-direction: 'row';
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
`;

const bannerNotification = css`
    display: flex;
    flex-direction: 'row';
    align-items: center;
    justify-content: center;
`;

const BannerContainer = (props: { onClosePress?: () => void, children?: any }) => {
    return (
        <div className={bannerContainetClass}>
            <div className={bannerContentWrapper}>
                {props.children}
            </div>
            <div onClick={props.onClosePress} className={cx(iconContainetClass, defaultHover)}>
                <UIcon color="#fff" icon={<IcClose />} />
            </div>
        </div>
    );
};

const links = {
    'Mac': 'https://oplnd.com/mac',
    'Windows': 'https://oplnd.com/windows',
    'Linux': 'https://oplnd.com/linux'
};
let useMobileAppsBanner = () => {
    let [show, setShow] = React.useState(!window.localStorage.getItem('banner-apps-closed'));
    let onClose = React.useCallback(() => {
        window.localStorage.setItem('banner-apps-closed', 'true');
        setShow(false);
    }, []);
    let os = detectOS() || 'none';

    let content = (
        <div className={bannerMobileApps}>
            <span className={cx(TextLabel1, bannerTextClass)}>Install app</span>
            <div className={buttonsContainer}>
                <div className={bannerButton}>
                    <UButton color="rgba(255,255,255, 0.16)" text="Get iOS app" target="_blank" href="https://oplnd.com/ios" as="a" />
                </div>
                <div className={bannerButton}>
                    <UButton color="rgba(255,255,255, 0.16)" text="Get Android app" target="_blank" href="https://oplnd.com/android" as="a" />
                </div>
                {(['Mac', 'Windows', 'Linux'].includes(os)) && <div className={bannerButton}>
                    <UButton color="rgba(255,255,255, 0.16)" text="Get Desktop app" target="_blank" href={links[os]} as="a" />
                </div>}

            </div>
        </div>
    );
    return { show, onClose, content };
};

let useNotificationsBanner = () => {
    let [ttl, setTTL] = React.useState(Number.parseInt(window.localStorage.getItem('banner-notifications-closed-ttl') || '0', 10));
    let [permissionState, setPermissionNeeded] = React.useState(AppNotifications.state);
    React.useEffect(() => {
        AppNotifications.watch(s => {
            console.warn('boom!', s);
            setPermissionNeeded(s);
        });
    }, []);
    let onPress = React.useCallback(() => {
        AppNotifications.requestPermission();

    }, []);

    let onClose = React.useCallback(() => {
        let newttl = new Date().getTime() + 1000 * 60 * 60 * 24 * 30; // ask again after 30d
        window.localStorage.setItem('banner-notifications-closed-ttl', newttl + '');
        setTTL(newttl);
    }, []);

    let content = (
        <div className={bannerNotification}>
            <span className={cx(TextLabel1, bannerTextClass)}>Openland needs your permission <span onClick={onPress} style={{ textDecoration: 'underline', cursor: 'pointer' }}>to enable desktop notifications</span> </span>
        </div>
    );
    let ttlOK = ttl <= new Date().getTime();
    let show = ttlOK && (permissionState === 'temporary_denied' || permissionState === 'default');
    return { show, onClose, content };
};

export const Banners = () => {
    let layout = useLayout();
    let banners = [useNotificationsBanner(), useMobileAppsBanner()];

    let content, onClose;
    for (let b of banners) {
        if (b.show) {
            content = b.content;
            onClose = b.onClose;
            break;
        }
    }

    if (content && (layout === 'desktop') && !isElectron) {
        return <BannerContainer onClosePress={onClose}>{content}</BannerContainer>;
    }
    return null;
};