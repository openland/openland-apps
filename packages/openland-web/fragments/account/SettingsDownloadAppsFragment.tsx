import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import { XImage } from 'react-mental';
import MacIcon from 'openland-icons/ic-app-mac.svg';
import WinIcon from 'openland-icons/ic-app-win.svg';
import LinuxIcon from 'openland-icons/ic-app-linux.svg';
import { XModalBoxContext } from 'openland-x/XModalBoxContext';
import { detectOS, OS } from 'openland-x-utils/detectOS';
import { trackEvent } from 'openland-x-analytics';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { Page } from 'openland-unicorn/Page';

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
    background-color: rgba(23, 144, 255, 0.08);
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: all 0.2s ease;
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
        background-color: rgba(23, 144, 255, 0.12);
    }
    &:active {
        color: #1790ff;
        background-color: rgba(23, 144, 255, 0.16);
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
    &:hover {
        background-color: #1585ed;
        color: #fff;
    }
    &:hover svg path:last-child {
        fill: #fff;
    }
    &:active {
        color: #fff;
        background-color: #147ee0;
    }
    &:active svg path:last-child {
        fill: #fff;
    }
    & svg path:last-child {
        fill: #fff;
    }
`;

interface DesktopAppButtonProps extends XViewProps {
    active: boolean;
    title: string;
    icon: any;
}

const DesktopAppButton = (props: DesktopAppButtonProps) => {
    const { active, title, icon, ...other } = props;

    return (
        <XView as="a" target="_blank" hoverTextDecoration="none" {...other}>
            <div className={cx(DesktopAppButtonClass, props.active && DesktopAppButtonActiveClass)}>
                <XView marginRight={8}>{props.icon}</XView>
                <XView fontWeight="600" fontSize={15}>
                    {props.title}
                </XView>
            </div>
        </XView>
    );
};

const MobileAppButton = (props: { image: string } & XViewProps) => {
    const { image, ...other } = props;

    return (
        <XView as="a" target="_blank" hoverOpacity={0.8} hoverTextDecoration="none" {...other}>
            <XImage width={124} height={40} src={props.image} />
        </XView>
    );
};

const appsContainer = css`
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    margin-left: 50px;

    @media (max-width: 800px) {
        flex-direction: column;
        margin-left: 0;

        & > .x {
            margin-right: 0;
            margin-left: 0;
        }
    }
`;

const appsContainerPage = css`
    @media (max-width: 1280px) {
        flex-direction: column;
        margin-left: 0;

        & > .x {
            margin-right: 0;
            margin-left: 0;
        }
    }
`;

interface NativaAppsModalProps {
    title?: string;
    text?: string;
    hideLogo?: boolean;
    onSettingPage?: boolean;
}

export const DownloadAppsComponent = (props: NativaAppsModalProps) => {
    const { title, text } = props;
    const os = detectOS();
    const isMobile = useLayout() === 'mobile';
    const modalContext = React.useContext(XModalBoxContext);

    const onAppClick = React.useCallback((selectedOS: OS) => {
        const platform = ['iOS', 'Android'].includes(selectedOS) ? 'mobile' : 'desktop';

        trackEvent('app_download_action', {
            os: selectedOS.toLowerCase(),
            app_platform: platform,
        });
    }, []);

    return (
        <XView flexDirection="row" position={'relative'} flexGrow={1} justifyContent={'center'}>
            {modalContext && (
                <XView position="fixed" top={19} left={32}>
                    <XImage src="/static/landing/logotype.svg" width={145} height={42} />
                </XView>
            )}
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
                    marginTop={isMobile ? undefined : 120}
                >
                    <span className={textAlignClassName}>{title || 'Install Openland apps'}</span>
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
                        {text || (
                            <>
                                Get our fastest experience
                                <br /> and never miss a message
                            </>
                        )}
                    </span>
                </XView>
                <div className={cx(appsContainer, props.onSettingPage && appsContainerPage)}>
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
                                        onClick={() => onAppClick('iOS')}
                                    />
                                </XView>
                                <MobileAppButton
                                    href="https://oplnd.com/android"
                                    image="/static/X/settings/googleplay@2x.png"
                                    onClick={() => onAppClick('Android')}
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
                                    onClick={() => onAppClick('Mac')}
                                />
                                <DesktopAppButton
                                    active={os === 'Windows'}
                                    title="Windows"
                                    icon={<WinIcon />}
                                    marginRight={12}
                                    href="https://oplnd.com/windows"
                                    onClick={() => onAppClick('Windows')}
                                />
                                <DesktopAppButton
                                    active={os === 'Linux'}
                                    title="Linux"
                                    icon={<LinuxIcon />}
                                    href="https://oplnd.com/linux"
                                    onClick={() => onAppClick('Linux')}
                                />
                            </XView>
                        }
                    />
                </div>
            </XView>
        </XView>
    );
};

export const DownloadAppsFragment = React.memo(() => (
    <Page>
        <DownloadAppsComponent onSettingPage />
    </Page>
));
