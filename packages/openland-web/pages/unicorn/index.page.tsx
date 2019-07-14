import * as React from 'react';
import { XView, XViewRouterContext } from 'react-mental';
import { DialogListFragment } from 'openland-web/fragments/dialogs/DialogListFragment';
import { ThemeLightBlue } from 'openland-y-utils/themes';
import { NotificationsButton, NewOptionsButton } from 'openland-web/components/NewOptionsButton';
import { AccountFragment } from 'openland-web/fragments/account/AccountFragment';
import { DiscoverFragment } from 'openland-web/fragments/discover/DiscoverFragment';
import { Routing } from './routing';
import { TabRouter } from 'openland-unicorn/components/TabRouter';
import DiscoverIcon from './navigation/icon_discover.svg';
import DiscoverActiveIcon from './navigation/icon_discover_active.svg';
import ChatIcon from './navigation/icon_chat.svg';
import ChatActiveIcon from './navigation/icon_chat_active.svg';
import ProfileIcon from './navigation/icon_profile.svg';
import ProfileActiveIcon from './navigation/icon_profile_active.svg';
import { TabLayout } from 'openland-unicorn/components/TabLayout';
import { LayoutProvider } from 'openland-unicorn/components/utils/LayoutContext';
const Root = () => {
    // let controller = useController();
    let router = React.useContext(XViewRouterContext)!;
    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <XView
                height={56}
                paddingHorizontal={16}
                paddingVertical={12}
                backgroundColor="#fff"
                fontSize={24}
                lineHeight="32px"
                fontWeight="600"
                color={ThemeLightBlue.foregroundPrimary}
                flexDirection="row"
            >
                <XView flexGrow={1} minWidth={0} flexBasis={0}>
                    Chats
                </XView>
                <XView flexDirection="row" alignItems="center" paddingLeft={12}>
                    <XView marginRight={7} justifyContent="center" alignItems="center">
                        <NotificationsButton />
                    </XView>
                    <NewOptionsButton />
                </XView>
            </XView>
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <DialogListFragment
                    onSearchItemSelected={() => {/*  */ }}
                    onDialogPress={(id) => {
                        router.navigate(`/mail/${id}`);
                    }}
                />
            </XView>
        </XView>
    );
};

const RootAccount = () => {
    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <XView
                height={56}
                paddingHorizontal={16}
                paddingVertical={12}
                backgroundColor="#fff"
                fontSize={24}
                lineHeight="32px"
                fontWeight="600"
                color={ThemeLightBlue.foregroundPrimary}
                flexDirection="row"
            >
                <XView flexGrow={1} minWidth={0} flexBasis={0}>
                    Account
                </XView>
                {/* <XView flexDirection="row" alignItems="center" paddingLeft={12}>
                    <XView marginRight={7} justifyContent="center" alignItems="center">
                        <NotificationsButton />
                    </XView>
                    <NewOptionsButton />
                </XView> */}
            </XView>
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <AccountFragment />
            </XView>
        </XView>
    );
};

const RootDiscover = () => {
    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <XView
                height={56}
                paddingHorizontal={16}
                paddingVertical={12}
                backgroundColor="#fff"
                fontSize={24}
                lineHeight="32px"
                fontWeight="600"
                color={ThemeLightBlue.foregroundPrimary}
                flexDirection="row"
            >
                <XView flexGrow={1} minWidth={0} flexBasis={0}>
                    Discover
                </XView>
                {/* <XView flexDirection="row" alignItems="center" paddingLeft={12}>
                    <XView marginRight={7} justifyContent="center" alignItems="center">
                        <NotificationsButton />
                    </XView>
                    <NewOptionsButton />
                </XView> */}
            </XView>
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <DiscoverFragment />
                {/* <AccountFragment /> */}
            </XView>
        </XView>
    );
};

