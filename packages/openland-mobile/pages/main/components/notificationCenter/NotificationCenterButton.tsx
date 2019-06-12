import * as React from 'react';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { Platform, View, Image } from 'react-native';
import { AppTheme } from 'openland-mobile/themes/themes';
import { XMemo } from 'openland-y-utils/XMemo';

interface NotificationCenterButtonProps {
    dot: boolean;
    theme: AppTheme;
    onPress: () => void;
}

export const NotificationCenterButton = XMemo<NotificationCenterButtonProps>((props) => {
    const { dot, theme, onPress } = props;

    const icon = Platform.OS === 'ios' ? require('assets/ic-header-notifications-26.png') : require('assets/ic-notifications-24.png');
    const size = Platform.OS === 'ios' ? 26 : 24;
    const color = Platform.OS === 'ios' ? theme.accentColor : theme.textColor;

    return (
        <SHeaderButton onPress={onPress}>
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