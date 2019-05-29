import * as React from 'react';
import Glamorous from 'glamorous';
import { XView, XImage } from 'react-mental';
import { XScrollView } from 'openland-x/XScrollView';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XThemeDefault } from 'openland-x/XTheme';
import { ThemeContext } from 'openland-web/modules/theme/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { PromoBanner } from './PromoBanner';
import { DesktopNavigatorItem } from './DesktopNavigatorItem';
import { AppsMenuItem } from './MenuItems/AppsMenuItem';
import { SuperAdminMenuItem } from './MenuItems/SuperAdminMenuItem';
import { CreateMenuItem } from './MenuItems/CreateMenuItem';
import { DesktopUserProfile } from './DesktopUserProfile';
import { XPopper } from 'openland-x/XPopper';
import { FavIconChecker } from 'openland-web/hooks/useFavicon';

export const DesktopScafoldMenuItem = ({
    name,
    path,
    icon,
}: {
    name: string;
    path: string;
    icon: any;
}) => {
    return (
        <XPopper
            placement="right"
            showOnHoverContent={false}
            showOnHover={true}
            style="dark"
            padding={-2}
            groupId="scaffold_tooltip"
            content={<strong>{name}</strong>}
        >
            <DesktopNavigatorItem path={path}>{icon}</DesktopNavigatorItem>
        </XPopper>
    );
};

const NavigationScrollerDiv = Glamorous(XScrollView)<{ mobile?: boolean }>(({ mobile }) => {
    return {
        minHeight: '100%',
        height: '100%',
        width: mobile ? '100%' : 64,
        backgroundColor: '#f6f6f6',
        borderRightWidth: '1px',
        borderRightStyle: 'solid',
        borderRightColor: XThemeDefault.separatorColor,
        flexShrink: 0,
    };
});

const NavigationScroller = XMemo<{ children: any }>(props => {
    let theme = React.useContext(ThemeContext);
    return (
        <NavigationScrollerDiv
            css={{
                backgroundColor: theme.appBarBackgroundColor,
                borderRightWidth: theme.appBarSeparatorColor !== undefined ? '1px' : '0px',
                borderRightColor: theme.appBarSeparatorColor,
            }}
        >
            {props.children}
        </NavigationScrollerDiv>
    );
});

const Logo = () => (
    <XView
        as="a"
        path="/"
        marginTop={0}
        marginBottom={11}
        alignSelf="center"
        flexShrink={0}
        width={38}
        height={38}
        overflow="hidden"
        hoverTextDecoration="none"
    >
        <XImage
            width={38}
            height={38}
            src="/static/X/logo-5.png"
            srcSet="/static/X/logo-5@2x.png 2x"
        />
    </XView>
);

const DesktopNavigationContainer = (props: { children?: any }) => (
    <XView
        minHeight="100%"
        width="100%"
        flexGrow={1}
        alignItems="center"
        flexDirection="column"
        paddingTop={11}
        paddingBottom={14}
    >
        {props.children}
    </XView>
);

const NavigationDivider = (props: { position: 'top' | 'bottom' }) => {
    let theme = React.useContext(ThemeContext);
    if (props.position === 'top') {
        return (
            <XView
                width={38}
                height={1}
                marginTop={0}
                marginBottom={16}
                alignSelf="center"
                backgroundColor={theme.appBarSeparatorInnerColor}
                flexShrink={0}
            />
        );
    } else {
        return (
            <XView
                width={38}
                height={1}
                marginTop={10}
                marginBottom={10}
                alignSelf="center"
                backgroundColor={theme.appBarSeparatorInnerColor}
                flexShrink={0}
            />
        );
    }
};

const BottomNavigation = (props: { children?: any }) => (
    <XView
        flexDirection="column"
        justifyContent="flex-end"
        alignSelf="stretch"
        flexGrow={1}
        flexShrink={0}
    >
        {props.children}
    </XView>
);

export const DesktopScaffold = ({
    menu,
    content,
    topItems,
}: {
    menu: any;
    content: any;
    topItems: any;
}) => {
    const [banner, bannerHandler] = React.useState(true);
    const handleHideBanner = () => {
        bannerHandler(false);
        localStorage.setItem('promo-banner-be-show', 'hidden');
    };

    let bannerComponent: any = <PromoBanner onClise={handleHideBanner} />;

    if (!canUseDOM) {
        bannerComponent = null;
    }
    if (localStorage.getItem('promo-banner-be-show')) {
        bannerComponent = null;
    }
    if (!banner) {
        bannerComponent = null;
    }

    let contentView = (
        <XView
            flexDirection="column"
            backgroundColor={XThemeDefault.backgroundColor}
            flexGrow={1}
            flexBasis={0}
            flexShrink={1}
            minWidth={0}
            marginLeft={menu ? 408 : 64}
        >
            {content}
        </XView>
    );
    let menuView = (
        <XView
            flexDirection="row"
            height={bannerComponent ? 'calc(100% - 50px)' : '100%'}
            position="fixed"
            backgroundColor="#ffffff"
        >
            <NavigationScroller>
                <DesktopNavigationContainer>
                    <Logo />
                    <NavigationDivider position="top" />

                    {topItems}
                    <BottomNavigation>
                        <CreateMenuItem />
                        <AppsMenuItem />
                        <SuperAdminMenuItem />

                        <NavigationDivider position="bottom" />
                        <DesktopNavigatorItem>
                            <DesktopUserProfile />
                        </DesktopNavigatorItem>
                    </BottomNavigation>
                </DesktopNavigationContainer>
            </NavigationScroller>
            {menu}
        </XView>
    );

    FavIconChecker();

    return (
        <XView
            flexDirection="column"
            flexGrow={1}
            flexBasis={0}
            flexShrink={0}
            width="100%"
            height="100%"
        >
            {bannerComponent}
            <XView flexDirection="row" flexGrow={1} flexBasis={0} flexShrink={0}>
                {contentView}
                {menuView}
            </XView>
        </XView>
    );
};
