import * as React from 'react';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { Platform, View, Image } from 'react-native';
import { XMemo } from 'openland-y-utils/XMemo';
import { AppTheme } from 'openland-mobile/themes/themes';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SRouter } from 'react-native-s/SRouter';
import { NON_PRODUCTION } from 'openland-mobile/pages/Init';

const NotificationCenterButton = XMemo<{ dot: boolean, theme: AppTheme, onPress: () => void }>((props) => {
    const { dot, theme, onPress } = props;

    const icon = Platform.OS === 'ios' ? require('assets/ic-header-notifications-26.png') : require('assets/ic-notifications-24.png');
    const size = Platform.OS === 'ios' ? 26 : 24;
    const color = Platform.OS === 'ios' ? theme.accentColor : theme.textColor;

    return (
        <SHeaderButton onPress={onPress} key={'notify-button-' + dot}>
            <View width={Platform.OS === 'ios' ? 44 : undefined} height={44} alignItems="center" justifyContent="center">
                <Image source={icon} style={{ width: size, height: size, tintColor: color }} resizeMode="contain" />
    
                {dot && (
                    <View
                        style={{
                            position: 'absolute',
                            top: Platform.OS === 'ios' ? 10 : 10,
                            right: Platform.OS === 'ios' ? 11 : 2,
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            padding: 2,
                            backgroundColor: theme.headerColor
                        }}
                    >
                        <View style={{ width: 6, height: 6, backgroundColor: '#ff3b30', borderRadius: 3 }} />
                    </View>
                )}
            </View>
        </SHeaderButton>
    );
});

export const MainHeaderButtons = XMemo<{ router: SRouter, theme: AppTheme }>((props) => {
    const { router, theme } = props;

    const notificationCenter = getClient().useWithoutLoaderMyNotificationCenter();
    const dot = notificationCenter && notificationCenter.myNotificationCenter.unread > 0 || false;

    return (
        <>
            {NON_PRODUCTION && (
                <NotificationCenterButton dot={dot} theme={theme} onPress={() => router.push('NotificationCenter')} />
            )}
            <SHeaderButton
                key={'compose-button-' + dot}
                title="New"
                icon={Platform.OS === 'ios' ? require('assets/ic-compose-26.png') : require('assets/ic-edit.png')}
                onPress={() => props.router.push('Compose')}
            />
        </>
    )
});