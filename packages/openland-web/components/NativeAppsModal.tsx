import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { XImage } from 'react-mental';
import MacIcon from 'openland-icons/ic-app-mac.svg';
import WinIcon from 'openland-icons/ic-app-win.svg';
import LinuxIcon from 'openland-icons/ic-app-linux.svg';

const textAlignClassName = css`
    text-align: center;
`;

const MobileImage = () => (
    <XImage
        width={263}
        height={170}
        src="/static/nativeApps/mobile.png"
        srcSet="/static/nativeApps/mobile@2x.png 2x"
    />
);

const DesktopImage = () => (
    <XImage
        width={204}
        height={158}
        src="/static/nativeApps/desktop.png"
        srcSet="/static/nativeApps/desktop@2x.png 2x"
    />
);

interface AppCategoryProps {
    title: string;
    img: any;
    buttons: any;
    imagePaddingTop: number;
    marginLeft?: number;
    marginRight?: number;
}

const AppCategory = (props: AppCategoryProps) => (
    <XView
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        marginLeft={props.marginLeft}
        marginRight={props.marginRight}
        height={300}
    >
        <XView fontWeight="600" color="#000" fontSize={17}>
            {props.title}
        </XView>
        <XView
            flexDirection="row"
            alignItems="center"
            marginBottom={12}
            paddingTop={props.imagePaddingTop}
        >
            {props.img}
        </XView>
        <XView>{props.buttons}</XView>
    </XView>
);

const DesktopAppButtonClass = css`
    background-color: #e8f4ff;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    color: #1790ff;
    height: 40px;
    padding: 5px 16px 5px 12px;
    cursor: pointer;
    & svg {
        width: 30px;
        height: 30px;
    }
    & svg path:last-child {
        fill: #1790ff;
    }
    &:hover {
        color: #1790ff;
        background-color: #fff;
        border: 1px solid #1790ff;
    }
    &:hover svg path:last-child {
        fill: #1790ff;
    }
    & svg * {
        transition: all 0.2s ease;
    }
`;

const DesktopAppButtonActiveClass = css`
    background-color: #1790ff;
    color: #fff;
    & svg path:last-child {
        fill: #fff;
    }
`;

interface DesktopAppButtonProps {
    active: boolean;
    title: string;
    icon: any;
    marginRight?: number;
    href: string;
}

const DesktopAppButton = (props: DesktopAppButtonProps) => (
    <XView
        as="a"
        target="_blank"
        marginRight={props.marginRight}
        href={props.href}
        hoverTextDecoration="none"
    >
        <div className={cx(DesktopAppButtonClass, props.active && DesktopAppButtonActiveClass)}>
            <XView marginRight={8}>{props.icon}</XView>
            <XView fontWeight="600" fontSize={15}>
                {props.title}
            </XView>
        </div>
    </XView>
);

const MobileAppButton = (props: { href: string; image: string }) => (
    <XView as="a" href={props.href} target="_blank" hoverOpacity={0.8} hoverTextDecoration="none">
        <XImage width={124} height={40} src={props.image} />
    </XView>
);

export const NativeAppsModal = () => {
    const isMobile = useIsMobile() || undefined;
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
            flexDirection="row"
            position={'relative'}
            flexGrow={1}
            justifyContent={'center'}
            paddingLeft={isMobile ? 40 : 0}
            paddingRight={isMobile ? 40 : 0}
            paddingBottom={80}
        >
            <XView position="fixed" top={19} left={32}>
                <XImage src="/static/landing/logotype.svg" width={145} height={42} />
            </XView>
            <XView
                flexGrow={0}
                flexShrink={0}
                alignItems="center"
                width="100%"
                flexDirection="column"
            >
                <XView
                    fontSize={22}
                    fontWeight="600"
                    color="#000"
                    width="100%"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    marginTop={120}
                >
                    <span className={textAlignClassName}>Get Openland apps</span>
                </XView>
                <XView
                    fontSize={15}
                    color="#000"
                    width="100%"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    marginTop={12}
                    marginBottom={120}
                    lineHeight={1.6}
                    maxWidth={300}
                >
                    <span className={textAlignClassName}>
                        Openland is better experience as a mobile and desktop app. Install your app
                        now.
                    </span>
                </XView>
                <XView flexDirection="row" alignItems="center" marginLeft={50}>
                    <AppCategory
                        title="Mobile"
                        img={<MobileImage />}
                        imagePaddingTop={10}
                        marginRight={46}
                        buttons={
                            <XView flexDirection="row" alignItems="center">
                                <XView marginRight={24}>
                                    <MobileAppButton
                                        href="https://oplnd.com/ios"
                                        image="/static/X/settings/appstore@2x.png"
                                    />
                                </XView>
                                <MobileAppButton
                                    href="https://oplnd.com/android"
                                    image="/static/X/settings/googleplay@2x.png"
                                />
                            </XView>
                        }
                    />
                    <AppCategory
                        title="Desktop"
                        img={<DesktopImage />}
                        imagePaddingTop={10}
                        marginLeft={46}
                        buttons={
                            <XView flexDirection="row" alignItems="center" marginTop={12}>
                                <DesktopAppButton
                                    active={os === 'Mac'}
                                    title="Mac"
                                    icon={<MacIcon />}
                                    marginRight={12}
                                    href="https://oplnd.com/mac"
                                />
                                <DesktopAppButton
                                    active={os === 'Windows'}
                                    title="Windows"
                                    icon={<WinIcon />}
                                    marginRight={12}
                                    href="https://oplnd.com/windows"
                                />
                                <DesktopAppButton
                                    active={os === 'Linux'}
                                    title="Linux"
                                    icon={<LinuxIcon />}
                                    href="https://oplnd.com/linux"
                                />
                            </XView>
                        }
                    />
                </XView>
            </XView>
        </XView>
    );
};
