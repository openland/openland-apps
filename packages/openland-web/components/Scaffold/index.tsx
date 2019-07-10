import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { XVertical } from 'openland-x-layout/XVertical';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { TextAppBar } from 'openland-text/TextAppBar';
import { XCounter } from 'openland-x/XCounter';
import { XScrollView } from 'openland-x/XScrollView';
import RoomIcon from 'openland-icons/channel-2.svg';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { AdaptiveHOC } from 'openland-web/components/Adaptive';
import { findChild } from '../utils';
import { DesktopScaffold, DesktopScafoldMenuItem } from './DesktopScaffold';
import { MobileScaffold, MobileScafoldMenuItem } from './MobileComponents';
import { MobileSidebarContext } from './MobileSidebarContext';
import { useClient } from 'openland-web/utils/useClient';
import { IsMobileContext } from './IsMobileContext';
import { RenderedOnceContext } from './RenderedOnceContext';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XLoader } from 'openland-x/XLoader';
import MessagesIcon from 'openland-icons/messages_icon.svg';
import MessagesSelectedIcon from 'openland-icons/messages_selected_icon.svg';
import DiscoverIcon from 'openland-icons/discover_icon.svg';
import DiscoverSelectedIcon from 'openland-icons/discover_selected_icon.svg';
import AccountIcon from 'openland-icons/account_icon.svg';
import AccountSelectedIcon from 'openland-icons/account_selected_icon.svg';
import * as Cookie from 'js-cookie';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

const CounterWrapper = (props: { count: number }) => (
    <div className="unread-messages-counter">
        <XView
            position="absolute"
            right={14}
            top={12}
            borderWidth={2}
            borderColor="#f6f6f6"
            borderRadius={8}
            selectedBorderColor="#ececec"
        >
            <XCounter count={props.count} />
        </XView>
    </div>
);

//
// Menu
//

const MenuView = Glamorous(XScrollView)({
    width: 360,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',

    '& > .simplebar-scroll-content': {
        '& > .simplebar-content': {
            overflowX: 'hidden',
        },
    },
    borderRight: '1px solid #ececec',
});

//
// Implementation
//

class ScaffoldMenu extends React.Component {
    static defaultProps = {
        _isSidebarMenu: true,
    };
    render() {
        if (React.Children.count(this.props.children) === 0) {
            return null;
        }
        return <MenuView>{this.props.children}</MenuView>;
    }
}

const PageDiv = Glamorous.div({
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    width: '64px',
    height: '64px',
});

class ScaffoldContent extends React.Component<{
    padding?: boolean;
    bottomOffset?: boolean;
}> {
    static defaultProps = {
        _isSidebarContent: true,
    };
    render() {
        const { children, padding, bottomOffset } = this.props;
        if (React.Children.count(children) === 0) {
            return null;
        }
        if (padding === false) {
            return (
                <>
                    {children}
                    {bottomOffset !== false && <PageDiv />}
                </>
            );
        }
        if (canUseDOM) {
            return (
                <React.Suspense fallback={<XLoader />}>
                    <XVertical flexGrow={1}>
                        {children}
                        {bottomOffset !== false && <PageDiv />}
                    </XVertical>
                </React.Suspense>
            );
        }
        return (
            <XVertical flexGrow={1}>
                {children}
                {bottomOffset !== false && <PageDiv />}
            </XVertical>
        );
    }
}

const NotificationCounter = () => {
    const client = useClient();
    const data = client.useWithoutLoaderGlobalCounter();
    return (
        <>
            {data &&
                data.alphaNotificationCounter &&
                data.alphaNotificationCounter.unreadCount > 0 && (
                    <CounterWrapper count={data.alphaNotificationCounter.unreadCount} />
                )}
        </>
    );
};

const UniversalScaffold = AdaptiveHOC({
    DesktopComponent: DesktopScaffold,
    MobileComponent: MobileScaffold,
    fullWidth: true,
});

const UniversalScafoldMenuItem = AdaptiveHOC({
    DesktopComponent: DesktopScafoldMenuItem,
    MobileComponent: MobileScafoldMenuItem,
    fullWidth: true,
});

export const DiscoverNotDoneRedDotInner = React.memo(({ setShowDot }: { setShowDot: Function }) => {
    const client = useClient();
    const discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'cache-and-network' });

    React.useLayoutEffect(() => {
        Cookie.set(
            'x-openland-show-discover-dot',
            !discoverDone.betaIsDiscoverDone ? 'true' : 'false',
        );
        setShowDot(!discoverDone.betaIsDiscoverDone);
    }, [discoverDone.betaIsDiscoverDone]);

    return null;
});

