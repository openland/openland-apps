import * as React from 'react';
import { XView, XImage } from 'react-mental';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XThemeDefault } from 'openland-x/XTheme';
import { PromoBanner } from './PromoBanner';
import { DesktopNavigatorItem } from './DesktopNavigatorItem';
import { XMenuItem } from 'openland-x/XMenuItem';
import { TextAppBar } from 'openland-text/TextAppBar';

export const DesktopScafoldMenuItem = ({
    path,
    icon,
    isActive,
}: {
    path: string;
    icon: any;
    isActive: boolean;
}) => {
    return (
        <DesktopNavigatorItem path={path} isActive={isActive}>
            {icon}
        </DesktopNavigatorItem>
    );
};

const NavigationScroller = React.memo((props: {children: any}) => (
    <div
        style={{
            backgroundColor: 'var(--backgroundTertiary)',
        }}
    >
        {props.children}
    </div>
));

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
            src="/static/X/logo-6.png"
            srcSet="/static/X/logo-6@2x.png 2x"
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
            marginLeft={menu ? 450 : 64}
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

                    {topItems}
                    <BottomNavigation>
                        <XMenuItem href="https://logs.openland.io/app/kibana#/dashboard/3ca91120-f946-11e8-aa74-4b89079261c0?_g=(filters%3A!(('%24state'%3A(store%3AglobalState)%2Cmeta%3A(alias%3A'test%20acccs%20(hl)'%2Cdisabled%3A!f%2Cindex%3Ab3bf80a0-db87-11e8-9410-7338f67f9eca%2Ckey%3Abody.uid%2Cnegate%3A!t%2Cparams%3A!('4'%2C'101'%2C'21'%2C'1002'%2C'31'%2C'40')%2Ctype%3Aphrases%2Cvalue%3A'4%2C%20101%2C%2021%2C%201%2C002%2C%2031%2C%2040')%2Cquery%3A(bool%3A(minimum_should_match%3A1%2Cshould%3A!((match_phrase%3A(body.uid%3A'4'))%2C(match_phrase%3A(body.uid%3A'101'))%2C(match_phrase%3A(body.uid%3A'21'))%2C(match_phrase%3A(body.uid%3A'1002'))%2C(match_phrase%3A(body.uid%3A'31'))%2C(match_phrase%3A(body.uid%3A'40'))))))%2C('%24state'%3A(store%3AglobalState)%2Cmeta%3A(alias%3A'test%20accs%20(msgs)'%2Cdisabled%3A!f%2Cindex%3Ac91953d0-f6f9-11e8-aa74-4b89079261c0%2Ckey%3Auid%2Cnegate%3A!t%2Cparams%3A!('5'%2C'101'%2C'21'%2C'1002'%2C'31'%2C'40')%2Ctype%3Aphrases%2Cvalue%3A'5%2C%20101%2C%2021%2C%201%2C002%2C%2031%2C%2040')%2Cquery%3A(bool%3A(minimum_should_match%3A1%2Cshould%3A!((match_phrase%3A(uid%3A'5'))%2C(match_phrase%3A(uid%3A'101'))%2C(match_phrase%3A(uid%3A'21'))%2C(match_phrase%3A(uid%3A'1002'))%2C(match_phrase%3A(uid%3A'31'))%2C(match_phrase%3A(uid%3A'40')))))))%2CrefreshInterval%3A(display%3AOff%2Cpause%3A!f%2Cvalue%3A0)%2Ctime%3A(from%3Anow-30d%2Cmode%3Aquick%2Cto%3Anow))">
                            {TextAppBar.items.stats}
                        </XMenuItem>
                        <XMenuItem path="/super">{TextAppBar.items.adminMenu}</XMenuItem>
                        <XMenuItem path="/ui">{TextAppBar.items.xFramework}</XMenuItem>
                    </BottomNavigation>
                </DesktopNavigationContainer>
            </NavigationScroller>
            {menu}
        </XView>
    );

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
