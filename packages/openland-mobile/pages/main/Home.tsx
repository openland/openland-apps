import * as React from 'react';
import { View, Platform } from 'react-native';
import { HomeDialogs } from './HomeDialogs';
import { Settings } from './Settings';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { HeaderContextChild } from 'react-native-s/navigation/HeaderContextChild';
import { PageProps } from '../../components/PageProps';
import { AppBarBottom, AppBarBottomItem } from '../../components/AppBarBottom';
import { Explore } from './Explore';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { NotificationCenter } from './NotificationCenter';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { STrackedValue } from 'react-native-s/STrackedValue';
import { getMessenger } from 'openland-mobile/utils/messenger';

export const ActiveTabContext = React.createContext(false);
export const SetTabContext = React.createContext<(index: number) => void>(() => {/* noop */ });
export const STrackedValueRefContext = React.createContext<React.MutableRefObject<STrackedValue | undefined> | undefined>(undefined);
export const ComponentRefContext = React.createContext<React.RefObject<any> | undefined>(undefined); // terrible hack here and after because of Animated.FlatList and Animated.ScrollView

const DEFAULT_TAB = 1;

export const Home = React.memo((props: PageProps) => {
    const router = React.useContext(SRouterContext);
    const [tab, setTab] = React.useState(router && router.params && typeof router.params.initialTab === 'number' ? router.params.initialTab : DEFAULT_TAB);
    const counter = getClient().useGlobalCounter({ suspense: false });
    const notificationsCounter = getClient().useMyNotificationCenter({ suspense: false });
    const discoverDone = getClient().useDiscoverIsDone({ suspense: false });
    const wallet = getClient().useMyWallet({ suspense: false });
    const failingPaymentsCount = wallet && wallet.myWallet.failingPaymentsCount || undefined;

    const messengerEngine = getMessenger().engine;
    const exploreRef = React.createRef<any>();
    const dialogsDataSource = messengerEngine.dialogList.dataSource;
    const dialogsContentOffset = React.useRef<STrackedValue>();
    const dialogsAdditionalRef = React.createRef<any>();
    const notificationsDataSource = messengerEngine.notificationCenter.dataSource;
    const notificationsContentOffset = React.useRef<STrackedValue>();
    const settingsRef = React.createRef<any>();

    const handleChangeTab = (newTab: number) => {
        if (newTab === tab) {
            if (tab === 0 && exploreRef.current) {
                exploreRef.current.getNode().scrollTo({ y: 0 });
            } else if (tab === 1) {
                dialogsDataSource.requestScrollToTop();
                if (dialogsContentOffset.current) {
                    dialogsContentOffset.current.setOffset(0);
                }
                if (dialogsAdditionalRef.current && dialogsAdditionalRef.current.getNode) {
                    const node = dialogsAdditionalRef.current.getNode();
                    if (node.scrollToOffset) {
                        node.scrollToOffset({ offset: 0 });
                    } else if (node.scrollTo) {
                        node.scrollTo({ y: 0 });
                    }
                }
            } else if (tab === 2) {
                notificationsDataSource.requestScrollToTop();
                if (notificationsContentOffset.current) {
                    notificationsContentOffset.current.setOffset(0);
                }
            } else if (tab === 3 && settingsRef.current) {
                settingsRef.current.getNode().scrollTo({ y: 0 });
            }
        } else {
            setTab(newTab);
        }
    };

    return (
        <View style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'stretch' }}>
            <ASSafeAreaProvider bottom={Platform.OS === 'ios' ? 52 : 0}>
                <View style={{ width: '100%', flexGrow: 1, flexBasis: 0 }}>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 0 ? 1 : 0 }} pointerEvents={tab === 0 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 0}>
                            {tab === 0 && <ZTrack event={'navigate_discover'} />}
                            <ComponentRefContext.Provider value={exploreRef}>
                                <Explore {...props} />
                            </ComponentRefContext.Provider>
                        </HeaderContextChild>
                    </View>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 1 ? 1 : 0 }} pointerEvents={tab === 1 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 1}>
                            {tab === 1 && <ZTrack event="navigate_chats" />}
                            <SetTabContext.Provider value={setTab}>
                                <STrackedValueRefContext.Provider value={dialogsContentOffset}>
                                    <ComponentRefContext.Provider value={dialogsAdditionalRef}>
                                        <HomeDialogs {...props} />
                                    </ComponentRefContext.Provider>
                                </STrackedValueRefContext.Provider>
                            </SetTabContext.Provider>
                        </HeaderContextChild>
                    </View>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 2 ? 1 : 0 }} pointerEvents={tab === 2 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 2}>
                            <ActiveTabContext.Provider value={tab === 2}>
                                {tab === 2 && <ZTrack event="navigate_notifications" />}
                                <STrackedValueRefContext.Provider value={notificationsContentOffset}>
                                    <NotificationCenter {...props} />
                                </STrackedValueRefContext.Provider>
                            </ActiveTabContext.Provider>
                        </HeaderContextChild>
                    </View>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 3 ? 1 : 0 }} pointerEvents={tab === 3 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 3}>
                            {tab === 3 && <ZTrack event="navigate_account" />}
                            <ComponentRefContext.Provider value={settingsRef}>
                                <Settings {...props} />
                            </ComponentRefContext.Provider>
                        </HeaderContextChild>
                    </View>
                </View>
            </ASSafeAreaProvider>
            <View style={{ position: Platform.OS === 'ios' ? 'absolute' : 'relative', bottom: 0, left: 0, right: 0 }}>
                <AppBarBottom>
                    <AppBarBottomItem
                        dot={discoverDone !== null && !discoverDone.betaIsDiscoverDone}
                        icon={require('assets/ic-discover-24.png')}
                        iconSelected={require('assets/ic-discover-filled-24.png')}
                        selected={tab === 0}
                        onPress={() => handleChangeTab(0)}
                    />
                    <AppBarBottomItem
                        counter={counter && counter.alphaNotificationCounter.unreadCount || undefined}
                        icon={require('assets/ic-message-24.png')}
                        iconSelected={require('assets/ic-message-filled-24.png')}
                        iconCounter={require('assets/ic-message-counter-24.png')}
                        iconSelectedCounter={require('assets/ic-message-filled-counter-24.png')}
                        selected={tab === 1}
                        onPress={() => handleChangeTab(1)}
                    />
                    <AppBarBottomItem
                        counter={notificationsCounter && notificationsCounter.myNotificationCenter.unread || undefined}
                        icon={require('assets/ic-notifications-24.png')}
                        iconSelected={require('assets/ic-notifications-filled-24.png')}
                        iconCounter={require('assets/ic-notifications-counter-24.png')}
                        iconSelectedCounter={require('assets/ic-notifications-filled-counter-24.png')}
                        selected={tab === 2}
                        onPress={() => handleChangeTab(2)}
                    />
                    <AppBarBottomItem
                        counter={failingPaymentsCount}
                        icon={require('assets/ic-settings-24.png')}
                        iconSelected={require('assets/ic-settings-filled-24.png')}
                        iconCounter={require('assets/ic-settings-counter-24.png')}
                        iconSelectedCounter={require('assets/ic-settings-filled-counter-24.png')}
                        selected={tab === 3}
                        onPress={() => handleChangeTab(3)}
                    />
                </AppBarBottom>
            </View>
        </View>
    );
});

Home.displayName = 'Home';