// const Inner = () => {
//     let layout = useLayout();
//     let [selected, setSelected] = React.useState(def);
//     let [selectedMounted, setSelectedMounted] = React.useState(def);
//     let currentTab = React.useRef(def);
//     let root0 = React.useMemo(() => <RootDiscover />, []);
//     let controller0 = React.useMemo(() => new UnicornController('/discover'), []);
//     let root1 = React.useMemo(() => <Root />, []);
//     let controller1 = React.useMemo(() => new UnicornController('/mail'), []);
//     let root2 = React.useMemo(() => <RootAccount />, []);
//     let controller2 = React.useMemo(() => new UnicornController('/settings'), []);

//     // Put initial tab id
//     React.useLayoutEffect(() => {
//         window.history.replaceState({
//             ...window.history.state,
//             options: {
//                 ...window.history.state.options,
//                 'unicorn-switch-tab': def
//             }
//         }, '');
//     }, []);

//     const setSelectedClb = React.useCallback((id: number) => {
//         let path = '/discover';
//         if (id === 0) {
//             path = '/discover';
//         } else if (id === 1) {
//             path = '/mail';
//         } else if (id === 2) {
//             path = '/settings';
//         }

//         currentTab.current = id;
//         setSelected(id);
//         setTimeout(() => {
//             setSelectedMounted(id);
//         }, 20);
//         Router.push('/unicorn', path, {
//             shallow: true,
//             'unicorn-switch-tab': id
//         });
//     }, []);

//     React.useEffect(() => {
//         UTransitionManager.onBackPressed = () => {
//             if (window.history.state && window.history.state.options) {
//                 let tb = window.history.state.options['unicorn-switch-tab'];
//                 if (typeof tb === 'number') {
//                     if (tb >= 0 && tb <= 2) {
//                         console.log('tab: ' + tb);
//                         localStorage.setItem('unicorn-tab', tb + '');
//                         currentTab.current = tb;
//                         setSelected(tb);
//                         setTimeout(() => {
//                             setSelectedMounted(tb);
//                         }, 20);
//                     }
//                 } else {
//                     let path = window.history.state.as as string;
//                     console.warn('back -> ' + path);
//                     if (currentTab.current === 2) {
//                         let ex = Routing.resolve(path);
//                         if (ex) {
//                             let Component = ex.route.factory();
//                             controller2.push(path, <Component />);
//                         }
//                     }
//                 }
//             }
//         };

//         return () => {
//             UTransitionManager.onBackPressed = undefined;
//         };
//     }, []);

//     return (
//         <>
//             <InnerContainer>
//                 <div className={selectedMounted === 0 ? visibleContainer : invisibleContainer}>
//                     <UnicornLayout root={root0} routing={Routing} controller={controller0} />
//                 </div>
//                 <div className={selectedMounted === 1 ? visibleContainer : invisibleContainer}>
//                     <UnicornLayout root={root1} routing={Routing} controller={controller1} />
//                 </div>
//                 <div className={selectedMounted === 2 ? visibleContainer : invisibleContainer}>
//                     <UnicornLayout root={root2} routing={Routing} controller={controller2} />
//                 </div>

//                 {layout === 'desktop' && (
//                     <XView position="absolute" top={0} left={0} bottom={0} width={64}>
//                         <AppBarDesktop selected={selected} setSelected={setSelectedClb} />
//                     </XView>
//                 )}
//             </InnerContainer>
//             {layout === 'mobile' && (
//                 <XView position="absolute" bottom={0} left={0} right={0} height={56} zIndex={1}>
//                     <AppBarMobile selected={selected} setSelected={setSelectedClb} />
//                 </XView>
//             )}
//         </>
//     );
// };

export default React.memo(() => {
    const router = React.useMemo(() => new TabRouter([{
        icon: <DiscoverIcon />,
        iconActive: <DiscoverActiveIcon />,
        path: '/discover',
        component: <RootDiscover />
    }, {
        icon: <ChatIcon />,
        iconActive: <ChatActiveIcon />,
        path: '/mail',
        component: <Root />
    }, {
        icon: <ProfileIcon />,
        iconActive: <ProfileActiveIcon />,
        path: '/settings',
        component: <RootAccount />
    }], 1, Routing, 'root'), []);
    return (
        <LayoutProvider>
            <TabLayout router={router} />
        </LayoutProvider>
    );
});