export const DiscoverNotDoneRedDot = () => {
    const isMobile = useIsMobile();
    const [showDot, setShowDot] = React.useState(
        Cookie.get('x-openland-show-discover-dot') === 'true',
    );

    const content = (
        <>
            {showDot && (
                <XView
                    width={6}
                    height={6}
                    position="absolute"
                    right={isMobile ? 23 : 16}
                    top={isMobile ? 11 : 14}
                    borderRadius="100%"
                    backgroundColor="#F6564E"
                />
            )}
        </>
    );

    return (
        <React.Suspense fallback={content}>
            <DiscoverNotDoneRedDotInner setShowDot={setShowDot} />
            {content}
        </React.Suspense>
    );
};

const RoutedActiveIcon = ({
    name,
    path,
    IconComponent,
    icon,
}: {
    name: string;
    path: string;
    IconComponent?: any;
    icon?: any;
}) => {
    let router = React.useContext(XRouterContext)!;

    return (
        <UniversalScafoldMenuItem
            isActive={router.path === path}
            name={name}
            path={path}
            icon={icon ? icon : <IconComponent isActive={router.path === path} />}
        />
    );
};

const AccountActiveIcon = ({ isActive }: { isActive: boolean }) => (
    <>{isActive ? <AccountSelectedIcon /> : <AccountIcon />}</>
);

const DiscoverActiveIcon = ({ isActive }: { isActive: boolean }) => (
    <>
        {isActive ? <DiscoverSelectedIcon /> : <DiscoverIcon />}
        <DiscoverNotDoneRedDot />
    </>
);

const MessageActiveIcon = ({ isActive }: { isActive: boolean }) => (
    <>
        {isActive ? <MessagesSelectedIcon /> : <MessagesIcon />}
        <NotificationCounter />
    </>
);

const ScaffoldInner = ({ menu, content }: { menu: any; content: any }) => {
    const isMobile = useIsMobile();

    const [showSidebar, setShowSidebar] = React.useState(false);
    const [showMenu, setShowMenu] = React.useState(false);
    const [renderedOnce, setRenderedOnce] = React.useState(false);

    React.useEffect(() => {
        if (!renderedOnce) {
            setRenderedOnce(true);
        }
    });

    const setSidebarOrInnerMenu = React.useCallback(
        ({ mode, value }: { mode: 'sidebar' | 'menu'; value: boolean }) => {
            if (mode === 'menu') {
                setShowMenu(value);
                if (value) {
                    setShowSidebar(false);
                }
            }

            if (mode === 'sidebar') {
                setShowSidebar(value);
                if (value) {
                    setShowMenu(false);
                }
            }
        },
        [],
    );

    return (
        <RenderedOnceContext.Provider value={renderedOnce}>
            <IsMobileContext.Provider value={!!isMobile}>
                <MobileSidebarContext.Provider
                    value={{
                        showSidebar,
                        setShowSidebar: (value: boolean) => {
                            setSidebarOrInnerMenu({ mode: 'sidebar', value });
                        },
                        showMenu,
                        setShowMenu: (value: boolean) => {
                            setSidebarOrInnerMenu({ mode: 'menu', value });
                        },
                    }}
                >
                    <UniversalScaffold
                        topItems={
                            <>
                                <RoutedActiveIcon
                                    name={'Messages'}
                                    path="/mail"
                                    IconComponent={MessageActiveIcon}
                                />
                                <RoutedActiveIcon
                                    name={TextAppBar.items.discover}
                                    path="/discover"
                                    IconComponent={DiscoverActiveIcon}
                                />
                                <RoutedActiveIcon
                                    name={'Account'}
                                    path="/account"
                                    IconComponent={AccountActiveIcon}
                                />
                                <XWithRole role="feature-non-production">
                                    <RoutedActiveIcon
                                        name={TextAppBar.items.apps}
                                        path="/apps"
                                        icon={<RoomIcon />}
                                    />
                                </XWithRole>
                            </>
                        }
                        menu={menu}
                        content={content}
                    />
                </MobileSidebarContext.Provider>
            </IsMobileContext.Provider>
        </RenderedOnceContext.Provider>
    );
};

export class Scaffold extends React.PureComponent {
    static Menu = ScaffoldMenu;
    static Content = ScaffoldContent;

    render() {
        let menu = findChild(this.props.children, '_isSidebarMenu');
        let content = findChild(this.props.children, '_isSidebarContent');

        return (
            <React.Suspense fallback={<XLoader loading={true} />}>
                <ScaffoldInner menu={menu} content={content} />
            </React.Suspense>
        );
    }
}
