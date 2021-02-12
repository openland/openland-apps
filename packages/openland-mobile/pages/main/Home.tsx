import * as React from 'react';
import { View, Platform } from 'react-native';
import { HomeDialogs } from './HomeDialogs';
import { Settings } from './Settings';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { HeaderContextChild } from 'react-native-s/navigation/HeaderContextChild';
import { PageProps } from '../../components/PageProps';
import { AppBarBottom, AppBarBottomItem } from '../../components/AppBarBottom';
import { Explore } from './Explore';
import { Contacts } from './Contacts';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { NotificationCenter } from './NotificationCenter';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { SSearchControlerComponent } from 'react-native-s/SSearchController';
import { AppStorage } from 'openland-y-runtime/AppStorage';

export const ActiveTabContext = React.createContext(false);
export const SetTabContext = React.createContext<(index: number) => void>(() => {/* noop */ });
export const ComponentRefContext = React.createContext<React.RefObject<any> | undefined>(undefined); // terrible hack here and after because of Animated.FlatList and Animated.ScrollView
export const SSearchControllerRefContext = React.createContext<React.RefObject<SSearchControlerComponent> | undefined>(undefined);

const DEFAULT_TAB = 2;

export const Home = React.memo((props: PageProps) => {
    const router = React.useContext(SRouterContext);
    const [tab, setTab] = React.useState(router && router.params && typeof router.params.initialTab === 'number' ? router.params.initialTab : DEFAULT_TAB);
    const counter = getClient().useGlobalCounter({ suspense: false });
    const notificationsCounter = getClient().useMyNotificationCenter({ suspense: false });
    const discoverDone = getClient().useDiscoverIsDone({ suspense: false });
    const wallet = getClient().useMyWallet({ suspense: false });
    const failingPaymentsCount = wallet && wallet.myWallet.failingPaymentsCount || undefined;
    const [exploreSeen, setExploreSeen] = React.useState<boolean | null>(null);

    const messenger = getMessenger();
    const exploreRef = React.createRef<any>();
    const contactsRef = React.createRef<any>();
    const dialogsSearchController = React.createRef<SSearchControlerComponent>();
    const settingsRef = React.createRef<any>();

    const readExploreSeen = async () => {
        let seen = await AppStorage.readKey('explore_tab_seen');
        setExploreSeen(!!seen);
    };
    React.useLayoutEffect(() => {
        readExploreSeen();
    }, []);

    const handleChangeTab = (newTab: number) => {
        if (newTab === tab) {
            if (tab === 0 && exploreRef.current) {
                exploreRef.current.getNode().scrollTo({ y: 0 });
            } else if (tab === 1 && contactsRef.current) {
                contactsRef.current.getNode().scrollToOffset({ animated: true, offset: 0 });
            } else if (tab === 2) {
                messenger.scrollDialogsToTop();
                if (dialogsSearchController.current) {
                    dialogsSearchController.current.handleSearchStopCompleted();
                }
            } else if (tab === 3) {
                messenger.scrollNotificationsToTop();
            } else if (tab === 4 && settingsRef.current) {
                settingsRef.current.getNode().scrollTo({ y: 0 });
            }
        } else {
            setTab(newTab);
            setExploreSeen(true);
            AppStorage.writeKey('explore_tab_seen', true);
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
                            {tab === 1 && <ZTrack event={'navigate_contacts'} />}
                            <ComponentRefContext.Provider value={contactsRef}>
                                <Contacts {...props} />
                            </ComponentRefContext.Provider>
                        </HeaderContextChild>
                    </View>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 2 ? 1 : 0 }} pointerEvents={tab === 2 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 2}>
                            {tab === 2 && <ZTrack event="navigate_chats" />}
                            <SetTabContext.Provider value={setTab}>
                                <SSearchControllerRefContext.Provider value={dialogsSearchController}>
                                    <HomeDialogs {...props} />
                                </SSearchControllerRefContext.Provider>
                            </SetTabContext.Provider>
                        </HeaderContextChild>
                    </View>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 3 ? 1 : 0 }} pointerEvents={tab === 3 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 3}>
                            <ActiveTabContext.Provider value={tab === 3}>
                                {tab === 3 && <ZTrack event="navigate_notifications" />}
                                <NotificationCenter {...props} />
                            </ActiveTabContext.Provider>
                        </HeaderContextChild>
                    </View>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 4 ? 1 : 0 }} pointerEvents={tab === 4 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 4}>
                            {tab === 4 && <ZTrack event="navigate_account" />}
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
                        dot={discoverDone !== null && !discoverDone.betaIsDiscoverDone && exploreSeen !== null && !exploreSeen}
                        icon={require('assets/ic-discover-24.png')}
                        iconSelected={require('assets/ic-discover-filled-24.png')}
                        selected={tab === 0}
                        onPress={() => handleChangeTab(0)}
                    />
                    <AppBarBottomItem
                        icon={require('assets/ic-user-24.png')}
                        iconSelected={require('assets/ic-user-filled-24.png')}
                        selected={tab === 1}
                        onPress={() => handleChangeTab(1)}
                    />
                    <AppBarBottomItem
                        counter={counter && counter.alphaNotificationCounter.unreadCount || undefined}
                        icon={require('assets/ic-message-24.png')}
                        iconSelected={require('assets/ic-message-filled-24.png')}
                        iconCounter={require('assets/ic-message-counter-24.png')}
                        iconSelectedCounter={require('assets/ic-message-filled-counter-24.png')}
                        selected={tab === 2}
                        onPress={() => handleChangeTab(2)}
                    />
                    <AppBarBottomItem
                        counter={notificationsCounter && notificationsCounter.myNotificationCenter.unread || undefined}
                        icon={require('assets/ic-notifications-24.png')}
                        iconSelected={require('assets/ic-notifications-filled-24.png')}
                        iconCounter={require('assets/ic-notifications-counter-24.png')}
                        iconSelectedCounter={require('assets/ic-notifications-filled-counter-24.png')}
                        selected={tab === 3}
                        onPress={() => handleChangeTab(3)}
                    />
                    <AppBarBottomItem
                        counter={failingPaymentsCount}
                        icon={require('assets/ic-settings-24.png')}
                        iconSelected={require('assets/ic-settings-filled-24.png')}
                        iconCounter={require('assets/ic-settings-counter-24.png')}
                        iconSelectedCounter={require('assets/ic-settings-filled-counter-24.png')}
                        selected={tab === 4}
                        onPress={() => handleChangeTab(4)}
                    />
                </AppBarBottom>
            </View>
        </View>
    );
});

Home.displayName = 'Home';
