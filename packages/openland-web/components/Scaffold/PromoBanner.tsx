import * as React from 'react';
import Glamorous from 'glamorous';
import { css } from 'linaria';
import { XButton } from 'openland-x/XButton';
import { XView } from 'react-mental';
import IosIcon from 'openland-icons/ic-ios-white.svg';
import AndroidIcon from 'openland-icons/ic-android-white.svg';
import MacIcon from 'openland-icons/ic-app-mac.svg';
import WinIcon from 'openland-icons/ic-app-win.svg';
import LinuxIcon from 'openland-icons/ic-app-linux.svg';
import CloseIcon from 'openland-icons/ic-close-banner.svg';

const ActiveButton = Glamorous(XButton)({
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: 'solid 1px #ffffff',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    '& svg path:last-child': {
        fill: '#fff',
    },
});

const titleClassName = css`
    font-weight: 500;
`;

export const PromoBanner = (props: { onClise: () => void }) => {
    let userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macPlatforms.indexOf(platform) !== -1) {
        os = 'Mac';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }

    return (
        <XView
            height={50}
            width="100%"
            flexShrink={0}
            backgroundImage="linear-gradient(92deg, #28a2dc, #3394ed)"
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
        >
            <XView fontSize={15} color="#fff" whiteSpace="nowrap" marginRight={42}>
                <span className={titleClassName}>Install Openland apps</span>
            </XView>
            {os === 'Mac' && (
                <XView cursor="pointer" alignItems="center" flexDirection="row" marginRight={24}>
                    <ActiveButton
                        text="Mac"
                        style="primary"
                        size="small"
                        icon={<MacIcon />}
                        href="https://oplnd.com/mac"
                    />
                </XView>
            )}
            {os === 'Windows' && (
                <XView cursor="pointer" alignItems="center" flexDirection="row" marginRight={24}>
                    <ActiveButton
                        text="Windows"
                        style="primary"
                        size="small"
                        icon={<WinIcon />}
                        href="https://oplnd.com/windows"
                    />
                </XView>
            )}
            {os === 'Linux' && (
                <XView cursor="pointer" alignItems="center" flexDirection="row" marginRight={24}>
                    <ActiveButton
                        text="Linux"
                        style="primary"
                        size="small"
                        icon={<LinuxIcon />}
                        href="https://oplnd.com/linux"
                    />
                </XView>
            )}
            <XView cursor="pointer" alignItems="center" flexDirection="row" marginRight={24}>
                <ActiveButton
                    text="iOS"
                    style="primary"
                    size="small"
                    icon={<IosIcon />}
                    href="https://oplnd.com/ios"
                />
            </XView>
            <XView cursor="pointer" alignItems="center" flexDirection="row">
                <ActiveButton
                    text="Android"
                    style="primary"
                    size="small"
                    icon={<AndroidIcon />}
                    href="https://oplnd.com/android"
                />
            </XView>
            <XView
                cursor="pointer"
                alignItems="center"
                justifyContent="center"
                padding={8}
                width={32}
                height={32}
                borderRadius={50}
                hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
                position="absolute"
                top={9}
                right={9}
                onClick={props.onClise}
            >
                <CloseIcon />
            </XView>
        </XView>
    );
};
