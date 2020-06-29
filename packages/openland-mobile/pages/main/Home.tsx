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
import { XMemo } from 'openland-y-utils/XMemo';
import { NotificationCenter } from './NotificationCenter';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { SRouterContext } from 'react-native-s/SRouterContext';

export const ActiveTabContext = React.createContext(false);
export const SetTabContext = React.createContext<(index: number) => void>(() => {/* noop */ });

const DEFAULT_TAB = 1;

export const Home = XMemo<PageProps>((props) => {
    const router = React.useContext(SRouterContext);
    const [tab, setTab] = React.useState(router && router.params && typeof router.params.initialTab === 'number' ? router.params.initialTab : DEFAULT_TAB);
    const counter = getClient().useGlobalCounter({ suspense: false });
    const notificationsCounter = getClient().useMyNotificationCenter({ suspense: false });
    const discoverDone = getClient().useDiscoverIsDone({ suspense: false });
    const wallet = getClient().useMyWallet({ suspense: false });
    const failingPaymentsCount = wallet && wallet.myWallet.failingPaymentsCount || undefined;

    return (
        <View style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'stretch' }}>
            <ASSafeAreaProvider bottom={Platform.OS === 'ios' ? 52 : 0}>
                <View style={{ width: '100%', flexGrow: 1, flexBasis: 0 }}>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 0 ? 1 : 0 }} pointerEvents={tab === 0 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 0}>
                            {tab === 0 && <ZTrack event={'navigate_discover'} />}
                            <Explore {...props} />
                        </HeaderContextChild>
                    </View>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 1 ? 1 : 0 }} pointerEvents={tab === 1 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 1}>
                            {tab === 1 && <ZTrack event="navigate_chats" />}
                            <SetTabContext.Provider value={setTab}>
                                <HomeDialogs {...props} />
                            </SetTabContext.Provider>
                        </HeaderContextChild>
                    </View>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 2 ? 1 : 0 }} pointerEvents={tab === 2 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 2}>
                            <ActiveTabContext.Provider value={tab === 2}>
                                {tab === 2 && <ZTrack event="navigate_notifications" />}
                                <NotificationCenter {...props} />
                            </ActiveTabContext.Provider>
                        </HeaderContextChild>
                    </View>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 3 ? 1 : 0 }} pointerEvents={tab === 3 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 3}>
                            {tab === 3 && <ZTrack event="navigate_account" />}
                            <Settings {...props} />
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
                        onPress={() => setTab(0)}
                    />
                    <AppBarBottomItem
                        counter={counter && counter.alphaNotificationCounter.unreadCount || undefined}
                        icon={require('assets/ic-message-24.png')}
                        iconSelected={require('assets/ic-message-filled-24.png')}
                        iconCounter={require('assets/ic-message-counter-24.png')}
                        iconSelectedCounter={require('assets/ic-message-filled-counter-24.png')}
                        selected={tab === 1}
                        onPress={() => setTab(1)}
                    />
                    <AppBarBottomItem
                        counter={notificationsCounter && notificationsCounter.myNotificationCenter.unread || undefined}
                        icon={require('assets/ic-notifications-24.png')}
                        iconSelected={require('assets/ic-notifications-filled-24.png')}
                        iconCounter={require('assets/ic-notifications-counter-24.png')}
                        iconSelectedCounter={require('assets/ic-notifications-filled-counter-24.png')}
                        selected={tab === 2}
                        onPress={() => setTab(2)}
                    />
                    <AppBarBottomItem
                        counter={failingPaymentsCount}
                        icon={require('assets/ic-settings-24.png')}
                        iconSelected={require('assets/ic-settings-filled-24.png')}
                        iconCounter={require('assets/ic-settings-counter-24.png')}
                        iconSelectedCounter={require('assets/ic-settings-filled-counter-24.png')}
                        selected={tab === 3}
                        onPress={() => setTab(3)}
                    />
                </AppBarBottom>
            </View>
        </View>
    );
});

Home.displayName = 'Home';
