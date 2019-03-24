import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { XVertical } from 'openland-x-layout/XVertical';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { TextAppBar } from 'openland-text/TextAppBar';
import { XCounter } from 'openland-x/XCounter';
import { XScrollView } from 'openland-x/XScrollView';
import RoomIcon from 'openland-icons/channel-2.svg';
import DirectoryIcon from 'openland-icons/directory-3.svg';
import MobileChatIcon from 'openland-icons/ic-chat.svg';
import { useIsMobile } from 'openland-web/hooks';
import { AdaptiveHOC } from 'openland-web/components/Adaptive';
import { findChild } from '../utils';
import { DesktopScaffold, DesktopScafoldMenuItem } from './DesktopComponents';
import { MobileScaffold, MobileScafoldMenuItem } from './MobileComponents';
import { MobileSidebarContext } from './MobileSidebarContext';
import { useClient } from 'openland-web/utils/useClient';

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
    width: 344,
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
    return (<>
        {data && data.counter && data.counter.unreadCount > 0 && (
            <CounterWrapper count={data.counter.unreadCount} />
        )}
    </>)
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

const ScaffoldInner = ({ menu, content }: { menu: any; content: any }) => {
    const [isMobile] = useIsMobile();

    const [showSidebar, setShowSidebar] = React.useState(false);
    const [showMenu, setShowMenu] = React.useState(false);
    const [renderedOnce, setRenderedOnce] = React.useState(false);

    React.useEffect(() => {
        if (!renderedOnce) {
            setRenderedOnce(true);
        }
    });

    const setSidebarOrInnerMenu = ({
        mode,
        value,
    }: {
        mode: 'sidebar' | 'menu';
        value: boolean;
    }) => {
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
    };

    return (
        <MobileSidebarContext.Provider
            value={{
                renderedOnce,
                showSidebar,
                setShowSidebar: (value: boolean) => {
                    setSidebarOrInnerMenu({ mode: 'sidebar', value });
                },
                showMenu,
                setShowMenu: (value: boolean) => {
                    setSidebarOrInnerMenu({ mode: 'menu', value });
                },
                isMobile: !!isMobile,
            }}
        >
            <UniversalScaffold
                topItems={
                    <>
                        <XWithRole role="feature-non-production">
                            <UniversalScafoldMenuItem
                                name={TextAppBar.items.feed}
                                path="/feed"
                                icon={<RoomIcon />}
                            />
                        </XWithRole>

                        <UniversalScafoldMenuItem
                            name={'Messages'}
                            path="/mail"
                            icon={
                                <>
                                    <MobileChatIcon />
                                    <NotificationCounter />
                                </>
                            }
                        />

                        <UniversalScafoldMenuItem
                            name={TextAppBar.items.directory}
                            path="/directory"
                            icon={<DirectoryIcon />}
                        />
                    </>
                }
                menu={menu}
                content={content}
            />
        </MobileSidebarContext.Provider>
    );
};

export class Scaffold extends React.PureComponent {
    static Menu = ScaffoldMenu;
    static Content = ScaffoldContent;

    render() {
        let menu = findChild(this.props.children, '_isSidebarMenu');
        let content = findChild(this.props.children, '_isSidebarContent');

        return <ScaffoldInner menu={menu} content={content} />;
    }
}
