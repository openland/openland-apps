import * as React from 'react';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { Platform, View, Image } from 'react-native';
import { XMemo } from 'openland-y-utils/XMemo';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SRouter } from 'react-native-s/SRouter';
import { ThemeGlobal } from 'openland-y-utils/themes/types';

const NotificationCenterButton = XMemo<{ dot: boolean, theme: ThemeGlobal, onPress: () => void }>((props) => {
    const { dot, theme, onPress } = props;

    const icon = require('assets/ic-header-bell-24.png');
    const size = Platform.OS === 'ios' ? 26 : 24;
    const color = theme.foregroundSecondary;

    return (
        <SHeaderButton onPress={onPress} key={'notify-button-' + dot}>
            <View width={44} height={44} alignItems="center" justifyContent="center">
                <Image source={icon} style={{ width: size, height: size, tintColor: color }} resizeMode="contain" />
    
                {dot && (
                    <View
                        style={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            width: 6,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: theme.accentNegative
                        }}
                    />
                )}
            </View>
        </SHeaderButton>
    );
});

export const MainHeaderButtons = XMemo<{ router: SRouter, theme: ThemeGlobal }>((props) => {
    const { router, theme } = props;

    const notificationCenter = getClient().useWithoutLoaderMyNotificationCenter();
    const dot = notificationCenter && notificationCenter.myNotificationCenter.unread > 0 || false;

    return (
        <>
            <NotificationCenterButton dot={dot} theme={theme} onPress={() => router.push('NotificationCenter')} />
            <SHeaderButton
                key={'compose-button-' + dot}
                title="New"
                icon={require('assets/ic-header-plus-24.png')}
                onPress={() => props.router.push('Compose')}
            />
        </>
    );
});