import * as React from 'react';
import { css } from 'linaria';
import { XView, XImage } from 'react-mental';
import ToProfileIcon from 'openland-icons/ic-toprofile.svg';
import LogoutIcon from 'openland-icons/ic-logout.svg';
import { XThemeDefault } from 'openland-x/XTheme';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { withUserInfo } from '../UserInfo';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import { InvitesGlobalModal } from '../../pages/main/settings/components/invites';
import CloseIcon from 'openland-icons/ic-close-banner.svg';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

const CloseBannerIconClassName = css`
    & > g > path:last-child {
        fill: #787878;
    }
`;

const MobileCustomPromoBanner = () => {
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
    if (!iosChrome || !iosMozila || !androidMozila) {
        return null;
    }
    if (localStorage.getItem('mobile-promo-banner-be-show')) {
        return null;
    }
    if (!banner) {
        return null;
    }
    return (
        <XView
            height={60}
            width="100%"
            flexShrink={0}
            backgroundColor="#f7f7f7"
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal={16}
        >
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
                        {androidMozila ? 'Use Android app' : 'Use iPhone app'}
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
        </XView>
    );
};

export const MobileScafoldMenuItem = ({
    name,
    path,
    icon,
}: {
    name: string;
    path: string;
    icon: any;
}) => {
    const { setShowSidebar } = React.useContext(MobileSidebarContext);
    return (
        <XView
            as="a"
            position="relative"
            flexDirection="column"
            alignSelf="stretch"
            alignItems="center"
            justifyContent="center"
            height={50}
            width="100%"
            flexShrink={0}
            cursor="pointer"
            selectedBackgroundColor="#f9f9f9"
            hoverBackgroundColor="#f9f9f9"
            linkSelectable={!!path}
            linkStrict={!!path}
            path={path}
            hoverTextDecoration="none"
            fontSize={15}
            fontWeight="600"
            lineHeight={1.07}
            onClick={() => {
                setShowSidebar(false);
            }}
            color="#000"
            hoverColor="#000"
        >
            <XView flexDirection="row">
                <XView
                    flexDirection="column"
                    justifyContent="center"
                    height={49}
                    width={76}
                    alignItems="center"
                >
                    {icon}
                </XView>
                <XView flexDirection="column" justifyContent="center" height={49} width={224}>
                    {name}
                </XView>
            </XView>
            <XView height={1} backgroundColor="#ececec" width="100%" />
        </XView>
    );
};

const MobileUserProfile = withUserInfo(({ user, onClick }: any) => {
    if (user) {
        return (
            <XView
                as="a"
                onClick={onClick}
                path={`/settings/profile`}
                height={70}
                width="100%"
                backgroundColor="#f9f9f9"
                flexShrink={0}
                flexDirection="column"
                hoverTextDecoration="none"
                color="#000"
            >
                <XView
                    paddingHorizontal={20}
                    paddingTop={16}
                    paddingBottom={13}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    height={69}
                >
                    <XView flexDirection="row" height="100%">
                        <XAvatar2 size={40} src={user.photo} title={user.name} id={user.id} />
                        <XView marginLeft={16}>
                            <XView
                                fontSize={15}
                                fontWeight="600"
                                lineHeight={1.33}
                                color="#000"
                                marginBottom={1}
                            >
                                {user.name}
                            </XView>
                            <XView
                                fontSize={14}
                                lineHeight={1.43}
                                color="rgba(0, 0, 0, 0.5)"
                                marginBottom={1}
                            >
                                View profile
                            </XView>
                        </XView>
                    </XView>
                    <ToProfileIcon />
                </XView>
                <XView height={1} backgroundColor="#ececec" width="100%" />
            </XView>
        );
    } else {
        return null;
    }
});

const sideBarClassName = css`
    display: flex;
    box-shadow: 0 0 44px 0 rgba(0, 0, 0, 0.15);
    flex-direction: row;
    height: 100%;
    position: fixed;
    width: 300px;
    background-color: white;
    z-index: 100;
    top: 0;
`;

const sideBarBackgroundClassName = css`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 99;
`;

const MobileNavigationContainer = (props: { children?: any }) => (
    <XView
        minHeight="100%"
        width="100%"
        flexGrow={1}
        alignItems="center"
        flexDirection="column"
        paddingTop={0}
        paddingBottom={14}
    >
        {props.children}
    </XView>
);

const MobileSidebar = ({ topItems, menu }: { topItems: any; menu: any }) => {
    const { showSidebar, setShowSidebar } = React.useContext(MobileSidebarContext);

    const toggle = () => setShowSidebar(!showSidebar);
    const close = () => setShowSidebar(false);
    return (
        <div>
            {showSidebar && <div onClick={toggle} className={sideBarBackgroundClassName} />}
            <div className={sideBarClassName} style={{ left: showSidebar ? 0 : -350 }}>
                <XView width="100%">
                    <MobileNavigationContainer>
                        <InvitesGlobalModal targetQuery="invite_global" target={null} />
                        <MobileUserProfile onClick={close} />
                        {topItems}
                        <XView
                            alignSelf="flex-end"
                            width="100%"
                            flexDirection="column"
                            justifyContent="flex-end"
                            flexGrow={1}
                        >
                            <XView paddingLeft={24} alignSelf="flex-start" flexDirection="column">
                                <XView
                                    path="/auth/logout"
                                    marginBottom={12}
                                    flexDirection="row"
                                    alignSelf="flex-start"
                                    cursor="pointer"
                                >
                                    <LogoutIcon />
                                    <XView
                                        color="#000"
                                        marginLeft={26}
                                        fontSize={15}
                                        fontWeight="600"
                                        opacity={0.5}
                                    >
                                        Log out
                                    </XView>
                                </XView>
                            </XView>
                        </XView>
                    </MobileNavigationContainer>
                </XView>
                {menu}
            </div>
        </div>
    );
};

export const MobileScaffold = ({
    menu,
    content,
    topItems,
}: {
    menu: any;
    content: any;
    topItems: any;
}) => {
    return (
        <XView flexDirection="column" flexGrow={1} flexBasis={0}>
            <MobileCustomPromoBanner />
            <XView
                flexDirection="column"
                backgroundColor={XThemeDefault.backgroundColor}
                flexGrow={1}
                flexBasis={0}
                flexShrink={1}
                minWidth={0}
            >
                {content}
            </XView>
            <MobileSidebar topItems={topItems} menu={menu} />
        </XView>
    );
};
