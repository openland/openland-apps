import * as React from 'react';
import { css } from 'linaria';
import { XView, XImage } from 'react-mental';
import CloseIcon from 'openland-icons/ic-close-banner.svg';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

const CustomPromoWrapperClassName = css`
    &.promo-banner {
        height: 60px;
        width: 100%;
        flex-shrink: 0;
        background-color: #f7f7f7;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 16px;
        padding-right: 16px;
        display: flex;
        position: relative;
    }
`;

const CloseBannerIconClassName = css`
    & > g > path:last-child {
        fill: #787878;
    }
`;

export const MobileCustomPromoBanner = () => {
    if (!canUseDOM) {
        return null;
    }
    const [banner, bannerHandler] = React.useState(true);
    const handleHideBanner = () => {
        bannerHandler(false);
        localStorage.setItem('mobile-promo-banner-be-show', 'hidden');
    };
    const userAgent = window.navigator.userAgent;
    let iosChrome = false;
    let iosMozila = false;
    let androidMozila = false;
    if (userAgent.match(/iPhone|iPad|iPod/i) && userAgent.match(/CriOS/i)) {
        iosChrome = true;
    }
    if (userAgent.match(/iPhone|iPad|iPod/i) && userAgent.match(/Firefox/i)) {
        iosMozila = true;
    }
    if (userAgent.match(/Android/i) && userAgent.match(/Firefox/i)) {
        androidMozila = true;
    }
    if (localStorage.getItem('mobile-promo-banner-be-show')) {
        return null;
    }
    if (!banner) {
        return null;
    }
    if (iosChrome || iosMozila || androidMozila) {
        return (
            <div className={`${CustomPromoWrapperClassName} promo-banner`}>
                <XView flexDirection="row" alignItems="center">
                    <XView
                        cursor="pointer"
                        alignItems="center"
                        justifyContent="center"
                        width={25}
                        height={25}
                        marginRight={5}
                        onClick={handleHideBanner}
                    >
                        <CloseIcon className={CloseBannerIconClassName} />
                    </XView>
                    <XImage
                        width={48}
                        height={48}
                        src="/static/X/logo-5.png"
                        srcSet="/static/X/logo-5@2x.png 2x"
                        marginRight={12}
                    />
                    <XView>
                        <XView fontSize={16} fontWeight="400" color="#000">
                            Openland
                        </XView>
                        <XView fontSize={14} opacity={0.7} color="#000">
                            {androidMozila ? 'Use Android app' : 'Use iOS app'}
                        </XView>
                    </XView>
                </XView>
                <XView
                    as="a"
                    cursor="pointer"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    paddingHorizontal={12}
                    paddingVertical={6}
                    width={82}
                    height={28}
                    borderRadius={8}
                    backgroundColor="#007aff"
                    color="#fff"
                    hoverColor="#fff"
                    fontSize={14}
                    fontWeight="600"
                    hoverTextDecoration="none"
                    whiteSpace="nowrap"
                    href={androidMozila ? 'https://oplnd.com/android' : 'https://oplnd.com/ios'}
                >
                    USE APP
                </XView>
                <XView
                    height={1}
                    position="absolute"
                    left={0}
                    bottom={0}
                    width="100%"
                    backgroundColor="#ececec"
                />
            </div>
        );
    }
    return null;
};
