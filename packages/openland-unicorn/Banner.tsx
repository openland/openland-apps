import * as React from 'react';
import { css, cx } from 'linaria';
import IcClose from '../openland-icons/s/ic-close-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import { defaultHover } from 'openland-web/utils/Styles';

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
    justify-content: space-between;
    align-items: center;
    max-width: 592px;
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

let useMobileAppsBanner = () => {
    let [show, setShow] = React.useState(!window.localStorage.getItem('banner-apps-closed-1'));
    let onClose = React.useCallback(() => {
        window.localStorage.setItem('banner-apps-closed', 'true');
        setShow(false);
    }, []);
    let content = (
        <>
            <span className={cx(TextLabel1, bannerTextClass)}>Install mobile app</span>
            <div className={buttonsContainer}>
                <div className={bannerButton}>
                    <UButton color="rgba(255,255,255, 0.16)" text="Get iOS app" target="_blank" href="https://apps.apple.com/ru/app/openland-messenger/id1435537685" as="a" />
                </div>
                <div className={bannerButton}>
                    <UButton color="rgba(255,255,255, 0.16)" text="Get Android app" target="_blank" href="https://play.google.com/store/apps/details?id=com.openland.app" as="a" />
                </div>
            </div>
        </>
    );
    return { show, onClose, content };
};

let useNotificationsBanner = () => {
    let ttlStr = window.localStorage.getItem('banner-notifications-closed-ttl') || '0';
    let ttl = Number.parseInt(ttlStr, 10);
    let [show, setShow] = React.useState(ttl <= new Date().getTime());
    let onClose = React.useCallback(() => {
        window.localStorage.setItem('banner-notifications-closed-ttl', new Date().getTime() + 1000 + ''); // 1000 * 60 * 60 * 24 * 30
        setShow(false);
    }, []);
    let content = (
        <>
            <span className={cx(TextLabel1, bannerTextClass)}>Notifications!</span>
            <div className={bannerButton}>
                <UButton color="rgba(255,255,255, 0.16)" text="Get Android app" />
            </div>
        </>
    );
    return { show, onClose, content };
};

export const Banners = () => {
    let banners = [useMobileAppsBanner(), useNotificationsBanner()];

    let content, onClose;
    for (let b of banners) {
        if (b.show) {
            content = b.content;
            onClose = b.onClose;
            break;
        }
    }

    if (content) {
        return <BannerContainer onClosePress={onClose}>{content}</BannerContainer>;
    }
    return null;
};