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

export const Home = XMemo<PageProps>((props) => {
    let [tab, setTab] = React.useState(1);
    let counter = getClient().useWithoutLoaderGlobalCounter();
    let discoverDone = getClient().useWithoutLoaderDiscoverIsDone();

    return (
        <View style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'stretch' }}>
            <ASSafeAreaProvider bottom={Platform.OS === 'ios' ? 48 : 0}>
                <View style={{ width: '100%', flexGrow: 1, flexBasis: 0 }}>
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
                    <AppBarBottomItem
                        dot={discoverDone !== null && !discoverDone.betaIsDiscoverDone}
                        icon={Platform.OS === 'android' ? require('assets/ic-rooms.png') : require('assets/ic-rooms-ios-28.png')}
                        selected={tab === 0}
                        onPress={() => setTab(0)}
                    />
                    <AppBarBottomItem
                        icon={Platform.OS === 'android' ? require('assets/ic-messages.png') : require('assets/ic-messages-ios.png')}
                        selected={tab === 1}
                        counter={counter && counter.alphaNotificationCounter.unreadCount || undefined}
                        onPress={() => setTab(1)}
                    />
                    <AppBarBottomItem
                        icon={Platform.OS === 'android' ? require('assets/ic-settings.png') : require('assets/ic-settings-ios.png')}
                        selected={tab === 2}
                        onPress={() => setTab(2)}
                    />
                </AppBarBottom>
            </View>
        </View>
    )
});

Home.displayName = 'Home';