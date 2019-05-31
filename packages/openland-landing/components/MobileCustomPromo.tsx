import * as React from 'react';
import Glamorous from 'glamorous';
import { css } from 'linaria';
import { XView, XImage } from 'react-mental';
import CloseIcon from 'openland-icons/ic-close-banner.svg';

const PromoWrapper = Glamorous.div<{ hidden: boolean }>(props => ({
    height: 60,
    width: '100%',
    flexShrink: 0,
    backgroundColor: '#f7f7f7',
    display: props.hidden ? 'none' : 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    borderBottom: '1px solid #ececec',
}));

const PromoContent = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
});

const CloseBannerIconClassName = css`
    & > g > path:last-child {
        fill: #787878;
    }
`;

export const MobileCustomPromo = () => {
    const [hidden, bannerHandler] = React.useState(true);
    const [beHide, beHideHandler] = React.useState(false);
    const handleHideBanner = () => {
        bannerHandler(true);
        beHideHandler(true);
    };
    let iosChrome = false;
    let iosMozila = false;
    let android = false;
    React.useEffect(() => {
        if (beHide) {
            return;
        }
        const userAgent = window.navigator.userAgent;
        if (userAgent.match(/iPhone|iPad|iPod/i) && userAgent.match(/CriOS/i)) {
            iosChrome = true;
        }
        if (userAgent.match(/iPhone|iPad|iPod/i) && userAgent.match(/FxiOS/i)) {
            iosMozila = true;
        }
        if (userAgent.match(/Android/i)) {
            android = true;
        }
        if (iosChrome || iosMozila || android) {
            bannerHandler(false);
        }
    });
    return (
        <PromoWrapper hidden={hidden}>
            <PromoContent>
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
                        {android ? 'Use Android app' : 'Use iOS app'}
                    </XView>
                </XView>
            </PromoContent>
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
                href={android ? 'https://oplnd.com/android' : 'https://oplnd.com/ios'}
            >
                USE APP
            </XView>
        </PromoWrapper>
    );
};
