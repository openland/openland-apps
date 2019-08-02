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
import { NON_PRODUCTION } from '../Init';
import { Feed } from './Feed';

export const Home = XMemo<PageProps>((props) => {
    let [tab, setTab] = React.useState(1);
    let counter = getClient().useWithoutLoaderGlobalCounter();
    let discoverDone = getClient().useWithoutLoaderDiscoverIsDone();

    return (
        <View style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'stretch' }}>
            <ASSafeAreaProvider bottom={Platform.OS === 'ios' ? 52 : 0}>
                <View style={{ width: '100%', flexGrow: 1, flexBasis: 0 }}>
                    {NON_PRODUCTION && (
                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 3 ? 1 : 0 }} pointerEvents={tab === 3 ? 'box-none' : 'none'}>
                            <HeaderContextChild enabled={tab === 3}>
                                <Feed {...props as any} />
                            </HeaderContextChild>
                        </View>
                    )}
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 0 ? 1 : 0 }} pointerEvents={tab === 0 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 0}>
                            <Explore {...props as any} />
                        </HeaderContextChild>
                    </View>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 1 ? 1 : 0 }} pointerEvents={tab === 1 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 1}>
                            <HomeDialogs {...props as any} />
                        </HeaderContextChild>
                    </View>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: tab === 2 ? 1 : 0 }} pointerEvents={tab === 2 ? 'box-none' : 'none'}>
                        <HeaderContextChild enabled={tab === 2}>
                            <Settings {...props as any} />
                        </HeaderContextChild>
                    </View>
                </View>
            </ASSafeAreaProvider>
            <View style={{ position: Platform.OS === 'ios' ? 'absolute' : 'relative', bottom: 0, left: 0, right: 0 }}>
                <AppBarBottom>
                    {NON_PRODUCTION && (
                        <AppBarBottomItem
                            icon={require('assets/ic-feed-24.png')}
                            iconSelected={require('assets/ic-feed-filled-24.png')}
                            selected={tab === 3}
                            onPress={() => setTab(3)}
                        />
                    )}
                    <AppBarBottomItem
                        dot={discoverDone !== null && !discoverDone.betaIsDiscoverDone}
                        icon={require('assets/ic-discover-24.png')}
                        iconSelected={require('assets/ic-discover-filled-24.png')}
                        selected={tab === 0}
                        onPress={() => setTab(0)}
                    />
                    <AppBarBottomItem
                        counter={counter && counter.alphaNotificationCounter.unreadCount || undefined}
                        icon={require('assets/ic-chat-24.png')}
                        iconSelected={require('assets/ic-chat-filled-24.png')}
                        selected={tab === 1}
                        onPress={() => setTab(1)}
                    />
                    <AppBarBottomItem
                        icon={require('assets/ic-user-24.png')}
                        iconSelected={require('assets/ic-user-filled-24.png')}
                        selected={tab === 2}
                        onPress={() => setTab(2)}
                    />
                </AppBarBottom>
            </View>
        </View>
    );
});

Home.displayName = 'Home';